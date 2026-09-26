import 'server-only';
import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, chmodSync } from 'node:fs';
import path from 'node:path';
import { randomUUID, createHash } from 'node:crypto';

export type LeadInput = { name:string; mobile:string; email?:string; city?:string; role?:string; topic:string; product?:string; message:string; source:'contact'|'tds'|'dealer'; form_name?:string; source_page?:string };
export type Lead = LeadInput & { id:string; created_at:string; status:string; notes:string; assignee:string; follow_up:string; version:number };
let connection:DatabaseSync|undefined;
export function db() {
  if (connection) return connection;
  const file=process.env.LEADS_DB_PATH || path.join(process.cwd(),'.data/leads.sqlite');
  mkdirSync(path.dirname(file),{recursive:true,mode:0o700});
  const database=new DatabaseSync(file);
  database.exec(`PRAGMA journal_mode=WAL; PRAGMA synchronous=FULL; PRAGMA busy_timeout=5000;
    CREATE TABLE IF NOT EXISTS leads(id TEXT PRIMARY KEY,created_at TEXT NOT NULL,name TEXT NOT NULL,mobile TEXT NOT NULL,email TEXT,city TEXT,role TEXT,topic TEXT NOT NULL,product TEXT,message TEXT NOT NULL,source TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'new',notes TEXT NOT NULL DEFAULT '',consent_at TEXT NOT NULL);
    CREATE INDEX IF NOT EXISTS leads_created ON leads(created_at);
    CREATE TABLE IF NOT EXISTS submissions(key TEXT PRIMARY KEY, fingerprint TEXT NOT NULL, lead_id TEXT NOT NULL, expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS rate_limits(key TEXT PRIMARY KEY,count INTEGER NOT NULL,expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS admins(username TEXT PRIMARY KEY,password_hash TEXT NOT NULL,totp_secret TEXT,totp_step INTEGER NOT NULL DEFAULT -1,disabled INTEGER NOT NULL DEFAULT 0);
    CREATE TABLE IF NOT EXISTS admin_sessions(token TEXT PRIMARY KEY,username TEXT NOT NULL,expires INTEGER NOT NULL);
    CREATE TABLE IF NOT EXISTS lead_audit(id INTEGER PRIMARY KEY,lead_id TEXT NOT NULL,actor TEXT NOT NULL,action TEXT NOT NULL,detail TEXT NOT NULL,created_at TEXT NOT NULL);
    CREATE INDEX IF NOT EXISTS audit_lead ON lead_audit(lead_id,id);`);
  const columns=database.prepare('PRAGMA table_info(leads)').all().map(c=>c.name);
  for (const [name,type] of [['form_name',"TEXT NOT NULL DEFAULT ''"],['source_page',"TEXT NOT NULL DEFAULT ''"],['assignee',"TEXT NOT NULL DEFAULT ''"],['follow_up',"TEXT NOT NULL DEFAULT ''"],['version','INTEGER NOT NULL DEFAULT 0']]) {
    if(!columns.includes(name)) database.exec(`ALTER TABLE leads ADD COLUMN ${name} ${type}`);
  }
  database.exec('CREATE INDEX IF NOT EXISTS leads_status_created ON leads(status,created_at);');
  chmodSync(file,0o600);
  connection=database;
  return database;
}
export class DuplicateConflict extends Error {}
export function saveLead(input:LeadInput,key?:string) {
  const database=db(), now=Date.now();
  const normalized={...input,mobile:input.mobile.replace(/\D/g,''),email:(input.email||'').toLowerCase()};
  const fingerprint=createHash('sha256').update(JSON.stringify(normalized)).digest('hex');
  database.exec('BEGIN IMMEDIATE');
  try {
    database.prepare('DELETE FROM submissions WHERE expires<?').run(now);
    const prior=key?database.prepare('SELECT * FROM submissions WHERE key=?').get(key):undefined;
    if(prior && prior.fingerprint!==fingerprint) throw new DuplicateConflict('Submission key already used');
    const match=prior || database.prepare('SELECT lead_id FROM submissions WHERE fingerprint=? AND expires>? LIMIT 1').get(fingerprint,now+23*60*60*1000);
    const id=match?String(match.lead_id):randomUUID();
    if(!match) {
      const date=new Date(now).toISOString();
      database.prepare('INSERT INTO leads(id,created_at,name,mobile,email,city,role,topic,product,message,source,consent_at,form_name,source_page) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run(id,date,input.name,input.mobile,input.email||'',input.city||'',input.role||'',input.topic,input.product||'',input.message,input.source,date,input.form_name||'',input.source_page||'');
      audit(id,'website','created',input.source);
    }
    // Exact browser retries are retained for 24 hours; identical content is coalesced for one hour.
    if(key&&!prior) database.prepare('INSERT INTO submissions VALUES(?,?,?,?)').run(key,fingerprint,id,now+86400000);
    if(!key&&!match) database.prepare('INSERT INTO submissions VALUES(?,?,?,?)').run(randomUUID(),fingerprint,id,now+86400000);
    database.exec('COMMIT');
    return id;
  } catch(error) { database.exec('ROLLBACK'); throw error; }
}
export function listLeads(search='',status='',page=1,pageSize=25,due=false) {
  const where="(?='' OR status=?) AND (?='' OR name LIKE ? OR email LIKE ? OR mobile LIKE ? OR message LIKE ?) AND (?=0 OR (follow_up<>'' AND follow_up<=? AND status<>'closed'))";
  const args=[status,status,search,...Array(4).fill('%'+search+'%'),due?1:0,new Date().toISOString().slice(0,10)];
  const total=Number(db().prepare(`SELECT count(*) AS total FROM leads WHERE ${where}`).get(...args)?.total);
  const pages=Math.max(1,Math.ceil(total/pageSize)),current=Math.min(Math.max(1,page),pages);
  const leads=db().prepare(`SELECT * FROM leads WHERE ${where} ORDER BY created_at DESC,id DESC LIMIT ? OFFSET ?`).all(...args,pageSize,(current-1)*pageSize) as unknown as Lead[];
  return {leads,total,pages,page:current};
}
export function audit(id:string,actor:string,action:string,detail='') {
  db().prepare('INSERT INTO lead_audit(lead_id,actor,action,detail,created_at) VALUES(?,?,?,?,?)').run(id,actor,action,detail,new Date().toISOString());
}
export function history(id:string) { return db().prepare('SELECT * FROM lead_audit WHERE lead_id=? ORDER BY id DESC LIMIT 15').all(id) as {actor:string;action:string;detail:string;created_at:string}[]; }
export function updateLead(id:string,status:string,notes:string,assignee:string,followUp:string,version:number,actor:string) {
  const database=db();database.exec('BEGIN IMMEDIATE');
  try {
    const result=database.prepare('UPDATE leads SET status=?,notes=?,assignee=?,follow_up=?,version=version+1 WHERE id=? AND version=?').run(status,notes,assignee,followUp,id,version);
    if(result.changes) audit(id,actor,'updated',JSON.stringify({status,assignee,followUp,notesChanged:true}));
    database.exec('COMMIT');return result.changes;
  } catch(error) {database.exec('ROLLBACK');throw error;}
}

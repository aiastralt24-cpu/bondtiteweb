import {DatabaseSync} from 'node:sqlite';
import {randomBytes,scryptSync} from 'node:crypto';
import {readFileSync,mkdirSync,chmodSync} from 'node:fs';
import path from 'node:path';
const [command,username]=process.argv.slice(2);
if(!['set-password','disable'].includes(command)||!username||!/^[a-z0-9._-]{3,80}$/.test(username))throw new Error('Usage: node scripts/leads-admin.mjs set-password|disable username. For set-password, pipe a password on stdin.');
const file=process.env.LEADS_DB_PATH||path.join(process.cwd(),'.data/leads.sqlite');mkdirSync(path.dirname(file),{recursive:true,mode:0o700});
const db=new DatabaseSync(file);db.exec(`PRAGMA busy_timeout=5000; CREATE TABLE IF NOT EXISTS admins(username TEXT PRIMARY KEY,password_hash TEXT NOT NULL,totp_secret TEXT,totp_step INTEGER NOT NULL DEFAULT -1,disabled INTEGER NOT NULL DEFAULT 0); CREATE TABLE IF NOT EXISTS admin_sessions(token TEXT PRIMARY KEY,username TEXT NOT NULL,expires INTEGER NOT NULL);`);chmodSync(file,0o600);
let hash;
if(command==='set-password'){
  if(process.stdin.isTTY)throw new Error('Provide password through stdin, not command arguments.');
  const password=readFileSync(0,'utf8').trim();if(password.length<16||password.length>200)throw new Error('Password must have 16 to 200 characters.');
  const salt=randomBytes(16).toString('hex');hash=salt+':'+scryptSync(password,salt,64).toString('hex');
}
db.exec('BEGIN IMMEDIATE');
try{
  if(command==='disable'){
    const count=db.prepare('SELECT count(*) AS n FROM admins WHERE disabled=0 AND username<>?').get(username).n;
    if(!count)throw new Error('Create another active administrator before disabling this account.');
    if(!db.prepare('UPDATE admins SET disabled=1 WHERE username=?').run(username).changes)throw new Error('Account not found.');
  }else db.prepare('INSERT INTO admins(username,password_hash) VALUES(?,?) ON CONFLICT(username) DO UPDATE SET password_hash=excluded.password_hash,disabled=0').run(username,hash);
  db.prepare('DELETE FROM admin_sessions WHERE username=?').run(username);db.exec('COMMIT');
}catch(error){db.exec('ROLLBACK');throw error;}
db.close();console.log('Account updated. Existing sessions for this account were revoked.');

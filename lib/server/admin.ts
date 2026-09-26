import 'server-only';
import { timingSafeEqual, randomBytes, scryptSync, createHash } from 'node:crypto';
import {readFileSync,mkdirSync,writeFileSync} from 'node:fs';
import path from 'node:path';
import {cookies} from 'next/headers';
import {db,audit} from './leads';
export function equal(a:string,b:string){const aa=Buffer.from(a),bb=Buffer.from(b);return aa.length===bb.length&&timingSafeEqual(aa,bb);}
export function passwordHash(password:string){const salt=randomBytes(16).toString('hex');return salt+':'+scryptSync(password,salt,64).toString('hex');}
export function verifyPassword(password:string,hash:string){const [salt,expected]=hash.split(':');return !!salt&&!!expected&&equal(scryptSync(password,salt,64).toString('hex'),expected);}
export function ensureAdmin(){
  if(db().prepare('SELECT username FROM admins LIMIT 1').get())return true;
  if(process.env.NODE_ENV==='production')return false;
  const file=path.join(process.cwd(),'.data/admin-password');mkdirSync(path.dirname(file),{recursive:true,mode:0o700});
  let password:string;
  try{password=readFileSync(file,'utf8').trim();}catch{password=randomBytes(24).toString('base64url');try{writeFileSync(file,password+'\n',{mode:0o600,flag:'wx'});}catch{password=readFileSync(file,'utf8').trim();}}
  db().prepare('INSERT OR IGNORE INTO admins(username,password_hash) VALUES(?,?)').run('admin',passwordHash(password));return true;
}
export function authenticate(username:string,password:string){
  ensureAdmin();
  const row=db().prepare('SELECT * FROM admins WHERE username=? AND disabled=0').get(username);
  // Equal cost for unknown users.
  const valid=verifyPassword(password,String(row?.password_hash||'00000000000000000000000000000000:'+ '0'.repeat(128)));
  if(!row||!valid)return false;
  return true;
}
export function makeSession(username:string){
  const token=randomBytes(32).toString('base64url');
  db().prepare('DELETE FROM admin_sessions WHERE expires<?').run(Date.now());
  db().prepare('INSERT INTO admin_sessions VALUES(?,?,?)').run(createHash('sha256').update(token).digest('hex'),username,Date.now()+8*60*60*1000);
  audit('',username,'signed in');return token;
}
export async function adminUser(){
  const token=(await cookies()).get('bondtite_admin')?.value;if(!token||token.length>100)return null;
  const row=db().prepare('SELECT s.username FROM admin_sessions s JOIN admins a ON a.username=s.username WHERE s.token=? AND s.expires>? AND a.disabled=0').get(createHash('sha256').update(token).digest('hex'),Date.now());
  return row?String(row.username):null;
}
export async function isAdmin(){return !!await adminUser();}
export async function revokeSession(){
  const jar=await cookies(),token=jar.get('bondtite_admin')?.value;
  if(token)db().prepare('DELETE FROM admin_sessions WHERE token=?').run(createHash('sha256').update(token).digest('hex'));
  jar.delete('bondtite_admin');
}
export function sameOrigin(request:Request){return request.headers.get('origin')===(process.env.LEADS_PUBLIC_ORIGIN||new URL(request.url).origin);}

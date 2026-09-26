import {DatabaseSync,backup} from 'node:sqlite';
import {readFileSync,existsSync,mkdirSync,chmodSync} from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
const [source,target]=process.argv.slice(2);
if(!source||!target)throw new Error('Usage: node scripts/leads-restore.mjs backup.sqlite NEW-database.sqlite');
if(existsSync(target))throw new Error('Restore target must not exist. Stop the app and restore to a new path.');
const digest=createHash('sha256').update(readFileSync(source)).digest('hex');
if(digest!==readFileSync(source+'.sha256','utf8').trim())throw new Error('Backup checksum does not match.');
const db=new DatabaseSync(source,{readOnly:true});
try{if(db.prepare('PRAGMA integrity_check').get().integrity_check!=='ok')throw new Error('Backup integrity failed.');mkdirSync(path.dirname(target),{recursive:true,mode:0o700});await backup(db,target);chmodSync(target,0o600);}finally{db.close();}
console.log('Restored and verified. Point LEADS_DB_PATH to the new file, then restart the app.');

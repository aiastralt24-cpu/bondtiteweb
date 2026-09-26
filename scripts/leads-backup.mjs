import {DatabaseSync,backup} from 'node:sqlite';
import {mkdirSync,chmodSync,writeFileSync,readFileSync,readdirSync,unlinkSync,existsSync} from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
const file=process.env.LEADS_DB_PATH||path.join(process.cwd(),'.data/leads.sqlite');
const directory=process.env.LEADS_BACKUP_DIR||path.join(process.cwd(),'.data/backups');
export async function makeBackup(){
  if(!existsSync(file))throw new Error('Lead database does not exist.');
  mkdirSync(directory,{recursive:true,mode:0o700});
  const target=path.join(directory,'leads-'+new Date().toISOString().replaceAll(':','-')+'.sqlite');
  const source=new DatabaseSync(file,{readOnly:true});
  try{await backup(source,target);}finally{source.close();}
  chmodSync(target,0o600);
  const copy=new DatabaseSync(target);try{
    // Backup files contain customer records; session tokens are not retained.
    copy.exec('DELETE FROM admin_sessions; PRAGMA journal_mode=DELETE;');
    if(copy.prepare('PRAGMA integrity_check').get().integrity_check!=='ok')throw new Error('Backup integrity check failed.');
  }finally{copy.close();}
  const digest=createHash('sha256').update(readFileSync(target)).digest('hex');
  writeFileSync(target+'.sha256',digest+'\n',{mode:0o600});
  // Keep the latest 28 verified snapshots. Run every six hours for seven days of local history.
  const files=readdirSync(directory).filter(n=>/^leads-.*\.sqlite$/.test(n)&&existsSync(path.join(directory,n+'.sha256'))).sort().reverse();
  for(const old of files.slice(28)){unlinkSync(path.join(directory,old));unlinkSync(path.join(directory,old+'.sha256'));}
  console.log(JSON.stringify({event:'backup_verified',at:new Date().toISOString(),file:target}));
  return target;
}
await makeBackup();
if(process.argv.includes('--watch'))setInterval(()=>makeBackup().catch(error=>{console.error(JSON.stringify({event:'backup_failed',type:error.name,at:new Date().toISOString()}));process.exitCode=1;}),6*60*60*1000);

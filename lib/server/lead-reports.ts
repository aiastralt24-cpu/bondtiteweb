import 'server-only';
import { db, type Lead } from './leads';

export const leadStatuses = ['new','contacted','qualified','closed'];
export const leadSources = ['contact','dealer','tds'];
export type LeadFilters = { q:string; status:string; source:string; assignee:string; from:string; to:string; due:boolean };
const date = (value:string) => /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value)) && new Date(value).toISOString().slice(0,10)===value ? value : '';
export function leadFilters(p:URLSearchParams):LeadFilters {
  return {q:(p.get('q')||'').trim().slice(0,100),status:leadStatuses.includes(p.get('status')||'')?p.get('status')!:'',source:leadSources.includes(p.get('source')||'')?p.get('source')!:'',assignee:(p.get('assignee')||'').slice(0,100),from:date(p.get('from')||''),to:date(p.get('to')||''),due:p.get('due')==='1'};
}
export function filterQuery(f:LeadFilters) {
  return new URLSearchParams(Object.entries(f).filter(([,v])=>v).map(([k,v])=>[k,v===true?'1':String(v)]));
}
export function leadWhere(f:LeadFilters) {
  const conditions:string[]=[],args:string[]=[];
  if(f.q){conditions.push('(name LIKE ? OR email LIKE ? OR mobile LIKE ? OR message LIKE ? OR product LIKE ? OR city LIKE ? OR id LIKE ?)');args.push(...Array(7).fill('%'+f.q+'%'));}
  for(const key of ['status','source'] as const)if(f[key]){conditions.push(`${key}=?`);args.push(f[key]);}
  if(f.assignee){conditions.push('assignee=?');args.push(f.assignee==='unassigned'?'':f.assignee);}
  if(f.from){conditions.push('substr(created_at,1,10)>=?');args.push(f.from);}
  if(f.to){conditions.push('substr(created_at,1,10)<=?');args.push(f.to);}
  if(f.due){conditions.push("follow_up<>'' AND follow_up<=? AND status<>'closed'");args.push(new Date().toISOString().slice(0,10));}
  return {sql:conditions.length?conditions.join(' AND '):'1=1',args};
}
export function leadReport(f:LeadFilters,page=1) {
  const {sql,args}=leadWhere(f),database=db();
  const total=Number(database.prepare(`SELECT count(*) n FROM leads WHERE ${sql}`).get(...args)?.n);
  const pages=Math.max(1,Math.ceil(total/20)),current=Math.min(pages,Math.max(1,Number.isSafeInteger(page)?page:1));
  const leads=database.prepare(`SELECT * FROM leads WHERE ${sql} ORDER BY created_at DESC,id DESC LIMIT 20 OFFSET ?`).all(...args,(current-1)*20) as unknown as Lead[];
  const grouped=(field:'status'|'source'|'product')=>database.prepare(`SELECT ${field} label,count(*) count FROM leads WHERE ${sql} GROUP BY ${field} ORDER BY count DESC,label`).all(...args) as {label:string;count:number}[];
  const statuses=grouped('status'),sources=grouped('source'),products=grouped('product');
  const due=Number(database.prepare(`SELECT count(*) n FROM leads WHERE ${sql} AND follow_up<>'' AND follow_up<=? AND status<>'closed'`).get(...args,new Date().toISOString().slice(0,10))?.n);
  const daily=database.prepare(`SELECT substr(created_at,1,10) label,count(*) count FROM leads WHERE ${sql} GROUP BY label ORDER BY label DESC LIMIT 14`).all(...args) as {label:string;count:number}[];
  return {leads,total,pages,page:current,statuses,sources,products,due,daily};
}

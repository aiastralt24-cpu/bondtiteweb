import {adminUser} from '@/lib/server/admin';
import {db,audit} from '@/lib/server/leads';
import {errorResponse,throttle} from '@/lib/server/request';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const cell=(value:unknown)=>'"'+String(value??'').replace(/^[\s]*[=+@\-\t\r]/,match=>"'"+match).replaceAll('"','""')+'"';
export async function GET(request:Request){
  try{
    const actor=await adminUser();if(!actor)return new Response('Unauthorized',{status:401});
    throttle('export:'+actor,5);
    const p=new URL(request.url).searchParams,q=(p.get('q')||'').slice(0,100),status=p.get('status')||'',due=p.get('due')==='1';
    const rows=db().prepare("SELECT * FROM leads WHERE (?='' OR status=?) AND (?='' OR name LIKE ? OR email LIKE ? OR mobile LIKE ? OR message LIKE ?) AND (?=0 OR (follow_up<>'' AND follow_up<=? AND status<>'closed')) ORDER BY created_at DESC,id DESC").iterate(status,status,q,...Array(4).fill('%'+q+'%'),due?1:0,new Date().toISOString().slice(0,10));
    audit('',actor,'exported leads');
    const columns=['id','created_at','name','mobile','email','city','role','topic','product','message','source','form_name','source_page','status','assignee','follow_up','notes','consent_at'];
    const encoder=new TextEncoder();let first=true;
    const stream=new ReadableStream({pull(controller){if(first){first=false;controller.enqueue(encoder.encode('\uFEFF'+columns.map(cell).join(',')+'\r\n'));return;}const next=rows.next();if(next.done){controller.close();return;}controller.enqueue(encoder.encode(columns.map(c=>cell(next.value[c])).join(',')+'\r\n'));},cancel(){rows.return?.();}});
    return new Response(stream,{headers:{'Content-Type':'text/csv; charset=utf-8','Content-Disposition':'attachment; filename="bondtite-leads.csv"','Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'}});
  }catch(error){return errorResponse(error);}
}

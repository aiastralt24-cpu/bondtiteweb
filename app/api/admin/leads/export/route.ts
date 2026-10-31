import {adminUser} from '@/lib/server/admin';
import {db,audit} from '@/lib/server/leads';
import {leadFilters,leadWhere,leadReport,filterQuery} from '@/lib/server/lead-reports';
import {errorResponse,throttle} from '@/lib/server/request';
export const runtime='nodejs';
export const dynamic='force-dynamic';
const cell=(value:unknown)=>'"'+String(value??'').replace(/^[\s]*[=+@\-\t\r]/,match=>"'"+match).replaceAll('"','""')+'"';
export async function GET(request:Request){
  try{
    const actor=await adminUser();if(!actor)return new Response('Unauthorized',{status:401});
    throttle('export:'+actor,5);
    const p=new URL(request.url).searchParams,filters=leadFilters(p),{sql,args}=leadWhere(filters);
    const headers={'Content-Type':'text/csv; charset=utf-8','Content-Disposition':`attachment; filename="bondtite-${p.get('report')==='1'?'report':'leads'}-${new Date().toISOString().slice(0,10)}.csv"`,'Cache-Control':'private, no-store','X-Content-Type-Options':'nosniff'};
    if(p.get('report')==='1'){
      const r=leadReport(filters);
      const lines:unknown[][]=[['Bondtite lead report','Value'],['Generated at (UTC)',new Date().toISOString()],['Filters',filterQuery(filters).toString()||'All leads'],['Total leads',r.total],['Follow-ups due (UTC)',r.due],[],['Group','Label','Count']];
      for(const [group,items] of Object.entries({Status:r.statuses,Source:r.sources,Product:r.products,'Daily intake (latest 14 active dates)':r.daily}))for(const item of items)lines.push([group,item.label||'Not specified',item.count]);
      audit('',actor,'exported report',JSON.stringify(filters));
      return new Response('\uFEFF'+lines.map(row=>row.map(cell).join(',')).join('\r\n'),{headers});
    }
    const rows=db().prepare(`SELECT * FROM leads WHERE ${sql} ORDER BY created_at DESC,id DESC`).iterate(...args);
    audit('',actor,'exported leads',JSON.stringify(filters));
    const columns=['id','created_at','name','mobile','email','city','role','topic','product','message','source','form_name','source_page','status','assignee','follow_up','notes','consent_at'];
    const encoder=new TextEncoder();let first=true;
    const stream=new ReadableStream({pull(controller){if(first){first=false;controller.enqueue(encoder.encode('\uFEFF'+columns.map(cell).join(',')+'\r\n'));return;}const next=rows.next();if(next.done){controller.close();return;}controller.enqueue(encoder.encode(columns.map(c=>cell(next.value[c])).join(',')+'\r\n'));},cancel(){rows.return?.();}});
    return new Response(stream,{headers});
  }catch(error){return errorResponse(error);}
}

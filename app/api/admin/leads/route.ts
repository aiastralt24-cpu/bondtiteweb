import {adminUser,sameOrigin} from '@/lib/server/admin';
import {updateLead,db} from '@/lib/server/leads';
import {readBody,errorResponse} from '@/lib/server/request';
export async function POST(request:Request){
  if(!sameOrigin(request))return new Response('Forbidden',{status:403});
  try {
    const actor=await adminUser();if(!actor)return new Response('Unauthorized',{status:401});
    const form=new URLSearchParams(await readBody(request,24000));
    const id=form.get('id')||'',status=form.get('status')||'',notes=form.get('notes')||'',assignee=form.get('assignee')||'',followUp=form.get('follow_up')||'',version=Number(form.get('version'));
    if(!['new','contacted','qualified','closed'].includes(status)||notes.length>4000||id.length>40||!Number.isInteger(version)||version<0||(assignee&&!db().prepare('SELECT username FROM admins WHERE username=? AND disabled=0').get(assignee))||(followUp&&(!/^\d{4}-\d{2}-\d{2}$/.test(followUp)||!Number.isFinite(Date.parse(followUp))||new Date(followUp).toISOString().slice(0,10)!==followUp)))return new Response('Invalid update',{status:400});
    if(!updateLead(id,status,notes,assignee,followUp,version,actor))return new Response('This lead changed since you opened it. Reload the inbox before saving again. Your changes were not applied.',{status:409});
    return Response.redirect(new URL('/admin/leads',request.url),303);
  }catch(error){return errorResponse(error);}
}

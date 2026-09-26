import {isUsablePhone} from "@/lib/phone";
import {sourcePage} from '@/lib/server/lead-attribution';
import {saveLead,DuplicateConflict,type LeadInput} from '@/lib/server/leads';
import {sameOrigin} from '@/lib/server/admin';
import {readBody,throttle,clientKey,submissionKey,HttpError,errorResponse} from '@/lib/server/request';
export const runtime='nodejs';
export async function POST(request:Request){
 if(!sameOrigin(request))return Response.json({error:'Request not allowed.'},{status:403});
 try {
 throttle('submission-global',120);throttle('submission-ip:'+clientKey(request),process.env.LEADS_TRUST_PROXY==='true'?15:100);
 const key=submissionKey(request);
 const raw=await readBody(request);if(raw.length>12000)return Response.json({error:'Request too large.'},{status:413});
 let data;try{data=JSON.parse(raw);}catch{return Response.json({error:'Invalid request.'},{status:400});}
 if(!data||typeof data!=='object')return Response.json({error:'Invalid request.'},{status:400});
 const field=(key:string,max:number)=>typeof data[key]==='string'&&data[key].length<=max?data[key].trim():'';
 const name=field('name',100),mobile=field('mobile',25),topic=field('topic',100),message=field('message',1500),email=field('email',254);
 if(!name||!isUsablePhone(mobile)||!topic||!message||data.consent!==true||(data.email&&!email)||(email&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)))return Response.json({error:'Please check the required fields.'},{status:400});
 if(data.website)return Response.json({error:'Unable to submit this request.'},{status:400});
 const input:LeadInput={name,mobile,email,topic,message,city:field('city',100),role:field('role',100),product:field('product',150),source:topic==='Dealer / distributor enquiry'?'dealer':'contact',form_name:'Contact form',source_page:sourcePage(request,data.source_page)};
 throttle('contact-phone:'+mobile.replace(/\D/g,''),8,3600000);
 const id=saveLead(input,key);return Response.json({id},{status:201,headers:{'Cache-Control':'no-store'}});
 }catch(error){return errorResponse(error instanceof DuplicateConflict?new HttpError(409,'Please start a new enquiry for changed details.'):error);}
}

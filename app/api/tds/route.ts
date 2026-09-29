import {tdsDocuments,hasDownloadableTds} from '@/lib/documents';
import {catalogProducts} from '@/lib/products';
import {isUsablePhone} from "@/lib/phone";
import {sourcePage} from '@/lib/server/lead-attribution';
import {saveLead,DuplicateConflict} from '@/lib/server/leads';
import {sameOrigin} from '@/lib/server/admin';
import {readBody,throttle,clientKey,submissionKey,HttpError,reportFailure} from '@/lib/server/request';
import {readFile} from 'node:fs/promises';
import path from 'node:path';
export const runtime='nodejs';
export async function POST(request:Request){
  if(!sameOrigin(request))return new Response('Forbidden',{status:403});
  try {
    throttle('submission-global',120);throttle('tds-ip:'+clientKey(request),process.env.LEADS_TRUST_PROXY==='true'?15:100);
    const key=submissionKey(request),body=await readBody(request,2048);
    let data;try{data=JSON.parse(body);}catch{throw new HttpError(400,'Invalid request.');}
    if(!data||typeof data.product!=='string'||!hasDownloadableTds(data.product)||typeof data.name!=='string'||data.name.trim().length<2||data.name.length>100||typeof data.mobile!=='string'||!isUsablePhone(data.mobile)||data.consent!==true||data.website)throw new HttpError(400,'Complete the required fields.');
    throttle('tds-phone:'+data.mobile.replace(/\D/g,''),8,3600000);
    const document=tdsDocuments[data.product];
    const product=catalogProducts.find(p=>p.slug===data.product)!;
    const file=await readFile(path.join(process.cwd(),'private/documents',document.file));
    saveLead({name:data.name.trim(),mobile:data.mobile,topic:'Technical document request',product:product.label,message:product.label+' TDS download',source:'tds',form_name:'TDS download form',source_page:sourcePage(request,data.source_page)},key);
    return new Response(file,{headers:{'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="${document.file}"`,'Cache-Control':'no-store'}});
  }catch(error){
    if(error instanceof HttpError)return new Response(error.message,{status:error.status,headers:{'Retry-After':String(error.retryAfter)}});
    if(error instanceof DuplicateConflict)return new Response('Please reopen the form and try again.',{status:409});
    reportFailure('tds_request_failed',error);return new Response('Document temporarily unavailable. Please try again.',{status:503});
  }
}

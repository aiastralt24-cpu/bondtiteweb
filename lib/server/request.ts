import 'server-only';
import { createHash, randomUUID } from 'node:crypto';
import { db } from './leads';
export class HttpError extends Error { constructor(public status:number,message:string,public retryAfter=60){super(message);} }
export async function readBody(request:Request,max=12000) {
  if(Number(request.headers.get('content-length'))>max) throw new HttpError(413,'Request too large.');
  const reader=request.body?.getReader();if(!reader)return '';
  const chunks:Uint8Array[]=[];let size=0;
  try {while(true){const {done,value}=await reader.read();if(done)break;size+=value.length;if(size>max){await reader.cancel();throw new HttpError(413,'Request too large.');}chunks.push(value);}}finally{reader.releaseLock();}
  return Buffer.concat(chunks).toString('utf8');
}
export function throttle(key:string,limit:number,window=60000) {
  const now=Date.now(),database=db();
  database.prepare('DELETE FROM rate_limits WHERE expires<?').run(now);
  const row=database.prepare('INSERT INTO rate_limits VALUES(?,1,?) ON CONFLICT(key) DO UPDATE SET count=count+1 RETURNING count,expires').get(createHash('sha256').update(key).digest('hex'),now+window);
  if(Number(row?.count)>limit) throw new HttpError(429,'Too many attempts. Please try again shortly.',Math.max(1,Math.ceil((Number(row?.expires)-now)/1000)));
}
export function clientKey(request:Request) {
  // Enable only behind a proxy that strips and overwrites X-Real-IP.
  return process.env.LEADS_TRUST_PROXY==='true' ? (request.headers.get('x-real-ip')||'unknown').slice(0,100) : 'shared';
}
export function submissionKey(request:Request) {
  const key=request.headers.get('idempotency-key')||undefined;
  if(key&&!/^[a-zA-Z0-9-]{16,100}$/.test(key))throw new HttpError(400,'Invalid submission reference.');
  return key;
}
export function reportFailure(event:string,error:unknown) {
  const reference=randomUUID();
  // No submitted data, credentials, SQL or error messages in logs.
  console.error(JSON.stringify({level:'error',event,reference,type:error instanceof Error?error.name:'Unknown',at:new Date().toISOString()}));
  return reference;
}
export function errorResponse(error:unknown) {
  if(error instanceof HttpError)return Response.json({error:error.message},{status:error.status,headers:{'Cache-Control':'no-store',...(error.status===429?{'Retry-After':String(error.retryAfter)}:{})}});
  const reference=reportFailure('lead_request_failed',error);
  return Response.json({error:'Unable to save right now. Please try again.',reference},{status:503,headers:{'Cache-Control':'no-store'}});
}

import {authenticate,makeSession,sameOrigin} from '@/lib/server/admin';
import {cookies} from 'next/headers';
import {readBody,throttle,clientKey,errorResponse} from '@/lib/server/request';
export const runtime='nodejs';
export async function POST(request:Request){
  if(!sameOrigin(request))return new Response('Forbidden',{status:403});
  try {
    throttle('login-global',100);throttle('login-ip:'+clientKey(request),20);
    const form=new URLSearchParams(await readBody(request,2048));
    const username=(form.get('username')||'admin').trim().toLowerCase(),password=form.get('password')||'';
    if(username.length>80||password.length>200)return new Response('Invalid credentials',{status:400});
    throttle('login-user:'+username,10);
    if(!authenticate(username,password))return Response.redirect(new URL('/admin/leads?error=1',request.url),303);
    (await cookies()).set('bondtite_admin',makeSession(username),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:8*60*60});
    return Response.redirect(new URL('/admin/leads',request.url),303);
  }catch(error){return errorResponse(error);}
}

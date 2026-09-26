import {sameOrigin,revokeSession} from '@/lib/server/admin';
export async function POST(request:Request){if(!sameOrigin(request))return new Response('Forbidden',{status:403});await revokeSession();return Response.redirect(new URL('/admin/leads',request.url),303);}

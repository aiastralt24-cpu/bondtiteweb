import {adminUser} from '@/lib/server/admin';
import {db} from '@/lib/server/leads';
import {errorResponse} from '@/lib/server/request';
export const dynamic='force-dynamic';
export async function GET(){try{if(!await adminUser())return new Response('Unauthorized',{status:401});db().prepare('SELECT 1').get();return Response.json({storage:'available',checkedAt:new Date().toISOString()},{headers:{'Cache-Control':'no-store'}});}catch(error){return errorResponse(error);}}

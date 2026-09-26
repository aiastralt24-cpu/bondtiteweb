import { bondMaterials } from './bond-matching';
export const advisorMaterials = [...bondMaterials, 'Acrylic', 'Fabric', 'Ceramic', 'PVC', 'ABS plastic', 'PE / PP plastic', 'Other / not sure'];
export const everydayJobs = [
  {id:'laminate',name:'Fix or fit a laminate',description:'Cabinet doors, desks and worktops',pairs:[['Laminate','Plywood'],['Laminate','MDF']]},
  {id:'furniture',name:'Build or repair furniture',description:'Chairs, cabinets and wooden joints',pairs:[['Wood','Wood'],['Plywood','Wood'],['MDF','Wood']]},
  {id:'panel',name:'Attach panels or trims',description:'Wall finishes and interior fittings',pairs:[['Laminate','Concrete'],['WPC','Plywood'],['Acrylic','Plywood']]},
  {id:'repair',name:'Repair an everyday object',description:'Ceramics, metal and household items',pairs:[['Ceramic','Ceramic'],['Metal','Metal'],['Glass','Metal']]},
  {id:'upholstery',name:'Make or repair upholstery',description:'Foam, fabric and seat cushions',pairs:[['Foam','Wood'],['Foam','Foam'],['Fabric','Foam']]},
  {id:'other',name:'Something else',description:'Describe a different project',pairs:[]}
];
export type Connection = {id:number; first:string; second:string};
export function suggestedJobs(connections: Connection[]) {
 return everydayJobs.filter(job=>job.pairs.some(([a,b])=>connections.some(c=>(c.first===a&&c.second===b)||(c.first===b&&c.second===a))));
}
export function connectionKey(c:Connection) {return [c.first,c.second].sort().join('|');}

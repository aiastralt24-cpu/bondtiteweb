// Reviewed against Astral product pages / TDS on 2026-09-26.
export const advisorJobs = [
 {id:'laminate',label:'Fit or repair laminate',detail:'Decorative sheets on furniture and cabinets'},
 {id:'wood',label:'Bond wooden furniture',detail:'Bare wood and wood-based boards'},
 {id:'foam',label:'Bond upholstery foam',detail:'Foam cushions and leather upholstery'},
 {id:'acrylic',label:'Fit an acrylic panel',detail:'Acrylic sheets on plywood or MDF'},
 {id:'other',label:'Another job',detail:'Household repairs, trims and other materials'}
];
export const materialHelp: Record<string,string> = {
 Metal:'A metal surface such as steel or aluminium; note any paint or coating.',Stone:'Natural stone such as marble or granite.',Ceramic:'Fired clay or tile; the joining area may be glazed or unglazed.',Plastic:'Check the item for a plastic type or recycling code.',Rubber:'A flexible rubber part; identify the type where possible.',Glass:'A glass surface; note any coating or mirror backing.',Fabric:'Woven or knitted textile, including upholstery fabric.',
 Wood:'Solid timber with a natural grain.',Plywood:'A board made from visible layers of wood.',MDF:'A smooth board with a fine, uniform fibre edge.',Laminate:'A thin decorative sheet fixed over a board.',Foam:'Soft cushioning used in seats and upholstery.',Leather:'Natural leather upholstery; synthetic coverings are a different material.',Acrylic:'A rigid plastic sheet used for decorative panels.'
};
export type AdvisorAnswer={job:string;first:string;second:string;condition:string};
export type AdvisorResult={slug:string;reason:string;method:string;source:string;alternative?:{slug:string;difference:string}};
const wood=['Wood','Plywood','MDF'];
export function materialsFor(job:string){return job==='laminate'?['Laminate',...wood]:job==='wood'?wood:job==='foam'?['Foam','Leather']:job==='acrylic'?['Acrylic','Plywood','MDF']:Object.keys(materialHelp);}
export function inferJob(first:string,second:string){const p=[first,second];if(p.includes('Laminate')&&p.some(m=>wood.includes(m)))return 'laminate';if(p.every(m=>wood.includes(m)))return 'wood';if(p.includes('Foam')&&p.every(m=>['Foam','Leather'].includes(m)))return 'foam';if(p.includes('Acrylic')&&p.some(m=>['Plywood','MDF'].includes(m)))return 'acrylic';return 'other';}
export function advise(a:AdvisorAnswer):AdvisorResult|null {
 const pair=[a.first,a.second];
 if(!a.first||!a.second||inferJob(a.first,a.second)!==a.job)return null;
 if(['wood','laminate'].includes(a.job)){
  if(!['dry','moisture'].includes(a.condition))return null;
  if(a.condition==='moisture')return {slug:'bondtite-hydra',reason:`For ${a.first.toLowerCase()} and ${a.second.toLowerCase()} furniture exposed to moisture. Astral lists Hydra+ for kitchen and bathroom woodworking.`,method:'Clean both surfaces, apply undiluted, and hold the joint under pressure until dry.',source:'https://www.astraladhesives.com/bondtite-hydra.html'};
  return {slug:'bondtite-deluxe',reason:`For ${a.first.toLowerCase()} and ${a.second.toLowerCase()} in everyday indoor woodworking. Deluxe is a ready-to-use, water-resistant PVA adhesive.`,method:'Clean the surfaces. Apply undiluted, coating the less porous surface first, then press and hold.',source:'https://www.astraladhesives.com/bondtite-deluxe.html',alternative:{slug:'bondtite-hydra',difference:'Hydra+ is also listed for these woodworking materials, with fast-setting and anti-bubble technology.'}};
 }
 if(a.job==='foam'&&pair.includes('Foam'))return {slug:'bondtite-foambond',reason:'Astral’s Foambond SR technical sheet explicitly lists foam-to-foam and foam-to-leather upholstery bonding.',method:'Apply a thin coat to both clean surfaces. Allow the solvent to evaporate until tacky, then join with even pressure.',source:'https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_foam_bond_sr.pdf'};
 if(a.job==='acrylic')return {slug:'bondtite-acrylic-fix',reason:'Acrylic Fix is specifically designed for acrylic sheets on plywood and MDF panels.',method:'Apply evenly to the base board, allow the specified open time, then join and maintain even pressure.',source:'https://www.astraladhesives.com/bondtite-acrylic-fix.html'};
 return null;
}

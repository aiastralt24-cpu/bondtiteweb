// Reviewed against Astral product pages / TDS on 2026-09-29.
export const advisorJobs = [
 {id:'laminate',label:'Fit or repair laminate',detail:'Decorative sheets on furniture and cabinets'},
 {id:'wood',label:'Bond wooden furniture',detail:'Bare wood and wood-based boards'},
 {id:'foam',label:'Bond upholstery foam',detail:'Foam cushions and leather upholstery'},
 {id:'acrylic',label:'Fit an acrylic panel',detail:'Acrylic sheets on plywood or MDF'},
 {id:'other',label:'Another job',detail:'Household repairs, trims and other materials'}
];
export const materialHelp: Record<string,string> = {
 PVC:'Rigid PVC sheet or board, including edge banding.',WPC:'Wood-plastic composite board.',HDHMR:'High-density moisture-resistant fibreboard.',ABS:'A rigid plastic marked ABS.',Polycarbonate:'A rigid plastic marked PC or polycarbonate.',Rexine:'A synthetic upholstery covering.',
 Metal:'A metal surface such as steel or aluminium; note any paint or coating.',Stone:'Natural stone such as marble or granite.',Ceramic:'Fired clay or tile; the joining area may be glazed or unglazed.',Plastic:'Check the item for a plastic type or recycling code.',Rubber:'A flexible rubber part; identify the type where possible.',Glass:'A glass surface; note any coating or mirror backing.',Fabric:'Woven or knitted textile, including upholstery fabric.',
 Wood:'Solid timber with a natural grain.',Plywood:'A board made from visible layers of wood.',MDF:'A smooth board with a fine, uniform fibre edge.',Laminate:'A thin decorative sheet fixed over a board.',Foam:'Soft cushioning used in seats and upholstery.',Leather:'Natural leather upholstery; synthetic coverings are a different material.',Acrylic:'A rigid plastic sheet used for decorative panels.'
};
export type AdvisorAnswer={job:string;first:string;second:string;condition:string};
export type AdvisorResult={slug:string;reason:string;method:string;source:string;alternative?:{slug:string;difference:string}};
const wood=['Wood','Plywood','MDF'];
export function materialsFor(job:string){return job==='laminate'?['Laminate',...wood]:job==='wood'?wood:job==='foam'?['Foam','Leather']:job==='acrylic'?['Acrylic','Plywood','MDF']:Object.keys(materialHelp);}
export function inferJob(first:string,second:string){const p=[first,second];if(p.includes('Laminate')&&p.some(m=>wood.includes(m)))return 'laminate';if(p.every(m=>wood.includes(m)))return 'wood';if(p.includes('Foam')&&p.every(m=>['Foam','Leather','Rexine','Wood','Metal'].includes(m)))return 'foam';if(p.includes('Acrylic')&&p.some(m=>['Plywood','MDF','HDHMR','WPC'].includes(m)))return 'acrylic';if(p.includes('PVC')&&p.some(m=>['Plywood','MDF','HDHMR'].includes(m)))return 'pvc';if(p.includes('WPC')&&p.some(m=>['Laminate','Veneer','Metal','Glass','PVC','Wood'].includes(m)))return 'wpc';return 'other';}
export function advise(a:AdvisorAnswer):AdvisorResult|null {
 const pair=[a.first,a.second];
 if(!['dry','moisture'].includes(a.condition))return null;
 if(a.condition==='moisture'&&!['wood','laminate'].includes(a.job))return null;
 if(!a.first||!a.second||inferJob(a.first,a.second)!==a.job)return null;
 if(['wood','laminate'].includes(a.job)){
  if(!['dry','moisture'].includes(a.condition))return null;
  if(a.condition==='moisture')return {slug:'bondtite-hydra',reason:`For ${a.first.toLowerCase()} and ${a.second.toLowerCase()} furniture exposed to moisture. Astral lists Hydra+ for kitchen and bathroom woodworking.`,method:'Clean both surfaces, apply undiluted, and hold the joint under pressure until dry.',source:'https://www.astraladhesives.com/bondtite-hydra.html',alternative:{slug:'bondtite-aqua',difference:'Aqua is another waterproof PVA option listed for these furniture materials.'}};
  return {slug:'bondtite-deluxe',reason:`For ${a.first.toLowerCase()} and ${a.second.toLowerCase()} in everyday indoor woodworking. Deluxe is a ready-to-use, water-resistant PVA adhesive.`,method:'Clean the surfaces. Apply undiluted, coating the less porous surface first, then press and hold.',source:'https://www.astraladhesives.com/bondtite-deluxe.html',alternative:{slug:'bondtite-hydra',difference:'Hydra+ is also listed for these woodworking materials, with fast-setting and anti-bubble technology.'}};
 }
 if(a.job==='foam'&&pair.includes('Foam'))return {slug:'bondtite-foambond',reason:'Astral lists Foambond for bonding foam to foam, rexine, wood, metal and leather in upholstery.',method:'Apply a thin coat to both clean surfaces. Allow the solvent to evaporate until tacky, then join with even pressure.',source:'https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_foam_bond_sr.pdf'};
 if(a.job==='acrylic')return {slug:'bondtite-acrylic-fix',reason:'Acrylic Fix is designed for acrylic sheets on plywood, MDF, HDHMR and WPC panels. Horizontal application only.',method:'Apply evenly to the base board, allow the specified open time, then join and maintain even pressure.',source:'https://www.astraladhesives.com/bondtite-acrylic-fix.html'};
 if(a.job==='pvc')return {slug:'bondtite-pvc-bond',reason:'PVC Bond is designed for PVC sheet lamination and edge banding on wood-based boards.',method:'For sheet lamination, spread on both surfaces; for edge banding, apply to the board edge. Join while wet and maintain pressure until dry.',source:'https://www.astraladhesives.com/bondtite-pvc-bond.html'};
 if(a.job==='wpc')return {slug:'bondtite-wpc-fix',reason:'WPC Fix is listed for WPC boards bonded to laminate, wood, metal, glass and PVC.',method:'Roughen the WPC, spread evenly and allow 8–10 minutes open time. Follow the product instructions for moisture preparation and pressing. Use for horizontal application.',source:'https://www.astraladhesives.com/bondtite-wpc-fix.html'};
 if(pair.every(m=>m==='Glass'))return {slug:'bondtite-fast-and-clear',reason:'Fast and Clear explicitly supports transparent glass-to-glass bonds.',method:'Wash, rinse and dry the glass. Mix equal volumes of resin and hardener thoroughly for one minute, then apply and assemble.',source:'https://www.astraladhesives.com/bondtite-fast-and-clear.html',alternative:{slug:'bondtite-strong-and-clear',difference:'Strong and Clear offers a longer pot life for alignment, with a transparent finish.'}};
 if(pair.every(m=>m==='Metal'))return {slug:'bondtite-super-strength',reason:'Super Strength is listed for metal-to-metal bonding in fabrication and repair.',method:'Clean, degrease and roughen the surfaces. Mix equal volumes thoroughly, apply and clamp for 24 hours.',source:'https://www.astraladhesives.com/bondtite-super-strength.html'};
 if(pair.every(m=>m==='Ceramic'))return {slug:'bondtite-rapid',reason:'Rapid is an epoxy listed for ceramic repairs with a 10-minute setting time.',method:'Clean and dry the pieces, mix equal volumes for one minute and assemble promptly. Allow 24 hours for full cure.',source:'https://www.astraladhesives.com/bondtite-rapid.html'};
 if(pair.every(m=>['ABS','Polycarbonate'].includes(m)))return {slug:'bondtite-uniweld',reason:'Uniweld lists ABS and polycarbonate among the rigid plastics it bonds.',method:'Clean and roughen the surfaces. Apply equal quantities of part A and B to opposing surfaces, bring together, rub and clamp for 20 minutes.',source:'https://www.astraladhesives.com/bondtite-uniweld.html'};
 return null;
}

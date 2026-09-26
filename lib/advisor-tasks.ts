export type TaskId = 'repair'|'build'|'laminate'|'kitchen'|'foam'|'acrylic'|'custom';
export const advisorTasks = [
  {id:'repair',label:'A loose chair joint',description:'Repair wooden furniture',job:'wood',first:'Wood',prompt:'Are both joining surfaces bare wood?'},
  {id:'build',label:'Build wooden furniture',description:'Join timber and boards',job:'wood',first:'',prompt:'Which materials are you joining?'},
  {id:'laminate',label:'Fit a laminate sheet',description:'Finish a desk or cabinet',job:'laminate',first:'Laminate',prompt:'What is the laminate going onto?'},
  {id:'kitchen',label:'Kitchen cabinet laminate',description:'A finish for a kitchen or bathroom',job:'laminate',first:'Laminate',prompt:'What is the laminate going onto?'},
  {id:'foam',label:'Make a sofa cushion',description:'Bond upholstery foam',job:'foam',first:'Foam',prompt:'What are you bonding the foam to?'},
  {id:'acrylic',label:'Fit an acrylic panel',description:'Fix an acrylic sheet to a board',job:'acrylic',first:'Acrylic',prompt:'What is the acrylic sheet going onto?'}
] as const;
export function recogniseTask(text:string):TaskId {
  const value=text.toLowerCase().replace(/[^a-z0-9\s]/g,' ');
  // Recognise common job descriptions; do not infer material compatibility from prose.
  if(/\b(not|isn t|isnt|without|except)\b/.test(value))return 'custom';
  const matches:TaskId[]=[];
  if(/\b(laminate|lamination|sunmica)\b/.test(value))matches.push(/\b(kitchen|bathroom)\b/.test(value)?'kitchen':'laminate');
  if(/\bacrylic\b/.test(value))matches.push('acrylic');
  if(/\b(foam|cushion|upholstery)\b/.test(value))matches.push('foam');
  if(/\b(chair|joint)\b/.test(value)&&/\b(loose|repair|fix|broken|broke|wobbly)\b/.test(value))matches.push('repair');
  if(!matches.length&&/\b(wood|wooden|timber|plywood|mdf)\b/.test(value)&&/\b(build|make|join|bond|furniture)\b/.test(value))matches.push('build');
  return matches.length===1?matches[0]:'custom';
}

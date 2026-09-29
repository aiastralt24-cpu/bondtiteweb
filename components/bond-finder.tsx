"use client";
import {useStateMotion} from '@/components/use-state-motion';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {AdvisorChips} from '@/components/advisor-chips';
import {ProductPack} from '@/components/product-pack';
import {catalogProducts,getProductPath} from '@/lib/products';
import {materialHelp,inferJob,advise} from '@/lib/advisor-rules';
import {advisorTasks,type TaskId} from '@/lib/advisor-tasks';
import type {BondFinderData} from '@/lib/types';

const materials=Object.keys(materialHelp).map(value=>({value,label:value}));
const environments=[{value:'dry',label:'Inside, away from water'},{value:'moisture',label:'Kitchen or bathroom furniture'},{value:'other',label:'Outside / another setting'}];
export function BondFinder({finder}:{finder:BondFinderData}){
 const [description,setDescription]=useState(''),[taskId,setTaskId]=useState<TaskId|null>(null),[first,setFirst]=useState(''),[second,setSecond]=useState(''),[condition,setCondition]=useState('');
 const restorePosition=useRef(false);
 const [restored,setRestored]=useState(false);
 useEffect(()=>{
  const frame=requestAnimationFrame(()=>{
  try { const saved=JSON.parse(sessionStorage.getItem('bondtite-advisor')||'null');
   if(saved && (saved.taskId==='custom'||advisorTasks.some(t=>t.id===saved.taskId))) {
    const valid=(v:string)=>v===''||v==='Other / not sure'||Object.hasOwn(materialHelp,v);
    if(valid(saved.first)&&valid(saved.second)&&['','dry','moisture','other'].includes(saved.condition)) {
     restorePosition.current=true;setTaskId(saved.taskId);setDescription(saved.taskId==='custom'?'Choose by materials':advisorTasks.find(t=>t.id===saved.taskId)?.label||'');setFirst(saved.first);setSecond(saved.second);setCondition(saved.condition);
    }
   }
  } catch { /* Storage may be unavailable. The advisor still works. */ }
  setRestored(true);
  });return()=>cancelAnimationFrame(frame);
 },[]);
 useEffect(()=>{if(!restored)return;try {sessionStorage.setItem('bondtite-advisor',JSON.stringify({taskId,first,second,condition}));}catch{}},[restored,taskId,first,second,condition]);
 const answer=useRef<HTMLElement>(null);
 useEffect(()=>{if(!restored||!restorePosition.current)return;restorePosition.current=false;const frame=requestAnimationFrame(()=>{answer.current?.focus({preventScroll:true});answer.current?.scrollIntoView({block:'center',behavior:'instant'});});return()=>cancelAnimationFrame(frame);},[restored]);
 const question=useRef<HTMLDivElement>(null),materialEntry=useRef<HTMLButtonElement>(null);
 const task=advisorTasks.find(t=>t.id===taskId),job=inferJob(first,second);
 const pairReady=!!first&&!!second,needsCondition=pairReady&&!['Other / not sure'].includes(first)&&!['Other / not sure'].includes(second);
 const result=pairReady&&(!needsCondition||condition)?advise({job,first,second,condition}):null;
 useStateMotion(answer,`${taskId}:${first}:${second}:${condition}`);
 const product=catalogProducts.find(p=>p.slug===result?.slug);
 const finished=pairReady&&(!needsCondition||!!condition);
 const unknown=first==='Other / not sure'||second==='Other / not sure';
 const conditionLabel=environments.find(e=>e.value===condition)?.label;
 const summary=`Task: ${description||task?.label||'Help choosing an adhesive'}\nSurfaces: ${first||'Not chosen'} + ${second||'Not chosen'}${needsCondition&&conditionLabel?`\nLocation: ${conditionLabel}`:''}`;
 const contact='/contact?request=product-selection&project='+encodeURIComponent(summary);
 function begin(id:TaskId,text?:string){const chosen=advisorTasks.find(t=>t.id===id);setTaskId(id);setDescription(text??chosen?.label??description);setFirst(chosen?.first||'');setSecond('');setCondition(id==='kitchen'?'moisture':'');requestAnimationFrame(()=>question.current?.focus());}
 function changeFirst(value:string){setFirst(value);setSecond('');setCondition('');}
 function reset(){setTaskId(null);setFirst('');setSecond('');setCondition('');requestAnimationFrame(()=>materialEntry.current?.focus());}
 const surfaceOptions=task?.job==='laminate'||task?.job==='acrylic'?materials.filter(m=>(task.job==='acrylic'?['Plywood','MDF','HDHMR','WPC']:['Wood','Plywood','MDF']).includes(m.value)):task?.job==='foam'?['Foam','Leather','Rexine','Wood','Metal'].map(value=>({value,label:value})):materials;
 return <section className={`task-advisor${taskId?' is-working':''}`} aria-label={finder.title}><div className="container">
  <header className="task-advisor__intro"><span className="mono">Bondtite product advisor</span><h1>A little help.<br/><span>A better bond.</span></h1><p>Choose your materials or a familiar job. Find a product and how to put it to work.</p></header>
  <div className={`task-advisor__workspace${taskId?' is-active':''}`}>
   <div className="task-advisor__conversation">
    {!taskId?<><button type="button" ref={materialEntry} className="task-advisor__material-entry" onClick={()=>begin('custom','Choose by materials')}><span>Already know your materials?</span><strong>Choose materials</strong></button><div className="task-advisor__examples"><p>Or start with something familiar</p><div>{advisorTasks.map((item,index)=><button type="button" key={item.id} onClick={()=>begin(item.id)}><span className="task-advisor__example-number" aria-hidden="true">0{index+1}</span><span><strong>{item.label}</strong><small>{item.description}</small></span></button>)}</div></div></>:<>
     <div className="task-advisor__task"><span className="mono">Your task</span><p>{description}</p><button type="button" className="task-advisor__text" onClick={reset}>Change task</button></div>
     <div className="task-advisor__questions" ref={question} tabIndex={-1}>
      <span className="task-advisor__eyebrow">{task?'Let’s get the surfaces right':'Let’s start with the materials'}</span>
      <h2>{task?.prompt||'What are the two surfaces?'}</h2>
      <p>{taskId==='repair'?'Choose the surfaces at the joint, rather than the finish around it.':taskId==='custom'?'Pick the materials where the adhesive will go.':taskId==='foam'?'Choose the material touching the foam.':'Choose the board or material underneath.'}</p>
      {taskId==='repair'?<AdvisorChips label="Joining surfaces" value={second==='Wood'?'bare':second?'other':''} options={[{value:'bare',label:'Both are bare wood'},{value:'other',label:'Painted, coated or another material'}]} onChange={v=>{setFirst('Wood');setSecond(v==='bare'?'Wood':'Other / not sure');setCondition('');}}/>:<>
       {(!task||taskId==='build')&&<AdvisorChips label="First surface" value={first} options={[...materials.filter(m=>taskId!=='build'||['Wood','Plywood','MDF'].includes(m.value)),{value:'Other / not sure',label:'Something else / not sure'}]} onChange={changeFirst}/>}
       {first&&<AdvisorChips label={task?.first?`${first} is joining to`:'Second surface'} value={second} options={[...(taskId==='build'?materials.filter(m=>['Wood','Plywood','MDF'].includes(m.value)):surfaceOptions),{value:'Other / not sure',label:taskId==='foam'?'Fabric or another material':'Something else / not sure'}]} onChange={v=>{setSecond(v);if(taskId!=='kitchen')setCondition('');}}/>}
      </>}
      <details className="task-advisor__materials"><summary>Help me identify the material</summary><dl>{Object.entries(materialHelp).map(([name,help])=><div key={name}><dt>{name}</dt><dd>{help}</dd></div>)}</dl></details>
      {pairReady&&needsCondition&&<div className="task-advisor__location"><h3>Where will it be used?</h3><AdvisorChips label="Finished item location" value={condition} options={environments} onChange={setCondition}/></div>}
     </div>
    </>}
   </div>
   <aside ref={answer} tabIndex={-1} className="task-advisor__answer" aria-label="Your product guidance">
    {!taskId?<div className="task-advisor__welcome"><span className="mono">From your task to the right product</span><div className="task-advisor__bond-mark" aria-hidden="true"><span/><span/></div><h2>Start with the job.<br/>We’ll help with the bond.</h2><p>A couple of details connect your materials to the right product guidance.</p><ul><li>One clear product recommendation</li><li>A reason that relates to your job</li><li>Practical application guidance</li></ul></div>:<>
     <div role="status" className="task-advisor__live">{product?'Your recommendation is ready.':finished?'Let’s take a closer look at this job.':pairReady?'One more detail: where will it be used?':'Choose the joining surfaces to see your recommendation.'}</div>
     {product&&result?<article className="task-advisor__product"><div className="task-advisor__product-top"><div><span className="mono">For these materials</span><h2>{product.label}</h2><p>{first} + {second}</p></div><ProductPack product={product}/></div><div className="task-advisor__why"><h3>Why this one?</h3><p>{result.reason}</p></div><div className="task-advisor__method"><h3>Putting it to work</h3><p>{result.method}</p></div><Link className="button button--primary" href={getProductPath(product)}>See product & full instructions</Link>{result.alternative && (()=>{const alternative=catalogProducts.find(p=>p.slug===result.alternative?.slug);return alternative?<div className="task-advisor__why"><h3>Another option</h3><p>{result.alternative.difference}</p><Link href={getProductPath(alternative)}>Explore {alternative.label}</Link></div>:null;})()}<a className="task-advisor__source" href={result.source} target="_blank" rel="noreferrer">Based on Astral product guidance</a>{['wood','laminate'].includes(job)&&<div className="task-advisor__adjust"><span>Different conditions?</span><button type="button" onClick={()=>setCondition(condition==='dry'?'moisture':'dry')}>{condition==='dry'?'It’s for kitchen or bathroom furniture':'It will stay dry indoors'}</button></div>}</article>:finished?<div className="task-advisor__handoff"><h2>{unknown?'Let’s identify that surface.':'Let’s look at your exact application.'}</h2><p>{unknown?'Tell our team what the item is made of and whether the joining area is coated. Your task and answers are already included.':'Share where the bond will be used and what it needs to hold. Your task and materials will go with your enquiry.'}</p><Link className="button button--primary" href={contact}>Get help with this job</Link><button type="button" className="task-advisor__text" onClick={reset}>Try a different task</button></div>:<div className="task-advisor__preview"><span className="mono">Your bond, taking shape</span><h2>{pairReady?`${first} meets ${second}.`:task?.first?`Let’s work with ${task.first.toLowerCase()}.`:'Every good bond starts at the surface.'}</h2><p>{pairReady?'The setting helps us match the product to how the finished item will be used.':taskId==='repair'?'The surfaces at the joint help us choose the adhesive.':taskId==='foam'?'Foam to foam and foam to natural leather have specific product guidance.':'A material name is enough to start. Use the material guide if you’re unsure.'}</p></div>}
     {(first||second)&&<div className="task-advisor__summary"><span className="mono">Your answers</span><p>{first||'First surface'} <span>+</span> {second||'Choose the second surface'}</p>{needsCondition&&conditionLabel&&<small>{conditionLabel}</small>}<span className="task-advisor__editable">Change any answer to update this guidance.</span></div>}
     {product&&<Link className="task-advisor__human" href={contact}>Want to talk it through? Ask our team</Link>}
    </>}
   </aside>
  </div><footer className="task-advisor__footer"><span>Made for real jobs. Grounded in product guidance.</span><Link href="/products">Browse all products</Link></footer>
 </div></section>;
}

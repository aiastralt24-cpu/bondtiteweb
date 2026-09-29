"use client";
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {AdvisorChips} from '@/components/advisor-chips';
import {ProductPack} from '@/components/product-pack';
import {catalogProducts,getProductPath} from '@/lib/products';
import {materialHelp,inferJob,advise} from '@/lib/advisor-rules';
import {advisorTasks,type TaskId} from '@/lib/advisor-tasks';
import type {BondFinderData} from '@/lib/types';

const common=['Wood','Plywood','MDF','Laminate','Metal','Plastic','Rubber','Glass'];
const materials=[...common,...Object.keys(materialHelp).filter(value=>!common.includes(value))].map(value=>({value,label:value}));
const unsure={value:'Other / not sure',label:'Not sure'};
const environments=[{value:'dry',label:'Inside, away from water'},{value:'moisture',label:'Kitchen or bathroom furniture'},{value:'other',label:'Outside / another setting'}];
export function BondFinder({finder}:{finder:BondFinderData}){
 const [taskId,setTaskId]=useState<TaskId|null>(null),[first,setFirst]=useState(''),[second,setSecond]=useState(''),[condition,setCondition]=useState(''),[step,setStep]=useState(0),[restored,setRestored]=useState(false);
 const heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{
  const frame=requestAnimationFrame(()=>{
   try {const saved=JSON.parse(sessionStorage.getItem('bondtite-advisor')||'null');
    const valid=(v:unknown)=>typeof v==='string'&&(v===''||v===unsure.value||Object.hasOwn(materialHelp,v));
    if(saved&&(saved.taskId==='custom'||advisorTasks.some(t=>t.id===saved.taskId))&&valid(saved.first)&&valid(saved.second)&&['','dry','moisture','other'].includes(saved.condition)){
     setTaskId(saved.taskId);setFirst(saved.first);setSecond(saved.second);setCondition(saved.condition);
     // Restore answers without moving the viewport or skipping past the question.
     setStep(1);
    }
   }catch{/* The advisor also works without storage. */}
   setRestored(true);
  });return()=>cancelAnimationFrame(frame);
 },[]);
 useEffect(()=>{if(restored)try{sessionStorage.setItem('bondtite-advisor',JSON.stringify({taskId,first,second,condition}));}catch{}},[restored,taskId,first,second,condition]);
 const task=advisorTasks.find(t=>t.id===taskId),job=inferJob(first,second);
 const pairReady=!!first&&!!second,unknown=first===unsure.value||second===unsure.value;
 const result=pairReady&&(unknown||condition)?advise({job,first,second,condition}):null;
 const product=catalogProducts.find(p=>p.slug===result?.slug);
 const alternative=catalogProducts.find(p=>p.slug===result?.alternative?.slug);
 const conditionLabel=environments.find(e=>e.value===condition)?.label;
 const summary=`Task: ${task?.label||'Choose by materials'}\nSurfaces: ${first} + ${second}${conditionLabel?`\nLocation: ${conditionLabel}`:''}`;
 const contact='/contact?request=product-selection&project='+encodeURIComponent(summary);
 function go(next:number){setStep(next);requestAnimationFrame(()=>{heading.current?.focus({preventScroll:true});heading.current?.closest('.task-advisor__workspace')?.scrollIntoView({block:'start',behavior:'instant'});});}
 function chooseTask(id:TaskId){if(id===taskId)return;setTaskId(id);setFirst(advisorTasks.find(t=>t.id===id)?.first||'');setSecond('');setCondition(id==='kitchen'?'moisture':'');}
 function changeFirst(value:string){setFirst(value);setSecond('');setCondition('');}
 function restart(){setTaskId(null);setFirst('');setSecond('');setCondition('');go(0);}
 const surfaceOptions=task?.job==='laminate'||task?.job==='acrylic'?materials.filter(m=>(task.job==='acrylic'?['Plywood','MDF','HDHMR','WPC']:['Wood','Plywood','MDF']).includes(m.value)):task?.job==='foam'?['Foam','Leather','Rexine','Wood','Metal'].map(value=>({value,label:value})):taskId==='build'?materials.filter(m=>['Wood','Plywood','MDF'].includes(m.value)):materials;
 const titles=['What are you working on?',task?.prompt||'Which materials are you joining?','Where will it be used?',product?'Your product recommendation':'Let’s help you choose'];
 return <section className="task-advisor" aria-label={finder.title}><div className="container">
  <header className="task-advisor__intro"><span className="mono">Bondtite product advisor</span><h1>Find the right bond.</h1><p>A few simple choices. A product for your job.</p></header>
  <div className="task-advisor__workspace">
   <ol className="task-advisor__steps" aria-label="Your progress">{['Job','Materials','Location','Result'].map((label,index)=><li key={label} aria-current={step===index?'step':undefined} className={index<step?'is-complete':''}><span aria-hidden="true">{index<step?'✓':index+1}</span>{label}</li>)}</ol>
   <div className="task-advisor__panel">
    <div className="task-advisor__panel-heading"><p className="task-advisor__eyebrow">{step===3?'Your result':`Step ${step+1} of 3`}</p><h2 ref={heading} tabIndex={-1}>{titles[step]}</h2>{step===1&&task&&<p>{task.label}</p>}</div>
    {step===0&&<><div className="task-advisor__jobs" role="radiogroup" aria-label="Your job">{advisorTasks.map(item=><label key={item.id} className="task-advisor__job"><input type="radio" name="advisor-job" checked={taskId===item.id} onChange={()=>chooseTask(item.id)}/><span><strong>{item.label}</strong><small>{item.description}</small></span></label>)}</div><label className="task-advisor__job task-advisor__custom"><input type="radio" name="advisor-job" checked={taskId==='custom'} onChange={()=>chooseTask('custom')}/><span><strong>Something else</strong><small>I’ll choose the two materials</small></span></label></>}
    {step===1&&<>
     {taskId==='repair'?<AdvisorChips label="Joining surfaces" value={second==='Wood'?'bare':second?'other':''} options={[{value:'bare',label:'Both are bare wood'},{value:'other',label:'Painted, coated or another material'}]} onChange={v=>{setFirst('Wood');setSecond(v==='bare'?'Wood':unsure.value);setCondition('');}}/>:<div className="task-advisor__surfaces">
      {(!task||taskId==='build')&&<AdvisorChips compact label="First material" value={first} options={[...(taskId==='build'?surfaceOptions:materials),unsure]} onChange={changeFirst}/>}
      {(first||!task)&&<AdvisorChips compact label={task?.first?`${first} is joining to`:'Second material'} value={second} options={[...surfaceOptions,unsure]} onChange={v=>{setSecond(v);setCondition(taskId==='kitchen'?'moisture':'');}}/>}
     </div>}
     <details className="task-advisor__materials"><summary>Not sure what your material is?</summary><dl>{Object.entries(materialHelp).map(([name,help])=><div key={name}><dt>{name}</dt><dd>{help}</dd></div>)}</dl></details>
    </>}
    {step===2&&<><p className="task-advisor__pair">{first} + {second}</p><AdvisorChips label="Choose the closest setting" value={condition} options={environments} onChange={setCondition}/></>}
    {step===3&&<>
     <div className="task-advisor__answers"><span>{first} + {second}{!unknown&&conditionLabel?` · ${conditionLabel}`:''}</span><button type="button" onClick={()=>go(1)}>Edit answers</button></div>
     {product&&result?<article className="task-advisor__product"><div className="task-advisor__product-top"><ProductPack product={product}/><div><h3>{product.label}</h3><p>{result.reason}</p><Link className="button button--primary" href={getProductPath(product)}>View product</Link></div></div><details className="task-advisor__details"><summary>How to use it</summary><p>{result.method}</p><Link href={getProductPath(product)}>Read the full product instructions</Link></details>{alternative&&result.alternative&&<details className="task-advisor__details"><summary>Another option: {alternative.label}</summary><p>{result.alternative.difference}</p><Link href={getProductPath(alternative)}>View {alternative.label}</Link></details>}<a className="task-advisor__source" href={result.source} target="_blank" rel="noreferrer">Based on Astral product guidance</a><Link className="task-advisor__human" href={contact}>Have a question? Talk to our team</Link></article>:<div className="task-advisor__handoff"><p>{unknown?'Our team can help identify your material and find a product for the job.':'Our team can help with this combination of materials and setting.'} Your answers are included in your enquiry.</p><Link className="button button--primary" href={contact}>Help me choose</Link></div>}
    </>}
    <div className="task-advisor__actions">{step>0?<button type="button" className="task-advisor__back" onClick={()=>go(step===3&&unknown?1:step-1)}>Back</button>:<span/>}{step<3?<button type="button" className="button button--primary" disabled={step===0?!taskId:step===1?!pairReady:!condition} onClick={()=>go(step===1&&unknown?3:step+1)}>{step===2?'Show my product':step===1&&unknown?'Get help':'Continue'}</button>:<button type="button" className="task-advisor__back" onClick={restart}>Start again</button>}</div>
   </div>
  </div><footer className="task-advisor__footer"><Link href="/products">Browse all products</Link></footer>
 </div></section>;
}

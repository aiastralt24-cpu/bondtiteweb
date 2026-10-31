"use client";
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { AdvisorJobIcon } from '@/components/advisor-job-icon';
import { AdvisorChips } from '@/components/advisor-chips';
import { ProductPack } from '@/components/product-pack';
import { catalogProducts, getProductPath } from '@/lib/products';
import { advisorTasks, type TaskId } from '@/lib/advisor-tasks';
import { compatibleMaterials, matchingProducts, selectorMaterials, selectorMaterialLabel, selectorProductSlug } from '@/lib/product-selector';
import { selectorGuidance } from '@/lib/selector-guidance';
import { tdsDocuments } from '@/lib/documents';
import type { BondFinderData } from '@/lib/types';

const storageKey = 'bondtite-selector-v2';
const materials = selectorMaterials.map(value => ({ value, label: selectorMaterialLabel(value) }));
const productsBySlug = new Map(catalogProducts.map(product => [product.slug, product]));

export function BondFinder({ finder, embedded = false }: { finder: BondFinderData; embedded?: boolean }) {
  const Title = embedded ? "h2" : "h1";
  const [taskId, setTaskId] = useState<TaskId | null>(null);
  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [step, setStep] = useState(0);
  const [restored, setRestored] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(sessionStorage.getItem(storageKey) || 'null');
        if (saved && (saved.taskId === 'custom' || advisorTasks.some(task => task.id === saved.taskId)) && selectorMaterials.includes(saved.first)) {
          setTaskId(saved.taskId);
          setFirst(saved.first);
          setSecond(matchingProducts(saved.first, saved.second).length ? saved.second : '');
          setStep(1);
        }
      } catch { /* The selector also works without storage. */ }
      setRestored(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (restored) try { sessionStorage.setItem(storageKey, JSON.stringify({ taskId, first, second })); } catch { /* Storage is optional. */ }
  }, [restored, taskId, first, second]);

  const task = advisorTasks.find(item => item.id === taskId);
  const results = matchingProducts(first, second);
  const secondOptions = compatibleMaterials(first).map(value => ({ value, label: selectorMaterialLabel(value) }));
  const pairLabel = `${selectorMaterialLabel(first)} + ${selectorMaterialLabel(second)}`;
  const contact = '/contact?request=product-selection&project=' + encodeURIComponent(`Task: ${task?.label || 'Choose by materials'}\nSurfaces: ${pairLabel}\nApplication: Bonding`);

  function go(next: number) {
    setStep(next);
    requestAnimationFrame(() => {
      heading.current?.focus({ preventScroll: true });
      heading.current?.closest('.task-advisor__workspace')?.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
  }
  function chooseTask(id: TaskId) {
    setTaskId(id);
    setFirst(advisorTasks.find(item => item.id === id)?.first || '');
    setSecond('');
  }
  function restart() { setTaskId(null); setFirst(''); setSecond(''); go(0); }

  return <section id={embedded ? "product-finder" : undefined} className={`task-advisor${embedded ? " task-advisor--home" : ""}`} aria-label={finder.title}><div className="container">
    <header className="task-advisor__intro">{!embedded && <span className="mono">Bondtite product advisor</span>}<Title>Find the right bond.</Title><p>Choose your materials. Compare products for your job.</p></header>
    <div className="task-advisor__workspace">
      <ol className="task-advisor__steps" aria-label="Your progress">{['Job', 'Materials', 'Products'].map((label, index) => <li key={label} aria-current={step === index ? 'step' : undefined} className={index < step ? 'is-complete' : ''}><span aria-hidden="true">{index < step ? '✓' : index + 1}</span>{label}</li>)}</ol>
      <div className="task-advisor__panel">
        <div className="task-advisor__panel-heading"><p className="task-advisor__eyebrow">{step === 2 ? 'Your results' : `Step ${step + 1} of 3`}</p><h2 ref={heading} tabIndex={-1}>{['What are you working on?', 'Which materials are you joining?', 'Your recommended products'][step]}</h2>{step === 1 && task && <p>{task.label}</p>}</div>
        {step === 0 && <>
          <div className="task-advisor__jobs" role="radiogroup" aria-label="Your job">{advisorTasks.map(item => <label key={item.id} className="task-advisor__job"><input type="radio" name="advisor-job" checked={taskId === item.id} onChange={() => chooseTask(item.id)} />{embedded && <AdvisorJobIcon job={item.id} />}<span><strong>{item.label}</strong><small>{item.description}</small></span></label>)}</div>
          <label className="task-advisor__job task-advisor__custom"><input type="radio" name="advisor-job" checked={taskId === 'custom'} onChange={() => chooseTask('custom')} /><span><strong>Something else</strong><small>I’ll choose the two materials</small></span></label>
        </>}
        {step === 1 && <>
          <div className="task-advisor__surfaces">
            <AdvisorChips compact label="First material" value={first} options={materials} onChange={value => { setFirst(value); setSecond(''); }} />
            {first && <AdvisorChips compact label="Second material" value={second} options={secondOptions} onChange={setSecond} />}
          </div>
          <p className="task-advisor__selection-note">Only material combinations with a product recommendation are shown. <Link href="/contact?request=product-selection">Need help with another material?</Link></p>
        </>}
        {step === 2 && <>
          <div className="task-advisor__answers"><span>{pairLabel} · Bonding</span><button type="button" onClick={() => go(1)}>Edit answers</button></div>
          <p className="task-advisor__selection-note">{results.length} recommended {results.length === 1 ? 'product' : 'products'}, in priority order. Compare the application notes to choose for your conditions.</p>
          <ol className="task-advisor__recommendations">{results.map(result => {
            const slug = selectorProductSlug(result.name);
            const product = productsBySlug.get(slug);
            const guidance = selectorGuidance[slug];
            const source = tdsDocuments[slug];
            return <li key={result.priority}><article className="task-advisor__product" aria-label={`Priority ${result.priority}: ${result.name}`}>
              <p className="task-advisor__priority">Priority {result.priority}</p>
              <div className={`task-advisor__product-top${product ? '' : ' task-advisor__product-top--text'}`}>
                {product && <ProductPack product={product} />}
                <div><h3>{result.name}</h3><p>{guidance?.chooseFor || 'Ask our team which application conditions suit this product.'}</p>
                  {product ? <Link className="button button--primary" href={getProductPath(product)}>View product</Link> : <Link className="button button--primary" href={`${contact}&product=${encodeURIComponent(result.name)}`}>Enquire about this product</Link>}
                </div>
              </div>
              {guidance && source ? <div className="task-advisor__conditions"><h4>Application conditions</h4><ul>{guidance.notes.map(note => <li key={note}>{note}</li>)}</ul><a className="task-advisor__source" href={`${source.source}#page=${guidance.page}`} target="_blank" rel="noreferrer">{guidance.revision} · Read technical data sheet</a></div> : <p className="task-advisor__selection-note">Technical application guidance is not yet available here. <Link href={`${contact}&product=${encodeURIComponent(result.name)}`}>Request technical advice</Link></p>}
            </article></li>;
          })}</ol>
          <Link className="task-advisor__human" href={contact}>Have a question? Talk to our team</Link>
        </>}
        <div className="task-advisor__actions">{step > 0 ? <button type="button" className="task-advisor__back" onClick={() => go(step - 1)}>Back</button> : <span className="task-advisor__selection-status" aria-live="polite">{embedded ? (taskId ? `${task?.label || "Choose by materials"} selected` : "Select a project to get started") : ""}</span>}{step < 2 ? <button type="button" className="button button--primary" disabled={step === 0 ? !taskId : !results.length} onClick={() => go(step + 1)}>{step === 1 ? 'Show my products' : 'Continue'}</button> : <button type="button" className="task-advisor__back" onClick={restart}>Start again</button>}</div>
      </div>
    </div><footer className="task-advisor__footer"><Link href="/products">Browse all products</Link></footer>
  </div></section>;
}

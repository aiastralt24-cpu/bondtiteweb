import Link from 'next/link';
import { ProductPack } from '@/components/product-pack';
import { catalogProducts, getProductPath } from '@/lib/products';
import type { SiteApplication } from '@/lib/site';

export function FurnitureApplication({application}:{application:SiteApplication}) {
  const hydra=catalogProducts.find(p=>p.slug==='bondtite-hydra')!;
  const jobs=['Join & assemble','Laminate & finish','Fit decorative panels','Repair & restore'];
  return <main id="main-content" tabIndex={-1} className="furniture-page">
    <div className="container">
      <nav className="breadcrumbs range-breadcrumbs" aria-label="Breadcrumb"><Link href="/applications">Applications</Link><span aria-current="page">Furniture & joinery</span></nav>
      <header className="furniture-hero">
        <div className="furniture-hero__copy"><span className="mono">Furniture & joinery</span><h1>Made with care.<br/><span>Joined with Bondtite.</span></h1><p>From the first wood joint to the final decorative panel. Find the adhesive for the part you’re working on.</p><a className="button button--primary" href="#application-products">Explore by task</a><div className="furniture-hero__meta">4 types of work <span/> {application.products.length} products to explore</div></div>
        <div className="furniture-hero__visual"><div className="furniture-hero__lines" aria-hidden="true"/><span className="furniture-hero__visual-label mono">The details hold it together.</span><div className="furniture-hero__pack"><ProductPack product={hydra}/></div><div className="furniture-hero__caption"><strong>Bondtite Hydra+</strong><span>Fast-setting wood adhesive</span></div></div>
      </header>
      <div className="furniture-materials"><span className="mono">Materials you work with</span><p>{application.materials.join(' · ')}</p></div>
      <section className="furniture-work" id="application-products" aria-labelledby="furniture-work-title">
        <header className="furniture-heading"><span className="mono">Start with the task</span><h2 id="furniture-work-title">Every detail.<br/>The right adhesive.</h2><p>Explore the products for joining, finishing and restoring furniture.</p></header>
        <nav className="furniture-job-nav" aria-label="Jump to a job">{application.groups.map((group,i)=><a href={`#job-${group.id}`} key={group.id}><span>0{i+1}</span>{jobs[i]}</a>)}</nav>
        {application.groups.map((group,i)=><section className="furniture-job" id={`job-${group.id}`} aria-labelledby={`job-title-${group.id}`} key={group.id}>
          <header className="furniture-job__intro"><span className="furniture-job__number">0{i+1}</span><h2 id={`job-title-${group.id}`}>{group.title}</h2><p>{group.description}</p><span className="furniture-job__count">{group.products.length} {group.products.length===1?'product':'products'}</span></header>
          <div className="furniture-products">{group.products.map(item=>{const product=catalogProducts.find(p=>p.slug===item.slug)!;return <article className="furniture-product" key={item.slug}><Link href={getProductPath(product)}><div className="furniture-product__image"><ProductPack product={product}/></div><div className="furniture-product__copy"><span className="mono">Bondtite</span><h3>{product.label}</h3><p>{item.note}</p><span className="furniture-product__action">View product</span></div></Link></article>;})}</div>
        </section>)}
      </section>
      <section className="furniture-prep" aria-labelledby="preparation-title"><header><span className="mono">Before you begin</span><h2 id="preparation-title">A little preparation.<br/>A better finish.</h2><p>Follow your chosen product’s instructions for application and setting time.</p></header><ol>{application.steps.map((step,i)=><li key={step}><span>0{i+1}</span><p>{step}</p></li>)}</ol></section>
      <section className="furniture-faq" aria-labelledby="application-questions-title"><header><span className="mono">Good to know</span><h2 id="application-questions-title">At the workbench.</h2></header><div>{application.faqs.map(faq=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
      <aside className="furniture-help"><div><span className="mono">Your next step</span><h2>Have your materials in mind?</h2><p>Use the Product advisor to explore products for your surfaces.</p></div><Link className="button button--primary" href="/product-advisor">Find my adhesive</Link></aside>
      <Link className="furniture-back" href="/applications">Explore all applications</Link>
    </div>
  </main>;
}

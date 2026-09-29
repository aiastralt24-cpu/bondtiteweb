import Link from 'next/link';
import { ProductPack } from '@/components/product-pack';
import { catalogProducts, getProductPath } from '@/lib/products';
import type { SiteApplication } from '@/lib/site';

type ApplicationPresentation = {headline:string;accent:string;intro?:string;product?:string;caption:string;motif:string;summary:string;faqTitle:string;jobs:string[]};
const presentations:Record<string,ApplicationPresentation> = {
  'furniture-and-joinery': {headline:'Made with care.',accent:'Joined with Bondtite.',intro:'From the first wood joint to the final decorative panel. Find the adhesive for the part you’re working on.',caption:'Fast-setting wood adhesive',motif:'The details hold it together.',summary:'Explore the products for joining, finishing and restoring furniture.',faqTitle:'At the workbench.',jobs:['Join & assemble','Laminate & finish','Fit decorative panels','Repair & restore']},
  'construction-and-infrastructure': {headline:'From fitting to finishing.',accent:'Find your bond.',caption:'Construction adhesive',motif:'A closer look at every connection.',summary:'Explore products for interior fixing, stone work, repairs and flooring.',faqTitle:'On the job.',jobs:['Panels & fixing','Stone & marble','Metal & repairs','Flooring & contact']},
  'diy-segment': {headline:'Fix it. Make it.',accent:'Bring it together.',caption:'Instant adhesive',motif:'Small projects. Thoughtful choices.',summary:'Find products for precise repairs, clear bonds and hands-on craft projects.',faqTitle:'Before your next repair.',jobs:['Small repairs','Epoxy repairs','Craft & coverage']},
  'auto-and-upholstery': {headline:'From the frame',accent:'to the finishing touch.',caption:'Foam & upholstery adhesive',motif:'What’s underneath matters.',summary:'Explore products for upholstery assembly, interior surfaces and workshop repairs.',faqTitle:'In the workshop.',jobs:['Foam & upholstery','Interior surfaces','Workshop repairs']},
  'bangles-and-decorative-crafts': {headline:'For the finer details.',accent:'For the work of your hands.',caption:'Two-part epoxy system',motif:'Craft begins with the details.',summary:'Explore specialist products for Sankha manufacture, glass bangles and decoration.',faqTitle:'At the craft bench.',jobs:['Sankha manufacture','Glass & decoration']},
  'industrial-bonding-and-concrete-repair': {headline:'A specific process.',accent:'A specific bonding system.',product:'bondtite-mma-999a-mma-999b',caption:'MMA resin & hardener system',motif:'Start with the exact application.',summary:'Explore systems by process, from structural assembly to concrete injection grouting.',faqTitle:'Know your system.',jobs:['Structural & flooring','Composite assembly','Concrete repair']}
};

export function ApplicationGuide({application}:{application:SiteApplication}) {
  const presentation=presentations[application.slug];
  const heroProduct=catalogProducts.find(p=>p.slug===(presentation.product ?? application.products[0]))!;
  return <main id="main-content" tabIndex={-1} className="application-guide-page">
    <div className="container">
      <nav className="breadcrumbs range-breadcrumbs" aria-label="Breadcrumb"><Link href="/applications">Applications</Link><span aria-current="page">{application.displayTitle}</span></nav>
      <header className="application-guide-hero">
        <div className="application-guide-hero__copy"><span className="mono">{application.displayTitle}</span><h1>{presentation.headline}<br/><span>{presentation.accent}</span></h1><p>{presentation.intro ?? application.description}</p><a className="button button--primary" href="#application-products">Explore by task</a><div className="application-guide-hero__meta">{application.groups.length} types of work <span/> {application.products.length} products to explore</div></div>
        <div className="application-guide-hero__visual"><div className="application-guide-hero__lines" aria-hidden="true"/><span className="application-guide-hero__visual-label mono">{presentation.motif}</span><div className="application-guide-hero__pack"><ProductPack product={heroProduct} priority/></div><div className="application-guide-hero__caption"><strong>{heroProduct.name}</strong><span>{presentation.caption}</span></div></div>
      </header>
      <div className="application-guide-materials"><span className="mono">{application.slug==='industrial-bonding-and-concrete-repair'?'Processes you work with':'Materials you work with'}</span><p>{application.materials.join(' · ')}</p></div>
      <section className="application-guide-work" id="application-products" aria-labelledby="application-guide-work-title">
        <header className="application-guide-heading"><span className="mono">Start with the task</span><h2 id="application-guide-work-title">Every detail.<br/>The right adhesive.</h2><p>{presentation.summary}</p></header>
        <nav className="application-guide-job-nav" aria-label="Jump to a job">{application.groups.map((group,i)=><a href={`#job-${group.id}`} key={group.id}><span>0{i+1}</span>{presentation.jobs[i]}</a>)}</nav>
        {application.groups.map((group,i)=><section className="application-guide-job" id={`job-${group.id}`} aria-labelledby={`job-title-${group.id}`} key={group.id}>
          <header className="application-guide-job__intro"><span className="application-guide-job__number">0{i+1}</span><h2 id={`job-title-${group.id}`}>{group.title}</h2><p>{group.description}</p><span className="application-guide-job__count">{group.products.length} {group.products.length===1?'product':'products'}</span></header>
          <div className="application-guide-products">{group.products.map(item=>{const product=catalogProducts.find(p=>p.slug===item.slug)!;return <article className="application-guide-product" key={item.slug}><Link href={getProductPath(product)}><div className="application-guide-product__image"><ProductPack product={product}/></div><div className="application-guide-product__copy"><span className="mono">Bondtite</span><h3>{product.label}</h3><p>{item.note}</p><span className="application-guide-product__action">View product</span></div></Link></article>;})}</div>
        </section>)}
      </section>
      <section className="application-guide-prep" aria-labelledby="preparation-title"><header><span className="mono">Before you begin</span><h2 id="preparation-title">A little preparation.<br/>A better finish.</h2><p>Follow your chosen product’s instructions for application and setting time.</p></header><ol>{application.steps.map((step,i)=><li key={step}><span>0{i+1}</span><p>{step}</p></li>)}</ol></section>
      <section className="application-guide-faq" aria-labelledby="application-questions-title"><header><span className="mono">Good to know</span><h2 id="application-questions-title">{presentation.faqTitle}</h2></header><div>{application.faqs.map(faq=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
      <aside className="application-guide-help"><div><span className="mono">Your next step</span><h2>Have your materials in mind?</h2><p>Use the Product advisor to explore products for your surfaces.</p></div><Link className="button button--primary" href="/product-advisor">Find my adhesive</Link></aside>
      <Link className="application-guide-back" href="/applications">Explore all applications</Link>
    </div>
  </main>;
}

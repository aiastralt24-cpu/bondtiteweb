import { ContactDesk } from "@/components/contact-desk";
import Image from "next/image";
import { AboutExperience } from "@/components/about-experience";
import Link from "next/link";
import { ProductPack } from "@/components/product-pack";
import { catalogProducts } from "@/lib/products";
export function AboutPage() {
  const range = [
    {name:"Wood & panels",slug:"bondtite-hydra",href:"/products/woodworking",text:"From timber joints and laminates to acrylic, PVC and WPC panels."},
    {name:"Epoxy adhesives",slug:"bondtite-fast-and-clear",href:"/products/epoxy-adhesives",text:"Two-part systems for clear bonds, stone work, metal and wood repairs."},
    {name:"Contact & spray",slug:"bondtite-foambond",href:"/products/synthetic-rubber-adhesives",text:"Surface bonding for laminates, foam, upholstery and selected flooring jobs."},
    {name:"Instant adhesives",slug:"bondtite-quick",href:"/products/cyanoacrylates",text:"Precision nozzles, gels and brush formats for compatible small repairs."},
    {name:"Acrylic adhesives",slug:"bondtite-uniweld",href:"/products/acrylic-adhesives",text:"Two-component acrylic bonding for listed rigid plastics, metals and other materials."},
    {name:"Industrial systems",slug:"bondtite-mma-999a-mma-999b",href:"/products/industrial-adhesives",text:"Specialist systems for structural bonding, composites, potting and concrete repair."}
  ];
  const milestones = [
    {year:"2021",title:"Bondtite Pro",text:"A new addition to the epoxy range."},
    {year:"2022",title:"Wood & instant",text:"PVA woodworking adhesives and Bondtite Quick launch."},
    {year:"2024",title:"Strong & Clear",text:"The transparent epoxy joins the portfolio."},
    {year:"2025",title:"Superbrands recognition",text:"Bondtite receives the Superbrands 2025 award."}
  ];
  return <AboutExperience>
    <section className="brand-hero" aria-labelledby="brand-title"><div className="container brand-hero__inner">
      <div className="brand-hero__copy"><span className="mono">About Bondtite</span><h1 id="brand-title">Good work.<br/><span>Starts with<br/>the right bond.</span></h1><p>Adhesives from Astral for the furniture we make, the things we repair and the projects we bring to life.</p><div className="brand-hero__actions"><a className="button button--primary" href="#brand-story">Our story</a><Link className="brand-link" href="/products">Explore the range</Link></div></div>
      <figure className="brand-hero__visual"><div className="brand-hero__image"><Image src="/assets/campaign/ranbir-slider-image.png" alt="Bondtite campaign featuring Ranbir Kapoor holding Hydra+ wood adhesive" fill priority sizes="(max-width: 760px) 100vw, 48vw" /></div><figcaption>Bondtite Hydra+ <span>Woodworking adhesive</span></figcaption></figure>
    </div></section>
    <section className="brand-statement" id="brand-story" aria-labelledby="brand-statement-title"><div className="container brand-statement__content">
      <div><span className="mono">Part of Astral Adhesives</span><h2 id="brand-statement-title">Different kinds of work.<span>A range built around them.</span></h2></div>
      <div className="brand-statement__bottom"><p className="brand-statement__lead">A furniture joint, a clear glass bond and a metal repair ask different things of an adhesive.</p><p>Bondtite brings together wood, epoxy, rubber, instant and specialist adhesives under the Astral name. Each product has its own role, with specific materials, application methods and working times.</p><p>Our catalogue brings {catalogProducts.length} products together so you can explore the range by the work you do.</p><a className="brand-link" href="https://www.astraladhesives.com/brand/bondtite.html" target="_blank" rel="noreferrer">Bondtite at Astral Adhesives</a></div>
    </div></section>
    <section className="brand-range container" aria-labelledby="brand-range-title"><header className="brand-section-heading"><span className="mono">Get to know the range</span><h2 id="brand-range-title">A place for every<br/>kind of bond.</h2><p>Start with a product family. Explore the materials and uses each one is designed for.</p></header><div className="brand-range__grid">{range.map(item=>{const product=catalogProducts.find(p=>p.slug===item.slug)!;return <Link className="brand-range__item" href={item.href} key={item.slug}><div className="brand-range__pack"><ProductPack product={product}/></div><div><h3>{item.name}</h3><p>{item.text}</p><span className="brand-range__action">Explore range</span></div></Link>;})}</div></section>
    <section className="brand-history container" aria-labelledby="brand-history-title"><header className="brand-section-heading"><span className="mono">Selected milestones</span><h2 id="brand-history-title">Growing with the work.</h2><p>Product launches and recognition from Astral’s published journey.</p></header><ol className="brand-history__timeline">{milestones.map(item=><li key={item.year}><span className="brand-history__year">{item.year}</span><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol><a className="brand-link" href="https://www.astraladhesives.com/about-us.html" target="_blank" rel="noreferrer">Explore Astral’s journey</a></section>
    <section className="brand-next container" aria-labelledby="brand-next-title"><div><span className="mono">Put the range to work</span><h2 id="brand-next-title">Start with your project.</h2><p>Explore products by job, or choose your joining materials with the Product advisor.</p></div><div className="brand-next__actions"><Link className="button button--primary" href="/applications">Explore applications</Link><Link className="brand-link" href="/product-advisor">Find a product for your materials</Link></div></section>
  </AboutExperience>;
}

export function ContactPage({ productName, documentation = false, project, dealer = false }: { productName?: string; documentation?: boolean; dealer?: boolean; project?: string }) {
  return <main id="main-content" tabIndex={-1} className="contact-studio">
    <div className="container contact-studio__layout">
      <section className="contact-studio__intro" aria-labelledby="contact-title">
        <h1 id="contact-title">Tell us what <br />you’re <br />working on.</h1>
        <p className="contact-studio__lead">Tell us the product, surfaces and application. We’ll direct your enquiry to the right team.</p>
        <p className="contact-studio__signature"><span aria-hidden="true" />The right bond starts with a conversation.</p>
      </section>
      <ContactDesk dealer={dealer} project={project} productName={productName} documentation={documentation} products={catalogProducts.map(product=>product.name)} />
    </div>
    <section className="contact-studio__office" aria-labelledby="contact-office-title"><div className="container contact-studio__office-layout"><div><span className="mono">Astral Adhesives customer care</span><h2 id="contact-office-title">Speak directly<br />with the team.</h2></div><div className="contact-studio__direct"><a href="tel:+917311103331"><span>Customer care</span><strong>+91 73111 03331</strong></a><a href="mailto:customercare@astraladhesives.com"><span>Email</span><strong>customercare@<wbr />astraladhesives.com</strong></a></div></div></section>
  </main>;
}

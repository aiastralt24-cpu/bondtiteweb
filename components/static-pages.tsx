import { ContactDesk } from "@/components/contact-desk";
import Image from "next/image";
import { AboutExperience } from "@/components/about-experience";
import Link from "next/link";
import { catalogProducts } from "@/lib/products";
export function AboutPage() {
  const work = [
    {image:'furniture',title:'The things we make.',text:'Furniture, fitted interiors and the details that bring a space together.'},
    {image:'diy',title:'The things we repair.',text:'Everyday objects, small fixes and hands-on projects at home.'},
    {image:'industrial',title:'The work behind the scenes.',text:'Specialist assembly, workshop applications and industrial processes.'}
  ];
  const milestones = [
    {year:"2021",title:"Bondtite Pro",text:"A new addition to the epoxy range."},
    {year:"2022",title:"Wood & instant",text:"PVA woodworking adhesives and Bondtite Quick launch."},
    {year:"2024",title:"Strong & Clear",text:"The transparent epoxy joins the portfolio."},
    {year:"2025",title:"Superbrands recognition",text:"Bondtite receives the Superbrands 2025 award."}
  ];
  return <AboutExperience>
    <section className="brand-hero brand-hero--campaign" aria-labelledby="brand-title">
      <div className="brand-hero__inner container">
        <div className="brand-hero__copy"><span className="mono">The Bondtite story · By Astral</span><h1 id="brand-title">Good work.<br /><span>Great bonds.</span></h1><p>For the things we make.<br />And everything we bring together.</p><a className="brand-link" href="#brand-story">Get to know Bondtite </a></div>
        <div className="brand-hero__visual"><span className="brand-hero__word" aria-hidden="true">BONDTITE</span><Image src="/assets/campaign/ranbir-slider-image.png" alt="Bondtite campaign featuring Ranbir Kapoor with Hydra+ wood adhesive" fill priority sizes="(max-width: 700px) 100vw, 60vw" /></div>

      </div>
    </section>
    <section className="brand-statement" id="brand-story" aria-labelledby="brand-statement-title"><div className="container brand-statement__content">
      <div><span className="mono">Our place in the Astral family</span><h2 id="brand-statement-title">Bondtite,<br/>from Astral.</h2></div>
      <div className="brand-statement__bottom"><p className="brand-statement__lead">Bondtite is part of Astral Adhesives, with a range that spans wood, epoxy, rubber, instant and specialist adhesives.</p><p>From the furniture workshop to home repairs and industrial assembly, each product is developed for particular materials and ways of working. That is what brings this varied range together: a focus on the connection being made.</p><a className="brand-link" href="https://www.astraladhesives.com/brand/bondtite.html" target="_blank" rel="noreferrer">Discover Bondtite at Astral</a></div>
    </div></section>
    <section className="brand-history container" aria-labelledby="brand-history-title"><header className="brand-section-heading"><span className="mono">Selected milestones</span><h2 id="brand-history-title">A range that keeps growing.</h2><p>A few milestones in the Bondtite story, from new product launches to brand recognition.</p></header><ol className="brand-history__timeline">{milestones.map(item=><li key={item.year}><span className="brand-history__year">{item.year}</span><h3>{item.title}</h3><p>{item.text}</p></li>)}</ol><a className="brand-link" href="https://www.astraladhesives.com/about-us.html" target="_blank" rel="noreferrer">Explore Astral’s journey</a></section>
    <section className="brand-everyday container" aria-labelledby="brand-everyday-title"><header className="brand-section-heading"><span className="mono">Bondtite in everyday life</span><h2 id="brand-everyday-title">Behind what we make.<br/>Part of what we keep.</h2><p>The range finds its place in familiar projects and specialist work alike.</p></header><div className="brand-everyday__grid">{work.map(item=><article className="brand-everyday__item" key={item.image}><div className="brand-everyday__image"><Image src={`/assets/applications/${item.image}.webp`} alt="" fill sizes="(max-width: 760px) 100vw, 33vw"/></div><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><div className="brand-everyday__next"><p>Find the Bondtite for the work you do.</p><Link className="button button--primary" href="/products">Explore the range</Link></div></section>
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

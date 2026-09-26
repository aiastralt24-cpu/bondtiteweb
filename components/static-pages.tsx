import { ContactDesk } from "@/components/contact-desk";
import Image from "next/image";
import { AboutExperience } from "@/components/about-experience";
import Link from "next/link";
import { ProductPack } from "@/components/product-pack";
import { catalogProducts, getProductPath } from "@/lib/products";
export function AboutPage() {
  const milestones = [
    { year: "2021", title: "A new chapter.\nIn epoxy.", text: "Bondtite Pro joins the range.", slug: "bondtite-pro", category: "Epoxy adhesives" },
    { year: "2022", title: "From woodwork.\nTo quick fixes.", text: "PVA wood adhesives and Bondtite Quick instant adhesives join the family.", slug: "bondtite-quick", category: "Wood & instant adhesives" },
    { year: "2024", title: "A bond with\na clearer finish.", text: "Bondtite Strong & Clear becomes part of the portfolio.", slug: "bondtite-strong-and-clear", category: "Epoxy adhesives" }
  ];
  return <AboutExperience>
    <section className="brand-hero" aria-labelledby="brand-title">
      <div className="brand-hero__inner container">
        <div className="brand-hero__copy"><span className="mono">The Bondtite story · By Astral</span><h1 id="brand-title">Good work.<br /><span>Great bonds.</span></h1><p>For the things we make.<br />And everything we bring together.</p><a className="brand-link" href="#brand-story">Get to know Bondtite </a></div>
        <div className="brand-hero__visual"><span className="brand-hero__word" aria-hidden="true">BONDTITE</span><Image src="/assets/campaign/ranbir-slider-image.png" alt="Bondtite campaign featuring Ranbir Kapoor with Hydra+ wood adhesive" fill priority sizes="(max-width: 700px) 100vw, 60vw" /></div>

      </div>
    </section>
    <section className="brand-statement" id="brand-story" aria-labelledby="brand-statement-title">
      <div className="container">
        <div className="brand-statement__top"><span className="mono">A bond for the work you do</span></div>
        <div className="brand-statement__content">
          <h2 id="brand-statement-title">Build. Repair. Create.<span>With Bondtite.</span></h2>
          <div className="brand-statement__bottom">
            <p className="brand-statement__lead">From making furniture to everyday repairs, find an adhesive for your materials and your task.</p>
            <p>Explore wood adhesives, epoxies, rubber adhesives and instant adhesives, all part of the Bondtite range from Astral.</p>
            <a className="brand-link" href="https://www.astraladhesives.com/brand/bondtite.html" target="_blank" rel="noreferrer">Part of Astral Adhesives</a>
          </div>
        </div>
      </div>
    </section>
    <section className="brand-history" aria-labelledby="brand-history-title"><div className="container"><header className="brand-history__header"><span className="mono">The range, over time</span><h2 id="brand-history-title">Always something<br />to build on.</h2><p>Three moments in our product story.</p></header><div className="brand-history__stack">{milestones.map((milestone,index)=>{const product=catalogProducts.find(item=>item.slug===milestone.slug)!;return <article className={"brand-chapter brand-chapter--"+index} key={milestone.year}><div className="brand-chapter__copy"><span className="brand-chapter__year">{milestone.year}</span><h3>{milestone.title.split("\n").map((line,i)=><span key={i}>{line}</span>)}</h3><p>{milestone.text}</p><Link className="brand-link" href={getProductPath(product)}>Discover {product.label} </Link></div><div className="brand-chapter__visual"><span className="brand-chapter__category">{milestone.category}</span><ProductPack product={product}/><span className="brand-chapter__name">{product.name}</span></div></article>;})}</div><a className="brand-history__source" href="https://www.astraladhesives.com/about-us.html" target="_blank" rel="noreferrer">Milestones from Astral’s journey</a></div></section>
    <section className="brand-next container"><span className="mono">From our story to yours</span><Link href="/applications"><h2>What are you<br /><span>working on?</span></h2><span className="brand-next__label">Explore applications</span></Link></section>
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

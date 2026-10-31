import Link from "next/link";
import { ProductPack } from "@/components/product-pack";
import { catalogProducts, getProductPath } from "@/lib/products";

const range = [
  { slug: "bondtite-hydra", job: "Furniture & joinery", copy: "For wood joints, plywood and laminate work." },
  { slug: "bondtite-multibond", job: "Interior & trade applications", copy: "For flooring, leather, upholstery and HVAC work." },
  { slug: "bondtite-foambond", job: "Upholstery & foam", copy: "For foam, rexine and wood bonding." },
  { slug: "bondtite-fast-and-clear", job: "Repairs & assembly", copy: "A two-component epoxy for mixed-material jobs." }
].flatMap(item => {
  const product = catalogProducts.find(product => product.slug === item.slug);
  return product ? [{ ...item, product }] : [];
});

export function DealerPage() {
  return <main id="main-content" tabIndex={-1} className="dealer-partnership">
    <section className="partner-intro">
      <div className="container">
        <nav className="partner-breadcrumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><span aria-current="page">Become a dealer</span></nav>
        <div className="partner-intro__grid">
          <div className="partner-intro__copy">
            <p className="partner-eyebrow">Partner with Bondtite</p>
            <h1>Good business.<br /><span>A stronger bond.</span></h1>
            <p className="partner-intro__description">Bring Bondtite to your counter. Explore an adhesive range for the furniture makers, contractors and craftspeople in your market.</p>
            <div className="partner-actions"><Link className="button button--primary" href="/contact?request=dealer">Enquire about becoming a dealer</Link><a href="#dealer-range" className="partner-text-link">Explore the range</a></div>
            <p className="partner-intro__note">From Astral. Made for the work around you.</p>
          </div>
          <div className="partner-showcase" aria-label="Bondtite products for your business">
            <p className="partner-eyebrow">A place on your shelf.<br />A part in their next project.</p>
            <div className="partner-showcase__packs">{range.slice(0,3).map(({product})=><Link href={getProductPath(product)} key={product.id} aria-label={`Explore ${product.label}`}><ProductPack product={product} normalized priority /></Link>)}</div>
            <div className="partner-showcase__caption"><strong>Bondtite by Astral</strong><span>Woodworking · Interiors · Repairs</span></div>
          </div>
        </div>
        <div className="partner-reasons">
          <div><h2>A range for your market</h2><p>Products for woodworking, upholstery, construction and everyday repairs.</p></div>
          <div><h2>Clear product guidance</h2><p>Material compatibility, application advice and technical data sheets.</p></div>
          <div><h2>A conversation with Astral</h2><p>Discuss your location, business and product requirements with our team.</p></div>
        </div>
      </div>
    </section>

    <section id="dealer-range" className="partner-range container" aria-labelledby="partner-range-title">
      <div className="partner-section-head"><div><p className="partner-eyebrow">Products with a purpose</p><h2 id="partner-range-title">For the jobs<br /><span>your customers bring.</span></h2></div><Link className="partner-text-link" href="/products">Explore all products</Link></div>
      <div className="partner-range__grid">{range.map(({product,job,copy})=><article key={product.id}>
        <Link href={getProductPath(product)} className="partner-range__visual" aria-label={`Explore ${product.label}`}><ProductPack product={product} normalized /></Link>
        <div className="partner-range__copy"><p className="partner-eyebrow">{job}</p><h3><Link href={getProductPath(product)}>{product.label}</Link></h3><p>{copy}</p><Link className="partner-text-link" href={getProductPath(product)}>View product</Link></div>
      </article>)}</div>
    </section>

    <section className="partner-start" aria-labelledby="partner-start-title"><div className="container partner-start__grid">
      <div><p className="partner-eyebrow">Let’s talk business</p><h2 id="partner-start-title">Your next step.<br /><span>A conversation.</span></h2><p className="partner-start__intro">Tell us about your business. The team can discuss the range, availability and dealership requirements for your location.</p>
        <ol className="partner-steps">
          <li><h3>Tell us about your business</h3><p>Share your name, business name, city and contact details.</p></li>
          <li><h3>Discuss your market</h3><p>Let us know the customers you serve and the adhesive categories you stock.</p></li>
          <li><h3>Explore the possibilities</h3><p>Discuss product availability, commercial terms and the next steps with the team.</p></li>
        </ol>
      </div>
      <aside className="partner-enquiry" aria-labelledby="partner-enquiry-title"><p className="partner-eyebrow">Dealer enquiry</p><h3 id="partner-enquiry-title">Let’s get to<br />know your business.</h3><p>Start with a few details through our dealer enquiry form.</p><Link className="button button--primary" href="/contact?request=dealer">Start your dealer enquiry</Link><span className="partner-enquiry__hint">Opens the contact form with dealer enquiry selected.</span>
        <div className="partner-enquiry__contact"><span>Prefer to speak to us?</span><a href="tel:+917311103331">+91 73111 03331</a><a href="mailto:customercare@astraladhesives.com">customercare@astraladhesives.com</a></div>
        <p className="partner-enquiry__fine">Enquiries are reviewed by the team. Availability and appointment are subject to discussion.</p>
      </aside>
    </div></section>
  </main>;
}

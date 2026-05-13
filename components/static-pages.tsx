export function AboutPage() {
  return (
    <main>
      <section className="index-hero">
        <div className="container index-hero__grid">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>About</span>
            </nav>
            <h1 className="display">
              Adhesive engineering for India’s <span className="accent">trade.</span>
            </h1>
            <p>
              Bondtite is built around practical adhesive selection for
              carpenters, contractors, fabricators, retailers and site teams
              working across demanding Indian conditions.
            </p>
          </div>
          <div className="index-hero__panel">
            <span className="mono">Legacy</span>
            <strong>28+ years</strong>
            <p>Built around product guidance, dealer access and technical proof.</p>
          </div>
        </div>
      </section>
      <section className="section category-seo">
        <div className="container category-seo__grid">
          <article>
            <span className="mono">R&D</span>
            <h2 className="display">Chemistry-led range.</h2>
            <p>Products are organized by chemistry, substrate fit and site condition.</p>
          </article>
          <article>
            <span className="mono">Network</span>
            <h2 className="display">Trade availability.</h2>
            <p>Retail and dealer access help users move from selection to purchase.</p>
          </article>
          <article>
            <span className="mono">Proof</span>
            <h2 className="display">Technical clarity.</h2>
            <p>Data sheets, guides and standards support confident specification.</p>
          </article>
        </div>
      </section>
    </main>
  );
}

export function ContactPage() {
  return (
    <main>
      <section className="index-hero">
        <div className="container index-hero__grid">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>Contact</span>
            </nav>
            <h1 className="display">
              Get product guidance from the <span className="accent">trade desk.</span>
            </h1>
            <p>
              Contact Bondtite for adhesive selection, technical documents,
              dealer support, product availability and application guidance.
            </p>
          </div>
          <div className="contact-panel">
            <a href="mailto:customercare@astraladhesives.com">
              <span>Email</span>
              customercare@astraladhesives.com
            </a>
            <a href="tel:+917311103331">
              <span>Trade desk</span>
              +91-7311103331
            </a>
            <a href="/products">
              <span>Product help</span>
              Browse products
            </a>
            <a href="mailto:dealer@bondtite.in">
              <span>Dealer enquiry</span>
              Apply online
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

import { ProductPack } from "@/components/product-pack";
import { catalogProducts } from "@/lib/products";

const dealerProducts = [
  "bondtite-hydra",
  "bondtite-multibond",
  "bondtite-quik-spray",
  "bondtite-foambond"
]
  .map((slug) => catalogProducts.find((product) => product.slug === slug))
  .filter(Boolean);

const benefits = [
  {
    label: "Range depth",
    title: "27 product lines",
    body: "Woodworking, rubber, sprayable, epoxy, stone care and quick-fix formats for daily trade demand."
  },
  {
    label: "Trade pull",
    title: "Built for working sites",
    body: "A practical range for carpenters, contractors, fabricators, upholstery teams and repair counters."
  },
  {
    label: "Support",
    title: "Astral-backed guidance",
    body: "Product selection, technical documents and customer-care support help dealers sell with clarity."
  }
];

const steps = [
  "Share your location, business type and current adhesive category mix.",
  "Our team reviews distribution fit, product range and expected trade demand.",
  "You receive range guidance, commercial next steps and onboarding support."
];

export function DealerPage() {
  return (
    <main>
      <section className="dealer-hero">
        <div className="container dealer-hero__grid">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>Become a dealer</span>
            </nav>
            <span className="mono">Partner with Bondtite</span>
            <h1 className="display">
              Bring Bondtite to your <span className="accent">trade counter.</span>
            </h1>
            <p>
              Join a dealer network built around practical adhesive demand,
              fast-moving product formats and Astral-backed customer support.
            </p>
            <div className="dealer-hero__actions">
              <a
                className="button button--primary"
                href="mailto:customercare@astraladhesives.com?subject=Bondtite dealer enquiry"
              >
                Apply by email
              </a>
              <a className="button button--secondary" href="tel:+917311103331">
                Call +91-7311103331
              </a>
            </div>
          </div>
          <div className="dealer-hero__panel">
            <span className="mono">Network proof</span>
            <div className="dealer-metrics" aria-label="Bondtite network highlights">
              <div>
                <strong>2.7 lakh+</strong>
                <span>Dealers</span>
              </div>
              <div>
                <strong>30+</strong>
                <span>Years</span>
              </div>
              <div>
                <strong>27</strong>
                <span>Products</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section dealer-benefits">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="mono">Why partner</span>
              <h2 className="display section-title">
                A range dealers can <span className="accent">explain fast.</span>
              </h2>
            </div>
            <p>
              Bondtite is organized by real buying intent: material, application,
              site condition and speed.
            </p>
          </div>
          <div className="dealer-benefits__grid">
            {benefits.map((benefit) => (
              <article key={benefit.title}>
                <span className="mono">{benefit.label}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section dealer-range">
        <div className="container dealer-range__grid">
          <div>
            <span className="mono">Fast movers</span>
            <h2 className="display section-title">
              Product families for daily <span className="accent">trade demand.</span>
            </h2>
            <p>
              From Hydra+ for joinery to Foambond for upholstery, the range
              gives retailers a clear answer for common adhesive jobs.
            </p>
          </div>
          <div className="dealer-product-grid">
            {dealerProducts.map((product) => (
              <a href={`/products/${product!.categorySlug}/${product!.slug}`} key={product!.slug}>
                <ProductPack product={product!} />
                <span>{product!.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section dealer-process">
        <div className="container dealer-process__grid">
          <div>
            <span className="mono">Onboarding</span>
            <h2 className="display section-title">
              Simple enquiry, clear <span className="accent">next steps.</span>
            </h2>
          </div>
          <ol>
            {steps.map((step, index) => (
              <li key={step}>
                <span>0{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section dealer-cta">
        <div className="container dealer-cta__panel">
          <div>
            <span className="mono">Dealer enquiry</span>
            <h2 className="display">
              Ready to discuss your <span className="accent">market?</span>
            </h2>
            <p>
              Send your business details and the Bondtite team will guide you
              on fit, range and next steps.
            </p>
          </div>
          <div>
            <a
              className="button button--primary"
              href="mailto:customercare@astraladhesives.com?subject=Bondtite dealer enquiry"
            >
              customercare@astraladhesives.com
            </a>
            <a className="dealer-cta__phone" href="tel:+917311103331">
              +91-7311103331
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

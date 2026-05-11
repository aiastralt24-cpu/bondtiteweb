import { ProductPack } from "@/components/product-pack";
import { catalogProducts, getProductPath, type CatalogProduct } from "@/lib/products";
import { siteApplications, type SiteApplication } from "@/lib/site";

function productLinks(names: string[]) {
  return names
    .map((name) =>
      catalogProducts.find(
        (product) => product.name.toLowerCase() === name.toLowerCase()
      )
    )
    .filter((product): product is CatalogProduct => Boolean(product));
}

export function ApplicationsPage() {
  return (
    <main>
      <section className="index-hero">
        <div className="container index-hero__grid">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>Applications</span>
            </nav>
            <h1 className="display">
              Adhesive selection by <span className="accent">job type.</span>
            </h1>
            <p>
              Each application page connects real trade workflows to the product
              families, preparation steps and technical proof needed to specify
              the right adhesive.
            </p>
          </div>
          <div className="index-hero__panel">
            <span className="mono">Application architecture</span>
            <strong>{siteApplications.length} focused pages</strong>
            <p>Furniture, construction, wet areas and upholstery.</p>
          </div>
        </div>
      </section>

      <section className="section listing-section">
        <div className="container listing-grid">
          {siteApplications.map((application, index) => {
            const featuredProduct = productLinks(application.products)[0];

            return (
              <article className="listing-card" key={application.slug}>
                <span className="mono">0{index + 1}</span>
                <h2 className="display">
                  {application.title} <span className="accent">{application.accent}</span>
                </h2>
                <p>{application.description}</p>
                <div className="listing-card__media product-media">
                  {featuredProduct ? <ProductPack product={featuredProduct} /> : null}
                </div>
                <a href={`/applications/${application.slug}`}>View application</a>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export function ApplicationDetailPage({ application }: { application: SiteApplication }) {
  const relatedProducts = productLinks(application.products);

  return (
    <main>
      <section className="index-hero">
        <div className="container index-hero__grid">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/applications">Applications</a>
              <span>{application.title} {application.accent}</span>
            </nav>
            <h1 className="display">
              {application.title} <span className="accent">{application.accent}</span>
            </h1>
            <p>{application.description}</p>
          </div>
          <div className="detail-media product-media">
            {relatedProducts[0] ? <ProductPack product={relatedProducts[0]} priority /> : null}
          </div>
        </div>
      </section>

      <section className="section product-detail-body">
        <div className="container product-detail-body__grid">
          <div>
            <span className="mono">Workflow</span>
            <h2 className="display section-title">
              Specify by <span className="accent">surface and site.</span>
            </h2>
            <ol className="application-steps">
              {application.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="spec-table">
            {application.products.map((product) => (
              <div key={product}>
                <span>Product fit</span>
                <strong>{product}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section application-fit">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="mono">Recommended</span>
              <h2 className="display section-title">
                Product <span className="accent">matches.</span>
              </h2>
            </div>
          </div>
          <div className="application-fit__grid">
            {relatedProducts.map((product) => (
              <article className="fit-panel" key={product.id}>
                <div className="fit-panel__thumb">
                  <ProductPack product={product} />
                </div>
                <h3>{product.name}</h3>
                <p>{product.reason}</p>
                <a className="range-link" href={getProductPath(product)}>
                  View product
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="comparison section">
        <div className="container">
          <div className="product-faq-list">
            {application.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

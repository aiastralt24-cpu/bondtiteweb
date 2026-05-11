import { ProductPack } from "@/components/product-pack";
import {
  catalogProducts,
  getProductPath,
  type CatalogProduct,
  type ProductCategory
} from "@/lib/products";
import { formatPackSizes } from "@/lib/product-format";

export function ProductDetailPage({
  category,
  product
}: {
  category: ProductCategory;
  product: CatalogProduct;
}) {
  const relatedProducts = catalogProducts
    .filter((item) => item.categorySlug === product.categorySlug && item.id !== product.id)
    .concat(catalogProducts.filter((item) => item.categorySlug !== product.categorySlug))
    .slice(0, 3);

  const specs = [
    ["Chemistry", product.chemistry],
    ["Best substrates", product.substrates.join(", ")],
    ["Open time", product.openTime],
    ["Clamp time", product.clampTime],
    ["Water rating", product.waterRating],
    ["Pack sizes", formatPackSizes(product.packTypes)]
  ];

  return (
    <main>
      <section className="product-detail-hero">
        <div className="container product-detail-hero__grid">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/products">Products</a>
              <a href={`/products/${category.slug}`}>{category.label}</a>
              <span>{product.name}</span>
            </nav>
            <h1 className="display">
              {product.label} for{" "}
              <span className="accent">{product.bestFor[0].toLowerCase()}</span>{" "}
              jobs.
            </h1>
            <p>{product.productSummary}</p>
            <div className="product-hero__actions">
              <a className="button button--primary" href="#product-specs">
                View specs
              </a>
              <a className="button button--secondary" href="#contact">
                Talk to trade desk
              </a>
            </div>
          </div>
          <div className="product-detail-hero__pack">
            <ProductPack product={product} />
          </div>
        </div>
      </section>

      <section className="product-detail-body section" id="product-specs">
        <div className="container product-detail-body__grid">
          <div>
            <span className="mono">Applications</span>
            <h2 className="display section-title">
              Built for <span className="accent">trade work.</span>
            </h2>
            <div className="detail-use-grid">
              {product.applications.map((application) => (
                <span key={application}>{application}</span>
              ))}
            </div>
            <ol className="application-steps">
              {product.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <div className="download-links">
              <a href="#resources">Download TDS</a>
              <a href="#resources">Download SDS</a>
              <a href={product.sourceUrl} target="_blank" rel="noreferrer">
                Official product page
              </a>
            </div>
            {product.features.length > 0 ? (
              <div className="verified-features">
                <span className="mono">Verified features</span>
                <ul>
                  {product.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="spec-table">
            {specs.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
            {product.shelfLife ? (
              <div>
                <span>Shelf life</span>
                <strong>{product.shelfLife.replace(/^Shelf Life:\\s*/i, "")}</strong>
              </div>
            ) : null}
            {product.storage ? (
              <div>
                <span>Storage</span>
                <strong>{product.storage}</strong>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="comparison section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="mono">FAQ</span>
              <h2 className="display section-title">
                Product <span className="accent">questions.</span>
              </h2>
            </div>
            <p>
              Product pages carry focused answers that can support rich results
              and help users choose the right chemistry.
            </p>
          </div>
          <div className="product-faq-list">
            {product.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="application-fit section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="mono">Related</span>
              <h2 className="display section-title">
                Continue <span className="accent">comparing.</span>
              </h2>
            </div>
          </div>
          <div className="application-fit__grid">
            {relatedProducts.map((related) => (
              <article className="fit-panel" key={related.id}>
                <div className="fit-panel__thumb">
                  <ProductPack product={related} />
                </div>
                <h3>{related.name}</h3>
                <p>{related.reason}</p>
                <a className="range-link" href={getProductPath(related)}>
                  View product
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

import { ProductPack } from "@/components/product-pack";
import {
  catalogProducts,
  getProductPath,
  type CatalogProduct,
  type ProductCategory
} from "@/lib/products";
import { firstPackSize } from "@/lib/product-format";

export function CategoryPage({
  category,
  products
}: {
  category: ProductCategory;
  products: CatalogProduct[];
}) {
  const relatedCategories = catalogProducts
    .filter((product) => product.categorySlug !== category.slug)
    .slice(0, 3);

  return (
    <main>
      <section className="category-hero">
        <div className="container category-hero__grid">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/products">Products</a>
              <span>{category.label}</span>
            </nav>
            <h1 className="display">
              {category.title}{" "}
              <span className="accent">{category.accent}</span>
            </h1>
            <p>{category.description}</p>
            <div className="category-tags">
              {category.bestFor.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="category-hero__packs">
            {products.map((product) => (
              <a href={getProductPath(product)} key={product.id}>
                <ProductPack product={product} />
                <span>{product.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="category-products section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="mono">Category range</span>
              <h2 className="display section-title">
                Compare {category.shortLabel} <span className="accent">options.</span>
              </h2>
            </div>
            <p>
              Compare the closest Bondtite options by chemistry, site condition
              and pack fit. Open a product page for exact usage guidance.
            </p>
          </div>
          <div className="category-product-grid">
            {products.map((product) => (
              <article className="catalog-card" key={product.id}>
                <div className="catalog-card__visual">
                  <ProductPack product={product} />
                </div>
                <span className="catalog-card__meta">
                  {product.category} · {product.meta}
                </span>
                <h3>{product.name}</h3>
                <p>{product.reason}</p>
                <dl className="spec-row">
                  <div>
                    <dt>Open</dt>
                    <dd>{product.openTime}</dd>
                  </div>
                  <div>
                    <dt>Water</dt>
                    <dd>{product.waterRating}</dd>
                  </div>
                  <div>
                    <dt>Pack</dt>
                    <dd>{firstPackSize(product.packTypes)}</dd>
                  </div>
                </dl>
                <div className="catalog-card__actions">
                  <a href={getProductPath(product)}>View product</a>
                  <a href="/#bond-finder">Find fit</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="category-seo section">
        <div className="container category-seo__grid">
          <article>
            <span className="mono">Use cases</span>
            <h2 className="display">Where this chemistry fits.</h2>
            <ul>
              {category.bestFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article>
            <span className="mono">Product guidance</span>
            <h2 className="display">How to choose.</h2>
            <p>
              Start with substrate, then match the working condition, open time
              and water resistance. For exact handling, always check the product
              page and technical data sheet.
            </p>
          </article>
          <article>
            <span className="mono">Related products</span>
            <h2 className="display">Other chemistries.</h2>
            <div className="related-list">
              {relatedCategories.map((product) => (
                <a href={getProductPath(product)} key={product.id}>
                  {product.name}
                </a>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="product-detail__section section">
        <div className="container product-detail__section-grid">
          <div>
            <span className="mono">Category FAQs</span>
            <h2 className="display">
              Common {category.shortLabel.toLowerCase()} questions.
            </h2>
          </div>
          <div className="product-faq-list">
            {category.faqs.map((faq) => (
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

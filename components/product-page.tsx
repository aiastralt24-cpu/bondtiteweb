"use client";

import { useMemo, useState } from "react";
import { ProductPack } from "@/components/product-pack";
import {
  catalogProducts,
  getProductPath,
  productCategories,
  type CatalogProduct
} from "@/lib/products";
import { formatPackSizes } from "@/lib/product-format";

const chemistryFilters = ["All", ...productCategories.map((category) => category.shortLabel)];
const substrateFilters = ["Wood", "Metal", "Plastic", "Foam", "Mixed"] as const;
const conditionFilters = ["Indoor workshop", "Wet / humid", "Heat exposed", "Open site"] as const;

const specRows = [
  ["Chemistry", "PVA emulsion"],
  ["Best substrates", "Plywood, MDF, laminate, veneer"],
  ["Open time", "8-10 minutes"],
  ["Clamp time", "30-45 minutes"],
  ["Water rating", "D3 interior water resistance"],
  ["Pack sizes", formatPackSizes("1 kg, 5 kg, 20 kg")]
];

export function ProductPage() {
  const hydraProduct = catalogProducts.find((product) => product.slug === "bondtite-hydra");
  const featuredProduct = hydraProduct ?? catalogProducts[0];
  const heroProducts = [
    hydraProduct,
    catalogProducts.find((product) => product.slug === "bondtite-quik-spray"),
    catalogProducts.find((product) => product.slug === "bondtite-strong-and-clear"),
    catalogProducts.find((product) => product.slug === "bondtite-rapid")
  ].filter((product): product is CatalogProduct => Boolean(product));
  const [chemistry, setChemistry] = useState("All");
  const [substrate, setSubstrate] = useState<string>("Wood");
  const [condition, setCondition] = useState<string>("Indoor workshop");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Recommended");
  const [compare, setCompare] = useState<string[]>([featuredProduct.id]);

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return catalogProducts
      .filter((product) => chemistry === "All" || product.category === chemistry)
      .filter(
        (product) =>
          normalized.length === 0 ||
          `${product.name} ${product.chemistry} ${product.reason} ${product.bestFor.join(" ")}`
            .toLowerCase()
            .includes(normalized)
      )
      .sort((a, b) => {
        if (sort === "Fastest cure") {
          const aTime = Number.parseInt(a.openTime, 10);
          const bTime = Number.parseInt(b.openTime, 10);
          return (Number.isFinite(aTime) ? aTime : 999) - (Number.isFinite(bTime) ? bTime : 999);
        }
        if (sort === "A-Z") return a.name.localeCompare(b.name);
        return a.rank - b.rank;
      });
  }, [chemistry, query, sort]);

  const comparedProducts = compare
    .map((id) => catalogProducts.find((product) => product.id === id))
    .filter(Boolean) as CatalogProduct[];

  function toggleCompare(productId: string) {
    setCompare((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current.slice(-2), productId]
    );
  }

  return (
    <main>
      <section className="product-hero">
        <div className="container product-hero__grid">
          <div>
            <h1 className="display">
              Choose the bond by <span className="accent">chemistry</span>, site
              condition and substrate.
            </h1>
            <p>
              Browse wood, epoxy, clear and specialty adhesives by the way a real
              job is specified: material, working condition, cure speed and pack
              format.
            </p>
            <div className="product-hero__actions">
              <a className="button button--primary" href="#catalog">
                Browse catalog
              </a>
              <a className="button button--secondary" href="#compare">
                Compare products
              </a>
            </div>
          </div>
          <div className="product-family" aria-label="Bondtite product family">
            {heroProducts.map((product) => (
              <div className="product-family__pack" key={product.id}>
                <ProductPack product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="catalog section" id="catalog">
        <div className="container catalog__grid">
          <aside className="catalog-filter" aria-label="Product filters">
            <div>
              <span className="mono">Catalog</span>
              <h2 className="display">Product range.</h2>
            </div>

            <fieldset>
              <legend>Chemistry</legend>
              <div className="catalog-chips">
                {chemistryFilters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={chemistry === item}
                    onClick={() => setChemistry(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
              <div className="category-links" aria-label="Category landing pages">
                {productCategories.map((category) => (
                  <a key={category.slug} href={`/products/${category.slug}`}>
                    {category.label}
                  </a>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Substrate</legend>
              <div className="catalog-chips">
                {substrateFilters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={substrate === item}
                    onClick={() => setSubstrate(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Site condition</legend>
              <div className="catalog-chips">
                {conditionFilters.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={condition === item}
                    onClick={() => setCondition(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
          </aside>

          <div>
            <div className="catalog-toolbar">
              <span>
                {visibleProducts.length} products · {substrate} · {condition}
              </span>
              <label>
                <span>Search</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Product, chemistry, substrate"
                />
              </label>
              <label>
                <span>Sort</span>
                <select value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option>Recommended</option>
                  <option>Fastest cure</option>
                  <option>A-Z</option>
                </select>
              </label>
            </div>

            <div className="catalog-grid">
              {visibleProducts.map((product) => (
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
                      <dt>Best for</dt>
                      <dd>{product.bestFor[0]}</dd>
                    </div>
                  </dl>
                  <div className="catalog-card__actions">
                    <a href={getProductPath(product)}>Details</a>
                    <button type="button" onClick={() => toggleCompare(product.id)}>
                      {compare.includes(product.id) ? "Added" : "Compare"}
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="compare-tray" aria-live="polite">
              <span>Compare tray</span>
              <strong>{comparedProducts.map((product) => product.name.replace("Bondtite ", "")).join(" + ") || "No products selected"}</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-product section" id="hydra-detail">
        <div className="container featured-product__grid">
          <div className="featured-product__media">
            <ProductPack product={featuredProduct} />
          </div>
          <div className="featured-product__content">
            <span className="mono">Featured technical view</span>
            <h2 className="display section-title">
              Hydra+ for wet-area <span className="accent">woodwork.</span>
            </h2>
            <p>
              D3 water resistance for plywood, MDF and laminate assemblies in
              kitchens, bathrooms and high-humidity workshops.
            </p>
            <ol className="application-steps">
              <li>Clean dust, oil and loose particles from both surfaces.</li>
              <li>Apply an even adhesive film and assemble within open time.</li>
              <li>Clamp under uniform pressure until the joint sets.</li>
            </ol>
            <div className="download-links">
              <a href="#resources">Download TDS</a>
              <a href="#resources">Download SDS</a>
            </div>
          </div>
          <div className="spec-table" aria-label="Hydra+ technical specifications">
            {specRows.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="comparison section" id="compare">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="mono">Compare</span>
              <h2 className="display section-title">
                Select by trade <span className="accent">fit.</span>
              </h2>
            </div>
            <p>
              A compact matrix for choosing the closest chemistry before opening a
              data sheet or speaking to the trade desk.
            </p>
          </div>
          <div className="matrix-wrap">
            <table className="product-matrix">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Chemistry</th>
                  <th>Best substrates</th>
                  <th>Cure behavior</th>
                  <th>Site fit</th>
                  <th>Pack types</th>
                </tr>
              </thead>
              <tbody>
                {catalogProducts.slice(0, 4).map((product) => (
                  <tr key={product.id}>
                    <th>{product.name}</th>
                    <td>{product.chemistry}</td>
                    <td>{product.substrates.join(", ")}</td>
                    <td>{product.cure} · {product.openTime}</td>
                    <td>{product.condition}</td>
                    <td>{formatPackSizes(product.packTypes)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="application-fit section">
        <div className="container">
          <div className="application-fit__grid">
            {[
              ["Furniture and joinery", "Plywood, MDF, veneer pressing and modular kitchen assemblies.", catalogProducts[4]],
              ["Construction repair", "Stone, metal, ceramic corrections and on-site mixed substrate bonding.", catalogProducts[1]],
              ["Waterproofing", "Humid joinery and wet-area cabinet work that needs D3 confidence.", catalogProducts[0]],
              ["Auto and upholstery", "Foam, rubber, leatherette and quick tack panel work.", catalogProducts[5]]
            ].map(([title, body, product]) => (
              <article className="fit-panel" key={title as string}>
                <div className="fit-panel__thumb">
                  <ProductPack product={product as CatalogProduct} />
                </div>
                <h3>{title as string}</h3>
                <p>{body as string}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="product-cta">
        <div className="container product-cta__inner">
          <h2 className="display">Need the right adhesive for a job?</h2>
          <div>
            <a className="button button--primary" href="/#bond-finder">
              Find your bond
            </a>
            <a className="button button--secondary" href="#contact">
              Talk to trade desk
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

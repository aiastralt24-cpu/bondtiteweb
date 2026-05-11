"use client";

import { useMemo, useState } from "react";
import { ProductPack } from "@/components/product-pack";
import {
  catalogProducts,
  getProductPath,
  productCategories,
  type CatalogProduct
} from "@/lib/products";
import type { Chemistry, Product } from "@/lib/types";

const filters = [
  ...productCategories.map((category) => ({
    label: category.shortLabel,
    slug: category.slug
  })),
  { label: "All", slug: "all" }
] as const;

function badgeFor(product: CatalogProduct) {
  if (product.packTypes && product.packTypes !== "See official page") {
    return product.packTypes.split(",")[0].trim().split(" ")[0] + " pack";
  }
  if (product.openTime && product.openTime !== "See official page") {
    return product.openTime;
  }
  return product.category;
}

export function ProductChemistry({
  chemistries
}: {
  chemistries: Chemistry[];
  products: Product[];
}) {
  const [activeFilter, setActiveFilter] = useState<string>(
    productCategories[0]?.slug ?? "all"
  );
  const visibleProducts = useMemo(
    () =>
      activeFilter === "all"
        ? catalogProducts
        : catalogProducts.filter((product) => product.categorySlug === activeFilter),
    [activeFilter]
  );

  return (
    <section className="section product-range" id="products">
      <div className="container">
        <div className="range-head">
          <div>
            <span className="mono">Products</span>
            <h2 className="display section-title">
              Product <span className="accent">range.</span>
            </h2>
          </div>
          <a className="range-link" href="/products">
            View all {catalogProducts.length} →
          </a>
        </div>

        <div className="range-filters" aria-label="Product category filters">
          {filters.map((filter) => (
            <button
              className="range-filter"
              key={filter.slug}
              type="button"
              aria-pressed={activeFilter === filter.slug}
              onClick={() => setActiveFilter(filter.slug)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="range-grid">
          {visibleProducts.map((product) => {
            const chemistry = chemistries.find(
              (item) => item.productId === product.id
            );
            return (
              <article className="range-card" key={product.id}>
                <span className="range-badge">{badgeFor(product)}</span>
                <div className="range-card__visual">
                  <ProductPack product={product} />
                </div>
                <span className="range-card__meta">
                  {product.category} · {product.meta}
                </span>
                <h3>{product.name}</h3>
                <p>{chemistry?.description ?? product.productSummary}</p>
                <div className="range-card__footer">
                  <a href={getProductPath(product)}>Details →</a>
                  <a href={product.sourceUrl} target="_blank" rel="noreferrer">
                    Buy ↗
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { TdsDownload } from "@/components/tds-download";
import { hasDownloadableTds } from "@/lib/documents";
import { useState } from "react";
import Link from "next/link";
import { catalogProducts, getProductPath } from "@/lib/products";
import { ProductPack } from "@/components/product-pack";

export function ResourceProductFinder() {
  const [slug, setSlug] = useState("bondtite-hydra");
  const product = catalogProducts.find(item => item.slug === slug)!;
  return <section className="resource-finder" aria-labelledby="resource-finder-title">
    <div className="resource-finder__heading"><h2 id="resource-finder-title">Find your product documents</h2><span>TDS / SDS</span></div>
    <label htmlFor="resource-product">Choose a product</label>
    <select id="resource-product" value={slug} onChange={event => setSlug(event.target.value)}>{catalogProducts.map(item => <option key={item.slug} value={item.slug}>{item.name}</option>)}</select>
    <div className="resource-finder__result" aria-live="polite" aria-atomic="true">
      <div className="resource-finder__pack"><ProductPack product={product} /></div>
      <div><span className="resource-finder__category">{product.category}</span><h3>{product.name}</h3><p>Technical & safety data sheets</p><span className="resource-finder__status">{hasDownloadableTds(slug) ? "TDS available to download" : "Available on request"}</span></div>
    </div>
    {hasDownloadableTds(slug) && <TdsDownload key={slug} productName={product.name} productSlug={slug} />}
    <Link className="resource-finder__request" href={`/contact?product=${product.slug}&request=technical-documentation`}>{hasDownloadableTds(slug) ? "Request SDS" : "Request TDS / SDS"}</Link>
    <Link className="resource-finder__specs" href={getProductPath(product)}>View product specifications </Link>
    <noscript><Link href="/resources/technical-data-sheets">Browse documentation for all products</Link></noscript>
  </section>;
}

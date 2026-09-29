"use client";

import Link from "next/link";
import {useStateMotion} from '@/components/use-state-motion';
import { useMemo, useRef, useState } from "react";
import { ProductPack } from "@/components/product-pack";
import { catalogProducts, getProductPath, productCategories } from "@/lib/products";
import { formatPackSizes, productCardDescription } from "@/lib/product-format";

const categoryLabels: Record<string, string> = {
  "synthetic-rubber-adhesives": "Rubber adhesives", "industrial-adhesives": "Industrial adhesives",
  woodworking: "Wood adhesives", "epoxy-adhesives": "Epoxy adhesives",
  cyanoacrylates: "Instant adhesives", "stone-care": "Stone care",
  "sprayable-rubber-adhesives": "Spray adhesives"
};
const applications = [...new Set(catalogProducts.flatMap(product => product.applications))].sort();
const materials = ["All materials", "Wood", "Metal", "Plastic", "Foam"];

export function ProductPage() {
  const [category, setCategory] = useState("all");
  const [application, setApplication] = useState("all");
  const [material, setMaterial] = useState("All materials");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Recommended");
  const [compare, setCompare] = useState<string[]>([]);
  const dialog = useRef<HTMLDialogElement>(null);
  const visibleProducts = useMemo(() => catalogProducts
    .filter(product => category === "all" || product.categorySlug === category)
    .filter(product => application === "all" || product.applications.includes(application))
    .filter(product => material === "All materials" || product.substrates.some(item => item.toLowerCase().includes(material.toLowerCase())))
    .filter(product => `${product.name} ${product.chemistry} ${product.reason} ${product.applications.join(" ")} ${product.substrates.join(" ")}`.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => sort === "A-Z" ? a.name.localeCompare(b.name) : a.rank - b.rank), [category, application, material, query, sort]);
  const resultsMotion=useRef<HTMLDivElement>(null);
  useStateMotion(resultsMotion,visibleProducts.map(product=>product.id).join('|'));
  const selected = catalogProducts.filter(product => compare.includes(product.id));
  function toggleCompare(id: string) {
    setCompare(current => current.includes(id) ? current.filter(item => item !== id) : current.length < 3 ? [...current, id] : current);
  }
  function clearFilters() { setCategory("all"); setApplication("all"); setMaterial("All materials"); setQuery(""); }

  return <main id="main-content" tabIndex={-1} className="range-browser">
    <header className="range-browser__hero"><div className="container range-browser__intro">
        <div className="range-browser__hero-copy">
          <span className="mono">The Bondtite range / By Astral</span>
          <h1>Made for your<br /><span>kind of work.</span></h1>
          <p>From furniture that lasts to everyday fixes. Find the right bond for what you’re making.</p>
          <a className="range-browser__browse" href="#catalog">Explore all {catalogProducts.length} products </a>
        </div>
        <div className="range-browser__showcase" aria-label="Explore the Bondtite range">
          <span className="range-browser__showcase-caption">Different materials. One Bondtite.</span>
          <div className="range-browser__lineup">{[
            { slug: "bondtite-deluxe", label: "Build", detail: "Wood adhesives" },
            { slug: "bondtite-fast-and-clear", label: "Repair", detail: "Epoxy adhesives" },
            { slug: "bondtite-quick", label: "Fix", detail: "Instant adhesives" }
          ].map(item => { const product = catalogProducts.find(product => product.slug === item.slug); return product ? <Link key={item.slug} href={getProductPath(product)} className="range-browser__hero-product" aria-label={`Explore ${product.name}`}><ProductPack product={product} priority /><span className="range-browser__hero-product-label">{item.label}</span><span className="range-browser__hero-product-detail">{item.detail}</span></Link> : null; })}</div>
        </div>
    </div></header>
    <div className="container">
      <section id="catalog" aria-label="Product catalogue">
        <div className="range-browser__toolbar" role="search" aria-label="Filter product catalogue">
          <label>Search products, jobs or surfaces<input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try wood, epoxy or furniture" /></label>
          <label>Category<select value={category} onChange={event => setCategory(event.target.value)}><option value="all">All categories</option>{productCategories.map(item => <option key={item.slug} value={item.slug}>{categoryLabels[item.slug]}</option>)}</select></label>
          <label>Application<select value={application} onChange={event => setApplication(event.target.value)}><option value="all">All applications</option>{applications.map(item => <option key={item}>{item}</option>)}</select></label>
          <label>Material<select value={material} onChange={event => setMaterial(event.target.value)}>{materials.map(item => <option key={item}>{item}</option>)}</select></label>
          <label>Sort by<select value={sort} onChange={event => setSort(event.target.value)}><option>Recommended</option><option>A-Z</option></select></label>
        </div>
        <div className="range-browser__results"><span role="status">{visibleProducts.length} of {catalogProducts.length} products</span>{(category !== "all" || application !== "all" || material !== "All materials" || query) && <button type="button" onClick={clearFilters}>Clear filters ×</button>}<span className="range-browser__range-note">{visibleProducts.length === catalogProducts.length ? "Showing complete range" : "Showing matching products"}</span></div>
        {visibleProducts.length === 0 && <div className="range-browser__empty"><h2>No products found.</h2><p>Try another name or material, or clear your filters to see the full range.</p><button className="button" type="button" onClick={clearFilters}>Show all products</button></div>}
        <div ref={resultsMotion} className="range-browser__grid">
          {visibleProducts.map(product => <article className="catalog-card" key={product.id}>
            <Link className="catalog-card__visual" href={getProductPath(product)} aria-label={`Explore ${product.name}`}><ProductPack product={product} /></Link>
            <div className="catalog-card__body"><span className="catalog-card__meta">{categoryLabels[product.categorySlug]}</span>
            <h2><Link href={getProductPath(product)}>{product.label}</Link></h2>
            <p>{productCardDescription(product)}</p>
            <div className="catalog-card__actions">
              <Link href={getProductPath(product)}>View product </Link>
              <label className="catalog-card__compare"><input type="checkbox" checked={compare.includes(product.id)} aria-label={"Compare " + product.name} disabled={compare.length === 3 && !compare.includes(product.id)} onChange={() => toggleCompare(product.id)} /><span>Compare</span></label>
            </div></div>
          </article>)}
        </div>
      </section>
      <aside className="range-browser__help"><div><h2>Not sure which to choose?</h2><p>Start with your materials and explore a shortlist.</p></div><Link href="/product-advisor">Open Product advisor</Link></aside>
    </div>
    {selected.length > 0 && <div className="range-browser__compare"><div className="container"><div><strong>{selected.length} of 3 selected</strong><span>{selected.map(product => product.label).join(" · ")}</span></div><button type="button" onClick={() => setCompare([])}>Clear</button><button className="button button--primary" type="button" disabled={selected.length < 2} onClick={() => dialog.current?.showModal()}>{selected.length < 2 ? "Select one more" : "Compare products"}</button></div></div>}
    <dialog className="range-browser__dialog" ref={dialog} aria-labelledby="comparison-title">
      <div className="range-browser__dialog-head"><h2 id="comparison-title">Compare your shortlist.</h2><button type="button" onClick={() => dialog.current?.close()} aria-label="Close comparison">Close ×</button></div>
      <div className="range-browser__table" tabIndex={0} role="region" aria-label="Product comparison, scroll horizontally for more products">
        <table><thead><tr><th scope="col">Product</th>{selected.map(product => <th scope="col" key={product.id}><Link href={getProductPath(product)}>{product.name}</Link></th>)}</tr></thead><tbody>
          <tr><th scope="row">Category</th>{selected.map(product => <td key={product.id}>{categoryLabels[product.categorySlug]}</td>)}</tr>
          <tr><th scope="row">Listed materials</th>{selected.map(product => <td key={product.id}>{product.substrates.join(", ")}</td>)}</tr>
          <tr><th scope="row">Overview</th>{selected.map(product => <td key={product.id}>{productCardDescription(product)}</td>)}</tr>
          <tr><th scope="row">Key features</th>{selected.map(product => <td key={product.id}>{product.features.length ? <ul>{product.features.map(feature=><li key={feature}>{feature}</li>)}</ul> : 'Not specified'}</td>)}</tr>
          <tr><th scope="row">Water resistance</th>{selected.map(product => <td key={product.id}>{product.waterRating==='As per product TDS'?'See product TDS':product.waterRating}</td>)}</tr>
          <tr><th scope="row">Pack sizes</th>{selected.map(product => <td key={product.id}>{product.packTypes === "See official page" ? <Link href={getProductPath(product)}>View product details</Link> : formatPackSizes(product.packTypes)}</td>)}</tr>
        </tbody></table>
      </div>
    </dialog>
  </main>;
}

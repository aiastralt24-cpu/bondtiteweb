"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { TdsDownload } from "@/components/tds-download";
import "@/app/technical-data-library.css";

export type DocumentProduct = { slug: string; name: string; category: string; categorySlug: string; chemistry: string; materials: string[]; href: string; available: boolean };
const pageSize = 8;
const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export function TechnicalDataLibrary({ products, categories }: { products: DocumentProduct[]; categories: { slug: string; label: string }[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [available, setAvailable] = useState(false);
  const [page, setPage] = useState(1);
  const resultsHeading = useRef<HTMLHeadingElement>(null);
  const terms = normalize(query).split(" ").filter(Boolean);
  const filtered = products.filter(product => (!category || product.categorySlug === category) && (!available || product.available) && terms.every(term => normalize([product.name, product.category, product.chemistry, ...product.materials].join(" ")).includes(term)));
  const totalPages = Math.ceil(filtered.length / pageSize);
  const shown = filtered.slice((page - 1) * pageSize, page * pageSize);
  const hasFilters = Boolean(query || category || available);
  function reset() { setQuery(""); setCategory(""); setAvailable(false); setPage(1); }
  function changePage(next: number) { setPage(next); resultsHeading.current?.focus({ preventScroll: true }); resultsHeading.current?.scrollIntoView({ block: "start", behavior: "instant" }); }
  return <main id="main-content" tabIndex={-1} className="tds-library"><div className="container">
    <nav className="tds-library__breadcrumbs" aria-label="Breadcrumb"><Link href="/resources">Resources</Link><span aria-hidden="true">/</span><span aria-current="page">Technical data sheets</span></nav>
    <header className="tds-library__intro"><div><h1>Technical data sheets<span>.</span></h1><p>Product specifications, application instructions and handling information. Find the right sheet for your next job.</p></div><Link href="/contact?request=technical-documentation">Need technical help?</Link></header>
    <section className="tds-library__filters" aria-label="Find a technical data sheet">
      <div className="tds-library__search"><label htmlFor="tds-search">Search products</label><div><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><input id="tds-search" type="search" placeholder="Product name or material" value={query} onChange={event => { setQuery(event.target.value); setPage(1); }} /></div></div>
      <div className="tds-library__category"><label htmlFor="tds-category">Product category</label><select id="tds-category" value={category} onChange={event => { setCategory(event.target.value); setPage(1); }}><option value="">All categories</option>{categories.map(item => <option key={item.slug} value={item.slug}>{item.label}</option>)}</select></div>
      <div className="tds-library__filter-bottom"><label className="tds-library__check"><input type="checkbox" checked={available} onChange={event => { setAvailable(event.target.checked); setPage(1); }} />Available to download</label><p>Downloads are PDFs. A short details form opens before downloading.</p></div>
    </section>
    <section aria-labelledby="tds-results-title" className="tds-library__results">
      <div className="tds-library__results-heading"><h2 id="tds-results-title" ref={resultsHeading} tabIndex={-1}>Product documents</h2><div><p role="status">{filtered.length} {filtered.length === 1 ? "product" : "products"}{hasFilters ? " found" : " in the library"}</p>{hasFilters && <button type="button" onClick={reset}>Clear filters</button>}</div></div>
      {shown.length ? <ul className="tds-library__list">{shown.map(product => <li key={product.slug} className="tds-library__row"><div className="tds-library__document-icon" aria-hidden="true"><svg width="25" height="30" viewBox="0 0 24 30" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M3 1h11l7 7v21H3zM14 1v8h7M7 16h10M7 21h7"/></svg></div><div className="tds-library__product"><h3>{product.name}</h3><p>{product.category}{product.chemistry !== product.category && <> · {product.chemistry}</>}</p></div><span className="tds-library__format">{product.available ? "PDF" : "On request"}</span><div className="tds-library__actions">{product.available ? <TdsDownload productName={product.name} productSlug={product.slug} /> : <Link className="button" href={`/contact?product=${product.slug}&request=technical-documentation`}>Request TDS</Link>}<Link className="tds-library__details" href={product.href} aria-label={`Product details for ${product.name}`}>Product details</Link></div></li>)}</ul> : <div className="tds-library__empty"><h3>No matching products</h3><p>Try another product name or material, or clear your filters to browse the full library.</p><button className="button" type="button" onClick={reset}>Clear filters</button></div>}
      {totalPages > 1 && <nav className="tds-library__pagination" aria-label="Document results pages"><button type="button" disabled={page === 1} onClick={() => changePage(page - 1)}>Previous</button><span>Page {page} of {totalPages}</span><button type="button" disabled={page === totalPages} onClick={() => changePage(page + 1)}>Next</button></nav>}
    </section>
    <aside className="tds-library__support"><div><h2>Can’t find your document?</h2><p>Ask our team for technical or safety documentation.</p></div><Link className="button button--primary" href="/contact?request=technical-documentation">Request documentation</Link></aside>
  </div></main>;
}

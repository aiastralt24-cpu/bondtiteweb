import Link from 'next/link';
import Image from 'next/image';
import type { Faq } from '@/lib/types';
import { catalogProducts } from '@/lib/products';
import { selectorMaterials } from '@/lib/product-selector';

export function HomeRangeFacts() {
  const facts = [
    { value: catalogProducts.length, label: 'Products to explore', href: '/products' },
    { value: new Set(catalogProducts.map(product => product.category)).size, label: 'Adhesive categories', href: '/products' },
    { value: selectorMaterials.length, label: 'Materials in the advisor', href: '#product-finder' },
  ];
  return <section className="home-facts" aria-labelledby="home-facts-title"><div className="container home-facts__grid">
    <div><span className="mono">Bondtite by Astral</span><h2 id="home-facts-title">A range built<br />around your work.</h2><Link href="/about">Get to know Bondtite <span aria-hidden="true">↗</span></Link></div>
    <dl>{facts.map(fact => <div key={fact.label}><dt>{fact.label}</dt><dd>{String(fact.value).padStart(2, '0')}</dd><Link href={fact.href} aria-label={`Explore ${fact.label.toLowerCase()}`}><span aria-hidden="true">↗</span></Link></div>)}</dl>
  </div></section>;
}

export function HomeKnowledge({ faqs }: { faqs: Faq[] }) {
  return <>
    <section className="bond-workshop" id="resources" aria-labelledby="home-library-title"><div className="container">
      <header className="bond-workshop__heading"><div><span className="mono">The Bondtite knowledge centre</span><h2 id="home-library-title" className="home-title">Make your next bond<br /><span className="home-title__accent">your best one.</span></h2></div><p>Practical guides, product specifications and expert advice to help you choose and apply the right adhesive.</p></header>
      <div className="bond-workshop__grid">
        <Link href="/applications" className="bond-workshop__scene">
          <Image src="/assets/applications/industrial.webp" alt="Metal, stone and composite surfaces" fill sizes="(max-width: 700px) 100vw, 55vw" />
          <span className="bond-workshop__tag">From surface to solution</span>
          <div className="bond-workshop__scene-copy"><span className="mono">Application guides</span><h3>Every material.<br />A different approach.</h3><span className="bond-workshop__cta">Find your application </span></div>
        </Link>
        <div className="bond-workshop__technical">
          <div className="bond-workshop__technical-top"><span className="mono">The technical library</span><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true"><path d="M11 5h18l9 9v29H11zM29 5v10h9M18 23h13M18 29h13M18 35h7" /></svg></div>
          <h3>Know it.<br />Then bond it.</h3><p>Product specifications and application instructions, ready when you need them.</p>
          <ul aria-label="Technical information available"><li>Surface preparation</li><li>Application & setting</li><li>Storage & handling</li></ul>
          <Link href="/resources/technical-data-sheets" className="bond-workshop__download">Explore technical data sheets </Link>
        </div>
      </div>
      <div className="bond-workshop__support"><div><span className="bond-workshop__support-mark" aria-hidden="true">?</span><div><h3>Some jobs need a conversation.</h3><p>Tell us what you’re bonding. We’ll help you choose.</p></div></div><Link href="/contact?request=technical-support">Talk to an expert </Link></div>
    </div></section>
    <section className="home-questions" id="faq" aria-labelledby="home-questions-title"><div className="container home-questions__grid">
      <div data-reveal><span className="mono">Before you begin</span><h2 id="home-questions-title" className="home-title">Your Bondtite questions,<br /><span className="home-title__accent">answered.</span></h2><p>Find the right adhesive.<br />Understand how to use it.</p><Link href="/contact">Ask us something else </Link></div>
      <div className="home-questions__list">{faqs.map(faq => <details key={faq.question} name="homepage-faq"><summary><span>{faq.question}</span><i aria-hidden="true" /></summary><p>{faq.answer}</p>{faq.links?.length ? <ul className="home-questions__links" aria-label="Related products and guidance">{faq.links.map(link => <li key={link.href}><Link href={link.href}>{link.label}</Link></li>)}</ul> : null}</details>)}</div>
    </div></section>
  </>;
}

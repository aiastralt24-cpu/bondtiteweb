'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ProductPack } from '@/components/product-pack';
import { TdsDownload } from '@/components/tds-download';
import type { CatalogProduct } from '@/lib/products';
import { formatPackSizes } from '@/lib/product-format';

export function HydraProductHero({ product }: { product: CatalogProduct }) {
  const sizes = formatPackSizes(product.packTypes).split('|').map(size => size.trim());
  const [size, setSize] = useState(sizes.includes('5 kg') ? '5 kg' : sizes[0]);
  const [sticky, setSticky] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setSticky(!entry.isIntersecting && entry.boundingClientRect.bottom < 100), { rootMargin:'-100px 0px 0px 0px' });
    if (hero.current) observer.observe(hero.current);
    const footerObserver = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));
    const footer = document.querySelector('footer');
    if (footer) footerObserver.observe(footer);
    return () => { observer.disconnect(); footerObserver.disconnect(); };
  }, []);
  const enquiry = `/contact?product=${product.slug}&project=${encodeURIComponent(`I’m interested in Bondtite Hydra+, pack size ${size}.`)}`;
  return <>
    <section ref={hero} className="hydra-editorial-hero container" aria-labelledby="product-title">
      <div className="hydra-editorial-hero__stage">
        <span className="hydra-editorial-hero__watermark" aria-hidden="true">HYDRA+</span>
        <div className="hydra-editorial-hero__pack"><ProductPack product={product} priority normalized /></div>
        <div className="hydra-editorial-hero__plinth" aria-hidden="true" />
        <span className="hydra-editorial-hero__image-note">5 kg pack shown</span>
      </div>
      <div className="hydra-editorial-hero__copy">
        <span className="mono">Bondtite · Wood adhesive</span>
        <h1 id="product-title">Hydra<span>+</span></h1>
        <p>Fast-setting PVA wood adhesive with anti-bubble, cross-linked technology for furniture and joinery.</p>
        <ul className="hydra-editorial-hero__benefits"><li>Fast-setting</li><li>Anti-bubble technology</li><li>EN 204 · D3</li></ul>
        <fieldset className="hydra-pack-picker"><legend>Choose your pack <span>{size}</span></legend><div>{sizes.map(pack => <label key={pack}><input type="radio" name="hydra-pack" value={pack} checked={size === pack} onChange={() => setSize(pack)} /><span>{pack}</span></label>)}</div></fieldset>
        <div className="hydra-actions"><Link className="button button--primary" href={enquiry}>Enquire about {size}</Link><TdsDownload productName={product.label} productSlug={product.slug} /></div>
      </div>
    </section>
    {sticky && !footerVisible && <aside className="hydra-enquiry-bar" aria-label="Hydra+ enquiry"><div className="container"><span><strong>Bondtite Hydra+</strong><small>{size} selected</small></span><Link href={enquiry}>Enquire about this pack</Link></div></aside>}
  </>;
}

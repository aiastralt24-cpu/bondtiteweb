'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

const groups = [
  { title: 'Products', href: '/products', description: 'Find the right chemistry for your materials.', links: [
    ['Wood adhesives', '/products/woodworking'], ['Rubber adhesives', '/products/synthetic-rubber-adhesives'], ['Epoxy adhesives', '/products/epoxy-adhesives'], ['Instant adhesives', '/products/cyanoacrylates'], ['Spray adhesives', '/products/sprayable-rubber-adhesives'], ['Stone care', '/products/stone-care'], ['Acrylic adhesives', '/products/acrylic-adhesives'],
  ] },
  { title: 'Applications', href: '/applications', description: 'Start with the work you want to do.', links: [
    ['Furniture & joinery', '/applications/furniture-and-joinery'], ['Construction & fixing', '/applications/construction-and-infrastructure'], ['Home repairs & DIY', '/applications/diy-segment'], ['Auto & upholstery', '/applications/auto-and-upholstery'],
  ] },
  { title: 'Resources', href: '/resources', description: 'Practical information for a better bond.', links: [
    ['Technical data sheets', '/resources/technical-data-sheets'], ['Application guides', '/applications'], ['Technical support', '/contact?request=technical-support'],
  ] },
  { title: 'About Bondtite', href: '/about', description: 'Meet Bondtite, from the house of Astral.', links: [
    ['Our brand', '/about'], ['Become a dealer', '/become-a-dealer'],
  ] },
  { title: 'Contact', href: '/contact', description: 'Let’s talk about your next project.', links: [
    ['Talk to our team', '/contact'], ['Product selection help', '/contact?request=product-selection'], ['Dealer enquiries', '/become-a-dealer'],
  ] },
];

export function FullscreenMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const element = dialog.current!;
    if (open && !element.open) {
      element.showModal();
      closeButton.current?.focus();
    } else if (!open && element.open) element.close();
  }, [open]);
  useEffect(() => {
    const element = dialog.current;
    return () => element?.close();
  }, []);

  return <dialog ref={dialog} id="site-menu" className="site-menu" aria-label="Main menu" onCancel={event => { event.preventDefault(); onClose(); }} onClose={onClose}>
    <div className="site-menu__shell">
      <div className="site-menu__top"><Link href="/" onClick={onClose} aria-label="Bondtite home"><Image src="/assets/brand/bondtite-blue.png" alt="Bondtite" width={3601} height={1174} /></Link><button ref={closeButton} type="button" onClick={onClose}>Close <span aria-hidden="true">×</span></button></div>
      <div className="site-menu__body">
        <nav className="site-menu__navigation" aria-label="Explore Bondtite">
          {groups.map((group, index) => <details key={group.title} name="site-menu-group" open={index === 0}>
            <summary><span>{group.title}</span><span className="site-menu__toggle" aria-hidden="true">+</span></summary>
            <div className="site-menu__panel"><span className="site-menu__label">Explore {group.title}</span><p>{group.description}</p><div className="site-menu__shortcuts">{group.links.map(([label, href]) => <Link key={href} href={href} onClick={onClose}>{label}<span aria-hidden="true">↗</span></Link>)}</div><Link className="site-menu__view" href={group.href} onClick={onClose}>View {group.title === 'About Bondtite' ? 'our story' : `all ${group.title.toLowerCase()}`} <span aria-hidden="true">→</span></Link></div>
          </details>)}
        </nav>
        <aside className="site-menu__advisor"><span className="site-menu__label">Product advisor</span><h2>What are you bonding?</h2><p>Find an adhesive for your materials.</p><Link href="/product-advisor" onClick={onClose}>Open Product advisor <span aria-hidden="true">↗</span></Link></aside>
      </div>
      <div className="site-menu__bottom"><a href="mailto:customercare@astraladhesives.com">customercare@astraladhesives.com</a><a href="tel:+917311103331">+91 73111 03331</a><Link href="/become-a-dealer" onClick={onClose}>Become a dealer <span aria-hidden="true">↗</span></Link></div>
    </div>
  </dialog>;
}

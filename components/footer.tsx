import Link from "next/link";
import Image from "next/image";
import type { FooterColumn } from "@/lib/types";

export function Footer({ footer, showContact = true }: { footer: { columns: FooterColumn[] }; showContact?: boolean }) {
  return (
    <footer className="footer bond-footer">
      <div className="container">
        {showContact && <div className="bond-footer__intro" id="contact">
          <div><span className="bond-footer__eyebrow">Good work starts with a good bond.</span><h2>Let’s build<br /><span>something that lasts.</span></h2></div>
          <div className="bond-footer__start"><h3>Have a project in mind?</h3><p>Tell us what you’re bonding.<br />We’ll help you find the right product.</p><Link href="/contact">Talk to our team</Link></div>
        </div>}
        <div className="bond-footer__contact" aria-label="Contact options">
          <div><span>Email our team</span><a href="mailto:customercare@astraladhesives.com">customercare@astraladhesives.com</a></div>
          <div><span>Call us</span><a href="tel:+917311103331">+91 73111 03331</a></div>
          <div><span>Grow with Bondtite</span><Link href="/become-a-dealer">Become a dealer</Link></div>
        </div>
        <div className="bond-footer__directory">
          <div className="bond-footer__brand">
            <Link className="wordmark" href="/" aria-label="Bondtite by Astral home"><Image src="/assets/bondtite-logo-positive.png" alt="Bondtite" width={2154} height={543} /></Link>
            <span className="bond-footer__astral">BY ASTRAL</span>
            <p>For the things we make.<br />And everything we bring together.</p>
            <Link className="bond-footer__finder" href="/product-advisor">Product advisor</Link><p><Link href="/resources">Technical resources</Link></p>
          </div>
          {footer.columns.filter(column => column.title.toLowerCase() !== "resources").map(column => <nav key={column.title} aria-label={`Footer ${column.title}`}><h3>{column.title}</h3><ul>{column.links.map(link => <li key={link.href + link.label}><Link href={link.href}>{link.label}</Link></li>)}</ul></nav>)}
        </div>
        <div className="bond-footer__bottom"><span>© {new Date().getFullYear()} Bondtite by Astral.</span><nav className="bond-footer__policies" aria-label="Website policies"><Link href="/privacy-policy">Privacy Policy</Link><Link href="/cookie-policy">Cookie Policy</Link><Link href="/terms-and-conditions">Terms & Conditions</Link></nav></div>
      </div>
    </footer>
  );
}

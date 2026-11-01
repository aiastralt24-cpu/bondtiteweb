import Link from "next/link";
import Image from "next/image";
import type { FooterColumn } from "@/lib/types";

export function Footer({ showContact = true }: { footer: { columns: FooterColumn[] }; showContact?: boolean }) {
  return (
    <footer className="footer bond-footer bond-footer--renewed">
      <div className="container">
        {showContact && <div className="bond-footer__intro" id="contact">
          <div><span className="bond-footer__eyebrow">Let’s get to work</span><h2 className="home-title">Good things start<br />with <span className="home-title__accent">a strong bond.</span></h2><p className="bond-footer__invitation">Tell us what you’re making. We’ll help you find the right adhesive.</p></div>
          <div className="bond-footer__start"><Link href="/contact"><span>Start a conversation</span></Link><span className="bond-footer__start-note">Product guidance. Project support.</span></div>
        </div>}
        <nav className="footer-strip" aria-label="Footer navigation">
          <Link href="/products">Products</Link>
          <Link href="/applications">Applications</Link>
          <Link href="/about">About Bondtite</Link>
          <Link href="/resources">Resources</Link>
          <Link href="/become-a-dealer">Become a dealer</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/product-advisor">Product advisor</Link>
        </nav>
        <div className="footer-signoff__brand" data-reveal>
          <Link href="/" aria-label="Bondtite by Astral home"><span className="footer-signoff__wordmark"><Image src="/assets/brand/bondtite-white.png" alt="Bondtite" width={3601} height={1174} sizes="100vw" /></span></Link>
        </div>
        <div className="bond-footer__bottom"><span>© {new Date().getFullYear()} Bondtite by Astral.</span><nav className="bond-footer__policies" aria-label="Website policies"><Link href="/privacy-policy">Privacy Policy</Link><Link href="/cookie-policy">Cookie Policy</Link><Link href="/terms-and-conditions">Terms & Conditions</Link></nav></div>
      </div>
    </footer>
  );
}

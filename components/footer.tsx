import Image from "next/image";
import type { FooterColumn } from "@/lib/types";

export function Footer({ footer }: { footer: { columns: FooterColumn[] } }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-contact" id="contact" aria-label="Contact options">
          <a href="mailto:customercare@astraladhesives.com">
            <span>Email</span>
            customercare@astraladhesives.com
          </a>
          <a href="tel:+917311103331">
            <span>Trade desk</span>
            +91-7311103331
          </a>
          <a href="mailto:dealer@bondtite.in">
            <span>Become a dealer</span>
            Apply online
          </a>
        </div>
        <div className="footer__grid">
          <div>
            <a className="wordmark" href="/" aria-label="Bondtite by Astral home">
              <Image
                src="/assets/bondtite-logo-positive.png"
                alt="Bondtite Adhesives"
                width={2154}
                height={543}
              />
            </a>
            <p>
              Adhesive engineering for carpenters, contractors, fabricators and
              retailers working in demanding site conditions.
            </p>
          </div>
          {footer.columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3>{column.title}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="footer__bottom">
          © 2026 Bondtite by Astral. Homepage v1 design system prototype.
        </div>
      </div>
    </footer>
  );
}

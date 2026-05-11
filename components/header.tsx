import Image from "next/image";
import type { Cta, NavItem } from "@/lib/types";

export function Header({ navigation, cta }: { navigation: NavItem[]; cta: Cta }) {
  return (
    <header className="header">
      <div className="container header__inner">
        <a className="wordmark" href="/" aria-label="Bondtite by Astral home">
          <Image
            src="/assets/bondtite-logo-positive.png"
            alt="Bondtite Adhesives"
            width={2154}
            height={543}
            priority
          />
        </a>
        <nav className="nav" aria-label="Primary navigation">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <a className="button button--primary" href={cta.href}>
          {cta.label}
        </a>
      </div>
    </header>
  );
}

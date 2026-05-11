"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Cta, NavItem } from "@/lib/types";

export function Header({
  navigation,
  cta,
  variant = "default"
}: {
  navigation: NavItem[];
  cta: Cta;
  variant?: "default" | "heroOverlay";
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isHeroOverlay = variant === "heroOverlay";

  useEffect(() => {
    if (!isHeroOverlay) {
      return;
    }

    const updateHeaderState = () => {
      setIsScrolled(window.scrollY > 16);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });

    return () => window.removeEventListener("scroll", updateHeaderState);
  }, [isHeroOverlay]);

  const headerClassName = [
    "header",
    isHeroOverlay ? "header--hero" : "",
    isHeroOverlay && !isScrolled && !isMenuOpen ? "header--transparent" : "",
    isHeroOverlay && (isScrolled || isMenuOpen) ? "header--scrolled" : "",
    isMenuOpen ? "header--menu-open" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={headerClassName}>
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
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span>{isMenuOpen ? "Close" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
      </div>
      <div
        className="mobile-nav"
        id="mobile-navigation"
        data-open={isMenuOpen}
        aria-hidden={!isMenuOpen}
      >
        <nav className="container mobile-nav__inner" aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            className="button button--primary"
            href={cta.href}
            onClick={() => setIsMenuOpen(false)}
          >
            {cta.label}
          </a>
        </nav>
      </div>
    </header>
  );
}

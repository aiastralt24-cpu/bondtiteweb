"use client";

import Link from "next/link";
import { useHeroBrandMotion } from "@/components/use-hero-brand-motion";
import { FullscreenMenu } from "@/components/fullscreen-menu";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Cta, NavItem } from "@/lib/types";

export function Header({
  cta,
  variant = "default"
}: {
  navigation: NavItem[];
  cta: Cta;
  variant?: "default" | "heroOverlay";
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const isHeroOverlay = variant === "heroOverlay";
  const headerRef = useRef<HTMLElement>(null);
  useHeroBrandMotion(headerRef, isHeroOverlay, isMenuOpen);

  useEffect(() => {
    if (!isHeroOverlay) {
      return;
    }

    const updateHeaderState = () => {
      const hero = document.querySelector('.campaign-hero');
      setIsScrolled(hero ? hero.getBoundingClientRect().bottom <= 104 : window.scrollY > 80);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
    };
  }, [isHeroOverlay]);

  const headerClassName = [
    "header",
    "header--unified",
    isHeroOverlay ? "header--hero" : "",
    isHeroOverlay && !isScrolled && !isMenuOpen ? "header--transparent" : "",
    isHeroOverlay && (isScrolled || isMenuOpen) ? "header--scrolled" : "",
    isMenuOpen ? "header--menu-open" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header ref={headerRef} className={headerClassName} onKeyDown={(event) => { if (event.key === "Escape" && isMenuOpen) { setIsMenuOpen(false); menuButton.current?.focus(); } }}>
      <a className="skip-content" href="#main-content" onClick={event=>{const main=document.querySelector('main');if(main){event.preventDefault();main.id='main-content';main.tabIndex=-1;main.focus();main.scrollIntoView({block:'start',behavior:'instant'});}}}>Skip to content</a>
      <div className="container header__inner">
        <div className="header__capsule">
        <Link className="wordmark" href="/" aria-label="Bondtite by Astral home">
          <Image
            className="brand-logo--blue"
            src="/assets/brand/bondtite-blue.png"
            alt="Bondtite Adhesives"
            width={3601}
            height={1174}
            priority
          />
          {isHeroOverlay && <Image className="brand-logo--white" src="/assets/brand/bondtite-white.png" alt="" aria-hidden="true" width={3601} height={1174} priority />}
        </Link>
        </div>
        <div className="header__tools">
        <Link className="header__advisor-icon" href={cta.href} aria-label={cta.label} title={cta.label}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg></Link>
        <button
          className="menu-toggle"
          ref={menuButton}
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Menu"}
          aria-expanded={isMenuOpen}
          aria-controls="site-menu"
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          <span>{isMenuOpen ? "Close" : "Menu"}</span>
          <i aria-hidden="true" />
        </button>
        </div>
      </div>
      <FullscreenMenu open={isMenuOpen} onClose={() => { setIsMenuOpen(false); }} />
    </header>
  );
}

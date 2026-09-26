"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function ProductPanelStack({ enabled, children }: { enabled: boolean; children: ReactNode }) {
  const stack = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!enabled || !stack.current) return;
    const root = stack.current;
    const cards = Array.from(root.children).filter((element): element is HTMLElement => element instanceof HTMLElement);
    const media = matchMedia("(min-width: 1000px) and (min-height: 850px) and (prefers-reduced-motion: no-preference)");
    function measure() {
      root.dataset.stacking = String(media.matches);
      cards.forEach((card, index) => {
        // Keep panels taller than the available screen in normal document flow.
        const top = 176 + index * 14;
        card.dataset.fitsStack = String(card.offsetHeight <= window.innerHeight - top - 24);
        card.style.setProperty("--panel-top", `${top}px`);
        card.style.setProperty("--panel-order", String(index + 1));
      });
    }
    const observer = new ResizeObserver(measure);
    cards.forEach(card => observer.observe(card));
    media.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    measure();
    return () => { observer.disconnect(); media.removeEventListener("change", measure); window.removeEventListener("resize", measure); };
  }, [enabled]);
  return <div ref={stack} className={enabled ? "product-panel-stack" : "product-panel-stack--plain"}>{children}</div>;
}

"use client";

import { useEffect, useRef, useState } from "react";

type Section = { id: string; label: string };

export function ProductSectionNav({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const nav = useRef<HTMLElement>(null);
  const pending = useRef<{ id: string; until: number } | null>(null);

  useEffect(() => {
    let frame = 0;
    let timer: ReturnType<typeof setTimeout>;
    function update() {
      frame = 0;
      if (pending.current && performance.now() < pending.current.until) return;
      pending.current = null;
      let current = sections[0]?.id ?? "";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (!element) continue;
        const style = getComputedStyle(element);
        const margin = parseFloat(style.scrollMarginTop) || 100;
        const stickyTop = style.position === "sticky" ? parseFloat(style.top) || 0 : 0;
        const offset = Math.max(margin, stickyTop);
        if (element.getBoundingClientRect().top <= offset + 24) current = section.id;
      }
      setActive(current);
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    function interrupt() { pending.current = null; schedule(); }
    function hashChange() {
      const id = window.location.hash.slice(1);
      if (sections.some(section => section.id === id)) {
        pending.current = { id, until: performance.now() + 1200 };
        setActive(id);
        clearTimeout(timer);
        timer = setTimeout(schedule, 1250);
      } else schedule();
    }
    hashChange();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", hashChange);
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("keydown", interrupt);
    return () => {
      cancelAnimationFrame(frame); clearTimeout(timer);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", hashChange);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("keydown", interrupt);
    };
  }, [sections]);

  useEffect(() => {
    const link = nav.current?.querySelector<HTMLAnchorElement>('[aria-current="location"]');
    const container = link?.parentElement;
    if (!link || !container || container.scrollWidth <= container.clientWidth) return;
    const left = link.offsetLeft - container.offsetLeft;
    container.scrollTo({ left: left - (container.clientWidth - link.offsetWidth) / 2, behavior: "instant" });
  }, [active]);

  return <nav ref={nav} className="product-section-nav" aria-label="Product sections"><div className="container">{sections.map(section => <a key={section.id} href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined} onClick={(event) => {
    pending.current = { id: section.id, until: performance.now() + 1200 };
    setActive(section.id);
    const target = document.getElementById(section.id);
    const stack = target?.parentElement;
    if (!target || !stack?.matches('.product-panel-stack[data-stacking="true"]') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    // A pinned card's visual position no longer identifies its place in the document.
    event.preventDefault();
    let top = stack.getBoundingClientRect().top + window.scrollY + parseFloat(getComputedStyle(stack).paddingTop);
    for (const sibling of Array.from(stack.children)) {
      if (sibling === target) break;
      const style = getComputedStyle(sibling);
      top += sibling.getBoundingClientRect().height + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    }
    window.history.pushState(null, "", `#${section.id}`);
    window.scrollTo({ top: top - (parseFloat(getComputedStyle(target).scrollMarginTop) || 165), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }}>{section.label}</a>)}</div></nav>;
}

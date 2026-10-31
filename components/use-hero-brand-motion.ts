'use client';

import { useLayoutEffect, type RefObject } from 'react';

/** Move the real home link between the hero artwork and its header slot. */
export function useHeroBrandMotion(ref: RefObject<HTMLElement | null>, enabled: boolean, menuOpen: boolean) {
  useLayoutEffect(() => {
    const header = ref.current;
    const anchor = document.querySelector<HTMLElement>('.campaign-hero__brand');
    const hero = document.querySelector<HTMLElement>('.campaign-hero');
    const logo = header?.querySelector<HTMLElement>('.wordmark');
    const slot = header?.querySelector<HTMLElement>('.header__capsule');
    if (!enabled || !header || !anchor || !hero || !logo || !slot) return;
    const simple = window.matchMedia('(max-width: 700px), (prefers-reduced-motion: reduce)');
    let frame = 0;
    let origin = { x: 0, y: 0, width: 0 };
    let destination = { x: 0, y: 0, width: 0 };
    let distance = 400;
    function render() {
      frame = 0;
      if (!header || !logo || !anchor) return;
      const raw = Math.min(1, Math.max(0, window.scrollY / distance));
      const progress = raw * raw * (3 - 2 * raw);
      header.dataset.brandMotion = simple.matches ? 'fade' : 'travel';
      if (menuOpen) {
        logo.style.transform = 'none';
        logo.style.opacity = '1';
        anchor.style.opacity = '0';
      } else if (simple.matches) {
        logo.style.transform = 'none';
        // Sequential fades avoid two prominent brand marks at the same time.
        logo.style.opacity = String(Math.max(0, (progress - .5) * 2));
        anchor.style.opacity = String(Math.max(0, 1 - progress * 2));
      } else {
        const x = (origin.x - destination.x) * (1 - progress);
        const y = (origin.y - destination.y) * (1 - progress);
        const scale = 1 + (origin.width / destination.width - 1) * (1 - progress);
        logo.style.transform = `translate3d(${x}px,${y}px,0) scale(${scale})`;
        logo.style.opacity = '1';
        anchor.style.opacity = '0';
      }
      // The still-invisible home link should not receive keyboard focus.
      const hidden = !menuOpen && simple.matches && progress <= .5;
      logo.tabIndex = hidden ? -1 : 0;
      logo.style.pointerEvents = hidden ? 'none' : '';
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(render); }
    function measure() {
      if (!anchor || !slot || !hero) return;
      const start = anchor.getBoundingClientRect(), end = slot.getBoundingClientRect();
      origin = { x: start.left, y: start.top + window.scrollY, width: start.width };
      destination = { x: end.left, y: end.top, width: end.width };
      distance = Math.max(180, Math.min(420, hero.offsetHeight * .6));
      render();
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(anchor);
    observer.observe(slot);
    const inner = header.querySelector('.header__inner');
    if (inner) observer.observe(inner);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    simple.addEventListener('change', measure);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      simple.removeEventListener('change', measure);
      delete header.dataset.brandMotion;
      logo.style.removeProperty('transform');
      logo.style.removeProperty('opacity');
      logo.style.removeProperty('pointer-events');
      logo.removeAttribute('tabindex');
      anchor.style.removeProperty('opacity');
    };
  }, [ref, enabled, menuOpen]);
}

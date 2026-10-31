"use client";

import { useEffect, useLayoutEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type Handoff = {
  path: string; id: string; snapshot: HTMLElement; from: DOMRect;
  source: HTMLElement; sourceOpacity: string;
  target?: HTMLElement; animation?: Animation; timer?: ReturnType<typeof setTimeout>;
  frame?: number; opacity?: string; scrollBehavior: string;
};

/** The router owns navigation; this optional snapshot only bridges the pack image. */
export function ProductTransition() {
  const pathname = usePathname();
  const pending = useRef<Handoff | null>(null);
  const clear = useRef(() => {});

  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    const cancel = () => {
      const task = pending.current;
      pending.current = null;
      if (!task) return;
      clearTimeout(task.timer);
      if (task.frame) cancelAnimationFrame(task.frame);
      task.animation?.cancel();
      if (task.target) task.target.style.opacity = task.opacity ?? '';
      task.source.style.opacity = task.sourceOpacity;
      task.snapshot.remove();
      document.documentElement.style.scrollBehavior = task.scrollBehavior;
    };
    clear.current = cancel;
    const capture = (event: MouseEvent) => {
      if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.defaultPrevented) return;
      const link = (event.target as Element)?.closest<HTMLAnchorElement>('a[href]');
      if (!link || link.target || link.hasAttribute('download')) return;
      cancel();
      const url = new URL(link.href);
      if (preference.matches || url.origin !== location.origin || url.pathname === location.pathname || !/^\/products\/[^/]+\/[^/]+\/?$/.test(url.pathname)) return;
      const card = link.querySelector('[data-product-pack]') ? link : link.closest('article');
      const id = url.pathname.replace(/\/$/, '').split('/').pop();
      const pack = Array.from(card?.querySelectorAll<HTMLElement>('[data-product-pack]') ?? [])
        .find(element => element.dataset.productPack === id);
      const crop = pack?.querySelector<HTMLElement>('.product-image__crop');
      const image = crop?.querySelector('img');
      if (!pack || !crop || !image?.complete || !image.naturalWidth) return;
      const from = crop.getBoundingClientRect();
      const headerBottom = document.querySelector('header.header')?.getBoundingClientRect().bottom ?? 0;
      if (!from.width || from.top < headerBottom || from.bottom > innerHeight) return;
      const snapshot = crop.cloneNode(true) as HTMLElement;
      snapshot.className = 'product-route-snapshot';
      snapshot.setAttribute('aria-hidden', 'true');
      snapshot.inert = true;
      Object.assign(snapshot.style, {position:'fixed',left:`${from.left}px`,top:`${from.top}px`,width:`${from.width}px`,height:`${from.height}px`,overflow:'hidden',pointerEvents:'none',zIndex:'90',transformOrigin:'0 0',display:'block'});
      const copy = snapshot.querySelector('img')!;
      // Freeze the already-decoded source; avoid selecting a new srcset mid-flight.
      copy.removeAttribute('srcset'); copy.removeAttribute('sizes'); copy.src = image.currentSrc;
      Object.assign(copy.style,{position:'absolute',maxWidth:'none',objectFit:'fill'});
      snapshot.style.mixBlendMode = getComputedStyle(pack).mixBlendMode;
      snapshot.style.filter = getComputedStyle(pack).filter;
      document.body.append(snapshot);
      const task: Handoff = {path:url.pathname,id:pack.dataset.productPack!,snapshot,from,source:crop,sourceOpacity:crop.style.opacity,scrollBehavior:document.documentElement.style.scrollBehavior};
      crop.style.opacity = '0';
      document.documentElement.style.scrollBehavior = 'auto';
      pending.current = task;
      task.timer = setTimeout(cancel, 1600);
    };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') cancel(); };
    document.addEventListener('click', capture, true);
    window.addEventListener('popstate', cancel);
    window.addEventListener('resize', cancel);
    window.addEventListener('wheel', cancel, {passive:true});
    window.addEventListener('touchstart', cancel, {passive:true});
    document.addEventListener('keydown', escape);
    preference.addEventListener('change', cancel);
    return () => {
      cancel();
      document.removeEventListener('click', capture, true);
      window.removeEventListener('popstate', cancel);
      window.removeEventListener('resize', cancel);
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      document.removeEventListener('keydown', escape);
      preference.removeEventListener('change', cancel);
    };
  }, []);

  useLayoutEffect(() => {
    const task = pending.current;
    if (!task) return;
    if (task.path !== pathname) { clear.current(); return; }
    const pack = document.querySelector<HTMLElement>('main .product-split__visual [data-product-pack]');
    const target = pack?.querySelector<HTMLElement>('.product-image__crop');
    const image = target?.querySelector('img');
    if (!target || !image || pack?.dataset.productPack !== task.id) { clear.current(); return; }
    task.target = target;
    task.opacity = target.style.opacity;
    target.style.opacity = '0';
    // A related-product link can reuse the same route layout. Start the new
    // product at its introduction instead of carrying over the previous scroll.
    window.scrollTo({top:0,behavior:'instant'});
    // Allow the router's scroll reset to settle before measuring the destination.
    task.frame = requestAnimationFrame(() => {
      task.frame = requestAnimationFrame(async () => {
        try { await image.decode(); } catch { if (pending.current === task) clear.current(); return; }
        if (pending.current !== task) return;
        const to = target.getBoundingClientRect();
        if (!to.width || to.top < 0 || to.bottom > innerHeight) { clear.current(); return; }
        const scale = to.width / task.from.width;
        task.animation = task.snapshot.animate([
          {transform:'translate(0, 0) scale(1)'},
          {transform:`translate(${to.left-task.from.left}px, ${to.top-task.from.top}px) scale(${scale})`}
        ], {duration:380,easing:'cubic-bezier(.22,1,.36,1)',fill:'forwards'});
        task.animation.onfinish = () => { if (pending.current === task) clear.current(); };
      });
    });
    return () => { if (pending.current === task) clear.current(); };
  }, [pathname]);
  return null;
}

'use client';

import { useEffect, useRef } from 'react';
import { campaign } from '@/lib/campaign';

export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const requested = useRef(false);

  useEffect(() => {
    const media = video.current!;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = true;
    requested.current = !preference.matches && !connection?.saveData;
    const sync = () => {
      if (requested.current && visible && !document.hidden && !document.querySelector('.campaign-dialog[open], .site-menu[open]')) {
        if (!media.getAttribute('src')) media.src = campaign.film;
        void media.play().catch(() => { /* Keep the poster when autoplay is unavailable. */ });
      } else media.pause();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(media);
    const dialogObserver = new MutationObserver(sync);
    dialogObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] });
    const reduced = () => { if (preference.matches) requested.current = false; sync(); };
    preference.addEventListener('change', reduced);
    document.addEventListener('visibilitychange', sync);
    sync();
    return () => {
      observer.disconnect(); dialogObserver.disconnect(); media.pause();
      preference.removeEventListener('change', reduced);
      document.removeEventListener('visibilitychange', sync);
    };
  }, []);

  return <>
    <video ref={video} className="campaign-hero__video" poster={campaign.poster} muted loop playsInline preload="none" aria-hidden="true" />

  </>;
}

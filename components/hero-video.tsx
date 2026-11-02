'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { campaign } from '@/lib/campaign';

const bondOutline = 'M500 252L460 185H280V319H460L540 185H720V319H540Z';

type FilmState = 'loading' | 'ready' | 'blocked' | 'error';

export function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const maskId = useId();
  const requested = useRef(false);
  const [state, setState] = useState<FilmState>('loading');
  const startFilm = useRef<() => void>(() => {});

  useEffect(() => {
    const media = video.current!;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    let visible = true;
    let disposed = false;
    let revealed = false;
    let loadingTimer: ReturnType<typeof setTimeout> | undefined;
    requested.current = !preference.matches && !connection?.saveData;
    const sync = () => {
      if (requested.current && visible && !document.hidden && !document.querySelector('.campaign-dialog[open], .site-menu[open]')) {
        if (!media.getAttribute('src')) media.src = campaign.film;
        void media.play().catch(error => {
          if (!disposed && !revealed && error.name !== 'AbortError') setState('blocked');
        });
      } else media.pause();
    };
    const playing = () => { revealed = true; clearTimeout(loadingTimer); setState('ready'); };
    const failed = () => { clearTimeout(loadingTimer); setState('error'); };
    media.addEventListener('playing', playing);
    media.addEventListener('error', failed);
    startFilm.current = () => {
      requested.current = true;
      setState('loading');
      clearTimeout(loadingTimer);
      loadingTimer = setTimeout(() => { if (!revealed) setState('blocked'); }, 10000);
      sync();
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(media);
    const dialogObserver = new MutationObserver(sync);
    dialogObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] });
    const reduced = () => { if (preference.matches) { requested.current = false; if (!revealed) setState('blocked'); } sync(); };
    preference.addEventListener('change', reduced);
    document.addEventListener('visibilitychange', sync);
    if (requested.current) {
      loadingTimer = setTimeout(() => { if (!revealed) setState('blocked'); }, 10000);
    } else {
      // Deferred initial state keeps reduced-motion / data-saving visitors in control.
      loadingTimer = setTimeout(() => setState('blocked'), 0);
    }
    sync();
    return () => {
      disposed = true;
      clearTimeout(loadingTimer);
      observer.disconnect(); dialogObserver.disconnect(); media.pause();
      media.removeEventListener('playing', playing);
      media.removeEventListener('error', failed);
      preference.removeEventListener('change', reduced);
      document.removeEventListener('visibilitychange', sync);
      startFilm.current = () => {};
    };
  }, []);

  return <>
    <video ref={video} className={`campaign-hero__video campaign-hero__video--${state}`} muted loop playsInline preload="none" aria-hidden="true" />
    <svg className={`hero-film-mask hero-film-mask--${state}`} viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs><mask id={maskId} maskUnits="userSpaceOnUse" x="-2000" y="-2000" width="5000" height="5000">
        <rect x="-2000" y="-2000" width="5000" height="5000" fill="white" />
        <path className="hero-film-mask__opening" d={bondOutline} fill="none" stroke="black" strokeWidth="34" strokeLinejoin="miter" />
      </mask></defs>
      <rect x="-2000" y="-2000" width="5000" height="5000" fill="#2854a1" mask={`url(#${maskId})`} />
      <path className="hero-film-mask__outline" d={bondOutline} fill="none" stroke="#f7f6f2" strokeWidth="3" strokeLinejoin="miter" />
    </svg>
    <div className={`hero-film-intro hero-film-intro--${state}`} aria-hidden={state === 'ready' ? true : undefined}>
      {state === 'loading' && <span role="status">Bringing the story together</span>}
      {state === 'blocked' && <button type="button" onClick={() => startFilm.current()}>Play the film</button>}
      {state === 'error' && <span role="status">The film is unavailable right now.</span>}
    </div>
  </>;
}

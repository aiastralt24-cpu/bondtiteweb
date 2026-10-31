"use client";

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { campaign } from '@/lib/campaign';

/** The full film downloads only after an explicit play action. */
export function CampaignDvc({ className = '' }: { className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const opener = useRef<HTMLAnchorElement>(null);
  const [failed, setFailed] = useState(false);
  const titleId = useId();
  useEffect(() => {
    const element = dialog.current;
    const film = video.current;
    return () => { film?.pause(); element?.close(); };
  }, []);

  function close() {
    video.current?.pause();
    dialog.current?.close();
  }
  function reset() {
    const film = video.current;
    if (film) { film.pause(); film.removeAttribute('src'); film.load(); }
    opener.current?.focus({ preventScroll: true });
  }
  async function open(event: React.MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0 || !dialog.current?.showModal) return;
    event.preventDefault();
    setFailed(false);
    dialog.current.showModal();
    const film = video.current;
    if (!film) return;
    film.src = campaign.film;
    film.currentTime = 0;
    try { await film.play(); } catch { /* Native play controls remain available. */ }
  }
  return <>
    <a ref={opener} className={`campaign-watch ${className}`} href={campaign.film} onClick={open} aria-haspopup="dialog"><span className="campaign-watch__icon" aria-hidden="true">▶</span><span>Watch the film<small>{campaign.featuring}</small></span><span aria-hidden="true">↗</span></a>
    <dialog ref={dialog} className="campaign-dialog" aria-labelledby={titleId} onClose={reset} onCancel={close} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="campaign-dialog__bar"><h2 id={titleId}>{campaign.eyebrow}</h2><button type="button" onClick={close} aria-label="Close film">Close <span aria-hidden="true">×</span></button></div>
      <video ref={video} controls playsInline preload="none" poster={campaign.poster} aria-label={campaign.title} onError={() => setFailed(true)}>
        {campaign.captions && <track kind="captions" src={campaign.captions} srcLang="en" label="English" default />}
      </video>
      {failed && <p className="campaign-dialog__error">The film could not load. <a href={campaign.film}>Open the video directly</a>.</p>}
      <div className="campaign-dialog__footer"><span>{campaign.featuring} · Bondtite by Astral</span><Link href="/products/woodworking/bondtite-hydra">Explore Hydra+ ↗</Link></div>
    </dialog>
  </>;
}

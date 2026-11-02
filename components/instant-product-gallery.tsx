"use client";

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

type GalleryImage = { src: string; alt: string; label: string };
export function InstantProductGallery({ images }: { images: GalleryImage[] }) {
  const [selected, setSelected] = useState(0);
  const touchStart = useRef<{x:number;y:number}|null>(null);
  const swiped = useRef(false);
  const choices = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const button = choices.current?.children[selected] as HTMLElement | undefined;
    if (button && choices.current) choices.current.scrollLeft = Math.max(0, button.offsetLeft - choices.current.offsetLeft - 12);
  }, [selected]);
  const dialog = useRef<HTMLDialogElement>(null);
  const [expanded, setExpanded] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [expanded]);
  const current = images[selected];
  return <div className="instant-gallery">
    <button type="button" className={`instant-gallery__stage ${selected === 0 ? 'instant-gallery__stage--pack' : ''}`} aria-label={`Enlarge ${current.label.toLowerCase()}`} onTouchStart={event => { const touch=event.touches[0]; touchStart.current={x:touch.clientX,y:touch.clientY}; swiped.current=false; }} onTouchEnd={event => { const start=touchStart.current; touchStart.current=null; if(!start)return; const touch=event.changedTouches[0]; const dx=touch.clientX-start.x,dy=touch.clientY-start.y; if(Math.abs(dx)>45 && Math.abs(dx)>Math.abs(dy)*1.5){ swiped.current=true; setSelected(index=>Math.max(0,Math.min(images.length-1,index+(dx<0?1:-1)))); } }} onClick={() => { if(swiped.current){swiped.current=false;return;} setZoomed(false); setExpanded(true); dialog.current?.showModal(); }}><Image key={current.src} src={current.src} alt={current.alt} width={720} height={720} priority={selected === 0} sizes="(max-width: 760px) 90vw, 45vw" /><span className="instant-gallery__enlarge">Enlarge image</span></button>
    <div ref={choices} className="instant-gallery__choices" aria-label="Product images">{images.map((image,index)=><button key={image.src} type="button" aria-pressed={selected===index} onClick={()=>{swiped.current=false;setSelected(index);}}><Image src={image.src} alt="" width={60} height={60}/><span>{image.label}</span></button>)}</div>
    <p className="instant-gallery__caption" aria-live="polite"><span>{selected+1} / {images.length}</span> {current.label}</p>
    <dialog ref={dialog} className="instant-gallery-dialog" aria-label={`${current.label} enlarged`} onClose={() => setExpanded(false)}>
      {expanded && <><div className="instant-gallery-dialog__toolbar"><strong>{current.label}</strong><button type="button" aria-pressed={zoomed} onClick={() => setZoomed(!zoomed)}>{zoomed ? 'Fit image' : 'Zoom in'}</button><button type="button" onClick={() => dialog.current?.close()}>Close</button></div><div className={`instant-gallery-dialog__image${zoomed ? ' is-zoomed' : ''}`}><Image src={current.src} alt={current.alt} width={2000} height={2000} sizes="2000px" /></div><p>{current.alt}</p></>}
    </dialog>
  </div>;
}

export function InstantBuyBar({ title, pack, href }: { title: string; pack: string; href: string }) {
  const [visible,setVisible]=useState(false);
  const bar=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const hero=document.getElementById('instant-purchase');
    if(!hero)return;
    let frame=0;
    function update(){ frame=0; setVisible(hero!.getBoundingClientRect().bottom<0); }
    function schedule(){ if(!frame)frame=requestAnimationFrame(update); }
    update();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule);
    return ()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
  },[]);
  return <div ref={bar} className="instant-buybar" hidden={!visible}><div><strong>{title}</strong><span>{pack}</span></div><a className="button button--primary" href={href} target="_blank" rel="noopener noreferrer" aria-label={`Buy ${title} on Amazon (opens in a new tab)`}>Buy on Amazon</a></div>;
}

"use client";
import { useEffect, useRef, useState } from "react";

export function CampaignDvc() {
  const video = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const attempted = useRef(false);
  useEffect(() => {
    const element = video.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setTimeout> | undefined;
    let disposed = false, visible = false;
    function pause() { clearTimeout(timer); element?.pause(); }
    function visibility() { if(document.hidden) pause(); }
    function reduced() { if(preference.matches) pause(); }
    const observer = new IntersectionObserver(([entry]) => {
      clearTimeout(timer);
      visible=entry.isIntersecting && entry.intersectionRatio>=0.3;
      if(!visible){pause();return;}
      if(attempted.current||preference.matches||document.hidden)return;
      timer=setTimeout(async()=>{
        if(disposed||!visible||document.hidden||preference.matches||attempted.current)return;
        attempted.current=true;element.muted=true;
        try { await element.play(); if(disposed||!visible||document.hidden||preference.matches){element.pause();return;}setStarted(true); }
        catch { /* Manual play remains available when autoplay is blocked. */ }
      },2500);
    },{threshold:[0,0.3]});
    observer.observe(element);
    document.addEventListener('visibilitychange',visibility);
    preference.addEventListener('change',reduced);
    return ()=>{disposed=true;pause();observer.disconnect();document.removeEventListener('visibilitychange',visibility);preference.removeEventListener('change',reduced);};
  },[]);
  async function play(){attempted.current=true;if(video.current)video.current.muted=false;setStarted(true);try{await video.current?.play();}catch{setStarted(false);}}
  return <section className="bond-film" aria-label="Bondtite campaign film"><div className="container"><div className="bond-film__heading"><span className="mono">The Bondtite story</span><h2>A bond worth watching.</h2><p>Featuring Ranbir Kapoor.</p></div><div className="bond-film__player"><video ref={video} controls={started} playsInline preload="none" poster="/assets/campaign/ranbir-slider-image.png" aria-label="Bondtite campaign film with Ranbir Kapoor"><source src="/assets/campaign/ranbir-kapoor-bondtite.mp4" type="video/mp4"/></video>{!started&&<button className="bond-film__play" onClick={play} type="button"><span aria-hidden="true">▶</span>Play the film</button>}<noscript><a className="bond-film__fallback" href="/assets/campaign/ranbir-kapoor-bondtite.mp4">Watch the campaign film</a></noscript></div></div></section>;
}

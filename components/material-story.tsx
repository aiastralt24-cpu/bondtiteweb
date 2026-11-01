"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { useCinematicScene } from "@/components/use-cinematic-scene";
import type { gsap } from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

// Condensed from Astral's Hydra+ application instructions, linked below.
const materials = [
  { name: "Prepare", note: "A clean start for both surfaces.", detail: "Clean the two surfaces before bonding. Hydra+ is ready to use; do not dilute it.", className: "prepare" },
  { name: "Apply", note: "An even coat. In the right order.", detail: "Coat the less porous surface first, then the more porous one, for example, laminate before plywood. Allow open time appropriate to temperature and humidity.", className: "apply" },
  { name: "Press", note: "Bring it together. Keep it under pressure.", detail: "Join while the adhesive is still wet on both surfaces. Maintain pressure until it dries completely, and wipe away excess with a wet cloth.", className: "press" }
];

export function MaterialStory({ pinOffset = 80, scrollDriven = true, showGuide = true }: { pinOffset?: number; scrollDriven?: boolean; showGuide?: boolean }) {
  const [selected, setSelected] = useState(0);
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const refreshScenes = useRef<() => void>(() => {});
  const setup = useCallback((motion: typeof gsap, _plugin: typeof ScrollTrigger, element: HTMLElement) => {
    if (!scrollDriven) return;
    const timeline = motion.timeline({ scrollTrigger: {
      refreshPriority: 2, trigger: element, pin: element.querySelector(".material-story__grid"), start: `top ${pinOffset}px`,
      end: () => "+=" + window.innerHeight * 1.2, scrub: 0.35, invalidateOnRefresh: true,
      onUpdate: scene => setSelected(Math.round(scene.progress * 2))
    }});
    timeline.addLabel("prepare", 0).fromTo(element.querySelector(".material-story__watermark"), { y: 20 }, { y: -20, duration: 2, ease: "none" }, 0)
      .addLabel("apply", 1).addLabel("press", 2);
    trigger.current = timeline.scrollTrigger ?? null;
    refreshScenes.current = () => _plugin.refresh();
    return () => { trigger.current = null; refreshScenes.current = () => {}; };
  }, [pinOffset, scrollDriven]);
  useCinematicScene(root, setup, scrollDriven);
  const choose = (index: number) => {
    setSelected(index);
    const scene = trigger.current;
    if (scene) window.scrollTo({ top: scene.start + (scene.end - scene.start) * index / 2, behavior: "instant" });
  };
  const material = materials[selected];
  return (
    <section id="material-story" ref={root} className="material-story" aria-labelledby="material-story-title">
      <div className="container material-story__grid">
        <div className="material-story__copy">
          <span className="mono">The craft of a good bond / Hydra+</span>
          <h2 id="material-story-title" className="home-title">A great finish.<br /><span className="home-title__accent">Three careful steps.</span></h2>
          <p>A closer look at joining laminate and plywood with Bondtite Hydra+.</p>
          <div className="material-story__choices" aria-label="Explore Hydra+ application steps">
            {materials.map((item, index) => (
              <button type="button" key={item.name} aria-pressed={selected === index} onClick={() => choose(index)}>{item.name}</button>
            ))}
          </div>
          <div className="material-story__description" key={material.name}>
            <h3>{material.note}</h3>
            <p>{material.detail}</p>
          </div>
        </div>
        <div className={`material-story__visual material-story__visual--${material.className}`}>
          <span className="material-story__watermark" aria-hidden="true">HYDRA+</span>
          <div className="bond-assembly" aria-hidden="true">
            <div className="bond-assembly__board bond-assembly__board--top"><span>Laminate</span></div>
            <div className="bond-assembly__glue"><span>Even adhesive coat</span></div>
            <div className="bond-assembly__board bond-assembly__board--base"><span>Plywood</span></div>
            <div className="bond-assembly__pressure">↓ &nbsp; ↓ &nbsp; ↓</div>
          </div>
          <div className="story-product"><Image src="/assets/products/bondtite-hydra-pack.png" alt="Bondtite Hydra+ wood adhesive" width={240} height={300} sizes="(max-width: 700px) 140px, 220px" /><span>Bondtite Hydra+<small>Woodworking adhesive</small></span></div>
          <div className="material-story__caption"><span>{material.name}</span><span>Illustrative application sequence</span></div>
        </div>
      </div>
      {showGuide && <div className="container material-story__guide" id="hydra-application-guide">
        <div className="material-story__guide-panel">
        <details className="material-story__all" onToggle={() => refreshScenes.current()}>
          <summary><span className="material-story__guide-toggle" aria-hidden="true" /><span><strong>Application guide</strong><small>Step-by-step guidance for preparing, applying and pressing.</small></span></summary>
          <ol className="material-story__instructions">{materials.map(item => <li key={item.name}><h3>{item.name}</h3><p>{item.detail}</p></li>)}</ol>
        </details>
        <Link className="material-story__product-link" href="/products/woodworking/bondtite-hydra">Explore Hydra+</Link>
        </div>
      </div>}
    </section>
  );
}

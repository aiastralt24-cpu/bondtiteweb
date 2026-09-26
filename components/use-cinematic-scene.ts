"use client";

import { useEffect, type RefObject } from "react";
import type { gsap as Gsap } from "gsap";
import type { ScrollTrigger as Trigger } from "gsap/ScrollTrigger";

type SceneSetup = (gsap: typeof Gsap, ScrollTrigger: typeof Trigger, element: HTMLElement) => void | (() => void);

/** One lifecycle for desktop scenes, including the site's manual motion preference. */
export function useCinematicScene(ref: RefObject<HTMLElement | null>, setup: SceneSetup) {
  useEffect(() => {
    let disposed = false;
    let teardown: (() => void) | undefined;
    const element = ref.current;
    if (!element) return;
    const observer = new MutationObserver(() => start());
    let start = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      start = () => {
        teardown?.();
        if (document.documentElement.dataset.motion === "reduced") return;
        const media = gsap.matchMedia();
        media.add("(min-width: 1024px) and (min-height: 760px) and (prefers-reduced-motion: no-preference)", () => {
          element.dataset.cinematic = "true";
          const cleanup = setup(gsap, ScrollTrigger, element);
          const refresh = () => { ScrollTrigger.sort(); ScrollTrigger.refresh(); };
          const frame = requestAnimationFrame(refresh);
          const images = Array.from(element.querySelectorAll("img"));
          images.forEach(image => image.addEventListener("load", refresh));
          let active = true;
          void document.fonts.ready.then(() => { if (active) refresh(); });
          return () => {
            active = false;
            cancelAnimationFrame(frame);
            images.forEach(image => image.removeEventListener("load", refresh));
            cleanup?.();
            delete element.dataset.cinematic;
          };
        }, element);
        teardown = () => media.revert();
      };
      start();
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
    }).catch(() => { /* The static experience remains available if the enhancement fails to load. */ });
    return () => { disposed = true; observer.disconnect(); teardown?.(); };
  }, [ref, setup]);
}

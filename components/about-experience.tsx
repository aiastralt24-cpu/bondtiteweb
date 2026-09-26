"use client";

import { useCallback, useRef, type ReactNode } from "react";
import type { gsap } from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCinematicScene } from "@/components/use-cinematic-scene";

export function AboutExperience({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const setup = useCallback((motion: typeof gsap, _trigger: typeof ScrollTrigger, element: HTMLElement) => {
    const select = motion.utils.selector(element);
    motion.from(select(".brand-hero__copy > *"), { y: 26, opacity: .25, duration: .8, stagger: .09, ease: "power2.out" });
    motion.from(select(".brand-hero__visual img"), { y: 45, duration: 1.1, ease: "power2.out" });
    motion.to(select(".brand-hero__word"), { y: 90, ease: "none", scrollTrigger: { trigger: element.querySelector(".brand-hero"), start: "top top", end: "bottom top", scrub: true } });
    motion.from(select(".brand-statement h2"), { y: 45, duration: .8, scrollTrigger: { trigger: element.querySelector(".brand-statement"), start: "top 80%", toggleActions: "play none none reverse" } });
  }, []);
  useCinematicScene(ref, setup);
  return <main id="main-content" tabIndex={-1} className="brand-about" ref={ref}>{children}</main>;
}

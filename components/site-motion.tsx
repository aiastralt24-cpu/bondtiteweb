"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content remains visible without JavaScript. */
export function SiteMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const active = new Set<Animation>();
    let observer: IntersectionObserver | undefined;
    const targets = Array.from(document.querySelectorAll<HTMLElement>(
      ".range-intro > div, .range-intro__aside, .range-section-heading, .range-product-card, .range-guidance > div, .range-questions > div:first-child, .product-split__visual, .product-split__content, .related-products__header, .application-browser__intro, .application-choice, [data-reveal], .job-list__row, .listing-card, .resource-row, .fit-panel, .catalog-card, .section-head, .job-section__intro, .featured-range__head, .finder__copy, .recommendation, .bond-resources__grid > div, .bond-film__heading, .index-hero__grid > div, .category-hero__grid > div, .product-detail-hero__grid > div, .product-hero__grid > div"
    )).filter(element => !element.parentElement?.closest("[data-reveal]"));

    function stop() {
      observer?.disconnect();
      active.forEach(animation => animation.cancel());
      active.clear();
    }

    function setup() {
      stop();
      const reduced = preference.matches;
      document.documentElement.dataset.motion = reduced ? "reduced" : "full";
      if (reduced || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          observer?.unobserve(element);
          if (element.dataset.revealed === "true") return;
          element.dataset.revealed = "true";
          const siblings = Array.from(element.parentElement?.children ?? []);
          const delay = Math.min(siblings.indexOf(element) % 3, 2) * 50;
          const animation = element.animate([
            { opacity: 0, translate: "0 12px" },
            { opacity: 1, translate: "0 0" }
          ], { duration: 450, delay, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
          active.add(animation);
          animation.onfinish = () => active.delete(animation);
        });
      }, { threshold: 0.08, rootMargin: "0px 0px -32px 0px" });
      targets.forEach(element => observer?.observe(element));
    }
    function disclose(event:Event){
      const details=event.target;
      if(preference.matches||!(details instanceof HTMLDetailsElement)||!details.open)return;
      Array.from(details.children).filter(child=>child.tagName!=='SUMMARY').forEach(child=>{
        const animation=child.animate([{opacity:0,translate:'0 -4px'},{opacity:1,translate:'0 0'}],{duration:200,easing:'ease-out'});
        active.add(animation);animation.onfinish=()=>active.delete(animation);
      });
    }
    document.addEventListener('toggle',disclose,true);
    setup();
    preference.addEventListener("change", setup);
    return () => {
      stop();
      document.removeEventListener('toggle',disclose,true);
      preference.removeEventListener("change", setup);
    };
  }, [pathname]);

  return null;
}

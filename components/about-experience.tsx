"use client";
import {useCallback,useRef,type ReactNode} from 'react';
import type {gsap} from 'gsap';
import type {ScrollTrigger} from 'gsap/ScrollTrigger';
import {useCinematicScene} from '@/components/use-cinematic-scene';
export function AboutExperience({children}:{children:ReactNode}) {
 const ref=useRef<HTMLElement>(null);
 const setup=useCallback((motion:typeof gsap,_trigger:typeof ScrollTrigger,element:HTMLElement)=>{
  const select=motion.utils.selector(element);
  motion.from(select('.brand-hero__copy > *'),{y:16,duration:.65,stagger:.06,ease:'power2.out'});
  for(const item of select('.brand-everyday__item, .brand-history__timeline li')) {
   motion.from(item,{y:18,duration:.55,ease:'power2.out',scrollTrigger:{trigger:item,start:'top 92%',once:true}});
  }
 },[]);
 useCinematicScene(ref,setup);
 return <main id="main-content" tabIndex={-1} className="brand-about" ref={ref}>{children}</main>;
}

"use client";
import {useEffect,type RefObject} from 'react';
/** Animate a changed answer without remounting its controls or moving focus. */
export function useStateMotion(ref:RefObject<HTMLElement|null>,key:string){
  useEffect(()=>{
    const element=ref.current,preference=matchMedia('(prefers-reduced-motion: reduce)');
    if(!element||preference.matches||!element.animate)return;
    const animation=element.animate([{opacity:.65,translate:'0 6px'},{opacity:1,translate:'0 0'}],{duration:200,easing:'cubic-bezier(.22,1,.36,1)'});
    const stop=()=>{if(preference.matches)animation.cancel();};
    preference.addEventListener('change',stop);
    return ()=>{animation.cancel();preference.removeEventListener('change',stop);};
  },[key,ref]);
}

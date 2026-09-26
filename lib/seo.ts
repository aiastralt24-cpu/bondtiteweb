import type { Metadata } from 'next';
import { baseUrl } from './site';
export const brandId = `${baseUrl}/#brand`;
export const organizationId = `${baseUrl}/#organization`;
export const websiteId = `${baseUrl}/#website`;
export function serializeJsonLd(value:unknown):string { return JSON.stringify(value).replace(/</g,'\\u003c'); }
/** Every public route supplies its own canonical; never inherit the homepage URL. */
export function withSeo(metadata:Metadata):Metadata {
  const title=typeof metadata.title==='string'?metadata.title:'Bondtite by Astral';
  const description=metadata.description??'Explore Bondtite adhesives by Astral for furniture, fabrication and everyday repairs.';
  const canonical=metadata.alternates?.canonical;
  const images=metadata.openGraph?.images??[{url:'/opengraph-image',width:1200,height:630,alt:'Bondtite by Astral adhesives'}];
  return {...metadata,
    openGraph:{type:'website',siteName:'Bondtite by Astral',locale:'en_IN',title,description,...(typeof canonical==='string'?{url:new URL(canonical,baseUrl).href}:{}),...metadata.openGraph,images},
    twitter:{card:'summary_large_image',title,description,images,...metadata.twitter}
  };
}
export const identityJsonLd={
  '@context':'https://schema.org',
  '@graph':[
    {'@type':'Organization','@id':organizationId,name:'Astral Adhesives',url:'https://www.astraladhesives.com/',contactPoint:{'@type':'ContactPoint',contactType:'customer service',telephone:'+91-7311103331',email:'customercare@astraladhesives.com'},brand:{'@id':brandId}},
    {'@type':'Brand','@id':brandId,name:'Bondtite',url:baseUrl,logo:`${baseUrl}/assets/bondtite-logo-positive.png`},
    {'@type':'WebSite','@id':websiteId,name:'Bondtite by Astral',url:baseUrl,inLanguage:'en-IN',publisher:{'@id':organizationId},about:{'@id':brandId}}
  ]
};

import {baseUrl,siteApplications,siteResources} from '@/lib/site';
import {catalogProducts,getProductPath,productCategories} from '@/lib/products';
export const dynamic='force-static';
export function GET(){
 const link=(title:string,path:string)=>`- [${title.replace(/[\[\]\n]/g,' ')}](${baseUrl}${path})`;
 const body=[
 '# Bondtite by Astral',
 '> Product information and application guidance for Bondtite wood, epoxy, rubber and instant adhesives.',
 'This file is a navigation reference. Public HTML pages and current official product documents are the sources for product facts. It is not an indexing directive or a guarantee of product suitability.',
 '## Main pages',
 ...[['Products','/products'],['Applications','/applications'],['Product advisor','/product-advisor'],['Resources','/resources'],['About Bondtite','/about'],['Contact','/contact']].map(([name,path])=>link(name,path)),
 '## Product categories',...productCategories.map(p=>link(p.label,`/products/${p.slug}`)),
 '## Products',...catalogProducts.map(p=>link(p.name,getProductPath(p))),
 '## Application guides',...siteApplications.map(p=>link(`${p.title} ${p.accent}`,`/applications/${p.slug}`)),
 '## Resources',...siteResources.map(p=>link(p.title,`/resources/${p.slug}`)),
 '## Policies',...['privacy-policy','cookie-policy','terms-and-conditions'].map(p=>link(p.replaceAll('-',' '),`/${p}`)),
 '## Technical documents',
 'The Hydra+ technical data sheet is available through its product page after completing the TDS request form. Other product pages offer technical-document enquiries. Key product information is also available in the public product-page text.',
 '## Scope',
 'The Product Advisor is an interactive guide. Do not infer prices, stock, ratings, certifications or unsupported substrate suitability from this index. Administrative pages, enquiry records and download APIs are not public information sources.'
 ].join('\n\n')+'\n';
 return new Response(body,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
}

// Read-only audit of the running site. Never submits forms or reads lead records.
import assert from 'node:assert/strict';
const origin=process.env.SEO_CHECK_ORIGIN||'http://localhost:3100';
const get=async path=>{const r=await fetch(new URL(path,origin));return {r,text:await r.text()};};
const sitemap=await get('/sitemap.xml');assert.equal(sitemap.r.status,200);
const urls=[...sitemap.text.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);assert(urls.length>30);assert.equal(new Set(urls).size,urls.length);
assert(!urls.some(u=>/\/admin|\/api\//.test(u)));assert(!sitemap.text.includes('<lastmod>'),'Do not fabricate modification dates');
const robots=await get('/robots.txt');assert.match(robots.text,/Disallow: \/admin\//);assert.match(robots.text,/Disallow: \/api\//);assert.match(robots.text,/Sitemap: https:\/\/www.bondtite.in\/sitemap.xml/);
const llms=await get('/llms.txt');assert.equal(llms.r.status,200);assert.match(llms.r.headers.get('content-type'),/text\/plain/);assert(llms.text.includes('bondtite-hydra'));assert(!llms.text.includes('/admin/leads'));
const titles=new Set();let schemas=0;
for(const url of urls){
 const path=new URL(url).pathname;const {r,text}=await get(path);assert.equal(r.status,200,path);
 const title=text.match(/<title>(.*?)<\/title>/)?.[1];assert(title,path+' missing title');assert(!titles.has(title),path+' duplicate title');titles.add(title);
 const tags=[...text.matchAll(/<(meta|link)\b[^>]*>/g)].map(m=>m[0]);
 assert(tags.some(t=>t.includes('name="description"')&&/content="[^"]+"/.test(t)),path+' missing description');
 assert(tags.some(t=>t.includes('rel="canonical"')&&t.includes(`href="${url}"`)),path+' bad canonical');
 for(const key of ['og:title','og:description','og:url','og:image'])assert(tags.some(t=>t.includes(`property="${key}"`)),path+' missing '+key);
 assert(tags.some(t=>t.includes('name="twitter:card"')),path+' missing Twitter card');
 assert(!tags.some(t=>t.includes('name="robots"')&&t.includes('noindex')),path+' unexpectedly noindex');
 assert.equal((text.match(/<h1\b/g)||[]).length,1,path+' expected one h1');
 for(const m of text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)){const data=JSON.parse(m[1]);assert(data['@context']);schemas++;}
}
for(const path of ['/admin/leads','/api/admin/leads']){const {r}=await get(path);assert.match(r.headers.get('x-robots-tag')||'',/noindex/,path);}
const missing=await get('/products/woodworking/not-a-real-product');assert.equal(missing.r.status,404);
const image=await fetch(new URL('/opengraph-image',origin));assert.equal(image.status,200);assert.match(image.headers.get('content-type')||'',/image\/png/);
console.log(`PASS: ${urls.length} public routes; unique titles, descriptions, canonicals, social tags, H1s; ${schemas} parseable schema blocks; robots, sitemap, llms.txt, private noindex headers, 404 and sharing image.`);

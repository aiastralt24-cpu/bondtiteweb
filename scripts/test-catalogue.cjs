/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS hook loads source TypeScript for catalogue regression checks. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const ts=require('typescript');
// Load the same TypeScript data used by the rendered catalogue.
require.extensions['.ts']=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,'utf8').replace(/@\//g,process.cwd()+'/'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,file);
const {catalogProducts,getProductsByCategory}=require('../lib/products.ts');
const {matchesMaterial,matchesProductQuery}=require('../lib/product-search.ts');
const {advise,inferJob}=require('../lib/advisor-rules.ts');
const {tdsDocuments,hasDownloadableTds}=require('../lib/documents.ts');
const get=slug=>catalogProducts.find(p=>p.slug===slug);
assert.equal(catalogProducts.length,37);
assert.equal(new Set(catalogProducts.map(p=>p.slug)).size,37);
assert.equal(get('bondtite-uniweld').categorySlug,'acrylic-adhesives');
assert.equal(get('bondtite-uniweld').chemistry,'Acrylic');
assert.ok(!getProductsByCategory('epoxy-adhesives').includes(get('bondtite-uniweld')));
assert.ok(getProductsByCategory('epoxy-adhesives').includes(get('bondtite-rapid')));
assert.ok(getProductsByCategory('synthetic-rubber-adhesives').includes(get('bondtite-heatbond')));
for(const slug of ['bondtite-aqua','bondtite-edge-d3'])assert.ok(matchesProductQuery(get(slug),'laminate'));
for(const slug of ['bondtite-fast-and-clear','bondtite-strong-and-clear'])assert.ok(matchesProductQuery(get(slug),'glass'));
for(const slug of ['bondtite-pvc-bond','bondtite-uniweld','bondtite-acrylic-fix'])assert.ok(matchesMaterial(get(slug),'Plastic'));
assert.ok(!matchesMaterial(get('bondtite-deluxe'),'Plastic'));
assert.ok(get('bondtite-fast-and-clear').packTypes.includes('2 kg'));
assert.ok(get('bondtite-super-strength').packTypes.includes('900 gm'));
assert.equal(get('bondtite-rapid').settingTime,'10 minutes');
assert.ok(!get('bondtite-rapid').openTime.includes('10'));
for(const p of catalogProducts){assert.ok(p.sourceUrl.startsWith('https://www.astraladhesives.com/'));assert.ok(!/workbook|school projects/i.test(p.productSummary));}
assert.ok(!/hybrid/i.test(JSON.stringify(get('bondtite-pro'))));
for(const p of catalogProducts.filter(p=>p.slug.startsWith('bondtite-quick-'))){assert.notEqual(p.packTypes,'See official page');assert.ok(p.steps.length>=3);}
assert.equal(Object.keys(tdsDocuments).length,22);
for(const [slug,doc]of Object.entries(tdsDocuments)){assert.ok(get(slug));assert.equal(fs.readFileSync(path.join('private/documents',doc.file)).subarray(0,4).toString(),'%PDF');}
for(const slug of ['__proto__','constructor','../../secret','missing'])assert.equal(hasDownloadableTds(slug),false);
const cases=[['Wood','Wood','bondtite-deluxe'],['PVC','MDF','bondtite-pvc-bond'],['WPC','Laminate','bondtite-wpc-fix'],['Glass','Glass','bondtite-fast-and-clear'],['Metal','Metal','bondtite-super-strength'],['Ceramic','Ceramic','bondtite-rapid'],['ABS','Polycarbonate','bondtite-uniweld'],['Foam','Rexine','bondtite-foambond'],['Acrylic','HDHMR','bondtite-acrylic-fix']];
for(const [first,second,expected]of cases){for(const [a,b]of [[first,second],[second,first]])assert.equal(advise({job:inferJob(a,b),first:a,second:b,condition:'dry'})?.slug,expected);}
assert.equal(advise({job:'other',first:'Plastic',second:'Plastic',condition:'dry'}),null);
assert.equal(advise({job:'other',first:'Glass',second:'Glass',condition:'moisture'}),null);
assert.equal(advise({job:'wood',first:'Wood',second:'Wood',condition:'other'}),null);
console.log('PASS: catalogue coverage, categories, material search, corrected packs, timing semantics, official sources, 22 PDFs, allowlist, reversible advisor pairs and unsupported-condition fallback.');
const {siteApplications}=require('../lib/site.ts');
assert.equal(siteApplications.length,6);
const included=new Set();
for(const application of siteApplications){
 assert.ok(application.groups.length>0);
 assert.equal(new Set(application.groups.map(g=>g.id)).size,application.groups.length);
 assert.deepEqual(application.products,[...new Set(application.groups.flatMap(g=>g.products.map(p=>p.slug)))]);
 for(const group of application.groups)for(const item of group.products){assert.ok(get(item.slug),application.slug+' missing '+item.slug);assert.ok(item.note.length>20);included.add(item.slug);}
}
assert.equal(included.size,37,'Every product has an explicitly curated application placement');
console.log('PASS: six application pages, valid groups, contextual descriptions and 37 mapped products.');

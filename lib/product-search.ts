import type {CatalogProduct} from './products';
const materialFamilies:Record<string,string[]>={Plastic:['rigid plastics','abs','pvc','pu','polycarbonate','acrylic','wpc'],Metal:['metal','aluminium','steel','chrome'],Wood:['wood','plywood','mdf','hdhmr','particleboard','blockboard','hardboard','veneer'],Stone:['stone','marble','granite'],Laminate:['laminate','decorative laminate']};
export function matchesMaterial(product:CatalogProduct,material:string){
 const options=materialFamilies[material]??[material.toLowerCase()];
 return product.substrates.some(s=>options.some(value=>s.toLowerCase()===value||s.toLowerCase().includes(value)));
}
export function matchesProductQuery(product:CatalogProduct,query:string){
 const q=query.trim().toLowerCase();
 const family=Object.keys(materialFamilies).find(key=>key.toLowerCase()===q);
 return !q || (family ? matchesMaterial(product,family) : false) || [product.name,product.chemistry,product.productSummary,...product.applications,...product.substrates].join(' ').toLowerCase().includes(q);
}

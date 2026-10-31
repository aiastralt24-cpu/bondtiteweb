import rows from './product-selector-data.json';
import { selectorProductSlug, selectorMaterialLabel } from './product-selector';

const aliases: Record<string, string> = {
  Laminates: 'Laminate', Veneers: 'Veneer', Ceramics: 'Ceramic', Tiles: 'Tile',
  'Decorative laminate': 'Laminate',
};
export const normalizeMaterial = (material: string) => aliases[material] ?? selectorMaterialLabel(material);

// The selector workbook supplies specific material pairs. Include their endpoints
// on product pages without generating any new pair recommendations.
export function productMaterials(slug: string, published: string[]) {
  const selected = rows.filter(row => row.products.some(product => selectorProductSlug(product.name) === slug));
  return [...new Set([...published, ...selected.flatMap(row => row.materials)].map(normalizeMaterial))];
}

import rows from './product-selector-data.json';

// Source: Product Selector (1).xlsx, Sheet1!A4:G143. Slot numbers are display priority.
// Do not infer additional pairs from a product's general substrate list.
const pairKey = (first: string, second: string) => JSON.stringify([first, second].sort());
const byPair = new Map(rows.map(row => [pairKey(...row.materials as [string, string]), row]));
export const selectorMaterials = [...new Set(rows.flatMap(row => row.materials))];
export function matchingProducts(first: string, second: string) {
  const products = byPair.get(pairKey(first, second))?.products ?? [];
  // Preserve source slots in the data, but display repeated products only once,
  // at their earliest (highest-priority) slot. Source rows 106 and 107 repeat Ultra Strength.
  return products.filter((product, index) => products.findIndex(candidate => candidate.name === product.name) === index);
}
export function compatibleMaterials(first: string) {
  return selectorMaterials.filter(second => matchingProducts(first, second).length > 0);
}

// Explicit catalogue aliases only. Unlisted products retain their spreadsheet identity.
const catalogueAliases: Record<string, string> = {
  'Bondtite Hydra+': 'bondtite-hydra',
  'Bondtite Quick Spray': 'bondtite-quik-spray',
  'Bondtite Foambond SR': 'bondtite-foambond',
  'Bondtite Multibond SR': 'bondtite-multibond',
};
export function selectorProductSlug(name: string) {
  return catalogueAliases[name] ?? name.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const selectorMaterialLabel = (material: string) => material === 'Plastics(exclude PE | PP | PTFE | Silicon)'
  ? 'Plastics (excluding PE, PP, PTFE and Silicon)'
  : material === 'Glass- back coated' ? 'Back-coated glass' : material;

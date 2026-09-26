export const bondMaterials = ['Wood', 'Plywood', 'MDF', 'Laminate', 'Metal', 'Glass', 'Tile', 'Concrete', 'Marble', 'Foam', 'Rubber', 'WPC'] as const;
export type BondMaterial = typeof bondMaterials[number];
const normalize = (value: string) => value.trim().toLowerCase().replace(/^(laminates|tiles)$/, match => match.slice(0, -1));
/** Match explicit substrate entries only; a material match is not a performance rating. */
export function matchBondProducts<T extends { substrates: string[]; rank: number }>(products: readonly T[], first: string, second: string): T[] {
  if (!first || !second) return [];
  return products.filter(product => {
    const materials = product.substrates.map(normalize);
    return materials.includes(normalize(first)) && materials.includes(normalize(second));
  }).sort((a, b) => a.rank - b.rank);
}

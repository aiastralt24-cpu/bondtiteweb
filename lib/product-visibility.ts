// Retain source records for future approval, but exclude these products from public output.
export const hiddenProductSlugs = new Set([
  'bondtite-viscoclear',
  'bondtite-rhiomet',
  'bondtite-zoro',
  'bondtite-ast-fr1203-ast-fh7203',
  'bondtite-mma-999a-mma-999b',
  'bondtite-ast-fr1201-ast-fh7201',
  'bondtite-ast-fr1202-ast-fh7601',
  'bondtite-ast-fr4202-ast-fh4102',
  'bondtite-pro'
]);
export const isProductVisible = (slug: string) => !hiddenProductSlugs.has(slug);

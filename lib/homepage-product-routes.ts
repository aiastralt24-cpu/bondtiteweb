import { catalogProducts, getProductPath } from "@/lib/products";
import type { Product } from "@/lib/types";

const homepageProductSlugById: Record<string, string> = {
  "hydra-plus": "bondtite-hydra",
  "epoxy-rapid": "bondtite-rapid",
  "ca-fast": "bondtite-strong-and-clear",
  multifix: "bondtite-multifix"
};

export function getHomepageCatalogProduct(product?: Product) {
  if (!product) return undefined;

  const mappedSlug = homepageProductSlugById[product.id] ?? product.id;
  return catalogProducts.find((item) => item.slug === mappedSlug);
}

export function getHomepageProductPath(product?: Product) {
  const catalogProduct = getHomepageCatalogProduct(product);
  return catalogProduct ? getProductPath(catalogProduct) : "/products";
}

export const homepageCatalogProductCount = catalogProducts.length;

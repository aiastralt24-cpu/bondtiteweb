import Image from "next/image";
import type { Product } from "@/lib/types";

export function ProductPack({
  product,
  priority = false
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <span className={`product-image product-image--${product.imageTone ?? "pack"}`}>
      <Image
        src={product.image}
        alt={product.imageAlt}
        fill
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        sizes="260px"
      />
    </span>
  );
}

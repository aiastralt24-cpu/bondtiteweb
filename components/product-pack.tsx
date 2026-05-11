import Image from "next/image";
import type { Product } from "@/lib/types";

export function ProductPack({ product }: { product: Product }) {
  return (
    <span className={`product-image product-image--${product.imageTone ?? "pack"}`}>
      <Image
        src={product.image}
        alt={product.imageAlt}
        fill
        loading="eager"
        sizes="260px"
      />
    </span>
  );
}

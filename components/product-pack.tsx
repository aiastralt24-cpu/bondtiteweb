import Image from "next/image";
import type { Product } from "@/lib/types";
import type { CSSProperties } from "react";
import imageBounds from "@/lib/product-image-bounds.json";

export function ProductPack({
  product,
  priority = false,
  normalized = true
}: {
  product: Product;
  priority?: boolean;
  normalized?: boolean;
}) {
  const whiteBackdrop = /^\/assets\/products\/(?:bondtite-quick-.*|bondtite-(?:wood|pvc-bond)-official)\.jpg$/.test(product.image);
  const bounds = normalized ? imageBounds[product.image as keyof typeof imageBounds] : undefined;

  if (bounds) {
    // Fit the visible packaging, rather than the source canvas. Keep a small
    // safety margin for antialiased edges without modifying the original asset.
    const pad = Math.max(bounds.cropWidth, bounds.cropHeight) * 0.015;
    const left = Math.max(0, bounds.left - pad);
    const top = Math.max(0, bounds.top - pad);
    const width = Math.min(bounds.width, bounds.left + bounds.cropWidth + pad) - left;
    const height = Math.min(bounds.height, bounds.top + bounds.cropHeight + pad) - top;
    return <span data-product-pack={product.id} className={`product-image product-image--normalized${whiteBackdrop ? " product-image--white-backdrop" : ""}`} style={{ "--pack-ratio": width / height } as CSSProperties}>
      <span className="product-image__crop">
        <Image src={product.image} alt={product.imageAlt} width={bounds.width} height={bounds.height}
          priority={priority} loading={priority ? "eager" : "lazy"}
          sizes="(max-width: 700px) 70vw, 400px"
          style={{ width: `${bounds.width / width * 100}%`, height: `${bounds.height / height * 100}%`, left: `${-left / width * 100}%`, top: `${-top / height * 100}%` }} />
      </span>
    </span>;
  }

  return (
    <span data-product-pack={product.id} className={`product-image product-image--${product.imageTone ?? "pack"}${whiteBackdrop ? " product-image--white-backdrop" : ""}`}>
      <Image
        src={product.image}
        alt={product.imageAlt}
        fill
        loading={priority ? "eager" : "lazy"}
        priority={priority}
        sizes={priority ? "(max-width: 700px) 80vw, 40vw" : "(max-width: 700px) 44vw, 280px"}
      />
    </span>
  );
}

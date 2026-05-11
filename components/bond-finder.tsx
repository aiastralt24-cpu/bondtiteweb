"use client";

import { useMemo, useState } from "react";
import { ProductPack } from "@/components/product-pack";
import {
  getHomepageCatalogProduct,
  getHomepageProductPath
} from "@/lib/homepage-product-routes";
import type { BondFinderData, Product } from "@/lib/types";

type Selection = {
  material: string;
  environment: string;
  speed: string;
};

const materialDefaults: Record<string, string> = {
  wood: "hydra-plus",
  metal: "epoxy-rapid",
  plastic: "ca-fast",
  mixed: "multifix"
};

function scoreProduct(product: Product, selection: Selection) {
  let score = 0;

  if (materialDefaults[selection.material] === product.id) score += 10;

  if (selection.material === "wood" && product.id === "hydra-plus") score += 8;
  if (selection.material === "metal" && product.id === "epoxy-rapid") score += 8;
  if (selection.material === "plastic" && product.id === "ca-fast") score += 8;
  if (selection.material === "mixed" && product.id === "multifix") score += 8;

  if (selection.environment === "wet" && product.id === "hydra-plus") score += 4;
  if (selection.environment === "heat" && product.id === "epoxy-rapid") score += 4;
  if (selection.environment === "site" && product.id === "multifix") score += 4;
  if (selection.environment === "indoor" && product.id !== "epoxy-rapid") score += 1;

  if (selection.speed === "instant" && product.id === "ca-fast") score += 5;
  if (selection.speed === "same-day" && product.id === "epoxy-rapid") score += 3;
  if (selection.speed === "open-time" && product.id === "hydra-plus") score += 2;
  if (selection.speed === "open-time" && product.id === "multifix") score += 1;

  return score;
}

export function BondFinder({
  finder,
  products
}: {
  finder: BondFinderData;
  products: Product[];
}) {
  const initialSelection = {
    material: finder.groups[0]?.options[0]?.id ?? "",
    environment: finder.groups[1]?.options[0]?.id ?? "",
    speed: finder.groups[2]?.options[0]?.id ?? ""
  };
  const [selection, setSelection] = useState<Selection>(initialSelection);

  const product = useMemo(() => {
    const exactRule = finder.rules.find(
      (rule) =>
        rule.material === selection.material &&
        rule.environment === selection.environment &&
        rule.speed === selection.speed
    );
    if (exactRule) {
      return (
        products.find((item) => item.id === exactRule.productId) ??
        products.find((item) => item.id === finder.fallbackProductId) ??
        products[0]
      );
    }

    return [...products].sort(
      (first, second) =>
        scoreProduct(second, selection) - scoreProduct(first, selection)
    )[0];
  }, [finder.fallbackProductId, finder.rules, products, selection]);
  const productPath = getHomepageProductPath(product);
  const displayProduct = getHomepageCatalogProduct(product) ?? product;

  return (
    <section className="finder" id="bond-finder">
      <div className="container finder__grid">
        <div className="finder__copy">
          <span className="mono">02 / Bond Finder</span>
          <h2 className="display">{finder.title}</h2>
          <p className="finder__intro">{finder.intro}</p>

          <div className="finder__controls">
            {finder.groups.map((group) => (
              <fieldset className="chip-group" key={group.id}>
                <legend>{group.label}</legend>
                <div className="chip-list">
                  {group.options.map((option) => (
                    <button
                      className="chip"
                      key={option.id}
                      type="button"
                      aria-pressed={selection[group.id] === option.id}
                      onClick={() =>
                        setSelection((current) => ({
                          ...current,
                          [group.id]: option.id
                        }))
                      }
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>
        </div>

        <aside className="recommendation" aria-live="polite">
          <div className="recommendation__top">
            <div className="recommendation__image">
              {displayProduct ? <ProductPack product={displayProduct} /> : null}
            </div>
            <div>
              <span className="mono">Recommended</span>
              <h3>{product?.name ?? "Talk to our trade desk"}</h3>
            </div>
          </div>
          <p>
            {product?.reason ??
              "Share the substrate and site condition with the trade desk for a precise recommendation."}
          </p>
          {product ? (
            <div className="recommendation__tags" aria-label="Best for">
              {product.bestFor.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ) : null}
          <a className="tertiary" href={product ? productPath : "/contact"}>
            {product ? "View product details" : "Contact trade desk"} →
          </a>
        </aside>
      </div>
    </section>
  );
}

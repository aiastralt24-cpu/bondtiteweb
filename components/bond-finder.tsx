"use client";

import { useMemo, useState } from "react";
import { ProductPack } from "@/components/product-pack";
import { catalogProducts, getProductPath, type CatalogProduct } from "@/lib/products";
import type { BondFinderData } from "@/lib/types";

type Selection = {
  material: string;
  environment: string;
  speed: string;
};

const materialDefaults: Record<string, string> = {
  wood: "bondtite-hydra",
  metal: "bondtite-rapid",
  plastic: "bondtite-quick",
  mixed: "bondtite-multifix"
};

function includesAny(values: string[], terms: string[]) {
  const haystack = values.join(" ").toLowerCase();
  return terms.some((term) => haystack.includes(term));
}

function scoreProduct(product: CatalogProduct, selection: Selection) {
  let score = 0;
  const name = product.name.toLowerCase();
  const searchable = [
    product.name,
    product.category,
    product.meta,
    product.productSummary,
    product.reason,
    ...product.substrates,
    ...product.applications,
    ...product.bestFor
  ];

  if (materialDefaults[selection.material] === product.id) score += 12;

  if (selection.material === "wood") {
    if (product.categorySlug === "woodworking") score += 8;
    if (includesAny(searchable, ["wood", "plywood", "mdf", "board", "laminate", "wpc"])) {
      score += 5;
    }
  }

  if (selection.material === "metal") {
    if (product.categorySlug === "epoxy-adhesives" || product.categorySlug === "stone-care") {
      score += 8;
    }
    if (
      includesAny(searchable, [
        "metal",
        "stone",
        "marble",
        "ceramic",
        "concrete",
        "glass",
        "tile"
      ])
    ) {
      score += 5;
    }
  }

  if (selection.material === "plastic") {
    if (
      product.categorySlug === "cyanoacrylates" ||
      product.categorySlug === "sprayable-rubber-adhesives"
    ) {
      score += 8;
    }
    if (includesAny(searchable, ["plastic", "rubber", "pvc", "acrylic", "foam"])) score += 5;
  }

  if (selection.material === "mixed") {
    if (
      name.includes("multifix") ||
      name.includes("multibond") ||
      product.categorySlug === "epoxy-adhesives"
    ) {
      score += 9;
    }
    if (includesAny(searchable, ["multi", "mixed", "multiple", "construction", "site"])) score += 5;
  }

  if (selection.environment === "wet") {
    if (includesAny(searchable, ["water", "waterproof", "moisture", "d3", "monsoon"])) score += 8;
    if (name.includes("aqua") || name.includes("hydra") || name.includes("edge d3")) score += 5;
  }

  if (selection.environment === "heat") {
    if (includesAny(searchable, ["heat", "temperature", "epoxy", "stone", "repair"])) score += 7;
    if (name.includes("heatbond") || name.includes("rapid") || name.includes("super strength")) score += 5;
  }

  if (selection.environment === "site") {
    if (includesAny(searchable, ["site", "construction", "exterior", "concrete", "wpc", "stone"])) score += 7;
    if (name.includes("multifix") || name.includes("wpc") || name.includes("pro")) score += 5;
  }

  if (selection.environment === "indoor") {
    if (product.categorySlug === "woodworking" || product.categorySlug === "cyanoacrylates") score += 3;
  }

  if (selection.speed === "instant") {
    if (product.categorySlug === "cyanoacrylates") score += 9;
    if (includesAny(searchable, ["instant", "quick", "spot", "fast"])) score += 5;
  }

  if (selection.speed === "same-day") {
    if (includesAny(searchable, ["fast", "rapid", "same", "10 min", "30 min"])) score += 7;
    if (name.includes("rapid") || name.includes("fast") || name.includes("quick")) score += 4;
  }

  if (selection.speed === "open-time") {
    if (
      product.categorySlug === "woodworking" ||
      product.categorySlug === "sprayable-rubber-adhesives"
    ) {
      score += 5;
    }
    if (!includesAny(searchable, ["instant", "3-5 min", "10 min"])) score += 2;
  }

  score -= product.rank * 0.01;

  return score;
}

export function BondFinder({
  finder
}: {
  finder: BondFinderData;
}) {
  const initialSelection = {
    material: finder.groups[0]?.options[0]?.id ?? "",
    environment: finder.groups[1]?.options[0]?.id ?? "",
    speed: finder.groups[2]?.options[0]?.id ?? ""
  };
  const [selection, setSelection] = useState<Selection>(initialSelection);

  const recommendations = useMemo(
    () =>
      [...catalogProducts].sort(
        (first, second) =>
          scoreProduct(second, selection) - scoreProduct(first, selection)
      ),
    [selection]
  );
  const product = recommendations[0];
  const alternatives = recommendations.slice(1, 4);
  const productPath = product ? getProductPath(product) : "/contact";

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
              {product ? <ProductPack product={product} /> : null}
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
              {[product.category, ...product.bestFor].slice(0, 4).map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          ) : null}
          {alternatives.length ? (
            <div className="recommendation__alternatives">
              <span>Also fits</span>
              <div>
                {alternatives.map((item) => (
                  <a href={getProductPath(item)} key={item.id}>
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          ) : null}
          <a className="tertiary" href={product ? productPath : "/contact"}>
            {product ? "View product details" : "Contact trade desk"} →
          </a>
          <a className="tertiary recommendation__all" href="/products">
            Browse all products →
          </a>
        </aside>
      </div>
    </section>
  );
}

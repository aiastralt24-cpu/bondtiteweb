import type { Product } from "@/lib/types";
import { verifiedAstralDetails } from "@/lib/verified-astral";

export type ProductCategorySlug =
  | "woodworking"
  | "sprayable-rubber-adhesives"
  | "epoxy-adhesives"
  | "stone-care"
  | "cyanoacrylates";

export type ProductCategory = {
  slug: ProductCategorySlug;
  label: string;
  shortLabel: string;
  title: string;
  accent: string;
  description: string;
  seoDescription: string;
  bestFor: string[];
};

export type CatalogProduct = Product & {
  slug: string;
  categorySlug: ProductCategorySlug;
  category: string;
  sourceUrl: string;
  substrates: string[];
  condition: string;
  cure: string;
  openTime: string;
  clampTime: string;
  waterRating: string;
  packTypes: string;
  rank: number;
  productSummary: string;
  applications: string[];
  steps: string[];
  features: string[];
  shelfLife?: string;
  storage?: string;
  faqs: Array<{ question: string; answer: string }>;
};

type ProductSeed = {
  name: string;
  categorySlug: ProductCategorySlug;
  sourceUrl: string;
  image?: string;
  imageTone?: Product["imageTone"];
  summary?: string;
  meta?: string;
  substrates?: string[];
  applications?: string[];
  openTime?: string;
  clampTime?: string;
  waterRating?: string;
  packTypes?: string;
  steps?: string[];
  features?: string[];
  shelfLife?: string;
  storage?: string;
};

export const productCategories: ProductCategory[] = [
  {
    slug: "woodworking",
    label: "Woodworking",
    shortLabel: "Woodworking",
    title: "Adhesives for furniture, boards and joinery.",
    accent: "woodworking.",
    description:
      "Bondtite woodworking products listed in the source workbook for wood, boards, laminates, WPC, foam and construction fixing workflows.",
    seoDescription:
      "Explore Bondtite woodworking adhesives from the official product list, including Deluxe, Aqua, Hydra+, Edge D3, PVC Bond, Heatbond, Foambond, Multibond and Multifix.",
    bestFor: ["Wood", "Plywood", "MDF", "Laminates"]
  },
  {
    slug: "sprayable-rubber-adhesives",
    label: "Sprayable rubber adhesives",
    shortLabel: "Sprayable rubber",
    title: "Rubber adhesives for fast coverage.",
    accent: "sprayable.",
    description:
      "Sprayable Bondtite rubber adhesive products for fast coverage and trade-friendly application.",
    seoDescription:
      "Explore Bondtite sprayable rubber adhesives from the official product list.",
    bestFor: ["Spray application", "Rubber", "Foam", "Large surfaces"]
  },
  {
    slug: "epoxy-adhesives",
    label: "Epoxy adhesives",
    shortLabel: "Epoxy",
    title: "Adhesives for strong repair and clear bonds.",
    accent: "epoxy.",
    description:
      "Bondtite epoxy products listed for fast, strong and clear bonding applications.",
    seoDescription:
      "Browse Bondtite epoxy adhesives from the official product list, including Fast and Clear, Super Strength and Strong and Clear.",
    bestFor: ["Repair", "Clear bonding", "Strong bonds", "Mixed substrates"]
  },
  {
    slug: "stone-care",
    label: "Stone care",
    shortLabel: "Stone care",
    title: "Products for marble, concrete and repair.",
    accent: "stone.",
    description:
      "Bondtite stone care products for stone, concrete, marble and repair-focused applications.",
    seoDescription:
      "Explore Bondtite stone care products from the official product list, including Bondtite Pro and Bondtite Rapid.",
    bestFor: ["Stone", "Marble", "Concrete", "Repair"]
  },
  {
    slug: "cyanoacrylates",
    label: "Cyanoacrylates",
    shortLabel: "Cyanoacrylate",
    title: "Adhesives for quick precision fixes.",
    accent: "instant.",
    description:
      "Bondtite Quick cyanoacrylate products for instant, gel, spot-on, art and craft, and brush-and-nozzle applications.",
    seoDescription:
      "Browse Bondtite Quick cyanoacrylate adhesives from the official product list.",
    bestFor: ["Instant fixes", "Precision", "Art and craft", "Multi-material"]
  }
];

const sourceProducts: ProductSeed[] = [
  {
    name: "BONDTITE DELUXE",
    categorySlug: "woodworking",
    sourceUrl: "https://www.astraladhesives.com/bondtite-deluxe.html",
    image: "/assets/products/bondtite-deluxe.png",
    imageTone: "square",
    summary: "Woodworking adhesive listed in the official Bondtite product workbook.",
    substrates: ["Wood", "Plywood", "Boards"]
  },
  {
    name: "BONDTITE AQUA",
    categorySlug: "woodworking",
    sourceUrl: "https://www.astraladhesives.com/bondtite-aqua.html",
    image: "/assets/products/bondtite-aqua.png",
    imageTone: "square",
    summary: "Woodworking adhesive listed for Bondtite's wood-focused range.",
    substrates: ["Wood", "Plywood", "Boards"]
  },
  {
    name: "BONDTITE HYDRA+",
    categorySlug: "woodworking",
    sourceUrl: "https://www.astraladhesives.com/bondtite-hydra.html",
    image: "/assets/products/bondtite-hydra-pack.png",
    imageTone: "square",
    summary:
      "Single-component premium white PVA emulsion adhesive with fast-setting and superior waterproof properties.",
    meta: "PVA · D3 · Waterproof",
    substrates: ["Plywood", "Wood", "Laminates", "MDF"],
    applications: ["Kitchen furniture", "Bathrooms", "Balconies", "Woodworking"],
    waterRating: "EN204 D3",
    packTypes: "1 kg, 2 kg, 5 kg, 10 kg, 20 kg, 50 kg, 60 kg"
  },
  {
    name: "BONDTITE EDGE D3",
    categorySlug: "woodworking",
    sourceUrl: "https://www.astraladhesives.com/bondtite-edge-d3.html",
    image: "/assets/products/bondtite-edge-d3.png",
    imageTone: "square",
    summary: "D3 woodworking adhesive listed in the official Bondtite product workbook.",
    meta: "Woodworking · D3",
    substrates: ["Wood", "Boards", "Edges"]
  },
  {
    name: "BONDTITE PVC BOND",
    categorySlug: "woodworking",
    sourceUrl: "https://www.astraladhesives.com/zesta-wr.html",
    image: "/assets/products/bondtite-pvc-bond.png",
    imageTone: "square",
    summary: "PVC Bond is listed under woodworking in the provided Bondtite product workbook.",
    substrates: ["PVC", "Woodworking substrates"]
  },
  {
    name: "BONDTITE HEATBOND",
    categorySlug: "woodworking",
    sourceUrl: "https://www.astraladhesives.com/bondtite-heatbond.html",
    image: "/assets/products/bondtite-heatbond.png",
    imageTone: "square",
    summary: "Heatbond is listed under Bondtite woodworking products.",
    substrates: ["Wood", "Heat-exposed workflows"]
  },
  {
    name: "BONDTITE FOAMBOND",
    categorySlug: "woodworking",
    sourceUrl: "https://www.astraladhesives.com/bondtite-foambond.html",
    image: "/assets/products/bondtite-foambond.png",
    imageTone: "square",
    summary: "Foambond is listed in the official Bondtite woodworking product range.",
    substrates: ["Foam", "Woodworking substrates"]
  },
  {
    name: "BONDTITE MULTIBOND",
    categorySlug: "woodworking",
    sourceUrl: "https://www.astraladhesives.com/bondtite-multibond.html",
    image: "/assets/products/bondtite-multibond.png",
    imageTone: "square",
    summary: "Multibond is listed in the official Bondtite woodworking range.",
    substrates: ["Wood", "Mixed woodworking substrates"]
  },
  {
    name: "BONDTITE QUIK SPRAY",
    categorySlug: "sprayable-rubber-adhesives",
    sourceUrl: "https://www.astraladhesives.com/bondtite-quik-spray.html",
    image: "/assets/products/bondtite-quik-spray.png",
    imageTone: "square",
    summary: "Sprayable rubber adhesive listed in the official Bondtite product workbook.",
    substrates: ["Rubber", "Foam", "Large surfaces"]
  },
  {
    name: "BONDTITE ACRYLIC FIX",
    categorySlug: "woodworking",
    sourceUrl: "https://www.astraladhesives.com/bondtite-acrylic-fix.html",
    image: "/assets/products/bondtite-acrylic-fix.png",
    imageTone: "square",
    summary: "Acrylic Fix is listed under woodworking in the Bondtite source workbook.",
    substrates: ["Woodworking substrates", "Acrylic workflows"]
  },
  {
    name: "BONDTITE WPC FIX",
    categorySlug: "woodworking",
    sourceUrl: "https://www.astraladhesives.com/bondtite-wpc-fix.html",
    image: "/assets/products/bondtite-wpc-fix.png",
    imageTone: "square",
    summary: "WPC Fix is listed under woodworking in the official Bondtite product workbook.",
    substrates: ["WPC", "Woodworking substrates"]
  },
  {
    name: "BONDTITE MULTIFIX",
    categorySlug: "woodworking",
    sourceUrl: "https://www.astraladhesives.com/bondtite-multifix.html",
    image: "/assets/products/bondtite-multifix-pack.png",
    imageTone: "square",
    summary:
      "Instant high-grab adhesive with excellent bond strength on multiple substrates; non-slump, paintable and suitable for interior and exterior use.",
    meta: "Woodworking · Multi-substrate",
    substrates: ["Plywood", "Laminate", "Tile", "Glass", "Concrete", "Metal"],
    applications: ["Interior fixing", "Exterior fixing", "Modern construction work"],
    packTypes: "435 gm"
  },
  {
    name: "BONDTITE FAST AND CLEAR",
    categorySlug: "epoxy-adhesives",
    sourceUrl: "https://www.astraladhesives.com/bondtite-fast-and-clear.html",
    image: "/assets/products/bondtite-fast-and-clear-pack.png",
    imageTone: "square",
    summary: "Fast and Clear is listed under epoxy adhesives in the official Bondtite product workbook.",
    substrates: ["Mixed substrates", "Clear bond applications"]
  },
  {
    name: "BONDTITE PRO",
    categorySlug: "stone-care",
    sourceUrl: "https://www.astraladhesives.com/bondite-pro.html",
    image: "/assets/products/bondtite-pro-pack.png",
    imageTone: "square",
    summary: "Stone care product listed in the official Bondtite workbook.",
    substrates: ["Stone", "Marble", "Concrete"]
  },
  {
    name: "BONDTITE SUPER STRENGTH",
    categorySlug: "epoxy-adhesives",
    sourceUrl: "https://www.astraladhesives.com/bondtite-super-strength.html",
    image: "/assets/products/bondtite-super-strength.png",
    imageTone: "square",
    summary: "Super Strength is listed under epoxy adhesives in the official Bondtite product workbook.",
    substrates: ["Mixed substrates", "Repair applications"]
  },
  {
    name: "BONDTITE STRONG AND CLEAR",
    categorySlug: "epoxy-adhesives",
    sourceUrl: "https://www.astraladhesives.com/bondtite-strong-and-clear.html",
    image: "/assets/products/bondtite-strong-and-clear-pack.png",
    imageTone: "square",
    summary: "Clear two-component epoxy adhesive for strong, long-lasting transparent bonds.",
    meta: "Epoxy · Clear bond",
    substrates: ["Mixed substrates", "Clear bond applications"]
  },
  {
    name: "BONDTITE RAPID",
    categorySlug: "stone-care",
    sourceUrl: "https://www.astraladhesives.com/bondtite-rapid.html",
    image: "/assets/products/bondtite-rapid-pack.png",
    imageTone: "square",
    summary: "Two-component epoxy adhesive system that sets in 10 minutes.",
    meta: "Stone care · 10 min",
    substrates: ["Metal", "Ceramic", "Wood", "Concrete", "Marble", "Glass", "Tiles"],
    applications: ["Stone care", "Repairing", "Machinery", "Automobiles"],
    openTime: "10 min set",
    clampTime: "30 min",
    packTypes: "3 gm"
  },
  {
    name: "BONDTITE QUICK",
    categorySlug: "cyanoacrylates",
    sourceUrl: "https://www.astraladhesives.com/bondtite-quick.html",
    image: "/assets/products/bondtite-quick.png",
    imageTone: "square",
    summary: "Bondtite Quick cyanoacrylate product from the official product workbook.",
    substrates: ["Multi-material", "Precision fixes"]
  },
  {
    name: "Bondtite Quick Spot-On",
    categorySlug: "cyanoacrylates",
    sourceUrl:
      "https://www.amazon.in/Bondtite-Household-All-Purpose-Precision-Anti-Clog/dp/B0FG36CJ1R?ref_=ast_sto_dp",
    image: "/assets/products/bondtite-quick-spot-on.jpg",
    imageTone: "square",
    summary: "Quick Spot-On cyanoacrylate product listed in the source workbook.",
    substrates: ["Household", "Precision"]
  },
  {
    name: "Bondtite Quick Gel Adhesive",
    categorySlug: "cyanoacrylates",
    sourceUrl:
      "https://www.amazon.in/Bondtite-Adhesive-Non-Drip-Controlled-Application/dp/B0FL7BF84P?ref_=ast_sto_dp",
    image: "/assets/products/bondtite-quick-gel-adhesive.jpg",
    imageTone: "square",
    summary: "Quick Gel cyanoacrylate product listed in the source workbook.",
    substrates: ["Gel application", "Controlled application"]
  },
  {
    name: "Bondtite Quick Art & Craft Glue",
    categorySlug: "cyanoacrylates",
    sourceUrl:
      "https://www.amazon.in/Bondtite-High-Viscosity-Non-Drip-Adhesive-Repositionable/dp/B0FG3CD2B4?ref_=ast_sto_dp",
    image: "/assets/products/bondtite-quick-art-craft-glue.jpg",
    imageTone: "square",
    summary: "Art & Craft Glue cyanoacrylate product listed in the source workbook.",
    substrates: ["Art and craft", "High-viscosity application"]
  },
  {
    name: "Bondtite Quick Ultra Glue Brush & Nozzle",
    categorySlug: "cyanoacrylates",
    sourceUrl:
      "https://www.amazon.in/Bondtite-Unbreakable-Dispensing-Applicator-Coverage/dp/B0FG38J6VC?ref_=ast_sto_dp",
    image: "/assets/products/bondtite-quick-ultra-glue-brush-nozzle.jpg",
    imageTone: "square",
    summary: "Quick Ultra Glue Brush & Nozzle product listed in the source workbook.",
    substrates: ["Brush application", "Nozzle application"]
  },
  {
    name: "Bondtite Quick Instant Adhesive",
    categorySlug: "cyanoacrylates",
    sourceUrl:
      "https://www.amazon.in/Bondtite-Multi-Material-Non-Staining-Precision-Household/dp/B0FL7BF3F2?ref_=ast_sto_dp",
    image: "/assets/products/bondtite-quick-instant-adhesive.jpg",
    imageTone: "square",
    summary: "Quick Instant Adhesive cyanoacrylate product listed in the source workbook.",
    substrates: ["Multi-material", "Household precision"]
  }
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function categoryLabel(slug: ProductCategorySlug) {
  return productCategories.find((category) => category.slug === slug)?.shortLabel ?? slug;
}

function fallbackImage(categorySlug: ProductCategorySlug) {
  if (categorySlug === "stone-care") return "/assets/products/bondtite-rapid-square.png";
  if (categorySlug === "epoxy-adhesives") return "/assets/products/bondtite-strong-clear-square.png";
  if (categorySlug === "cyanoacrylates") return "/assets/products/bondtite-fast-and-clear.png";
  if (categorySlug === "sprayable-rubber-adhesives") return "/assets/products/bondtite-multifix-square.jpg";
  return "/assets/products/bondtite-hydra-square.png";
}

export const catalogProducts: CatalogProduct[] = sourceProducts.map((product, index) => {
  const verified = verifiedAstralDetails[slugify(product.name)] ?? {};
  const category = categoryLabel(product.categorySlug);
  const substrates = product.substrates ?? productCategories.find((item) => item.slug === product.categorySlug)?.bestFor ?? [];
  return {
    id: slugify(product.name),
    slug: slugify(product.name),
    categorySlug: product.categorySlug,
    name: product.name,
    chemistry: category,
    label: product.name.replace(/^BONDTITE\s+/i, "").replace(/^Bondtite\s+/i, ""),
    meta: product.meta ?? category,
    image: product.image ?? fallbackImage(product.categorySlug),
    imageAlt: `${product.name} product image`,
    imageTone: product.imageTone ?? "square",
    reason: verified.summary ?? product.summary ?? `${product.name} is listed in the official Bondtite product workbook.`,
    productSummary: verified.summary ?? product.summary ?? `${product.name} is listed in the official Bondtite product workbook.`,
    bestFor: substrates.slice(0, 3),
    category,
    sourceUrl: product.sourceUrl,
    substrates,
    condition: "See official product page",
    cure: "Refer TDS",
    openTime: product.openTime ?? "See official page",
    clampTime: product.clampTime ?? "See official page",
    waterRating: product.waterRating ?? "As per product TDS",
    packTypes: verified.packTypes ?? product.packTypes ?? "See official page",
    rank: index + 1,
    applications: product.applications ?? substrates,
    steps: verified.steps ?? product.steps ?? [
      "Review the official product page and technical data sheet.",
      "Confirm substrate fit, surface preparation and application conditions.",
      "Follow the product-specific usage and safety instructions."
    ],
    features: verified.features ?? product.features ?? [],
    shelfLife: verified.shelfLife ?? product.shelfLife,
    storage: verified.storage ?? product.storage,
    faqs: [
      {
        question: `Where can I verify ${product.name} details?`,
        answer:
          "This internal page is based on the provided product workbook. The linked official product page should be treated as the source for SKU, use and technical details."
      },
      {
        question: `Which category is ${product.name} listed under?`,
        answer: `${product.name} is listed under ${category}.`
      }
    ]
  };
});

export function getCategoryBySlug(slug: string) {
  return productCategories.find((category) => category.slug === slug);
}

export function getProductsByCategory(slug: string) {
  return catalogProducts.filter((product) => product.categorySlug === slug);
}

export function getProductBySlug(categorySlug: string, productSlug: string) {
  return catalogProducts.find(
    (product) => product.categorySlug === categorySlug && product.slug === productSlug
  );
}

export function getProductPath(product: CatalogProduct) {
  return `/products/${product.categorySlug}/${product.slug}`;
}

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
  faqs: Array<{ question: string; answer: string }>;
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
      "Explore Bondtite woodworking adhesives from the official product list, including Deluxe, Aqua, Hydra+, Edge D3, Heatbond, Foambond, Multibond and Multifix.",
    bestFor: ["Wood", "Plywood", "MDF", "Laminates"],
    faqs: [
      {
        question: "Which Bondtite adhesive should I use for plywood and laminate furniture?",
        answer:
          "For regular plywood, laminate, veneer, MDF and furniture work, Bondtite Deluxe is the general woodworking option. For moisture-prone furniture, consider Bondtite Aqua, Hydra+ or Edge D3."
      },
      {
        question: "Which Bondtite adhesive is suitable for modular kitchen furniture?",
        answer:
          "Bondtite Aqua, Hydra+ and Edge D3 are positioned for modular kitchens, bathrooms and humid indoor furniture where regular wood adhesive may not be enough."
      },
      {
        question: "Which adhesive is better for foam, sofa and upholstery work?",
        answer:
          "Bondtite Foambond is designed for sofa foam, mattresses, rexine, leather, wood, metal and upholstery applications. Bondtite Multibond can be considered for wider contact bonding."
      },
      {
        question: "Which Bondtite adhesive can reduce the need for nails in DIY fixing?",
        answer:
          "Bondtite Multifix is an instant high-grab adhesive for suitable construction, interior, exterior and DIY fixing jobs where mechanical fasteners can often be reduced."
      }
    ]
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
    bestFor: ["Spray application", "Rubber", "Foam", "Large surfaces"],
    faqs: [
      {
        question: "What is Bondtite Quik Spray used for?",
        answer:
          "Bondtite Quik Spray is a sprayable rubber-based adhesive for immediate bond strength, easy application and heat-resistant bonding across foam, metal, wood, laminate and plywood."
      },
      {
        question: "Can Bondtite Quik Spray be used in hard-to-reach areas?",
        answer:
          "Yes. The spray format is useful for ceilings, wardrobe interiors, corners and other areas where brush application is inconvenient."
      },
      {
        question: "Is Bondtite Quik Spray suitable for DIY applications?",
        answer:
          "Yes. It is suitable for DIY and quick repair work where a fast, hassle-free spray application is preferred."
      }
    ]
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
    bestFor: ["Repair", "Clear bonding", "Strong bonds", "Mixed substrates"],
    faqs: [
      {
        question: "What are Bondtite epoxy adhesives used for?",
        answer:
          "Bondtite epoxy adhesives are used for durable bonding, repair, filling and fixing across marble, granite, metal, glass, ceramic, wood and other compatible substrates."
      },
      {
        question: "Which Bondtite epoxy is suitable for transparent bonding?",
        answer:
          "Bondtite Fast and Clear and Bondtite Strong and Clear are suitable for transparent bonding where the bond line should stay clear."
      },
      {
        question: "When should I choose Super Strength over a fast epoxy?",
        answer:
          "Choose Bondtite Super Strength when the job needs very high bond strength, low shrinkage and enough working time for accurate placement."
      }
    ]
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
    bestFor: ["Stone", "Marble", "Concrete", "Repair"],
    faqs: [
      {
        question: "Which Bondtite products are suitable for stone and marble repair?",
        answer:
          "Bondtite Rapid is useful for fast stone and repair work, while Bondtite Pro is designed for high-performance bonding where impact, UV and weather resistance are important."
      },
      {
        question: "Can Bondtite Rapid be used on marble and concrete?",
        answer:
          "Yes. Bondtite Rapid can be used on marble, concrete, ceramic, metal, wood, glass, fiberglass and tiles when surfaces are compatible and properly prepared."
      },
      {
        question: "Is Bondtite Pro suitable for exterior stone applications?",
        answer:
          "Bondtite Pro is listed as UV and weather-resistant, making it suitable for relevant exterior and weather-exposed bonding applications."
      }
    ]
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
    bestFor: ["Instant fixes", "Precision", "Art and craft", "Multi-material"],
    faqs: [
      {
        question: "What are Bondtite instant adhesives used for?",
        answer:
          "Bondtite instant adhesives are used for quick repairs on compatible plastic, metal, wood, rubber, ceramic, leather, marble, craft, household and electronic items."
      },
      {
        question: "Which Bondtite instant adhesive is best for precision application?",
        answer:
          "Bondtite Quick Spot-On is suitable for tight corners and intricate areas because it has an extended precision nozzle."
      },
      {
        question: "Which Bondtite instant adhesive is suitable for vertical surfaces?",
        answer:
          "Bondtite Quick Gel is suitable for vertical surfaces because its thick, non-drip formula gives better control than thin liquid adhesive."
      },
      {
        question: "Which Bondtite instant adhesive is suitable for art and craft?",
        answer:
          "Bondtite Quick Art & Craft is designed for craft surfaces, detailed applications, non-drip use, flexible bonding and short repositioning."
      }
    ]
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

const productFaqBank: Record<string, CatalogProduct["faqs"]> = {
  "bondtite-deluxe": [
    {
      question: "What is Bondtite Deluxe used for?",
      answer:
        "Bondtite Deluxe is used for wood-to-wood bonding, plywood to laminate bonding, veneer work, MDF furniture, particle board, block board and general interior carpentry."
    },
    {
      question: "Is Bondtite Deluxe suitable for laminate pasting on plywood?",
      answer:
        "Yes. It is suitable for plywood to decorative laminate bonding when an even coat is applied and the surfaces are pressed properly while the adhesive is workable."
    },
    {
      question: "Can Bondtite Deluxe be used on MDF and particle board?",
      answer:
        "Yes. Bondtite Deluxe can be used on MDF, particle board, plywood, block board, wood, veneer and laminate surfaces used in furniture making."
    },
    {
      question: "How is Bondtite Deluxe different from Bondtite Aqua?",
      answer:
        "Bondtite Deluxe is a general woodworking adhesive, while Bondtite Aqua is positioned for higher moisture and waterproof performance in kitchens, bathrooms and humid furniture areas."
    }
  ],
  "bondtite-aqua": [
    {
      question: "What is Bondtite Aqua used for?",
      answer:
        "Bondtite Aqua is used for woodworking and furniture applications where water and humidity resistance are important, including kitchen furniture, bathroom furniture, plywood, laminate, veneer, MDF and particle board."
    },
    {
      question: "Is Bondtite Aqua waterproof?",
      answer:
        "Yes. Bondtite Aqua is positioned as a waterproof PVA emulsion adhesive for furniture exposed to humidity and moist areas."
    },
    {
      question: "Is Bondtite Aqua good for modular kitchens?",
      answer:
        "Yes. It is suitable for modular kitchen cabinets, shutters and laminate surfaces that face steam, humidity and occasional moisture."
    },
    {
      question: "How do I apply Bondtite Aqua correctly?",
      answer:
        "Clean both surfaces, avoid dilution, apply an even coat, allow suitable open time, then press both surfaces together while the glue is wet."
    }
  ],
  "bondtite-hydra": [
    {
      question: "What is Bondtite Hydra+ used for?",
      answer:
        "Bondtite Hydra+ is a premium white PVA woodworking adhesive for kitchens, balconies, bathrooms, plywood, laminate, veneer, particle board, block board and MDF bonding."
    },
    {
      question: "What does D3 mean for Bondtite Hydra+?",
      answer:
        "D3 refers to a water-resistance category under EN 204, making Hydra+ suitable for moisture-prone interior furniture applications."
    },
    {
      question: "What is anti-bubble crosslinked technology in Bondtite Hydra+?",
      answer:
        "Anti-bubble crosslinked technology helps reduce bubble formation during bonding, supporting cleaner laminate and furniture finishes."
    },
    {
      question: "How is Bondtite Hydra+ different from Bondtite Aqua?",
      answer:
        "Bondtite Aqua is a waterproof PVA adhesive for humid furniture areas. Hydra+ is a premium fast-setting option with anti-bubble crosslinked technology and D3 category conformity."
    }
  ],
  "bondtite-edge-d3": [
    {
      question: "What is Bondtite Edge D3 used for?",
      answer:
        "Bondtite Edge D3 is used for laminate pasting, wood-to-wood bonding, plywood-laminate bonding, joineries, hot press, cold press and furniture exposed to moisture."
    },
    {
      question: "What does EN 204 D3 mean in Bondtite Edge D3?",
      answer:
        "EN 204 D3 indicates a European water-resistance standard for interior adhesive applications exposed to moisture."
    },
    {
      question: "Is Bondtite Edge D3 suitable for hot press and cold press laminate work?",
      answer:
        "Yes. Bondtite Edge D3 is designed for laminate pasting through hot press, cold press and other mechanized or manual furniture applications."
    },
    {
      question: "How should surfaces be prepared before using Bondtite Edge D3?",
      answer:
        "Surfaces should be dry, levelled and free from dust, oil and grease. Poor preparation can reduce adhesion and cause edge or laminate failures."
    }
  ],
  "bondtite-heatbond": [
    {
      question: "What is Bondtite Heatbond used for?",
      answer:
        "Bondtite Heatbond is used for vertical laminate pasting, curved surfaces, plywood to laminate bonding, leather articles, bus body work and automotive interiors."
    },
    {
      question: "Is Bondtite Heatbond suitable for vertical laminate applications?",
      answer:
        "Yes. Its quick grab and strong bonding efficiency help laminates stay in position during vertical application."
    },
    {
      question: "How heat-resistant is Bondtite Heatbond?",
      answer:
        "Bondtite Heatbond is formulated for heat resistance up to 180 degrees Celsius within its intended use conditions."
    },
    {
      question: "How should Bondtite Heatbond be applied?",
      answer:
        "Clean the surfaces, stir the adhesive, apply a thin uniform layer on both substrates, allow solvent evaporation to develop tack, then assemble with uniform pressure."
    }
  ],
  "bondtite-foambond": [
    {
      question: "What is Bondtite Foambond used for?",
      answer:
        "Bondtite Foambond is used for sofa foam, revolving chair foam, rexine, mattresses, upholstery, leather, wood, metal and foam-to-foam bonding."
    },
    {
      question: "Is Bondtite Foambond suitable for mattress manufacturing?",
      answer:
        "Yes. It is suitable for mattress and upholstery manufacturing where foam, rexine, leather, wood and related surfaces need flexible bonding."
    },
    {
      question: "Does Bondtite Foambond stain foam?",
      answer:
        "Bondtite Foambond is positioned as leaving no stain on foam, making it suitable for foam and upholstery applications where appearance matters."
    },
    {
      question: "Is Bondtite Foambond suitable for sofa repair?",
      answer:
        "Yes. It can be used for sofa, chair, foam, rexine and upholstery repair when the substrates are compatible and properly prepared."
    }
  ],
  "bondtite-multibond": [
    {
      question: "What is Bondtite Multibond used for?",
      answer:
        "Bondtite Multibond is a general-purpose synthetic rubber contact adhesive for rubber, leather, EVA, rexine, footwear, canvas, galvanized metal sheets, PVC flooring, upholstery foam and AC duct insulation."
    },
    {
      question: "Is Bondtite Multibond suitable for footwear repair?",
      answer:
        "Yes. It is suitable for leather articles and footwear applications where rubber, leather, EVA and similar materials need contact bonding."
    },
    {
      question: "Can Bondtite Multibond be used for PVC flooring?",
      answer:
        "Yes. Bondtite Multibond is suitable for carpet and PVC flooring applications when the surface is clean, dry and compatible."
    },
    {
      question: "How should Bondtite Multibond be applied?",
      answer:
        "Clean and dry both surfaces, stir the adhesive, apply a thin uniform layer on both substrates, allow tack development, then assemble with even pressure."
    }
  ],
  "bondtite-quik-spray": [
    {
      question: "What is Bondtite Quik Spray used for?",
      answer:
        "Bondtite Quik Spray is a sprayable rubber-based adhesive for immediate bond strength, easy application and heat-resistant bonding on foam, metal, wood, laminate and plywood."
    },
    {
      question: "Is Bondtite Quik Spray suitable for laminate to plywood bonding?",
      answer:
        "Yes. It can bond laminate to plywood quickly and is useful where brush application may be difficult."
    },
    {
      question: "Can Bondtite Quik Spray be used in hard-to-reach areas?",
      answer:
        "Yes. It is useful for ceilings, wardrobe interiors and difficult corners where normal adhesive application is inconvenient."
    },
    {
      question: "How heat-resistant is Bondtite Quik Spray?",
      answer:
        "Bondtite Quik Spray is listed as high temperature resistant up to 120 degrees Celsius within intended application conditions."
    }
  ],
  "bondtite-acrylic-fix": [
    {
      question: "What is Bondtite Acrylic Fix used for?",
      answer:
        "Bondtite Acrylic Fix is used for bonding acrylic sheets over plywood, MDF, HDHMR and similar wooden substrates where regular white adhesives may not work effectively."
    },
    {
      question: "Can Bondtite Acrylic Fix be used on MDF and HDHMR?",
      answer:
        "Yes. It can be used for plywood, MDF and HDHMR to acrylic sheet bonding."
    },
    {
      question: "Is Bondtite Acrylic Fix waterproof?",
      answer:
        "Yes. Bondtite Acrylic Fix is listed as waterproof and resistant to moisture and humid areas."
    },
    {
      question: "Why do regular white adhesives fail on acrylic sheets?",
      answer:
        "Acrylic is less porous than wood-based substrates, so regular white adhesives may not bond effectively. Acrylic Fix is designed for better compatibility with acrylic sheets."
    }
  ],
  "bondtite-wpc-fix": [
    {
      question: "What is Bondtite WPC Fix used for?",
      answer:
        "Bondtite WPC Fix is used for bonding WPC or PVC boards to laminate, acrylic, metal, glass, marble, wood, PVC edging and related surfaces."
    },
    {
      question: "Can Bondtite WPC Fix bond WPC to metal or glass?",
      answer:
        "Yes. It can be used for bonding WPC or PVC boards to metal sheets, glass, laminate, wood, PVC edging and other compatible surfaces."
    },
    {
      question: "Is Bondtite WPC Fix waterproof?",
      answer:
        "Yes. Bondtite WPC Fix is listed as waterproof and resistant to moisture and humid conditions."
    },
    {
      question: "Why is surface scratching recommended for WPC before bonding?",
      answer:
        "WPC can be difficult to bond. Creating a checkered scratch pattern helps improve mechanical grip and adhesive contact."
    }
  ],
  "bondtite-multifix": [
    {
      question: "What is Bondtite Multifix used for?",
      answer:
        "Bondtite Multifix Nail Saver is used for high-grab bonding on multiple substrates in construction, interior, exterior and DIY applications."
    },
    {
      question: "Which surfaces can Bondtite Multifix bond?",
      answer:
        "Bondtite Multifix can bond plywood, laminate, drywall, cement board, tile, glass, mirror, ceramic, porcelain, concrete, marble, granite, brick, aluminium, ACP and steel."
    },
    {
      question: "Can Bondtite Multifix replace nails?",
      answer:
        "Yes, in many suitable DIY and fixing applications it can reduce mechanical fixings. Heavy loads and safety-critical items still need proper support as per product instructions."
    },
    {
      question: "Is Bondtite Multifix suitable for interior and exterior use?",
      answer:
        "Yes. Bondtite Multifix is suitable for interior and exterior applications and has good weather and water resistance."
    }
  ],
  "bondtite-fast-and-clear": [
    {
      question: "What is Bondtite Fast and Clear used for?",
      answer:
        "Bondtite Fast and Clear is a 5-minute, high-strength, two-component transparent epoxy for quick repairs and clear bonding on compatible surfaces."
    },
    {
      question: "Is Bondtite Fast and Clear transparent after curing?",
      answer:
        "Yes. It is designed for clear, transparent bonding where the bond line should remain less visible."
    },
    {
      question: "Is Bondtite Fast and Clear suitable for vertical applications?",
      answer:
        "Yes. Its thicker formula helps reduce sagging on vertical applications."
    },
    {
      question: "How should Bondtite Fast and Clear be used?",
      answer:
        "Clean and dry both surfaces, mix equal parts thoroughly, apply quickly, assemble the parts and allow proper curing before loading."
    }
  ],
  "bondtite-pro": [
    {
      question: "What is Bondtite Pro used for?",
      answer:
        "Bondtite Pro is a high-performance, room-temperature curing two-component epoxy adhesive for strong bonding across suitable stone, construction and repair applications."
    },
    {
      question: "Is Bondtite Pro weather-resistant?",
      answer:
        "Yes. Bondtite Pro is listed as UV and weather-resistant for relevant exterior and weather-exposed applications."
    },
    {
      question: "What are the key benefits of Bondtite Pro?",
      answer:
        "Bondtite Pro offers high impact resistance, easy spreadability, excellent UV and all-weather resistance and hybrid technology."
    },
    {
      question: "How long should Bondtite Pro be clamped?",
      answer:
        "It should be clamped for the recommended holding period and left for full strength development before loading."
    }
  ],
  "bondtite-super-strength": [
    {
      question: "What is Bondtite Super Strength used for?",
      answer:
        "Bondtite Super Strength is a high-strength two-component epoxy system for marble, granite, engineered marble, metal, glass, wood and demanding repair applications."
    },
    {
      question: "When should I choose Super Strength over a fast epoxy?",
      answer:
        "Choose it when the job needs very high bond strength, low shrinkage, multi-substrate bonding and enough working time for accurate placement."
    },
    {
      question: "Can Bondtite Super Strength be used for engineered marble cladding?",
      answer:
        "Yes. It is suitable for wall cladding of engineered or sintered marble when surface preparation and installation practice are correct."
    },
    {
      question: "Can Bondtite Super Strength bond metal to metal?",
      answer:
        "Yes. It can be used for metal-to-metal bonding in automotive and fabrication work depending on the application requirement."
    }
  ],
  "bondtite-strong-and-clear": [
    {
      question: "What is Bondtite Strong and Clear used for?",
      answer:
        "Bondtite Strong and Clear is a 30-minute transparent two-component epoxy for glass-to-glass bonding, Italian marble, marble moulding, granite, metal bonding and automobile repair."
    },
    {
      question: "How is Bondtite Strong and Clear different from Fast and Clear?",
      answer:
        "Strong and Clear has a 30-minute setting time and about 15 minutes of working time. Fast and Clear is a quicker 5-minute transparent epoxy."
    },
    {
      question: "Is Bondtite Strong and Clear suitable for glass bonding?",
      answer:
        "Yes. It is suitable for transparent glass-to-glass bonding when surfaces are clean, dry and properly fitted before adhesive application."
    },
    {
      question: "What is the working time of Bondtite Strong and Clear?",
      answer:
        "Bondtite Strong and Clear has an ideal working time of about 15 minutes, allowing more time for alignment than very fast-setting epoxy products."
    }
  ],
  "bondtite-rapid": [
    {
      question: "What is Bondtite Rapid used for?",
      answer:
        "Bondtite Rapid is a two-component epoxy adhesive for fast repair on metal, ceramic, wood, chrome, concrete, marble, glass, fiberglass, tiles, machinery and automobiles."
    },
    {
      question: "How quickly does Bondtite Rapid set?",
      answer:
        "Bondtite Rapid sets in about 10 minutes, making it useful when a faster epoxy repair is required across compatible substrates."
    },
    {
      question: "Is Bondtite Rapid water-resistant?",
      answer:
        "Yes. Bondtite Rapid is listed as resistant to water and most common solvents after proper curing."
    },
    {
      question: "When should I choose Rapid instead of Super Strength?",
      answer:
        "Choose Rapid when faster setting is important. Choose Super Strength when very high bond strength, low shrinkage and longer working time matter more."
    }
  ],
  "bondtite-quick": [
    {
      question: "What is Bondtite Quick used for?",
      answer:
        "Bondtite Quick is an instant adhesive for general-purpose quick repairs on many plastics, metals, alloys, marble, rubber, polycarbonate, Bakelite, ceramics, jewellery, electronics and household objects."
    },
    {
      question: "Is Bondtite Quick suitable for household repairs?",
      answer:
        "Yes. It is suitable for quick household repairs where small broken items need fast bonding and the materials are compatible."
    },
    {
      question: "How should Bondtite Quick be applied?",
      answer:
        "Clean and dry both surfaces, apply a thin film or drop on one surface only, press parts together firmly and hold for a few seconds."
    },
    {
      question: "How quickly does Bondtite Quick bond?",
      answer:
        "Bondtite Quick develops an adequate bond in less than one minute depending on substrate, glue amount and surface condition."
    }
  ],
  "bondtite-quick-spot-on": [
    {
      question: "What is Bondtite Quick Spot-On used for?",
      answer:
        "Bondtite Quick Spot-On is a quick-setting instant adhesive for metal, plastic, wood, rubber, marble, leather, ceramic, craft projects and household repairs."
    },
    {
      question: "What makes Bondtite Quick Spot-On different from regular instant glue?",
      answer:
        "It has a precision extended nozzle for smooth, controlled application in tight corners and intricate areas, plus an anti-clog cap to reduce wastage."
    },
    {
      question: "Is Bondtite Quick Spot-On good for precision repairs?",
      answer:
        "Yes. The extended nozzle is useful for small parts, corners, craft work, decorative items and detailed household repairs."
    },
    {
      question: "Does Bondtite Quick Spot-On bond in seconds?",
      answer:
        "Yes. It is designed to bond in seconds depending on material, adhesive quantity and surface condition."
    }
  ],
  "bondtite-quick-gel-adhesive": [
    {
      question: "What is Bondtite Quick Gel used for?",
      answer:
        "Bondtite Quick Gel is a high-viscosity cyanoacrylate adhesive for precise, non-drip bonding on wood, metal, ceramic, rubber, leather, cardboard, paper, PVC edge banding, wooden beading and acrylic sheet pasting."
    },
    {
      question: "Is Bondtite Quick Gel suitable for vertical surfaces?",
      answer:
        "Yes. Its thick, non-drip formula is suitable for vertical and controlled applications where liquid instant adhesives may run."
    },
    {
      question: "What is the difference between Bondtite Quick Gel and liquid instant glue?",
      answer:
        "Quick Gel has higher viscosity, so it stays in place better and allows more control. Liquid instant glue flows faster and is better for very small gaps."
    },
    {
      question: "What materials are not recommended for Bondtite Quick Gel?",
      answer:
        "It is not recommended for polyethylene, polypropylene, EPDM rubber, silicone rubber, Teflon and other difficult low-energy surfaces."
    }
  ],
  "bondtite-quick-art-and-craft-glue": [
    {
      question: "What is Bondtite Quick Art & Craft used for?",
      answer:
        "Bondtite Quick Art & Craft is used for art, craft, DIY, hobby, school and decorative projects on porous and non-porous craft surfaces."
    },
    {
      question: "Is Bondtite Quick Art & Craft non-drip?",
      answer:
        "Yes. It has a thick, high-viscosity, clear non-drip formula that helps prevent spills and supports detailed application."
    },
    {
      question: "Can Bondtite Quick Art & Craft be repositioned?",
      answer:
        "Yes. It allows short repositioning within about 20 seconds, which helps with craft alignment."
    },
    {
      question: "Is Bondtite Quick Art & Craft suitable for school projects?",
      answer:
        "Yes. It is suitable for school, hobby and DIY craft projects where clean application and fast bonding are needed."
    }
  ],
  "bondtite-quick-ultra-glue-brush-and-nozzle": [
    {
      question: "What is Bondtite Quick Ultra Glue used for?",
      answer:
        "Bondtite Quick Ultra Glue is used for fast, strong bonding of metal, wood, leather, plastic, ceramic, rubber and other compatible materials in DIY and repair applications."
    },
    {
      question: "What makes Bondtite Quick Ultra Glue different?",
      answer:
        "It has a twin dispensing mechanism with a brush and nozzle for both broad coverage and precise application."
    },
    {
      question: "Is Bondtite Quick Ultra Glue impact-resistant?",
      answer:
        "Yes. It is positioned as tough and impact-resistant, with a strong clear bond designed for durability."
    },
    {
      question: "When should I choose Ultra Glue over Quick Instant?",
      answer:
        "Choose Ultra Glue for brush and nozzle flexibility, stronger impact-resistant bonding or larger coverage. Choose Quick Instant for simple one-drop fast repairs."
    }
  ],
  "bondtite-quick-instant-adhesive": [
    {
      question: "What is Bondtite Quick Instant used for?",
      answer:
        "Bondtite Quick Instant is used for fast DIY repairs on metal, wood, ceramic, plastic, rubber, leather and similar compatible materials."
    },
    {
      question: "How quickly does Bondtite Quick Instant bond?",
      answer:
        "Bondtite Quick Instant is designed to deliver rapid bonding within about 5 seconds depending on material type, surface condition and quantity used."
    },
    {
      question: "What is the smart nozzle in Bondtite Quick Instant?",
      answer:
        "The smart nozzle helps dispense one drop at a time, prevents drying and supports cleaner application with less wastage."
    },
    {
      question: "What is the difference between Quick Instant and Quick Spot-On?",
      answer:
        "Quick Instant focuses on 5-second rapid repair with a smart nozzle. Quick Spot-On focuses on precision extended-nozzle application for tight corners and intricate areas."
    }
  ]
};

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
  const slug = slugify(product.name);
  const verified = verifiedAstralDetails[slugify(product.name)] ?? {};
  const category = categoryLabel(product.categorySlug);
  const substrates = product.substrates ?? productCategories.find((item) => item.slug === product.categorySlug)?.bestFor ?? [];
  return {
    id: slug,
    slug,
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
    faqs: productFaqBank[slug] ?? [
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

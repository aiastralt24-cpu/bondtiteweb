import { isProductVisible } from './product-visibility';
export const baseUrl = "https://www.bondtite.in";

export const mainNavigation = [
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/applications" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const headerCta = { label: "Product advisor", href: "/product-advisor" };

export type SiteApplication = {
  seoTitle?: string;
  displayTitle: string;
  materials: string[];
  groups: Array<{id:string;title:string;description:string;products:Array<{slug:string;note:string}>}>;
  slug: string;
  title: string;
  accent: string;
  description: string;
  seoDescription: string;
  imageTone: "macro" | "workshop" | "products";
  products: string[];
  steps: string[];
  faqs: Array<{ question: string; answer: string }>;
};

export type SiteResource = {
  slug: string;
  type: "TDS" | "Guide" | "Certificate" | "Support";
  title: string;
  description: string;
  seoDescription: string;
  readTime: string;
  related: string[];
};

// Curated job-to-product mappings reviewed against official Astral product pages.
const allSiteApplications: SiteApplication[] = [
  {
    "slug": "furniture-and-joinery",
    "title": "Furniture and",
    "accent": "joinery.",
    "displayTitle": "Furniture & joinery",
    "materials": [
      "Wood",
      "Plywood",
      "Laminate",
      "MDF",
      "Acrylic",
      "PVC",
      "WPC"
    ],
    "description": "From wood joints to decorative panels, explore products for each part of furniture making.",
    "groups": [
      {
        "id": "wood-joints",
        "title": "Wood joints & furniture assembly",
        "description": "Choose according to the boards, joining method and moisture exposure.",
        "products": [
          {
            "slug": "bondtite-hydra",
            "note": "Fast-setting PVA for kitchen, bathroom and balcony furniture."
          },
          {
            "slug": "bondtite-deluxe",
            "note": "Ready-to-use PVA for wood, plywood, veneer and board assembly."
          },
          {
            "slug": "bondtite-aqua",
            "note": "Waterproof PVA for wood-based furniture and decorative laminates."
          },
          {
            "slug": "bondtite-edge-d3",
            "note": "D3 adhesive for wood joinery and plywood-to-laminate work."
          }
        ]
      },
      {
        "id": "lamination",
        "title": "Decorative lamination",
        "description": "Contact adhesives for laminates and shaped furniture surfaces.",
        "products": [
          {
            "slug": "clearbond",
            "note": "Clear contact adhesive for decorative laminate on plywood, including vertical lamination."
          },
          {
            "slug": "bondtite-heatbond",
            "note": "For plywood-to-laminate work on vertical and curved surfaces."
          }
        ]
      },
      {
        "id": "speciality-panels",
        "title": "Acrylic, PVC & WPC panels",
        "description": "Match the adhesive to the decorative sheet and the board underneath.",
        "products": [
          {
            "slug": "bondtite-acrylic-fix",
            "note": "Acrylic sheets on plywood, MDF, HDHMR or WPC, applied horizontally."
          },
          {
            "slug": "bondtite-wpc-fix",
            "note": "WPC and PVC boards bonded to laminate, veneer and other listed facings; horizontal application."
          },
          {
            "slug": "bondtite-pvc-bond",
            "note": "PVC sheet lamination and PVC edge banding on wood-based boards."
          }
        ]
      },
      {
        "id": "wood-repairs",
        "title": "Wood repairs & filling",
        "description": "A filled epoxy for restoring damaged wood.",
        "products": [
          {
            "slug": "bondtite-wood",
            "note": "Fill cracks and holes in wood with a wood-coloured epoxy."
          }
        ]
      }
    ],
    "steps": [
      "Identify the board, facing material and whether the work is a joint, lamination or repair.",
      "Prepare the surfaces and use the coating or mixing method for that specific product.",
      "Follow its assembly, pressing and cure times before trimming or loading the finished piece."
    ],
    "faqs": [
      {
        "question": "Which adhesive should I choose for laminate on plywood?",
        "answer": "Deluxe, Aqua, Hydra+ and Edge D3 cover woodworking lamination. Clearbond and Heatbond are contact-adhesive options, including specified vertical work. Their application methods differ."
      },
      {
        "question": "Can one adhesive handle acrylic, PVC and WPC panels?",
        "answer": "These panels have dedicated options: Acrylic Fix for acrylic sheets, PVC Bond for PVC sheets and edge bands, and WPC Fix for WPC/PVC boards with compatible facings."
      },
      {
        "question": "What can I use to fill cracks in wood?",
        "answer": "Bondtite Wood is a wood-coloured two-part epoxy for bonding and filling cracks or holes in wood."
      }
    ],
    "seoTitle": "Furniture & joinery Adhesives | Bondtite",
    "seoDescription": "From wood joints to decorative panels, explore products for each part of furniture making.",
    "imageTone": "products",
    "products": [
      "bondtite-hydra",
      "bondtite-deluxe",
      "bondtite-aqua",
      "bondtite-edge-d3",
      "clearbond",
      "bondtite-heatbond",
      "bondtite-acrylic-fix",
      "bondtite-wpc-fix",
      "bondtite-pvc-bond",
      "bondtite-wood"
    ]
  },
  {
    "slug": "construction-and-infrastructure",
    "title": "Construction and",
    "accent": "fixing.",
    "displayTitle": "Construction & fixing",
    "materials": [
      "Stone",
      "Metal",
      "Concrete",
      "Panels",
      "Flooring"
    ],
    "description": "Explore separate options for panel fixing, stone bonding, metal repairs and flooring.",
    "groups": [
      {
        "id": "panel-fixing",
        "title": "Panels & interior fixing",
        "description": "Cartridge-applied fixing for the listed construction surfaces.",
        "products": [
          {
            "slug": "bondtite-multifix",
            "note": "High-grab fixing for panels, tiles, glass, stone and compatible construction surfaces."
          }
        ]
      },
      {
        "id": "stone-bonding",
        "title": "Stone bonding & marble work",
        "description": "Two-part systems for stone assembly and specific repair tasks.",
        "products": [
          {
            "slug": "bondtite-pro",
            "note": "Marble and granite fixing, window frames, wash basins and related bonding."
          },
          {
            "slug": "bondtite-super-strength",
            "note": "Marble and granite bonding, engineered stone cladding and metal fabrication."
          },
          {
            "slug": "bondtite-total",
            "note": "Stone and granite assembly with compatible similar or dissimilar materials."
          },
          {
            "slug": "bondtite-white-paste",
            "note": "White marble repairs and sealing around PVC pipe openings in concrete."
          }
        ]
      },
      {
        "id": "site-repairs",
        "title": "Metal & general repairs",
        "description": "Choose a repair product for the material and finish required.",
        "products": [
          {
            "slug": "bondtite-metallic",
            "note": "Metal-finished repairs, drilled-hole filling and concealment of welding marks."
          },
          {
            "slug": "bondtite-rapid",
            "note": "Fast-setting epoxy for repairs involving ceramic, metal, concrete and other listed materials."
          }
        ]
      },
      {
        "id": "flooring-contact",
        "title": "Flooring & contact bonding",
        "description": "A contact adhesive for supported flooring and ducting work.",
        "products": [
          {
            "slug": "bondtite-multibond",
            "note": "Carpet and PVC flooring, AC ducting and other documented contact-bonding uses."
          }
        ]
      }
    ],
    "steps": [
      "Identify the exact repair, fixing or flooring job and the materials at the bond.",
      "Follow the chosen product’s preparation and dispensing method, including its ratio when mixing a two-part system.",
      "Observe the specified support and cure period before the assembly is loaded."
    ],
    "faqs": [
      {
        "question": "Is Multibond the starting point for every construction job?",
        "answer": "No. Multibond is listed for contact-bonding uses such as carpet/PVC flooring and AC ducting. Panel fixing, stone bonding and metal repair have different product options."
      },
      {
        "question": "How do Metallic and White Paste differ?",
        "answer": "Metallic gives a metal-like finish for metal repairs. White Paste is a filled white epoxy for white marble work and other specifically listed applications."
      }
    ],
    "seoTitle": "Construction & fixing Adhesives | Bondtite",
    "seoDescription": "Explore separate options for panel fixing, stone bonding, metal repairs and flooring.",
    "imageTone": "products",
    "products": [
      "bondtite-multifix",
      "bondtite-pro",
      "bondtite-super-strength",
      "bondtite-total",
      "bondtite-white-paste",
      "bondtite-metallic",
      "bondtite-rapid",
      "bondtite-multibond"
    ]
  },
  {
    "slug": "diy-segment",
    "title": "Home repairs and",
    "accent": "DIY.",
    "displayTitle": "Home repairs & DIY",
    "materials": [
      "Small repairs",
      "Glass",
      "Ceramic",
      "Wood",
      "Crafts"
    ],
    "description": "Find a format for the job, from precision instant repairs to clear epoxy bonds and craft work.",
    "groups": [
      {
        "id": "instant-repairs",
        "title": "Small, precise repairs",
        "description": "Instant adhesives with different dispensing formats.",
        "products": [
          {
            "slug": "bondtite-quick",
            "note": "An ampoule-format instant adhesive for compatible small repairs."
          },
          {
            "slug": "bondtite-quick-instant-adhesive",
            "note": "A precision anti-clog tip for controlled, one-drop repairs."
          },
          {
            "slug": "bondtite-quick-spot-on",
            "note": "An extended nozzle for small parts and difficult-to-reach areas."
          },
          {
            "slug": "bondtite-quick-gel-adhesive",
            "note": "A thick, non-drip formula for controlled and vertical application."
          },
          {
            "slug": "bondtite-quick-ultra-glue-brush-and-nozzle",
            "note": "A brush for broader coverage and a nozzle for precise application."
          }
        ]
      },
      {
        "id": "epoxy-repairs",
        "title": "Clear bonds & durable repairs",
        "description": "Two-part products selected by the material, finish and working time.",
        "products": [
          {
            "slug": "bondtite-fast-and-clear",
            "note": "Fast, transparent glass-to-glass bonding and other listed repairs."
          },
          {
            "slug": "bondtite-strong-and-clear",
            "note": "Transparent bonds with a longer alignment window than Fast and Clear."
          },
          {
            "slug": "bondtite-rapid",
            "note": "A fast-setting epoxy for compatible ceramic, metal and other repairs."
          },
          {
            "slug": "bondtite-wood",
            "note": "Wood-coloured filling and repair of cracks and holes."
          },
          {
            "slug": "bondtite-metallic",
            "note": "Metal-finished repairs and filling on metal surfaces."
          },
          {
            "slug": "bondtite-uniweld",
            "note": "A two-component acrylic adhesive for listed rigid plastics, metals and other repair materials."
          }
        ]
      },
      {
        "id": "craft-and-coverage",
        "title": "Craft work & surface coverage",
        "description": "Products for jewellery assembly, decorative detail work and supported surface bonding.",
        "products": [
{"slug":"bondtite-total-gem","note":"Two-part epoxy for imitation jewellery, stone setting, Kundan, rhinestones, pearls and crystals."},
          {
            "slug": "bondtite-quick-art-and-craft-glue",
            "note": "A clear, non-drip craft formula with a short repositioning window."
          },
          {
            "slug": "bondtite-quik-spray",
            "note": "Spray application for supported laminate, plywood, foam and other surface-bonding jobs."
          }
        ]
      }
    ],
    "steps": [
      "Identify the material at the broken joint, including the specific plastic type where relevant.",
      "Choose the application format and check the product’s surface preparation and assembly method.",
      "Keep the joint undisturbed for the stated period and allow full cure before regular use."
    ],
    "faqs": [
      {
        "question": "When should I choose a gel rather than a liquid instant adhesive?",
        "answer": "Quick Gel offers controlled, non-drip application, including vertical work. Spot-On and Quick Instant use precision nozzles; Ultra Glue offers both a brush and nozzle."
      },
      {
        "question": "Which products give a transparent glass bond?",
        "answer": "Fast and Clear and Strong and Clear explicitly list transparent glass-to-glass bonding. Compare their working times and instructions."
      },
      {
        "question": "Is spray adhesive suitable for every small repair?",
        "answer": "Quik Spray suits supported surface-bonding jobs. Small precise repairs, gap filling and two-part epoxy work use different products and application methods."
      }
    ],
    "seoTitle": "Home repairs & DIY Adhesives | Bondtite",
    "seoDescription": "Find a format for the job, from precision instant repairs to clear epoxy bonds and craft work.",
    "imageTone": "products",
    "products": [
      "bondtite-quick",
      "bondtite-quick-instant-adhesive",
      "bondtite-quick-spot-on",
      "bondtite-quick-gel-adhesive",
      "bondtite-quick-ultra-glue-brush-and-nozzle",
      "bondtite-fast-and-clear",
      "bondtite-strong-and-clear",
      "bondtite-rapid",
      "bondtite-wood",
      "bondtite-metallic",
      "bondtite-uniweld",
      "bondtite-quick-art-and-craft-glue",
      "bondtite-quik-spray"
    ]
  },
  {
    "slug": "auto-and-upholstery",
    "title": "Auto and",
    "accent": "upholstery.",
    "displayTitle": "Auto & upholstery",
    "materials": [
      "Foam",
      "Leather",
      "Rexine",
      "Interior laminates",
      "Metal"
    ],
    "description": "Keep upholstery and interior bonding separate from rigid-part and workshop repairs.",
    "groups": [
      {
        "id": "upholstery",
        "title": "Foam & upholstery assembly",
        "description": "Contact-bonding options for the specifically listed upholstery materials.",
        "products": [
          {
            "slug": "bondtite-foambond",
            "note": "Foam-to-foam, rexine, wood, metal and leather bonding for mattresses and upholstery."
          },
          {
            "slug": "bondtite-multibond",
            "note": "Mattress and upholstery contact bonding, plus leather articles and footwear."
          },
          {
            "slug": "bondtite-quik-spray",
            "note": "Spray coverage for supported foam, wood and metal surface bonding."
          }
        ]
      },
      {
        "id": "interiors",
        "title": "Laminates & automotive interiors",
        "description": "A contact adhesive with documented automotive-interior uses.",
        "products": [
          {
            "slug": "bondtite-heatbond",
            "note": "Bus body and automotive interiors, leather articles and laminate bonding."
          }
        ]
      },
      {
        "id": "workshop-repairs",
        "title": "Rigid-part & workshop repairs",
        "description": "These products serve material-specific repairs, separately from upholstery.",
        "products": [
          {
            "slug": "bondtite-super-strength",
            "note": "Metal-to-metal bonding in automotive and fabrication work."
          },
          {
            "slug": "bondtite-fast-and-clear",
            "note": "Documented metal bonding and automobile repair uses."
          },
          {
            "slug": "bondtite-rapid",
            "note": "Fast-setting epoxy for compatible materials in workshop repairs."
          },
          {
            "slug": "bondtite-metallic",
            "note": "Metal surface repairs and filling, including machinery work."
          }
        ]
      }
    ],
    "steps": [
      "Identify whether the job involves soft upholstery, an interior facing or a rigid repair part.",
      "For a contact adhesive, follow the specified coating and tack-development method before joining.",
      "For a two-part repair system, use its specified ratio, assembly time and support period."
    ],
    "faqs": [
      {
        "question": "Which surfaces are listed for Foambond?",
        "answer": "Astral lists foam bonded to foam, rexine, wood, metal and leather in mattress and upholstery manufacture. Fabric and trim compatibility should be identified by the specific material."
      },
      {
        "question": "Should all adhesives be pressed together immediately?",
        "answer": "No. Contact adhesives require solvent evaporation and tack development. Two-part epoxies have their own working and cure times. Follow the selected product’s instructions."
      },
      {
        "question": "Does a clear bond automatically make an adhesive suitable for any trim?",
        "answer": "No. A transparent finish does not establish trim compatibility. Choose using the listed joining materials and the product’s intended application."
      }
    ],
    "seoTitle": "Auto & upholstery Adhesives | Bondtite",
    "seoDescription": "Keep upholstery and interior bonding separate from rigid-part and workshop repairs.",
    "imageTone": "products",
    "products": [
      "bondtite-foambond",
      "bondtite-multibond",
      "bondtite-quik-spray",
      "bondtite-heatbond",
      "bondtite-super-strength",
      "bondtite-fast-and-clear",
      "bondtite-rapid",
      "bondtite-metallic"
    ]
  },
  {
    "slug": "bangles-and-decorative-crafts",
    "title": "Bangles and",
    "accent": "decorative crafts.",
    "displayTitle": "Bangles & decorative crafts",
    "materials": [
      "Sankha bangles",
      "Glass bangles",
      "Colour pasting",
      "Zari work"
    ],
    "description": "Speciality epoxy systems for bangle manufacture, colour pasting and decorative work.",
    "groups": [
      {
        "id": "sankha",
        "title": "Sankha bangle manufacture",
        "description": "A clear, high-viscosity epoxy for the documented manufacturing use.",
        "products": [
          {
            "slug": "bondtite-viscoclear",
            "note": "Specifically listed for Sankha bangle manufacture."
          }
        ]
      },
      {
        "id": "glass-bangles",
        "title": "Glass bangles & decoration",
        "description": "Speciality formulations for fancy glass bangles.",
        "products": [
          {
            "slug": "bondtite-rhiomet",
            "note": "High-viscosity epoxy for colour pasting and zari designs on fancy glass bangles."
          },
          {
            "slug": "bondtite-zoro",
            "note": "Two-component epoxy for fancy glass-bangle manufacture and decorative work."
          }
        ]
      }
    ],
    "steps": [
      "Select the system by the bangle material and decorative process.",
      "Use the current technical guidance for resin/hardener quantities and any pigments or diluents.",
      "Follow the system’s processing and curing instructions before further finishing."
    ],
    "faqs": [
      {
        "question": "Which product is listed for Sankha bangles?",
        "answer": "Astral lists Bondtite Viscoclear for Sankha bangle manufacture."
      },
      {
        "question": "Which products cover fancy glass bangles?",
        "answer": "Rhiomet and Zoro are listed for fancy glass-bangle manufacture, including decorative colour and zari work."
      },
      {
        "question": "Where can I find the mixing instructions?",
        "answer": "Use the technical-document request on the selected product page for the current system-specific mixing and processing instructions."
      }
    ],
    "seoTitle": "Bangles & decorative crafts Adhesives | Bondtite",
    "seoDescription": "Speciality epoxy systems for bangle manufacture, colour pasting and decorative work.",
    "imageTone": "products",
    "products": [
      "bondtite-viscoclear",
      "bondtite-rhiomet",
      "bondtite-zoro"
    ]
  },
  {
    "slug": "industrial-bonding-and-concrete-repair",
    "title": "Industrial bonding and",
    "accent": "concrete repair.",
    "displayTitle": "Industrial bonding & concrete repair",
    "materials": [
      "Structural bonding",
      "Composites",
      "Flooring",
      "Electrical potting",
      "Concrete cracks"
    ],
    "description": "Explore resin and hardener systems by industrial process, from composite assembly to concrete injection grouting.",
    "groups": [
      {
        "id": "structural-flooring",
        "title": "Structural bonding & flooring",
        "description": "Industrial epoxy systems with distinct resin and hardener combinations.",
        "products": [
          {
            "slug": "bondtite-ast-fr1201-ast-fh7201",
            "note": "Listed for flooring, structural bonding, underframe and bogie components."
          },
          {
            "slug": "bondtite-ast-fr1202-ast-fh7601",
            "note": "Listed for structural bonding, flooring, underframe and bogie components."
          },
          {
            "slug": "bondtite-ast-fr1203-ast-fh7203",
            "note": "Listed for structural bonding and flooring, with electrical potting and casting applications."
          }
        ]
      },
      {
        "id": "composites",
        "title": "Composite, automotive & marine assembly",
        "description": "An MMA system for documented structural and composite applications.",
        "products": [
          {
            "slug": "bondtite-mma-999a-mma-999b",
            "note": "Fast-setting MMA system for structural, automotive, marine and composite bonding."
          }
        ]
      },
      {
        "id": "concrete-repair",
        "title": "Concrete injection grouting",
        "description": "A low-viscosity epoxy system for documented repair applications.",
        "products": [
          {
            "slug": "bondtite-ast-fr4202-ast-fh4102",
            "note": "Injection grouting for concrete cracks and listed masonry and honeycomb-panel repairs."
          }
        ]
      }
    ],
    "steps": [
      "Identify the process, substrates and the exact resin/hardener system required.",
      "Obtain that system’s current technical instructions for preparation, mixing and application.",
      "Follow its processing window and curing schedule before putting the assembly into service."
    ],
    "faqs": [
      {
        "question": "Are the AST systems interchangeable?",
        "answer": "Each product identifies a specific resin and hardener combination. Use the current instructions for that exact combination."
      },
      {
        "question": "Which system includes electrical potting and casting?",
        "answer": "Astral lists AST FR1203 / AST FH7203 for electrical potting and casting, alongside its structural and flooring uses."
      },
      {
        "question": "Which product is intended for concrete injection grouting?",
        "answer": "AST FR4202 / AST FH4102 is the listed low-viscosity epoxy injection-grouting system."
      }
    ],
    "seoTitle": "Industrial bonding & concrete repair Adhesives | Bondtite",
    "seoDescription": "Explore resin and hardener systems by industrial process, from composite assembly to concrete injection grouting.",
    "imageTone": "products",
    "products": [
      "bondtite-ast-fr1201-ast-fh7201",
      "bondtite-ast-fr1202-ast-fh7601",
      "bondtite-ast-fr1203-ast-fh7203",
      "bondtite-mma-999a-mma-999b",
      "bondtite-ast-fr4202-ast-fh4102"
    ]
  }
];

export const siteApplications: SiteApplication[] = allSiteApplications.map(application => {
  const groups = application.groups.map(group => ({...group, products: group.products.filter(product => isProductVisible(product.slug))})).filter(group => group.products.length > 0);
  return {...application, groups, products: [...new Set(groups.flatMap(group => group.products.map(product => product.slug)))]};
}).filter(application => application.groups.length > 0);

export const siteResources: SiteResource[] = [
  {
    slug: "technical-data-sheets",
    type: "TDS",
    title: "Technical data sheets",
    description:
      "Product-level technical documents covering substrates, open time, cure behavior, pack format and safety guidance.",
    seoDescription:
      "Access Bondtite technical data sheet information for adhesives, substrates, open time, cure behavior and safety guidance.",
    readTime: "PDF library",
    related: ["Bondtite Hydra+", "Bondtite Rapid", "Bondtite Multifix"]
  },
  {
    slug: "edge-banding-mdf-and-boards",
    type: "Guide",
    title: "Edge banding MDF and boards",
    description:
      "A practical workflow for preparing MDF, applying adhesive, pressing edges and preventing bond-line failure.",
    seoDescription:
      "Learn how to use Bondtite adhesives for MDF edge banding, board preparation, pressing and bond-line quality.",
    readTime: "6 min read",
    related: ["Bondtite Total", "Bondtite Hydra+"]
  },
  {
    slug: "bonding-stone-metal-and-ceramic",
    type: "Guide",
    title: "Bonding stone, metal and ceramic",
    description:
      "How to select and mix epoxy adhesives for hard substrates, repair jobs and demanding site conditions.",
    seoDescription:
      "A Bondtite guide to epoxy adhesive selection for stone, metal, ceramic and repair applications.",
    readTime: "8 min read",
    related: ["Bondtite Rapid", "Bondtite Multifix"]
  },
  {
    slug: "fast-clear-fixes-for-trims",
    type: "Guide",
    title: "Fast clear fixes for trims",
    description:
      "Clear-bond guidance for trims, plastic detail correction and visible repair work in workshops.",
    seoDescription:
      "Learn when to use clear Bondtite adhesives for trims, plastic repair and visible fast fixes.",
    readTime: "4 min read",
    related: ["Bondtite Strong & Clear"]
  },
  {
    slug: "certifications-and-standards",
    type: "Certificate",
    title: "Certifications and standards",
    description:
      "How Bondtite connects product claims to named ratings, test language and technical documentation.",
    seoDescription:
      "Review Bondtite adhesive certification, standards and technical proof language for trade users.",
    readTime: "Reference",
    related: ["D3 water resistance", "TDS library"]
  },
  {
    slug: "dealer-and-trade-support",
    type: "Support",
    title: "Dealer and trade support",
    description:
      "Trade desk, dealer enquiries, product guidance and support routes for contractors, retailers and fabricators.",
    seoDescription:
      "Contact Bondtite trade support for adhesive guidance, dealer enquiries and product documentation.",
    readTime: "Support",
    related: ["Trade desk", "Dealer network"]
  }
];

export function getApplicationBySlug(slug: string) {
  return siteApplications.find((application) => application.slug === slug);
}

export function getResourceBySlug(slug: string) {
  return siteResources.find((resource) => resource.slug === slug);
}

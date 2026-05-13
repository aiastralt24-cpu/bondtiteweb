export const baseUrl = "https://www.bondtite.in";

export const mainNavigation = [
  { label: "Products", href: "/products" },
  { label: "Applications", href: "/applications" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export const headerCta = { label: "Find your bond", href: "/#bond-finder" };

export type SiteApplication = {
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

export const siteApplications: SiteApplication[] = [
  {
    slug: "furniture-and-joinery",
    title: "Furniture and",
    accent: "joinery.",
    description:
      "Hydra+ led adhesive selection for cabinetry, modular kitchens, plywood lamination, veneer pressing and MDF assembly.",
    seoDescription:
      "Explore Bondtite Hydra+ adhesives for furniture, joinery, modular kitchens, plywood, MDF, veneer pressing and laminate work.",
    imageTone: "workshop",
    products: ["BONDTITE HYDRA+", "BONDTITE DELUXE", "BONDTITE EDGE D3"],
    steps: ["Choose the PVA grade by water exposure.", "Prepare clean timber surfaces.", "Clamp evenly until the joint sets."],
    faqs: [
      {
        question: "Which adhesive is best for plywood furniture?",
        answer: "A PVA adhesive is usually the best starting point. Use Hydra+ where humidity or wet-area exposure matters."
      },
      {
        question: "Can the same adhesive be used for MDF and veneer?",
        answer: "Yes, many PVA systems cover MDF and veneer pressing, but open time and clamp pressure should match the job."
      }
    ]
  },
  {
    slug: "construction-and-infrastructure",
    title: "Construction and",
    accent: "infrastructure.",
    description:
      "Multibond led bonding for site panels, trims, fabrication details and mixed substrate construction work.",
    seoDescription:
      "Find Bondtite Multibond adhesives for construction, infrastructure, site panels, trims and mixed substrate assembly.",
    imageTone: "macro",
    products: ["BONDTITE MULTIBOND", "BONDTITE MULTIFIX", "BONDTITE RAPID"],
    steps: ["Identify the substrate pair.", "Apply Multibond evenly to prepared surfaces.", "Press and support the assembly until tack develops."],
    faqs: [
      {
        question: "Which Bondtite product fits construction and infrastructure work?",
        answer: "Start with Bondtite Multibond for flexible bonding across panels, trims and mixed site substrates."
      },
      {
        question: "When should I choose Rapid or Multifix instead?",
        answer: "Use Rapid for two-part epoxy repair and Multifix when a cartridge format is better for fixing work."
      }
    ]
  },
  {
    slug: "diy-segment",
    title: "DIY",
    accent: "segment.",
    description:
      "Quikspray led bonding for quick home repairs, craft fixes, fixtures and everyday adhesive jobs.",
    seoDescription:
      "Browse Bondtite Quikspray and Quick adhesives for DIY repairs, craft work, fixtures and everyday bonding jobs.",
    imageTone: "products",
    products: ["BONDTITE QUIK SPRAY", "Bondtite Quick Instant Adhesive", "Bondtite Quick Spot-On"],
    steps: ["Clean the repair surface.", "Use Quikspray for fast coverage or Quick for precision fixes.", "Press the bond and allow the recommended set time."],
    faqs: [
      {
        question: "Which Bondtite product works best for DIY jobs?",
        answer: "Use Bondtite Quikspray for fast spray coverage and Bondtite Quick variants for small precision fixes."
      },
      {
        question: "Can DIY users apply these products easily?",
        answer: "Yes. Choose the format by job size: spray for larger surfaces and small tubes or bottles for controlled application."
      }
    ]
  },
  {
    slug: "auto-and-upholstery",
    title: "Auto and",
    accent: "upholstery.",
    description:
      "Foambond led bonding for foam, fabric, rubber trims, headliners, panels and service workshop repairs.",
    seoDescription:
      "Explore Bondtite Foambond adhesives for auto upholstery, foam, fabric, rubber trims, headliners and service workshop repairs.",
    imageTone: "workshop",
    products: ["BONDTITE FOAMBOND", "BONDTITE HEATBOND", "BONDTITE QUIK SPRAY"],
    steps: ["Dry fit the trim or upholstery surface.", "Apply contact adhesive to the correct face.", "Press evenly once tack develops."],
    faqs: [
      {
        question: "Which adhesive works for foam and upholstery?",
        answer: "Bondtite Foambond is the focused choice for foam, fabric and upholstery bonding."
      },
      {
        question: "Can clear adhesive be used on trims?",
        answer: "Yes, Strong & Clear is useful where a transparent bond line is important."
      }
    ]
  }
];

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

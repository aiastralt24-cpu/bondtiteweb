import type { HomepageData } from "@/lib/types";

export const fallbackHomepageData: HomepageData = {
  navigation: [
    { label: "Products", href: "/products" },
    { label: "Applications", href: "/applications" },
    { label: "Resources", href: "/resources" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ],
  headerCta: { label: "Find your bond", href: "#bond-finder" },
  hero: {
    titleBefore: "The bond that ",
    titleAccent: "holds",
    titleAfter: " India.",
    body:
      "Proudly Engineered in India for demanding trade work. Tested across humidity, heat, enclosed workshops and open sites. Built for furniture, fabrication and construction.",
    cta: { label: "Find your bond", href: "#bond-finder" },
    proof: [
      {
        title: "PVA to epoxy",
        detail: "Chemistry-led range for wood, metal, plastics and porous substrates."
      },
      {
        title: "5°C to 50°C",
        detail: "Performance language built around demanding real-world site conditions."
      },
      {
        title: "TDS ready",
        detail: "Technical data, ratings and application notes surfaced before purchase."
      }
    ]
  },
  products: [
    {
      id: "hydra-plus",
      name: "Bondtite Hydra+",
      chemistry: "PVA emulsion",
      label: "Hydra+",
      meta: "D3 · Water resistant",
      image: "/assets/products/bondtite-hydra-square.png",
      imageAlt: "Bondtite Hydra+ fast setting waterproof wood adhesive pack",
      imageTone: "square",
      reason:
        "A water-resistant PVA emulsion for plywood, MDF, block board and laminate work in kitchens, bathrooms and monsoon-prone workshops.",
      bestFor: ["Plywood", "MDF", "Laminates"]
    },
    {
      id: "epoxy-rapid",
      name: "Bondtite Rapid",
      chemistry: "Two-part epoxy",
      label: "Rapid",
      meta: "Metal · Stone · Repair",
      image: "/assets/products/bondtite-rapid-square.png",
      imageAlt: "Bondtite Rapid quick setting epoxy adhesive box",
      imageTone: "square",
      reason:
        "A two-part epoxy system for granite, stone, mixed substrates and site repairs where bond strength, toughness and heat resistance matter.",
      bestFor: ["Metal", "Stone", "Repairs"]
    },
    {
      id: "ca-fast",
      name: "Bondtite Strong & Clear",
      chemistry: "Fast epoxy adhesive",
      label: "Fast & Clear",
      meta: "5 min · Transparent",
      image: "/assets/products/bondtite-strong-clear-square.png",
      imageAlt: "Bondtite Strong & Clear two-part clear epoxy adhesive jars",
      imageTone: "square",
      reason:
        "A fast, clear adhesive for trim fixes, plastics, rubber and small workshop corrections where transparent bonding and speed matter.",
      bestFor: ["Plastic", "Rubber", "Trim"]
    },
    {
      id: "multifix",
      name: "Bondtite Multifix",
      chemistry: "Specialty adhesive",
      label: "Multifix",
      meta: "Site tested",
      image: "/assets/products/bondtite-multifix-square.jpg",
      imageAlt: "Bondtite Multifix nail saver construction adhesive cartridge",
      imageTone: "square",
      reason:
        "A workshop-ready specialty adhesive for general fabrication, upholstery and mixed material bonding when the substrate list is wide.",
      bestFor: ["Fabric", "Foam", "Mixed materials"]
    }
  ],
  bondFinder: {
    title: "What are you bonding?",
    intro:
      "Choose the substrate, working condition and cure speed. The panel updates with the product family that fits the job.",
    fallbackProductId: "multifix",
    groups: [
      {
        id: "material",
        label: "Material",
        options: [
          { id: "wood", label: "Wood / MDF" },
          { id: "metal", label: "Metal / stone" },
          { id: "plastic", label: "Plastic / rubber" },
          { id: "mixed", label: "Mixed materials" }
        ]
      },
      {
        id: "environment",
        label: "Environment",
        options: [
          { id: "indoor", label: "Indoor workshop" },
          { id: "wet", label: "Wet / monsoon" },
          { id: "heat", label: "Heat exposed" },
          { id: "site", label: "Open site" }
        ]
      },
      {
        id: "speed",
        label: "Speed",
        options: [
          { id: "open-time", label: "Open time" },
          { id: "same-day", label: "Same day" },
          { id: "instant", label: "Instant set" }
        ]
      }
    ],
    rules: [
      {
        material: "wood",
        environment: "wet",
        speed: "open-time",
        productId: "hydra-plus"
      },
      {
        material: "wood",
        environment: "indoor",
        speed: "same-day",
        productId: "hydra-plus"
      },
      {
        material: "metal",
        environment: "heat",
        speed: "same-day",
        productId: "epoxy-rapid"
      },
      {
        material: "metal",
        environment: "site",
        speed: "same-day",
        productId: "epoxy-rapid"
      },
      {
        material: "plastic",
        environment: "indoor",
        speed: "instant",
        productId: "ca-fast"
      },
      {
        material: "mixed",
        environment: "site",
        speed: "same-day",
        productId: "multifix"
      }
    ]
  },
  chemistries: [
    {
      name: "PVA",
      accent: "wood systems.",
      description:
        "Single-component emulsions for furniture, modular kitchens, plywood lamination and veneer pressing.",
      bullets: ["D3 water resistance", "Low odour", "Strong spreadability"],
      productId: "hydra-plus"
    },
    {
      name: "Epoxy",
      accent: "site repair.",
      description:
        "Two-part bonding for metal, stone, ceramic and mixed substrates that need gap filling and heat resistance.",
      bullets: ["Two-part cure", "Heat rated", "Metal and stone"],
      productId: "epoxy-rapid"
    },
    {
      name: "Cyanoacrylate",
      accent: "clear fix.",
      description:
        "Fast-setting clear bonding for trims, plastics, rubber and small workshop corrections.",
      bullets: ["5 minute cure", "Transparent bond", "Multiple substrates"],
      productId: "ca-fast"
    },
    {
      name: "Specialty",
      accent: "fabrication.",
      description:
        "Trade-grade adhesives for upholstery, foam, laminate edges and mixed-material jobs.",
      bullets: ["Wide substrate fit", "Site tested", "Workshop-ready"],
      productId: "multifix"
    }
  ],
  applications: [
    {
      titleBefore: "Furniture and ",
      titleAccent: "joinery.",
      body:
        "Hydra+ supports plywood lamination, modular kitchens, veneer pressing and MDF assembly where water-resistant wood bonds matter."
    },
    {
      titleBefore: "Construction and ",
      titleAccent: "infrastructure.",
      body:
        "Multibond handles site panels, trims, fabrication details and mixed substrate assembly with a flexible rubber bond."
    },
    {
      titleBefore: "DIY ",
      titleAccent: "segment.",
      body:
        "Quikspray gives fast spray application for small repairs, craft work, fixtures and everyday bonding jobs."
    },
    {
      titleBefore: "Auto and ",
      titleAccent: "upholstery.",
      body:
        "Foambond is made for foam, fabric, rubber trims, headliners, panels and service workshop repairs."
    }
  ],
  resources: [
    {
      code: "TDS",
      title: "Technical data before the sale.",
      body:
        "Each chemistry carries application notes, substrate fit, open time, cure behavior and safety guidance in plain trade language."
    },
    {
      code: "IS 7809",
      title: "Certified where the rating matters.",
      body:
        "Wood adhesive claims are tied to named standards and visible certificates, not generic quality promises."
    },
    {
      code: "FIELD",
      title: "Field-tested for demanding sites.",
      body:
        "Humidity, dry heat, open sites and enclosed workshops are treated as performance variables, not afterthoughts."
    },
    {
      code: "R&D",
      title: "Proudly Engineered in India.",
      body:
        "Product language connects lab discipline with real carpenters, contractors and fabricators using the adhesive daily."
    }
  ],
  stats: [
    { value: "30", suffix: "+", label: "Years" },
    { value: "9,500", suffix: "+", label: "Employees" },
    { value: "2.7 lakh", suffix: "+", label: "Dealers" },
    { value: "27", label: "Products" }
  ],
  faqs: [
    {
      question: "Which Bondtite adhesive should I use for plywood and MDF?",
      answer:
        "Use a PVA emulsion for most plywood, MDF and laminate work. Choose a water-resistant grade such as Hydra+ for kitchens, bathrooms and monsoon-prone workshops."
    },
    {
      question: "Are Bondtite PVA products safe indoors?",
      answer:
        "Yes. The PVA range is single-component and low odour for enclosed workshop and home environments. Solvent-based products should be used with the ventilation guidance printed on the pack."
    },
    {
      question: "What does D3 water resistance mean?",
      answer:
        "D3 describes a water-resistance class for wood adhesive performance. It is useful for interior joinery that may see frequent humidity or occasional water exposure."
    },
    {
      question: "Can one adhesive bond every material?",
      answer:
        "No. Wood, metal, plastic, rubber and fabric need different chemistries. The Bond Finder points to the closest product based on substrate, environment and speed."
    }
  ],
  footer: {
    columns: [
      {
        title: "Products",
        links: [
          { label: "PVA adhesives", href: "#products" },
          { label: "Epoxy adhesives", href: "#products" },
          { label: "Cyanoacrylates", href: "#products" },
          { label: "Specialty range", href: "#products" }
        ]
      },
      {
        title: "Applications",
        links: [
          { label: "Furniture", href: "#applications" },
          { label: "Construction", href: "#applications" },
          { label: "DIY segment", href: "#applications" },
          { label: "Upholstery", href: "#applications" }
        ]
      },
      {
        title: "Resources",
        links: [
          { label: "Technical data", href: "#resources" },
          { label: "Certifications", href: "#resources" },
          { label: "Bond Finder", href: "#bond-finder" }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "About Bondtite", href: "#legacy" },
          { label: "Trade desk", href: "#contact" },
          { label: "Contact", href: "#contact" }
        ]
      }
    ]
  }
};

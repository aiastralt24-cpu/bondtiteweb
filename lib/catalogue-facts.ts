import type { ProductSeed } from './products';

// Reviewed against Astral product pages and linked TDS on 29 September 2026.
// Source conflicts are tracked in docs/bondtite-product-data-audit-2026-09-29.md.
export const catalogueFacts: Record<string, Partial<ProductSeed>> = {
  "bondtite-deluxe": {
    "substrates": [
      "Wood",
      "Plywood",
      "Laminate",
      "Veneer",
      "Particleboard",
      "Blockboard",
      "Hardboard",
      "MDF"
    ],
    "chemistry": "PVA emulsion",
    "steps": [
      "Clean and dry the bonding surfaces.",
      "Use as supplied without dilution.",
      "Spread an even coat on the less porous surface first, then the more porous surface, for example laminate before plywood.",
      "Allow open time appropriate to temperature and humidity. Align and join while the adhesive is wet.",
      "Hold under even pressure until dry, then wipe away excess adhesive with a wet cloth."
    ],
    "applications": [
      "Furniture making",
      "Joinery",
      "Plywood-to-laminate bonding"
    ]
  },
  "bondtite-aqua": {
    "substrates": [
      "Wood",
      "Plywood",
      "Laminate",
      "Veneer",
      "Particleboard",
      "Blockboard",
      "Hardboard",
      "MDF"
    ],
    "chemistry": "PVA emulsion",
    "steps": [
      "Clean and dry the bonding surfaces.",
      "Use as supplied without dilution.",
      "Spread an even coat on the less porous surface first, then the more porous surface, for example laminate before plywood.",
      "Allow open time appropriate to temperature and humidity. Align and join while the adhesive is wet.",
      "Hold under even pressure until dry, then wipe away excess adhesive with a wet cloth."
    ],
    "applications": [
      "Furniture making",
      "Joinery",
      "Plywood-to-laminate bonding"
    ]
  },
  "bondtite-hydra": {
    "substrates": [
      "Wood",
      "Plywood",
      "Laminate",
      "Veneer",
      "Particleboard",
      "Blockboard",
      "Hardboard",
      "MDF"
    ],
    "chemistry": "PVA emulsion",
    "steps": [
      "Clean and dry the bonding surfaces.",
      "Use as supplied without dilution.",
      "Spread an even coat on the less porous surface first, then the more porous surface, for example laminate before plywood.",
      "Allow open time appropriate to temperature and humidity. Align and join while the adhesive is wet.",
      "Hold under even pressure until dry, then wipe away excess adhesive with a wet cloth."
    ]
  },
  "bondtite-edge-d3": {
    "substrates": [
      "Wood",
      "Plywood",
      "Laminate"
    ],
    "chemistry": "PVA emulsion",
    "steps": [
      "Clean, dry and level both surfaces; stir the adhesive without diluting it.",
      "Coat the less porous surface before the more porous surface.",
      "For plywood and laminate, join while wet and press progressively from one end using a wet cloth to expel trapped air.",
      "For wood-to-wood joints, align while wet and keep pressed for 24 hours for best results.",
      "Maintain pressure until dry and wipe excess adhesive with a wet cloth."
    ],
    "applications": [
      "Furniture making",
      "Joinery",
      "Plywood-to-laminate bonding"
    ]
  },
  "bondtite-heatbond": {
    "substrates": [
      "Plywood",
      "Laminate",
      "Leather"
    ],
    "chemistry": "Synthetic rubber",
    "steps": [
      "Clean and dry both surfaces, removing dust, oil, grease and rust.",
      "Stir the adhesive until uniform, then spread a thin, even coat on both surfaces.",
      "Let the solvent evaporate until tack develops, usually 5–10 minutes depending on temperature and humidity.",
      "Join with uniform pressure to remove air pockets. Optimum strength develops after 24 hours."
    ],
    "applications": [
      "Plywood-to-laminate bonding",
      "Vertical and curved lamination",
      "Leather articles",
      "Automotive interiors"
    ]
  },
  "bondtite-foambond": {
    "substrates": [
      "Foam",
      "Rexine",
      "Wood",
      "Metal",
      "Leather"
    ],
    "chemistry": "Synthetic rubber",
    "steps": [
      "Clean and dry both surfaces, removing dust, oil, grease and rust.",
      "Stir the adhesive until uniform, then spread a thin, even coat on both surfaces.",
      "Let the solvent evaporate until tack develops, usually 5–10 minutes depending on temperature and humidity.",
      "Join with uniform pressure to remove air pockets. Optimum strength develops after 24 hours."
    ],
    "applications": [
      "Mattresses",
      "Upholstery",
      "Foam bonding"
    ]
  },
  "bondtite-multibond": {
    "substrates": [
      "Carpet",
      "PVC",
      "Leather",
      "Foam",
      "Wood"
    ],
    "chemistry": "Synthetic rubber",
    "steps": [
      "Clean and dry both surfaces, removing dust, oil, grease and rust.",
      "Stir the adhesive until uniform, then spread a thin, even coat on both surfaces.",
      "Let the solvent evaporate until tack develops, usually 5–10 minutes depending on temperature and humidity.",
      "Join with uniform pressure to remove air pockets. Optimum strength develops after 24 hours."
    ],
    "applications": [
      "Carpet and PVC flooring",
      "AC ducting",
      "Footwear",
      "Upholstery"
    ]
  },
  "bondtite-quik-spray": {
    "substrates": [
      "Laminate",
      "Plywood",
      "Foam",
      "Metal",
      "Wood"
    ],
    "chemistry": "Synthetic rubber",
    "applications": [
      "Laminate-to-plywood bonding",
      "Wardrobe interiors",
      "Foam bonding"
    ]
  },
  "bondtite-acrylic-fix": {
    "substrates": [
      "Acrylic",
      "Plywood",
      "MDF",
      "HDHMR",
      "WPC"
    ],
    "chemistry": "Hybrid adhesive",
    "packTypes": "500 g sausage",
    "steps": [
      "Clean the surfaces; sand MDF or HDHMR with 80–120 grade emery paper.",
      "Spread evenly on the base board and allow 8–10 minutes of open time.",
      "Wipe the acrylic backing with a moist cloth without leaving droplets. Omit this step in humid monsoon conditions.",
      "Align and press evenly with a roller or press. Maintain pressure for 2–4 hours.",
      "Allow 24 hours for full bond strength before cutting; wipe excess adhesive while wet."
    ],
    "limitations": [
      "Vertical application is not recommended."
    ],
    "applications": [
      "Acrylic panel lamination"
    ]
  },
  "bondtite-wpc-fix": {
    "substrates": [
      "WPC",
      "PVC",
      "Laminate",
      "Veneer",
      "Metal",
      "Glass",
      "Acrylic",
      "Wood"
    ],
    "chemistry": "Speciality adhesive",
    "packTypes": "600 ml",
    "steps": [
      "Clean the surfaces and roughen WPC in a criss-cross pattern or with 80–120 grade emery paper.",
      "Spread the adhesive evenly over the prepared base surface. Allow 8–10 minutes of open time depending on conditions.",
      "Wipe the facing material with a moist cloth without leaving droplets. Omit this in humid monsoon conditions.",
      "Align and press evenly; maintain pressure until handling strength develops.",
      "Allow 24 hours for full strength before cutting, and remove excess adhesive while wet."
    ],
    "limitations": [
      "Vertical application is not recommended."
    ],
    "applications": [
      "WPC board lamination",
      "PVC board lamination"
    ]
  },
  "bondtite-multifix": {
    "substrates": [
      "Plywood",
      "Laminate",
      "Drywall",
      "Cement board",
      "Tile",
      "Glass",
      "Mirror",
      "Ceramic",
      "Porcelain",
      "Concrete",
      "Marble",
      "Granite",
      "Brick",
      "Aluminium",
      "ACP",
      "Steel",
      "Alabaster"
    ],
    "chemistry": "Construction adhesive",
    "steps": [
      "Clean and dry the surfaces, removing loose particles, dust and oil.",
      "Fit the cartridge into a gun and attach the cut V-notch nozzle.",
      "Apply zigzag beads about 11–12 cm apart, leaving 30–35 mm at the edges.",
      "Position promptly and press firmly for 5–10 minutes. Alignment can be adjusted within 4–6 minutes depending on temperature.",
      "Allow an overnight cure before placing heavy shelves on bonded brackets.",
      "Seal the nozzle after use; remove the cured tip before the next application."
    ]
  },
  "bondtite-fast-and-clear": {
    "substrates": [
      "Glass",
      "Marble",
      "Granite",
      "Metal"
    ],
    "chemistry": "Epoxy",
    "packTypes": "3 gm, 6 gm, 13 gm, 36 gm, 90 gm, 180 gm, 270 gm, 450 gm, 1 kg, 2 kg",
    "limitations": [
      "Not for polyethylene or polypropylene.",
      "Not for continuously wet areas or water immersion."
    ],
    "applications": [
      "Glass-to-glass bonding",
      "Marble mouldings",
      "Granite bonding",
      "Metal repairs"
    ]
  },
  "bondtite-strong-and-clear": {
    "substrates": [
      "Glass",
      "Marble",
      "Granite",
      "Metal"
    ],
    "chemistry": "Epoxy",
    "limitations": [
      "Not for polyethylene or polypropylene.",
      "Not for continuously wet areas or water immersion."
    ],
    "applications": [
      "Glass-to-glass bonding",
      "Marble mouldings",
      "Granite bonding",
      "Metal repairs"
    ]
  },
  "bondtite-super-strength": {
    "substrates": [
      "Wood",
      "Marble",
      "Granite",
      "Glass",
      "Metal"
    ],
    "chemistry": "Epoxy",
    "packTypes": "3 gm, 7 gm, 9 gm, 13 gm, 36 gm, 90 gm, 180 gm, 270 gm, 450 gm, 900 gm, 1.8 kg",
    "limitations": [
      "Not for polyethylene or polypropylene.",
      "Not for continuously wet areas or water immersion."
    ],
    "applications": [
      "Metal-to-metal fabrication",
      "Wood joints",
      "Marble and granite bonding"
    ]
  },
  "bondtite-pro": {
    "substrates": [
      "Marble",
      "Granite",
      "Wood",
      "Glass"
    ],
    "chemistry": "Epoxy",
    "applications": [
      "Marble and granite fixing",
      "Window frames",
      "Wash basins",
      "Handicrafts"
    ]
  },
  "bondtite-quick": {
    "substrates": [
      "Rigid plastics",
      "Metal",
      "Marble",
      "Rubber",
      "Polycarbonate",
      "Bakelite",
      "Ceramic"
    ],
    "chemistry": "Cyanoacrylate",
    "applications": [
      "Household repairs",
      "Electronics assembly",
      "Precision repairs"
    ]
  },
  "bondtite-uniweld": {
    "substrates": [
      "Metal",
      "ABS",
      "PVC",
      "PU",
      "Polycarbonate",
      "FRP",
      "Ferrite",
      "Ceramic",
      "Wood",
      "Leather",
      "Rubber",
      "Marble",
      "Glass"
    ],
    "chemistry": "Acrylic",
    "categorySlug": "acrylic-adhesives",
    "summary": "A two-component acrylic adhesive for fast initial grab and vibration-resistant bonding of rigid plastics, metals and other compatible materials.",
    "steps": [
      "Clean, dry and roughen the surfaces. Wash glass or ceramic, rinse and dry, then check the fit.",
      "Apply equal quantities of part A and part B to opposing surfaces.",
      "Bring the surfaces together and rub to distribute the adhesive. Clamp for 20 minutes.",
      "Allow two hours for full strength as stated on the product page."
    ],
    "limitations": [
      "Apply to dry surfaces; not for underwater use."
    ]
  },
  "bondtite-total": {
    "substrates": [
      "Metal",
      "Ceramic",
      "Marble",
      "Granite",
      "Concrete",
      "Rigid plastics",
      "Bakelite",
      "Wood",
      "Leather",
      "Fabric",
      "Rubber"
    ],
    "chemistry": "Epoxy",
    "limitations": [
      "Not for polyethylene or polypropylene.",
      "Not for continuously wet areas or water immersion."
    ]
  },
  "clearbond": {
    "chemistry": "Synthetic rubber"
  },
  "bondtite-rapid": {
    "chemistry": "Epoxy",
    "settingTime": "10 minutes",
    "steps": [
      "Clean, dry and roughen the surfaces; wash glass or ceramic, rinse and dry, then check the fit.",
      "Measure equal volumes of resin and hardener, or 100:75 by weight. Mix thoroughly for one minute.",
      "Apply to one or both surfaces and assemble. Clamp for 30 minutes.",
      "Allow 24 hours for full cure."
    ]
  },
  "bondtite-metallic": {
    "chemistry": "Epoxy",
    "limitations": [
      "Not for polyethylene or polypropylene.",
      "Not for continuously wet areas or water immersion."
    ]
  },
  "bondtite-white-paste": {
    "chemistry": "Epoxy",
    "limitations": [
      "Not for polyethylene or polypropylene.",
      "Not for applications exceeding 150°C."
    ]
  },
  "bondtite-wood": {
    "chemistry": "Epoxy",
    "packTypes": "90 g, 320 g, 2 kg set"
  },
  "bondtite-viscoclear": {
    "chemistry": "Epoxy",
    "substrates": []
  },
  "bondtite-rhiomet": {
    "chemistry": "Epoxy"
  },
  "bondtite-zoro": {
    "chemistry": "Epoxy"
  },
  "bondtite-ast-fr1203-ast-fh7203": {
    "chemistry": "Epoxy"
  },
  "bondtite-ast-fr1201-ast-fh7201": {
    "chemistry": "Epoxy"
  },
  "bondtite-ast-fr1202-ast-fh7601": {
    "chemistry": "Epoxy"
  },
  "bondtite-ast-fr4202-ast-fh4102": {
    "chemistry": "Epoxy"
  },
  "bondtite-mma-999a-mma-999b": {
    "chemistry": "Methyl methacrylate (MMA)"
  },
  "bondtite-pvc-bond": {
    "chemistry": "PVC bonding adhesive"
  },
  "bondtite-quick-spot-on": {
    "sourceUrl": "https://www.astraladhesives.com/bondtite-quick-spot-on.html",
    "packTypes": "10 g",
    "summary": "A quick-setting instant adhesive with an extended precision nozzle for small repairs and difficult-to-reach areas.",
    "substrates": [
      "Metal",
      "Rigid plastics",
      "Wood",
      "Rubber",
      "Marble",
      "Leather",
      "Ceramic"
    ],
    "chemistry": "Cyanoacrylate",
    "features": [
      "Bonds in seconds",
      "Precise application"
    ],
    "applications": [
      "Household repairs",
      "Detailed assembly"
    ],
    "shelfLife": "12 months from manufacture.",
    "steps": [
      "Clean and dry both surfaces.",
      "Apply the required amount to one surface using the precision nozzle.",
      "Press the parts together until bonded.",
      "Wipe the nozzle with a dry cloth and replace the cap."
    ]
  },
  "bondtite-quick-gel-adhesive": {
    "sourceUrl": "https://www.astraladhesives.com/bondtite-quick-gel.html",
    "packTypes": "3 g",
    "summary": "A thick, non-drip cyanoacrylate adhesive for controlled application, including vertical surfaces and detailed repairs.",
    "substrates": [
      "Wood",
      "Metal",
      "Ceramic",
      "Rubber",
      "Leather",
      "Cardboard",
      "Paper",
      "PVC",
      "Acrylic"
    ],
    "chemistry": "Cyanoacrylate",
    "features": [
      "Fast curing",
      "Non drip formula"
    ],
    "applications": [
      "Household repairs",
      "Detailed assembly"
    ],
    "shelfLife": "12 months from manufacture.",
    "steps": [
      "Tighten the cap and nozzle onto the tube to puncture the seal.",
      "Apply the required amount of adhesive to one surface.",
      "Press the surfaces together until bonded.",
      "Wipe the nozzle with a dry cloth and replace the cap."
    ],
    "limitations": [
      "Not suitable for polyethylene, polypropylene, EPDM rubber, silicone rubber or PTFE."
    ]
  },
  "bondtite-quick-art-and-craft-glue": {
    "sourceUrl": "https://www.astraladhesives.com/bondtite-quick-art-craft.html",
    "packTypes": "10 g",
    "summary": "A clear, non-drip craft adhesive with a thick formula and a short repositioning window for detailed work.",
    "substrates": [],
    "chemistry": "Cyanoacrylate",
    "features": [
      "Clear non-drip formula",
      "Extended setting time"
    ],
    "applications": [
      "Detailed craft work",
      "Porous and non-porous craft surfaces"
    ],
    "shelfLife": "12 months from manufacture; use within 45 days of opening.",
    "steps": [
      "Clean and dry both surfaces.",
      "Join and press the surfaces together for a few seconds.",
      "Adjust alignment within 20 seconds if repositioning is needed."
    ],
    "faqs": [
      {
        "question": "What is Quick Art & Craft used for?",
        "answer": "Detailed craft work on compatible porous and non-porous craft surfaces."
      },
      {
        "question": "Can the joint be repositioned?",
        "answer": "Astral specifies a repositioning window of about 20 seconds."
      }
    ]
  },
  "bondtite-quick-ultra-glue-brush-and-nozzle": {
    "sourceUrl": "https://www.astraladhesives.com/bondtite-quick-ultra-glue.html",
    "packTypes": "15 g",
    "summary": "A fast-drying clear adhesive with a brush for broad coverage and a nozzle for precise application.",
    "substrates": [
      "Metal",
      "Wood",
      "Leather",
      "Rigid plastics",
      "Ceramic",
      "Rubber"
    ],
    "chemistry": "Cyanoacrylate",
    "features": [
      "10x unbreakable bond",
      "Tough & impact resistant"
    ],
    "applications": [
      "Household repairs",
      "Detailed assembly"
    ],
    "shelfLife": "12 months from manufacture; use within 45 days of opening.",
    "steps": [
      "Clean and dry both surfaces.",
      "Unscrew the full cap to use the brush, or the upper cap to use the nozzle.",
      "Remove excess adhesive from the brush on the bottle rim before applying.",
      "Press together for 30 seconds. Leave undisturbed for 10 minutes and allow 24 hours for full cure."
    ]
  },
  "bondtite-quick-instant-adhesive": {
    "sourceUrl": "https://www.astraladhesives.com/bondtite-quick-instant.html",
    "packTypes": "3 g",
    "summary": "An instant repair adhesive with a precision anti-clog tip for controlled, one-drop application.",
    "substrates": [
      "Metal",
      "Wood",
      "Ceramic",
      "Rigid plastics",
      "Rubber",
      "Leather"
    ],
    "chemistry": "Cyanoacrylate",
    "features": [
      "One drop at a time",
      "Smart nozzle prevents drying"
    ],
    "applications": [
      "Household repairs",
      "Detailed assembly"
    ],
    "shelfLife": "12 months from manufacture; use within 45 days of opening.",
    "steps": [
      "Tighten the cap and nozzle onto the tube to puncture the seal.",
      "Apply the required amount of adhesive to one surface.",
      "Press the surfaces together until bonded.",
      "Wipe the nozzle with a dry cloth and replace the cap."
    ]
  }
};

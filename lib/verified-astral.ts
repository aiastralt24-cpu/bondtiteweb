export type VerifiedAstralDetail = {
  summary: string;
  packTypes?: string;
  steps?: string[];
  features?: string[];
  shelfLife?: string;
  storage?: string;
};

export const verifiedAstralDetails: Record<string, VerifiedAstralDetail> = {
  "bondtite-pro": {
    summary: "BONDTITE PRO is a new-generation, high-performance, room temperature curing, two-component epoxy adhesive system.",
    packTypes: "90 gm 180 gm 450 gm 1.8 kg",
    steps: ["Surfaces must be clean, dry, and free from oil, wax and paint.", "Roughen smooth surfaces for better adhesion by sandblasting or sanding with emery cloth.", "Squeeze equal volume of material from both part-A & part-B, mix for one minute, clamp for 4 hrs and leave for 24 hours."],
    features: ["High impact resistance and bond strength", "Holding strength in 4 hours", "High coverage", "UV and weather-resistant", "Longer application time"],
    shelfLife: "Shelf Life: 2 years from the date of manufacturing.",
    storage: "Store dry in original, properly closed containers at 2-40°C."
  },
  "bondtite-acrylic-fix": {
    summary: "BONDTITE ACRYLIC FIX is an innovative adhesive, formulated with advanced hybrid technology. It is the best glue for bonding acrylic sheets over plywood and other wooden substrates where regular white adhesives do not work effectively.",
    steps: ["Ensure both surfaces are clean and free from oil, grease and dust.", "Apply evenly on plywood and give open time of 8-10 minutes.", "Bring both surfaces together, apply even pressure and keep under pressure until handling strength develops."],
    features: ["Excellent compatibility with acrylic sheets", "Low VOC", "Waterproof", "Excellent heat resistance"],
    shelfLife: "Shelf Life: Up to 1 Years",
    storage: "Store dry in original, properly closed containers at 2-40°C."
  },
  "bondtite-aqua": {
    summary: "BONDTITE AQUA is a single-component, white PVA emulsion adhesive with superior waterproof properties. It is a specially designed woodworking adhesive used in furniture to avoid debonding arising due to changes in weather conditions.",
    packTypes: "5 kg 20 kg 50 kg 60 kg",
    steps: ["Clean both surfaces to be bonded.", "Use ready-to-use product without dilution.", "Apply an even coat, give suitable open time, press surfaces together and wipe excess adhesive with a wet cloth."],
    features: ["Waterproof up to 7 days and withstands boiling water up to 7 hours", "Low odour", "Single component", "Improved spreadability"],
    shelfLife: "Shelf Life: Up to 1.5 Years",
    storage: "Store dry in original, properly closed containers at 2-40°C."
  },
  "bondtite-deluxe": {
    summary: "BONDTITE DELUXE is a single-component, water-resistant PVA emulsion adhesive used for woodworking applications. It is specially designed for bonding wood to wood, ply to decorative laminates, veneer, MDF, particle board and block board.",
    packTypes: "1 kg 5 kg 10 kg 20 kg 50 kg 60 kg",
    steps: ["Clean both surfaces to be bonded.", "Use ready-to-use product without dilution.", "Apply an even coat first on comparatively non-porous surfaces and then on porous surfaces."],
    features: ["Excellent coverage", "Water-resistant", "Low odour", "Single component", "Shows better ease of application"],
    shelfLife: "Shelf Life: Up to 1.5 Years",
    storage: "Store dry in original, properly closed containers at 2-40°C."
  },
  "bondtite-edge-d3": {
    summary: "BONDTITE EDGE D3 is a premium woodworking adhesive specially designed with cross-linked polymer technology for excellent moisture and water resistance. It conforms to EN 204-D3 standards.",
    packTypes: "20 kg 50 kg",
    steps: ["Ensure surfaces are dust-free, oil-free, dry and levelled.", "Stir contents before use and do not dilute.", "Apply evenly, press surfaces together and keep under pressure until adhesive dries completely."],
    features: ["Fast-setting", "Low odour", "Confirms EN204 to category D3", "Easy for application - roller and spreader"],
    shelfLife: "Shelf Life: Up to 1 Years",
    storage: "Store dry in original, properly closed containers at 2-40°C."
  },
  "bondtite-fast-and-clear": {
    summary: "BONDITE FAST AND CLEAR is a 5-minute high-strength, two-component transparent epoxy adhesive system.",
    packTypes: "3 gm 6 gm 13 gm 36 gm 90 gm 180 gm 270 gm 450 gm 1 kg",
    steps: ["Surfaces must be clean, dry and free from oil, wax and paint.", "Roughen smooth surfaces and pre-fit parts to be joined.", "Squeeze equal volumes from part-A and part-B, mix for one minute, apply and clamp for 20 minutes."],
    features: ["5-minute transparent epoxy system", "High strength", "Two-component adhesive", "Full strength achieved in 4 hour"],
    shelfLife: "Shelf Life: 12 months in unopened packaging at +5°C to +25°C.",
    storage: "Store dry in original, properly closed containers at 2-40°C."
  },
  "bondtite-foambond": {
    summary: "BONDTITE FOAMBOND SR is a synthetic rubber-based contact adhesive specially designed for excellent bonding of sofa, revolving chair foam, rexine, mattresses and upholstery.",
    packTypes: "100 ml 200 ml 500 ml 25 L",
    steps: ["Ensure substrates are clean, dry and free from oil, grease, dust and rust.", "Stir adhesive well before use.", "Apply a thin uniform layer on both substrates, allow solvent evaporation for tack and assemble under uniform pressure."],
    features: ["Excellent spreadability", "Soft on foam", "Light-coloured", "Quick bonding and drying", "Benzene-free"],
    shelfLife: "Shelf Life: Up to 1.5 Years",
    storage: "Store dry in original, properly closed containers at 2-40°C."
  },
  "bondtite-heatbond": {
    summary: "BONDTITE HEATBOND is a solvent-borne synthetic rubber-based adhesive formulated for excellent heat resistance up to 180°C. It has quick grab and strong bonding efficiency for vertical laminates.",
    packTypes: "100 ml 200 ml 500 ml",
    steps: ["Ensure substrates are clean, dry and free from oil, grease, dust and rust.", "Stir adhesive well before use.", "Apply a thin uniform layer, allow tack development and assemble with uniform contact pressure."],
    features: ["Fast-setting", "High strength", "Excellent heat resistance", "Superior spreadability"],
    shelfLife: "Shelf Life: Up to 1.5 Years",
    storage: "Store dry in original, properly closed containers at 2-40°C."
  },
  "bondtite-hydra": {
    summary: "BONDTITE HYDRA+ is a single-component premium white PVA emulsion adhesive with fast-setting and superior waterproof properties. It uses anti-bubble, cross-linked technology to avoid debonding due to weather changes.",
    packTypes: "1 kg 2 kg 5 kg 10 kg 20 kg 50 kg 60 kg",
    steps: ["Clean both surfaces to be bonded.", "Use ready-to-use product without dilution.", "Apply an even coat, give suitable open time, press surfaces together and wipe excess adhesive with a wet cloth."],
    features: ["Anti-bubble crosslinked technology", "Fast-setting", "Confirms EN204 to category D3", "Superior spread ability"],
    shelfLife: "Shelf Life: Up to 1.5 Years",
    storage: "Store dry in original, properly closed containers at 2-40°C."
  },
  "bondtite-multibond": {
    summary: "BONDTITE MULTIBOND SR is a synthetic rubber-based contact adhesive suitable for general purpose bonding with rubber, leather, EVA, rexin, footwear, canvas, galvanised metal sheets, PVC flooring and upholstery foam.",
    packTypes: "200 ml 500 ml 25 L",
    steps: ["Ensure substrates are clean, dry and free from oil, grease, dust and rust.", "Stir adhesive well before use.", "Apply a thin uniform layer, allow tack development and assemble under uniform pressure."],
    features: ["Multi-purpose", "Benzene-free", "Quick bonding and drying", "Higher tack retention"],
    shelfLife: "Shelf Life: Up to 1.5 Years",
    storage: "Store dry in original, properly closed containers at 2-40°C."
  },
  "bondtite-multifix": {
    summary: "BONDTITE MULTIFIX NAIL SAVER is an instant and high-grab adhesive that has excellent bond strength on multiple substrates.",
    packTypes: "435 gm",
    steps: ["Clean the surface so it is dry and free from dust, dirt, oil and loose particles.", "Insert cartridge in cartridge gun, cut nozzle opening and fix V-cut nozzle.", "Apply in a zig-zag threading pattern, press firmly for 5-10 minutes and allow heavier loads to cure overnight."],
    features: ["Good weather and water resistance", "Paintable after curing", "Excellent strength", "UV-resistant"],
    shelfLife: "Shelf Life: Up to 1 Years",
    storage: "Store dry in original, properly closed containers at 2-40°C."
  },
  "bondtite-quick": {
    summary: "BONDTITE QUICK is an instant adhesive used for various general purpose applications. It is supplied in a user-friendly plastic ampoule.",
    packTypes: "500 mg",
    steps: ["Make sure surfaces are clean and dry.", "Twist the cap to open the ampoule.", "Dispense drops to one surface, press parts together and hold firmly for a few seconds."],
    features: ["Low viscosity", "Bonds multiple substrates", "Instant bonding"],
    shelfLife: "Shelf Life: 10 months from date of manufacturing when stored in unopened pouch. Use within 30 days once opened.",
    storage: "Store unopened in a cool, dry location at 20-25°C and humidity not more than 50%. Do not freeze."
  },
  "bondtite-quik-spray": {
    summary: "BONDTITE QUIK SPRAY is a sprayable rubber-based adhesive that gives superior bonding over a variety of surfaces where immediate bond strength with optimum heat resistance is required.",
    packTypes: "200 ml 500 ml",
    steps: ["Shake container well and ensure surfaces are clean.", "Hold the can 8-10 cm away at a 90 degree angle.", "Spray evenly, leave surfaces for 1-2 minutes or until dry to touch, then apply even pressure."],
    features: ["Bonds foam, metal, wood and other surfaces", "Fast bonding", "No odour", "High temperature resistant up to 120°C", "Easy-to-use"],
    shelfLife: "Shelf Life: Up to 1 Years",
    storage: "Store dry in original, properly closed containers at 2-40°C."
  },
  "bondtite-rapid": {
    summary: "BONDTITE RAPID is a two-component epoxy adhesive system which sets in 10 minutes.",
    packTypes: "3 gm",
    steps: ["Surfaces must be clean, dry and free from oil, wax and paint.", "Roughen smooth surfaces for better adhesion.", "Mix part-A and part-B for one minute, apply, clamp for 30 minutes and allow full cure in 24 hours."],
    features: ["Fast-setting within 10 minutes", "Bio-compatible adhesive", "Resistant to water and most common solvents", "Suitable for machinery and automobiles"],
    shelfLife: "Shelf Life: 2 years from the date of manufacturing.",
    storage: "Store dry in original, properly closed containers at 2-40°C."
  },
  "bondtite-strong-and-clear": {
    summary: "BONDITE STRONG AND CLEAR is a 30-minute high-strength, two-component transparent epoxy adhesive system.",
    packTypes: "450 gm 1 kg 1.8 kg",
    steps: ["Surfaces must be clean, dry and free from oil, wax and paint.", "Wash glass and ceramic surfaces with soap and water, rinse and let dry.", "Squeeze equal volume from part-A and part-B, mix for one minute, apply and clamp for 24 hours."],
    features: ["30-minute setting time", "15 minutes pot life", "Odourless", "Colourless and transparent bond line", "Suitable for glass, marble, granite, metal and automobile repair applications"],
    shelfLife: "Shelf Life: 2 years from the date of manufacturing.",
    storage: "Store dry in original, properly closed containers at 2-40°C."
  },
  "bondtite-super-strength": {
    summary: "BONDTITE SUPER STRENGTH is a high-strength, two component epoxy adhesive system which sets in 8 hours.",
    packTypes: "3 gm 7 gm 9 gm 13 gm 36 gm 90 gm 180 gm 270 gm 450 gm",
    steps: ["Surfaces must be clean, dry and free from oil, wax and paint.", "Roughen smooth surfaces and pre-fit parts to be joined.", "Squeeze equal volume from part-A and part-B, mix for one minute, apply and clamp for 24 hours."],
    features: ["Bio-compatible adhesive", "Multi-substrate adhesion", "Longer working time", "High-bond strength"],
    shelfLife: "Shelf Life: 2 years from the date of manufacturing.",
    storage: "Store dry in original, properly closed containers at 2-40°C."
  },
  "bondtite-wpc-fix": {
    summary: "BONDTITE WPC FIX is an innovative adhesive formulated with advanced technology.",
    steps: ["Ensure both surfaces are clean and free from oil, grease and dust.", "Put scratches on the WPC surface in a checkered pattern.", "Apply evenly, give open time of 8-10 minutes, press surfaces together and keep under pressure until handling strength develops."],
    features: ["Excellent compatibility with WPC board", "Low VOC", "Waterproof", "Excellent heat resistance"],
    shelfLife: "Shelf Life: Up to 1 Years",
    storage: "Store dry in original, properly closed containers at 2-40°C."
  }
};

// Selection notes transcribed from the local PDFs in private/documents.
// Product Selector (1).xlsx supplies pair compatibility and priority; these notes do not
// extend that matrix or imply that every listed product suits every environment.
export type SelectorGuidance = { chooseFor: string; notes: string[]; revision: string; page: number };
export const selectorGuidance: Record<string, SelectorGuidance> = {
  'bondtite-white-paste': {
    chooseFor: 'Bonding dissimilar materials where a white finish is needed, including construction, marble and inlay work.',
    notes: ['Two-part filled epoxy: mix equal volumes thoroughly for one minute. Pot life is 60–80 minutes at 25°C; clamp for 4–6 hours and allow 24 hours for full cure.', 'Use clean, dry surfaces. Not for PE/PP plastics or short-term heat exposure above 150°C.'],
    revision: 'TDS v02 · 01.05.2024', page: 1,
  },
  'bondtite-aqua': {
    chooseFor: 'Moisture-exposed furniture, including kitchen and bathroom woodworking; suitable for hot and cold pressing.',
    notes: ['Ready-to-use PVA; do not dilute. At least one bonding surface should be porous.', 'Spread evenly within 5–10 minutes and keep the joint under pressure until dry.'],
    revision: 'TDS v02 · 01.04.2024', page: 1,
  },
  'bondtite-hydra': {
    chooseFor: 'Moisture-exposed furniture and wood-based boards, including kitchen and bathroom work; suitable for hot and cold pressing.',
    notes: ['Ready-to-use PVA; do not dilute. At least one bonding surface should be porous.', 'Spread evenly within 5–10 minutes and keep the joint under pressure until dry. Aqua has similar application guidance in its TDS.'],
    revision: 'TDS v02 · 01.04.2024', page: 1,
  },
  'bondtite-wood': {
    chooseFor: 'Wood-coloured repairs, filling screw holes and restoring worn wood where sanding or drilling is needed.',
    notes: ['Two-part epoxy: mix equal volumes. Pot life is 40–50 minutes at 25°C.', 'Use clean, dry surfaces; roughen smooth surfaces. The TDS describes waterproof joints.'],
    revision: 'TDS v02 · 01.04.2024', page: 1,
  },
  'bondtite-wpc-fix': {
    chooseFor: 'Horizontal WPC/PVC board bonding where high initial grab, heat resistance and water resistance are needed.',
    notes: ['Vertical application is not recommended.', 'Roughen WPC. Keep the assembly under pressure for 2–3 hours; allow 24 hours for full bond strength before cutting. Follow the TDS moisture-preparation instructions.'],
    revision: 'TDS v02 · 01.04.2024', page: 1,
  },
  'bondtite-acrylic-fix': {
    chooseFor: 'Horizontal acrylic-sheet bonding to plywood, MDF, HDHMR or WPC, with a low-odour adhesive.',
    notes: ['Vertical application is not recommended.', 'Keep the assembly under pressure for 2–4 hours; allow 24 hours for full bond strength before cutting. Follow the TDS surface and moisture preparation.'],
    revision: 'TDS v02 · 01.04.2024', page: 1,
  },
  'bondtite-multifix': {
    chooseFor: 'Interior or exterior construction fixing and louvers where an instant-grab, elastic adhesive-sealant is useful.',
    notes: ['Solvent-free and paintable after curing. Apply to clean, dry surfaces.', 'Hold firmly for 5–10 minutes depending on size and weight. Allow overnight curing before loading the heavy shelf assemblies described in the TDS.'],
    revision: 'TDS v02 · 01.04.2024', page: 1,
  },
  'bondtite-fast-and-clear': {
    chooseFor: 'Small parts and quick repairs where a transparent bond line and short working time are useful.',
    notes: ['Pot life: 3–6 minutes at 25°C. Support for 10 minutes at room temperature; usable strength in 1 hour and full cure in 24 hours.', 'Not for continuously wet areas or immersion, PE/PP plastics, or short-term heat exposure above 150°C.'],
    revision: 'TDS v03 · 01.05.2024', page: 1,
  },
  'bondtite-strong-and-clear': {
    chooseFor: 'Clear bonds on medium or large parts when more alignment time is needed than Fast & Clear allows.',
    notes: ['Pot life: 15 minutes; setting time: 30–35 minutes at 25°C. Support for 1 hour at room temperature; full cure in 24 hours.', 'Not for continuously wet areas, immersion or PE/PP plastics.'],
    revision: 'TDS v02 · 01.07.2024', page: 1,
  },
  'bondtite-super-strength': {
    chooseFor: 'High-strength assembly where a longer working time is needed.',
    notes: ['Pot life: 75–95 minutes at 25°C. Mix 1:1 by volume or 100:80 by weight; full cure in 24 hours.', 'Not for continuously wet areas or immersion, PE/PP plastics, or short-term heat exposure above 150°C.'],
    revision: 'TDS v03 · 01.05.2024', page: 1,
  },
  'bondtite-uniweld': {
    chooseFor: 'Rapid structural assembly where impact strength is important.',
    notes: ['Two-part acrylic: apply part A and part B to opposing surfaces. Sets in 3–5 minutes and reaches full strength in 2 hours.', 'Do not apply underwater or to damp surfaces.'],
    revision: 'TDS v03 · 01.05.2024', page: 1,
  },
  'bondtite-foambond': {
    chooseFor: 'Soft foam bonds in cushions, mattresses and upholstery.',
    notes: ['Foambond-SR TDS: coat both surfaces, allow solvent to evaporate until tacky, then join with even pressure. Optimum strength after 24 hours.', 'Solvent-based and flammable: keep away from heat, sparks and flame during use.'],
    revision: 'Foambond-SR TDS v02 · 01.04.2024', page: 1,
  },
  'bondtite-multibond': {
    chooseFor: 'General contact bonding in upholstery, PVC flooring and automotive interiors where high tack is useful.',
    notes: ['Multibond SR TDS: apply a thin coat to both surfaces, allow solvent to evaporate until tacky, then join under uniform pressure.', 'Optimum bond strength after 24 hours.'],
    revision: 'Multibond SR TDS v02 · 01.04.2024', page: 1,
  },
  'bondtite-heatbond': {
    chooseFor: 'Vertical lamination and contact bonds where heat resistance is important; the TDS specifies resistance up to 180°C.',
    notes: ['Coat both clean, dry surfaces, allow solvent to evaporate until tacky, then join under uniform pressure. Optimum strength after 24 hours.', 'Solvent-based and flammable: keep away from heat, sparks and flame during use.'],
    revision: 'Heatbond SR TDS v02 · 01.04.2024', page: 1,
  },
  'bondtite-quik-spray': {
    chooseFor: 'Spray application in hard-to-reach areas where immediate bond strength is useful.',
    notes: ['Shake the can and spray evenly from 10–12 cm away. Join when dry to touch and apply uniform pressure.', 'Solvent-based and flammable: keep away from heat, sparks and flame during use.'],
    revision: 'TDS v02 · 01.04.2024', page: 1,
  },
};

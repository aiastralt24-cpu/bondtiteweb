// Purchase packs checked against the supplied Amazon listings on 2 November 2026.
// Application instructions and chemistry are sourced from lib/catalogue-facts.ts (Astral).
export type InstantStory = {
  title: string; purpose: string; applicator: string; consistency: string;
  benefits: { title: string; body: string }[];
  uses: { title: string; body: string }[];
  amazon?: { asin: string; pack: string };
  media?: { key: string; detailAlt: string };
};
export const instantStories: Record<string, InstantStory> = {
  'bondtite-quick-instant-adhesive': {
    title: 'Quick Instant', purpose: 'Small repairs. One drop at a time.', applicator: 'Precision nozzle', consistency: 'Liquid',
    amazon: { asin: 'B0FL7BF3F2', pack: '3 g × 2 tubes' }, media: { key: 'instant', detailAlt: 'A controlled drop at the tip of the Quick Instant nozzle' },
    benefits: [{title:'Controlled drops',body:'A precision tip helps place a small amount exactly where the repair needs it.'},{title:'Quick assembly',body:'Designed for small, close-fitting repairs on compatible materials.'},{title:'Reusable nozzle',body:'Clean the tip and replace the cap after each use to keep it ready for the next repair.'}],
    uses: [{title:'Small household repairs',body:'Rejoin compatible ceramic, wood or rigid-plastic parts.'},{title:'Detailed assembly',body:'Place adhesive on small contact areas with the precision tip.'},{title:'Mixed-material repairs',body:'Check the material pair before joining metal, rubber or leather.'}]
  },
  'bondtite-quick-spot-on': {
    title: 'Quick Spot-On', purpose: 'Precision adhesive for small, hard-to-reach repairs.', applicator: 'Extended precision nozzle', consistency: 'Liquid',
    amazon: { asin: 'B0FG36CJ1R', pack: '10 g × 2 tubes' }, media: { key: 'spot-on', detailAlt: 'Quick Spot-On nozzle applying adhesive to a small broken plastic part' },
    benefits: [{title:'Reach small areas',body:'The extended nozzle helps direct adhesive into narrow, difficult-to-reach spaces.'},{title:'Precise placement',body:'Apply the amount needed to one bonding surface before joining the parts.'},{title:'Anti-clog cap',body:'The anti-clog cap and a clean nozzle help protect the applicator between uses.'}],
    uses: [{title:'Frame repairs',body:'Direct the extended nozzle into small joints on compatible spectacle or wooden frames.'},{title:'Ceramic repairs',body:'Bring small, close-fitting ceramic parts together using a controlled amount of adhesive.'},{title:'Detailed assembly',body:'Bring small components together with controlled adhesive placement.'}]
  },
  'bondtite-quick-gel-adhesive': {
    title: 'Quick Gel', purpose: 'More control. Less run-off.', applicator: 'Tube nozzle', consistency: 'Thick, non-drip gel',
    amazon: { asin: 'B0FL7BF84P', pack: '3 g × 2 tubes' }, media: { key: 'gel', detailAlt: 'The thick Quick Gel formula at the tube nozzle' },
    benefits: [{title:'Non-drip formula',body:'A thick consistency helps keep adhesive where you place it.'},{title:'Controlled application',body:'Useful for detailed work and repairs where a running liquid is difficult to manage.'},{title:'Vertical repairs',body:'The gel format supports more controlled placement on upright bonding areas.'}],
    uses: [{title:'Vertical surfaces',body:'Keep the adhesive in position while bringing the parts together.'},{title:'Wood trims and beading',body:'For detailed bonding on compatible wooden components.'},{title:'PVC and acrylic work',body:'Suitable applications include PVC edge banding and acrylic sheet pasting.'}]
  },
  'bondtite-quick-art-and-craft-glue': {
    title: 'Quick Art & Craft', purpose: 'A little more time for the finer details.', applicator: 'Tube nozzle', consistency: 'Thick, non-drip formula',
    amazon: { asin: 'B0FG3CD2B4', pack: '10 g tube' }, media: { key: 'craft', detailAlt: 'Quick Art & Craft used to attach decorative pieces to a picture frame' },
    benefits: [{title:'Detailed placement',body:'The thick formula helps control adhesive on small decorative pieces.'},{title:'Time to adjust',body:'Astral specifies a repositioning window of about 20 seconds for alignment.'},{title:'Clear finish',body:'A clear, non-drip adhesive for a neat finish on compatible craft surfaces.'}],
    uses: [{title:'Decorative details',body:'Position small embellishments carefully on compatible craft surfaces.'},{title:'Layered projects',body:'Use the short repositioning window to adjust alignment.'},{title:'Mixed craft surfaces',body:'For compatible porous and non-porous surfaces. Confirm the exact materials before use.'}]
  },
  'bondtite-quick-ultra-glue-brush-and-nozzle': {
    title: 'Quick Ultra Glue', purpose: 'One bottle. Two ways to apply.', applicator: 'Brush & precision nozzle', consistency: 'Liquid',
    amazon: { asin: 'B0FG38J6VC', pack: '15 g bottle' }, media: { key: 'ultra', detailAlt: 'The Ultra Glue brush applying adhesive to a small leather accessory repair' },
    benefits: [{title:'Brush for coverage',body:'Use the fine-bristle brush to spread a controlled coat over the bonding area.'},{title:'Nozzle for precision',body:'Use the upper cap and nozzle when you need adhesive in one small spot.'},{title:'Clear, tough bond',body:'A fast-drying adhesive designed for compatible household materials.'}],
    uses: [{title:'Broader contact areas',body:'Use the brush when the repair needs an even coat across the surface.'},{title:'Small contact points',body:'Switch to the nozzle for targeted placement.'},{title:'Accessory repairs',body:'Check compatibility before bonding leather, metal, rigid plastics or rubber.'}]
  },
  'bondtite-quick': {
    title: 'Bondtite Quick', purpose: 'A quick bond for everyday repairs.', applicator: 'Pack applicator', consistency: 'Low-viscosity liquid',
    benefits: [{title:'Fast setting',body:'The technical data sheet specifies 2–4 seconds, depending on material and adhesive thickness.'},{title:'Clear liquid',body:'A transparent, colourless adhesive for close-fitting bonding surfaces.'},{title:'Product guidance',body:'Check the technical data sheet for suitability and application requirements.'}],
    uses: [{title:'Everyday repairs',body:'Check the compatible materials and prepare both bonding surfaces.'},{title:'Small contact areas',body:'A low-viscosity liquid for controlled use on close-fitting parts.'},{title:'Material selection',body:'Ask our team to confirm suitability for your specific repair.'}]
  }
};
export const amazonProductUrl = (asin: string) => `https://www.amazon.in/dp/${asin}`;

// Alternatives are selected by application method rather than catalogue order.
export const instantAlternatives: Record<string, string[]> = {
 'bondtite-quick-spot-on': ['bondtite-quick-instant-adhesive', 'bondtite-quick-gel-adhesive'],
 'bondtite-quick-instant-adhesive': ['bondtite-quick-spot-on', 'bondtite-quick-ultra-glue-brush-and-nozzle'],
 'bondtite-quick-gel-adhesive': ['bondtite-quick-art-and-craft-glue', 'bondtite-quick-spot-on'],
 'bondtite-quick-art-and-craft-glue': ['bondtite-quick-gel-adhesive', 'bondtite-quick-ultra-glue-brush-and-nozzle'],
 'bondtite-quick-ultra-glue-brush-and-nozzle': ['bondtite-quick-spot-on', 'bondtite-quick-gel-adhesive'],
 'bondtite-quick': ['bondtite-quick-instant-adhesive', 'bondtite-quick-spot-on']
};

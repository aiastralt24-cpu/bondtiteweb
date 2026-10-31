import type { Faq } from './types';

/** Reviewed against Astral's product descriptions on 2026-10-31.
 * Sources: astraladhesives.com/bondtite-{deluxe,aqua,foambond,fast-and-clear}.html
 * and /chemistries/polyvinyl-acetate-pva-adhesives/bondtite-hydra.html.
 * Avoid generic curing times: follow the selected product's current technical sheet.
 */
export const homepageFaqs: Faq[] = [
  {
    question: 'Which Bondtite adhesive should I use for plywood, MDF and laminates?',
    answer: 'Bondtite Deluxe is a water-resistant PVA adhesive for wood-based furniture, including plywood, MDF and decorative laminate bonding. For furniture exposed to higher humidity, consider Bondtite Aqua or Hydra+. Choose according to both surfaces and the conditions the finished furniture will face; check the selected product’s application instructions before bonding.',
    links: [{label:'Explore woodworking adhesives',href:'/products/woodworking'},{label:'Find a product for your materials',href:'/product-advisor'}],
  },
  {
    question: 'What is the difference between Bondtite Hydra+, Deluxe and Aqua?',
    answer: 'Deluxe is a water-resistant PVA adhesive for general woodworking. Aqua is designed for furniture exposed to moisture and high humidity, such as kitchens and bathrooms. Hydra+ adds fast-setting, anti-bubble cross-linked technology and conforms to EN 204 category D3. Compare their application guidance with your materials and working conditions before choosing.',
    links: [{label:'Bondtite Deluxe',href:'/products/woodworking/bondtite-deluxe'},{label:'Bondtite Aqua',href:'/products/woodworking/bondtite-aqua'},{label:'Bondtite Hydra+',href:'/products/woodworking/bondtite-hydra'}],
  },
  {
    question: 'Is Bondtite wood adhesive waterproof or water-resistant?',
    answer: 'It depends on the product. Deluxe is described as water-resistant, while Aqua and Hydra+ are described as having waterproof properties for their specified woodworking applications. Hydra+ also conforms to EN 204 category D3. These descriptions do not establish suitability for every wet-use application. Check the technical data sheet and ask for guidance before choosing an adhesive for continuous water exposure or outdoor work.',
    links: [{label:'View technical data sheets',href:'/resources/technical-data-sheets'},{label:'Ask about your application',href:'/contact?request=technical-support'}],
  },
  {
    question: 'Which Bondtite adhesive is suitable for foam and upholstery?',
    answer: 'Bondtite Foambond is a synthetic rubber-based contact adhesive designed for foam, sofas, chair cushions, mattresses and upholstery. Its listed applications include foam-to-foam bonding and work involving rexine, leather, wood and metal. Prepare clean, dry surfaces, apply a thin coat to both surfaces, allow the adhesive to develop tack, then join with even pressure according to the product instructions.',
    links: [{label:'Explore Bondtite Foambond',href:'/products/woodworking/bondtite-foambond'},{label:'Explore upholstery applications',href:'/applications/auto-and-upholstery'}],
  },
  {
    question: 'Which Bondtite epoxy adhesive should I choose for metal, glass or ceramic repairs?',
    answer: 'Bondtite Fast and Clear is a two-component transparent epoxy with listed uses including metal, glass and ceramic bonding. It is an option when a clear bond line and fast setting are important. For other repairs, compare products in the epoxy range against your material combination and working-time requirements. Follow the selected product’s mixing and curing instructions; initial setting is not the same as full cure.',
    links: [{label:'Explore Fast and Clear',href:'/products/epoxy-adhesives/bondtite-fast-and-clear'},{label:'Compare epoxy adhesives',href:'/products/epoxy-adhesives'}],
  },
  {
    question: 'Where can I buy Bondtite adhesives or request a quotation?',
    answer: 'Contact the Bondtite team for help with product availability, purchasing enquiries or a quotation. Include the product name, required pack size, quantity and your city so the team can respond to your requirement. If you are unsure which adhesive to buy, describe the two materials you want to bond and how the finished item will be used.',
    links: [{label:'Send a product enquiry',href:'/contact'},{label:'Browse products and pack sizes',href:'/products'}],
  },
];

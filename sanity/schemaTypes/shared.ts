import { defineField } from "sanity";

export const navItemField = defineField({
  name: "navItem",
  title: "Navigation item",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "href", type: "string", validation: (rule) => rule.required() })
  ]
});

export const ctaField = defineField({
  name: "cta",
  title: "CTA",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "href", type: "string", validation: (rule) => rule.required() })
  ]
});

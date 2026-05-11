import { defineField, defineType } from "sanity";

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  fields: [
    defineField({
      name: "navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" })
          ]
        }
      ]
    }),
    defineField({
      name: "headerCta",
      type: "object",
      fields: [
        defineField({ name: "label", type: "string" }),
        defineField({ name: "href", type: "string" })
      ]
    }),
    defineField({
      name: "hero",
      type: "object",
      fields: [
        defineField({ name: "titleBefore", type: "string" }),
        defineField({ name: "titleAccent", type: "string" }),
        defineField({ name: "titleAfter", type: "string" }),
        defineField({ name: "body", type: "text" }),
        defineField({
          name: "cta",
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "string" })
          ]
        }),
        defineField({
          name: "proof",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", type: "string" }),
                defineField({ name: "detail", type: "text" })
              ]
            }
          ]
        })
      ]
    }),
    defineField({
      name: "bondFinder",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "intro", type: "text" }),
        defineField({
          name: "groups",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "id",
                  type: "string",
                  options: {
                    list: [
                      { title: "Material", value: "material" },
                      { title: "Environment", value: "environment" },
                      { title: "Speed", value: "speed" }
                    ]
                  }
                }),
                defineField({ name: "label", type: "string" }),
                defineField({
                  name: "options",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        defineField({ name: "id", type: "string" }),
                        defineField({ name: "label", type: "string" })
                      ]
                    }
                  ]
                })
              ]
            }
          ]
        }),
        defineField({
          name: "rules",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "material", type: "string" }),
                defineField({ name: "environment", type: "string" }),
                defineField({ name: "speed", type: "string" }),
                defineField({ name: "productId", type: "string" })
              ]
            }
          ]
        }),
        defineField({ name: "fallbackProductId", type: "string" })
      ]
    }),
    defineField({ name: "products", type: "array", of: [{ type: "product" }] }),
    defineField({ name: "chemistries", type: "array", of: [{ type: "chemistry" }] }),
    defineField({ name: "applications", type: "array", of: [{ type: "application" }] }),
    defineField({ name: "resources", type: "array", of: [{ type: "resource" }] }),
    defineField({
      name: "stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", type: "string" }),
            defineField({ name: "suffix", type: "string" }),
            defineField({ name: "label", type: "string" })
          ]
        }
      ]
    }),
    defineField({ name: "faqs", type: "array", of: [{ type: "faq" }] }),
    defineField({
      name: "footer",
      type: "object",
      fields: [
        defineField({
          name: "columns",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", type: "string" }),
                defineField({
                  name: "links",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        defineField({ name: "label", type: "string" }),
                        defineField({ name: "href", type: "string" })
                      ]
                    }
                  ]
                })
              ]
            }
          ]
        })
      ]
    })
  ]
});

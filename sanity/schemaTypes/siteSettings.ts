import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({
      name: "footerColumns",
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
});

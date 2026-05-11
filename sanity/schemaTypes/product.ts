import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "object",
  fields: [
    defineField({ name: "id", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "chemistry", type: "string" }),
    defineField({ name: "label", type: "string" }),
    defineField({ name: "meta", type: "string" }),
    defineField({ name: "image", type: "string" }),
    defineField({ name: "imageAlt", type: "string" }),
    defineField({
      name: "imageTone",
      type: "string",
      options: {
        list: [
          { title: "Pack", value: "pack" },
          { title: "Box", value: "box" },
          { title: "Tube", value: "tube" },
          { title: "Spray", value: "spray" }
        ]
      }
    }),
    defineField({ name: "reason", type: "text" }),
    defineField({ name: "bestFor", type: "array", of: [{ type: "string" }] })
  ]
});

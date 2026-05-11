import { defineField, defineType } from "sanity";

export const chemistry = defineType({
  name: "chemistry",
  title: "Chemistry",
  type: "object",
  fields: [
    defineField({ name: "name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "accent", type: "string" }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "bullets", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "productId", type: "string" })
  ]
});

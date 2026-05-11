import { defineField, defineType } from "sanity";

export const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "object",
  fields: [
    defineField({ name: "code", type: "string" }),
    defineField({ name: "title", type: "string" }),
    defineField({ name: "body", type: "text" })
  ]
});

import { defineField, defineType } from "sanity";

export const application = defineType({
  name: "application",
  title: "Application",
  type: "object",
  fields: [
    defineField({ name: "titleBefore", type: "string" }),
    defineField({ name: "titleAccent", type: "string" }),
    defineField({ name: "body", type: "text" })
  ]
});

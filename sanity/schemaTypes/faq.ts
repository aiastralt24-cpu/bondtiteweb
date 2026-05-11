import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "question", type: "string" }),
    defineField({ name: "answer", type: "text" })
  ]
});

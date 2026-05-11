import { application } from "@/sanity/schemaTypes/application";
import { chemistry } from "@/sanity/schemaTypes/chemistry";
import { faq } from "@/sanity/schemaTypes/faq";
import { homepage } from "@/sanity/schemaTypes/homepage";
import { product } from "@/sanity/schemaTypes/product";
import { resource } from "@/sanity/schemaTypes/resource";
import { siteSettings } from "@/sanity/schemaTypes/siteSettings";

export const schemaTypes = [
  homepage,
  product,
  chemistry,
  application,
  faq,
  resource,
  siteSettings
];

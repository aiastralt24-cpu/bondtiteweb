import type { MetadataRoute } from "next";
import { catalogProducts, getProductPath, productCategories } from "@/lib/products";
import { baseUrl, siteApplications, siteResources } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/products", "/applications", "/resources", "/about", "/contact"];
  const categoryRoutes = productCategories.map((category) => `/products/${category.slug}`);
  const productRoutes = catalogProducts.map((product) => getProductPath(product));
  const applicationRoutes = siteApplications.map((application) => `/applications/${application.slug}`);
  const resourceRoutes = siteResources.map((resource) => `/resources/${resource.slug}`);

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...applicationRoutes,
    ...resourceRoutes
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/products" ? 0.9 : 0.7
  }));
}

import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductPage } from "@/components/product-page";
import { getHomepageData } from "@/lib/content";
import { productCategories } from "@/lib/products";
import { headerCta, mainNavigation } from "@/lib/site";

const baseUrl = "https://www.bondtite.in";

export const metadata: Metadata = {
  title: "Bondtite Products | Adhesives by Chemistry and Application",
  description:
    "Browse Bondtite PVA, epoxy, clear and specialty adhesives by substrate, site condition, cure speed and pack format.",
  alternates: {
    canonical: "/products"
  },
  openGraph: {
    title: "Bondtite Products",
    description:
      "Browse Bondtite adhesives by chemistry, substrate, site condition and application.",
    url: `${baseUrl}/products`,
    type: "website"
  }
};

export default async function Products() {
  const data = await getHomepageData();
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Bondtite Products",
    url: `${baseUrl}/products`,
    hasPart: productCategories.map((category) => ({
      "@type": "CollectionPage",
      name: category.label,
      url: `${baseUrl}/products/${category.slug}`
    }))
  };

  return (
    <>
      <Header navigation={mainNavigation} cta={headerCta} />
      <ProductPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <Footer footer={data.footer} />
    </>
  );
}

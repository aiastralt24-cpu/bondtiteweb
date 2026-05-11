import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ResourcesPage } from "@/components/resource-pages";
import { getHomepageData } from "@/lib/content";
import { baseUrl, headerCta, mainNavigation, siteResources } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources | Bondtite Technical Data and Guides",
  description:
    "Access Bondtite technical data sheets, application guides, certifications and trade support resources.",
  alternates: { canonical: "/resources" }
};

export default async function ResourcesRoute() {
  const data = await getHomepageData();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Bondtite Resources",
    url: `${baseUrl}/resources`,
    hasPart: siteResources.map((resource) => ({
      "@type": "Article",
      headline: resource.title,
      url: `${baseUrl}/resources/${resource.slug}`
    }))
  };

  return (
    <>
      <Header navigation={mainNavigation} cta={headerCta} />
      <ResourcesPage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Footer footer={data.footer} />
    </>
  );
}

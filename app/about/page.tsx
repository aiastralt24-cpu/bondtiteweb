import { brandId, websiteId } from "@/lib/seo";
import { serializeJsonLd } from "@/lib/seo";
import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AboutPage } from "@/components/static-pages";
import { getHomepageData } from "@/lib/content";
import { baseUrl, headerCta, mainNavigation } from "@/lib/site";

export const metadata: Metadata = withSeo({
  title: "About Bondtite | Wood, Epoxy & Instant Adhesives by Astral",
  description:
    "Discover Bondtite by Astral: wood, epoxy, rubber and instant adhesives for furniture, fabrication and everyday repairs. Explore our range and product milestones.",
  alternates: { canonical: "/about" }
});

export default async function AboutRoute() {
  const data = await getHomepageData();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${baseUrl}/about#page`,
    about: { "@id": brandId },
    isPartOf: { "@id": websiteId },
    name: "About Bondtite",
    url: `${baseUrl}/about`
  };
  return (
    <>
      <Header navigation={mainNavigation} cta={headerCta} />
      <AboutPage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationJsonLd) }} />
      <Footer footer={data.footer} />
    </>
  );
}

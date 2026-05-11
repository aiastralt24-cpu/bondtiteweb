import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { AboutPage } from "@/components/static-pages";
import { getHomepageData } from "@/lib/content";
import { baseUrl, headerCta, mainNavigation } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Bondtite | Adhesive Engineering for India",
  description:
    "Learn about Bondtite adhesive engineering, trade support, product guidance and technical proof for Indian site conditions.",
  alternates: { canonical: "/about" }
};

export default async function AboutRoute() {
  const data = await getHomepageData();
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bondtite",
    url: `${baseUrl}/about`,
    brand: "Bondtite"
  };
  return (
    <>
      <Header navigation={mainNavigation} cta={headerCta} />
      <AboutPage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
      <Footer footer={data.footer} />
    </>
  );
}

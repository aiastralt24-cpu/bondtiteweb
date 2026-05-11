import type { Metadata } from "next";
import { ApplicationsPage } from "@/components/application-pages";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getHomepageData } from "@/lib/content";
import { baseUrl, headerCta, mainNavigation, siteApplications } from "@/lib/site";

export const metadata: Metadata = {
  title: "Applications | Bondtite Adhesives",
  description:
    "Browse Bondtite adhesive applications for furniture, construction repair, wet areas, auto and upholstery workflows.",
  alternates: { canonical: "/applications" }
};

export default async function ApplicationsRoute() {
  const data = await getHomepageData();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Bondtite Applications",
    url: `${baseUrl}/applications`,
    hasPart: siteApplications.map((application) => ({
      "@type": "WebPage",
      name: `${application.title} ${application.accent}`,
      url: `${baseUrl}/applications/${application.slug}`
    }))
  };

  return (
    <>
      <Header navigation={mainNavigation} cta={headerCta} />
      <ApplicationsPage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Footer footer={data.footer} />
    </>
  );
}

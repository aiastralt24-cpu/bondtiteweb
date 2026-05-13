import type { Metadata } from "next";
import { DealerPage } from "@/components/dealer-page";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getHomepageData } from "@/lib/content";
import { baseUrl, headerCta, mainNavigation } from "@/lib/site";

export const metadata: Metadata = {
  title: "Become a Bondtite Dealer | Partner with Astral Adhesives",
  description:
    "Apply to become a Bondtite dealer. Partner with Astral-backed adhesive products for furniture, construction, DIY, upholstery and repair markets.",
  alternates: { canonical: "/become-a-dealer" }
};

export default async function BecomeADealerRoute() {
  const data = await getHomepageData();
  const dealerJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Become a Bondtite Dealer",
    description: metadata.description,
    url: `${baseUrl}/become-a-dealer`
  };

  return (
    <>
      <Header navigation={mainNavigation} cta={headerCta} />
      <DealerPage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dealerJsonLd) }} />
      <Footer footer={data.footer} />
    </>
  );
}

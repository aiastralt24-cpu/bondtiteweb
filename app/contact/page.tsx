import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ContactPage } from "@/components/static-pages";
import { getHomepageData } from "@/lib/content";
import { baseUrl, headerCta, mainNavigation } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Bondtite | Trade Desk and Dealer Support",
  description:
    "Contact Bondtite for adhesive selection, technical documents, dealer enquiries, product support and trade guidance.",
  alternates: { canonical: "/contact" }
};

export default async function ContactRoute() {
  const data = await getHomepageData();
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Bondtite",
    url: `${baseUrl}/contact`
  };
  return (
    <>
      <Header navigation={mainNavigation} cta={headerCta} />
      <ContactPage />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }} />
      <Footer footer={data.footer} />
    </>
  );
}

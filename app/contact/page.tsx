import { serializeJsonLd } from "@/lib/seo";
import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import { catalogProducts } from "@/lib/products";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ContactPage } from "@/components/static-pages";
import { getHomepageData } from "@/lib/content";
import { baseUrl, headerCta, mainNavigation } from "@/lib/site";

export const metadata: Metadata = withSeo({
  title: "Contact Bondtite | Trade Desk and Dealer Support",
  description:
    "Contact Bondtite for adhesive selection, technical documents, dealer enquiries, product support and trade guidance.",
  alternates: { canonical: "/contact" }
});

export default async function ContactRoute({ searchParams }: { searchParams: Promise<{ product?: string; request?: string; project?: string }> }) {
  const params = await searchParams;
  const selectedProduct = catalogProducts.find(product => product.slug === params.product);
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
      <ContactPage dealer={params.request === "dealer"} project={typeof params.project === "string" ? params.project.slice(0, 1500) : undefined} productName={selectedProduct?.name} documentation={params.request === "technical-documentation"} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(contactJsonLd) }} />
      <Footer footer={data.footer} showContact={false} />
    </>
  );
}

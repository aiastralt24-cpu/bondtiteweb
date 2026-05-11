import { Applications } from "@/components/applications";
import { BondFinder } from "@/components/bond-finder";
import { CampaignDvc } from "@/components/campaign-dvc";
import { FaqSection } from "@/components/faq-section";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { LegacyStats } from "@/components/legacy-stats";
import { ProductChemistry } from "@/components/product-chemistry";
import { TechnicalProof } from "@/components/technical-proof";
import { getHomepageData } from "@/lib/content";

export default async function Home() {
  const data = await getHomepageData();

  return (
    <>
      <Header navigation={data.navigation} cta={data.headerCta} />
      <main>
        <Hero hero={data.hero} />
        <CampaignDvc />
        <BondFinder finder={data.bondFinder} products={data.products} />
        <ProductChemistry chemistries={data.chemistries} products={data.products} />
        <Applications applications={data.applications} />
        <TechnicalProof resources={data.resources} />
        <LegacyStats stats={data.stats} />
        <FaqSection faqs={data.faqs} />
      </main>
      <Footer footer={data.footer} />
    </>
  );
}

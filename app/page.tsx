import { withSeo } from "@/lib/seo";
import { MaterialStory } from "@/components/material-story";
import { Applications } from "@/components/applications";
import { CampaignDvc } from "@/components/campaign-dvc";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { FeaturedRange } from "@/components/featured-range";
import { headerCta } from "@/lib/site";
import { getHomepageData } from "@/lib/content";

export const metadata=withSeo({title:'Bondtite | Wood, Epoxy & Instant Adhesives by Astral',description:'Explore Bondtite adhesives for woodworking, furniture, fabrication and everyday repairs. Find products, application guidance and technical data sheets.',alternates:{canonical:'/'}});

export default async function Home() {
  const data = await getHomepageData();

  return (
    <>
      <Header navigation={data.navigation} cta={headerCta} variant="heroOverlay" />
      <main id="main-content" tabIndex={-1} className="bond-home">
        <Hero hero={data.hero} />
        <Applications />
        <CampaignDvc />
        <MaterialStory />
        <FeaturedRange />
      </main>
      <Footer footer={data.footer} />
    </>
  );
}

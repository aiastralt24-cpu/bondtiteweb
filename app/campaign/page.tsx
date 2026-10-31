import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/hero';
import { MaterialStory } from '@/components/material-story';
import { getHomepageData } from '@/lib/content';
import { headerCta } from '@/lib/site';
import { withSeo } from '@/lib/seo';

export const metadata = withSeo({ title: 'The Bondtite story | Bondtite by Astral', description: 'Watch the Bondtite campaign film featuring Ranbir Kapoor and explore Hydra+ woodworking adhesive.', alternates: { canonical: '/campaign' } });

export default async function CampaignPage() {
  const data = await getHomepageData();
  return <><Header navigation={data.navigation} cta={headerCta} variant="heroOverlay" /><main id="main-content" tabIndex={-1} className="bond-home"><Hero discoveryHref="#material-story" /><MaterialStory /></main><Footer footer={data.footer} /></>;
}

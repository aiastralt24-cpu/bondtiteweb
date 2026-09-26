import { organizationId } from "@/lib/seo";
import { serializeJsonLd } from "@/lib/seo";
import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ResourceDetailPage } from "@/components/resource-pages";
import { getHomepageData } from "@/lib/content";
import {
  baseUrl,
  getResourceBySlug,
  headerCta,
  mainNavigation,
  siteResources
} from "@/lib/site";

type Props = { params: Promise<{ resource: string }> };

export function generateStaticParams() {
  return siteResources.map((resource) => ({ resource: resource.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { resource: slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return withSeo({
    title: `${resource.title} | Bondtite Resources`,
    description: resource.seoDescription,
    alternates: { canonical: `/resources/${resource.slug}` },
    openGraph: {
      title: resource.title,
      description: resource.seoDescription,
      url: `${baseUrl}/resources/${resource.slug}`,
      type: "article"
    }
  });
}

export default async function ResourceRoute({ params }: Props) {
  const { resource: slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();
  const data = await getHomepageData();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Resources", item: `${baseUrl}/resources` },
      { "@type": "ListItem", position: 2, name: resource.title, item: `${baseUrl}/resources/${resource.slug}` }
    ]
  };
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: resource.title,
    description: resource.seoDescription,
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
    mainEntityOfPage: `${baseUrl}/resources/${resource.slug}`
  };

  return (
    <>
      <Header navigation={mainNavigation} cta={headerCta} />
      <ResourceDetailPage resource={resource} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }} />
      <Footer footer={data.footer} />
    </>
  );
}

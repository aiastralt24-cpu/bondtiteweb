import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApplicationDetailPage } from "@/components/application-pages";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getHomepageData } from "@/lib/content";
import {
  baseUrl,
  getApplicationBySlug,
  headerCta,
  mainNavigation,
  siteApplications
} from "@/lib/site";

type Props = { params: Promise<{ application: string }> };

export function generateStaticParams() {
  return siteApplications.map((application) => ({ application: application.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { application: slug } = await params;
  const application = getApplicationBySlug(slug);
  if (!application) return {};
  return {
    title: `${application.title} ${application.accent} | Bondtite Applications`,
    description: application.seoDescription,
    alternates: { canonical: `/applications/${application.slug}` },
    openGraph: {
      title: `${application.title} ${application.accent}`,
      description: application.seoDescription,
      url: `${baseUrl}/applications/${application.slug}`
    }
  };
}

export default async function ApplicationRoute({ params }: Props) {
  const { application: slug } = await params;
  const application = getApplicationBySlug(slug);
  if (!application) notFound();
  const data = await getHomepageData();
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Applications", item: `${baseUrl}/applications` },
      { "@type": "ListItem", position: 2, name: `${application.title} ${application.accent}`, item: `${baseUrl}/applications/${application.slug}` }
    ]
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: application.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer }
    }))
  };

  return (
    <>
      <Header navigation={mainNavigation} cta={headerCta} />
      <ApplicationDetailPage application={application} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Footer footer={data.footer} />
    </>
  );
}

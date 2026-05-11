import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryPage } from "@/components/category-page";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { getHomepageData } from "@/lib/content";
import {
  getCategoryBySlug,
  getProductsByCategory,
  productCategories
} from "@/lib/products";
import { headerCta, mainNavigation } from "@/lib/site";

type Props = {
  params: Promise<{ category: string }>;
};

const baseUrl = "https://www.bondtite.in";

export function generateStaticParams() {
  return productCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {};
  }

  return {
    title: `${category.label} | Bondtite Products`,
    description: category.seoDescription,
    alternates: {
      canonical: `/products/${category.slug}`
    },
    openGraph: {
      title: `${category.label} | Bondtite Products`,
      description: category.seoDescription,
      url: `${baseUrl}/products/${category.slug}`,
      type: "website"
    }
  };
}

export default async function ProductCategoryRoute({ params }: Props) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const data = await getHomepageData();
  const products = getProductsByCategory(category.slug);
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Products",
        item: `${baseUrl}/products`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: category.label,
        item: `${baseUrl}/products/${category.slug}`
      }
    ]
  };

  return (
    <>
      <Header
        navigation={mainNavigation}
        cta={headerCta}
      />
      <CategoryPage category={category} products={products} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Footer footer={data.footer} />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductDetailPage } from "@/components/product-detail-page";
import { getHomepageData } from "@/lib/content";
import {
  catalogProducts,
  getCategoryBySlug,
  getProductBySlug,
  getProductPath
} from "@/lib/products";
import { headerCta, mainNavigation } from "@/lib/site";

type Props = {
  params: Promise<{ category: string; product: string }>;
};

const baseUrl = "https://www.bondtite.in";

export function generateStaticParams() {
  return catalogProducts.map((product) => ({
    category: product.categorySlug,
    product: product.slug
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: categorySlug, product: productSlug } = await params;
  const product = getProductBySlug(categorySlug, productSlug);
  const category = getCategoryBySlug(categorySlug);

  if (!product || !category) {
    return {};
  }

  return {
    title: `${product.name} | ${category.label} | Bondtite`,
    description: product.productSummary,
    alternates: {
      canonical: getProductPath(product)
    },
    openGraph: {
      title: `${product.name} | Bondtite`,
      description: product.productSummary,
      url: `${baseUrl}${getProductPath(product)}`,
      images: [product.image],
      type: "website"
    }
  };
}

export default async function ProductDetailRoute({ params }: Props) {
  const { category: categorySlug, product: productSlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  const product = getProductBySlug(categorySlug, productSlug);

  if (!category || !product) {
    notFound();
  }

  const data = await getHomepageData();
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
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${baseUrl}${getProductPath(product)}`
      }
    ]
  };
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: {
      "@type": "Brand",
      name: "Bondtite"
    },
    category: category.label,
    image: `${baseUrl}${product.image}`,
    description: product.productSummary,
    material: product.substrates.join(", ")
  };
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: product.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <>
      <Header
        navigation={mainNavigation}
        cta={headerCta}
      />
      <ProductDetailPage category={category} product={product} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Footer footer={data.footer} />
    </>
  );
}

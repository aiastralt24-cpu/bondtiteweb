import { withSeo } from "@/lib/seo";
import type { Metadata } from "next";
import { BondFinder } from "@/components/bond-finder";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getHomepageData } from "@/lib/content";
import { headerCta, mainNavigation } from "@/lib/site";

export const metadata: Metadata = withSeo({
  title: "Product Advisor | Bondtite",
  description: "Choose your task and joining surfaces, and get Bondtite product and application guidance.",
  alternates: { canonical: "/product-advisor" }
});

export default async function ProductAdvisorPage() {
  const data = await getHomepageData();
  return <><Header navigation={mainNavigation} cta={headerCta} /><main id="main-content" tabIndex={-1} className="product-advisor-page"><BondFinder finder={data.bondFinder} /></main><Footer footer={data.footer} /></>;
}

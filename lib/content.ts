import { fallbackHomepageData } from "@/lib/fallback-data";
import { hasSanityConfig, sanityClient } from "@/lib/sanity";
import type { HomepageData } from "@/lib/types";

const homepageQuery = `*[_type == "homepage"][0]{
  navigation,
  headerCta,
  hero,
  bondFinder,
  products,
  chemistries,
  applications,
  resources,
  stats,
  faqs,
  footer
}`;

export async function getHomepageData(): Promise<HomepageData> {
  if (!hasSanityConfig) {
    return fallbackHomepageData;
  }

  try {
    const data = await sanityClient.fetch<HomepageData | null>(homepageQuery, {}, {
      next: { revalidate: 60 }
    });

    return data ?? fallbackHomepageData;
  } catch {
    return fallbackHomepageData;
  }
}

import { baseUrl } from "@/lib/site";
import { identityJsonLd, serializeJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import { SiteMotion } from "@/components/site-motion";
import "@fontsource/archivo/400.css";
import "@fontsource/archivo/500.css";
import "@fontsource/archivo/600.css";
import "@fontsource/archivo/700.css";
import "@fontsource/barlow-condensed/600.css";
import "@fontsource/barlow-condensed/700.css";
import "./palette.css";
import "./globals.css";
import "./bond-refresh.css";
import "./experience.css";
import "./typography.css";
import "./catalogue.css";
import "./applications.css";
import "./resources.css";
import "./product-story.css";
import "./about.css";
import "./contact.css";
import "./footer.css";
import "./home-palette.css";
import "./palette-controls.css";
import "./bond-selector.css";
import "./range-pages.css";
import "./motion-polish.css";
import "./policies.css";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Bondtite | Adhesives by Astral",
  applicationName: "Bondtite",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION, other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined },
  description:
    "Bondtite adhesives are engineered for demanding workshops, humid sites, dry heat, furniture, fabrication and construction trades."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:serializeJsonLd(identityJsonLd)}}/><SiteMotion /></body>
    </html>
  );
}

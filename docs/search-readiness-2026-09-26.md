# Search readiness review

Reviewed 26 September 2026. Scope: local source, rendered pages, production build and current official Google documentation. This is not a live-domain indexing, rankings or Core Web Vitals assessment.

## Overall assessment

The site has a useful technical foundation. Its next search gains should come from completing product information and publishing original, source-backed application guidance. Visual polish alone does not establish search authority or AI citation eligibility.

| Area | Finding |
| --- | --- |
| Technical SEO | Server-rendered/static pages, route metadata, sitemap, robots and internal links are present. Production build passes. |
| Product content | Quality varies across 22 products. Five retain fallback catalogue/workbook summaries, seven lack specific pack sizes, and five lack feature entries. |
| Answer usefulness | Hydra has useful specifications, steps and FAQs. Advisor answers require interaction; reusable application answers deserve their own readable pages. |
| Entity clarity | Organization markup exists on About. Reuse a stable organization identity and make the Bondtite/Astral relationship consistent throughout metadata and content. |
| Production readiness | Public-domain indexing, Search Console, redirects and field performance remain unverified. Localhost cannot demonstrate search visibility. |

## Priorities

1. Complete the five Quick product summaries and missing specifications using approved manufacturer data. Replace internal references such as “source workbook” with customer-facing descriptions. Do not infer unsupported performance claims.
2. Publish practical application pages with direct answers, material combinations, preparation steps, relevant limitations and product comparisons. Add original application photographs, demonstrations and identifiable technical review dates where available.
3. Keep key technical information in readable HTML while preserving the requested TDS download form. Search users should understand the product before downloading a document.
4. Confirm the intended production domain. Metadata currently assumes `https://www.bondtite.in`. Add an explicit homepage canonical and check all route canonicals against the final domain.
5. Use genuine content modification dates in the sitemap. Its current `new Date()` values reflect generation time rather than editorial changes.
6. After deployment, validate representative URLs in Search Console, check structured data eligibility and measure mobile Core Web Vitals. Build success is not evidence of good field performance.

## Google AEO and GEO

Google treats optimization for its generative AI experiences as part of SEO. Useful, original content and accessible, indexable pages matter; there is no special AI schema or required `llms.txt` file. Eligibility does not guarantee selection or citation. See [Google's AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

FAQs remain useful page content, but Google states that FAQ rich results stopped appearing from 7 May 2026. Existing FAQPage markup should not be presented as a rich-result advantage. See [Google Search documentation updates](https://developers.google.com/search/updates).

Product and breadcrumb structured data are present. Product markup alone does not guarantee a rich result; validate the relevant feature requirements and never invent prices, offers or ratings to satisfy them.

Performance should be assessed using actual loading, interaction and layout-stability measurements. See [Google's Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals).

## Motion implementation and validation

- Campaign video pauses outside the viewport and when the document is hidden; reduced-motion preferences disable autoplay.
- Updated reveal coverage for range and product layouts; reduced travel and stagger time.
- Advisor answers and product-filter results transition without remounting controls.
- Added TDS/comparison dialog entrances, disclosure-content transitions and variable-height mobile menu expansion.
- Preserved existing adaptive product stacking and reduced-motion handling.
- Verified offscreen video pause, mobile menu opening and Escape focus return, and TDS opening. TypeScript, targeted lint and production build passed.
- No field-performance or frame-rate claim is made. Dialog closing and native disclosure height changes remain immediate.

This review records recommendations; it does not claim that the SEO content and metadata changes above have been implemented.

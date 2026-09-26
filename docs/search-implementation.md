# SEO, AEO and GEO implementation

Completed locally on 26 September 2026.

## Implemented

- Shared public metadata helper provides route-specific Open Graph and Twitter cards without inheriting the homepage canonical.
- Homepage now has an explicit canonical, title and description. All 48 sitemap routes have unique titles, descriptions, canonicals, social tags and one H1.
- Canonical origin comes from `lib/site.ts`: currently https://www.bondtite.in. Confirm it is the intended public domain before deployment.
- Generated 1200 × 630 PNG social preview at `/opengraph-image`; product-specific previews remain in place.
- Shared Organization (Astral Adhesives), Brand (Bondtite) and WebSite identity graph with stable identifiers. AboutPage and Product markup reference these identities. Existing breadcrumb, collection, FAQ and resource markup retained, with resource author/publisher identity references unified.
- JSON-LD escapes `<` to avoid unsafe embedded script delimiters in content.
- Sitemap generated from the actual page collections; excludes admin, API and private documents. Removed build-time lastModified values, priority and changeFrequency rather than publishing misleading freshness metadata. Add editorial dates only when a reliable source exists.
- Robots permits public crawling and disallows admin/API paths. These paths also return X-Robots-Tag noindex/noarchive/nofollow and private/no-store headers. Existing authentication remains the security control; robots is not access control.
- `/llms.txt` is generated from the product, category, application and resource catalogues. It is a public navigation reference, with no lead records or private document URLs. It does not grant or revoke permissions and is not a Google ranking signal.
- Optional Search Console and Bing ownership metadata via GOOGLE_SITE_VERIFICATION and BING_SITE_VERIFICATION environment variables. No token has been invented or verification claimed.
- Added `npm run test:search`: read-only crawl against localhost:3100 by default. Override SEO_CHECK_ORIGIN for an authorised staging/production audit.

## Validation

Production build, TypeScript and targeted lint pass. The local read-only crawl verified 48 public routes, 150 parseable JSON-LD blocks, sitemap uniqueness, metadata, H1s, robots rules, llms.txt, private indexing headers, an invalid-product 404 and PNG sharing-image response.

JSON parsing is not a Google Rich Results eligibility certificate. Product markup has no invented prices, ratings or offers; do not expect merchant results simply because Product exists. FAQ content remains useful, but Google retired FAQ rich results in May 2026.

## Remaining launch steps

1. Confirm the public domain and redirect alternate hostnames consistently at hosting level; enforce HTTPS there.
2. Add legitimate verification tokens, verify ownership and submit `/sitemap.xml` in Search Console and Bing Webmaster Tools.
3. Inspect a homepage, product, category, application and resource URL after deployment; verify indexing and structured-data interpretation. Confirm production middleware/CDN does not block public assets or pages.
4. Measure mobile Core Web Vitals on the deployed site. No field-performance or ranking guarantee is made.
5. Complete five product fallback descriptions and missing pack/feature entries with approved product information. Add original application guidance and demonstrations rather than duplicating pages for keywords.
6. Confirm legal/privacy and hosting arrangements as described in `docs/policy-review.md`.

## Official references

- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://developers.google.com/search/docs/appearance/structured-data/breadcrumb
- https://developers.google.com/search/updates

Google's guidance ties AI visibility to useful, accessible content and normal SEO foundations. There is no special AI schema requirement or llms.txt ranking benefit. Independent AI services may use different discovery systems; no visibility across those services is guaranteed.

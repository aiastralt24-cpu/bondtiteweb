# Catalogue corrections, 29 September 2026

Implemented the non-conflicting findings from the product-data audit. The audit report records the pre-change state; this document records the corrections.

## Shipped

- All 37 product pages retained. Uniweld now has an acrylic category, with a permanent redirect from its previous epoxy URL.
- Chemistry is independent of the product's primary application category. Epoxy and synthetic-rubber category listings include relevant products while keeping existing URLs.
- Corrected material lists, real application labels, expanded material filters and material-family search aliases. A Plastic filter is a discovery aid, not a claim that every listed product bonds every plastic.
- Added missing current webpage pack sizes for Fast and Clear, Super Strength and five Quick variants. Added TDS-only packs for Acrylic Fix, WPC Fix and Wood.
- Replaced the five Quick variants' workbook placeholders and Amazon source links with product-specific copy, official sources and application steps.
- Removed unsupported Pro hybrid-chemistry and Art & Craft school-project claims.
- Restored relevant preparation, coating, pressing, moisture preparation, timing and after-use steps. Added product-specific application exclusions within technical details.
- Added 22 sourced technical-property tables, retaining units and test conditions. Rapid setting time is no longer labelled open time. Disputed measurements, ambiguous table cells and source conflicts were not resolved by guesswork.
- Connected all 22 published PDFs to an allowlisted gated endpoint. Each request uses the selected product's name and file, and records the originating form and page before returning the PDF.
- Expanded advisor primary recommendations from four to ten products, with Aqua and Strong and Clear as alternatives. Added explicit PVC/board, WPC/facing, glass/glass, metal/metal, ceramic/ceramic and identified rigid-plastic cases. Both material orders are covered. Unknown plastics and unverified environments still go to the team.
- Product metadata, schema, category pages, sitemap and llms output consume the corrected catalogue. Technical schema properties use the same values shown on the page.

## Source policy

`lib/catalogue-facts.ts` contains reviewed field corrections from the official Astral pages identified by each product's source URL. `lib/product-specifications.ts` records the exact PDF source and document revision for every technical table. The PDFs are preserved under `private/documents`.

The three added TDS-only pack fields come from Acrylic Fix v02 (01.04.2024), WPC Fix v02 (01.04.2024) and the published Wood TDS. Webpage pack lists otherwise remain authoritative for this release; differences against PDFs remain listed in the audit.

Source conflicts and unpublished industrial mixing/cure instructions still require Astral's approved master data. No invented instructions were added for products without published guidance.

## Verification

- Production build and changed-source ESLint pass.
- Catalogue regression checks cover 37 products, corrected classification, material search, timing labels, source links, 22 valid PDFs and reversed advisor pairs.
- Isolated lead integration tests verify all 22 PDF responses byte-for-byte and product/page attribution, along with existing validation, authentication, idempotency, rate limiting and backup tests.
- Read-only SEO audit passes 66 public routes and 219 structured-data blocks.
- Browser checks: Plastic filter returns products; glass search includes both clear epoxies; Uniweld form uses its own name; acrylic/HDHMR and glass/glass recommendations render correctly, including the alternative link.

## Unresolved infrastructure

Production Vercel still has no configured persistent lead database. Local integration tests use a disposable SQLite database and do not establish production durability. Gated downloads retain the existing fail-closed behavior: a failed lead save does not return a PDF or show a saved confirmation. Supabase connection details/configuration remain necessary for durable production leads.

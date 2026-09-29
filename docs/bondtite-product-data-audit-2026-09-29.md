# Bondtite product-data audit

Audit date: 29 September 2026. Live deployment: a99369882c98879ad44dcd1a175da66c528c6d39.

## Verdict

The catalogue is complete by product count, but not fully verified or technically complete. Several original pages still contain placeholder data, the latest additions were based mainly on product webpages, and important conflicts between Astral webpages and their linked TDS documents remain unresolved. The earlier statement that all pages were complete was too broad: route/build verification established availability, not factual completeness.

This is an audit only. No website content was changed or deployed during this review.

## Evidence and scope

- Re-fetched the [official brand listing](https://www.astraladhesives.com/brand/bondtite.html), all 37 unique linked product pages, and all 37 corresponding live beta pages. All returned HTTP 200.
- Downloaded and text-reviewed all 22 PDFs linked from those product pages; all returned valid PDF responses. These public documents are not necessarily Astral's latest internally approved versions.
- Checked source USP icons as well as descriptions, pack tables, applications, instructions, features and other details. This matters: Uniweld's acrylic identity and Fast and Clear's vertical-use claim appear in USP icons.
- Inspected product models, rendering, FAQs, metadata/schema, catalogue search/filter logic, advisor rules and TDS availability. Reproduced filter results from the exact current catalogue predicate.
- All 37 local product image URLs returned HTTP 200. This confirms availability, not that every image represents every current SKU. New source-image provenance and selected pack labels were checked; no claim of a full pixel-by-pixel image identity audit.
- No forms were submitted; no leads were created or private lead records read. No laboratory testing, approval certificate verification or validation of current saleable SKU availability was performed.

## Measured coverage

| Check | Result |
|---|---|
| Official unique products / beta product pages | 37 / 37 |
| Pack lists matching the official webpage | 27 products |
| Incomplete/missing pack lists despite web data | 7 products |
| No source webpage pack table, but packs exist in linked TDS | 3 products |
| Official product-linked TDS files found | 22 |
| Products configured for on-site gated TDS download | 1: Hydra+ |
| Official TDS files not connected to on-site downloads | 21 |
| Pages with generic fallback usage steps despite official instructions | 5 Quick variants |
| Products with no usage/storage detail or linked TDS on public source page | 8 specialist/industrial products |
| Product source links still pointing to Amazon | 5 Quick variants |

A matching pack list does not certify the rest of that page. The 27 matches are to current webpages, not to conflicting TDS pack lists.

## Priority findings in our website

### 1. Incorrect chemistry classification: Uniweld

Uniweld is assigned to epoxy adhesives in our data and therefore in its URL, category, related products and Product schema. Astral explicitly identifies it as an acrylic adhesive. Correct the chemistry, retain an appropriate application segment, and redirect the existing URL if it changes. [Official source](https://www.astraladhesives.com/bondtite-uniweld.html).

### 2. Mixing different timing concepts

Rapid's technical table labels its ten-minute setting time as Open time. Pot life, open time, clamp/support time, handling strength and full cure must be separate fields with test conditions. A single cure field is insufficient. Our Rapid instructions also omit the volume/weight basis available in its TDS.

### 3. Known missing packs

- Fast and Clear: add the 2 kg pack listed on the webpage.
- Super Strength: add the webpage's 900 g and 1.8 kg packs.
- Quick Spot-On: 10 g; Quick Gel: 3 g; Art & Craft: 10 g; Ultra Glue: 15 g; Quick Instant: 3 g. These five are currently missing all pack data.
- TDS-only pack information to reconcile/add: Acrylic Fix 500 g sausage; WPC Fix 600 mL; Wood 90 g, 320 g and 2 kg set.

Do not merge all historical web/TDS variants and label them currently available without confirming the active SKU list.

### 4. Placeholders are visible and break discovery

Examples under Compatible materials include Mixed substrates, Clear bond applications, Heat-exposed workflows, Brush application and Nozzle application. These are not actual substrate records. Five Quick summaries still mention the source workbook; the same content feeds metadata.

The material filter only offers Wood, Metal, Plastic and Foam and uses substring matching. It currently returns **zero results for Plastic**. Glass search omits Fast and Clear and Strong and Clear. Laminate search omits Aqua and Edge D3, despite explicit source uses. Model real material types and relationships, including specific plastics, rather than treating generic labels as compatibility evidence.

### 5. Incomplete practical instructions

Acrylic Fix and WPC Fix omit preparation and moisture-dependent application details, timing and the TDS exclusion for vertical use. Rubber contact-adhesive instructions lose useful both-surface/tack/full-strength detail. Quick Ultra has only generic fallback steps despite the official press/rest/cure sequence. Deluxe's current steps stop before pressing the assembled joint. Short copy should preserve the steps that change the outcome.

### 6. Missing technical data and document delivery

Only Hydra+ has a substantial physical-property table. Many other Technical details panels amount to category, packs and shelf life although PDF specifications are available. Import only checked properties with units, conditions and document version. Twenty-one available TDS files are not wired to the gated download flow. The existing lead-storage/Vercel issue was not retested here; a configured download is not proof of end-to-end delivery.

### 7. Missing limits and unsupported additions

TDS exclusions for particular plastics, immersion or vertical applications are often absent. These are product-selection facts and can be expressed plainly, not as intrusive warning banners. Pro's FAQ adds hybrid technology without support in the reviewed official source. Art & Craft's school-project recommendation is not established by the reviewed source; use the narrower supported craft description. Fast and Clear's thicker-formula/vertical-use claim **is** present in Astral's USP, so it should not be classified as invented.

### 8. Taxonomy mixes chemistry with application

Woodworking and Stone care are application segments; Epoxy and Rubber are chemistry families. The single category field makes Heatbond/Foambond/Multibond absent from the Rubber category, while Pro/Rapid are absent from Epoxy. Separate chemistry, segment, materials and use cases. Do not infer chemical identity solely from a merchandising category.

### 9. SEO/AEO inherits the same weak content

The JSON-LD parses, but it republishes generic material labels, incomplete descriptions and the wrong Uniweld category. Hydra's visible material list is broader than its structured data. Schema validity is not factual accuracy. Repair the central data first, then regenerate visible copy, FAQs, metadata and structured data together.

### 10. Advisor coverage is narrower than catalogue coverage

Current rules recommend four distinct products: Deluxe, Hydra+, Foambond and Acrylic Fix. The new 15 products are catalogue entries, not new advisor decision rules. Broader recommendations require verified material pairs, conditions and limitations, not automatic matching of every named material to every other one.

## Conflicts inside Astral's public sources

These should be resolved with Astral's approved product master/current TDS. They are not all errors introduced by our site.

| Product | Public-source discrepancy | Action |
|---|---|---|
| Fast and Clear | Website gives four-hour full strength and 12-month shelf life; linked May 2024 TDS gives one-hour usable strength, 24-hour full cure and two-year shelf life. Pack and support-time details also differ. | Confirm authoritative revision; keep strength stages distinct. |
| Aqua | Webpage advertises seven days of water resistance and seven hours in boiling water; April 2024 TDS states five days and six hours. | Do not present the stronger figures as reconciled/verified. |
| Clearbond | Webpage says 12 months; linked TDS says 18 months with storage conditions. | Obtain approved shelf-life statement. |
| PVC Bond | Webpage says one-year shelf life and lists 1/5/10 kg; TDS says 18 months and lists 1/5 kg. | Confirm formulation/revision and current SKUs. |
| Quik Spray | Website spray distance is 8–10 cm; TDS says 10–12 cm. | Confirm instruction. |
| WPC Fix | Website handling strength is 2–4 hours; TDS gives 2–3 hours. | Identify current instructions and conditions. |
| Strong and Clear | Website calls for 24-hour clamping; TDS describes one-hour support and 24-hour cure. Website 450 g versus TDS 500 g. | Confirm timing terminology and pack master. |
| Metallic / Rapid | Website clamp periods differ from TDS support periods. | Do not equate support, handling and cure. |
| White Paste | Brand/product icon says no resin-hardener mixing, but usage instructions and TDS explicitly require mixing. TDS uses clamping for the 4–6-hour period called setting on the webpage. | Retain correct mixing; resolve bad marketing text/terminology. |
| Hydra+, Deluxe, rubber range, Super Strength, Uniweld | Several webpage/TDS pack lists differ; shelf-life conditions are often more specific in TDS. | Date/source every field; do not silently union pack lists. |

Additional source defects: Fast and Clear's Features section contains electrical-insulation-tape copy and an unrelated tape standard; do not import it. White Paste's PDF shows different version numbers on its two pages. Several PDFs contain awkward units/typos, so machine extraction needs human table checks. Eight public specialist/industrial pages lack technical instructions/documents; that gap needs supplier input. No source ratings or certification claims were independently authenticated.

## Product-by-product review

Statuses below describe data quality, not independent certification. All pages and linked images are reachable. “Aligned summary” means the core published summary is supported; it does not mean a complete technical dossier.

| Product | Assessment | Specific gap/action | Evidence |
|---|---|---|---|
| [BONDTITE DELUXE](https://beta.bondtite.in/products/woodworking/bondtite-deluxe) | Incomplete | Web pack list matches. Material list omits laminate, veneer, MDF and other named boards. The on-site procedure stops before assembly/pressing; TDS supplies this. Technical properties and TDS pack differences need review. | [Astral](https://www.astraladhesives.com/bondtite-deluxe.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_deluxe.pdf) |
| [BONDTITE AQUA](https://beta.bondtite.in/products/woodworking/bondtite-aqua) | Source conflict | Web packs match. Site repeats webpage water-performance figures that differ from TDS. Expand materials and technical properties; resolve pack and shelf-life storage-condition differences. | [Astral](https://www.astraladhesives.com/bondtite-aqua.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_aqua.pdf) |
| [BONDTITE HYDRA+](https://beta.bondtite.in/products/woodworking/bondtite-hydra) | Mostly aligned; source conflict | Physical properties match linked TDS; webpage pack list and D3/formaldehyde-free claims have support. Existing source note acknowledges pack/storage differences. Structured material list is narrower than the visible page. | [Astral](https://www.astraladhesives.com/bondtite-hydra.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_hydra_.pdf) |
| [BONDTITE EDGE D3](https://beta.bondtite.in/products/woodworking/bondtite-edge-d3) | Incomplete | Web packs and D3 claim match. Restore laminate/mechanised-joinery applications, wet-assembly sequence and the source recommendation to press wood joints for 24 hours. No product-linked TDS found. | [Astral](https://www.astraladhesives.com/bondtite-edge-d3.html) |
| [BONDTITE HEATBOND](https://beta.bondtite.in/products/woodworking/bondtite-heatbond) | Incomplete; source conflict | 180°C claim and web packs supported. Real materials/use cases are replaced by generic workflow labels. Restore both-surface coating, tack development and strength-development instructions. TDS has additional packs. | [Astral](https://www.astraladhesives.com/bondtite-heatbond.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_heatbond_-_sr.pdf) |
| [BONDTITE FOAMBOND](https://beta.bondtite.in/products/woodworking/bondtite-foambond) | Incomplete; source conflict | Core chemistry and web packs supported. Missing named materials and 24-hour strength development; TDS and webpage pack lists differ. Needs rubber chemistry tag separate from woodworking segment. | [Astral](https://www.astraladhesives.com/bondtite-foambond.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_foam_bond_sr.pdf) |
| [BONDTITE MULTIBOND](https://beta.bondtite.in/products/woodworking/bondtite-multibond) | Incomplete; source conflict | Core summary/web packs supported, but structured materials are generic. Restore PVC flooring, HVAC, leather/rubber and upholstery uses plus application timings. TDS adds packs. | [Astral](https://www.astraladhesives.com/bondtite-multibond.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_multibond_sr.pdf) |
| [BONDTITE QUIK SPRAY](https://beta.bondtite.in/products/sprayable-rubber-adhesives/bondtite-quik-spray) | Incomplete; source conflict | Web packs supported. Spray distance differs between website and TDS. Missing 50% overlap instruction, real material tags, technical data and document access. | [Astral](https://www.astraladhesives.com/bondtite-quik-spray.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_quick_spray.pdf) |
| [BONDTITE ACRYLIC FIX](https://beta.bondtite.in/products/woodworking/bondtite-acrylic-fix) | Important omissions | TDS supplies missing 500 g sausage pack. Current short procedure omits preparation, moisture-dependent wipe guidance, handling/full-strength timing and vertical-use exclusion. Technical properties absent. | [Astral](https://www.astraladhesives.com/bondtite-acrylic-fix.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_acrylic_fix.pdf) |
| [BONDTITE WPC FIX](https://beta.bondtite.in/products/woodworking/bondtite-wpc-fix) | Important omissions; source conflict | TDS supplies missing 600 mL pack. Missing full preparation, moisture-dependent instructions and vertical-use exclusion. Website/TDS handling times differ. Material coverage too generic. | [Astral](https://www.astraladhesives.com/bondtite-wpc-fix.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_wpc_fix.pdf) |
| [BONDTITE MULTIFIX](https://beta.bondtite.in/products/woodworking/bondtite-multifix) | Incomplete | 435 g pack, broad use and main steps supported. Add named substrates, bead spacing, repositioning guidance and physical properties. Reconcile small webpage/TDS timing and edge-spacing differences. | [Astral](https://www.astraladhesives.com/bondtite-multifix.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_multifix.pdf) |
| [BONDTITE FAST AND CLEAR](https://beta.bondtite.in/products/epoxy-adhesives/bondtite-fast-and-clear) | Missing data; source conflict | 2 kg web pack omitted. Resolve website/TDS strength, shelf-life and pack differences. Replace generic material labels. Vertical-use claim is supported by official USP icon; not an invented claim. | [Astral](https://www.astraladhesives.com/bondtite-fast-and-clear.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_fast_clear_-_new_tds.pdf) |
| [BONDTITE PRO](https://beta.bondtite.in/products/stone-care/bondtite-pro) | Incomplete; unsupported wording | Web packs and four-hour holding strength supported. Expand actual uses/materials. The FAQ reference to hybrid technology is not supported by the reviewed official page. No product-linked TDS found. | [Astral](https://www.astraladhesives.com/bondite-pro.html) |
| [BONDTITE SUPER STRENGTH](https://beta.bondtite.in/products/epoxy-adhesives/bondtite-super-strength) | Missing data; source conflict | Web packs 900 g and 1.8 kg omitted. Generic material list prevents discovery. TDS provides distinct weight/volume ratios and pot life, absent from technical details; pack variants need reconciliation. | [Astral](https://www.astraladhesives.com/bondtite-super-strength.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_super_strength_-_new_tds.pdf) |
| [BONDTITE STRONG AND CLEAR](https://beta.bondtite.in/products/epoxy-adhesives/bondtite-strong-and-clear) | Incomplete; source conflict | 30-minute set and 15-minute pot life supported. Real glass/stone/metal materials absent from structured fields. Website and TDS differ on support/clamping guidance and 450/500 g pack. | [Astral](https://www.astraladhesives.com/bondtite-strong-and-clear.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_strong_clear_-_new_tds.pdf) |
| [BONDTITE RAPID](https://beta.bondtite.in/products/stone-care/bondtite-rapid) | Incorrect field; source conflict | Setting time is incorrectly stored/displayed as open time. Mix-ratio basis absent from on-site instructions. Website/TDS support timing and pack lists differ. | [Astral](https://www.astraladhesives.com/bondtite-rapid.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_rapid_-_new_tds.pdf) |
| [BONDTITE QUICK](https://beta.bondtite.in/products/cyanoacrylates/bondtite-quick) | Incomplete | 500 mg, shelf life and core usage match. Replace generic material tags; add technical properties and actual excluded materials. Do not equate initial bond development with full cure. | [Astral](https://www.astraladhesives.com/bondtite-quick.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_quick_-_new_tds.pdf) |
| [Bondtite Quick Spot-On](https://beta.bondtite.in/products/cyanoacrylates/bondtite-quick-spot-on) | Incomplete; outdated source | Official page exists; replace Amazon source link. Add 10 g pack, 12-month shelf life, actual materials/features and product-specific procedure. Current page exposes workbook placeholders. | [Astral](https://www.astraladhesives.com/bondtite-quick-spot-on.html) |
| [Bondtite Quick Gel Adhesive](https://beta.bondtite.in/products/cyanoacrylates/bondtite-quick-gel-adhesive) | Incomplete; outdated source | Official page exists; replace Amazon source link. Add 3 g pack, 12-month shelf life, named materials and nozzle/opening/application steps. Existing incompatible-material FAQ is supported. | [Astral](https://www.astraladhesives.com/bondtite-quick-gel.html) |
| [Bondtite Quick Art & Craft Glue](https://beta.bondtite.in/products/cyanoacrylates/bondtite-quick-art-and-craft-glue) | Incomplete; outdated source | Official page exists; replace Amazon source link. Add 10 g pack, 12-month shelf life/45-day opened-use guidance and actual procedure. School-use wording is not established by reviewed official sources. | [Astral](https://www.astraladhesives.com/bondtite-quick-art-craft.html) |
| [Bondtite Quick Ultra Glue Brush & Nozzle](https://beta.bondtite.in/products/cyanoacrylates/bondtite-quick-ultra-glue-brush-and-nozzle) | Incomplete; outdated source | Official page exists; replace Amazon source link. Add 15 g pack, shelf/opened life and brush/nozzle method. Missing 30-second press, 10-minute undisturbed period and 24-hour cure. | [Astral](https://www.astraladhesives.com/bondtite-quick-ultra-glue.html) |
| [Bondtite Quick Instant Adhesive](https://beta.bondtite.in/products/cyanoacrylates/bondtite-quick-instant-adhesive) | Incomplete; outdated source | Official page exists; replace Amazon source link. Add 3 g pack, shelf/opened life, named materials and actual instructions. Preserve the source qualification on the five-second initial bond claim. | [Astral](https://www.astraladhesives.com/bondtite-quick-instant.html) |
| [Bondtite Metallic](https://beta.bondtite.in/products/epoxy-adhesives/bondtite-metallic) | Mostly aligned; source conflict | Web packs, main uses, finish and procedure represented. Web/TDS support times differ. Missing pot life, other physical properties and application exclusions. | [Astral](https://www.astraladhesives.com/bondtite-metallic.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_metallic_-_new_tds.pdf) |
| [Bondtite White Paste](https://beta.bondtite.in/products/epoxy-adhesives/bondtite-white-paste) | Mostly aligned; source conflict | Packs and mixing procedure supported. Source icon wrongly says no mixing; our mixing instruction is preferable. TDS labels 4–6 hours as clamping; website labels setting. Missing broader technical details. | [Astral](https://www.astraladhesives.com/bondtite-white-paste.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_white_paste-tds.pdf) |
| [Bondtite Wood](https://beta.bondtite.in/products/epoxy-adhesives/bondtite-wood) | Incomplete | Core uses and 1:1 volume mixing supported. Pack table empty on source webpage, but linked TDS lists 90 g, 320 g and 2 kg set. Pot life and technical properties not imported. | [Astral](https://www.astraladhesives.com/bondtite-wood.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_wood.pdf) |
| [Clearbond](https://beta.bondtite.in/products/synthetic-rubber-adhesives/clearbond) | Source conflict; incomplete | Web packs and procedure supported. Site follows webpage 12-month life, while TDS states 18 months with conditions. Missing storage and technical properties available in TDS. | [Astral](https://www.astraladhesives.com/clearbond.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_clearbond.pdf) |
| [Bondtite Total](https://beta.bondtite.in/products/epoxy-adhesives/bondtite-total) | Incomplete; source terminology | Web packs/main instructions supported. Weight versus volume ratio absent; TDS pot life and webpage use-within time should stay separate. Material exclusions and technical properties missing. | [Astral](https://www.astraladhesives.com/bondtite-total.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_total_-_new_tds.pdf) |
| [Bondtite Uniweld](https://beta.bondtite.in/products/epoxy-adhesives/bondtite-uniweld) | Incorrect category | Our epoxy category contradicts official acrylic USP. Core packs and two-surface A/B method match webpage, but TDS also gives equal quantities. Expand materials/uses, restrictions and technical details. TDS pack list includes 60 g. | [Astral](https://www.astraladhesives.com/bondtite-uniweld.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/b/o/bondtite_uniweld_-_new_tds_1.pdf) |
| [Bondtite PVC Bond](https://beta.bondtite.in/products/woodworking/bondtite-pvc-bond) | Mostly aligned; source conflict | Web packs and one-versus-two-surface instruction are correct. TDS has different shelf life/packs; missing specified open time, handling/full-strength timings and technical properties. | [Astral](https://www.astraladhesives.com/bondtite-pvc-bond.html) · [TDS](https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_pvc_bond.pdf) |
| [Bondtite Viscoclear](https://beta.bondtite.in/products/epoxy-adhesives/bondtite-viscoclear) | Aligned summary; source-limited | Name, packs, gloss, viscosity and listed craft applications represented. Official page has no usage/storage details or linked TDS. Request missing technical documents; generic substrate wording is not a verified compatibility matrix. | [Astral](https://www.astraladhesives.com/bondtite-viscoclear.html) |
| [Bondtite Rhiomet](https://beta.bondtite.in/products/epoxy-adhesives/bondtite-rhiomet) | Aligned summary; source-limited | Name, packs, bangle uses and gloss/pigment features represented. No source usage/storage details or linked TDS found. Need verified mixing, cure, shelf-life and viscosity values. | [Astral](https://www.astraladhesives.com/bondtite-rhiomet.html) |
| [Bondtite Zoro](https://beta.bondtite.in/products/epoxy-adhesives/bondtite-zoro) | Aligned summary; source-limited | Name, packs, applications/features represented. Official image actually displays Bondtite Zoro despite legacy bondgrip filename. No source usage/storage details or linked TDS found. | [Astral](https://www.astraladhesives.com/bondtite-zoro.html) |
| [Bondtite AST FR1203 / AST FH7203](https://beta.bondtite.in/products/industrial-adhesives/bondtite-ast-fr1203-ast-fh7203) | Aligned summary; source-limited | Pack list and core flooring, structural, railway and electrical applications represented. Public source lacks mixing/cure/storage data and linked TDS. Numeric performance and chemical-resistance specification still needed. | [Astral](https://www.astraladhesives.com/bondtite-ast-fr1203-ast-fh7203.html) |
| [Bondtite MMA 999A / MMA 999B](https://beta.bondtite.in/products/industrial-adhesives/bondtite-mma-999a-mma-999b) | Aligned summary; source-limited | MMA chemistry, packs and core structural/auto/marine/composite uses represented. Contamination tolerance is omitted from summary features. Public source lacks technical procedure/document. | [Astral](https://www.astraladhesives.com/bondtite-mma-999a-mma-999b.html) |
| [Bondtite AST FR1201 / AST FH7201](https://beta.bondtite.in/products/industrial-adhesives/bondtite-ast-fr1201-ast-fh7201) | Aligned summary; source-limited | Packs, named substrates and main uses represented. Public source lacks technical procedure/document. Confirm differentiation from neighbouring AST systems using approved specifications. | [Astral](https://www.astraladhesives.com/bondtite-ast-fr1201-ast-fh7201.html) |
| [Bondtite AST FR1202 / AST FH7601](https://beta.bondtite.in/products/industrial-adhesives/bondtite-ast-fr1202-ast-fh7601) | Aligned summary; source-limited | Packs, named substrates and main uses represented. Public source lacks technical procedure/document. Confirm differentiation from neighbouring AST systems using approved specifications. | [Astral](https://www.astraladhesives.com/bondtite-ast-fr1202-ast-fh7601.html) |
| [Bondtite AST FR4202 / AST FH4102](https://beta.bondtite.in/products/industrial-adhesives/bondtite-ast-fr4202-ast-fh4102) | Aligned summary; source-limited | 40 kg pack and grouting/concrete/masonry uses represented. Public source lacks mixing ratio, injection/cure conditions, shelf life and linked TDS. Honeycomb-panel entry follows the source, not a verified substrate-pair rule. | [Astral](https://www.astraladhesives.com/bondtite-ast-fr4202-ast-fh-4102.html) |

## Recommended correction order

1. Correct Uniweld classification and Rapid's timing label; remove unsupported wording.
2. Resolve material source conflicts with Astral technical/product owners, prioritising Aqua and Fast and Clear. Keep unresolved facts explicitly tracked in the internal data register.
3. Complete Quick variants and missing packs using official sources; confirm current SKU availability where TDS differs.
4. Restore outcome-critical instructions, ratios, exclusions and technical properties from approved TDS versions.
5. Connect the 21 available documents and verify actual download/lead persistence after the backend is configured.
6. Normalise chemistry/segment/material fields; fix search, comparison and schema. Expand advisor rules only with application evidence.
7. Recheck all 37 visible pages against a field-level product master containing source URL, document version/date, units, review date and approval status.

## Implementation locations

- lib/products.ts: original products, classification, material fields, FAQs and default/fallback data.
- lib/verified-astral.ts: selected summaries, packs, short procedures, features and shelf/storage values for the original range. The filename is not evidence of current field-level verification.
- lib/additional-products.ts: 15 new products, including Uniweld classification.
- components/product-detail-page.tsx: Hydra-specific overrides, displayed specifications and instructions.
- components/product-page.tsx: material/search predicates and compare table.
- lib/documents.ts and app/api/tds/route.ts: Hydra-only download support.
- app/products/[category]/[product]/page.tsx: metadata and Product/FAQ schema.
- lib/advisor-rules.ts: current four-product recommendation coverage.

Evidence snapshots and extracted TDS text were kept in /tmp/bondtite-audit for this audit. No complete third-party website copy is included in this report.

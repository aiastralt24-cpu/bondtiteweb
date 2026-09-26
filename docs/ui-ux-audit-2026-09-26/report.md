# Bondtite UI/UX audit

26 September 2026. Full screenshot report: [report.html](./report.html).

Verdict: coherent visual foundation; unresolved conversion and continuity issues. No UI fixes applied during audit.

## 1. P1: Contact success is out of view

Mobile contact submission saves successfully, but removing the long form leaves the viewport at the footer. The success message was 878px above the viewport after submission. This reproduces the user’s concern that submitting does nothing.

Recommendation: Focus a success heading and bring it into view after the saved response. Preserve entered data on failure. Replace “lead inbox” with what the customer should expect next.

Evidence: 15-contact-mobile.png, 16-contact-confirmation.png.

## 2. P1: Advisor answers disappear when returning from a product

Selected Plywood + Laminate + Kitchen/bathroom, received Hydra+, opened its product, then used Back (past the product anchor entry). The advisor returned with no selected inputs. The old scroll position put the user near the footer.

Recommendation: Persist non-sensitive choices in the URL or session state and restore the result and an appropriate scroll position. Add a clear restart control. If browser storage is introduced, update the Cookie Policy.

Evidence: 11-advisor-result-mobile.png, 14-advisor-back-reset.png.

## 3. P1: The same Hydra+ document has two conflicting journeys

Resources labels Hydra+ technical/safety documents “Available on request” and offers Request TDS / SDS, while the Hydra+ product provides an immediate gated TDS download. Users taking the resource route are unnecessarily sent to an enquiry.

Recommendation: Use the same document-availability data and gated TDS component in both places. Keep SDS separate where it must be requested.

Evidence: 21-resources.png, 22-tds-mobile.png.

## 4. P2: Advisor coverage is narrower than the catalogue suggests

The material-first flow offers Wood, Plywood, MDF, Laminate, Foam, Leather and Acrylic. Metal, stone, ceramic and general plastic are absent although catalogue products cover broader work. The generic “Choose materials” entry does not explain that coverage.

Recommendation: Either explicitly scope the advisor or add manufacturer-verified journeys for the broader range. Provide named material choices that can lead to helpful human support even when no verified automatic match exists. Do not guess adhesive suitability.

Evidence: 27-advisor-material-coverage.png, 08-advisor-start.png.

## 5. P2: Comparison does not expose the decisive differences

Deluxe versus Aqua shows identical category and listed-material rows, prose summaries and pack sizes. It is readable but gives limited help deciding between adjacent wood adhesives.

Recommendation: Add verified use cases, water-resistance classification, setting/open-time guidance and suitable applications where available. Emphasise differences and mark genuinely unavailable data plainly.

Evidence: 07-compare.png, 04-catalogue.png.

## 6. P2: Mobile contact entry asks for attention before action

At 390 × 844, the headline, introduction and decorative subheading use much of the first screen. The first form field begins about 640px down. The form then asks for several optional fields before the actual project details.

Recommendation: Reduce the mobile introduction and move the essential fields higher. Group optional information behind a clearly labelled optional area. Show a customer-facing confirmation with a readable reference.

Evidence: 15-contact-mobile.png, 17-contact-success-content.png.

## 7. P2: Secondary product content does not match Hydra quality

Quick Gel’s hero says “Applications include Gel application, Controlled application.” This names a format rather than a useful job or material. “Cyanoacrylates” also replaces the friendlier “Instant adhesives” terminology used in the catalogue. Rendered page text contains workbook-oriented fallback wording.

Recommendation: Apply the same useful information standard across products: what it joins, where it is used, what differentiates it and verified instructions. Use customer terminology first, chemistry as supporting detail.

Evidence: 26-secondary-product.png, 12-product-mobile.png.

## 8. P2: Small utility typography weakens practical reading

The mobile catalogue filter labels measure 10px and comparison labels 11px. Product-card descriptions and several helper links are visually small relative to large headings and images. Compare targets do measure 44px high, so small text is a readability issue, not a confirmed target-size failure.

Recommendation: Raise useful labels to 12–14px and core reading text to approximately 15–16px, preserving a clear hierarchy. Check at 200% zoom and with real users before declaring accessibility conformance.

Evidence: 24-catalogue-mobile.png, 04-catalogue.png.

## 9. P2: Technical resources have weak navigation visibility

The Resources page exists and contains a document selector and guides, but no Resources destination was present in the inspected primary navigation or footer navigation. A technical visitor must discover an indirect route or already know the URL.

Recommendation: Add a clearly named Technical resources link in the footer and an appropriate product/support navigation location. Avoid expanding the primary navigation indiscriminately.

Evidence: 21-resources.png, 03-mobile-menu.png.

## 10. P2: Keyboard users lack a skip-to-content route

The rendered homepage contains a main landmark but no skip link. Keyboard users must pass through repeated navigation before reaching the page’s task. Menu Escape focus return works.

Recommendation: Add a focus-visible skip link and a stable main-content target across public templates. Audit full keyboard order and screen-reader announcements separately.

Evidence: 01-home-desktop.png, 03-mobile-menu.png.

## 11. P2: Obviously unusable phone numbers pass form validation

Both audited contact and TDS submissions accepted 0000000000 and stored their explicitly labelled test records. This verifies storage, but also demonstrates that the input check is mostly length and character validation.

Recommendation: Reject obvious repeated-digit placeholders with a helpful inline message while keeping legitimate international formats supported. Do not add OTP friction unless the business requires verified phone ownership.

Evidence: 17-contact-success-content.png, 23-tds-confirmation.png.

## 12. P3: Product navigation needs a clearer mobile overflow affordance

The sticky section navigation is usable and Technical details receives aria-current=location. At 390px it scrolls horizontally, with the edge of Overview clipped after moving across the strip. The final destination is readable after scrolling finishes.

Recommendation: Keep the active tab visible, provide subtle edge fades and sufficient target spacing, and verify anchor behaviour with reduced motion. Avoid making the whole page scroll horizontally.

Evidence: 13-product-technical-mobile.png, 12-product-mobile.png.

## 13. P3: Some supporting copy still describes the removed input flow

Furniture & joinery tells users to “Describe your task” beside the advisor link, but the current advisor begins with selections rather than free text. This is a small but avoidable expectation mismatch.

Recommendation: Use “Choose your job or materials” consistently and review other advisor entry points for outdated promises.

Evidence: 18-application-desktop.png, 08-advisor-start.png.

## Journey coverage

1. **Landing page: Healthy foundation.** Clear adhesive context, visible advisor and range links, consistent palette. Mobile hero fits without observed horizontal overflow. Tiny product-caption copy adds little value.

2. **Mobile navigation: Healthy in sampled interaction.** Menu opens with all main destinations; Escape closes it and returns focus to Menu. No skip link was found on the homepage.

3. **Catalogue and search: Works; readability needs refinement.** Hydra search reduced the result count; nonsense search returned an explicit empty state and recovery control. Clear filters restored the range. Mobile filters fit, but utility labels are very small.

4. **Product comparison: Functional; decision support is limited.** Two selected products open a readable comparison dialog with labelled close control and initial close-button focus. The content does not yet expose enough decisive differences.

5. **Product advisor: Useful result; return journey fails.** Material chips produce a Hydra+ recommendation with reason, application guidance and source link. Back from the product loses the selected answers and leaves the page at a confusing scroll location. Coverage is limited.

6. **Product detail: Strong Hydra template; uneven content elsewhere.** Hydra image, actions, specifications and section navigation work on mobile. The active section is identified semantically. Quick Gel shows weaker information and inconsistent category terminology.

7. **Contact form: Submission works; completion feedback fails visually.** Empty submission focused the required name field. A labelled local test lead was successfully stored, but the resulting viewport showed the footer rather than success. Scrolling up revealed the confirmation.

8. **TDS request: Improved and functional in sampled flow.** A labelled local test submission stored one TDS record and showed a distinct success state. Keyboard focus moved to Close. Download again was available. Actual PDF opening and delivery across external browsers were not verified.

9. **Application and category entry: Visually coherent; copy refinement needed.** Both layouts use the same outer alignment and readable content groups. The application page’s advisor description refers to a removed text-entry flow. Product choices appear after substantial introductory space.

10. **About page: Healthy sampled section.** Brand statement heading and body now have a balanced hierarchy. The timeline heading starts on the same left axis as other headings. This was a sampled section, not a complete timeline-motion test.

11. **Technical resources: Material journey inconsistency.** Document selector is visible, but Hydra+ is presented as request-only despite its working download elsewhere. Resource navigation is hard to discover.

12. **Policies and footer: Readable; prioritisation can improve.** Mobile policy navigation and body copy fit the screen. Footer contact and legal links are visible. Contact information repeats between the contact page and footer. The mobile policy contents list consumes much of the first screen but remains usable.
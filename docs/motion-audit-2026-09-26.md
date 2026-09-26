# Bondtite motion audit

Audited 26 September 2026. This report proposes changes; it does not implement animations.

## Direction

Keep the Hydra application sequence as the signature motion moment. Support it with quick, consistent feedback on cards, navigation, forms and advisor answers. Motion should explain the relationship between an action and its result. Reading, selecting a product and submitting an enquiry must never wait for decoration.

## Evidence and scope

Reviewed the shared animation controller, GSAP lifecycle hook, homepage material story and video, header/mobile menu, product section navigation and stack, category/application card styles, catalogue filtering, advisor, contact/TDS forms, and reduced-motion CSS.

Live browser samples this turn: homepage at 1280×720 at the top, campaign film and footer; Hydra product page at 1280×900; advisor at 390×844. Category/application layouts and advisor interactions were also inspected during the preceding implementation turns. About, contact and catalogue motion recommendations below are source-reviewed rather than a new full interaction recording of those routes.

The browser's restricted evaluation surface did not expose `document.getAnimations()`. Computed CSS animation names are observable, but `animation-play-state: running` alone does not show whether a finite animation has already finished. No FPS, main-thread trace, heap profile or production-device benchmark was collected. Do not interpret this as a performance certification. Git status was unavailable because the local Xcode licence has not been accepted; no application code was changed for this audit.

## Findings, in priority order

### 1. Campaign video continues playing offscreen

**Observed:** the video started while visible. At scroll position 4150.5, its bounding rectangle was entirely above the viewport (top −2618px, bottom −1958px); it remained unpaused at 13.25 seconds. The source observer exits when out of view and never pauses playback. It also lacks an ongoing document-visibility listener and reduced-motion check for automatic playback.

**Owner:** `components/campaign-dvc.tsx:13–28`.

**Change:** pause automatically started video when it leaves view or the tab becomes hidden. Disable autoplay for reduced motion. Resume only according to a clear policy; never restart a video the visitor deliberately paused. Preserve the manual play button and native controls. Handle the play-promise race if visibility changes before playback begins.

**Acceptance:** currentTime stops advancing offscreen; manual controls still work; no automatic playback under reduced motion.

### 2. New page layouts are missing from the shared entrance system

**Source finding:** `components/site-motion.tsx:14–16` targets the previous category and product hero selectors. It omits `.product-split`, `.range-intro`, `.range-product-card`, `.task-advisor` and the new shared range sections. The result is different motion treatment across otherwise consistent designs. Hydra's split hero had no shared reveal marker in the live sample.

**Change:** use explicit, small reveal groups on maintained components rather than expanding a long selector list indefinitely. Use a light heading entrance and row-level card stagger. Do not put transforms on sticky panel containers or animate both a parent and all its children.

**Acceptance:** new layouts get the same timing language; text remains visible without JS; no replay on small reverse scrolls; no delayed CTA interaction.

### 3. Advisor answers and form confirmation replace content abruptly

**Source finding:** the advisor conditionally replaces its entry, questions and product answer with no transition. Selecting a condition can change a result's image, name and text at once. Form success similarly replaces the contact form.

**Owners:** `components/bond-finder.tsx`, `components/contact-desk.tsx`, `components/tds-download.tsx`.

**Change:** animate only newly appearing questions and changed result content: 160–220ms opacity with 6–8px rise. Keep previously answered questions, focus and scroll position stable. Animate the changed product block, not the full page. Preserve status announcements. Avoid fake typing indicators or waits.

**Acceptance:** rapid changes cancel obsolete transitions; the latest answer wins; keyboard focus is never lost; reduced motion updates instantly.

### 4. Reveal registration does not cover newly inserted filter results

**Source finding:** SiteMotion gathers targets once per pathname. Catalogue cards inserted after filters change are not necessarily observed. Existing cards and newly mounted cards can behave differently.

**Owners:** `components/site-motion.tsx:14,46,54`, `components/product-page.tsx:25–29,66`.

**Change:** own result transitions inside the catalogue component. Use a quick result-group fade and small positional adjustment. Coalesce rapid search updates and preserve focus in the search field. Do not stagger all 22 cards for every keystroke or replay entrance effects on every filter adjustment.

### 5. Mobile menu uses a fixed max-height animation

**Source finding:** `.mobile-nav` animates between 0 and 420px in `app/globals.css:288–295`. This ties animation timing to an arbitrary height and involves layout work. Actual jank was not measured.

**Change:** consider a contained menu panel with a short opacity/transform entrance, or a correctly measured expansion if pushing content remains intentional. Keep the current Escape, inert and focus-return behaviour. Verify zoom, taller text and every navigation item before changing the pattern.

### 6. Existing stacking safeguards are worth retaining

**Observed:** at 1280×900, Overview, Applications and How to use qualified for stacking; the 728px Technical details panel did not. The component correctly leaves taller panels in normal flow. Source also disables stacking under reduced motion and below its desktop/height breakpoint.

**Owners:** `components/product-panel-stack.tsx`, `app/product-story.css`.

**Recommendation:** retain these constraints. Add no extra card zoom, blur or rotation. Apply subtle entrance effects inside a card only if they do not compete with the scroll stack. Keep the active section highlight and verify back/forward/hash navigation.

## Page-by-page choreography

| Area | Proposed motion | Trigger and limits | Priority |
| --- | --- | --- | --- |
| Homepage hero | Refine existing pack, headline and CTA entrance | Once per page entry; CTA immediately usable; no persistent floating | Medium |
| Homepage job links | Existing gentle background/colour response | Hover on fine pointers; equivalent focus styling | Low |
| Hydra craft sequence | Keep the existing prepare/apply/press demonstration; synchronise copy and material movement | Desktop scroll; explicit buttons and static layout on smaller screens | Medium |
| Campaign film | Pause/resume lifecycle correction | Viewport, visibility and deliberate user playback | First |
| Product catalogue | Quick filtered-result transition; calm compare-tray entrance | Only on committed UI changes, never per-card delays while typing | High |
| Category/application intros | Heading followed by supporting copy, 40ms stagger | Once on entry, 8–12px maximum rise | Medium |
| Category/application product cards | Row-based reveal plus subtle pack lift | 40–50ms stagger capped at 150ms; hover movement only with fine pointer | High |
| Product detail hero | Pack and copy enter as two coordinated groups | 400–500ms; 60–80ms separation; no pack spinning | Medium |
| Product section navigation | Short underline/colour transition | Selection and scroll state; preserve anchor accuracy | Medium |
| Product information panels | Keep adaptive stacking | Desktop only when card fits; normal flow otherwise | Keep |
| Advisor | Immediate question entrance and result crossfade | 160–220ms; no artificial delay or forced scroll | First |
| Contact form | Calm focus treatment, pending feedback, success transition | On actual state change; no shaking errors or moving fields | High |
| TDS dialog | Small fade/scale entrance and quick exit | 180–220ms, scale .98→1; keep native dialog focus behaviour | High |
| FAQs | Smooth disclosure plus restrained indicator rotation | 180–220ms, accurate content height; semantic details preserved | Medium |
| About | Keep limited hero/parallax; avoid reversing every heading reveal | Desktop enhancement only; supporting copy reveals once | Low |
| Footer | One optional heading reveal, ordinary link feedback | No continuously animated logo, footer parallax or repeat CTA pulse | Low |
| Navigation between pages | Prefer fast native navigation; optional short new-content fade later | Never an exit animation that delays a link or obscures loading | Last |

## Shared motion specification

These are proposed design targets, not measured performance figures:

- Press/hover: 140–180ms; up to 2–3px movement.
- Changed answers, chips, result feedback: 180–240ms; 6–8px offset.
- Dialogs/menu panels: 200–260ms; opacity/transform.
- Section entrances: 400–500ms; 8–16px offset.
- Major homepage entrance: finish within about 900ms.
- Stagger: 40–60ms; cap combined waiting at 150–180ms.
- Shared easing: existing cubic-bezier(.22,1,.36,1) for entrances; simple ease-out for small controls.
- Prefer transform and opacity. Limit height animation to contained disclosures when needed. Avoid animated large blur/shadow surfaces.

Existing CSS already defines motion tokens, but many newer rules use independent timing values. Consolidate these gradually in one source rather than layering more overrides.

## What to avoid

No scroll hijacking, custom cursor, magnetic buttons, spinning packs, looping cards, staggered letters in body text, page loaders for decoration, autoplay background videos on every page, or animated technical-table rows. These make browsing harder and compete with the one useful product demonstration.

## Implementation order

1. Correct campaign playback lifecycle and maintain reduced-motion behaviour.
2. Add advisor result/question and contact/TDS state transitions.
3. Connect product/range introductions and card rows to the shared system.
4. Add filter-result, menu and disclosure transitions.
5. Refine the existing homepage/About choreography only after the above works well.

## Verification plan for the implementation

Test 390×844, 1280×720 and 1280×900; normal and reduced motion; keyboard, touch and pointer; fast repeated selections; filtered empty states; long product names; browser back/forward; and navigation while transitions are active. Confirm image dimensions stay reserved and technical content remains readable without JS. Check visible media starts correctly and offscreen media stops. Use a production build and a device performance trace before making smoothness or frame-rate claims.

Success is a consistent sense of response and continuity, with the product and the visitor's task always more prominent than the animation.

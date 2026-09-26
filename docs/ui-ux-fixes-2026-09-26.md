# UI/UX audit follow-up

Implemented:
- Contact confirmation receives focus and scrolls into view after the server confirms storage. Customer-facing copy and a shortened reference replace internal inbox terminology.
- Advisor task/material/location choices persist for the tab session. Returning from a product restores the result and focuses the guidance panel. Change task resets choices. Cookie notice updated.
- Resources and product pages share TDS availability and the gated download component; SDS remains a separate request.
- Additional named material choices lead to an enquiry with the selected surfaces when no verified automatic recommendation exists. No unverified compatibility rules added.
- Comparison includes known feature and water-resistance information.
- Mobile contact introduction shortened and optional fields grouped after enquiry details.
- Catalogue utility labels enlarged; technical resources linked in the footer.
- Keyboard skip link and main-content targets across page templates.
- Obvious repeated-digit phone placeholders rejected on client and server.
- Instant adhesive terminology and Quick Gel introductory copy improved; workbook fallback FAQ replaced with customer-facing source guidance.
- Product navigation respects reduced-motion when programmatically scrolling; active tab visibility retained.
- Application-page advisor entry copy now describes choosing jobs/materials.

Verified locally: TypeScript, production build, targeted ESLint, isolated lead API regression suite (including placeholder rejection), advisor product/Back restoration, visible mobile contact confirmation, resources TDS dialog, mobile resource overflow.

Remaining content work: manufacturer-approved details are still needed for catalogue gaps; broader material choices do not imply new automatic compatibility recommendations. Full device, screen-reader, zoom and contrast certification has not been performed.

Deployment: existing GitHub main is connected to Vercel project bondtiteweb, with beta.bondtite.in attached. On inspection the project has no environment variables. The local SQLite backend requires persistent hosting or migration to an external database before Vercel production forms can save leads. Do not redirect SQLite to /tmp: ephemeral storage is not a production database.

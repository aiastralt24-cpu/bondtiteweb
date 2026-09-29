# Application expansion

Expanded the four fixed three-product lists into curated job groups and added two application pages. All 37 catalogue products now have at least one explicit placement; adding a future product still requires reviewing its supported applications.

- Furniture & joinery: 10 products across wood joints, lamination, speciality panels and wood repair.
- Construction & fixing: 8 across panel fixing, stone work, metal repair and flooring/contact bonding.
- Home repairs & DIY: 13 across instant repairs, epoxy repairs, crafts and coverage.
- Auto & upholstery: 8, with upholstery, automotive interiors and rigid-part repair kept distinct.
- Bangles & decorative crafts: Viscoclear, Rhiomet and Zoro.
- Industrial bonding & concrete repair: five AST/MMA systems grouped by structural/flooring, composite assembly and injection grouting.

Each product card explains its relevance to the job. Anchor navigation jumps to job groups. Instructions and FAQs describe the different adhesive methods rather than applying one product's instructions to the whole category. Homepage links, metadata, sitemap and llms application links follow the same six-page data source.

Evidence: official Astral application sections reviewed in the catalogue audit, referenced through each product's sourceUrl. No ratios or cure schedules were invented for industrial products without published instructions. Generic fabric/trim suitability and blanket construction recommendations were removed.

Validation: production build, TypeScript and changed-source ESLint passed. Catalogue checks verify all group references and coverage of 37 unique products. The read-only SEO audit passed 68 routes and 225 schema blocks. Browser checks verified the application directory, job navigation, contextual cards and a 390px mobile viewport without horizontal overflow.

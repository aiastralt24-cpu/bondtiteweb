import type { Resource } from "@/lib/types";

export function TechnicalProof({ resources }: { resources: Resource[] }) {
  const tdsFiles = [
    { name: "Bondtite Hydra+", meta: "PVA · D3 · 1.2 MB" },
    { name: "Bondtite Rapid", meta: "Epoxy · 10 min · 1.4 MB" },
    { name: "Bondtite Multifix", meta: "Specialty · 0.9 MB" },
    { name: "Bondtite Strong & Clear", meta: "Clear bond · 0.8 MB" }
  ];
  const guides = [
    {
      meta: "PVA · Joinery",
      title: "Edge banding MDF and boards",
      readTime: "6 min read"
    },
    {
      meta: "Epoxy · Stone",
      title: "Bonding stone, metal and ceramic",
      readTime: "8 min read"
    },
    {
      meta: "CA · Repair",
      title: "Fast clear fixes for trims",
      readTime: "4 min read"
    }
  ];

  return (
    <section className="section proof" id="resources">
      <div className="container">
        <div className="resource-head">
          <div>
            <span className="mono">05 / Resources</span>
            <h2 className="display section-title">
              Everything trade <span className="accent">needs.</span>
            </h2>
          </div>
          <p>
            Technical data, application guides, video tutorials, dealer locator
            and a direct line to our trade desk. The full toolkit, no signup
            required.
          </p>
        </div>

        <div className="resource-grid">
          <article className="resource-panel resource-panel--tds">
            <div className="resource-panel__top">
              <span className="mono">TDS library</span>
              <span>27 documents</span>
            </div>
            <h3>Technical data, before the sale.</h3>
            <p>
              Every Bondtite SKU publishes substrate fit, open time, cure
              profile, environmental specs and safety guidance.
            </p>
            <label className="resource-search">
              <span aria-hidden="true">Search</span>
              <input
                aria-label="Search technical data sheets"
                placeholder="Search by product name, SKU or substrate"
              />
            </label>
            <div className="tds-list">
              {tdsFiles.map((file) => (
                <a href="#contact" key={file.name}>
                  <span className="tds-icon" aria-hidden="true">PDF</span>
                  <span>
                    <strong>{file.name}</strong>
                    <small>{file.meta}</small>
                  </span>
                  <em>PDF</em>
                </a>
              ))}
            </div>
            <a className="resource-panel__link" href="#contact">
              Browse all 27 TDS files →
            </a>
          </article>

          <article className="resource-panel resource-panel--guides">
            <div className="resource-panel__top">
              <span className="mono">Application guides</span>
              <span>12 articles</span>
            </div>
            <h3>Step-by-step, by trade.</h3>
            <p>
              Practical workflows for carpenters, contractors and fabricators:
              prep, spread, clamp, cure and troubleshoot.
            </p>
            <div className="guide-grid">
              {guides.map((guide, index) => (
                <a className="guide-card" href="#contact" key={guide.title}>
                  <span className={`guide-card__media guide-card__media--${index + 1}`} />
                  <span className="mono">{guide.meta}</span>
                  <strong>{guide.title}</strong>
                  <small>{guide.readTime}</small>
                </a>
              ))}
            </div>
          </article>

          <div className="resource-proof-strip">
            {resources.slice(1).map((resource) => (
              <article key={resource.code}>
                <span className="mono">{resource.code}</span>
                <h3>{resource.title}</h3>
                <p>{resource.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

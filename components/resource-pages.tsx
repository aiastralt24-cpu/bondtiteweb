import { siteResources, type SiteResource } from "@/lib/site";

export function ResourcesPage() {
  return (
    <main>
      <section className="index-hero">
        <div className="container index-hero__grid">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span>Resources</span>
            </nav>
            <h1 className="display">
              Technical proof, guides and <span className="accent">support.</span>
            </h1>
            <p>
              A crawlable resource library for data sheets, application guides,
              standards, dealer support and product selection help.
            </p>
          </div>
          <div className="index-hero__panel">
            <span className="mono">Resource library</span>
            <strong>{siteResources.length} core resources</strong>
            <p>TDS, guides, certificates and support routes.</p>
          </div>
        </div>
      </section>

      <section className="section listing-section">
        <div className="container resource-listing-grid">
          {siteResources.map((resource) => (
            <article className="resource-row" key={resource.slug}>
              <span className="mono">{resource.type}</span>
              <h2>{resource.title}</h2>
              <p>{resource.description}</p>
              <a href={`/resources/${resource.slug}`}>Open resource</a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export function ResourceDetailPage({ resource }: { resource: SiteResource }) {
  return (
    <main>
      <section className="index-hero">
        <div className="container index-hero__grid">
          <div>
            <nav className="breadcrumbs" aria-label="Breadcrumb">
              <a href="/resources">Resources</a>
              <span>{resource.title}</span>
            </nav>
            <h1 className="display">
              {resource.title} <span className="accent">{resource.type}.</span>
            </h1>
            <p>{resource.description}</p>
          </div>
          <div className="index-hero__panel">
            <span className="mono">{resource.type}</span>
            <strong>{resource.readTime}</strong>
            <p>{resource.related.join(", ")}</p>
          </div>
        </div>
      </section>

      <section className="section resource-detail">
        <div className="container resource-detail__grid">
          <article>
            <span className="mono">Overview</span>
            <h2 className="display">What this resource covers.</h2>
            <p>
              This page is structured to give trade users a clear, indexable
              answer before they download a PDF or contact the trade desk. It can
              later be connected to CMS-managed files, videos and certificates.
            </p>
          </article>
          <aside className="spec-table">
            {resource.related.map((item) => (
              <div key={item}>
                <span>Related</span>
                <strong>{item}</strong>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </main>
  );
}

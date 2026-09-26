import Link from "next/link";
import { siteApplications } from "@/lib/site";

const descriptions = [
  "Plywood, laminates, modular kitchens and furniture assembly.",
  "Panels, trims, site fixing and mixed-material work.",
  "Small repairs, craft projects and everyday fixes.",
  "Foam, fabrics, interior trims and upholstery work."
];

export function Applications() {
  return (
    <section className="job-section" id="applications">
      <div className="container job-section__grid">
        <div className="job-section__intro">
          <span className="mono">Start with the job</span>
          <h2>What are you<br />working on?</h2>
          <p>A good bond starts with the right choice. Explore the products and preparation steps for your application.</p>
          <Link className="tertiary" href="/applications">Explore all applications</Link>
        </div>
        <div className="job-list">
          {siteApplications.map((application, index) => (
            <a className="job-list__row" href={`/applications/${application.slug}`} key={application.slug}>
              <div><h3>{application.title} {application.accent}</h3><p>{descriptions[index]}</p></div>

            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

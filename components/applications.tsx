import Link from "next/link";
import { siteApplications } from "@/lib/site";


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
          {siteApplications.map((application) => (
            <a className="job-list__row" href={`/applications/${application.slug}`} key={application.slug}>
              <div><h3>{application.title} {application.accent}</h3><p>{application.description}</p></div>

            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

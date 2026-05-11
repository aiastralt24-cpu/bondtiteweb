import type { Application } from "@/lib/types";

export function Applications({ applications }: { applications: Application[] }) {
  return (
    <section className="section applications" id="applications">
      <div className="container">
        <div className="app-head">
          <div>
            <span className="mono">Applications</span>
            <h2 className="display section-title">
              Built for every <span className="accent">application.</span>
            </h2>
          </div>
          <p>
            Trade users do not shop abstract categories. They shop the material,
            site condition and finish they need to hold.
          </p>
        </div>
        <div className="application-grid">
          {applications.map((application, index) => (
            <article
              className={`application-card application-card--${index + 1}`}
              key={application.titleAccent}
            >
              <div className="application-card__content">
                <span className="mono">0{index + 1}</span>
                <h3>
                  {application.titleBefore}
                  <span>{application.titleAccent}</span>
                </h3>
                <p>{application.body}</p>
                <a href="#bond-finder">Match adhesive →</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

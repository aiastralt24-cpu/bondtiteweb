import { ProductPack } from "@/components/product-pack";
import { catalogProducts } from "@/lib/products";
import type { Application } from "@/lib/types";

const applicationProductSlugs = [
  "bondtite-hydra",
  "bondtite-multifix",
  "bondtite-aqua",
  "bondtite-foambond"
];

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
          {applications.map((application, index) => {
            const product = catalogProducts.find(
              (item) => item.slug === applicationProductSlugs[index]
            );

            return (
              <article
                className={`application-card application-card--${index + 1}`}
                key={application.titleAccent}
              >
                {product ? (
                  <div className="application-card__product" aria-hidden="true">
                    <ProductPack product={product} />
                  </div>
                ) : null}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}

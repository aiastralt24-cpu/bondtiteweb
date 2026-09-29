import { ApplicationGuide } from "@/components/application-guide";
import Link from "next/link";
import { ProductPack } from "@/components/product-pack";
import { catalogProducts, type CatalogProduct } from "@/lib/products";
import { siteApplications, type SiteApplication } from "@/lib/site";

function productLinks(names: string[]) {
  return names
    .map((name) =>
      catalogProducts.find(
        (product) => product.slug === name
      )
    )
    .filter((product): product is CatalogProduct => Boolean(product));
}

export function ApplicationsPage() {
  return <main id="main-content" tabIndex={-1} className="application-browser">
    <div className="container">
      <header className="application-browser__intro">
        <span className="mono">Applications</span>
        <h1>What are you working on?</h1>
        <p>Choose your type of work to explore preparation guidance and relevant products.</p>
      </header>
      <section className="application-browser__grid" aria-label="Choose your application">
        {siteApplications.map(application => {
          const overview = {title:application.displayTitle,description:application.description,materials:application.materials.join(" · ")};
          const product = productLinks(application.products)[0];
          return <Link className="application-choice" key={application.slug} href={"/applications/" + application.slug}>
            <div className="application-choice__copy">
              <h2>{overview.title}</h2>
              <p>{overview.description}</p>
              <span className="application-choice__materials">{overview.materials}</span>
            </div>
            {product && <div className="application-choice__pack" aria-hidden="true"><ProductPack product={product} /></div>}
            <span className="application-choice__action">Explore application </span>
          </Link>;
        })}
      </section>
      <aside className="application-browser__help">
        <div><h2>Working with something else?</h2><p>Explore the range by material with our Product advisor.</p></div>
        <Link href="/product-advisor">Product advisor </Link>
      </aside>
    </div>
  </main>;
}

export function ApplicationDetailPage({ application }: { application: SiteApplication }) {
  return <ApplicationGuide application={application}/>;
}

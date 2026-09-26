import { RangeProductGrid } from "@/components/range-product-grid";
import Link from "next/link";
import { ProductPack } from "@/components/product-pack";
import { catalogProducts, type CatalogProduct } from "@/lib/products";
import { siteApplications, type SiteApplication } from "@/lib/site";

function productLinks(names: string[]) {
  return names
    .map((name) =>
      catalogProducts.find(
        (product) => product.name.toLowerCase() === name.toLowerCase()
      )
    )
    .filter((product): product is CatalogProduct => Boolean(product));
}

const applicationOverviews: Record<string, { title: string; description: string; materials: string }> = {
  "furniture-and-joinery": { title: "Furniture & joinery", description: "Cabinetry, modular kitchens, furniture assembly and decorative laminating.", materials: "Plywood · Laminates · MDF · Veneer" },
  "construction-and-infrastructure": { title: "Construction & fixing", description: "Panels, trims and mixed-material fixing for site and fabrication work.", materials: "Panels · Trims · Mixed surfaces" },
  "diy-segment": { title: "Home repairs & DIY", description: "Everyday repairs, craft projects and small fixes around the home.", materials: "Fixtures · Crafts · Small repairs" },
  "auto-and-upholstery": { title: "Auto & upholstery", description: "Upholstery assembly, interior trims and workshop repairs.", materials: "Foam · Fabric · Rubber trims" }
};

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
          const overview = applicationOverviews[application.slug];
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
  const products=productLinks(application.products),overview=applicationOverviews[application.slug];
  return <main id="main-content" tabIndex={-1} className="range-page"><div className="container">
    <nav className="breadcrumbs range-breadcrumbs" aria-label="Breadcrumb"><Link href="/applications">Applications</Link><span aria-current="page">{overview.title}</span></nav>
    <header className="range-intro"><div><span className="mono">Bondtite in use</span><h1>{overview.title}<span>Built around your work.</span></h1><p>{overview.description}</p><a className="range-text-link" href="#application-products">Explore products for this work</a></div><aside className="range-intro__aside"><span className="mono">Materials & applications</span><ul>{overview.materials.split(' · ').map(item=><li key={item}>{item}</li>)}</ul><div><h2>What are you making?</h2><p>Choose your job or materials for product and application guidance.</p><Link href="/product-advisor">Try the product advisor</Link></div></aside></header>
    <section className="range-collection" id="application-products" aria-labelledby="application-range-title"><header className="range-section-heading"><div><span className="mono">Products for the job</span><h2 id="application-range-title">Find your starting point.</h2></div><p>{products.length} products to explore</p></header><RangeProductGrid products={products}/></section>
    <section className="range-guidance" aria-labelledby="preparation-title"><div><span className="mono">Before you begin</span><h2 id="preparation-title">A little preparation.<br/>A better finish.</h2><p>Follow your chosen product’s instructions for application and setting time.</p></div><ol>{application.steps.map((step,index)=><li key={step}><span>{String(index+1).padStart(2,'0')}</span><p>{step}</p></li>)}</ol></section>
    <section className="range-questions" aria-labelledby="application-questions-title"><div><span className="mono">Good to know</span><h2 id="application-questions-title">Common questions.</h2></div><div>{application.faqs.map(faq=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
    <nav className="range-other" aria-label="Other applications"><h2>Explore another application</h2><div>{siteApplications.filter(item=>item.slug!==application.slug).map(item=><Link key={item.slug} href={`/applications/${item.slug}`}>{applicationOverviews[item.slug].title}</Link>)}</div></nav>
  </div></main>;
}

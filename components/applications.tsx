import Link from "next/link";
import { siteApplications } from "@/lib/site";
import { catalogProducts } from "@/lib/products";
import { ProductPack } from "@/components/product-pack";

const summaries: Record<string, string> = {
  "furniture-and-joinery": "Wood joints, laminates and decorative panels.",
  "construction-and-infrastructure": "Panel fixing, stone work and site repairs.",
  "diy-segment": "Everyday repairs and hands-on craft projects.",
  "auto-and-upholstery": "Foam, interior surfaces and workshop repairs.",
  "bangles-and-decorative-crafts": "Bangle manufacture and decorative bonding.",
  "industrial-bonding-and-concrete-repair": "Structural assembly, composites and concrete repair."
};

export function Applications() {
  return (
    <section className="application-bento" id="applications" aria-labelledby="application-bento-title">
      <div className="container">
        <header className="application-bento__header">
          <div><span className="mono">Start with the job</span><h2 id="application-bento-title">What are you working on?</h2><p>Find products and guidance for your type of work.</p></div>
          <Link className="application-bento__all" href="/applications">Explore all applications</Link>
        </header>
        <div className="application-bento__grid">
          {siteApplications.map(application => {
            const product = catalogProducts.find(item => item.slug === application.products[0])!;
            return <Link className="application-bento__card" href={`/applications/${application.slug}`} key={application.slug} data-reveal>
              <div className="application-bento__copy"><h3>{application.displayTitle}</h3><p>{summaries[application.slug]}</p><span className="application-bento__action">Explore application</span></div>
              <div className="application-bento__pack" aria-hidden="true"><ProductPack product={product}/></div>
            </Link>;
          })}
        </div>
      </div>
    </section>
  );
}

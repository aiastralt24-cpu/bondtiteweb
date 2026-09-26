import { ResourceProductFinder } from "@/components/resource-product-finder";
import Link from "next/link";
import { SupportCta } from "@/components/support-cta";
import { catalogProducts, getProductPath } from "@/lib/products";
import { siteResources, type SiteResource } from "@/lib/site";

const guideNotes: Record<string, { title: string; body: string }[]> = {
  "edge-banding-mdf-and-boards": [
    { title: "Start with the board and edge material", body: "Identify both surfaces and the moisture exposure. Compare the listed substrates on the product page before selecting an adhesive." },
    { title: "Prepare and assemble", body: "Check the chosen product's preparation and application instructions. Open time, spreading method and pressing requirements depend on the adhesive and materials." },
    { title: "Check the finish", body: "Follow the stated clamp and cure times before trimming or loading the assembly. For unfamiliar finishes, ask the trade desk about a trial application." }
  ],
  "bonding-stone-metal-and-ceramic": [
    { title: "Choose for both surfaces", body: "Compare the product's listed substrates and application guidance. Confirm any restrictions for coatings, porous stone and the conditions the finished joint will face." },
    { title: "Use the product-specific instructions", body: "For a two-part epoxy, follow the prescribed ratio and mixing instructions. Set time and full cure are different: check both before you begin." },
    { title: "Plan support and cure", body: "Prepare the joint and any support before mixing. Keep the assembly supported for the time specified by the product guidance." }
  ],
  "fast-clear-fixes-for-trims": [
    { title: "Match the finish and the material", body: "A clear bond does not establish compatibility with every plastic or coating. Confirm the exact surface pair and test the visible finish on a small area." },
    { title: "Prepare before applying", body: "Dry-fit the parts, check the product's working time and prepare the surfaces as directed. Use the current product instructions for quantities and handling." },
    { title: "Allow the required cure", body: "A fast initial set is not the same as a fully cured bond. Follow the product's timing before handling or placing the repaired part under load." }
  ]
};

export function ResourcesPage() {
  const guides = siteResources.filter(resource => resource.type === "Guide");
  const guideCopy: Record<string, { category: string; description: string }> = {
    "edge-banding-mdf-and-boards": { category: "Woodworking", description: "Prepare board surfaces and plan the adhesive application and pressing." },
    "bonding-stone-metal-and-ceramic": { category: "Epoxy bonding", description: "Check surface pairs, mixing instructions and curing requirements." },
    "fast-clear-fixes-for-trims": { category: "Finishing & repairs", description: "Choose for the material and finish before making a visible repair." }
  };
  return <main id="main-content" tabIndex={-1} className="resource-library"><div className="container">
    <div className="resource-library__opening">
      <header className="resource-library__intro"><span className="mono">Bondtite resources</span><h1>The details.<br />For a better bond.</h1><p>Product documents and practical application guides, in one place.</p><a className="resource-library__jump" href="#application-guides">Browse application guides </a><div className="resource-library__standards"><h2>Looking for a product rating?</h2><Link href="/resources/certifications-and-standards">Certifications & standards </Link></div></header>
      <ResourceProductFinder />
    </div>
    <section className="resource-library__guides" id="application-guides" aria-labelledby="guides-title"><div className="resource-library__guide-intro"><span className="mono">Practical guidance</span><h2 id="guides-title">Before you begin.</h2><p>A few useful checks for the work ahead.</p></div><div className="resource-library__guide-list">{guides.map(resource => <Link className="resource-guide" key={resource.slug} href={`/resources/${resource.slug}`}><span className="resource-guide__category">{guideCopy[resource.slug]?.category ?? "Application guide"}</span><h3>{resource.title}</h3><p>{guideCopy[resource.slug]?.description ?? resource.description}</p><span className="resource-guide__action">Read guide </span></Link>)}</div></section>
  </div></main>;
}

export function ResourceDetailPage({ resource }: { resource: SiteResource }) {
  const notes = guideNotes[resource.slug];
  const matching = catalogProducts.filter(product => resource.related.some(name => name.toLowerCase().replace(/&/g,"and") === product.name.toLowerCase().replace(/&/g,"and")));
  const products = resource.type === "TDS" ? catalogProducts : matching;
  return <main id="main-content" tabIndex={-1}>
    <section className="index-hero"><div className="container index-hero__grid">
      <div><nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/resources">Resources</Link><span>{resource.title}</span></nav><h1 className="display">{resource.title}<span className="accent">.</span></h1><p>{resource.description}</p></div>
      <div className="index-hero__panel"><span className="mono">Bondtite guidance</span><strong>{resource.type === "TDS" ? "Product by product." : "Get the details right."}</strong><p>Use current product instructions and technical documentation for your specific application.</p></div>
    </div></section>
    <section className="section resource-detail"><div className="container resource-detail__grid">
      <article>
        <span className="mono">{notes ? "Before you begin" : "Technical support"}</span>
        {notes ? notes.map((note)=><div key={note.title}><h3>{note.title}</h3><p>{note.body}</p></div>) : <>
          <h2 className="display">{resource.type === "TDS" ? "Find your product documentation." : resource.type === "Certificate" ? "Check the rating for your product." : "Talk through your next job."}</h2>
          <p>{resource.type === "TDS" ? "Open a product below to review its available specifications, application steps and official source. Request the current technical and safety data sheets from the Bondtite team." : resource.type === "Certificate" ? "Ratings apply to specific products and test conditions. Ask the team for the current certificate or technical data sheet for the product you intend to use, including the relevant test standard and scope." : "For product selection, share both surfaces, the exposure conditions and the intended use. For dealer enquiries, include your business location and the product range you are interested in."}</p>
        </>}
        {products.map(product=><Link className="resource-product-link" key={product.id} href={getProductPath(product)}>{product.name}</Link>)}
      </article>
      <aside className="index-hero__panel"><span className="mono">Need a document?</span><strong>Ask our team.</strong><p>Get current TDS, SDS and product-specific guidance.</p><Link className="button button--primary" href="/contact?request=technical-documentation">Request documentation</Link></aside>
    </div></section><SupportCta />
  </main>;
}

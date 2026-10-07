import Image from 'next/image';
import {productSpecifications} from '@/lib/product-specifications';
import { ProductPanelStack } from "@/components/product-panel-stack";
import { ProductSectionNav } from "@/components/product-section-nav";
import { hasDownloadableTds } from "@/lib/documents";
import { TdsDownload } from "@/components/tds-download";
import Link from "next/link";
import { ProductPack } from "@/components/product-pack";
import { catalogProducts, getProductPath, type CatalogProduct, type ProductCategory } from "@/lib/products";
import { formatPackSizes, productCardDescription } from "@/lib/product-format";

export function ProductDetailPage({ category, product }: { category: ProductCategory; product: CatalogProduct }) {
  const totalGem = product.slug === "bondtite-total-gem";
  const hydra = product.slug === "bondtite-hydra";
  // Official Astral TDS, version 02 (01.04.2024):
  // https://www.astraladhesives.com/media/catalog/product/attachment/t/d/tds_-_bondtite_hydra_.pdf
  const enquiry = `/contact?product=${product.slug}`;
  const relatedSummaries: Record<string, string> = { "bondtite-deluxe": "Water-resistant PVA for everyday woodwork.", "bondtite-aqua": "Waterproof PVA for furniture and joinery.", "bondtite-edge-d3": "D3 wood adhesive with cross-linked technology." };
  const related = catalogProducts.filter(item => item.categorySlug === product.categorySlug && item.id !== product.id).slice(0, 3);
  const features = hydra ? ["Fast-setting", "Anti-bubble cross-linked technology", "Formaldehyde-free"] : product.features;
  const technical = productSpecifications[product.slug];
  const specs = [
    ["Category", category.label],
    ["Adhesive chemistry", product.chemistry],
    ["Setting time", product.settingTime],
    ...(hydra ? [["Adhesive type", "Single-component PVA emulsion"]] : []),
    ...(!hydra ? [["Pack sizes", formatPackSizes(product.packTypes)]] : []),
    ["Water resistance", hydra ? "EN 204, class D3" : product.waterRating],
    ...(technical?.rows ?? []),
    ["Open time", product.openTime], ["Clamp time", product.clampTime],
    ["Shelf life", product.shelfLife?.replace(/^Shelf Life:\s*/i, "")],
    ["Storage", hydra ? "Keep dry in sealed original containers at 2–40°C. Reseal partially used containers or pouches immediately." : product.storage]
  ].filter((row): row is [string, string] => Boolean(row[1]) && !/^(See official page|As per product TDS|Refer TDS)$/i.test(row[1]!));
  const steps = hydra ? [
    "Clean both bonding surfaces.",
    "Use as supplied; do not dilute.",
    "Spread an even coat on the less porous surface first, then the more porous surface, for example, laminate before plywood.",
    "Allow suitable open time for the temperature and humidity. Join while the adhesive remains wet on both surfaces.",
    "Maintain pressure with clamps or supports until the adhesive dries.",
    "Remove squeezed-out adhesive using a wet cloth."
  ] : product.steps;

  const benefits = hydra ? [
    { title: "Fast-setting", text: "A formulation that supports productive woodworking." },
    { title: "Anti-bubble technology", text: "Helps reduce debonding caused by changes in weather." },
    { title: "Easy to work with", text: "Formaldehyde-free, with high coverage and easy spreading." }
  ] : features.map(title => ({title:title.replace("Confirms EN204 to category D3", "Conforms to EN 204, class D3"),text:""}));
  const uses = hydra ? ["Kitchen furniture", "Bathroom furniture", "Balcony furniture"] : product.applications;
  const materials = hydra ? ["Wood", "Plywood", "Laminates", "Veneers", "Particleboard", "Blockboard", "Hardboard", "MDF"] : product.substrates;
  const packs = formatPackSizes(product.packTypes);
  const storage = specs.find(([label]) => label === "Storage")?.[1];

  return <main id="main-content" tabIndex={-1} className="product-story product-story--split">
    <nav className="container hydra-breadcrumbs breadcrumbs" aria-label="Breadcrumb"><Link href="/products">Products</Link><Link href={`/products/${category.slug}`}>{category.label}</Link><span aria-current="page">{product.label}</span></nav>
    <section className="product-split container" aria-labelledby="product-title">
      <div className="product-split__visual"><ProductPack product={product} priority />{totalGem&&<details className="total-gem-carton"><summary>View the 1.8 kg carton</summary><Image src="/assets/products/bondtite-total-gem-carton.png" alt="Bondtite Total Gem 1.8 kg outer carton" width={420} height={328} style={{maxWidth:"100%",height:"auto"}}/></details>}</div>
      <div className="product-split__content">
        <span className="mono">Bondtite · {hydra ? "Wood adhesive" : category.label}</span>
        <h1 id="product-title">{hydra ? <>Hydra<span>+</span></> : product.label}</h1>
        <p className="product-split__intro">{hydra ? "Fast-setting PVA wood adhesive with anti-bubble, cross-linked technology for furniture and joinery." : productCardDescription(product)}</p>
        <div className="hydra-actions"><Link className="button button--primary" href={enquiry}>Enquire about this product</Link>{hasDownloadableTds(product.slug) ? <TdsDownload productName={product.label} productSlug={product.slug} /> : <Link className="button hydra-tds-button" href={`${enquiry}&request=technical-documentation`}>Request TDS / SDS</Link>}</div>
      </div>
    </section>
    <ProductSectionNav sections={[
      {id:"product-uses",label:"Overview"},
      {id:"product-applications",label:"Applications"},
      {id:"how-to-use",label:"How to use"},
      {id:"product-specs",label:"Technical details"},
      {id:"product-questions",label:"FAQs"}
    ]} />
    <div className="container">
      <ProductPanelStack enabled>
        <section className="product-story__section hydra-overview-section" id="product-uses">
          <div className="hydra-overview-heading hydra-section-heading"><h2>Overview</h2><p>{hydra ? <>Built for everyday <br/>woodworking.</> : "The product at a glance."}</p></div>
          <div className="hydra-overview">
            {benefits.length > 0 ? <ul className="hydra-benefit-list">{benefits.map((benefit,index)=><li key={`${index}-${benefit.title}`}><span className="hydra-benefit-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"><path d={hydra ? ["m13 2-9 12h7l-1 8 10-12h-7l1-8Z","M12 3 4 6v6c0 5 8 9 8 9s8-4 8-9V6l-8-3Zm-4 9 3 3 5-6","m5 12 4 4L19 6M5 21h14"][index] : "m5 12 4 4L19 6"}/></svg></span><div><h3>{benefit.title}</h3>{benefit.text&&<p>{benefit.text}</p>}</div></li>)}</ul> : <p className="product-overview-summary">{product.productSummary}</p>}
            {packs&&packs!=="See official page"&&<div className="hydra-pack-sizes"><h3>Available pack sizes</h3><ul aria-label="Available pack sizes">{packs.split("|").map((size,index)=><li key={`${index}-${size}`}>{size.trim()}</li>)}</ul></div>}
          </div>
        </section>
        <section className="product-story__section hydra-applications-section" id="product-applications">
          <div className="hydra-applications-heading hydra-section-heading"><h2>Applications</h2><p>{hydra ? <>For furniture in spaces <br/>exposed to moisture.</> : "Where to use it and what it bonds."}</p></div>
          <div className="hydra-applications">
            <ul className={`hydra-use-cases${hydra ? "" : " product-use-cases"}`}>{uses.map((use,index)=><li key={`${index}-${use}`}>
              {hydra ? <svg aria-hidden="true" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"><path d={["M3 10h26v17H3V10Zm0 6h26M12 10v17M20 10v17M6 13h3m6 7h2m6 0h2M6 10V6h7v4M18 10V5a3 3 0 0 1 6 0v2","M5 16h22l-2 11H7L5 16Zm5 0v-5h12v5M12 8V5h8v3M11 22h10M10 27v2m12-2v2","M4 5h24v12H4V5Zm4 12v10m8-10v10m8-10v10M3 27h26M7 21h18M9 5v12m14-12V5"][index]}/></svg> : <span className="product-use-case-number" aria-hidden="true">{String(index+1).padStart(2,"0")}</span>}
              <h3>{hydra ? ["Kitchen","Bathroom","Balcony"][index] : use}</h3>{hydra&&<span>{use}</span>}
            </li>)}</ul>
            {materials.length > 0 && <div className="hydra-compatible"><h3>Compatible materials</h3><ul>{materials.map(material=><li key={material}>{material}</li>)}</ul></div>}
            {hydra&&<Link className="hydra-application-link" href="/applications/furniture-and-joinery"><span>Explore furniture & joinery</span></Link>}
          </div>
        </section>
        <section className="product-story__section" id="how-to-use">
          <div className="hydra-section-heading"><h2>How to use</h2><p>From surface preparation <br/>to the finished bond.</p></div>
          {steps.length ? <ol className="hydra-stepper">{steps.map((step,index)=><li key={`${index}-${step}`}><span className="hydra-stepper__number" aria-hidden="true">{String(index+1).padStart(2,"0")}</span><div>{hydra&&<h3>{["Prepare the surfaces","Use without dilution","Apply an even coat","Allow open time","Press and hold","Clean the joint"][index]}</h3>}<p>{step}</p></div></li>)}</ol> : <div className="product-application-guidance"><h3>Get the application guide</h3><p>Ask for the current technical data sheet for {product.label}, including mixing, preparation and curing instructions for your application.</p><Link className="button button--primary" href={`${enquiry}&request=technical-documentation`}>Request technical guidance</Link></div>}
        </section>
        <section className="product-story__section" id="product-specs">
          <div className="hydra-section-heading"><h2>Technical details</h2><p>The specifications <br/>behind the bond.</p></div>
          <div className="hydra-technical">
            <table className="hydra-spec-table"><caption className="hydra-visually-hidden">{product.label} product specifications</caption><thead><tr><th scope="col">Property</th><th scope="col">Specification</th></tr></thead><tbody>{specs.filter(([label])=>label!=="Storage").map(([label,value])=><tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody></table>
            <div className="hydra-technical-notes">
              {storage&&<details><summary>Storage & handling</summary><div><p>{storage}</p></div></details>}
              {product.limitations.length > 0 && <div><h3>Application notes</h3>{product.limitations.map(note => <p key={note}>{note}</p>)}</div>}
              <details><summary>Sources & specification notes</summary><div>{technical && <p>{technical.revision}. Technical properties include the stated test conditions. {totalGem ? "Pack size and application instructions follow the supplied TDS. The 8-hour setting claim is from the supplied packaging; full cure is 24 hours per the TDS." : "Pack sizes and application instructions follow the Astral product page unless listed only in the TDS."}</p>}{hydra&&<><p>Physical properties: Astral TDS v02, 1 April 2024. Pack sizes and storage guidance: Astral product page.</p><p>The TDS lists different pack sizes and 5–25°C unopened shelf-life conditions; confirm current requirements with Astral before specification.</p></>}{totalGem ? <TdsDownload productName={product.label} productSlug={product.slug}/> : <a href={product.sourceUrl} target="_blank" rel="noreferrer">View Astral’s product information</a>}</div></details>
            </div>
          </div>
        </section>
      </ProductPanelStack>
      <section className="product-story__section" id="product-questions"><h2>Common questions</h2><div className="product-story__faqs">{product.faqs.map(faq=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
      {related.length>0&&<section className="product-story__related" aria-labelledby="related-products-title"><header className="related-products__header"><div><span className="mono">Related products</span><h2 id="related-products-title">Explore the range.</h2></div><Link href={`/products/${category.slug}`}>View the range</Link></header><div className="product-story__related-grid">{related.map(item=><article key={item.id}><Link className="related-product" href={getProductPath(item)}><div className="product-story__related-image"><ProductPack product={item}/></div><div className="related-product__copy"><span className="related-product__brand">Bondtite</span><h3>{item.label}</h3><p>{relatedSummaries[item.slug]??productCardDescription(item)}</p><span className="related-product__action">View product</span></div></Link></article>)}</div></section>}
    </div>
  </main>;
}

import Link from 'next/link';
import { InstantProductGallery, InstantBuyBar } from '@/components/instant-product-gallery';
import { ProductSectionNav } from '@/components/product-section-nav';
import { TdsDownload } from '@/components/tds-download';
import { hasDownloadableTds } from '@/lib/documents';
import { catalogProducts, getProductPath, type CatalogProduct, type ProductCategory } from '@/lib/products';
import { instantStories, instantAlternatives, amazonProductUrl } from '@/lib/instant-products';
import galleryImages from '@/lib/instant-gallery-images.json';
import { productSpecifications } from '@/lib/product-specifications';
import '@/app/instant-products.css';

export function InstantProductPage({product,category}:{product:CatalogProduct;category:ProductCategory}) {
 const story=instantStories[product.slug];
 const amazon=story.amazon ? amazonProductUrl(story.amazon.asin):undefined;
 const enquiry=`/contact?product=${product.slug}`;
 const images=story.media ? galleryImages[story.media.key as keyof typeof galleryImages] : [{src:product.image,alt:`${story.title} product pack`,label:'Product pack'}];
 const specs=[['Product size',product.packTypes],['Applicator',story.applicator],['Consistency',story.consistency],['Adhesive chemistry',product.chemistry],...(productSpecifications[product.slug]?.rows??[]),...(product.shelfLife?[['Shelf life',product.shelfLife]]:[])];
 const related=(instantAlternatives[product.slug] ?? []).map(slug=>catalogProducts.find(p=>p.slug===slug)!).filter(Boolean);
 const faqs=[...product.faqs,...(story.amazon?[{question:'Which pack will I buy on Amazon?',answer:`The linked Amazon listing is for ${story.amazon.pack}. Check the selected pack, current price and delivery details on Amazon before purchasing.`}]:[])];
 return <main id="main-content" tabIndex={-1} className={`instant-product${amazon?' instant-product--shop':''}`}>
  <div className="container"><nav className="breadcrumbs instant-breadcrumbs" aria-label="Breadcrumb"><Link href="/products">Products</Link><Link href={`/products/${category.slug}`}>Instant adhesives</Link><span aria-current="page">{story.title}</span></nav>
   <section className="instant-hero" aria-labelledby="product-title">
    <InstantProductGallery key={product.slug} images={images}/>
    <div className="instant-hero__copy"><span className="mono">Bondtite · Instant adhesives</span><h1 id="product-title">{story.title}</h1><p className="instant-hero__purpose">{story.purpose}</p><ul className="instant-hero__highlights">{story.benefits.map(benefit=><li key={benefit.title}>{benefit.title}</li>)}</ul>

     <div id="instant-purchase" className="instant-purchase">{amazon && story.amazon ? <><p className="instant-pack"><span>{product.packTypes} per {story.media?.key === 'ultra' ? 'bottle' : 'tube'}</span><strong>Amazon pack: {story.amazon.pack}</strong></p><a className="button button--primary" href={amazon} target="_blank" rel="noopener noreferrer" aria-label={`Buy ${story.title} on Amazon (opens in a new tab)`}>Buy on Amazon</a><small>Opens Amazon in a new tab. Price and availability are shown there.</small></>:<Link className="button button--primary" href={enquiry}>Enquire about this product</Link>}
      <div className="instant-purchase__support">{hasDownloadableTds(product.slug)?<TdsDownload productName={story.title} productSlug={product.slug}/>:<Link href={`${enquiry}&request=technical-documentation`}>Request TDS / SDS</Link>}{amazon&&<Link href={enquiry}>Trade enquiry</Link>}</div>
     </div>
    </div>
   </section>
  </div>
  <ProductSectionNav sections={[{id:'quick-benefits',label:'Overview'},{id:'quick-applications',label:'Uses'},{id:'quick-how-to',label:'Instructions'},{id:'quick-details',label:'Details'}]}/>
  <div className="container instant-content">
   <section id="quick-benefits" className="instant-benefits" aria-labelledby="quick-benefits-title"><div className="instant-section-heading"><span className="mono">Why choose it</span><h2 id="quick-benefits-title">Why {story.title}?</h2></div><div className="instant-benefits__list">{story.benefits.map((benefit,i)=><article key={benefit.title}><span className="instant-number">0{i+1}</span><h3>{benefit.title}</h3><p>{benefit.body}</p></article>)}</div></section>
   <section id="quick-applications" className="instant-applications" aria-labelledby="quick-applications-title"><div className="instant-section-heading"><span className="mono">Applications</span><h2 id="quick-applications-title">Uses & materials</h2><p>Choose for the surfaces you are joining.</p></div><div><div className="instant-use-list">{story.uses.map(use=><article key={use.title}><h3>{use.title}</h3><p>{use.body}</p></article>)}</div><div className="instant-materials"><h3>{product.substrates.length?'Suitable materials':'Craft surfaces'}</h3>{product.substrates.length?<ul>{product.substrates.map(material=><li key={material}>{material}</li>)}</ul>:<p>Compatible porous and non-porous craft surfaces. Ask our team about your specific materials.</p>}<p className="instant-note">Compatibility depends on the material and surface finish. Check the pack instructions and test a small area first.</p></div>{product.limitations.length>0&&<div className="instant-limitations"><h3>Not suitable for / limitations</h3>{product.limitations.map(note=><p key={note}>{note}</p>)}</div>}</div></section>
   <section id="quick-how-to" className="instant-howto" aria-labelledby="quick-howto-title"><div className="instant-section-heading"><span className="mono">How to use</span><h2 id="quick-howto-title">How to use</h2><p>Follow the instructions on your product pack.</p></div><div>{story.media?.key==='ultra'&&<dl className="instant-timing"><div><dt>Hold together</dt><dd>30 seconds</dd></div><div><dt>Leave undisturbed</dt><dd>10 minutes</dd></div><div><dt>Full cure</dt><dd>24 hours</dd></div></dl>}<ol className="instant-steps">{product.steps.map((step,i)=><li key={step}><span className="instant-number">{String(i+1).padStart(2,'0')}</span><p>{step}</p></li>)}</ol><p className="instant-note">Initial bonding and full cure are different. Follow the product instructions before loading or using the repaired item.</p></div></section>
   <section id="quick-details" className="instant-details" aria-labelledby="quick-details-title"><div className="instant-section-heading"><span className="mono">Product information</span><h2 id="quick-details-title">Technical details</h2><Link className="instant-text-link" href={`${enquiry}&request=technical-documentation`}>Ask for technical guidance</Link></div><div><table><caption className="hydra-visually-hidden">{story.title} specifications</caption><tbody>{specs.filter(([,value])=>value&&value!=='See official page').map(([name,value])=><tr key={name}><th scope="row">{name}</th><td>{value}</td></tr>)}</tbody></table><details className="instant-storage"><summary>Storage and handling</summary><p>{product.storage && !/See official|Refer TDS/i.test(product.storage)?product.storage:'Follow the storage and handling instructions on the pack. Close the container after use and request the current safety data sheet for detailed precautions.'}</p></details></div></section>
   <section className="instant-faq" aria-labelledby="quick-faq-title"><div className="instant-section-heading"><span className="mono">Common questions</span><h2 id="quick-faq-title">Common questions</h2></div><div>{faqs.map(faq=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
   <section id="quick-compare" className="instant-compare" aria-labelledby="quick-compare-title"><div className="instant-section-heading"><span className="mono">Find your fit</span><h2 id="quick-compare-title">Need a different applicator?</h2><p>Two alternatives for different application needs.</p></div><div className="instant-compare__rows">{related.map(item=>{const info=instantStories[item.slug];return <div key={item.slug} className={item.slug===product.slug?'is-current':''}><div>{item.slug===product.slug?<strong>{info.title}<span> You’re viewing</span></strong>:<Link href={getProductPath(item)}>{info.title}</Link>}<p>{info.purpose}</p></div><span>{info.applicator}</span><span>{item.packTypes}</span></div>})}</div></section>
  </div>
  {amazon&&story.amazon&&<InstantBuyBar key={product.slug} title={story.title} pack={story.amazon.pack} href={amazon}/>}
 </main>;
}

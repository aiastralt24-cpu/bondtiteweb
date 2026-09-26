import Link from 'next/link';
import {RangeProductGrid} from '@/components/range-product-grid';
import {productCategories,type CatalogProduct,type ProductCategory} from '@/lib/products';

export function CategoryPage({category,products}:{category:ProductCategory;products:CatalogProduct[]}) {
  const intro=category.slug==='woodworking'?'From furniture assembly to decorative finishes. Explore adhesives for your materials and the way you work.':`Explore the Bondtite ${category.shortLabel.toLowerCase()} range, with product details and application guidance in one place.`;
  return <main id="main-content" tabIndex={-1} className="range-page"><div className="container">
    <nav className="breadcrumbs range-breadcrumbs" aria-label="Breadcrumb"><Link href="/products">Products</Link><span aria-current="page">{category.label}</span></nav>
    <header className="range-intro"><div><span className="mono">The Bondtite range</span><h1>{category.shortLabel}<span>Made to hold.</span></h1><p>{intro}</p><a className="range-text-link" href="#range-products">Explore {products.length} products</a></div><aside className="range-intro__aside"><span className="mono">Working with</span><ul>{category.bestFor.map(item=><li key={item}>{item}</li>)}</ul><div><h2>Let’s find your fit.</h2><p>Start with your job. Our advisor helps connect the materials to a product.</p><Link href="/product-advisor">Try the product advisor</Link></div></aside></header>
    <section className="range-collection" id="range-products" aria-labelledby="range-title"><header className="range-section-heading"><div><span className="mono">Explore the range</span><h2 id="range-title">Choose your bond.</h2></div><p>{products.length} products · Select one for details</p></header><RangeProductGrid products={products}/></section>
    <section className="range-guidance"><div><span className="mono">A good place to start</span><h2>The right product.<br/>For the right job.</h2></div><ol><li><span>01</span><div><h3>Start with the surfaces</h3><p>Identify the two materials at the joint, including any paint or coating.</p></div></li><li><span>02</span><div><h3>Think about the setting</h3><p>Consider where the finished item will be used and its exposure to moisture.</p></div></li><li><span>03</span><div><h3>Plan the application</h3><p>Open the product instructions for preparation, application and setting guidance.</p></div></li></ol></section>
    <section className="range-questions"><div><span className="mono">Good to know</span><h2>Common questions.</h2></div><div>{category.faqs.map(faq=><details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
    <nav className="range-other" aria-label="Other product categories"><h2>Explore another range</h2><div>{productCategories.filter(item=>item.slug!==category.slug).map(item=><Link key={item.slug} href={`/products/${item.slug}`}>{item.shortLabel}</Link>)}</div></nav>
  </div></main>;
}

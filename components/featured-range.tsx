import Link from "next/link";
import { ProductPack } from "@/components/product-pack";
import { catalogProducts, getProductPath } from "@/lib/products";
import "@/app/featured-range.css";

const featured = ["bondtite-hydra", "bondtite-fast-and-clear", "bondtite-super-strength", "bondtite-quick"]
  .flatMap(slug => catalogProducts.filter(product => product.slug === slug));

export function FeaturedRange() {
  return <section className="featured-range section" id="products"><div className="container">
    <div className="featured-range__head"><div><span className="mono">Explore the range</span><h2 className="home-title">A different bond.<br /><span className="home-title__accent">For every kind of job.</span></h2></div><Link className="tertiary" href="/products">View all products</Link></div>
    <div className="featured-range__grid">{featured.map(product => <Link className="featured-range__item" href={getProductPath(product)} key={product.slug} data-product={product.slug}><div className="featured-range__visual"><ProductPack product={product} /></div><span className="mono">{product.chemistry}</span><h3>{product.name}</h3><p>{product.bestFor.join(" · ")}</p><span className="featured-range__link">Explore product <span aria-hidden="true">↗</span></span></Link>)}</div>
  </div></section>;
}

import Link from 'next/link';
import {ProductPack} from '@/components/product-pack';
import {getProductPath,type CatalogProduct} from '@/lib/products';
import {productCardDescription} from '@/lib/product-format';

export function RangeProductGrid({products,descriptions}:{products:CatalogProduct[];descriptions?:Record<string,string>}) {
  return <div className="range-product-grid" data-count={products.length}>{products.map(product=><article key={product.id} className="range-product-card"><Link href={getProductPath(product)}>
    <div className="range-product-card__image"><ProductPack product={product}/></div>
    <div className="range-product-card__copy"><span className="mono">Bondtite</span><h3>{product.label}</h3><p>{descriptions?.[product.slug] ?? productCardDescription(product)}</p><span className="range-product-card__action">View product</span></div>
  </Link></article>)}</div>;
}

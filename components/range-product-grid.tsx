import Link from 'next/link';
import {ProductPack} from '@/components/product-pack';
import {getProductPath,type CatalogProduct} from '@/lib/products';
import {productCardDescription} from '@/lib/product-format';

export function RangeProductGrid({products}:{products:CatalogProduct[]}) {
  return <div className="range-product-grid">{products.map(product=><article key={product.id} className="range-product-card"><Link href={getProductPath(product)}>
    <div className="range-product-card__image"><ProductPack product={product}/></div>
    <div className="range-product-card__copy"><span className="mono">Bondtite</span><h3>{product.label}</h3><p>{productCardDescription(product)}</p><span className="range-product-card__action">View product</span></div>
  </Link></article>)}</div>;
}

import Link from "next/link";
import Image from "next/image";
import type { HeroData } from "@/lib/types";

export function Hero({ hero }: { hero: HeroData }) {
  return (
    <section className="bond-hero" id="top">
      <div className="container bond-hero__grid">
        <div className="bond-hero__copy">
          <h1>{hero.titleBefore}<span>{hero.titleAccent}</span>{hero.titleAfter}</h1>
          <p>From the first fix to the final finish. Adhesives for furniture, fabrication and everyday repairs.</p>
          <div className="bond-hero__actions">
            <a className="button button--primary" href="/product-advisor">Product advisor </a>
            <Link className="bond-hero__secondary" href="/products">Explore the range </Link>
          </div>
        </div>
        <div className="bond-hero__stage" aria-label="Bondtite adhesive range">
          <span className="bond-hero__ring" aria-hidden="true" />
          <Image className="bond-hero__pack bond-hero__pack--left" src="/assets/products/bondtite-fast-and-clear-pack.png" alt="Bondtite Fast and Clear epoxy adhesive" width={1600} height={935} priority />
          <Image className="bond-hero__pack bond-hero__pack--main" src="/assets/products/bondtite-hydra-pack.png" alt="Bondtite Hydra+ wood adhesive" width={450} height={560} priority />
          <Image className="bond-hero__pack bond-hero__pack--right" src="/assets/products/bondtite-quick.png" alt="Bondtite Quick instant adhesive" width={490} height={490} priority />
          <div className="bond-hero__caption"><span>Different materials. One Bondtite family.</span><span>BY ASTRAL</span></div>
        </div>
      </div>
    </section>
  );
}

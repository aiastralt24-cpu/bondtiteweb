import Image from 'next/image';
import { HeroVideo } from '@/components/hero-video';

export function Hero({ discoveryHref = "#applications" }: { discoveryHref?: string }) {
  return <section className="campaign-hero" aria-labelledby="campaign-title" id="top">
    <HeroVideo />
    <div className="campaign-hero__shade" />
    <div className="container campaign-hero__grid">
      <div className="campaign-hero__copy">
        <h1 id="campaign-title" className="campaign-title--artwork"><span className="campaign-mark">
          <span className="campaign-mark__line campaign-mark__line--top"><Image src="/assets/brand/lakdi-ka-chumbak.png" alt="Lakdi ka Chumbak" width={4901} height={1534} sizes="(max-width: 700px) 90vw, 620px" priority /></span>
          <span className="campaign-mark__line campaign-mark__line--bottom" aria-hidden="true"><Image src="/assets/brand/lakdi-ka-chumbak.png" alt="" width={4901} height={1534} sizes="(max-width: 700px) 90vw, 620px" priority /></span>
        </span></h1>
      </div>

    </div>
    <div className="container campaign-hero__bottom"><a href={discoveryHref}>Discover your bond <span aria-hidden="true">↓</span></a></div>
  </section>;
}

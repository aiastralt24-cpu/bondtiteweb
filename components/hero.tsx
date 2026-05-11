import Image from "next/image";
import type { HeroData } from "@/lib/types";

export function Hero({ hero }: { hero: HeroData }) {
  return (
    <section className="hero" id="top">
      <div className="container hero__grid">
        <div>
          <h1 className="display">
            {hero.titleBefore}
            <span className="accent">{hero.titleAccent}</span>
            {hero.titleAfter}
          </h1>
          <p>{hero.body}</p>
          <a className="button button--primary" href={hero.cta.href}>
            {hero.cta.label}
          </a>
          <div className="hero__proof" aria-label="Bondtite proof points">
            {hero.proof.map((item) => (
              <span key={item.title}>
                <strong>{item.title}</strong>
                {item.detail}
              </span>
            ))}
          </div>
        </div>
        <div className="hero__media hero__media--ranbir">
          <Image
            src="/assets/campaign/ranbir-slider-image.png"
            alt="Ranbir Kapoor for Bondtite Adhesives"
            fill
            priority
            sizes="(max-width: 980px) 100vw, 48vw"
          />
        </div>
      </div>
    </section>
  );
}

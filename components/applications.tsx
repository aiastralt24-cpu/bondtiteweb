import Link from "next/link";
import { siteApplications } from "@/lib/site";
import Image from "next/image";

const imageNames = ["furniture", "construction", "diy", "upholstery", "crafts", "industrial"];

const summaries: Record<string, string> = {
  "furniture-and-joinery": "Wood joints, laminates and panels.",
  "construction-and-infrastructure": "Panel fixing, stonework and repairs.",
  "diy-segment": "Everyday fixes and creative projects.",
  "auto-and-upholstery": "Foam bonding and interior repairs.",
  "bangles-and-decorative-crafts": "Bangle manufacture and decorative bonding.",
  "industrial-bonding-and-concrete-repair": "Structural assembly, composites and concrete repair."
};

export function Applications() {
  return (
    <section className="application-bento" id="applications" aria-labelledby="application-bento-title">
      <div className="container">
        <header className="application-bento__header">
          <div><span className="mono">Start with the job</span><h2 id="application-bento-title" className="home-title">What are you <span className="home-title__accent">working on?</span></h2><p>Find products and guidance for your type of work.</p></div>
          <Link className="application-bento__all" href="/applications">Explore all applications</Link>
        </header>
        <div className="application-bento__grid">
          {siteApplications.map((application, index) => {
            return <Link className={`application-bento__card application-bento__card--${imageNames[index]}`} href={`/applications/${application.slug}`} key={application.slug} data-reveal>
              <div className="application-bento__copy"><h3>{application.displayTitle}</h3><p>{summaries[application.slug]}</p></div>
              <div className="application-bento__scene" aria-hidden="true"><Image src={`/assets/applications/${imageNames[index]}.webp`} alt="" fill sizes="(max-width: 700px) 100vw, 50vw"/></div>
            </Link>;
          })}
        </div>
      </div>
    </section>
  );
}

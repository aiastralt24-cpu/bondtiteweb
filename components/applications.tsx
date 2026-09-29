import Link from "next/link";
import { siteApplications } from "@/lib/site";
import Image from "next/image";

const imageNames = ["furniture", "construction", "diy", "upholstery", "crafts", "industrial"];

const summaries: Record<string, string> = {
  "furniture-and-joinery": "Wood joints, laminates and decorative panels.",
  "construction-and-infrastructure": "Panel fixing, stone work and site repairs.",
  "diy-segment": "Everyday repairs and hands-on craft projects.",
  "auto-and-upholstery": "Foam, interior surfaces and workshop repairs.",
  "bangles-and-decorative-crafts": "Bangle manufacture and decorative bonding.",
  "industrial-bonding-and-concrete-repair": "Structural assembly, composites and concrete repair."
};

export function Applications() {
  return (
    <section className="application-bento" id="applications" aria-labelledby="application-bento-title">
      <div className="container">
        <header className="application-bento__header">
          <div><span className="mono">Start with the job</span><h2 id="application-bento-title">What are you working on?</h2><p>Find products and guidance for your type of work.</p></div>
          <Link className="application-bento__all" href="/applications">Explore all applications</Link>
        </header>
        <div className="application-bento__grid">
          {siteApplications.map((application, index) => {
            return <Link className={`application-bento__card application-bento__card--${imageNames[index]}`} href={`/applications/${application.slug}`} key={application.slug} data-reveal>
              <div className="application-bento__copy"><span className="application-bento__index">0{index + 1}</span><h3>{application.displayTitle}</h3><p>{summaries[application.slug]}</p></div>
              <div className="application-bento__scene" aria-hidden="true"><Image src={`/assets/applications/${imageNames[index]}.webp`} alt="" fill sizes={index === 0 ? "(max-width: 700px) 100vw, 50vw" : "(max-width: 700px) 50vw, 33vw"}/></div>
            </Link>;
          })}
        </div>
      </div>
    </section>
  );
}

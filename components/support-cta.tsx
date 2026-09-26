import Link from "next/link";

export function SupportCta() {
  return <section className="support-cta" aria-label="Product support"><div className="container">
    <div><h2>Need help choosing?</h2><p>Talk to our team about your materials and application.</p></div>
    <Link href="/contact">Contact our team </Link>
  </div></section>;
}

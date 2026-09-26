import Link from "next/link";
export function TechnicalProof() {
  return <section className="bond-resources section" id="resources"><div className="container bond-resources__grid">
    <div><span className="mono">Knowledge & support</span><h2>Know the product.<br />Get the bond right.</h2><p>From surface preparation to product specifications, find the information you need for your next job.</p></div>
    <div className="bond-resources__links">
      <Link href="/resources/technical-data-sheets"><div><h3>Technical information</h3><p>Explore product data and request current documentation.</p></div></Link>
      <Link href="/applications"><div><h3>Application guides</h3><p>Preparation, product choices and practical steps by job.</p></div></Link>
      <Link href="/contact"><div><h3>Talk to the Bondtite team</h3><p>Discuss your materials and working conditions.</p></div></Link>
    </div>
  </div></section>;
}

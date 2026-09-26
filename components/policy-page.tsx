import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { getHomepageData } from '@/lib/content';
import { headerCta, mainNavigation } from '@/lib/site';
import { policies } from '@/lib/policies';
export async function PolicyPage({slug}:{slug:string}) {
  const policy=policies[slug],data=await getHomepageData();
  return <><Header navigation={mainNavigation} cta={headerCta}/><main id="main-content" tabIndex={-1} className="policy-page container">
    <header className="policy-page__header"><span className="mono">Website information</span><h1>{policy.title}</h1><p>{policy.summary}</p><span className="policy-page__date">Last updated <time dateTime="2026-09-26">26 September 2026</time></span></header>
    <div className="policy-page__layout"><nav className="policy-page__contents" aria-label="On this page"><h2>On this page</h2>{policy.sections.map(section=><a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav>
    <div className="policy-page__body">{policy.sections.map((section,index)=><section id={section.id} key={section.id}><h2><span aria-hidden="true">{String(index+1).padStart(2,'0')}</span>{section.title}</h2>{section.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}</section>)}
    <aside className="policy-page__contact"><h2>Speak to our team</h2><a href="mailto:customercare@astraladhesives.com">customercare@astraladhesives.com</a><a href="tel:+917311103331">+91 73111 03331</a><Link href="/contact">Contact Bondtite</Link></aside>
    <nav className="policy-page__related" aria-label="Related policies">{Object.entries(policies).filter(([key])=>key!==slug).map(([key,value])=><Link key={key} href={`/${key}`}>{value.title}</Link>)}</nav></div></div>
  </main><Footer footer={data.footer} showContact={false}/></>;
}

import type { Faq } from "@/lib/types";

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="section faq" id="faq">
      <div className="container faq__inner">
        <span className="mono">Questions</span>
        <h2 className="display section-title">
          Ask before you <span className="accent">apply.</span>
        </h2>
        {faqs.map((faq, index) => (
          <details key={faq.question} open={index === 0}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

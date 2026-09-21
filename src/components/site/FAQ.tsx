import { homeFaqs } from "@/lib/faq-data"
import s from "./accueil.module.css"

/* <details>/<summary> natifs : ouverture au clavier et sans JavaScript. */
export default function FAQ() {
  return (
    <section id="faq" className={s.section}>
      <div className={`${s.wrap} ${s.faqWrap}`}>
        <div className={s.sectionHead}>
          <span className={s.eyebrow}>Questions fréquentes</span>
          <h2>
            Avant de <em>vous lancer.</em>
          </h2>
        </div>

        <div className={`${s.panel} ${s.faqPanel}`}>
          {homeFaqs.map((faq, index) => (
            <details key={faq.question} className={s.faqItem} open={index === 0}>
              <summary>
                {faq.question}
                <span className={s.plus} aria-hidden />
              </summary>
              <p className={s.answer}>{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

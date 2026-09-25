import { homeFaqs } from "@/lib/faq-data"

/**
 * Mêmes questions que les données structurées FAQPage de la page : une seule
 * source (lib/faq-data), pour que Google lise exactement ce qui est affiché.
 */
export default function Faq() {
  return (
    <section className="chapter faq" id="faq" data-scene="5">
      <div className="wrap">
        <div className="card">
          <h2>
            Avant de <em>vous lancer.</em>
          </h2>
          <div style={{ marginTop: "1.4rem" }}>
            {homeFaqs.map((faq) => (
              <details key={faq.question}>
                <summary>
                  {faq.question}
                  <span className="plus" aria-hidden="true" />
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

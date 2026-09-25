import ContactForm from "./ContactForm"

export default function Contact() {
  return (
    <section className="chapter contact plain" id="contact" data-scene="5">
      <div className="wrap">
        <div className="card">
          <div>
            <h2>
              Parlons <em>de votre projet.</em>
            </h2>
            <p className="lede muted">
              45 minutes pour comprendre votre besoin. Gratuit, sans engagement. Devis envoyé sous 24h.
            </p>
            <ul className="facts">
              <li><span>Localisation</span><strong>Guadeloupe</strong></li>
              <li><span>Réponse garantie</span><strong>Sous 24h en semaine</strong></li>
              <li><span>Devis</span><strong>Gratuit et sans engagement</strong></li>
            </ul>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

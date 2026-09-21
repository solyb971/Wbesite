import { Check, Globe, ShoppingCart, Smartphone } from "lucide-react"
import s from "./accueil.module.css"

const services = [
  {
    title: "Site Vitrine",
    tag: "Le plus demandé",
    featured: true,
    Icon: Globe,
    price: "Dès 599€",
    description:
      "Un site pensé pour votre clientèle locale. Rapide, lisible sur mobile, référencé pour être trouvé par les clients de votre région.",
    features: [
      "Site 5 pages, adapté au mobile",
      "Référencement local Guadeloupe",
      "Hébergement + domaine 1 an",
      "Formation 1h · 3 révisions",
    ],
  },
  {
    title: "E-commerce",
    tag: "Vente en ligne",
    featured: false,
    Icon: ShoppingCart,
    price: "Dès 999€",
    description:
      "Votre boutique en ligne, aux couleurs de votre marque. Vous la gérez en autonomie — paiement sécurisé, livraison, catalogue.",
    features: [
      "Boutique complète, autonome",
      "Paiement en ligne sécurisé",
      "Gestion de la livraison en GP",
      "Formation 1h30 · support 2 mois",
    ],
  },
  {
    title: "Application Métier",
    tag: "Sur mesure",
    featured: false,
    Icon: Smartphone,
    price: "Sur devis",
    description:
      "Un logiciel fait pour votre métier, pas pour le métier d'un autre. Cahier des charges, architecture, intégrations — on construit tout de zéro.",
    features: [
      "Cahier des charges sur-mesure",
      "Conçu pour votre métier",
      "Évolutif dans le temps",
      "Devis détaillé sous 24h",
    ],
  },
]

export default function Services() {
  return (
    <section id="services" className={s.section}>
      <div className={s.wrap}>
        <div className={s.sectionHead}>
          <span className={s.eyebrow}>Ce qu&apos;on construit</span>
          <h2>
            Trois façons d&apos;exister <em>en ligne</em>, choisies pour votre marché.
          </h2>
          <p>
            Chaque projet repart de zéro. On part de vous — votre marché, votre clientèle, votre
            logique métier — pour construire la solution la plus juste pour votre activité.
          </p>
        </div>

        <div id="tarifs" className={s.servicesGrid}>
          {services.map(({ title, tag, featured, Icon, price, description, features }) => (
            <article key={title} className={`${s.panel} ${s.serviceCard} ${s.lift}`}>
              <div className={s.serviceTop}>
                <span className={s.serviceIcon}>
                  <Icon size={21} strokeWidth={1.8} aria-hidden />
                </span>
                <span className={`${s.tag} ${featured ? s.tagRust : s.tagOutline}`}>{tag}</span>
              </div>
              <div>
                <h3>{title}</h3>
                <p className={s.price}>{price}</p>
              </div>
              <p>{description}</p>
              <ul className={s.checklist}>
                {features.map((feature) => (
                  <li key={feature}>
                    <Check size={15} strokeWidth={2.4} aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <a className={`${s.btn} ${s.btnPrimary} ${s.btnBlock}`} href="#contact">
                Demander un devis gratuit
                <span className="sr-only"> — {title}</span>
              </a>
            </article>
          ))}
        </div>

        <div className={`${s.panel} ${s.maintenance} ${s.lift}`}>
          <div>
            <p className={s.maintenanceLabel}>Et après la livraison ?</p>
            <h3>Maintenance — 39€/mois</h3>
            <p className={s.maintenanceDesc}>
              Mises à jour &amp; sécurité · Sauvegarde quotidienne · Support prioritaire · 1h de
              modifs/mois. Pour ne jamais vous en occuper.
            </p>
          </div>
          <a className={`${s.btn} ${s.btnPrimary} ${s.btnSmall}`} href="#contact">
            S&apos;abonner
            <span className="sr-only"> à la maintenance</span>
          </a>
        </div>
      </div>
    </section>
  )
}

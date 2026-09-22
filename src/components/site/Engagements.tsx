import { CalendarDays, CreditCard, Shield, User } from "lucide-react"
import s from "./accueil.module.css"

const engagements = [
  {
    Icon: User,
    title: "Un seul interlocuteur",
    text: "Vous parlez directement à la personne qui code. Pas d'intermédiaire.",
  },
  {
    Icon: CalendarDays,
    title: "Devis clair sous 24h",
    text: "Un prix ferme et détaillé, sans surprise.",
  },
  {
    Icon: CreditCard,
    title: "Paiement en deux fois",
    text: "50% pour démarrer, 50% à la livraison.",
  },
  {
    Icon: Shield,
    title: "On reste après la livraison",
    text: "Hébergement 1 an et support inclus. On ne disparaît pas.",
  },
]

export default function Engagements() {
  return (
    <section id="engagements" className={`${s.section} ${s.sectionFlush}`}>
      <div className={s.wrap}>
        <div className={s.sectionHead} data-reveal>
          <span className={s.eyebrow}>Comment on travaille</span>
          <h2>
            Pas de promesses. <em>Des engagements.</em>
          </h2>
        </div>

        <ul className={`${s.panel} ${s.engageGrid}`} data-reveal>
          {engagements.map(({ Icon, title, text }) => (
            <li key={title} className={s.engageItem}>
              <Icon size={22} strokeWidth={1.8} aria-hidden />
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

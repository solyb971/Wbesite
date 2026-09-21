import type { CSSProperties } from "react"
import { Check, Clock, Plus, Sun } from "lucide-react"
import s from "./accueil.module.css"

/** Délai d'entrée d'un élément secondaire du hero. */
const delay = (seconds: number) => ({ "--hd": `${seconds}s` }) as CSSProperties

export default function Hero() {
  return (
    <section id="hero" className={s.hero}>
      <div className={s.wrap}>
        <span className={`${s.heroBadge} ${s.heroIn}`} style={delay(0.05)}>
          <Sun size={14} strokeWidth={2} aria-hidden />
          Agence digitale — Guadeloupe
        </span>

        {/* Jamais animé : c'est le texte qui doit s'afficher au premier rendu. */}
        <h1 className={s.h1}>
          Votre clientèle
          <em>vous cherche déjà.</em>
        </h1>

        {/* Pas d'entrée animée non plus : sur mobile, ce paragraphe est l'élément LCP. */}
        <p className={s.lede}>
          Chaque jour, des clients tapent une recherche pensant vous trouver — et tombent sur un
          concurrent mieux référencé. On construit des outils digitaux pour les entrepreneurs
          d&apos;ici : sites, applications, systèmes pensés pour être <strong>trouvés</strong>,
          pas juste pour exister.
        </p>

        <div className={`${s.heroCtas} ${s.heroIn}`} style={delay(0.2)}>
          <a className={`${s.btn} ${s.btnPrimary}`} href="#contact">
            Demander un devis gratuit
          </a>
          <a className={`${s.btn} ${s.btnGhost}`} href="#services">
            Voir les services <span aria-hidden>→</span>
          </a>
        </div>

        <ul className={`${s.trustBar} ${s.heroIn}`} style={delay(0.28)}>
          <li className={s.trustItem}>
            <Clock size={16} strokeWidth={2} aria-hidden />
            Devis gratuit sous 24h
          </li>
          <li className={s.trustItem}>
            <Check size={16} strokeWidth={2} aria-hidden />
            Sans engagement
          </li>
          <li className={s.trustItem}>
            <Plus size={16} strokeWidth={2} aria-hidden />
            1 an d&apos;hébergement inclus
          </li>
        </ul>
      </div>
    </section>
  )
}

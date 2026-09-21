import Image from "next/image"
import s from "./accueil.module.css"

/**
 * Portrait du fondateur. Tant qu'il vaut null, un fond neutre tient la place.
 * Déposer la photo dans /public (ex. /about/yacine.jpg) puis renseigner le chemin ici.
 */
const FOUNDER_PHOTO: string | null = null

export default function About() {
  return (
    <section id="apropos" className={s.section}>
      <div className={`${s.wrap} ${s.aboutGrid}`}>
        <figure className={s.portrait}>
          {FOUNDER_PHOTO && (
            <Image
              src={FOUNDER_PHOTO}
              alt="Yacine Bouhassoun, fondateur de SolYB, à Petit-Bourg en Guadeloupe"
              fill
              sizes="(min-width: 900px) 440px, 100vw"
            />
          )}
          <figcaption className={s.portraitCap}>
            <strong>Yacine Bouhassoun</strong>
            Fondateur — Petit-Bourg, Guadeloupe
          </figcaption>
        </figure>

        <div className={s.aboutCopy}>
          <span className={s.eyebrow}>À propos de SolYB</span>
          <h2>
            La Guadeloupe m&apos;a construit.{" "}
            <em className={s.accent}>J&apos;ai envie de lui rendre la pareille.</em>
          </h2>
          <p>
            Je m&apos;appelle Yacine. J&apos;ai grandi en Guadeloupe, une île magnifique, avec une
            énergie entrepreneuriale qui ne ressemble à aucune autre.
          </p>
          <p>
            J&apos;ai eu l&apos;occasion de travailler dans différents corps de métier ici, et le même
            constat revenait sans cesse&nbsp;: des professionnels compétents, sérieux, reconnus sur le
            terrain — mais invisibles en ligne.
          </p>
          <p className={s.pull}>
            «&nbsp;Un restaurant sur la plage de Deshaies, plein en haute saison, quasiment vide en
            basse saison, au point d&apos;être revendu. Les repreneurs ont investi dans un vrai site
            référencé — aujourd&apos;hui ils affichent presque complet midi et soir en basse saison.
            Même emplacement, même clientèle. La différence&nbsp;: ils existent sur Google.&nbsp;»
          </p>
          <p>
            En Guadeloupe, qui accueille plus d&apos;un million de visiteurs par an en plus de sa
            clientèle locale, ne pas être vu en ligne, c&apos;est ne pas exister — peu importe la
            qualité du travail derrière.
          </p>
          <p>
            C&apos;est pour ça qu&apos;est née SolYB&nbsp;: une agence digitale locale, à l&apos;écoute
            réelle de chaque client, qui cherche à chaque fois le meilleur compromis entre prix et
            efficacité.
          </p>
        </div>
      </div>
    </section>
  )
}

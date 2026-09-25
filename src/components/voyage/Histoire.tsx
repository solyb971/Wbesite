import Image from "next/image"

/**
 * « L'histoire » en cinq chapitres. Tout le texte est rendu ici, côté serveur :
 * sans script ou en mouvement réduit, les chapitres se lisent les uns sous les
 * autres. anim/histoire.ts fige la section à l'écran et fait défiler les
 * chapitres un par un pendant que le soleil se couche derrière. Pas de sommaire :
 * le récit se découvre au fil du défilement.
 *
 * `photo` : portrait du fondateur (chemin dans public/) ; à défaut, son initiale.
 * Les `data-t` placent un élément dans la cascade d'entrée de son chapitre (s).
 */
export default function Histoire({ photo }: { photo?: string }) {
  return (
    <section className="chapter histoire" id="apropos" data-scene="4" aria-labelledby="histoire-titre">
      <div className="wrap">
        <div className="card histoire-card">
          <div className="h-aside">
            <h2 id="histoire-titre">
              La Guadeloupe m&apos;a construit. <em>J&apos;ai envie de lui rendre la pareille.</em>
            </h2>
            <p className="h-hint" aria-hidden="true">
              Faites défiler
            </p>
          </div>

          <div className="h-chaps">
            <article className="h-chap" id="h-moi" aria-label="Qui je suis">
              <div className="h-me h-rv">
                <span className="h-avatar" aria-hidden="true">
                  {photo ? <Image src={photo} alt="" width={112} height={112} /> : "Y"}
                </span>
                <div>
                  <b>Yacine Bouhassoun</b>
                  <small>Fondateur de SolYB · Petit-Bourg</small>
                </div>
              </div>
              <p className="h-lead h-rv">
                J&apos;ai grandi en Guadeloupe, une île à l&apos;énergie entrepreneuriale{" "}
                <em>qui ne ressemble à aucune autre.</em>
              </p>
              <p className="h-p h-rv">J&apos;y ai travaillé dans différents corps de métier. Partout, j&apos;ai fait le même constat.</p>
            </article>

            <article className="h-chap" id="h-constat" aria-label="Le constat">
              <div className="h-duo">
                <div className="h-col h-rv">
                  <p className="h-kicker">Sur le terrain</p>
                  <p className="h-words">
                    Compétents.
                    <br />
                    Sérieux.
                    <br />
                    Reconnus.
                  </p>
                </div>
                <div className="h-col h-col--off h-rv" data-t="0.45">
                  <p className="h-kicker">En ligne</p>
                  <p className="h-words">
                    <em className="h-invisible">Invisibles.</em>
                  </p>
                </div>
              </div>
              <p className="h-p h-rv" data-t="0.8">
                Des professionnels avec un savoir-faire de qualité, que leurs futurs clients ne trouvent tout simplement pas.
              </p>
            </article>

            <article className="h-chap" id="h-deshaies" aria-label="L'exemple de Deshaies">
              <p className="h-lead h-rv">
                Un restaurant sur la plage. Plein en haute saison, quasiment vide le reste de l&apos;année, au point
                d&apos;être{" "}
                <span className="h-souligne">
                  revendu
                  <i aria-hidden="true" />
                </span>
                .
              </p>
              <div className="h-panel h-rv" data-t="0.5">
                <p>Les repreneurs investissent dans un vrai site, bien référencé. En basse saison&nbsp;:</p>
                <div className="h-bar">
                  <div className="h-bar-head">
                    <span>Avant</span>
                    <span>Quasiment vide</span>
                  </div>
                  <div className="h-track">
                    <i style={{ width: `${(10 / 60) * 100}%` }} />
                  </div>
                  <p className="h-legende">10 couverts sur 60</p>
                </div>
                <div className="h-bar h-bar--now">
                  <div className="h-bar-head">
                    <span>Aujourd&apos;hui</span>
                    <span>Presque complet, midi et soir</span>
                  </div>
                  <div className="h-track">
                    <i style={{ width: `${(50 / 60) * 100}%` }} />
                  </div>
                  <p className="h-legende">50 couverts sur 60</p>
                </div>
              </div>
              <p className="h-punch h-rv" data-t="2.4">
                Même emplacement, même clientèle. La différence&nbsp;: <em>ils existent sur Google.</em>
              </p>
            </article>

            <article className="h-chap" id="h-enjeu" aria-label="L'enjeu">
              <p className="h-big h-rv">
                <span className="h-plus">+</span>1&nbsp;million
              </p>
              <p className="h-p h-rv" data-t="0.35">
                de visiteurs chaque année en Guadeloupe, en plus de la clientèle locale.
              </p>
              <p className="h-lead h-rv" data-t="0.65">
                Ne pas être vu en ligne, <em>c&apos;est ne pas exister.</em> Peu importe la qualité du travail derrière.
              </p>
            </article>

            <article className="h-chap" id="h-solyb" aria-label="Pourquoi SolYB">
              <p className="h-lead h-lead--xl h-rv">
                C&apos;est pour ça qu&apos;est née Sol<b>YB</b>.
              </p>
              <ul className="h-list">
                <li className="h-rv" data-t="0.3">Une agence digitale 100&nbsp;% locale</li>
                <li className="h-rv" data-t="0.45">À l&apos;écoute réelle de chaque client</li>
                <li className="h-rv" data-t="0.6">Le meilleur compromis entre prix et efficacité</li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}

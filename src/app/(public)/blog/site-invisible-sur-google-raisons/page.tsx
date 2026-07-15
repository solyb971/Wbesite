import { Metadata } from 'next'
import { ArticleShell, ArticleCallout } from '@/components/site/ArticleShell'
import { blogTags } from '@/lib/blog-meta'

const ACCENT = '#0E7C6B'                 // teal caraïbe — rubrique Guides
const ACCENT_INK = '#0E7C6B'             // déjà AA sur crème (4,57)

export const metadata: Metadata = {
  title: 'Mon Site n’Apparaît pas sur Google : les 7 Vraies Raisons (et comment vérifier)',
  description: 'Votre site web est introuvable sur Google ? Les 7 causes les plus fréquentes — indexation, site trop récent, blocage technique, contenu — avec, pour chacune, la vérification à faire soi-même en 2 minutes.',
  keywords: [
    'site invisible sur Google',
    'site web n’apparaît pas sur Google',
    'site pas référencé Google',
    'indexation Google site web',
    'Google Search Console vérifier indexation',
    'référencement site internet Guadeloupe',
  ],
  alternates: {
    canonical: 'https://solyb.fr/blog/site-invisible-sur-google-raisons',
  },
  openGraph: {
    title: 'Mon site n’apparaît pas sur Google : les 7 vraies raisons',
    description: 'Checklist pratique : 7 causes fréquentes d’invisibilité sur Google, et comment vérifier chacune soi-même, gratuitement.',
    url: 'https://solyb.fr/blog/site-invisible-sur-google-raisons',
    type: 'article',
    publishedTime: '2026-07-15',
    authors: ['Yacine Bouhassoun'],
  },
}

export default function SiteInvisibleSurGooglePage() {
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Mon site n’apparaît pas sur Google : les 7 vraies raisons (et comment vérifier)',
    description: 'Les 7 causes les plus fréquentes d’un site invisible sur Google, avec pour chacune une vérification simple à faire soi-même : indexation, ancienneté, blocages techniques, contenu, concurrence.',
    author: { '@type': 'Person', name: 'Yacine Bouhassoun', url: 'https://solyb.fr' },
    publisher: {
      '@type': 'Organization',
      name: 'SolYB',
      logo: { '@type': 'ImageObject', url: 'https://solyb.fr/logo/syb-orange.png' },
      address: { '@type': 'PostalAddress', addressLocality: 'Petit-Bourg', addressRegion: 'Guadeloupe', addressCountry: 'GP' },
    },
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
    mainEntityOfPage: 'https://solyb.fr/blog/site-invisible-sur-google-raisons',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Comment savoir si mon site est indexé par Google ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Tapez site:votredomaine.fr dans Google (sans espace). Si des pages s’affichent, votre site est indexé — le problème est ailleurs (positionnement). Si rien ne s’affiche, Google ne connaît pas encore votre site : c’est un problème d’indexation, le plus souvent lié à l’ancienneté du domaine ou à un blocage technique.' },
      },
      {
        '@type': 'Question',
        name: 'Combien de temps Google met-il à indexer un nouveau site ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Pour un domaine tout neuf, comptez généralement de quelques jours à plusieurs semaines. On peut accélérer les choses en déclarant le site dans Google Search Console, en soumettant un sitemap et en demandant l’indexation des pages principales — mais une part d’attente reste incompressible.' },
      },
      {
        '@type': 'Question',
        name: 'Être indexé suffit-il pour apparaître en première page ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Non. L’indexation signifie que Google connaît vos pages ; le positionnement (apparaître dans les premiers résultats) dépend ensuite de la concurrence sur la requête, de la qualité de votre contenu et de la confiance accumulée par votre site. Un site indexé peut très bien rester en page 5 sur des requêtes disputées.' },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <ArticleShell
        category="Guides"
        accent={ACCENT}
        accentInk={ACCENT_INK}
        title="Mon site n'apparaît pas sur Google : les 7 vraies raisons"
        date="2026-07-15"
        readTime="9 min"
        crumbLabel="Site invisible sur Google"
        crumbHref="/blog/site-invisible-sur-google-raisons"
        tags={blogTags['site-invisible-sur-google-raisons']}
        cta={{
          heading: 'Le diagnostic vous dépasse ?',
          text: 'Si les vérifications techniques de cet article vous semblent obscures, on peut regarder votre site ensemble et vous dire ce qui bloque — sans jargon.',
          primary: { label: 'Demander un diagnostic', href: '/#contact' },
        }}
      >
        <p className="lead">
          Vous avez un site, il vous a coûté du temps ou de l&rsquo;argent, et pourtant : introuvable sur Google. Avant
          de conclure que «&nbsp;le référencement ne marche pas&nbsp;» ou de payer un audit, sachez que dans la grande
          majorité des cas, la cause est l&rsquo;une des <strong>sept raisons</strong> ci-dessous — et que chacune se
          vérifie soi-même, gratuitement, en quelques minutes.
        </p>

        <h2>D&rsquo;abord, le test qui change tout : indexé ou pas ?</h2>
        <p>
          «&nbsp;Mon site n&rsquo;apparaît pas sur Google&nbsp;» recouvre en réalité deux problèmes très différents.
          Pour savoir lequel est le vôtre, tapez ceci dans Google (sans espace après les deux-points)&nbsp;:
        </p>
        <ArticleCallout accent={ACCENT}>
          <p className="m-0 font-mono text-sm" style={{ color: 'var(--syb-ink)' }}>site:votredomaine.fr</p>
          <ul className="space-y-2.5 mt-4 mb-0 list-none p-0" style={{ color: 'var(--syb-stone)' }}>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span><strong style={{ color: 'var(--syb-ink)' }}>Des pages s&rsquo;affichent</strong> → votre site est <strong>indexé</strong>. Google le connaît, mais le classe mal : voyez les raisons 5 à 7.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span><strong style={{ color: 'var(--syb-ink)' }}>Rien ne s&rsquo;affiche</strong> → votre site n&rsquo;est <strong>pas indexé</strong>. Google ne le connaît pas encore : voyez les raisons 1 à 4.</span></li>
          </ul>
        </ArticleCallout>

        <h2>Raison 1 — Votre site est trop récent</h2>
        <p>
          C&rsquo;est la cause la plus fréquente, et la plus frustrante parce qu&rsquo;elle ne se «&nbsp;répare&nbsp;»
          pas : elle s&rsquo;attend. Google découvre les nouveaux sites en suivant des liens et en recevant des
          signalements, puis les explore, puis les indexe — et pour un domaine tout neuf, ce cycle prend
          <strong> de quelques jours à plusieurs semaines</strong>. Un site mis en ligne il y a dix jours et invisible
          n&rsquo;a, le plus souvent, aucun problème.
        </p>
        <p>
          <strong>Ce que vous pouvez faire</strong> : déclarer votre site dans <strong>Google Search Console</strong>
          (l&rsquo;outil gratuit de Google pour les propriétaires de sites), y soumettre votre sitemap, et utiliser
          «&nbsp;Inspection de l&rsquo;URL → Demander une indexation&nbsp;» sur vos pages principales. Cela
          n&rsquo;élimine pas l&rsquo;attente, mais cela la raccourcit souvent nettement.
        </p>

        <h2>Raison 2 — Votre site dit lui-même à Google de ne pas venir</h2>
        <p>
          Cela paraît absurde, mais c&rsquo;est un classique : de nombreux sites sont livrés avec une consigne
          <strong> «&nbsp;noindex&nbsp;»</strong> (ne pas indexer) ou un fichier <strong>robots.txt</strong> qui bloque
          l&rsquo;exploration. Ces réglages servent pendant la construction du site… et on oublie de les retirer à la
          mise en ligne. Résultat : Google obéit, et n&rsquo;indexe rien.
        </p>
        <p>
          <strong>Comment vérifier</strong> : dans Google Search Console, l&rsquo;outil «&nbsp;Inspection de
          l&rsquo;URL&nbsp;» vous dit noir sur blanc si une page est bloquée et pourquoi. Sans Search Console, vous
          pouvez déjà consulter <span className="font-mono text-sm">votredomaine.fr/robots.txt</span> : si vous y lisez
          «&nbsp;Disallow: /&nbsp;» seul sous «&nbsp;User-agent: *&nbsp;», tout votre site est fermé aux moteurs.
          Si vous avez un doute, c&rsquo;est LA question à poser à la personne qui a fait votre site.
        </p>

        <h2>Raison 3 — Aucun chemin ne mène à votre site</h2>
        <p>
          Google découvre le web de proche en proche, en suivant des liens. Un site que <strong>personne ne
          mentionne nulle part</strong> — aucun lien depuis une fiche Google, un annuaire, un réseau social, un
          partenaire — peut mettre très longtemps à être découvert. C&rsquo;est le cas de beaucoup de sites de TPE :
          techniquement corrects, mais posés au milieu de nulle part.
        </p>
        <p>
          <strong>Ce que vous pouvez faire</strong> : ajoutez l&rsquo;adresse de votre site partout où votre entreprise
          existe déjà — votre fiche d&rsquo;établissement Google (levier n°1), vos profils Facebook et Instagram, les
          annuaires professionnels de votre secteur. Chaque lien est une porte d&rsquo;entrée pour Google, et souvent
          aussi pour de vrais clients.
        </p>

        <h2>Raison 4 — Un problème technique empêche l&rsquo;exploration</h2>
        <p>
          Plus rare, mais réel : site très lent ou souvent hors ligne, pages entièrement construites d&rsquo;une façon
          que Google peine à lire, domaine mal configuré, certificat de sécurité expiré… Si les raisons 1 à 3 sont
          écartées et que Search Console signale des erreurs d&rsquo;exploration, le problème est technique et relève
          de la personne qui gère votre site.
        </p>

        <h2>Raison 5 — Vous cherchez des requêtes que personne ne dispute… sauf des géants</h2>
        <p>
          À partir d&rsquo;ici, votre site est indexé : le sujet n&rsquo;est plus «&nbsp;exister&nbsp;» mais
          «&nbsp;être bien classé&nbsp;». Et le classement dépend d&rsquo;abord de <strong>la requête</strong>. Sur
          «&nbsp;restaurant&nbsp;», vous affrontez TripAdvisor, TheFork et des milliers de sites — mission quasi
          impossible. Sur «&nbsp;restaurant créole Sainte-Anne bord de mer&nbsp;», la concurrence fond, et vos chances
          montent en flèche.
        </p>
        <p>
          <strong>Ce que vous pouvez faire</strong> : visez des requêtes <strong>précises et locales</strong>, celles
          que tape réellement votre client (métier + commune, service + «&nbsp;Guadeloupe&nbsp;»), et assurez-vous que
          ces mots figurent naturellement dans vos pages — dans les titres, pas seulement dans les images.
        </p>

        <h2>Raison 6 — Votre site n&rsquo;a presque rien à lire</h2>
        <p>
          Google classe des <strong>contenus</strong>, pas des designs. Un site vitrine de quatre pages avec trois
          phrases par page, aussi élégant soit-il, donne très peu de matière à indexer. À l&rsquo;inverse, une page qui
          répond vraiment à une question (vos prestations détaillées, vos zones d&rsquo;intervention, vos réponses aux
          questions fréquentes) a une vraie chance d&rsquo;apparaître.
        </p>
        <p>
          <strong>Ce que vous pouvez faire</strong> : étoffez vos pages principales — décrivez ce que vous faites, pour
          qui, où, comment — et si vous en avez l&rsquo;énergie, publiez de temps en temps un contenu utile à vos
          clients. Pas besoin d&rsquo;un article par semaine : quelques pages solides valent mieux qu&rsquo;un blog
          abandonné.
        </p>

        <h2>Raison 7 — Il est juste trop tôt pour cette bataille-là</h2>
        <p>
          Dernière raison, la moins avouée : le référencement est une <strong>accumulation de confiance</strong>. Un
          site récent, même parfait, part derrière des concurrents présents depuis dix ans, cités par des dizaines
          d&rsquo;autres sites. Ce n&rsquo;est pas une fatalité — c&rsquo;est une trajectoire : chaque mois de contenu
          utile, d&rsquo;avis clients et de liens gagnés vous fait remonter. Méfiez-vous de quiconque promet la
          «&nbsp;première page en 30 jours garantie&nbsp;» : personne ne contrôle Google, et ce genre de promesse
          finance surtout des factures.
        </p>

        <h2>La checklist récapitulative</h2>
        <ArticleCallout accent={ACCENT}>
          <ul className="space-y-2.5 m-0 list-none p-0" style={{ color: 'var(--syb-stone)' }}>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span>Tapez <span className="font-mono text-sm">site:votredomaine.fr</span> — indexé ou pas ?</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span>Site récent ? Déclarez-le dans Search Console, soumettez le sitemap, demandez l&rsquo;indexation… et patientez.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span>Vérifiez qu&rsquo;aucun «&nbsp;noindex&nbsp;» ni robots.txt ne bloque l&rsquo;accès.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span>Créez des portes d&rsquo;entrée : fiche Google, réseaux, annuaires.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span>Visez des requêtes locales et précises, présentes dans vos titres.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span>Donnez à Google de la matière : des pages qui répondent à de vraies questions.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span>Acceptez le facteur temps — et fuyez les promesses de première page garantie.</span></li>
          </ul>
        </ArticleCallout>

        <h2>Questions fréquentes</h2>
        <h3>Google est-il payant pour être référencé ?</h3>
        <p>
          Non. L&rsquo;indexation et le classement dans les résultats «&nbsp;naturels&nbsp;» sont gratuits. Ce qui est
          payant, c&rsquo;est la publicité (les résultats marqués «&nbsp;Sponsorisé&nbsp;»), qui est un levier
          différent — utile parfois, mais jamais obligatoire pour exister sur Google.
        </p>
        <h3>Mon site apparaît quand je tape son nom, mais pas sur mes mots-clés. C&rsquo;est grave ?</h3>
        <p>
          C&rsquo;est même bon signe : votre site est indexé et Google l&rsquo;associe correctement à votre marque. Le
          travail restant est celui du positionnement (raisons 5 à 7) : des contenus plus riches, des requêtes mieux
          ciblées, et du temps.
        </p>
        <h3>Dois-je payer un audit SEO ?</h3>
        <p>
          Pas avant d&rsquo;avoir fait les vérifications gratuites de cet article. Beaucoup d&rsquo;«&nbsp;audits&nbsp;»
          facturés ne font que constater ce que <span className="font-mono text-sm">site:</span> et Search Console vous
          auraient dit en dix minutes. Un audit approfondi a de la valeur, mais après les bases — pas à leur place.
        </p>

        <h2>En résumé</h2>
        <p>
          Un site invisible sur Google, c&rsquo;est soit un site <strong>que Google ne connaît pas encore</strong>
          (trop récent, bloqué, ou sans aucun lien entrant), soit un site <strong>que Google connaît mais classe
          mal</strong> (requêtes trop disputées, contenu trop maigre, confiance pas encore accumulée). Le test
          <span className="font-mono text-sm"> site:votredomaine.fr</span> vous dit en dix secondes dans quel cas vous
          êtes, et Google Search Console — gratuit — fait le reste du diagnostic. Faites ces vérifications avant de
          payer qui que ce soit : dans la plupart des cas, vous saurez exactement où vous en êtes.
        </p>
      </ArticleShell>
    </>
  )
}

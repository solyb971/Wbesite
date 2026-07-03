import { Metadata } from 'next'
import { ArticleShell, ArticleCallout } from '@/components/site/ArticleShell'
import { blogTags } from '@/lib/blog-meta'

const ACCENT = '#B8760A'                 // or éditorial — éléments visuels
const ACCENT_INK = 'var(--syb-rust-ink)' // textes/liens harmonisés sur le rust de la home

export const metadata: Metadata = {
  title: 'Prix Création Site Web en Guadeloupe : Le Guide Complet 2026',
  description: 'Combien coûte vraiment un site web en Guadeloupe ? Fourchettes par prestataire, ce qui fait varier le tarif, coût réel sur 3 ans et pièges à éviter. Guide neutre pour TPE.',
  keywords: [
    'prix site web Guadeloupe',
    'tarif création site 971',
    'agence web Guadeloupe prix',
    'coût site internet Guadeloupe',
    'devis site web Guadeloupe',
    'combien coûte un site vitrine Guadeloupe',
  ],
  alternates: {
    canonical: 'https://solyb.fr/blog/prix-site-web-guadeloupe',
  },
  openGraph: {
    title: 'Prix Site Web Guadeloupe 2026 — Le Guide Complet',
    description: 'Comparatif détaillé des prix pour créer un site web en Guadeloupe : fourchettes par prestataire, coût réel sur 3 ans et pièges à éviter.',
    url: 'https://solyb.fr/blog/prix-site-web-guadeloupe',
    type: 'article',
    publishedTime: '2026-05-12',
    modifiedTime: '2026-07-02',
    authors: ['Yacine Bouhassoun'],
  },
}

export default function PrixSiteWebGuadeloupePage() {
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Prix Création Site Web en Guadeloupe : Le Guide Complet 2026',
    description: 'Guide neutre et détaillé des prix pour créer un site web en Guadeloupe en 2026 : fourchettes par prestataire, coût réel sur 3 ans, pièges à éviter.',
    author: { '@type': 'Person', name: 'Yacine Bouhassoun', url: 'https://solyb.fr' },
    publisher: {
      '@type': 'Organization',
      name: 'SolYB',
      logo: { '@type': 'ImageObject', url: 'https://solyb.fr/logo/syb-orange.png' },
      address: { '@type': 'PostalAddress', addressLocality: 'Petit-Bourg', addressRegion: 'Guadeloupe', addressCountry: 'GP' },
    },
    datePublished: '2026-05-12',
    dateModified: '2026-07-02',
    mainEntityOfPage: 'https://solyb.fr/blog/prix-site-web-guadeloupe',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Combien coûte un site web en Guadeloupe en 2026 ?',
        acceptedAnswer: { '@type': 'Answer', text: "Pour une TPE guadeloupéenne, un site vitrine professionnel se situe le plus souvent entre 600 € et 1 500 €. Un freelance local démarre autour de 490-2 000 €, une petite agence entre 790 et 3 500 €, une grande agence entre 2 500 et 8 000 €. Une boutique e-commerce démarre plus haut (souvent 1 500-4 000 €). Au-delà, vous payez surtout la structure du prestataire." },
      },
      {
        '@type': 'Question',
        name: "Pourquoi deux sites au même nombre de pages n'ont pas le même prix ?",
        acceptedAnswer: { '@type': 'Answer', text: "Le prix dépend surtout du design (sur-mesure ou template), du nombre de fonctionnalités (formulaire, réservation, multilingue, espace membre), de la présence d'une boutique en ligne, du travail de référencement (SEO local), et de ce qui est inclus (hébergement, domaine, formation, maintenance). Deux sites de 5 pages peuvent aller du simple au triple selon ces critères." },
      },
      {
        '@type': 'Question',
        name: "Faut-il payer son site en une fois ou par abonnement mensuel ?",
        acceptedAnswer: { '@type': 'Answer', text: "Attention aux offres à « 49 €/mois » : sur deux ou trois ans, elles reviennent souvent plus cher, et surtout vous n'êtes généralement pas propriétaire du site — si vous arrêtez de payer, il disparaît. Privilégiez, quand c'est possible, un paiement unique qui vous rend propriétaire du code, des contenus et du nom de domaine." },
      },
      {
        '@type': 'Question',
        name: "Le prix inclut-il l'hébergement et le nom de domaine ?",
        acceptedAnswer: { '@type': 'Answer', text: "Cela dépend du prestataire. Certains incluent l'hébergement et le domaine la première année, d'autres les facturent à part (souvent 50 à 150 €/an au total). Demandez toujours un devis qui précise ce qui est inclus, et vérifiez que le domaine sera bien à VOTRE nom, pas à celui de l'agence." },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <ArticleShell
        category="Prix & Tarifs"
        accent={ACCENT}
        accentInk={ACCENT_INK}
        title="Prix création site web en Guadeloupe : le guide complet 2026"
        date="2026-05-12"
        readTime="11 min"
        crumbLabel="Prix création site web"
        crumbHref="/blog/prix-site-web-guadeloupe"
        tags={blogTags['prix-site-web-guadeloupe']}
        cta={{
          heading: 'Envie d’un devis clair, sans surprise ?',
          text: 'On affiche nos tarifs et on vous livre un site vitrine professionnel en 2 à 3 semaines. Devis gratuit sous 24 h, sans engagement.',
          primary: { label: 'Demander un devis', href: '/#contact' },
        }}
      >
        <p className="lead">
          Combien coûte <strong>vraiment</strong> un site web en Guadeloupe en 2026 ? Entre la grande agence qui annonce
          5 000 € et le freelance à 500 €, difficile de savoir où se situe le juste prix — et surtout, ce que vous payez
          réellement. Ce guide fait le point, de façon <strong>neutre</strong> : les fourchettes du marché guadeloupéen,
          ce qui fait varier un devis du simple au triple, le coût réel d&rsquo;un site sur trois ans, et les pièges à
          repérer avant de signer.
        </p>

        <h2>Combien coûte vraiment un site web en Guadeloupe ?</h2>
        <p>
          Commençons par une réponse honnête : <strong>«&nbsp;ça dépend&nbsp;»</strong>. Non pas pour éluder la question,
          mais parce qu&rsquo;un «&nbsp;site web&nbsp;» peut désigner une simple carte de visite en ligne comme une
          boutique complète avec paiement. Cela dit, on peut donner des repères clairs. Pour une TPE guadeloupéenne
          (artisan, commerce, restaurant, cabinet, gîte), un <strong>site vitrine professionnel se situe le plus souvent
          entre 600 € et 1 500 €</strong>. En dessous, méfiance sur la qualité ou la propriété ; au-dessus, vous payez
          souvent surtout la structure de l&rsquo;agence, pas le site lui-même.
        </p>

        <h2>Les fourchettes de prix par prestataire</h2>
        <p>
          Le prix d&rsquo;un site vitrine dépend d&rsquo;abord de <strong>qui le réalise</strong>. Voici les ordres de
          grandeur constatés en Guadeloupe pour un site professionnel de 5 à 7 pages.
        </p>
        <ArticleCallout accent={ACCENT}>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: `2px solid ${ACCENT}` }}>
                  <th className="text-left py-3 px-3" style={{ color: 'var(--syb-ink)' }}>Prestataire</th>
                  <th className="text-left py-3 px-3" style={{ color: 'var(--syb-ink)' }}>Fourchette</th>
                  <th className="text-left py-3 px-3" style={{ color: 'var(--syb-ink)' }}>Délai moyen</th>
                </tr>
              </thead>
              <tbody style={{ color: 'var(--syb-stone)' }}>
                <tr style={{ borderBottom: '0.5px solid var(--syb-border)' }}><td className="py-3 px-3">Freelance local</td><td className="py-3 px-3">490 € – 2 000 €</td><td className="py-3 px-3">2 – 6 semaines</td></tr>
                <tr style={{ borderBottom: '0.5px solid var(--syb-border)' }}><td className="py-3 px-3">Petite agence 971</td><td className="py-3 px-3">790 € – 3 500 €</td><td className="py-3 px-3">4 – 8 semaines</td></tr>
                <tr style={{ borderBottom: '0.5px solid var(--syb-border)' }}><td className="py-3 px-3">Grande agence</td><td className="py-3 px-3">2 500 € – 8 000 €</td><td className="py-3 px-3">2 – 4 mois</td></tr>
                <tr><td className="py-3 px-3">Solution DIY (Wix…)</td><td className="py-3 px-3">0 € – 300 €/an</td><td className="py-3 px-3">1 – 2 semaines</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-5 mb-0 text-sm font-semibold" style={{ color: ACCENT_INK }}>
            Le meilleur rapport qualité-prix pour une TPE se trouve généralement entre 1 000 et 1 500 €, chez un indépendant ou une petite agence.
          </p>
        </ArticleCallout>
        <p>
          Deux précisions utiles. Le <strong>«&nbsp;faites-le vous-même&nbsp;»</strong> (Wix, Squarespace…) semble gratuit
          ou presque, mais il vous coûte surtout du <strong>temps</strong> — souvent des dizaines d&rsquo;heures — pour un
          résultat rarement optimisé pour Google, et vous restez locataire de la plateforme. À l&rsquo;autre bout, la
          <strong> grande agence</strong> facture aussi ses locaux, ses commerciaux et ses chefs de projet : une part
          importante du prix ne va pas dans votre site. Entre les deux, l&rsquo;indépendant ou la petite structure offre
          souvent le meilleur équilibre.
        </p>

        <h2>Ce qui fait varier le prix, du simple au triple</h2>
        <p>
          Deux sites au même nombre de pages peuvent avoir des prix très différents. Voici les facteurs qui pèsent
          vraiment&nbsp;:
        </p>
        <ul>
          <li><strong>Design sur-mesure ou template.</strong> Un thème acheté 40 € et adapté coûte forcément moins cher qu&rsquo;une maquette dessinée spécifiquement pour votre marque. Le template va plus vite ; le sur-mesure vous démarque.</li>
          <li><strong>Nombre de pages et de fonctionnalités.</strong> Une page «&nbsp;contact&nbsp;» est simple ; une prise de rendez-vous en ligne, un espace membre, un site multilingue ou un formulaire complexe demandent du développement supplémentaire.</li>
          <li><strong>E-commerce.</strong> Dès qu&rsquo;il y a paiement, gestion des stocks, livraison et fiches produits, on change de catégorie : une boutique démarre plus haut qu&rsquo;un site vitrine (souvent 1 500-4 000 €).</li>
          <li><strong>Le référencement (SEO).</strong> Un site simplement «&nbsp;en ligne&nbsp;» ne se trouve pas tout seul sur Google. Un site pensé pour être <strong>trouvé</strong> (structure, contenus, SEO local Guadeloupe) demande plus de travail — mais c&rsquo;est lui qui vous ramène des clients.</li>
          <li><strong>Les contenus.</strong> Qui écrit les textes ? Qui fournit les photos ? Si le prestataire s&rsquo;en charge (rédaction, séance photo), c&rsquo;est un vrai poste de coût — souvent sous-estimé.</li>
          <li><strong>Hébergement, domaine et maintenance.</strong> Parfois inclus la première année, parfois facturés à part. C&rsquo;est le nerf du «&nbsp;coût réel&nbsp;», qu&rsquo;on détaille juste après.</li>
        </ul>

        <h2>Le vrai coût d&rsquo;un site : pensez sur 3 ans, pas juste à la création</h2>
        <p>
          C&rsquo;est le point que la plupart des comparatifs oublient. Le prix affiché est le <strong>prix de
          création</strong>. Mais un site vit ensuite : il faut l&rsquo;héberger, renouveler le domaine, le mettre à
          jour, le sécuriser. Pour comparer honnêtement deux devis, regardez le <strong>coût total sur 3 ans</strong>.
        </p>
        <ArticleCallout accent={ACCENT}>
          <p className="font-semibold mb-3" style={{ color: 'var(--syb-ink)' }}>Deux offres à 1 200 € qui ne se valent pas</p>
          <ul className="space-y-2.5 m-0 list-none p-0" style={{ color: 'var(--syb-stone)' }}>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} />
              <span><strong style={{ color: 'var(--syb-ink)' }}>Offre A</strong> — 1 200 € tout compris, hébergement et domaine offerts la 1<sup>re</sup> année, puis ~100 €/an. Sur 3 ans : <strong>~1 400 €</strong>, et vous êtes propriétaire.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} />
              <span><strong style={{ color: 'var(--syb-ink)' }}>Offre B</strong> — «&nbsp;49 €/mois&nbsp;», rien à payer au départ. Sur 3 ans : <strong>~1 760 €</strong>, et si vous arrêtez, le site disparaît. Vous n&rsquo;avez jamais rien possédé.</span>
            </li>
          </ul>
          <p className="mt-4 mb-0 text-sm font-semibold" style={{ color: ACCENT_INK }}>
            Même «&nbsp;prix&nbsp;» affiché, réalité très différente. Toujours raisonner sur la durée.
          </p>
        </ArticleCallout>

        <h2>Les pièges qui font gonfler (ou disparaître) votre investissement</h2>

        <h3>1. L&rsquo;abonnement mensuel sans propriété</h3>
        <p>
          Certaines offres proposent un site pour «&nbsp;49 €/mois&nbsp;». C&rsquo;est confortable au départ, mais sur
          deux ou trois ans, cela chiffre — et surtout, <strong>vous n&rsquo;êtes pas propriétaire</strong> : le jour où
          vous arrêtez de payer, le site s&rsquo;éteint. Vous avez loué, pas acheté. Quand c&rsquo;est possible,
          préférez un <strong>paiement unique</strong> qui vous rend propriétaire.
        </p>

        <h3>2. Le prix «&nbsp;à partir de…&nbsp;» trompeur</h3>
        <p>
          Un «&nbsp;site à partir de 490 €&nbsp;» se transforme souvent une fois le devis détaillé arrivé :
        </p>
        <ArticleCallout accent={ACCENT}>
          <ul className="space-y-1.5 m-0" style={{ color: 'var(--syb-stone)' }}>
            <li>Site de base : 490 €</li>
            <li>Design personnalisé : +400 €</li>
            <li>Formulaire de contact : +150 €</li>
            <li>Référencement de base : +300 €</li>
            <li>Version mobile : +200 €</li>
          </ul>
          <p className="mt-3 mb-0 font-semibold" style={{ color: ACCENT_INK }}>Total réel : 1 540 € — soit plus du triple du prix d&rsquo;appel.</p>
        </ArticleCallout>
        <p>
          La parade est simple : demandez toujours un <strong>devis complet et final</strong>, en faisant préciser ce qui
          est inclus (design, mobile, formulaire, SEO, hébergement, domaine, formation, révisions) avant de vous engager.
        </p>

        <h3>3. À qui appartient votre domaine ?</h3>
        <p>
          C&rsquo;est le piège le plus vicieux, parce qu&rsquo;on ne le découvre qu&rsquo;en cas de brouille. Certains
          prestataires enregistrent le nom de domaine <strong>à leur nom</strong>, pas au vôtre. Résultat : si vous
          voulez partir, vous ne pouvez pas emmener votre adresse (votre référencement, vos cartes de visite, vos
          e-mails…). Exigez que le <strong>domaine, l&rsquo;hébergement et les accès soient à votre nom</strong>, dès le
          départ. C&rsquo;est votre bien.
        </p>

        <h2>Combien prévoir selon votre besoin ?</h2>
        <ArticleCallout accent={ACCENT}>
          <ul className="space-y-3 m-0 list-none p-0" style={{ color: 'var(--syb-stone)' }}>
            <li><strong style={{ color: 'var(--syb-ink)' }}>Budget serré (moins de 800 €)</strong> — Freelance local ou jeune agence, site vitrine simple mais soigné. Vérifiez les réalisations, et surtout que vous serez propriétaire.</li>
            <li><strong style={{ color: 'var(--syb-ink)' }}>Budget moyen (800 – 2 000 €)</strong> — Site vitrine complet, design sur-mesure, SEO local. Le meilleur rapport qualité-prix pour la plupart des TPE guadeloupéennes.</li>
            <li><strong style={{ color: 'var(--syb-ink)' }}>Budget ambitieux (2 000 € et plus)</strong> — Boutique e-commerce, fonctionnalités avancées, ou application métier sur-mesure conçue pour votre logique.</li>
          </ul>
        </ArticleCallout>

        <h2>Comment bien lire un devis de site web</h2>
        <p>
          Avant de signer, passez le devis à ce petit filtre. Un bon prestataire répondra sans détour à chacun de ces
          points&nbsp;:
        </p>
        <ol>
          <li><strong>Que contient exactement le prix ?</strong> (nombre de pages, design, mobile, formulaire, SEO)</li>
          <li><strong>L&rsquo;hébergement et le domaine sont-ils inclus, et à quel tarif ensuite ?</strong></li>
          <li><strong>Serai-je propriétaire du site, du domaine et des accès ?</strong></li>
          <li><strong>Qui écrit les textes et fournit les photos ?</strong></li>
          <li><strong>Combien de révisions sont comprises ? Y a-t-il une formation ?</strong></li>
          <li><strong>Que se passe-t-il après la livraison ?</strong> (maintenance, support, mises à jour)</li>
        </ol>

        <h2>Et SolYB dans tout ça ?</h2>
        <p>
          Pour être transparent : <strong>SolYB est une jeune agence guadeloupéenne</strong>. Pour ses premiers clients,
          elle propose un <strong>tarif de lancement de 599 € pour un site vitrine</strong> (hébergement et nom de domaine
          offerts la première année, formation et support inclus), avec la possibilité de <strong>payer en deux fois</strong>.
          C&rsquo;est un tarif volontairement accessible, réservé aux premiers projets et amené à évoluer. Nos prix sont
          affichés publiquement, et le site vous appartient à 100 % — code, contenus et domaine. Quel que soit le
          prestataire que vous choisirez, exigez cette même transparence.
        </p>

        <h2>Questions fréquentes</h2>
        <h3>Un site pas cher, c&rsquo;est forcément un mauvais site ?</h3>
        <p>
          Non. Un freelance local ou une jeune agence peut livrer un excellent site à petit prix. Le vrai critère
          n&rsquo;est pas le montant seul, mais ce qui est inclus, la qualité des réalisations, et le fait que vous
          soyez propriétaire. Méfiez-vous surtout des prix «&nbsp;trop beaux&nbsp;» sans devis détaillé.
        </p>
        <h3>Faut-il un site ou juste une page Facebook / Google ?</h3>
        <p>
          Une fiche Google Business et une page Facebook sont indispensables et gratuites, mais elles ne remplacent pas
          un site : vous ne contrôlez ni leur design, ni leurs règles, et vous n&rsquo;êtes pas propriétaire. Le site est
          votre base, que vous complétez avec ces plateformes.
        </p>
        <h3>Combien de temps pour avoir mon site ?</h3>
        <p>
          Comptez 2 à 3 semaines pour un site vitrine, 3 à 4 semaines pour une boutique en ligne, une fois les contenus
          réunis. L&rsquo;étape la plus longue est souvent de rassembler textes et photos — anticipez-la.
        </p>

        <h2>En résumé</h2>
        <p>
          Pour une TPE guadeloupéenne, un site vitrine professionnel se situe le plus souvent entre <strong>600 € et
          1 500 €</strong>. Au-delà, vous payez surtout la structure du prestataire. Mais le prix affiché ne dit pas
          tout : raisonnez sur <strong>trois ans</strong>, exigez d&rsquo;être <strong>propriétaire</strong> de votre
          site et de votre domaine, et méfiez-vous des «&nbsp;à partir de&nbsp;» et des abonnements sans fin. Le bon
          prestataire, ce n&rsquo;est pas le moins cher ni le plus cher : c&rsquo;est celui qui affiche ses tarifs
          clairement, vous rend propriétaire, et vous montre des réalisations concrètes.
        </p>
      </ArticleShell>
    </>
  )
}

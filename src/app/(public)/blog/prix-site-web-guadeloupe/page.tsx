import { Metadata } from 'next'
import { ArticleShell, ArticleCallout } from '@/components/site/ArticleShell'

const ACCENT = '#B8760A'      // or éditorial
const ACCENT_INK = '#96600A'  // variante texte (AA sur crème)

export const metadata: Metadata = {
  title: 'Prix Création Site Web en Guadeloupe : Le Guide Complet 2026',
  description: 'Combien coûte un site web en Guadeloupe ? Fourchettes de prix par prestataire, ce qui fait varier le tarif, les pièges à éviter. Guide neutre pour TPE guadeloupéennes.',
  keywords: [
    'prix site web Guadeloupe',
    'tarif création site 971',
    'agence web Guadeloupe prix',
    'coût site internet Guadeloupe',
    'devis site web Guadeloupe',
  ],
  alternates: {
    canonical: 'https://solyb.fr/blog/prix-site-web-guadeloupe',
  },
  openGraph: {
    title: 'Prix Site Web Guadeloupe 2026 - Guide Complet',
    description: 'Comparatif détaillé des prix pour créer un site web en Guadeloupe. Fourchettes par prestataire et pièges à éviter.',
    url: 'https://solyb.fr/blog/prix-site-web-guadeloupe',
    type: 'article',
    publishedTime: '2026-05-12',
    authors: ['Yacine Bouhassoun'],
  },
}

export default function PrixSiteWebGuadeloupePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Prix Création Site Web en Guadeloupe : Le Guide Complet 2026',
    description: 'Guide neutre des prix pour créer un site web en Guadeloupe en 2026',
    author: { '@type': 'Person', name: 'Yacine Bouhassoun', url: 'https://solyb.fr' },
    publisher: {
      '@type': 'Organization',
      name: 'SolYB',
      address: { '@type': 'PostalAddress', addressLocality: 'Petit-Bourg', addressRegion: 'Guadeloupe', addressCountry: 'GP' },
    },
    datePublished: '2026-05-12',
    dateModified: '2026-05-12',
    mainEntityOfPage: 'https://solyb.fr/blog/prix-site-web-guadeloupe',
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ArticleShell
        category="Prix & Tarifs"
        accent={ACCENT}
        accentInk={ACCENT_INK}
        title="Prix création site web en Guadeloupe : le guide complet 2026"
        date="2026-05-12"
        readTime="10 min"
        crumbLabel="Prix création site web"
        crumbHref="/blog/prix-site-web-guadeloupe"
        cta={{
          heading: 'Envie d’un devis clair, sans surprise ?',
          text: 'On affiche nos tarifs et on vous livre un site vitrine professionnel en 2 semaines. Devis gratuit sous 24h, sans engagement.',
          primary: { label: 'Demander un devis', href: '/#contact' },
        }}
      >
        <p className="lead">
          Combien coûte <strong>vraiment</strong> un site web en Guadeloupe en 2026 ? Entre les grandes agences
          à 5 000 € et les freelances à 500 €, difficile de s&apos;y retrouver. Ce guide fait le point, de façon
          neutre, sur les <strong>fourchettes de prix du marché guadeloupéen</strong>, ce qui les fait varier,
          et les pièges à connaître avant de signer un devis.
        </p>

        <h2>Les fourchettes de prix par prestataire</h2>
        <p>
          Le prix d&apos;un site vitrine dépend surtout de <strong>qui le réalise</strong>. Voici les ordres de
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
            En pratique, comptez autour de 1 000 – 1 500 € pour un site vitrine professionnel chez un indépendant ou une petite agence.
          </p>
        </ArticleCallout>

        <h2>Qu&apos;est-ce qui fait varier le prix ?</h2>
        <p>Deux sites au même nombre de pages peuvent aller du simple au triple. Les principaux facteurs :</p>
        <ul>
          <li><strong>Design sur-mesure ou template</strong> — un thème acheté coûte moins cher qu&apos;une maquette dessinée pour vous.</li>
          <li><strong>Nombre de pages et de fonctionnalités</strong> — formulaire, prise de rendez-vous, multilingue, espace membre…</li>
          <li><strong>E-commerce</strong> — une boutique (paiement, stocks, livraison) démarre plus haut qu&apos;un site vitrine.</li>
          <li><strong>Référencement (SEO)</strong> — un site pensé pour être trouvé sur Google demande plus de travail.</li>
          <li><strong>Hébergement, nom de domaine et maintenance</strong> — parfois inclus la première année, parfois facturés à part.</li>
        </ul>

        <h2>Les pièges à éviter</h2>

        <h3>1. L&apos;abonnement mensuel sans propriété</h3>
        <p>
          Certaines offres proposent un site pour « 49 €/mois ». Sur deux ans, cela fait près de 1 200 € — et
          <strong> vous n&apos;êtes pas propriétaire</strong> : si vous arrêtez de payer, le site disparaît.
          Préférez, quand c&apos;est possible, un <strong>paiement unique</strong> qui vous rend propriétaire de votre site.
        </p>

        <h3>2. Le prix « à partir de… » trompeur</h3>
        <p>
          Un « site à partir de 490 € » se transforme souvent, une fois le devis détaillé arrivé :
        </p>
        <ul>
          <li>Site de base : 490 €</li>
          <li>Design personnalisé : +400 €</li>
          <li>Formulaire de contact : +150 €</li>
          <li>Référencement de base : +300 €</li>
          <li>Version mobile : +200 €</li>
          <li><strong>Total réel : 1 540 €</strong></li>
        </ul>
        <p>
          Demandez toujours un <strong>devis complet et final</strong>, en clarifiant ce qui est inclus (hébergement,
          domaine, formation, révisions) avant de vous engager.
        </p>

        <h2>Combien prévoir selon votre besoin ?</h2>
        <ArticleCallout accent={ACCENT}>
          <ul className="space-y-3 m-0 list-none p-0">
            <li style={{ color: 'var(--syb-stone)' }}><strong style={{ color: 'var(--syb-ink)' }}>Budget serré (&lt; 800 €)</strong> — freelance local ou jeune agence, site vitrine simple mais soigné. Vérifiez les réalisations et que vous serez propriétaire.</li>
            <li style={{ color: 'var(--syb-stone)' }}><strong style={{ color: 'var(--syb-ink)' }}>Budget moyen (800 – 2 000 €)</strong> — site vitrine complet, design sur-mesure, SEO local. Le meilleur rapport qualité/prix pour la plupart des TPE.</li>
            <li style={{ color: 'var(--syb-stone)' }}><strong style={{ color: 'var(--syb-ink)' }}>Budget ambitieux (2 000 € +)</strong> — e-commerce, fonctionnalités avancées ou application métier sur mesure.</li>
          </ul>
        </ArticleCallout>

        <h2>Et SolYB dans tout ça ?</h2>
        <p>
          Pour être transparent : <strong>SolYB est une jeune agence guadeloupéenne</strong>. Pour ses premiers
          clients, elle propose un <strong>tarif de lancement de 599 € pour un site vitrine</strong> (hébergement et
          nom de domaine offerts la première année, formation et support inclus). C&apos;est un tarif volontairement
          accessible, <strong>réservé aux premiers projets et amené à évoluer</strong> ensuite. Les prix sont affichés
          publiquement — quel que soit le prestataire que vous choisirez, exigez cette même transparence.
        </p>

        <h2>Conclusion</h2>
        <p>
          Pour une TPE guadeloupéenne, un site vitrine professionnel se situe le plus souvent entre
          <strong> 600 € et 1 500 €</strong>. Au-delà, vous payez surtout la structure de l&apos;agence. Le bon
          prestataire, c&apos;est celui qui affiche ses tarifs clairement, vous rend propriétaire de votre site,
          et vous montre des réalisations concrètes.
        </p>
      </ArticleShell>
    </>
  )
}

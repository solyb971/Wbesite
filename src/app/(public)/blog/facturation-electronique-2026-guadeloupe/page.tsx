import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, Check, AlertTriangle } from 'lucide-react'
import Breadcrumbs from '@/components/site/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Facturation Électronique 2026 en Guadeloupe : Guide TPE/PME',
  description: 'Facturation électronique obligatoire 2026 en Guadeloupe et DOM : dates, entreprises concernées, TVA DOM (8,5 % / 2,1 %), Chorus Pro, sanctions. Le guide clair pour les TPE/PME.',
  keywords: [
    'facturation électronique 2026 Guadeloupe',
    'facturation électronique DOM',
    'réforme facturation 2026 Guadeloupe',
    'Chorus Pro Guadeloupe',
    'TVA DOM 8,5%',
    'Factur-X Guadeloupe',
    'plateforme dématérialisation partenaire PDP',
  ],
  alternates: {
    canonical: 'https://solyb.fr/blog/facturation-electronique-2026-guadeloupe',
  },
  openGraph: {
    title: 'Facturation Électronique 2026 en Guadeloupe — Le Guide TPE/PME',
    description: 'Dates, entreprises concernées, TVA DOM, Chorus Pro, sanctions : tout ce que les TPE/PME guadeloupéennes doivent savoir sur la réforme 2026.',
    url: 'https://solyb.fr/blog/facturation-electronique-2026-guadeloupe',
    type: 'article',
    publishedTime: '2026-06-17',
    authors: ['Yacine Bouhassoun'],
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Facturation électronique 2026 Guadeloupe' }],
  },
}

const RUST = '#C4472A'

export default function FacturationElectronique2026GuadeloupePage() {

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Facturation Électronique 2026 en Guadeloupe : le guide pour les TPE/PME',
    description: 'Tout ce que les TPE/PME de Guadeloupe et des DOM doivent savoir sur la facturation électronique obligatoire 2026 : dates, entreprises concernées, TVA DOM, Chorus Pro, sanctions.',
    author: { '@type': 'Person', name: 'Yacine Bouhassoun', url: 'https://solyb.fr' },
    publisher: {
      '@type': 'Organization',
      name: 'SolYB',
      logo: { '@type': 'ImageObject', url: 'https://solyb.fr/logo/syb-orange.png' },
      address: { '@type': 'PostalAddress', addressLocality: 'Baie-Mahault', addressRegion: 'Guadeloupe', addressCountry: 'GP' },
    },
    image: 'https://solyb.fr/opengraph-image',
    datePublished: '2026-06-17',
    dateModified: '2026-06-17',
    mainEntityOfPage: 'https://solyb.fr/blog/facturation-electronique-2026-guadeloupe',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Mon entreprise en Guadeloupe est-elle concernée par la facturation électronique 2026 ?',
        acceptedAnswer: { '@type': 'Answer', text: "Oui, si vous êtes assujetti à la TVA et que vous émettez ou recevez des factures entre professionnels (B2B). La Guadeloupe, la Martinique et La Réunion sont pleinement concernées. Dès septembre 2026, toutes les entreprises assujetties doivent pouvoir recevoir des factures électroniques." },
      },
      {
        '@type': 'Question',
        name: 'Quels sont les taux de TVA en Guadeloupe pour la facturation ?',
        acceptedAnswer: { '@type': 'Answer', text: "En Guadeloupe, le taux normal de TVA est de 8,5 % et le taux réduit de 2,1 %, contre 20 % et 5,5 % en métropole. Votre solution de facturation doit appliquer automatiquement les taux DOM." },
      },
      {
        '@type': 'Question',
        name: "Que risque-t-on en cas de non-conformité ?",
        acceptedAnswer: { '@type': 'Answer', text: "Des amendes sont prévues : 50 € par facture non conforme et jusqu'à 1 000 € en cas d'absence de plateforme agréée après mise en demeure, dans la limite de 15 000 € par an. Au-delà, un client grand compte peut rejeter vos factures non conformes." },
      },
      {
        '@type': 'Question',
        name: 'Comment se mettre en conformité simplement ?',
        acceptedAnswer: { '@type': 'Answer', text: "Vérifiez votre assujettissement à la TVA, choisissez une Plateforme de Dématérialisation Partenaire (PDP) adaptée aux DOM, et utilisez un logiciel qui produit le format Factur-X avec la TVA Guadeloupe préconfigurée. SolYB accompagne les TPE/PME guadeloupéennes sur cette mise en conformité." },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <article className="min-h-screen bg-white">
        <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }, { name: 'Facturation électronique 2026', href: '/blog/facturation-electronique-2026-guadeloupe' }]} />
        {/* Header */}
        <header className="pt-6 pb-12 px-4 sm:px-6 lg:px-8" style={{ background: 'linear-gradient(135deg, rgba(196,71,42,0.06), rgba(232,132,95,0.05))' }}>
          <div className="max-w-3xl mx-auto">
            <div className="inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4" style={{ background: 'rgba(196,71,42,0.1)', color: RUST }}>
              Conformité 2026
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Facturation électronique 2026 en Guadeloupe : le guide pour les TPE/PME
            </h1>

            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2"><Calendar className="w-5 h-5" /><span>17 juin 2026</span></div>
              <div className="flex items-center space-x-2"><Clock className="w-5 h-5" /><span>9 min de lecture</span></div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-display prose-a:text-[#C4472A]">
            <p className="lead">
              La <strong>facturation électronique devient obligatoire</strong> et la réforme s&apos;applique aussi aux
              entreprises de Guadeloupe et des DOM. Beaucoup de TPE guadeloupéennes ne savent pas encore par où commencer —
              c&apos;est normal : c&apos;est technique, c&apos;est nouveau, et l&apos;information circule mal. Ce guide
              traduit la réforme 2026 en clair, avec les <strong>spécificités locales</strong> (TVA DOM, secteurs concernés).
            </p>

            <h2>Qu&apos;est-ce que la facturation électronique ?</h2>
            <p>
              Ce n&apos;est pas un simple PDF envoyé par email. Une facture électronique conforme est un fichier
              <strong> structuré et certifié</strong> (format <strong>Factur-X / EN 16931</strong>) qui combine un PDF lisible
              par l&apos;humain et une pièce XML lisible par les logiciels et l&apos;administration. Elle transite par une
              <strong> Plateforme de Dématérialisation Partenaire (PDP)</strong> agréée par la DGFiP, et certaines données
              de vente sont transmises automatiquement aux impôts (<em>e-reporting</em>).
            </p>

            <h2>Le calendrier 2026-2027</h2>
            <p>La réforme s&apos;applique en deux temps :</p>
            <ul>
              <li><strong>1er septembre 2026 — réception obligatoire :</strong> toutes les entreprises assujetties à la TVA doivent être en mesure de <strong>recevoir</strong> des factures électroniques.</li>
              <li><strong>1er septembre 2026 — émission</strong> pour les grandes entreprises et ETI.</li>
              <li><strong>1er septembre 2027 — émission obligatoire pour les TPE, PME et micro-entreprises.</strong></li>
            </ul>
            <p>
              Concrètement, si vous êtes une TPE guadeloupéenne, vous devez pouvoir <strong>recevoir</strong> des factures
              électroniques dès 2026, et <strong>les émettre</strong> à partir de 2027. Anticiper maintenant, c&apos;est
              éviter la précipitation et les erreurs coûteuses.
            </p>

            <h2>Qui est concerné en Guadeloupe ?</h2>
            <p>
              La réforme vise les opérations <strong>entre professionnels assujettis à la TVA (B2B)</strong>. Si vous avez
              des clients professionnels, vous êtes concerné — quelle que soit la taille de votre structure.
            </p>
            <div className="not-prose rounded-2xl p-6 my-8" style={{ background: 'rgba(196,71,42,0.05)', border: '1px solid rgba(196,71,42,0.15)' }}>
              <p className="font-semibold text-gray-900 mb-3">Territoires des DOM :</p>
              <ul className="space-y-2 text-gray-700">
                <li>✅ <strong>Guadeloupe, Martinique, La Réunion</strong> : pleinement concernées (la TVA y est applicable).</li>
                <li>➖ <strong>Guyane et Mayotte</strong> : régime particulier (TVA non applicable temporairement).</li>
                <li>➖ <strong>Saint-Martin et Saint-Barthélemy</strong> : non concernés par la réforme.</li>
              </ul>
            </div>
            <p>Sont notamment concernés en Guadeloupe : le <strong>BTP</strong> (premier secteur employeur de l&apos;île),
              le <strong>commerce et le négoce</strong>, la <strong>restauration et le tourisme</strong>, les
              <strong> professions libérales</strong>, l&apos;<strong>artisanat et les services</strong>.</p>

            <h2>La spécificité guadeloupéenne : la TVA DOM</h2>
            <p>
              En Guadeloupe, la TVA n&apos;est pas la même qu&apos;en métropole. Les taux sont plus bas :
            </p>
            <ul>
              <li><strong>Taux normal : 8,5 %</strong> (contre 20 % en métropole)</li>
              <li><strong>Taux réduit : 2,1 %</strong> (contre 5,5 %)</li>
            </ul>
            <p>
              Une solution de facturation pensée pour les DOM doit appliquer ces taux <strong>automatiquement</strong> selon
              votre activité — sinon, risque d&apos;erreurs sur chaque facture. C&apos;est l&apos;un des principaux pièges des
              logiciels « métropole » utilisés tels quels en Guadeloupe.
            </p>

            <h2>Les sanctions en cas de non-conformité</h2>
            <div className="not-prose rounded-2xl p-6 my-8 flex gap-4" style={{ background: '#FFF7ED', border: '1px solid rgba(196,71,42,0.25)' }}>
              <AlertTriangle className="w-6 h-6 flex-shrink-0 mt-0.5" style={{ color: RUST }} />
              <div className="text-gray-700">
                <p className="font-semibold text-gray-900 mb-2">Des amendes sont prévues :</p>
                <ul className="space-y-1.5">
                  <li><strong>50 €</strong> par facture non conforme,</li>
                  <li><strong>500 € puis 1 000 €</strong> pour absence de plateforme agréée après mise en demeure,</li>
                  <li>dans la limite de <strong>15 000 € par an</strong>.</li>
                </ul>
                <p className="mt-3 text-sm">Au-delà des amendes, un client grand compte peut <strong>rejeter vos factures non conformes</strong>, ce qui allonge vos délais de paiement.</p>
              </div>
            </div>

            <h2>Comment se mettre en conformité (sans stress)</h2>
            <ol>
              <li><strong>Vérifiez votre situation</strong> : êtes-vous assujetti à la TVA ? Avez-vous des clients professionnels ?</li>
              <li><strong>Choisissez une PDP adaptée aux DOM</strong> et au format Factur-X EN 16931.</li>
              <li><strong>Adaptez votre logiciel de facturation</strong> : TVA Guadeloupe préconfigurée, e-reporting automatique, archivage légal.</li>
              <li><strong>Anticipez dès maintenant</strong> : se mettre en conformité tôt évite la pression de dernière minute.</li>
            </ol>

            <div className="not-prose rounded-2xl p-8 my-10" style={{ background: 'linear-gradient(135deg, rgba(46,140,146,0.06), rgba(196,71,42,0.05))', border: '1px solid rgba(46,140,146,0.2)' }}>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">FactuGP — conçu pour les DOM</h3>
              <p className="text-gray-700 mb-5">
                SolYB accompagne les TPE/PME guadeloupéennes dans leur passage à la facturation électronique.
                <strong> FactuGP</strong> applique la TVA DOM automatiquement, produit le format Factur-X et transmet vos
                données via une plateforme de dématérialisation partenaire (PDP) agréée — un interlocuteur local
                unique qui comprend le digital et vos obligations fiscales.
              </p>
              <div className="flex flex-wrap gap-3">
                {['TVA DOM 8,5 % / 2,1 %', 'Factur-X EN 16931', 'Chorus Pro DOM', 'E-reporting DGFiP'].map(t => (
                  <span key={t} className="text-sm rounded-md px-3 py-1.5" style={{ background: 'rgba(46,140,146,0.1)', color: '#2E8C92', border: '1px solid rgba(46,140,146,0.25)' }}>{t}</span>
                ))}
              </div>
              <Link href="/facturation-electronique" className="inline-flex items-center gap-1.5 mt-6 font-semibold" style={{ color: '#2E8C92' }}>
                Découvrir FactuGP →
              </Link>
            </div>

            <h2>Questions fréquentes</h2>
            <h3>Mon entreprise est-elle concernée ?</h3>
            <p>Oui si vous êtes assujetti à la TVA et facturez d&apos;autres professionnels (B2B). La Guadeloupe est pleinement concernée.</p>
            <h3>Et si je ne travaille qu&apos;avec des particuliers ?</h3>
            <p>Pas d&apos;obligation d&apos;émettre en B2B, mais vous devrez tout de même <strong>recevoir</strong> des factures électroniques de vos fournisseurs et transmettre vos données via l&apos;e-reporting.</p>
            <h3>Combien de temps pour être prêt ?</h3>
            <p>Avec un outil adapté, la mise en conformité se fait en quelques jours. L&apos;essentiel est d&apos;anticiper avant l&apos;échéance.</p>
          </div>
        </div>

        {/* CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ background: `linear-gradient(135deg, ${RUST}, #9A5A3A)` }}>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">
              Anticipez la réforme 2026, sereinement
            </h2>
            <p className="text-xl text-white/90 mb-8">
              On fait le point gratuitement sur votre situation, puis on vous accompagne jusqu&apos;à être 100 % en règle.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/facturation-electronique" className="inline-flex items-center justify-center bg-white px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105" style={{ color: RUST }}>
                Découvrir FactuGP
              </Link>
              <Link href="/#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold text-lg text-white border border-white/40 hover:bg-white/10 transition-all">
                Demander un audit gratuit
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}

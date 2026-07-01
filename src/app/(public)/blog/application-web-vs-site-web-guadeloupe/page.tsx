import { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { ArticleShell, ArticleCallout } from '@/components/site/ArticleShell'

const ACCENT = '#0E7C6B'      // teal caraïbe
const ACCENT_INK = '#0C7060'  // variante texte (AA sur crème)
const SITE = '#C4472A'        // rust — repère « site web »
const SITE_INK = 'var(--syb-rust-ink)'

export const metadata: Metadata = {
  title: 'Application Web vs Site Web : Que Choisir pour Votre Entreprise en Guadeloupe ?',
  description: 'Site web ou application web ? Découvrez les différences, prix et avantages pour faire le bon choix pour votre entreprise guadeloupéenne.',
  keywords: [
    'application web Guadeloupe',
    'site web vs application',
    'développement application 971',
    'choisir site web ou application',
    'prix application web Guadeloupe',
  ],
  alternates: {
    canonical: 'https://solyb.fr/blog/application-web-vs-site-web-guadeloupe',
  },
  openGraph: {
    title: 'Application Web vs Site Web Guadeloupe - Guide Complet',
    description: 'Site web ou application web ? Découvrez quelle solution choisir pour votre entreprise en Guadeloupe.',
    url: 'https://solyb.fr/blog/application-web-vs-site-web-guadeloupe',
    type: 'article',
    publishedTime: '2026-04-22',
    authors: ['Yacine Bouhassoun'],
  },
}

export default function ApplicationVsSiteWebPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Application Web vs Site Web : Que Choisir pour Votre Entreprise en Guadeloupe ?',
    description: 'Guide complet pour choisir entre site web et application web en Guadeloupe',
    author: { '@type': 'Person', name: 'Yacine Bouhassoun', url: 'https://solyb.fr' },
    publisher: {
      '@type': 'Organization',
      name: 'SolYB',
      address: { '@type': 'PostalAddress', addressLocality: 'Baie-Mahault', addressRegion: 'Guadeloupe', addressCountry: 'GP' },
    },
    datePublished: '2026-04-22',
    dateModified: '2026-04-22',
    mainEntityOfPage: 'https://solyb.fr/blog/application-web-vs-site-web-guadeloupe',
  }

  const bullet = (color: string) => (
    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color }} />
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <ArticleShell
        category="Guides"
        accent={ACCENT}
        accentInk={ACCENT_INK}
        title="Application web ou site web : que choisir pour votre entreprise en Guadeloupe ?"
        date="2026-04-22"
        readTime="10 min"
        crumbLabel="Application web vs site web"
        crumbHref="/blog/application-web-vs-site-web-guadeloupe"
        cta={{
          heading: 'Un besoin précis, encore flou sur le format ?',
          text: 'On en discute ensemble et on vous dit honnêtement si un site suffit ou s’il vous faut une application.',
          primary: { label: 'Échanger sur votre projet', href: '/#contact' },
        }}
      >
        <p className="lead">
          Vous êtes entrepreneur en Guadeloupe et vous hésitez entre créer un <strong>site web classique</strong> ou
          développer une <strong>application web sur mesure</strong> ? Cette question revient souvent lors de nos
          échanges avec les TPE et PME guadeloupéennes. Ce guide vous aide à faire le bon choix selon vos besoins
          et votre budget.
        </p>

        <h2>Quelle est la différence entre un site web et une application web ?</h2>
        <p>
          Avant de choisir, il est essentiel de comprendre les différences fondamentales entre ces deux solutions.
        </p>

        <h3>Le site web classique : la vitrine de votre activité</h3>
        <p>
          Un <strong>site web classique</strong> (ou site vitrine) est principalement <strong>informatif</strong>.
          Il présente votre entreprise, vos services, vos coordonnées et permet aux visiteurs de vous contacter.
        </p>

        <ArticleCallout accent={SITE}>
          <p className="font-display font-bold mb-4" style={{ fontSize: '18px', color: 'var(--syb-ink)' }}>Exemples concrets en Guadeloupe</p>
          <ul className="space-y-2 m-0 list-none p-0">
            {[
              "Site d'un restaurant avec menu et informations pratiques",
              "Portfolio d'un photographe guadeloupéen",
              "Site d'un artisan avec galerie photos",
              "Présentation d'un gîte avec formulaire de contact",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">{bullet(SITE)}<span style={{ color: 'var(--syb-stone)' }}>{t}</span></li>
            ))}
          </ul>
          <p className="font-display font-bold mt-6 mb-3" style={{ fontSize: '15px', color: 'var(--syb-ink)' }}>Caractéristiques</p>
          <ul className="space-y-1.5 m-0" style={{ color: 'var(--syb-stone)' }}>
            <li>Navigation simple, page par page</li>
            <li>Contenu majoritairement statique</li>
            <li>Peu d&apos;interaction avec l&apos;utilisateur</li>
            <li>Pas de compte utilisateur</li>
            <li>Pas de traitement complexe de données</li>
          </ul>
        </ArticleCallout>

        <h3>L&apos;application web : un outil interactif et fonctionnel</h3>
        <p>
          Une <strong>application web</strong> est un <strong>logiciel accessible via navigateur</strong> qui permet
          d&apos;effectuer des actions complexes, de gérer des données, d&apos;interagir de manière dynamique.
        </p>

        <ArticleCallout accent={ACCENT}>
          <p className="font-display font-bold mb-4" style={{ fontSize: '18px', color: 'var(--syb-ink)' }}>Trois cas réels qu&apos;on a développés</p>
          <ul className="space-y-2.5 m-0 list-none p-0">
            <li className="flex items-start gap-2">{bullet(ACCENT)}<span style={{ color: 'var(--syb-stone)' }}><Link href="/libertydriveserenity" className="underline underline-offset-2" style={{ color: ACCENT_INK }}>Liberty Drive Serenity</Link> — plateforme qui met en relation soignants et chauffeurs pour organiser leurs tournées, avec espaces dédiés et gestion des rendez-vous. En ligne et utilisée au quotidien.</span></li>
            <li className="flex items-start gap-2">{bullet(ACCENT)}<span style={{ color: 'var(--syb-stone)' }}><Link href="/resagp" className="underline underline-offset-2" style={{ color: ACCENT_INK }}>ResaGP</Link> — réservation, planning de salle, prise de commande et encaissement pour un restaurant.</span></li>
            <li className="flex items-start gap-2">{bullet(ACCENT)}<span style={{ color: 'var(--syb-stone)' }}><Link href="/facturation-electronique" className="underline underline-offset-2" style={{ color: ACCENT_INK }}>FactuGP</Link> — facturation électronique conforme, TVA DOM automatique, e-reporting vers la DGFiP.</span></li>
          </ul>
          <p className="font-display font-bold mt-6 mb-3" style={{ fontSize: '15px', color: 'var(--syb-ink)' }}>Caractéristiques</p>
          <ul className="space-y-1.5 m-0" style={{ color: 'var(--syb-stone)' }}>
            <li>Interface hautement interactive</li>
            <li>Comptes utilisateurs (connexion / inscription)</li>
            <li>Traitement de données en temps réel</li>
            <li>Logique métier complexe</li>
            <li>Base de données dynamique</li>
            <li>Fonctionnalités avancées (paiement, notifications, etc.)</li>
          </ul>
        </ArticleCallout>

        <h2>Tableau comparatif rapide</h2>
        <div className="not-prose overflow-x-auto my-8 rounded-2xl" style={{ background: 'var(--syb-cream)', border: '0.5px solid var(--syb-border)' }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '2px solid var(--syb-ink)' }}>
                <th className="text-left py-3.5 px-4" style={{ color: 'var(--syb-ink)' }}>Critère</th>
                <th className="text-left py-3.5 px-4" style={{ color: 'var(--syb-ink)' }}>Site web</th>
                <th className="text-left py-3.5 px-4" style={{ color: 'var(--syb-ink)' }}>Application web</th>
              </tr>
            </thead>
            <tbody style={{ color: 'var(--syb-stone)' }}>
              {[
                ['Objectif', 'Informer, présenter', 'Faire accomplir des tâches'],
                ['Complexité', 'Faible à moyenne', 'Moyenne à élevée'],
                ['Délai', '1 à 4 semaines', '1 à 6 mois'],
                ['Maintenance', 'Faible', 'Moyenne à élevée'],
                ['Évolutivité', 'Limitée', 'Très élevée'],
                ['Utilisateurs', 'Visiteurs anonymes', 'Comptes utilisateurs'],
                ['Exemples', 'Blog, vitrine, portfolio', 'CRM, marketplace, SaaS'],
              ].map(([k, a, b], i) => (
                <tr key={k} style={{ borderBottom: '0.5px solid var(--syb-border)' }}>
                  <td className="py-3.5 px-4 font-semibold" style={{ color: 'var(--syb-ink)' }}>{k}</td>
                  <td className="py-3.5 px-4">{a}</td>
                  <td className="py-3.5 px-4">{b}</td>
                </tr>
              ))}
              <tr>
                <td className="py-3.5 px-4 font-semibold" style={{ color: 'var(--syb-ink)' }}>Prix Guadeloupe</td>
                <td className="py-3.5 px-4 font-bold" style={{ color: SITE_INK }}>599 – 2 000 €</td>
                <td className="py-3.5 px-4 font-bold" style={{ color: ACCENT_INK }}>2 000 – 50 000 €</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Avez-vous besoin d&apos;un site web ou d&apos;une application ?</h2>
        <p>Répondez à ces questions pour le savoir.</p>

        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <ArticleCallout accent={SITE}>
            <h3 className="font-display font-bold mt-0 mb-5" style={{ fontSize: '20px', color: 'var(--syb-ink)' }}>Choisissez un site web si…</h3>
            <ul className="space-y-2.5 m-0 list-none p-0">
              {[
                <>Votre objectif principal est de <strong>présenter votre activité</strong></>,
                <>Vous voulez être <strong>trouvable sur Google</strong> localement</>,
                <>Vous avez besoin d&apos;un <strong>formulaire de contact</strong> simple</>,
                <>Votre budget est <strong>limité</strong> (&lt; 2 000 €)</>,
                <>Vous voulez une solution <strong>rapide</strong> (2 à 4 semaines)</>,
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">{bullet(SITE)}<span style={{ color: 'var(--syb-stone)' }}>{t}</span></li>
              ))}
            </ul>
            <div className="mt-5 pt-5" style={{ borderTop: '0.5px solid var(--syb-border)' }}>
              <p className="font-semibold mb-1" style={{ color: 'var(--syb-ink)' }}>Profils concernés</p>
              <p className="text-sm m-0" style={{ color: 'var(--syb-stone)' }}>Artisan, restaurant, cabinet médical, gîte, photographe, coach sportif, commerce de détail.</p>
            </div>
          </ArticleCallout>

          <ArticleCallout accent={ACCENT}>
            <h3 className="font-display font-bold mt-0 mb-5" style={{ fontSize: '20px', color: 'var(--syb-ink)' }}>Choisissez une application si…</h3>
            <ul className="space-y-2.5 m-0 list-none p-0">
              {[
                <>Vous avez besoin de <strong>fonctionnalités complexes</strong></>,
                <>Vos utilisateurs doivent <strong>créer un compte</strong></>,
                <>Vous gérez des <strong>données importantes</strong></>,
                <>Vous voulez <strong>automatiser des processus</strong></>,
                <>Vous êtes prêt à investir <strong>2 000 € et plus</strong></>,
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">{bullet(ACCENT)}<span style={{ color: 'var(--syb-stone)' }}>{t}</span></li>
              ))}
            </ul>
            <div className="mt-5 pt-5" style={{ borderTop: '0.5px solid var(--syb-border)' }}>
              <p className="font-semibold mb-1" style={{ color: 'var(--syb-ink)' }}>Profils concernés</p>
              <p className="text-sm m-0" style={{ color: 'var(--syb-stone)' }}>Location de voitures, BTP, centre de formation, marketplace, plateforme de mise en relation.</p>
            </div>
          </ArticleCallout>
        </div>

        <h2>Prix d&apos;une application web en Guadeloupe (2026)</h2>
        <p>
          Le prix d&apos;une application web varie énormément selon la complexité. Voici une grille détaillée pour
          le marché guadeloupéen.
        </p>

        <div className="not-prose space-y-4 my-8">
          {[
            { titre: 'Application simple', prix: '2 000 – 5 000 €', featured: false, points: ['5 à 10 fonctionnalités de base', '1 à 3 types d’utilisateurs', 'Design simple (template)', 'Base de données basique', 'Délai : 3 à 6 semaines'], ex: 'Système de réservation simple, annuaire professionnel avec filtres.' },
            { titre: 'Application moyenne', prix: '5 000 – 15 000 €', featured: true, points: ['10 à 20 fonctionnalités', '3 à 5 types d’utilisateurs', 'Design personnalisé', 'Logique métier moyenne', 'Intégrations (paiement, emails…)', 'Délai : 2 à 3 mois'], ex: 'CRM complet, plateforme de formation, e-commerce avancé, marketplace locale.' },
            { titre: 'Application complexe', prix: '15 000 – 50 000 €', featured: false, points: ['20+ fonctionnalités', 'Architecture complexe', 'Multi-rôles avancés', 'APIs tierces multiples', 'Algorithmes métier', 'Design haut de gamme', 'Délai : 3 à 6 mois'], ex: 'Marketplace multi-vendeurs type Airbnb, plateforme SaaS, ERP complet.' },
          ].map((c) => (
            <div key={c.titre} className="rounded-2xl p-6" style={{ background: 'var(--syb-cream)', border: c.featured ? `1px solid ${ACCENT}` : '0.5px solid var(--syb-border)' }}>
              <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
                <h3 className="font-display font-bold m-0" style={{ fontSize: '20px', color: 'var(--syb-ink)' }}>{c.titre}</h3>
                <span className="font-display font-bold" style={{ fontSize: '22px', color: ACCENT_INK }}>{c.prix}</span>
              </div>
              <ul className="space-y-1.5 mb-4 m-0" style={{ color: 'var(--syb-stone)' }}>
                {c.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <p className="text-sm m-0" style={{ color: 'var(--syb-stone-light)' }}><strong style={{ color: 'var(--syb-stone)' }}>Exemples :</strong> {c.ex}</p>
            </div>
          ))}
        </div>

        <h2>Une approche par étapes, plutôt qu&apos;un choix figé</h2>
        <p>
          Dans les faits, la plupart des projets ne se posent pas comme un choix définitif. Sur <strong>Liberty Drive
          Serenity</strong>, on a commencé par cadrer le besoin réel — deux publics distincts (soignants et
          chauffeurs), chacun avec son espace et ses actions propres — avant d&apos;écrire une ligne de code applicatif.
          Beaucoup de projets qui semblent nécessiter une « application » au premier abord se résument en réalité à
          un site vitrine avec un ou deux formulaires bien pensés. L&apos;inverse est vrai aussi : certains sites vitrines
          tournent en rond parce que le vrai besoin (gérer un planning, des commandes, des comptes clients) est une
          logique applicative qu&apos;un site classique ne peut pas porter.
        </p>

        <h2>Conclusion</h2>
        <p>
          Le bon réflexe : partez du <strong>problème concret</strong> que vous voulez résoudre, pas du format.
          Si la réponse est « faire savoir que j&apos;existe et être trouvé sur Google », un site vitrine suffit. Si la
          réponse est « faire accomplir une action précise à mes utilisateurs » (réserver, commander, gérer un
          compte), c&apos;est une application.
        </p>
      </ArticleShell>
    </>
  )
}

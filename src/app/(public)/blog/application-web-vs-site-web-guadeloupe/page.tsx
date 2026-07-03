import { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { ArticleShell, ArticleCallout } from '@/components/site/ArticleShell'

const ACCENT = '#0E7C6B'      // teal caraïbe
const ACCENT_INK = '#0C7060'  // variante texte (AA sur crème)
const SITE = '#C4472A'        // rust — repère « site web »
const SITE_INK = 'var(--syb-rust-ink)'

export const metadata: Metadata = {
  title: 'Application Web vs Site Web : Que Choisir en Guadeloupe ?',
  description: 'Site web ou application web ? La vraie question à se poser, les différences concrètes, des cas réels guadeloupéens, les prix et l’approche par étapes pour ne pas se tromper.',
  keywords: [
    'application web Guadeloupe',
    'site web vs application',
    'développement application 971',
    'choisir site web ou application',
    'prix application web Guadeloupe',
    'application métier Guadeloupe',
  ],
  alternates: {
    canonical: 'https://solyb.fr/blog/application-web-vs-site-web-guadeloupe',
  },
  openGraph: {
    title: 'Application Web vs Site Web Guadeloupe — Guide Complet',
    description: 'La vraie question à se poser, les différences concrètes, des cas réels guadeloupéens et les prix pour choisir entre site web et application.',
    url: 'https://solyb.fr/blog/application-web-vs-site-web-guadeloupe',
    type: 'article',
    publishedTime: '2026-04-22',
    modifiedTime: '2026-07-02',
    authors: ['Yacine Bouhassoun'],
  },
}

export default function ApplicationVsSiteWebPage() {
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Application Web vs Site Web : Que Choisir pour Votre Entreprise en Guadeloupe ?',
    description: 'Guide complet et concret pour choisir entre un site web et une application web en Guadeloupe : différences, cas réels, prix, approche par étapes.',
    author: { '@type': 'Person', name: 'Yacine Bouhassoun', url: 'https://solyb.fr' },
    publisher: {
      '@type': 'Organization',
      name: 'SolYB',
      logo: { '@type': 'ImageObject', url: 'https://solyb.fr/logo/syb-orange.png' },
      address: { '@type': 'PostalAddress', addressLocality: 'Petit-Bourg', addressRegion: 'Guadeloupe', addressCountry: 'GP' },
    },
    datePublished: '2026-04-22',
    dateModified: '2026-07-02',
    mainEntityOfPage: 'https://solyb.fr/blog/application-web-vs-site-web-guadeloupe',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quelle est la différence entre un site web et une application web ?',
        acceptedAnswer: { '@type': 'Answer', text: "Un site web (ou site vitrine) est principalement informatif : il présente votre activité, vos services et vos coordonnées. Une application web est un logiciel accessible via un navigateur qui permet d'accomplir des actions : gérer des comptes, réserver, commander, traiter des données en temps réel. En résumé : le site fait savoir que vous existez, l'application fait accomplir une tâche à vos utilisateurs." },
      },
      {
        '@type': 'Question',
        name: 'Combien coûte une application web sur mesure en Guadeloupe ?',
        acceptedAnswer: { '@type': 'Answer', text: "Le prix dépend fortement de la complexité. Une application simple (5 à 10 fonctionnalités) se situe entre 2 000 et 5 000 €, une application moyenne (CRM, marketplace, plateforme) entre 5 000 et 15 000 €, une application complexe (multi-rôles, algorithmes, intégrations multiples) entre 15 000 et 50 000 €. Un site vitrine, à titre de comparaison, démarre à 599 €." },
      },
      {
        '@type': 'Question',
        name: 'Par quoi commencer quand on a un petit budget ?',
        acceptedAnswer: { '@type': 'Answer', text: "Le plus souvent, mieux vaut commencer par un site vitrine professionnel (présence, référencement, génération de contacts) pour un investissement maîtrisé, puis passer à une application une fois le besoin confirmé et le budget constitué. Beaucoup de projets qui semblent nécessiter une application au premier abord se résument en réalité à un site avec un ou deux formulaires bien pensés." },
      },
      {
        '@type': 'Question',
        name: 'Une application web, est-ce la même chose qu’une application mobile ?',
        acceptedAnswer: { '@type': 'Answer', text: "Pas tout à fait. Une application web fonctionne dans le navigateur, sans installation, sur ordinateur comme sur mobile. Une application mobile s'installe depuis un store (App Store, Google Play). Une application web bien conçue (responsive) couvre une grande partie des besoins mobiles sans le coût et les contraintes d'une app à installer — c'est souvent le meilleur point de départ." },
      },
    ],
  }

  const bullet = (color: string) => (
    <Check className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color }} />
  )

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <ArticleShell
        category="Guides"
        accent={ACCENT}
        accentInk={ACCENT_INK}
        title="Application web ou site web : que choisir pour votre entreprise en Guadeloupe ?"
        date="2026-04-22"
        readTime="11 min"
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
          développer une <strong>application web sur-mesure</strong> ? C&rsquo;est une question qui revient souvent — et
          la plupart du temps, elle est mal posée. Le vrai enjeu n&rsquo;est pas de choisir un «&nbsp;format&nbsp;», mais
          de partir du <strong>problème que vous voulez résoudre</strong>. Ce guide vous aide à y voir clair, avec des
          exemples concrets, des ordres de prix, et la bonne méthode pour ne pas surinvestir.
        </p>

        <h2>La vraie question : «&nbsp;quel problème est-ce que je veux résoudre ?&nbsp;»</h2>
        <p>
          Avant de parler technique, posez-vous une seule question : <strong>qu&rsquo;attendez-vous concrètement de
          l&rsquo;outil ?</strong>
        </p>
        <p>
          Si la réponse est «&nbsp;<em>faire savoir que j&rsquo;existe, présenter mon activité, être trouvé sur
          Google</em>&nbsp;» → vous avez besoin d&rsquo;un <strong>site web</strong>. Si la réponse est «&nbsp;<em>faire
          accomplir une action précise à mes utilisateurs — réserver, commander, gérer un compte, suivre un
          dossier</em>&nbsp;» → vous glissez vers l&rsquo;<strong>application</strong>. Tout le reste (le prix, la
          techno, le délai) découle de cette réponse. Commencer par «&nbsp;je veux une appli&nbsp;» ou «&nbsp;je veux un
          site&nbsp;», c&rsquo;est mettre la charrue avant les bœufs.
        </p>

        <h2>Le site web : votre vitrine</h2>
        <p>
          Un <strong>site web classique</strong> (ou site vitrine) est avant tout <strong>informatif</strong>. Il
          présente votre entreprise, vos services, vos coordonnées, et permet aux visiteurs de vous contacter. Son but :
          crédibiliser votre activité et vous rendre trouvable.
        </p>
        <ArticleCallout accent={SITE}>
          <p className="font-display font-bold mb-4" style={{ fontSize: '18px', color: 'var(--syb-ink)' }}>Exemples typiques en Guadeloupe</p>
          <ul className="space-y-2 m-0 list-none p-0">
            {[
              "Restaurant avec menu, photos et informations pratiques",
              "Portfolio d'un photographe ou d'un artisan",
              "Présentation d'un gîte avec formulaire de contact",
              "Cabinet (médical, juridique, conseil) avec prise de contact",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">{bullet(SITE)}<span style={{ color: 'var(--syb-stone)' }}>{t}</span></li>
            ))}
          </ul>
          <p className="font-display font-bold mt-6 mb-3" style={{ fontSize: '15px', color: 'var(--syb-ink)' }}>Ce qui le caractérise</p>
          <ul className="space-y-1.5 m-0" style={{ color: 'var(--syb-stone)' }}>
            <li>Navigation simple, page par page</li>
            <li>Contenu majoritairement statique</li>
            <li>Peu ou pas d&rsquo;interaction complexe</li>
            <li>Pas de compte utilisateur, pas de traitement de données lourd</li>
          </ul>
        </ArticleCallout>
        <p>
          Un bon site vitrine ne se limite pas à «&nbsp;être joli&nbsp;» : il est <strong>rapide, lisible sur
          mobile</strong> (la majorité de vos visiteurs guadeloupéens sont sur téléphone), et <strong>pensé pour le
          référencement local</strong>. C&rsquo;est ce qui fait la différence entre un site qui dort et un site qui vous
          ramène des clients.
        </p>

        <h2>L&rsquo;application web : votre outil de travail</h2>
        <p>
          Une <strong>application web</strong> est un <strong>logiciel accessible depuis un navigateur</strong>, sans
          installation. Elle ne se contente pas d&rsquo;informer : elle <strong>fait faire des choses</strong> — gérer
          des comptes, traiter des données en temps réel, automatiser un processus métier. Le meilleur moyen de
          comprendre, c&rsquo;est de regarder trois cas réels qu&rsquo;on a développés en Guadeloupe.
        </p>
        <ArticleCallout accent={ACCENT}>
          <p className="font-display font-bold mb-4" style={{ fontSize: '18px', color: 'var(--syb-ink)' }}>Trois applications, trois problèmes concrets</p>
          <ul className="space-y-3 m-0 list-none p-0">
            <li className="flex items-start gap-2">{bullet(ACCENT)}<span style={{ color: 'var(--syb-stone)' }}><Link href="/libertydriveserenity" className="underline underline-offset-2" style={{ color: ACCENT_INK }}>Liberty Drive Serenity</Link> — le problème : mettre en relation des soignants et des chauffeurs pour organiser des tournées. Un site vitrine n&rsquo;aurait rien résolu. Il fallait deux espaces distincts, des comptes, des devis en ligne et une gestion de rendez-vous. C&rsquo;est une application, en ligne et utilisée au quotidien.</span></li>
            <li className="flex items-start gap-2">{bullet(ACCENT)}<span style={{ color: 'var(--syb-stone)' }}><Link href="/resagp" className="underline underline-offset-2" style={{ color: ACCENT_INK }}>ResaGP</Link> — le problème : gérer les réservations, le plan de salle, les commandes et l&rsquo;encaissement d&rsquo;un restaurant. Là encore, une vitrine ne suffit pas : il faut de la logique métier, du temps réel, des rôles d&rsquo;équipe.</span></li>
            <li className="flex items-start gap-2">{bullet(ACCENT)}<span style={{ color: 'var(--syb-stone)' }}><Link href="/facturation-electronique" className="underline underline-offset-2" style={{ color: ACCENT_INK }}>FactuGP</Link> — le problème : produire des factures électroniques conformes, appliquer la TVA DOM automatiquement et transmettre les données aux impôts. Un traitement de données réglementé, impossible à faire avec un simple site.</span></li>
          </ul>
          <p className="font-display font-bold mt-6 mb-3" style={{ fontSize: '15px', color: 'var(--syb-ink)' }}>Ce qui la caractérise</p>
          <ul className="space-y-1.5 m-0" style={{ color: 'var(--syb-stone)' }}>
            <li>Interface interactive, comptes utilisateurs</li>
            <li>Traitement de données en temps réel</li>
            <li>Logique métier et base de données dynamique</li>
            <li>Fonctionnalités avancées (paiement, notifications, tableaux de bord…)</li>
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
              ].map(([k, a, b]) => (
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

        <h2>De quel côté penchez-vous ? La grille de décision</h2>
        <p>Répondez honnêtement à ces questions — elles tranchent presque toujours.</p>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          <ArticleCallout accent={SITE}>
            <h3 className="font-display font-bold mt-0 mb-5" style={{ fontSize: '20px', color: 'var(--syb-ink)' }}>Un site web suffit si…</h3>
            <ul className="space-y-2.5 m-0 list-none p-0">
              {[
                <>Votre objectif est de <strong>présenter votre activité</strong></>,
                <>Vous voulez être <strong>trouvé sur Google</strong> localement</>,
                <>Un <strong>formulaire de contact</strong> couvre vos besoins</>,
                <>Votre budget est <strong>maîtrisé</strong> (moins de 2 000 €)</>,
                <>Vous voulez une solution <strong>rapide</strong> (2 à 4 semaines)</>,
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">{bullet(SITE)}<span style={{ color: 'var(--syb-stone)' }}>{t}</span></li>
              ))}
            </ul>
            <div className="mt-5 pt-5" style={{ borderTop: '0.5px solid var(--syb-border)' }}>
              <p className="font-semibold mb-1" style={{ color: 'var(--syb-ink)' }}>Profils typiques</p>
              <p className="text-sm m-0" style={{ color: 'var(--syb-stone)' }}>Artisan, restaurant, cabinet, gîte, photographe, coach, commerce de détail.</p>
            </div>
          </ArticleCallout>

          <ArticleCallout accent={ACCENT}>
            <h3 className="font-display font-bold mt-0 mb-5" style={{ fontSize: '20px', color: 'var(--syb-ink)' }}>Une application s&rsquo;impose si…</h3>
            <ul className="space-y-2.5 m-0 list-none p-0">
              {[
                <>Vous avez besoin de <strong>fonctionnalités complexes</strong></>,
                <>Vos utilisateurs doivent <strong>créer un compte</strong></>,
                <>Vous gérez des <strong>données importantes</strong> en continu</>,
                <>Vous voulez <strong>automatiser un processus</strong></>,
                <>Vous êtes prêt à investir <strong>2 000 € et plus</strong></>,
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-2">{bullet(ACCENT)}<span style={{ color: 'var(--syb-stone)' }}>{t}</span></li>
              ))}
            </ul>
            <div className="mt-5 pt-5" style={{ borderTop: '0.5px solid var(--syb-border)' }}>
              <p className="font-semibold mb-1" style={{ color: 'var(--syb-ink)' }}>Profils typiques</p>
              <p className="text-sm m-0" style={{ color: 'var(--syb-stone)' }}>Location de véhicules, BTP, centre de formation, marketplace, plateforme de mise en relation.</p>
            </div>
          </ArticleCallout>
        </div>

        <h2>Prix d&rsquo;une application web en Guadeloupe (2026)</h2>
        <p>
          Le prix varie énormément selon la complexité. Voici une grille de repère pour le marché guadeloupéen.
        </p>
        <div className="not-prose space-y-4 my-8">
          {[
            { titre: 'Application simple', prix: '2 000 – 5 000 €', featured: false, points: ['5 à 10 fonctionnalités de base', '1 à 3 types d’utilisateurs', 'Design simple', 'Base de données basique', 'Délai : 3 à 6 semaines'], ex: 'Système de réservation simple, annuaire professionnel avec filtres.' },
            { titre: 'Application moyenne', prix: '5 000 – 15 000 €', featured: true, points: ['10 à 20 fonctionnalités', '3 à 5 types d’utilisateurs', 'Design personnalisé', 'Logique métier moyenne', 'Intégrations (paiement, emails…)', 'Délai : 2 à 3 mois'], ex: 'CRM complet, plateforme de formation, e-commerce avancé, marketplace locale.' },
            { titre: 'Application complexe', prix: '15 000 – 50 000 €', featured: false, points: ['20+ fonctionnalités', 'Architecture complexe', 'Multi-rôles avancés', 'APIs tierces multiples', 'Algorithmes métier', 'Délai : 3 à 6 mois'], ex: 'Marketplace multi-vendeurs, plateforme SaaS, ERP métier complet.' },
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

        <h2>L&rsquo;erreur classique (dans les deux sens)</h2>
        <p>
          On voit deux erreurs symétriques, aussi coûteuses l&rsquo;une que l&rsquo;autre. La première : <strong>vouloir
          une application quand un site suffit.</strong> Beaucoup de projets qui semblent nécessiter une «&nbsp;appli&nbsp;»
          se résument, une fois le besoin cadré, à un site vitrine avec un ou deux formulaires bien pensés. Résultat :
          des milliers d&rsquo;euros et des mois de développement économisés.
        </p>
        <p>
          La seconde, à l&rsquo;inverse : <strong>s&rsquo;entêter sur un site vitrine alors que le vrai besoin est
          applicatif.</strong> On voit des entreprises empiler des rustines (un formulaire par-ci, un plugin par-là) sur
          un site qui n&rsquo;a jamais été conçu pour gérer des comptes ou un planning. Ça tient un temps, puis ça casse.
          Le bon réflexe n&rsquo;est pas de choisir le format le moins cher, mais celui qui <strong>correspond au
          problème</strong>.
        </p>

        <h2>Le bon plan : commencer petit, grandir ensuite</h2>
        <p>
          Bonne nouvelle : ce n&rsquo;est pas un choix définitif. La plupart des entreprises guadeloupéennes ont intérêt
          à <strong>commencer par un site vitrine professionnel</strong> — présence, référencement, premiers contacts —
          pour un investissement maîtrisé, puis à <strong>évoluer vers une application</strong> une fois le besoin
          confirmé et le budget constitué. C&rsquo;est d&rsquo;ailleurs souvent comme ça qu&rsquo;on aborde un projet
          ambitieux : on cadre d&rsquo;abord le besoin réel (comme pour Liberty Drive Serenity, où l&rsquo;on a défini
          les deux publics et leurs actions avant d&rsquo;écrire une ligne de code), plutôt que de tout construire
          d&rsquo;un coup.
        </p>

        <h2>Questions fréquentes</h2>
        <h3>Application web ou application mobile, quelle différence ?</h3>
        <p>
          Une application <strong>web</strong> tourne dans le navigateur, sans installation, sur ordinateur comme sur
          mobile. Une application <strong>mobile</strong> s&rsquo;installe depuis un store. Une application web bien
          conçue couvre une grande partie des besoins mobiles sans le coût et les contraintes d&rsquo;une app à
          installer — c&rsquo;est souvent le meilleur point de départ.
        </p>
        <h3>Peut-on transformer un site en application plus tard ?</h3>
        <p>
          Oui, à condition de l&rsquo;anticiper. Si le prestataire construit votre site sur des bases solides (et vous en
          rend propriétaire), il est tout à fait possible d&rsquo;y greffer ensuite des fonctionnalités applicatives, ou
          de basculer vers une vraie application quand le moment vient.
        </p>
        <h3>Comment savoir dans quelle catégorie de prix je me situe ?</h3>
        <p>
          Listez les <strong>actions</strong> que vos utilisateurs doivent pouvoir faire. Plus il y a d&rsquo;actions,
          de rôles différents et de traitements de données, plus vous montez dans la grille. Un devis détaillé, après un
          échange sur votre besoin réel, reste le seul moyen fiable de chiffrer.
        </p>

        <h2>En résumé</h2>
        <p>
          Ne partez pas du format, partez du <strong>problème</strong>. Si vous voulez faire savoir que vous existez et
          être trouvé, un <strong>site vitrine</strong> suffit (dès 599 €). Si vous voulez faire accomplir des actions
          précises à vos utilisateurs — réserver, commander, gérer un compte — c&rsquo;est une <strong>application</strong>.
          Et dans le doute, commencez petit : un bon site aujourd&rsquo;hui, une application demain, quand le besoin est
          confirmé. L&rsquo;important est de choisir en connaissance de cause, pas sous l&rsquo;effet d&rsquo;une mode.
        </p>
      </ArticleShell>
    </>
  )
}

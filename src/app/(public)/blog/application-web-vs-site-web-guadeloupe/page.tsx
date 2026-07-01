import { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, Check, X } from 'lucide-react'
import Breadcrumbs from '@/components/site/Breadcrumbs'

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
    author: {
      '@type': 'Person',
      name: 'Yacine Bouhassoun',
      url: 'https://solyb.fr'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SolYB',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Baie-Mahault',
        addressRegion: 'Guadeloupe',
        addressCountry: 'GP'
      }
    },
    datePublished: '2026-04-22',
    dateModified: '2026-04-22',
    mainEntityOfPage: 'https://solyb.fr/blog/application-web-vs-site-web-guadeloupe'
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white">
        <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }, { name: 'Application web vs site web', href: '/blog/application-web-vs-site-web-guadeloupe' }]} />
        {/* Header */}
        <header className="pt-6 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#C4472A]/[0.06] to-[#E8845F]/[0.05]">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block bg-[#C4472A]/10 text-[#C4472A] px-3 py-1 rounded-full text-sm font-semibold mb-4">
              Guides
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Application Web vs Site Web : Que Choisir pour Votre Entreprise en Guadeloupe ?
            </h1>

            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>22 avril 2026</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>10 min de lecture</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto prose prose-lg prose-headings:font-display prose-a:text-[#C4472A]">
            <p className="lead">
              Vous êtes entrepreneur en Guadeloupe et vous hésitez entre créer un <strong>site web classique</strong> ou
              développer une <strong>application web sur mesure</strong> ? Cette question revient souvent lors de nos
              échanges avec les TPE et PME guadeloupéennes. Dans ce guide complet, nous vous aidons à faire le bon choix
              selon vos besoins et votre budget.
            </p>

            <h2>Quelle est la Différence Entre un Site Web et une Application Web ?</h2>

            <p>
              Avant de choisir, il est essentiel de comprendre les différences fondamentales entre ces deux solutions.
            </p>

            <h3>Site Web Classique : Vitrine de Votre Activité</h3>

            <p>
              Un <strong>site web classique</strong> (ou site vitrine) est principalement <strong>informatif</strong>.
              Il présente votre entreprise, vos services, vos coordonnées et permet aux visiteurs de vous contacter.
            </p>

            <div className="not-prose bg-[#FBF0EC] rounded-2xl p-8 my-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Exemples concrets en Guadeloupe:</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-[#C4472A] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Site d'un restaurant avec menu et informations pratiques</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-[#C4472A] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Portfolio d'un photographe guadeloupéen</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-[#C4472A] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Site d'un artisan avec galerie photos</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-[#C4472A] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Présentation d'un gîte avec formulaire de contact</span>
                </li>
              </ul>

              <h5 className="text-lg font-bold text-gray-900 mt-6 mb-3">Caractéristiques:</h5>
              <ul className="space-y-2">
                <li className="text-gray-700">• Navigation simple page par page</li>
                <li className="text-gray-700">• Contenu majoritairement statique</li>
                <li className="text-gray-700">• Peu d'interaction avec l'utilisateur</li>
                <li className="text-gray-700">• Pas de compte utilisateur</li>
                <li className="text-gray-700">• Pas de traitement complexe de données</li>
              </ul>
            </div>

            <h3>Application Web : Outil Interactif et Fonctionnel</h3>

            <p>
              Une <strong>application web</strong> est un <strong>logiciel accessible via navigateur</strong> qui permet
              d'effectuer des actions complexes, de gérer des données, d'interagir de manière dynamique.
            </p>

            <div className="not-prose bg-[#E9F5F2] rounded-2xl p-8 my-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Trois cas réels qu'on a développés:</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-[#0E7C6B] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><Link href="/libertydriveserenity" className="underline decoration-dotted">Liberty Drive Serenity</Link> — plateforme qui met en relation soignants et chauffeurs pour organiser leurs tournées, avec espaces dédiés et gestion des rendez-vous. En ligne et utilisée au quotidien.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-[#0E7C6B] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><Link href="/resagp" className="underline decoration-dotted">ResaGP</Link> — réservation, planning de salle, prise de commande et encaissement pour un restaurant.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-[#0E7C6B] flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700"><Link href="/facturation-electronique" className="underline decoration-dotted">FactuGP</Link> — facturation électronique conforme, TVA DOM automatique, e-reporting vers la DGFiP.</span>
                </li>
              </ul>

              <h5 className="text-lg font-bold text-gray-900 mt-6 mb-3">Caractéristiques:</h5>
              <ul className="space-y-2">
                <li className="text-gray-700">• Interface hautement interactive</li>
                <li className="text-gray-700">• Comptes utilisateurs (connexion/inscription)</li>
                <li className="text-gray-700">• Traitement de données en temps réel</li>
                <li className="text-gray-700">• Logique métier complexe</li>
                <li className="text-gray-700">• Base de données dynamique</li>
                <li className="text-gray-700">• Fonctionnalités avancées (paiement, notifications, etc.)</li>
              </ul>
            </div>

            <h2>Tableau Comparatif Rapide</h2>

            <div className="not-prose overflow-x-auto my-8">
              <table className="w-full bg-white rounded-xl overflow-hidden shadow-md">
                <thead style={{ background: "#C4472A" }} className="text-white">
                  <tr>
                    <th className="text-left py-4 px-4">Critère</th>
                    <th className="text-left py-4 px-4">Site Web</th>
                    <th className="text-left py-4 px-4">Application Web</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 font-semibold">Objectif</td>
                    <td className="py-4 px-4">Informer, présenter</td>
                    <td className="py-4 px-4">Faire accomplir des tâches</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="py-4 px-4 font-semibold">Complexité</td>
                    <td className="py-4 px-4">Faible à moyenne</td>
                    <td className="py-4 px-4">Moyenne à élevée</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 font-semibold">Prix Guadeloupe</td>
                    <td className="py-4 px-4 text-[#0E7C6B] font-bold">599-2 000€</td>
                    <td className="py-4 px-4 text-[#C4472A] font-bold">2 000-50 000€</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="py-4 px-4 font-semibold">Délai</td>
                    <td className="py-4 px-4">1-4 semaines</td>
                    <td className="py-4 px-4">1-6 mois</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 font-semibold">Maintenance</td>
                    <td className="py-4 px-4">Faible</td>
                    <td className="py-4 px-4">Moyenne à élevée</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="py-4 px-4 font-semibold">Évolutivité</td>
                    <td className="py-4 px-4">Limitée</td>
                    <td className="py-4 px-4">Très élevée</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 px-4 font-semibold">Utilisateurs</td>
                    <td className="py-4 px-4">Visiteurs anonymes</td>
                    <td className="py-4 px-4">Comptes utilisateurs</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="py-4 px-4 font-semibold">Exemples</td>
                    <td className="py-4 px-4">Blog, vitrine, portfolio</td>
                    <td className="py-4 px-4">CRM, marketplace, SaaS</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>Avez-Vous Besoin d'un Site Web ou d'une Application ?</h2>

            <p>Répondez à ces questions pour le savoir:</p>

            <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              {/* Site Web */}
              <div className="bg-gradient-to-br from-[#FBF0EC] to-[#F6E4DD] rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Choisissez un SITE WEB si...</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-[#C4472A] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Votre objectif principal est de <strong>présenter votre activité</strong></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-[#C4472A] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vous voulez être <strong>trouvable sur Google</strong> localement</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-[#C4472A] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vous avez besoin d'un <strong>formulaire de contact</strong> simple</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-[#C4472A] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Votre budget est <strong>limité</strong> (&lt; 2 000€)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-[#C4472A] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vous voulez une solution <strong>rapide</strong> (2-4 semaines)</span>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t border-[#C4472A]/20">
                  <p className="font-semibold text-gray-900 mb-2">Profils concernés:</p>
                  <p className="text-sm text-gray-700">
                    Artisan, Restaurant, Cabinet médical, Gîte, Photographe, Coach sportif, Commerce de détail
                  </p>
                </div>
              </div>

              {/* Application Web */}
              <div className="bg-gradient-to-br from-[#E9F5F2] to-[#D8EDE8] rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Choisissez une APPLICATION WEB si...</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-[#0E7C6B] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vous avez besoin de <strong>fonctionnalités complexes</strong></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-[#0E7C6B] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vos utilisateurs doivent <strong>créer un compte</strong></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-[#0E7C6B] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vous gérez des <strong>données importantes</strong></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-[#0E7C6B] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vous voulez <strong>automatiser des processus</strong></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-[#0E7C6B] flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vous êtes prêt à investir <strong>2 000€ et plus</strong></span>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t border-[#0E7C6B]/20">
                  <p className="font-semibold text-gray-900 mb-2">Profils concernés:</p>
                  <p className="text-sm text-gray-700">
                    Location de voitures, BTP, Centre de formation, Marketplace, Plateforme de mise en relation
                  </p>
                </div>
              </div>
            </div>

            <h2>Prix Développement Application Web en Guadeloupe (2026)</h2>

            <p>
              Le prix d'une application web varie énormément selon la complexité.
              Voici une grille détaillée pour le marché guadeloupéen.
            </p>

            <div className="not-prose space-y-6 my-8">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Application Simple</h3>
                  <span className="text-2xl font-bold text-[#C4472A]">2 000 - 5 000€</span>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="text-gray-700">• 5-10 fonctionnalités de base</li>
                  <li className="text-gray-700">• 1-3 types d'utilisateurs</li>
                  <li className="text-gray-700">• Design simple (template)</li>
                  <li className="text-gray-700">• Base de données basique</li>
                  <li className="text-gray-700">• Délai: 3-6 semaines</li>
                </ul>
                <p className="text-sm text-gray-600">
                  <strong>Exemples:</strong> Système réservation simple, annuaire professionnel avec filtres
                </p>
              </div>

              <div className="bg-white border-2 border-[#C4472A] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Application Moyenne</h3>
                  <span className="text-2xl font-bold text-[#C4472A]">5 000 - 15 000€</span>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="text-gray-700">• 10-20 fonctionnalités</li>
                  <li className="text-gray-700">• 3-5 types d'utilisateurs</li>
                  <li className="text-gray-700">• Design personnalisé</li>
                  <li className="text-gray-700">• Logique métier moyenne</li>
                  <li className="text-gray-700">• Intégrations (paiement, emails, etc.)</li>
                  <li className="text-gray-700">• Délai: 2-3 mois</li>
                </ul>
                <p className="text-sm text-gray-600">
                  <strong>Exemples:</strong> CRM complet, plateforme formation, e-commerce avancé, marketplace locale
                </p>
              </div>

              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Application Complexe</h3>
                  <span className="text-2xl font-bold text-[#C4472A]">15 000 - 50 000€</span>
                </div>
                <ul className="space-y-2 mb-4">
                  <li className="text-gray-700">• 20+ fonctionnalités</li>
                  <li className="text-gray-700">• Architecture complexe</li>
                  <li className="text-gray-700">• Multi-rôles avancés</li>
                  <li className="text-gray-700">• APIs tierces multiples</li>
                  <li className="text-gray-700">• Algorithmes métier</li>
                  <li className="text-gray-700">• Design haut de gamme</li>
                  <li className="text-gray-700">• Délai: 3-6 mois</li>
                </ul>
                <p className="text-sm text-gray-600">
                  <strong>Exemples:</strong> Marketplace multi-vendeurs type Airbnb, plateforme SaaS, ERP complet
                </p>
              </div>
            </div>

            <h2>Une approche par étapes, plutôt qu'un choix figé</h2>

            <p>
              Dans les faits, la plupart des projets ne se posent pas comme un choix définitif. Sur <strong>Liberty Drive
              Serenity</strong>, on a commencé par cadrer le besoin réel — deux publics distincts (soignants et
              chauffeurs), chacun avec son espace et ses actions propres — avant d'écrire une ligne de code applicatif.
              Beaucoup de projets qui semblent nécessiter une « application » au premier abord se résument en réalité à
              un site vitrine avec un ou deux formulaires bien pensés. L'inverse est vrai aussi : certains sites vitrines
              tournent en rond parce que le vrai besoin (gérer un planning, des commandes, des comptes clients) est une
              logique applicative qu'un site classique ne peut pas porter.
            </p>

            <h2>Conclusion</h2>

            <p>
              Le bon réflexe : partez du <strong>problème concret</strong> que vous voulez résoudre, pas du format.
              Si la réponse est « faire savoir que j'existe et être trouvé sur Google », un site vitrine suffit. Si la
              réponse est « faire accomplir une action précise à mes utilisateurs » (réserver, commander, gérer un
              compte), c'est une application.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#C4472A] to-[#a63a22]">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Un besoin précis, encore flou sur le format ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              On en discute ensemble et on vous dit honnêtement si un site suffit ou s'il vous faut une application.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center bg-white text-[#C4472A] hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
            >
              Échanger sur votre projet
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

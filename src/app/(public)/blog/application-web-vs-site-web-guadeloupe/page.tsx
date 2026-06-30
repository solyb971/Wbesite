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
    publishedTime: '2024-12-27',
    authors: ['Yacine Bouhassoun'],
  },
}

export default function ApplicationVsSiteWebPage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://solyb.fr' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://solyb.fr/blog' },
      { '@type': 'ListItem', position: 3, name: 'Application Web vs Site Web Guadeloupe', item: 'https://solyb.fr/blog/application-web-vs-site-web-guadeloupe' },
    ],
  }

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
    datePublished: '2024-12-27',
    dateModified: '2024-12-27',
    mainEntityOfPage: 'https://solyb.fr/blog/application-web-vs-site-web-guadeloupe'
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-white">
        <Breadcrumbs items={[{ name: 'Blog', href: '/blog' }, { name: 'Application web vs site web', href: '/blog/application-web-vs-site-web-guadeloupe' }]} />
        {/* Header */}
        <header className="pt-6 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4">
              Guides
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Application Web vs Site Web : Que Choisir pour Votre Entreprise en Guadeloupe ?
            </h1>

            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>27 décembre 2024</span>
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
          <div className="max-w-4xl mx-auto prose prose-lg">
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

            <div className="not-prose bg-blue-50 rounded-2xl p-8 my-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Exemples concrets en Guadeloupe:</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Site d'un restaurant avec menu et réservation par téléphone</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Portfolio d'un photographe guadeloupéen</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Site d'un artisan avec galerie photos</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
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

            <div className="not-prose bg-green-50 rounded-2xl p-8 my-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Exemples concrets en Guadeloupe:</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Plateforme de réservation pour activités touristiques 971</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">CRM pour gérer vos clients et devis</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Marketplace locale type "Leboncoin Guadeloupe"</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Outil de gestion de stock pour commerce</span>
                </li>
                <li className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Plateforme de formation en ligne</span>
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
                <thead className="bg-primary text-white">
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
                    <td className="py-4 px-4 text-green-600 font-bold">599-2 000€</td>
                    <td className="py-4 px-4 text-orange-600 font-bold">2 000-50 000€</td>
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
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Choisissez un SITE WEB si...</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Votre objectif principal est de <strong>présenter votre activité</strong></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vous voulez être <strong>trouvable sur Google</strong> localement</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vous avez besoin d'un <strong>formulaire de contact</strong> simple</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Votre budget est <strong>limité</strong> (&lt; 2 000€)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vous voulez une solution <strong>rapide</strong> (2-4 semaines)</span>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t border-blue-200">
                  <p className="font-semibold text-gray-900 mb-2">Profils concernés:</p>
                  <p className="text-sm text-gray-700">
                    Artisan, Restaurant, Cabinet médical, Gîte, Photographe, Coach sportif, Commerce de détail
                  </p>
                </div>
              </div>

              {/* Application Web */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Choisissez une APPLICATION WEB si...</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vous avez besoin de <strong>fonctionnalités complexes</strong></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vos utilisateurs doivent <strong>créer un compte</strong></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vous gérez des <strong>données importantes</strong></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vous voulez <strong>automatiser des processus</strong></span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">Vous êtes prêt à investir <strong>2 000€ et plus</strong></span>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t border-green-200">
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
                  <h4 className="text-xl font-bold text-gray-900">Application Simple</h4>
                  <span className="text-2xl font-bold text-primary">2 000 - 5 000€</span>
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

              <div className="bg-white border-2 border-primary rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-gray-900">Application Moyenne</h4>
                  <span className="text-2xl font-bold text-primary">5 000 - 15 000€</span>
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
                  <h4 className="text-xl font-bold text-gray-900">Application Complexe</h4>
                  <span className="text-2xl font-bold text-primary">15 000 - 50 000€</span>
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

            <h2>Notre Recommandation pour Entreprises Guadeloupéennes</h2>

            <div className="not-prose bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 my-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">L'Approche Hybride (Recommandée)</h3>

              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-lg font-bold text-primary mb-3">Phase 1: Site Vitrine (599€ chez SolYB)</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Présence en ligne rapide</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Référencement Google</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Génération de leads</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-xl p-6">
                  <h4 className="text-lg font-bold text-primary mb-3">Phase 2: Application Web (3-6 mois après)</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Besoin validé</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Budget constitué</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Cahier des charges précis</span>
                    </li>
                  </ul>
                </div>

                <p className="text-gray-700 font-semibold">
                  <strong>Avantage:</strong> ROI immédiat avec site vitrine, puis passage au niveau supérieur quand vous êtes prêt.
                </p>
              </div>
            </div>

            <h2>Conclusion: Site ou Application pour Votre Entreprise 971 ?</h2>

            <p>
              <strong>90% des TPE guadeloupéennes</strong> ont besoin d'un <strong>SITE WEB vitrine</strong> (599-1 500€) pour commencer.
            </p>

            <p>
              <strong>10% ont besoin d'APPLICATION</strong> dès le départ (2 000€+) car leur modèle l'exige.
            </p>

            <p>
              <strong>Notre conseil:</strong> Commencez TOUJOURS par un site vitrine professionnel.
              Après quelques mois, si besoin confirmé, passez à l'application.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-primary-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Besoin d'un Site Web ou d'une Application en Guadeloupe ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              SolYB vous accompagne dans votre projet digital.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Site vitrine</h3>
                <p className="text-4xl font-bold mb-2">599€</p>
                <p className="text-white/80">Livré en 2 semaines</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Application web</h3>
                <p className="text-4xl font-bold mb-2">Sur mesure</p>
                <p className="text-white/80">Dès 2 000€</p>
              </div>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all hover:scale-105"
            >
              Devis gratuit sous 24h
            </Link>
          </div>
        </section>
      </article>
    </>
  )
}

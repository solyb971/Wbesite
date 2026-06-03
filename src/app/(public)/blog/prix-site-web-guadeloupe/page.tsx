import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, Clock, Check } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Prix Création Site Web en Guadeloupe : Le Guide Complet 2026',
  description: 'Combien coûte un site web en Guadeloupe ? Comparatif complet des agences web 971. Prix de 599€ à 15 000€. Guide pratique pour TPE guadeloupéennes.',
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
    description: 'Comparatif détaillé des prix pour créer un site web en Guadeloupe. De 599€ à 15 000€, tous les tarifs expliqués.',
    url: 'https://solyb.fr/blog/prix-site-web-guadeloupe',
    type: 'article',
    publishedTime: '2024-12-27',
    authors: ['Yacine Bouhassoun'],
  },
}

export default function PrixSiteWebGuadeloupePage() {
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://solyb.fr' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://solyb.fr/blog' },
      { '@type': 'ListItem', position: 3, name: 'Prix Création Site Web Guadeloupe', item: 'https://solyb.fr/blog/prix-site-web-guadeloupe' },
    ],
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Prix Création Site Web en Guadeloupe : Le Guide Complet 2026',
    description: 'Guide complet des prix pour créer un site web en Guadeloupe en 2026',
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
    mainEntityOfPage: 'https://solyb.fr/blog/prix-site-web-guadeloupe'
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-white">
        {/* Header */}
        <header className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-primary hover:text-primary-600 mb-6 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Retour au blog
            </Link>

            <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4">
              Prix & Tarifs
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Prix Création Site Web en Guadeloupe : Le Guide Complet 2026
            </h1>

            <div className="flex items-center space-x-6 text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>27 décembre 2024</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>12 min de lecture</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <p className="lead">
              Vous êtes entrepreneur en Guadeloupe et vous vous demandez <strong>combien coûte réellement un site web en 2026</strong> ?
              Entre les agences qui affichent des tarifs de 5000€ et les freelances à 500€, difficile de s'y retrouver.
              Dans ce guide complet, nous comparons tous les prix du marché guadeloupéen pour vous aider à faire le bon choix.
            </p>

            <h2>Combien Coûte Vraiment un Site Web en Guadeloupe en 2026 ?</h2>

            <p>
              Le prix d'un site web en Guadeloupe varie énormément selon plusieurs critères.
              Voici ce que vous devez savoir avant de vous lancer.
            </p>

            <h3>Les Différents Types de Sites Web et Leurs Prix</h3>

            <div className="not-prose bg-primary/5 rounded-2xl p-8 my-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Site Vitrine (Site d'Entreprise Classique)</h4>
              <p className="text-gray-700 mb-6">
                Un site vitrine présente votre activité, vos services et vos coordonnées.
                C'est l'option idéale pour les TPE, artisans, professions libérales et petits commerces guadeloupéens.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-primary">
                      <th className="text-left py-3 px-4">Prestataire</th>
                      <th className="text-left py-3 px-4">Prix minimum</th>
                      <th className="text-left py-3 px-4">Prix maximum</th>
                      <th className="text-left py-3 px-4">Délai moyen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">Freelances 971</td>
                      <td className="py-3 px-4">490€</td>
                      <td className="py-3 px-4">2 000€</td>
                      <td className="py-3 px-4">2-6 semaines</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">Petites agences Guadeloupe</td>
                      <td className="py-3 px-4">790€</td>
                      <td className="py-3 px-4">3 500€</td>
                      <td className="py-3 px-4">4-8 semaines</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">Grandes agences</td>
                      <td className="py-3 px-4">2 500€</td>
                      <td className="py-3 px-4">8 000€</td>
                      <td className="py-3 px-4">2-4 mois</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-3 px-4">Solutions DIY (Wix, etc.)</td>
                      <td className="py-3 px-4">0€ (gratuit)</td>
                      <td className="py-3 px-4">300€/an</td>
                      <td className="py-3 px-4">1-2 semaines</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-6 text-lg font-semibold text-primary">
                Prix moyen en Guadeloupe: 1 200€ pour un site vitrine professionnel de 5-7 pages.
              </p>
            </div>

            <h3>Comparatif Complet des Agences Web en Guadeloupe (2026)</h3>

            <p>
              Nous avons analysé les principaux acteurs du marché guadeloupéen pour vous donner
              une vision claire des tarifs pratiqués.
            </p>

            <div className="not-prose bg-green-50 border-2 border-green-500 rounded-2xl p-8 my-8">
              <div className="flex items-start justify-between mb-4">
                <h4 className="text-2xl font-bold text-gray-900">SolYB - Le Meilleur Rapport Qualité/Prix</h4>
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">🏆 Recommandé</span>
              </div>

              <p className="text-gray-700 mb-6">
                <strong>Localisation:</strong> Baie-Mahault, Guadeloupe<br />
                <strong>Tarifs affichés:</strong> ✅ Oui (transparence totale)
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-bold text-gray-900 mb-2">Site vitrine</h5>
                  <p className="text-3xl font-bold text-primary mb-2">599€</p>
                  <p className="text-sm text-gray-600">Livraison: 2 semaines</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-bold text-gray-900 mb-2">Site e-commerce</h5>
                  <p className="text-3xl font-bold text-primary mb-2">999€</p>
                  <p className="text-sm text-gray-600">Livraison: 3 semaines</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h5 className="font-bold text-gray-900 mb-2">Application web</h5>
                  <p className="text-3xl font-bold text-primary mb-2">Sur devis</p>
                  <p className="text-sm text-gray-600">Dès 2000€</p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Prix 24% moins cher que la moyenne Guadeloupe</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Livraison ultra-rapide (2 semaines)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Technologie moderne avec IA intégrée</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Vous êtes propriétaire à 100% (pas d'abonnement piège)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">Maintenance abordable dès 29€/mois</span>
                </div>
              </div>

              <p className="text-sm text-gray-700">
                <strong>Offre spéciale:</strong> Offre lancement limitée à 30 places au tarif de 599€ (vs 899€ après).
              </p>
            </div>

            <h3>Les Pièges à Éviter Absolument en Guadeloupe</h3>

            <h4>Piège #1 : Les Abonnements Mensuels Sans Propriété</h4>

            <p>
              <strong>Exemple:</strong> 49€/mois pour un site vitrine
            </p>

            <p>
              ❌ <strong>Problème:</strong> Après 2 ans vous avez payé 1 176€ et vous n'êtes TOUJOURS PAS propriétaire.
              Si vous arrêtez de payer, votre site disparaît.
            </p>

            <p>
              ✅ <strong>Solution:</strong> Préférez un paiement unique. Avec 599€ chez SolYB, vous êtes propriétaire à vie.
            </p>

            <h4>Piège #2 : Les Prix "À Partir De..." Trompeurs</h4>

            <p>
              Agence: "Site web à partir de 490€"
            </p>

            <p>Réalité après devis:</p>
            <ul>
              <li>Site de base: 490€</li>
              <li>Design personnalisé: +400€</li>
              <li>Formulaire contact: +150€</li>
              <li>SEO: +300€</li>
              <li>Responsive mobile: +200€</li>
              <li><strong>TOTAL RÉEL: 1 540€</strong></li>
            </ul>

            <p>
              ✅ <strong>Chez SolYB:</strong> 599€ = prix FINAL tout inclus.
            </p>

            <h2>Notre Recommandation pour TPE Guadeloupéennes</h2>

            <div className="not-prose bg-blue-50 rounded-2xl p-8 my-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Budget Serré (&lt; 800€)</h3>

              <div className="mb-6">
                <h4 className="text-xl font-bold text-primary mb-3">Choix #1: SolYB ⭐⭐⭐⭐⭐</h4>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold text-gray-700 min-w-24">Prix:</span>
                    <span className="text-gray-700">599€</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold text-gray-700 min-w-24">Qualité:</span>
                    <span className="text-gray-700">Professionnelle</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold text-gray-700 min-w-24">Délai:</span>
                    <span className="text-gray-700">2 semaines</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold text-gray-700 min-w-24">Technologie:</span>
                    <span className="text-gray-700">Moderne</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="font-semibold text-gray-700 min-w-24">Verdict:</span>
                    <span className="text-gray-700 font-bold">Meilleur rapport qualité/prix Guadeloupe</span>
                  </li>
                </ul>
              </div>

              <p className="text-sm text-gray-600">
                ❌ <strong>À éviter:</strong> Solutions Wix/Squarespace (peu professionnel) et abonnements type Kléia (trop cher sur durée)
              </p>
            </div>

            <h2>Conclusion : Quel Prix est Juste pour Votre Site en Guadeloupe ?</h2>

            <p>
              Un site vitrine professionnel en Guadeloupe ne devrait <strong>PAS coûter plus de 1 500€</strong> pour une TPE.
              Au-delà, vous payez la structure de l'agence, pas la qualité technique.
            </p>

            <div className="not-prose bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 my-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Notre Top 3 Recommandations 2026</h3>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">🥇</span>
                  <div>
                    <h4 className="text-xl font-bold text-primary">SolYB - 599€</h4>
                    <p className="text-gray-700">Meilleur rapport qualité/prix, livraison rapide, technologie moderne</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">🥈</span>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Les Accros du Web - 790€</h4>
                    <p className="text-gray-700">Bon choix si SolYB complet, focus SEO</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <span className="text-3xl">🥉</span>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">Freelance local vérifié - 800-1 200€</h4>
                    <p className="text-gray-700">Pour projets très spécifiques</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary to-primary-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Besoin d'un Site Web Professionnel en Guadeloupe ?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              SolYB vous livre un site complet en 2 semaines pour 599€.
            </p>
            <div className="space-y-2 mb-8 text-white/90">
              <p>✅ Site responsive mobile</p>
              <p>✅ Hébergement + nom de domaine 1 an offert</p>
              <p>✅ Création de contenu avec IA</p>
              <p>✅ Référencement SEO de base</p>
              <p>✅ Formation vidéo</p>
              <p>✅ Support 30 jours</p>
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

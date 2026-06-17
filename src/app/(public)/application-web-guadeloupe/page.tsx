import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Check, Code2, Database, Smartphone, Zap, Shield, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Application Web Sur Mesure Guadeloupe 971 | Développement',
  description: "Développement d'application web sur mesure en Guadeloupe : CRM, réservation, e-commerce avancé. React/Next.js. Hébergement local. Devis gratuit.",
  keywords: ['application web Guadeloupe', 'développement application 971', 'application sur mesure Guadeloupe', 'CRM Guadeloupe', 'logiciel web Guadeloupe'],
  alternates: { canonical: 'https://solyb.fr/application-web-guadeloupe' },
  openGraph: {
    title: 'Application Web Sur Mesure Guadeloupe 971 | SolYB',
    description: "Développement d'application web personnalisée en Guadeloupe. CRM, systèmes de réservation, plateformes e-learning.",
    url: 'https://solyb.fr/application-web-guadeloupe',
    type: 'website',
    locale: 'fr_FR',
    siteName: 'SolYB — Agence Digitale Guadeloupe',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Développement Application Web Guadeloupe - SolYB' }],
  },
}

const features = [
  { icon: Code2, title: "Technologies Modernes", desc: "React, Next.js, Node.js — les meilleures technologies pour des applications performantes", color: "text-coral", bg: "bg-coral/10" },
  { icon: Database, title: "Base de Données Robuste", desc: "PostgreSQL, Supabase — sécurité et performance garanties pour vos données", color: "text-turquoise", bg: "bg-turquoise/10" },
  { icon: Smartphone, title: "Responsive & Mobile", desc: "Applications adaptées à tous les écrans — ordinateur, tablette, smartphone", color: "text-solar", bg: "bg-solar/10" },
  { icon: Shield, title: "Sécurité Maximale", desc: "Authentification, chiffrement, sauvegardes automatiques", color: "text-violet", bg: "bg-violet/10" },
  { icon: Zap, title: "Performance Optimale", desc: "Temps de chargement ultra-rapides, expérience utilisateur fluide", color: "text-coral", bg: "bg-coral/10" },
  { icon: TrendingUp, title: "Évolutive", desc: "Architecture modulaire permettant d'ajouter des fonctionnalités facilement", color: "text-turquoise", bg: "bg-turquoise/10" },
]

const useCases = [
  {
    title: "CRM Sur Mesure",
    desc: "Gestion de clients, suivi des ventes, automatisation des tâches",
    price: "À partir de 2 500€",
    accentColor: "text-coral",
    borderColor: "border-coral/30",
    features: ["Gestion contacts & clients", "Pipeline de vente", "Tableaux de bord analytics", "Automatisation emails", "Intégration calendrier"],
  },
  {
    title: "Système de Réservation",
    desc: "Réservations en ligne pour restaurants, hôtels, services",
    price: "À partir de 1 800€",
    accentColor: "text-turquoise",
    borderColor: "border-turquoise/30",
    features: ["Calendrier disponibilités", "Réservation en temps réel", "Paiement en ligne", "Notifications SMS/Email", "Gestion multi-utilisateurs"],
  },
  {
    title: "Plateforme E-learning",
    desc: "Formation en ligne, cours vidéo, quiz et certifications",
    price: "À partir de 3 000€",
    accentColor: "text-solar",
    borderColor: "border-solar/30",
    features: ["Hébergement cours vidéo", "Quiz & évaluations", "Suivi progression", "Certificats automatiques", "Espace étudiant/formateur"],
  },
  {
    title: "Portail Intranet",
    desc: "Espace collaboratif pour entreprises et associations",
    price: "À partir de 2 000€",
    accentColor: "text-violet",
    borderColor: "border-violet/30",
    features: ["Gestion documents", "Messagerie interne", "Gestion de projets", "Annuaire employés", "Permissions par rôle"],
  },
]

const steps = [
  { n: "1", title: "Analyse de vos besoins", desc: "Appel découverte gratuit de 30 min pour comprendre votre projet et vos objectifs" },
  { n: "2", title: "Devis détaillé", desc: "Proposition technique et financière sous 48h avec planning prévisionnel" },
  { n: "3", title: "Développement", desc: "Réalisation de votre application avec suivi hebdomadaire et démos régulières" },
  { n: "4", title: "Tests & Formation", desc: "Tests complets, corrections, et formation de vos équipes à l'utilisation" },
  { n: "5", title: "Mise en ligne", desc: "Déploiement sur serveurs sécurisés avec support technique inclus" },
]

export default function ApplicationWebPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Application Web Sur Mesure',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '2000', priceCurrency: 'EUR', description: "Développement d'application web personnalisée" },
    creator: { '@type': 'Organization', name: 'SolYB', address: { '@type': 'PostalAddress', addressLocality: 'Baie-Mahault', addressRegion: 'Guadeloupe', postalCode: '97122', addressCountry: 'GP' } },
    areaServed: { '@type': 'Place', name: 'Guadeloupe' },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="min-h-screen bg-[#0A0A0F]">

        {/* Hero */}
        <section className="pt-20 md:pt-28 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-turquoise/10 border border-turquoise/20 text-turquoise px-4 py-2 rounded-full mb-8 text-sm font-semibold">
              <Code2 className="w-4 h-4" />
              Développement sur mesure
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-[#F0EDE8] mb-6">
              Applications Web<br />
              <span className="text-coral">Sur Mesure en Guadeloupe</span>
            </h1>
            <p className="text-lg md:text-xl text-[#8B8B9E] max-w-3xl mx-auto mb-10">
              Transformez vos processus métier avec une application web personnalisée.
              CRM, réservation, e-learning, portail intranet — nous développons la solution
              qui répond exactement à vos besoins.
            </p>
            <Link href="/#contact" className="btn-studio inline-flex items-center gap-2 bg-coral text-white px-8 py-4 font-bold text-lg shadow-xl shadow-coral/20">
              <span className="relative z-10 flex items-center gap-2">Demander un devis gratuit <ArrowRight className="w-5 h-5" /></span>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0D0D14] border-y border-[#2A2A38]">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F0EDE8] text-center mb-12">
              Pourquoi Choisir Une Application Sur Mesure ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f, i) => {
                const Icon = f.icon
                return (
                  <div key={i} className="bg-[#13131A] border border-[#2A2A38] rounded-xl p-6 hover:border-coral/20 transition-colors">
                    <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${f.color}`} />
                    </div>
                    <h3 className="font-display font-bold text-[#F0EDE8] mb-2">{f.title}</h3>
                    <p className="text-sm text-[#8B8B9E] leading-relaxed">{f.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F0EDE8] text-center mb-4">
              Exemples d&apos;Applications Développées
            </h2>
            <p className="text-[#8B8B9E] text-center mb-12 max-w-2xl mx-auto">
              Des solutions concrètes pour des besoins réels d&apos;entreprises guadeloupéennes
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {useCases.map((u, i) => (
                <div key={i} className={`bg-[#13131A] border-2 ${u.borderColor} rounded-2xl p-8 flex flex-col`}>
                  <h3 className={`font-display text-2xl font-bold ${u.accentColor} mb-2`}>{u.title}</h3>
                  <p className="text-[#8B8B9E] text-sm mb-4">{u.desc}</p>
                  <p className={`font-display text-xl font-bold ${u.accentColor} mb-6`}>{u.price}</p>
                  <ul className="space-y-2.5 mb-8 flex-1">
                    {u.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-[#8B8B9E]">
                        <Check className="w-4 h-4 text-turquoise flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link href="/#contact" className="w-full inline-flex items-center justify-center gap-2 bg-[#1C1C26] hover:bg-[#2A2A38] text-[#F0EDE8] border border-[#2A2A38] hover:border-coral/30 px-6 py-3 rounded-xl font-semibold transition-all">
                    Discuter de ce projet <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0D0D14] border-y border-[#2A2A38]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-[#F0EDE8] text-center mb-12">Comment Ça Marche ?</h2>
            <div className="space-y-4">
              {steps.map((s, i) => (
                <div key={i} className="flex items-start gap-5 bg-[#13131A] border border-[#2A2A38] rounded-xl p-5 hover:border-coral/20 transition-colors">
                  <div className="w-10 h-10 bg-coral rounded-full flex items-center justify-center font-display font-bold text-white text-sm flex-shrink-0">
                    {s.n}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-[#F0EDE8] mb-1">{s.title}</h3>
                    <p className="text-sm text-[#8B8B9E]">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F0EDE8] mb-4">Prêt à digitaliser votre entreprise ?</h2>
            <p className="text-[#8B8B9E] mb-8">Discutons de votre projet lors d&apos;un appel découverte gratuit de 30 minutes.</p>
            <Link href="/#contact" className="btn-studio inline-flex items-center gap-2 bg-coral text-white px-8 py-4 font-bold text-lg shadow-xl shadow-coral/20">
              <span className="relative z-10 flex items-center gap-2">Réserver mon appel gratuit <ArrowRight className="w-5 h-5" /></span>
            </Link>
          </div>
        </section>

      </main>
    </>
  )
}

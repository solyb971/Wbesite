export type SolutionStatus = "live" | "beta" | "soon"

export type Solution = {
  id: string
  name: string
  tagline: string
  description: string
  status: SolutionStatus
  statusLabel: string
  iconKey: "restaurant" | "invoice"
  logo?: string
  color: "coral" | "solar" | "turquoise"
  features: string[]
  pricing: string
  pricingDetail: string
  target: string
  ctaLabel: string
  ctaHref: string
  secondaryCta?: { label: string; href: string }
}

export const solutions: Solution[] = [
  {
    id: "resagp",
    name: "ResaGP",
    tagline: "Gérez votre restaurant sans payer de commission",
    description:
      "Réservations en ligne, plan de salle, fiches clients, rappels automatiques — tout ce dont votre restaurant a besoin, dans un seul outil. Sans payer une commission à chaque couvert.",
    status: "live",
    statusLabel: "Disponible",
    iconKey: "restaurant",
    logo: "/solutions/resagp.jpg",
    color: "turquoise",
    features: [
      "Réservations en ligne 24h/24, 7j/7",
      "Plan de salle mis à jour en direct",
      "Confirmations automatiques par SMS et email",
      "Rappels envoyés automatiquement avant chaque repas",
      "Fiches clients qui se remplissent toutes seules",
      "Carte numérique avec QR code sur chaque table",
    ],
    pricing: "Essai gratuit 14 jours",
    pricingDetail: "Sans carte bancaire • Sans commission par couvert",
    target: "Restaurants et bars de Guadeloupe",
    ctaLabel: "Voir ResaGP",
    ctaHref: "/resagp",
    secondaryCta: { label: "Essai gratuit", href: "/resagp#contact" },
  },
  {
    id: "factugp",
    name: "FactuGP",
    tagline: "Prêt pour la réforme facturation 2026 — sans stress",
    description:
      "À partir de septembre 2026, toutes les entreprises françaises doivent émettre leurs factures en format électronique. FactuGP s'occupe de tout : bon format, bonne TVA, envoi automatique aux impôts.",
    status: "soon",
    statusLabel: "Lancement 2025",
    iconKey: "invoice",
    color: "solar",
    features: [
      "Factures au format légal exigé par l'État",
      "TVA Guadeloupe (8,5 % et 2,1 %) déjà configurée",
      "Transmission automatique aux impôts",
      "Devis transformé en facture en 1 clic",
      "Relances automatiques en cas d'impayé",
      "Compatible BTP, commerce, services, professions libérales",
    ],
    pricing: "À partir de 0 €/mois",
    pricingDetail: "Déduction fiscale possible selon votre situation",
    target: "TPE et PME de Guadeloupe",
    ctaLabel: "En savoir plus",
    ctaHref: "/facturation-electronique",
    secondaryCta: { label: "Être informé du lancement", href: "/#contact?sujet=FactuGP" },
  },
]

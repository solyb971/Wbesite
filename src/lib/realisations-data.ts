export type Realisation = {
  id: string
  client: string
  projectType: string
  sector: string
  year: number
  description: string
  tags: string[]
  image: string
  url?: string
  accentColor: string
}

export const realisations: Realisation[] = [
  {
    id: "liberty-drive-serenity",
    client: "Liberty Drive Serenity",
    projectType: "Site vitrine & Application de réservation",
    sector: "Transport & Santé",
    year: 2025,
    description:
      "Plateforme de mise en relation entre soignants et chauffeurs professionnels pour la gestion des tournées quotidiennes. Interface double — espace Pro de santé et espace Chauffeur — avec devis en ligne et gestion des rendez-vous.",
    tags: ["Next.js", "React", "UI/UX Design", "Application web", "Guadeloupe"],
    image: "/realisations/lds.jpg",
    accentColor: "#F59E0B",
  },
]

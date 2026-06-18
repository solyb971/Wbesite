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
      "Une plateforme qui met en relation des soignants et des chauffeurs professionnels pour organiser leurs tournées du quotidien. Un espace pour les professionnels de santé, un espace pour les chauffeurs — avec devis en ligne et gestion des rendez-vous.",
    tags: ["Next.js", "React", "UI/UX Design", "Application web", "Guadeloupe"],
    image: "/realisations/lds.jpg",
    url: "https://libertydriveserenity.com/",
    accentColor: "#F59E0B",
  },
]

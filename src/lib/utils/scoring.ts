import { Lead } from "@/hooks/useLeads"

export interface ScoreBreakdown {
  budget: { score: number; max: 20; label: string }
  clarity: { score: number; max: 15; label: string }
  urgency: { score: number; max: 20; label: string }
  fit: { score: number; max: 15; label: string }
  responsiveness: { score: number; max: 15; label: string }
  source: { score: number; max: 15; label: string }
  total: { score: number; max: 100; percentage: number }
}

export interface ScoreRecommendation {
  priority: "high" | "medium" | "low"
  actions: string[]
  strengths: string[]
  concerns: string[]
}

/**
 * Get detailed score breakdown for a lead
 */
export function getScoreBreakdown(lead: Lead): ScoreBreakdown {
  return {
    budget: {
      score: lead.score_budget,
      max: 20,
      label: lead.budget >= 2000 ? "Budget élevé" : lead.budget >= 1000 ? "Budget moyen" : "Budget limité",
    },
    clarity: {
      score: lead.score_clarity,
      max: 15,
      label:
        lead.description.length > 200
          ? "Projet très détaillé"
          : lead.description.length > 100
          ? "Bonne description"
          : "Description basique",
    },
    urgency: {
      score: lead.score_urgency,
      max: 20,
      label:
        lead.urgency === "urgent"
          ? "Très urgent"
          : lead.urgency === "high"
          ? "Urgent"
          : lead.urgency === "normal"
          ? "Normal"
          : "Pas pressé",
    },
    fit: {
      score: lead.score_fit,
      max: 15,
      label: ["vitrine", "ecommerce"].includes(lead.project_type)
        ? "Bon fit avec expertise"
        : "Projet spécial",
    },
    responsiveness: {
      score: lead.score_responsiveness,
      max: 15,
      label:
        lead.score_responsiveness >= 15
          ? "Très réactif"
          : lead.score_responsiveness >= 10
          ? "Réactif"
          : lead.score_responsiveness >= 5
          ? "Peu réactif"
          : "Pas encore contacté",
    },
    source: {
      score: lead.score_source,
      max: 15,
      label:
        lead.source === "bouche-a-oreille" || lead.source === "referral"
          ? "Recommandation"
          : lead.source === "linkedin"
          ? "LinkedIn"
          : lead.source === "site-web"
          ? "Site web"
          : "Autre source",
    },
    total: {
      score: lead.score_total,
      max: 100,
      percentage: Math.round((lead.score_total / 100) * 100),
    },
  }
}

/**
 * Get recommendations based on lead score
 */
export function getScoreRecommendations(lead: Lead): ScoreRecommendation {
  const score = lead.score_total
  const breakdown = getScoreBreakdown(lead)

  // Determine priority
  let priority: "high" | "medium" | "low" = "medium"
  if (score >= 80 || lead.urgency === "urgent") {
    priority = "high"
  } else if (score < 50 && lead.urgency === "low") {
    priority = "low"
  }

  // Actions to take
  const actions: string[] = []

  if (lead.status === "nouveau") {
    if (priority === "high") {
      actions.push("🔥 Contacter dans les 2h")
    } else {
      actions.push("📞 Contacter sous 24h")
    }
  }

  if (lead.score_clarity < 10) {
    actions.push("📝 Demander plus de détails sur le projet")
  }

  if (lead.score_responsiveness === 0 && lead.status !== "nouveau") {
    actions.push("⏰ Relancer le lead (pas de réponse)")
  }

  if (lead.budget < 500 && lead.project_type === "ecommerce") {
    actions.push("💰 Clarifier le budget (peut-être sous-estimé)")
  }

  if (lead.is_launch_offer) {
    actions.push(`🎯 Offre de lancement - Position #${lead.launch_offer_position}`)
  }

  if (lead.urgency === "urgent") {
    actions.push("⚡ Urgence très élevée - Priorité absolue")
  }

  // Strengths
  const strengths: string[] = []

  if (breakdown.budget.score >= 15) {
    strengths.push("Budget confortable pour le projet")
  }

  if (breakdown.clarity.score >= 12) {
    strengths.push("Besoin clairement défini")
  }

  if (breakdown.fit.score >= 12) {
    strengths.push("Projet aligné avec votre expertise")
  }

  if (breakdown.source.score >= 12) {
    strengths.push("Source de qualité (recommandation)")
  }

  if (lead.company) {
    strengths.push("Client professionnel (entreprise)")
  }

  // Concerns
  const concerns: string[] = []

  if (breakdown.budget.score < 10) {
    concerns.push("Budget potentiellement insuffisant")
  }

  if (breakdown.clarity.score < 8) {
    concerns.push("Besoin peu détaillé - nécessite qualification")
  }

  if (breakdown.responsiveness.score < 5 && lead.status !== "nouveau") {
    concerns.push("Lead peu réactif aux relances")
  }

  if (lead.urgency === "low" && score < 60) {
    concerns.push("Faible urgence + score moyen = risque de non-conversion")
  }

  return {
    priority,
    actions,
    strengths,
    concerns,
  }
}

/**
 * Get score color for UI
 */
export function getScoreColor(score: number): string {
  if (score >= 80) return "text-green-600"
  if (score >= 60) return "text-yellow-600"
  if (score >= 40) return "text-orange-600"
  return "text-red-600"
}

/**
 * Get score background color for UI
 */
export function getScoreBgColor(score: number): string {
  if (score >= 80) return "bg-green-100"
  if (score >= 60) return "bg-yellow-100"
  if (score >= 40) return "bg-orange-100"
  return "bg-red-100"
}

/**
 * Get priority color for UI
 */
export function getPriorityColor(priority: "high" | "medium" | "low"): string {
  switch (priority) {
    case "high":
      return "text-red-600 bg-red-100"
    case "medium":
      return "text-yellow-600 bg-yellow-100"
    case "low":
      return "text-gray-600 bg-gray-100"
  }
}

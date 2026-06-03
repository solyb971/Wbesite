import { Lead } from "@/hooks/useLeads"
import { addDays, addWeeks, format } from "date-fns"
import { fr } from "date-fns/locale"

export interface TimeEstimate {
  hours: number
  days: number
  startDate: Date
  endDate: Date
  formattedDuration: string
  formattedDeadline: string
}

export interface ProfitabilityEstimate {
  estimatedRevenue: number
  estimatedHours: number
  hourlyRate: number
  profitMargin: number
  complexity: "low" | "medium" | "high"
}

/**
 * Estimate project hours based on type and complexity
 */
export function estimateProjectHours(lead: Lead): number {
  let baseHours = 0

  // Base hours by project type
  switch (lead.project_type) {
    case "vitrine":
      baseHours = 24 // 3 days
      break
    case "ecommerce":
      baseHours = 56 // 7 days
      break
    case "content":
      baseHours = 8 // 1 day/month
      break
    case "custom":
      baseHours = 40 // 5 days
      break
    default:
      baseHours = 24
  }

  // Adjust based on description complexity
  const descriptionLength = lead.description.length
  if (descriptionLength > 300) {
    baseHours *= 1.3 // +30% for complex requirements
  } else if (descriptionLength > 150) {
    baseHours *= 1.15 // +15% for detailed requirements
  }

  // Adjust based on budget (higher budget might mean more features)
  if (lead.budget > 2000) {
    baseHours *= 1.2 // +20% for premium project
  } else if (lead.budget < 500) {
    baseHours *= 0.8 // -20% for basic project
  }

  return Math.round(baseHours)
}

/**
 * Calculate time estimate with dates
 */
export function getTimeEstimate(lead: Lead, startDate: Date = new Date()): TimeEstimate {
  const hours = estimateProjectHours(lead)
  const days = Math.ceil(hours / 8) // 8h work days

  // Add buffer based on urgency
  let bufferDays = 0
  if (lead.urgency === "urgent") {
    bufferDays = 2 // Minimal buffer for urgent
  } else if (lead.urgency === "high") {
    bufferDays = 3
  } else if (lead.urgency === "normal") {
    bufferDays = 5
  } else {
    bufferDays = 7 // More buffer for low priority
  }

  const totalDays = days + bufferDays
  const endDate = addDays(startDate, totalDays)

  return {
    hours,
    days: totalDays,
    startDate,
    endDate,
    formattedDuration: `${days} jours de travail + ${bufferDays} jours de buffer = ${totalDays} jours`,
    formattedDeadline: format(endDate, "EEEE d MMMM yyyy", { locale: fr }),
  }
}

/**
 * Calculate profitability estimate
 */
export function getProfitabilityEstimate(
  lead: Lead,
  hourlyRate: number = 50
): ProfitabilityEstimate {
  const estimatedHours = estimateProjectHours(lead)
  const estimatedRevenue = lead.budget

  const laborCost = estimatedHours * hourlyRate
  const profitMargin = ((estimatedRevenue - laborCost) / estimatedRevenue) * 100

  // Determine complexity
  let complexity: "low" | "medium" | "high" = "medium"
  if (estimatedHours < 20) {
    complexity = "low"
  } else if (estimatedHours > 50) {
    complexity = "high"
  }

  return {
    estimatedRevenue,
    estimatedHours,
    hourlyRate,
    profitMargin: Math.round(profitMargin),
    complexity,
  }
}

/**
 * Get complexity label and color
 */
export function getComplexityInfo(complexity: "low" | "medium" | "high"): {
  label: string
  color: string
} {
  switch (complexity) {
    case "low":
      return { label: "Simple", color: "text-green-600 bg-green-100" }
    case "medium":
      return { label: "Moyen", color: "text-yellow-600 bg-yellow-100" }
    case "high":
      return { label: "Complexe", color: "text-red-600 bg-red-100" }
  }
}

/**
 * Get margin health indicator
 */
export function getMarginHealth(margin: number): {
  label: string
  color: string
  recommendation: string
} {
  if (margin >= 40) {
    return {
      label: "Excellente marge",
      color: "text-green-600 bg-green-100",
      recommendation: "Projet très rentable, à prioriser",
    }
  } else if (margin >= 20) {
    return {
      label: "Bonne marge",
      color: "text-blue-600 bg-blue-100",
      recommendation: "Rentabilité correcte",
    }
  } else if (margin >= 0) {
    return {
      label: "Marge faible",
      color: "text-yellow-600 bg-yellow-100",
      recommendation: "Négocier budget ou réduire scope",
    }
  } else {
    return {
      label: "Non rentable",
      color: "text-red-600 bg-red-100",
      recommendation: "⚠️ Projet déficitaire - Revoir budget",
    }
  }
}

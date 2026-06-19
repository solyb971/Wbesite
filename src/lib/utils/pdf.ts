import { jsPDF } from "jspdf"
import { Lead } from "@/hooks/useLeads"
import { getTimeEstimate, getProfitabilityEstimate } from "./time-estimate"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

/**
 * Generate quote PDF for a lead
 */
export function generateQuotePDF(lead: Lead): jsPDF {
  const doc = new jsPDF()

  // Colors
  const primaryColor = "#2563eb"
  const grayColor = "#6b7280"
  const darkColor = "#1f2937"

  // Margins
  const margin = 20
  let yPos = 20

  // Helper to add text with auto line break
  const addText = (
    text: string,
    x: number,
    y: number,
    options?: { maxWidth?: number; fontSize?: number; color?: string; bold?: boolean }
  ) => {
    doc.setFontSize(options?.fontSize || 10)
    doc.setTextColor(options?.color || darkColor)
    if (options?.bold) {
      doc.setFont("helvetica", "bold")
    } else {
      doc.setFont("helvetica", "normal")
    }

    if (options?.maxWidth) {
      const lines = doc.splitTextToSize(text, options.maxWidth)
      doc.text(lines, x, y)
      return y + lines.length * 5
    } else {
      doc.text(text, x, y)
      return y + 5
    }
  }

  // Header - Logo & Title
  doc.setFillColor(primaryColor)
  doc.rect(0, 0, 210, 40, "F")

  doc.setTextColor("#ffffff")
  doc.setFontSize(24)
  doc.setFont("helvetica", "bold")
  doc.text("SolYB", margin, 20)

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.text("Solutions digitales en Guadeloupe", margin, 28)

  // Quote Number & Date
  doc.setFontSize(10)
  doc.text(`Devis N° SOLYB-${Date.now().toString().slice(-6)}`, 210 - margin, 20, { align: "right" })
  doc.text(`Date: ${format(new Date(), "dd/MM/yyyy", { locale: fr })}`, 210 - margin, 26, {
    align: "right",
  })
  doc.text(`Validité: 30 jours`, 210 - margin, 32, { align: "right" })

  yPos = 50

  // Client Information
  doc.setFontSize(14)
  doc.setTextColor(darkColor)
  doc.setFont("helvetica", "bold")
  doc.text("Informations Client", margin, yPos)
  yPos += 10

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(grayColor)

  yPos = addText(`Nom: ${lead.name}`, margin, yPos, { color: darkColor })
  yPos = addText(`Email: ${lead.email}`, margin, yPos, { color: darkColor })
  if (lead.phone) {
    yPos = addText(`Téléphone: ${lead.phone}`, margin, yPos, { color: darkColor })
  }
  if (lead.company) {
    yPos = addText(`Entreprise: ${lead.company}`, margin, yPos, { color: darkColor })
  }

  yPos += 10

  // Project Description
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(darkColor)
  doc.text("Description du Projet", margin, yPos)
  yPos += 10

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  yPos = addText(lead.description, margin, yPos, { maxWidth: 170, color: grayColor })

  yPos += 10

  // Project Details
  doc.setFillColor("#f3f4f6")
  doc.rect(margin, yPos, 170, 30, "F")

  yPos += 8
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  addText("Type de projet:", margin + 5, yPos, { color: darkColor })
  doc.setFont("helvetica", "normal")
  addText(getProjectTypeLabel(lead.project_type), margin + 50, yPos, { color: grayColor })

  yPos += 8
  doc.setFont("helvetica", "bold")
  addText("Urgence:", margin + 5, yPos, { color: darkColor })
  doc.setFont("helvetica", "normal")
  addText(getUrgencyLabel(lead.urgency), margin + 50, yPos, { color: grayColor })

  yPos += 8
  doc.setFont("helvetica", "bold")
  addText("Délai estimé:", margin + 5, yPos, { color: darkColor })
  doc.setFont("helvetica", "normal")
  const timeEstimate = getTimeEstimate(lead)
  addText(`${timeEstimate.days} jours`, margin + 50, yPos, { color: grayColor })

  yPos += 18

  // Pricing Table
  doc.setFontSize(14)
  doc.setFont("helvetica", "bold")
  doc.setTextColor(darkColor)
  doc.text("Détail du Devis", margin, yPos)
  yPos += 10

  // Table Header
  doc.setFillColor(primaryColor)
  doc.rect(margin, yPos, 170, 10, "F")
  doc.setTextColor("#ffffff")
  doc.setFontSize(10)
  doc.setFont("helvetica", "bold")
  doc.text("Description", margin + 5, yPos + 7)
  doc.text("Montant HT", 210 - margin - 40, yPos + 7, { align: "right" })

  yPos += 10

  // Table Rows
  doc.setFillColor("#ffffff")
  doc.setTextColor(darkColor)
  doc.setFont("helvetica", "normal")

  const items = getQuoteItems(lead)
  items.forEach((item, index) => {
    const rowColor = index % 2 === 0 ? "#ffffff" : "#f9fafb"
    doc.setFillColor(rowColor)
    doc.rect(margin, yPos, 170, 10, "F")

    doc.text(item.description, margin + 5, yPos + 7)
    doc.text(`${item.amount.toFixed(2)}€`, 210 - margin - 5, yPos + 7, { align: "right" })

    yPos += 10
  })

  // Total
  doc.setFillColor(primaryColor)
  doc.rect(margin, yPos, 170, 12, "F")
  doc.setTextColor("#ffffff")
  doc.setFontSize(12)
  doc.setFont("helvetica", "bold")
  doc.text("TOTAL HT", margin + 5, yPos + 8)
  doc.text(`${lead.budget.toFixed(2)}€`, 210 - margin - 5, yPos + 8, { align: "right" })

  yPos += 20

  // Payment Terms
  doc.setFontSize(12)
  doc.setTextColor(darkColor)
  doc.setFont("helvetica", "bold")
  doc.text("Conditions de Paiement", margin, yPos)
  yPos += 8

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(grayColor)
  yPos = addText("• 50% à la validation du devis", margin, yPos)
  yPos = addText("• 50% à la livraison finale", margin, yPos)

  yPos += 8

  // Included Services
  doc.setFontSize(12)
  doc.setTextColor(darkColor)
  doc.setFont("helvetica", "bold")
  doc.text("Services Inclus", margin, yPos)
  yPos += 8

  doc.setFontSize(10)
  doc.setFont("helvetica", "normal")
  doc.setTextColor(grayColor)
  yPos = addText("• Formation complète à l'utilisation", margin, yPos)
  yPos = addText("• Hébergement 1 an inclus", margin, yPos)
  yPos = addText("• Support 3 mois inclus", margin, yPos)
  yPos = addText("• Modifications illimitées pendant le développement", margin, yPos)

  // Footer
  const pageHeight = doc.internal.pageSize.getHeight()
  doc.setFillColor("#f3f4f6")
  doc.rect(0, pageHeight - 30, 210, 30, "F")

  doc.setFontSize(9)
  doc.setTextColor(grayColor)
  doc.setFont("helvetica", "normal")
  doc.text("SolYB - Solutions digitales en Guadeloupe", 105, pageHeight - 20, { align: "center" })
  doc.text("Email: contact@solyb.fr | Tél: +590 690 42 67 92", 105, pageHeight - 15, {
    align: "center",
  })
  doc.text("Antilles Françaises", 105, pageHeight - 10, { align: "center" })

  return doc
}

/**
 * Get project type label in French
 */
function getProjectTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    vitrine: "Site Vitrine",
    ecommerce: "Boutique E-commerce",
    content: "Contenu IA",
    custom: "Projet Sur Mesure",
  }
  return labels[type] || type
}

/**
 * Get urgency label in French
 */
function getUrgencyLabel(urgency: string): string {
  const labels: Record<string, string> = {
    urgent: "Très Urgent (< 2 semaines)",
    high: "Urgent (2 semaines)",
    normal: "Normal (1 mois)",
    low: "Pas urgent (flexible)",
  }
  return labels[urgency] || urgency
}

/**
 * Get quote line items based on project
 */
function getQuoteItems(lead: Lead): Array<{ description: string; amount: number }> {
  const items: Array<{ description: string; amount: number }> = []

  // Main service
  const mainAmount = lead.budget * 0.7 // 70% for main service
  items.push({
    description: `${getProjectTypeLabel(lead.project_type)} - Développement complet`,
    amount: mainAmount,
  })

  // Additional services
  items.push({
    description: "Formation personnalisée (2-4h)",
    amount: lead.budget * 0.15,
  })

  items.push({
    description: "Hébergement 1 an + Support 3 mois",
    amount: lead.budget * 0.15,
  })

  return items
}

/**
 * Download PDF
 */
export function downloadPDF(doc: jsPDF, filename: string) {
  doc.save(filename)
}

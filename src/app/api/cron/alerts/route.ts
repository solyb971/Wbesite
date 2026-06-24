import { NextRequest, NextResponse } from "next/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { sendEmail } from "@/lib/email/brevo"

// Vercel Cron Job - Send daily alerts to admin
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Service-role : le cron n'a pas de session → RLS bloquerait les lectures
    const supabase = createAdminClient()
    const alerts = []

    // 1. Leads without contact > 3 days
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)

    const { data: uncontactedLeads } = await supabase
      .from("leads")
      .select("*")
      .is("first_contact_date", null)
      .lt("created_at", threeDaysAgo.toISOString())
      .in("status", ["nouveau"])

    if (uncontactedLeads && uncontactedLeads.length > 0) {
      alerts.push({
        type: "uncontacted_leads",
        count: uncontactedLeads.length,
        leads: uncontactedLeads.map((l) => ({
          id: l.id,
          name: l.name,
          created_at: l.created_at,
        })),
      })
    }

    // 2. Devis sans réponse > 5 days
    const fiveDaysAgo = new Date()
    fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5)

    const { data: stalledQuotes } = await supabase
      .from("leads")
      .select("*")
      .eq("status", "devis")
      .lt("updated_at", fiveDaysAgo.toISOString())

    if (stalledQuotes && stalledQuotes.length > 0) {
      alerts.push({
        type: "stalled_quotes",
        count: stalledQuotes.length,
        leads: stalledQuotes.map((l) => ({
          id: l.id,
          name: l.name,
          updated_at: l.updated_at,
        })),
      })
    }

    // 3. Check capacity for next week
    const nextWeekStart = new Date()
    nextWeekStart.setDate(nextWeekStart.getDate() + 7)
    const nextWeekEnd = new Date(nextWeekStart)
    nextWeekEnd.setDate(nextWeekEnd.getDate() + 7)

    const { data: nextWeekEvents } = await supabase
      .from("planning_events")
      .select("*")
      .gte("start_time", nextWeekStart.toISOString())
      .lt("start_time", nextWeekEnd.toISOString())

    const totalHours = nextWeekEvents?.reduce((sum, event) => {
      return sum + (event.estimated_hours || 0)
    }, 0) || 0

    const capacityThreshold = 18 // 90% of 20h/week
    if (totalHours > capacityThreshold) {
      alerts.push({
        type: "capacity_overload",
        totalHours,
        threshold: capacityThreshold,
        week: nextWeekStart.toISOString().split("T")[0],
      })
    }

    // 4. Launch offer progress
    const { data: launchOfferData } = await supabase
      .from("launch_offer_tracking")
      .select("*")
      .eq("is_active", true)
      .single()

    if (launchOfferData && launchOfferData.slots_remaining <= 5) {
      alerts.push({
        type: "launch_offer_ending",
        slotsRemaining: launchOfferData.slots_remaining,
        slotsFilled: launchOfferData.slots_filled,
      })
    }

    // Send alert email if there are alerts
    if (alerts.length > 0) {
      const alertSummary = alerts
        .map((alert) => {
          switch (alert.type) {
            case "uncontacted_leads":
              return `⚠️ ${alert.count} leads sans contact depuis 3+ jours`
            case "stalled_quotes":
              return `📄 ${alert.count} devis sans réponse depuis 5+ jours`
            case "capacity_overload":
              return `⚠️ Surcharge prévue semaine prochaine: ${alert.totalHours}h/${alert.threshold}h`
            case "launch_offer_ending":
              return `🎯 Offre lancement: Plus que ${alert.slotsRemaining} places restantes!`
            default:
              return ""
          }
        })
        .join("\n")

      const htmlContent = `
        <h2>Alertes CRM - ${new Date().toLocaleDateString("fr-FR")}</h2>
        <pre style="background: #f5f5f5; padding: 15px; border-radius: 8px;">${alertSummary}</pre>
        <p>Connectez-vous au <a href="https://solyb.fr/admin">CRM</a> pour plus de détails.</p>
      `
      const adminEmail = process.env.ADMIN_EMAIL || "solyb971@gmail.com"
      await sendEmail(adminEmail, `Alertes CRM - ${new Date().toLocaleDateString("fr-FR")}`, htmlContent)
    }

    return NextResponse.json({
      success: true,
      alertsGenerated: alerts.length,
      alerts,
      processedAt: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Alerts cron error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * Webhook Brevo pour tracker les ouvertures et clics d'emails
 * Configure dans Brevo: Settings > Webhooks
 * URL: https://your-domain.com/api/webhooks/brevo
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { event, email, "message-id": messageId, link, date } = body

    console.log("Brevo webhook received:", { event, email, messageId })

    const supabase = await createClient()

    // Récupérer l'email log correspondant
    const { data: emailLog, error: logError } = await supabase
      .from("email_logs")
      .select("*, lead_id")
      .eq("brevo_message_id", messageId)
      .single()

    if (logError || !emailLog) {
      console.error("Email log not found:", messageId)
      return NextResponse.json({ error: "Email log not found" }, { status: 404 })
    }

    // Mettre à jour le statut selon l'événement
    switch (event) {
      case "delivered":
        await supabase
          .from("email_logs")
          .update({ status: "delivered" })
          .eq("id", emailLog.id)
        break

      case "opened":
      case "unique_opened":
        await supabase
          .from("email_logs")
          .update({
            status: "opened",
            opened_at: date || new Date().toISOString(),
          })
          .eq("id", emailLog.id)

        // Incrémenter compteur lead
        if (emailLog.lead_id) {
          await supabase.rpc("increment", {
            table_name: "leads",
            row_id: emailLog.lead_id,
            column_name: "email_opens",
          })
        }
        break

      case "click":
        await supabase
          .from("email_logs")
          .update({
            status: "clicked",
            clicked_at: date || new Date().toISOString(),
          })
          .eq("id", emailLog.id)

        // Incrémenter compteur lead
        if (emailLog.lead_id) {
          await supabase.rpc("increment", {
            table_name: "leads",
            row_id: emailLog.lead_id,
            column_name: "email_clicks",
          })

          // Arrêter la séquence email car le lead est engagé
          await supabase
            .from("leads")
            .update({ email_sequence_active: false })
            .eq("id", emailLog.lead_id)
        }
        break

      case "soft_bounce":
      case "hard_bounce":
      case "invalid_email":
      case "blocked":
      case "spam":
        await supabase
          .from("email_logs")
          .update({ status: "failed" })
          .eq("id", emailLog.id)

        // Désactiver séquence email pour ce lead
        if (emailLog.lead_id) {
          await supabase
            .from("leads")
            .update({ email_sequence_active: false })
            .eq("id", emailLog.lead_id)
        }
        break
    }

    return NextResponse.json({ success: true, event })
  } catch (error: any) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET pour vérifier que le webhook est actif
export async function GET() {
  return NextResponse.json({ status: "Brevo webhook endpoint active" })
}

import { NextRequest, NextResponse } from "next/server"
import { sendTransactionalEmail } from "@/lib/email/brevo"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    // Vérifier authentification (envoi via le compte Brevo → réservé admin)
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    const body = await request.json()
    const { lead_id, template_id, to, subject, html } = body

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, html" },
        { status: 400 }
      )
    }

    // Envoyer l'email via Brevo
    const result = await sendTransactionalEmail({
      to: Array.isArray(to) ? to : [{ email: to }],
      subject,
      htmlContent: html,
    })

    if (result.error) {
      throw new Error(result.error)
    }

    // Logger l'envoi dans la base de données
    const { error: logError } = await supabase.from("email_logs").insert({
      lead_id,
      template_id,
      to_email: to,
      subject,
      body: html,
      status: "sent",
      brevo_message_id: result.messageId,
    })

    if (logError) {
      console.error("Failed to log email:", logError)
    }

    // Si template utilisé, incrémenter le compteur d'usage
    if (template_id) {
      await supabase.rpc("increment", {
        table_name: "email_templates",
        row_id: template_id,
        column_name: "usage_count",
      })
    }

    // Mettre à jour last_contact_date du lead
    if (lead_id) {
      await supabase
        .from("leads")
        .update({ last_contact_date: new Date().toISOString() })
        .eq("id", lead_id)
    }

    return NextResponse.json({
      success: true,
      messageId: result.messageId,
      message: "Email envoyé avec succès",
    })
  } catch (error) {
    console.error("Send email error:", error)
    return NextResponse.json({ error: "Erreur lors de l'envoi de l'email" }, { status: 500 })
  }
}

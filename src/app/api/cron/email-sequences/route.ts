import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendEmail } from "@/lib/email/brevo"
import { EmailTemplate, EmailTemplateKey } from "@/lib/email/templates"

// Vercel Cron Job - Send automated email sequences
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()
    const today = new Date()

    // Get leads with active email sequences
    const { data: leads, error } = await supabase
      .from("leads")
      .select("*")
      .eq("email_sequence_active", true)
      .in("status", ["nouveau", "contact"])
      .lt("email_sequence_step", 4)

    if (error) throw error

    let emailsSent = 0
    const results = []

    for (const lead of leads || []) {
      try {
        const createdAt = new Date(lead.created_at)
        const daysSinceCreated = Math.floor(
          (today.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
        )

        let shouldSend = false
        let templateKey: EmailTemplateKey | null = null

        // Determine which email to send based on days and current step
        if (daysSinceCreated >= 0 && lead.email_sequence_step === 0) {
          shouldSend = true
          templateKey = "welcome"
        } else if (daysSinceCreated >= 3 && lead.email_sequence_step === 1) {
          shouldSend = true
          templateKey = "caseStudy"
        } else if (daysSinceCreated >= 7 && lead.email_sequence_step === 2) {
          shouldSend = true
          templateKey = "urgency"
        } else if (daysSinceCreated >= 10 && lead.email_sequence_step === 3) {
          shouldSend = true
          templateKey = "finalContact"
        }

        if (shouldSend && templateKey) {
          // Get template and send email
          const template = EmailTemplate[templateKey]
          const htmlContent = template.getHtml({
            name: lead.name,
            projectType: lead.project_type,
            company: lead.company || "",
          })
          await sendEmail(lead.email, template.subject, htmlContent)

          // Update lead
          const newStep = lead.email_sequence_step + 1
          await supabase
            .from("leads")
            .update({
              email_sequence_step: newStep,
              email_sequence_last_sent: new Date().toISOString(),
              email_sequence_active: newStep < 4, // Stop after step 4
            })
            .eq("id", lead.id)

          emailsSent++
          results.push({
            leadId: lead.id,
            email: lead.email,
            step: newStep,
            template: templateKey,
          })
        }
      } catch (err: any) {
        console.error(`Error processing lead ${lead.id}:`, err)
        results.push({
          leadId: lead.id,
          error: err.message,
        })
      }
    }

    return NextResponse.json({
      success: true,
      emailsSent,
      results,
      processedAt: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Email sequence cron error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { z } from "zod"

const interestSchema = z.object({
  name:           z.string().min(2).max(80),
  email:          z.string().email(),
  phone:          z.string().optional(),
  message:        z.string().max(500).optional(),
  product_source: z.enum(["factu_gp", "resa_gp"]),
})

const PRODUCT_LABELS: Record<string, string> = {
  factu_gp: "FactuGP — Facturation Électronique",
  resa_gp:  "ResaGP — Gestion Restaurant",
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = interestSchema.parse(body)

    const supabase = await createClient()

    // Insert as a lead with product_source tag
    const { data: lead, error } = await supabase.from("leads").insert({
      name:           data.name,
      email:          data.email,
      phone:          data.phone ?? null,
      description:    data.message ?? `Inscription via ${PRODUCT_LABELS[data.product_source]}`,
      product_source: data.product_source,
      source:         "landing-page",
      status:         "nouveau",
      urgency:        "normal",
      activity_type:  "digital",
      project_type:   data.product_source === "factu_gp" ? "factu_gp" : "resa_gp",
      budget:         0,
      score_total:    5,
      score_budget:   0,
      score_clarity:  5,
      score_urgency:  0,
      score_fit:      0,
      score_responsiveness: 0,
      score_source:   5,
      is_launch_offer: false,
      email_sequence_active: false,
    }).select().single()

    if (error) {
      console.error("[/api/interest] Supabase error:", error)
      // Still return success to user (don't expose DB errors)
      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: true, id: lead?.id })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, errors: err.errors }, { status: 400 })
    }
    console.error("[/api/interest] Error:", err)
    return NextResponse.json({ success: false, message: "Erreur serveur" }, { status: 500 })
  }
}

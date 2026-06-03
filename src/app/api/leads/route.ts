import { NextRequest, NextResponse } from "next/server"
import { contactSchema } from "@/lib/validations/contact-schema"
import { createClient } from "@/lib/supabase/server"
import { sendWelcomeEmail } from "@/lib/email/brevo"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validation avec Zod
    const validatedData = contactSchema.parse(body)

    // Mode Mock (si Supabase pas configuré)
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      console.log("📝 [MOCK MODE] Lead créé:", validatedData)

      // Simulation délai réseau
      await new Promise((resolve) => setTimeout(resolve, 1000))

      return NextResponse.json({
        success: true,
        message: "Lead créé avec succès (mode mock)",
        lead: {
          id: `mock-${Date.now()}`,
          ...validatedData,
          created_at: new Date().toISOString(),
        },
      })
    }

    // Mode Production avec Supabase
    const supabase = await createClient()

    // Convertir budget en nombre pour le calcul du score
    const budgetMap: Record<string, number> = {
      "<500": 450,
      "500-1000": 750,
      "1000-2000": 1500,
      ">2000": 2500,
    }

    // Calculer scores de base
    const score_budget = validatedData.budget in budgetMap ? 20 : 10
    const score_clarity = validatedData.description.length > 100 ? 15 : validatedData.description.length > 50 ? 10 : 5
    const score_urgency =
      validatedData.urgency === "urgent" ? 20 :
      validatedData.urgency === "high" ? 15 :
      validatedData.urgency === "normal" ? 10 : 5
    const score_fit = ["vitrine", "ecommerce"].includes(validatedData.project_type) ? 15 : 10
    const score_source =
      validatedData.source === "bouche-a-oreille" || validatedData.source === "referral" ? 15 :
      validatedData.source === "linkedin" ? 10 :
      validatedData.source === "site-web" ? 8 : 5

    // Récupérer la position offre lancement
    const { data: offerTracking } = await supabase
      .from("launch_offer_tracking")
      .select("slots_filled")
      .eq("is_active", true)
      .single()

    const launchOfferPosition = offerTracking ? offerTracking.slots_filled + 1 : null
    const isLaunchOffer = launchOfferPosition && launchOfferPosition <= 30

    // Insérer le lead dans Supabase
    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        company: validatedData.company || null,
        project_type: validatedData.project_type,
        budget: budgetMap[validatedData.budget],
        description: validatedData.description,
        urgency: validatedData.urgency,
        status: "nouveau",
        activity_type: "digital",
        source: validatedData.source,
        source_details: "Formulaire contact site web",
        score_budget,
        score_clarity,
        score_urgency,
        score_fit,
        score_responsiveness: 0, // Pas encore de réponse
        score_source,
        is_launch_offer: isLaunchOffer,
        launch_offer_position: launchOfferPosition,
        first_contact_date: null,
        last_contact_date: null,
      })
      .select()
      .single()

    if (error) {
      console.error("❌ Erreur Supabase:", error)
      throw new Error("Erreur lors de la création du lead")
    }

    // Envoyer email de bienvenue au lead
    const emailResult = await sendWelcomeEmail(
      lead.email,
      lead.name,
      lead.project_type
    )

    if (emailResult.error) {
      console.warn("⚠️ Email non envoyé (mode dégradé):", emailResult.error)
    }

    console.log("✅ Lead créé avec succès:", lead.id)

    return NextResponse.json({
      success: true,
      message: "Demande envoyée avec succès !",
      lead: {
        id: lead.id,
        name: lead.name,
        email: lead.email,
      },
    })
  } catch (error) {
    console.error("❌ Erreur API /api/leads:", error)

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Une erreur est survenue" },
      { status: 500 }
    )
  }
}

// GET endpoint pour lister les leads
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Vérifier authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    const { data: leads, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(20)

    if (error) throw error

    return NextResponse.json({ leads })
  } catch (error) {
    console.error("❌ Erreur GET /api/leads:", error)
    return NextResponse.json(
      { error: "Erreur lors de la récupération des leads" },
      { status: 500 }
    )
  }
}

// PATCH endpoint pour mettre à jour un lead
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    if (!id) {
      return NextResponse.json(
        { error: "ID du lead requis" },
        { status: 400 }
      )
    }

    // Mode Mock
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") {
      console.log("📝 [MOCK MODE] Lead mis à jour:", id, updates)
      return NextResponse.json({
        success: true,
        message: "Lead mis à jour (mode mock)",
        lead: { id, ...updates, updated_at: new Date().toISOString() },
      })
    }

    const supabase = await createClient()

    // Vérifier authentification
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    // Mettre à jour le lead
    const { data: lead, error } = await supabase
      .from("leads")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("❌ Erreur Supabase:", error)
      throw new Error("Erreur lors de la mise à jour du lead")
    }

    console.log("✅ Lead mis à jour:", lead.id)

    return NextResponse.json({
      success: true,
      message: "Lead mis à jour avec succès",
      lead,
    })
  } catch (error) {
    console.error("❌ Erreur PATCH /api/leads:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Une erreur est survenue" },
      { status: 500 }
    )
  }
}

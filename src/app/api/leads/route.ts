import { NextRequest, NextResponse } from "next/server"
import { createClient as createServiceClient } from "@supabase/supabase-js"
import { z } from "zod"
import { contactSchema } from "@/lib/validations/contact-schema"
import { createClient } from "@/lib/supabase/server"
import { sendWelcomeEmail, sendAdminNotification } from "@/lib/email/brevo"

/**
 * Lit les poids de scoring configurés dans l'admin (table `settings`,
 * clé `crm_admin_settings`). `settings` est protégée par RLS (authenticated),
 * donc on lit avec la clé service-role côté serveur. Fallback : poids par défaut.
 */
const DEFAULT_WEIGHTS = { budget: 20, clarity: 15, urgency: 20, fit: 15, responsiveness: 15, source: 15 }
async function getScoringWeights() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) return DEFAULT_WEIGHTS
  try {
    const admin = createServiceClient(url, serviceKey)
    const { data } = await admin.from("settings").select("value").eq("key", "crm_admin_settings").single()
    const v = data?.value as Record<string, number> | undefined
    if (!v) return DEFAULT_WEIGHTS
    return {
      budget: v.score_budget ?? DEFAULT_WEIGHTS.budget,
      clarity: v.score_clarity ?? DEFAULT_WEIGHTS.clarity,
      urgency: v.score_urgency ?? DEFAULT_WEIGHTS.urgency,
      fit: v.score_fit ?? DEFAULT_WEIGHTS.fit,
      responsiveness: v.score_responsiveness ?? DEFAULT_WEIGHTS.responsiveness,
      source: v.score_source ?? DEFAULT_WEIGHTS.source,
    }
  } catch {
    return DEFAULT_WEIGHTS
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Honeypot anti-spam : champ-piège invisible (`company_website`).
    // S'il est rempli, c'est un bot → on simule un succès sans rien enregistrer.
    if (typeof body.company_website === "string" && body.company_website.trim() !== "") {
      console.warn("🍯 Honeypot déclenché sur /api/leads — soumission ignorée")
      return NextResponse.json({ success: true, message: "Demande envoyée avec succès !" })
    }

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

    // Mode Production avec Supabase.
    // Le formulaire est PUBLIC mais traité côté serveur : on écrit avec la clé
    // service-role (contourne RLS proprement et autorise le .select() de retour).
    // Fallback sur le client SSR si la clé service-role n'est pas configurée.
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabase = url && serviceKey
      ? createServiceClient(url, serviceKey)
      : await createClient()

    // Convertir budget en nombre pour le calcul du score
    const budgetMap: Record<string, number> = {
      "<500": 450,
      "500-1000": 750,
      "1000-2000": 1500,
      ">2000": 2500,
    }

    // Poids de scoring configurables (admin → table settings, via service-role)
    const W = await getScoringWeights()

    // Budget optionnel : null si non fourni (formulaire court de la home)
    const budgetValue = validatedData.budget ? budgetMap[validatedData.budget] : null

    // Qualité de chaque critère (fraction 0–1), puis pondérée par le poids configuré
    const fBudget = validatedData.budget && validatedData.budget in budgetMap ? 1 : 0.5
    const descLen = validatedData.description.length
    const fClarity = descLen > 100 ? 1 : descLen > 50 ? 0.66 : 0.33
    const fUrgency =
      validatedData.urgency === "urgent" ? 1 :
      validatedData.urgency === "high" ? 0.75 :
      validatedData.urgency === "normal" ? 0.5 : 0.25
    const fFit = ["vitrine", "ecommerce"].includes(validatedData.project_type) ? 1 : 0.66
    const fSource =
      validatedData.source === "bouche-a-oreille" || validatedData.source === "referral" ? 1 :
      validatedData.source === "linkedin" ? 0.66 :
      validatedData.source === "site-web" ? 0.53 : 0.33

    const score_budget = Math.round(fBudget * W.budget)
    const score_clarity = Math.round(fClarity * W.clarity)
    const score_urgency = Math.round(fUrgency * W.urgency)
    const score_fit = Math.round(fFit * W.fit)
    const score_responsiveness = 0 // Pas encore de réponse au moment de la création
    const score_source = Math.round(fSource * W.source)
    const score_total = score_budget + score_clarity + score_urgency + score_fit + score_responsiveness + score_source

    // Récupérer la position offre lancement
    const { data: offerTracking } = await supabase
      .from("launch_offer_tracking")
      .select("slots_filled")
      .eq("is_active", true)
      .single()

    const launchOfferPosition = offerTracking ? offerTracking.slots_filled + 1 : null
    const isLaunchOffer = launchOfferPosition && launchOfferPosition <= 30

    // Segmentation produit : explicite, sinon déduite de la source
    const src = (validatedData.source || "").toLowerCase()
    const product_source =
      validatedData.product_source ??
      (src.includes("resa") ? "resa_gp" : src.includes("factu") ? "factu_gp" : "solyb_agency")

    // Insérer le lead dans Supabase
    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        company: validatedData.company || null,
        project_type: validatedData.project_type,
        budget: budgetValue,
        description: validatedData.description,
        urgency: validatedData.urgency,
        status: "nouveau",
        activity_type: "digital",
        source: validatedData.source,
        source_details: "Formulaire contact site web",
        product_source,
        score_total,
        score_budget,
        score_clarity,
        score_urgency,
        score_fit,
        score_responsiveness,
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

    // Notifier l'admin du nouveau lead (non bloquant)
    const adminResult = await sendAdminNotification({
      name: lead.name,
      email: lead.email,
      phone: lead.phone || undefined,
      company: lead.company || undefined,
      project_type: lead.project_type,
      budget: validatedData.budget || "Non précisé",
      description: lead.description,
      urgency: lead.urgency,
    })

    if (adminResult.error) {
      console.warn("⚠️ Notification admin non envoyée:", adminResult.error)
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

    // Erreurs de validation → message clair pour le visiteur
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message || "Données du formulaire invalides" },
        { status: 400 }
      )
    }

    // Toute autre erreur (DB, etc.) → message générique, pas de détail technique
    return NextResponse.json(
      { error: "Une erreur est survenue. Merci de réessayer." },
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

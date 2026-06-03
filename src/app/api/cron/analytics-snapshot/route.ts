import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// Vercel Cron Job - Create daily analytics snapshot
export async function GET(request: NextRequest) {
  try {
    // Verify cron secret for security
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createClient()
    const today = new Date().toISOString().split("T")[0]

    // Check if snapshot already exists for today
    const { data: existing } = await supabase
      .from("analytics_snapshots")
      .select("*")
      .eq("snapshot_date", today)
      .single()

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Snapshot already exists for today",
        snapshot_date: today,
      })
    }

    // Get all leads
    const { data: allLeads } = await supabase.from("leads").select("*")

    if (!allLeads) {
      throw new Error("Failed to fetch leads")
    }

    // Calculate metrics
    const totalLeads = allLeads.length
    const leadsNouveau = allLeads.filter((l) => l.status === "nouveau").length
    const leadsContact = allLeads.filter((l) => l.status === "contact").length
    const leadsDevis = allLeads.filter((l) => l.status === "devis").length
    const leadsGagne = allLeads.filter((l) => l.status === "gagne").length
    const leadsPerdu = allLeads.filter((l) => l.status === "perdu").length

    // Conversion rates
    const rateContact = totalLeads > 0 ? ((totalLeads - leadsNouveau) / totalLeads) * 100 : 0
    const rateDevis =
      totalLeads - leadsNouveau > 0
        ? ((leadsDevis + leadsGagne + leadsPerdu) / (totalLeads - leadsNouveau)) * 100
        : 0
    const rateGagne =
      leadsDevis + leadsGagne + leadsPerdu > 0
        ? (leadsGagne / (leadsDevis + leadsGagne + leadsPerdu)) * 100
        : 0
    const rateGlobal = totalLeads > 0 ? (leadsGagne / totalLeads) * 100 : 0

    // Revenue
    const revenueMonth = allLeads
      .filter((l) => l.status === "gagne" && new Date(l.updated_at).getMonth() === new Date().getMonth())
      .reduce((sum, l) => sum + (l.budget || 0), 0)

    const revenueProjected = allLeads
      .filter((l) => ["nouveau", "contact", "devis"].includes(l.status))
      .reduce((sum, l) => sum + (l.budget || 0), 0)

    // By activity type
    const digitalLeads = allLeads.filter((l) => l.activity_type === "digital").length
    const digitalRevenue = allLeads
      .filter((l) => l.activity_type === "digital" && l.status === "gagne")
      .reduce((sum, l) => sum + (l.budget || 0), 0)

    const animationLeads = allLeads.filter((l) => l.activity_type === "animation").length
    const animationRevenue = allLeads
      .filter((l) => l.activity_type === "animation" && l.status === "gagne")
      .reduce((sum, l) => sum + (l.budget || 0), 0)

    const distributionLeads = allLeads.filter((l) => l.activity_type === "distribution").length
    const distributionRevenue = allLeads
      .filter((l) => l.activity_type === "distribution" && l.status === "gagne")
      .reduce((sum, l) => sum + (l.budget || 0), 0)

    // Insert snapshot
    const { data: snapshot, error } = await supabase
      .from("analytics_snapshots")
      .insert({
        snapshot_date: today,
        total_leads: totalLeads,
        leads_nouveau: leadsNouveau,
        leads_contact: leadsContact,
        leads_devis: leadsDevis,
        leads_gagne: leadsGagne,
        leads_perdu: leadsPerdu,
        conversion_rate_contact: rateContact,
        conversion_rate_devis: rateDevis,
        conversion_rate_gagne: rateGagne,
        conversion_rate_global: rateGlobal,
        revenue_month: revenueMonth,
        revenue_projected: revenueProjected,
        digital_leads: digitalLeads,
        digital_revenue: digitalRevenue,
        animation_leads: animationLeads,
        animation_revenue: animationRevenue,
        distribution_leads: distributionLeads,
        distribution_revenue: distributionRevenue,
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      snapshot,
      processedAt: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Analytics snapshot cron error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

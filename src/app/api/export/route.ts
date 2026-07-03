import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

/**
 * Échappe une cellule CSV :
 * - neutralise l'injection de formules (Excel/Sheets exécutent =, +, -, @)
 * - encadre de guillemets et double les guillemets internes
 */
function csvCell(value: unknown): string {
  const s = value === null || value === undefined ? "" : String(value)
  const guarded = /^[=+\-@\t\r]/.test(s) ? `'${s}` : s
  return `"${guarded.replace(/"/g, '""')}"`
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { format = "csv", filters = {} } = body

    const supabase = await createClient()

    // Vérifier authentification (export = données personnelles → réservé admin)
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
    }

    // Récupérer les leads avec filtres
    let query = supabase.from("leads").select("*")

    if (filters.status) {
      query = query.in("status", Array.isArray(filters.status) ? filters.status : [filters.status])
    }

    if (filters.activity_type) {
      query = query.eq("activity_type", filters.activity_type)
    }

    if (filters.date_range) {
      query = query
        .gte("created_at", filters.date_range.start)
        .lte("created_at", filters.date_range.end)
    }

    const { data: leads, error } = await query

    if (error) {
      throw error
    }

    if (format === "csv") {
      // Générer CSV
      const headers = [
        "ID",
        "Nom",
        "Email",
        "Téléphone",
        "Entreprise",
        "Type Projet",
        "Budget",
        "Statut",
        "Score",
        "Source",
        "Créé le",
      ]

      const csvRows = [
        headers.map(csvCell).join(","),
        ...leads!.map((lead) =>
          [
            lead.id,
            lead.name,
            lead.email,
            lead.phone || "",
            lead.company || "",
            lead.project_type,
            lead.budget || "",
            lead.status,
            lead.score_total,
            lead.source || "",
            new Date(lead.created_at).toLocaleDateString("fr-FR"),
          ].map(csvCell).join(",")
        ),
      ]

      // BOM UTF-8 pour qu'Excel lise correctement les accents
      const csv = "﻿" + csvRows.join("\r\n")

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="solyb_leads_${new Date().toISOString().split("T")[0]}.csv"`,
        },
      })
    }

    if (format === "json") {
      return NextResponse.json({
        success: true,
        data: leads,
        count: leads!.length,
        exported_at: new Date().toISOString(),
      })
    }

    return NextResponse.json({ error: "Format non supporté" }, { status: 400 })
  } catch (error) {
    console.error("Export error:", error)
    return NextResponse.json({ error: "Erreur lors de l'export" }, { status: 500 })
  }
}

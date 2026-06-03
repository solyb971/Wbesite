"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"

const services = [
  {
    num: "01",
    title: "Site Vitrine",
    description: "Votre présence en ligne professionnelle, pensée pour votre clientèle locale. Rapide, accessible sur mobile, optimisé pour Google.",
    contactParam: "vitrine",
  },
  {
    num: "02",
    title: "E-commerce",
    description: "Boutique en ligne complète avec gestion des commandes, paiement sécurisé et tableau de bord simple à prendre en main.",
    contactParam: "ecommerce",
  },
  {
    num: "03",
    title: "Application Métier",
    description: "Outil sur mesure adapté à votre activité. Gestion, réservations, suivi client — ce dont vous avez besoin, rien de plus.",
    contactParam: "application",
    featured: true,
  },
]

export default function Services() {
  return (
    <>
      {/* ── Services section (light) ── */}
      <section
        id="services"
        className="py-20 md:py-28 scroll-mt-20"
        style={{ background: "#F5F2EC" }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Header */}
          <div className="reveal flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <p className="text-xs tracking-[3px] uppercase mb-3" style={{ color: "#FF6B47" }}>
                Services
              </p>
              <h2 className="font-display text-3xl md:text-[2.6rem] font-normal leading-tight text-[#1C1B18]">
                Ce que nous<br />
                <em className="italic" style={{ color: "#FF6B47" }}>construisons</em> pour vous
              </h2>
            </div>
            <p className="text-sm font-light leading-relaxed max-w-xs" style={{ color: "#5A5750" }}>
              Des solutions pensées pour votre réalité locale — pas des templates. Chaque projet conçu de A à Z pour votre activité.
            </p>
          </div>

          {/* Cards grid */}
          <div className="reveal grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((s) => (
              <div
                key={s.num}
                className="group rounded-2xl p-8 border transition-all duration-250 hover:-translate-y-1 flex flex-col"
                style={{
                  background: s.featured ? "#1C1B18" : "white",
                  borderColor: s.featured ? "#2E2D29" : "#E2DED6",
                  boxShadow: "none",
                }}
              >
                {/* Number */}
                <div
                  className="font-display text-5xl font-normal leading-none mb-5 transition-colors duration-200 group-hover:text-coral"
                  style={{ color: s.featured ? "#2E2D29" : "#E2DED6" }}
                >
                  {s.num}
                </div>

                <h3
                  className="font-display text-xl font-normal mb-3"
                  style={{ color: s.featured ? "#F0EDE8" : "#1C1B18" }}
                >
                  {s.title}
                </h3>

                <p
                  className="text-sm font-light leading-relaxed flex-1 mb-6"
                  style={{ color: s.featured ? "#7A7870" : "#5A5750" }}
                >
                  {s.description}
                </p>

                <div
                  className="flex items-center justify-between pt-5"
                  style={{ borderTop: `0.5px solid ${s.featured ? "#2E2D29" : "#E2DED6"}` }}
                >
                  <Link
                    href={`/?service=${s.contactParam}#contact`}
                    className="flex items-center gap-1.5 text-sm font-light transition-colors hover:text-coral"
                    style={{ color: s.featured ? "#9E9A92" : "#5A5750" }}
                  >
                    Demander un devis
                    <ArrowRight className="w-4 h-4 text-coral" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Facturation banner (compact) ── */}
      <div
        className="border-y"
        style={{
          background: "#14130F",
          borderColor: "#2E2D29",
          padding: "2rem 0",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase rounded-full px-3 py-1 mb-2"
              style={{
                background: "rgba(184,118,10,0.12)",
                border: "0.5px solid rgba(184,118,10,0.3)",
                color: "#F5C060",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: "#F5C060", animation: "pulse 2s infinite" }}
              />
              Réforme en cours · Obligation 2026
            </div>
            <p className="font-display text-lg font-normal text-[#F0EDE8]">
              Facturation électronique — Êtes-vous conforme ?
            </p>
            <p className="text-sm font-light mt-0.5" style={{ color: "#7A7870" }}>
              Mise en conformité DGFiP rapide, adaptée aux entreprises guadeloupéennes.
            </p>
          </div>
          <Link
            href="/?service=facturation#contact"
            className="whitespace-nowrap text-sm font-medium px-5 py-2.5 rounded-lg transition-opacity hover:opacity-80 flex-shrink-0"
            style={{ background: "#B8760A", color: "white" }}
          >
            Vérifier ma conformité
          </Link>
        </div>
      </div>
    </>
  )
}

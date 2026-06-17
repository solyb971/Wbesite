"use client"

import { useState, useEffect } from "react"

export interface Template {
  id: string
  name: string
  category: string
  subject: string
  body: string
  uses: number
}

interface TemplateListProps {
  searchQuery: string
  onSelectTemplate: (id: string) => void
}

const defaultTemplates: Template[] = [
  { id: "1", name: "Devis site vitrine 599€",         category: "Devis",         uses: 12, subject: "Votre devis site vitrine - {{company}}",          body: "Bonjour {{prenom}},\n\nSuite à votre demande, voici votre devis pour un site vitrine professionnel :\n\n- Site vitrine responsive : 599€\n- Livraison en 2 semaines\n- Hébergement 1 an inclus\n\nCordialement,\nYacine Bouhassoun\nSolYB" },
  { id: "2", name: "Devis e-commerce 999€",           category: "Devis",         uses: 5,  subject: "Votre devis e-commerce - {{company}}",             body: "Bonjour {{prenom}},\n\nSuite à votre demande, voici votre devis pour une boutique e-commerce :\n\n- Boutique e-commerce complète : 999€\n- Livraison en 3 semaines\n- Formation incluse\n\nCordialement,\nYacine Bouhassoun\nSolYB" },
  { id: "3", name: "Expliquer processus/délais",      category: "Info",          uses: 8,  subject: "Processus de création de votre site web",          body: "Bonjour {{prenom}},\n\nVoici comment se déroule la création de votre site :\n\n1. Briefing (J+0)\n2. Design (J+3)\n3. Développement (J+7)\n4. Livraison (J+14)\n\nCordialement,\nYacine Bouhassoun\nSolYB" },
  { id: "4", name: "Demander infos complémentaires",  category: "Qualification", uses: 15, subject: "Quelques questions pour mieux vous accompagner",    body: "Bonjour {{prenom}},\n\nPour vous proposer la solution la plus adaptée, pourriez-vous me préciser :\n\n- Avez-vous déjà un nom de domaine ?\n- Des exemples de sites qui vous plaisent ?\n- Votre délai idéal ?\n\nCordialement,\nYacine Bouhassoun\nSolYB" },
  { id: "5", name: "Relance après devis",             category: "Relance",       uses: 7,  subject: "Avez-vous eu le temps d'étudier notre proposition ?", body: "Bonjour {{prenom}},\n\nJe me permets de revenir vers vous concernant le devis envoyé.\n\nAvez-vous des questions ?\n\nCordialement,\nYacine Bouhassoun\nSolYB" },
  { id: "6", name: "Email de remerciement",           category: "Relation",      uses: 20, subject: "Merci pour votre confiance !",                      body: "Bonjour {{prenom}},\n\nJe tenais à vous remercier pour votre confiance.\n\nVotre projet de {{type_projet}} est entre de bonnes mains.\n\nCordialement,\nYacine Bouhassoun\nSolYB" },
]

const STORAGE_KEY = "solyb_email_templates"

const CATEGORY_COLORS: Record<string, string> = {
  Devis:         "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Info:          "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  Qualification: "bg-purple-500/15 text-purple-400 border-purple-500/20",
  Relance:       "bg-orange-500/15 text-orange-400 border-orange-500/20",
  Relation:      "bg-pink-500/15 text-pink-400 border-pink-500/20",
}

export default function TemplateList({ searchQuery, onSelectTemplate }: TemplateListProps) {
  const [templates, setTemplates] = useState<Template[]>(defaultTemplates)
  const [preview, setPreview] = useState<Template | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try { setTemplates(JSON.parse(saved)) } catch {}
    }
  }, [])

  const saveTemplates = (t: Template[]) => {
    setTemplates(t)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(t))
  }

  const handleUse = (template: Template, e: React.MouseEvent) => {
    e.stopPropagation()
    saveTemplates(templates.map(t => t.id === template.id ? { ...t, uses: t.uses + 1 } : t))
    navigator.clipboard.writeText(`Objet: ${template.subject}\n\n${template.body}`)
    alert("Template copié dans le presse-papier !")
  }

  const filtered = templates.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
  const catColor = (cat: string) => CATEGORY_COLORS[cat] ?? "bg-white/[0.05] text-[#9A8C78] border-white/[0.08]"

  return (
    <>
      <div className="space-y-2">
        {filtered.map((t) => (
          <div
            key={t.id}
            className="flex items-start justify-between gap-3 p-4 bg-[#15110B] border border-white/[0.06] rounded-xl hover:border-white/[0.12] transition-all cursor-pointer"
            onClick={() => onSelectTemplate(t.id)}
          >
            <div className="min-w-0 flex-1">
              <div className="text-[#E8DDC8] font-medium text-sm truncate">{t.name}</div>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className={`inline-flex px-2 py-0.5 rounded-md text-[10px] font-semibold border ${catColor(t.category)}`}>
                  {t.category}
                </span>
                <span className="text-[#6B5F4E] text-xs">Utilisé {t.uses} fois</span>
              </div>
            </div>
            <div className="flex gap-1.5 shrink-0">
              <button
                onClick={(e) => { e.stopPropagation(); setPreview(t) }}
                className="px-2.5 py-1.5 rounded-lg border border-white/[0.07] text-[#A89880] hover:text-[#F5EDD8] hover:bg-white/[0.05] transition-all text-xs font-medium"
              >
                Voir
              </button>
              <button
                onClick={(e) => handleUse(t, e)}
                className="px-2.5 py-1.5 rounded-lg bg-coral/10 border border-coral/20 text-coral hover:bg-coral/20 transition-all text-xs font-medium"
              >
                Copier
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Preview modal */}
      {preview && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setPreview(null)}>
          <div className="bg-[#1F1813] border border-white/[0.08] rounded-2xl w-full max-w-xl shadow-2xl max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between px-5 py-4 border-b border-white/[0.05]">
              <div>
                <h3 className="text-[#F5EDD8] font-semibold text-sm">{preview.name}</h3>
                <span className={`inline-flex mt-1 px-2 py-0.5 rounded-md text-[10px] font-semibold border ${catColor(preview.category)}`}>{preview.category}</span>
              </div>
              <button onClick={() => setPreview(null)} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-[#7E715E] hover:text-white transition-colors text-lg leading-none">×</button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <div className="text-[10px] font-semibold text-[#6B5F4E] uppercase tracking-widest mb-1.5">Objet</div>
                <div className="text-[#E8DDC8] text-sm bg-[#15110B] border border-white/[0.05] rounded-xl px-3 py-2">{preview.subject}</div>
              </div>
              <div>
                <div className="text-[10px] font-semibold text-[#6B5F4E] uppercase tracking-widest mb-1.5">Corps</div>
                <div className="text-[#E8DDC8] text-sm bg-[#15110B] border border-white/[0.05] rounded-xl px-3 py-3 whitespace-pre-wrap leading-relaxed">{preview.body}</div>
              </div>
              <button
                onClick={(e) => { handleUse(preview, e); setPreview(null) }}
                className="w-full py-2.5 rounded-xl bg-coral hover:bg-coral/90 text-white font-semibold text-sm transition-all"
              >
                Copier dans le presse-papier
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

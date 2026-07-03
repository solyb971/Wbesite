"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Plus, Search, Mail, Zap, TrendingUp, MousePointerClick, X } from "lucide-react"

const TemplateList = dynamic(() => import("@/components/admin/Templates/TemplateList"), { ssr: false, loading: () => <div className="text-[#7E715E] text-sm p-4">Chargement...</div> })
const TemplateEditor = dynamic(() => import("@/components/admin/Templates/TemplateEditor"), { ssr: false })

const SEQUENCES = [
  { step: 1, name: "Email de bienvenue",  delay: "J+0",  openRate: 75, clickRate: 40 },
  { step: 2, name: "Cas client similaire", delay: "J+3",  openRate: 60, clickRate: 25 },
  { step: 3, name: "Urgence douce",        delay: "J+7",  openRate: 45, clickRate: 15 },
  { step: 4, name: "Dernier contact",      delay: "J+10", openRate: 30, clickRate: 10 },
] as const

type Sequence = typeof SEQUENCES[number]

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery]       = useState("")
  const [showEditor, setShowEditor]         = useState(false)
  const [editingSequence, setEditingSequence] = useState<Sequence | null>(null)
  const [statsSequence, setStatsSequence]   = useState<Sequence | null>(null)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F5EDD8]">Templates d&apos;emails</h1>
          <p className="text-[#7E715E] text-sm mt-0.5">Gérez vos modèles d&apos;emails et séquences automatiques</p>
        </div>
        <button
          onClick={() => setShowEditor(true)}
          className="flex items-center gap-2 bg-coral hover:bg-coral/90 text-white px-4 py-2.5 rounded-xl font-semibold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-coral/20"
        >
          <Plus className="w-4 h-4" />
          Nouveau template
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B5F4E] w-4 h-4" />
        <input
          type="text"
          placeholder="Rechercher un template..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 bg-[#1F1813] border border-white/[0.07] rounded-xl text-[#E8DDC8] placeholder-[#574C3D] text-sm focus:outline-none focus:border-coral/40 transition-all"
        />
      </div>

      {/* Séquences automatiques */}
      <div className="bg-[#1F1813] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.05]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-solar/10 rounded-lg flex items-center justify-center border border-white/[0.05]">
              <Zap className="w-4 h-4 text-solar" />
            </div>
            <div>
              <h2 className="text-[#F5EDD8] font-semibold text-sm">Séquences Automatiques</h2>
              <p className="text-[#6B5F4E] text-xs">Emails envoyés automatiquement selon le parcours du lead</p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {SEQUENCES.map((seq) => (
            <div key={seq.step} className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 bg-coral/10 border border-coral/20 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-coral font-bold text-sm">{seq.step}</span>
                </div>
                <div>
                  <div className="text-[#E8DDC8] font-medium text-sm">{seq.name}</div>
                  <div className="text-[#6B5F4E] text-xs mt-0.5">{seq.delay}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center hidden md:block">
                  <div className="text-base font-bold text-coral">{seq.openRate}%</div>
                  <div className="text-[10px] text-[#6B5F4E] uppercase tracking-wide">Ouverture</div>
                </div>
                <div className="text-center hidden md:block">
                  <div className="text-base font-bold text-emerald-400">{seq.clickRate}%</div>
                  <div className="text-[10px] text-[#6B5F4E] uppercase tracking-wide">Clic</div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingSequence(seq)}
                    className="px-3 py-1.5 rounded-lg border border-white/[0.08] text-[#A89880] hover:text-[#F5EDD8] hover:bg-white/[0.06] transition-all text-xs font-medium"
                  >
                    Éditer
                  </button>
                  <button
                    onClick={() => setStatsSequence(seq)}
                    className="px-3 py-1.5 rounded-lg border border-white/[0.08] text-[#A89880] hover:text-[#F5EDD8] hover:bg-white/[0.06] transition-all text-xs font-medium"
                  >
                    Stats
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Réponses rapides */}
      <div className="bg-[#1F1813] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.05]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center border border-white/[0.05]">
              <Mail className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h2 className="text-[#F5EDD8] font-semibold text-sm">Réponses Rapides</h2>
              <p className="text-[#6B5F4E] text-xs">Templates pour répondre rapidement aux demandes</p>
            </div>
          </div>
        </div>
        <div className="p-5">
          <TemplateList searchQuery={searchQuery} onSelectTemplate={(_id: string) => {}} />
        </div>
      </div>

      {/* Modal stats */}
      {statsSequence && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setStatsSequence(null)}>
          <div className="bg-[#1F1813] border border-white/[0.08] rounded-2xl w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.05]">
              <div>
                <h3 className="text-[#F5EDD8] font-semibold">Stats — {statsSequence.name}</h3>
                <p className="text-[#6B5F4E] text-xs mt-0.5">Envoi : {statsSequence.delay}</p>
              </div>
              <button onClick={() => setStatsSequence(null)} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-[#7E715E] hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-4">
              <div className="bg-[#15110B] border border-white/[0.05] rounded-xl p-4 text-center">
                <TrendingUp className="w-5 h-5 text-coral mx-auto mb-2" />
                <div className="text-3xl font-bold text-coral">{statsSequence.openRate}%</div>
                <div className="text-[#7E715E] text-xs mt-1">Taux d'ouverture</div>
              </div>
              <div className="bg-[#15110B] border border-white/[0.05] rounded-xl p-4 text-center">
                <MousePointerClick className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-emerald-400">{statsSequence.clickRate}%</div>
                <div className="text-[#7E715E] text-xs mt-1">Taux de clic</div>
              </div>
            </div>
            <div className="px-5 pb-5">
              <div className="bg-[#15110B] border border-white/[0.05] rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[#7E715E] text-sm">Performance</span>
                  <span className={`text-sm font-semibold ${statsSequence.openRate >= 60 ? "text-emerald-400" : statsSequence.openRate >= 40 ? "text-solar" : "text-red-400"}`}>
                    {statsSequence.openRate >= 60 ? "Excellente" : statsSequence.openRate >= 40 ? "Bonne" : "À améliorer"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editor séquence */}
      {editingSequence && (
        <TemplateEditor
          isOpen={true}
          onClose={() => setEditingSequence(null)}
          template={{ id: `seq-${editingSequence.step}`, name: editingSequence.name, category: "sequence", subject: `[${editingSequence.delay}] ${editingSequence.name}`, body: "" }}
        />
      )}

      {/* Nouveau template */}
      {showEditor && (
        <TemplateEditor isOpen={true} onClose={() => setShowEditor(false)} template={null} />
      )}
    </div>
  )
}

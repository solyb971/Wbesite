"use client"

import { useState, useEffect } from "react"
import { Save, RotateCcw, Check } from "lucide-react"

const defaultSettings = {
  company_name: "SolYB - Solutions by Yacine Bouhassoun",
  email: "contact@solyb.fr",
  phone: "+590 690 71 17 69",
  website: "https://solyb.fr",
  address: "Guadeloupe, Antilles Françaises",
  score_budget: 20, score_clarity: 15, score_urgency: 20,
  score_fit: 15, score_responsiveness: 15, score_source: 15,
  launch_vitrine: 599, launch_ecommerce: 999, launch_content: 150, launch_maintenance: 29,
  normal_vitrine: 899, normal_ecommerce: 1499, normal_content: 200, normal_maintenance: 29,
  hourly_rate: 60,
  weekly_hours: 20, alert_threshold: 90,
  weekday_start: "18:00", weekday_end: "21:00",
  saturday_am_start: "06:00", saturday_am_end: "11:00",
  saturday_pm_start: "14:00", saturday_pm_end: "18:00",
  sunday_start: "10:00", sunday_end: "16:00",
  email_delay_1: 0, email_delay_2: 3, email_delay_3: 7, email_delay_4: 10,
  brevo_api_key: "",
  stop_on_reply: true, stop_on_status_change: true, send_copy: false,
}

const STORAGE_KEY = "solyb_crm_settings"

const inp = "w-full px-3 py-2.5 bg-[#0A0F1E] border border-white/[0.08] rounded-xl text-[#C8D4E8] text-sm focus:outline-none focus:border-coral/40 transition-all placeholder-[#2E3A55]"
const lbl = "block text-xs font-semibold text-[#6B7A99] mb-1.5"
const section = "bg-[#0F1628] border border-white/[0.06] rounded-2xl overflow-hidden"
const secHead = "px-5 py-4 border-b border-white/[0.05]"
const secBody = "p-5 space-y-4"

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${checked ? "bg-coral" : "bg-white/[0.1]"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  )
}

export default function SettingsPage() {
  const [settings, setSettings] = useState(defaultSettings)
  const [tab, setTab] = useState("general")
  const [isSaved, setIsSaved] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try { setSettings({ ...defaultSettings, ...JSON.parse(saved) }) } catch {}
    }
    setIsLoaded(true)
  }, [])

  const set = (k: string, v: any) => setSettings(prev => ({ ...prev, [k]: v }))

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...settings, brevo_api_key: "" }))
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  const handleReset = () => {
    if (confirm("Réinitialiser tous les paramètres aux valeurs par défaut ?")) {
      setSettings(defaultSettings)
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  const TABS = [
    { id: "general", label: "Général" },
    { id: "scoring", label: "Scoring" },
    { id: "pricing", label: "Tarifs" },
    { id: "planning", label: "Planning" },
    { id: "email", label: "Email" },
  ]

  const scoreTotal = settings.score_budget + settings.score_clarity + settings.score_urgency +
    settings.score_fit + settings.score_responsiveness + settings.score_source

  if (!isLoaded) return (
    <div className="flex items-center justify-center h-40">
      <div className="w-6 h-6 border-2 border-coral/30 border-t-coral rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#E2E8F8]">Paramètres</h1>
          <p className="text-[#4B5870] text-sm mt-0.5">Configurez votre système CRM</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-white/[0.08] text-[#8090AA] hover:text-[#E2E8F8] hover:bg-white/[0.05] transition-all text-xs sm:text-sm font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Réinitialiser</span>
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all shrink-0 ${
              isSaved ? "bg-emerald-500 text-white" : "bg-coral hover:bg-coral/90 text-white shadow-lg shadow-coral/20"
            }`}
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isSaved ? "Sauvegardé !" : "Sauvegarder"}</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 p-1 bg-[#0A0F1E] border border-white/[0.05] rounded-xl overflow-x-auto scrollbar-none">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
              tab === t.id
                ? "bg-coral/10 text-coral ring-1 ring-coral/20"
                : "text-[#4B5870] hover:text-[#8090AA] hover:bg-white/[0.03]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* GÉNÉRAL */}
      {tab === "general" && (
        <div className={section}>
          <div className={secHead}>
            <h2 className="text-[#E2E8F8] font-semibold text-sm">Informations Entreprise</h2>
            <p className="text-[#3A4560] text-xs mt-0.5">Coordonnées et informations publiques</p>
          </div>
          <div className={secBody}>
            <div>
              <label className={lbl}>Nom de l&apos;entreprise</label>
              <input className={inp} value={settings.company_name} onChange={e => set("company_name", e.target.value)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Email</label>
                <input className={inp} type="email" value={settings.email} onChange={e => set("email", e.target.value)} />
              </div>
              <div>
                <label className={lbl}>Téléphone</label>
                <input className={inp} value={settings.phone} onChange={e => set("phone", e.target.value)} />
              </div>
            </div>
            <div>
              <label className={lbl}>Site web</label>
              <input className={inp} type="url" value={settings.website} onChange={e => set("website", e.target.value)} />
            </div>
            <div>
              <label className={lbl}>Adresse</label>
              <input className={inp} value={settings.address} onChange={e => set("address", e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* SCORING */}
      {tab === "scoring" && (
        <div className={section}>
          <div className={secHead}>
            <h2 className="text-[#E2E8F8] font-semibold text-sm">Poids des Critères</h2>
            <p className="text-[#3A4560] text-xs mt-0.5">Ajustez l&apos;importance de chaque critère (total = 100 pts)</p>
          </div>
          <div className="p-5 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {([
                { key: "score_budget", label: "Budget clair" },
                { key: "score_clarity", label: "Besoin précis" },
                { key: "score_urgency", label: "Urgence" },
                { key: "score_fit", label: "Fit avec offre" },
                { key: "score_responsiveness", label: "Réactivité" },
                { key: "score_source", label: "Source fiable" },
              ] as const).map(f => (
                <div key={f.key}>
                  <div className="flex items-center justify-between mb-2">
                    <label className={lbl + " mb-0"}>{f.label}</label>
                    <span className="text-coral text-xs font-bold">{settings[f.key]} pts</span>
                  </div>
                  <input
                    type="range" min="0" max="30"
                    value={settings[f.key]}
                    onChange={e => set(f.key, parseInt(e.target.value))}
                    className="w-full accent-coral"
                  />
                </div>
              ))}
            </div>
            <div className={`p-3 rounded-xl ${scoreTotal === 100 ? "bg-emerald-500/10 border border-emerald-500/20" : "bg-orange-500/10 border border-orange-500/20"}`}>
              <span className={`text-sm font-semibold ${scoreTotal === 100 ? "text-emerald-400" : "text-orange-400"}`}>
                Total : {scoreTotal} / 100 points {scoreTotal !== 100 && "⚠️ doit être égal à 100"}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TARIFS */}
      {tab === "pricing" && (
        <div className="space-y-4">
          {[
            { title: "Offre de Lancement", sub: "Tarifs pour les 30 premiers clients", fields: [
              { key: "launch_vitrine", label: "Site vitrine", suffix: "€" },
              { key: "launch_ecommerce", label: "E-commerce", suffix: "€" },
              { key: "launch_content", label: "Contenu IA", suffix: "€" },
              { key: "launch_maintenance", label: "Maintenance", suffix: "€/mois" },
            ]},
            { title: "Tarifs Normaux", sub: "Après l'offre de lancement", fields: [
              { key: "normal_vitrine", label: "Site vitrine", suffix: "€" },
              { key: "normal_ecommerce", label: "E-commerce", suffix: "€" },
              { key: "normal_content", label: "Contenu IA", suffix: "€" },
              { key: "hourly_rate", label: "Taux horaire cible", suffix: "€/h" },
            ]},
          ].map(card => (
            <div key={card.title} className={section}>
              <div className={secHead}>
                <h2 className="text-[#E2E8F8] font-semibold text-sm">{card.title}</h2>
                <p className="text-[#3A4560] text-xs mt-0.5">{card.sub}</p>
              </div>
              <div className="p-5">
                <div className="grid grid-cols-2 gap-4">
                  {card.fields.map(f => (
                    <div key={f.key}>
                      <label className={lbl}>{f.label}</label>
                      <div className="flex items-center gap-2">
                        <input className={inp} type="number" value={settings[f.key as keyof typeof settings] as number} onChange={e => set(f.key, parseInt(e.target.value))} />
                        <span className="text-[#4B5870] text-xs shrink-0">{f.suffix}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PLANNING */}
      {tab === "planning" && (
        <div className={section}>
          <div className={secHead}>
            <h2 className="text-[#E2E8F8] font-semibold text-sm">Capacité & Horaires</h2>
            <p className="text-[#3A4560] text-xs mt-0.5">Configurez votre disponibilité et vos horaires</p>
          </div>
          <div className={secBody}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={lbl}>Heures / semaine</label>
                <div className="flex items-center gap-2">
                  <input className={inp} type="number" value={settings.weekly_hours} onChange={e => set("weekly_hours", parseInt(e.target.value))} />
                  <span className="text-[#4B5870] text-xs shrink-0">h</span>
                </div>
              </div>
              <div>
                <label className={lbl}>Seuil alerte</label>
                <div className="flex items-center gap-2">
                  <input className={inp} type="number" value={settings.alert_threshold} onChange={e => set("alert_threshold", parseInt(e.target.value))} />
                  <span className="text-[#4B5870] text-xs shrink-0">%</span>
                </div>
              </div>
            </div>
            <div className="border-t border-white/[0.05] pt-4">
              <h3 className="text-[#C8D4E8] font-semibold text-sm mb-4">Horaires de travail</h3>
              <div className="space-y-4">
                {[
                  { label: "Lun–Ven soirées", s: "weekday_start", e: "weekday_end" },
                  { label: "Samedi matin", s: "saturday_am_start", e: "saturday_am_end" },
                  { label: "Samedi après-midi", s: "saturday_pm_start", e: "saturday_pm_end" },
                  { label: "Dimanche", s: "sunday_start", e: "sunday_end" },
                ].map(row => (
                  <div key={row.label}>
                    <label className={lbl}>{row.label}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input className={inp} type="time" value={settings[row.s as keyof typeof settings] as string} onChange={e => set(row.s, e.target.value)} />
                      <input className={inp} type="time" value={settings[row.e as keyof typeof settings] as string} onChange={e => set(row.e, e.target.value)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EMAIL */}
      {tab === "email" && (
        <div className="space-y-4">
          <div className={section}>
            <div className={secHead}>
              <h2 className="text-[#E2E8F8] font-semibold text-sm">Délais des Séquences</h2>
              <p className="text-[#3A4560] text-xs mt-0.5">Délais entre les emails automatiques (en jours)</p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 gap-4">
                {([
                  { key: "email_delay_1", label: "Email 1 — Bienvenue" },
                  { key: "email_delay_2", label: "Email 2 — Cas client" },
                  { key: "email_delay_3", label: "Email 3 — Urgence" },
                  { key: "email_delay_4", label: "Email 4 — Dernier contact" },
                ] as const).map(f => (
                  <div key={f.key}>
                    <label className={lbl}>{f.label}</label>
                    <div className="flex items-center gap-2">
                      <span className="text-[#4B5870] text-xs shrink-0">J+</span>
                      <input className={inp} type="number" min="0" value={settings[f.key]} onChange={e => set(f.key, parseInt(e.target.value) || 0)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={section}>
            <div className={secHead}>
              <h2 className="text-[#E2E8F8] font-semibold text-sm">Configuration Brevo</h2>
              <p className="text-[#3A4560] text-xs mt-0.5">API pour l&apos;envoi d&apos;emails automatiques</p>
            </div>
            <div className={secBody}>
              <div>
                <label className={lbl}>Clé API Brevo</label>
                <input className={inp} type="password" value={settings.brevo_api_key} onChange={e => set("brevo_api_key", e.target.value)} placeholder="xkeysib-..." />
              </div>
              <div className="border-t border-white/[0.05] pt-4 space-y-4">
                {([
                  { key: "stop_on_reply",         label: "Arrêter si lead répond",      sub: "Stoppe automatiquement les emails suivants" },
                  { key: "stop_on_status_change",  label: "Arrêter si statut change",    sub: "Ex : lead passe en Devis ou Gagné" },
                  { key: "send_copy",              label: "Recevoir copie des emails",   sub: "Copie à votre adresse email" },
                ] as const).map(f => (
                  <div key={f.key} className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="text-[#C8D4E8] text-sm font-medium">{f.label}</div>
                      <div className="text-[#3A4560] text-xs mt-0.5">{f.sub}</div>
                    </div>
                    <Toggle checked={settings[f.key]} onChange={v => set(f.key, v)} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { Menu, Bell, LogOut, User } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { logout } from "@/lib/auth/actions"
import { useRouter, usePathname } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface NavbarProps {
  onMenuClick: () => void
}

interface Notif {
  id: string
  title: string
  sub: string
  time: string
  color: string
  href: string
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const min = Math.floor(diff / 60000)
  if (min < 1) return "à l'instant"
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  if (h < 24) return `${h} h`
  return `${Math.floor(h / 24)} j`
}

const PRODUCT_COLOR: Record<string, string> = {
  solyb_agency: "bg-coral",
  factu_gp: "bg-emerald-500",
  resa_gp: "bg-violet-500",
}

const PAGE_TITLES: Record<string, { title: string; sub: string }> = {
  "/admin":           { title: "Pipeline", sub: "Leads & opportunités" },
  "/admin/planning":  { title: "Planning", sub: "Capacité & agenda" },
  "/admin/analytics": { title: "Analytics", sub: "Performances multi-produits" },
  "/admin/templates": { title: "Templates Email", sub: "Séquences automatiques" },
  "/admin/settings":  { title: "Paramètres", sub: "Configuration" },
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [showNotif, setShowNotif]   = useState(false)
  const [showUser, setShowUser]     = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const [notifs, setNotifs]         = useState<Notif[]>([])

  const notifRef = useRef<HTMLDivElement>(null)
  const userRef  = useRef<HTMLDivElement>(null)

  const page =
    PAGE_TITLES[pathname] ??
    (pathname.startsWith("/admin/leads/")
      ? { title: "Fiche lead", sub: "Détail & suivi" }
      : { title: "Dashboard", sub: "SolYB CRM" })

  // Notifications réelles : derniers leads reçus (7 jours)
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_USE_MOCK === "true") return
    let active = true
    ;(async () => {
      try {
        const supabase = createClient()
        const since = new Date(Date.now() - 7 * 864e5).toISOString()
        const { data } = await supabase
          .from("leads")
          .select("id, name, company, project_type, product_source, created_at")
          .gte("created_at", since)
          .order("created_at", { ascending: false })
          .limit(6)
        if (!active || !data) return
        setNotifs(
          data.map((l) => ({
            id: l.id,
            title: "Nouveau lead reçu",
            sub: `${l.name}${l.company ? ` — ${l.company}` : l.project_type ? ` — ${l.project_type}` : ""}`,
            time: timeAgo(l.created_at),
            color: PRODUCT_COLOR[l.product_source as string] ?? "bg-coral",
            href: "/admin",
          }))
        )
      } catch {
        /* table absente / non connecté → pas de notif */
      }
    })()
    return () => { active = false }
  }, [])

  // Fermer les menus au clic extérieur
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false)
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUser(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  const openNotif = (href: string) => {
    setShowNotif(false)
    router.push(href)
  }

  const handleLogout = async () => {
    if (loggingOut) return
    setLoggingOut(true)
    try {
      await logout()
      router.push("/login")
      router.refresh()
    } catch {
      setLoggingOut(false)
    }
  }

  return (
    <nav className="bg-[#1A1511] border-b border-white/[0.05] px-5 py-3.5 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4">

        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-white/[0.06] text-[#9A8C78] hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-[#F5EDD8] font-bold text-lg leading-tight">{page.title}</h1>
            <p className="text-[#6B5F4E] text-xs font-medium">{page.sub}</p>
          </div>
        </div>

        {/* Center — live indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] border border-white/[0.05] rounded-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-semibold text-[#7E715E] tracking-wider uppercase">Live</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => { setShowNotif(!showNotif); setShowUser(false) }}
              className="p-2 rounded-lg hover:bg-white/[0.06] text-[#7E715E] hover:text-[#F5EDD8] transition-colors relative"
            >
              <Bell className="w-4.5 h-4.5" />
              {notifs.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-coral rounded-full" />
              )}
            </button>

            {showNotif && (
              <div className="absolute right-0 mt-2 w-80 bg-[#201913] border border-white/[0.07] rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                  <span className="text-[#F5EDD8] font-semibold text-sm">Notifications</span>
                  {notifs.length > 0 && (
                    <span className="text-[10px] bg-coral/15 text-coral px-2 py-0.5 rounded-full font-semibold">
                      {notifs.length} récente{notifs.length > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                {notifs.length === 0 ? (
                  <div className="px-4 py-8 text-center">
                    <Bell className="w-7 h-7 text-[#3A332A] mx-auto mb-2" />
                    <p className="text-[#7E715E] text-sm">Aucune notification récente</p>
                    <p className="text-[#574C3D] text-xs mt-0.5">Les nouveaux leads s'afficheront ici</p>
                  </div>
                ) : (
                  <div className="divide-y divide-white/[0.04] max-h-96 overflow-y-auto">
                    {notifs.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => openNotif(n.href)}
                        className="w-full text-left px-4 py-3 hover:bg-white/[0.03] cursor-pointer flex items-start gap-3 transition-colors"
                      >
                        <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.color}`} />
                        <div className="min-w-0">
                          <p className="text-[#E8DDC8] text-sm font-medium">{n.title}</p>
                          <p className="text-[#7E715E] text-xs mt-0.5 truncate">{n.sub}</p>
                          <p className="text-[#574C3D] text-[10px] mt-1">Il y a {n.time}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User */}
          <div className="relative" ref={userRef}>
            <button
              onClick={() => { setShowUser(!showUser); setShowNotif(false) }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-coral to-coral/70 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xs">Y</span>
              </div>
              <span className="hidden md:block text-sm font-medium text-[#A89880]">Yacine</span>
            </button>

            {showUser && (
              <div className="absolute right-0 mt-2 w-52 bg-[#201913] border border-white/[0.07] rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <p className="text-[#F5EDD8] text-sm font-semibold">Yacine Bouhassoun</p>
                  <p className="text-[#7E715E] text-xs mt-0.5">contact@solyb.fr</p>
                </div>
                <div className="p-1">
                  <button
                    onClick={() => { setShowUser(false); router.push("/admin/settings") }}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-white/[0.05] text-[#A89880] hover:text-[#E8DDC8] transition-colors text-sm"
                  >
                    <User className="w-4 h-4" />
                    <span>Mon profil</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors text-sm disabled:opacity-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{loggingOut ? "Déconnexion..." : "Déconnexion"}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

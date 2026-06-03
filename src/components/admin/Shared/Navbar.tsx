"use client"

import { Menu, Bell, LogOut, User, Zap } from "lucide-react"
import { useState } from "react"
import { logout } from "@/lib/auth/actions"
import { useRouter, usePathname } from "next/navigation"

interface NavbarProps {
  onMenuClick: () => void
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

  const page = PAGE_TITLES[pathname] ?? { title: "Dashboard", sub: "SolYB CRM" }

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
    <nav className="bg-[#0D1120] border-b border-white/[0.05] px-5 py-3.5 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4">

        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-white/[0.06] text-[#6B7A99] hover:text-white transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-[#E2E8F8] font-bold text-lg leading-tight">{page.title}</h1>
            <p className="text-[#3A4560] text-xs font-medium">{page.sub}</p>
          </div>
        </div>

        {/* Center — live indicator */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.03] border border-white/[0.05] rounded-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-semibold text-[#4B5870] tracking-wider uppercase">Live</span>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setShowNotif(!showNotif); setShowUser(false) }}
              className="p-2 rounded-lg hover:bg-white/[0.06] text-[#4B5870] hover:text-[#E2E8F8] transition-colors relative"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-coral rounded-full" />
            </button>

            {showNotif && (
              <div className="absolute right-0 mt-2 w-80 bg-[#111827] border border-white/[0.07] rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                  <span className="text-[#E2E8F8] font-semibold text-sm">Notifications</span>
                  <span className="text-[10px] bg-coral/15 text-coral px-2 py-0.5 rounded-full font-semibold">2 nouvelles</span>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  {[
                    { title: "Nouveau lead reçu", sub: "Jean Dupont — Site vitrine", time: "5 min", color: "bg-coral" },
                    { title: "Capacité planning 90%", sub: "Semaine du 15 janvier", time: "2h", color: "bg-orange-500" },
                  ].map((n, i) => (
                    <div key={i} className="px-4 py-3 hover:bg-white/[0.03] cursor-pointer flex items-start gap-3">
                      <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.color}`} />
                      <div className="min-w-0">
                        <p className="text-[#C8D4E8] text-sm font-medium">{n.title}</p>
                        <p className="text-[#4B5870] text-xs mt-0.5">{n.sub}</p>
                        <p className="text-[#2E3A55] text-[10px] mt-1">Il y a {n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User */}
          <div className="relative">
            <button
              onClick={() => { setShowUser(!showUser); setShowNotif(false) }}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-white/[0.06] transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-coral to-coral/70 flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xs">Y</span>
              </div>
              <span className="hidden md:block text-sm font-medium text-[#8090AA]">Yacine</span>
            </button>

            {showUser && (
              <div className="absolute right-0 mt-2 w-52 bg-[#111827] border border-white/[0.07] rounded-xl shadow-2xl shadow-black/40 overflow-hidden z-50">
                <div className="px-4 py-3 border-b border-white/[0.06]">
                  <p className="text-[#E2E8F8] text-sm font-semibold">Yacine Bouhassoun</p>
                  <p className="text-[#4B5870] text-xs mt-0.5">contact@solyb.fr</p>
                </div>
                <div className="p-1">
                  <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg hover:bg-white/[0.05] text-[#8090AA] hover:text-[#C8D4E8] transition-colors text-sm">
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

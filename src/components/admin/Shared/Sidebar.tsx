"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Users, Calendar, BarChart3, Mail, Settings, X,
  Zap, FileCheck, UtensilsCrossed, ChevronRight,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const PRODUCTS = [
  {
    id: "solyb",
    name: "SolYB Agence",
    href: "/admin",
    color: "#C4472A",
    dot: "bg-coral",
    ring: "ring-coral/30",
    bg: "bg-coral/10",
    text: "text-coral",
    icon: Zap,
  },
  {
    id: "factu",
    name: "FactuGP",
    href: "/facturation-electronique",
    color: "#10B981",
    dot: "bg-emerald-500",
    ring: "ring-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    icon: FileCheck,
    external: true,
  },
  {
    id: "resa",
    name: "ResaGP",
    href: "/resagp",
    color: "#F97316",
    dot: "bg-orange-500",
    ring: "ring-orange-500/30",
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    icon: UtensilsCrossed,
    external: true,
  },
]

const NAV = [
  { name: "Pipeline / Leads", href: "/admin", icon: Users },
  { name: "Planning", href: "/admin/planning", icon: Calendar },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Templates Email", href: "/admin/templates", icon: Mail },
  { name: "Paramètres", href: "/admin/settings", icon: Settings },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-[#1A1511] border-r border-white/[0.05] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.05]">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-coral/10 border border-coral/20 flex items-center justify-center">
              <Image
                src="/logo/SYB_orange.svg"
                alt="SolYB"
                width={18}
                height={18}
              />
            </div>
            <div>
              <div className="text-[#F5EDD8] font-bold text-sm leading-none">SolYB</div>
              <div className="text-[#7E715E] text-[10px] leading-none mt-0.5 font-medium tracking-wider uppercase">CRM Pro</div>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-white/5 text-[#7E715E] hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Products section */}
        <div className="px-3 pt-4 pb-2">
          <div className="text-[10px] font-semibold text-[#6B5F4E] uppercase tracking-widest px-2 mb-2">Vos Produits</div>
          <div className="space-y-1">
            {PRODUCTS.map((p) => {
              const Icon = p.icon
              const isActive = pathname === p.href
              return (
                <Link
                  key={p.id}
                  href={p.href}
                  target={p.external ? "_blank" : undefined}
                  onClick={onClose}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                    isActive ? `${p.bg} ring-1 ${p.ring}` : "hover:bg-white/[0.04]"
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isActive ? p.bg : "bg-white/[0.04] group-hover:bg-white/[0.07]"}`}>
                    <Icon className={`w-3.5 h-3.5 ${isActive ? p.text : "text-[#7E715E] group-hover:text-[#A89880]"}`} />
                  </div>
                  <span className={`text-sm font-medium flex-1 ${isActive ? p.text : "text-[#9A8C78] group-hover:text-[#C2B79E]"}`}>{p.name}</span>
                  {p.external && <ChevronRight className="w-3 h-3 text-[#6B5F4E] group-hover:text-[#7E715E]" />}
                  {!p.external && (
                    <span className={`w-1.5 h-1.5 rounded-full ${p.dot} opacity-0 group-hover:opacity-60 ${isActive ? 'opacity-100' : ''}`} />
                  )}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Separator */}
        <div className="mx-4 border-t border-white/[0.04] my-2" />

        {/* Nav section */}
        <div className="px-3 pb-2 flex-1">
          <div className="text-[10px] font-semibold text-[#6B5F4E] uppercase tracking-widest px-2 mb-2">Navigation</div>
          <nav className="space-y-0.5">
            {NAV.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-coral/10 text-coral ring-1 ring-coral/20"
                      : "text-[#9A8C78] hover:text-[#C2B79E] hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-coral" : "text-[#6B5F4E] group-hover:text-[#9A8C78]"}`} />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="px-4 pb-4 border-t border-white/[0.04] pt-4">
          <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.03] border border-white/[0.04]">
            <div className="w-8 h-8 rounded-full bg-coral flex items-center justify-center shrink-0">
              <span className="text-white font-bold text-xs">Y</span>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-[#F5EDD8] text-xs font-semibold truncate">Yacine B.</div>
              <div className="text-[#6B5F4E] text-[10px] truncate">v2.0 · Admin</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

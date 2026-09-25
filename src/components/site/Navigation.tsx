"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const navLinks = [
  { href: "/#realisations", label: "Nos projets" },
  { href: "/#services",     label: "Services & tarifs" },
  { href: "/#apropos",      label: "L'histoire" },
  { href: "/#faq",          label: "FAQ" },
  { href: "/blog",          label: "Blog" },
]

const SECTION_IDS = ["realisations", "services", "engagements", "apropos", "faq", "contact"]

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

/* Habillage crème des pages du site. L'accueil, /merci et l'index du blog ont
   leur propre navigation (components/voyage/Nav). */
const t = {
  bar: { background: "rgba(245,242,237,0.93)", borderColor: "#DDD5C8", backdropFilter: "blur(14px)" },
  height: "h-16",
  logo: "h-11 w-auto",
  wordmark: "var(--syb-ink)",
  tracking: "-0.5px",
  leading: "",
  link: "text-[13px] font-normal",
  idle: "text-[#6E665C] hover:text-[#0E0D0B]",
  active: "text-[#0E0D0B]",
  focus: "focus-visible:outline-[var(--syb-rust)]",
  toggle: "#6E665C",
  menu: { background: "transparent", borderColor: "#DDD5C8" },
}

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  // Referme le menu mobile à chaque changement de page (Blog, retour navigateur…)
  useEffect(() => { setMobileMenuOpen(false) }, [pathname])

  // Masquage au défilement : l'en-tête s'efface en descendant, revient en remontant.
  useEffect(() => {
    let lastY = 0
    const handleScroll = () => {
      const y = window.scrollY
      if (navRef.current) {
        navRef.current.style.transform = (y > lastY && y > 80) ? "translateY(-110%)" : "translateY(0)"
      }
      lastY = y
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lien actif selon la section visible (changement de couleur, pas d'animation)
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [pathname])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Toujours refermer le menu mobile au clic, même quand le lien change de
    // page (Blog) ou pointe vers une section absente de la page courante.
    setMobileMenuOpen(false)
    const hash = href.split("#")[1]
    if (!hash) return
    const target = document.getElementById(hash)
    // Section absente de la page courante (ex. page légale) → laisser le lien
    // naviguer vers /#hash (charge la home puis saute à la section).
    if (!target) return
    e.preventDefault()
    const offset = navRef.current?.getBoundingClientRect().height ?? 80
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    })
    // Déplace aussi le focus clavier sur la section atteinte
    target.setAttribute("tabindex", "-1")
    target.focus({ preventScroll: true })
  }

  const focusRing = `focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] ${t.focus}`
  const linkClass = (href: string) => {
    const hash = href.split("#")[1] ?? ""
    return `${t.link} rounded-sm transition-colors ${focusRing} ${activeSection === hash ? t.active : t.idle}`
  }

  const cta = `text-white text-xs font-normal px-5 py-2 rounded bg-[#C4472A] hover:bg-[#B84126] transition-colors ${focusRing}`

  return (
    <nav
      ref={navRef}
      aria-label="Navigation principale"
      className={`w-full border-b ${t.leading}`}
      style={{ ...t.bar, transition: "transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)" }}
    >
      <div className="max-w-[1180px] mx-auto px-6 min-[720px]:px-10">
        <div className={`flex justify-between items-center ${t.height}`}>

          {/* Logo */}
          <Link href="/" className={`flex items-center gap-2.5 rounded-sm ${focusRing}`} aria-label="SolYB — accueil">
            <Image
              src="/logo/syb-orange.png"
              alt=""
              width={160}
              height={160}
              className={t.logo}
              priority
            />
            <span
              aria-hidden
              className="font-display font-black leading-none"
              style={{ fontSize: "21px", letterSpacing: t.tracking, color: t.wordmark }}
            >
              SolYB
            </span>
          </Link>

          {/* Liens desktop */}
          <div className="hidden min-[980px]:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className={linkClass(link.href)}>
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a href="/#contact" onClick={(e) => scrollToSection(e, "/#contact")} className={cta}>
              Devis gratuit
            </a>
            {/* Bouton menu mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`min-[980px]:hidden p-2 rounded-sm ${focusRing}`}
              style={{ color: t.toggle, background: "none", border: "none" }}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="menu-mobile"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!mobileMenuOpen}
        className="min-[980px]:hidden border-t"
        style={t.menu}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={`py-3 px-3 ${linkClass(link.href)}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

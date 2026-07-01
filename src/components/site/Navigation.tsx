"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"

const WHATSAPP_URL =
  "https://wa.me/590690426792?text=" +
  encodeURIComponent("Bonjour ! Je souhaite des informations sur vos services.")

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")
  const navRef = useRef<HTMLElement>(null)

  const navLinks = [
    { href: "/#services",     label: "Services" },
    { href: "/#tarifs",       label: "Nos tarifs" },
    { href: "/#apropos",      label: "L'histoire" },
    { href: "/#realisations", label: "Nos projets" },
    { href: "/blog",          label: "Blog" },
    { href: "/#contact",      label: "Contact" },
  ]

  useEffect(() => {
    let lastY = 0
    const handleScroll = () => {
      const y = window.scrollY
      if (navRef.current) {
        navRef.current.style.transform = (y > lastY && y > 80) ? 'translateY(-110%)' : 'translateY(0)'
      }
      lastY = y
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const ids = ['services', 'tarifs', 'process', 'solutions', 'apropos', 'realisations', 'faq', 'contact']
    const observers: IntersectionObserver[] = []
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = href.split('#')[1]
    if (!hash) return
    const target = document.getElementById(hash)
    // Section absente de la page courante (ex. page légale) → laisser le lien
    // naviguer vers /#hash (charge la home puis saute à la section).
    if (!target) return
    e.preventDefault()
    setMobileMenuOpen(false)
    const offset = navRef.current?.getBoundingClientRect().height ?? 80
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' })
  }

  const getLinkClass = (href: string) => {
    const hash = href.split('#')[1] ?? ''
    const isActive = activeSection === hash
    return `text-[13px] font-light transition-colors cursor-pointer ${isActive ? 'text-[#0E0D0B]' : 'text-[#736B5F] hover:text-[#0E0D0B]'}`
  }

  return (
    <nav
      ref={navRef}
      className="w-full border-b"
      style={{
        background: 'rgba(245,242,237,0.93)',
        borderColor: '#DDD5C8',
        backdropFilter: 'blur(14px)',
        transition: 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)',
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center cursor-pointer" aria-label="SolYB — accueil">
            <Image
              src="/logo/syb-orange.png"
              alt="SolYB"
              width={160}
              height={160}
              className="h-11 w-auto"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={getLinkClass(link.href)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contacter sur WhatsApp"
              className="transition-colors"
              style={{ color: '#7A7268' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#0E0D0B')}
              onMouseLeave={e => (e.currentTarget.style.color = '#7A7268')}
            >
              <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
              </svg>
            </a>
            <a
              href="/#contact"
              onClick={(e) => scrollToSection(e, '/#contact')}
              className="text-white text-xs font-normal px-5 py-2 rounded cursor-pointer transition-all"
              style={{ background: '#C4472A', letterSpacing: '0.3px' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#E06245')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C4472A')}
            >
              Devis gratuit
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            style={{ color: '#7A7268' }}
            aria-label={mobileMenuOpen ? "Fermer" : "Menu"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden border-t overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ borderColor: '#DDD5C8' }}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const hash = link.href.split('#')[1] ?? ''
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`py-3 px-3 rounded text-sm font-light cursor-pointer ${activeSection === hash ? 'text-[#0E0D0B]' : 'text-[#7A7268]'}`}
              >
                {link.label}
              </a>
            )
          })}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="py-3 px-3 rounded text-sm font-light flex items-center gap-2"
            style={{ color: '#7A7268' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884" />
            </svg>
            WhatsApp
          </a>
          <a
            href="/#contact"
            onClick={(e) => scrollToSection(e, '/#contact')}
            className="mt-2 py-3 text-center text-white text-sm font-normal rounded cursor-pointer"
            style={{ background: '#C4472A' }}
          >
            Devis gratuit
          </a>
        </div>
      </div>
    </nav>
  )
}

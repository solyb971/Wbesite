"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")
  const navRef = useRef<HTMLElement>(null)

  const navLinks = [
    { href: "/#services",     label: "Services" },
    { href: "/#apropos",      label: "À propos" },
    { href: "/tarifs",        label: "Tarifs" },
    { href: "/#realisations", label: "Réalisations" },
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
    const ids = ['services', 'process', 'solutions', 'apropos', 'realisations', 'faq', 'contact']
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
    e.preventDefault()
    setMobileMenuOpen(false)
    const target = document.getElementById(hash)
    if (target) {
      const offset = navRef.current?.getBoundingClientRect().height ?? 80
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' })
    }
  }

  const getLinkClass = (href: string) => {
    const hash = href.split('#')[1] ?? ''
    const isActive = activeSection === hash
    return `text-[13px] font-light transition-colors cursor-pointer ${isActive ? 'text-[#0E0D0B]' : 'text-[#7A7268] hover:text-[#0E0D0B]'}`
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
          <Link href="/" className="font-display font-bold text-xl cursor-pointer" style={{ color: '#0E0D0B', letterSpacing: '-0.5px' }}>
            Sol<em className="italic" style={{ color: '#C4472A', fontWeight: 300 }}>YB</em>
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

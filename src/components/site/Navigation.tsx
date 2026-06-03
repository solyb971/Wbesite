"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"
import LogoAnimation from "@/components/ui/LogoAnimation"

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string>("")
  const [navAnim, setNavAnim] = useState(false)
  const [pendingHash, setPendingHash] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  const navLinks = [
    { href: "/#services",     label: "Services" },
    { href: "/#apropos",      label: "À propos" },
    { href: "/tarifs",        label: "Tarifs" },
    { href: "/#realisations", label: "Réalisations" },
    { href: "/#contact",      label: "Contact" },
  ]

  // Hide/show nav on scroll direction
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

  // Active section tracking
  useEffect(() => {
    const ids = ['services', 'facturation', 'tarifs', 'apropos', 'contact']
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

  const scrollToSection = (e: React.MouseEvent, href: string) => {
    const hash = href.split('#')[1]
    if (!hash) return
    e.preventDefault()
    setMobileMenuOpen(false)
    // Show logo transition, then scroll when done
    setPendingHash(hash)
    setNavAnim(true)
  }

  const handleAnimComplete = () => {
    setNavAnim(false)
    if (!pendingHash) return
    const target = document.getElementById(pendingHash)
    if (target) {
      const stickyHeader = document.querySelector<HTMLElement>('[data-sticky-header]')
      const offset = stickyHeader ? stickyHeader.getBoundingClientRect().height : 120
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' })
    }
    setPendingHash(null)
  }

  const getLinkClass = (href: string) => {
    const hash = href.split('#')[1] ?? ''
    const isActive = activeSection === hash
    return `text-[13px] font-light transition-colors cursor-pointer
      ${isActive ? 'text-[#0E0D0B]' : 'text-[#7A7268] hover:text-[#0E0D0B]'}`
  }

  return (
    <>
      {/* Logo transition overlay */}
      <LogoAnimation
        mode="quick"
        isVisible={navAnim}
        onComplete={handleAnimComplete}
      />

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Logo — click triggers quick anim then scroll to top */}
            <a
              href="/"
              id="nav-logo-ref"
              className="flex items-center cursor-pointer"
              onClick={(e) => {
                e.preventDefault()
                setPendingHash('')
                setNavAnim(true)
              }}
            >
                <span className="font-display text-[22px] font-bold tracking-tight" style={{ color: '#0E0D0B', letterSpacing: '-0.5px' }}>
                Sol<em className="italic font-light not-italic" style={{ color: '#C4472A', fontStyle: 'italic' }}>YB</em>
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={getLinkClass(link.href)}
                >
                  <span className="relative z-10">{link.label}</span>
                </a>
              ))}
              <a
                href="/#contact"
                onClick={(e) => scrollToSection(e, '/#contact')}
                className="text-white px-5 py-2 rounded text-xs font-normal transition-all cursor-pointer"
              style={{ background: '#C4472A', letterSpacing: '0.3px' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#E06245')}
              onMouseLeave={e => (e.currentTarget.style.background = '#C4472A')}
              >
                Audit gratuit
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded transition-colors"
          style={{ color: '#7A7268' }}
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden border-t overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => {
              const hash = link.href.split('#')[1] ?? ''
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`block py-3 px-4 rounded font-light transition-colors cursor-pointer ${
                    activeSection === hash ? 'text-[#0E0D0B]' : 'text-[#7A7268]'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
            <a
              href="/#contact"
              onClick={(e) => scrollToSection(e, '/#contact')}
              className="block text-white px-4 py-3 rounded font-normal text-sm transition-colors text-center mt-2 cursor-pointer"
              style={{ background: '#C4472A' }}
            >
              Audit gratuit
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

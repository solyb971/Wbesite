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
    return `relative text-sm font-medium transition-colors cursor-pointer
      after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0
      after:bg-coral after:transition-all after:duration-300 hover:after:w-full
      ${isActive ? 'text-[#F0EDE8]' : 'text-[#8B8B9E] hover:text-[#F0EDE8]'}`
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
        className="w-full bg-[#0A0A0F] border-b border-[#2A2A38]"
        style={{ transition: 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)' }}
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
              <Image
                src="/logo/SYB_orange.svg"
                alt="SolYB — Agence Digitale Guadeloupe"
                width={80} height={80}
                className="h-16 w-auto"
                priority
              />
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
                className="bg-coral hover:bg-coral-600 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 shadow-lg shadow-coral/20 cursor-pointer"
              >
                Audit gratuit
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#8B8B9E] hover:text-[#F0EDE8] hover:bg-[#1C1C26] transition-colors"
              aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden border-t border-[#2A2A38] bg-[#0A0A0F] overflow-hidden transition-all duration-300 ease-in-out ${
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
                  className={`block py-3 px-4 rounded-lg font-medium transition-colors hover:bg-[#1C1C26] cursor-pointer ${
                    activeSection === hash ? 'text-[#F0EDE8]' : 'text-[#8B8B9E] hover:text-[#F0EDE8]'
                  }`}
                >
                  {link.label}
                </a>
              )
            })}
            <a
              href="/#contact"
              onClick={(e) => scrollToSection(e, '/#contact')}
              className="block bg-coral hover:bg-coral-600 text-white px-4 py-3 rounded-lg font-semibold transition-colors text-center mt-2 cursor-pointer"
            >
              Audit gratuit
            </a>
          </div>
        </div>
      </nav>
    </>
  )
}

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Linkedin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#0A0A0F] border-t border-[#2A2A38] text-[#8B8B9E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Brand — full width on mobile */}
          <div className="col-span-2 md:col-span-1 reveal space-y-4" data-reveal-index="0">
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer">
              <Image
                src="/logo/SYB_orange.svg"
                alt="SolYB"
                width={32}
                height={32}
                className="h-8 w-auto flex-shrink-0"
              />
              <span className="font-display text-xl font-bold text-[#F0EDE8]">
                Sol<span className="text-coral">YB</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Agence digitale en Guadeloupe — sites web sur-mesure, applications métier,
              facturation électronique 2026 et SaaS pour TPE/PME.
            </p>
            <div className="flex items-center gap-2 text-xs bg-coral/10 border border-coral/20 text-coral px-3 py-1.5 rounded-full w-fit">
              <span className="w-1.5 h-1.5 bg-coral rounded-full animate-pulse" />
              Ancré en Guadeloupe · 971
            </div>
          </div>

          {/* Quick Links */}
          <div className="reveal" data-reveal-index="1">
            <h3 className="text-[#F0EDE8] font-semibold mb-5 text-sm uppercase tracking-wide">Navigation</h3>
            <ul className="space-y-3">
              {[
                { href: "/#services", label: "Nos services" },
                { href: "/#realisations", label: "Réalisations" },
                { href: "/#tarifs", label: "Nos tarifs" },
                { href: "/#apropos", label: "L'équipe" },
                { href: "/#contact", label: "Parlons-en" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="relative text-sm transition-colors hover:text-[#F0EDE8] after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-coral after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="reveal" data-reveal-index="2">
            <h3 className="text-[#F0EDE8] font-semibold mb-5 text-sm uppercase tracking-wide">Services</h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Sites web sur-mesure", href: null },
                { label: "Applications métier", href: null },
                { label: "Facturation électronique 2026", href: "/facturation-electronique" },
                { label: "ResaGP — Gestion restaurant", href: "/resagp" },
                { label: "E-commerce", href: null },
                { label: "Maintenance & support", href: null },
              ].map(({ label, href }) => (
                <li key={label} className={label.includes("Facturation") ? "text-solar" : label.includes("ResaGP") ? "text-[#F97316]" : ""}>
                  {href ? <Link href={href} className="hover:opacity-80 transition-opacity">{label}</Link> : label}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="reveal" data-reveal-index="3">
            <h3 className="text-[#F0EDE8] font-semibold mb-5 text-sm uppercase tracking-wide">Contact</h3>
            <ul className="space-y-4">
              {[
                { icon: Mail, value: "contact@solyb.fr", href: "mailto:contact@solyb.fr" },
                { icon: Phone, value: "+590 690 71 17 69", href: "tel:+590690711769" },
                { icon: MapPin, value: "Baie-Mahault, Guadeloupe 971", href: null },
                { icon: Linkedin, value: "LinkedIn", href: "https://linkedin.com/in/yacine-bouhassoun" },
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <item.icon className="w-4 h-4 text-coral flex-shrink-0" />
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="hover:text-[#F0EDE8] transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="reveal border-t border-[#2A2A38] mt-12 pt-8" data-reveal-index="4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs">
              © {currentYear} SolYB (Solutions by Yacine Bouhassoun) — Agence Digitale Guadeloupe. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-xs">
              <Link href="/mentions-legales" className="hover:text-[#F0EDE8] transition-colors">
                Mentions légales
              </Link>
              <Link href="/confidentialite" className="hover:text-[#F0EDE8] transition-colors">
                Confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

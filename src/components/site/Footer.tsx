import Link from "next/link"
import Image from "next/image"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer style={{ background: '#0E0D0B', borderTop: '0.5px solid #1a1814' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 flex-wrap">
        <Image
          src="/logo/SYB_white.svg"
          alt="SolYB"
          width={512}
          height={512}
          className="h-8 w-auto"
          unoptimized
        />
        <p className="text-xs font-light" style={{ color: '#948C80' }}>
          © {currentYear} SolYB — Agence digitale Guadeloupe
        </p>
        <div className="flex gap-6">
          {[
            { href: "/mentions-legales", label: "Mentions légales" },
            { href: "/confidentialite",  label: "Confidentialité" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs font-light transition-colors hover:text-white"
              style={{ color: '#B0A89E' }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

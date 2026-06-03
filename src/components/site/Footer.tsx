import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer style={{ background: '#0E0D0B', borderTop: '0.5px solid #1a1814' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 flex-wrap">
        <div className="font-display font-bold text-lg" style={{ color: '#F5F2ED', letterSpacing: '-0.5px' }}>
          Sol<em className="italic" style={{ color: '#C4472A', fontWeight: 300 }}>YB</em>
        </div>
        <p className="text-xs font-light" style={{ color: '#3A3530' }}>
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
              className="text-xs font-light transition-colors hover:opacity-80"
              style={{ color: '#3A3530' }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  )
}

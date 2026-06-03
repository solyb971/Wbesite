import Link from "next/link"

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen grid overflow-hidden"
      style={{ gridTemplateColumns: '1fr 1fr' }}
    >
      {/* Photo side */}
      <div className="relative hidden md:block" style={{ background: '#1a1714' }}>
        {/* Gradient photo placeholder — warm dark */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, #2a2420 0%, #1a1410 40%, #0e0c0a 100%)',
          }}
        />
        {/* Texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(196,71,42,0.18) 0%, transparent 60%)',
          }}
        />
        {/* Fade into right side */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, transparent 60%, #F5F2ED 100%)' }}
        />
        {/* Label */}
        <div
          className="absolute bottom-10 left-8 text-xs tracking-[3px] uppercase"
          style={{ color: 'rgba(255,255,255,0.4)' }}
        >
          Guadeloupe · 971
        </div>
      </div>

      {/* Content side */}
      <div
        className="flex flex-col justify-center px-6 sm:px-10 md:px-14 lg:px-16 pt-28 pb-20 col-span-2 md:col-span-1"
        style={{ background: '#F5F2ED' }}
      >
        {/* Tag */}
        <div
          className="flex items-center gap-3 mb-10 text-xs tracking-[3px] uppercase"
          style={{ color: '#B0A89E', animation: 'fadeUp 0.6s 0.1s ease both' }}
        >
          <span className="w-5 h-px flex-shrink-0" style={{ background: '#C4472A' }} />
          Agence digitale locale
        </div>

        {/* H1 */}
        <h1
          className="font-display font-black leading-none mb-7"
          style={{
            fontSize: 'clamp(56px, 5.5vw, 88px)',
            letterSpacing: '-3px',
            color: '#0E0D0B',
            animation: 'fadeUp 0.7s 0.25s ease both',
          }}
          aria-label="Votre entreprise en ligne"
        >
          Votre<br />entreprise<br />
          <em
            className="italic block"
            style={{ fontWeight: 300, color: '#C4472A', fontSize: '0.85em', letterSpacing: '-2px' }}
          >
            en ligne.
          </em>
        </h1>

        {/* Subtitle */}
        <p
          className="font-light leading-relaxed mb-10 max-w-sm"
          style={{
            fontSize: '15px',
            color: '#7A7268',
            lineHeight: 1.8,
            animation: 'fadeUp 0.7s 0.4s ease both',
          }}
        >
          Sites vitrine, e-commerce et applications sur mesure pour les{' '}
          <span style={{ color: '#2E2A25' }}>TPE et PME de Guadeloupe</span>.
          Livré en 2–3 semaines.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center gap-5"
          style={{ animation: 'fadeUp 0.7s 0.55s ease both' }}
        >
          <Link
            href="/#contact"
            className="inline-block text-white text-sm font-normal transition-all hover:-translate-y-px"
            style={{ background: '#C4472A', padding: '13px 28px', borderRadius: '4px', letterSpacing: '0.3px' }}
          >
            Demander un devis gratuit
          </Link>
          <Link
            href="/#services"
            className="flex items-center gap-1.5 text-sm font-light transition-colors hover:text-[#0E0D0B]"
            style={{ color: '#7A7268' }}
          >
            Voir les services →
          </Link>
        </div>
      </div>
    </section>
  )
}

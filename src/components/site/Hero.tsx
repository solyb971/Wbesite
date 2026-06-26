import Link from "next/link"

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: 'var(--syb-dark)' }}
    >
      {/* Lueurs rust */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 75% 25%, rgba(196,71,42,0.28) 0%, transparent 55%)' }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 8% 92%, rgba(196,71,42,0.10) 0%, transparent 50%)' }}
      />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-10 md:px-12 pt-32 pb-24">
        {/* Tag */}
        <div
          className="flex items-center gap-3 mb-8 text-xs tracking-[3px] uppercase"
          style={{ color: 'var(--syb-rust-light)', animation: 'fadeUp 0.6s 0.1s ease both' }}
        >
          <span className="w-6 h-px flex-shrink-0" style={{ background: 'var(--syb-rust)' }} />
          Baie-Mahault · Guadeloupe 971
        </div>

        {/* H1 */}
        <h1
          className="font-display font-black leading-none mb-8"
          style={{
            fontSize: 'clamp(46px, 6.2vw, 92px)',
            letterSpacing: '-3px',
            color: 'var(--syb-cream)',
          }}
          aria-label="Votre clientèle locale vous cherche déjà"
        >
          <span className="block" style={{ animation: 'fadeUp 0.7s 0.25s ease both' }}>Votre clientèle locale</span>
          <em
            className="italic block"
            style={{
              fontWeight: 300,
              color: 'var(--syb-rust-light)',
              fontSize: '0.9em',
              letterSpacing: '-2px',
              animation: 'fadeUp 0.7s 0.45s ease both',
            }}
          >
            vous cherche déjà.
          </em>
        </h1>

        {/* Subtitle */}
        <p
          className="font-light leading-relaxed mb-10 max-w-xl"
          style={{ fontSize: '16px', color: '#b8ab9c', lineHeight: 1.8, animation: 'fadeUp 0.7s 0.7s ease both' }}
        >
          On construit des outils digitaux pour les entrepreneurs d&apos;ici — des sites, des
          applications, des systèmes qui{' '}
          <span style={{ color: 'var(--syb-cream)' }}>tiennent dans le temps</span>. Pas des vitrines
          vides. Des leviers.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-5" style={{ animation: 'fadeUp 0.7s 0.85s ease both' }}>
          <Link
            href="/#contact"
            className="inline-block text-white text-sm font-normal transition-transform hover:-translate-y-px"
            style={{ background: 'var(--syb-rust)', padding: '14px 30px', borderRadius: '4px', letterSpacing: '0.3px' }}
          >
            Demander un devis gratuit
          </Link>
          <Link
            href="/#services"
            className="cta-arrow flex items-center gap-1.5 text-sm font-light transition-colors hover:text-white"
            style={{ color: '#b8ab9c' }}
          >
            Voir les services <span className="arrow">→</span>
          </Link>
        </div>

        {/* Réassurance */}
        <p className="mt-6 text-xs font-light" style={{ color: 'rgba(255,255,255,0.45)', animation: 'fadeUp 0.7s 1s ease both' }}>
          Devis gratuit en 24h · Sans engagement · 1 an d&apos;hébergement inclus
        </p>
      </div>
    </section>
  )
}

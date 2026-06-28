import Link from "next/link"

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden"
      style={{ background: 'var(--syb-dark)', minHeight: 'calc(100svh - 4rem)' }}
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

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 sm:px-10 md:px-12 py-16">
        {/* Badge disponibilité — micro-interaction "vivant + local" */}
        <div
          className="inline-flex items-center gap-2.5 mb-8 text-xs tracking-[2px] uppercase rounded-full px-3.5 py-1.5"
          style={{
            color: 'var(--syb-cream)',
            background: 'rgba(255,255,255,0.05)',
            border: '0.5px solid rgba(255,255,255,0.14)',
            animation: 'fadeUp 0.6s 0.1s ease both',
          }}
        >
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full" style={{ background: '#22C55E', opacity: 0.65 }} />
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: '#22C55E' }} />
          </span>
          Mis en ligne à Baie-Mahault · 97122
        </div>

        {/* H1 */}
        <h1
          className="font-display font-black leading-none mb-8"
          style={{
            fontSize: 'clamp(46px, 6.2vw, 92px)',
            letterSpacing: '-3px',
            color: 'var(--syb-cream)',
          }}
          aria-label="Votre clientèle vous cherche déjà"
        >
          <span className="block" style={{ animation: 'fadeUp 0.7s 0.25s ease both' }}>Votre clientèle</span>
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

        {/* CTAs — primaire dominant, secondaire subordonné (lien texte discret) */}
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3" style={{ animation: 'fadeUp 0.7s 0.85s ease both' }}>
          <Link
            href="/#contact"
            className="inline-block text-white font-medium transition-transform hover:-translate-y-px"
            style={{ background: 'var(--syb-rust)', padding: '15px 32px', borderRadius: '4px', fontSize: '15px', letterSpacing: '0.3px' }}
          >
            Demander un devis gratuit
          </Link>
          <Link
            href="/#services"
            className="cta-arrow inline-flex items-center gap-1.5 font-light transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}
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

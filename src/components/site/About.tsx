export default function About() {
  return (
    <section
      id="apropos"
      className="py-28 md:py-36 scroll-mt-20"
      style={{ background: 'var(--syb-warm)' }}
    >
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <div
          className="reveal flex items-center justify-center gap-2.5 mb-5 text-xs tracking-[3px] uppercase"
          style={{ color: 'var(--syb-rust)' }}
        >
          <span className="w-5 h-px" style={{ background: 'var(--syb-rust)' }} />
          À propos · Yacine Bouhassoun — Fondateur, Baie-Mahault
        </div>

        <h2
          className="reveal font-display font-black mb-10 mx-auto"
          style={{
            fontSize: 'clamp(30px, 4.2vw, 56px)',
            letterSpacing: '-1.5px',
            color: 'var(--syb-ink)',
            lineHeight: 1.15,
            maxWidth: '820px',
          }}
        >
          La Guadeloupe m&apos;a construit.{' '}
          <em className="italic" style={{ fontWeight: 300, color: 'var(--syb-rust)' }}>
            J&apos;ai envie de lui rendre la pareille.
          </em>
        </h2>

        <div
          className="reveal mx-auto mb-14 flex flex-col gap-5 text-left"
          style={{ maxWidth: '620px' }}
        >
          <p className="font-light" style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--syb-stone)' }}>
            Je m&apos;appelle Yacine. J&apos;ai grandi ici, j&apos;ai appris à coder ici, et j&apos;ai
            lancé SolYB parce que les outils qu&apos;on proposait aux entrepreneurs guadeloupéens ne
            ressemblaient pas à leur réalité.
          </p>
          <p className="font-light" style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--syb-stone)' }}>
            Ici, les restaurateurs, artisans et commerçants méritent des outils à leur hauteur — pas
            des templates importés de Paris, pensés pour un autre marché. Alors on prend le temps de
            comprendre votre activité avant d&apos;écrire la première ligne de code.{' '}
            <span style={{ color: 'var(--syb-ink)' }}>C&apos;est plus long que de coller un template. Mais ça tient.</span>
          </p>
        </div>
      </div>
    </section>
  )
}

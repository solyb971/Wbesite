const figures = [
  { value: "5+", label: "ans d'expérience" },
  { value: "14j", label: "livraison moyenne" },
  { value: "971", label: "Guadeloupe" },
]

export default function About() {
  return (
    <section
      id="apropos"
      className="py-28 md:py-36 scroll-mt-20"
      style={{ background: '#FFFFFF' }}
    >
      <div className="max-w-[900px] mx-auto px-6 md:px-12 text-center">
        <div
          className="reveal flex items-center justify-center gap-2.5 mb-6 text-xs tracking-[3px] uppercase"
          style={{ color: 'var(--syb-rust)' }}
        >
          <span className="w-5 h-px" style={{ background: 'var(--syb-rust)' }} />
          À propos
        </div>

        <h2
          className="reveal font-display font-black mb-12 mx-auto"
          style={{
            fontSize: 'clamp(30px, 4.2vw, 56px)',
            letterSpacing: '-1.5px',
            color: 'var(--syb-ink)',
            lineHeight: 1.15,
            maxWidth: '780px',
          }}
        >
          Une agence locale qui{' '}
          <em className="italic" style={{ fontWeight: 300, color: 'var(--syb-rust)' }}>livre vraiment</em>
          {' '}— du premier échange à la mise en ligne.
        </h2>

        <div
          className="reveal grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          style={{ borderTop: '0.5px solid var(--syb-border)' }}
        >
          {figures.map((f) => (
            <div key={f.label} className="pt-8">
              <div
                className="font-display font-black leading-none mb-2"
                style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: 'var(--syb-rust)' }}
              >
                {f.value}
              </div>
              <div className="text-xs font-light tracking-wide" style={{ color: 'var(--syb-stone)' }}>
                {f.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

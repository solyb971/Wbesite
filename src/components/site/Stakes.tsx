export default function Stakes() {
  return (
    <section
      id="enjeu"
      className="py-24 md:py-28 scroll-mt-20"
      style={{ background: '#F5F2ED' }}
    >
      <div className="max-w-[860px] mx-auto px-6 md:px-12">
        <div className="reveal flex items-center gap-2.5 mb-6 text-xs tracking-[3px] uppercase" style={{ color: 'var(--syb-rust)' }}>
          <span className="w-5 h-px" style={{ background: 'var(--syb-rust)' }} />
          Être visible aujourd&apos;hui
        </div>

        <h2
          className="reveal font-display font-black mb-8"
          style={{ fontSize: 'clamp(28px, 3.8vw, 46px)', letterSpacing: '-1.5px', color: 'var(--syb-ink)', lineHeight: 1.2 }}
        >
          On vous trouve sur Google{' '}
          <em className="italic" style={{ fontWeight: 300, color: 'var(--syb-rust)' }}>
            avant même de passer votre porte.
          </em>
        </h2>

        <p
          className="reveal font-light mb-10"
          style={{ fontSize: '16px', lineHeight: 1.85, color: 'var(--syb-stone)', maxWidth: '620px' }}
        >
          Si votre site n&apos;apparaît pas dans les recherches, c&apos;est le concurrent d&apos;à côté
          qui récupère l&apos;appel. Un site clair, rapide et bien référencé à Pointe-à-Pitre, aux Abymes
          ou à Basse-Terre, c&apos;est ce qui transforme une recherche Google en client.
        </p>

        <div
          className="reveal flex flex-wrap items-center gap-x-6 gap-y-3"
          style={{ borderTop: '0.5px solid var(--syb-border)', paddingTop: '1.5rem' }}
        >
          {['Cherché', 'Trouvé', 'Choisi'].map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <span
                className="font-display font-black"
                style={{ fontSize: '20px', color: 'var(--syb-rust)', letterSpacing: '-0.5px' }}
              >
                0{i + 1}
              </span>
              <span className="font-display font-bold" style={{ fontSize: '18px', color: 'var(--syb-ink)' }}>
                {step}
              </span>
              {i < 2 && <span className="hidden sm:inline" style={{ color: 'var(--syb-stone-light)' }}>→</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

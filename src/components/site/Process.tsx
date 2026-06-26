const steps = [
  { num: "01", title: "Échange découverte", description: "45 minutes pour comprendre votre activité et ce dont vous avez besoin — en visio ou en présentiel à Baie-Mahault.", duration: "Jour 1 · Gratuit" },
  { num: "02", title: "Devis & validation", description: "Un devis clair sous 24h. Vous validez, on démarre.", duration: "Jour 2" },
  { num: "03", title: "Conception & livraison", description: "Design, développement, tests. Vous validez chaque étape avec nous.", duration: "2 à 3 semaines" },
  { num: "04", title: "Support & suivi", description: "1 mois de support inclus après la mise en ligne, pour roder le tout ensemble.", duration: "1 mois inclus" },
]

export default function Process() {
  return (
    <section
      id="process"
      className="py-24 md:py-28 scroll-mt-20"
      style={{ background: '#F5F2ED' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="reveal mb-14">
          <div className="flex items-center gap-2.5 mb-3 text-xs tracking-[3px] uppercase" style={{ color: '#C4472A' }}>
            <span className="w-5 h-px" style={{ background: '#C4472A' }} />
            Méthode
          </div>
          <h2
            className="font-display font-black leading-none mb-5"
            style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-2px', color: '#0E0D0B' }}
          >
            4 étapes,<br />
            <em className="italic" style={{ fontWeight: 300, color: '#C4472A' }}>zéro surprise</em>
          </h2>
          <p className="text-sm font-light leading-relaxed max-w-md" style={{ color: '#7A7268', lineHeight: 1.75 }}>
            Du premier appel à la mise en ligne, vous savez toujours où on en est. Pas de jargon, pas de mauvaise surprise.
          </p>
        </div>

        {/* Steps */}
        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group rounded-xl p-7 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              style={{ background: '#FFFFFF', border: '0.5px solid var(--syb-border)' }}
            >
              {/* Numéro d'étape serif (visuel principal) */}
              <div
                className="font-display font-black leading-none mb-5"
                style={{ fontSize: '44px', color: 'var(--syb-rust)', lineHeight: 1 }}
              >
                {step.num}
              </div>
              <p className="text-sm font-medium mb-2" style={{ color: 'var(--syb-ink)' }}>
                {step.title}
              </p>
              <p className="text-xs font-light leading-relaxed mb-4" style={{ color: 'var(--syb-stone)', lineHeight: 1.65 }}>
                {step.description}
              </p>
              <p className="text-xs" style={{ color: 'var(--syb-rust)' }}>
                {step.duration}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

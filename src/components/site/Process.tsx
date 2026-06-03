const steps = [
  { num: "1", icon: "🤝", title: "Échange découverte", description: "45 minutes pour comprendre votre activité, vos clients et vos objectifs.", duration: "Jour 1 · Gratuit" },
  { num: "2", icon: "📋", title: "Devis & validation",  description: "Devis clair envoyé sous 24h. Vous validez, on commence.",              duration: "Jour 2" },
  { num: "3", icon: "🎨", title: "Conception & livraison", description: "Design, développement, tests. Vous validez chaque étape.",           duration: "2 à 3 semaines" },
  { num: "4", icon: "🛟", title: "Support & suivi",    description: "3 mois de support inclus après la mise en ligne.",                      duration: "3 mois inclus" },
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
            Comment ça marche
          </div>
          <h2
            className="font-display font-black leading-none"
            style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-2px', color: '#0E0D0B' }}
          >
            4 étapes,<br />
            <em className="italic" style={{ fontWeight: 300, color: '#C4472A' }}>zéro surprise</em>
          </h2>
        </div>

        {/* Steps */}
        <div className="reveal grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="group rounded-xl p-7 relative overflow-hidden transition-all duration-250 hover:-translate-y-1"
              style={{
                background: '#FFFFFF',
                border: '0.5px solid #DDD5C8',
              }}
            >
              {/* Ghost number */}
              <div
                className="absolute bottom-[-20px] right-[-10px] font-display font-black pointer-events-none select-none leading-none"
                style={{ fontSize: '100px', color: '#F0E8DC', lineHeight: 1 }}
                aria-hidden
              >
                {step.num}
              </div>

              {/* Content */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-5"
                style={{ background: '#FAF0EC' }}
              >
                {step.icon}
              </div>
              <p className="text-sm font-medium mb-2" style={{ color: '#0E0D0B' }}>
                {step.title}
              </p>
              <p className="text-xs font-light leading-relaxed mb-4" style={{ color: '#7A7268', lineHeight: 1.65 }}>
                {step.description}
              </p>
              <p className="text-xs" style={{ color: '#C4472A' }}>
                {step.duration}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

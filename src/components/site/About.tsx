const values = [
  { title: "Livré en 14 jours", desc: "Délai garanti, pas estimé." },
  { title: "Prix transparents", desc: "Devis détaillé, sans frais cachés." },
  { title: "Support humain",    desc: "Réponse réelle sous 24h." },
  { title: "100% sur mesure",   desc: "Aucun template revendu." },
]

export default function About() {
  return (
    <section
      id="apropos"
      className="py-24 md:py-28 scroll-mt-20"
      style={{ background: '#FFFFFF' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          {/* Photo side */}
          <div className="relative">
            <div
              className="w-full rounded-2xl overflow-hidden"
              style={{
                aspectRatio: '3/4',
                background: 'linear-gradient(135deg, #C8BFB5, #A8A09A)',
                maxHeight: '520px',
              }}
            >
              {/* Warm texture */}
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(ellipse at 40% 30%, rgba(196,71,42,0.12) 0%, transparent 60%)' }}
              />
            </div>
            {/* Tag overlay */}
            <div
              className="absolute bottom-[-16px] right-[-16px] rounded-xl p-4 text-white"
              style={{ background: '#C4472A' }}
            >
              <div className="font-display font-black text-3xl leading-none">5+</div>
              <div className="text-xs font-light opacity-80 mt-0.5">ans d&apos;expérience</div>
            </div>
          </div>

          {/* Content side */}
          <div>
            <div className="flex items-center gap-2.5 mb-5 text-xs tracking-[3px] uppercase" style={{ color: '#C4472A' }}>
              <span className="w-5 h-px" style={{ background: '#C4472A' }} />
              À propos
            </div>
            <h2
              className="font-display font-black leading-none mb-6"
              style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', letterSpacing: '-1.5px', color: '#0E0D0B' }}
            >
              Un studio<br />
              <em className="italic" style={{ fontWeight: 300, color: '#C4472A' }}>guadeloupéen</em>
            </h2>
            <p className="text-sm font-light leading-relaxed mb-4" style={{ color: '#7A7268', lineHeight: 1.85 }}>
              SolYB c&apos;est une agence digitale basée à Baie-Mahault. Pas un intermédiaire : une équipe qui connaît la réalité des entrepreneurs locaux et qui livre des sites qui fonctionnent vraiment.
            </p>
            <p className="text-sm font-light leading-relaxed mb-8" style={{ color: '#7A7268', lineHeight: 1.85 }}>
              Chaque projet est suivi du premier échange à la mise en ligne, avec un interlocuteur unique disponible sous 24h.
            </p>

            {/* Values 2×2 */}
            <div className="grid grid-cols-2 gap-2.5">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-xl p-4"
                  style={{ border: '0.5px solid #DDD5C8' }}
                >
                  <p className="text-xs font-medium mb-1" style={{ color: '#0E0D0B' }}>{v.title}</p>
                  <p className="text-xs font-light leading-relaxed" style={{ color: '#7A7268', lineHeight: 1.5 }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

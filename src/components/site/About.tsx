const values = [
  { title: "Livré en 14 jours", desc: "Délai tenu, pas d'attente de 3 mois pour voir votre site." },
  { title: "Prix transparent",  desc: "Devis détaillé, sans surprise ni frais cachés." },
  { title: "Support humain",    desc: "Un numéro de téléphone, une vraie réponse sous 24h." },
  { title: "100% sur mesure",   desc: "Aucun template revendu. Chaque site est unique." },
]

export default function About() {
  return (
    <section
      id="apropos"
      className="py-20 md:py-28 scroll-mt-20"
      style={{ background: "#F5F2EC" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left — text */}
          <div>
            <p className="text-xs tracking-[3px] uppercase mb-3" style={{ color: "#FF6B47" }}>
              À propos
            </p>
            <h2 className="font-display text-3xl md:text-[2.6rem] font-normal leading-tight text-[#1C1B18] mb-6">
              Une agence <em className="italic" style={{ color: "#FF6B47" }}>locale</em>,<br />
              un interlocuteur direct
            </h2>
            <p className="text-sm font-light leading-relaxed mb-4" style={{ color: "#5A5750" }}>
              SolYB, c&apos;est une agence digitale basée à Baie-Mahault. Pas un intermédiaire, pas une plateforme : une équipe qui comprend la réalité des entrepreneurs guadeloupéens et qui livre des sites qui fonctionnent vraiment.
            </p>
            <p className="text-sm font-light leading-relaxed mb-8" style={{ color: "#5A5750" }}>
              Chaque projet est suivi de A à Z avec un interlocuteur unique — du premier échange à la mise en ligne, et au-delà.
            </p>

            {/* Values 2×2 */}
            <div className="grid grid-cols-2 gap-3">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="rounded-xl p-4"
                  style={{ background: "white", border: "0.5px solid #E2DED6" }}
                >
                  <p className="text-xs font-medium text-[#1C1B18] mb-1">{v.title}</p>
                  <p className="text-xs font-light leading-relaxed" style={{ color: "#5A5750" }}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — founder panel */}
          <div
            className="rounded-2xl p-8"
            style={{ background: "#1C1B18", border: "0.5px solid #2E2D29" }}
          >
            <p className="text-xs tracking-[2px] uppercase mb-5" style={{ color: "#7A7870" }}>
              Fondateur · SolYB
            </p>
            <p className="font-display text-2xl font-normal text-[#F0EDE8] mb-1">
              Yacine Bouhassoun
            </p>
            <p className="text-sm font-light mb-7" style={{ color: "#7A7870" }}>
              Développeur & designer — Guadeloupe
            </p>

            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "5 ans", label: "d'expérience locale" },
                { value: "24h", label: "réponse garantie" },
                { value: "971", label: "ancrage Guadeloupe" },
                { value: "100%", label: "sur-mesure" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-4"
                  style={{ background: "#252420", border: "0.5px solid #2E2D29" }}
                >
                  <p className="font-display text-2xl font-normal text-[#F0EDE8] leading-none">{s.value}</p>
                  <p className="text-xs font-light mt-1" style={{ color: "#5A5750" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

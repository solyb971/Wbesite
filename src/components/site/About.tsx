import CountUp from "@/components/ui/CountUp"

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
            Une île avec autant d&apos;énergie entrepreneuriale mérite une couverture numérique à la
            hauteur — pas des solutions importées, pensées pour des marchés qui n&apos;ont rien à voir
            avec le nôtre.
          </p>
          <p className="font-light" style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--syb-stone)' }}>
            L&apos;IA a rendu la création accessible à tous : des projets naissent en quelques heures,
            mais sans ossature ni vision — de beaux prototypes qui ne tiennent pas six mois. Moi, je
            construis moins vite, mais je construis vrai :{' '}
            <span style={{ color: 'var(--syb-ink)' }}>une vraie réflexion avant la première ligne de code.</span>
          </p>
          <p className="font-light" style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--syb-stone)' }}>
            Sur chaque projet, l&apos;équipe SolYB intervient de bout en bout — design, développement,
            conformité fiscale — avec l&apos;ancrage local qui fait la différence.
          </p>
        </div>

        <div
          className="reveal grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          style={{ borderTop: '0.5px solid var(--syb-border)' }}
        >
          {figures.map((f) => (
            <div key={f.label} className="pt-8">
              <CountUp
                value={f.value}
                className="font-display font-black leading-none mb-2 block"
                style={{ fontSize: 'clamp(32px, 4vw, 52px)', color: 'var(--syb-rust)' }}
              />
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

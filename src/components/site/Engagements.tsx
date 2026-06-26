const engagements = [
  {
    title: "Un seul interlocuteur",
    text: "Vous parlez directement à la personne qui code. Pas d'intermédiaire.",
  },
  {
    title: "Devis clair sous 24h",
    text: "Un prix ferme et détaillé, sans surprise.",
  },
  {
    title: "Paiement en deux fois",
    text: "50 % pour démarrer, 50 % à la livraison.",
  },
  {
    title: "On reste après la livraison",
    text: "Hébergement 1 an et support inclus. On ne disparaît pas une fois le site en ligne.",
  },
]

export default function Engagements() {
  return (
    <section id="engagements" className="py-24 md:py-28 scroll-mt-20" style={{ background: 'var(--syb-warm)' }}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="reveal mb-14 max-w-2xl">
          <div className="flex items-center gap-2.5 mb-3 text-xs tracking-[3px] uppercase" style={{ color: 'var(--syb-rust)' }}>
            <span className="w-5 h-px" style={{ background: 'var(--syb-rust)' }} />
            Pourquoi nous faire confiance
          </div>
          <h2
            className="font-display font-black leading-none"
            style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-2px', color: 'var(--syb-ink)' }}
          >
            Pas de promesses.<br />
            <em className="italic" style={{ fontWeight: 300, color: 'var(--syb-rust)' }}>Des engagements.</em>
          </h2>
        </div>

        <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
          {engagements.map((e, i) => (
            <div key={e.title} className="flex gap-5">
              <span
                className="font-display font-black leading-none flex-shrink-0"
                style={{ fontSize: '28px', color: 'var(--syb-rust)', letterSpacing: '-0.5px' }}
              >
                0{i + 1}
              </span>
              <div>
                <h3 className="font-display font-bold mb-2" style={{ fontSize: '19px', color: 'var(--syb-ink)' }}>
                  {e.title}
                </h3>
                <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--syb-stone)', lineHeight: 1.75 }}>
                  {e.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

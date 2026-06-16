import CountUp from "@/components/ui/CountUp"

const stats = [
  { value: "14j", label: "délai moyen de livraison" },
  { value: "24h", label: "réponse garantie" },
  { value: "3 mois", label: "support inclus" },
  { value: "100%", label: "sur-mesure garanti" },
]

export default function FeatureStats() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ background: '#C4472A' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Title */}
          <div className="reveal">
            <h2
              className="font-display font-black leading-none"
              style={{ fontSize: 'clamp(36px, 4vw, 58px)', color: 'white', letterSpacing: '-2px' }}
            >
              Des chiffres<br />
              <em className="italic" style={{ fontWeight: 300 }}>qui tiennent.</em>
            </h2>
          </div>

          {/* Stats grid */}
          <div className="reveal grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-5"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
              >
                <CountUp
                  value={s.value}
                  className="font-display font-black leading-none mb-1 block"
                  style={{ fontSize: '40px', color: 'white' }}
                />
                <div className="text-xs font-light" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

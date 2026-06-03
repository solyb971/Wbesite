const steps = [
  {
    num: "01",
    title: "Échange découverte",
    description: "On prend 45 minutes pour comprendre votre activité, vos clients et vos objectifs.",
    duration: "Jour 1 · gratuit",
  },
  {
    num: "02",
    title: "Devis & validation",
    description: "Un devis clair et détaillé vous est envoyé sous 24h. Vous validez, on commence.",
    duration: "J+2 · sous 24h",
  },
  {
    num: "03",
    title: "Conception & livraison",
    description: "Design, développement, tests. Vous suivez l'avancement et validez chaque étape.",
    duration: "2 à 3 semaines",
  },
  {
    num: "04",
    title: "Suivi & support",
    description: "3 mois de support inclus après la livraison. Corrections, mises à jour, questions.",
    duration: "3 mois inclus",
  },
]

export default function Process() {
  return (
    <section
      id="process"
      className="py-20 md:py-28 scroll-mt-20"
      style={{ background: "#F5F2EC" }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="reveal mb-10">
          <p className="text-xs tracking-[3px] uppercase mb-3" style={{ color: "#FF6B47" }}>
            Comment ça marche
          </p>
          <h2 className="font-display text-3xl md:text-[2.6rem] font-normal leading-tight text-[#1C1B18]">
            De l&apos;idée au site en<br />
            <em className="italic" style={{ color: "#FF6B47" }}>4 étapes simples</em>
          </h2>
        </div>

        {/* Steps */}
        <div
          className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded-2xl overflow-hidden"
          style={{ border: "0.5px solid #E2DED6" }}
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              className="group p-7 bg-white transition-colors duration-200 hover:bg-[#1C1B18]"
              style={{
                borderRight: i < steps.length - 1 ? "0.5px solid #E2DED6" : "none",
              }}
            >
              <div
                className="font-display text-[3.2rem] font-normal leading-none mb-6 transition-colors duration-200"
                style={{ color: "#E2DED6" }}
              >
                {step.num}
              </div>
              <p
                className="text-sm font-medium mb-2 transition-colors duration-200 group-hover:text-[#F0EDE8]"
                style={{ color: "#1C1B18" }}
              >
                {step.title}
              </p>
              <p
                className="text-xs font-light leading-relaxed mb-4 transition-colors duration-200 group-hover:text-[#7A7870]"
                style={{ color: "#5A5750" }}
              >
                {step.description}
              </p>
              <p
                className="text-xs tracking-wide transition-colors duration-200 group-hover:text-coral"
                style={{ color: "#FF6B47" }}
              >
                {step.duration}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

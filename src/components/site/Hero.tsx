import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center pt-20 pb-20 overflow-hidden"
      style={{ background: "#0A0A0F" }}
    >
      {/* Single warm blob */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%", right: "-5%",
          width: "55vw", height: "55vw",
          maxWidth: "700px", maxHeight: "700px",
          background: "radial-gradient(circle at 40% 40%, rgba(255,107,71,0.11) 0%, transparent 65%)",
          borderRadius: "50%",
          animation: "blobDrift 18s ease-in-out infinite alternate",
        }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full z-10">

        {/* Tag pill */}
        <div
          className="inline-flex items-center gap-2 text-xs tracking-widest uppercase border rounded-full px-4 py-1.5 mb-10"
          style={{
            color: "#9E9A92",
            borderColor: "rgba(255,255,255,0.08)",
            animation: "fadeUp 0.6s 0.1s ease both",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-coral inline-block" />
          Agence digitale · Baie-Mahault · Guadeloupe 971
        </div>

        {/* H1 */}
        <h1
          className="font-display text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[5rem] font-normal leading-[1.08] tracking-tight text-[#F0EDE8] max-w-3xl mb-7"
          style={{ animation: "fadeUp 0.7s 0.25s ease both" }}
          aria-label="Votre entreprise mérite un digital qui lui ressemble"
        >
          Votre entreprise mérite<br />
          un digital qui<br />
          <em className="italic" style={{ color: "#FF6B47" }}>lui ressemble.</em>
        </h1>

        {/* Subtitle */}
        <p
          className="text-base sm:text-lg font-light leading-relaxed max-w-md mb-10"
          style={{ color: "#7A7870", animation: "fadeUp 0.7s 0.4s ease both" }}
        >
          Sites vitrine, e-commerce et applications sur mesure pour les{" "}
          <span style={{ color: "#9E9A92" }}>TPE et PME de Guadeloupe</span>.
          Livré en 2 à 3 semaines.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-14"
          style={{ animation: "fadeUp 0.7s 0.55s ease both" }}
        >
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 bg-coral hover:bg-coral-600 text-white font-medium text-sm px-7 py-3.5 rounded-lg transition-all hover:-translate-y-px"
          >
            Demander un devis gratuit
          </Link>
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm font-light transition-colors"
            style={{ color: "#7A7870" }}
          >
            Voir les services
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats */}
        <div
          className="flex flex-wrap gap-8 sm:gap-12 pt-8"
          style={{
            borderTop: "0.5px solid rgba(255,255,255,0.06)",
            animation: "fadeUp 0.7s 0.7s ease both",
          }}
        >
          {[
            { value: "14 jours", label: "délai moyen" },
            { value: "24h", label: "réponse garantie" },
            { value: "3 mois", label: "support inclus" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span className="font-display text-3xl font-normal text-[#F0EDE8] leading-none">
                {s.value}
              </span>
              <span className="text-xs font-light" style={{ color: "#5A5750" }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

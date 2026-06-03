import { ArrowRight } from "lucide-react"
import Link from "next/link"
import TypewriterWord from "@/components/ui/TypewriterWord"

function SplitLine({
  text,
  delay = 0,
  className = "",
  style,
}: {
  text: string
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  let charCount = 0
  const words = text.split(" ")
  return (
    <span className={`block overflow-hidden ${className}`}>
      <span className="block" style={style}>
        {words.map((word, wi) => {
          const chars = word.split("").map((char, ci) => {
            const d = delay + charCount++ * 30
            return (
              <span key={ci} className="split-char inline-block" style={{ animationDelay: `${d}ms` }} aria-hidden>
                {char}
              </span>
            )
          })
          charCount++ // account for space
          return (
            <span key={wi} className="inline-block whitespace-nowrap">
              {chars}
              {wi < words.length - 1 && <span className="inline-block" aria-hidden>&nbsp;</span>}
            </span>
          )
        })}
      </span>
    </span>
  )
}

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-end pb-24 md:pb-32 overflow-hidden"
      style={{ background: '#0A0A0F' }}
    >
      {/* Animated glow blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            width: '600px', height: '600px',
            left: '10%', top: '30%',
            background: 'rgba(255,107,71,0.22)',
            animation: 'meshFloat 9s ease-in-out infinite alternate',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            width: '500px', height: '500px',
            right: '5%', top: '10%',
            background: 'rgba(245,166,35,0.16)',
            animation: 'meshFloat 12s ease-in-out infinite alternate-reverse',
          }}
        />
        <div
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            width: '400px', height: '400px',
            right: '25%', bottom: '10%',
            background: 'rgba(0,212,170,0.14)',
            animation: 'meshFloat 15s ease-in-out infinite alternate',
          }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#F0EDE8 1px, transparent 1px), linear-gradient(90deg, #F0EDE8 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Decorative vertical bar — desktop only */}
      <div
        className="absolute left-14 top-0 bottom-0 w-px pointer-events-none hidden lg:block"
        style={{
          background: "linear-gradient(to bottom, transparent, #FF6B47 30%, #FF6B47 70%, transparent)",
          opacity: 0.2,
          transformOrigin: "top center",
          animation: "borderGrow 1.2s cubic-bezier(0.16,1,0.3,1) 200ms both",
        }}
      />

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">

        {/* H1 — taille réduite sur mobile */}
        <h1
          className="font-display text-[1.875rem] min-[390px]:text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-8 text-center"
          aria-label="Votre entreprise mérite un digital qui lui ressemble"
        >
          <SplitLine text="Votre entreprise mérite" delay={200} style={{ color: "#F0EDE8" }} />

          <span className="block overflow-hidden" style={{ color: "transparent", WebkitTextStroke: "1.5px #FF6B47" }}>
            <span className="flex justify-center items-baseline">
              <span className="split-char inline-block whitespace-nowrap" style={{ animationDelay: "400ms" }}>u</span>
              <span className="split-char inline-block whitespace-nowrap" style={{ animationDelay: "430ms" }}>n</span>
              <span className="inline-block">&nbsp;</span>
              <TypewriterWord />
            </span>
          </span>

          <SplitLine text="qui lui ressemble" delay={600} style={{ color: "#FF6B47" }} />
        </h1>

        {/* Subtitle */}
        <p className="reveal text-base md:text-xl text-[#8B8B9E] mb-4 max-w-2xl leading-relaxed text-center mx-auto" data-reveal-index="2">
          Nous créons des sites, des outils métier et des solutions digitales pour les entrepreneurs en Guadeloupe.{" "}
          <span className="text-[#F0EDE8] font-medium">Le sérieux d&apos;une agence, la réactivité d&apos;une petite entreprise et la proximité locale.</span>
        </p>
        <p className="reveal text-sm text-[#8B8B9E]/70 mb-8 md:mb-10 text-center" data-reveal-index="3">Basé à Baie-Mahault.</p>

        {/* CTAs */}
        <div className="reveal flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 md:mb-16" data-reveal-index="4">
          <Link
            href="/#services"
            className="inline-flex items-center justify-center bg-coral hover:bg-coral-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all hover:scale-105 shadow-xl shadow-coral/25"
          >
            Découvrir nos services
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center border border-[#2A2A38] hover:border-coral/50 text-[#F0EDE8] hover:text-coral px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all bg-[#13131A]/50 backdrop-blur-sm"
          >
            Audit gratuit
          </Link>
        </div>

        {/* Stats — 1 col mobile, 3 cols sm+ */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 max-w-2xl reveal mx-auto" data-reveal-index="0">
          {[
            { value: "2-3 sem.", label: "Délai livraison" },
            { value: "100%", label: "Sur-mesure" },
            { value: "2026", label: "Factu. élec." },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-[#13131A] border border-[#2A2A38] rounded-xl p-2 sm:p-4 md:p-5 hover:border-coral/30 transition-colors flex flex-col items-center text-center"
            >
              <div className="font-display text-base sm:text-2xl md:text-4xl font-bold text-coral mb-0.5 leading-tight">
                {stat.value}
              </div>
              <div className="text-[0.6rem] sm:text-xs md:text-sm text-[#8B8B9E] leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Trust line */}
        <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 sm:gap-x-4 md:gap-6 text-sm text-[#8B8B9E] reveal" data-reveal-index="1">
          {["Ancré en Guadeloupe", "Devis gratuit sous 24h", "Sans engagement"].map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-turquoise inline-block flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator — sm+ only */}
      <div className="absolute bottom-8 right-8 flex-col items-center gap-2 hidden sm:flex">
        <div className="relative w-px h-12 bg-[#2A2A38] overflow-hidden">
          <div
            className="absolute w-px bg-coral"
            style={{ height: "5px", animation: "scrollDrop 1.8s ease-in-out infinite", top: 0, borderRadius: "2px" }}
          />
        </div>
        <span className="font-display uppercase text-[#8B8B9E]" style={{ fontSize: "0.62rem", letterSpacing: "3px" }}>
          SCROLL
        </span>
      </div>
    </section>
  )
}

import Image from "next/image"
import Link from "next/link"
import { realisations } from "@/lib/realisations-data"

export default function Realisations() {
  return (
    <section
      id="realisations"
      className="py-24 scroll-mt-20 overflow-hidden"
      style={{ background: '#E8DDD0' }}
    >
      {/* Header */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-10">
        <div className="reveal flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-3 text-xs tracking-[3px] uppercase" style={{ color: '#C4472A' }}>
              <span className="w-5 h-px" style={{ background: '#C4472A' }} />
              Réalisations
            </div>
            <h2
              className="font-display font-black leading-none"
              style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-2px', color: '#0E0D0B' }}
            >
              Quelques<br />
              <em className="italic" style={{ fontWeight: 300, color: '#C4472A' }}>projets livrés</em>
            </h2>
          </div>
          <Link
            href="/#contact"
            className="text-sm font-light transition-colors hover:text-[#0E0D0B]"
            style={{ color: '#7A7268' }}
          >
            Démarrer un projet →
          </Link>
        </div>
      </div>

      {/* Horizontal scroll */}
      <div
        className="reveal flex gap-4 overflow-x-auto pb-4 px-6 md:px-12"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {realisations.map((item) => (
          <div
            key={item.id}
            className="flex-shrink-0 rounded-xl overflow-hidden"
            style={{ width: '320px', background: '#FFFFFF', border: '0.5px solid #DDD5C8' }}
          >
            <div className="relative" style={{ height: '200px', background: '#C8BFB5' }}>
              <Image
                src={item.image}
                alt={item.client}
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="p-5">
              <div className="text-xs tracking-[2px] uppercase mb-1.5" style={{ color: '#C4472A' }}>
                {item.sector}
              </div>
              <div className="font-display font-bold text-lg mb-0.5" style={{ color: '#0E0D0B' }}>
                {item.client}
              </div>
              <div className="text-xs font-light" style={{ color: '#7A7268' }}>
                {item.projectType}
              </div>
            </div>
          </div>
        ))}

        {/* Placeholder card */}
        <div
          className="flex-shrink-0 rounded-xl flex flex-col items-center justify-center text-center p-8"
          style={{ width: '320px', background: '#DDD5C8', border: '0.5px dashed #C8BFB5', minHeight: '300px' }}
        >
          <div className="text-2xl mb-3" style={{ color: '#B0A89E' }}>+</div>
          <p className="font-display font-bold text-base mb-1" style={{ color: '#7A7268' }}>Votre projet ici</p>
          <p className="text-xs font-light mb-4" style={{ color: '#B0A89E' }}>Discutons de votre idée</p>
          <Link
            href="/#contact"
            className="text-xs font-light transition-colors hover:text-[#0E0D0B]"
            style={{ color: '#7A7268' }}
          >
            Démarrer →
          </Link>
        </div>
      </div>
    </section>
  )
}

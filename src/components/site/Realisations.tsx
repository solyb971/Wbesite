import Image from "next/image"
import Link from "next/link"
import { ExternalLink, ArrowRight } from "lucide-react"
import { realisations, type Realisation } from "@/lib/realisations-data"

function RealisationCard({ item }: { item: Realisation }) {
  return (
    <div className="bg-[#13131A] border border-[#2A2A38] rounded-2xl overflow-hidden hover:border-[#3A3A48] transition-all duration-300 group flex flex-col card-elevation">
      {/* Screenshot */}
      <div className="relative h-60 overflow-hidden bg-[#0A0A0F] flex-shrink-0">
        <Image
          src={item.image}
          alt={`${item.client} — réalisé par SolYB`}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        {item.url && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#0A0A0F] px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 hover:bg-[#F0EDE8] transition-colors"
            >
              Voir le site
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
        {/* Accent bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          style={{ backgroundColor: item.accentColor }}
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              color: item.accentColor,
              backgroundColor: `${item.accentColor}18`,
              border: `1px solid ${item.accentColor}30`,
            }}
          >
            {item.sector}
          </span>
          <span className="text-xs text-[#8B8B9E]">{item.year}</span>
        </div>

        <h3 className="font-display text-xl font-bold text-[#F0EDE8] mb-0.5">{item.client}</h3>
        <p className="text-sm font-medium mb-4" style={{ color: item.accentColor }}>
          {item.projectType}
        </p>

        <p className="text-sm text-[#8B8B9E] leading-relaxed mb-5 flex-1">{item.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs bg-[#1C1C26] border border-[#2A2A38] text-[#8B8B9E] px-2.5 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function ComingSoonCard() {
  return (
    <div className="bg-[#13131A] border-2 border-dashed border-[#2A2A38] rounded-2xl p-8 flex flex-col items-center justify-center text-center min-h-[420px] hover:border-coral/30 transition-colors group card-elevation">
      <div className="w-16 h-16 rounded-full bg-coral/10 flex items-center justify-center mb-4 group-hover:bg-coral/15 transition-colors">
        <span className="text-2xl font-bold text-coral">+</span>
      </div>
      <h3 className="font-display text-lg font-bold text-[#F0EDE8] mb-2">Votre projet ici</h3>
      <p className="text-sm text-[#8B8B9E] leading-relaxed mb-6 max-w-xs">
        Vous avez un projet digital ? Discutons-en — nous construisons des solutions adaptées à votre réalité terrain.
      </p>
      <Link
        href="/#contact"
        className="inline-flex items-center gap-2 text-sm font-semibold text-coral hover:text-coral/80 transition-colors"
      >
        Démarrer un projet
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  )
}

export default function Realisations() {
  return (
    <section id="realisations" className="py-24 bg-[#0D0D14] scroll-mt-36">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 reveal" data-reveal-index="0">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-[#F0EDE8] mb-4">
            Nos Réalisations
          </h2>
          <p className="text-lg text-[#8B8B9E] max-w-2xl mx-auto">
            Des projets concrets, pensés et construits pour des entrepreneurs qui avancent.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {realisations.map((item, index) => (
            <div key={item.id} className="reveal" data-reveal-index={String(index + 1)}>
              <RealisationCard item={item} />
            </div>
          ))}
          <div className="reveal" data-reveal-index={String(realisations.length + 1)}>
            <ComingSoonCard />
          </div>
        </div>
      </div>
    </section>
  )
}

import Image from "next/image"
import Link from "next/link"
import ParallaxImage from "@/components/ui/ParallaxImage"
import { realisations } from "@/lib/realisations-data"

export default function Realisations() {
  const project = realisations[0]

  return (
    <section
      id="realisations"
      className="py-24 md:py-28 scroll-mt-20 overflow-hidden"
      style={{ background: '#E8DDD0' }}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="reveal mb-12">
          <h2
            className="font-display font-black leading-none"
            style={{ fontSize: 'clamp(36px, 4.5vw, 64px)', letterSpacing: '-2px', color: 'var(--syb-ink)' }}
          >
            Ce qu&apos;on a<br />
            <em className="italic" style={{ fontWeight: 300, color: 'var(--syb-rust)' }}>déjà construit</em>
          </h2>
        </div>

        {/* Étude de cas */}
        <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div
            className="relative rounded-2xl overflow-hidden"
            style={{ aspectRatio: '16/11', background: '#0e0c0a', border: '0.5px solid var(--syb-border)' }}
          >
            <ParallaxImage className="absolute inset-0">
              <Image
                src={project.image}
                alt={project.client}
                fill
                sizes="(min-width: 1024px) 600px, 100vw"
                className="object-cover object-top"
                style={{ transform: 'scale(1.12) translateY(var(--parallax, 0px))' }}
              />
            </ParallaxImage>
          </div>
          <div>
            <div
              className="inline-flex items-center gap-2 text-[11px] tracking-[1.5px] uppercase rounded-full px-3 py-1 mb-4"
              style={{ background: 'rgba(22,163,74,0.08)', border: '0.5px solid rgba(22,163,74,0.3)', color: '#15803D' }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#16A34A' }} />
              Projet réel · en ligne
            </div>
            <div className="text-xs tracking-[2px] uppercase mb-3" style={{ color: 'var(--syb-rust)' }}>
              {project.sector}
            </div>
            <h3
              className="font-display font-bold mb-4"
              style={{ fontSize: 'clamp(26px, 3vw, 38px)', color: 'var(--syb-ink)', lineHeight: 1.05 }}
            >
              {project.client}
            </h3>
            <p className="text-sm font-light leading-relaxed mb-4" style={{ color: 'var(--syb-stone)', lineHeight: 1.8 }}>
              {project.description}
            </p>
            {project.result && (
              <p className="text-sm font-normal leading-relaxed mb-6" style={{ color: 'var(--syb-ink)', lineHeight: 1.8 }}>
                {project.result}
              </p>
            )}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-light rounded-full px-3 py-1"
                  style={{ border: '0.5px solid var(--syb-border)', color: 'var(--syb-stone)' }}
                >
                  {t}
                </span>
              ))}
            </div>
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white text-sm font-normal transition-transform hover:-translate-y-px"
                style={{ background: 'var(--syb-rust)', padding: '12px 26px', borderRadius: '4px' }}
              >
                Voir le projet
              </a>
            )}
          </div>
        </div>

        {/* CTA après l'étude de cas (logique de lecture : on voit le projet, puis on agit) */}
        <div className="reveal mt-12 text-center">
          <Link
            href="/#contact"
            className="cta-arrow inline-flex items-center gap-1.5 text-sm font-light transition-colors hover:text-[#0E0D0B]"
            style={{ color: 'var(--syb-stone)' }}
          >
            Démarrer un projet comme celui-ci <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

import {
  Zap, MapPin, Fingerprint, FileCheck, Code2,
  MessageSquare, ShieldCheck, Globe, GraduationCap, Cpu,
} from "lucide-react"

type Item = { icon: React.ElementType; text: string }

const items: Item[] = [
  { icon: Zap,           text: "Réponse sous 24h" },
  { icon: MapPin,        text: "Ancré en Guadeloupe · 971" },
  { icon: Fingerprint,   text: "100% sur-mesure" },
  { icon: FileCheck,     text: "Facturation électronique 2026" },
  { icon: Code2,         text: "Applications métier" },
  { icon: MessageSquare, text: "Devis gratuit sous 24h" },
  { icon: ShieldCheck,   text: "Conformité DGFiP" },
  { icon: Globe,         text: "SaaS & marketplace" },
  { icon: GraduationCap, text: "Formation incluse" },
  { icon: Cpu,           text: "Basé en Guadeloupe" },
]

function TickerContent() {
  return (
    <span className="flex items-center">
      {items.map((item, i) => {
        const Icon = item.icon
        return (
          <span key={i} className="flex items-center">
            {/* Item */}
            <span className="inline-flex items-center gap-2 px-1">
              <Icon
                className="w-3.5 h-3.5 text-coral/80 flex-shrink-0"
                strokeWidth={1.75}
              />
              <span className="text-[0.78rem] font-semibold tracking-[1.5px] uppercase text-[#F0EDE8]/55">
                {item.text}
              </span>
            </span>
            {/* Separator */}
            <span className="mx-5 text-coral/25 text-xs select-none">—</span>
          </span>
        )
      })}
    </span>
  )
}

export default function Ticker() {
  return (
    <div className="group relative overflow-hidden border-y border-white/[0.05] py-3 bg-[#0D0D14]">
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 w-16 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0D0D14 40%, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 z-10 w-16 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0D0D14 40%, transparent)" }}
      />

      <div className="ticker-track flex whitespace-nowrap select-none group-hover:[animation-play-state:paused]">
        <TickerContent />
        <TickerContent />
      </div>
    </div>
  )
}

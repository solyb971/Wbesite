"use client"

import { useEffect, useRef } from "react"

interface StatDatum {
  value: number
  suffix: string
  label: string
}

const stats: StatDatum[] = [
  { value: 599, suffix: "€", label: "À PARTIR DE" },
  { value: 100, suffix: "%", label: "CLIENTS SATISFAITS" },
  { value: 24, suffix: "H", label: "RÉPONSE GARANTIE" },
]

function easeQuartOut(t: number): number {
  return 1 - Math.pow(1 - t, 4)
}

interface CountUpProps {
  value: number
  suffix: string
}

function CountUp({ value, suffix }: CountUpProps) {
  const spanRef = useRef<HTMLSpanElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const span = spanRef.current
    if (!span) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      span.textContent = `${value}${suffix}`
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || hasRun.current) return
        hasRun.current = true
        observer.disconnect()

        const duration = 1600
        const start = performance.now()

        const tick = (now: number) => {
          const elapsed = now - start
          const progress = Math.min(elapsed / duration, 1)
          const eased = easeQuartOut(progress)
          const current = Math.round(eased * value)
          span.textContent = `${current}${suffix}`
          if (progress < 1) requestAnimationFrame(tick)
        }

        requestAnimationFrame(tick)
      },
      { threshold: 0.5 }
    )

    observer.observe(span)

    return () => {
      observer.disconnect()
    }
  }, [value, suffix])

  return (
    <span
      ref={spanRef}
      className="stat-num font-display text-[3.5rem] sm:text-[4.5rem] leading-none font-bold"
      style={{
        background: "linear-gradient(135deg, #FF6B47 0%, #E03000 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      0{suffix}
    </span>
  )
}

interface StatCardProps {
  stat: StatDatum
  isLast: boolean
  index: number
}

function StatCard({ stat, isLast, index }: StatCardProps) {
  const underlineRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (underlineRef.current) underlineRef.current.style.width = "100%"
  }

  const handleMouseLeave = () => {
    if (underlineRef.current) underlineRef.current.style.width = "0%"
  }

  return (
    <div
      className={`relative px-6 sm:px-10 py-8 sm:py-12 text-center flex flex-col items-center gap-3 reveal ${
        !isLast ? "border-b md:border-b-0 md:border-r border-[#2A2A38]" : ""
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CountUp value={stat.value} suffix={stat.suffix} />
      <p
        className="font-display text-xs tracking-[4px] uppercase font-semibold"
        style={{ color: "#8B8B9E" }}
      >
        {stat.label}
      </p>
      <div
        ref={underlineRef}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 2,
          width: "0%",
          background: "#FF6B47",
          transition: "width 0.5s ease",
        }}
      />
    </div>
  )
}

export default function StatsSection() {
  return (
    <section className="bg-[#0D0D14] border-y border-[#2A2A38]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3">
        {stats.map((stat, i) => (
          <StatCard key={stat.label} stat={stat} isLast={i === stats.length - 1} index={i} />
        ))}
      </div>
    </section>
  )
}

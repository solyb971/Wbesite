'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const RADIUS = 80
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const ENTER_MS = 200
const EXIT_MS = 180

// Logos orange + white existants — bleu/vert/noir via CSS filter
const ALL_LOGOS = [
  {
    name: 'ORANGE', src: '/logo/SYB_orange.svg', glow: '#FF6B47', cssFilter: undefined as string | undefined,
    label: 'SolYB Digital',
    tagline: 'Donnez vie à vos idées & développez la visibilité de votre entreprise',
  },
  {
    name: 'BLEU', src: '/logo/SYB_orange.svg', glow: '#2563EB', cssFilter: 'hue-rotate(200deg) saturate(1.8)',
    label: 'RésaGP by SolYB',
    tagline: 'Développez l\'image et la rentabilité de votre établissement',
  },
  {
    name: 'VERT', src: '/logo/SYB_orange.svg', glow: '#10B981', cssFilter: 'hue-rotate(100deg) saturate(1.5)',
    label: 'FactuGP by SolYB',
    tagline: 'Facturez électroniquement, conformez-vous aux normes légales 2026-2027',
  },
  {
    name: 'BLANC', src: '/logo/SYB_white.svg', glow: '#FFFFFF', cssFilter: undefined as string | undefined,
    label: 'SolYB',
    tagline: '',
  },
  {
    name: 'NOIR', src: '/logo/SYB_orange.svg', glow: '#888888', cssFilter: 'saturate(0) brightness(0.4)',
    label: 'SolYB',
    tagline: '',
  },
]

export interface LogoAnimationProps {
  mode: 'full' | 'quick'
  onComplete: () => void
  isVisible: boolean
}

export default function LogoAnimation({ mode, onComplete, isVisible }: LogoAnimationProps) {
  const [idx, setIdx] = useState(0)
  const [entered, setEntered] = useState(false)
  const [exiting, setExiting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [fadingOut, setFadingOut] = useState(false)

  const logos = mode === 'quick' ? ALL_LOGOS.slice(0, 2) : ALL_LOGOS
  const LOGO_MS = mode === 'full' ? 1400 : 600
  const HOLD_MS = LOGO_MS - ENTER_MS - EXIT_MS

  const activeRef = useRef(false)
  const rafRef = useRef<number | undefined>(undefined)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const push = (fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
  }

  const clearAll = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
  }

  useEffect(() => {
    if (!isVisible) return
    activeRef.current = true

    const runLogo = (logoIdx: number) => {
      if (!activeRef.current) return
      setIdx(logoIdx)
      setProgress(0)
      setExiting(false)
      setEntered(false)

      // Enter — small rAF delay so CSS transition picks up from scale(0.72)
      push(() => { if (activeRef.current) setEntered(true) }, 20)

      // Progress ring via rAF
      push(() => {
        if (!activeRef.current) return
        const start = performance.now()
        const tick = (now: number) => {
          if (!activeRef.current) return
          const p = Math.min((now - start) / HOLD_MS, 1)
          setProgress(p)
          if (p < 1) rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
      }, ENTER_MS)

      // Exit
      push(() => {
        if (!activeRef.current) return
        if (rafRef.current) cancelAnimationFrame(rafRef.current)
        setExiting(true)
        setEntered(false)
      }, ENTER_MS + HOLD_MS)

      // Next logo or fade-out
      push(() => {
        if (!activeRef.current) return
        if (logoIdx + 1 < logos.length) {
          runLogo(logoIdx + 1)
        } else {
          setFadingOut(true)
          push(() => onComplete(), 400)
        }
      }, LOGO_MS)
    }

    runLogo(0)
    return () => { activeRef.current = false; clearAll() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, mode])

  if (!isVisible) return null

  const logo = logos[idx]
  const dashOffset = CIRCUMFERENCE * (1 - progress)
  const logoVisible = entered && !exiting

  return (
    <div
      style={{
        position: 'fixed', inset: 0,
        background: '#0A0A0F',
        zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column',
        opacity: fadingOut ? 0 : 1,
        transition: fadingOut ? 'opacity 0.4s ease' : undefined,
        pointerEvents: fadingOut ? 'none' : 'all',
      }}
    >
      {/* Ring + Logo container */}
      <div style={{ position: 'relative', width: 220, height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

        {/* Background glow blob */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${logo.glow}18 0%, transparent 70%)`,
          opacity: logoVisible ? 1 : 0,
          transition: `opacity ${ENTER_MS}ms ease`,
        }} />

        {/* SVG progress ring */}
        <svg
          width="220" height="220"
          style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)', overflow: 'visible' }}
          aria-hidden="true"
        >
          {/* Track */}
          <circle cx="110" cy="110" r={RADIUS} fill="none" stroke={logo.glow} strokeWidth="1.5" opacity="0.12" />
          {/* Progress arc */}
          <circle
            cx="110" cy="110" r={RADIUS}
            fill="none"
            stroke={logo.glow}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={dashOffset}
            style={{ filter: `drop-shadow(0 0 4px ${logo.glow}90)` }}
          />
        </svg>

        {/* Logo */}
        <div
          style={{
            opacity: logoVisible ? 1 : 0,
            transform: logoVisible
              ? 'scale(1)'
              : exiting ? 'scale(1.1)' : 'scale(0.72)',
            transition: `opacity ${logoVisible ? ENTER_MS : EXIT_MS}ms ease, transform ${logoVisible ? ENTER_MS : EXIT_MS}ms cubic-bezier(0.34,1.56,0.64,1)`,
            filter: logoVisible ? `drop-shadow(0 0 24px ${logo.glow}60)` : undefined,
          }}
        >
          <Image
            src={logo.src}
            alt={`SolYB — ${logo.name}`}
            width={155} height={155}
            priority
            style={{
              width: 'clamp(110px, 18vw, 155px)',
              height: 'auto',
              display: 'block',
              filter: logo.cssFilter,
            }}
          />
        </div>
      </div>

      {/* Product label + tagline */}
      <div
        aria-hidden="true"
        style={{
          margin: '28px 0 0',
          textAlign: 'center',
          opacity: logoVisible ? 1 : 0,
          transition: `opacity ${ENTER_MS}ms ease`,
          padding: '0 2rem',
          maxWidth: 320,
        }}
      >
        <p style={{
          fontSize: '0.85rem',
          fontWeight: 700,
          letterSpacing: '0.06em',
          color: logo.glow,
          fontFamily: 'var(--font-syne, "Georgia", serif)',
          margin: 0,
          lineHeight: 1.2,
        }}>
          {logo.label}
        </p>
        {logo.tagline && (
          <p style={{
            fontSize: '0.62rem',
            letterSpacing: '0.04em',
            color: 'rgba(240,237,232,0.45)',
            fontFamily: 'var(--font-jakarta, system-ui, sans-serif)',
            margin: '6px 0 0',
            lineHeight: 1.55,
          }}>
            {logo.tagline}
          </p>
        )}
      </div>
    </div>
  )
}

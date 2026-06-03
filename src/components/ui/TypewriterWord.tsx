'use client'
import { useEffect, useRef, useState } from 'react'

const TYPE_MS   = 95
const DELETE_MS = 52
const PAUSE_AFTER = 1600
const PAUSE_BW    = 180

type WStyle = 'digital' | 'rayonnement' | 'univers' | 'avenir'

const SEQUENCE: { word: string; style: WStyle }[] = [
  { word: 'Digital',     style: 'digital'     },
  { word: 'Rayonnement', style: 'rayonnement' },
  { word: 'Univers',     style: 'univers'     },
  { word: 'Avenir',      style: 'avenir'      },
]


const CURSOR: Record<WStyle, string> = {
  digital:     '#FF6B47',
  rayonnement: '#F5A623',
  univers:     '#00D4AA',
  avenir:      '#8B5CF6',
}

export default function TypewriterWord() {
  const [text,   setText]  = useState('')
  const [wStyle, setWStyle] = useState<WStyle>('digital')

  const textRef  = useRef('')
  const activeRef = useRef(true)

  useEffect(() => {
    activeRef.current = true

    // ── helpers defined inside effect → stable closures ──────────────────
    const sleep = (ms: number) =>
      new Promise<void>(res => setTimeout(res, ms))

    const typeWord = (word: string, onChar?: (pct: number) => void) =>
      new Promise<void>(res => {
        let i = 0
        const tick = () => {
          if (!activeRef.current) { res(); return }
          setText(word.slice(0, i + 1))
          textRef.current = word.slice(0, i + 1)
          onChar?.(((i + 1) / word.length) * 100)
          i++
          if (i < word.length) setTimeout(tick, TYPE_MS)
          else setTimeout(res, TYPE_MS)
        }
        setTimeout(tick, TYPE_MS)
      })

    const deleteWord = () =>
      new Promise<void>(res => {
        const tick = () => {
          if (!activeRef.current) { res(); return }
          const cur = textRef.current
          if (cur.length === 0) { res(); return }
          const next = cur.slice(0, -1)
          textRef.current = next
          setText(next)
          setTimeout(tick, DELETE_MS)
        }
        tick()
      })

    // ── main loop ────────────────────────────────────────────────────────
    let stopped = false
    const run = async () => {
      await sleep(500)
      while (!stopped) {
        for (const { word, style } of SEQUENCE) {
          if (stopped) return
          setWStyle(style)
          await typeWord(word)

          if (stopped) return
          await sleep(PAUSE_AFTER)
          await deleteWord()
          await sleep(PAUSE_BW)
        }
      }
    }

    run()

    return () => {
      stopped = true
      activeRef.current = false
    }
  }, [])

  // ── visual styles ────────────────────────────────────────────────────
  const base: React.CSSProperties = {
    WebkitTextStroke:    '0px',
    WebkitTextFillColor: 'initial',
    background:          'none',
    textDecoration:      'none',
    borderRadius:        0,
    padding:             0,
    color:               'inherit',
  }

  const getStyle = (): React.CSSProperties => {
    switch (wStyle) {
      case 'digital':
        return { ...base, color: '#FF6B47', WebkitTextFillColor: '#FF6B47' }

      case 'rayonnement':
        return {
          ...base,
          background:          'linear-gradient(90deg,#FF6B47 0%,#F5A623 25%,#00D4AA 55%,#8B5CF6 80%,#FF6B47 100%)',
          backgroundSize:      '300% 100%',
          WebkitBackgroundClip:'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip:      'text',
          animation:           'twGradShift 2.8s linear infinite',
        }

      case 'univers':
        return {
          ...base,
          WebkitTextStroke:    '1.5px #00D4AA',
          WebkitTextFillColor: 'transparent',
          animation:           'twUniversGlow 1.6s ease-in-out infinite alternate',
        }

      case 'avenir':
        return {
          ...base,
          color:               '#F0EDE8',
          WebkitTextFillColor: '#F0EDE8',
          fontStyle:           'italic',
          letterSpacing:       '0.06em',
          textShadow:          '0 0 40px rgba(240,237,232,0.5)',
        }
    }
  }

  return (
    <span
      aria-live="polite"
      aria-label={SEQUENCE.map(s => s.word).join(', ')}
      style={{
        display:       'inline-block',
        position:      'relative',
        verticalAlign: 'baseline',
      }}
    >
      {/* Texte avec style propre au mot courant */}
      <span style={{ position: 'relative', display: 'inline', ...getStyle() }}>
        {text || '​'}

      </span>

      {/* Curseur clignotant — couleur propre à chaque mot */}
      <span
        aria-hidden
        style={{
          display:         'inline-block',
          width:           '2px',
          height:          '0.82em',
          backgroundColor: CURSOR[wStyle],
          marginLeft:      '3px',
          verticalAlign:   'baseline',
          animation:       'typewriterBlink 0.7s step-end infinite',
          transition:      'background-color 0.3s ease',
        }}
      />
    </span>
  )
}

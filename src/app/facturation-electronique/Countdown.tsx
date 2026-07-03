'use client'

import { useEffect, useState } from 'react'
import styles from './facturation.module.css'

const DEADLINE = new Date('2026-09-01T00:00:00')

function useCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = DEADLINE.getTime() - Date.now()
      if (diff <= 0) return
      setT({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) })
    }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
  }, [])
  return t
}

export default function Countdown() {
  const cd = useCountdown()
  const units: [string, number | string][] = [
    ['Jours', cd.d],
    ['Heures', String(cd.h).padStart(2, '0')],
    ['Min', String(cd.m).padStart(2, '0')],
    ['Sec', String(cd.s).padStart(2, '0')],
  ]
  return (
    <div className={styles.countdownTimer}>
      {units.map(([lbl, val]) => (
        <div key={lbl} className={styles.countdownUnit}>
          <span className={styles.countdownNum}>{val}</span>
          <span className={styles.countdownLabel}>{lbl}</span>
        </div>
      ))}
    </div>
  )
}

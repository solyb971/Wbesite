'use client'

import { useEffect, useState } from 'react'
import styles from './resagp.module.css'

export type TableStatus = 'libre' | 'occupee' | 'reservee'

/* Table vue de dessus pour le plan de salle */
function TableTop({ status }: { status: TableStatus }) {
  const cfg = {
    occupee:  { fill: '#7AAFC4',                stroke: 'none',    chair: '#F5EDD8', chairOp: 0.72 },
    reservee: { fill: 'rgba(122,175,196,0.18)', stroke: '#7AAFC4', chair: '#7AAFC4', chairOp: 0.55 },
    libre:    { fill: 'none',                   stroke: '#A89880', chair: '#A89880', chairOp: 0.4 },
  }[status]
  return (
    <svg className={styles.dashTableTop} viewBox="0 0 44 44" fill="none" aria-hidden>
      {[[14, 7], [23, 7], [14, 33], [23, 33]].map(([x, y], i) => (
        <rect className={styles.dashTableRect} key={i} x={x} y={y} width="7" height="4" rx="1.5" fill={cfg.chair} opacity={cfg.chairOp} />
      ))}
      <rect className={styles.dashTableRect} x="12" y="14" width="20" height="16" rx="3" fill={cfg.fill} stroke={cfg.stroke} strokeWidth="1.3" />
    </svg>
  )
}

const INITIAL_TABLES: { n: string; s: TableStatus }[] = [
  { n: 'T1', s: 'libre' }, { n: 'T2', s: 'occupee' }, { n: 'T3', s: 'occupee' },
  { n: 'T4', s: 'reservee' }, { n: 'T5', s: 'libre' }, { n: 'T6', s: 'occupee' },
  { n: 'T7', s: 'reservee' }, { n: 'T8', s: 'occupee' }, { n: 'T9', s: 'libre' },
  { n: 'T10', s: 'occupee' }, { n: 'T11', s: 'reservee' }, { n: 'T12', s: 'occupee' },
]
const NEXT_STATUS: Record<TableStatus, TableStatus> = { libre: 'reservee', reservee: 'occupee', occupee: 'libre' }

export default function PlanDeSalle() {
  const [tables, setTables] = useState(INITIAL_TABLES)

  // Plan de salle vivant : une table change de statut en douceur à chaque tick
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let i = 0
    const id = setInterval(() => {
      setTables((prev) => prev.map((t, idx) => (idx === i % prev.length ? { ...t, s: NEXT_STATUS[t.s] } : t)))
      i++
    }, 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className={styles.dashSalle}>
      {tables.map((t) => (
        <div key={t.n} className={styles.dashTable}>
          <TableTop status={t.s} />
          <span className={styles.dashTableLbl}>{t.n}</span>
        </div>
      ))}
    </div>
  )
}

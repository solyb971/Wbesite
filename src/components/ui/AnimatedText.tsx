'use client'
import React, { useEffect, useRef, useState } from 'react'

interface Props {
  children: string
  as?: keyof React.JSX.IntrinsicElements
  mode?: 'words' | 'lines'
  delay?: number
  className?: string
}

export default function AnimatedText({ children, as: Tag = 'span', mode = 'words', delay = 0, className }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const triggered = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setVisible(true); return }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true
        setTimeout(() => setVisible(true), delay)
        observer.disconnect()
      }
    }, { threshold: 0.15 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  const units = mode === 'words' ? children.split(' ') : children.split('\n')

  return (
    // @ts-ignore
    <Tag ref={ref} className={className} style={{ display: 'block' }}>
      {units.map((unit, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay + i * 25}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay + i * 25}ms`,
          }}
        >
          {unit}{mode === 'words' && i < units.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

'use client'
import { useEffect } from 'react'

export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress')
    if (!bar) return
    const onScroll = () => {
      const s = document.documentElement.scrollTop
      const h = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = (s / h * 100) + '%'
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div id="scroll-progress" />
}

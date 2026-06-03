'use client'
import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number; y: number; vx: number; vy: number
  radius: number; baseOpacity: number; phase: number; phaseSpeed: number
}

export default function ConstellationsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    // Mobile : 20 particules, pas de connexions → économise ~95% du CPU canvas
    const COUNT = isMobile ? 20 : 120
    const particles: Particle[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * (isMobile ? 0.6 : 1.4),
      vy: (Math.random() - 0.5) * (isMobile ? 0.6 : 1.4),
      radius: Math.random() * 2.5 + 1.5,
      baseOpacity: Math.random() * 0.4 + 0.55,
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.012 + Math.random() * 0.02,
    }))

    let mouseX = -9999, mouseY = -9999
    const onMouse = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
    if (!isMobile) window.addEventListener('mousemove', onMouse, { passive: true })

    const CONNECT_DIST = 150
    const MOUSE_REPEL = 100
    let raf: number
    let paused = false

    const onVisibility = () => { paused = document.hidden }
    document.addEventListener('visibilitychange', onVisibility)

    const draw = () => {
      raf = requestAnimationFrame(draw)
      if (paused) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        if (!isMobile) {
          const dx = p.x - mouseX, dy = p.y - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_REPEL && dist > 1) {
            const f = ((MOUSE_REPEL - dist) / MOUSE_REPEL) * 0.25
            p.x += (dx / dist) * f * 4
            p.y += (dy / dist) * f * 4
          }
        }

        p.phase += p.phaseSpeed
        const opacity = p.baseOpacity + Math.sin(p.phase) * 0.25

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 107, 71, ${Math.max(0.15, opacity)})`
        ctx.fill()
      }

      // Connexions uniquement sur desktop (boucle O(n²) trop coûteuse sur mobile)
      if (!isMobile) {
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const d = Math.sqrt(dx * dx + dy * dy)
            if (d < CONNECT_DIST) {
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = `rgba(255, 107, 71, ${(1 - d / CONNECT_DIST) * 0.35})`
              ctx.lineWidth = 0.9
              ctx.stroke()
            }
          }
        }
      }
    }

    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [mounted])

  if (!mounted) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5, opacity: 1 }}
      aria-hidden="true"
    />
  )
}

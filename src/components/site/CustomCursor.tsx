"use client"

import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.style.cursor = "none"

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let rafId = 0
    let started = false

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      dot.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`

      if (!started) {
        started = true
        ringX = mouseX
        ringY = mouseY
        dot.style.opacity = "1"
        ring.style.opacity = "1"
      }
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      ring.style.transform = `translate(${ringX - 19}px, ${ringY - 19}px)`
      rafId = requestAnimationFrame(animate)
    }

    rafId = requestAnimationFrame(animate)
    window.addEventListener("mousemove", onMouseMove)

    const bound = new WeakSet<Element>()

    const bindElement = (el: Element) => {
      if (bound.has(el)) return
      bound.add(el)

      const isMag = el.classList.contains("group") || el.getAttribute("data-cursor") === "card"
      const isBtn =
        el.tagName === "A" ||
        el.tagName === "BUTTON" ||
        el.getAttribute("role") === "button"

      if (!isMag && !isBtn) return

      const addClass = isMag ? "on-mag" : "on-btn"

      el.addEventListener("mouseenter", () => ring.classList.add(addClass))
      el.addEventListener("mouseleave", () => ring.classList.remove(addClass))
    }

    const bindAll = () => {
      document.querySelectorAll('.group, [data-cursor="card"], a, button, [role="button"]').forEach(bindElement)
    }

    bindAll()

    const observer = new MutationObserver(() => bindAll())
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.body.style.cursor = ""
      window.removeEventListener("mousemove", onMouseMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: "#FF6B47",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          willChange: "transform",
        }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 38,
          height: 38,
          borderRadius: "50%",
          border: "1px solid rgba(255,107,71,0.45)",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: 0,
          willChange: "transform",
          transition: "width 0.25s ease, height 0.25s ease, border-color 0.25s ease",
        }}
      />
    </>
  )
}

"use client"

import { useEffect, useRef } from "react"

export default function LiquidWipe() {
  const wipeRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLSpanElement>(null)

  const triggerWipe = (callback?: () => void) => {
    const wipe = wipeRef.current
    const logo = logoRef.current
    if (!wipe) return

    wipe.style.display = "block"
    wipe.style.transition = "none"
    wipe.style.clipPath = "polygon(0 100%, 0 100%, 100% 100%, 100% 100%)"

    void wipe.offsetHeight

    wipe.style.transition = "clip-path 0.5s cubic-bezier(0.76, 0, 0.24, 1)"
    wipe.style.clipPath = "polygon(0 0, 0 100%, 100% 100%, 100% 0)"

    if (logo) {
      setTimeout(() => {
        logo.style.opacity = "1"
      }, 200)
    }

    setTimeout(() => {
      callback?.()

      if (logo) logo.style.opacity = "0"

      void wipe.offsetHeight
      wipe.style.transition = "clip-path 0.5s cubic-bezier(0.76, 0, 0.24, 1)"
      wipe.style.clipPath = "polygon(0 0, 0 0, 100% 0, 100% 0)"

      setTimeout(() => {
        wipe.style.display = "none"
        wipe.style.transition = "none"
        wipe.style.clipPath = "polygon(0 100%, 0 100%, 100% 100%, 100% 100%)"
      }, 520)
    }, 520)
  }

  useEffect(() => {
    ;(window as Window & { __solyb_triggerWipe?: typeof triggerWipe }).__solyb_triggerWipe = triggerWipe

    const isMobile = window.matchMedia("(hover: none)").matches

    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest<HTMLAnchorElement>("a[href*='#']")
      if (!anchor) return

      const href = anchor.getAttribute("href") ?? ""
      const hashIndex = href.indexOf("#")
      if (hashIndex === -1) return

      const id = href.slice(hashIndex + 1)
      if (!id) return

      const target = document.getElementById(id)
      if (!target) return

      if (isMobile) {
        e.preventDefault()
        target.scrollIntoView({ behavior: "smooth" })
        return
      }

      e.preventDefault()
      triggerWipe(() => {
        const stickyHeader = document.querySelector<HTMLElement>("[data-sticky-header]")
        const offset = stickyHeader ? stickyHeader.getBoundingClientRect().height : 120
        const top = target.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: "smooth" })
      })
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
      delete (window as Window & { __solyb_triggerWipe?: typeof triggerWipe }).__solyb_triggerWipe
    }
  }, [])

  return (
    <div
      ref={wipeRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 8000,
        background: "#FF6B47",
        display: "none",
        clipPath: "polygon(0 100%, 0 100%, 100% 100%, 100% 100%)",
      }}
    >
      <span
        ref={logoRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-syne), sans-serif",
          fontSize: "4rem",
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "8px",
          opacity: 0,
          transition: "opacity 0.2s ease",
          userSelect: "none",
        }}
      >
        SolYB
      </span>
    </div>
  )
}

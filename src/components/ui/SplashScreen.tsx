'use client'
import { useEffect, useState } from 'react'
import LogoAnimation from './LogoAnimation'

function removeSplashBlock() {
  const el = document.getElementById('splash-block')
  if (el) el.remove()
}

export default function SplashScreen() {
  const [show, setShow] = useState<boolean | null>(null)

  useEffect(() => {
    // Retire le bloc dès que React monte — l'animation prend le relais
    removeSplashBlock()

    if (sessionStorage.getItem('splash_done')) { setShow(false); return }
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) { setShow(false); return }
    setShow(true)
  }, [])

  const handleComplete = () => {
    sessionStorage.setItem('splash_done', '1')
    removeSplashBlock()
    setShow(false)
    document.body.classList.remove('splash-active')
  }

  if (show === null) return null
  if (!show) return null

  return (
    <LogoAnimation
      mode="full"
      isVisible={show}
      onComplete={handleComplete}
    />
  )
}

'use client'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

interface Options {
  threshold?: number
  once?: boolean
}

export function useScrollReveal(opts: Options = {}) {
  const ref = useRef(null)
  const isInView = useInView(ref, {
    amount: opts.threshold ?? 0.12,
    once:   opts.once      ?? true,
  })
  return { ref, isInView }
}

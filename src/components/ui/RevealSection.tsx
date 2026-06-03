'use client'
import { motion } from 'framer-motion'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { fadeUp, fadeIn, staggerContainer } from '@/lib/animations'
import type { ReactNode } from 'react'

type Variant = 'fadeUp' | 'fadeIn' | 'stagger'

interface Props {
  children: ReactNode
  className?: string
  variant?: Variant
  delay?: number
  threshold?: number
}

const VARIANTS = { fadeUp, fadeIn, stagger: staggerContainer }

export function RevealSection({
  children,
  className,
  variant = 'fadeUp',
  delay = 0,
  threshold,
}: Props) {
  const { ref, isInView } = useScrollReveal({ threshold })

  return (
    <motion.div
      ref={ref}
      variants={VARIANTS[variant]}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={className}
      custom={delay}
    >
      {children}
    </motion.div>
  )
}

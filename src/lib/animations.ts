import type { Variants } from 'framer-motion'

// ── Fade-up (usage principal — sections au scroll) ───────────────────────────
export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

// ── Fade simple (titres de section) ─────────────────────────────────────────
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.55, ease: 'easeOut' } },
}

// ── Fade depuis la gauche ────────────────────────────────────────────────────
export const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

// ── Fade depuis la droite ────────────────────────────────────────────────────
export const fadeRight: Variants = {
  hidden:  { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

// ── Conteneur stagger (grilles de cartes) ────────────────────────────────────
export const staggerContainer: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

// ── Item de grille (utilisé avec staggerContainer) ───────────────────────────
export const staggerItem: Variants = {
  hidden:  { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

// ── Stagger item horizontal (features inline) ────────────────────────────────
export const staggerItemX: Variants = {
  hidden:  { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

// ── Pop d'entrée (badges, tags, CTA) ─────────────────────────────────────────
export const popIn: Variants = {
  hidden:  { opacity: 0, scale: 0.82 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] } },
}

// ── Flottement en boucle (éléments décoratifs) ───────────────────────────────
export const floatLoop: Variants = {
  animate: {
    y: [0, -10, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
  },
}

// ── Helpers mobile : réduit l'amplitude sur petit écran ─────────────────────
export function mobileFadeUp(isMobile: boolean): Variants {
  return {
    hidden:  { opacity: 0, y: isMobile ? 18 : 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  }
}

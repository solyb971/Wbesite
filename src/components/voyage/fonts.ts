import { Bricolage_Grotesque, Hanken_Grotesk, Instrument_Serif } from "next/font/google"

/**
 * Polices de l'accueil, auto-hébergées par next/font et exposées en variables
 * CSS (reprises par --font-display, --font-accent et --font-body dans voyage.css).
 * Chargées sur l'accueil seulement : le reste du site garde les siennes.
 */

/** Titres : fonte variable, avec la largeur (wdth) et la taille optique (opsz). */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "wdth"],
  variable: "--font-bricolage",
})

/** Partie en italique des titres. */
const instrument = Instrument_Serif({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
  style: "italic",
  variable: "--font-instrument",
})

/** Texte courant. */
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-hanken",
})

export const voyageFonts = `${bricolage.variable} ${instrument.variable} ${hanken.variable}`

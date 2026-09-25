"use client"

import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin"
import { MotionPathPlugin } from "gsap/MotionPathPlugin"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"
import Lenis from "lenis"
import { AILES, BASSE_TERRE, GRANDE_TERRE } from "../guadeloupe"
import { creerAmbiances } from "./ambiances"
import { genererDecor } from "./decor"
import { activerGlisser } from "./glisser"

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, MorphSVGPlugin, MotionPathPlugin)

/**
 * Chorégraphie de l'accueil, portée de la maquette (docs/refonte/solyb-reference.html)
 * sans en changer les valeurs ni l'ordre. Le contenu est déjà rendu par le serveur :
 * ce composant ne fait que l'animer, et tout est défait au démontage (useGSAP pour
 * GSAP, SplitText et les épinglages ; la liste « defaire » pour le reste).
 *
 * L'ordre compte : épinglages (réalisations, final) avant les déclencheurs qui
 * dépendent de leur position, puis ScrollTrigger.sort() et refresh().
 */
export default function VoyageController() {
  useGSAP((_context, contextSafe) => {
    const root = document.querySelector<HTMLElement>(".voyage")
    if (!root || !contextSafe) return
    const defaire: Array<() => void> = []
    let vivant = true

    // Les polices sont attendues avant tout découpage de texte (SplitText mesure
    // les lignes) ; le rendu, lui, n'attend rien.
    document.fonts.ready.then(
      contextSafe(() => {
        if (vivant) mettreEnScene(root, defaire)
      })
    )

    return () => {
      vivant = false
      defaire.splice(0).reverse().forEach((f) => f())
    }
  })
  return null
}

function mettreEnScene(root: HTMLElement, defaire: Array<() => void>) {
  const $ = <T extends Element = HTMLElement>(s: string) => root.querySelector<T>(s)
  const $$ = <T extends Element = HTMLElement>(s: string) => Array.from(root.querySelectorAll<T>(s))
  const ecouter = <K extends keyof WindowEventMap>(type: K, fn: (e: WindowEventMap[K]) => void) => {
    window.addEventListener(type, fn)
    defaire.push(() => window.removeEventListener(type, fn))
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

  /* ---------- Éléments générés du décor ---------- */
  defaire.push(genererDecor(root))

  const scenes = $$(".scene")
  const chapters = $$("[data-scene]")
  const dots = $$<HTMLButtonElement>(".rail button")
  const firstOf = scenes.map((_, i) => chapters.find((c) => Number(c.dataset.scene) === i)!)

  // Sous 700 px, les paysages se cadrent sur leur droite (le volcan, les palmiers).
  const cadrer = () =>
    $$<SVGSVGElement>(".scene svg").forEach((s) =>
      s.setAttribute("preserveAspectRatio", window.innerWidth < 700 ? "xMaxYMax slice" : "xMidYMax slice")
    )
  cadrer()
  ecouter("resize", cadrer)
  const label = (i: number) => dots.forEach((d, k) => d.classList.toggle("on", k === i))

  gsap.set(scenes, { autoAlpha: 0 })
  gsap.set(scenes[0], { autoAlpha: 1 })
  const layers = (s: Element) =>
    Array.from(s.querySelectorAll<HTMLElement>(".L")).map((l) => ({ el: l.firstElementChild!, d: Number(l.dataset.d) }))

  /* ---------- Vie des paysages ---------- */
  const ambient = creerAmbiances(scenes, reduce)

  /* ---------- Passage d'un paysage à l'autre ---------- */
  let cur = 0
  function goTo(i: number) {
    if (i === cur) return
    const out = scenes[cur]
    const inn = scenes[i]
    const dir = i > cur ? 1 : -1
    ambient[cur].pause()
    ambient[i].play()
    cur = i
    label(i)
    gsap.killTweensOf(scenes)
    scenes.forEach((s) => {
      if (s !== out && s !== inn) gsap.set(s, { autoAlpha: 0, zIndex: 0 })
    })
    gsap.set(out, { zIndex: 1, autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)" })
    gsap.set(inn, { autoAlpha: 1, zIndex: 2 })
    if (reduce) {
      gsap.fromTo(inn, { opacity: 0 }, { opacity: 1, duration: 0.5 })
      gsap.set(out, { autoAlpha: 0, delay: 0.5 })
      return
    }
    gsap.fromTo(
      inn,
      { clipPath: dir > 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.25, ease: "expo.inOut" }
    )
    layers(inn).forEach(({ el, d }) => {
      if (d) gsap.fromTo(el, { y: 30 + d * 70 }, { y: 0, duration: 1.7, ease: "expo.out", delay: 0.15 + d * 0.06 })
    })
    layers(out).forEach(({ el, d }) => {
      if (d) gsap.to(el, { y: d * 40, duration: 1.25, ease: "expo.inOut", onComplete: () => void gsap.set(el, { y: 0 }) })
    })
    gsap.set(out, { autoAlpha: 0, delay: 1.25 })
  }

  /* ---------- Défilement ---------- */
  const lenis = reduce ? null : new Lenis({ lerp: 0.085 })
  if (lenis) {
    lenis.on("scroll", ScrollTrigger.update)
    const raf = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
    defaire.push(() => {
      gsap.ticker.remove(raf)
      gsap.ticker.lagSmoothing(500, 33)
      lenis.destroy()
    })
  }
  // Lenis 1.3 retranche le scroll-padding-top de la page (90 px, prévu pour les
  // sauts natifs) ; la maquette, en Lenis 1.1, posait la section pile en haut de
  // l'écran. On le rajoute pour retrouver ce cadrage : une section, un écran.
  const scrollPadding = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
  const scrollTo = (t: HTMLElement) =>
    lenis
      ? lenis.scrollTo(t, { offset: scrollPadding(), duration: 1.8 })
      : t.scrollIntoView({ behavior: reduce ? "auto" : "smooth" })

  $$<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    const aller = (e: MouseEvent) => {
      const id = a.getAttribute("href")!
      const t = id === "#top" ? document.body : document.querySelector<HTMLElement>(id)
      if (!t) return
      e.preventDefault()
      scrollTo(t)
    }
    a.addEventListener("click", aller)
    defaire.push(() => a.removeEventListener("click", aller))
  })
  dots.forEach((d, i) => {
    const aller = () => scrollTo(firstOf[i])
    d.addEventListener("click", aller)
    defaire.push(() => d.removeEventListener("click", aller))
  })
  gsap.set(".nav", { xPercent: -50, x: 0 })

  // Onglet caché : plus rien ne tourne.
  const visibilite = () => (document.hidden ? gsap.ticker.sleep() : gsap.ticker.wake())
  document.addEventListener("visibilitychange", visibilite)
  defaire.push(() => document.removeEventListener("visibilitychange", visibilite))

  /* Glisser la page à la main (souris uniquement) */
  if (window.matchMedia("(pointer:fine)").matches && !reduce) defaire.push(activerGlisser(lenis))

  /* 1. Réalisations : défilement horizontal, le paysage glisse avec */
  const work = $(".work")!
  const track = work.querySelector<HTMLElement>(".track")!
  const countNow = work.querySelector(".count-now")!
  const projs = Array.from(track.querySelectorAll<HTMLElement>(".proj"))
  const beach = Array.from(scenes[1].querySelectorAll<HTMLElement>(".L")).map((l) => ({ el: l, d: Number(l.dataset.d) }))
  if (!reduce) {
    work.classList.add("is-pinned")
    defaire.push(() => work.classList.remove("is-pinned"))
    gsap.set(scenes[1].querySelector("svg"), { scale: 1.1, transformOrigin: "50% 100%" })
    const dist = () => track.scrollWidth - window.innerWidth
    const horiz = gsap.to(track, {
      x: () => -dist(),
      ease: "none",
      scrollTrigger: {
        trigger: work,
        pin: true,
        scrub: 1,
        end: () => "+=" + dist(),
        invalidateOnRefresh: true,
        onUpdate: (s) => {
          beach.forEach((o) => gsap.set(o.el, { x: -(s.progress - 0.5) * o.d * 36 }))
          const c = projs.filter((p) => p.getBoundingClientRect().left < window.innerWidth * 0.6).length
          countNow.textContent = String(Math.max(1, c))
        },
      },
    })
    projs.forEach((p) => {
      gsap.from(p.querySelector(".browser"), {
        rotate: -4,
        y: 40,
        scale: 0.92,
        ease: "none",
        scrollTrigger: { trigger: p, containerAnimation: horiz, start: "left 95%", end: "left 45%", scrub: true },
      })
      gsap.from(p.querySelectorAll(".tags,h3,p,ul,.link"), {
        x: 60,
        opacity: 0,
        stagger: 0.05,
        ease: "none",
        scrollTrigger: { trigger: p, containerAnimation: horiz, start: "left 85%", end: "left 40%", scrub: true },
      })
    })
  }

  /* 2. Final : le papillon s'envole puis devient la Guadeloupe */
  const fin = $(".finale")!
  const gp = fin.querySelector<SVGSVGElement>(".gp")!
  if (!reduce) {
    // Le serveur a rendu la carte ; le vol repart du papillon.
    const aileG = gp.querySelector(".w-l")!
    const aileD = gp.querySelector(".w-r")!
    aileG.setAttribute("d", AILES.gauche)
    aileD.setAttribute("d", AILES.droite)
    gp.classList.remove("is-map")
    defaire.push(() => {
      aileG.setAttribute("d", BASSE_TERRE)
      aileD.setAttribute("d", GRANDE_TERRE)
      gp.classList.add("is-map")
    })

    gsap.set(".isles path", { scale: 0, opacity: 0, transformOrigin: "50% 50%" })
    gsap.set(".finale-text > h2,.finale-text > p", { y: 30, opacity: 0 })
    const ring = $<SVGCircleElement>(".lm-ring")!
    const rl = ring.getTotalLength()
    gsap.set(ring, { strokeDasharray: rl, strokeDashoffset: rl })
    gsap.set(".lm-img", { scale: 0, opacity: 0, transformOrigin: "50% 50%" })
    gsap.set(".sign-name > span", { opacity: 0 })
    gsap.set(".caret", { opacity: 0 })
    // Le néon respire, seulement quand le final est à l'écran.
    const halo = gsap.to(".halo2", { attr: { stdDeviation: 20 }, duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1, paused: true })
    const nq = SplitText.create(".next-q", { type: "words", mask: "words" })
    gsap.set(nq.words, { yPercent: 110 })
    gsap.set(".next-arrow", { opacity: 0, y: -20 })
    const vw = () => window.innerWidth
    const vh = () => window.innerHeight
    const ft = gsap.timeline({
      scrollTrigger: { trigger: fin, pin: true, scrub: 1, start: "top top", end: "+=320%", invalidateOnRefresh: true },
    })
    ft.set(gp, { x: () => -vw() * 0.5, y: () => vh() * 0.55, scale: 0.28, rotation: -30 }, 0)
      .to(
        gp,
        {
          duration: 5,
          ease: "power1.inOut",
          scale: 1,
          rotation: 0,
          motionPath: {
            path: [
              { x: -vw() * 0.25, y: -vh() * 0.05 },
              { x: vw() * 0.15, y: vh() * 0.2 },
              { x: vw() * 0.2, y: -vh() * 0.2 },
              { x: -vw() * 0.05, y: -vh() * 0.08 },
              { x: 0, y: 0 },
            ],
            curviness: 1.3,
          },
        },
        0.001
      )
      .to(".wings", { scaleX: 0.22, svgOrigin: "200 215", duration: 0.25, repeat: 19, yoyo: true, ease: "sine.inOut" }, 0)
      .to(".body,.spots", { opacity: 0, duration: 0.6 }, 5.1)
      .to(".w-l", { morphSVG: { shape: BASSE_TERRE, type: "rotational" }, duration: 1.6, ease: "power2.inOut" }, 5.2)
      .to(".w-r", { morphSVG: { shape: GRANDE_TERRE, type: "rotational" }, duration: 1.6, ease: "power2.inOut" }, 5.2)
      .to(".isles path", { scale: 1, opacity: 1, stagger: 0.15, duration: 0.6, ease: "back.out(2)" }, 6.7)
      .to(ring, { strokeDashoffset: 0, duration: 0.6, ease: "power2.inOut" }, 6.9)
      // Le vrai logo prend la place du rond et du « SYB » provisoires : même instant,
      // même léger rebond.
      .to(".lm-img", { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2.2)" }, 7.3)
      .to(".caret", { opacity: 1, duration: 0.05 }, 7.55)
      .to(".sign-name > span", { opacity: 1, duration: 0.02, stagger: 0.12 }, 7.6)
      .to(".finale-text > h2,.finale-text > p", { y: 0, opacity: 1, stagger: 0.15, duration: 0.6 }, 8.3)
      .to(nq.words, { yPercent: 0, stagger: 0.12, duration: 0.7, ease: "expo.out" }, 8.8)
      .to(".next-arrow", { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" }, 9.4)
      .to({}, { duration: 0.9 })
    ScrollTrigger.create({
      trigger: fin.parentElement ?? fin,
      start: "top bottom",
      end: "bottom top",
      onToggle: (s) => (s.isActive ? halo.play() : halo.pause()),
    })
  }

  /* 3. Changement de paysage par chapitre (créé après les épinglages) */
  // Le paysage se déduit de la position de défilement : juste même après un saut
  // d'ancre, un défilement rapide ou dans une section épinglée.
  const chTs = chapters.map((c) =>
    ScrollTrigger.create({ trigger: c.parentElement?.classList.contains("pin-spacer") ? c.parentElement : c, start: "top 55%" })
  )
  let plainOn = false
  const syncScene = (y: number) => {
    let idx = 0
    chTs.forEach((t, i) => {
      if (y >= t.start) idx = i
    })
    goTo(Number(chapters[idx].dataset.scene))
    const pl = chapters[idx].classList.contains("plain")
    if (pl !== plainOn) {
      plainOn = pl
      gsap.to(".rail", { autoAlpha: pl ? 0 : 1, duration: 0.4 })
    }
  }
  ScrollTrigger.create({ start: 0, end: "max", onUpdate: (s) => syncScene(s.scroll()), onRefresh: (s) => syncScene(s.scroll()) })

  /* Parallaxe verticale légère dans un paysage */
  if (!reduce) {
    const setters = scenes.map((s) =>
      Array.from(s.querySelectorAll<HTMLElement>(".L")).map((l) => ({
        set: gsap.quickTo(l, "y", { duration: 0.8, ease: "power3" }),
        d: Number(l.dataset.d),
      }))
    )
    let tops: number[] = []
    const measure = () => {
      tops = firstOf.map((c) => c.getBoundingClientRect().top + window.scrollY)
    }
    ScrollTrigger.addEventListener("refresh", measure)
    defaire.push(() => ScrollTrigger.removeEventListener("refresh", measure))
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: () => {
        const off = gsap.utils.clamp(0, 1.5, (window.scrollY - (tops[cur] || 0)) / window.innerHeight)
        if (cur !== 1) setters[cur].forEach((o) => o.set(off * o.d * 16))
      },
    })

    $$(".chapter .card,footer .card").forEach((c) =>
      gsap.from(c, {
        y: 70,
        opacity: 0,
        rotate: c.closest("footer") ? 0 : -1.2,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: c, start: "top 88%", toggleActions: "play none none reverse" },
      })
    )
    $$(".chapter .card h2").forEach((h) => {
      const sp = SplitText.create(h, { type: "lines", mask: "lines" })
      gsap.from(sp.lines, {
        yPercent: 105,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        delay: 0.15,
        scrollTrigger: { trigger: h, start: "top 88%", toggleActions: "play none none reverse" },
      })
    })

    const h1 = SplitText.create(".hero h1", { type: "words", mask: "words" })
    const intro = gsap.timeline({ defaults: { ease: "expo.out" } })
    layers(scenes[0]).forEach(({ el, d }) => {
      if (d) intro.from(el, { y: 120 + d * 80, duration: 1.8 }, d * 0.12)
    })
    intro
      .from(h1.words, { yPercent: 120, duration: 1.1, stagger: 0.06 }, 0.5)
      .from(".hero-in", { y: 24, opacity: 0, stagger: 0.1, duration: 1 }, 0.8)
      .from(".nav,.rail", { y: -20, opacity: 0, stagger: 0.1, duration: 1 }, 0.9)
      .add(() => void ambient[0].play(), 0.8)
  } else ambient[0].play()

  ScrollTrigger.sort()
  ScrollTrigger.refresh()
}

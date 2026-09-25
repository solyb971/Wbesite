import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

/**
 * Défilement consacré à chaque chapitre, en hauteurs d'écran. La cascade d'entrée
 * du chapitre le plus long (Deshaies : trait, barres, chute) dure environ 3 s ;
 * 0,7 écran la laisse se jouer à un rythme de lecture sans allonger la page
 * outre mesure (3,5 écrans pour les cinq, contre 4,25 dans la maquette).
 */
const PAR_CHAPITRE = 0.7

/**
 * « L'histoire » en scène (components/voyage/Histoire.tsx) : la section se fige,
 * un seul chapitre à l'écran, choisi par la progression du défilement ; chaque
 * entrée rejoue sa cascade et ses effets. Pendant ce temps, le soleil du couchant
 * descend sous l'horizon et le ciel passe au crépuscule.
 *
 * Lecture classique (rien n'est touché) en mouvement réduit, ou si la carte ne
 * tient pas dans l'écran ; c'est remesuré au redimensionnement. Renvoie la
 * fonction qui défait tout.
 */
export function animerHistoire(section: HTMLElement): () => void {
  const mouvementReduit = window.matchMedia("(prefers-reduced-motion: reduce)")
  const carte = section.querySelector<HTMLElement>(".histoire-card")
  const zone = section.querySelector<HTMLElement>(".h-chaps")
  if (!carte || !zone) return () => {}
  const chaps = Array.from(section.querySelectorAll<HTMLElement>(".h-chap"))
  const n = chaps.length

  let ctx: gsap.Context | null = null
  let pin: ScrollTrigger | null = null
  let cascades: gsap.core.Timeline[] = []
  const sorties: Array<gsap.core.Tween | undefined> = []
  let courant = -1
  let entree = false

  const indice = (p: number) => Math.min(n - 1, Math.floor(p * n))

  // Écran tactile : un lancer du doigt parcourt facilement plus d'un chapitre, qui
  // serait alors sauté. Chaque geste avance donc d'un chapitre au plus, et la page
  // se pose au milieu de celui-ci une fois le défilement arrêté. Un glisser lent,
  // doigt posé, reste libre ; on sort de la scène par le haut ou le bas sans frein.
  // Seul l'élan qui suit un geste est concerné (inertie), pas un défilement par lien.
  const tactile = window.matchMedia("(pointer: coarse)").matches
  let inertie = false
  let depart = -1
  let departGeste = -1
  let yGeste = 0
  const chapitreActuel = () => (!pin || pin.isActive ? courant : pin.progress <= 0 ? -1 : n)
  const borner = (i: number) => Math.max(0, Math.min(n - 1, Math.max(depart - 1, Math.min(depart + 1, i))))
  const aimanter = (v: number) => {
    if (!inertie) return v
    const i = borner(indice(v))
    if ((i === 0 && v < 0.5 / n) || (i === n - 1 && v > (n - 0.5) / n)) return v
    return (i + 0.5) / n
  }
  const surToucher = () => {
    inertie = false
    departGeste = chapitreActuel()
    yGeste = window.scrollY
  }
  const surLacher = () => {
    const tranche = pin ? (pin.end - pin.start) / n : Infinity
    depart = Math.abs(window.scrollY - yGeste) < tranche / 2 ? departGeste : chapitreActuel()
    inertie = true
  }

  const afficher = (i: number) => {
    if (i === courant || !ctx) return
    const sens = i > courant ? 1 : -1
    const avant = courant
    courant = i
    chaps.forEach((c, k) => (k === i ? c.removeAttribute("aria-hidden") : c.setAttribute("aria-hidden", "true")))
    ctx.add(() => {
      if (avant >= 0) {
        const c = chaps[avant]
        sorties[avant] = gsap.to(c, {
          autoAlpha: 0,
          y: -40 * sens,
          duration: 0.35,
          ease: "power2.in",
          overwrite: true,
          onComplete: () => void cascades[avant].pause(0),
        })
      }
      if (i >= 0) {
        sorties[i]?.kill()
        gsap.fromTo(
          chaps[i],
          { autoAlpha: 0, y: 50 * sens },
          { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out", delay: avant >= 0 ? 0.35 : 0, overwrite: true }
        )
        cascades[i].restart()
      }
    })
  }

  // Entrée d'un chapitre : ses éléments en cascade (data-t pour caler un élément
  // dans le temps), puis l'effet qui lui est propre.
  const cascade = (chap: HTMLElement) => {
    const tl = gsap.timeline({ paused: true, defaults: { ease: "expo.out" } })
    chap.querySelectorAll<HTMLElement>(".h-rv").forEach((el, j) => {
      const t = el.dataset.t ? Number(el.dataset.t) : j * 0.12
      tl.fromTo(el, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.9 }, 0.3 + t)
    })
    const invisible = chap.querySelector(".h-invisible")
    if (invisible)
      tl.fromTo(invisible, { opacity: 1, filter: "blur(0px)" }, { opacity: 0.2, filter: "blur(3px)", duration: 1.1, ease: "sine.inOut" }, 1.1)
    const trait = chap.querySelector(".h-souligne i")
    if (trait) tl.fromTo(trait, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 1.1)
    const barres = chap.querySelectorAll(".h-track i")
    if (barres.length) tl.fromTo(barres, { scaleX: 0 }, { scaleX: 1, duration: 1.3, stagger: 0.55 }, 1.2)
    const chiffre = chap.querySelector(".h-big")
    if (chiffre) tl.fromTo(chiffre, { scale: 0.86 }, { scale: 1, duration: 1.4 }, 0.3)
    return tl
  }

  // Le couchant suit le récit : soleil qui descend, ciel qui s'assombrit.
  const coucherDeSoleil = () => {
    const tl = gsap.timeline({ paused: true, defaults: { ease: "none" } })
    const scene = document.querySelector('.scene[data-paysage="couchant"]')
    if (!scene) return tl
    const soleil = scene.querySelector(".e-sun")
    const ciel = scene.querySelectorAll("linearGradient#eSky stop")
    const reflets = scene.querySelector(".glints")
    // Le soleil passe à droite de la carte (qui le cacherait à sa place d'origine),
    // ses reflets avec lui.
    if (soleil)
      tl.fromTo(soleil, { attr: { cx: 1320, cy: 440 }, fill: "#FFE39A" }, { attr: { cx: 1320, cy: 650 }, fill: "#F59A5C" }, 0)
    if (ciel[1]) tl.fromTo(ciel[1], { attr: { offset: 0.45 } }, { attr: { offset: 0.7 } }, 0)
    if (ciel[2]) tl.fromTo(ciel[2], { attr: { offset: 0.62 } }, { attr: { offset: 0.9 } }, 0)
    if (reflets) tl.fromTo(reflets, { x: 170, opacity: 1 }, { x: 170, opacity: 0.3 }, 0)
    return tl
  }

  const railDuSite = () => document.querySelector<HTMLElement>(".voyage .rail")

  const monter = () => {
    section.classList.add("is-pinned")
    zone.style.removeProperty("--h-chaps")
    const haut = Math.ceil(Math.max(...chaps.map((c) => c.scrollHeight)))
    zone.style.setProperty("--h-chaps", `${haut}px`)
    const s = getComputedStyle(section)
    const dispo = window.innerHeight - parseFloat(s.paddingTop) - parseFloat(s.paddingBottom)
    if (carte.offsetHeight > dispo) {
      section.classList.remove("is-pinned")
      zone.style.removeProperty("--h-chaps")
      return
    }
    ctx = gsap.context(() => {
      gsap.set(chaps, { autoAlpha: 0 })
      cascades = chaps.map(cascade)
      pin = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: () => `+=${Math.round(n * PAR_CHAPITRE * window.innerHeight)}`,
        pin: true,
        animation: coucherDeSoleil(),
        scrub: 1,
        snap: tactile
          ? {
              snapTo: aimanter,
              duration: { min: 0.3, max: 0.7 },
              delay: 0.05,
              ease: "power2.out",
              inertia: false,
              onComplete: () => void (inertie = false),
            }
          : undefined,
        invalidateOnRefresh: true,
        onUpdate: (st) => {
          section.classList.toggle("is-started", st.progress > 0.02)
          if (entree) afficher(inertie ? borner(indice(st.progress)) : indice(st.progress))
        },
        // La colonne de points du site s'efface le temps de la scène : le récit se
        // découvre sans indicateur de progression.
        onToggle: (st) => {
          if (!st.isActive) inertie = false
          const r = railDuSite()
          if (r) gsap.to(r, { autoAlpha: st.isActive ? 0 : 1, duration: 0.4, overwrite: "auto" })
        },
      })
      // Le premier chapitre se montre dès que la carte arrive, avant que la section se fige.
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        onEnter: () => {
          entree = true
          afficher(indice(pin?.progress ?? 0))
        },
        onLeaveBack: () => {
          entree = false
          afficher(-1)
        },
      })
    }, section)
  }

  const demonter = () => {
    const r = railDuSite()
    if (pin?.isActive && r) gsap.set(r, { autoAlpha: 1 })
    ctx?.revert()
    ctx = null
    pin = null
    cascades = []
    sorties.length = 0
    courant = -1
    entree = false
    section.classList.remove("is-pinned", "is-started")
    zone.style.removeProperty("--h-chaps")
    chaps.forEach((c) => c.removeAttribute("aria-hidden"))
  }

  const construire = () => {
    demonter()
    if (!mouvementReduit.matches) monter()
    ScrollTrigger.sort()
    ScrollTrigger.refresh()
  }

  // Redimensionnement : on remesure, sauf pour le simple va-et-vient de la barre
  // d'adresse sur mobile (hauteur qui bouge de quelques dizaines de pixels).
  let largeur = window.innerWidth
  let hauteur = window.innerHeight
  let attente = 0
  const auRedimensionnement = () => {
    window.clearTimeout(attente)
    attente = window.setTimeout(() => {
      if (window.innerWidth === largeur && Math.abs(window.innerHeight - hauteur) < 150) return
      largeur = window.innerWidth
      hauteur = window.innerHeight
      construire()
    }, 200)
  }
  window.addEventListener("resize", auRedimensionnement)
  mouvementReduit.addEventListener("change", construire)
  if (tactile) {
    window.addEventListener("touchstart", surToucher, { passive: true })
    window.addEventListener("touchend", surLacher, { passive: true })
    window.addEventListener("touchcancel", surLacher, { passive: true })
  }

  construire()

  return () => {
    window.clearTimeout(attente)
    window.removeEventListener("resize", auRedimensionnement)
    window.removeEventListener("touchstart", surToucher)
    window.removeEventListener("touchend", surLacher)
    window.removeEventListener("touchcancel", surLacher)
    mouvementReduit.removeEventListener("change", construire)
    demonter()
  }
}

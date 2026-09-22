"use client"

import { useEffect } from "react"

/**
 * Chorégraphie de l'accueil :
 * - révélation au défilement des blocs marqués [data-reveal]
 *   (valeur "stagger" : cascade de STAGGER_MS entre éléments arrivés ensemble) ;
 * - tracé du parcours des réalisations ([data-timeline] / [data-timeline-seg]) ;
 * - trajet de la carte de la Guadeloupe ([data-map]) : tracée sur le canevas,
 *   elle glisse jusqu'au portrait d'« À propos » (écrans larges).
 *
 * Garde-fous :
 * - rien n'est masqué tant que ce code n'a pas tourné : la classe html.reveal-on
 *   n'est posée qu'ici, après avoir laissé visible tout ce qui est déjà atteint ;
 *   sans JS, la page reste entièrement lisible et le parcours déjà tracé ;
 * - prefers-reduced-motion : ni révélation ni parcours (pas d'observer, pas d'écouteur) ;
 *   seule la carte est gérée, entièrement tracée et sans animation, pour qu'elle
 *   s'efface quand même avant « À propos » ;
 * - filet de sécurité : chaque seconde, tout bloc bien entré à l'écran mais pas encore
 *   révélé (observer défaillant, mesure faussée…) est révélé quand même.
 */
const STAGGER_MS = 90

export default function ScrollChoreography() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const stopMap = startMap(reduce)
    if (reduce) return stopMap

    const root = document.documentElement
    const pending = new Set<HTMLElement>()
    const reveal = (el: HTMLElement, delay = 0) => {
      el.style.setProperty("--reveal-delay", `${delay}ms`)
      el.setAttribute("data-revealed", "")
      pending.delete(el)
    }

    // 1. Ce qui est déjà atteint (à l'écran, ou au-dessus après un lien /#contact) reste visible.
    const vh = window.innerHeight
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < vh) el.setAttribute("data-revealed", "")
      else pending.add(el)
    })

    // 2. Alors seulement, l'état masqué devient possible pour le reste.
    root.classList.add("reveal-on")

    let io: IntersectionObserver | null = null
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          let order = 0
          entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
            .forEach((e) => {
              const el = e.target as HTMLElement
              reveal(el, el.dataset.reveal === "stagger" ? order++ * STAGGER_MS : 0)
              io?.unobserve(el)
            })
        },
        { rootMargin: "0px 0px -8% 0px" }
      )
      pending.forEach((el) => io?.observe(el))
    }

    // 3. Filet de sécurité
    const safety = window.setInterval(() => {
      if (!pending.size) return window.clearInterval(safety)
      const limit = window.innerHeight * 0.85
      pending.forEach((el) => {
        if (el.getBoundingClientRect().top < limit) {
          reveal(el)
          io?.unobserve(el)
        }
      })
    }, 1000)
    const revealAll = () => pending.forEach((el) => reveal(el))
    window.addEventListener("beforeprint", revealAll)

    const stopTimeline = startTimeline()

    return () => {
      io?.disconnect()
      window.clearInterval(safety)
      window.removeEventListener("beforeprint", revealAll)
      stopTimeline()
      stopMap()
      root.classList.remove("reveal-on")
    }
  }, [])

  return null
}

/** Trace le parcours Liberty → ResaGP → FactuGP au fil du défilement. */
function startTimeline(): () => void {
  const grid = document.querySelector<HTMLElement>("[data-timeline]")
  const segs = grid ? Array.from(grid.querySelectorAll<HTMLElement>("[data-timeline-seg]")) : []
  if (!grid || !segs.length) return () => {}

  const wide = window.matchMedia("(min-width: 860px)")
  const clamp = (n: number) => Math.min(1, Math.max(0, n))
  let raf = 0

  const update = () => {
    raf = 0
    const vh = window.innerHeight
    // Toutes les lectures d'abord, puis les écritures : pas de recalcul forcé entre les deux.
    let values: number[]
    if (wide.matches) {
      // Cartes sur une rangée : le trait avance de carte en carte pendant que la grille
      // monte de 85 % à 35 % de la hauteur de l'écran.
      const p = clamp((vh * 0.85 - grid.getBoundingClientRect().top) / (vh * 0.5))
      values = segs.map((_, i) => clamp(p * segs.length - i))
    } else {
      // Cartes empilées : chaque segment se trace en passant la ligne des 60 % de l'écran.
      values = segs.map((seg) => {
        const r = seg.getBoundingClientRect()
        return clamp((vh * 0.6 - r.top) / r.height)
      })
    }
    segs.forEach((seg, i) => seg.style.setProperty("--s", values[i].toFixed(3)))
  }
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }

  // N'écoute le défilement que lorsque la section est proche de l'écran.
  let listening = false
  const near = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !listening) {
        window.addEventListener("scroll", schedule, { passive: true })
        listening = true
      } else if (!entry.isIntersecting && listening) {
        window.removeEventListener("scroll", schedule)
        listening = false
      }
      schedule()
    },
    { rootMargin: "25% 0px" }
  )
  near.observe(grid)
  wide.addEventListener("change", schedule)
  window.addEventListener("resize", schedule, { passive: true })
  update()

  return () => {
    near.disconnect()
    window.removeEventListener("scroll", schedule)
    window.removeEventListener("resize", schedule)
    wide.removeEventListener("change", schedule)
    if (raf) cancelAnimationFrame(raf)
  }
}

/**
 * Carte de la Guadeloupe (voir GuadeloupeMap), écrans larges uniquement :
 * 1. du haut de page jusqu'à l'arrivée, le contour se trace île après île, sans
 *    silhouette de fond : on ne la découvre en entier qu'à la fin, quand le trait
 *    se boucle et que la silhouette pleine apparaît ;
 * 2. elle se trace dans un couloir réservé à droite (aucun bloc n'y passe) et ne le
 *    quitte qu'à l'approche d'« À propos », pour rejoindre le portrait par-dessous
 *    le dernier bloc, estompée sous le texte (le trajet « sans couloir », qui passe
 *    sous les blocs, ne sert plus que si le couloir venait à manquer) ;
 * 3. elle s'y cale, se rallume, et le cadre du portrait remonte jusqu'à elle :
 *    à l'arrimage, l'exemplaire logé dans le cadre prend le relais au pixel près
 *    (il défile alors avec la page) et scintille tant qu'il est à l'écran ;
 * 4. tant que le cadre colle (et un peu après), l'île descend un peu dans le cadre et un cœur, du même trait,
 *    se trace autour d'elle (transform de l'île et décalage du cœur écrits ici).
 * Sans exemplaire dans le cadre (photo en place) : tracée à droite sur les deux
 * premiers écrans, puis effacée avant « À propos ». Mouvement réduit : tracée d'emblée,
 * immobile à droite, et l'exemplaire du portrait est affiché. Sous 1 100 px, rien
 * n'écoute le défilement pour elle.
 * Les calculs n'utilisent que scrollY et des positions mesurées au redimensionnement :
 * aucune lecture de mise en page pendant le défilement.
 */
function startMap(reduce: boolean): () => void {
  const map = document.querySelector<HTMLElement>('[data-map="canvas"]')
  if (!map) return () => {}
  const dock = document.querySelector<HTMLElement>('[data-map="portrait"]')
  const heartPath = dock?.querySelector<SVGPathElement>("svg > path") ?? null
  const frame = dock?.parentElement ?? null
  const root = document.documentElement
  const about = document.getElementById("apropos")
  const wide = window.matchMedia("(min-width: 1100px)")
  const clamp = (n: number) => Math.min(1, Math.max(0, n))
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  const smooth = (t: number) => t * t * (3 - 2 * t)
  // Le défilement s'arrête au pixel entier : 0,9996 doit compter comme « tracé ».
  const DRAWN = 0.995
  // Opacité pendant le trajet, quand la carte passe sous des titres et paragraphes.
  const DIM = 0.5
  // Position dans le document, sans les décalages de la révélation (translate).
  const docOffset = (el: HTMLElement) => {
    let top = 0
    let left = 0
    for (let n: HTMLElement | null = el; n; n = n.offsetParent as HTMLElement | null) {
      // offsetTop part du bord intérieur du parent : on ajoute sa bordure.
      top += n.offsetTop + (n === el ? 0 : n.clientTop)
      left += n.offsetLeft + (n === el ? 0 : n.clientLeft)
    }
    return { top, left }
  }

  let travel = false
  // Tracé cumulé (0 → 1) échantillonné tous les SEEN_STEP px de défilement.
  const SEEN_STEP = 16
  let seen: Float32Array = new Float32Array(0)
  // Couloir réservé à droite (voir .home --lane-map dans accueil.module.css).
  const laneMq = window.matchMedia("(min-width: 1100px)")
  // g.w : largeur de base de la carte (celle du portrait quand il y en a un, pour
  // qu'elle arrive nette à l'échelle 1) ; s0 / sT : échelles au départ et à l'arrivée.
  // lane / yLow / sink0 : avec couloir, la carte y descend (de yA à yLow, à partir
  // de sink0) avant de le quitter.
  const g = { vh: 0, w: 440, s0: 1, sT: 1, aboutTop: Infinity, xA: 0, yA: 0, xT: 0, yT: 0, dockAt: Infinity, drift0: 0, drift1: 1, dockH: 0, stick: 0, lane: false, yLow: 0, sink0: 0, lastBottom: 0 }
  type Block = { top: number; bottom: number; left: number; right: number }
  let raf = 0
  let active = false
  let ro: ResizeObserver | null = null

  const measure = () => {
    const vw = root.clientWidth
    const vh = window.innerHeight
    const lane = laneMq.matches
    // Largeur au départ : celle du couloir (même formule que --lane-map), sinon
    // l'ancienne carte posée à droite du contenu.
    const w = lane ? Math.min(340, Math.max(220, window.innerWidth * 0.21)) : Math.min(440, window.innerWidth * 0.34)
    g.vh = vh
    g.lane = lane
    g.aboutTop = about ? docOffset(about).top : Infinity
    travel = !reduce && !!dock && !!frame
    g.w = travel && dock ? dock.offsetWidth : w
    g.s0 = w / g.w
    // Départ : dans le couloir (40 px du bord), ou alignée sur la marge du contenu ;
    // centrée en hauteur.
    g.xA = lane ? vw - 40 - w : vw - Math.max(40, (vw - 1180) / 2 + 40) - w
    g.yA = lane ? (vh - w * 0.87) / 2 : vh / 2 - 0.42 * w * 0.87
    map.style.setProperty("--mw", `${g.w}px`)
    if (!travel || !dock || !frame) return
    // Arrivée : là où se trouve l'exemplaire du portrait quand le cadre est
    // centré dans l'écran (ou calé sous la navigation s'il est plus haut que l'écran).
    // Le cadre est collant : sa position « naturelle » se lit sur la grille qui le
    // porte (il en occupe le haut), pas sur lui, décalé tant qu'il colle.
    const grid = frame.parentElement ?? frame
    const frameDocTop = docOffset(grid).top
    const dockDocTop = frameDocTop + frame.clientTop + dock.offsetTop
    const frameTop = Math.max(96, (vh - frame.offsetHeight) / 2)
    frame.style.setProperty("--frame-top", `${frameTop}px`)
    g.xT = docOffset(dock).left
    g.sT = 1
    g.yT = frameTop + (dockDocTop - frameDocTop)
    g.dockAt = dockDocTop - g.yT
    g.dockH = dock.offsetHeight
    // Le cadre colle de l'arrimage jusqu'à ce que la grille (texte d'« À propos »)
    // ait défilé ; c'est pendant ce temps que le cœur se trace.
    g.stick = Math.max(0, grid.offsetHeight - frame.offsetHeight)
    const blocks = opaqueBlocks()
    if (lane) {
      // Avec couloir : la carte descend au bas du couloir, attend que le dernier
      // bloc opaque avant « À propos » (les engagements) soit passé au-dessus
      // d'elle, puis traverse vers le portrait en montant, sous ce bloc : elle n'est
      // jamais cachée. Arrivée 0,12 écran avant l'arrimage.
      // Pas plus bas que 280 px du bord : le coin bas-droit porte le bouton WhatsApp
      // et sa bulle « Besoin d'aide ? », posés par-dessus toute la page.
      g.yLow = Math.max(g.yA, vh - w * 0.87 - 280)
      g.lastBottom = Math.max(0, ...blocks.filter((b) => b.top < g.aboutTop).map((b) => b.bottom))
      g.drift1 = g.dockAt - 0.12 * vh
      g.drift0 = Math.min(g.drift1 - 0.3 * vh, Math.max(0, g.lastBottom - g.yLow + 24))
      g.sink0 = Math.max(0, g.drift0 - 0.8 * vh)
    } else {
      // Sans couloir : départ dès 1,4 écran, arrivée 0,3 écran avant l'arrimage.
      g.drift1 = g.dockAt - 0.3 * vh
      g.drift0 = Math.min(g.drift1 - 1, 1.4 * vh)
    }
    seen = measureSeen(blocks)
  }

  // Position de la carte (coin haut-gauche, échelle) pour un défilement y donné.
  const place = (y: number) => {
    const u = clamp((y - g.drift0) / (g.drift1 - g.drift0))
    const t = settle(u)
    const dx = g.xA - g.xT
    const s = lerp(g.s0, g.sT, smooth(u))
    if (g.lane) {
      // Descente dans le couloir, puis traversée vers le portrait : elle file d'abord
      // à l'horizontale et ne remonte qu'en fin de course (t²), moins vite que le
      // bloc au-dessus d'elle ne s'éloigne ; elle dépasse à peine sa place et
      // revient s'y caler.
      if (y < g.drift0) {
        return { x: g.xA, top: lerp(g.yA, g.yLow, smooth(clamp((y - g.sink0) / (g.drift0 - g.sink0 || 1)))), s }
      }
      return {
        x: bezier(g.xA, g.xA - 0.4 * dx, g.xT + 0.1 * dx, g.xT, t),
        // Jamais au-dessus du bas du dernier bloc (+ 12 px) : s'il la rattrape,
        // c'est lui qui la pousse, elle ne passe jamais dessous.
        top: Math.max(g.yLow - (g.yLow - g.yT) * Math.sign(t) * t * t, g.lastBottom - y + 12),
        s,
      }
    }
    // Sans couloir : trajet en arc, elle plonge un peu, file vers la gauche, remonte,
    // dépasse à peine sa place et revient s'y caler.
    return {
      x: bezier(g.xA, g.xA - 0.05 * dx, g.xT + 0.15 * dx, g.xT, t),
      top: bezier(g.yA, g.yA + 0.22 * g.vh, g.yT + 0.3 * g.vh, g.yT, t),
      s,
    }
  }

  // Blocs opaques des sections (cartes, bandeaux), en coordonnées du document.
  const opaqueBlocks = () => {
    const blocks: Block[] = []
    const opaque = new Set<Element>()
    const main = map.closest("main")
    main?.querySelectorAll<HTMLElement>("section *").forEach((el) => {
      // Un bloc opaque suffit : ses descendants sont déjà couverts.
      for (let n = el.parentElement; n && n !== main; n = n.parentElement) if (opaque.has(n)) return
      const bg = getComputedStyle(el).backgroundColor
      const alpha = bg.startsWith("rgba") ? parseFloat(bg.split(",")[3]) : bg.startsWith("rgb(") ? 1 : 0
      if (alpha < 0.5 || el.closest("[data-map]")) return
      opaque.add(el)
      const r = el.getBoundingClientRect()
      blocks.push({ top: r.top + window.scrollY, bottom: r.bottom + window.scrollY, left: r.left, right: r.right })
    })
    return blocks
  }

  /**
   * Le trait n'avance que lorsque la carte est visible. Dans le couloir elle l'est
   * toujours ; sans couloir (1 100 – 1 279 px), elle passe sous les cartes opaques
   * des sections. Pas à pas, on calcule la part de la carte que les blocs laissent
   * voir ; le tracé suit ce « vu » cumulé. Le haut de page pèse moins (0,35 → 1) :
   * le début reste un fragment de côte méconnaissable, la forme se boucle à la fin.
   */
  const measureSeen = (blocks: Block[]) => {
    const steps = Math.ceil(g.drift1 / SEEN_STEP) + 1
    const acc = new Float32Array(steps)
    let total = 0
    for (let i = 0; i < steps; i++) {
      const y = i * SEEN_STEP
      const { x, top, s } = place(y)
      const w = g.w * s
      const h = w * 0.87
      let hidden = 0
      for (const b of blocks) {
        const ox = Math.min(x + w, b.right) - Math.max(x, b.left)
        const oy = Math.min(top + h, b.bottom - y) - Math.max(top, b.top - y)
        if (ox > 0 && oy > 0) hidden += ox * oy
      }
      const visible = Math.max(0, 1 - hidden / (w * h))
      total += visible * (0.35 + 0.65 * (y / g.drift1))
      acc[i] = total
    }
    if (total > 0) for (let i = 0; i < steps; i++) acc[i] /= total
    return acc
  }
  const seenAt = (y: number) => {
    if (!seen.length || !seen[seen.length - 1]) return clamp(y / g.drift1)
    const f = clamp(y / g.drift1) * (seen.length - 1)
    const i = Math.floor(f)
    return i >= seen.length - 1 ? 1 : lerp(seen[i], seen[i + 1], f - i)
  }
  // Traits des îles, avec la part du tracé total (a → b) que chacune occupe.
  const segs = Array.from(map.querySelectorAll<SVGElement>("[data-a]")).map((el) => ({
    el,
    a: Number(el.dataset.a),
    b: Number(el.dataset.b),
  }))
  // Écritures seulement si la valeur change, et en nombres simples : le décalage de
  // chaque île et l'apparition de la silhouette sont calculés ici plutôt qu'en calc()
  // CSS, que certains navigateurs ignoraient (l'île s'affichait alors entière).
  // transform et opacity sont écrits en propre (pas de variable héritée à recalculer).
  const last = { draw: "", transform: "", opacity: "" }
  let lastHeart = ""
  const write = (draw: string, transform: string, opacity: string) => {
    if (draw !== last.draw) {
      last.draw = draw
      const d = Number(draw)
      // Part de chaque île déjà tracée : 0 avant son tour, 1 une fois passée.
      segs.forEach(({ el, a, b }) => {
        el.style.strokeDashoffset = (1 - clamp((d - a) / (b - a))).toFixed(4)
      })
      // Silhouette pleine et Petit-Bourg : seulement sur les derniers 3 % du tracé.
      map.style.setProperty("--reveal", clamp((d - 0.97) / 0.03).toFixed(3))
    }
    if (transform !== last.transform) map.style.transform = last.transform = transform
    if (opacity !== last.opacity) map.style.opacity = last.opacity = opacity
  }
  // Coin haut-gauche en (x, y), échelle s. Pas de rotation : une carte SVG inclinée
  // est repeinte à chaque image (tâches longues mesurées), un déplacement non.
  const at = (x: number, y: number, s: number) =>
    `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) scale(${s.toFixed(4)})`
  // Courbe de Bézier cubique (t peut déborder légèrement de [0, 1] : dépassement).
  const bezier = (a: number, b: number, c: number, d: number, t: number) => {
    const u = 1 - t
    return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d
  }
  // Démarre en douceur, file, dépasse à peine la cible puis revient s'y caler.
  const settle = (t: number) => {
    const c = 1.2
    const v = smooth(t) - 1
    return 1 + (c + 1) * v * v * v + c * v * v
  }

  const update = () => {
    raf = 0
    const y = window.scrollY
    const vh = g.vh
    if (!travel || !dock) {
      const draw = reduce ? 1 : clamp(0.1 + (0.9 * y) / (1.8 * vh))
      // Opaque jusqu'à 1,4 écran avant « À propos », invisible quand la section arrive à 90 %.
      const fade = clamp((g.aboutTop - vh * 0.9 - y) / (vh * 0.5))
      write(draw.toFixed(3), at(g.xA, g.yA, g.s0), fade.toFixed(3))
      if (!reduce) map.toggleAttribute("data-drawn", draw >= DRAWN && fade > 0)
      return
    }

    // Le trait avance quand la carte est visible (voir measureSeen) ; sans silhouette
    // de fond, la Guadeloupe ne se découvre qu'à l'arrivée.
    // Par pas de 0,5 % : la carte n'est repeinte que quand le trait a vraiment avancé.
    const draw = Math.round((0.02 + 0.98 * seenAt(y)) * 200) / 200
    const { x, top, s } = place(y)
    const docked = y >= g.dockAt
    // Estompée quand elle passe sous du texte : dans le couloir, seulement pendant la
    // traversée ; sans couloir, pendant tout le trajet, rallumée à l'approche.
    const u = clamp((y - g.drift0) / (g.drift1 - g.drift0))
    const opacity = g.lane
      ? 1 - (1 - DIM) * Math.sin(Math.PI * u)
      : 1 - (1 - DIM) * clamp((y - g.drift0) / (0.4 * vh)) + (1 - DIM) * clamp((y - (g.dockAt - 0.5 * vh)) / (0.5 * vh))
    write(draw.toFixed(3), at(x, top, s), opacity.toFixed(3))
    map.toggleAttribute("data-away", docked)
    // Les points ne pulsent qu'une fois arrimée, dans le cadre (data-twinkle) :
    // jamais pendant le trajet (mesuré : c'est ce qui coûtait le plus).
    // Position de l'exemplaire du portrait à l'écran : immobile tant que le cadre
    // colle, puis il remonte avec la page.
    const past = y - g.dockAt - g.stick
    const dockTopOnScreen = past > 0 ? g.yT - past : g.yT
    const onScreen = dockTopOnScreen < vh && dockTopOnScreen + g.dockH > 0
    dock.toggleAttribute("data-docked", docked)
    dock.toggleAttribute("data-twinkle", docked && onScreen)
    // Comme la côte, le cœur se trace au fil du défilement : pendant tout le temps où
    // le cadre colle, et un rien après (0,1 écran), pour qu'il se referme — par le
    // haut — avant que le cadre ne passe sous la navigation. L'île se resserre en
    // même temps. 0 à l'arrimage : relais au pixel près.
    const heartSpan = Math.max(1, g.stick + 0.1 * vh)
    const heart = (Math.round(clamp((y - g.dockAt) / heartSpan) * 200) / 200).toFixed(3)
    if (heart !== lastHeart) {
      lastHeart = heart
      const h = Number(heart)
      // L'île se resserre sur le premier cinquième du tracé, avant que le trait
      // n'atteigne le lobe gauche : le cœur ne dépasse jamais du cadre.
      const k = Math.min(1, h * 5)
      dock.style.transform = `translate3d(${(-2.7 * k).toFixed(3)}%, ${(-8 * k).toFixed(3)}%, 0) scale(${(1 - 0.333 * k).toFixed(4)})`
      if (heartPath) heartPath.style.strokeDashoffset = (1 - h).toFixed(4)
    }
  }
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }
  // Regroupe les remesures (la mise en page bouge plusieurs fois au chargement).
  let settleTimer = 0
  const remeasure = () => {
    window.clearTimeout(settleTimer)
    settleTimer = window.setTimeout(() => {
      measure()
      schedule()
    }, 120)
  }

  const start = () => {
    if (active) return
    active = true
    measure()
    update()
    root.classList.toggle("map-travel", travel)
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", remeasure, { passive: true })
    // La hauteur de page bouge (polices, images, FAQ ouverte) : on remesure.
    ro = new ResizeObserver(remeasure)
    ro.observe(document.body)
  }
  const stop = () => {
    if (!active) return
    active = false
    window.removeEventListener("scroll", schedule)
    window.removeEventListener("resize", remeasure)
    ro?.disconnect()
    window.clearTimeout(settleTimer)
    if (raf) cancelAnimationFrame(raf)
    raf = 0
    map.removeAttribute("data-drawn")
    map.removeAttribute("data-away")
    dock?.removeAttribute("data-docked")
    dock?.removeAttribute("data-twinkle")
    // Hors trajet (écran étroit) : le cadre montre l'état final, cœur tracé.
    dock?.style.removeProperty("transform")
    heartPath?.style.removeProperty("stroke-dashoffset")
    lastHeart = ""
    root.classList.remove("map-travel")
  }
  const sync = () => (wide.matches ? start() : stop())

  sync()
  root.classList.add("map-on")
  wide.addEventListener("change", sync)

  return () => {
    stop()
    wide.removeEventListener("change", sync)
    root.classList.remove("map-on")
  }
}

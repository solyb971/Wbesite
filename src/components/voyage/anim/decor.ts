/**
 * Éléments du décor tirés au hasard à chaque visite, comme dans la maquette :
 * les trois rangs de canne (tiges à nœuds, feuilles, plumets), la tôle ondulée
 * de la distillerie, les étoiles et les lucioles de la nuit.
 * Renvoie de quoi tout retirer (démontage, double montage du mode strict).
 */

const NS = "http://www.w3.org/2000/svg"
export const rnd = (a: number, b: number) => a + Math.random() * (b - a)

const el = (tag: string, attrs: Record<string, string | number>, parent?: Element) => {
  const e = document.createElementNS(NS, tag)
  for (const k in attrs) e.setAttribute(k, String(attrs[k]))
  parent?.appendChild(e)
  return e
}

type Rang = { base: number; h: [number, number]; sw: number; gap: number; nodes: boolean; plume?: boolean }

const RANGS: Rang[] = [
  { base: 668, h: [45, 85], sw: 3, gap: 15, nodes: false, plume: true },
  { base: 805, h: [120, 175], sw: 6, gap: 30, nodes: true },
  { base: 955, h: [220, 310], sw: 11, gap: 58, nodes: true },
]
const TIGES = ["#A7B454", "#9A9C4A", "#B3A558", "#8C7A5A"]
const FEUILLES = ["#5E9450", "#6FA05A", "#4F8446", "#7FAE5C"]
const pick = (a: string[]) => a[(Math.random() * a.length) | 0]

function canne(g: SVGGElement) {
  const r = RANGS[Number(g.dataset.row)]
  for (let x = -30; x < 1650; x += r.gap * rnd(0.7, 1.25)) {
    const h = rnd(r.h[0], r.h[1])
    const lean = rnd(-10, 10)
    const s = el("g", { class: "stalk", "data-x": x, "data-y": r.base }, g)
    const top = { x: x + lean, y: r.base - h }
    el("path", { d: `M${x} ${r.base} L${top.x} ${top.y}`, stroke: pick(TIGES), "stroke-width": r.sw, fill: "none", "stroke-linecap": "round" }, s)
    if (r.nodes) {
      const n = Math.round(h / (r.sw * 3.2))
      for (let k = 1; k < n * 0.75; k++) {
        const t = k / n
        const nx = x + lean * t
        const ny = r.base - h * t
        el("path", { d: `M${nx - r.sw * 0.75} ${ny} L${nx + r.sw * 0.75} ${ny}`, stroke: "#5E6B2E", "stroke-width": Math.max(2, r.sw * 0.35), "stroke-linecap": "round", opacity: 0.75 }, s)
      }
    }
    const nl = r.nodes ? 5 : 3
    for (let k = 0; k < nl; k++) {
      const t = 0.55 + k * (0.45 / nl)
      const px = x + lean * t
      const py = r.base - h * t
      const dir = k % 2 ? 1 : -1
      const len = h * rnd(0.45, 0.75)
      el("path", { d: `M${px} ${py} C${px + dir * len * 0.25} ${py - len * 0.75} ${px + dir * len * 0.8} ${py - len * 0.55} ${px + dir * len} ${py + len * 0.08}`, stroke: pick(FEUILLES), "stroke-width": Math.max(2, r.sw * 0.75), fill: "none", "stroke-linecap": "round" }, s)
    }
    el("path", { d: `M${top.x} ${top.y} q${rnd(-8, 8)} ${-h * 0.25} ${rnd(-14, 14)} ${-h * 0.38}`, stroke: FEUILLES[1], "stroke-width": Math.max(2, r.sw * 0.7), fill: "none", "stroke-linecap": "round" }, s)
    if (r.plume && x < 1120 && Math.random() < 0.18)
      el("path", { d: `M${top.x} ${top.y - h * 0.3} q5 -22 -2 -36`, stroke: "#F5F2ED", "stroke-width": 3, fill: "none", "stroke-linecap": "round", opacity: 0.8 }, s)
  }
}

export function genererDecor(root: HTMLElement): () => void {
  const conteneurs: Element[] = []

  root.querySelectorAll<SVGGElement>(".cane").forEach((g) => {
    canne(g)
    conteneurs.push(g)
  })

  // Tôle ondulée du toit de la distillerie.
  const corr = root.querySelector(".corrug")
  if (corr) {
    for (let x = 1180; x <= 1380; x += 12) {
      const yTop = x < 1280 ? 478 - (x - 1168) * (58 / 112) : 420 + (x - 1280) * (58 / 112)
      el("path", { d: `M${x} ${yTop + 3} L${x} 476` }, corr)
    }
    conteneurs.push(corr)
  }

  const stars = root.querySelector(".stars")
  if (stars) {
    for (let i = 0; i < 110; i++) el("circle", { cx: rnd(0, 1600), cy: rnd(0, 520), r: rnd(0.8, 2.4), opacity: rnd(0.4, 1) }, stars)
    conteneurs.push(stars)
  }

  const flies = root.querySelector(".flies")
  if (flies) {
    for (let i = 0; i < 22; i++) el("circle", { cx: rnd(100, 1550), cy: rnd(620, 880), r: rnd(3, 6) }, flies)
    conteneurs.push(flies)
  }

  return () => conteneurs.forEach((c) => c.replaceChildren())
}

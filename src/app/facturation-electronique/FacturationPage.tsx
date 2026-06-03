'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(() => import('@/components/ui/SmoothScroll'), { ssr: false })
import {
  IconFileInvoice, IconReceipt2, IconRefresh, IconBuildingSkyscraper,
  IconBrain, IconUsers, IconBriefcase, IconAnchor, IconCertificate,
  IconScale, IconBuildingBank, IconChartBar, IconArrowRight,
  IconCheck, IconClockHour4, IconShieldCheck, IconWorld,
} from '@tabler/icons-react'
import styles from './facturation.module.css'

/* ─── CSS Modules approach — différent de ResaGP (CSS-in-JS) et SolYB (Tailwind) ─── */

const DEADLINE = new Date('2026-09-01T00:00:00')
function useCountdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 })
  useEffect(() => {
    const tick = () => {
      const diff = DEADLINE.getTime() - Date.now()
      if (diff <= 0) return
      setT({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) })
    }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
  }, [])
  return t
}

const WORDS = ['simple', 'conforme', 'automatique', 'sécurisée', '100% DOM']

const FEATURES = [
  { n: '01', icon: IconFileInvoice, title: 'Factures au bon format', sub: 'Standard légal Factur-X EN 16931', desc: 'Vos factures sont créées dans le format officiel exigé par l\'État — un fichier PDF lisible par l\'humain et une pièce XML lisible par les machines. Compatible avec Chorus Pro DOM.', tags: ['Factur-X', 'EN 16931', 'Chorus Pro', 'PDF/A-3'] },
  { n: '02', icon: IconReceipt2, title: 'TVA DOM déjà réglée', sub: 'Taux 8,5 % · 2,1 % préconfigurés', desc: 'En Guadeloupe, Martinique, Réunion et Guyane, la TVA est différente de la métropole. FactuGP l\'applique automatiquement selon votre activité — vous n\'avez rien à configurer.', tags: ['8,5 %', '2,1 %', 'Exonérations', 'Multi-taux'] },
  { n: '03', icon: IconRefresh, title: 'Déclaration automatique', sub: 'Transmission directe à l\'administration', desc: 'Les informations de vos ventes et encaissements partent automatiquement vers les impôts. Fini la saisie manuelle — FactuGP le fait pour vous, en temps réel.', tags: ['E-reporting', 'FEC DGFiP', 'Automatique', 'Temps réel'] },
  { n: '04', icon: IconBuildingSkyscraper, title: 'Module BTP', sub: 'TVA auto-liquidée & sous-traitance', desc: 'Dans le bâtiment, c\'est le client qui paye la TVA à la place du sous-traitant. FactuGP gère cette règle automatiquement et produit les documents légaux correspondants.', tags: ['Auto-liquidée', 'BTP', 'Art. 283', 'Sous-traitance'] },
  { n: '05', icon: IconBrain, title: 'Lecture automatique des factures reçues', sub: 'Scan & import en 3 secondes', desc: 'Photographiez ou déposez une facture fournisseur. L\'IA lit le montant, la date et le numéro de TVA. Vous vérifiez en un coup d\'œil, on enregistre le reste.', tags: ['Scan intelligent', 'IA', 'PDF', 'Import auto'] },
  { n: '06', icon: IconUsers, title: 'Devis & relances clients', sub: 'Devis → Facture en 1 clic', desc: 'Créez un devis, transformez-le en facture d\'un clic, et laissez FactuGP envoyer les relances en cas d\'impayé. Tout depuis un seul outil.', tags: ['Devis', 'Relances', 'Suivi clients', 'Commercial'] },
]

const TVA_ROWS = [
  { cat: 'Taux normal', rate: '8,5 %', base: 'Ventes de biens, prestations de services', note: 'CGI art. 296' },
  { cat: 'Taux réduit', rate: '2,1 %', base: 'Médicaments, presse, restauration', note: 'CGI art. 296 bis' },
  { cat: 'Taux zéro', rate: '0 %', base: 'Exportations, livraisons intracommunautaires', note: 'Exonération' },
  { cat: 'Agricole', rate: '1,05 %', base: 'Productions agricoles DOM', note: 'Spécifique DOM' },
]

const SECTORS = [
  { icon: IconBriefcase, name: 'Commerce & négoce', note: 'Caisse NF 525, B2B/B2C' },
  { icon: IconBuildingBank, name: 'Artisanat & services', note: 'Devis, factures, relances' },
  { icon: IconScale, name: 'Professions libérales', note: 'Honoraires, e-invoicing' },
  { icon: IconBuildingSkyscraper, name: 'BTP & construction', note: 'TVA auto-liquidée, DGFiP' },
  { icon: IconAnchor, name: 'Tourisme & hôtellerie', note: 'Taxe séjour, ISCA NF 525' },
  { icon: IconWorld, name: 'Agriculture & pêche', note: 'Taux réduits, exonérations' },
]

const STAMPS = [
  { icon: IconFileInvoice, label: 'Factur-X\nEN 16931' },
  { icon: IconShieldCheck, label: 'RGPD\nConforme' },
  { icon: IconWorld, label: 'Hébergé\nen France' },
  { icon: IconBuildingBank, label: 'Chorus Pro\nDOM' },
  { icon: IconRefresh, label: 'E-reporting\nDGFiP' },
  { icon: IconCertificate, label: 'ISCA\nNF 525' },
  { icon: IconChartBar, label: 'FEC\nDGFiP' },
  { icon: IconReceipt2, label: 'TVA DOM\nNative' },
]

const TICKER_ITEMS = ['FACTURATION ÉLECTRONIQUE', 'CHORUS PRO DOM', 'TVA 8,5 % / 2,1 %', 'FACTUR-X EN 16931', 'FEC CONFORME DGFiP', 'MODULE BTP', 'ISCA NF 525', 'E-REPORTING', 'OCR IA FOURNISSEURS', 'RGPD CONFORME', 'DOM 971']

export default function FacturationPage() {
  const [wordIdx, setWordIdx] = useState(0)
  const [wordIn, setWordIn] = useState(true)
  const countdown = useCountdown()

  useEffect(() => {
    const id = setInterval(() => {
      setWordIn(false)
      setTimeout(() => { setWordIdx(i => (i + 1) % WORDS.length); setWordIn(true) }, 240)
    }, 2400)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add(styles.revealed); obs.unobserve(e.target) } })
    }, { threshold: 0.07 })
    document.querySelectorAll(`.${styles.reveal}`).forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <div className={styles.page}>
      <SmoothScroll />
      <div className={styles.ledger} aria-hidden />
      <div className={styles.wrap}>

        {/* NAV */}
        <nav className={styles.nav}>
          <div className={styles.navIn}>
            <a href="#" className={styles.logo}>
              <Image src="/logo/SYB_orange.svg" alt="SolYB" width={36} height={36} className={styles.logoImg} />
              <span className={styles.logoText}>Factu<em>GP</em></span>
            </a>
            <div className={styles.navLinks}>
              {[['#fonctionnalites','Fonctionnalités'],['#tva','TVA DOM'],['#tarifs','Tarifs'],['#roadmap','Feuille de route'],['#contact','Contact']].map(([h,l]) =>
                <a key={h} href={h} className={styles.navLink}>{l}</a>
              )}
            </div>
            <a href="#contact" className={styles.navBtn}>Accès anticipé <IconArrowRight size={14} style={{ display: 'inline' }} /></a>
          </div>
        </nav>

        {/* HERO */}
        <section style={{ background: '#EDE8D8', paddingTop: '60px' }}>
          <div className={styles.hero}>
            <div>
              <div className={styles.betaBadge}>
                <span className={styles.betaDot} />
                v2026.3.0 · Conformité DGFiP totale
              </div>
              <div className={styles.kicker}>
                <span className={styles.kickerLine} />
                Réforme obligatoire · Septembre 2026
              </div>
              <h1 className={styles.h1}>
                Facturation<br />
                électronique<br />
                <span className={styles.h1Rotating}>
                  <span className={`${styles.h1Word} ${wordIn ? 'fp-wIn' : 'fp-wOut'}`} style={{ animation: wordIn ? 'fp-wIn 0.24s ease forwards' : 'fp-wOut 0.24s ease forwards' }}>{WORDS[wordIdx]}</span>
                </span>
              </h1>
              <p className={styles.sub}>
                À partir de septembre&nbsp;2026, <strong>toutes les entreprises qui paient la TVA</strong> devront envoyer et recevoir leurs factures en format électronique certifié. FactuGP est la seule solution construite pour les DOM.
              </p>
              <div className={styles.ctas}>
                <a href="#contact" className={styles.btnPrimary}>
                  <IconFileInvoice size={16} /> Rejoindre la liste d&apos;attente
                </a>
                <a href="#fonctionnalites" className={styles.btnSecondary}>
                  <IconChartBar size={16} /> Voir les fonctionnalités
                </a>
              </div>
              <div className={styles.trust}>
                {['Conforme DGFiP', 'TVA DOM native', 'RGPD · Hébergé en France', 'Essai 30 jours'].map(t => (
                  <span key={t} className={styles.trustItem}>
                    <span className={styles.trustDot} />{t}
                  </span>
                ))}
              </div>
            </div>

            {/* Invoice document */}
            <div className={styles.docCol}>
              <div className={styles.doc}>
                <div className={styles.docStripe} />
                <div className={styles.docHeader}>
                  <div>
                    <div className={styles.docCo}>
                      Boulangerie Soleil des Alizés
                      <span className={styles.docCoSub}>SIREN 123 456 789 · TVA FR12345678900</span>
                    </div>
                  </div>
                  <div className={styles.docStamp}>
                    CONFORME<br />DGFiP<br /><IconCheck size={12} />
                  </div>
                </div>
                <div className={styles.docNum}>
                  FACTURE N° <span className={styles.docNumVal}>2026-0147<span className={styles.cursor} /></span>
                </div>
                <div className={styles.docRow}><span>Date d&apos;émission</span><span className={styles.docRowVal}>15 juin 2026</span></div>
                <div className={styles.docRow}><span>Échéance</span><span className={styles.docRowVal}>15 juillet 2026</span></div>
                <div className={styles.docRow}><span>Client</span><span className={styles.docRowVal}>Hôtel Karukéra SAS</span></div>
                <hr className={styles.docSep} />
                <div className={styles.docLineHead}>
                  <span>Désignation</span><span>HT</span><span>TTC</span>
                </div>
                {[
                  { desc: 'Viennoiseries (×120)', ht: '240,00 €', ttc: '260,40 €' },
                  { desc: 'Pains spéciaux (×50)', ht: '125,00 €', ttc: '135,62 €' },
                  { desc: 'Livraison Baie-Mahault', ht: '30,00 €', ttc: '32,55 €' },
                ].map((l, i) => (
                  <div key={i} className={styles.docLine}>
                    <span style={{ color: '#0D1A0D' }}>{l.desc}</span>
                    <span style={{ color: '#7A9A78' }}>{l.ht}</span>
                    <span style={{ color: '#0D1A0D' }}>{l.ttc}</span>
                  </div>
                ))}
                <div className={styles.docTotal}>
                  <span>TOTAL TTC (TVA 8,5 %)</span>
                  <span className={styles.docTotalVal}>428,57 €</span>
                </div>
                <div className={styles.docBadges}>
                  {['Format Factur-X EN 16931 · PDF/A-3', 'Transmis Chorus Pro DOM · Ref. CP-2026-0147', 'E-reporting DGFiP envoyé automatiquement'].map(b => (
                    <div key={b} className={styles.docBadge}>
                      <IconCheck size={11} className={styles.docBadgeCheck} /> {b}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <div className={styles.statsStrip}>
          <div className={styles.statsIn}>
            {[
              { num: '24', suf: '', lbl: 'Modules intégrés' },
              { num: '100', suf: '%', lbl: 'Conforme DGFiP 2026' },
              { num: '3', suf: '', lbl: 'Taux TVA DOM préconfigurés' },
              { num: '5', suf: ' min', lbl: 'Pour être opérationnel' },
            ].map((s, i) => (
              <div key={i} className={styles.statItem}>
                <span className={styles.statNum}>{s.num}{s.suf}</span>
                <span className={styles.statLbl}>{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COUNTDOWN */}
        <div className={styles.countdown}>
          <div className={styles.countdownIn}>
            <div>
              <div className={styles.countdownLabel}>Compte à rebours</div>
              <div className={styles.countdownTitle}>Obligation légale — 1er septembre 2026</div>
              <div className={styles.countdownSub}>Toutes les entreprises qui paient la TVA · Des amendes dès la première facture non conforme</div>
            </div>
            <div className={styles.ticks}>
              <div className={styles.tick}>
                <span className={styles.tickNum}>{countdown.d}</span>
                <span className={styles.tickLbl}>Jours</span>
              </div>
              <span className={styles.tickSep}>:</span>
              <div className={styles.tick}>
                <span className={styles.tickNum}>{String(countdown.h).padStart(2,'0')}</span>
                <span className={styles.tickLbl}>Heures</span>
              </div>
              <span className={styles.tickSep}>:</span>
              <div className={styles.tick}>
                <span className={styles.tickNum}>{String(countdown.m).padStart(2,'0')}</span>
                <span className={styles.tickLbl}>Min</span>
              </div>
              <span className={styles.tickSep}>:</span>
              <div className={styles.tick}>
                <span className={styles.tickNum}>{String(countdown.s).padStart(2,'0')}</span>
                <span className={styles.tickLbl}>Sec</span>
              </div>
            </div>
            <a href="#contact" className={styles.countdownCta}>
              <IconClockHour4 size={16} /> Réserver mon accès anticipé →
            </a>
          </div>
        </div>

        {/* TICKER */}
        <div className={styles.ticker}>
          <div className={styles.tickerTrack}>
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i}>
                <span className={styles.tickerItem}>{item}</span>
                <span className={styles.tickerDot}>·</span>
              </span>
            ))}
          </div>
        </div>

        {/* FONCTIONNALITÉS */}
        <section id="fonctionnalites" className={styles.section}>
          <div className={styles.sectionIn}>
            <div className={`${styles.reveal}`} style={{ marginBottom: '3rem', textAlign: 'center' }}>
              <h2 className={styles.h2}>Tout ce qu&apos;il faut,<br /><em>rien à configurer</em></h2>
              <p className={styles.lead} style={{ maxWidth: 540, margin: '0 auto' }}>De la création de la facture jusqu&apos;à sa transmission aux impôts — FactuGP gère toute la chaîne avec les règles fiscales propres aux DOM, déjà intégrées.</p>
            </div>
            <div className={`${styles.feats} ${styles.reveal} ${styles.d1}`}>
              {FEATURES.map((f, i) => (
                <div key={i} className={styles.feat}>
                  <div className={styles.featN}>{f.n}</div>
                  <div className={styles.featIconWrap}>
                    <f.icon size={22} strokeWidth={1.5} />
                  </div>
                  <div className={styles.featTitle}>{f.title}</div>
                  <div className={styles.featSub}>{f.sub}</div>
                  <div className={styles.featDesc}>{f.desc}</div>
                  <div className={styles.featTags}>
                    {f.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TVA DOM */}
        <section id="tva" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionIn}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
              <div className={styles.reveal}>
                <h2 className={styles.h2}>Taux de TVA<br /><em>Guadeloupe & DOM</em></h2>
                <p className={styles.lead} style={{ marginBottom: '2rem' }}>
                  En Guadeloupe et dans les DOM, la TVA n&apos;est pas la même qu&apos;en métropole — les taux sont plus bas. FactuGP connaît les bons taux et les applique automatiquement selon ce que vous vendez.
                </p>
                <div style={{ padding: '1.25rem', background: '#FDFCF6', border: '1px solid #B8D4A8', borderLeft: '4px solid #C8912A', borderRadius: '4px', fontFamily: 'var(--font-sans)', fontSize: '0.85rem', color: '#5A7A58', lineHeight: 1.65, boxShadow: '0 2px 8px rgba(13,74,43,0.06)' }}>
                  <strong style={{ color: '#0D1A0D' }}>Base légale : CGI Articles 294 à 297 A</strong><br />
                  Ces taux sont fixés par la loi. FactuGP applique le bon taux selon votre activité (code NAF) et le type de vente — vous n&apos;avez rien à vérifier.
                </div>
              </div>
              <div className={`${styles.reveal} ${styles.d1}`}>
                <div className={styles.tvaWrap}>
                  {TVA_ROWS.map((r, i) => (
                    <div key={i} className={styles.tvaCard}>
                      <div className={styles.tvaRate}>{r.rate}</div>
                      <div className={styles.tvaCardBody}>
                        <div className={styles.tvaCardCat}>{r.cat}</div>
                        <div className={styles.tvaCardBase}>{r.base}</div>
                        <div className={styles.tvaCardNote}>{r.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTEURS */}
        <section className={styles.section}>
          <div className={styles.sectionIn}>
            <div className={`${styles.reveal}`} style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
              <h2 className={styles.h2}>Vous payez la TVA ?<br /><em>Vous êtes concerné.</em></h2>
              <p className={styles.lead} style={{ maxWidth: 560, margin: '0 auto' }}>Dès septembre 2026, toute entreprise qui paye la TVA en Guadeloupe doit facturer au format électronique officiel — quel que soit son secteur.</p>
            </div>
            <div className={`${styles.sectors} ${styles.reveal} ${styles.d1}`}>
              {SECTORS.map((s, i) => (
                <div key={i} className={styles.sector}>
                  <div className={styles.sectorIconWrap}>
                    <s.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className={styles.sectorName}>{s.name}</div>
                  <div className={styles.sectorNote}>{s.note}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONFORMITÉ */}
        <section id="conformite" className={`${styles.section} ${styles.sectionDark}`}>
          <div className={styles.sectionIn} style={{ textAlign: 'center' }}>
            <div className={`${styles.reveal}`} style={{ marginBottom: '1.5rem' }}>
              <h2 className={styles.h2} style={{ textAlign: 'center', color: '#F5EDD8' }}>100% conforme,<br /><em style={{ color: '#C8912A' }}>sans effort de votre côté</em></h2>
              <p className={styles.lead} style={{ maxWidth: 520, margin: '0 auto', color: 'rgba(245,237,216,0.6)' }}>
                FactuGP respecte toutes les normes exigées par l&apos;État — en France et en Europe. Chaque facture que vous émettez est automatiquement valide et légalement protégée.
              </p>
            </div>
            <div className={`${styles.stamps} ${styles.reveal} ${styles.d1}`}>
              {STAMPS.map((s, i) => (
                <div key={i} className={styles.stamp}>
                  <div className={styles.stampIconWrap}>
                    <s.icon size={24} strokeWidth={1.5} />
                  </div>
                  <span className={styles.stampLbl}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section id="tarifs" className={styles.section}>
          <div className={styles.sectionIn}>
            <div className={`${styles.reveal}`} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <h2 className={styles.h2} style={{ textAlign: 'center' }}>Un prix fixe,<br /><em>aucune surprise</em></h2>
              <p className={styles.lead}>Abonnement mensuel. Pas de frais cachés, pas de commission à chaque facture émise.</p>
            </div>
            <div className={`${styles.plans} ${styles.reveal} ${styles.d1}`}>
              {[
                { tier: 'Starter', price: '29€', hl: false, feats: ['Jusqu\'à 50 factures/mois','Format Factur-X EN 16931','TVA DOM préconfigurée','Export FEC DGFiP','Support email'], off: ['Module BTP','Lecture automatique des factures','Suivi commercial'], btn: styles.planBtnOut, cta: 'Réserver mon accès' },
                { tier: 'Pro', price: '49€', hl: true, badge: 'Recommandé', feats: ['Factures illimitées','Tout du plan Starter','E-reporting DGFiP automatique','Module BTP & sous-traitance','Lecture automatique des factures','Suivi commercial','Relances automatiques'], btn: styles.planBtnGold, cta: 'Réserver mon accès' },
                { tier: 'Expert', price: '79€', hl: false, feats: ['Tout du plan Pro','Multi-établissements','Multi-utilisateurs illimités','API REST & webhooks','Support prioritaire local','Formation & onboarding'], btn: styles.planBtnFill, cta: 'Nous contacter' },
              ].map((p, i) => (
                <div key={i} className={`${styles.plan}${p.hl ? ' ' + styles.planHl : ''}`}>
                  {p.badge && <div className={styles.planBadge}>{p.badge}</div>}
                  <div className={styles.planTier}>{p.tier}</div>
                  <div className={styles.planPrice}>{p.price}<sub className={styles.planPriceSub}>/mois</sub></div>
                  <hr className={styles.planSep} />
                  <ul className={styles.planFeats}>
                    {p.feats.map(f => <li key={f} className={styles.featOn}>{f}</li>)}
                    {(p.off || []).map(f => <li key={f} className={styles.featOff}>{f}</li>)}
                  </ul>
                  <a href="#contact" className={p.btn}>{p.cta}</a>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', color: '#7A9A78', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', marginTop: '2rem', letterSpacing: '0.06em' }}>
              30 JOURS D&apos;ESSAI GRATUIT · SANS CARTE BANCAIRE · RÉSILIATION À TOUT MOMENT
            </p>
          </div>
        </section>

        {/* ROADMAP */}
        <section id="roadmap" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionIn}>
            <div className={`${styles.reveal}`} style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className={styles.h2}>Solution en cours<br /><em>de lancement</em></h2>
              <p className={styles.lead} style={{ maxWidth: 480, margin: '0 auto' }}>
                FactuGP est en accès anticipé. Suivez les étapes du lancement et réservez votre place parmi les premiers utilisateurs.
              </p>
            </div>
            <div className={`${styles.roadmap} ${styles.reveal} ${styles.d1}`}>
              {[
                { q: 'Q1 2026', status: 'done', title: 'Lancement FactuGP Beta', desc: 'Factures, devis, TVA DOM 8,5 % et 2,1 %, portail client, relances automatiques, PDF professionnel.' },
                { q: 'Q2 2026', status: 'done', title: 'Conformité légale complète', desc: 'Factur-X EN 16931, Chorus Pro DOM, export FEC DGFiP certifié. Toutes les obligations 2026 respectées.' },
                { q: 'Q3 2026', status: 'current', title: 'Suite complète disponible', desc: 'Module BTP, lecture automatique des factures, suivi commercial, modules Tourisme & Agriculture. Ouverture des accès.' },
                { q: 'À venir', status: 'next', title: 'Plateforme Agréée DGFiP', desc: 'Certification auprès d\'une Plateforme Agréée DGFiP (PA) pour la transmission e-reporting en conditions réelles.' },
              ].map((step, i) => (
                <div key={i} className={`${styles.rmStep} ${step.status === 'done' ? styles.rmDone : step.status === 'current' ? styles.rmCurrent : styles.rmNext}`}>
                  <div className={styles.rmDot}>
                    {step.status === 'done' ? <IconCheck size={16} strokeWidth={2.5} /> : step.status === 'current' ? <IconArrowRight size={16} strokeWidth={2} /> : <span />}
                  </div>
                  {i < 3 && <div className={styles.rmLine} />}
                  <div className={styles.rmQ}>{step.q}</div>
                  <div className={styles.rmTitle}>{step.title}</div>
                  <div className={styles.rmDesc}>{step.desc}</div>
                  {step.status === 'current' && (
                    <a href="#contact" className={styles.rmCta}>Rejoindre la liste d&apos;attente →</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className={styles.ctaSection}>
          <div className={styles.ctaIn}>
            <h2 className={styles.ctaH}>
              Septembre 2026,<br />
              <em className={styles.ctaHem}>c&apos;est maintenant</em>
            </h2>
            <p className={styles.ctaP}>
              Ne subissez pas la réforme — prenez les devants. On commence par faire le point gratuitement sur votre situation, puis on vous accompagne jusqu&apos;à être 100% en règle.
            </p>
            <div className={styles.ctaBtns}>
              <a href="mailto:contact@solyb.fr" className={styles.ctaBtnGold}>
                <IconFileInvoice size={16} /> Réserver mon accès anticipé →
              </a>
              <a href="mailto:contact@solyb.fr" className={styles.ctaBtnGhost}>
                <IconChartBar size={16} /> Voir une démo
              </a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <div className={styles.footerIn}>
            <div>
              <div className={styles.footerBrand}>FactuGP</div>
              <div className={styles.footerDesc}>Solution de facturation électronique pour les entreprises de Guadeloupe et des DOM. Conforme DGFiP, TVA DOM native, hébergée en France.</div>
              <div className={styles.footerSiren}>SolYB — SIREN 102699220 · Baie-Mahault, Guadeloupe</div>
            </div>
            <div>
              <div className={styles.footerColTitle}>Navigation</div>
              <ul className={styles.footerList}>
                {[['#fonctionnalites','Fonctionnalités'],['#tva','TVA DOM'],['#conformite','Conformité'],['#tarifs','Tarifs'],['#contact','Contact']].map(([h,l]) =>
                  <li key={h}><a href={h}>{l}</a></li>
                )}
              </ul>
            </div>
            <div>
              <div className={styles.footerColTitle}>Conformité</div>
              <ul className={styles.footerList}>
                {['Factur-X EN 16931','Chorus Pro DOM','E-reporting DGFiP','ISCA NF 525','FEC conforme','RGPD · Hébergé FR'].map(c =>
                  <li key={c}><span style={{ color: '#5A7A58', fontFamily: 'var(--font-sans)', fontSize: '0.85rem' }}>{c}</span></li>
                )}
              </ul>
            </div>
            <div>
              <div className={styles.footerColTitle}>Contact</div>
              <ul className={styles.footerList}>
                <li><a href="mailto:contact@solyb.fr">contact@solyb.fr</a></li>
                <li><span style={{ color: '#5A7A58', fontSize: '0.85rem' }}>Baie-Mahault · Guadeloupe 97122</span></li>
                <li style={{ marginTop: '0.5rem' }}><a href="https://solyb.fr">solyb.fr →</a></li>
              </ul>
            </div>
          </div>
          <div className={styles.footerBar}>
            <span>© 2026 SolYB — Solutions by Yacine Bouhassoun · SIREN 102699220</span>
            <span>Baie-Mahault · Guadeloupe · Tous droits réservés</span>
          </div>
        </footer>

      </div>
    </div>
  )
}

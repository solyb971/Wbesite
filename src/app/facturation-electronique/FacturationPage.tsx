'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const SmoothScroll = dynamic(() => import('@/components/ui/SmoothScroll'), { ssr: false })
import {
  IconFileInvoice, IconReceipt2, IconRefresh, IconBuildingSkyscraper,
  IconBrain, IconUsers, IconBriefcase, IconAnchor, IconCertificate,
  IconScale, IconBuildingBank, IconChartBar, IconArrowRight,
  IconCheck, IconClockHour4, IconShieldCheck, IconWorld,
} from '@tabler/icons-react'
import styles from './facturation.module.css'

/* Refonte « Ink / Pétrole / Sable » — port de factugp-refonte.html (CSS Modules) */

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

const FEATURES = [
  { icon: IconFileInvoice, tag: 'Factur-X EN 16931', title: 'Factures au bon format', desc: 'Vos factures sont créées dans le format officiel exigé par l\'État — un PDF lisible par l\'humain et une pièce XML lisible par les machines. Compatible Chorus Pro DOM.', chips: ['Factur-X', 'EN 16931', 'PDF/A-3'] },
  { icon: IconReceipt2, tag: 'TVA 8,5 % · 2,1 %', title: 'TVA DOM déjà réglée', desc: 'En Guadeloupe, Martinique, Réunion et Guyane, la TVA diffère de la métropole. FactuGP applique le bon taux automatiquement selon votre activité.', chips: ['8,5 %', '2,1 %', 'Multi-taux'] },
  { icon: IconRefresh, tag: 'E-reporting DGFiP', title: 'Déclaration automatique', desc: 'Les informations de vos ventes et encaissements partent automatiquement vers les impôts. Fini la saisie manuelle — FactuGP le fait pour vous, en temps réel.', chips: ['E-reporting', 'FEC DGFiP', 'Temps réel'] },
  { icon: IconBuildingSkyscraper, tag: 'Module BTP', title: 'TVA auto-liquidée', desc: 'Dans le bâtiment, c\'est le client qui paie la TVA à la place du sous-traitant. FactuGP gère cette règle automatiquement et produit les documents légaux.', chips: ['Auto-liquidée', 'Art. 283', 'Sous-traitance'] },
  { icon: IconBrain, tag: 'OCR IA', title: 'Lecture des factures reçues', desc: 'Photographiez ou déposez une facture fournisseur. L\'IA lit le montant, la date et le numéro de TVA. Vous vérifiez en un coup d\'œil, on enregistre le reste.', chips: ['Scan IA', 'Import auto', 'PDF'] },
  { icon: IconUsers, tag: 'Commercial', title: 'Devis & relances clients', desc: 'Créez un devis, transformez-le en facture d\'un clic, et laissez FactuGP envoyer les relances en cas d\'impayé. Tout depuis un seul outil.', chips: ['Devis', 'Relances', 'Suivi'] },
]

const RATES = [
  { value: '8,5', label: 'Taux normal', desc: 'Ventes de biens, prestations de services', ref: 'CGI art. 296', hl: true },
  { value: '2,1', label: 'Taux réduit', desc: 'Médicaments, presse, restauration', ref: 'CGI art. 296 bis', hl: false },
  { value: '0', label: 'Taux zéro', desc: 'Exportations, livraisons intracommunautaires', ref: 'Exonération', hl: false },
  { value: '1,05', label: 'Agricole', desc: 'Productions agricoles DOM', ref: 'Spécifique DOM', hl: false },
]

const SECTORS = [
  { icon: IconBriefcase, name: 'Commerce & négoce', sub: 'Caisse NF 525, B2B/B2C' },
  { icon: IconBuildingBank, name: 'Artisanat & services', sub: 'Devis, factures, relances' },
  { icon: IconScale, name: 'Professions libérales', sub: 'Honoraires, e-invoicing' },
  { icon: IconBuildingSkyscraper, name: 'BTP & construction', sub: 'TVA auto-liquidée, DGFiP' },
  { icon: IconAnchor, name: 'Tourisme & hôtellerie', sub: 'Taxe séjour, ISCA NF 525' },
  { icon: IconWorld, name: 'Agriculture & pêche', sub: 'Taux réduits, exonérations' },
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

const STATS = [
  { num: '24', lbl: 'Modules intégrés' },
  { num: '100%', lbl: 'Conforme DGFiP 2026' },
  { num: '3', lbl: 'Taux TVA DOM préconfigurés' },
  { num: '5 min', lbl: 'Pour être opérationnel' },
]

const PLANS = [
  { name: 'Starter', price: '29', featured: false, feats: ['Jusqu\'à 50 factures/mois', 'Format Factur-X EN 16931', 'TVA DOM préconfigurée', 'Export FEC DGFiP', 'Support email'], off: ['Module BTP', 'Lecture automatique des factures', 'Suivi commercial'], cta: 'Réserver mon accès' },
  { name: 'Pro', price: '49', featured: true, feats: ['Factures illimitées', 'Tout du plan Starter', 'E-reporting DGFiP automatique', 'Module BTP & sous-traitance', 'Lecture automatique des factures', 'Suivi commercial', 'Relances automatiques'], off: [], cta: 'Réserver mon accès' },
  { name: 'Expert', price: '79', featured: false, feats: ['Tout du plan Pro', 'Multi-établissements', 'Multi-utilisateurs illimités', 'API REST & webhooks', 'Support prioritaire local', 'Formation & onboarding'], off: [], cta: 'Nous contacter' },
]

const ROADMAP = [
  { q: 'Q1 2026', status: 'done', title: 'Lancement FactuGP Beta', desc: 'Factures, devis, TVA DOM 8,5 % et 2,1 %, portail client, relances automatiques, PDF professionnel.' },
  { q: 'Q2 2026', status: 'done', title: 'Conformité légale complète', desc: 'Factur-X EN 16931, Chorus Pro DOM, export FEC DGFiP certifié. Toutes les obligations 2026 respectées.' },
  { q: 'Q3 2026', status: 'current', title: 'Suite complète disponible', desc: 'Module BTP, lecture automatique des factures, suivi commercial, modules Tourisme & Agriculture. Ouverture des accès.' },
  { q: 'À venir', status: 'next', title: 'Plateforme Agréée DGFiP', desc: 'Certification auprès d\'une Plateforme Agréée DGFiP (PA) pour la transmission e-reporting en conditions réelles.' },
]

const TICKER_ITEMS = ['Facturation électronique', 'Chorus Pro DOM', 'TVA 8,5 % / 2,1 %', 'Factur-X EN 16931', 'FEC conforme DGFiP', 'Module BTP', 'ISCA NF 525', 'E-reporting', 'OCR IA fournisseurs', 'RGPD conforme', 'DOM 971']

const NAV_LINKS: [string, string][] = [['#fonctionnalites', 'Fonctionnalités'], ['#tva', 'TVA DOM'], ['#conformite', 'Conformité'], ['#tarifs', 'Tarifs'], ['#contact', 'Contact']]

export default function FacturationPage() {
  const cd = useCountdown()

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add(styles.revealed); obs.unobserve(e.target) } })
    }, { threshold: 0.12 })
    document.querySelectorAll(`.${styles.reveal}`).forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const Logo = () => (
    <a href="#" className={styles.logo} aria-label="FactuGP — accueil">
      Factu<em>GP</em><span className={styles.logoDot} />
    </a>
  )

  return (
    <div className={styles.page}>
      <SmoothScroll />

      {/* NAV */}
      <header className={styles.nav}>
        <div className={`${styles.wrap} ${styles.navIn}`}>
          <Logo />
          <nav className={styles.navLinks}>
            {NAV_LINKS.map(([h, l]) => <a key={h} href={h}>{l}</a>)}
          </nav>
          <a href="#contact" className={`${styles.btn} ${styles.btnGhost}`}>Accès anticipé</a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={`${styles.wrap} ${styles.heroInner}`}>
            <div>
              <div className={styles.heroPills}>
                <span className={styles.pill}>v2026.3.0 · Conformité DGFiP totale</span>
                <span className={`${styles.pill} ${styles.pillUrgent}`}>Réforme obligatoire · Septembre 2026</span>
              </div>
              <h1 className={styles.heroTitle}>Facturation électronique,<br /><em>sans la paperasse</em></h1>
              <p className={styles.heroLead}>
                À partir de septembre 2026, <b>toutes les entreprises qui paient la TVA</b> devront émettre et recevoir leurs factures au format électronique certifié. FactuGP est la seule solution construite depuis le départ pour les DOM.
              </p>
              <div className={styles.heroActions}>
                <a href="#contact" className={`${styles.btn} ${styles.btnSand}`}>
                  Rejoindre la liste d&apos;attente <IconArrowRight size={16} />
                </a>
                <a href="#fonctionnalites" className={`${styles.btn} ${styles.btnGhost}`}>Voir les fonctionnalités</a>
              </div>
              <div className={styles.heroTrust}>
                {['Conforme DGFiP', 'TVA DOM native', 'RGPD · Hébergé en France', 'Essai 30 jours'].map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            {/* Invoice mockup */}
            <div className={`${styles.invoice} ${styles.reveal}`}>
              <div className={styles.invoiceGlow} />
              <div className={styles.invoiceCard}>
                <svg className={styles.stamp} viewBox="0 0 200 200">
                  <defs><path id="fxStampPath" d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" /></defs>
                  <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="3 5" />
                  <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <text fontFamily="var(--ff-mono)" fontSize="11.5" letterSpacing="2.5" fill="currentColor">
                    <textPath href="#fxStampPath" startOffset="2%">CONFORME · DGFiP DOM · EN 16931 ·</textPath>
                  </text>
                  <text x="100" y="96" textAnchor="middle" fontFamily="var(--ff-mono)" fontSize="17" fontWeight="600" fill="currentColor">FACTUR-X</text>
                  <text x="100" y="116" textAnchor="middle" fontFamily="var(--ff-mono)" fontSize="10" letterSpacing="1.5" fill="currentColor">971 · 2026</text>
                </svg>
                <div className={styles.invoiceHead}>
                  <div>
                    <div className={styles.invoiceCompany}>Boulangerie Soleil des Alizés</div>
                    <div className={styles.invoiceSiren}>SIREN 123 456 789 · TVA FR12345678900</div>
                  </div>
                  <div className={styles.invoiceMeta}>
                    Émission <b>15 juin 2026</b><br />
                    Échéance <b>15 juillet 2026</b>
                  </div>
                </div>
                <div className={styles.invoiceNum}>FACTURE N° 2026-0147 — Client : Hôtel Karukéra SAS</div>
                <table className={styles.invoiceTable}>
                  <tbody>
                    <tr><td>Viennoiseries (×120)</td><td>260,40 €</td></tr>
                    <tr><td>Pains spéciaux (×50)</td><td>135,62 €</td></tr>
                    <tr><td>Livraison Baie-Mahault</td><td>32,55 €</td></tr>
                    <tr className={styles.invoiceTotal}><td>TOTAL TTC (TVA 8,5 %)</td><td>428,57 €</td></tr>
                  </tbody>
                </table>
                <div className={styles.invoiceChips}>
                  {['Format Factur-X EN 16931 · PDF/A-3', 'Transmis Chorus Pro DOM · Réf. CP-2026-0147', 'E-reporting DGFiP envoyé automatiquement'].map(c => (
                    <div key={c} className={styles.invoiceChip}><IconCheck size={13} /> {c}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div className={styles.ticker}>
          <div className={styles.tickerTrack}>
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i}><span className={styles.tickerItem}>{item}</span><span className={styles.tickerDot}>·</span></span>
            ))}
          </div>
        </div>

        {/* STATS */}
        <section className={styles.stats}>
          <div className={`${styles.wrap} ${styles.statsIn}`}>
            {STATS.map(s => (
              <div key={s.lbl}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLbl}>{s.lbl}</span>
              </div>
            ))}
          </div>
        </section>

        {/* FONCTIONNALITÉS */}
        <section id="fonctionnalites" className={styles.section}>
          <div className={styles.wrap}>
            <div className={`${styles.head} ${styles.reveal}`}>
              <span className={styles.eyebrow}>Fonctionnalités</span>
              <h2 className={styles.sectionTitle}>Tout ce qu&apos;il faut, <em className={styles.accentSand}>rien à configurer</em></h2>
              <p className={styles.lede}>De la création de la facture jusqu&apos;à sa transmission aux impôts — FactuGP gère toute la chaîne avec les règles fiscales propres aux DOM, déjà intégrées.</p>
            </div>
            <div className={`${styles.featuresGrid} ${styles.reveal}`}>
              {FEATURES.map(f => (
                <div key={f.title} className={styles.featuresCard}>
                  <div className={styles.featuresIcon}><f.icon size={20} strokeWidth={1.6} /></div>
                  <span className={styles.featuresTag}>{f.tag}</span>
                  <h3 className={styles.featuresTitle}>{f.title}</h3>
                  <p className={styles.featuresDesc}>{f.desc}</p>
                  <div className={styles.featuresChips}>
                    {f.chips.map(c => <span key={c} className={styles.chip}>{c}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TVA DOM */}
        <section id="tva" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={`${styles.wrap} ${styles.tvaInner}`}>
            <div className={styles.reveal}>
              <span className={styles.eyebrow}>TVA DOM</span>
              <h2 className={styles.sectionTitle} style={{ marginTop: 16 }}>Les taux <em className={styles.accentSand}>Guadeloupe & DOM</em></h2>
              <p className={styles.lede} style={{ marginTop: 16 }}>
                En Guadeloupe et dans les DOM, la TVA est plus basse qu&apos;en métropole. FactuGP connaît les bons taux et les applique automatiquement selon ce que vous vendez.
              </p>
              <div className={styles.tvaLegal}>
                <b>Base légale — CGI art. 294 à 297 A</b>
                <p>Ces taux sont fixés par la loi. FactuGP applique le bon taux selon votre activité (code NAF) et le type de vente — vous n&apos;avez rien à vérifier.</p>
              </div>
            </div>
            <div className={`${styles.rates} ${styles.reveal}`}>
              {RATES.map(r => (
                <div key={r.label} className={`${styles.rateCard} ${r.hl ? styles.rateCardHighlight : ''}`}>
                  <div className={styles.rateValue}>{r.value}<sup style={{ fontSize: '1rem', color: 'var(--sand)' }}> %</sup></div>
                  <div className={styles.rateLabel}>{r.label}</div>
                  <div className={styles.rateDesc}>{r.desc}</div>
                  <div className={styles.rateRef}>{r.ref}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTEURS */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={`${styles.head} ${styles.headCenter} ${styles.reveal}`}>
              <span className={styles.eyebrow}>Secteurs</span>
              <h2 className={styles.sectionTitle}>Vous payez la TVA ? <em className={styles.accentSand}>Vous êtes concerné.</em></h2>
              <p className={styles.lede}>Dès septembre 2026, toute entreprise assujettie à la TVA en Guadeloupe doit facturer au format électronique officiel — quel que soit son secteur.</p>
            </div>
            <div className={`${styles.sectorsGrid} ${styles.reveal}`}>
              {SECTORS.map(s => (
                <div key={s.name} className={styles.sectorCard}>
                  <div className={styles.sectorIcon}><s.icon size={20} strokeWidth={1.6} /></div>
                  <div className={styles.sectorTitle}>{s.name}</div>
                  <div className={styles.sectorSub}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONFORMITÉ (mur de tampons) */}
        <section id="conformite" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.wrap}>
            <div className={`${styles.head} ${styles.headCenter} ${styles.reveal}`}>
              <span className={styles.eyebrow}>Conformité</span>
              <h2 className={styles.sectionTitle}>100 % conforme, <em className={styles.accentSand}>sans effort de votre côté</em></h2>
              <p className={styles.lede}>FactuGP respecte toutes les normes exigées par l&apos;État — en France et en Europe. Chaque facture émise est automatiquement valide et légalement protégée.</p>
            </div>
            <div className={`${styles.badgesGrid} ${styles.reveal}`}>
              {STAMPS.map(s => (
                <div key={s.label} className={styles.badge}>
                  <div className={styles.badgeStamp}><s.icon size={24} strokeWidth={1.5} /></div>
                  <span className={styles.badgeLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={`${styles.countdownPanel} ${styles.reveal}`}>
              <span className={`${styles.eyebrow} ${styles.eyebrowSand}`}>Compte à rebours</span>
              <h2 className={styles.countdownTitle}>Obligation légale — 1<sup>er</sup> septembre 2026</h2>
              <p className={styles.countdownSub}>Toutes les entreprises qui paient la TVA · des amendes dès la première facture non conforme.</p>
              <div className={styles.countdownTimer}>
                {[['Jours', cd.d], ['Heures', String(cd.h).padStart(2, '0')], ['Min', String(cd.m).padStart(2, '0')], ['Sec', String(cd.s).padStart(2, '0')]].map(([lbl, val]) => (
                  <div key={lbl} className={styles.countdownUnit}>
                    <span className={styles.countdownNum}>{val}</span>
                    <span className={styles.countdownLabel}>{lbl}</span>
                  </div>
                ))}
              </div>
              <a href="#contact" className={`${styles.btn} ${styles.btnSand}`}><IconClockHour4 size={16} /> Réserver mon accès anticipé</a>
            </div>
          </div>
        </section>

        {/* TARIFS */}
        <section id="tarifs" className={styles.section}>
          <div className={styles.wrap}>
            <div className={`${styles.head} ${styles.headCenter} ${styles.reveal}`}>
              <span className={styles.eyebrow}>Tarifs</span>
              <h2 className={styles.sectionTitle}>Un prix fixe, <em className={styles.accentSand}>aucune surprise</em></h2>
              <p className={styles.lede}>Abonnement mensuel. Pas de frais cachés, pas de commission à chaque facture émise.</p>
            </div>
            <div className={`${styles.pricingGrid} ${styles.reveal}`}>
              {PLANS.map(p => (
                <div key={p.name} className={`${styles.plan} ${p.featured ? styles.planFeatured : ''}`}>
                  {p.featured && <span className={styles.planRibbon}>Recommandé</span>}
                  <div className={styles.planName}>{p.name}</div>
                  <div className={styles.planPrice}>{p.price}€<span> /mois</span></div>
                  <ul className={styles.planList}>
                    {p.feats.map(f => <li key={f}><IconCheck size={15} /> {f}</li>)}
                    {p.off.map(f => <li key={f} className={styles.planOff}>{f}</li>)}
                  </ul>
                  <a href="#contact" className={`${styles.btn} ${p.featured ? styles.btnSand : styles.btnGhost} ${styles.planCta}`}>{p.cta}</a>
                </div>
              ))}
            </div>
            <p className={styles.pricingNote}>30 jours d&apos;essai gratuit · sans carte bancaire · résiliation à tout moment</p>
          </div>
        </section>

        {/* ROADMAP */}
        <section id="roadmap" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.wrap}>
            <div className={`${styles.head} ${styles.reveal}`}>
              <span className={styles.eyebrow}>Feuille de route</span>
              <h2 className={styles.sectionTitle}>Solution en cours <em className={styles.accentSand}>de lancement</em></h2>
              <p className={styles.lede}>FactuGP est en accès anticipé. Suivez les étapes du lancement et réservez votre place parmi les premiers utilisateurs.</p>
            </div>
            <div className={`${styles.roadmapList} ${styles.reveal}`}>
              {ROADMAP.map(step => (
                <div key={step.title} className={`${styles.roadmapItem} ${step.status === 'done' ? styles.roadmapDone : step.status === 'next' ? styles.roadmapNext : ''}`}>
                  <div className={styles.roadmapMarker}>
                    {step.status === 'done' ? <IconCheck size={15} strokeWidth={2.5} /> : step.status === 'current' ? <IconArrowRight size={15} /> : <span />}
                  </div>
                  <div className={styles.roadmapQuarter}>{step.q}</div>
                  <div className={styles.roadmapTitle}>{step.title}</div>
                  <div className={styles.roadmapDesc}>{step.desc}</div>
                  {step.status === 'current' && <a href="#contact" className={styles.roadmapCta}>Rejoindre la liste d&apos;attente →</a>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section id="contact" className={styles.finalCta}>
          <div className={`${styles.wrap} ${styles.finalCtaInner}`}>
            <h2 className={styles.finalCtaTitle}>Septembre 2026, <em>c&apos;est maintenant</em></h2>
            <p className={styles.finalCtaLede}>Ne subissez pas la réforme — prenez les devants. On fait d&apos;abord le point gratuitement sur votre situation, puis on vous accompagne jusqu&apos;à être 100 % en règle.</p>
            <div className={styles.finalCtaActions}>
              <a href="mailto:contact@solyb.fr" className={`${styles.btn} ${styles.btnSand}`}><IconFileInvoice size={16} /> Réserver mon accès anticipé</a>
              <a href="mailto:contact@solyb.fr" className={`${styles.btn} ${styles.btnGhost}`}><IconChartBar size={16} /> Voir une démo</a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footerGrid}`}>
          <div className={styles.footerBrand}>
            <Logo />
            <p>Facturation électronique pour les entreprises de Guadeloupe et des DOM. Conforme DGFiP, TVA DOM native, hébergée en France.</p>
            <div className={styles.footerSiren}>SolYB — SIREN 102699220 · Baie-Mahault, Guadeloupe</div>
          </div>
          <div className={styles.footerCol}>
            <h4>Navigation</h4>
            <ul>{NAV_LINKS.map(([h, l]) => <li key={h}><a href={h}>{l}</a></li>)}</ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Conformité</h4>
            <ul>{['Factur-X EN 16931', 'Chorus Pro DOM', 'E-reporting DGFiP', 'ISCA NF 525', 'FEC conforme', 'RGPD · Hébergé FR'].map(c => <li key={c}>{c}</li>)}</ul>
          </div>
          <div className={styles.footerCol}>
            <h4>Contact</h4>
            <ul>
              <li><a href="mailto:contact@solyb.fr">contact@solyb.fr</a></li>
              <li>Baie-Mahault · Guadeloupe 97122</li>
              <li><a href="https://solyb.fr">solyb.fr →</a></li>
            </ul>
          </div>
        </div>
        <div className={`${styles.wrap} ${styles.footerBottom}`}>
          <span>© 2026 SolYB — Solutions by Yacine Bouhassoun · SIREN 102699220</span>
          <span>Baie-Mahault · Guadeloupe · Tous droits réservés</span>
        </div>
      </footer>
    </div>
  )
}

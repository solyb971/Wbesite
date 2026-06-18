import EarlyAccessForm from '@/components/site/EarlyAccessForm'
import RevealOnScroll from '@/components/site/RevealOnScroll'
import SmoothScroll from '@/components/ui/SmoothScroll'
import Countdown from './Countdown'
import {
  IconFileInvoice, IconReceipt2, IconRefresh, IconBuildingSkyscraper,
  IconBrain, IconUsers, IconBriefcase, IconAnchor, IconCertificate,
  IconScale, IconBuildingBank, IconChartBar, IconArrowRight,
  IconCheck, IconClockHour4, IconShieldCheck, IconWorld,
} from '@tabler/icons-react'
import styles from './facturation.module.css'

/* Server component — interactif isolé en îlots client (Countdown, RevealOnScroll,
   SmoothScroll, EarlyAccessForm). Design « Ink / Pétrole / Sable ». */

const FEATURES = [
  { icon: IconFileInvoice, tag: 'Factur-X EN 16931', title: 'Vos factures au bon format, automatiquement', desc: 'Vous n\'avez rien à apprendre : vos factures sont créées dans le format exigé par l\'État — un PDF que vous pouvez lire normalement, accompagné d\'un fichier technique que les impôts peuvent lire. Compatible avec le format Chorus Pro DOM.', chips: ['Factur-X', 'EN 16931', 'PDF/A-3'] },
  { icon: IconReceipt2, tag: 'TVA 8,5 % · 2,1 %', title: 'Le bon taux DOM, sans y penser', desc: 'En Guadeloupe, Martinique, Réunion et Guyane, la TVA n\'est pas celle de métropole. FactuGP applique automatiquement le taux qui correspond à votre activité — vous n\'avez pas à vous demander si c\'est 8,5 %, 2,1 % ou autre chose.', chips: ['8,5 %', '2,1 %', 'Multi-taux'] },
  { icon: IconRefresh, tag: 'E-reporting DGFiP', title: 'Votre déclaration, prête à partir automatiquement', desc: 'FactuGP prépare automatiquement les informations de vos ventes et encaissements pour votre déclaration aux impôts. Plus de saisie manuelle de votre côté. La transmission directe sera activée dès l\'obtention de l\'agrément Plateforme Agréée (PA), actuellement en cours de demande.', chips: ['E-reporting', 'FEC DGFiP', 'Temps réel'] },
  { icon: IconBuildingSkyscraper, tag: 'Module BTP', title: 'La TVA auto-liquidée, gérée pour vous', desc: 'Dans le bâtiment, c\'est le client qui paie la TVA à la place du sous-traitant — une règle qu\'on oublie facilement. FactuGP l\'applique automatiquement et produit les bons documents.', chips: ['Auto-liquidée', 'Art. 283', 'Sous-traitance'] },
  { icon: IconBrain, tag: 'OCR IA', title: 'Vos factures reçues, lues à votre place', desc: 'Vous photographiez ou déposez une facture fournisseur, l\'IA en extrait le montant, la date et le numéro de TVA. Vous vérifiez en un coup d\'œil, le reste s\'enregistre seul.', chips: ['Scan IA', 'Import auto', 'PDF'] },
  { icon: IconUsers, tag: 'Commercial', title: 'Devis, factures et relances, dans le même outil', desc: 'Vous créez un devis, vous le transformez en facture en un clic, et FactuGP relance pour vous en cas d\'impayé. Plus besoin d\'un outil à part pour ça.', chips: ['Devis', 'Relances', 'Suivi'] },
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
  { icon: IconAnchor, name: 'Tourisme & hôtellerie', sub: 'Taxe de séjour, ISCA NF 525' },
  { icon: IconWorld, name: 'Agriculture & pêche', sub: 'Taux réduits, exonérations' },
]

const STAMPS_DONE = [
  { icon: IconFileInvoice, label: 'Factur-X\nEN 16931' },
  { icon: IconShieldCheck, label: 'RGPD\nConforme' },
  { icon: IconWorld, label: 'Hébergé\nen France' },
  { icon: IconChartBar, label: 'FEC\nDGFiP' },
  { icon: IconReceipt2, label: 'TVA DOM\nNative' },
  { icon: IconCertificate, label: 'ISCA\nNF 525' },
]

const STAMPS_PENDING = [
  { icon: IconBuildingBank, label: 'Chorus Pro\nDOM' },
  { icon: IconRefresh, label: 'E-reporting\nDGFiP' },
]

const STATS = [
  { num: '24', lbl: 'Modules déjà prêts' },
  { num: '100%', lbl: 'Du format Factur-X intégré' },
  { num: '3', lbl: 'Taux de TVA DOM automatiques' },
  { num: '5 min', lbl: 'Pour créer votre compte' },
]

const PLANS = [
  { name: 'Starter', price: '29', featured: false, feats: ['Jusqu\'à 50 factures/mois', 'Format Factur-X EN 16931', 'TVA DOM préconfigurée', 'Export FEC DGFiP', 'Support email'], off: ['Module BTP', 'Lecture automatique des factures', 'Suivi commercial'], cta: 'Réserver mon accès' },
  { name: 'Pro', price: '49', featured: true, feats: ['Factures illimitées', 'Tout le plan Starter', 'E-reporting DGFiP automatique', 'Module BTP & sous-traitance', 'Lecture automatique des factures', 'Suivi commercial', 'Relances automatiques'], off: [], cta: 'Réserver mon accès' },
  { name: 'Expert', price: '79', featured: false, feats: ['Tout le plan Pro', 'Multi-établissements', 'Multi-utilisateurs illimités', 'API REST & webhooks', 'Support prioritaire local', 'Formation & onboarding'], off: [], cta: 'Nous contacter' },
]

const ROADMAP = [
  { q: 'Q1 2026', status: 'done', title: 'Lancement FactuGP Beta', desc: 'Factures, devis, TVA DOM 8,5 % et 2,1 %, portail client, relances automatiques, PDF professionnel.' },
  { q: 'Q2 2026', status: 'done', title: 'Conformité légale complète', desc: 'Factur-X EN 16931, format Chorus Pro DOM, export FEC DGFiP certifié. Toutes les briques techniques de la réforme 2026 intégrées.' },
  { q: 'Q3 2026', status: 'current', title: 'Suite complète disponible', desc: 'Module BTP, lecture automatique des factures, suivi commercial, modules Tourisme & Agriculture. Ouverture des accès.' },
  { q: 'À venir', status: 'next', title: 'Plateforme Agréée DGFiP', desc: 'Certification auprès d\'une Plateforme Agréée DGFiP (PA) pour la transmission e-reporting en conditions réelles.' },
]

const TICKER_ITEMS = ['Facturation électronique', 'Chorus Pro DOM', 'TVA 8,5 % / 2,1 %', 'Factur-X EN 16931', 'FEC conforme DGFiP', 'Module BTP', 'ISCA NF 525', 'E-reporting', 'OCR IA fournisseurs', 'RGPD conforme', 'DOM 971']

const NAV_LINKS: [string, string][] = [['#fonctionnalites', 'Fonctionnalités'], ['#tva', 'TVA DOM'], ['#conformite', 'Conformité'], ['#tarifs', 'Tarifs'], ['#contact', 'Contact']]

function Logo() {
  return (
    <a href="#" className={styles.logo} aria-label="FactuGP — accueil">
      Factu<em>GP</em><span className={styles.logoDot} />
    </a>
  )
}

export default function FacturationPage() {
  return (
    <div className={styles.page}>
      <SmoothScroll />
      <RevealOnScroll revealClass={styles.reveal} revealedClass={styles.revealed} />

      {/* NAV */}
      <header className={styles.nav}>
        <div className={`${styles.wrap} ${styles.navIn}`}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
            <Logo />
            <a href="https://solyb.fr" style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.62rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none' }}>
              par SolYB
            </a>
          </div>
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
                <span className={styles.pill}>v2026.3.0 · Format DGFiP respecté · Agrément PA en cours</span>
                <span className={`${styles.pill} ${styles.pillUrgent}`}>Réforme obligatoire · Septembre 2026</span>
              </div>
              <h1 className={styles.heroTitle}>La facturation électronique,<br /><em>sans vous compliquer la vie</em></h1>
              <p className={styles.heroLead}>
                À partir de septembre 2026, <b>si vous payez la TVA</b>, vous devrez émettre et recevoir vos factures dans un format électronique certifié. FactuGP est pensé depuis le départ pour les DOM — pas une solution métropolitaine adaptée à la dernière minute.
              </p>
              <div className={styles.heroActions}>
                <a href="#contact" className={`${styles.btn} ${styles.btnSand}`}>
                  Rejoindre la liste d&apos;attente <IconArrowRight size={16} />
                </a>
                <a href="#fonctionnalites" className={`${styles.btn} ${styles.btnGhost}`}>Voir les fonctionnalités</a>
              </div>
              <div className={styles.heroTrust}>
                {['Format Factur-X EN 16931', 'TVA DOM native', 'RGPD, hébergé en France', 'Essai 30 jours'].map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            {/* Invoice mockup */}
            <div className={`${styles.invoice} ${styles.reveal}`}>
              <div className={styles.invoiceGlow} />
              <div className={styles.invoiceCard}>
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
                  {['Format Factur-X EN 16931 · PDF/A-3', 'Compatible format Chorus Pro DOM', 'E-reporting DGFiP prêt · agrément PA en cours'].map(c => (
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
              <p className={styles.lede}>De la création de la facture jusqu&apos;à sa déclaration fiscale, FactuGP gère toute la chaîne avec les règles fiscales des DOM déjà intégrées.</p>
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
              <h2 className={styles.sectionTitle} style={{ marginTop: 16 }}>Les taux <em className={styles.accentSand}>Guadeloupe & DOM</em>, déjà réglés</h2>
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
              <h2 className={styles.sectionTitle}>Vous payez la TVA ? <em className={styles.accentSand}>Cette réforme vous concerne.</em></h2>
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
              <h2 className={styles.sectionTitle}>Les normes techniques, déjà respectées. <em className={styles.accentSand}>L&apos;agrément, en cours.</em></h2>
              <p className={styles.lede}>FactuGP respecte déjà les normes techniques exigées par l&apos;État, en France et en Europe — format de facture, taux de TVA DOM, export FEC. La demande d&apos;agrément en tant que Plateforme Agréée (PA) auprès de la DGFiP est en cours : c&apos;est l&apos;étape qui permettra d&apos;activer la transmission e-reporting en conditions réelles.</p>
            </div>

            <div className={`${styles.reveal}`} style={{ marginBottom: '2.5rem' }}>
              <div className={styles.eyebrow} style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: '1.25rem' }}>
                <IconCheck size={14} strokeWidth={2.5} /> Déjà respecté
              </div>
              <div className={styles.badgesGrid}>
                {STAMPS_DONE.map(s => (
                  <div key={s.label} className={styles.badge}>
                    <div className={styles.badgeStamp}><s.icon size={24} strokeWidth={1.5} /></div>
                    <span className={styles.badgeLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.reveal}`}>
              <div className={styles.eyebrow} style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center', marginBottom: '1.25rem' }}>
                <IconClockHour4 size={14} /> En cours d&apos;agrément PA
              </div>
              <div className={styles.badgesGrid} style={{ opacity: 0.62 }}>
                {STAMPS_PENDING.map(s => (
                  <div key={s.label} className={styles.badge}>
                    <div className={styles.badgeStamp}><s.icon size={24} strokeWidth={1.5} /></div>
                    <span className={styles.badgeLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* COUNTDOWN */}
        <section className={styles.section}>
          <div className={styles.wrap}>
            <div className={`${styles.countdownPanel} ${styles.reveal}`}>
              <span className={`${styles.eyebrow} ${styles.eyebrowSand}`}>Compte à rebours</span>
              <h2 className={styles.countdownTitle}>L&apos;échéance légale — 1<sup>er</sup> septembre 2026</h2>
              <p className={styles.countdownSub}>Toute entreprise qui paie la TVA est concernée — et les amendes s&apos;appliquent dès la première facture non conforme. Mieux vaut s&apos;y préparer maintenant que dans l&apos;urgence de fin d&apos;été.</p>
              <Countdown />
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
              <p className={styles.lede}>Un abonnement mensuel. Pas de frais cachés, pas de commission sur chaque facture émise.</p>
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
              <h2 className={styles.sectionTitle}>Une solution qui se construit, <em className={styles.accentSand}>étape par étape</em></h2>
              <p className={styles.lede}>FactuGP est en accès anticipé. <strong style={{ color: 'var(--paper)' }}>Ce qui est marqué fonctionne déjà aujourd&apos;hui</strong> ; le reste arrive avant l&apos;échéance. Réservez votre place parmi les premiers utilisateurs.</p>
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
            <h2 className={styles.finalCtaTitle}>Septembre 2026 arrive vite. <em>Autant prendre les devants.</em></h2>
            <p className={styles.finalCtaLede}>On fait d&apos;abord un point gratuit sur votre situation, puis on vous accompagne jusqu&apos;à être 100 % en règle.</p>
            <EarlyAccessForm
              theme={{
                surface: '#132226', text: '#F3EFE6', muted: '#8FA39F',
                border: 'rgba(243,239,230,0.18)', borderFocus: '#5FBDBE',
                accent: '#E2A565', accentText: '#0A1316', radius: '12px',
                fontMono: 'var(--font-mono)',
              }}
              source="factugp"
              projectType="facturation"
              productSource="factu_gp"
              productName="FactuGP"
            />
            <p className={styles.finalCtaLede} style={{ marginTop: '1rem', fontSize: '0.8rem', opacity: 0.7 }}>
              Sans engagement · on ne partage jamais vos données.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footerGrid}`}>
          <div className={styles.footerBrand}>
            <Logo />
            <p>Facturation électronique pour les entreprises de Guadeloupe et des DOM. Aux normes DGFiP, TVA DOM native, hébergée en France.</p>
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

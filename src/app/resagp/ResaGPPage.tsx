import EarlyAccessForm from '@/components/site/EarlyAccessForm'
import RevealOnScroll from '@/components/site/RevealOnScroll'
import SmoothScroll from '@/components/ui/SmoothScroll'
import PlanDeSalle from './PlanDeSalle'
import {
  CalendarCheck, MapTrifold, DeviceMobile, Users, ForkKnife,
  ChartBar, Bell, Key, CreditCard, ArrowRight, CheckCircle,
  Clock, Storefront, WifiHigh, Star,
} from '@phosphor-icons/react/dist/ssr'
import styles from './resagp.module.css'

/* Server component — interactif isolé en îlots client (PlanDeSalle, RevealOnScroll,
   SmoothScroll, EarlyAccessForm). Thème ardoise (charte ResaGP v1.1). */

/* Marque ResaGP — table vue de dessus (charte v1.1) */
function ResaMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 88 88" fill="none" aria-hidden>
      <rect x="2" y="2" width="84" height="84" rx="3" stroke="#7AAFC4" strokeWidth="1.4" />
      <rect x="26" y="40" width="36" height="8" rx="2.5" fill="#7AAFC4" />
      <rect x="29" y="22" width="12" height="5" rx="2" fill="#F5EDD8" opacity="0.72" />
      <rect x="47" y="22" width="12" height="5" rx="2" fill="#F5EDD8" opacity="0.72" />
      <rect x="29" y="61" width="12" height="5" rx="2" fill="#F5EDD8" opacity="0.72" />
      <rect x="47" y="61" width="12" height="5" rx="2" fill="#F5EDD8" opacity="0.72" />
    </svg>
  )
}

const FEATURES = [
  { n: '01', Icon: CalendarCheck, title: 'Réservations en ligne', sub: 'Disponible 24h/24, 7j/7', desc: 'Un client veut réserver un dimanche à 23h, personne ne décroche. Avec ResaGP, il réserve lui-même depuis votre site, Facebook ou un lien WhatsApp. Confirmation email et SMS dans la seconde. Zéro appel manqué, zéro post-it perdu.', tags: ['Confirmation instantanée', 'Email auto', 'SMS auto'] },
  { n: '02', Icon: MapTrifold,    title: 'Plan de salle en direct', sub: 'Mis à jour en temps réel', desc: 'Toute votre salle d\'un coup d\'œil, sur tablette ou écran. Vous déplacez les tables à la souris pour réorganiser, et toute l\'équipe voit la même chose en même temps — plus de « attends, je vérifie avec la cuisine ».', tags: ['Drag & drop', 'Sync live', 'Multi-écrans'] },
  { n: '03', Icon: DeviceMobile,  title: 'Appli service sur smartphone', sub: 'Aucune installation', desc: 'Votre équipe accueille, installe et encaisse directement depuis son téléphone, sans rien télécharger. Pratique quand les serveurs changent de poste en plein service.', tags: ['Mobile-first', 'Walk-in', 'Caisse intégrée'] },
  { n: '04', Icon: Users,         title: 'Fiches clients automatiques', sub: 'Chaque visite enrichit la fiche', desc: 'À chaque réservation, une fiche se remplit toute seule : historique, allergies, occasion spéciale. Vos habitués se sentent reconnus, sans que vous ayez à vous souvenir de tout. Les demandes d\'avis Google partent seules.', tags: ['Historique', 'Allergies', 'Avis Google'] },
  { n: '05', Icon: ForkKnife,     title: 'Carte numérique & QR Code', sub: 'Mise à jour en un clic', desc: 'Le saumon est terminé en plein rush ? Retirez-le en un clic, plus personne ne peut le commander. Vos clients scannent la table et peuvent même précommander avant de s\'asseoir.', tags: ['QR Code', 'Ruptures live', 'Pré-commandes'] },
  { n: '06', Icon: ChartBar,      title: 'Statistiques sans effort', sub: '7j · 30j · 90j, en un coup d\'œil', desc: 'Quel soir remplissez-vous le moins ? Quel jour les absences explosent ? Tout s\'affiche en graphiques clairs, sans tableur à remplir, comparé automatiquement à la période précédente.', tags: ['Remplissage', 'Absences', 'Fidélisation'] },
  { n: '07', Icon: Bell,          title: 'Rappels anti-absences', sub: 'Veille + 2h avant, automatiquement', desc: 'Une table de 6 réservée à 20h qui ne vient pas, c\'est un service en moins ce soir. Rappel par email et SMS la veille, puis un dernier SMS deux heures avant. Vous n\'avez rien à faire, vous avez juste moins de tables vides.', tags: ['Rappel J-1', 'Rappel H-2', 'Avis post-repas'] },
  { n: '08', Icon: Key,           title: 'Gestion d\'équipe', sub: 'Gérant · Manager · Hôte', desc: 'Vous invitez votre équipe par email en quelques secondes. Chacun voit uniquement ce dont il a besoin selon son rôle, et un historique garde une trace de chaque action.', tags: ['3 rôles', 'Invitation email', 'Journal des actions'] },
  { n: '09', Icon: CreditCard,    title: 'Encaissement à table', sub: 'CB · Espèces · Ticket resto', desc: 'En fin de repas, vous encaissez directement depuis l\'appli. Le pourboire se calcule seul, et la table redevient libre instantanément sur le plan de salle.', tags: ['Multi-paiement', 'Pourboire auto', 'Clôture table'] },
]

const WORKFLOW = [
  { Icon: CalendarCheck, step: '01', title: 'Réservation reçue', desc: 'Le client réserve en ligne. Confirmation immédiate par email et SMS.' },
  { Icon: Bell,          step: '02', title: 'Rappels automatiques', desc: 'La veille et 2h avant : rappels automatiques. Moins d\'absences, sans un seul appel à passer.' },
  { Icon: Storefront,    step: '03', title: 'Accueil & installation', desc: 'L\'hôte valide l\'arrivée sur tablette. La table passe à occupée en un geste.' },
  { Icon: ForkKnife,     step: '04', title: 'Service & encaissement', desc: 'Commandes, suivi, addition et paiement — tout depuis l\'appli, sans repasser par la caisse.' },
  { Icon: Star,          step: '05', title: 'Avis post-repas', desc: '25h après le repas, une demande d\'avis Google part toute seule.' },
]

const CMP_ROWS = [
  { crit: 'Commission par couvert',       z: 'Oui', gp: 'Non' },
  { crit: 'Interface en français',         z: 'Partiel', gp: 'Oui' },
  { crit: 'Conformité RGPD',              z: 'Partiel', gp: 'Oui' },
  { crit: 'Plan de salle interactif',     z: 'Oui', gp: 'Oui' },
  { crit: 'CRM clients intégré',          z: 'Limité', gp: 'Oui' },
  { crit: 'Menu digital & QR Code',       z: 'Non', gp: 'Oui' },
  { crit: 'Caisse intégrée',              z: 'Non', gp: 'Oui' },
  { crit: 'Essai gratuit sans CB',        z: 'Non', gp: '14 jours' },
]

const TICKER_ITEMS = ['RÉSERVATION EN LIGNE', 'PLAN DE SALLE', 'FICHES CLIENTS', 'SMS RAPPELS', 'MENU QR CODE', 'STATISTIQUES', 'ZÉRO COMMISSION', 'RGPD', 'MULTI-ÉTABLISSEMENTS', 'CARTES CADEAUX', 'ÉQUIPE & RÔLES', 'CAISSE INTÉGRÉE']

export default function ResaGPPage() {
  return (
    <div className={styles.page}>
      <SmoothScroll />
      <RevealOnScroll revealClass={styles.reveal} revealedClass={styles.revealed} threshold={0.07} />
      <div className={styles.grain} aria-hidden />
      <div className={styles.wrap}>

        {/* NAV */}
        <nav className={styles.nav}>
          <div className={styles.navIn}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
              <a href="#" className={styles.logo} aria-label="ResaGP — accueil">
                <ResaMark size={30} />
                <span className={styles.logoText}>Resa<em className={styles.logoGp}>GP</em></span>
              </a>
              <a href="https://solyb.fr" style={{ fontFamily: 'var(--font-space-mono), monospace', fontSize: '0.58rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--rg-mu)', textDecoration: 'none' }}>
                par SolYB
              </a>
            </div>
            <div className={styles.navLinks}>
              {[['#fonctionnalites','Fonctionnalités'],['#workflow','Comment ça marche'],['#avantages','Pourquoi ResaGP'],['#formules','Tarifs'],['#contact','Contact']].map(([h,l]) =>
                <a key={h} href={h} className={styles.navLink}>{l}</a>
              )}
            </div>
            <a href="#contact" className={styles.navBtn}>
              Essai gratuit 14 jours <ArrowRight size={13} weight="bold" style={{ display:'inline', verticalAlign:'middle' }} />
            </a>
          </div>
        </nav>

        {/* HERO */}
        <section style={{ background: 'var(--rg-bg)', paddingTop: '62px' }}>
          <div className={styles.hero}>
            <div>
              <div className={styles.kicker}>
                <span className={styles.kickerDot} />
                <span className={styles.kickerLine} />
                Essai gratuit 14 jours · Zéro commission · RGPD conforme · Guadeloupe
              </div>
              <h1 className={styles.h1}>
                Votre salle,<br />
                <span className={styles.h1Strong}>vos règles.</span>
              </h1>
              <div className={styles.zeroCom}>
                <span className={styles.zeroNum}>0%</span>
                <span className={styles.zeroTxt}>de commission<br /><em>sur vos couverts</em></span>
              </div>
              <p className={styles.sub}>
                Réservations, plan de salle, commandes et encaissement : tout dans un seul outil, sans rien reverser sur ce que vous servez. Prêt en 5&nbsp;minutes, sans technicien.
              </p>
              <div className={styles.ctas}>
                <a href="#contact" className={styles.btnPrimary}>
                  <ForkKnife size={16} weight="duotone" /> Démarrer l&apos;essai gratuit
                </a>
                <a href="#fonctionnalites" className={styles.btnSecondary}>
                  <ChartBar size={16} weight="duotone" /> Voir les fonctionnalités
                </a>
              </div>
              <div className={styles.trust}>
                {['Sans commission','14 jours gratuits','RGPD · France','Setup 5 min'].map(t => (
                  <span key={t} className={styles.trustItem}><span className={styles.trustDot} />{t}</span>
                ))}
              </div>
            </div>

            <div className={styles.cardCol}>
              <div className={styles.dash}>
                <div className={styles.dashAccent} />

                {/* Header */}
                <div className={styles.dashHeader}>
                  <div>
                    <div className={styles.dashBrand}>Restaurant La Terrasse</div>
                    <div className={styles.dashSub}>Mer. 04 Juin 2026 · Service du soir</div>
                  </div>
                  <div className={styles.dashLive}><span className={styles.dashLiveDot} />En direct</div>
                </div>

                {/* KPIs */}
                <div className={styles.dashKpis}>
                  {[
                    { v: '18', lbl: 'Réservations' },
                    { v: '62', lbl: 'Couverts' },
                    { v: '87%', lbl: 'Remplissage' },
                    { v: '1 840€', lbl: 'CA estimé' },
                  ].map((k, i) => (
                    <div key={i} className={styles.dashKpi}>
                      <span className={styles.dashKpiV}>{k.v}</span>
                      <span className={styles.dashKpiL}>{k.lbl}</span>
                    </div>
                  ))}
                </div>

                {/* Plan de salle */}
                <div className={styles.dashSalleLabel}>Plan de salle — Terrasse</div>
                <PlanDeSalle />
                <div className={styles.dashLegend}>
                  <span className={styles.dashLegItem}><span className={styles.dashDotLibre} />Libre</span>
                  <span className={styles.dashLegItem}><span className={styles.dashDotOccupee} />Occupée</span>
                  <span className={styles.dashLegItem}><span className={styles.dashDotReservee} />Réservée</span>
                </div>

                {/* Prochaines réservations */}
                <div className={styles.dashSalleLabel} style={{ marginTop: '1rem' }}>Prochaines arrivées</div>
                {[
                  { h: '19h30', n: 'Antoine M.', cv: '4', t: 'T12', st: 'confirmee' },
                  { h: '20h00', n: 'Sophie K.', cv: '2', t: 'T5',  st: 'confirmee' },
                  { h: '20h15', n: 'Marc D.', cv: '6', t: 'T4',  st: 'attente' },
                ].map((r, i) => (
                  <div key={i} className={styles.dashResa}>
                    <span className={styles.dashResaH}>{r.h}</span>
                    <span className={styles.dashResaN}>{r.n}</span>
                    <span className={styles.dashResaInfo}>{r.cv} cvts · {r.t}</span>
                    <span className={r.st === 'confirmee' ? styles.dashResaOk : styles.dashResaWait}>
                      {r.st === 'confirmee' ? '✓' : '⏳'}
                    </span>
                  </div>
                ))}

                {/* Encaissement */}
                <div className={styles.dashCaisse}>
                  <CreditCard size={13} weight="duotone" />
                  <span>Encaissement actif · CB · Espèces · Ticket resto</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <div className={styles.stats}>
          <div className={styles.statsIn}>
            {[
              { num: '9', suf: '', lbl: 'Outils réunis en un seul' },
              { num: '5', suf: ' min', lbl: 'Opérationnel avant ce soir' },
              { num: '14', suf: 'j', lbl: 'Gratuits, sans carte bancaire' },
              { num: '0', suf: '%', lbl: 'Commission par couvert' },
            ].map((s, i) => (
              <div key={i}>
                <span className={styles.statNum}>{s.num}{s.suf}</span>
                <span className={styles.statLbl}>{s.lbl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TICKER */}
        <div className={styles.ticker}>
          <div className={styles.tickerTrack}>
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i}><span className={styles.tickerItem}>{item}</span><span className={styles.tickerDot}>·</span></span>
            ))}
          </div>
        </div>

        {/* FONCTIONNALITÉS */}
        <section id="fonctionnalites" className={styles.section}>
          <div className={styles.sectionIn}>
            <div className={styles.reveal} style={{ marginBottom: '3rem' }}>
              <h2 className={styles.h2}>Tout ce dont votre restaurant<br /><span className={styles.h2Strong}>a besoin, dans un seul outil</span></h2>
              <p className={styles.lead} style={{ maxWidth: 540 }}>Réservations, plan de salle, commandes, encaissement, rappels clients : tout se gère depuis votre téléphone, votre tablette ou votre ordinateur. Plus besoin de jongler entre trois applications et un carnet.</p>
            </div>
            <div className={`${styles.feats} ${styles.reveal} ${styles.d1}`}>
              {FEATURES.map((f, i) => (
                <div key={i} className={styles.feat}>
                  <div className={styles.featN}>{f.n}</div>
                  <div className={styles.featIcon}><f.Icon size={22} weight="duotone" /></div>
                  <div className={styles.featTitle}>{f.title}</div>
                  <div className={styles.featSub}>{f.sub}</div>
                  <div className={styles.featDesc}>{f.desc}</div>
                  <div className={styles.featTags}>{f.tags.map(t => <span key={t} className={styles.tag}>{t}</span>)}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORKFLOW */}
        <section id="workflow" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionIn}>
            <div className={styles.reveal} style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
              <h2 className={styles.h2}>De la réservation<br /><span className={styles.h2Strong}>à l&apos;avis Google</span></h2>
              <p className={styles.lead} style={{ maxWidth: 480, margin: '0 auto' }}>Le client réserve, vous n&apos;avez plus qu&apos;à bien le recevoir. Rappels, accueil, service, encaissement, demande d&apos;avis : tout part automatiquement au bon moment.</p>
            </div>
            <div className={`${styles.workflow} ${styles.reveal} ${styles.d1}`}>
              {WORKFLOW.map((w, i) => (
                <div key={i} className={styles.wfStep}>
                  <div className={styles.wfDot}>
                    <w.Icon size={24} weight="duotone" />
                    <span className={styles.wfNum}>{w.step}</span>
                  </div>
                  <div className={styles.wfTitle}>{w.title}</div>
                  <div className={styles.wfDesc}>{w.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AVANTAGES */}
        <section id="avantages" className={styles.section}>
          <div className={styles.sectionIn}>
            <div className={`${styles.reveal}`} style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className={styles.h2}>Pensé pour votre salle,<br /><span className={styles.h2Strong}>pas pour une plateforme générique</span></h2>
              <p className={styles.lead} style={{ maxWidth: 480, margin: '0 auto' }}>Trois différences qui comptent quand la salle est pleine et que le téléphone n&apos;arrête pas de sonner.</p>
            </div>
            <div className={`${styles.avGrid} ${styles.reveal} ${styles.d1}`}>
              {[
                { icon: <Star size={28} weight="duotone" />, title: 'Zéro commission sur vos couverts', desc: 'Un abonnement fixe, point final. Que vous fassiez 20 ou 200 couverts ce soir, vous payez le même prix chaque mois. Ce que vous servez vous appartient entièrement.' },
                { icon: <WifiHigh size={28} weight="duotone" />, title: 'Opérationnel en 5 minutes', desc: 'Pas de technicien, pas d\'installation, pas de formation de trois jours. Vous créez votre compte, vous configurez votre salle, vos clients réservent en ligne dans l\'heure.' },
                { icon: <Bell size={28} weight="duotone" />, title: 'Un interlocuteur en Guadeloupe', desc: 'Un problème pendant le rush du samedi soir ? Vous parlez à quelqu\'un qui connaît votre métier et votre île — pas un centre d\'appel à 7 000 km. Réponse sous 24h, en français.' },
              ].map((a, i) => (
                <div key={i} className={styles.avCard}>
                  <div className={styles.avIcon}>{a.icon}</div>
                  <div className={styles.avTitle}>{a.title}</div>
                  <div className={styles.avDesc}>{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FORMULES */}
        <section id="formules" className={`${styles.section} ${styles.sectionAlt}`}>
          <div className={styles.sectionIn}>
            <div className={styles.reveal} style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
              <h2 className={styles.h2} style={{ textAlign: 'center' }}>Un prix fixe,<br /><span className={styles.h2Strong}>pas de mauvaise surprise</span></h2>
              <p className={styles.lead}>Vous savez exactement ce que vous payez chaque mois. Aucune commission sur vos couverts, que la salle soit pleine ou à moitié vide.</p>
            </div>
            <div className={`${styles.plans} ${styles.reveal} ${styles.d1}`}>
              {[
                { formule: 'Essentiel', price: '59€', hl: false, feats: ['Réservation en ligne 24h/24','Confirmations email automatiques','Rappels J-1 et H-2','Support email'], off: ['Plan de salle','SMS','Fiches clients','Statistiques','Menu QR Code'], btn: styles.planBtnOut, cta: 'Démarrer l\'essai gratuit' },
                { formule: 'Pro', price: '99€', hl: true, badge: 'Recommandé', feats: ['Tout le plan Essentiel','Plan de salle interactif','Rappels SMS','Fiches clients enrichies','Statistiques & rapports','Menu QR Code','Avis Google automatiques','Application mobile service'], btn: styles.planBtnFill, cta: 'Démarrer l\'essai gratuit' },
                { formule: 'Business', price: '149€', hl: false, feats: ['Tout le plan Pro','Établissements illimités','Cartes cadeaux','Équipe illimitée','Support prioritaire local','API REST & Webhooks'], btn: styles.planBtnOut, cta: 'Nous contacter' },
              ].map((p, i) => (
                <div key={i} className={`${styles.plan}${p.hl ? ' ' + styles.planHl : ''}`}>
                  <div className={styles.planAccent} />
                  {p.badge && <div className={styles.planBadge}>{p.badge}</div>}
                  <div className={styles.planFormule}>{p.formule}</div>
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
            <p style={{ textAlign: 'center', color: 'var(--rg-mu)', fontFamily: 'var(--rg-mono)', fontSize: '0.62rem', marginTop: '2rem', letterSpacing: '0.06em' }}>
              RÉDUCTION ANNUELLE −17% · 14 JOURS D&apos;ESSAI GRATUIT · SANS CARTE BANCAIRE · SANS ENGAGEMENT
            </p>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className={styles.ctaSection}>
          <div className={styles.ctaGlow} />
          <div className={styles.ctaIn}>
            <h2 className={styles.ctaH}>Arrêtez de payer une commission<br /><span className={styles.ctaHStrong}>sur ce que vous servez.</span></h2>
            <p className={styles.ctaP}>14 jours d&apos;essai gratuit, sans carte bancaire. Opérationnel en moins de 5 minutes. Vos données restent en France.</p>
            <EarlyAccessForm
              theme={{
                surface: '#1A1713', text: '#F5EDD8', muted: '#A89880',
                border: 'rgba(122,175,196,0.22)', borderFocus: '#7AAFC4',
                accent: '#7AAFC4', accentText: '#0E0C08', radius: '3px',
                fontMono: 'var(--font-space-mono)',
              }}
              source="resagp"
              projectType="saas"
              productSource="resa_gp"
              productName="ResaGP"
              submitLabel="Démarrer l'essai gratuit"
              successText="On vous recontacte pour lancer votre essai — sous 24h en semaine."
            />
          </div>
        </section>

        {/* FOOTER */}
        <footer className={styles.footer}>
          <div className={styles.footerIn}>
            <div>
              <div className={styles.footerBrand}>
                <ResaMark size={26} />
                <span>Resa<em className={styles.logoGp}>GP</em></span>
              </div>
              <div className={styles.footerDesc}>Plateforme de gestion restaurant pour les établissements de Guadeloupe. Sans commission, conforme RGPD, hébergé en France.</div>
              <div className={styles.footerSiren}>SolYB — SIREN 102699220 · Baie-Mahault, Guadeloupe</div>
            </div>
            <div>
              <div className={styles.footerColTitle}>Navigation</div>
              <ul className={styles.footerList}>
                {[['#fonctionnalites','Fonctionnalités'],['#workflow','Comment ça marche'],['#formules','Tarifs'],['#contact','Contact']].map(([h,l]) => <li key={h}><a href={h}>{l}</a></li>)}
              </ul>
            </div>
            <div>
              <div className={styles.footerColTitle}>Avantages</div>
              <ul className={styles.footerList}>
                {['Zéro commission','Interface française','RGPD · Hébergé FR','Fiches clients','Menu digital','Support local'].map(c => <li key={c}><span style={{ color: 'var(--rg-mu)', fontFamily: 'var(--rg-sans)', fontSize: '0.85rem' }}>{c}</span></li>)}
              </ul>
            </div>
            <div>
              <div className={styles.footerColTitle}>Contact</div>
              <ul className={styles.footerList}>
                <li><a href="mailto:contact@solyb.fr">contact@solyb.fr</a></li>
                <li><span style={{ color: 'var(--rg-mu)', fontSize: '0.85rem' }}>Baie-Mahault · Guadeloupe 97122</span></li>
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

# 🏗️ Chantier SolYB — Backlog centralisé des améliorations

> Fichier de suivi unique de **toutes les recommandations** (UI, copy, UX, SEO, technique…).
> Source initiale : audit UI `audit_ui_solyb.html` (juin 2026). À enrichir au fil des autres audits.

**Légende statut :**
`[ ]` à faire · `[~]` en cours · `[x]` fait · `[asset]` nécessite un visuel/contenu de Yacine · `[décision]` nécessite un arbitrage de Yacine · `[obsolète]` reco déjà couverte / non pertinente

**Légende code :** 🟢 faisable en code · 🟡 code + contenu · 🔴 hors code (asset / décision / externe)

---

## ✅ AVANCEMENT — 5 lots livrés (déployés en prod)

| Lot | Périmètre | PR |
|---|---|---|
| **1 — Crédibilité & copy** | Stats sans « 0 » (CountUp), FeatureStats cohérent, About 1re pers. (sans IA / sans « conformité fiscale »), Tarifs (fin « premières références » + badge « Recommandé pour démarrer »), Hero (titre + césure H1 + sous-titre), CTA « Recevoir mon devis gratuit », Process « visio/présentiel » | #15 |
| **2 — Copy services & sections** | Services (titre/intro/3 cards), Bandeau facturation (affirmatif + dates), Outils (« faits ici » + FactuGP sept. 2026), Réalisations (titre + résultat), Nav (« Ce qu'on fait… ») | #16 |
| **3 — Structure** | Réordonnancement home (engagements + preuve sociale avant tarifs), suppression section fantôme « Stakes », Engagements condensés + « je »→« on » | #17 |
| **4 — Palette** | Fond crème chaud `#FFF9F6`, turquoise caraïbe `#00BFA5`, tokens `--syb-warm/teal/teal-deep` | #18 |
| **5 — Conversion & mémorable** | Footer enrichi (email/WhatsApp/CTA), formulaire « (WhatsApp bienvenu) », badge hero « En ligne · Baie-Mahault · 971 » (point vert) | #19 |

**Items résolus :** C1, C2, C5, T1, T2, T3, T5, U1, U2, U5, S1, S2, S3, S6, A2-1, A2-2, A2-3, A2-4, A2-5, A2-7, A2-8, A2-9, A2-11, A2-12, A2-13, M1 (palette/typo), M2.

### ⏳ Reste à faire — **hors code** (assets / décisions de Yacine)
| Item | Quoi |
|---|---|
| C4 | 📷 Photo du fondateur (section À propos) |
| C3 | 🗂️ 2-3 projets portfolio (ou démos concept) |
| M4 | 💬 Témoignage réel — **en cours** (client Liberty Drive Serenity) |
| M3 / S4 | 🖼️ Démo interactive / captures ResaGP — le plus « mémorable » |
| S6 (réseaux) | 🔗 Comptes Instagram / Facebook (sinon liens omis du footer) |
| FactuGP | 📅 Confirmer la date « septembre 2026 » |

### 🟢 Reste faisable en code (optionnel, non bloquant)
| Item | Quoi |
|---|---|
| U4 | Icônes sur les cards de services (Tabler) |
| A2-6 | Sortir « Maintenance » de la grille tarifaire 3 colonnes (« Et après la livraison ? ») |
| A2-10 | Téléphone/WhatsApp dans le header de nav (déjà dans le footer) |
| M1 (grid-break) | Élément qui « casse la grille » (titre géant / section fond nuit / carte GP SVG) |

---

## 📊 Scores de l'audit UI (point de départ)

| Axe | Note |
|---|---|
| Note globale | 6/10 |
| Crédibilité | 4/10 |
| Copy / texte | 6/10 |
| Structure | 7/10 |
| SEO & méta | 8/10 |

---

## 🚨 1. Crédibilité

| # | Statut | Code | Recommandation | État actuel / Où |
|---|---|---|---|---|
| C1 | `[ ]` | 🟢 | **Stats à « 0 »** — les compteurs affichent « 0j », « 0 mois », « 0+ ans » avant l'animation JS (mauvais pour crédibilité + no-JS). Rendre la vraie valeur d'emblée, animer ensuite. | Confirmé : `CountUp.tsx` initialise à `${prefix}0${suffix}`. Touche `About`, `FeatureStats`, `StatsSection`, `Hero`. |
| C2 | `[ ]` | 🟢 | **Phrase qui tue la confiance** (Tarifs) : « Pendant que je construis mes premières références locales… ». À remplacer par un message de lancement positif. | `LaunchPricing.tsx:73`. Reformulation proposée : « Des prix pensés pour les TPE guadeloupéennes. Honnêtes, transparents, sans mauvaise surprise. » |
| C3 | `[asset]` | 🔴 | **Un seul projet en portfolio** (Liberty Drive Serenity) → effet de fragilité. Ajouter 2-3 cartes « projet en cours » ou démos concept (resto/coiffeur/artisan) avec mention « Démo concept ». | Nécessite contenus/visuels. `Realisations.tsx` + `realisations-data.ts`. |
| C4 | `[asset]` | 🔴 | **Photo du fondateur** absente dans « À propos ». Non-négociable pour une agence locale de proximité. | Nécessite une photo de Yacine. `About.tsx`. |
| C5 | `[x]` | — | **Contact immédiat WhatsApp** — bouton flottant. | ✅ Déjà fait (`WhatsAppButton.tsx`). Reste à ajouter le **numéro visible** dans header/footer (→ S6). |

---

## ✍️ 2. Copy & ton

| # | Statut | Code | Recommandation | État actuel / Où |
|---|---|---|---|---|
| T1 | `[décision]` | 🟡 | **« Je » vs « Nous / l'équipe SolYB »** — incohérent. Choisir un camp (freelance solo recommandé vu le positionnement). | Ex. `About.tsx:57` « l'équipe SolYB intervient de bout en bout » alors que le reste est en « je ». Décision de marque requise avant harmonisation globale. |
| T2 | `[ ]` | 🟢 | **Paragraphe anti-IA risqué** — « L'IA a rendu la création accessible à tous… sans réflexion ni vision ». Se retourne contre toi (tu utilises des outils IA). Repositionner sur le local + la durabilité. | `About.tsx:50-55`. Alternative : « Je construis des outils qui tiennent dans le temps. Pas une vitrine vide — un vrai levier pour votre activité. » |
| T3 | `[ ]` | 🟢 | **CTA formulaire trop générique** : « Envoyer ma demande » → « Recevoir mon devis gratuit » / « Démarrer mon projet ». | `ContactForm.tsx`, `Contact.tsx`, `ContactFormMultiStep.tsx`. |
| T4 | `[décision]` | 🟡 | **Titres de section monotones** — tous au format « Mot · *italique* ». Casser le moule sur quelques sections (stat géante, titre court, question directe). | Stylistique — à arbitrer pour ne pas dénaturer la charte. |
| T5 | `[x]` | — | **Microcopy excellents** (« Devis gratuit 24h », « Jour 1 · Gratuit », « Paiement 2 fois ») — à conserver. | ✅ Rien à faire, point fort. |

---

## 🎨 3. UI & design

| # | Statut | Code | Recommandation | État actuel / Où |
|---|---|---|---|---|
| U1 | `[décision]` | 🟡 | **Palette = 1 couleur** — ajouter un accent secondaire (turquoise caribéen) + neutres. | Partiellement présent (`turquoise`/`teal` déjà dans le thème). Systématiser = travail design à valider. |
| U2 | `[obsolète]` | — | **Typo « Inter générique »** → Fraunces + Plus Jakarta Sans. | ⚠️ Déjà fait (différemment) : le site utilise **Fraunces + DM Sans** (`layout.tsx`). Reco datée. |
| U3 | `[asset]` | 🔴 | **Hero sans ancrage visuel** — ajouter mockup flottant / abstraction géométrique soleil-mer / badge localisation animé. | Choix créatif + éventuels assets. `Hero.tsx`. |
| U4 | `[ ]` | 🟢 | **Cards services sans icônes** — ajouter une icône par service (Tabler : globe, shopping-cart, device-mobile). | `Services.tsx`. À vérifier l'état actuel des cards. |
| U5 | `[ ]` | 🟢 | **CTA secondaire trop visible** — le hiérarchiser (principal = plein orange, secondaire = ghost/texte+flèche). | `Hero.tsx` (boutons « Devis » / « Voir les services »). |

---

## 📐 4. Sections

| # | Statut | Code | Recommandation | État actuel / Où |
|---|---|---|---|---|
| S1 | `[ ]` | 🟢 | **Nav** — scroll actif (lien courant surligné) probablement absent ; vérifier que le nav mobile est bien masqué. | `Navigation.tsx`. |
| S2 | `[ ]` | 🟢 | **Hero eyebrow redondant** : « Sites internet pour les TPE & PME de Guadeloupe » → « Agence digitale · Baie-Mahault, Guadeloupe » ou badge localisation. | `Hero.tsx`. |
| S3 | `[décision]` | 🟡 | **Facturation électronique** = bandeau qui casse le rythme. La traiter en 4e card (badge « Obligation 2026 ») ou section dédiée à urgence visuelle. | `FacturationElectronique.tsx` / agencement home. |
| S4 | `[asset]` | 🔴 | **Outils (ResaGP/FactuGP)** sans captures → semblent abstraits. Ajouter mockups + date pour « bientôt disponible ». | Nécessite captures. `Solutions.tsx`. |
| S5 | `[~]` | 🟢 | **À propos** — photo (C4), stats à 0 (C1), « 971/Guadeloupe » corrigé par le fix C1. | Couvert par C1+C4. |
| S6 | `[ ]` | 🟡 | **Footer minimaliste** — ajouter email de contact + téléphone/WhatsApp visibles. Réseaux sociaux (Instagram/Facebook) **si les comptes existent**. | `Footer.tsx` (actuellement : logo + copyright + 3 liens légaux). Réseaux = vérifier l'existence des comptes avant de lier. |

---

## ✅ Roadmap proposée (issue de l'audit)

### 🔴 Cette semaine — impact immédiat
1. C1 — Hardcoder les vraies valeurs des stats (animer ensuite) 🟢
2. C2 — Supprimer « Pendant que je construis mes premières références locales » 🟢
3. C4 — Photo du fondateur `[asset]` 🔴
4. S6 — WhatsApp (✅) + numéro visible header/footer 🟡
5. T1 — Choisir je/nous et harmoniser `[décision]` 🟡

### 🟠 Ce mois — solidifier
6. C3 — 2-3 projets portfolio (démos / en cours) `[asset]` 🔴
7. U1 — Couleur secondaire (turquoise) `[décision]` 🟡
8. U4 — Icônes sur les cards services 🟢
9. S6 — Réseaux sociaux footer (si comptes existent) 🟡
10. T2 — Reformuler le paragraphe IA 🟢
11. S3 — Facturation électronique cohérente `[décision]` 🟡

### 🔵 Prochain trimestre — montée en gamme
12. U2 — Typo `[obsolète]` (déjà Fraunces + DM Sans) —
13. U3 — Élément visuel hero `[asset]` 🔴
14. S4 — Captures ResaGP `[asset]` 🔴
15. T4 — Varier les patterns de titres `[décision]` 🟡
16. Section à fond foncé pour casser la monotonie `[décision]` 🟡
17. S1 — Scroll actif dans la navigation 🟢

---

## 🟢 Quick wins (faisables en code tout de suite, sans asset ni décision)

- **C1** — fix CountUp (stats à 0)
- **C2** — phrase confiance (Tarifs)
- **T2** — paragraphe IA
- **T3** — CTA « Recevoir mon devis gratuit »
- **U4** — icônes cards services
- **U5** — hiérarchiser CTA secondaire
- **S1** — scroll actif nav
- **S2** — eyebrow hero
- **S6 (partiel)** — email + téléphone au footer

---

---

# 🔬 AUDIT 2 — UI/UX approfondi + refonte éditoriale (juin 2026)

> Deuxième audit, plus poussé : problèmes structurels de design, failles de conversion, et **refonte du copy section par section**.
> ⚠️ **L'Audit 2 prime sur l'Audit 1 en cas de conflit** (c'est la réflexion affinée). Ex. : stats « 3+ ans » (A2) plutôt que « 5+ ans » (A1).
> ✅ **Tout est validé par Yacine** (voir « Décisions » plus bas).

## A. Problèmes structurels & conversion

| # | Statut | Code | Recommandation | Où / Détail |
|---|---|---|---|---|
| A2-1 | `[décision]` | 🟢 | **Ordre des sections à revoir** (logique de persuasion, pas de construction). La preuve sociale (réalisations, engagements) arrive trop tard ; les engagements (argument fort) sont en avant-dernier. | Ordre proposé : **Hero → Promesse SEO → Services → Engagements → Réalisations → Processus → Tarifs → À propos → Outils → FAQ → Contact**. Réorganiser `page.tsx`. |
| A2-2 | `[ ]` | 🟢 | **Césure du titre H1** — « Votre » et « entreprise, » cassent au milieu du groupe nominal → effet bâclé. Forcer le retour à la ligne après la virgule. | `Hero.tsx`. |
| A2-3 | `[ ]` | 🟢 | **Section « Être visible aujourd'hui » = section fantôme** (texte + 3 étapes, aucun CTA/visuel/chiffre). La supprimer (argument réintégré au hero) OU la rendre concrète (stat chiffrée + CTA). | `Stakes.tsx`. Audit 2 recommande **suppression**. |
| A2-4 | `[décision]` | 🟡 | **Facturation électronique : statut ambigu** (service ? urgence ? produit ?). Un seul CTA non contextualisé. Déplacer les FAQ facturation juste sous le bandeau, ou pointer vers `/facturation-electronique`. | Voir aussi S3. |
| A2-5 | `[ ]` | 🟢 | **Stats incohérentes** — mélange de types (engagement / durée / adjectif) + « 0 Guadeloupe » insensé. Uniformiser. | `FeatureStats.tsx`. Proposé : « 21j livraison max · Réponse sous 24h · 1 an d'hébergement inclus · 100% sur mesure ». Lié à C1. |
| A2-6 | `[décision]` | 🟢 | **Tarifs : Maintenance non comparable** aux 2 offres. La sortir de la grille 3 colonnes → ligne/section séparée (« Et après la livraison ? »). | `LaunchPricing.tsx`. |
| A2-7 | `[ ]` | 🟢 | **Badge « Plus populaire »** non crédible (1 seul projet au portfolio). → « Recommandé pour démarrer ». | `LaunchPricing.tsx`. |
| A2-8 | `[décision]` | 🟡 | **Outils (ResaGP/FactuGP) mal placés** (après les tarifs → relance un parcours de décision). Les intégrer aux services (4e/5e offre) ou en section distincte après le formulaire / page dédiée. | `Solutions.tsx` + agencement. |
| A2-9 | `[ ]` | 🟢 | **Formulaire — frictions** : (a) vérifier que le honeypot est *vraiment* invisible ; (b) « Téléphone » sans format ni « (WhatsApp bienvenu) » ; (c) « Votre besoin » sans placeholder ; (d) état de chargement visible au submit. | `Contact.tsx`. NB : honeypot déjà hors-écran + aria-hidden (validé e2e). (a) à reconfirmer visuellement. |
| A2-10 | `[ ]` | 🟢 | **Nav** : ajouter téléphone/WhatsApp à côté de « Devis gratuit » ; vérifier masquage du nav mobile dupliqué. | `Navigation.tsx`. Lié à S1. |
| A2-11 | `[ ]` | 🟡 | **Footer = filet de conversion** (pas juste légal) : email, tél/WhatsApp, réseaux (Instagram/Facebook), répétition CTA, baseline positionnement. | `Footer.tsx`. Lié à S6. |
| A2-12 | `[ ]` | 🟢 | **Accessibilité** : placeholders + indicateur obligatoire/optionnel sur les champs ; vraies valeurs de stats dans le HTML (lecteur d'écran lit « 0 Guadeloupe ») ; vérifier le découpage du H1. | Formulaire + `CountUp` (lié à C1). |
| A2-13 | `[ ]` | 🟢 | **« Conformité fiscale » — affirmation risquée** dans À propos (« design, développement, conformité fiscale » sous-entend une qualif comptable). Reformuler en « la conformité fiscale **via nos outils** ». | `About.tsx`. |

## B. Refonte éditoriale (copy — avant → après)

> Le fil rouge : **moins expliquer, plus affirmer**. Phrases courtes, verbes d'action, ancrage géographique concret. Voix : **« je » pour la conviction** (À propos = Yacine), **« on/nous » pour l'exécution** (nav, services). → ceci **résout T1**.

**Navigation** — `Services·Tarifs·À propos·Réalisations·Contact` → `Ce qu'on fait · Nos tarifs · Qui on est · Nos projets · Contact · Devis gratuit`

**Hero**
- Eyebrow : ~~« Sites internet pour les TPE & PME de Guadeloupe »~~ → **« Baie-Mahault · Guadeloupe 971 »**
- Titre : ~~« Votre entreprise, visible en ligne. »~~ → **« Votre clientèle locale vous cherche déjà. »**
- Sous-titre : → **« On construit des outils digitaux pour les entrepreneurs d'ici — des sites, des applications, des systèmes qui tiennent dans le temps. Pas des vitrines vides. Des leviers. »**
- Microcopy sous CTA : ✅ **inchangé** (meilleur microcopy du site).

**Section « Être visible aujourd'hui »** → **supprimer** (cf. A2-3).

**Services**
- Titre : ~~« On vous construit l'outil dont vous avez vraiment besoin »~~ → **« Ce qu'on construit pour vous »**
- Intro : → **« Chaque projet repart de zéro. On part de vous, de votre marché, de vos clients en Guadeloupe — pas d'un template qu'on adapte. »**
- Card **Vitrine** : → « Un site pensé pour votre clientèle locale. Rapide, lisible sur mobile, référencé pour Pointe-à-Pitre, Basse-Terre ou votre commune. Pas un template — votre identité. »
- Card **E-commerce** : → « Une boutique complète, paiement sécurisé, gestion de la livraison en Guadeloupe. Conçue pour que vous la gériez seul, sans nous appeler pour chaque produit. »
- Card **Application** : → « Un logiciel fait pour votre métier, pas pour le métier d'un autre. On part d'une feuille blanche et on construit ce que vous ne trouvez pas dans les solutions existantes. »

**Facturation électronique**
- Titre : ~~« …Êtes-vous prêt ? »~~ → **« La facturation électronique est obligatoire dès 2026. On s'en occupe pour vous. »** (supprimer la question rhétorique)
- Corps : → « Réception obligatoire dès septembre 2026, émission obligatoire pour les TPE/PME à partir de 2027. SolYB vous connecte à une plateforme agréée DGFiP — sans jargon, sans prise de tête. Et notre outil FactuGP est déjà pensé pour ça. »

**Stats** : → **« 21j livraison max · Réponse sous 24h · 1 an d'hébergement inclus · 100% sur mesure »** (cf. A2-5)

**Processus** : titre « 4 étapes, zéro surprise » ✅ inchangé. Étape 1 : ajouter **« en visio ou en présentiel à Baie-Mahault »**.

**Tarifs**
- Titre : ~~« Des prix pour démarrer sereinement »~~ → **« Des prix clairs, pour des projets réels »**
- Intro : → **« Des tarifs pensés pour les entrepreneurs guadeloupéens. Honnêtes, détaillés, sans mauvaise surprise. Paiement en deux fois, devis gratuit sous 24h. »** (supprime « premières références » = C2)
- Badge : « Plus populaire » → **« Recommandé pour démarrer »** (A2-7)
- Maintenance : section séparée « **Et après la livraison ?** » (A2-6)

**Outils**
- Titre : → **« ResaGP et FactuGP — nos outils, faits ici »**
- Intro : → « La plupart des outils qu'on recommande à nos clients sont conçus ailleurs, pour d'autres marchés. Alors on en a créé deux, pour Guadeloupe. »
- FactuGP : ~~« Bientôt disponible »~~ → **« Disponible septembre 2026 — liste d'attente ouverte »** + champ email.

**À propos** (rewrite complet, 1ʳᵉ personne, sans IA, finit sur « ça tient ») :
> « Je m'appelle Yacine. J'ai grandi ici, j'ai appris à coder ici, et j'ai lancé SolYB parce que les outils qu'on proposait aux entrepreneurs guadeloupéens ne ressemblaient pas à leur réalité.
> La Guadeloupe a une énergie entrepreneuriale réelle — des restaurateurs, des artisans, des commerçants qui méritent des outils à la hauteur de ce qu'ils construisent. Pas des templates importés de Paris ou de Bordeaux, pas des logiciels pensés pour un marché qui n'a rien à voir avec le nôtre.
> Chez SolYB, on prend le temps de comprendre votre activité avant d'écrire la première ligne de code. C'est plus long que de coller un template. Mais ça tient. »
- Stats À propos : « 3+ ans d'expérience · 21j livraison moyenne · 100% local »

**Réalisations**
- Titre : ~~« Un projet, livré pour de vrai »~~ → **« Ce qu'on a déjà construit »**
- Liberty Drive Serenity : ajouter une phrase de **résultat concret** (« En ligne et active depuis [date]. Les chauffeurs et soignants l'utilisent au quotidien. »).

**Engagements** : titre ✅ inchangé. **Condenser** en 4 lignes (pas 4 cards) :
> « Un seul interlocuteur — vous parlez à la personne qui code. Devis sous 24h — un prix ferme, sans surprise. Paiement en deux fois — 50% pour démarrer, 50% à la livraison. Support inclus — on ne disparaît pas après la mise en ligne. »

**Footer** (cf. A2-11) : gauche = logo + baseline + email + WhatsApp ; centre = liens rapides ; droite = Instagram/Facebook + « Devis gratuit sous 24h → » ; bas = copyright + légal.

## C. ✨ Rendre le site mémorable (au-delà du copy)

> « Le copy reformulé ne suffit pas » : le fond ET la forme doivent raconter la même histoire. 4 leviers :

| # | Statut | Code | Levier | Détail |
|---|---|---|---|---|
| M1 | `[décision]` | 🟢 | **Signature visuelle** | (a) Typo : italique Fraunces assumé sur les accents (déjà Fraunces ✓) ; (b) **fond crème chaud `#FFF9F6` + turquoise `#00BFA5`** secondaire (identité caribéenne) ; (c) un élément qui casse la grille (titre géant qui déborde, transition fond nuit `#0D1B2A`, carte Guadeloupe SVG déco). |
| M2 | `[ ]` | 🟢 | **Micro-interaction inattendue** | Le plus simple/efficace : **badge « En ligne · Baie-Mahault » avec point vert clignotant** dans le hero (statut de disponibilité). Aussi : curseur perso (déjà `CustomCursor` ✓), hover cards révélant un détail. |
| M3 | `[asset]` | 🟡 | **Contenu unique = démo interactive ResaGP** dans la page (plan de salle / flow de réservation cliquable, pas une capture). Preuve de compétence impossible à copier. | `PlanDeSalle.tsx` existe déjà côté /resagp → réutilisable. |
| M4 | `[~]` | 🟡 | **Témoignage réel** (prénom, métier, ville GP, phrase concrète de résultat). Vaut « dix sections d'argumentaire ». | ⏳ **En cours** : Yacine le demande au client **Liberty Drive Serenity** (renforce aussi C3 — donne un résultat concret au seul projet du portfolio). `Testimonials.tsx`. |

**Formule du mémorable (synthèse Audit 2)** : copy reformulé **+** signature visuelle (typo + palette) **+** micro-interaction (badge En ligne, compteurs animés) **+** démo ResaGP intégrée **+** témoignage réel.

---

# 🎯 Décisions — ✅ TOUTES VALIDÉES (2026-06)

1. ✅ **Voix « je » / « nous »** : **« je »** dans À propos (Yacine), **« on/nous »** ailleurs (SolYB). → débloque T1 + tout le copy B.
2. ✅ **Réordonnancement des sections** (A2-1) : Hero → Promesse SEO → Services → Engagements → Réalisations → Processus → Tarifs → À propos → Outils → FAQ → Contact.
3. ✅ **Facturation électronique** : titre affirmatif + dates concrètes + lien FactuGP (cf. copy B). FAQ facturation à rapprocher.
4. ✅ **Palette** : fond crème chaud `#FFF9F6` + turquoise `#00BFA5` secondaire.
5. ✅ **Outils** : repensés hors du tunnel de conversion principal (après À propos, cf. nouvel ordre).

# 🧰 Assets / contenus à fournir par Yacine

- 📷 Photo du fondateur (C4)
- 🗂️ 2-3 projets / démos concept (C3)
- 🖼️ Captures ou démo ResaGP/FactuGP (S4 / M3)
- 💬 Au moins 1 témoignage client réel (M4) — **prioritaire**
- 📅 Date de dispo FactuGP (« septembre 2026 ? »)
- 🔗 Comptes Instagram / Facebook (s'ils existent) pour le footer

---

## 📝 Autres recommandations (à compléter par Yacine)

> _Espace pour les prochains audits / retours. Ajoute-les ici, je les intègrerai au backlog._

-

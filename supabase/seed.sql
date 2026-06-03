-- ============================================
-- SEED DATA - SYSTÈME CRM SOLYB
-- ============================================
-- Description: Données de test réalistes pour le CRM
-- Contient: 20 leads, templates email, notes, settings

-- ============================================
-- LEADS FICTIFS (20 leads variés)
-- ============================================

-- Leads NOUVEAUX (4)
INSERT INTO leads (name, email, phone, company, project_type, budget, description, urgency, status, activity_type, source, source_details, score_budget, score_clarity, score_urgency, score_fit, score_responsiveness, score_source, is_launch_offer, launch_offer_position, tags, created_at) VALUES
('Marie-José Lafont', 'mj.lafont@gmail.com', '+590690123456', 'Ti Moun Boutik', 'vitrine', 599.00, 'Je voudrais un site vitrine pour ma boutique de vêtements enfants à Pointe-à-Pitre. Avec catalogue produits et formulaire contact. Budget serré mais motivée.', 'normal', 'nouveau', 'digital', 'site-web', 'Formulaire contact du site', 20, 12, 15, 15, 0, 8, true, 1, ARRAY['urgent', 'pme'], NOW() - INTERVAL '2 hours'),

('Jean-Marc Gustave', 'jm.gustave@outlook.fr', '+590690234567', 'Restaurant Le Mahury', 'vitrine', 650.00, 'Site pour mon restaurant créole à Gosier. Menu en ligne, photos plats, réservations. Urgence moyenne, ouverture dans 2 mois.', 'high', 'nouveau', 'digital', 'bouche-a-oreille', 'Recommandation par client existant', 20, 10, 20, 15, 0, 15, true, 2, ARRAY['restaurant', 'premium'], NOW() - INTERVAL '5 hours'),

('Sophie Belrose', 'sophie.belrose@yahoo.fr', '+590690345678', 'Coiffure Tropicale', 'vitrine', 550.00, 'Petit site simple pour mon salon de coiffure. Juste présentation, tarifs, horaires et numéro de téléphone.', 'low', 'nouveau', 'digital', 'linkedin', 'Post LinkedIn sur les services digitaux', 18, 8, 10, 15, 0, 10, true, 3, ARRAY['tpe'], NOW() - INTERVAL '1 day'),

('David Moutoussamy', 'contact@moutoussamy-plomberie.gp', '+590690456789', 'Moutoussamy Plomberie', 'vitrine', 599.00, 'Site pour mon entreprise de plomberie. Présentation services, zone intervention, formulaire devis, téléphone cliquable.', 'normal', 'nouveau', 'digital', 'site-web', 'Google recherche "création site Guadeloupe"', 20, 10, 15, 15, 0, 8, true, 4, ARRAY['artisan'], NOW() - INTERVAL '3 days'),

-- Leads EN CONTACT (5)
('Nathalie Pioche', 'n.pioche@gmail.com', '+590690567890', 'Nath Beauté', 'ecommerce', 999.00, 'Boutique en ligne pour produits cosmétiques naturels. Environ 50 produits au départ. Paiement CB, livraison Guadeloupe. Très motivée!', 'urgent', 'contact', 'digital', 'linkedin', 'Contact direct via LinkedIn après post', 20, 15, 20, 15, 15, 10, true, 5, ARRAY['ecommerce', 'urgent'], NOW() - INTERVAL '5 days'),

('Patrick Sainte-Rose', 'patrick.sr@wanadoo.fr', '+590690678901', 'SR Paysagiste', 'vitrine', 650.00, 'Site vitrine pour mon entreprise de paysagisme. Galerie photo réalisations, services, zone intervention, contact.', 'normal', 'contact', 'digital', 'bouche-a-oreille', 'Recommandation ami entrepreneur', 20, 12, 15, 15, 13, 15, true, 6, ARRAY['paysagiste'], NOW() - INTERVAL '1 week'),

('Isabelle Laurent', 'i.laurent@entreprise.gp', '+590690789012', 'Cabinet Laurent Comptabilité', 'vitrine', 750.00, 'Site professionnel pour cabinet comptable. Présentation services, équipe, blog actualités fiscales, prise RDV.', 'normal', 'contact', 'digital', 'site-web', 'Formulaire contact', 20, 15, 15, 15, 10, 8, true, 7, ARRAY['professionnel', 'premium'], NOW() - INTERVAL '10 days'),

('Alexandre Bichara', 'alex.bichara@gmail.com', '+590690890123', 'Bichara Transport', 'vitrine', 599.00, 'Site simple pour entreprise de transport. Services, tarifs, zone couverture, formulaire demande devis.', 'low', 'contact', 'digital', 'linkedin', 'Réseau LinkedIn', 20, 10, 10, 15, 8, 10, true, 8, ARRAY['transport'], NOW() - INTERVAL '2 weeks'),

('Valérie Mondé', 'v.monde@hotmail.com', '+590690901234', 'Chez Valérie Traiteur', 'vitrine', 680.00, 'Site pour traiteur événementiel. Galerie photos, menus, devis en ligne, témoignages clients.', 'high', 'contact', 'digital', 'bouche-a-oreille', 'Recommandation client satisfait', 20, 13, 20, 15, 12, 15, true, 9, ARRAY['traiteur', 'evenementiel'], NOW() - INTERVAL '1 week'),

-- Leads DEVIS ENVOYÉ (3)
('Franck Belzince', 'f.belzince@gmail.com', '+590690012345', 'Belzince Auto', 'ecommerce', 1200.00, 'Boutique en ligne pièces détachées auto. Catalogue 200+ références, paiement sécurisé, livraison Guadeloupe/Martinique.', 'urgent', 'devis', 'digital', 'site-web', 'Formulaire contact site', 20, 15, 20, 15, 15, 8, true, 10, ARRAY['ecommerce', 'auto'], NOW() - INTERVAL '3 weeks'),

('Sandrine Louviot', 's.louviot@association-soleil.gp', '+590690112345', 'Association Soleil Guadeloupe', 'vitrine', 599.00, 'Site association aide jeunesse. Présentation actions, actualités, formulaire dons, galerie photos événements.', 'normal', 'devis', 'digital', 'bouche-a-oreille', 'Contact bénévole connaissant SolYB', 20, 12, 15, 15, 13, 15, true, 11, ARRAY['association', 'social'], NOW() - INTERVAL '2 weeks'),

('Yves-Marie Torin', 'ym.torin@torin-immo.gp', '+590690212345', 'Torin Immobilier', 'vitrine', 899.00, 'Site agence immobilière. Catalogue biens, filtres recherche, formulaire contact agence, espace pro.', 'normal', 'devis', 'digital', 'linkedin', 'LinkedIn networking', 20, 15, 15, 15, 10, 10, true, 12, ARRAY['immobilier', 'premium'], NOW() - INTERVAL '1 month'),

-- Leads GAGNÉS (2)
('Christelle Monerville', 'c.monerville@gmail.com', '+590690312345', 'CM Décoration', 'vitrine', 599.00, 'Site vitrine décoratrice intérieur. Portfolio réalisations, services, blog tendances, formulaire contact.', 'high', 'gagne', 'digital', 'bouche-a-oreille', 'Recommandation ancien client', 20, 15, 20, 15, 15, 15, true, 13, ARRAY['decoration', 'gagne'], NOW() - INTERVAL '5 weeks'),

('Olivier Ramassamy', 'o.ramassamy@rfit-guadeloupe.com', '+590690412345', 'RF IT Guadeloupe', 'vitrine', 750.00, 'Site entreprise informatique. Services B2B, références clients, équipe, contact commercial.', 'normal', 'gagne', 'digital', 'site-web', 'Recherche Google', 20, 15, 15, 15, 13, 8, true, 14, ARRAY['informatique', 'b2b', 'gagne'], NOW() - INTERVAL '6 weeks'),

-- Leads PERDUS (1)
('Thomas Lordinot', 't.lordinot@gmail.com', '+590690512345', 'TL Formation', 'vitrine', 450.00, 'Site organisme formation professionnelle. Budget trop serré finalement.', 'low', 'perdu', 'digital', 'linkedin', 'Message LinkedIn', 15, 8, 10, 12, 5, 10, true, null, ARRAY['formation', 'perdu'], NOW() - INTERVAL '2 months'),

-- Leads ANIMATION COMMERCIALE (2)
('Carrefour Baie-Mahault', 'manager.gms@carrefour-gp.fr', '+590590123456', 'Carrefour GMS', 'vitrine', 800.00, 'Animation commerciale samedi après-midi. Stand produits locaux.', 'normal', 'contact', 'animation', 'contact-direct', 'Contact GMS directeur', 18, 10, 15, 10, 12, 5, false, null, ARRAY['gms', 'animation'], NOW() - INTERVAL '2 weeks'),

-- Leads DISTRIBUTION (2)
('Super U Gosier', 'direction@superu-gosier.fr', '+590590234567', 'Super U Gosier', 'custom', 150.00, 'Distribution B2B samedi matin 6h-11h.', 'low', 'nouveau', 'distribution', 'prospection', 'Prospection terrain', 10, 8, 10, 8, 0, 5, false, null, ARRAY['gms', 'distribution'], NOW() - INTERVAL '1 week'),

-- Leads CONTENU IA (1)
('Digital Paradise SXM', 'contact@digitalparadise.sx', '+590690612345', 'Digital Paradise', 'content', 300.00, 'Rédaction 10 articles blog SEO pour agence digitale Saint-Martin. Thématiques marketing digital Caraïbes.', 'normal', 'contact', 'digital', 'linkedin', 'Réseau professionnel', 15, 12, 15, 10, 10, 10, true, 15, ARRAY['content', 'sxm'], NOW() - INTERVAL '1 week');

-- ============================================
-- TEMPLATES EMAIL PAR DÉFAUT
-- ============================================

-- Template Séquence 1: Bienvenue (J+0)
INSERT INTO email_templates (name, subject, body, category, sequence_step, variables, is_active) VALUES
('Email Séquence 1: Bienvenue',
'Bienvenue {{prenom}} - Votre projet {{type_projet}} avec SolYB',
'Bonjour {{prenom}},

Merci pour votre demande concernant votre projet {{type_projet}} pour {{company}} !

Je suis Yacine, fondateur de SolYB, et je suis ravi de pouvoir vous accompagner dans votre transformation digitale en Guadeloupe.

📋 Récapitulatif de votre demande :
• Type de projet : {{type_projet}}
• Budget indicatif : {{budget}}€
• Urgence : {{urgency}}

🚀 Prochaines étapes :
1. Je vais étudier votre demande en détail
2. Je vous recontacte sous 24h maximum
3. Nous fixons un appel de 15min pour échanger

🎁 Bonne nouvelle : Vous faites partie de mon offre de lancement !
{{slots_remaining}} places restantes sur 30 → Tarifs exceptionnels garantis.

💡 En attendant :
• Consultez mes réalisations : https://solyb.gp/realisations
• Préparez 2-3 exemples de sites que vous aimez
• Listez les fonctionnalités essentielles pour vous

À très vite !

Yacine Bouhassoun
Fondateur SolYB
📱 +590 690 XX XX XX
🌐 solyb.gp

🌴 Solutions digitales en Guadeloupe',
'sequence',
1,
ARRAY['prenom', 'nom', 'email', 'company', 'type_projet', 'budget', 'urgency', 'slots_remaining'],
true),

-- Template Séquence 2: Cas client similaire (J+3)
('Email Séquence 2: Cas Client',
'{{prenom}}, voici un projet similaire au vôtre',
'Bonjour {{prenom}},

J''ai travaillé récemment sur un projet très similaire au vôtre pour {{type_projet}}.

📊 Cas client : {{example_client}}
• Secteur d''activité : {{sector}}
• Livraison en 2 semaines
• ROI : +40% de demandes de devis en 3 mois

🎯 Résultats concrets :
✅ Design moderne et responsive
✅ Optimisé pour mobile (80% du trafic)
✅ SEO local Guadeloupe
✅ Formation complète incluse

💰 Pour votre projet {{type_projet}} :
• Prix offre lancement : {{budget}}€
• Délai : 2 semaines
• Support 3 mois inclus

Disponible pour un échange téléphonique ?
→ Répondez simplement à cet email avec vos disponibilités

Yacine - SolYB
🌴 Expert digital Guadeloupe',
'sequence',
2,
ARRAY['prenom', 'type_projet', 'example_client', 'sector', 'budget'],
true),

-- Template Séquence 3: Urgence douce (J+7)
('Email Séquence 3: Urgence Douce',
'{{prenom}}, plus que {{slots_remaining}} places - Offre lancement',
'Bonjour {{prenom}},

Je me permets de revenir vers vous concernant votre projet {{type_projet}}.

⚠️ Information importante :
Mon offre de lancement touche à sa fin → Il ne reste que {{slots_remaining}} places sur les 30 initiales.

🎁 Avantages offre lancement (encore {{slots_remaining}} places) :
• Prix -40% : {{launch_price}}€ au lieu de {{normal_price}}€
• Livraison prioritaire sous 2 semaines
• Support 3 mois offert (valeur 150€)
• Formation complète incluse

⏰ Après ces {{slots_remaining}} clients, retour aux tarifs standards.

Votre projet m''intéresse vraiment et je serais ravi de l''accompagner.

Souhaitez-vous qu''on en discute cette semaine ?
📞 15 minutes suffisent → Répondez avec vos dispos

À bientôt j''espère !

Yacine - SolYB
Solutions digitales Guadeloupe',
'sequence',
3,
ARRAY['prenom', 'type_projet', 'slots_remaining', 'launch_price', 'normal_price'],
true),

-- Template Séquence 4: Dernier contact (J+10)
('Email Séquence 4: Dernier Contact',
'{{prenom}}, dernier message concernant votre projet',
'Bonjour {{prenom}},

C''est mon dernier message concernant votre projet {{type_projet}}.

Je comprends que vous soyez occupé ou que le timing ne soit pas idéal pour le moment.

💡 Deux options :

1️⃣ **Vous êtes toujours intéressé** :
→ Répondez simplement "OUI" et je vous rappelle
→ Votre place offre lancement sera réservée 48h

2️⃣ **Ce n''est pas le moment** :
→ Aucun souci, je garde votre demande
→ Je vous recontacte dans 3 mois ?
→ Vous restez dans mes contacts pour conseils gratuits

🎁 Si vous connaissez un entrepreneur qui aurait besoin :
→ Parrainage récompensé (50€ de réduction pour vous deux)

Merci d''avoir pris le temps de consulter SolYB.

Excellente continuation !

Yacine Bouhassoun
Fondateur SolYB
🌴 Guadeloupe

PS: Ma porte reste toujours ouverte, même juste pour un conseil rapide 😊',
'sequence',
4,
ARRAY['prenom', 'type_projet'],
true);

-- ============================================
-- TEMPLATES RÉPONSES RAPIDES
-- ============================================

INSERT INTO email_templates (name, subject, body, category, sequence_step, variables, is_active) VALUES
('Réponse Rapide: Devis Site Vitrine',
'Votre devis site vitrine - {{company}}',
'Bonjour {{prenom}},

Suite à notre échange, voici votre devis pour le site vitrine de {{company}}.

📦 PRESTATION SITE VITRINE "ESSENTIEL"

Inclus :
✅ Design moderne responsive (mobile/tablette/desktop)
✅ 5 pages (Accueil, Services, À propos, Réalisations, Contact)
✅ Formulaire de contact fonctionnel
✅ Optimisation SEO local Guadeloupe
✅ Hébergement + Nom de domaine 1 an offerts
✅ Formation complète à la gestion
✅ Support 3 mois inclus

⏱️ Délai : 2 semaines
💰 Prix : {{budget}}€ (offre lancement)

📋 Devis PDF en pièce jointe

Pour valider :
1. Signez le devis
2. Acompte 50% ({{acompte}}€)
3. Solde à la livraison

Questions ? Appelez-moi : +590 690 XX XX XX

Yacine - SolYB',
'quick-reply',
null,
ARRAY['prenom', 'company', 'budget', 'acompte'],
true),

('Réponse Rapide: Devis E-commerce',
'Votre devis boutique en ligne - {{company}}',
'Bonjour {{prenom}},

Votre devis pour la boutique en ligne {{company}} est prêt !

📦 PRESTATION E-COMMERCE "PRO"

Inclus :
✅ Boutique en ligne complète (WooCommerce/Shopify)
✅ Jusqu''à 50 produits intégrés
✅ Paiement sécurisé CB (Stripe)
✅ Gestion livraison Guadeloupe
✅ Design moderne responsive
✅ SEO + Marketing
✅ Formation gestion boutique
✅ Support 3 mois

⏱️ Délai : 3 semaines
💰 Prix : {{budget}}€ (offre lancement)

📋 Devis PDF en pièce jointe

Prêt à démarrer ?

Yacine - SolYB
E-commerce Guadeloupe',
'quick-reply',
null,
ARRAY['prenom', 'company', 'budget'],
true),

('Réponse Rapide: Demande Infos Complémentaires',
'{{prenom}}, quelques précisions sur votre projet',
'Bonjour {{prenom}},

Merci pour votre demande concernant {{type_projet}} !

Pour vous faire la meilleure proposition possible, j''aurais besoin de quelques précisions :

❓ Questions :

1. **Fonctionnalités essentielles** :
   Quelles sont les 3 fonctionnalités indispensables pour vous ?

2. **Inspirations** :
   Avez-vous 2-3 exemples de sites que vous aimez ?

3. **Contenus** :
   Avez-vous déjà les textes/photos ou besoin d''aide ?

4. **Délai** :
   Date de mise en ligne idéale ?

5. **Budget** :
   Votre budget est-il flexible ou strict ?

📞 **Encore plus simple** : Un appel de 15min ?
Répondez avec vos disponibilités cette semaine.

À très vite !

Yacine - SolYB',
'quick-reply',
null,
ARRAY['prenom', 'type_projet'],
true),

('Réponse Rapide: Expliquer Processus',
'Comment se passe la création de votre site ?',
'Bonjour {{prenom}},

Voici comment nous allons travailler ensemble pour {{type_projet}} :

🗓️ **PROCESSUS EN 4 ÉTAPES**

📋 **Étape 1 - Brief (Jour 1)**
• Appel 30min pour comprendre vos besoins
• Validation de l''arborescence
• Choix du design

🎨 **Étape 2 - Maquette (Jours 2-5)**
• Création design sur mesure
• 2 allers-retours modification inclus
• Validation finale par vous

💻 **Étape 3 - Développement (Jours 6-12)**
• Intégration du design
• Ajout des fonctionnalités
• Tests multi-appareils

🚀 **Étape 4 - Livraison (Jours 13-14)**
• Formation complète 1h
• Mise en ligne
• Support 3 mois

⏱️ Total : 2 semaines de A à Z

💬 Vous êtes impliqué à chaque étape = site qui vous ressemble !

Des questions ?

Yacine - SolYB',
'quick-reply',
null,
ARRAY['prenom', 'type_projet'],
true);

-- ============================================
-- NOTES EXEMPLES (pour quelques leads)
-- ============================================

-- Notes pour Marie-José Lafont (Lead #1)
INSERT INTO notes (lead_id, content, type, created_at) VALUES
((SELECT id FROM leads WHERE email = 'mj.lafont@gmail.com'),
'Lead reçu via formulaire site web. Budget serré mais projet clair. À contacter rapidement.',
'note',
NOW() - INTERVAL '2 hours'),

((SELECT id FROM leads WHERE email = 'mj.lafont@gmail.com'),
'Planifier appel découverte pour demain 18h30. Préparer exemples boutiques vêtements enfants.',
'task',
NOW() - INTERVAL '1 hour');

-- Notes pour Nathalie Pioche (Lead #5 - EN CONTACT)
INSERT INTO notes (lead_id, content, type, created_at) VALUES
((SELECT id FROM leads WHERE email = 'n.pioche@gmail.com'),
'Premier appel effectué. Très motivée ! Veut démarrer rapidement. Budget OK. Produits déjà photographiés.',
'call',
NOW() - INTERVAL '4 days'),

((SELECT id FROM leads WHERE email = 'n.pioche@gmail.com'),
'Envoyé exemples boutiques e-commerce cosmétiques. Elle a adoré le design minimaliste moderne.',
'email',
NOW() - INTERVAL '3 days'),

((SELECT id FROM leads WHERE email = 'n.pioche@gmail.com'),
'RDV visio vendredi 16h pour valider maquette. Elle prépare liste produits Excel.',
'meeting',
NOW() - INTERVAL '2 days');

-- Notes pour Franck Belzince (Lead #10 - DEVIS)
INSERT INTO notes (lead_id, content, type, created_at) VALUES
((SELECT id FROM leads WHERE email = 'f.belzince@gmail.com'),
'Devis e-commerce 1200€ envoyé. 200+ produits auto. Intégration catalogue existant. Délai 3 semaines.',
'note',
NOW() - INTERVAL '2 weeks'),

((SELECT id FROM leads WHERE email = 'f.belzince@gmail.com'),
'Relance téléphonique prévue mardi matin si pas de réponse d''ici là.',
'task',
NOW() - INTERVAL '1 week');

-- Notes pour Christelle Monerville (Lead GAGNÉ #13)
INSERT INTO notes (lead_id, content, type, created_at, is_task, task_completed) VALUES
((SELECT id FROM leads WHERE email = 'c.monerville@gmail.com'),
'Deal conclu ! Acompte 50% reçu (299,50€). Démarrage lundi prochain.',
'note',
NOW() - INTERVAL '4 weeks',
false,
false),

((SELECT id FROM leads WHERE email = 'c.monerville@gmail.com'),
'Appel brief projet effectué. Récupérer photos portfolio haute qualité.',
'call',
NOW() - INTERVAL '3 weeks',
false,
false),

((SELECT id FROM leads WHERE email = 'c.monerville@gmail.com'),
'Site livré ! Cliente ravie. Témoignage à récupérer pour portfolio.',
'note',
NOW() - INTERVAL '1 week',
true,
true);

-- ============================================
-- EMAIL LOGS EXEMPLES
-- ============================================

-- Emails pour Lead EN CONTACT
INSERT INTO email_logs (lead_id, template_id, to_email, subject, status, opened_at, clicked_at, created_at) VALUES
((SELECT id FROM leads WHERE email = 'n.pioche@gmail.com'),
(SELECT id FROM email_templates WHERE name = 'Email Séquence 1: Bienvenue'),
'n.pioche@gmail.com',
'Bienvenue Nathalie - Votre projet ecommerce avec SolYB',
'opened',
NOW() - INTERVAL '4 days' + INTERVAL '2 hours',
NOW() - INTERVAL '4 days' + INTERVAL '2 hours 15 minutes',
NOW() - INTERVAL '5 days');

-- ============================================
-- ÉVÉNEMENTS PLANNING EXEMPLES
-- ============================================

INSERT INTO planning_events (title, description, start_time, end_time, event_type, activity_type, lead_id, status, estimated_hours) VALUES
('Appel découverte Marie-José Lafont',
'Premier contact téléphonique pour qualifier le projet Ti Moun Boutik',
NOW() + INTERVAL '1 day' + TIME '18:30:00',
NOW() + INTERVAL '1 day' + TIME '19:00:00',
'appel',
'digital',
(SELECT id FROM leads WHERE email = 'mj.lafont@gmail.com'),
'planned',
0.5),

('Développement site CM Décoration',
'Intégration portfolio photos + blog tendances',
NOW() + INTERVAL '2 days' + TIME '19:00:00',
NOW() + INTERVAL '2 days' + TIME '21:00:00',
'projet',
'digital',
(SELECT id FROM leads WHERE email = 'c.monerville@gmail.com'),
'in-progress',
2),

('Animation GMS Carrefour',
'Stand produits locaux - Après-midi',
NOW() + INTERVAL '5 days' + TIME '14:00:00',
NOW() + INTERVAL '5 days' + TIME '18:00:00',
'animation',
'animation',
(SELECT id FROM leads WHERE email LIKE '%carrefour%'),
'planned',
4),

('Distribution Super U',
'Livraison B2B samedi matin',
NOW() + INTERVAL '6 days' + TIME '06:00:00',
NOW() + INTERVAL '6 days' + TIME '11:00:00',
'distribution',
'distribution',
(SELECT id FROM leads WHERE email LIKE '%superu%'),
'planned',
5);

-- ============================================
-- FIN DU SEED
-- ============================================

-- Afficher résumé
SELECT
  'Seed data créé avec succès !' as message,
  (SELECT COUNT(*) FROM leads) as total_leads,
  (SELECT COUNT(*) FROM email_templates) as total_templates,
  (SELECT COUNT(*) FROM notes) as total_notes,
  (SELECT COUNT(*) FROM planning_events) as total_events;

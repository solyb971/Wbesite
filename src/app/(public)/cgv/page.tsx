import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalShell, LegalSection } from '@/components/site/LegalShell'

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
  description:
    "Conditions générales de vente (CGV) de SolYB — agence digitale en Guadeloupe : prestations web, applications métier et accompagnement à la facturation électronique.",
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://solyb.fr/cgv' },
}

/*
 * ⚠️ BROUILLON — À FAIRE RELIRE PAR UN JURISTE AVANT PUBLICATION.
 * Ces CGV ont été pré-rédigées à partir des conditions commerciales affichées
 * sur le site (prix, paiement 50/50, délais, hébergement inclus, etc.). Elles
 * ne constituent pas un conseil juridique.
 *
 * À COMPLÉTER par Yacine (champs entre crochets [ ]) :
 *   - Forme juridique (auto-entrepreneur / EI / EURL / SASU…)
 *   - Numéro SIRET / SIREN
 *   - Régime de TVA (franchise en base art. 293 B du CGI, ou assujetti + n° TVA)
 *   - Médiateur de la consommation (obligatoire pour la vente aux particuliers)
 *
 * Points à arbitrer avec un juriste : droit de rétractation (B2C), pénalités de
 * retard (B2B), clause de réserve de propriété, garanties, plafond de responsabilité.
 */

export default function CGVPage() {
  const rust = { color: 'var(--syb-rust)' }
  return (
    <LegalShell eyebrow="Conditions de vente" titleTop="Conditions générales" titleAccent="de vente">
      <LegalSection title="1. Objet">
        <p>
          Les présentes conditions générales de vente (ci-après « CGV ») régissent les relations
          contractuelles entre <strong>SolYB</strong> (ci-après « le Prestataire ») et toute personne
          physique ou morale (ci-après « le Client ») commandant une prestation de services proposée
          par SolYB. Toute commande implique l&apos;acceptation sans réserve des présentes CGV.
        </p>
      </LegalSection>

      <LegalSection title="2. Prestataire">
        <p>
          <strong>SolYB</strong>, [forme juridique — ex. entreprise individuelle], représentée par
          Yacine Bouhassoun.
        </p>
        <ul className="mt-2 space-y-1">
          <li>Siège : Impasse la coulée verte, Moudong Nord, 97122 Baie-Mahault, Guadeloupe</li>
          <li>SIRET : [numéro SIRET à compléter]</li>
          <li>TVA : [n° de TVA intracommunautaire, ou « TVA non applicable, art. 293 B du CGI »]</li>
          <li>
            Contact :{' '}
            <a href="mailto:contact@solyb.fr" style={rust}>contact@solyb.fr</a>{' '}
            — <a href="tel:+590690426792" style={rust}>+590 690 42 67 92</a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Prestations">
        <p>SolYB propose notamment les prestations suivantes :</p>
        <ul className="mt-2 space-y-1 list-disc pl-5">
          <li>création de sites web (sites vitrines, boutiques e-commerce) ;</li>
          <li>développement d&apos;applications métier et de plateformes sur-mesure ;</li>
          <li>accompagnement à la mise en conformité de facturation électronique ;</li>
          <li>hébergement, maintenance, référencement local et prestations associées.</li>
        </ul>
        <p className="mt-2">
          Le détail, le périmètre et les livrables de chaque prestation sont précisés dans le devis
          accepté par le Client, qui prévaut en cas de divergence avec une description générale du site.
        </p>
      </LegalSection>

      <LegalSection title="4. Devis et commande">
        <p>
          Chaque prestation fait l&apos;objet d&apos;un devis gratuit et personnalisé, valable
          <strong> 30 jours</strong> à compter de son émission, sauf mention contraire. La commande est
          réputée ferme à réception du devis accepté (signé ou validé par écrit, y compris par email)
          et de l&apos;acompte prévu à l&apos;article 6. Toute prestation non prévue au devis fait
          l&apos;objet d&apos;un avenant.
        </p>
      </LegalSection>

      <LegalSection title="5. Prix">
        <p>
          Les prix sont indiqués en euros et s&apos;entendent [hors taxes / nets de TVA selon le régime
          applicable]. Les tarifs applicables sont ceux figurant sur le devis accepté. Les offres
          promotionnelles (notamment l&apos;offre de lancement) sont valables dans la limite des
          conditions et de la durée annoncées. Les prestations sont fournies sans frais caché : tout
          coût additionnel éventuel (par ex. licences, polices, banques d&apos;images, services tiers)
          est signalé au préalable.
        </p>
      </LegalSection>

      <LegalSection title="6. Modalités de paiement">
        <p>Sauf accord particulier mentionné au devis, le paiement s&apos;effectue en deux fois :</p>
        <ul className="mt-2 space-y-1 list-disc pl-5">
          <li><strong>50 % à la commande</strong>, à titre d&apos;acompte, pour le démarrage du projet ;</li>
          <li><strong>50 % à la livraison</strong>, à réception du projet finalisé.</li>
        </ul>
        <p className="mt-2">
          Le règlement s&apos;effectue par virement bancaire (le paiement en ligne par carte sera
          proposé ultérieurement). Pour les projets à partir de 1 500 €, un paiement en trois fois est
          possible sur demande. Une facture est systématiquement fournie. En cas de retard de paiement,
          des pénalités au taux légal en vigueur pourront être appliquées, ainsi que
          l&apos;indemnité forfaitaire de recouvrement de 40 € prévue pour les professionnels
          (art. L441-10 du Code de commerce).
        </p>
      </LegalSection>

      <LegalSection title="7. Délais d'exécution">
        <p>
          À titre indicatif, les délais de réalisation sont d&apos;environ <strong>2 à 3 semaines</strong>{' '}
          pour un site vitrine et <strong>3 à 4 semaines</strong> pour une boutique en ligne, à compter
          de la validation de la commande et de la réception de l&apos;ensemble des éléments nécessaires
          (contenus, textes, visuels, accès). Ces délais sont suspendus en cas de retard du Client dans
          la fourniture de ces éléments ou dans la validation des étapes intermédiaires.
        </p>
      </LegalSection>

      <LegalSection title="8. Obligations du Client">
        <p>
          Le Client s&apos;engage à fournir, en temps utile, l&apos;ensemble des informations, contenus
          et accès nécessaires à la bonne exécution de la prestation, et à garantir qu&apos;il dispose
          des droits sur les éléments transmis (textes, images, marques, logos). Le Client demeure seul
          responsable du contenu qu&apos;il fournit et de sa conformité à la réglementation.
        </p>
      </LegalSection>

      <LegalSection title="9. Révisions et validation">
        <p>
          Sauf indication contraire au devis, la prestation inclut un nombre défini de cycles de
          révision (par ex. <strong>3 révisions</strong> pour un site vitrine). Toute demande de
          modification au-delà de ce périmètre, ou modifiant substantiellement le projet initial, fait
          l&apos;objet d&apos;un devis complémentaire. La validation des livrables par le Client vaut
          réception.
        </p>
      </LegalSection>

      <LegalSection title="10. Hébergement et nom de domaine">
        <p>
          L&apos;offre peut inclure l&apos;hébergement et le nom de domaine pour une durée d&apos;un an.
          À l&apos;issue de cette période, leur renouvellement fait l&apos;objet d&apos;une facturation
          distincte, communiquée au Client. Les données sont hébergées sur des serveurs situés en France
          et dans l&apos;Union européenne, dans le respect du RGPD (voir la{' '}
          <Link href="/confidentialite" style={rust}>politique de confidentialité</Link>).
        </p>
      </LegalSection>

      <LegalSection title="11. Maintenance et support">
        <p>
          Un mois de support par email est inclus après la livraison. Au-delà, une offre de maintenance
          optionnelle est proposée sur abonnement. Le plan de maintenance est réservé aux sites conçus
          par SolYB. La reprise d&apos;un site développé par un tiers fait l&apos;objet d&apos;un devis
          spécifique.
        </p>
      </LegalSection>

      <LegalSection title="12. Propriété intellectuelle">
        <p>
          Après <strong>paiement intégral</strong> du prix, le Client devient propriétaire des livrables
          finaux (code, contenus réalisés, nom de domaine), qu&apos;il est libre de faire évoluer.
          Jusqu&apos;au paiement complet, SolYB conserve l&apos;ensemble des droits sur les livrables. Les
          composants tiers (bibliothèques open source, polices, services) restent soumis à leurs licences
          respectives. SolYB se réserve le droit de mentionner la réalisation dans ses références, sauf
          opposition écrite du Client.
        </p>
      </LegalSection>

      <LegalSection title="13. Droit de rétractation">
        <p>
          Pour le Client <strong>consommateur</strong> (particulier), un droit de rétractation de 14 jours
          s&apos;applique en principe aux contrats conclus à distance (art. L221-18 du Code de la
          consommation). Toutefois, s&apos;agissant de prestations personnalisées et réalisées à la
          demande du Client, l&apos;exécution peut commencer avant la fin de ce délai à la demande
          expresse du Client, ce dernier renonçant alors à son droit de rétractation pour la part de
          prestation exécutée (art. L221-25 et L221-28). Le Client <strong>professionnel</strong> ne
          bénéficie pas de ce droit de rétractation.
        </p>
      </LegalSection>

      <LegalSection title="14. Annulation">
        <p>
          En cas d&apos;annulation de la commande par le Client après le démarrage des travaux,
          l&apos;acompte versé reste acquis au Prestataire et les prestations déjà réalisées demeurent
          dues, au prorata de l&apos;avancement.
        </p>
      </LegalSection>

      <LegalSection title="15. Responsabilité">
        <p>
          SolYB est tenue à une obligation de moyens. Sa responsabilité ne saurait être engagée en cas de
          dommage indirect, de perte de données ou de chiffre d&apos;affaires, ni en cas
          d&apos;indisponibilité imputable à un tiers (hébergeur, fournisseur de services). En tout état
          de cause, la responsabilité de SolYB est limitée au montant de la prestation concernée.
        </p>
      </LegalSection>

      <LegalSection title="16. Force majeure">
        <p>
          La responsabilité du Prestataire ne pourra être engagée en cas d&apos;inexécution ou de retard
          dû à un cas de force majeure au sens de l&apos;article 1218 du Code civil.
        </p>
      </LegalSection>

      <LegalSection title="17. Données personnelles">
        <p>
          Le traitement des données personnelles est décrit dans la{' '}
          <Link href="/confidentialite" style={rust}>politique de confidentialité</Link>. Le Client
          dispose des droits d&apos;accès, de rectification et de suppression de ses données.
        </p>
      </LegalSection>

      <LegalSection title="18. Réclamation et médiation">
        <p>
          Toute réclamation peut être adressée à{' '}
          <a href="mailto:contact@solyb.fr" style={rust}>contact@solyb.fr</a>. Conformément à
          l&apos;article L612-1 du Code de la consommation, le Client consommateur peut recourir
          gratuitement à un médiateur de la consommation : [nom et coordonnées du médiateur à désigner].
        </p>
      </LegalSection>

      <LegalSection title="19. Droit applicable et litiges">
        <p>
          Les présentes CGV sont soumises au droit français. À défaut de résolution amiable, tout litige
          relèvera des tribunaux compétents du ressort du siège du Prestataire, sous réserve des règles
          d&apos;ordre public applicables aux consommateurs.
        </p>
      </LegalSection>
    </LegalShell>
  )
}

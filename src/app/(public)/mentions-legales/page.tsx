import type { Metadata } from 'next'
import Link from 'next/link'
import { LegalShell, LegalSection } from '@/components/site/LegalShell'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site SolYB — agence digitale en Guadeloupe.',
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://solyb.fr/mentions-legales' },
}

/*
 * ⚠️ À COMPLÉTER par Yacine — les champs entre crochets [ ] doivent être
 * remplis avec les informations légales réelles de l'entreprise :
 *   - Forme juridique (auto-entrepreneur / EI / EURL / SASU…)
 *   - Numéro SIRET / SIREN
 *   - Numéro de TVA intracommunautaire (si assujetti)
 * L'hébergeur indiqué (Vercel) suppose un déploiement sur Vercel — à ajuster si autre.
 */

export default function MentionsLegalesPage() {
  return (
    <LegalShell eyebrow="Informations légales" titleTop="Mentions" titleAccent="légales">
      <LegalSection title="Éditeur du site">
        <p>
          Le site <strong>solyb.fr</strong> est édité par <strong>SolYB</strong>, [forme juridique —
          ex. entreprise individuelle], dont le siège social est situé :
        </p>
        <p className="mt-2">
          Impasse la coulée verte, Moudong Nord<br />
          97122 Baie-Mahault, Guadeloupe
        </p>
        <ul className="mt-3 space-y-1">
          <li>Responsable de la publication : Yacine Bouhassoun</li>
          <li>SIRET : [numéro SIRET à compléter]</li>
          <li>Numéro de TVA intracommunautaire : [le cas échéant]</li>
          <li>
            Email :{' '}
            <a href="mailto:contact@solyb.fr" style={{ color: 'var(--syb-rust)' }}>contact@solyb.fr</a>
          </li>
          <li>
            Téléphone :{' '}
            <a href="tel:+590690711769" style={{ color: 'var(--syb-rust)' }}>+590 690 71 17 69</a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>
          Le site est hébergé par <strong>Vercel Inc.</strong><br />
          340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis<br />
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--syb-rust)' }}>
            vercel.com
          </a>
        </p>
      </LegalSection>

      <LegalSection title="Propriété intellectuelle">
        <p>
          L&apos;ensemble des contenus présents sur ce site (textes, visuels, logos, code, charte
          graphique) est la propriété exclusive de SolYB, sauf mention contraire. Toute
          reproduction, représentation, modification ou exploitation, totale ou partielle, sans
          l&apos;autorisation écrite préalable de SolYB est interdite et constituerait une
          contrefaçon sanctionnée par le Code de la propriété intellectuelle.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          Les informations recueillies via les formulaires du site font l&apos;objet d&apos;un
          traitement destiné à répondre à vos demandes. Pour en savoir plus sur la gestion de vos
          données et l&apos;exercice de vos droits, consultez notre{' '}
          <Link href="/confidentialite" style={{ color: 'var(--syb-rust)' }}>
            politique de confidentialité
          </Link>.
        </p>
      </LegalSection>

      <LegalSection title="Responsabilité">
        <p>
          SolYB s&apos;efforce d&apos;assurer l&apos;exactitude des informations diffusées sur ce
          site mais ne saurait être tenue responsable des erreurs, omissions ou d&apos;une
          indisponibilité temporaire du service. Les liens vers des sites tiers sont fournis à titre
          indicatif et n&apos;engagent pas la responsabilité de SolYB quant à leur contenu.
        </p>
      </LegalSection>

      <LegalSection title="Droit applicable">
        <p>
          Les présentes mentions légales sont régies par le droit français. En cas de litige, et à
          défaut de résolution amiable, les tribunaux compétents seront ceux du ressort du siège de
          l&apos;éditeur.
        </p>
      </LegalSection>
    </LegalShell>
  )
}

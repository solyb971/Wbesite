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
 * Infos légales SASU complétées (2026-07). Le RCS est déduit du SIREN
 * (greffe de Pointe-à-Pitre) — à vérifier sur l'extrait Kbis.
 */

export default function MentionsLegalesPage() {
  return (
    <LegalShell eyebrow="Informations légales" titleTop="Mentions" titleAccent="légales">
      <LegalSection title="Éditeur du site">
        <p>
          Le site <strong>solyb.fr</strong> est édité par <strong>SolYB</strong>, société par actions
          simplifiée unipersonnelle (SASU), dont le siège social est situé :
        </p>
        <p className="mt-2">
          Route de Tambour<br />
          97170 Petit-Bourg, Guadeloupe
        </p>
        <ul className="mt-3 space-y-1">
          <li>Président et responsable de la publication : Yacine Bouhassoun</li>
          <li>SIRET : 102 699 220 00012</li>
          <li>RCS Pointe-à-Pitre : 102 699 220</li>
          <li>Capital social : 1 000 €</li>
          <li>Numéro de TVA intracommunautaire : FR64102699220</li>
          <li>
            Email :{' '}
            <a href="mailto:contact@solyb.fr" style={{ color: 'var(--syb-rust-ink)' }}>contact@solyb.fr</a>
          </li>
          <li>
            Téléphone :{' '}
            <a href="tel:+590690426792" style={{ color: 'var(--syb-rust-ink)' }}>+590 690 42 67 92</a>
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>
          Le site est hébergé par <strong>Vercel Inc.</strong><br />
          340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis<br />
          <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--syb-rust-ink)' }}>
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
          <Link href="/confidentialite" style={{ color: 'var(--syb-rust-ink)' }}>
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

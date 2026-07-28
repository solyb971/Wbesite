import { Metadata } from 'next'
import { ArticleShell, ArticleCallout } from '@/components/site/ArticleShell'
import { blogTags } from '@/lib/blog-meta'

const ACCENT = '#0E7C6B'                 // teal caraïbe — rubrique Guides
const ACCENT_INK = '#0E7C6B'             // déjà AA sur crème (4,57)

export const metadata: Metadata = {
  title: 'Être Visible sur Google en Guadeloupe : le Guide de la Fiche d’Établissement',
  description: 'Comment apparaître sur Google et Google Maps en Guadeloupe ? Créer et optimiser sa fiche d’établissement (Google Business Profile), obtenir des avis, éviter les erreurs courantes. Guide pratique gratuit.',
  keywords: [
    'référencement Google Guadeloupe',
    'fiche Google entreprise Guadeloupe',
    'Google Business Profile Guadeloupe',
    'apparaître sur Google Maps 971',
    'visibilité Google commerce Guadeloupe',
    'avis Google entreprise',
  ],
  alternates: {
    canonical: 'https://solyb.fr/blog/etre-visible-sur-google-guadeloupe',
  },
  openGraph: {
    title: 'Être visible sur Google en Guadeloupe — le guide de la fiche d’établissement',
    description: 'Créer et optimiser sa fiche Google gratuitement : la méthode complète pour les commerces, artisans et restaurateurs guadeloupéens.',
    url: 'https://solyb.fr/blog/etre-visible-sur-google-guadeloupe',
    type: 'article',
    publishedTime: '2026-07-15',
    authors: ['Yacine Bouhassoun'],
  },
}

export default function EtreVisibleSurGooglePage() {
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'Être visible sur Google en Guadeloupe : le guide de la fiche d’établissement',
    description: 'Guide pratique pour créer et optimiser sa fiche d’établissement Google (Google Business Profile) en Guadeloupe : informations, photos, avis, erreurs à éviter.',
    author: { '@type': 'Person', name: 'Yacine Bouhassoun', url: 'https://solyb.fr' },
    publisher: {
      '@type': 'Organization',
      name: 'SolYB',
      logo: { '@type': 'ImageObject', url: 'https://solyb.fr/logo/syb-orange.png' },
      address: { '@type': 'PostalAddress', addressLocality: 'Petit-Bourg', addressRegion: 'Guadeloupe', addressCountry: 'GP' },
    },
    datePublished: '2026-07-15',
    dateModified: '2026-07-15',
    mainEntityOfPage: 'https://solyb.fr/blog/etre-visible-sur-google-guadeloupe',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'La fiche d’établissement Google est-elle gratuite ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui, entièrement. Créer et gérer sa fiche d’établissement (Google Business Profile) ne coûte rien. Méfiez-vous des démarchages téléphoniques qui proposent de « référencer votre entreprise sur Google » contre un abonnement : ils revendent, au mieux, ce que vous pouvez faire vous-même gratuitement.' },
      },
      {
        '@type': 'Question',
        name: 'Combien de temps pour apparaître sur Google Maps ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Après création de la fiche, Google demande une vérification (souvent par vidéo, parfois par courrier). Une fois validée, la fiche apparaît généralement sous quelques jours. Son positionnement dans les résultats s’améliore ensuite avec le temps, les avis et la complétude des informations.' },
      },
      {
        '@type': 'Question',
        name: 'Comment obtenir plus d’avis Google ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le plus efficace est de demander simplement, au bon moment : après une vente ou une prestation réussie. Google fournit un lien court à partager (par WhatsApp, SMS ou QR code). Il est interdit d’acheter des avis ou d’offrir une récompense en échange — au-delà du risque de sanction, les faux avis se repèrent.' },
      },
      {
        '@type': 'Question',
        name: 'Faut-il un site web en plus de la fiche Google ?',
        acceptedAnswer: { '@type': 'Answer', text: 'La fiche Google est la priorité numéro un pour être trouvé localement, et elle est gratuite. Un site web la complète : il vous appartient, présente votre activité en détail et renforce la confiance. Mais commencez par la fiche — c’est le meilleur rapport effort/résultat qui existe.' },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <ArticleShell
        category="Guides"
        accent={ACCENT}
        accentInk={ACCENT_INK}
        title="Être visible sur Google en Guadeloupe : le guide de la fiche d'établissement"
        date="2026-07-15"
        readTime="10 min"
        crumbLabel="Être visible sur Google"
        crumbHref="/blog/etre-visible-sur-google-guadeloupe"
        tags={blogTags['etre-visible-sur-google-guadeloupe']}
        cta={{
          heading: 'Besoin d’aller plus loin que la fiche ?',
          text: 'Si vous voulez un site qui travaille avec votre fiche Google — et pas à côté — on peut en parler. Devis gratuit sous 24 h, sans engagement.',
          primary: { label: 'Discuter de mon projet', href: '/#contact' },
        }}
      >
        <p className="lead">
          Quand un client cherche «&nbsp;boulangerie Baie-Mahault&nbsp;» ou «&nbsp;plombier Petit-Bourg&nbsp;», Google
          n&rsquo;affiche pas d&rsquo;abord des sites web : il affiche une <strong>carte avec trois établissements</strong>.
          Être dans ces trois-là, c&rsquo;est gratuit — à condition d&rsquo;avoir une <strong>fiche
          d&rsquo;établissement</strong> bien remplie. Ce guide explique, pas à pas, comment créer la vôtre, la faire
          vérifier, et la faire remonter. Aucun budget nécessaire, juste un peu de méthode.
        </p>

        <h2>Pourquoi la fiche Google passe avant tout le reste</h2>
        <p>
          Pour une entreprise locale, la fiche d&rsquo;établissement (l&rsquo;outil s&rsquo;appelle
          <strong> Google Business Profile</strong>, ex «&nbsp;Google My Business&nbsp;») est le levier de visibilité le
          plus rentable qui existe : elle est gratuite, elle apparaît sur Google <em>et</em> sur Google Maps, et elle
          s&rsquo;affiche pile au moment où quelqu&rsquo;un cherche ce que vous faites, près de chez vous. En Guadeloupe,
          où beaucoup de recherches se font depuis un téléphone («&nbsp;ouvert maintenant&nbsp;», «&nbsp;près de
          moi&nbsp;»), c&rsquo;est souvent la fiche — pas le site — qui déclenche l&rsquo;appel ou la visite.
        </p>
        <ArticleCallout accent={ACCENT}>
          <p className="font-semibold mb-3" style={{ color: 'var(--syb-ink)' }}>Ce que votre fiche affiche à un client qui vous cherche</p>
          <ul className="space-y-2.5 m-0 list-none p-0" style={{ color: 'var(--syb-stone)' }}>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span>Votre position sur la carte et l&rsquo;itinéraire pour venir</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span>Vos horaires — y compris «&nbsp;ouvert&nbsp;» ou «&nbsp;fermé&nbsp;» en ce moment</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span>Un bouton d&rsquo;appel direct depuis le téléphone</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span>Vos photos, vos avis clients et votre note moyenne</span></li>
          </ul>
        </ArticleCallout>

        <h2>Étape 1 — Créer (ou récupérer) votre fiche</h2>
        <p>
          Rendez-vous sur <strong>google.com/business</strong> avec un compte Google, puis cherchez le nom de votre
          entreprise. Deux cas de figure&nbsp;:
        </p>
        <ul>
          <li><strong>Votre établissement existe déjà</strong> — Google crée parfois des fiches automatiquement, et des clients peuvent en suggérer. Cliquez sur «&nbsp;Revendiquer cet établissement&nbsp;» pour en reprendre le contrôle. C&rsquo;est fréquent, et important : une fiche non revendiquée affiche des informations que vous ne maîtrisez pas.</li>
          <li><strong>Rien n&rsquo;existe</strong> — Créez la fiche en indiquant le nom exact de votre entreprise, sa catégorie principale et son adresse (ou sa zone d&rsquo;intervention si vous vous déplacez, comme un artisan).</li>
        </ul>
        <p>
          Google demande ensuite une <strong>vérification</strong> : selon les cas, un enregistrement vidéo des lieux,
          un appel, ou un courrier avec un code. L&rsquo;étape peut sembler fastidieuse, mais elle protège votre fiche —
          faites-la sérieusement, sans chercher à la contourner.
        </p>

        <h2>Étape 2 — Remplir chaque champ, sans exception</h2>
        <p>
          Google favorise les fiches <strong>complètes</strong>. Une fiche à moitié remplie, c&rsquo;est une fiche que
          Google hésite à montrer — et l&rsquo;écart n&rsquo;est pas anecdotique&nbsp;: selon les données de Google, les
          établissements dont la fiche est complète sont <strong>2,7 fois plus susceptibles</strong> d&rsquo;être perçus
          comme fiables par les internautes. Passez chaque section en revue&nbsp;:
        </p>
        <ul>
          <li><strong>La catégorie principale</strong> — c&rsquo;est le champ le plus important pour votre positionnement. Choisissez la plus précise («&nbsp;Restaurant créole&nbsp;» plutôt que «&nbsp;Restaurant&nbsp;»), puis ajoutez des catégories secondaires si pertinent.</li>
          <li><strong>Les horaires</strong> — exacts, et tenus à jour, jours fériés compris. Une fiche qui affiche «&nbsp;ouvert&nbsp;» devant une porte close fait fuir un client et attire les avis négatifs.</li>
          <li><strong>Le téléphone et la zone desservie</strong> — le numéro sur lequel vous répondez vraiment.</li>
          <li><strong>La description</strong> — quelques phrases naturelles qui disent ce que vous faites, pour qui, et où. Inutile d&rsquo;empiler les mots-clés : écrivez pour un client, pas pour un robot.</li>
          <li><strong>Les attributs</strong> — parking, terrasse, paiement sans contact, accès PMR… Cochez tout ce qui est vrai.</li>
        </ul>

        <h2>Étape 3 — Les photos : le champ le plus négligé</h2>
        <p>
          C&rsquo;est la partie que la plupart des établissements guadeloupéens laissent vide — et c&rsquo;est dommage,
          car les photos sont la première chose qu&rsquo;un client regarde. Pas besoin de photographe professionnel :
          un téléphone récent, de la lumière naturelle, et quelques règles simples suffisent.
        </p>
        <ArticleCallout accent={ACCENT}>
          <p className="font-semibold mb-3" style={{ color: 'var(--syb-ink)' }}>Les photos qui comptent, dans l&rsquo;ordre</p>
          <ul className="space-y-2.5 m-0 list-none p-0" style={{ color: 'var(--syb-stone)' }}>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span><strong style={{ color: 'var(--syb-ink)' }}>La devanture</strong> — pour qu&rsquo;on vous reconnaisse en arrivant. Prise de jour, depuis la rue.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span><strong style={{ color: 'var(--syb-ink)' }}>L&rsquo;intérieur</strong> — l&rsquo;ambiance, la salle, l&rsquo;atelier, la boutique.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span><strong style={{ color: 'var(--syb-ink)' }}>Ce que vous vendez</strong> — plats, produits, réalisations de chantier, avant/après.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span><strong style={{ color: 'var(--syb-ink)' }}>L&rsquo;équipe</strong> — un visage crée plus de confiance qu&rsquo;un logo.</span></li>
          </ul>
          <p className="mt-4 mb-0 text-sm font-semibold" style={{ color: ACCENT_INK }}>
            Ajoutez ensuite une ou deux photos par mois : une fiche qui vit inspire plus confiance qu&rsquo;une fiche figée.
          </p>
        </ArticleCallout>

        <h2>Étape 4 — Les avis : votre meilleur levier de classement</h2>
        <p>
          À informations égales, c&rsquo;est le volume et la fraîcheur des <strong>avis</strong> qui départagent deux
          fiches. Et contrairement à ce qu&rsquo;on croit, obtenir des avis ne demande pas d&rsquo;être une grande
          enseigne : il suffit de <strong>demander, au bon moment</strong>.
        </p>
        <ol>
          <li><strong>Récupérez votre lien d&rsquo;avis</strong> — dans votre espace Google Business Profile, un lien court permet à un client de laisser un avis en deux clics. Gardez-le à portée de main.</li>
          <li><strong>Demandez juste après la prestation</strong> — un client satisfait qui vient de payer est dans la meilleure disposition. Un message WhatsApp avec le lien suffit&nbsp;: «&nbsp;Merci pour votre visite ! Si vous avez 30 secondes, un avis nous aide beaucoup.&nbsp;»</li>
          <li><strong>Répondez à tous les avis</strong> — les bons comme les mauvais. Une réponse courtoise à un avis négatif rassure davantage les futurs clients que dix avis parfaits.</li>
        </ol>
        <p>
          Deux interdits à connaître : <strong>acheter des avis</strong> et <strong>offrir une récompense</strong> en
          échange d&rsquo;un avis. Les deux violent les règles de Google, exposent la fiche à des sanctions, et se
          repèrent vite — une entreprise de dix salariés avec 400 avis en un mois, personne n&rsquo;y croit.
        </p>

        <h2>Les erreurs qui plombent les fiches guadeloupéennes</h2>
        <ArticleCallout accent={ACCENT}>
          <ul className="space-y-2.5 m-0 list-none p-0" style={{ color: 'var(--syb-stone)' }}>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span><strong style={{ color: 'var(--syb-ink)' }}>La fiche fantôme</strong> — créée un jour, jamais mise à jour. Horaires faux, téléphone qui ne répond plus, photos de 2019.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span><strong style={{ color: 'var(--syb-ink)' }}>Le nom bourré de mots-clés</strong> — «&nbsp;Chez Lucie - Restaurant Créole Pas Cher Gosier Plage&nbsp;» viole les règles de Google. Le nom de la fiche doit être votre vrai nom commercial, rien d&rsquo;autre.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span><strong style={{ color: 'var(--syb-ink)' }}>Les avis ignorés</strong> — un avis négatif sans réponse laisse le dernier mot au mécontent.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span><strong style={{ color: 'var(--syb-ink)' }}>Payer pour du vent</strong> — des démarcheurs facturent un «&nbsp;référencement Google&nbsp;» qui n&rsquo;est que la gestion de cette fiche gratuite. Vous savez maintenant le faire vous-même.</span></li>
          </ul>
        </ArticleCallout>

        <h2>Et le site web, alors ?</h2>
        <p>
          Une question revient souvent : «&nbsp;si la fiche Google suffit à être trouvé, à quoi sert un site ?&nbsp;».
          Réponse honnête : <strong>pour beaucoup de très petites activités, la fiche bien tenue est effectivement le
          premier pas — et il est gratuit</strong>. Le site devient utile quand vous voulez aller plus loin : présenter
          vos prestations en détail, être trouvé sur des recherches plus larges que votre nom, prendre des réservations,
          vendre en ligne, ou simplement posséder un espace dont les règles ne changent pas du jour au lendemain. La
          fiche et le site ne s&rsquo;opposent pas : la fiche capte la recherche locale, le site transforme la visite en
          client. Mais faites les choses dans l&rsquo;ordre — <strong>fiche d&rsquo;abord</strong>.
        </p>

        <h2>Questions fréquentes</h2>
        <h3>Je n&rsquo;ai pas de local, seulement une zone d&rsquo;intervention. Puis-je avoir une fiche ?</h3>
        <p>
          Oui. Lors de la création, indiquez que vous vous déplacez chez vos clients et définissez votre zone
          d&rsquo;intervention (par exemple toute la Guadeloupe, ou certaines communes). Votre adresse personnelle
          peut rester masquée.
        </p>
        <h3>Quelqu&rsquo;un a modifié les informations de ma fiche. Comment est-ce possible ?</h3>
        <p>
          Google accepte les «&nbsp;suggestions de modification&nbsp;» du public et peut les appliquer automatiquement.
          C&rsquo;est une raison de plus de consulter votre fiche régulièrement : vous êtes notifié des changements et
          pouvez les corriger. Une fiche revendiquée et active est bien plus résistante à ces modifications.
        </p>
        <h3>Ma fiche existe mais n&rsquo;apparaît pas dans les trois premiers résultats. Pourquoi ?</h3>
        <p>
          Le classement local dépend de trois facteurs, décrits par Google lui-même dans son
          {' '}<a href="https://support.google.com/business/answer/7091" target="_blank" rel="noopener noreferrer">
            centre d&rsquo;aide Google Business Profile
          </a> : la <strong>pertinence</strong> (votre catégorie et vos informations correspondent à la recherche), la{' '}
          <strong>distance</strong> (vous êtes proche de la personne qui cherche), et la <strong>notoriété</strong>{' '}
          (avis, complétude, ancienneté de la fiche). Vous ne pouvez pas jouer sur la distance — mais la pertinence et
          la notoriété se travaillent avec tout ce qui précède.
        </p>

        <h2>En résumé</h2>
        <p>
          La fiche d&rsquo;établissement Google est <strong>gratuite</strong> et c&rsquo;est le levier de visibilité
          locale le plus efficace pour un commerce, un artisan ou un restaurateur en Guadeloupe. Revendiquez-la,
          remplissez <strong>tous</strong> les champs, ajoutez de vraies photos, demandez des avis après chaque
          prestation réussie et répondez-y. Une heure pour la créer, quelques minutes par semaine pour la faire vivre —
          c&rsquo;est l&rsquo;investissement au meilleur rendement de toute votre présence en ligne.
        </p>
      </ArticleShell>
    </>
  )
}

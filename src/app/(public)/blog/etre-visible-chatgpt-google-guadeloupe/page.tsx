import { Metadata } from 'next'
import { ArticleShell, ArticleCallout } from '@/components/site/ArticleShell'
import { blogTags } from '@/lib/blog-meta'

const ACCENT = '#0E7C6B'                 // teal caraïbe — rubrique Guides
const ACCENT_INK = '#0E7C6B'             // déjà AA sur crème (4,57)

export const metadata: Metadata = {
  title: 'SEO et GEO : être visible sur Google ET sur ChatGPT en 2026',
  description: 'Le SEO classique ne suffit plus : une partie de vos clients cherche désormais via ChatGPT, Perplexity ou Gemini. Ce qui change avec le GEO (Generative Engine Optimization), et comment s’y préparer sans tout reconstruire.',
  keywords: [
    'GEO Guadeloupe',
    'Generative Engine Optimization',
    'référencement IA générative',
    'être visible sur ChatGPT',
    'SEO et intelligence artificielle',
    'référencement site internet Guadeloupe',
  ],
  alternates: {
    canonical: 'https://solyb.fr/blog/etre-visible-chatgpt-google-guadeloupe',
  },
  openGraph: {
    title: 'SEO et GEO : être visible sur Google ET sur ChatGPT en 2026',
    description: 'Le référencement classique ne suffit plus : voici ce qui change quand l’IA générative devient un canal de recherche, et comment s’y préparer sans repartir de zéro.',
    url: 'https://solyb.fr/blog/etre-visible-chatgpt-google-guadeloupe',
    type: 'article',
    publishedTime: '2026-08-01',
    authors: ['Yacine Bouhassoun'],
  },
}

export default function SeoGeoPage() {
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: 'SEO et GEO : être visible sur Google ET sur ChatGPT en 2026',
    description: 'Ce qui change quand l’IA générative devient un canal de recherche à part entière, et les leviers concrets pour qu’une IA cite votre entreprise — sans abandonner le SEO classique.',
    author: { '@type': 'Person', name: 'Yacine Bouhassoun', url: 'https://solyb.fr' },
    publisher: {
      '@type': 'Organization',
      name: 'SolYB',
      logo: { '@type': 'ImageObject', url: 'https://solyb.fr/logo/syb-orange.png' },
      address: { '@type': 'PostalAddress', addressLocality: 'Petit-Bourg', addressRegion: 'Guadeloupe', addressCountry: 'GP' },
    },
    datePublished: '2026-08-01',
    dateModified: '2026-08-01',
    mainEntityOfPage: 'https://solyb.fr/blog/etre-visible-chatgpt-google-guadeloupe',
  }

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Le GEO va-t-il remplacer le SEO ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Non. Le GEO se construit sur les fondations du SEO : un site rapide, bien structuré et sémantiquement clair reste indispensable. Le GEO ajoute des critères supplémentaires (sources citées, contenu structuré pour être repris tel quel, autorité perçue) plutôt qu’il ne remplace les anciens. Un site avec un mauvais SEO n’a aucune chance en GEO non plus.' },
      },
      {
        '@type': 'Question',
        name: 'Comment savoir si mon site est cité par ChatGPT ou une autre IA générative ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Le plus simple reste de poser à l’IA les questions que poserait un client réel de votre secteur et de votre zone (« meilleur [métier] à [ville] », « comment choisir un [service] en Guadeloupe ») et de regarder si votre entreprise, votre site ou votre contenu apparaît dans la réponse ou les sources citées. C’est artisanal, mais c’est aujourd’hui la méthode la plus fiable, faute d’outil de mesure standardisé et gratuit.' },
      },
      {
        '@type': 'Question',
        name: 'Une petite entreprise guadeloupéenne a-t-elle une chance face aux grandes marques sur le GEO ?',
        acceptedAnswer: { '@type': 'Answer', text: 'Oui, et même plus qu’en SEO classique sur certains points : les IA génératives valorisent la précision et la pertinence locale au moins autant que la notoriété globale. Un contenu qui répond avec exactitude à une question très locale (un quartier, une commune, une réglementation guadeloupéenne) a de bonnes chances d’être repris, là où un grand site généraliste reste vague.' },
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
        title="SEO et GEO : être visible sur Google ET sur ChatGPT en 2026"
        date="2026-08-01"
        readTime="9 min"
        crumbLabel="SEO et GEO"
        crumbHref="/blog/etre-visible-chatgpt-google-guadeloupe"
        tags={blogTags['etre-visible-chatgpt-google-guadeloupe']}
        cta={{
          heading: 'Votre site est-il prêt pour ce virage ?',
          text: 'Structure, contenu, données structurées : on peut regarder ensemble où en est votre site sur ces deux fronts, SEO et GEO.',
          primary: { label: 'Demander un diagnostic', href: '/#contact' },
        }}
      >
        <p className="lead">
          Une partie de vos clients ne tape plus «&nbsp;plombier Baie-Mahault&nbsp;» dans Google. Ils demandent à
          ChatGPT, à Perplexity ou à Gemini de leur trouver un plombier à Baie-Mahault — et l&rsquo;IA répond avec
          un nom, parfois deux, choisis dans ses sources. Ce nouveau canal a un nom&nbsp;: le <strong>GEO</strong>
          (Generative Engine Optimization), l&rsquo;art d&rsquo;être visible non plus seulement dans une liste de
          liens bleus, mais dans la réponse elle-même que formule une intelligence artificielle.
        </p>

        <h2>Le SEO ne disparaît pas — il devient le socle du GEO</h2>
        <p>
          Première chose à comprendre&nbsp;: le GEO ne remplace pas le SEO, il s&rsquo;appuie dessus. Les IA
          génératives ne fabriquent pas leurs réponses depuis le vide&nbsp;: elles s&rsquo;appuient largement sur
          des pages web qu&rsquo;elles ont explorées et indexées — le même travail que fait Google depuis vingt ans.
          Un site lent, mal structuré ou invisible pour les robots d&rsquo;exploration a aussi peu de chances d&rsquo;être
          cité par une IA que d&rsquo;être bien classé sur Google. Les fondamentaux (vitesse, structure claire des
          titres, contenu réellement utile, fiche d&rsquo;établissement à jour) restent donc la base — rien de tout
          cela ne devient optionnel.
        </p>

        <h2>Ce qui change concrètement avec les moteurs génératifs</h2>
        <p>
          Ce qui est nouveau, c&rsquo;est la façon dont le contenu est ensuite <strong>choisi et reformulé</strong>.
          Une IA générative ne se contente pas de classer des pages&nbsp;: elle synthétise plusieurs sources pour
          produire une réponse unique, et ne cite explicitement qu&rsquo;une poignée d&rsquo;entre elles. Les critères
          qui font pencher la balance ne sont pas exactement les mêmes qu&rsquo;en SEO pur&nbsp;:
        </p>
        <ArticleCallout accent={ACCENT}>
          <ul className="space-y-2.5 m-0 list-none p-0" style={{ color: 'var(--syb-stone)' }}>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span><strong style={{ color: 'var(--syb-ink)' }}>Des chiffres et statistiques précis</strong> — une IA reprend plus volontiers une donnée chiffrée qu&rsquo;une affirmation vague.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span><strong style={{ color: 'var(--syb-ink)' }}>Des sources citées explicitement</strong> — un contenu qui renvoie lui-même vers des références fiables inspire davantage confiance.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span><strong style={{ color: 'var(--syb-ink)' }}>Un contenu structuré pour être extrait</strong> — titres clairs, listes, réponses directes aux questions plutôt que de longs paragraphes évasifs.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span><strong style={{ color: 'var(--syb-ink)' }}>Une actualité visible</strong> — une date de mise à jour récente et un contenu qui reflète l&rsquo;état actuel d&rsquo;une réglementation ou d&rsquo;un marché plutôt qu&rsquo;une situation qui a changé depuis.</span></li>
            <li className="flex items-start gap-2.5"><span className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-2" style={{ background: ACCENT }} /><span><strong style={{ color: 'var(--syb-ink)' }}>Un point de vue net</strong> — une IA a plus de mal à synthétiser un contenu qui se contente d&rsquo;énumérer des généralités sans jamais trancher.</span></li>
          </ul>
        </ArticleCallout>

        <h2>Le rôle discret mais réel des données structurées</h2>
        <p>
          Un levier technique mérite d&rsquo;être mentionné&nbsp;: les <strong>données structurées</strong> (schema.org,
          au format JSON-LD) que les sites intègrent dans leur code. Elles ne changent rien à ce qu&rsquo;un visiteur
          voit à l&rsquo;écran, mais elles disent explicitement aux machines — moteurs de recherche comme IA génératives
          — ce qu&rsquo;est une page&nbsp;: une entreprise locale avec ses horaires, un article avec son auteur et sa
          date, une question avec sa réponse. C&rsquo;est un langage que les algorithmes comprennent nativement, sans
          avoir à «&nbsp;deviner&nbsp;» à partir du texte brut.
        </p>

        <h2>Ce qu&rsquo;on peut faire dès maintenant, sans tout reconstruire</h2>
        <p>
          La bonne nouvelle, c&rsquo;est qu&rsquo;aucune de ces pratiques n&rsquo;exige de repartir de zéro. Il s&rsquo;agit
          surtout de discipline&nbsp;: citer ses sources plutôt que d&rsquo;affirmer sans preuve, structurer un contenu
          existant avec des titres et des listes plutôt que des blocs de texte compacts, tenir ses pages à jour plutôt
          que de les publier une fois pour toutes. C&rsquo;est exactement la logique qu&rsquo;on applique sur nos propres
          projets&nbsp;: un contenu qui répond d&rsquo;abord à une vraie question, avant de penser à l&rsquo;algorithme qui
          le lira.
        </p>

        <h2>Questions fréquentes</h2>
        <h3>Le GEO va-t-il remplacer le SEO ?</h3>
        <p>
          Non. Le GEO se construit sur les fondations du SEO&nbsp;: un site rapide, bien structuré et sémantiquement
          clair reste indispensable. Le GEO ajoute des critères supplémentaires (sources citées, contenu structuré
          pour être repris tel quel, autorité perçue) plutôt qu&rsquo;il ne remplace les anciens. Un site avec un
          mauvais SEO n&rsquo;a aucune chance en GEO non plus.
        </p>
        <h3>Comment savoir si mon site est cité par ChatGPT ou une autre IA générative ?</h3>
        <p>
          Le plus simple reste de poser à l&rsquo;IA les questions que poserait un client réel de votre secteur et de
          votre zone («&nbsp;meilleur [métier] à [ville]&nbsp;», «&nbsp;comment choisir un [service] en
          Guadeloupe&nbsp;») et de regarder si votre entreprise, votre site ou votre contenu apparaît dans la réponse
          ou les sources citées. C&rsquo;est artisanal, mais c&rsquo;est aujourd&rsquo;hui la méthode la plus fiable,
          faute d&rsquo;outil de mesure standardisé et gratuit.
        </p>
        <h3>Une petite entreprise guadeloupéenne a-t-elle une chance face aux grandes marques sur le GEO ?</h3>
        <p>
          Oui, et même plus qu&rsquo;en SEO classique sur certains points&nbsp;: les IA génératives valorisent la
          précision et la pertinence locale au moins autant que la notoriété globale. Un contenu qui répond avec
          exactitude à une question très locale (un quartier, une commune, une réglementation guadeloupéenne) a de
          bonnes chances d&rsquo;être repris, là où un grand site généraliste reste vague.
        </p>

        <h2>En résumé</h2>
        <p>
          Le GEO n&rsquo;est pas une mode à ignorer ni une révolution qui rend le SEO caduc&nbsp;: c&rsquo;est une couche
          supplémentaire qui récompense les mêmes qualités qu&rsquo;on demande à un bon contenu depuis toujours —
          précision, sources, clarté, mise à jour — en y ajoutant une exigence de structure pensée pour être lue par
          une machine autant que par un humain. Les entreprises qui commencent tôt à écrire dans cet esprit prennent
          une avance qui sera plus difficile à rattraper une fois le réflexe généralisé.
        </p>
      </ArticleShell>
    </>
  )
}

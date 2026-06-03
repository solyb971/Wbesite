# Portfolio / Case Studies - Best Practices

## Overview
A portfolio section showcases your completed projects and demonstrates your capabilities to potential clients. For maximum impact, follow these guidelines.

---

## 1. Structure of a Case Study

Each case study should include:

### Essential Elements
- **Client Name** (with permission) or anonymized industry reference
- **Project Type**: Site Vitrine, E-commerce, Application Web
- **Industry**: Restaurant, Salon, Commerce, Services, etc.
- **Challenge**: What problem did the client face?
- **Solution**: How did you solve it?
- **Results**: Measurable outcomes (traffic increase, sales, leads)
- **Testimonial**: Quote from the client
- **Screenshots**: Before/After or key pages

### Optional Elements
- Timeline: How long the project took
- Technologies used: Next.js, Shopify, WordPress, etc.
- Budget range: To help prospects self-qualify
- Link to live site (if client agrees)

---

## 2. Recommended Data Structure

```typescript
// src/types/portfolio.ts
interface CaseStudy {
  id: string
  slug: string
  title: string
  client: {
    name: string
    logo?: string
    industry: string
    location: string
  }
  project: {
    type: 'vitrine' | 'ecommerce' | 'webapp' | 'custom'
    duration: string // "2 semaines", "1 mois"
    year: number
  }
  challenge: string
  solution: string
  results: {
    metric: string
    value: string
    icon?: string
  }[]
  testimonial?: {
    text: string
    author: string
    role: string
  }
  images: {
    thumbnail: string
    hero: string
    gallery: string[]
  }
  technologies: string[]
  liveUrl?: string
  featured: boolean
}
```

---

## 3. Image Guidelines

### Sizes
- **Thumbnail**: 400x300px (card preview)
- **Hero**: 1200x800px (case study header)
- **Gallery**: 800x600px (detail shots)

### Best Practices
- Use real screenshots, not mockups when possible
- Show mobile AND desktop versions
- Blur or redact sensitive client data
- Optimize images (WebP format, compressed)
- Use consistent aspect ratios

### Tools
- [CleanShot](https://cleanshot.com/) for screenshots
- [Figma](https://figma.com) for mockup presentations
- [Squoosh](https://squoosh.app/) for image optimization

---

## 4. Collecting Case Study Content

### After Project Completion Checklist
1. [ ] Request permission to feature the project
2. [ ] Take screenshots of key pages
3. [ ] Document the challenge and solution
4. [ ] Ask for a written testimonial
5. [ ] Request Google review link
6. [ ] Get analytics data after 30 days

### Email Template for Requesting Content
```
Subject: Votre avis sur notre collaboration

Bonjour [Prénom],

Maintenant que votre site est en ligne depuis quelques semaines, j'aimerais
avoir votre retour sur notre collaboration.

Seriez-vous d'accord pour :
1. Partager un court témoignage (2-3 phrases)
2. Me permettre de présenter votre projet sur mon portfolio

En échange, je vous offre [1 mois d'hébergement gratuit / une formation supplémentaire].

Merci !
```

---

## 5. SEO for Case Studies

Each case study page should have:

```typescript
// Dynamic metadata
export async function generateMetadata({ params }): Promise<Metadata> {
  const caseStudy = await getCaseStudy(params.slug)

  return {
    title: `${caseStudy.title} | Portfolio SolYB`,
    description: `Création ${caseStudy.project.type} pour ${caseStudy.client.industry} en Guadeloupe. ${caseStudy.challenge.slice(0, 100)}...`,
    openGraph: {
      images: [caseStudy.images.hero],
    },
  }
}
```

---

## 6. Implementation Steps

### Phase 1: Setup (Week 1)
1. Create `/portfolio` page with grid of projects
2. Create `/portfolio/[slug]` dynamic pages
3. Design case study card component
4. Design full case study page layout

### Phase 2: Content (Week 2-3)
1. Gather content from 3-5 best projects
2. Take/collect screenshots
3. Write challenge/solution narratives
4. Collect testimonials

### Phase 3: Polish (Week 4)
1. Add filtering by project type
2. Add animations/transitions
3. Integrate with Testimonials section
4. Add "Start Your Project" CTA on each page

---

## 7. Component Structure

```
src/
├── app/
│   └── (public)/
│       └── portfolio/
│           ├── page.tsx          # Portfolio grid
│           └── [slug]/
│               └── page.tsx      # Case study detail
├── components/
│   └── site/
│       ├── PortfolioGrid.tsx     # Grid layout
│       ├── PortfolioCard.tsx     # Individual card
│       ├── CaseStudyHero.tsx     # Detail page hero
│       └── CaseStudyResults.tsx  # Metrics display
└── data/
    └── portfolio.ts              # Case study data
```

---

## 8. Quick Start Template

```typescript
// src/data/portfolio.ts
export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    slug: "salon-karibea",
    title: "Site Vitrine pour Salon de Coiffure",
    client: {
      name: "Salon Karibéa",
      industry: "Beauté & Bien-être",
      location: "Pointe-à-Pitre",
    },
    project: {
      type: "vitrine",
      duration: "2 semaines",
      year: 2024,
    },
    challenge: "Le salon n'avait aucune présence en ligne et perdait des clients face à la concurrence...",
    solution: "Création d'un site moderne avec système de réservation en ligne intégré...",
    results: [
      { metric: "Réservations en ligne", value: "+40%", icon: "📈" },
      { metric: "Temps de réponse", value: "-80%", icon: "⏱️" },
      { metric: "Nouveaux clients", value: "+25/mois", icon: "👥" },
    ],
    testimonial: {
      text: "Mon site est magnifique et mes clientes peuvent maintenant prendre RDV en ligne!",
      author: "Marie-Claire D.",
      role: "Gérante",
    },
    images: {
      thumbnail: "/portfolio/karibea-thumb.jpg",
      hero: "/portfolio/karibea-hero.jpg",
      gallery: ["/portfolio/karibea-1.jpg", "/portfolio/karibea-2.jpg"],
    },
    technologies: ["Next.js", "Tailwind CSS", "Cal.com"],
    liveUrl: "https://salon-karibea.gp",
    featured: true,
  },
  // Add more case studies...
]
```

---

## 9. Metrics to Track

After implementing portfolio:
- Time on portfolio pages
- Click-through to contact form
- Most viewed case studies
- Conversion rate from portfolio visitors

---

## Resources

- [Case Study Template - Notion](https://notion.so)
- [Portfolio Examples - Awwwards](https://awwwards.com/websites/portfolio/)
- [Storytelling for Case Studies](https://copyblogger.com/case-study/)

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://solyb.fr/sitemap.xml

# Bloquer les crawlers inutiles
User-agent: AhrefsBot
Disallow: /

User-agent: SemrushBot
Disallow: /

User-agent: DotBot
Disallow: /
`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}

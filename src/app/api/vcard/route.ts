export async function GET() {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Bouhassoun;Yacine;;;',
    'FN:Yacine Bouhassoun',
    'ORG:SolYB',
    'TITLE:Fondateur',
    'TEL;TYPE=CELL,VOICE:+590690426792',
    'EMAIL;TYPE=INTERNET:contact@solyb.fr',
    'URL:https://solyb.fr',
    'END:VCARD',
  ].join('\r\n')

  return new Response(vcard, {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="yacine-bouhassoun.vcf"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}

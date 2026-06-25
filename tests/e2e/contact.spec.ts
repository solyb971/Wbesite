import { test, expect } from '@playwright/test'

/**
 * Parcours de contact (section #contact de la home, composant Contact.tsx).
 * Serveur en mode mock → la soumission renvoie un succès sans écrire en base.
 */

// Remplit les champs requis du formulaire de contact.
async function fillContactForm(page: import('@playwright/test').Page) {
  await page.fill('input[name="name"]', 'Test E2E Playwright')
  await page.fill('input[name="email"]', 'e2e@example.com')
  await page.fill('input[name="phone"]', '0690123456')
  await page.selectOption('select[name="project_type"]', 'vitrine')
  await page.fill('textarea[name="description"]', 'Demande de test automatisé du parcours de contact.')
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  // Accepter les cookies si le bandeau est présent (évite qu'il gêne le clic).
  const accept = page.getByRole('button', { name: 'Accepter' })
  if (await accept.isVisible().catch(() => false)) {
    await accept.click()
  }
  await page.locator('#contact').scrollIntoViewIfNeeded()
})

test('le formulaire de contact se soumet avec succès (consentement coché)', async ({ page }) => {
  await fillContactForm(page)
  await page.check('input[name="consent"]')
  await page.getByRole('button', { name: 'Envoyer ma demande' }).click()

  // Le composant affiche un état de succès avant de rediriger vers /merci.
  await expect(page.getByText('Demande envoyée !')).toBeVisible({ timeout: 10_000 })
})

test('la case de consentement est obligatoire', async ({ page }) => {
  await fillContactForm(page)
  // Consentement NON coché → la soumission native doit être bloquée.
  const consent = page.locator('input[name="consent"]')
  await expect(consent).toHaveAttribute('required', '')

  await page.getByRole('button', { name: 'Envoyer ma demande' }).click()

  // Aucun état de succès ne doit apparaître.
  await expect(page.getByText('Demande envoyée !')).toHaveCount(0)
  await expect(consent).not.toBeChecked()
})

test('le honeypot anti-spam est présent et hors tabulation', async ({ page }) => {
  const honeypot = page.locator('input[name="company_website"]')
  await expect(honeypot).toHaveCount(1)
  // Champ-piège : exclu de la tabulation et enveloppé dans un conteneur aria-hidden.
  await expect(honeypot).toHaveAttribute('tabindex', '-1')
  await expect(page.locator('[aria-hidden="true"] input[name="company_website"]')).toHaveCount(1)
})

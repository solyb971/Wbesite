import { defineConfig, devices } from '@playwright/test'

/**
 * Tests e2e du parcours de contact.
 *
 * Lance un serveur Next en mode MOCK (NEXT_PUBLIC_USE_MOCK=true) pour que la
 * soumission du formulaire renvoie un succès sans écrire dans Supabase/Brevo —
 * le test est donc reproductible et ne pollue aucune donnée.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:3100',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'next dev -p 3100',
    url: 'http://localhost:3100',
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    env: {
      NEXT_PUBLIC_USE_MOCK: 'true',
    },
  },
})

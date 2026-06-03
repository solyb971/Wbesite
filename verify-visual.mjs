import { chromium } from 'C:/Users/yassb/AppData/Roaming/npm/node_modules/playwright/index.js';

const CHROME = 'C:\\Users\\yassb\\AppData\\Local\\ms-playwright\\chromium-1200\\chrome-win64\\chrome.exe';

const browser = await chromium.launch({
  headless: true,
  executablePath: CHROME,
});
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });

// Clear sessionStorage to see splash
await page.addInitScript(() => sessionStorage.clear());

// Navigate fresh
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

// === 1. Hero + constellations ===
await page.waitForTimeout(800);
await page.screenshot({ path: 'ss_hero.png' });
console.log('✅ ss_hero.png');

// === 2. Tilt test on service card ===
await page.evaluate(() => document.getElementById('services')?.scrollIntoView());
await page.waitForTimeout(800);
const card = page.locator('.tilt-card').first();
const box = await card.boundingBox();
if (box) {
  // hover corner (top-left) pour max rotation
  await page.mouse.move(box.x + 30, box.y + 30);
  await page.waitForTimeout(200);
}
await page.screenshot({ path: 'ss_tilt.png' });
const tiltTransform = await page.evaluate(() => document.querySelector('.tilt-card')?.style.transform ?? 'none');
console.log('✅ ss_tilt.png — transform:', tiltTransform.slice(0, 80));

// === 3. Splash screen ===
await page.evaluate(() => sessionStorage.removeItem('splash_done'));
await page.goto('http://localhost:3000');
await page.waitForTimeout(400); // Phase visible (200-1400ms)
await page.screenshot({ path: 'ss_splash.png' });
console.log('✅ ss_splash.png');

// === 4. Pricing cards ===
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.evaluate(() => document.getElementById('tarifs')?.scrollIntoView());
await page.waitForTimeout(800);
await page.screenshot({ path: 'ss_pricing.png' });
console.log('✅ ss_pricing.png');

// === 5. About ===
await page.evaluate(() => document.getElementById('apropos')?.scrollIntoView());
await page.waitForTimeout(800);
await page.screenshot({ path: 'ss_about.png' });
console.log('✅ ss_about.png');

// === 6. Mobile hero ===
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
await page.screenshot({ path: 'ss_mobile.png' });
console.log('✅ ss_mobile.png');

// === 7. Full page ===
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1000);
await page.screenshot({ path: 'ss_fullpage.png', fullPage: true });
console.log('✅ ss_fullpage.png');

// Console errors check
const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
console.log('Console errors:', errors.length);

await browser.close();
console.log('DONE');

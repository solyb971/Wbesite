const { chromium } = require('C:/Users/yassb/AppData/Roaming/npm/node_modules/playwright');

const CHROME = 'C:\\Users\\yassb\\AppData\\Local\\ms-playwright\\chromium-1200\\chrome-win64\\chrome.exe';

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: CHROME });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  // === 1. Hero + constellations ===
  await page.addInitScript(() => sessionStorage.clear());
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'ss_hero.png' });
  console.log('✅ ss_hero.png');

  // === 2. Tilt 3D sur card service ===
  await page.evaluate(() => document.getElementById('services')?.scrollIntoView());
  await page.waitForTimeout(800);
  const box = await page.locator('.tilt-card').first().boundingBox();
  if (box) {
    await page.mouse.move(box.x + 25, box.y + 25); // coin haut-gauche → rotation max
    await page.waitForTimeout(250);
  }
  await page.screenshot({ path: 'ss_tilt.png' });
  const t = await page.evaluate(() => document.querySelector('.tilt-card')?.style.transform ?? 'none');
  console.log('✅ ss_tilt.png — transform:', t.slice(0, 90));

  // === 3. Splash avec logo ===
  await page.evaluate(() => sessionStorage.removeItem('splash_done'));
  await page.goto('http://localhost:3000', { waitUntil: 'commit' });
  await page.waitForTimeout(350); // phase visible
  await page.screenshot({ path: 'ss_splash.png' });
  console.log('✅ ss_splash.png');

  // === 4. Pricing + card elevation ===
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.getElementById('tarifs')?.scrollIntoView());
  await page.waitForTimeout(800);
  const pricingBox = await page.locator('.card-elevation').first().boundingBox();
  if (pricingBox) await page.mouse.move(pricingBox.x + pricingBox.width / 2, pricingBox.y + pricingBox.height / 2);
  await page.waitForTimeout(200);
  await page.screenshot({ path: 'ss_pricing.png' });
  console.log('✅ ss_pricing.png');

  // === 5. About section ===
  await page.evaluate(() => document.getElementById('apropos')?.scrollIntoView());
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'ss_about.png' });
  console.log('✅ ss_about.png');

  // === 6. Mobile ===
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'ss_mobile.png' });
  console.log('✅ ss_mobile.png');

  // Console errors
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  console.log('Errors:', errors.length);

  await browser.close();
  console.log('DONE');
})();

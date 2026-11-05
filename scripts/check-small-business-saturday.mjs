import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';

// Use an installed Playwright package; this optional browser check does not
// add a browser download to the marketing site's production dependencies.
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE ?? 'playwright');
const baseUrl = process.env.CAMPAIGN_BASE_URL ?? 'http://127.0.0.1:4182';
const screenshotDir = '.impeccable/review';
await mkdir(screenshotDir, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
});
const scenarios = [
  { name: 'upcoming', date: '2026-11-27T18:00:00-05:00', text: 'The offer opens Saturday' },
  { name: 'active', date: '2026-11-28T00:00:00-05:00', text: 'The offer is open' },
  { name: 'last-minute', date: '2026-11-30T23:59:59-05:00', text: 'The offer is open' },
  { name: 'ended', date: '2026-12-01T00:00:00-05:00', text: 'This offer ended' },
];

try {
  for (const scenario of scenarios) {
    for (const source of ['macon-linkedin', 'company-linkedin', 'company-facebook']) {
      for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
        const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', (error) => errors.push(error.message));
        await page.clock.setFixedTime(new Date(scenario.date));
        await page.goto(`${baseUrl}/small-business-saturday?src=${source}`);
        await page.getByRole('status').filter({ hasText: scenario.text }).waitFor();
        if (await page.getByRole('button', { name: 'Essential only', exact: true }).isVisible()) {
          await page.getByRole('button', { name: 'Essential only', exact: true }).click();
        }
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${scenario.name} overflows at ${viewport.width}`);
        for (const plan of ['starter', 'growth', 'scale']) {
          const link = page.locator(`main a[href*="plan=${plan}"]`);
          const href = new URL(await link.getAttribute('href'));
          assert.equal(href.searchParams.get('src'), source);
          assert.equal(href.searchParams.get('billing'), 'monthly');
          assert.equal(href.searchParams.get('plan'), plan);
        }
        if (scenario.name === 'ended') {
          assert.equal(await page.getByText('$99.50', { exact: true }).count(), 0);
          assert.equal(await page.getByRole('link', { name: 'Choose Growth', exact: true }).count(), 0);
        }
        assert.deepEqual(errors, []);
        if (scenario.name === 'active' && source === 'macon-linkedin') {
          await page.evaluate(() => document.fonts.ready);
          await page.screenshot({ path: `${screenshotDir}/${viewport.width === 390 ? 'mobile' : 'desktop'}.png`, fullPage: true });
        }
        await context.close();
      }
    }
  }
  console.log('24 browser scenarios passed: four date states × three post sources × desktop/mobile; all selected-plan links, no horizontal overflow, no page errors.');
} finally {
  await browser.close();
}

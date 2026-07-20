import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('#heroSec');

async function report(label) {
  const rect = await page.evaluate(() => {
    const h2s = Array.from(document.querySelectorAll('#heroSec h2'));
    const h2 = h2s.find(e => e.textContent.includes('Reserva'));
    const cardWrap = h2.closest('div').parentElement.parentElement; // approx
    return {
      h2Top: h2.getBoundingClientRect().top,
      heroSecHeight: document.getElementById('heroSec').getBoundingClientRect().height,
      docHeight: document.documentElement.scrollHeight,
      windowInnerHeight: window.innerHeight,
    };
  });
  console.log(label, JSON.stringify(rect));
}

await report('before click');
const llegada = page.locator('#heroSec >> text=Llegada >> visible=true').first();
await llegada.click();
await page.waitForTimeout(300);
await report('after click (calendar open)');
await browser.close();

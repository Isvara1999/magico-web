import { chromium } from 'playwright';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1366, height: 700 } });
const page = await ctx.newPage();
await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('#heroSec');

async function report(label) {
  const rect = await page.evaluate(() => {
    const h2s = Array.from(document.querySelectorAll('#heroSec h2'));
    const h2 = h2s.find(e => e.textContent.includes('Reserva'));
    const tag = document.querySelector('#heroSec p');
    return {
      h2: h2 ? h2.getBoundingClientRect().top : null,
      scrollY: window.scrollY,
    };
  });
  console.log(label, JSON.stringify(rect));
}

await report('t=0 (dom loaded)');
await page.waitForTimeout(300);
await report('t=300ms (no click)');
await page.waitForTimeout(500);
await report('t=800ms (no click)');
await page.waitForTimeout(700);
await report('t=1500ms (no click, past belowFoldReady timer)');

// Now click without any additional wait baseline established
const llegada = page.locator('#heroSec >> text=Llegada >> visible=true').first();
await llegada.click();
await report('t=click+0ms');
await page.waitForTimeout(50);
await report('t=click+50ms');
await page.waitForTimeout(150);
await report('t=click+200ms');
await page.waitForTimeout(200);
await report('t=click+400ms');

await browser.close();

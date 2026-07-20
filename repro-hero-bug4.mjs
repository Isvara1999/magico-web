import { chromium } from 'playwright';
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1366, height: 700 } });
const page = await ctx.newPage();
await page.goto('http://localhost:5173/', { waitUntil: 'domcontentloaded' });
await page.waitForSelector('#heroSec');

async function report(label) {
  const data = await page.evaluate(() => {
    const heroSec = document.getElementById('heroSec');
    const row = heroSec.querySelector('.hidden.lg\\:flex');
    const textCol = row.children[0];
    const cardCol = row.children[1];
    const cardCardDiv = cardCol.firstElementChild; // the visual card with borderRadius 22
    const cs = getComputedStyle(row);
    return {
      heroSecRect: heroSec.getBoundingClientRect().toJSON(),
      rowRect: row.getBoundingClientRect().toJSON(),
      rowComputedAlignItems: cs.alignItems,
      rowComputedHeight: cs.height,
      rowComputedMinHeight: cs.minHeight,
      textColRect: textCol.getBoundingClientRect().toJSON(),
      cardColRect: cardCol.getBoundingClientRect().toJSON(),
      cardCardRect: cardCardDiv.getBoundingClientRect().toJSON(),
      bodyScrollHeight: document.body.scrollHeight,
    };
  });
  console.log(label, JSON.stringify(data, null, 0));
}

await report('BEFORE');
const llegada = page.locator('#heroSec >> text=Llegada >> visible=true').first();
await llegada.click();
await page.waitForTimeout(300);
await report('AFTER');

await browser.close();

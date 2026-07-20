import { chromium } from 'playwright';

const shots = 'C:\\Users\\Usuario\\AppData\\Local\\Temp\\claude\\c--Users-Usuario-OneDrive-Documentos-Catalisis-Magico-Web-magico-ensueno\\1568a042-f0cb-433b-ae2f-6a44cfd4d224\\scratchpad';

const browser = await chromium.launch();

async function run(name, viewport) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForSelector('#heroSec');
  await page.waitForTimeout(300);

  const hero = page.locator('#heroSec');
  await hero.screenshot({ path: `${shots}/${name}-hero-before.png` });
  const before = await hero.boundingBox();
  console.log(name, 'hero bbox before:', JSON.stringify(before));

  const scrollBefore = await page.evaluate(() => window.scrollY);
  console.log(name, 'scrollY before:', scrollBefore);

  const llegada = page.locator('#heroSec >> text=Llegada >> visible=true').first();
  await llegada.waitFor({ state: 'visible', timeout: 10000 });
  await llegada.click();
  await page.waitForTimeout(400);

  const scrollAfter = await page.evaluate(() => window.scrollY);
  console.log(name, 'scrollY after:', scrollAfter);

  const after = await hero.boundingBox();
  console.log(name, 'hero bbox after:', JSON.stringify(after));

  await hero.screenshot({ path: `${shots}/${name}-hero-after.png` });
  await page.screenshot({ path: `${shots}/${name}-viewport-after.png` });
  await page.screenshot({ path: `${shots}/${name}-fullpage-after.png`, fullPage: true });

  await ctx.close();
}

await run('mobile-short', { width: 375, height: 667 });
await run('desktop-short', { width: 1366, height: 700 });

await browser.close();

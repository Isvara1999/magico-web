// crawl-and-scrape.js
// Crawls experienciamagico.com and extracts clean text content
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://www.experienciamagico.com';
const DELAY_MS = 2000;
const MAX_DEPTH = 2;
const OUTPUT_DIR = path.join(__dirname, '..', 'outputs');

// Known routes from the SPA (React Router)
const KNOWN_ROUTES = [
  '/achala-viva',
  '/familion',
  '/escuelas',
  '/gondorbows',
];

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function cleanText(text) {
  return text
    .replace(/\s+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function isInternalLink(href, base) {
  if (!href) return false;
  if (href.startsWith('#')) return false;
  if (href.match(/\.(pdf|png|jpg|jpeg|webp|svg|mp3|mp4|zip)$/i)) return false;
  try {
    const url = new URL(href, base);
    return url.hostname === new URL(base).hostname && !url.hash;
  } catch {
    return false;
  }
}

async function crawlPage(page, url, depth, visited, queue) {
  if (visited.has(url) || depth > MAX_DEPTH) return;
  visited.add(url);

  console.log(`[CRAWL depth=${depth}] ${url}`);
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(3000); // wait for React to hydrate

    // Collect internal links
    if (depth < MAX_DEPTH) {
      const links = await page.$$eval('a[href]', (anchors) =>
        anchors.map(a => a.getAttribute('href'))
      );
      for (const href of links) {
        if (!isInternalLink(href, BASE_URL)) continue;
        const full = new URL(href, BASE_URL).href.split('#')[0].replace(/\/$/, '') || BASE_URL;
        if (!visited.has(full) && !queue.includes(full)) {
          queue.push(full);
        }
      }
    }
  } catch (err) {
    console.error(`[ERROR] ${url}: ${err.message}`);
  }
}

async function scrapePage(page, url) {
  console.log(`[SCRAPE] ${url}`);
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await sleep(3000);

    // Extract structured content
    const content = await page.evaluate(() => {
      // Remove noise elements
      ['script', 'style', 'noscript', 'nav', 'footer'].forEach(tag => {
        document.querySelectorAll(tag).forEach(el => el.remove());
      });

      const title = document.title || '';
      const metaDesc = document.querySelector('meta[name="description"]')?.content || '';

      // Extract headings and paragraphs in order
      const blocks = [];
      document.querySelectorAll('h1,h2,h3,h4,h5,p,li,td,th,blockquote').forEach(el => {
        const text = el.innerText?.trim();
        if (!text || text.length < 3) return;
        const tag = el.tagName.toLowerCase();
        if (tag === 'h1') blocks.push(`# ${text}`);
        else if (tag === 'h2') blocks.push(`## ${text}`);
        else if (tag === 'h3') blocks.push(`### ${text}`);
        else if (tag === 'h4') blocks.push(`#### ${text}`);
        else if (tag === 'li') blocks.push(`- ${text}`);
        else blocks.push(text);
      });

      return { title, metaDesc, blocks };
    });

    // Deduplicate consecutive identical lines
    const deduped = content.blocks.filter((b, i) =>
      i === 0 || b !== content.blocks[i - 1]
    );

    return {
      url,
      title: content.title,
      metaDesc: content.metaDesc,
      body: deduped.join('\n'),
    };
  } catch (err) {
    console.error(`[ERROR scraping] ${url}: ${err.message}`);
    return { url, error: err.message };
  }
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (compatible; MagicoScraper/1.0; research)'
  });
  const page = await context.newPage();

  // --- PHASE 1: CRAWL ---
  console.log('\n=== FASE 1: CRAWL ===\n');
  const visited = new Set();
  const queue = [BASE_URL];

  // Seed with known SPA routes
  for (const route of KNOWN_ROUTES) {
    const full = BASE_URL + route;
    if (!queue.includes(full)) queue.push(full);
  }

  const allUrls = new Set(queue);

  let i = 0;
  while (i < queue.length) {
    const url = queue[i++];
    await crawlPage(page, url, i <= KNOWN_ROUTES.length + 1 ? 1 : 2, visited, queue);
    queue.forEach(u => allUrls.add(u));
    if (i > 1) await sleep(DELAY_MS);
  }

  const urlList = [...allUrls].filter(u => u.startsWith(BASE_URL));
  console.log(`\n[CRAWL] ${urlList.length} URLs encontradas:\n${urlList.join('\n')}`);

  // Save URL list
  fs.writeFileSync(
    path.join(OUTPUT_DIR, 'urls_encontradas.txt'),
    urlList.join('\n'),
    'utf8'
  );

  // --- PHASE 2: SCRAPE ---
  console.log('\n=== FASE 2: SCRAPE ===\n');
  const results = [];

  for (const url of urlList) {
    const result = await scrapePage(page, url);
    results.push(result);
    await sleep(DELAY_MS);
  }

  await browser.close();

  // --- BUILD MARKDOWN ---
  let md = `# Contenido Web — Mágico Ensueño\n`;
  md += `> Extraído el ${new Date().toLocaleDateString('es-AR')} desde ${BASE_URL}\n\n`;
  md += `## URLs rastreadas\n\n`;
  md += urlList.map(u => `- ${u}`).join('\n') + '\n\n---\n\n';

  for (const r of results) {
    if (r.error) {
      md += `## ERROR: ${r.url}\n\n> ${r.error}\n\n---\n\n`;
      continue;
    }
    md += `## Página: ${r.url}\n\n`;
    if (r.title) md += `**Título:** ${r.title}\n\n`;
    if (r.metaDesc) md += `**Meta descripción:** ${r.metaDesc}\n\n`;
    md += `### Contenido\n\n${cleanText(r.body)}\n\n---\n\n`;
  }

  const mdPath = path.join(OUTPUT_DIR, 'contenido_web_magico.md');
  fs.writeFileSync(mdPath, md, 'utf8');
  console.log(`\n[OK] Contenido guardado en: ${mdPath}`);
  console.log(`[OK] URLs guardadas en: ${OUTPUT_DIR}/urls_encontradas.txt`);
}

main().catch(err => {
  console.error('[FATAL]', err);
  process.exit(1);
});

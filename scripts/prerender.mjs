// Post-build prerender: generates static HTML per route with correct meta tags,
// then uses Playwright to snapshot full rendered content (visible to AI crawlers).
// Run automatically via "postbuild" script after `vite build`.
import { readFileSync, writeFileSync, mkdirSync, existsSync, createReadStream, statSync } from 'fs';
import { join, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');

const ROUTES = [
  {
    path: '/',
    title: 'Mágico Ensueño — Eco‑Refugio & Glamping · Los Gigantes, Córdoba',
    description: 'Ecocentro en Sierras Grandes de Córdoba: retiros, co-living, glamping en domos geodésicos, voluntariados y cocina de autor. 20 años regenerando la montaña.',
    image: 'https://experienciamagico.com/uploads/img_6948.webp',
    canonical: 'https://experienciamagico.com/',
  },
  {
    path: '/familion',
    title: 'Familion — Retiro Familiar en la Montaña · Los Gigantes, Córdoba | Mágico Ensueño',
    description: 'Retiro familiar en Los Gigantes, Córdoba. 1 al 3 de Mayo. Adultos en red, niños en libertad, gastronomía de montaña y experiencias transformadoras.',
    image: 'https://experienciamagico.com/uploads/portada%20familion.webp',
    canonical: 'https://experienciamagico.com/familion',
  },
  {
    path: '/achala-viva',
    title: 'Achala Viva — Retiro de Naturaleza · Los Gigantes, Córdoba | Mágico Ensueño',
    description: 'Retiro de inmersión total en Los Gigantes, Córdoba. 9 y 10 de Mayo. Astroturismo, avistaje de aves y naturaleza guiada por biólogo. Solo 15 plazas.',
    image: 'https://experienciamagico.com/uploads/img_6948.webp',
    canonical: 'https://experienciamagico.com/achala-viva',
  },
  {
    path: '/escuelas',
    title: 'Aula Verde — Campamentos Educativos · Los Gigantes, Córdoba | Mágico Ensueño',
    description: 'Campamentos educativos en Los Gigantes, Córdoba. Talleres agroecológicos, aventura y naturaleza. Para escuelas, primaria y secundaria. Capacidad hasta 180 alumnos.',
    image: 'https://experienciamagico.com/uploads/Aula%20Verde/IMG-20251120-WA0149.jpg',
    canonical: 'https://experienciamagico.com/escuelas',
  },
  {
    path: '/gondorbows',
    title: 'Gondorbows — Retiro de Arquería Ancestral · Los Gigantes, Córdoba | Mágico Ensueño',
    description: 'Construí tu propio arco en 3 días de inmersión en Los Gigantes, Córdoba. Taller de arquería tradicional con Gondor Bows. Todo incluido. Sin experiencia previa necesaria.',
    image: 'https://experienciamagico.com/uploads/arcos-fuego.jpg',
    canonical: 'https://experienciamagico.com/gondorbows',
  },
  {
    path: '/terminos-y-condiciones',
    title: 'Términos y Condiciones — Mágico Ensueño',
    description: 'Términos y condiciones de uso, contratación y cancelación de Mágico Ensueño. Información sobre medios de pago, políticas de reserva y derechos del consumidor.',
    image: 'https://experienciamagico.com/uploads/img_6948.webp',
    canonical: 'https://experienciamagico.com/terminos-y-condiciones',
  },
  {
    path: '/estadia',
    title: 'Estadías & Glamping — Reset Vital · Los Gigantes, Córdoba | Mágico Ensueño',
    description: 'Glamping y retiro autoguiado en las Sierras de Córdoba. Domos geodésicos, habitaciones y camping. Desde $40.000/noche (ropa blanca + Reset Vital). Pensión completa Desde $95.000. 20% dto. lun–jue.',
    image: 'https://experienciamagico.com/uploads/campoentero.webp',
    canonical: 'https://experienciamagico.com/estadia',
  },
  {
    path: '/politica-de-privacidad',
    title: 'Política de Privacidad — Mágico Ensueño',
    description: 'Política de privacidad y protección de datos personales de Mágico Ensueño conforme a la Ley 25.326. Información sobre recopilación, uso y derechos sobre tus datos.',
    image: 'https://experienciamagico.com/uploads/img_6948.webp',
    canonical: 'https://experienciamagico.com/politica-de-privacidad',
  },
  {
    path: '/el-vuelo-del-condor',
    title: 'El Vuelo del Cóndor — Un viaje iniciático en Perú | Mágico Ensueño',
    description: '7 días para elevar tu conciencia, expandir tu visión y reconectar con tu propósito en el Valle Sagrado de los Incas, Perú. Del 22 al 29 de Julio.',
    image: 'https://experienciamagico.com/uploads/temazcal.webp',
    canonical: 'https://experienciamagico.com/el-vuelo-del-condor',
  },
  {
    path: '/propuesta/calma-magico',
    title: 'Calma Salvaje — Una propuesta de Mágico Ensueño para Calma Yoga',
    description: 'Retiro residencial de yoga en las Sierras Grandes de Córdoba. 3 días, hasta 30 personas. Mágico Ensueño + Calma Yoga.',
    image: 'https://experienciamagico.com/uploads/campoentero.webp',
    canonical: 'https://experienciamagico.com/propuesta/calma-magico',
  },
];

if (!existsSync(DIST)) {
  console.error('dist/ not found — run `vite build` first');
  process.exit(1);
}

// ─── Phase 1: Meta tag injection (fast, no browser needed) ───────────────────
console.log('\nPhase 1: Meta tag injection...');
const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

for (const route of ROUTES) {
  const seoBlock = [
    `  <meta property="og:title" content="${route.title}" />`,
    `  <meta property="og:description" content="${route.description}" />`,
    `  <meta property="og:image" content="${route.image}" />`,
    `  <meta property="og:image:width" content="1200" />`,
    `  <meta property="og:image:height" content="630" />`,
    `  <meta property="og:url" content="${route.canonical}" />`,
    `  <meta property="og:type" content="website" />`,
    `  <meta property="og:locale" content="es_AR" />`,
    `  <meta name="twitter:card" content="summary_large_image" />`,
    `  <meta name="twitter:title" content="${route.title}" />`,
    `  <meta name="twitter:description" content="${route.description}" />`,
    `  <meta name="twitter:image" content="${route.image}" />`,
    `  <link rel="canonical" href="${route.canonical}" />`,
  ].join('\n');

  const html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${route.description}" />`)
    .replace('</head>', `${seoBlock}\n</head>`);

  if (route.path === '/') {
    writeFileSync(join(DIST, 'index.html'), html);
  } else {
    const dir = join(DIST, route.path.slice(1));
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
  }

  console.log(`  ✓ meta: ${route.path}`);
}

// ─── Phase 1b: Make Vite CSS non-render-blocking ─────────────────────────────
const CSS_BLOCKING = /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g;
const allHtmlFiles = [
  join(DIST, 'index.html'),
  ...ROUTES.filter(r => r.path !== '/').map(r => join(DIST, r.path.slice(1), 'index.html')),
];

console.log('\nMaking CSS non-blocking...');
for (const file of allHtmlFiles) {
  try {
    const html = readFileSync(file, 'utf-8');
    const patched = html.replace(CSS_BLOCKING, (_, href) =>
      `<link rel="preload" as="style" href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
      `<noscript><link rel="stylesheet" href="${href}"></noscript>`
    );
    if (patched !== html) {
      writeFileSync(file, patched);
      console.log(`  ✓ non-blocking CSS: ${file.replace(DIST, '').replace(/\\/g, '/') || '/index.html'}`);
    }
  } catch (e) {
    console.warn(`  ⚠ skipped ${file}: ${e.message}`);
  }
}

// ─── Phase 2: Playwright full-content snapshots ───────────────────────────────
// Captures fully rendered React HTML so AI crawlers see visible text content.
// Gracefully skipped if Playwright/Chromium is unavailable.
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
};

async function startStaticServer(port) {
  const server = createServer((req, res) => {
    let urlPath = req.url.split('?')[0].split('#')[0];
    if (urlPath === '' || urlPath === '/') urlPath = '/index.html';

    // Try exact file, then /path/index.html, then SPA fallback
    const candidates = [
      join(DIST, urlPath),
      join(DIST, urlPath, 'index.html'),
      join(DIST, 'index.html'),
    ];

    for (const candidate of candidates) {
      try {
        const stat = statSync(candidate);
        if (stat.isFile()) {
          const mime = MIME[extname(candidate).toLowerCase()] || 'application/octet-stream';
          res.writeHead(200, { 'Content-Type': mime });
          createReadStream(candidate).pipe(res);
          return;
        }
      } catch { /* try next */ }
    }

    res.writeHead(404);
    res.end('Not found');
  });

  return new Promise((resolve, reject) => {
    server.listen(port, '127.0.0.1', () => resolve(server));
    server.on('error', reject);
  });
}

async function runPlaywrightSnapshots() {
  const { chromium } = await import('playwright');
  const PORT = 4174;

  const server = await startStaticServer(PORT);
  console.log(`\nPhase 2: Playwright snapshots (port ${PORT})...`);

  const browser = await chromium.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const context = await browser.newContext({
    // Disable service workers so cached state doesn't interfere
    serviceWorkers: 'block',
    // Pretend to be a standard desktop browser
    userAgent: 'Mozilla/5.0 (compatible; Prerenderer/1.0)',
  });
  const page = await context.newPage();

  // Suppress console noise from the React app
  page.on('console', () => {});
  page.on('pageerror', () => {});

  for (const route of ROUTES) {
    try {
      // 'load' waits for DOMContentLoaded + stylesheets/images in <head>,
      // but does NOT wait for iframes (YouTube, etc.) to finish — avoids 30s hangs.
      await page.goto(`http://127.0.0.1:${PORT}${route.path}`, {
        waitUntil: 'load',
        timeout: 30_000,
      });

      // Wait for React to replace the loader with actual content
      await page.waitForFunction(() => {
        const root = document.getElementById('root');
        const loader = document.getElementById('loader-container');
        return root && !loader;
      }, { timeout: 12_000 }).catch(() => {
        // Loader may persist on slow pages — scroll anyway
      });

      // Scroll to trigger IntersectionObserver reveals and contentVisibility sections
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(800);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      const html = await page.content();

      const destPath = route.path === '/'
        ? join(DIST, 'index.html')
        : join(DIST, route.path.slice(1), 'index.html');

      writeFileSync(destPath, html);
      console.log(`  ✓ snapshot: ${route.path}`);
    } catch (e) {
      console.warn(`  ⚠ snapshot failed for ${route.path}: ${e.message.split('\n')[0]}`);
    }
  }

  await browser.close();
  server.close();
  console.log('\nPhase 2 complete.');
}

runPlaywrightSnapshots().catch(e => {
  console.warn(`\n⚠ Playwright snapshots skipped: ${e.message.split('\n')[0]}`);
  console.warn('  Phase 1 meta tag prerender still applies — social/search bots are covered.');
  console.warn('  To enable full snapshots, run: npx playwright install chromium\n');
});

// Post-build prerender: generates static HTML per route with correct meta tags.
// Crawlers and social bots see full OG/Twitter tags without executing JavaScript.
// Run automatically via "postbuild" script after `vite build`.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');

const ROUTES = [
  {
    path: '/',
    title: 'Mágico Ensueño — Eco‑Refugio & Glamping · Los Gigantes, Córdoba',
    description: 'Ecocentro en Sierras Grandes de Córdoba: retiros, co-living, glamping en domos y yurta, voluntariados y cocina de autor. 20 años regenerando la montaña.',
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
];

if (!existsSync(DIST)) {
  console.error('dist/ not found — run `vite build` first');
  process.exit(1);
}

const template = readFileSync(join(DIST, 'index.html'), 'utf-8');

for (const route of ROUTES) {
  const seoBlock = [
    `  <meta property="og:title" content="${route.title}" />`,
    `  <meta property="og:description" content="${route.description}" />`,
    `  <meta property="og:image" content="${route.image}" />`,
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

  console.log(`  ✓ ${route.path}`);
}

console.log(`\nPrerender complete — ${ROUTES.length} routes`);

// Make Vite's CSS non-render-blocking: preload + onload swap pattern
// Finds <link rel="stylesheet" crossorigin href="/assets/*.css"> and converts it
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
};

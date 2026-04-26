// Compresses large images in public/uploads/ using sharp.
// Writes optimized files to DEST_DIR (outside OneDrive to avoid lock issues).
// Run: node scripts/optimize-images.mjs
// After running, copy the output files back to public/uploads/.
import sharp from 'sharp';
import { readdirSync, statSync, writeFileSync, mkdirSync } from 'fs';
import { join, extname, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const UPLOADS = join(__dirname, '..', 'public', 'uploads');
const DEST_DIR = join(process.env.LOCALAPPDATA || process.env.HOME, 'Temp', 'magico-opt');
mkdirSync(DEST_DIR, { recursive: true });

// Resize rules: [maxWidth, quality] — images already smaller than maxWidth keep their size
const RULES = {
  '.webp': { maxWidth: 1920, quality: 78 },
  '.jpg':  { maxWidth: 1920, quality: 80 },
  '.jpeg': { maxWidth: 1920, quality: 80 },
  '.png':  { maxWidth: 1920, quality: 80 },
};

// Hero image gets extra aggressive treatment (it's the LCP element)
const HERO_TARGETS = [
  { file: 'img_6948.webp', maxWidth: 1440, quality: 72 },
];

async function optimise(filePath, maxWidth, quality, ext) {
  const original = statSync(filePath).size;
  const label = filePath.replace(/.*[/\\]/, '');

  try {
    let pipeline = sharp(filePath).resize({ width: maxWidth, withoutEnlargement: true });

    if (ext === '.webp') {
      pipeline = pipeline.webp({ quality });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality, mozjpeg: true });
    } else if (ext === '.png') {
      pipeline = pipeline.png({ quality, compressionLevel: 9 });
    }

    const buf = await pipeline.toBuffer();

    if (buf.length < original) {
      const destPath = join(DEST_DIR, basename(filePath));
      writeFileSync(destPath, buf);
      const saved = ((original - buf.length) / original * 100).toFixed(1);
      console.log(`  ✓ ${label}  ${(original/1024/1024).toFixed(2)}MB → ${(buf.length/1024/1024).toFixed(2)}MB (-${saved}%)  →  ${destPath}`);
    } else {
      console.log(`  — ${label} already optimal (${(original/1024).toFixed(0)}KB), skip`);
    }
  } catch (err) {
    console.error(`  ✗ ${label}: ${err.message}`);
  }
}

async function run() {
  console.log('Optimizing images in public/uploads/...\n');

  // Apply hero-specific rules first
  for (const { file, maxWidth, quality } of HERO_TARGETS) {
    const fp = join(UPLOADS, file);
    const ext = extname(file).toLowerCase();
    try { statSync(fp); } catch { continue; }
    await optimise(fp, maxWidth, quality, ext);
  }

  // Process all other large files (> 300KB)
  const heroFiles = new Set(HERO_TARGETS.map(h => h.file));
  const files = readdirSync(UPLOADS, { recursive: false });

  for (const name of files) {
    if (heroFiles.has(name)) continue;
    const fp = join(UPLOADS, name);
    try {
      if (!statSync(fp).isFile()) continue;
    } catch { continue; }

    const ext = extname(name).toLowerCase();
    const rule = RULES[ext];
    if (!rule) continue;

    const size = statSync(fp).size;
    if (size < 300 * 1024) continue; // skip files already < 300KB

    await optimise(fp, rule.maxWidth, rule.quality, ext);
  }

  console.log(`\nOptimized files written to: ${DEST_DIR}`);
  console.log('Copy them to public/uploads/ to replace the originals.');
  console.log('\nQuick copy command (PowerShell):');
  console.log(`  Copy-Item "${DEST_DIR}\\*" "public\\uploads\\" -Force`);
}

run();

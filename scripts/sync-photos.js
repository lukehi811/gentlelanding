#!/usr/bin/env node
/**
 * sync-photos.js
 * Run: node scripts/sync-photos.js
 *
 * Copies photos from ~/gentlelanding-photos/<property-folder>/
 * into public/images/<slug>/ and prints the updated images[] arrays
 * so you can paste them into lib/data.ts.
 *
 * Image filename conventions recognized (sorted in this priority order):
 *   exterior / front / outside / main → shown first
 *   living / lounge                    → living room
 *   kitchen / dining                   → kitchen/dining
 *   master / main bed / primbed        → primary bedroom
 *   bed / bedroom / secbed / thirdbed  → bedrooms
 *   bath / bathroom                    → bathrooms
 *   yard / patio / deck / outdoor      → outdoor
 *   hot tub / hottub / tub             → hot tub
 *   basement / game / theater          → entertainment
 *   everything else alphabetically
 */

const fs = require('fs');
const path = require('path');

// Source can be the sibling folder OR the one committed inside the project
const SOURCE_ROOT = fs.existsSync(path.join(require('os').homedir(), 'gentlelanding-photos'))
  ? path.join(require('os').homedir(), 'gentlelanding-photos')
  : path.join(__dirname, '..', 'gentlelanding-photos');
const DEST_ROOT  = path.join(__dirname, '..', 'public', 'images');

// Fuzzy mapping: folder name fragments → slug
const SLUG_MAP = [
  { fragments: ['harry', 'potter', 'wizard'], slug: 'immersive-harry-potter-house' },
  { fragments: ['rapunzel'],                  slug: 'rapunzels-retreat' },
  { fragments: ['galaxy', 'star wars', 'starwars', 'edge'], slug: 'galaxys-edge-retreat' },
  { fragments: ['basement', 'game day'],      slug: 'game-day-basement-hangout' },
  { fragments: ['ranch'],                     slug: 'renovated-ranch-retreat' },
  { fragments: ['fenced', 'fenced yard'],     slug: 'beautiful-home-fenced-yard' },
  { fragments: ['2755', 'sf', 'lakewood'],    slug: 'entire-home-2755sf-quiet-area' },
  { fragments: ['king', 'greenwood'],         slug: 'beautiful-3-king-bedrooms-retreat' },
];

// Sort priority by filename prefix
const SORT_ORDER = [
  'exterior', 'front', 'outside', 'main',
  'living', 'lounge',
  'kitchen', 'dining',
  'primbed', 'master', 'mainbed',
  'bed', 'secbed', 'thirdbed', 'fourthbed', 'fifthbed',
  'bath',
  'yard', 'patio', 'deck', 'outdoor',
  'hottub', 'hot',
  'basement', 'game', 'theater',
];

function slugForFolder(folderName) {
  const lower = folderName.toLowerCase();
  for (const { fragments, slug } of SLUG_MAP) {
    if (fragments.some(f => lower.includes(f))) return slug;
  }
  // Fall back: convert folder name to slug format
  return lower.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function sortPriority(filename) {
  const lower = filename.toLowerCase();
  const idx = SORT_ORDER.findIndex(prefix => lower.startsWith(prefix));
  return idx === -1 ? 999 : idx;
}

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

function isImage(filename) {
  return IMAGE_EXTS.has(path.extname(filename).toLowerCase());
}

if (!fs.existsSync(SOURCE_ROOT)) {
  console.error(`\nSource folder not found: ${SOURCE_ROOT}`);
  console.error('Create it and add property subfolders with photos, then run this script again.\n');
  process.exit(1);
}

const folders = fs.readdirSync(SOURCE_ROOT).filter(f => {
  return fs.statSync(path.join(SOURCE_ROOT, f)).isDirectory();
});

if (folders.length === 0) {
  console.log('No property folders found yet in', SOURCE_ROOT);
  process.exit(0);
}

const results = {};

for (const folder of folders) {
  const slug = slugForFolder(folder);
  const srcDir = path.join(SOURCE_ROOT, folder);
  const destDir = path.join(DEST_ROOT, slug);

  fs.mkdirSync(destDir, { recursive: true });

  const files = fs.readdirSync(srcDir)
    .filter(isImage)
    .sort((a, b) => {
      const pa = sortPriority(a), pb = sortPriority(b);
      if (pa !== pb) return pa - pb;
      return a.localeCompare(b);
    });

  const copied = [];
  for (const file of files) {
    const src  = path.join(srcDir, file);
    const dest = path.join(destDir, file);
    fs.copyFileSync(src, dest);
    copied.push(`/images/${slug}/${file}`);
  }

  results[slug] = copied;
  console.log(`\n✓ ${folder} → public/images/${slug}/ (${copied.length} image${copied.length !== 1 ? 's' : ''})`);
}

console.log('\n─────────────────────────────────────────');
console.log('Paste the following images[] arrays into lib/data.ts:\n');

for (const [slug, images] of Object.entries(results)) {
  if (images.length === 0) continue;
  console.log(`// ${slug}`);
  console.log('images: [');
  images.forEach(img => console.log(`  '${img}',`));
  console.log('],\n');
}

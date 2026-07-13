/**
 * generate-assets.js — one script for every favicon size + OG image.
 *
 * Usage:
 *   node generate-assets.js ./logo.svg      (explicit source)
 *   npm run generate:assets                  (auto-find logo.svg / logo.png / public/favicon.svg)
 *
 * Favicons  → public/icons/   (+ favicon.ico also copied to public/ for the
 *                               browser's legacy /favicon.ico auto-request)
 * OG images → public/
 * Manifest  → public/site.webmanifest
 *
 * Requires: sharp, png-to-ico   (installed as devDependencies)
 */
import sharp from 'sharp'
import pngToIco from 'png-to-ico'
import fs from 'fs'
import path from 'path'

// ── Brand ───────────────────────────────────────────────────────────────────
const BRAND_NAME = 'LearnForEarn'
const DOMAIN = 'learnforearn.in'
const BRAND = '#1E0A3C'   // dark purple
const ACCENT = '#22C55E'  // green
const TAGLINE = 'Free platform. Real skills. Real jobs.'

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 }
const PNG_OPTS = { quality: 100, compressionLevel: 9 }
const PUBLIC_DIR = path.resolve('public')
const ICONS_DIR = path.join(PUBLIC_DIR, 'icons')

const created = []
const track = (p) => created.push(p)
const rel = (p) => path.relative('.', p).replace(/\\/g, '/')
const sizeOf = (p) => `${(fs.statSync(p).size / 1024).toFixed(1)} KB`

// ── Source resolution ─────────────────────────────────────────────────────────
function resolveSource() {
  const arg = process.argv[2]
  const candidates = arg
    ? [arg]
    : ['logo.svg', 'logo.png', 'public/favicon.svg', 'public/logo.png', 'public/logo.svg']
  for (const c of candidates) {
    if (fs.existsSync(c)) return path.resolve(c)
  }
  console.error('\n❌ No source logo found.')
  console.error('   Pass one:  node generate-assets.js ./logo.svg')
  console.error('   Or place logo.svg / logo.png in the project root.\n')
  process.exit(1)
}

// SVG sources get rasterised at high density for crisp large sizes.
function base(src) {
  const isSvg = src.toLowerCase().endsWith('.svg')
  return () => sharp(src, isSvg ? { density: 300 } : {})
}

// ── Favicon / icon PNGs ─────────────────────────────────────────────────────
async function pngIcon(load, size, dest, label) {
  await load()
    .resize(size, size, { fit: 'contain', background: TRANSPARENT })
    .png(PNG_OPTS)
    .toFile(dest)
  track(dest)
  console.log(`  ✓ ${rel(dest)}  (${label || `${size}×${size}`})`)
}

// ── OG image (1200×630, logo left + text right) ─────────────────────────────
async function buildOgWide(load, dest) {
  const W = 1200, H = 630
  const logo = await load().resize(200, 200, { fit: 'contain', background: TRANSPARENT }).png().toBuffer()
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity="0"/>
      <stop offset="1" stop-color="${ACCENT}" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${BRAND}"/>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="340" y="298" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" fill="#FFFFFF">${BRAND_NAME}</text>
  <text x="342" y="356" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="600" fill="${ACCENT}">${TAGLINE}</text>
  <text x="${W - 40}" y="${H - 38}" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#FFFFFF" fill-opacity="0.7">${DOMAIN}</text>
</svg>`
  await sharp(Buffer.from(svg))
    .composite([{ input: logo, left: 80, top: Math.round((H - 200) / 2) }])
    .png(PNG_OPTS)
    .toFile(dest)
  track(dest)
  console.log(`  ✓ ${rel(dest)}  (${W}×${H})`)
}

// ── Square OG (1200×1200, logo top + text stacked, centered) ────────────────
async function buildOgSquare(load, dest) {
  const S = 1200
  const logo = await load().resize(280, 280, { fit: 'contain', background: TRANSPARENT }).png().toBuffer()
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${ACCENT}" stop-opacity="0"/>
      <stop offset="1" stop-color="${ACCENT}" stop-opacity="0.05"/>
    </linearGradient>
  </defs>
  <rect width="${S}" height="${S}" fill="${BRAND}"/>
  <rect width="${S}" height="${S}" fill="url(#g)"/>
  <text x="${S / 2}" y="730" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="88" font-weight="700" fill="#FFFFFF">${BRAND_NAME}</text>
  <text x="${S / 2}" y="800" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="600" fill="${ACCENT}">${TAGLINE}</text>
  <text x="${S / 2}" y="${S - 60}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="#FFFFFF" fill-opacity="0.7">${DOMAIN}</text>
</svg>`
  await sharp(Buffer.from(svg))
    .composite([{ input: logo, left: Math.round((S - 280) / 2), top: 300 }])
    .png(PNG_OPTS)
    .toFile(dest)
  track(dest)
  console.log(`  ✓ ${rel(dest)}  (${S}×${S})`)
}

// ── Meta-tag block printed at the end ───────────────────────────────────────
function metaTags() {
  return `<!-- Favicons -->
<link rel="icon" href="/favicon.ico" sizes="any" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="48x48" href="/icons/favicon-48x48.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta name="theme-color" content="${BRAND}" />
<meta name="msapplication-TileColor" content="${BRAND}" />
<meta name="msapplication-TileImage" content="/icons/mstile-150x150.png" />

<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="${BRAND_NAME}" />
<meta property="og:title" content="${BRAND_NAME} — Learn Tech Skills & Earn Jobs, 100% Free" />
<meta property="og:description" content="${TAGLINE} Free platform for students & freshers in India — real coding challenges, career roadmaps and hands-on AI projects." />
<meta property="og:url" content="https://${DOMAIN}/" />
<meta property="og:image" content="https://${DOMAIN}/og-image.png" />
<meta property="og:image:secure_url" content="https://${DOMAIN}/og-image.png" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="${BRAND_NAME} — ${TAGLINE}" />
<meta property="og:locale" content="en_IN" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${BRAND_NAME} — Learn Tech Skills & Earn Jobs, 100% Free" />
<meta name="twitter:description" content="${TAGLINE} For students & freshers in India." />
<meta name="twitter:image" content="https://${DOMAIN}/twitter-card.png" />
<meta name="twitter:image:alt" content="${BRAND_NAME} — ${TAGLINE}" />`
}

// ── Main ─────────────────────────────────────────────────────────────────────
async function main() {
  const src = resolveSource()
  console.log(`\n▶ Source logo: ${rel(src)}`)
  fs.mkdirSync(ICONS_DIR, { recursive: true })
  const load = base(src)

  console.log('\nFavicons & icons →')
  const f16 = path.join(ICONS_DIR, 'favicon-16x16.png')
  const f32 = path.join(ICONS_DIR, 'favicon-32x32.png')
  const f48 = path.join(ICONS_DIR, 'favicon-48x48.png')
  await pngIcon(load, 16, f16)
  await pngIcon(load, 32, f32)
  await pngIcon(load, 48, f48)
  await pngIcon(load, 180, path.join(ICONS_DIR, 'apple-touch-icon.png'), '180×180 apple-touch')
  await pngIcon(load, 192, path.join(ICONS_DIR, 'android-chrome-192x192.png'))
  await pngIcon(load, 512, path.join(ICONS_DIR, 'android-chrome-512x512.png'))
  await pngIcon(load, 150, path.join(ICONS_DIR, 'mstile-150x150.png'), '150×150 Windows tile')

  // favicon.ico bundles 16/32/48 — written to /icons and mirrored at root.
  const icoBuf = await pngToIco([f16, f32, f48])
  const icoIcons = path.join(ICONS_DIR, 'favicon.ico')
  const icoRoot = path.join(PUBLIC_DIR, 'favicon.ico')
  fs.writeFileSync(icoIcons, icoBuf); track(icoIcons); console.log(`  ✓ ${rel(icoIcons)}  (16+32+48)`)
  fs.writeFileSync(icoRoot, icoBuf); track(icoRoot); console.log(`  ✓ ${rel(icoRoot)}  (root, legacy request)`)

  console.log('\nOG / social images →')
  await buildOgWide(load, path.join(PUBLIC_DIR, 'og-image.png'))
  await buildOgWide(load, path.join(PUBLIC_DIR, 'twitter-card.png'))
  await buildOgSquare(load, path.join(PUBLIC_DIR, 'og-image-square.png'))

  console.log('\nManifest →')
  const manifest = {
    name: BRAND_NAME,
    short_name: 'LFE',
    description: `${TAGLINE} For students and freshers in India.`,
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: BRAND,
    theme_color: BRAND,
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/icons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
  const manifestPath = path.join(PUBLIC_DIR, 'site.webmanifest')
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
  track(manifestPath); console.log(`  ✓ ${rel(manifestPath)}`)

  console.log('\n─────────────────────────────────────────────')
  console.log(`✅ Generated ${created.length} files:`)
  for (const p of created) console.log(`   ${rel(p).padEnd(42)} ${sizeOf(p)}`)

  console.log('\n─────────────────────────────────────────────')
  console.log('📋 Paste this into index.html <head>:\n')
  console.log(metaTags())
  console.log('')
}

main().catch((e) => { console.error('\n❌ Generation failed:', e); process.exit(1) })

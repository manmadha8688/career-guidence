/**
 * generate-webp.mjs — create WebP copies of the few large public PNGs.
 *
 * Usage: node scripts/generate-webp.mjs   (or: npm run generate:webp)
 *
 * Keeps the original PNGs in place as fallbacks (referenced via <picture> / the
 * manifest). Uses the `sharp` dependency already installed for generate-assets.js.
 * Photographic art (hero robot) uses lossy q90; flat logo icons use lossless WebP
 * so edges stay crisp and identical to the PNG.
 */
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const PUBLIC_DIR = path.resolve('public')

const jobs = [
  { in: 'hero-robot.png',              out: 'hero-robot.webp',              opts: { quality: 90 } },
  { in: 'android-chrome-512x512.png',  out: 'android-chrome-512x512.webp',  opts: { lossless: true } },
  { in: 'icon-512.png',                out: 'icon-512.webp',                opts: { lossless: true } },
]

const kb = (p) => `${(fs.statSync(p).size / 1024).toFixed(1)} KB`

async function main() {
  for (const j of jobs) {
    const src = path.join(PUBLIC_DIR, j.in)
    const dest = path.join(PUBLIC_DIR, j.out)
    if (!fs.existsSync(src)) {
      console.warn(`  ⚠ skip ${j.in} — source not found`)
      continue
    }
    await sharp(src).webp(j.opts).toFile(dest)
    console.log(`  ✓ ${j.out}  (${kb(dest)}, was ${kb(src)})`)
  }
}

main().catch((e) => { console.error('\n❌ WebP generation failed:', e); process.exit(1) })

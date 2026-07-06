import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pub = join(__dirname, '..', 'public')
const svg = readFileSync(join(pub, 'favicon.svg'))

const sizes = [
  ['favicon-32.png', 32],
  ['favicon-16.png', 16],
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]

for (const [name, size] of sizes) {
  await sharp(svg, { density: 384 })
    .resize(size, size)
    .png()
    .toFile(join(pub, name))
  console.log('wrote', name, `${size}x${size}`)
}

// ── OG image (1200x630) — dark hunter-gradient background, centered mark + wordmark ──
const OG_W = 1200, OG_H = 630
const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${OG_W}" height="${OG_H}" viewBox="0 0 ${OG_W} ${OG_H}">
  <defs>
    <radialGradient id="bg" cx="50%" cy="38%" r="75%">
      <stop offset="0%" stop-color="#3B1878"/>
      <stop offset="55%" stop-color="#1A0A38"/>
      <stop offset="100%" stop-color="#0A0616"/>
    </radialGradient>
    <linearGradient id="blade" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F5F0FF"/>
      <stop offset="100%" stop-color="#C9A8FF"/>
    </linearGradient>
    <linearGradient id="wordmark" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#C9A8FF"/>
      <stop offset="100%" stop-color="#F5F0FF"/>
    </linearGradient>
    <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <rect width="${OG_W}" height="${OG_H}" fill="url(#bg)"/>

  <!-- icon badge -->
  <g transform="translate(120,175)">
    <rect width="280" height="280" rx="62" fill="#150826" stroke="#6D28D9" stroke-width="2" opacity="0.6"/>
    <g filter="url(#glow)" stroke="url(#blade)" stroke-linecap="round" fill="url(#blade)" transform="translate(56,56) scale(1.68)">
      <line x1="20" y1="20" x2="80" y2="80" stroke-width="6.5"/>
      <line x1="24" y1="42" x2="42" y2="24" stroke-width="5.5"/>
      <circle cx="74" cy="74" r="4.5" stroke="none"/>
      <line x1="80" y1="20" x2="20" y2="80" stroke-width="6.5"/>
      <line x1="76" y1="42" x2="58" y2="24" stroke-width="5.5"/>
      <circle cx="26" cy="74" r="4.5" stroke="none"/>
    </g>
  </g>

  <!-- wordmark + tagline -->
  <text x="460" y="300" font-family="Arial, sans-serif" font-weight="800" font-size="76" fill="url(#wordmark)" letter-spacing="-1">learnforearn</text>
  <text x="462" y="350" font-family="Arial, sans-serif" font-weight="600" font-size="27" fill="#9B8BC4" letter-spacing="2">LEVEL UP FROM ZERO TO HIRED</text>

  <!-- feature chips -->
  <g font-family="Arial, sans-serif" font-weight="700" font-size="21" fill="#E8DFFF">
    <rect x="462" y="392" width="150" height="46" rx="23" fill="#ffffff14" stroke="#6D28D9" stroke-width="1.5"/>
    <text x="537" y="421" text-anchor="middle">SKILL ARENA</text>
    <rect x="624" y="392" width="140" height="46" rx="23" fill="#ffffff14" stroke="#6D28D9" stroke-width="1.5"/>
    <text x="694" y="421" text-anchor="middle">AI LAB</text>
    <rect x="776" y="392" width="180" height="46" rx="23" fill="#ffffff14" stroke="#6D28D9" stroke-width="1.5"/>
    <text x="866" y="421" text-anchor="middle">DEPLOY GUIDES</text>
  </g>
</svg>`

await sharp(Buffer.from(ogSvg), { density: 384 })
  .resize(OG_W, OG_H)
  .png()
  .toFile(join(pub, 'og-image.png'))
console.log('wrote og-image.png 1200x630')

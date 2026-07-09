import sharp from 'sharp'
import { statSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const pub = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const TARGET = 100 * 1024
const kb = (n) => (n / 1024).toFixed(1) + ' KB'

// Recompress a PNG in place as a lossy palette PNG, lowering quality (and, for large
// images, width) until it fits under TARGET. The compressed buffer is written to disk
// verbatim — never re-encoded — so the palette/quality settings are preserved.
async function compress(name, { minWidth = null, minQuality = 40 } = {}) {
  const path = join(pub, name)
  const before = statSync(path).size
  const meta = await sharp(path).metadata()
  const widths = [meta.width]
  if (minWidth) for (let w = meta.width - 128; w >= minWidth; w -= 128) widths.push(w)
  const qualities = [90, 80, 70, 60, 50, 40, 35, 30, 25, 20].filter(q => q >= minQuality)

  let best = null
  for (const width of widths) {
    for (const quality of qualities) {
      const buf = await sharp(path)
        .resize({ width })
        .png({ palette: true, quality, effort: 10, compressionLevel: 9 })
        .toBuffer()
      best = { buf, width, quality }
      if (buf.length <= TARGET) {
        writeFileSync(path, buf)
        console.log(`${name}: ${kb(before)} -> ${kb(buf.length)} (${width}px q${quality})`)
        return
      }
    }
  }
  // Smallest achievable still writes (best effort) — reported so it's never a silent miss.
  writeFileSync(path, best.buf)
  console.log(`${name}: ${kb(before)} -> ${kb(best.buf.length)} (${best.width}px q${best.quality}) [over target]`)
}

await compress('og-image.png')            // 1200x630, size-locked by OG meta tags
await compress('icon-512.png')            // 512x512, size-locked by manifest/JSON-LD
await compress('hero-robot.png', { minWidth: 448, minQuality: 20 }) // portrait, mobile fallback

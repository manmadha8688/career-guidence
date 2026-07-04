// Seed a Code Gym track into the database via the admin API.
//
// Usage:
//   node scripts/codegym/push.mjs track01              # add/refresh Track 01
//   node scripts/codegym/push.mjs track01 --wipe-track # delete this track's existing Qs first
//   node scripts/codegym/push.mjs track01 --wipe-all   # delete ALL Code Gym Qs first
//
// Data files live in ./data/<name>.mjs and default-export an array of questions.
import { login, makeClient } from './lib.mjs'

const arg = process.argv[2]
if (!arg) {
  console.error('Usage: node scripts/codegym/push.mjs <trackFile> [--wipe-track|--wipe-all]')
  process.exit(1)
}
const wipeAll = process.argv.includes('--wipe-all')
const wipeTrack = process.argv.includes('--wipe-track')

const mod = await import(`./data/${arg}.mjs`)
const questions = mod.default
if (!Array.isArray(questions) || questions.length === 0) {
  console.error(`Data file ./data/${arg}.mjs must default-export a non-empty array`)
  process.exit(1)
}

const track = questions[0].track
const cookie = await login()
const api = makeClient(cookie)

const existing = await api('/admin/problems')
console.log(`DB currently has ${existing.length} question(s).`)

if (wipeAll) {
  for (const p of existing) await api(`/admin/problems/${p.id}`, { method: 'DELETE' })
  console.log(`Wiped ALL ${existing.length} question(s).`)
} else if (wipeTrack) {
  const mine = existing.filter(p => p.track === track)
  for (const p of mine) await api(`/admin/problems/${p.id}`, { method: 'DELETE' })
  console.log(`Wiped ${mine.length} existing "${track}" question(s).`)
}

let ok = 0
for (const [i, q] of questions.entries()) {
  const body = { ...q, orderIndex: q.orderIndex ?? i + 1 }
  try {
    const saved = await api('/admin/problems', { method: 'POST', body: JSON.stringify(body) })
    ok++
    console.log(`  ✓ ${String(i + 1).padStart(2)}. ${saved.title}`)
  } catch (e) {
    console.error(`  ✗ ${String(i + 1).padStart(2)}. ${q.title} — ${e.message}`)
  }
}

console.log(`\nSeeded ${ok}/${questions.length} into "${track}".`)
const after = await api('/admin/problems')
console.log(`DB now has ${after.length} question(s) total.`)

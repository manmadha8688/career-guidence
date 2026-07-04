// Read-only inspection of the live Code Gym question bank.
// Usage: node scripts/codegym/inspect.mjs
import { login, makeClient } from './lib.mjs'

const FIELDS = [
  'title', 'description', 'inputFormat', 'outputFormat',
  'sampleInput', 'sampleOutput', 'example1Explanation',
  'sampleInput2', 'sampleOutput2', 'example2Explanation',
  'constraints', 'codeSnippet', 'hints', 'approach',
  'solutions', 'explanation', 'interviewTip', 'isInterview', 'companiesThatAsk',
]

function has(v) {
  if (v == null) return false
  if (Array.isArray(v)) return v.length > 0
  if (typeof v === 'object') return Object.keys(v).length > 0
  if (typeof v === 'string') return v.trim().length > 0
  return true
}

function solLangs(sol) {
  const out = {}
  for (const variant of ['brute', 'normal', 'optimized']) {
    const v = sol?.[variant]
    if (!v) continue
    const langs = Object.entries(v.code || {}).filter(([, c]) => has(c)).map(([k]) => k)
    if (langs.length) out[variant] = langs.join('/')
  }
  return out
}

const cookie = await login()
const api = makeClient(cookie)
const all = await api('/admin/problems')

console.log(`\n=== TOTAL Code Gym questions in DB: ${all.length} ===\n`)

// Per-track counts (tracks is a list; a question can be in multiple)
const trackCounts = {}
const multiTrack = []
for (const p of all) {
  const tracks = p.tracks || []
  if (tracks.length > 1) multiTrack.push({ id: p.id, title: p.title, tracks })
  for (const t of tracks) trackCounts[t] = (trackCounts[t] || 0) + 1
  if (tracks.length === 0) trackCounts['(none)'] = (trackCounts['(none)'] || 0) + 1
}
console.log('Per-track counts (a question may count in multiple tracks):')
for (const [t, c] of Object.entries(trackCounts).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${t.padEnd(18)} ${c}`)
}

console.log(`\nQuestions in MULTIPLE tracks: ${multiTrack.length}`)
for (const m of multiTrack) console.log(`  [${m.tracks.join(', ')}] ${m.title}`)

// Level / type distribution
const levels = {}, types = {}, cats = {}
for (const p of all) {
  levels[p.level || '(none)'] = (levels[p.level || '(none)'] || 0) + 1
  types[p.type || '(none)'] = (types[p.type || '(none)'] || 0) + 1
  cats[p.category || '(none)'] = (cats[p.category || '(none)'] || 0) + 1
}
console.log('\nLevels:', JSON.stringify(levels))
console.log('Types:', JSON.stringify(types))
console.log('Categories:', JSON.stringify(cats))

// Field population
console.log('\nField population (how many of', all.length, 'have each field):')
for (const f of FIELDS) {
  const n = all.filter(p => has(p[f])).length
  console.log(`  ${f.padEnd(20)} ${n}`)
}

// Solution language coverage
console.log('\nSolution coverage sample (first 40):')
all.slice(0, 40).forEach((p, i) => {
  const tracks = (p.tracks || []).join(',')
  const langs = JSON.stringify(solLangs(p.solutions))
  console.log(`  ${String(i + 1).padStart(2)}. [${tracks}] ${p.title} — ${langs}`)
})

// Full per-track title listing
console.log('\n=== Titles by track ===')
const byTrack = {}
for (const p of all) for (const t of (p.tracks || ['(none)'])) (byTrack[t] ||= []).push(p.title)
for (const [t, titles] of Object.entries(byTrack)) {
  console.log(`\n${t} (${titles.length}):`)
  titles.forEach((ti, i) => console.log(`  ${i + 1}. ${ti}`))
}

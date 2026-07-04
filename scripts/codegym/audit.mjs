// Audit every Code Gym data file against the ProblemQuestion schema.
// Checks required fields, track/level/category/topics validity, example shape,
// and that each solution variant (brute/normal/optimized) is complete in all 4 languages.
// Reports the solution mix (solo / brute+opt / trio) per track.

const FILES = {
  track01: 'START_CODING',
  track02: 'LOGIC_BUILDING',
  track03: 'SKILL_UP',
  track04: 'CRACK_IT',
  track05: 'BUILD_IT',
  track06: 'PROVE_IT',
}
const LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']
const LANGS = ['python', 'java', 'c', 'cpp']

const problems = []
let errors = 0
const titles = new Map()

const err = (where, msg) => { errors++; console.log(`  x [${where}] ${msg}`) }
const isStr = (v) => typeof v === 'string' && v.trim().length > 0
const isArr = (v) => Array.isArray(v) && v.length > 0

function checkVariant(where, name, v) {
  if (!v) return
  if (!isStr(v.logic)) err(where, `${name}.logic missing`)
  if (!isStr(v.timeComplexity)) err(where, `${name}.timeComplexity missing`)
  if (!isStr(v.spaceComplexity)) err(where, `${name}.spaceComplexity missing`)
  if (!v.code) { err(where, `${name}.code missing`); return }
  for (const l of LANGS) if (!isStr(v.code[l])) err(where, `${name}.code.${l} missing`)
}

for (const [file, expectedTrack] of Object.entries(FILES)) {
  const mod = await import(`./data/${file}.mjs`)
  const qs = mod.default
  console.log(`\n=== ${file} (${expectedTrack}) - ${qs.length} problems ===`)
  qs.forEach((q, i) => {
    const where = `${file}#${i + 1} ${q.title || '??'}`
    if (q.track !== expectedTrack) err(where, `track is "${q.track}", expected "${expectedTrack}"`)
    if (!LEVELS.includes(q.level)) err(where, `level "${q.level}" invalid`)
    if (!isStr(q.category)) err(where, 'category missing')
    if (!isArr(q.topics)) err(where, 'topics empty')
    for (const f of ['title', 'description', 'inputFormat', 'outputFormat', 'approach', 'explanation', 'tip'])
      if (!isStr(q[f])) err(where, `${f} missing`)
    if (!isArr(q.hints)) err(where, 'hints empty')
    if (!isArr(q.whatYouLearn)) err(where, 'whatYouLearn empty')
    if (!isArr(q.examples)) err(where, 'examples empty')
    else q.examples.forEach((e, j) => {
      if (!isStr(e.input)) err(where, `example ${j + 1} input missing`)
      if (!isStr(e.output)) err(where, `example ${j + 1} output missing`)
      if (!isStr(e.explanation)) err(where, `example ${j + 1} explanation missing`)
    })
    const s = q.solutions || {}
    const present = ['brute', 'normal', 'optimized'].filter(k => s[k])
    if (present.length === 0) err(where, 'no solution variants')
    checkVariant(where, 'brute', s.brute)
    checkVariant(where, 'normal', s.normal)
    checkVariant(where, 'optimized', s.optimized)
    const mix = present.length === 1 ? (present[0] === 'normal' ? 'solo' : present[0])
      : present.slice().sort().join('+')
    if (titles.has(q.title)) err(where, `duplicate title (also ${titles.get(q.title)})`)
    else titles.set(q.title, where)
    problems.push({ track: expectedTrack, level: q.level, category: q.category, mix })
  })
}

console.log('\n---------- SUMMARY ----------')
console.log(`Total problems: ${problems.length}`)
const byTrack = {}
for (const p of problems) {
  byTrack[p.track] ??= { total: 0, levels: {}, mixes: {}, cats: new Set() }
  byTrack[p.track].total++
  byTrack[p.track].levels[p.level] = (byTrack[p.track].levels[p.level] || 0) + 1
  byTrack[p.track].mixes[p.mix] = (byTrack[p.track].mixes[p.mix] || 0) + 1
  byTrack[p.track].cats.add(p.category)
}
for (const [t, d] of Object.entries(byTrack)) {
  console.log(`\n${t}: ${d.total}`)
  console.log(`  levels: ${JSON.stringify(d.levels)}`)
  console.log(`  solutions: ${JSON.stringify(d.mixes)}`)
  console.log(`  categories: ${[...d.cats].join(', ')}`)
}
console.log(`\n${errors === 0 ? 'ALL VALID - no schema errors' : errors + ' error(s) found'}`)

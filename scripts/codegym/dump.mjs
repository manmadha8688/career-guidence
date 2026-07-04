// Dump full JSON for questions whose title matches an argument (case-insensitive substring).
// Usage: node scripts/codegym/dump.mjs "Hello World" "Employee Bonus"
import { login, makeClient } from './lib.mjs'

const needles = process.argv.slice(2).map(s => s.toLowerCase())
const cookie = await login()
const api = makeClient(cookie)
const all = await api('/admin/problems')

const picks = needles.length
  ? all.filter(p => needles.some(n => (p.title || '').toLowerCase().includes(n)))
  : all.slice(0, 1)

for (const p of picks) {
  console.log('\n' + '='.repeat(80))
  console.log(JSON.stringify(p, null, 2))
}
console.log(`\n(${picks.length} shown)`)

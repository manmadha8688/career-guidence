import fs from 'fs'
import path from 'path'

function walk(dir) {
  const out = []
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    if (fs.statSync(p).isDirectory()) out.push(...walk(p))
    else if (p.endsWith('.jsx')) out.push(p)
  }
  return out
}

const orbitron =
  /<span style=\{\{\s*fontFamily:\s*"'Orbitron', sans-serif",\s*fontWeight:\s*900,\s*fontSize:\s*'0\.78rem',\s*letterSpacing:\s*'0\.08em',\s*color\s*\}\}>/g

const header =
  /<div style=\{\{\s*display:\s*'flex',\s*alignItems:\s*'center',\s*gap:\s*'0\.5rem',\s*marginBottom:\s*'0\.875rem'\s*\}\}>\s*<span style=\{\{\s*fontSize:\s*'1\.1rem'\s*\}\}>🎯<\/span>/g

let n = 0
for (const f of walk('src/pages/ailab')) {
  if (f.includes('AILabPage')) continue
  let c = fs.readFileSync(f, 'utf8')
  const o = c
  c = c.replace(header, '<div className="tool-layout-task__header"><span>🎯</span>')
  c = c.replace(orbitron, '<span className="tool-layout-task__label">')
  if (c !== o) {
    fs.writeFileSync(f, c)
    n++
    console.log(f)
  }
}
console.log('fixed', n)

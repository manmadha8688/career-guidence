/**
 * Fourth pass: catch remaining dark/txt/sub/border patterns.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ailabRoot = path.join(__dirname, '../src/pages/ailab')

function walk(dir) {
  const out = []
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name)
    if (fs.statSync(p).isDirectory()) out.push(...walk(p))
    else if (p.endsWith('.jsx')) out.push(p)
  }
  return out
}

function fixContent(content) {
  let c = content
  const orig = c

  // Any highlight box still using dark + color template
  c = c.replace(
    /<div style=\{\{\s*padding:\s*'0\.(?:75|875)rem 1rem',\s*borderRadius:\s*10,\s*background:\s*dark \? `\$\{color\}[^`]+` : `\$\{color\}[^`]+`,\s*border:\s*`1px solid \$\{color\}[^`]+`,\s*marginTop:\s*'([^']+)'\s*\}\}>/g,
    "<div className=\"tool-helper-highlight\" style={{ marginTop: '$1' }}>",
  )

  // Table cells — any variant
  c = c.replace(
    /<td key=\{j\} style=\{\{[^}]*color:\s*j === 0 \? (?:txt|color) : sub[^}]+\}\}>/g,
    "<td key={j} className={j === 0 ? 'tool-table__cell--accent' : undefined}>",
  )

  // Project task header (flex wrapper + emoji span)
  c = c.replace(
    /<div style=\{\{\s*display:\s*'flex',\s*alignItems:\s*'center',\s*gap:\s*'0\.5rem',\s*marginBottom:\s*'0\.875rem'\s*\}\}>\s*<span style=\{\{\s*fontSize:\s*'1\.1rem'\s*\}\}>🎯<\/span>/g,
    '<div className="tool-layout-task__header"><span>🎯</span>',
  )

  c = c.replace(
    /<span style=\{\{\s*fontFamily:\s*"'Orbitron', sans-serif",\s*fontWeight:\s*900,\s*fontSize:\s*'0\.78rem',\s*letterSpacing:\s*'0\.08em',\s*color\s*\}\}>/g,
    '<span className="tool-layout-task__label">',
  )

  // Checklist rows
  c = c.replace(
    /<div key=\{i\} style=\{\{\s*fontSize:\s*'0\.78rem',\s*color:\s*sub,\s*display:\s*'flex',\s*gap:\s*'0\.4rem',\s*alignItems:\s*'flex-start'\s*\}\}>/g,
    '<div key={i} className="tool-checklist-item">',
  )

  // Code pre blocks
  c = c.replace(
    /<pre style=\{\{\s*fontSize:\s*'0\.78rem',\s*color:\s*sub,\s*margin:\s*0,\s*lineHeight:\s*1\.7,\s*fontFamily:\s*"'Share Tech Mono', monospace",\s*whiteSpace:\s*'pre-wrap'\s*\}\}>/g,
    '<pre className="tool-code-block">',
  )

  // Mono label spans (color or color: color)
  c = c.replace(
    /<span style=\{\{\s*fontFamily:\s*"'Share Tech Mono', monospace",\s*fontSize:\s*'0\.6rem',\s*color(?::\s*color)?,\s*letterSpacing:\s*'0\.(?:06|08)em'(?:,\s*marginBottom:\s*'0\.(?:35|5)rem')?\s*\}\}>/g,
    '<span className="tool-helper-highlight__label">',
  )

  c = c.replace(
    /<div style=\{\{\s*fontFamily:\s*"'Share Tech Mono', monospace",\s*fontSize:\s*'0\.6rem',\s*color:\s*color,\s*letterSpacing:\s*'0\.1em',\s*marginBottom:\s*'0\.5rem'\s*\}\}>/g,
    '<div className="tool-quick-start__label">',
  )

  if (c !== orig) return c
  return null
}

let fixed = 0
for (const file of walk(ailabRoot)) {
  if (file.includes('AILabPage.jsx')) continue
  const content = fs.readFileSync(file, 'utf8')
  if (!/\bdark\b|\btxt\b|\bsub\b|\$\{border\}/.test(content)) continue
  const next = fixContent(content)
  if (next) {
    fs.writeFileSync(file, next, 'utf8')
    fixed++
    console.log('fixed:', path.relative(ailabRoot, file))
  }
}
console.log('Total fixed:', fixed)

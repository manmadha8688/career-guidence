/**
 * Third pass: fix undefined dark/txt/sub/border refs in tool pages.
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

const CANDO_OUTER =
  /<div key=\{i\} style=\{\{\s*display:\s*'flex',\s*gap:\s*'0\.625rem',\s*alignItems:\s*'flex-start',\s*padding:\s*'0\.625rem 0\.875rem',\s*borderRadius:\s*8,\s*background:\s*dark \? 'rgba\(255,255,255,0\.025\)' : 'rgba\(0,0,0,0\.025\)',\s*border:\s*`1px solid \$\{border\}`,\s*marginBottom:\s*'0\.5rem'\s*\}\}>/g

const CANDO_DOT =
  /<div style=\{\{\s*width:\s*6,\s*height:\s*6,\s*borderRadius:\s*'50%',\s*background:\s*color,\s*flexShrink:\s*0,\s*marginTop:\s*7\s*\}\}\s*\/>/g

const HIGHLIGHT_BOX =
  /<div style=\{\{\s*padding:\s*'0\.(?:75|875)rem 1rem',\s*borderRadius:\s*10,\s*background:\s*dark \? `\$\{color\}[^`]+`,\s*border:\s*`1px solid \$\{color\}[^`]+`,\s*marginTop:\s*'[^']+'\s*\}\}>/g

const HIGHLIGHT_BOX_MT05 =
  /<div style=\{\{\s*padding:\s*'0\.75rem 1rem',\s*borderRadius:\s*10,\s*background:\s*dark \? `\$\{color\}08` : `\$\{color\}06`,\s*border:\s*`1px solid \$\{color\}22`,\s*marginTop:\s*'0\.5rem'\s*\}\}>/g

const CARD_ITEM =
  /<div key=\{i\} style=\{\{\s*padding:\s*'0\.875rem 1rem',\s*borderRadius:\s*10,\s*background:\s*dark \? `\$\{color\}07` : `\$\{color\}05`,\s*border:\s*`1px solid \$\{color\}1e`\s*\}\}>/g

const CARD_TITLE =
  /<div style=\{\{\s*fontFamily:\s*"'Share Tech Mono', monospace",\s*fontSize:\s*'0\.68rem',\s*color,\s*letterSpacing:\s*'0\.06em',\s*marginBottom:\s*'0\.4rem'\s*\}\}>/g

const TASK_HEADER =
  /<div style=\{\{\s*display:\s*'flex',\s*alignItems:\s*'center',\s*gap:\s*'0\.5rem',\s*marginBottom:\s*'0\.875rem'\s*\}\}>\s*<span style=\{\{\s*fontSize:\s*'1\.1rem'\s*\}\}>🎯<\/span>\s*<span style=\{\{\s*fontFamily:\s*"'Orbitron', sans-serif",\s*fontWeight:\s*900,\s*fontSize:\s*'0\.78rem',\s*letterSpacing:\s*'0\.08em',\s*color\s*\}\}>([^<]+)<\/span>\s*<\/div>/g

const LABEL_SPAN =
  /<span style=\{\{\s*fontFamily:\s*"'Share Tech Mono', monospace",\s*fontSize:\s*'0\.(?:6|65)rem',\s*color,\s*letterSpacing:\s*'0\.(?:06|1)em'(?:,\s*marginBottom:\s*'0\.5rem')?\s*\}\}>/g

const SUB_PARA =
  /<p style=\{\{\s*fontSize:\s*'0\.82rem',\s*color:\s*sub,\s*margin:\s*'0\.375rem 0 0',\s*lineHeight:\s*1\.65\s*\}\}>/g

const TABLE_WRAP =
  /<div style=\{\{\s*overflowX:\s*'auto',\s*marginBottom:\s*'1\.25rem'\s*\}\}>/g

const TABLE_INLINE =
  /<table style=\{\{\s*width:\s*'100%',\s*borderCollapse:\s*'collapse',\s*fontSize:\s*'0\.82rem'\s*\}\}>/g

const TH_INLINE =
  /<th key=\{h\} style=\{\{[^}]+\}\}>/g

const TR_STRIPE =
  /<tr key=\{i\} style=\{\{\s*background:\s*i % 2 === 0 \? \(dark \?[^}]+\}\}>/g

const TD_TXT =
  /<td key=\{j\} style=\{\{\s*padding:\s*'0\.6rem 0\.875rem',\s*color:\s*j === 0 \? txt : sub,[^}]+\}\}>/g

const TD_COLOR =
  /<td key=\{j\} style=\{\{\s*padding:\s*'0\.6rem 0\.875rem',\s*color:\s*j === 0 \? color : sub,[^}]+\}\}>/g

const FREE_TIER_SPAN =
  /<span style=\{\{\s*fontFamily:\s*"'Share Tech Mono', monospace",\s*fontSize:\s*'0\.62rem',\s*color:\s*'#4ADE80',\s*letterSpacing:\s*'0\.07em'\s*\}\}>/g

const QUICK_LABEL =
  /<div style=\{\{\s*fontFamily:\s*"'Share Tech Mono', monospace",\s*fontSize:\s*'0\.6rem',\s*color:\s*color,\s*letterSpacing:\s*'0\.1em',\s*marginBottom:\s*'0\.5rem'\s*\}\}>/g

function fixContent(content) {
  let c = content
  const orig = c

  c = c.replace(CANDO_OUTER, '<div key={i} className="tool-layout-cando-item">')
  c = c.replace(CANDO_DOT, '<div className="tool-layout-cando-item__dot" />')
  c = c.replace(HIGHLIGHT_BOX_MT05, '<div className="tool-helper-highlight" style={{ marginTop: \'0.5rem\' }}>')
  c = c.replace(HIGHLIGHT_BOX, (m) => {
    const mt = m.match(/marginTop:\s*'([^']+)'/)
    return mt
      ? `<div className="tool-helper-highlight" style={{ marginTop: '${mt[1]}' }}>`
      : '<div className="tool-helper-highlight">'
  })
  c = c.replace(CARD_ITEM, '<div key={i} className="tool-helper-card">')
  c = c.replace(CARD_TITLE, '<div className="tool-helper-card__name">')
  c = c.replace(
    TASK_HEADER,
    '<div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">$1</span></div>',
  )
  c = c.replace(LABEL_SPAN, '<span className="tool-helper-highlight__label">')
  c = c.replace(SUB_PARA, '<p className="tool-helper-highlight__text" style={{ margin: \'0.375rem 0 0\' }}>')
  c = c.replace(TABLE_WRAP, '<div className="tool-table-wrap" style={{ marginBottom: \'1.25rem\' }}>')
  c = c.replace(TABLE_INLINE, '<table className="tool-table tool-table--striped">')
  c = c.replace(TH_INLINE, '<th key={h}>')
  c = c.replace(TR_STRIPE, '<tr key={i}>')
  c = c.replace(TD_TXT, '<td key={j} className={j === 0 ? \'tool-table__cell--accent\' : undefined}>')
  c = c.replace(TD_COLOR, '<td key={j} className={j === 0 ? \'tool-table__cell--accent\' : undefined}>')
  c = c.replace(FREE_TIER_SPAN, '<span className="tool-success-note__text">')
  c = c.replace(QUICK_LABEL, '<div className="tool-quick-start__label">')

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

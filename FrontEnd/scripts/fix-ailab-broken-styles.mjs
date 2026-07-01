/**
 * Fix partially migrated AI Lab pages that reference removed theme vars (sub, dark, txt, border, P).
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

function fixContent(content, file) {
  let c = content
  const orig = c

  // P(sub) → CSS class
  c = c.replace(/style=\{\{\s*\.\.\.P\(sub\)([^}]*)\}\}/g, (_, rest) => {
    const r = rest.trim()
    if (!r) return 'className="tool-layout-block__para"'
    if (r.startsWith(',')) return `className="tool-layout-block__para" style={{${r.slice(1)}}}`
    return 'className="tool-layout-block__para"'
  })

  // Remove unused P import
  if (!c.includes('P(sub)') && !c.includes('...P(')) {
    c = c.replace(/,\s*P\b/g, '')
    c = c.replace(/\{\s*P\s*,/g, '{')
    c = c.replace(/,\s*P\s*\}/g, ' }')
    c = c.replace(/import\s*\{\s*P\s*\}\s*from\s*['"][^'"]+helpers['"]\s*\n/, '')
  }

  // Paragraphs using txt/sub without P
  c = c.replace(
    /<p style=\{\{\s*fontSize:\s*'0\.9rem',\s*color:\s*txt,\s*lineHeight:\s*1\.8,\s*margin:\s*'0 0 1rem'\s*\}\}>/g,
    '<p className="tool-layout-task__desc">',
  )
  c = c.replace(
    /<p style=\{\{\s*fontSize:\s*'0\.875rem',\s*color:\s*sub,\s*lineHeight:\s*1\.75,\s*margin:\s*0\s*\}\}>/g,
    '<p className="tool-layout-tip__text">',
  )
  c = c.replace(
    /<span style=\{\{\s*fontSize:\s*'0\.85rem',\s*color:\s*sub,\s*lineHeight:\s*1\.6\s*\}\}>/g,
    '<span className="tool-layout-cando-item__text">',
  )
  c = c.replace(
    /<p style=\{\{\s*fontSize:\s*'0\.8rem',\s*color:\s*sub,\s*lineHeight:\s*1\.65,\s*margin:\s*0\s*\}\}>/g,
    '<p className="tool-helper-card__desc">',
  )
  c = c.replace(
    /<span style=\{\{\s*fontSize:\s*'0\.82rem',\s*color:\s*sub,\s*marginLeft:\s*'0\.5rem'\s*\}\}>/g,
    '<span className="tool-layout-block__para" style={{ marginLeft: \'0.5rem\', display: \'inline\' }}>',
  )

  // Inline can-do rows → use CanDoList if we can detect simple string array maps
  // (skip complex cases)

  // Project task blocks still inline
  c = c.replace(
    /<div style=\{\{\s*padding:\s*'1\.5rem',\s*borderRadius:\s*16,\s*background:\s*dark \? `\$\{color\}08` : `\$\{color\}06`,\s*border:\s*`2px solid \$\{color\}28`,\s*marginBottom:\s*'1\.25rem'\s*\}\}>\s*<div style=\{\{\s*display:\s*'flex',\s*alignItems:\s*'center',\s*gap:\s*'0\.5rem',\s*marginBottom:\s*'0\.875rem'\s*\}\}>\s*<span style=\{\{\s*fontSize:\s*'1\.1rem'\s*\}\}>🎯<\/span>\s*<span style=\{\{\s*fontFamily:\s*"'Orbitron', sans-serif",\s*fontWeight:\s*900,\s*fontSize:\s*'0\.78rem',\s*letterSpacing:\s*'0\.08em',\s*color\s*\}\}>PROJECT — ([^<]+)<\/span>\s*<\/div>\s*<p style=\{\{\s*fontSize:\s*'0\.9rem',\s*color:\s*txt,\s*lineHeight:\s*1\.8,\s*margin:\s*'0 0 1rem'\s*\}\}>([\s\S]*?)<\/p>/g,
    (_, title, desc) => `<ProjectTask title="${title.trim()}" description={${JSON.stringify(desc)}}`,
  )

  // Cost note boxes
  c = c.replace(
    /<div style=\{\{\s*padding:\s*'0\.625rem 0\.875rem',\s*borderRadius:\s*8,\s*background:\s*dark \? 'rgba\(245,158,11,0\.08\)' : 'rgba\(245,158,11,0\.06\)',\s*border:\s*'1px solid rgba\(245,158,11,0\.2\)',\s*marginTop:\s*'0\.875rem'\s*\}\}>\s*<span style=\{\{\s*fontFamily:\s*"'Share Tech Mono', monospace",\s*fontSize:\s*'0\.6rem',\s*color:\s*'#F59E0B',\s*letterSpacing:\s*'0\.08em'\s*\}\}>([^<]+)<\/span>\s*<\/div>/g,
    (_, text) => `<div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">${text}</span></div>`,
  )

  // Pro tip blocks
  c = c.replace(
    /<div style=\{\{\s*padding:\s*'1\.125rem 1\.25rem',\s*borderRadius:\s*14,\s*background:\s*dark \? 'rgba\(245,158,11,0\.07\)' : 'rgba\(245,158,11,0\.07\)',\s*border:\s*'1px solid rgba\(245,158,11,0\.2\)',\s*marginBottom:\s*'1\.25rem'\s*\}\}>\s*<div style=\{\{\s*fontFamily:\s*"'Share Tech Mono', monospace",\s*fontSize:\s*'0\.6rem',\s*letterSpacing:\s*'0\.12em',\s*color:\s*'#F59E0B',\s*marginBottom:\s*'0\.5rem'\s*\}\}>⚡ PRO TIP<\/div>\s*<p style=\{\{\s*fontSize:\s*'0\.875rem',\s*color:\s*sub,\s*lineHeight:\s*1\.75,\s*margin:\s*0\s*\}\}>([\s\S]*?)<\/p>\s*<\/div>/g,
    (_, tip) => `<ProTip>${tip}</ProTip>`,
  )

  // Can-do item rows
  c = c.replace(
    /<div key=\{i\} style=\{\{\s*display:\s*'flex',\s*gap:\s*'0\.625rem',\s*alignItems:\s*'flex-start',\s*padding:\s*'0\.625rem 0\.875rem',\s*borderRadius:\s*8,\s*background:\s*dark \? 'rgba\(255,255,255,0\.025\)' : 'rgba\(0,0,0,0\.025\)',\s*border:\s*`1px solid \$\{border\}`,\s*marginBottom:\s*'0\.5rem'\s*\}\}>\s*<div style=\{\{\s*width:\s*6,\s*height:\s*6,\s*borderRadius:\s*'50%',\s*background:\s*color,\s*flexShrink:\s*0,\s*marginTop:\s*7\s*\}\} \/>\s*<span style=\{\{\s*fontSize:\s*'0\.85rem',\s*color:\s*sub,\s*lineHeight:\s*1\.6\s*\}\}>\{item\}<\/span>\s*<\/div>/g,
    `<div key={i} className="tool-layout-cando-item"><div className="tool-layout-cando-item__dot" /><span className="tool-layout-cando-item__text">{item}</span></div>`,
  )

  // Info/highlight boxes using dark
  c = c.replace(
    /<div style=\{\{\s*padding:\s*'0\.75rem 1rem',\s*borderRadius:\s*9,\s*background:\s*dark \? `\$\{color\}08` : `\$\{color\}06`,\s*border:\s*`1px solid \$\{color\}25`,\s*marginTop:\s*'0\.5rem'\s*\}\}>/g,
    '<div className="tool-helper-highlight" style={{ \'--tool-color\': color }}>',
  )

  // Ensure ProjectTask/ProTip/CanDoList imported if used
  if (c.includes('<ProjectTask') && !c.includes('ProjectTask,')) {
    c = c.replace(
      /from '\.\.\/toolPageComponents'/,
      m => {
        if (c.includes('ProjectTask')) return m
        return m
      },
    )
    if (!/ProjectTask/.test(content.match(/from '\.\.\/toolPageComponents'[\s\S]*?}/)?.[0] || '')) {
      c = c.replace(
        /(import \{[^}]*)(}\s*from '\.\.\/toolPageComponents')/,
        (m, a, b) => {
          let imp = a
          if (c.includes('<ProjectTask') && !imp.includes('ProjectTask')) imp += ', ProjectTask'
          if (c.includes('<ProTip') && !imp.includes('ProTip')) imp += ', ProTip'
          if (c.includes('<CanDoList') && !imp.includes('CanDoList')) imp += ', CanDoList'
          return imp + b
        },
      )
    }
  }

  if (c !== orig) {
    fs.writeFileSync(file, c, 'utf8')
    return true
  }
  return false
}

let fixed = 0
for (const file of walk(ailabRoot)) {
  if (file.includes('toolPageComponents') || file.includes('helpers.jsx') || file.includes('AILabPage')) continue
  const content = fs.readFileSync(file, 'utf8')
  if (!/\b(sub|dark|txt|border|P\(sub\))\b/.test(content)) continue
  if (fixContent(content, file)) {
    fixed++
    console.log('fixed:', path.relative(ailabRoot, file))
  }
}
console.log('Total fixed:', fixed)

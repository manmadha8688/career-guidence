/**
 * Second pass: fix remaining dark/txt/border refs and broken overview strings.
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

const CODE_RE = /<code style=\{\{[^}]+\}\}>/g

function fixContent(content) {
  let c = content
  const orig = c

  c = c.replace(CODE_RE, '<code className="tool-inline-code">')
  c = c.replace(/<strong style=\{\{\s*color:\s*txt\s*\}\}>/g, '<strong>')
  c = c.replace(/<span style=\{\{\s*fontSize:\s*'0\.85rem',\s*color:\s*sub,\s*lineHeight:\s*1\.6\s*\}\}>/g, '<span className="tool-layout-cando-item__text">')

  // Can-do rows (flex-shrink variant)
  c = c.replace(
    /<div key=\{i\} style=\{\{\s*display:\s*'flex'[^}]+\}\}>\s*<div style=\{\{\s*width:\s*6[^}]+\}\}\s*\/>\s*<span[^>]+>\{item\}<\/span>\s*<\/div>/g,
    '<div key={i} className="tool-layout-cando-item"><div className="tool-layout-cando-item__dot" /><span className="tool-layout-cando-item__text">{item}</span></div>',
  )

  // Project task wrapper still inline
  c = c.replace(
    /<div style=\{\{\s*padding:\s*'1\.5rem',\s*borderRadius:\s*16,\s*background:\s*dark \? `\$\{color\}08` : `\$\{color\}06`,\s*border:\s*`2px solid \$\{color\}28`,\s*marginBottom:\s*'1\.25rem'\s*\}\}>/g,
    '<div className="tool-layout-task">',
  )

  // Cost boxes with custom colors
  c = c.replace(
    /<div style=\{\{\s*padding:\s*'0\.625rem 0\.875rem'[^}]+\}\}>\s*<span style=\{\{\s*fontFamily:[^}]+\}\}>([^<]+)<\/span>\s*<\/div>/g,
    (_, text) => `<div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">${text}</span></div>`,
  )

  // Green/success note boxes
  c = c.replace(
    /<div style=\{\{\s*padding:\s*'0\.75rem 1rem'[^}]*rgba\(74,222,128[^}]+\}\}>/g,
    '<div className="tool-success-note">',
  )

  // Highlight boxes with color var
  c = c.replace(
    /<div style=\{\{\s*padding:\s*'0\.75rem 1rem'[^}]*`\$\{color\}[^}]+\}\}>/g,
    '<div className="tool-helper-highlight" style={{ \'--tool-color\': color }}>',
  )

  // Fix broken overview strings that contain literal JSX/code markup
  c = c.replace(
    /overview=\{"([^"]*?)<code[^"]*?"\}/g,
    (_, prefix) => {
      // Strip any embedded fake JSX from overview — use plain text
      const cleaned = prefix
        .replace(/<code[^>]*>/g, '')
        .replace(/<\/code>/g, '')
        .replace(/\s*style=\{\{[^}]+\}\}/g, '')
        .replace(/dark \? '[^']+' : '[^']+'/g, '')
        .replace(/fontFamily:[^,]+,?\s*/g, '')
      return `overview={${JSON.stringify(cleaned.trim())}}`
    },
  )

  // Simpler overview fix: if overview still contains "dark ?"
  c = c.replace(
    /overview=\{("(?:[^"\\]|\\.)*dark \?[^"]*")\}/g,
    (_, str) => {
      try {
        const raw = JSON.parse(str)
        const plain = raw
          .replace(/<code[^>]*>/gi, '')
          .replace(/<\/code>/gi, '')
          .replace(/style=\{\{[^}]+\}\}/g, '')
          .replace(/fontFamily:\s*"[^"]+",?\s*/g, '')
          .replace(/fontSize:\s*'[^']+',?\s*/g, '')
          .replace(/background:\s*dark \? '[^']+' : '[^']+',?\s*/g, '')
          .replace(/padding:\s*'[^']+',?\s*/g, '')
          .replace(/borderRadius:\s*\d+,?\s*/g, '')
          .replace(/,\s*color\s*/g, ' ')
          .replace(/\s{2,}/g, ' ')
        return `overview={${JSON.stringify(plain)}}`
      } catch {
        return `overview={${str}}`
      }
    },
  )

  // Command list items in GeminiCLI
  c = c.replace(
    /<div key=\{i\} style=\{\{\s*padding:[^}]+\}\}>\{cmd\}<\/div>/g,
    '<div key={i} className="tool-code-block">{cmd}</div>',
  )

  if (c !== orig) return c
  return null
}

let fixed = 0
for (const file of walk(ailabRoot)) {
  if (file.includes('AILabPage.jsx')) continue
  const content = fs.readFileSync(file, 'utf8')
  if (!/\bdark\b|\btxt\b|\bborder\b|overview=\{"/.test(content)) continue
  const next = fixContent(content)
  if (next) {
    fs.writeFileSync(file, next, 'utf8')
    fixed++
    console.log('fixed:', path.relative(ailabRoot, file))
  }
}
console.log('Total fixed:', fixed)

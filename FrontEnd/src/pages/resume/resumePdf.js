/**
 * ATS-grade resume PDF generator.
 *
 * Unlike an html2canvas screenshot, this renders REAL selectable text with jsPDF,
 * so an Applicant Tracking System can parse every word, and every link (email,
 * phone, LinkedIn, GitHub, portfolio, project URLs) is genuinely clickable.
 *
 * Structure & sizing follow a clean single-column ATS layout:
 *   Name (12pt bold) → contact (labels 11pt bold, values 10pt) →
 *   uppercase section headings with a rule (11pt bold) → all other text (10pt).
 * Pure black on white — no columns, tables, icons or graphics.
 */

const INK = [17, 17, 17]
const LINKC = [5, 99, 193] // hyperlink blue (like a standard resume)

function withProto(url) {
  if (!url) return url
  return /^https?:\/\//i.test(url) ? url : `https://${url}`
}
function cleanUrl(url) {
  return String(url || '').trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '')
}
const nonEmpty = (a) => Array.isArray(a) && a.some(Boolean)

// "Bachelor of Technology" + "Computer Science and Engineering"
// → "Bachelor of Technology in Computer Science and Engineering".
function formatDegree(e = {}) {
  const degree = (e.degree || '').trim()
  const branch = (e.branch || '').trim()
  if (degree && branch) return `${degree} in ${branch}`
  return degree || branch || ''
}

export async function buildAndSaveResumePdf(resume) {
  const jspdf = await import('jspdf')
  const JsPDF = jspdf.jsPDF || jspdf.default
  const doc = new JsPDF({ unit: 'pt', format: 'a4', compress: true })

  const PAGE_W = doc.internal.pageSize.getWidth()
  const PAGE_H = doc.internal.pageSize.getHeight()
  const M = 50
  const CONTENT_W = PAGE_W - M * 2
  const r = resume || {}

  // One font (Helvetica ≈ Arial) + a fixed 3-size scale used everywhere:
  // NAME for the name, HEAD for every section heading, BODY for ALL other text.
  const NAME_SZ = 12
  const HEAD_SZ = 11
  const BODY_SZ = 10

  doc.setTextColor(...INK)
  doc.setDrawColor(...INK)

  let y = 54

  const ensure = (h) => { if (y + h > PAGE_H - M) { doc.addPage(); y = 54 } }
  const font = (style = 'normal', size = 10) => { doc.setFont('helvetica', style); doc.setFontSize(size) }

  // ── Name (centered) ──
  font('bold', NAME_SZ)
  ensure(24)
  doc.text((r.fullName || 'YOUR NAME').toUpperCase(), PAGE_W / 2, y, { align: 'center' })
  y += 15

  // ── Contact (centered, wraps): bold labels + coloured clickable links ──
  const contact = [
    r.email && { label: 'Email', text: r.email, url: `mailto:${r.email}` },
    r.mobile && { label: 'Mobile', text: String(r.mobile) }, // plain black, no link
    r.linkedin && { label: 'LinkedIn', text: cleanUrl(r.linkedin), url: withProto(r.linkedin) },
    r.github && { label: 'GitHub', text: cleanUrl(r.github), url: withProto(r.github) },
    r.portfolio && { label: 'Portfolio', text: cleanUrl(r.portfolio), url: withProto(r.portfolio) },
  ].filter(Boolean)

  if (contact.length) {
    const SIZE = BODY_SZ
    const sep = '  |  '
    const measure = (it) => {
      font('bold', 11); const lw = doc.getTextWidth(`${it.label}: `)
      font('normal', SIZE); const vw = doc.getTextWidth(it.text)
      return { ...it, lw, vw, w: lw + vw }
    }
    font('normal', SIZE); const sepW = doc.getTextWidth(sep)
    const items = contact.map(measure)

    // Wrap into centered rows that fit the content width.
    const rows = []
    let row = [], rowW = 0
    items.forEach((it) => {
      const add = it.w + (row.length ? sepW : 0)
      if (rowW + add > CONTENT_W && row.length) { rows.push(row); row = []; rowW = 0 }
      row.push(it); rowW += it.w + (row.length > 1 ? sepW : 0)
    })
    if (row.length) rows.push(row)

    rows.forEach((rw) => {
      ensure(13)
      const total = rw.reduce((s, it) => s + it.w, 0) + sepW * (rw.length - 1)
      let x = (PAGE_W - total) / 2
      rw.forEach((it, i) => {
        font('bold', 11); doc.setTextColor(...INK)
        doc.text(`${it.label}: `, x, y); x += it.lw
        font('normal', SIZE)
        if (it.url) { doc.setTextColor(...LINKC); doc.textWithLink(it.text, x, y, { url: it.url }) }
        else { doc.setTextColor(...INK); doc.text(it.text, x, y) }
        x += it.vw
        doc.setTextColor(...INK)
        if (i < rw.length - 1) { doc.text(sep, x, y); x += sepW }
      })
      y += 13
    })
    doc.setTextColor(...INK)
  }
  y += 12

  // ── Reusable blocks ──
  const heading = (title) => {
    ensure(30)
    y += 8
    font('bold', HEAD_SZ)
    doc.text(String(title).toUpperCase(), M, y)
    y += 5
    doc.setLineWidth(1.4)
    doc.line(M, y, PAGE_W - M, y)
    y += 13
  }

  const paragraph = (str, { size = BODY_SZ, style = 'normal', gap = 13.5, width = CONTENT_W, x = M } = {}) => {
    if (!str) return
    font(style, size)
    doc.splitTextToSize(String(str), width).forEach((ln) => { ensure(gap); doc.text(ln, x, y); y += gap })
  }

  const bullet = (str, { size = BODY_SZ, gap = 13.5, indent = 22 } = {}) => {
    if (!str) return
    font('normal', size)
    const lines = doc.splitTextToSize(String(str), CONTENT_W - indent)
    lines.forEach((ln, i) => {
      ensure(gap)
      if (i === 0) doc.text('•', M + 10, y)
      doc.text(ln, M + indent, y)
      y += gap
    })
  }

  // Left title (bold) + right meta (dates/score), same baseline.
  const titleRow = (left, right, { size = BODY_SZ, rightLink, bold = true } = {}) => {
    ensure(14)
    font(bold ? 'bold' : 'normal', size)
    doc.text(String(left || ''), M, y)
    if (right) {
      font('normal', size)
      const w = doc.getTextWidth(String(right))
      const x = PAGE_W - M - w
      if (rightLink) doc.textWithLink(String(right), x, y, { url: rightLink })
      else doc.text(String(right), x, y)
    }
    y += 14
  }

  const subRow = (left, right) => {
    if (!left && !right) return
    ensure(13)
    font('normal', BODY_SZ)
    if (left) doc.text(String(left), M, y)
    if (right) {
      font('normal', BODY_SZ)
      const w = doc.getTextWidth(String(right))
      doc.text(String(right), PAGE_W - M - w, y)
    }
    y += 13
  }

  // Inline label + clickable link on one line, e.g. "Live: example.com".
  const linkRow = (label, url) => {
    if (!url) return
    ensure(13)
    font('normal', BODY_SZ)
    const lbl = `${label}: `
    doc.setTextColor(...INK)
    doc.text(lbl, M + 13, y)
    const lw = doc.getTextWidth(lbl)
    doc.setTextColor(...LINKC)
    doc.textWithLink(cleanUrl(url), M + 13 + lw, y, { url: withProto(url) })
    doc.setTextColor(...INK)
    y += 13
  }

  // ── Sections ──
  if (r.objective) {
    heading('Career Objective')
    paragraph(r.objective)
  }

  if (nonEmpty(r.education)) {
    heading('Education')
    r.education.filter(e => e && (e.degree || e.branch || e.college)).forEach((e, i) => {
      if (i > 0) y += 3
      titleRow(formatDegree(e) || 'Degree', e.years, { bold: false })
      subRow(e.college, e.cgpa)
    })
  }

  if (nonEmpty(r.skills)) {
    heading('Technical Skills')
    const rows = r.skills.filter(s => s && (s.category || s.value))
    // Bullet, then a bold category, then the value aligned to a shared column.
    const catX = M + 22
    font('bold', BODY_SZ)
    let maxCat = 0
    rows.forEach(s => { maxCat = Math.max(maxCat, doc.getTextWidth(String(s.category || ''))) })
    const valX = Math.min(catX + maxCat + 22, M + 256)
    rows.forEach((s) => {
      font('normal', BODY_SZ)
      const valLines = doc.splitTextToSize(String(s.value || ''), PAGE_W - M - valX)
      ensure(14)
      doc.text('•', M + 10, y)
      font('bold', BODY_SZ); doc.text(String(s.category || ''), catX, y)
      font('normal', BODY_SZ); if (valLines[0]) doc.text(valLines[0], valX, y)
      y += 14
      for (let i = 1; i < valLines.length; i++) { ensure(14); doc.text(valLines[i], valX, y); y += 14 }
    })
  }

  if (nonEmpty(r.projects)) {
    heading('Projects')
    r.projects.filter(p => p && (p.name || p.link || nonEmpty(p.points))).forEach((p, i) => {
      if (i > 0) y += 4
      titleRow(p.name || 'Project', null)
      // Single project link — label as GitHub for repo URLs, else Live.
      if (p.link) linkRow(/github\.com/i.test(p.link) ? 'GitHub' : 'Live', p.link)
      ;(p.points || []).filter(Boolean).forEach((pt) => bullet(pt))
    })
  }

  if (nonEmpty(r.internships)) {
    heading('Internships')
    r.internships.filter(it => it && (it.role || it.company || nonEmpty(it.points))).forEach((it, i) => {
      if (i > 0) y += 4
      titleRow(it.role || 'Role', it.duration)
      if (it.company) subRow(it.company, null)
      ;(it.points || []).filter(Boolean).forEach((pt) => bullet(pt))
    })
  }

  if (nonEmpty(r.achievements)) {
    heading('Achievements')
    r.achievements.filter(Boolean).forEach((a) => bullet(a))
  }

  if (nonEmpty(r.certificates)) {
    heading('Certificates')
    r.certificates.filter(Boolean).forEach((c) => bullet(c))
  }

  if (nonEmpty(r.softSkills)) {
    heading('Soft Skills')
    r.softSkills.filter(Boolean).forEach((s) => bullet(s))
  }

  const safe = (r.fullName || 'resume').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase()
  doc.save(`${safe || 'resume'}.pdf`)
}

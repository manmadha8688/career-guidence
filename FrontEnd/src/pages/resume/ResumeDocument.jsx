import { forwardRef } from 'react'
import { safeExternalUrl } from '../../utils/safeExternalUrl'

/**
 * Printable resume — fixed light colors (white paper, ink text) so the PDF is
 * print-ready and identical in any app theme. Only the accent color varies.
 *
 * Layout mirrors a classic single-page ATS resume:
 *   Name → contact lines → Career Objective → Education → Technical Skills
 *   (categorized) → Projects → Certificates → Soft Skills.
 */
const ResumeDocument = forwardRef(function ResumeDocument({ resume }, ref) {
  const r = resume || {}
  const has = (a) => Array.isArray(a) && a.length > 0
  const eduEntries = (r.education || []).filter(e => e && (e.degree || e.branch || e.college))

  // Contact rendered as labeled items, joined with separators — like the source resume.
  const contacts = [
    r.email && safeExternalUrl(`mailto:${r.email}`) && { label: 'Email', value: r.email, href: safeExternalUrl(`mailto:${r.email}`) },
    r.mobile && { label: 'Mobile', value: r.mobile },
    r.linkedin && safeExternalUrl(r.linkedin) && { label: 'LinkedIn', value: cleanUrl(r.linkedin), href: safeExternalUrl(r.linkedin) },
    r.github && safeExternalUrl(r.github) && { label: 'GitHub', value: cleanUrl(r.github), href: safeExternalUrl(r.github) },
    r.portfolio && safeExternalUrl(r.portfolio) && { label: 'Portfolio', value: cleanUrl(r.portfolio), href: safeExternalUrl(r.portfolio) },
  ].filter(Boolean)

  return (
    <div className="rz-doc" ref={ref}>
      {/* Header */}
      <header className="rz-doc__head">
        <h1 className="rz-doc__name">{r.fullName || 'YOUR NAME'}</h1>
        {contacts.length > 0 && (
          <div className="rz-doc__contact">
            {contacts.map((c, i) => (
              <span key={i} className="rz-doc__contact-item">
                <span className="rz-doc__contact-label">{c.label}:</span>{' '}
                {c.href
                  ? <a href={c.href} className="rz-doc__link" target="_blank" rel="noopener noreferrer">{c.value}</a>
                  : c.value}
              </span>
            ))}
          </div>
        )}
      </header>

      {r.objective && (
        <Section title="Career Objective">
          <p className="rz-doc__objective">{r.objective}</p>
        </Section>
      )}

      {has(eduEntries) && (
        <Section title="Education">
          {eduEntries.map((e, i) => (
            <div key={i} className="rz-doc__edu">
              <div className="rz-doc__edu-row">
                <span className="rz-doc__edu-degree">{formatDegree(e) || 'Degree'}</span>
                {e.years && <span className="rz-doc__edu-year">{e.years}</span>}
              </div>
              <div className="rz-doc__edu-row">
                <span className="rz-doc__edu-college">{e.college}</span>
                {e.cgpa && <span className="rz-doc__edu-year">{e.cgpa}</span>}
              </div>
            </div>
          ))}
        </Section>
      )}

      {has(r.skills) && (
        <Section title="Technical Skills">
          <div className="rz-doc__skills">
            {r.skills.filter(s => s.category || s.value).map((s, i) => (
              <div key={i} className="rz-doc__skillrow">
                <span className="rz-doc__skillcat">{s.category}</span>
                <span className="rz-doc__skillval">{s.value}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {has(r.projects) && (
        <Section title="Projects">
          {r.projects.map((p, i) => (
            <div key={i} className="rz-doc__project">
              <div className="rz-doc__project-name">{p.name || 'Project'}</div>
              {p.link && safeExternalUrl(p.link) && (
                <div className="rz-doc__project-link">
                  {/github\.com/i.test(p.link) ? 'GitHub' : 'Live'}: <a href={safeExternalUrl(p.link)} className="rz-doc__link" target="_blank" rel="noopener noreferrer">{cleanUrl(p.link)}</a>
                </div>
              )}
              {has((p.points || []).filter(Boolean)) && (
                <ul className="rz-doc__bullets">
                  {p.points.filter(Boolean).map((pt, j) => <li key={j}>{pt}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {has(r.internships) && r.internships.some(it => it && (it.role || it.company)) && (
        <Section title="Internships">
          {r.internships.filter(it => it && (it.role || it.company || has((it.points || []).filter(Boolean)))).map((it, i) => (
            <div key={i} className="rz-doc__project">
              <div className="rz-doc__edu-row">
                <span className="rz-doc__project-name">{it.role || 'Role'}</span>
                {it.duration && <span className="rz-doc__edu-year">{it.duration}</span>}
              </div>
              {it.company && <div className="rz-doc__edu-college">{it.company}</div>}
              {has((it.points || []).filter(Boolean)) && (
                <ul className="rz-doc__bullets">
                  {it.points.filter(Boolean).map((pt, j) => <li key={j}>{pt}</li>)}
                </ul>
              )}
            </div>
          ))}
        </Section>
      )}

      {has((r.achievements || []).filter(Boolean)) && (
        <Section title="Achievements">
          <ul className="rz-doc__bullets">
            {r.achievements.filter(Boolean).map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </Section>
      )}

      {has((r.certificates || []).filter(Boolean)) && (
        <Section title="Certificates">
          <ul className="rz-doc__bullets">
            {r.certificates.filter(Boolean).map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </Section>
      )}

      {has((r.softSkills || []).filter(Boolean)) && (
        <Section title="Soft Skills">
          <ul className="rz-doc__bullets">
            {r.softSkills.filter(Boolean).map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </Section>
      )}
    </div>
  )
})

function Section({ title, children }) {
  return (
    <section className="rz-doc__section">
      <h2 className="rz-doc__section-title">{title}</h2>
      {children}
    </section>
  )
}

// Compose the degree line from degree + branch, e.g.
// "Bachelor of Technology" + "Computer Science and Engineering"
// → "Bachelor of Technology in Computer Science and Engineering".
export function formatDegree(e = {}) {
  const degree = (e.degree || '').trim()
  const branch = (e.branch || '').trim()
  if (degree && branch) return `${degree} in ${branch}`
  return degree || branch || ''
}

function cleanUrl(url) {
  return String(url).replace(/^https?:\/\//i, '').replace(/\/$/, '')
}

export default ResumeDocument

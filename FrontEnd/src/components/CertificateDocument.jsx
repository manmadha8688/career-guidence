// Presentational, print-optimized certificate. Used by the owner's view, the
// public verification page, and the PDF export — so the visual is identical
// everywhere. Formal document: no test scores, no internal ranks — only the
// details that make a credential useful (what, who, when, and how to verify).
import { badgeMeta } from '../utils/badgeMeta'
import { subjectBadgeTitle } from '../utils/subjectBadgeTitle'

function fmtDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d)) return ''
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function CertificateDocument({ cert }) {
  if (!cert) return null
  const color   = cert.color || '#9B6ED4'
  const meta    = badgeMeta(cert.badge)
  const seal    = cert.badge ? meta.icon : (cert.icon || '🏅')
  const isSubject = cert.type === 'SUBJECT'
  const earnedTitle = isSubject ? subjectBadgeTitle(cert.credentialTitle) : meta.label

  return (
    <div className="cert-doc" style={{ '--cert-color': color }}>
      <div className="cert-doc__frame" aria-hidden="true" />
      <div className="cert-doc__inner">
        <div className="cert-doc__brand">LearnForEarn · ARISE</div>
        <div className="cert-doc__kind">Certificate of {cert.credentialKind || 'Achievement'}</div>

        <div className="cert-doc__present">This is proudly presented to</div>
        <div className="cert-doc__name">{cert.recipientName || 'Student'}</div>
        <div className="cert-doc__rule" aria-hidden="true" />

        <div className="cert-doc__for">
          for successfully {isSubject ? 'demonstrating mastery of' : 'completing the career path'}
        </div>
        <div className="cert-doc__credential">
          <span aria-hidden="true">{cert.icon || '📚'}</span>
          <span>{cert.credentialTitle}</span>
        </div>
        <div className="cert-doc__distinction">
          <span aria-hidden="true">{seal}</span> Hunter title earned — <strong>{earnedTitle}</strong>
        </div>

        <div className="cert-doc__details">
          <div className="cert-doc__detail">
            <div className="cert-doc__detail-label">Credential Type</div>
            <div className="cert-doc__detail-value">{cert.credentialKind || 'Achievement'}</div>
          </div>
          <div className="cert-doc__detail">
            <div className="cert-doc__detail-label">Issued On</div>
            <div className="cert-doc__detail-value">{fmtDate(cert.issuedAt)}</div>
          </div>
          <div className="cert-doc__detail">
            <div className="cert-doc__detail-label">Credential ID</div>
            <div className="cert-doc__detail-value cert-doc__detail-value--mono">{cert.code}</div>
          </div>
        </div>

        <div className="cert-doc__footer">
          <div className="cert-doc__sig">
            <div className="cert-doc__sig-name">LearnForEarn</div>
            <div className="cert-doc__sig-label">Issuing Authority</div>
          </div>
          <div className="cert-doc__seal" aria-hidden="true">{seal}</div>
          <div className="cert-doc__verify">
            <div className="cert-doc__verify-strong">Verify this credential</div>
            <div className="cert-doc__verify-label">learnforearn.in/certificate/verify</div>
          </div>
        </div>
      </div>
    </div>
  )
}

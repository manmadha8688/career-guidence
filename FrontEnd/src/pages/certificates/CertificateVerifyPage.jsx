import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Home, Search, Loader2 } from 'lucide-react'
import Navbar from '../../components/navbars/Navbar'
import CertificateDocument from '../../components/CertificateDocument'
import { verifyCertificate } from '../../api/api'
import '../../styles/pages/shared/certificates.css'

const EASE = [0.16, 1, 0.3, 1]

export default function CertificateVerifyPage() {
  const { code: codeParam } = useParams()
  const navigate = useNavigate()
  const [code, setCode]       = useState(codeParam || '')
  const [result, setResult]   = useState(null)   // null until a check has run
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)

  const runVerify = (raw) => {
    const c = (raw || '').trim().toUpperCase()
    if (!c) return
    setLoading(true)
    verifyCertificate(c)
      .then(r => setResult(r.data))
      .catch(() => setResult({ valid: false }))
      .finally(() => { setLoading(false); setChecked(true) })
  }

  // If a code was passed in the URL (a shared verification link), check it immediately.
  useEffect(() => {
    if (codeParam) runVerify(codeParam)
  }, [codeParam])

  const onSubmit = (e) => {
    e.preventDefault()
    runVerify(code)
  }

  const valid = result?.valid

  return (
    <div className="cred-page">
      <Navbar sticky />

      <header className="cred-hero cred-hero--verify">
        <div className="cred-hero__fx" aria-hidden="true" />
        <motion.div
          className="cred-hero__inner cred-hero__inner--center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <h1 className="cred-hero__title">Verify a LearnForEarn Certificate</h1>
          <p className="cred-hero__sub cred-hero__sub--center">
            Enter the unique credential ID (e.g. <strong>LFE-XXXXXXXX</strong>) printed on any
            certificate to instantly confirm whether it is genuine.
          </p>

          <form className="cert-verify-form" onSubmit={onSubmit}>
            <div className="cert-verify-input-wrap">
              <Search size={16} className="cert-verify-input-icon" aria-hidden="true" />
              <input
                className="form-input cert-verify-input"
                placeholder="Enter credential ID…"
                aria-label="Certificate credential ID"
                value={code}
                onChange={e => setCode(e.target.value)}
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading || !code.trim()}>
              {loading ? <><Loader2 size={15} className="cert-spin" /> Checking…</> : <>Verify</>}
            </button>
          </form>
        </motion.div>
      </header>

      <main className="cred-body cred-body--narrow">
        {checked && !loading && (
          valid ? (
            <motion.div
              className="cert-verify-result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="cert-verify-status is-valid">
                <CheckCircle size={16} /> VERIFIED · Genuine credential · {result.code}
              </span>
              <CertificateDocument cert={result} />
            </motion.div>
          ) : (
            <motion.div
              className="cert-verify-invalid"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span className="cert-verify-status is-invalid">
                <XCircle size={16} /> NOT VALID
              </span>
              <p className="cred-hero__sub cred-hero__sub--center" style={{ margin: '0 auto 1.2rem' }}>
                No certificate matches the code <strong>{code.trim().toUpperCase()}</strong>.
                This credential could not be verified.
              </p>
              <button className="btn btn-ghost btn-sm" onClick={() => navigate('/')}>
                <Home size={14} /> Go home
              </button>
            </motion.div>
          )
        )}
      </main>
    </div>
  )
}

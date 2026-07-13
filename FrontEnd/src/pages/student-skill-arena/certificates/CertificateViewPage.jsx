import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import SystemAwakeningLoader from '../../../components/loaders/SystemAwakeningLoader'
import CertificateDocument from '../../../components/CertificateDocument'
import { getCertificate } from '../../../api/api'
import { getApiError } from '../../../utils/apiError'
import { PAGE_MIN_MS } from '../../../components/loaders/_config'

const EASE = [0.16, 1, 0.3, 1]

export default function CertificateViewPage() {
  const { id } = useParams()
  const [cert, setCert]       = useState(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)
  const docRef = useRef(null)

  useEffect(() => {
    let active = true
    let timer
    getCertificate(id)
      .then(r => { if (active) setCert(r.data) })
      .catch(err => { if (active) toast.error(getApiError(err, 'We could not load this certificate.')) })
      .finally(() => { timer = setTimeout(() => { if (active) setLoading(false) }, PAGE_MIN_MS) })
    return () => { active = false; clearTimeout(timer) }
  }, [id])

  // Direct PDF download — capture the certificate node and save it, no print dialog.
  const downloadPdf = async () => {
    if (!docRef.current || downloading) return
    setDownloading(true)
    try {
      const [{ default: html2canvas }, jspdf] = await Promise.all([
        // html2canvas-pro understands modern CSS color functions (color-mix,
        // oklch, …) that the original html2canvas throws on — the certificate
        // design uses color-mix() heavily, so the plain lib failed silently.
        import('html2canvas-pro'),
        import('jspdf'),
      ])
      const JsPDF = jspdf.jsPDF || jspdf.default
      const node = docRef.current
      const canvas = await html2canvas(node, {
        scale: 2,
        backgroundColor: '#0b0b12',
        useCORS: true,
        logging: false,
      })
      const imgData = canvas.toDataURL('image/png')
      const pdf = new JsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width, canvas.height] })
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      const safeTitle = (cert?.credentialTitle || 'certificate').replace(/[^a-z0-9]+/gi, '-').toLowerCase()
      pdf.save(`${safeTitle}-${cert?.code || 'LFE'}.pdf`)
      toast.success('Certificate downloaded')
    } catch (e) {
      toast.error('Could not generate the PDF. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  if (loading) return <SystemAwakeningLoader subtitle="LOADING CERTIFICATE" />
  if (!cert) return null

  return (
    <div className="cred-page">
      <main className="cred-body cred-body--cert">
        <div className="cert-view-actions">
          <button className="btn btn-primary btn-sm" onClick={downloadPdf} disabled={downloading}>
            {downloading
              ? <><Loader2 size={14} className="cert-spin" /> Preparing…</>
              : <><Download size={14} /> Download PDF</>}
          </button>
        </div>

        <motion.div
          ref={docRef}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <CertificateDocument cert={cert} />
        </motion.div>
      </main>
    </div>
  )
}

import { Swords } from 'lucide-react'
import { NAV_LINKS } from '../landingData'
import { useLanding } from '../context/LandingPageContext'

export default function LandingFooter() {
  const { navigate, handleEnter } = useLanding()

  const onFooterLink = (link) => {
    if (!link.live) return undefined
    if (link.href) return () => navigate(link.href)
    if (link.scrollTo) return () => document.getElementById(link.scrollTo)?.scrollIntoView({ behavior: 'smooth' })
    return handleEnter
  }

  return (
    <footer className="lp-footer">
      <div className="lp-footer__brand">
        <Swords size={15} color="#9B6ED4" />
        <span className="lp-grad-text lp-footer__title">LearnToEarn</span>
      </div>
      <span className="lp-footer__tagline">Learn the skills. Earn the job.</span>
      <div className="lp-footer__links">
        {NAV_LINKS.map(link => (
          <span
            key={link.label}
            className={`lp-footer__link${link.live ? '' : ' lp-footer__link--muted'}`}
            onClick={onFooterLink(link)}
          >
            {link.label}
          </span>
        ))}
      </div>
    </footer>
  )
}

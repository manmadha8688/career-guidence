import { Swords } from 'lucide-react'
import { NAV_LINKS } from '../landingData'
import { useLanding } from '../context/LandingPageContext'

const LEGAL_LINKS = [
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
  { label: 'Terms', path: '/terms' },
  { label: 'Privacy', path: '/privacy' },
]

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
      <div className="lp-footer__main">
        <div className="lp-footer__brand-block">
          <div className="lp-footer__brand">
            <Swords size={15} color="#9B6ED4" />
            <span className="lp-grad-text lp-footer__title">learnforearn</span>
          </div>
          <span className="lp-footer__tagline">Learn the skills. Earn the job.</span>
        </div>

        <div className="lp-footer__links">
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              type="button"
              className={`lp-footer__link${link.live ? '' : ' lp-footer__link--muted'}`}
              onClick={onFooterLink(link)}
              disabled={!link.live}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      <div className="lp-footer__legal">
        {LEGAL_LINKS.map(link => (
          <button
            key={link.label}
            type="button"
            className="lp-footer__legal-link"
            onClick={() => navigate(link.path)}
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="lp-footer__copy">© {new Date().getFullYear()} learnforearn · Free for students</div>
    </footer>
  )
}

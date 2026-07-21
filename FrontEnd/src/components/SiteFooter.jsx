import { Link } from 'react-router-dom'
import { Swords, Mail, ArrowUpRight, Heart, LifeBuoy, ShieldCheck, Handshake } from 'lucide-react'
import '../styles/site-footer.css'

const CONTACT_EMAILS = [
  { icon: Mail, label: 'General', email: 'hello@learnforearn.in' },
  { icon: LifeBuoy, label: 'Support', email: 'help@learnforearn.in' },
  { icon: ShieldCheck, label: 'Privacy', email: 'privacy@learnforearn.in' },
  { icon: Handshake, label: 'Partnerships', email: 'partnerships@learnforearn.in' },
]

const FOOTER_COLUMNS = [
  {
    title: 'Learn',
    links: [
      { label: 'Skills Arena', to: '/skill-arena/dashboard' },
      { label: 'Code GYM', to: '/code-gym' },
      { label: 'Aptitude', to: '/aptitude' },
      { label: 'AI Lab', to: '/ai-lab' },
      { label: 'Deploy Guidance', to: '/deployment' },
    ],
  },
  {
    title: 'Grow',
    links: [
      { label: 'Missions', to: '/missions' },
      { label: 'Resume Studio', to: '/resume' },
      { label: 'Walk-In Jobs', to: '/walk-ins' },
      { label: 'Fresher Guide', to: '/fresher-instructions' },
      { label: 'Career Guidance', to: '/fresher-instructions/career-guidance' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Terms', to: '/terms' },
      { label: 'Privacy', to: '/privacy' },
    ],
  },
]

/**
 * Global site footer — rendered once in App.jsx for every content page.
 * Uses real <a>/<Link> anchors (SEO-friendly) and the shared --lp-* theme
 * tokens so it flips correctly between dark and light modes.
 */
export default function SiteFooter() {
  const year = new Date().getFullYear()
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="site-footer__glow" aria-hidden="true" />

      <div className="site-footer__inner">
        <div className="site-footer__brand-col">
          <Link to="/" className="site-footer__brand" aria-label="LearnForEarn home">
            <span className="site-footer__logo">
              <Swords size={18} color="#fff" />
            </span>
            <span className="site-footer__brand-text">
              <span className="lp-grad-text site-footer__name">LearnForEarn</span>
              <span className="site-footer__tagline">Learn Skills. Earn Job.</span>
            </span>
          </Link>

          <p className="site-footer__mission">
            A platform that takes Indian graduates from fresher to
            hired — career roadmaps, real coding problems, project missions and
            hands-on AI skills.
          </p>

          <div className="site-footer__cta-row">
            <Link to="/skill-arena/dashboard" className="site-footer__cta">
              Start Learning <ArrowUpRight size={15} />
            </Link>
            
          </div>
        </div>

        <nav className="site-footer__links" aria-label="Footer">
          {FOOTER_COLUMNS.map(col => (
            <div key={col.title} className="site-footer__col">
              <h3 className="site-footer__col-title">{col.title}</h3>
              <ul className="site-footer__col-list">
                {col.links.map(link => (
                  <li key={link.label}>
                    <Link to={link.to} className="site-footer__link">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <section className="site-footer__contact" aria-label="Contact us">
        <h3 className="site-footer__col-title">Contact Us</h3>
        <div className="site-footer__contact-grid">
          {CONTACT_EMAILS.map(({ icon: Icon, label, email }) => (
            <a
              key={email}
              href={`mailto:${email}`}
              rel="noopener"
              className="site-footer__contact-item"
            >
              <span className="site-footer__contact-icon"><Icon size={16} /></span>
              <span className="site-footer__contact-text">
                <span className="site-footer__contact-label">{label}</span>
                <span className="site-footer__contact-email">{email}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <div className="site-footer__bar">
        <p className="site-footer__copy">© {year} LearnForEarn</p>
        <p className="site-footer__made">
          Built for students, with <Heart size={12} className="site-footer__heart" /> in India
        </p>
        <button type="button" className="site-footer__top" onClick={scrollTop}>
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}

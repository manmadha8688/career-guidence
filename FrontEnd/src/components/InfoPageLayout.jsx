import Navbar from './navbars/Navbar'
import '../styles/pages/shared/info-pages.css'

/**
 * Shared shell for About / Contact / Terms / Privacy.
 * Global navbar + full-bleed hero band + wide content column.
 * (The global SiteFooter from App.jsx renders the footer.)
 */
export default function InfoPageLayout({ eyebrow, title, lede, updated, children }) {
  return (
    <div className="info-page">
      <Navbar sticky />

      <header className="info-hero">
        <div className="info-hero__glow" aria-hidden="true" />
        <div className="info-hero__inner">
          {eyebrow && <span className="info-hero__eyebrow">{eyebrow}</span>}
          <h1 className="info-hero__title">{title}</h1>
          {lede && <p className="info-hero__lede">{lede}</p>}
          {updated && <div className="info-hero__updated">Last updated · {updated}</div>}
        </div>
      </header>

      <main className="info-page__body">
        {children}
      </main>
    </div>
  )
}

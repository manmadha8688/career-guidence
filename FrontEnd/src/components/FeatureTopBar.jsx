import { ChevronLeft, Sun, Moon, Swords } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import EnterArenaButton from './EnterArenaButton'

/**
 * Slim top bar for standalone feature pages (My Profile, My Bookmarks).
 * Left: back chevron + learnforearn brand.  Right: page actions + theme + Enter Arena.
 */
export default function FeatureTopBar({ actions = null }) {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="feat-topbar">
      <div className="feat-topbar__left">
        <button
          type="button"
          className="feat-topbar__back"
          onClick={() => navigate(-1)}
          aria-label="Go back"
          title="Back"
        >
          <ChevronLeft size={18} />
        </button>
        <Link to="/" className="feat-topbar__brand-wrap" title="learnforearn home">
          <span className="feat-topbar__logo"><Swords size={14} color="#fff" /></span>
          <span className="lp-grad-text feat-topbar__brand">learnforearn</span>
        </Link>
      </div>

      <div className="feat-topbar__right">
        {actions}
        <button
          type="button"
          className="lp-btn-icon"
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <EnterArenaButton />
      </div>
    </nav>
  )
}

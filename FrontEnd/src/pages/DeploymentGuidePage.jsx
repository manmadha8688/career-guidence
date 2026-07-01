import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Search, X, ExternalLink } from 'lucide-react'
import { STACKS, PLATFORMS } from './deployment/guideIndex'

const DB_TAGS = ['database', 'mongodb', 'nosql', 'sql', 'postgresql', 'neon', 'supabase', 'atlas', 'storage', 'cloudinary']
const ML_TAGS = ['machine learning', 'ml', 'data science', 'streamlit', 'hugging face', 'gradio', 'nlp', 'transformers', 'ai', 'free']

const isPlatformVisible = (platform, filter) => {
  if (filter === 'all') return true
  if (filter === 'frontend') return platform.stackType === 'frontend' || platform.stackType === 'all'
  if (filter === 'backend') return platform.stackType === 'backend' || platform.stackType === 'all'
  if (filter === 'fullstack') return true
  if (filter === 'database') return platform.tags?.some(t => DB_TAGS.includes(t))
  if (filter === 'mldata') return platform.stackType === 'mldata' || platform.tags?.some(t => ML_TAGS.includes(t))
  return true
}

const FILTER_BANNERS = {
  mldata: {
    color: '#FF4B4B',
    icon: '🤖',
    title: 'Deploy AI & ML Projects Online',
    desc: 'Streamlit, Gradio, HF Spaces — ML models, AI demos, chatbots, NLP, image AI — all free',
    chips: ['1. Train model', '2. joblib.dump()', '3. Write app.py', '4. Push to GitHub', '✅ Live demo URL'],
  },
  database: {
    color: '#A78BFA',
    icon: '🗄️',
    title: 'Free Database Setup',
    desc: 'MongoDB Atlas · Neon PostgreSQL · Supabase · Render PostgreSQL — connect to any framework',
  },
  frontend: {
    color: '#60A5FA',
    icon: '⚛️',
    title: 'Frontend Deployment',
    desc: 'HTML/CSS/JS, React, and Next.js — push to GitHub and go live in minutes for free',
    chips: ['HTML/CSS/JS → GitHub Pages', 'React/Vite → Vercel', 'Next.js → Vercel'],
  },
  backend: {
    color: '#4ADE80',
    icon: '🖥',
    title: 'Backend API Deployment',
    desc: 'Django, FastAPI, Flask, Node.js, Spring Boot — deploy REST APIs to Render for free',
    chips: ['Python → Render', 'Node.js → Render', 'Spring Boot → Docker + Render'],
  },
  fullstack: {
    color: '#61DAFB',
    icon: '🔷',
    title: 'Full Stack Deployment',
    desc: 'MERN, Next.js, Django Full Stack — frontend + backend + database, all connected free',
    chips: ['MERN → Vercel + Render + Atlas', 'Next.js → Vercel', 'Django Full Stack → Render'],
  },
}

const SEARCH_PLACEHOLDERS = {
  mldata: 'Search — "chatbot", "nlp", "image ai", "rag", "streamlit", "gradio"…',
  database: 'Search — "mongodb", "postgresql", "neon", "supabase"…',
  frontend: 'Search — "react", "html", "next.js", "vercel"…',
  backend: 'Search — "django", "node.js", "flask", "fastapi", "spring boot"…',
  fullstack: 'Search — "mern", "next.js", "django full stack", "react"…',
  all: 'Search — "react", "django", "mongodb", "postgres"…',
}

const FILTER_OPTIONS = [
  { key: 'all', label: 'All', icon: '🌐' },
  { key: 'frontend', label: 'Frontend', icon: '⚛️' },
  { key: 'backend', label: 'Backend', icon: '🖥' },
  { key: 'fullstack', label: 'Full Stack', icon: '🔷' },
  { key: 'database', label: 'Database', icon: '🗄️' },
  { key: 'mldata', label: 'AI & ML', icon: '🤖' },
]

function FilterBanner({ filterKey }) {
  const banner = FILTER_BANNERS[filterKey]
  if (!banner) return null
  return (
    <div className="deploy-banner" style={{ '--banner-color': banner.color }}>
      <div className="deploy-banner__row">
        <span className="deploy-banner__icon">{banner.icon}</span>
        <h1 className="deploy-banner__title">{banner.title}</h1>
      </div>
      <p className={`deploy-banner__desc${banner.chips ? '' : ' deploy-banner__desc--flush'}`}>{banner.desc}</p>
      {banner.chips && (
        <div className="deploy-banner__chips">
          {banner.chips.map((step, i) => (
            <span key={i} className="deploy-banner__chip">{step}</span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function DeploymentGuidePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const [search, setSearch] = useState('')
  const [filterStack, setFilter] = useState('all')

  const q = search.trim().toLowerCase()

  const scoreItem = (item) => {
    if (!q) return 0
    const id = (item.id || '').toLowerCase()
    const title = (item.title || item.name || '').toLowerCase()
    const subtitle = (item.subtitle || '').toLowerCase()
    const desc = (item.desc || '').toLowerCase()
    const tags = item.tags || []
    let score = 0
    if (id === q || id.replace(/-/g, ' ') === q) score += 120
    else if (id.startsWith(q)) score += 80
    else if (id.includes(q)) score += 30
    if (title === q) score += 110
    else if (title.startsWith(q)) score += 70
    else if (title.includes(q)) score += 50
    if (subtitle.startsWith(q)) score += 40
    else if (subtitle.includes(q)) score += 25
    if (tags.some(t => t === q)) score += 60
    else if (tags.some(t => t.startsWith(q))) score += 35
    else if (tags.some(t => t.includes(q))) score += 15
    if (desc.includes(q)) score += 8
    return score
  }

  const matchSearch = item => !q || scoreItem(item) > 0
  const matchStack = item =>
    filterStack === 'all' || item.stackType === filterStack || item.stackType === 'all'

  const visibleStacks = STACKS
    .filter(s => matchSearch(s) && matchStack(s))
    .sort((a, b) => scoreItem(b) - scoreItem(a))

  const visiblePlatforms = PLATFORMS
    .filter(p => isPlatformVisible(p, filterStack) && matchSearch(p))
    .sort((a, b) => scoreItem(b) - scoreItem(a))

  const hasFilters = filterStack !== 'all' || !!search
  const clearFilters = () => { setFilter('all'); if (search) setSearch('') }

  const openGuide = (route) => {
    if (!user) { navigate(`/login?redirect=${encodeURIComponent(route)}`); return }
    navigate(route)
  }

  const sectionIcon = filterStack === 'database' ? '🗄️' : filterStack === 'mldata' ? '🤖' : '📦'
  const sectionLabel = filterStack === 'database' ? 'Database' : filterStack === 'mldata' ? 'AI & ML' : 'Deployment'
  const activeFilter = FILTER_OPTIONS.find(o => o.key === filterStack)

  return (
    <div className="deploy-hub-page">

      <nav className="deploy-nav">
        <button type="button" onClick={() => navigate('/')} className="deploy-nav__back">
          <ArrowLeft size={15} />
          Home
        </button>
        <span className="deploy-nav__title">DEPLOY GUIDE</span>
        <button type="button" onClick={toggleTheme} className="deploy-nav__theme">
          {dark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
      </nav>

      <div className="deploy-hub-layout">

        <aside className="deploy-sidebar">
          <div className="deploy-sidebar__label">Filter Guides</div>
          <div className="deploy-sidebar__group">
            <div className="deploy-sidebar__group-label">Category</div>
            {FILTER_OPTIONS.map(opt => (
              <button
                key={opt.key}
                type="button"
                onClick={() => setFilter(opt.key)}
                className={`deploy-filter-btn${filterStack === opt.key ? ' deploy-filter-btn--active' : ''}`}
              >
                <span className="deploy-filter-btn__icon">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
          {hasFilters && (
            <button type="button" onClick={clearFilters} className="deploy-sidebar__clear">
              <X size={11} /> Show all
            </button>
          )}
        </aside>

        <main className="deploy-hub-main">
          <div className="deploy-hub-header">
            {filterStack !== 'all' ? (
              <FilterBanner filterKey={filterStack} />
            ) : (
              <>
                <h1 className="deploy-hub-title">
                  <span className="deploy-hub-title__grad">Deploy Your Project</span>
                  <span> — Go Live Free</span>
                </h1>
                <p className="deploy-hub-subtitle">Step-by-step guides · Free hosting · No credit card needed</p>
              </>
            )}
            <div className="deploy-search-wrap">
              <Search size={14} className="deploy-search-icon" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder={SEARCH_PLACEHOLDERS[filterStack] || SEARCH_PLACEHOLDERS.all}
                className="deploy-search-input"
              />
              {search && (
                <button type="button" onClick={() => setSearch('')} className="deploy-search-clear">
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {visibleStacks.length > 0 && (
            <div className="deploy-stack-section">
              <div className="deploy-section-label">
                {sectionIcon} {sectionLabel} Guides ({visibleStacks.length})
              </div>
              <div className={`deploy-stack-grid${filterStack === 'frontend' ? ' deploy-stack-grid--two-col' : ''}`}>
                {visibleStacks.map(stack => (
                  <button
                    type="button"
                    key={stack.id}
                    onClick={() => openGuide(stack.route)}
                    className="deploy-stack-card"
                    style={{ '--stack-color': stack.color }}
                  >
                    <div className="deploy-stack-card__accent" />
                    <div className="deploy-stack-card__top">
                      <span className="deploy-stack-card__emoji">{stack.emoji}</span>
                      <span className="deploy-stack-card__platform">{stack.platforms}</span>
                    </div>
                    <div>
                      <div className="deploy-stack-card__title">{stack.title}</div>
                      <div className="deploy-stack-card__subtitle">{stack.subtitle}</div>
                    </div>
                    <div className="deploy-stack-card__desc">{stack.desc}</div>
                    <div className="deploy-stack-card__tags">
                      {stack.tags.slice(0, 4).map(tag => (
                        <span key={tag} className="deploy-stack-card__tag">{tag}</span>
                      ))}
                    </div>
                    <div className="deploy-stack-card__cta">Open guide →</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {visibleStacks.length === 0 && (
            <div className="deploy-hub-empty">
              <div className="deploy-hub-empty__icon">🔍</div>
              <div className="deploy-hub-empty__title">No guides match</div>
              <div className="deploy-hub-empty__hint">Try "react", "django", "mongodb", "postgres", or "docker"</div>
              <button type="button" onClick={clearFilters} className="deploy-hub-empty__btn">Show all</button>
            </div>
          )}
        </main>

        <aside className="deploy-sidebar deploy-sidebar--right">
          <div className="deploy-sidebar__label">🆓 Free Platforms</div>
          {filterStack !== 'all' && activeFilter && (
            <div className="deploy-platform-filter-note">
              Showing: {activeFilter.icon} {activeFilter.label} only
            </div>
          )}
          <div className="deploy-platform-list">
            {visiblePlatforms.map(p => (
              <a
                key={p.name}
                href={`https://${p.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="deploy-platform-card"
                style={{ '--platform-color': p.color }}
              >
                <div className="deploy-platform-card__head">
                  <div className="deploy-platform-card__name-row">
                    <span className="deploy-platform-card__dot" />
                    <span className="deploy-platform-card__name">{p.name}</span>
                  </div>
                  <ExternalLink size={11} color={p.color} />
                </div>
                <div className="deploy-platform-card__desc">{p.desc}</div>
                <span className="deploy-platform-card__free">{p.free}</span>
              </a>
            ))}
            {visiblePlatforms.length === 0 && (
              <div className="deploy-platform-empty">No platforms for this filter</div>
            )}
          </div>
        </aside>

      </div>
    </div>
  )
}

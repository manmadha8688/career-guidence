import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/navbars/Navbar'
import { Search, X, ExternalLink } from 'lucide-react'
import { STACKS, PLATFORMS } from './deployment/guideIndex'
import '../styles/pages/shared/deployment.css'
import '../styles/pages/shared/deployment-stations.css'

const EASE = [0.16, 1, 0.3, 1]

// ── The universal journey every guide teaches — visualised once, up top ──────
const PIPELINE = [
  { key: 'code',  icon: '{ }', label: 'YOUR PROJECT',   sub: 'on your laptop' },
  { key: 'push',  icon: '⇡',   label: 'PUSH TO GITHUB', sub: 'github.com/you' },
  { key: 'build', icon: '⚙',   label: 'DEPLOYMENT INITIATED', sub: 'platform builds it' },
  { key: 'live',  icon: '◉',   label: "YOU'RE LIVE",    sub: 'your-app.live', live: true },
]

// ── Stations — the page IS the journey, ordered by how a student grows ──────
const STATIONS = [
  {
    key: 'frontend', num: '01', icon: '⚛️', color: '#60A5FA',
    title: 'Frontend', tagline: 'Your first live URL',
    desc: 'Start here. HTML sites and React apps — push to GitHub, live in minutes, free forever.',
  },
  {
    key: 'fullstack', num: '02', icon: '🔷', color: '#61DAFB',
    title: 'Full Stack', tagline: 'Frontend + backend + database, connected',
    desc: 'MERN, Next.js, Django Full Stack — the complete production setup recruiters ask about.',
  },
  {
    key: 'backend', num: '03', icon: '🖥', color: '#4ADE80',
    title: 'Backend APIs', tagline: 'Your REST API on a real server',
    desc: 'Django, FastAPI, Flask, Node.js, Spring Boot — deployed to Render with a public API URL.',
  },
  {
    key: 'mldata', num: '04', icon: '🤖', color: '#FF4B4B',
    title: 'AI & ML', tagline: 'Turn your model into a live demo',
    desc: 'Chatbots, NLP, image AI, RAG apps — Streamlit and Hugging Face Spaces, all free tiers.',
  },
  {
    key: 'apps', num: '05', icon: '🚀', color: '#5865F2',
    title: 'Bots, Apps & Automation', tagline: 'Beyond the browser',
    desc: 'Discord bots, scheduled scrapers, and React Native mobile apps — the honest free path for each, no myths.',
  },
  {
    key: 'database', num: '06', icon: '🗄️', color: '#A78BFA',
    title: 'Databases', tagline: 'Free cloud databases for any stack',
    desc: 'MongoDB Atlas, Neon, Supabase, Render Postgres — create, connect, and go.',
  },
]

function LaunchPipeline() {
  return (
    <section className="deploy-hero">
      <div className="deploy-hero__content">
        <motion.div
          className="deploy-hero__eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="deploy-hero__eyebrow-live" />
          SYSTEM ONLINE
          <span className="deploy-hero__eyebrow-sep">//</span>
          DEPLOYMENT PROTOCOL
        </motion.div>

        <motion.h1
          className="deploy-hero__title"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
        >
          Your code deserves an audience.{' '}
          <span className="deploy-hero__title-grad">Launch it — for free.</span>
        </motion.h1>

        <motion.p
          className="deploy-hero__sub"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16, ease: EASE }}
        >
          From your localhost to a live website in minutes. No servers, no credit card, no headaches.
        </motion.p>

        <div className="deploy-hero__pipeline" aria-hidden="true">
          {PIPELINE.map((stage, i) => (
            <div className="deploy-hero__stage-wrap" key={stage.key}>
              <motion.div
                className={`deploy-hero__stage${stage.live ? ' deploy-hero__stage--live' : ''}`}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.28 + i * 0.14, ease: EASE }}
              >
                <span className="deploy-hero__stage-ring">
                  {stage.live && <span className="deploy-hero__radar" />}
                  <span className="deploy-hero__stage-glyph">{stage.icon}</span>
                </span>
                <span className="deploy-hero__stage-label">{stage.label}</span>
                <span className="deploy-hero__stage-sub">{stage.sub}</span>
              </motion.div>
              {i < PIPELINE.length - 1 && (
                <motion.div
                  className="deploy-hero__flow"
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.14, ease: EASE }}
                >
                  <span className="deploy-hero__flow-pulse" />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <motion.div
          className="deploy-hero__reassure"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9, ease: EASE }}
        >
          <span className="deploy-hero__reassure-dot" />
          <span>
            <strong>First time deploying?</strong> Every guide assumes zero experience — we start from your laptop.
          </span>
        </motion.div>
      </div>
    </section>
  )
}

const LOCALHOST_POINTS = [
  'Only you can ever see it',
  'It disappears the moment you close your laptop',
  '“It works on my machine” — no one can verify that',
  'Nothing to paste in a resume, LinkedIn, or GitHub',
  'Recruiters never get to click it',
]

const LIVE_POINTS = [
  'Anyone can open it — phone, laptop, anywhere on earth',
  'Runs 24/7, even while you sleep',
  'A real link for your resume, LinkedIn & GitHub',
  'Recruiters click it and watch your work run',
  'Proof you can ship — not just write code',
]

function WhyGoLive() {
  return (
    <section className="deploy-why">
      <div className="deploy-why__inner">
        <motion.div
          className="deploy-why__head"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <span className="deploy-why__eyebrow">THE REAL REASON</span>
          <h2 className="deploy-why__title">
          Great projects deserve more than localhost.{' '}
            <span className="deploy-why__title-grad">Deploy for free and share your work with the world.</span>
          </h2>
          <p className="deploy-why__sub">
            You didn’t spend those late nights building something just for your own screen.
            The gap between “I built a project” and “I got hired” is one link.
          </p>
        </motion.div>

        <div className="deploy-why__compare">
          <motion.div
            className="deploy-why__card deploy-why__card--local"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="deploy-why__card-head">
              <span className="deploy-why__card-badge deploy-why__card-badge--local">localhost:5173</span>
              <span className="deploy-why__card-label">Stuck on your laptop</span>
            </div>
            <ul className="deploy-why__list">
              {LOCALHOST_POINTS.map(p => (
                <li key={p} className="deploy-why__item deploy-why__item--no">
                  <span className="deploy-why__mark">✕</span>{p}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            className="deploy-why__card deploy-why__card--live"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            <div className="deploy-why__card-head">
              <span className="deploy-why__card-badge deploy-why__card-badge--live">
                <span className="deploy-why__live-dot" />your-app.live
              </span>
              <span className="deploy-why__card-label">Live for the world</span>
            </div>
            <ul className="deploy-why__list">
              {LIVE_POINTS.map(p => (
                <li key={p} className="deploy-why__item deploy-why__item--yes">
                  <span className="deploy-why__mark deploy-why__mark--yes">✓</span>{p}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="deploy-why__cta"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="deploy-why__cta-line">
            Every hired developer has one thing in common — <strong>their work is online.</strong>
          </p>
          <button
            type="button"
            className="deploy-why__cta-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Pick your stack — it’s free ↑
          </button>
        </motion.div>
      </div>
    </section>
  )
}

function StackCard({ stack, i, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(stack.route)}
      className="deploy-stack-card"
      style={{ '--stack-color': stack.color }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (i % 3) * 0.07, ease: EASE }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
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
      <div className="deploy-stack-card__path" aria-hidden="true">
        <span className="deploy-stack-card__path-step">code</span>
        <span className="deploy-stack-card__path-arrow">→</span>
        <span className="deploy-stack-card__path-step">GitHub</span>
        <span className="deploy-stack-card__path-arrow">→</span>
        <span className="deploy-stack-card__path-step deploy-stack-card__path-step--live">
          <span className="deploy-stack-card__path-dot" />
          {stack.platforms}
        </span>
      </div>
      <div className="deploy-stack-card__cta">Open guide →</div>
    </motion.button>
  )
}

export default function DeploymentGuidePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [search, setSearch] = useState('')
  const [activeStation, setActiveStation] = useState('')
  const stationRefs = useRef({})

  const q = search.trim().toLowerCase()

  const matches = (item) => {
    if (!q) return true
    const hay = [item.id, item.title, item.name, item.subtitle, item.desc, ...(item.tags || [])]
      .filter(Boolean).join(' ').toLowerCase()
    return hay.includes(q)
  }

  // Scroll-spy: highlight the station currently in view
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveStation(e.target.dataset.station)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    Object.values(stationRefs.current).forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [q])

  const jumpTo = (key) => {
    stationRefs.current[key]?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Enter exits the search field, and — only if the user has scrolled past the
  // first result — scrolls up to it so filtered results at the top aren't
  // missed. If the first result is already at/below the fold (e.g. searching
  // from the top), nothing scrolls.
  const handleSearchEnter = (e) => {
    if (!(e.key === 'Enter' || e.keyCode === 13) || search.trim() === '') return
    e.preventDefault()
    e.currentTarget.blur()
    const firstKey = stationsWithStacks[0]?.key
      || (visiblePlatforms.length > 0 ? 'platforms' : null)
    const el = firstKey ? stationRefs.current[firstKey] : null
    // ~navbar (64px) + station rail height — the results sit below this band.
    const RAIL_OFFSET = 130
    if (el && el.getBoundingClientRect().top < RAIL_OFFSET) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const openGuide = (route) => {
    if (!user) { navigate(`/login?redirect=${encodeURIComponent(route)}`); return }
    navigate(route)
  }

  const stationsWithStacks = STATIONS.map(st => ({
    ...st,
    stacks: STACKS.filter(s => s.stackType === st.key && matches(s)),
  })).filter(st => st.stacks.length > 0)

  const visiblePlatforms = PLATFORMS.filter(matches)
  const nothingMatches = q && stationsWithStacks.length === 0 && visiblePlatforms.length === 0

  return (
    <div className="deploy-hub-page">

      <Navbar sticky />

      <LaunchPipeline />

      {/* Station rail — pins under the navbar, then to the very top when the nav hides */}
      <div className="deploy-rail">
        <div className="deploy-rail__inner">
          <span className="deploy-rail__label" aria-hidden="true">Jump to</span>
          <div className="deploy-rail__chips">
            {STATIONS.map(st => (
              <button
                key={st.key}
                type="button"
                onClick={() => jumpTo(st.key)}
                className={`deploy-rail__chip${activeStation === st.key ? ' deploy-rail__chip--active' : ''}`}
                style={{ '--station-color': st.color }}
              >
                <span className="deploy-rail__chip-dot" />
                {st.title}
              </button>
            ))}
            <button
              type="button"
              onClick={() => jumpTo('platforms')}
              className={`deploy-rail__chip${activeStation === 'platforms' ? ' deploy-rail__chip--active' : ''}`}
              style={{ '--station-color': '#F59E0B' }}
            >
              <span className="deploy-rail__chip-dot" />
              Free Hosting
            </button>
          </div>
          <div className="deploy-rail__search">
            <Search size={13} className="deploy-rail__search-icon" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={handleSearchEnter}
              placeholder='Search — "react", "django", "chatbot", "mongodb"…'
              className="deploy-rail__search-input"
            />
            {search && (
              <button type="button" onClick={() => setSearch('')} className="deploy-rail__search-clear" aria-label="Clear search">
                <X size={12} />
              </button>
            )}
          </div>
        </div>
      </div>

      <main className="deploy-stations">

        {stationsWithStacks.map(st => (
          <section
            key={st.key}
            ref={el => { stationRefs.current[st.key] = el }}
            data-station={st.key}
            className="deploy-station"
            style={{ '--station-color': st.color }}
          >
            <motion.header
              className="deploy-station__head"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="deploy-station__head-text">
                <h2 className="deploy-station__title">
                  <span className="deploy-station__icon">{st.icon}</span>
                  {st.title}
                  <span className="deploy-station__tagline">— {st.tagline}</span>
                </h2>
                <p className="deploy-station__desc">{st.desc}</p>
              </div>
            </motion.header>

            <div className="deploy-station__grid">
              {st.stacks.map((stack, i) => (
                <StackCard key={stack.id} stack={stack} i={i} onOpen={openGuide} />
              ))}
            </div>
          </section>
        ))}

        {nothingMatches && (
          <div className="deploy-hub-empty">
            <div className="deploy-hub-empty__icon">🔍</div>
            <div className="deploy-hub-empty__title">No guides match "{search}"</div>
            <div className="deploy-hub-empty__hint">Try "react", "django", "mongodb", "chatbot", or "docker"</div>
            <button type="button" onClick={() => setSearch('')} className="deploy-hub-empty__btn">Show all</button>
          </div>
        )}

        {visiblePlatforms.length > 0 && (
          <section
            ref={el => { stationRefs.current.platforms = el }}
            data-station="platforms"
            className="deploy-station deploy-station--platforms"
            style={{ '--station-color': '#F59E0B' }}
          >
            <motion.header
              className="deploy-station__head"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="deploy-station__head-text">
                <h2 className="deploy-station__title">
                  <span className="deploy-station__icon">🆓</span>
                  Free Hosting Arsenal
                  <span className="deploy-station__tagline">— every platform the guides use</span>
                </h2>
                <p className="deploy-station__desc">All free tiers. No credit card. Bookmark these.</p>
              </div>
            </motion.header>

            <div className="deploy-platform-strip">
              {visiblePlatforms.map((p, i) => (
                <motion.a
                  key={p.name}
                  href={`https://${p.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="deploy-platform-card"
                  style={{ '--platform-color': p.color }}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: (i % 4) * 0.05, ease: EASE }}
                  whileHover={{ y: -4 }}
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
                </motion.a>
              ))}
            </div>
          </section>
        )}

      </main>

      {!q && <WhyGoLive />}
    </div>
  )
}

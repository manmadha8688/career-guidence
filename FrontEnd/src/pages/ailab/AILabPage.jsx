import { useState, useRef, Suspense, lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Search, ChevronRight, Lock } from 'lucide-react'
import ScrollToTop from '../../components/ScrollToTop'
import Navbar from '../../components/navbars/Navbar'
import BookmarkButton from '../../components/BookmarkButton'
import { CATEGORIES, TOOLS } from './aiLabData'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import blurOnEnter from '../../utils/blurOnEnter'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SPLINE_ROBOT = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

const TAG_META = {
  trending:    { label: '🔥 Trending',   bg: 'rgba(249,115,22,0.15)',  color: '#F97316' },
  popular:     { label: '⭐ Popular',     bg: 'rgba(245,158,11,0.15)', color: '#F59E0B' },
  'must-know': { label: '✓ Must Know',   bg: 'rgba(16,185,129,0.15)', color: '#10B981' },
  enterprise:  { label: '🏢 Enterprise', bg: 'rgba(59,130,246,0.15)', color: '#3B82F6' },
  'open-source': { label: '⚡ Open Source', bg: 'rgba(139,92,246,0.15)', color: '#8B5CF6' },
  new:         { label: '✦ New',         bg: 'rgba(6,182,212,0.15)',  color: '#06B6D4' },
}

const PRIMER_SECTIONS = [
  {
    icon: '🤖', color: '#00D9FF', title: 'What is Artificial Intelligence?',
    body: 'AI is software that can do things that used to require human intelligence — like understanding text, writing code, analyzing images, making decisions, and having conversations. Modern AI (specifically Large Language Models like ChatGPT, Claude, Gemini) learned by reading billions of pages of text from the internet, books, and code. It learned patterns — not rules. That\'s why it can write poetry, debug code, and explain physics without being explicitly programmed to do any of those things.',
  },
  {
    icon: '⚡', color: '#A78BFA', title: 'How does it actually work?',
    body: 'When you type a message to an AI, it predicts the most likely next word, then the next, then the next — billions of times per second. It sounds simple but the model has billions of parameters (weights) trained on human knowledge. The result is a system that appears to reason, write, and understand. It doesn\'t search the internet or look up answers — it generates them from learned patterns. This is why it can be wrong — it generates plausible text, not guaranteed truth.',
  },
  {
    icon: '🌍', color: '#4ADE80', title: 'Why does it matter for your career?',
    body: 'AI is changing every software job right now. Developers who use AI tools write code 2-5x faster. Companies are building AI features into every product. New job roles are emerging: AI Engineer, Prompt Engineer, LLM Application Developer. If you don\'t learn to work with AI in the next 1-2 years, you will compete against people who do. The good news: most AI tools are free or cheap, and you can start building real things in days.',
  },
  {
    icon: '🔨', color: '#F59E0B', title: 'What can you actually build?',
    body: 'With the tools in this lab: a chatbot that answers questions from your own documents (RAG), an AI agent that browses the web and completes tasks, a code assistant that reviews your pull requests, an automation that turns emails into database entries, an image generator for your projects, a voice assistant for your app. Most of these take 1-3 days to build. All of the core tools have free tiers. You don\'t need a GPU or a PhD.',
  },
  {
    icon: '🗺️', color: '#EC4899', title: 'How to approach learning this',
    body: 'Start with foundations — understand what an LLM is, what RAG is, what embeddings are. These concepts appear in every AI tool. Then try the chatbots (ChatGPT, Claude, Gemini) — get good at prompting. Then learn to call AI via API (Groq is free). Then build agents. Don\'t try to learn everything. Pick one tool per week, build something real with it, move on. A working project teaches 10x more than a watched tutorial.',
  },
]

const CAT_META = {
  foundations: { color: '#8B5CF6', icon: '🧬', desc: 'Understand how AI works before using any tool' },
  chatbots:    { color: '#00D9FF', icon: '🤖', desc: 'Conversational AI — ask anything, get answers instantly' },
  builders:    { color: '#F59E0B', icon: '🏗️', desc: 'Build full apps and UIs from a single prompt' },
  coding:      { color: '#10B981', icon: '💻', desc: 'Write, review and debug code 5x faster with AI' },
  apis:        { color: '#3B82F6', icon: '🔌', desc: 'Add AI to your own apps with one API call' },
  agents:      { color: '#EC4899', icon: '🦜', desc: 'Autonomous AI that plans and executes multi-step tasks' },
  automation:  { color: '#F97316', icon: '⚙️', desc: 'Connect 1000+ apps and automate workflows without code' },
  local:       { color: '#6366F1', icon: '🦙', desc: 'Run powerful AI models on your own machine for free' },
  vector:      { color: '#14B8A6', icon: '🗄️', desc: 'Store and search knowledge by meaning, not keywords' },
  data:        { color: '#0EA5E9', icon: '📊', desc: 'Analyze data and deploy AI without writing code' },
  security:    { color: '#A78BFA', icon: '🛡️', desc: 'Find vulnerabilities before attackers do' },
  creative:    { color: '#F472B6', icon: '🎨', desc: 'Generate images, videos and presentations with AI' },
  voice:       { color: '#FBBF24', icon: '🎤', desc: 'Convert speech to text and text to realistic voice' },
  career:      { color: '#34D399', icon: '📄', desc: 'Build your resume, notes and communication with AI' },
}

export default function AILabPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [primerOpen, setPrimerOpen] = useState(false)
  const [splineReady, setSplineReady] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  // Only load the ~4MB 3D hero when it's worth it: skip on mobile, data-saver,
  // and for users who prefer reduced motion. They get a lightweight glow instead.
  const [enable3D] = useState(() => {
    if (typeof window === 'undefined') return false
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
    const saveData = navigator.connection?.saveData
    const small = window.innerWidth < 768
    return !reduced && !saveData && !small
  })

  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])
  const heroY = useTransform(scrollY, [0, 500], [0, -80])
  const splineScale = useTransform(scrollY, [0, 400], [1, 1.1])
  // Skip scroll-linked parallax on touch/small screens to keep scrolling smooth.
  const heroSectionStyle = enable3D ? { opacity: heroOpacity, y: heroY } : undefined
  const splineStyle = enable3D ? { scale: splineScale } : undefined

  const filtered = TOOLS.filter(t => {
    const matchCat = activeCategory === 'all' || t.category === activeCategory
    const q = search.toLowerCase()
    return matchCat && (!q || t.name.toLowerCase().includes(q) || t.tagline.toLowerCase().includes(q) || t.tags?.some(g => g.includes(q)))
  })
  const grouped = CATEGORIES.filter(c => c.id !== 'all').map(cat => ({
    ...cat, tools: filtered.filter(t => t.category === cat.id),
  })).filter(g => g.tools.length > 0)
  const goToTool = t => {
    const path = `/ai-lab/${t.category}/${t.id}`
    if (!user) { navigate(`/login?redirect=${encodeURIComponent(path)}`); return }
    navigate(path)
  }

  return (
    <div className="ailab-page">

      <AnimatePresence>
        {primerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={e => e.target === e.currentTarget && setPrimerOpen(false)}
            className="ailab-modal-overlay"
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              className="ailab-modal"
            >
              <div className="ailab-modal__header">
                <div className="ailab-modal__eyebrow">// AI PRIMER — READ BEFORE YOU BUILD</div>
                <h2 className="ailab-modal__title">What is AI and Why Should You Learn It?</h2>
                <p className="ailab-modal__meta">5 minute read · no prior knowledge needed</p>
              </div>

              {PRIMER_SECTIONS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.08 }}
                  className="ailab-modal__section"
                  style={{ '--accent-color': s.color }}
                >
                  <div className="ailab-modal__section-inner">
                    <div className="ailab-modal__section-icon">{s.icon}</div>
                    <div>
                      <div className="ailab-modal__section-title">{s.title}</div>
                      <p className="ailab-modal__section-body">{s.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="ailab-modal__footer">
                <div>
                  <div className="ailab-modal__footer-title">Ready? Start with AI Foundations.</div>
                  <div className="ailab-modal__footer-sub">GenAI → Prompt Engineering → RAG → Embeddings</div>
                </div>
                <div className="ailab-modal__actions">
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} type="button" onClick={() => setPrimerOpen(false)} className="ailab-btn-ghost">
                    Close
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(0,217,255,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    onClick={() => { setPrimerOpen(false); setActiveCategory('foundations') }}
                    className="ailab-btn-primary"
                  >
                    EXPLORE TOOLS →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar sticky />

      <motion.section style={heroSectionStyle}>
        <div className="ailab-hero">
          <div className="ailab-hero__grid" />
          <div className="ailab-hero__scanlines" />
          <div className="ailab-hero__fade-bottom" />

          <div className="ailab-hero__content">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              <h1 className="ailab-hero__title">
                <span className="ailab-hero__eyebrow">THE FUTURE IS</span>
                <span className="ailab-hero__ai-title">AI</span>
                <span className="ailab-hero__main-title">TOOLS LAB</span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="ailab-hero__desc"
            >
              Every AI tool a developer needs — what it is, how it works,
              free tutorials and a <strong>hands-on project</strong> for each.
            </motion.p>

            <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.7, duration: 0.8 }} className="ailab-hero__divider" />

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.7 }} className="ailab-hero__cta-row">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 50px rgba(0,217,255,0.45)' }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => setPrimerOpen(true)}
                className="ailab-hero__cta-outline"
              >
                📖 New to AI? Start here
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(124,58,237,0.45)' }}
                whileTap={{ scale: 0.97 }}
                type="button"
                onClick={() => document.getElementById('tools-grid')?.scrollIntoView({ behavior: 'smooth' })}
                className="ailab-hero__cta-solid"
              >
                Explore Tools →
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            style={splineStyle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 1.2 }}
            className={`ailab-hero__spline${splineReady ? ' ailab-spline-loaded' : ''}`}
          >
            <div className="ailab-hero__spline-glow" />
            <div className="ailab-hero__spline-fade" />

            {enable3D ? (
              <>
                {!splineReady && (
                  <div className="ailab-hero__spline-loader">
                    <div className="ailab-hero__spline-loader-inner">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }} className="ailab-hero__spline-spinner" />
                      <span className="ailab-hero__spline-loader-text">LOADING 3D...</span>
                    </div>
                  </div>
                )}
                <Suspense fallback={null}>
                  <Spline
                    scene={SPLINE_ROBOT}
                    onLoad={() => setSplineReady(true)}
                    className="ailab-hero__spline-canvas"
                    style={{ opacity: splineReady ? 1 : 0, transition: 'opacity 1s ease' }}
                  />
                </Suspense>
              </>
            ) : (
              <div className="ailab-hero__spline-static" aria-hidden="true">🤖</div>
            )}
          </motion.div>

          <div className="ailab-hero__hud-tr">
            <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity }}>SYS_STATUS: ONLINE</motion.div>
            <div>AI_CORE: ACTIVE</div>
            <div>TOOLS: {TOOLS.length} LOADED</div>
          </div>
          <div className="ailab-hero__hud-bl">
            <div>FREE_TOOLS: {TOOLS.filter(t => t.free).length}</div>
            <div>CATEGORIES: {CATEGORIES.length - 1}</div>
          </div>
        </div>
      </motion.section>

      <div id="tools-grid" className="ailab-tools">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="ailab-tools__filters"
        >
          <div className={`ailab-tools__search-wrap${searchFocused ? ' ailab-tools__search-wrap--focused' : ''}`}>
            <Search size={14} className="ailab-tools__search-icon" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              onKeyDown={blurOnEnter}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search tools, categories, tags..."
              className="ailab-tools__search"
            />
            {search && (
              <button type="button" onClick={() => setSearch('')} className="ailab-tools__search-clear">×</button>
            )}
          </div>

          <div className="ailab-tools__categories">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`ailab-tools__cat-btn${activeCategory === cat.id ? ' ailab-tools__cat-btn--active' : ''}`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="ailab-tools__grid-wrap">
          {search || activeCategory !== 'all' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="ailab-tools__result-count">
                {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="ailab-tools__grid">
                {filtered.map((tool, i) => (
                  <ToolCard key={tool.id} tool={tool} onClick={() => goToTool(tool)} delay={i * 0.04} />
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="ailab-tools__empty">
                  <div className="ailab-tools__empty-icon">🔍</div>
                  <p className="ailab-tools__empty-title">NO RESULTS</p>
                </div>
              )}
            </motion.div>
          ) : (
            grouped.map((group, gi) => (
              <CategorySection key={group.id} group={group} gi={gi} onTool={goToTool} />
            ))
          )}
        </div>
      </div>
      <ScrollToTop />
    </div>
  )
}

function CategorySection({ group, gi, onTool }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const meta = CAT_META[group.id] || { color: '#00D9FF', icon: '⚡', desc: '' }

  return (
    <motion.div
      ref={ref}
      className="ailab-category"
      style={{ '--cat-color': meta.color }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: gi * 0.03 }}
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.05, duration: 0.6 }}
        className="ailab-category__banner"
      >
        {isInView && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '250%' }}
            transition={{ duration: 1.4, delay: 0.1, ease: 'easeOut' }}
            className="ailab-category__shimmer"
          />
        )}

        <motion.div
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="ailab-category__accent-bar"
        />

        <motion.div
          animate={isInView ? { y: [0, -4, 0] } : {}}
          transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
          className="ailab-category__icon"
        >
          {meta.icon}
        </motion.div>

        <div className="ailab-category__info">
          <div className="ailab-category__title-row">
            <h2 className="ailab-category__title">{group.label}</h2>
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
              className="ailab-category__count"
            >
              {group.tools.length} tools
            </motion.span>
          </div>
          <div className="ailab-category__desc">{meta.desc}</div>
        </div>

        {isInView && (
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="ailab-category__line"
          />
        )}
      </motion.div>

      <div className="ailab-category__grid">
        {group.tools.map((tool, i) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            onClick={() => onTool(tool)}
            delay={isInView ? i * 0.042 : 0}
            visible={isInView}
            catColor={meta.color}
          />
        ))}
      </div>
    </motion.div>
  )
}

function ToolCard({ tool, onClick, delay = 0, visible = true, catColor }) {
  const soon = !tool.hasPage
  const accent = tool.color || catColor || '#00D9FF'

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={visible ? { opacity: soon ? 0.6 : 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={soon ? {} : { y: -5, scale: 1.025, transition: { duration: 0.18 } }}
      whileTap={soon ? {} : { scale: 0.975 }}
      onClick={onClick}
      className={`ailab-tool-card${soon ? ' ailab-tool-card--soon' : ''}`}
      style={{ '--accent-color': accent }}
    >
      <div className="ailab-tool-card__top-accent" />
      <div className="ailab-tool-card__shimmer" />
      <div className="ailab-tool-card__side-bar" />

      {soon && (
        <div className="ailab-tool-card__soon">
          <Lock size={7} /> SOON
        </div>
      )}

      {!soon && (
        <span className="ailab-tool-card__bookmark">
          <BookmarkButton
            type="AITOOL"
            refId={`${tool.category}/${tool.id}`}
            title={tool.name}
            description={tool.tagline}
            icon={tool.icon}
            iconOnly
            stopPropagation
          />
        </span>
      )}

      <div className="ailab-tool-card__header">
        <div className="ailab-tool-card__icon">{tool.icon}</div>
        <div className={`ailab-tool-card__info${soon ? ' ailab-tool-card__info--soon' : ''}`}>
          <div className="ailab-tool-card__name">{tool.name}</div>
          <div className="ailab-tool-card__tagline">{tool.tagline}</div>
        </div>
      </div>

      <div className="ailab-tool-card__tier">{tool.freeTier}</div>

      <div className="ailab-tool-card__footer">
        <span className={`ailab-tool-card__badge${tool.free ? ' ailab-tool-card__badge--free' : ' ailab-tool-card__badge--paid'}`}>
          {tool.free ? 'FREE' : 'PAID'}
        </span>
        {(tool.tags || []).slice(0, 2).map(tag => {
          const m = TAG_META[tag]
          if (!m) return null
          return (
            <span key={tag} className="ailab-tool-card__tag" style={{ '--tag-bg': m.bg, '--tag-color': m.color }}>
              {m.label}
            </span>
          )
        })}
        {!soon && (
          <span className="ailab-tool-card__learn">
            Learn <ChevronRight size={9} />
          </span>
        )}
      </div>
    </motion.div>
  )
}

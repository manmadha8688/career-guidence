import { useState, useRef, Suspense, lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import { Sun, Moon, ArrowLeft, Search, ChevronRight, Lock, Zap } from 'lucide-react'
import ScrollToTop from '../../components/ScrollToTop'
import { CATEGORIES, TOOLS } from './aiLabData'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'

const Spline = lazy(() => import('@splinetool/react-spline'))

const CYAN   = '#00D9FF'
const VIOLET = '#7C3AED'

// Best Spline scene — interactive 3D robot with cursor spotlight
const SPLINE_ROBOT = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

const TAG_META = {
  'trending':    { label: '🔥 Trending',   bg: 'rgba(249,115,22,0.15)',  color: '#F97316' },
  'popular':     { label: '⭐ Popular',     bg: 'rgba(245,158,11,0.15)', color: '#F59E0B' },
  'must-know':   { label: '✓ Must Know',   bg: 'rgba(16,185,129,0.15)', color: '#10B981' },
  'enterprise':  { label: '🏢 Enterprise', bg: 'rgba(59,130,246,0.15)', color: '#3B82F6' },
  'open-source': { label: '⚡ Open Source',bg: 'rgba(139,92,246,0.15)', color: '#8B5CF6' },
  'new':         { label: '✦ New',         bg: 'rgba(6,182,212,0.15)',  color: '#06B6D4' },
}

/* Inject global styles */
const G = `
@keyframes scanline {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}
@keyframes flicker { 0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:0.85} 94%{opacity:1} 96%{opacity:0.9} 97%{opacity:1} }
@keyframes gridMove { from{background-position:0 0} to{background-position:0 48px} }
@keyframes textGlow {
  0%,100%{text-shadow:0 0 20px rgba(0,217,255,0.5),0 0 40px rgba(0,217,255,0.2)}
  50%{text-shadow:0 0 30px rgba(0,217,255,0.8),0 0 60px rgba(0,217,255,0.4),0 0 100px rgba(0,217,255,0.15)}
}
@keyframes borderPulse {
  0%,100%{box-shadow:0 0 0 1px rgba(0,217,255,0.2),0 0 20px rgba(0,217,255,0.05)}
  50%{box-shadow:0 0 0 1px rgba(0,217,255,0.5),0 0 30px rgba(0,217,255,0.15)}
}
@keyframes shimmerText {
  0%{background-position:0% center}
  100%{background-position:200% center}
}
@keyframes fadeUp {
  from{opacity:0;transform:translateY(30px)}
  to{opacity:1;transform:translateY(0)}
}
@keyframes splineLoad {
  from{opacity:0;transform:scale(0.95)}
  to{opacity:1;transform:scale(1)}
}
.spline-loaded { animation: splineLoad 1.2s ease forwards; }
`

if (typeof document !== 'undefined' && !document.getElementById('ailab-gs')) {
  const s = document.createElement('style')
  s.id = 'ailab-gs'
  s.textContent = G
  document.head.appendChild(s)
}

export default function AILabPage() {
  const navigate  = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const [activeCategory, setActiveCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [primerOpen, setPrimerOpen] = useState(false)
  const [splineReady, setSplineReady] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)

  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])
  const heroY       = useTransform(scrollY, [0, 500], [0, -80])
  const splineScale = useTransform(scrollY, [0, 400], [1, 1.1])

  const filtered = TOOLS.filter(t => {
    const matchCat = activeCategory === 'all' || t.category === activeCategory
    const q = search.toLowerCase()
    return matchCat && (!q || t.name.toLowerCase().includes(q) || t.tagline.toLowerCase().includes(q) || t.tags?.some(g => g.includes(q)))
  })
  const grouped = CATEGORIES.filter(c => c.id !== 'all').map(cat => ({
    ...cat, tools: filtered.filter(t => t.category === cat.id),
  })).filter(g => g.tools.length > 0)
  const goToTool = t => navigate(`/ai-lab/${t.category}/${t.id}`)

  /* Always dark hero regardless of page theme */
  const heroBg  = '#00040C'
  const pageBg  = dark ? '#00040C' : '#F0F4FF'
  const txt     = dark ? '#E2E8F0' : '#0F172A'
  const sub     = dark ? '#7A8BA8' : '#475569'
  const muted   = dark ? '#3D4E63' : '#94A3B8'
  const bdr     = dark ? 'rgba(0,217,255,0.1)' : 'rgba(0,0,0,0.07)'

  return (
    <div style={{ minHeight: '100vh', background: pageBg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>

      {/* ── AI Primer Modal ───────────────────────────────────── */}
      <AnimatePresence>
        {primerOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={e => e.target === e.currentTarget && setPrimerOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 300, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '1.5rem 1rem', background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(20px)', overflowY: 'auto' }}>
            <motion.div initial={{ opacity: 0, y: 50, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30 }} transition={{ type: 'spring', stiffness: 280, damping: 28 }}
              style={{ width: '100%', maxWidth: 680, background: 'rgba(3,8,20,0.99)', border: `1px solid rgba(0,217,255,0.18)`, borderTop: `3px solid ${CYAN}`, borderRadius: 22, overflow: 'hidden', marginBottom: '2rem', boxShadow: `0 0 100px rgba(0,217,255,0.1)` }}>

              {/* Header */}
              <div style={{ padding: '1.5rem 1.75rem', borderBottom: `1px solid rgba(0,217,255,0.08)`, background: 'rgba(0,217,255,0.03)' }}>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', letterSpacing: '0.2em', color: CYAN, marginBottom: '0.5rem' }}>// AI PRIMER — READ BEFORE YOU BUILD</div>
                <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(1rem,2.5vw,1.2rem)', fontWeight: 900, color: '#E2E8F0', margin: 0 }}>What is AI and Why Should You Learn It?</h2>
                <p style={{ fontSize: '0.78rem', color: '#5A6880', margin: '0.5rem 0 0', fontFamily: "'Share Tech Mono', monospace" }}>5 minute read · no prior knowledge needed</p>
              </div>

              {/* Sections */}
              {[
                {
                  icon: '🤖', color: CYAN, title: 'What is Artificial Intelligence?',
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
              ].map((s, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 + i * 0.08 }}
                  style={{ padding: '1.125rem 1.75rem', borderBottom: `1px solid rgba(255,255,255,0.04)` }}>
                  <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${s.color}15`, border: `1px solid ${s.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{s.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: s.color, marginBottom: '0.35rem', fontFamily: "'Rajdhani', sans-serif", letterSpacing: '0.02em' }}>{s.title}</div>
                      <p style={{ fontSize: '0.78rem', color: '#7A8BA8', lineHeight: 1.75, margin: 0 }}>{s.body}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Footer */}
              <div style={{ padding: '1.25rem 1.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', background: 'rgba(0,217,255,0.02)' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#E2E8F0', fontWeight: 600, marginBottom: '0.2rem' }}>Ready? Start with AI Foundations.</div>
                  <div style={{ fontSize: '0.68rem', color: '#3D4E63', fontFamily: "'Share Tech Mono', monospace" }}>GenAI → Prompt Engineering → RAG → Embeddings</div>
                </div>
                <div style={{ display: 'flex', gap: '0.625rem' }}>
                  <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setPrimerOpen(false)}
                    style={{ padding: '0.5rem 1.1rem', borderRadius: 8, border: `1px solid rgba(255,255,255,0.1)`, background: 'transparent', color: '#5A6880', fontFamily: "'Rajdhani', sans-serif", fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>
                    Close
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05, boxShadow: `0 0 24px rgba(0,217,255,0.4)` }} whileTap={{ scale: 0.97 }}
                    onClick={() => { setPrimerOpen(false); setActiveCategory('foundations') }}
                    style={{ padding: '0.5rem 1.3rem', borderRadius: 8, border: 'none', cursor: 'pointer', background: `linear-gradient(135deg,${CYAN},${VIOLET})`, color: '#fff', fontFamily: "'Orbitron', sans-serif", fontWeight: 700, fontSize: '0.6rem', letterSpacing: '0.08em', boxShadow: `0 0 20px rgba(0,217,255,0.25)` }}>
                    EXPLORE TOOLS →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sticky Nav ─────────────────────────────────────────── */}
      <motion.nav initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{ position: 'sticky', top: 0, zIndex: 100, height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: 'rgba(0,4,12,0.92)', backdropFilter: 'blur(20px)', borderBottom: `1px solid rgba(0,217,255,0.1)` }}>
        <motion.button whileHover={{ x: -3 }} onClick={() => navigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.68rem', letterSpacing: '0.1em', color: CYAN, padding: 0 }}>
          <ArrowLeft size={13} /> LearnToEarn
        </motion.button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}>
            <Zap size={13} color={CYAN} />
          </motion.div>
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.76rem', letterSpacing: '0.2em', color: CYAN }}>AI LAB</span>
        </div>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleTheme}
          style={{ background: 'none', border: `1px solid rgba(0,217,255,0.15)`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3D4E63' }}>
          {dark ? <Sun size={13} /> : <Moon size={13} />}
        </motion.button>
      </motion.nav>

      {/* ══════════════════════════════════════════════════════
          HERO — split layout: text LEFT, 3D robot RIGHT
      ══════════════════════════════════════════════════════ */}
      <motion.section style={{ opacity: heroOpacity, y: heroY }}
        className="hero-section"
        css={undefined}>
        <div style={{
          position: 'relative',
          minHeight: '100vh',
          background: heroBg,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}>

          {/* Animated grid background */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: `linear-gradient(rgba(0,217,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.04) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            animation: 'gridMove 4s linear infinite',
          }} />

          {/* Scanline effect */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,217,255,0.015) 2px, rgba(0,217,255,0.015) 4px)',
          }} />

          {/* Bottom fade to page */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '20%', background: `linear-gradient(to bottom, transparent, ${heroBg})`, pointerEvents: 'none', zIndex: 2 }} />

          {/* LEFT — text content */}
          <div style={{ position: 'relative', zIndex: 10, width: '50%', padding: 'clamp(2rem,5vw,5rem) clamp(1.5rem,4vw,4rem)', paddingRight: '2rem' }}>

            

            {/* Main title */}
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, lineHeight: 0.95, margin: '0 0 1.5rem', letterSpacing: '-0.02em' }}>
                <span style={{ display: 'block', fontSize: 'clamp(1rem,2.5vw,1.3rem)', color: 'rgba(226,232,240,0.5)', letterSpacing: '0.25em', marginBottom: '0.5rem', fontWeight: 400 }}>THE FUTURE IS</span>
                <motion.span
                  animate={{ backgroundPosition: ['0% center', '200% center'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                  style={{ display: 'block', fontSize: 'clamp(3rem,7vw,5.5rem)', background: `linear-gradient(90deg, ${CYAN}, #38BDF8, ${VIOLET}, #EC4899, ${CYAN})`, backgroundSize: '200% auto', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', animation: 'shimmerText 3s linear infinite' }}>
                  AI
                </motion.span>
                <span style={{ display: 'block', fontSize: 'clamp(1.8rem,4vw,3.2rem)', color: 'rgba(226,232,240,0.9)' }}>TOOLS LAB</span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7, duration: 0.8 }}
              style={{ fontSize: 'clamp(0.875rem,1.5vw,1rem)', color: '#7A8BA8', lineHeight: 1.85, maxWidth: 420, margin: '0 0 2.5rem' }}>
              Every AI tool a developer needs — what it is, how it works,
              free tutorials and a <strong style={{ color: 'rgba(226,232,240,0.8)' }}>hands-on project</strong> for each.
            </motion.p>

            {/* Glowing keyword tags */}
           

            {/* Divider line */}
            <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.7, duration: 0.8 }}
              style={{ height: 1, background: `linear-gradient(90deg, ${CYAN}40, transparent)`, marginBottom: '2rem' }} />

            {/* CTA */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.7 }}
              style={{ display: 'flex', gap: '0.875rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <motion.button whileHover={{ scale: 1.05, boxShadow: `0 0 50px rgba(0,217,255,0.45)` }} whileTap={{ scale: 0.97 }}
                onClick={() => setPrimerOpen(true)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', padding: '0.8rem 1.75rem', borderRadius: 12, border: `1.5px solid rgba(0,217,255,0.4)`, background: 'rgba(0,217,255,0.09)', color: CYAN, fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', backdropFilter: 'blur(12px)', letterSpacing: '0.03em', transition: 'box-shadow 0.2s' }}>
                📖 New to AI? Start here
              </motion.button>
              <motion.button whileHover={{ scale: 1.05, boxShadow: `0 0 40px rgba(124,58,237,0.45)` }} whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById('tools-grid')?.scrollIntoView({ behavior: 'smooth' })}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 1.75rem', borderRadius: 12, border: 'none', background: `linear-gradient(135deg,${CYAN},${VIOLET})`, color: '#fff', fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', boxShadow: `0 0 24px rgba(0,217,255,0.2)`, transition: 'box-shadow 0.2s' }}>
                Explore Tools →
              </motion.button>
            </motion.div>

          
          </div>

          {/* RIGHT — 3D Spline robot */}
          <motion.div style={{ scale: splineScale }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 1.2 }}
            className={splineReady ? 'spline-loaded' : ''}
            css={undefined}
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              width: '58%',
              height: '100%',
              zIndex: 5,
            }}>

            {/* Glow behind robot */}
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 60% at 60% 50%, rgba(0,217,255,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />

            {/* Left fade so text is readable */}
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '35%', background: `linear-gradient(to right, ${heroBg}, transparent)`, zIndex: 2, pointerEvents: 'none' }} />

            {/* Loading skeleton */}
            {!splineReady && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>
                <div style={{ textAlign: 'center' }}>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    style={{ width: 48, height: 48, borderRadius: '50%', border: `2px solid rgba(0,217,255,0.15)`, borderTop: `2px solid ${CYAN}`, margin: '0 auto 1rem' }} />
                  <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: '#3D4E63', letterSpacing: '0.12em' }}>LOADING 3D...</span>
                </div>
              </div>
            )}

            {/* Spline 3D scene */}
            <Suspense fallback={null}>
              <Spline
                scene={SPLINE_ROBOT}
                onLoad={() => setSplineReady(true)}
                style={{ width: '100%', height: '100%', opacity: splineReady ? 1 : 0, transition: 'opacity 1s ease' }}
              />
            </Suspense>
          </motion.div>

          {/* Corner HUD elements */}
          <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 10, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: 'rgba(0,217,255,0.3)', letterSpacing: '0.1em', lineHeight: 1.8, textAlign: 'right' }}>
            <motion.div animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity }}>SYS_STATUS: ONLINE</motion.div>
            <div>AI_CORE: ACTIVE</div>
            <div>TOOLS: {TOOLS.length} LOADED</div>
          </div>
          <div style={{ position: 'absolute', bottom: 30, left: 20, zIndex: 10, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.5rem', color: 'rgba(0,217,255,0.25)', letterSpacing: '0.1em', lineHeight: 1.8 }}>
            <div>FREE_TOOLS: {TOOLS.filter(t => t.free).length}</div>
            <div>CATEGORIES: {CATEGORIES.length - 1}</div>
          </div>
        </div>
      </motion.section>

      {/* ══════════════════════════════════════════════════════
          TOOLS GRID
      ══════════════════════════════════════════════════════ */}
      <div id="tools-grid" style={{ position: 'relative', zIndex: 1 }}>

        {/* Search + Filters */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          style={{ maxWidth: 1140, margin: '0 auto', padding: '3rem 1.25rem 2rem' }}>

          <div style={{ position: 'relative', maxWidth: 440, margin: '0 auto 1.5rem' }}>
            <Search size={14} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: searchFocused ? CYAN : muted, transition: 'color 0.2s' }} />
            <input value={search} onChange={e => setSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)} onBlur={() => setSearchFocused(false)}
              placeholder="Search tools, categories, tags..."
              style={{ width: '100%', boxSizing: 'border-box', paddingLeft: 38, paddingRight: 14, height: 44, borderRadius: 12, border: `1.5px solid ${searchFocused ? 'rgba(0,217,255,0.5)' : bdr}`, background: dark ? 'rgba(0,217,255,0.04)' : 'rgba(255,255,255,0.9)', color: txt, fontSize: '0.875rem', fontFamily: 'inherit', outline: 'none', transition: 'all 0.2s', boxShadow: searchFocused ? `0 0 0 3px rgba(0,217,255,0.1)` : '' }} />
            {search && <button onClick={() => setSearch('')} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: muted, fontSize: '1rem', padding: 0 }}>×</button>}
          </div>

          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {CATEGORIES.map(cat => {
              const active = activeCategory === cat.id
              return (
                <motion.button key={cat.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{ padding: '0.3rem 0.8rem', borderRadius: 999, cursor: 'pointer', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.57rem', letterSpacing: '0.04em', transition: 'all 0.18s', border: active ? `1.5px solid ${CYAN}` : `1px solid ${bdr}`, background: active ? 'rgba(0,217,255,0.12)' : 'transparent', color: active ? CYAN : sub, boxShadow: active ? `0 0 12px rgba(0,217,255,0.2)` : '' }}>
                  {cat.label}
                </motion.button>
              )
            })}
          </div>
        </motion.div>

        {/* Tag legend */}
       

        {/* Grid */}
        <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 1.25rem 7rem' }}>
          {search || activeCategory !== 'all' ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: muted, marginBottom: '1.25rem', letterSpacing: '0.06em' }}>{filtered.length} result{filtered.length !== 1 ? 's' : ''}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px,100%),1fr))', gap: '0.875rem' }}>
                {filtered.map((tool, i) => <ToolCard key={tool.id} tool={tool} onClick={() => goToTool(tool)} dark={dark} txt={txt} sub={sub} muted={muted} delay={i * 0.04} />)}
              </div>
              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '5rem 2rem', color: sub }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                  <p style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '0.85rem', letterSpacing: '0.1em' }}>NO RESULTS</p>
                </div>
              )}
            </motion.div>
          ) : (
            grouped.map((group, gi) => (
              <CategorySection key={group.id} group={group} dark={dark} txt={txt} sub={sub} muted={muted} gi={gi} onTool={goToTool} CYAN={CYAN} bdr={bdr} />
            ))
          )}
        </div>
      </div>
      <ScrollToTop />
    </div>
  )
}

/* ── Per-category meta ───────────────────────────────────────────────────── */
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

/* ── Category Section ──────────────────────────────────────────────────── */
function CategorySection({ group, dark, txt, sub, muted, gi, onTool, CYAN, bdr }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const meta = CAT_META[group.id] || { color: CYAN, icon: '⚡', desc: '' }
  const c = meta.color

  return (
    <motion.div ref={ref} style={{ marginBottom: '4rem' }}
      initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: gi * 0.03 }}>

      {/* Category banner */}
      <motion.div
        initial={{ opacity: 0, x: -20 }} animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.05, duration: 0.6 }}
        style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', padding: '0.875rem 1.125rem', borderRadius: 14, background: `${c}07`, border: `1px solid ${c}1e`, position: 'relative', overflow: 'hidden' }}>

        {/* Animated shimmer on enter */}
        {isInView && (
          <motion.div initial={{ x: '-100%' }} animate={{ x: '250%' }} transition={{ duration: 1.4, delay: 0.1, ease: 'easeOut' }}
            style={{ position: 'absolute', inset: 0, background: `linear-gradient(90deg, transparent, ${c}10, transparent)`, pointerEvents: 'none' }} />
        )}

        {/* Left accent bar */}
        <motion.div initial={{ scaleY: 0 }} animate={isInView ? { scaleY: 1 } : {}} transition={{ delay: 0.1, duration: 0.4 }}
          style={{ width: 3, height: 38, borderRadius: 2, background: `linear-gradient(to bottom, ${c}, ${c}30)`, flexShrink: 0 }} />

        {/* Bouncing icon */}
        <motion.div animate={isInView ? { y: [0, -4, 0] } : {}} transition={{ delay: 0.4, duration: 0.5, ease: 'easeOut' }}
          style={{ fontSize: '1.5rem', flexShrink: 0 }}>
          {meta.icon}
        </motion.div>

        {/* Title + description */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.18rem', flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 800, fontSize: '0.8rem', letterSpacing: '0.1em', color: c, margin: 0, textShadow: dark ? `0 0 18px ${c}55` : 'none' }}>
              {group.label}
            </h2>
            <motion.span initial={{ opacity: 0, scale: 0 }} animate={isInView ? { opacity: 1, scale: 1 } : {}} transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
              style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.48rem', color: c, padding: '0.1rem 0.4rem', borderRadius: 4, background: `${c}15`, border: `1px solid ${c}28` }}>
              {group.tools.length} tools
            </motion.span>
          </div>
          <div style={{ fontSize: '0.71rem', color: dark ? 'rgba(226,232,240,0.4)' : '#94A3B8' }}>{meta.desc}</div>
        </div>

        {/* Bottom gradient line */}
        {isInView && (
          <motion.div initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.9, delay: 0.2 }}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: `linear-gradient(90deg, ${c}50, ${c}15, transparent)` }} />
        )}
      </motion.div>

      {/* Cards grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(262px,100%),1fr))', gap: '0.75rem' }}>
        {group.tools.map((tool, i) => (
          <ToolCard key={tool.id} tool={tool} onClick={() => onTool(tool)} dark={dark} txt={txt} sub={sub} muted={muted}
            delay={isInView ? i * 0.042 : 0} visible={isInView} catColor={c} />
        ))}
      </div>
    </motion.div>
  )
}

/* ── Tool Card ─────────────────────────────────────────────────────────── */
function ToolCard({ tool, onClick, dark, txt, sub, muted, delay = 0, visible = true, catColor }) {
  const soon = !tool.hasPage
  const freeColor = '#4ADE80'
  const paidColor = '#FB923C'
  const accent = tool.color || catColor || '#00D9FF'

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.96 }}
      animate={visible ? { opacity: soon ? 0.6 : 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      whileHover={soon ? {} : { y: -5, scale: 1.025, transition: { duration: 0.18 } }}
      whileTap={soon ? {} : { scale: 0.975 }}
      onClick={onClick}
      style={{
        background: dark ? 'rgba(4,10,28,0.8)' : 'rgba(255,255,255,0.93)',
        border: `1px solid ${dark ? 'rgba(255,255,255,0.055)' : 'rgba(0,0,0,0.07)'}`,
        borderRadius: 16, padding: '1rem 1.125rem',
        cursor: 'pointer', position: 'relative', overflow: 'hidden',
        backdropFilter: 'blur(14px)',
        boxShadow: dark ? `inset 0 1px 0 rgba(255,255,255,0.03)` : '0 1px 4px rgba(0,0,0,0.04)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
      onMouseEnter={e => {
        if (soon) return
        e.currentTarget.style.borderColor = `${accent}35`
        e.currentTarget.style.boxShadow = `0 8px 32px ${accent}18, inset 0 1px 0 rgba(255,255,255,0.05)`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = dark ? 'rgba(255,255,255,0.055)' : 'rgba(0,0,0,0.07)'
        e.currentTarget.style.boxShadow = dark ? 'inset 0 1px 0 rgba(255,255,255,0.03)' : '0 1px 4px rgba(0,0,0,0.04)'
      }}>

      {/* Top accent on hover */}
      <motion.div initial={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.25 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, transformOrigin: 'left', pointerEvents: 'none' }} />

      {/* Shimmer sweep on hover */}
      <motion.div initial={{ x: '-100%', opacity: 0 }} whileHover={{ x: '220%', opacity: 1 }} transition={{ duration: 0.55 }}
        style={{ position: 'absolute', top: 0, left: 0, width: '45%', height: '100%', background: `linear-gradient(90deg, transparent, ${accent}07, transparent)`, pointerEvents: 'none' }} />

      {/* Left color bar */}
      <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '2.5px', borderRadius: '0 2px 2px 0', background: `linear-gradient(to bottom, ${accent}80, ${accent}20)` }} />

      {/* SOON badge */}
      {soon && (
        <div style={{ position: 'absolute', top: 9, right: 9, display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.5rem', fontFamily: "'Share Tech Mono', monospace", color: muted, background: dark ? 'rgba(0,0,0,0.55)' : 'rgba(0,0,0,0.06)', padding: '0.12rem 0.4rem', borderRadius: 4, backdropFilter: 'blur(4px)' }}>
          <Lock size={7} /> SOON
        </div>
      )}

      {/* Icon + name */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.55rem', paddingLeft: '0.25rem' }}>
        <motion.div whileHover={{ scale: 1.15, boxShadow: `0 0 22px ${accent}45` }} transition={{ duration: 0.18 }}
          style={{ width: 40, height: 40, borderRadius: 10, background: `${accent}15`, border: `1px solid ${accent}22`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
          {tool.icon}
        </motion.div>
        <div style={{ flex: 1, minWidth: 0, paddingRight: soon ? '2.5rem' : 0 }}>
          <div style={{ fontWeight: 800, fontSize: '0.875rem', color: txt, lineHeight: 1.2, marginBottom: '0.2rem' }}>{tool.name}</div>
          <div style={{ fontSize: '0.68rem', color: sub, lineHeight: 1.45 }}>{tool.tagline}</div>
        </div>
      </div>

      {/* Free tier */}
      <div style={{ fontSize: '0.6rem', color: muted, fontFamily: "'Share Tech Mono', monospace", marginBottom: '0.6rem', lineHeight: 1.35, paddingLeft: '0.25rem' }}>{tool.freeTier}</div>

      {/* Footer row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.28rem', flexWrap: 'wrap', paddingLeft: '0.25rem' }}>
        <span style={{ fontSize: '0.5rem', fontFamily: "'Share Tech Mono', monospace", padding: '0.12rem 0.4rem', borderRadius: 4, flexShrink: 0, background: tool.free ? `${freeColor}12` : `${paidColor}12`, color: tool.free ? freeColor : paidColor, border: `1px solid ${tool.free ? freeColor : paidColor}22` }}>
          {tool.free ? 'FREE' : 'PAID'}
        </span>
        {(tool.tags || []).slice(0, 2).map(tag => {
          const m = TAG_META[tag]; if (!m) return null
          return <span key={tag} style={{ fontSize: '0.5rem', fontFamily: "'Share Tech Mono', monospace", padding: '0.12rem 0.4rem', borderRadius: 4, background: m.bg, color: m.color, flexShrink: 0 }}>{m.label}</span>
        })}
        {!soon && (
          <motion.span whileHover={{ x: 3 }} style={{ marginLeft: 'auto', fontSize: '0.63rem', color: accent, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.18rem', flexShrink: 0 }}>
            Learn <ChevronRight size={9} />
          </motion.span>
        )}
      </div>
    </motion.div>
  )
}

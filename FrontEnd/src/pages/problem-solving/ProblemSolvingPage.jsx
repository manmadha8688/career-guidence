import { useNavigate } from 'react-router-dom'
import { Sun, Moon, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'

const TRACKS = [
  {
    key: 'start-coding',
    icon: '💻',
    title: 'Start Coding',
    subtitle: 'Never written code before?',
    desc: 'A guided path from absolute zero — variables, loops, and functions in the right order. Steps unlock one at a time so you build a foundation that actually holds.',
    color: '#22C55E',
    bg: 'rgba(34,197,94,0.08)',
    border: 'rgba(34,197,94,0.22)',
    tag: 'GUIDED PATH',
  },
  {
    key: 'logic-building',
    icon: '🧠',
    title: 'Logic Building',
    subtitle: 'Can code but cannot solve problems?',
    desc: 'Train the problem-solving muscle most tutorials skip — patterns, number problems, and array/string challenges that teach you how to think, not just what to type.',
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.22)',
    tag: 'THINK LIKE A DEV',
  },
  {
    key: 'skill-up',
    icon: '⚡',
    title: 'Skill Up',
    subtitle: 'Want to improve problem solving?',
    desc: 'Filter by topic and see the same problem solved in four languages — walking from the brute-force idea to the optimized solution, with the trade-offs explained.',
    color: '#0EA5E9',
    bg: 'rgba(14,165,233,0.08)',
    border: 'rgba(14,165,233,0.22)',
    tag: 'MULTI-LANGUAGE',
  },
  {
    key: 'interview-prep',
    icon: '💼',
    title: 'Interview Prep',
    subtitle: 'Preparing for job interviews?',
    desc: 'Follow a 7, 30, or 90-day plan built from the most-asked questions — output prediction, debugging, code-writing, and conceptual rounds, just like the real thing.',
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.22)',
    tag: 'GET HIRED',
  },
  {
    key: 'scenario-coding',
    icon: '🏗️',
    title: 'Scenario Coding',
    subtitle: 'Can you build real systems?',
    desc: 'Build the logic behind real systems — shopping carts, banking, parking lots, and booking engines. You get the scenario; you write the code that makes it work.',
    color: '#8B5CF6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.22)',
    tag: 'REAL WORLD',
  },
]

export default function ProblemSolvingPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light = theme === 'light'

  return (
    <div className="ps-page">
      <div className="ps-nav">
        <button type="button" onClick={() => navigate(-1)} className="ps-nav__back">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          LearnToEarn
        </button>

        <span className="ps-nav-center ps-nav-center--landing">
          PROBLEM SOLVING
        </span>

        <div className="ps-nav__actions">
          <button type="button" onClick={toggleTheme} className="ps-nav__theme">
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <button type="button" onClick={() => navigate('/skill-arena/dashboard')} className="ps-nav__arena">
            ⚔ SKILL ARENA
          </button>
        </div>
      </div>

      <div className="ps-tracks-wrap">
        <motion.div
          className="ps-tracks-header"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="ps-tracks-title">WHERE DO YOU START?</h1>
          <p className="ps-tracks-subtitle">
            Five tracks. One goal — write code that works and gets you hired.
          </p>
          <p className="ps-tracks-tip">
            <strong>Tip:</strong> be honest about your level and pick one track lower than you think.
            Solid basics beat rushed gaps every single time — and consistency beats intensity.
          </p>
        </motion.div>

        <div className="ps-tracks-grid">
          {TRACKS.map((t, i) => (
            <motion.button
              key={t.key}
              type="button"
              onClick={() => navigate(`/problem-solving/${t.key}`)}
              className="ps-track-card"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
              style={{
                '--track-color': t.color,
                '--track-bg': t.bg,
                '--track-border': t.border,
              }}
            >
              <div className="ps-track-card__icon">{t.icon}</div>
              <div className="ps-track-card__tag">{t.tag}</div>
              <div className="ps-track-card__title">{t.title}</div>
              <div className="ps-track-card__subtitle">{t.subtitle}</div>
              <div className="ps-track-card__desc">{t.desc}</div>
              <div className="ps-track-card__enter">
                ENTER <ChevronRight size={13} />
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

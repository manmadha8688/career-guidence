import { useNavigate } from 'react-router-dom'
import { Sun, Moon, ChevronRight } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const TRACKS = [
  {
    key: 'start-coding',
    icon: '💻',
    title: 'Start Coding',
    subtitle: 'Never written code before?',
    desc: 'Step-by-step guided path from zero. Variables, loops, functions — in order. Cannot skip steps.',
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
    desc: 'Train your problem-solving mind. Patterns, number problems, array and string challenges.',
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
    desc: 'Filter by topic. Same problem, four languages. Learn brute force to optimized approach.',
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
    desc: 'Pick a 7, 30, or 90-day plan. Most-asked questions with output, debug, write and conceptual types.',
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
    desc: 'real-world problems. Implement functions for shopping carts, banks, parking lots, booking systems — scenario first, you code the logic.',
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
        <div className="ps-tracks-header">
          <h1 className="ps-tracks-title">WHERE DO YOU START?</h1>
          <p className="ps-tracks-subtitle">
            Five tracks. One goal — write code that works and gets you hired.
          </p>
        </div>

        <div className="ps-tracks-grid">
          {TRACKS.map(t => (
            <button
              key={t.key}
              type="button"
              onClick={() => navigate(`/problem-solving/${t.key}`)}
              className="ps-track-card"
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
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect, useMemo, useRef } from 'react'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import { useParams, useNavigate } from 'react-router-dom'
import { Sun, Moon, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react'
import GlitchBreachLoader from '../../components/loaders/GlitchBreachLoader'
import SectionNotFoundPage from '../../components/SectionNotFoundPage'
import { useTheme } from '../../context/ThemeContext'
import { getProblem } from '../../api/api'
import BookmarkButton from '../../components/BookmarkButton'
import '../../styles/pages/shared/problem-solving.css'
import '../../styles/pages/shared/problem-solving-mobile.css'

const LANGS = [
  { key: 'python', label: 'Python' },
  { key: 'java',   label: 'Java'   },
  { key: 'c',      label: 'C'      },
  { key: 'cpp',    label: 'C++'    },
]

// Solution variants, in display order. Muted palette — no red.
const VARIANTS = [
  { key: 'brute',     label: 'Brute Force', color: '#F59E0B' },
  { key: 'normal',    label: 'Cleaner Way', color: '#60A5FA' },
  { key: 'optimized', label: 'Optimal',     color: '#4ADE80' },
]

const LEVEL_META = {
  BEGINNER:     { label: 'Beginner',     color: '#4ADE80' },
  INTERMEDIATE: { label: 'Intermediate', color: '#F59E0B' },
  ADVANCED:     { label: 'Advanced',     color: '#C084FC' },
}

const TRACK_META = {
  START_CODING:    { label: 'Start Coding',   color: '#9CA3AF' },
  LOGIC_BUILDING:  { label: 'Logic Building', color: '#4ADE80' },
  SKILL_UP:        { label: 'Skill Up',       color: '#60A5FA' },
  CRACK_IT:        { label: 'Crack It',       color: '#9B6ED4' },
  BUILD_IT:        { label: 'Build It',       color: '#F59E0B' },
  PROVE_IT:        { label: 'Prove It',       color: '#EF4444' },
}

export default function ProblemDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light = theme === 'light'

  const [problem, setProblem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  const [lang, setLang] = useState('python')
  const [variant, setVariant] = useState(null)
  const [revealedHints, setRevealedHints] = useState(0)
  const [solutionOpen, setSolutionOpen] = useState(false)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [tipOpen, setTipOpen] = useState(false)

  useEffect(() => {
    let active = true
    let doneTimer
    getProblem(id)
      .then(r => { if (active) setProblem(r.data) })
      .catch(() => { if (active) setNotFound(true) })
      .finally(() => { if (active) doneTimer = setTimeout(() => setLoading(false), PAGE_MIN_MS) })
    return () => { active = false; clearTimeout(doneTimer) }
  }, [id])

  // Only offer solution variants that actually have code — a beginner problem may ship just one.
  const availableVariants = useMemo(() => {
    if (!problem?.solutions) return []
    return VARIANTS
      .filter(v => {
        const s = problem.solutions[v.key]
        return s && s.code && LANGS.some(l => s.code[l.key]?.trim())
      })
      .map(v => {
        // A lone variant is just "Solution" — no need to call it brute/optimal.
        const label = (problem.solutions && countVariants(problem.solutions) === 1) ? 'Solution' : v.label
        return { ...v, label }
      })
  }, [problem])

  useEffect(() => {
    if (availableVariants.length) setVariant(availableVariants[0].key)
  }, [availableVariants])

  if (loading) return <GlitchBreachLoader accentColor="#8b7fd4" label="LOADING PROBLEM" />

  if (notFound) return <SectionNotFoundPage variant="code-gym" />

  const lm = LEVEL_META[problem.level] || LEVEL_META.BEGINNER
  const trackMeta = TRACK_META[problem.track]
  const activeVariant = variant || availableVariants[0]?.key
  const sol = activeVariant ? problem.solutions?.[activeVariant] : null
  const code = sol?.code?.[lang] || ''
  const varMeta = availableVariants.find(v => v.key === activeVariant)
  const examples = problem.examples || []
  const learn = problem.whatYouLearn || []

  return (
    <div className="ps-page" style={trackMeta ? { '--track-color': trackMeta.color } : undefined}>
      <div className="ps-nav">
        <button type="button" onClick={() => navigate(-1)} className="ps-nav__back">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          PROBLEMS
        </button>

        <span className="ps-nav-center ps-nav-center--detail">
          {problem.title}
        </span>

        <div className="ps-nav__actions">
          <button type="button" onClick={toggleTheme} className="ps-nav__theme">
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>
      </div>

      <div className="ps-detail-grid">
        <div className="ps-detail-left">
          <div className="ps-card ps-card--statement">
            <span className="ps-card__bookmark">
              <BookmarkButton
                type="PROBLEM"
                refId={id}
                title={problem.title}
                description={problem.level}
                icon="💻"
                iconOnly
              />
            </span>
            <div className="ps-meta-row">
              <span className="ps-badge ps-badge--level" style={{ '--lm-color': lm.color }}>{lm.label}</span>
              {trackMeta && <span className="ps-badge ps-badge--track">{trackMeta.label}</span>}
              {problem.category && <span className="ps-badge ps-badge--track">{problem.category}</span>}
            </div>
            <h1 className="ps-problem-title">{problem.title}</h1>
            <pre className="ps-problem-desc">{problem.description}</pre>
          </div>

          {problem.codeSnippet && (
            <div className="ps-card ps-card--compact">
              <SectionLabel label="Read the Code" accentColor="#60A5FA" />
              <div className="ps-snippet-hint">Trace it by hand — don't run it.</div>
              <pre className="ps-code-pre ps-code-pre--snippet">{problem.codeSnippet}</pre>
            </div>
          )}

          {(problem.inputFormat || problem.outputFormat || examples.length > 0 || problem.constraints) && (
            <div className="ps-card ps-card--compact">
              <SectionLabel label="Input / Output" />
              {problem.inputFormat && (
                <div className="ps-field-block">
                  <Label>Input Format</Label>
                  <p className="ps-field-text">{problem.inputFormat}</p>
                </div>
              )}
              {problem.outputFormat && (
                <div className="ps-field-block ps-field-block--spaced">
                  <Label>Output Format</Label>
                  <p className="ps-field-text">{problem.outputFormat}</p>
                </div>
              )}

              {examples.map((ex, i) => (
                <div
                  key={i}
                  className={`ps-example-block${i < examples.length - 1 ? ' ps-example-block--with-gap' : ''}`}
                >
                  <div className="ps-example-label">Example {i + 1}</div>
                  <div className="ps-io-grid">
                    <div>
                      <Label>Input</Label>
                      <CodeBlock code={ex.input} />
                    </div>
                    <div>
                      <Label>Output</Label>
                      <CodeBlock code={ex.output} />
                    </div>
                  </div>
                  {ex.explanation && (
                    <div className="ps-explanation-box">
                      <span className="ps-explanation-box__label">Explanation:</span>
                      {ex.explanation}
                    </div>
                  )}
                </div>
              ))}

              {problem.constraints && (
                <div className="ps-constraints">
                  <Label>Constraints</Label>
                  <p className="ps-constraints-text">{problem.constraints}</p>
                </div>
              )}
            </div>
          )}

          {learn.length > 0 && (
            <div className="ps-card ps-card--compact">
              <SectionLabel label="What You'll Learn" accentColor="#4ADE80" />
              <ul className="ps-learn-list">
                {learn.map((item, i) => (
                  <li key={i} className="ps-learn-item">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {(problem.hints || []).length > 0 && (
            <div className="ps-card ps-card--compact">
              <SectionLabel label="Hints" accentColor="#F59E0B" />
              <div className="ps-hints-list">
                {problem.hints.map((hint, i) => (
                  <div
                    key={i}
                    className={`ps-hint-item${
                      i < revealedHints ? ' ps-hint-item--revealed' :
                      i === revealedHints ? ' ps-hint-item--next ps-hint-item--locked' :
                      ' ps-hint-item--locked'
                    }`}
                    onClick={() => i === revealedHints && setRevealedHints(i + 1)}
                  >
                    <span className="ps-hint-item__num">HINT {i + 1}</span>
                    {i < revealedHints ? (
                      <span className="ps-hint-item__text">{hint}</span>
                    ) : (
                      <span className="ps-hint-item__placeholder">
                        {i === revealedHints ? <><Eye size={13} /> Click to reveal</> : <><EyeOff size={13} /> Locked</>}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {problem.approach && (
            <div className="ps-card ps-card--compact">
              <SectionLabel label="How to Approach It" accentColor="#9B6ED4" />
              <p className="ps-accordion-text ps-accordion-text--approach">{problem.approach}</p>
            </div>
          )}
        </div>

        <div className="ps-detail-right">
          {availableVariants.length > 0 && (
            <div className="ps-card ps-card--flush">
              <button
                type="button"
                onClick={() => setSolutionOpen(o => !o)}
                className={`ps-accordion-toggle${solutionOpen ? ' ps-accordion-toggle--open' : ''}`}
              >
                <span className="ps-accordion-toggle__label">SOLUTION</span>
                {solutionOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
              </button>

              {solutionOpen && (
                <div className="ps-accordion-body ps-accordion-body--solution">
                  <div className="ps-tab-group">
                    <Label>Language</Label>
                    <div className="ps-tab-row">
                      {LANGS.map(l => (
                        <button
                          key={l.key}
                          type="button"
                          onClick={() => setLang(l.key)}
                          className={`ps-lang-tab${lang === l.key ? ' ps-lang-tab--active' : ''}`}
                        >
                          {l.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {availableVariants.length > 1 && (
                    <div className="ps-tab-group ps-tab-group--variant">
                      <Label>Approach</Label>
                      <div className="ps-tab-row">
                        {availableVariants.map(v => (
                          <button
                            key={v.key}
                            type="button"
                            onClick={() => setVariant(v.key)}
                            className={`ps-variant-tab${activeVariant === v.key ? ' ps-variant-tab--active' : ''}`}
                            style={{ '--accent-color': v.color }}
                          >
                            {v.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {sol && (
                    <div className="ps-complexity-row">
                      <ComplexityBadge label="Time" value={sol.timeComplexity} color={varMeta?.color} />
                      <ComplexityBadge label="Space" value={sol.spaceComplexity} color="#60A5FA" />
                    </div>
                  )}

                  {sol?.logic && (
                    <div className="ps-approach-box" style={{ '--accent-color': varMeta?.color }}>
                      <div className="ps-approach-box__label">HOW IT WORKS</div>
                      <p className="ps-approach-box__text">{sol.logic}</p>
                    </div>
                  )}

                  {code ? (
                    <div className="ps-code-panel">
                      <div className="ps-code-header">
                        <span className="ps-code-header__label">
                          {LANGS.find(l => l.key === lang)?.label?.toUpperCase()}
                          {varMeta && ` · ${varMeta.label.toUpperCase()}`}
                        </span>
                        <CopyButton code={code} />
                      </div>
                      <pre className="ps-code-pre">{code}</pre>
                    </div>
                  ) : (
                    <div className="ps-no-solution">
                      No solution available for this language yet.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {problem.explanation && (
            <Accordion open={explanationOpen} onToggle={() => setExplanationOpen(o => !o)} label="Explanation">
              <p className="ps-accordion-text ps-accordion-text--pre">{problem.explanation}</p>
            </Accordion>
          )}

          {problem.tip && (
            <Accordion open={tipOpen} onToggle={() => setTipOpen(o => !o)}
              label="Tip" accentColor="#F59E0B">
              <p className="ps-accordion-text">{problem.tip}</p>
            </Accordion>
          )}
        </div>
      </div>
    </div>
  )
}

function countVariants(solutions) {
  return VARIANTS.reduce((n, v) => {
    const s = solutions[v.key]
    return n + (s && s.code && LANGS.some(l => s.code[l.key]?.trim()) ? 1 : 0)
  }, 0)
}

function SectionLabel({ label, accentColor }) {
  return (
    <div
      className="ps-section-label"
      style={accentColor ? { '--accent-color': accentColor } : undefined}
    >
      {label}
    </div>
  )
}

function Label({ children }) {
  return <div className="ps-field-label">{children}</div>
}

function CodeBlock({ code }) {
  return <pre className="ps-code-block">{code}</pre>
}

function ComplexityBadge({ label, value, color }) {
  return (
    <div className="ps-complexity-badge" style={{ '--accent-color': color }}>
      <span className="ps-complexity-badge__label">{label}</span>
      <span className="ps-complexity-badge__value">{value}</span>
    </div>
  )
}

function Accordion({ open: externalOpen, onToggle, label, accentColor, children, defaultOpen }) {
  const [isOpen, setIsOpen] = useState(defaultOpen ?? externalOpen)
  const toggle = () => { setIsOpen(o => !o); onToggle?.() }

  return (
    <div className="ps-card ps-card--flush">
      <button
        type="button"
        onClick={toggle}
        className={`ps-accordion-toggle${isOpen ? ' ps-accordion-toggle--open' : ''}`}
      >
        <span
          className="ps-accordion-toggle__label"
          style={accentColor ? { '--accent-color': accentColor } : undefined}
        >
          {label?.toUpperCase()}
        </span>
        {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {isOpen && <div className="ps-accordion-body">{children}</div>}
    </div>
  )
}

function CopyButton({ code }) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef(null)
  useEffect(() => () => clearTimeout(timerRef.current), [])
  const copy = () => {
    navigator.clipboard?.writeText(code).then(() => {
      setCopied(true)
      timerRef.current = setTimeout(() => setCopied(false), 1500)
    })
  }
  return (
    <button type="button" onClick={copy} className={`ps-copy-btn${copied ? ' ps-copy-btn--copied' : ''}`}>
      {copied ? 'COPIED ✓' : 'COPY'}
    </button>
  )
}

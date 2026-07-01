import { useState, useEffect, useRef } from 'react'
import { PAGE_MIN_MS } from '../../components/loaders/_config'
import { useParams, useNavigate } from 'react-router-dom'
import { Sun, Moon, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react'
import GlitchBreachLoader from '../../components/loaders/GlitchBreachLoader'
import { useTheme } from '../../context/ThemeContext'
import { getProblem } from '../../api/api'

const LANGS = [
  { key: 'python', label: 'Python' },
  { key: 'java',   label: 'Java'   },
  { key: 'c',      label: 'C'      },
  { key: 'cpp',    label: 'C++'    },
]
const VARIANTS = [
  { key: 'brute',     label: 'Brute Force',      color: '#EF4444' },
  { key: 'normal',    label: 'Better Approach',  color: '#F59E0B' },
  { key: 'optimized', label: 'Optimal Solution', color: '#22C55E' },
]
const LEVEL_META = {
  BEGINNER:     { label: 'Beginner',     color: '#22C55E' },
  INTERMEDIATE: { label: 'Intermediate', color: '#F59E0B' },
  ADVANCED:     { label: 'Advanced',     color: '#EF4444' },
}
const TYPE_META = {
  WRITE:      { label: 'Write Code',   color: '#0EA5E9' },
  PATTERN:    { label: 'Pattern',      color: '#A78BFA' },
  OUTPUT:     { label: 'Output Based', color: '#34D399' },
  DEBUG:      { label: 'Debug',        color: '#FB923C' },
  CONCEPTUAL: { label: 'Conceptual',   color: '#94A3B8' },
}
const TRACK_LABELS = {
  START_CODING:    'Start Coding',
  LOGIC_BUILDING:  'Logic Building',
  SKILL_UP:        'Skill Up',
  INTERVIEW_PREP:  'Interview Prep',
  SCENARIO_CODING: 'Scenario Coding',
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
  const [variant, setVariant] = useState('normal')
  const [revealedHints, setRevealedHints] = useState(0)
  const [approachOpen, setApproachOpen] = useState(false)
  const [solutionOpen, setSolutionOpen] = useState(false)
  const [explanationOpen, setExplanationOpen] = useState(false)
  const [tipOpen, setTipOpen] = useState(false)

  useEffect(() => {
    getProblem(id)
      .then(r => setProblem(r.data))
      .catch(() => setNotFound(true))
      .finally(() => setTimeout(() => setLoading(false), PAGE_MIN_MS))
  }, [id])

  if (loading) return <GlitchBreachLoader accentColor="#f97316" label="LOADING PROBLEM" />

  if (notFound) return (
    <div className="ps-page ps-page--centered">
      <div className="ps-not-found-text">Problem not found.</div>
      <button type="button" onClick={() => navigate(-1)} className="ps-back-btn">
        ← Back
      </button>
    </div>
  )

  const lm = LEVEL_META[problem.level] || LEVEL_META.BEGINNER
  const tm = TYPE_META[problem.type] || TYPE_META.WRITE
  const sol = problem.solutions?.[variant]
  const code = sol?.code?.[lang] || ''
  const varMeta = VARIANTS.find(v => v.key === variant)

  return (
    <div className="ps-page">
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
          <div className="ps-card">
            <div className="ps-meta-row">
              <span className="ps-badge ps-badge--level" style={{ '--lm-color': lm.color }}>{lm.label}</span>
              <span className="ps-badge ps-badge--type" style={{ '--tm-color': tm.color }}>{tm.label}</span>
              {(problem.tracks || [problem.track]).filter(Boolean).map(t => (
                <span key={t} className="ps-badge ps-badge--track">{TRACK_LABELS[t] || t}</span>
              ))}
              {problem.isInterview && <span className="ps-badge ps-badge--interview">★ Interview</span>}
            </div>
            <h1 className="ps-problem-title">{problem.title}</h1>
            <pre className="ps-problem-desc">{problem.description}</pre>
          </div>

          {(problem.inputFormat || problem.sampleInput) && (
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

              {problem.sampleInput && (
                <div className={`ps-example-block${problem.sampleInput2 ? ' ps-example-block--with-gap' : ''}`}>
                  <div className="ps-example-label">Example 1</div>
                  <div className="ps-io-grid">
                    <div>
                      <Label>Input</Label>
                      <CodeBlock code={problem.sampleInput} />
                    </div>
                    <div>
                      <Label>Output</Label>
                      <CodeBlock code={problem.sampleOutput} />
                    </div>
                  </div>
                  {problem.example1Explanation && (
                    <div className="ps-explanation-box">
                      <span className="ps-explanation-box__label">Explanation:</span>
                      {problem.example1Explanation}
                    </div>
                  )}
                </div>
              )}

              {problem.sampleInput2 && (
                <div className="ps-example-block">
                  <div className="ps-example-label">Example 2</div>
                  <div className="ps-io-grid">
                    <div>
                      <Label>Input</Label>
                      <CodeBlock code={problem.sampleInput2} />
                    </div>
                    <div>
                      <Label>Output</Label>
                      <CodeBlock code={problem.sampleOutput2} />
                    </div>
                  </div>
                  {problem.example2Explanation && (
                    <div className="ps-explanation-box">
                      <span className="ps-explanation-box__label">Explanation:</span>
                      {problem.example2Explanation}
                    </div>
                  )}
                </div>
              )}

              {problem.constraints && (
                <div className="ps-constraints">
                  <Label>Constraints</Label>
                  <p className="ps-constraints-text">{problem.constraints}</p>
                </div>
              )}
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
            <Accordion open={approachOpen} onToggle={() => setApproachOpen(o => !o)}
              label="Approach" accentColor="#A78BFA">
              <p className="ps-accordion-text ps-accordion-text--approach">{problem.approach}</p>
            </Accordion>
          )}

          {problem.isInterview && (problem.companiesThatAsk || []).length > 0 && (
            <div className="ps-card ps-card--tight">
              <SectionLabel label="Asked By" accentColor="#EF4444" />
              <div className="ps-companies-row">
                {problem.companiesThatAsk.map(c => (
                  <span key={c} className="ps-company-tag">{c}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="ps-detail-right">
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

                <div className="ps-tab-group ps-tab-group--variant">
                  <Label>Approach</Label>
                  <div className="ps-tab-row">
                    {VARIANTS.map(v => (
                      <button
                        key={v.key}
                        type="button"
                        onClick={() => setVariant(v.key)}
                        className={`ps-variant-tab${variant === v.key ? ' ps-variant-tab--active' : ''}`}
                        style={{ '--accent-color': v.color }}
                      >
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                {sol && (
                  <div className="ps-complexity-row">
                    <ComplexityBadge label="Time" value={sol.timeComplexity} color={varMeta?.color} />
                    <ComplexityBadge label="Space" value={sol.spaceComplexity} color="#60A5FA" />
                  </div>
                )}

                {sol?.logic && (
                  <div className="ps-approach-box" style={{ '--accent-color': varMeta?.color }}>
                    <div className="ps-approach-box__label">APPROACH NAME</div>
                    <p className="ps-approach-box__text">{sol.logic}</p>
                  </div>
                )}

                {code ? (
                  <div className="ps-code-panel">
                    <div className="ps-code-header">
                      <span className="ps-code-header__label">
                        {LANGS.find(l => l.key === lang)?.label?.toUpperCase()} · {varMeta?.label?.toUpperCase()}
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

          {problem.explanation && (
            <Accordion open={explanationOpen} onToggle={() => setExplanationOpen(o => !o)} label="Explanation">
              <p className="ps-accordion-text ps-accordion-text--pre">{problem.explanation}</p>
            </Accordion>
          )}

          {problem.interviewTip && (
            <Accordion open={tipOpen} onToggle={() => setTipOpen(o => !o)}
              label="Interview Tip" accentColor="#F59E0B">
              <p className="ps-accordion-text">{problem.interviewTip}</p>
            </Accordion>
          )}
        </div>
      </div>
    </div>
  )
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

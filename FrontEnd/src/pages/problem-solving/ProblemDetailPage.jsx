import { useState, useEffect, useRef } from 'react'
import { TEST_DELAY_MS, PAGE_MIN_MS } from '../../components/loaders/_config'
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
    <div style={{ minHeight: '100vh', background: 'var(--ps-bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
      <div style={{ fontFamily: "'Share Tech Mono', monospace", color: 'var(--ps-muted)' }}>Problem not found.</div>
      <button onClick={() => navigate(-1)} style={{ background: 'var(--ps-accent-dim)', border: '1px solid var(--ps-accent)', borderRadius: 6, padding: '0.5rem 1rem', cursor: 'pointer', color: 'var(--ps-accent)', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8rem' }}>
        ← Back
      </button>
    </div>
  )

  const lm = LEVEL_META[problem.level] || LEVEL_META.BEGINNER
  const tm = TYPE_META[problem.type] || TYPE_META.WRITE
  const sol = problem.solutions?.[variant]
  const code = sol?.code?.[lang] || ''
  const varMeta = VARIANTS.find(v => v.key === variant)

  const navStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 1.25rem', height: 52,
    background: 'var(--ps-nav-bg)', backdropFilter: 'blur(8px)',
    borderBottom: '1px solid var(--ps-nav-border)',
    position: 'sticky', top: 0, zIndex: 50,
  }

  return (
    <div style={{ minHeight: '100vh', overflowX: 'hidden', background: 'var(--ps-bg)', fontFamily: "'Rajdhani', sans-serif", color: 'var(--text-primary)' }}>

      {/* ── Nav ──────────────────────────────────────────────── */}
      <div style={navStyle}>
        <button onClick={() => navigate(-1)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          fontFamily: "'Orbitron', sans-serif", fontWeight: 900,
          fontSize: '0.72rem', letterSpacing: '0.1em',
          color: 'var(--ps-accent)', padding: 0,
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          PROBLEMS
        </button>

        <span className="ps-nav-center" style={{
          fontFamily: "'Rajdhani', sans-serif", fontSize: '0.85rem', fontWeight: 700,
          color: 'var(--text-secondary)',
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          maxWidth: '40%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {problem.title}
        </span>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={toggleTheme} style={{
            background: 'none', border: '1px solid var(--ps-nav-border)',
            borderRadius: 6, width: 32, height: 32, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--ps-muted)',
          }}>
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────────────── */}
      <div style={{
        maxWidth: 1200, margin: '0 auto', padding: '1.5rem',
        display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.3fr)',
        gap: '1.5rem', alignItems: 'start',
        boxSizing: 'border-box', width: '100%',
      }}
        className="ps-detail-grid"
      >

        {/* ── Left: Problem ──────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: 0 }}>

          {/* Title + meta */}
          <div style={{
            background: 'var(--ps-card-bg)', border: '1px solid var(--ps-card-border)',
            borderRadius: 10, padding: '1.25rem', overflow: 'hidden',
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.62rem', fontFamily: "'Share Tech Mono', monospace", padding: '0.15rem 0.5rem', borderRadius: 3, background: `${lm.color}15`, color: lm.color, border: `1px solid ${lm.color}30` }}>{lm.label}</span>
              <span style={{ fontSize: '0.62rem', fontFamily: "'Share Tech Mono', monospace", padding: '0.15rem 0.5rem', borderRadius: 3, background: `${tm.color}12`, color: tm.color, border: `1px solid ${tm.color}25` }}>{tm.label}</span>
              {(problem.tracks || [problem.track]).filter(Boolean).map(t => (
                <span key={t} style={{ fontSize: '0.62rem', fontFamily: "'Share Tech Mono', monospace", padding: '0.15rem 0.5rem', borderRadius: 3, color: 'var(--ps-muted)', border: '1px solid var(--ps-card-border)' }}>{TRACK_LABELS[t] || t}</span>
              ))}
              {problem.isInterview && <span style={{ fontSize: '0.62rem', fontFamily: "'Share Tech Mono', monospace", padding: '0.15rem 0.5rem', borderRadius: 3, background: 'rgba(239,68,68,0.12)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.25)' }}>★ Interview</span>}
            </div>
            <h1 style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: '1.4rem', margin: '0 0 0.75rem', lineHeight: 1.3 }}>
              {problem.title}
            </h1>
            <pre style={{ fontFamily: "'Rajdhani', sans-serif", fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
              {problem.description}
            </pre>
          </div>

          {/* Input / Output */}
          {(problem.inputFormat || problem.sampleInput) && (
            <div style={{ background: 'var(--ps-card-bg)', border: '1px solid var(--ps-card-border)', borderRadius: 10, padding: '1.125rem', overflow: 'hidden' }}>
              <SectionLabel label="Input / Output" color="var(--ps-accent)" />
              {problem.inputFormat && (
                <div style={{ marginBottom: '0.75rem' }}>
                  <Label>Input Format</Label>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>{problem.inputFormat}</p>
                </div>
              )}
              {problem.outputFormat && (
                <div style={{ marginBottom: '0.875rem' }}>
                  <Label>Output Format</Label>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>{problem.outputFormat}</p>
                </div>
              )}

              {/* Example 1 */}
              {problem.sampleInput && (
                <div style={{ marginBottom: problem.sampleInput2 ? '1rem' : '0' }}>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--ps-accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Example 1
                  </div>
                  <div className="ps-io-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <Label>Input</Label>
                      <CodeBlock code={problem.sampleInput} light={light} />
                    </div>
                    <div>
                      <Label>Output</Label>
                      <CodeBlock code={problem.sampleOutput} light={light} />
                    </div>
                  </div>
                  {problem.example1Explanation && (
                    <div style={{ marginTop: '0.5rem', padding: '0.5rem 0.75rem', background: 'var(--ps-hint-bg)', borderRadius: 6, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'var(--ps-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '0.4rem' }}>Explanation:</span>
                      {problem.example1Explanation}
                    </div>
                  )}
                </div>
              )}

              {/* Example 2 */}
              {problem.sampleInput2 && (
                <div style={{ marginBottom: '0' }}>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.1em', color: 'var(--ps-accent)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                    Example 2
                  </div>
                  <div className="ps-io-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <Label>Input</Label>
                      <CodeBlock code={problem.sampleInput2} light={light} />
                    </div>
                    <div>
                      <Label>Output</Label>
                      <CodeBlock code={problem.sampleOutput2} light={light} />
                    </div>
                  </div>
                  {problem.example2Explanation && (
                    <div style={{ marginTop: '0.5rem', padding: '0.5rem 0.75rem', background: 'var(--ps-hint-bg)', borderRadius: 6, fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'var(--ps-accent)', textTransform: 'uppercase', letterSpacing: '0.08em', marginRight: '0.4rem' }}>Explanation:</span>
                      {problem.example2Explanation}
                    </div>
                  )}
                </div>
              )}

              {problem.constraints && (
                <div style={{ marginTop: '0.875rem', paddingTop: '0.75rem', borderTop: '1px solid var(--ps-card-border)' }}>
                  <Label>Constraints</Label>
                  <p style={{ fontSize: '0.82rem', color: 'var(--ps-muted)', margin: '0.25rem 0 0', fontFamily: "'Share Tech Mono', monospace" }}>{problem.constraints}</p>
                </div>
              )}
            </div>
          )}

          {/* Hints */}
          {(problem.hints || []).length > 0 && (
            <div style={{ background: 'var(--ps-card-bg)', border: '1px solid var(--ps-card-border)', borderRadius: 10, padding: '1.125rem', overflow: 'hidden' }}>
              <SectionLabel label="Hints" color="#F59E0B" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {problem.hints.map((hint, i) => (
                  <div key={i} style={{
                    padding: '0.65rem 0.875rem', borderRadius: 7,
                    background: i < revealedHints ? 'var(--ps-hint-bg)' : 'var(--bg-tertiary)',
                    border: `1px solid ${i < revealedHints ? 'var(--ps-card-border)' : 'var(--border)'}`,
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    cursor: i === revealedHints ? 'pointer' : 'default',
                    transition: 'all 0.15s',
                  }}
                    onClick={() => i === revealedHints && setRevealedHints(i + 1)}
                  >
                    <span style={{
                      fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem',
                      color: '#F59E0B', minWidth: 48,
                    }}>
                      HINT {i + 1}
                    </span>
                    {i < revealedHints ? (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', flex: 1 }}>{hint}</span>
                    ) : (
                      <span style={{ fontSize: '0.82rem', color: 'var(--ps-muted)', flex: 1, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        {i === revealedHints ? <><Eye size={13} /> Click to reveal</> : <><EyeOff size={13} /> Locked</>}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Approach */}
          {problem.approach && (
            <Accordion open={approachOpen} onToggle={() => setApproachOpen(o => !o)}
              label="Approach" accentColor="#A78BFA">
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                {problem.approach}
              </p>
            </Accordion>
          )}

          {/* Companies */}
          {problem.isInterview && (problem.companiesThatAsk || []).length > 0 && (
            <div style={{ background: 'var(--ps-card-bg)', border: '1px solid var(--ps-card-border)', borderRadius: 10, padding: '1rem', overflow: 'hidden' }}>
              <SectionLabel label="Asked By" color="#EF4444" />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {problem.companiesThatAsk.map(c => (
                  <span key={c} style={{
                    fontSize: '0.72rem', fontFamily: "'Share Tech Mono', monospace",
                    padding: '0.2rem 0.6rem', borderRadius: 4,
                    background: 'rgba(239,68,68,0.08)', color: '#EF4444',
                    border: '1px solid rgba(239,68,68,0.2)',
                  }}>{c}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: Solutions ───────────────────────────────── */}
        <div className="ps-detail-right" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'sticky', top: 60, minWidth: 0 }}>

          <div style={{ background: 'var(--ps-card-bg)', border: '1px solid var(--ps-card-border)', borderRadius: 10, overflow: 'hidden' }}>
            {/* Solution header */}
            <button onClick={() => setSolutionOpen(o => !o)} style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '0.875rem 1.125rem', background: 'none', border: 'none',
              borderBottom: solutionOpen ? '1px solid var(--ps-card-border)' : 'none',
              cursor: 'pointer', color: 'var(--text-primary)',
            }}>
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em', color: 'var(--ps-accent)' }}>SOLUTION</span>
              {solutionOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
            </button>

            {solutionOpen && (
              <div style={{ padding: '1rem' }}>
                {/* Language tabs */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <Label>Language</Label>
                  <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                    {LANGS.map(l => (
                      <button key={l.key} onClick={() => setLang(l.key)} style={{
                        padding: '0.3rem 0.75rem', borderRadius: 6, cursor: 'pointer',
                        fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem',
                        letterSpacing: '0.05em',
                        background: lang === l.key ? 'var(--ps-accent)' : 'var(--ps-hint-bg)',
                        color: lang === l.key ? '#fff' : 'var(--ps-muted)',
                        border: `1px solid ${lang === l.key ? 'var(--ps-accent)' : 'var(--ps-card-border)'}`,
                        transition: 'all 0.12s',
                      }}>
                        {l.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Variant tabs */}
                <div style={{ marginBottom: '0.875rem' }}>
                  <Label>Approach</Label>
                  <div style={{ display: 'flex', gap: '0.35rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                    {VARIANTS.map(v => (
                      <button key={v.key} onClick={() => setVariant(v.key)} style={{
                        padding: '0.3rem 0.75rem', borderRadius: 6, cursor: 'pointer',
                        fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem',
                        letterSpacing: '0.04em',
                        background: variant === v.key ? `${v.color}20` : 'transparent',
                        color: variant === v.key ? v.color : 'var(--ps-muted)',
                        border: `1px solid ${variant === v.key ? `${v.color}50` : 'var(--ps-card-border)'}`,
                        transition: 'all 0.12s',
                      }}>
                        {v.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Complexity */}
                {sol && (
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.875rem', flexWrap: 'wrap' }}>
                    <ComplexityBadge label="Time" value={sol.timeComplexity} color={varMeta?.color} />
                    <ComplexityBadge label="Space" value={sol.spaceComplexity} color="#60A5FA" />
                  </div>
                )}

                {/* Logic — approach name for this solution variant */}
                {sol?.logic && (
                  <div style={{
                    padding: '0.65rem 0.875rem', borderRadius: 7,
                    background: `${varMeta?.color}10`, border: `1px solid ${varMeta?.color}30`,
                    marginBottom: '0.875rem',
                  }}>
                    <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: varMeta?.color, letterSpacing: '0.1em', marginBottom: '0.35rem' }}>APPROACH NAME</div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.55, fontWeight: 600 }}>{sol.logic}</p>
                  </div>
                )}

                {/* Code block */}
                {code ? (
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '0.5rem 0.875rem', borderRadius: '7px 7px 0 0',
                      background: light ? '#D0E8FA' : '#0A1E34',
                      border: '1px solid var(--ps-code-border)',
                      borderBottom: 'none',
                    }}>
                      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: 'var(--ps-accent)', letterSpacing: '0.08em' }}>
                        {LANGS.find(l => l.key === lang)?.label?.toUpperCase()} · {varMeta?.label?.toUpperCase()}
                      </span>
                      <CopyButton code={code} />
                    </div>
                    <pre style={{
                      margin: 0, padding: '1rem',
                      background: 'var(--ps-code-bg)',
                      border: '1px solid var(--ps-code-border)',
                      borderRadius: '0 0 7px 7px',
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '0.82rem', lineHeight: 1.65,
                      color: light ? '#1E293B' : '#CBD5E1',
                      overflowX: 'auto', whiteSpace: 'pre',
                    }}>
                      {code}
                    </pre>
                  </div>
                ) : (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--ps-muted)', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.72rem' }}>
                    No solution available for this language yet.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Explanation */}
          {problem.explanation && (
            <Accordion open={explanationOpen} onToggle={() => setExplanationOpen(o => !o)} label="Explanation" accentColor="var(--ps-accent)">
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, whiteSpace: 'pre-wrap' }}>
                {problem.explanation}
              </p>
            </Accordion>
          )}

          {/* Interview Tip */}
          {problem.interviewTip && (
            <Accordion open={tipOpen} onToggle={() => setTipOpen(o => !o)}
              label="Interview Tip" accentColor="#F59E0B">
              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                {problem.interviewTip}
              </p>
            </Accordion>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .ps-nav-center { display: none !important; }
          .ps-detail-grid { grid-template-columns: 1fr !important; padding: 0.875rem !important; gap: 0.875rem !important; }
          .ps-detail-right { position: static !important; top: auto !important; }
          .ps-io-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

// ─── Small helpers ────────────────────────────────────────────────────────────

function SectionLabel({ label, color }) {
  return (
    <div style={{
      fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem',
      letterSpacing: '0.12em', color: color || 'var(--ps-accent)',
      textTransform: 'uppercase', borderBottom: '1px solid var(--ps-nav-border)',
      paddingBottom: '0.35rem', marginBottom: '0.75rem',
    }}>
      {label}
    </div>
  )
}

function Label({ children }) {
  return (
    <div style={{
      fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem',
      letterSpacing: '0.1em', color: 'var(--ps-muted)',
      textTransform: 'uppercase',
    }}>
      {children}
    </div>
  )
}

function CodeBlock({ code, light }) {
  return (
    <pre style={{
      margin: '0.3rem 0 0', padding: '0.5rem 0.75rem',
      background: 'var(--ps-code-bg)', border: '1px solid var(--ps-code-border)',
      borderRadius: 6, fontFamily: "'Share Tech Mono', monospace",
      fontSize: '0.78rem', color: light ? '#1E293B' : '#CBD5E1',
      overflowX: 'auto', whiteSpace: 'pre-wrap',
      wordBreak: 'break-all', overflowWrap: 'break-word',
    }}>
      {code}
    </pre>
  )
}

function ComplexityBadge({ label, value, color }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: '0.15rem',
      padding: '0.4rem 0.75rem', borderRadius: 7,
      background: `${color}12`, border: `1px solid ${color}25`,
    }}>
      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.55rem', color: 'var(--ps-muted)', letterSpacing: '0.08em' }}>{label}</span>
      <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.78rem', color: color, fontWeight: 700 }}>{value}</span>
    </div>
  )
}

function Accordion({ open: externalOpen, onToggle, label, accentColor, children, defaultOpen }) {
  const [isOpen, setIsOpen] = useState(defaultOpen ?? externalOpen)
  const toggle = () => { setIsOpen(o => !o); onToggle?.() }

  return (
    <div style={{ background: 'var(--ps-card-bg)', border: '1px solid var(--ps-card-border)', borderRadius: 10, overflow: 'hidden' }}>
      <button onClick={toggle} style={{
        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.875rem 1.125rem', background: 'none', border: 'none',
        borderBottom: isOpen ? '1px solid var(--ps-card-border)' : 'none',
        cursor: 'pointer', color: 'var(--text-primary)',
      }}>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.1em', color: accentColor }}>{label?.toUpperCase()}</span>
        {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
      {isOpen && <div style={{ padding: '1rem 1.125rem' }}>{children}</div>}
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
    <button onClick={copy} style={{
      background: 'none', border: 'none', cursor: 'pointer', padding: '0.1rem 0.3rem',
      fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem',
      color: copied ? '#22C55E' : 'var(--ps-muted)', transition: 'color 0.2s',
    }}>
      {copied ? 'COPIED ✓' : 'COPY'}
    </button>
  )
}

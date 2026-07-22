import { useState, useRef, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import MonacoEditor from './monacoSetup'
import { Play, Send, Loader2, Check, X, Lock, RotateCcw, Sparkles } from 'lucide-react'
import { executeCode, judgeCode } from '../../../api/api'
import getApiError from '../../../utils/apiError'
import { useAuth } from '../../../context/AuthContext'
import { isGuest } from '../../../utils/auth'
import RegisterCTA from '../../../components/RegisterCTA'

const LANGS = [
  { key: 'python', label: 'Python', monaco: 'python' },
  { key: 'java',   label: 'Java',   monaco: 'java' },
  { key: 'c',      label: 'C',      monaco: 'c' },
  { key: 'cpp',    label: 'C++',    monaco: 'cpp' },
]

const VERDICT = {
  ACCEPTED:      { label: 'Accepted',            glyph: '✅', cls: 'cp-v--ok' },
  SUCCESS:       { label: 'Ran successfully',    glyph: '✅', cls: 'cp-v--ok' },
  WRONG_ANSWER:  { label: 'Wrong Answer',        glyph: '❌', cls: 'cp-v--bad' },
  RUNTIME_ERROR: { label: 'Runtime Error',       glyph: '💥', cls: 'cp-v--err' },
  ERROR:         { label: 'Error',               glyph: '⚠️', cls: 'cp-v--err' },
  TLE:           { label: 'Time Limit Exceeded', glyph: '⏱', cls: 'cp-v--tle' },
  TIMEOUT:       { label: 'Time Limit Exceeded', glyph: '⏱', cls: 'cp-v--tle' },
  MLE:           { label: 'Memory Limit Exceeded', glyph: '🧠', cls: 'cp-v--tle' },
  COMPILE_ERROR: { label: 'Compile Error',       glyph: '🛠', cls: 'cp-v--err' },
  BLOCKED:       { label: 'Blocked',             glyph: '🚫', cls: 'cp-v--err' },
}

const EDITOR_OPTIONS = {
  fontSize: 14,
  lineNumbers: 'on',
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 4,
  padding: { top: 10, bottom: 10 },
  fontFamily: "'Share Tech Mono', ui-monospace, monospace",
  renderLineHighlight: 'line',
  // Let the page scroll when hovering the editor: the editor only grabs the
  // wheel while it still has content to scroll, then hands off to the page.
  scrollbar: { alwaysConsumeMouseWheel: false },
}

function starterFor(problem, langKey) {
  const s = problem?.starterCode?.[langKey]
  return (s && s.trim()) ? s : ''
}

/**
 * LeetCode / HackerRank-style right panel:
 * language bar → Monaco → Test Cases | Test Results → Run / Submit.
 */
export default function CodeRunner({ problemId, problem, light }) {
  const { user } = useAuth()
  const guest = isGuest(user)
  const samples = problem?.sampleTestCases || []
  const judgeable = !!problem?.judgeable
  const hasSamples = samples.length > 0
  const hiddenCount = problem?.hiddenTestCount ?? 0

  const [lang, setLang] = useState('python')
  const [codeByLang, setCodeByLang] = useState(() => ({
    python: starterFor(problem, 'python'),
    java: starterFor(problem, 'java'),
    c: starterFor(problem, 'c'),
    cpp: starterFor(problem, 'cpp'),
  }))
  const [running, setRunning] = useState(false)
  const [activeMode, setActiveMode] = useState(null)
  const [runResult, setRunResult] = useState(null)
  const [submitResult, setSubmitResult] = useState(null)
  const [lastAction, setLastAction] = useState(null) // 'run' | 'submit' — which result to show
  const [netError, setNetError] = useState('')
  const [bottomTab, setBottomTab] = useState('cases')
  const [openCase, setOpenCase] = useState(0)
  // LeetCode-style gate: Submit only unlocks once Run passes every visible sample case.
  const [samplesPassed, setSamplesPassed] = useState(false)
  // Guest-only "create account" nudge shown under an Accepted verdict (dismissable).
  const [nudgeDismissed, setNudgeDismissed] = useState(false)

  const abortRef = useRef(null)
  useEffect(() => () => abortRef.current?.abort(), [])

  const code = codeByLang[lang]
  const setCode = (v) => {
    setCodeByLang(prev => ({ ...prev, [lang]: v ?? '' }))
    setSamplesPassed(false) // editing invalidates a previous passing run
  }
  const resetCode = () => {
    setCodeByLang(prev => ({ ...prev, [lang]: starterFor(problem, lang) }))
    setSamplesPassed(false)
  }
  const changeLang = (next) => {
    setLang(next)
    setSamplesPassed(false) // each language must prove itself against the samples
  }

  const run = useCallback(async (mode) => {
    if (running) return
    if (!code.trim()) {
      setNetError('Write some code first.')
      setBottomTab('results')
      return
    }
    setRunning(true)
    setActiveMode(mode)
    setLastAction(mode)
    setNetError('')
    setBottomTab('results')
    setOpenCase(0)
    if (mode === 'run') setRunResult(null)
    else { setSubmitResult(null); setNudgeDismissed(false) }

    const controller = new AbortController()
    abortRef.current = controller
    try {
      let data
      if (mode === 'submit') {
        ;({ data } = await judgeCode({ problemId, language: lang, code, mode: 'submit' }, controller.signal))
        setSubmitResult(data)
        // Full-pass Submit → refresh AuthContext so track list "Solved" badges update.
        if (data?.solved) {
          window.dispatchEvent(new Event('sl:refresh'))
          if (data?.firstSolve && data?.xpEarned > 0) {
            toast.success(`Problem solved! +${data.xpEarned} XP`, { icon: '🏆' })
            if (data?.rankUp && data?.newRank) {
              setTimeout(() => {
                toast(`Rank Up! You are now rank ${data.newRank}`, {
                  icon: '⬆️',
                  duration: 4000,
                  style: {
                    background: '#1c1606',
                    color: '#FBBF24',
                    border: '1px solid #F59E0B',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                  },
                })
              }, 1500)
            }
          }
        }
      } else if (hasSamples) {
        ;({ data } = await judgeCode({ problemId, language: lang, code, mode: 'run' }, controller.signal))
        setRunResult(data)
        // Unlock Submit only when every sample case passed.
        const allSamplesPass = Array.isArray(data?.results)
          && data.results.length > 0
          && data.results.every(r => r.passed)
        setSamplesPassed(allSamplesPass)
      } else {
        ;({ data } = await executeCode(code, lang, controller.signal))
        setRunResult(data)
      }
    } catch (err) {
      if (err?.code === 'ERR_CANCELED' || err?.name === 'CanceledError') return
      const body = err?.response?.data
      if (body && body.status) {
        if (mode === 'run') setRunResult(body)
        else setSubmitResult(body)
      } else {
        setNetError(getApiError(err, 'Could not reach the runner. Please try again.'))
      }
    } finally {
      if (abortRef.current === controller) {
        abortRef.current = null
        setRunning(false)
        setActiveMode(null)
      }
    }
  }, [running, code, problemId, lang, hasSamples])

  const sampleResults = Array.isArray(runResult?.results) ? runResult.results.filter(r => r.sample !== false) : []
  const isJudgeRun = Array.isArray(runResult?.results)
  const selectedSample = samples[openCase]
  // With visible samples, Submit is gated behind a passing Run. Without any visible
  // samples there is nothing to gate on, so Submit is available immediately.
  const canSubmit = !hasSamples || samplesPassed

  return (
    <section className="cp__right">
      <div className="cp__editorbar cg-editorbar">
        <div className="cg-editorbar__left">
          <select
            className="cp__lang"
            value={lang}
            onChange={e => changeLang(e.target.value)}
            disabled={running}
            aria-label="Language"
          >
            {LANGS.map(l => <option key={l.key} value={l.key}>{l.label}</option>)}
          </select>
          <button type="button" className="cg-reset" onClick={resetCode} disabled={running} title="Reset code">
            <RotateCcw size={14} />
          </button>
        </div>
        <div className="cg-editorbar__actions">
          <button type="button" className="cp__run" onClick={() => run('run')} disabled={running}>
            {running && activeMode === 'run' ? <Loader2 size={15} className="cp-spin" /> : <Play size={15} />}
            Run
          </button>
          {judgeable && (
            canSubmit ? (
              <button type="button" className="cp__submit" onClick={() => run('submit')} disabled={running}>
                {running && activeMode === 'submit' ? <Loader2 size={15} className="cp-spin" /> : <Send size={15} />}
                Submit
              </button>
            ) : (
              <button
                type="button"
                className="cp__submit cp__submit--locked"
                disabled
                title="Pass all sample cases with Run to unlock Submit"
              >
                <Lock size={14} /> Submit
              </button>
            )
          )}
        </div>
      </div>

      <div className="cp__editor">
        <MonacoEditor
          height="100%"
          language={LANGS.find(l => l.key === lang)?.monaco || 'plaintext'}
          theme={light ? 'light' : 'vs-dark'}
          value={code}
          onChange={setCode}
          options={EDITOR_OPTIONS}
          loading={<div className="cp__editor-loading">Loading editor…</div>}
        />
      </div>

      <div className="cp__console">
        <div className="cp__console-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            className={`cp__ctab${bottomTab === 'cases' ? ' is-active' : ''}`}
            onClick={() => setBottomTab('cases')}
          >
            Test Cases
          </button>
          <button
            type="button"
            role="tab"
            className={`cp__ctab${bottomTab === 'results' ? ' is-active' : ''}`}
            onClick={() => setBottomTab('results')}
          >
            Test Results
          </button>
        </div>

        <div className="cp__console-body" aria-live="polite">
          {bottomTab === 'cases' && (
            <div className="cp-cases">
              {samples.length === 0 && (
                <p className="cp-cases__empty">
                  {judgeable
                    ? 'No visible sample cases — Submit still judges against hidden tests.'
                    : 'This problem has no automated tests. Use Run to execute your program.'}
                </p>
              )}
              {samples.length > 0 && (
                <div className="cg-case-chips">
                  {samples.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`cg-case-chip${openCase === i ? ' is-on' : ''}`}
                      onClick={() => setOpenCase(i)}
                    >
                      Case {i + 1}
                    </button>
                  ))}
                  {hiddenCount > 0 && (
                    <span className="cg-case-chip cg-case-chip--locked" title="Hidden until Submit">
                      <Lock size={11} /> {hiddenCount} hidden
                    </span>
                  )}
                </div>
              )}
              {selectedSample && (
                <div className="cp-case">
                  <span className="cp-case__label">Case {openCase + 1}</span>
                  <div className="cp-case__block"><span>Input</span><pre>{selectedSample.input || '(empty)'}</pre></div>
                  <div className="cp-case__block"><span>Expected</span><pre>{selectedSample.expectedOutput ?? selectedSample.expected ?? ''}</pre></div>
                </div>
              )}
            </div>
          )}

          {bottomTab === 'results' && (
            <div className="cp-results">
              {running && (
                <p className="cp-results__run">
                  <Loader2 size={15} className="cp-spin" />
                  {activeMode === 'submit' ? 'Judging all test cases…' : 'Running sample tests…'}
                </p>
              )}
              {netError && !running && <pre className="cp-results__err">{netError}</pre>}

              {!running && lastAction === 'submit' && submitResult && (
                <SubmitVerdict result={submitResult} hiddenCount={hiddenCount} />
              )}

              {/* Guests solve fine but earn no XP — nudge them to register (dismissable). */}
              {!running && lastAction === 'submit' && submitResult?.status === 'ACCEPTED'
                && guest && !nudgeDismissed && (
                <div className="cg-guest-nudge">
                  <Sparkles size={15} className="cg-guest-nudge__icon" />
                  <span className="cg-guest-nudge__text">
                    Sign up to save your progress and earn XP for this solve
                  </span>
                  <RegisterCTA className="cg-guest-nudge__cta" label="Create account" />
                  <button
                    type="button"
                    className="cg-guest-nudge__close"
                    onClick={() => setNudgeDismissed(true)}
                    aria-label="Dismiss"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {!running && lastAction === 'run' && runResult && (
                isJudgeRun
                  ? <RunResults result={runResult} results={sampleResults.length ? sampleResults : runResult.results} />
                  : <PlainRun result={runResult} />
              )}

              {!running && lastAction === 'run' && isJudgeRun && runResult && (
                samplesPassed
                  ? <p className="cp-results__unlocked"><Check size={14} /> All sample cases passed — Submit unlocked.</p>
                  : <p className="cp-results__locked">Fix the failing sample case(s), then Run again to unlock Submit.</p>
              )}

              {!running && !netError && !runResult && !submitResult && (
                <p className="cp-results__idle">
                  {judgeable
                    ? 'Run to try the sample cases, or Submit to judge against all hidden cases.'
                    : 'Write your solution and press Run to execute it.'}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function PlainRun({ result }) {
  const v = VERDICT[result.status] || VERDICT.ERROR
  const text = result.status === 'SUCCESS'
    ? (result.output && result.output.length ? result.output : '(no output)')
    : (result.error || result.output || 'Something went wrong.')
  return (
    <div className={`cp-verdict ${v.cls}`}>
      <div className="cp-verdict__head">
        <span className="cp-verdict__label">{v.glyph} {v.label}</span>
        {typeof result.executionTime === 'number' && result.executionTime > 0 && (
          <span className="cp-verdict__time">{result.executionTime} ms</span>
        )}
      </div>
      <pre className={`cp-verdict__msg${result.status === 'SUCCESS' ? ' cg-msg--ok' : ''}`}>{text}</pre>
    </div>
  )
}

function SubmitVerdict({ result, hiddenCount }) {
  const v = VERDICT[result.status] || VERDICT.ERROR
  const showCount = ['ACCEPTED', 'WRONG_ANSWER', 'TLE', 'RUNTIME_ERROR'].includes(result.status)
  const sampleFails = Array.isArray(result.results) ? result.results.filter(r => r.sample && !r.passed) : []
  return (
    <div className={`cp-verdict ${v.cls}`}>
      <div className="cp-verdict__head">
        <span className="cp-verdict__label">{v.glyph} {v.label}</span>
        {showCount && result.total > 0 && (
          <span className="cp-verdict__count">Passed {result.passed}/{result.total} test cases</span>
        )}
        {typeof result.executionTime === 'number' && result.executionTime > 0 && (
          <span className="cp-verdict__time">Runtime: {result.executionTime}ms</span>
        )}
      </div>
      {result.status === 'WRONG_ANSWER' && sampleFails.length === 0 && (
        <p className="cp-verdict__detail">
          Failed on a hidden test case
          {hiddenCount > 0 ? ` (${hiddenCount} hidden)` : ''}. Review edge cases and constraints.
        </p>
      )}
      {['COMPILE_ERROR', 'RUNTIME_ERROR', 'BLOCKED', 'ERROR'].includes(result.status) && result.message && (
        <pre className="cp-verdict__msg">{result.message}</pre>
      )}
      {sampleFails.length > 0 && (
        <RunResults result={result} results={result.results.filter(r => r.sample)} />
      )}
      {Array.isArray(result.results) && result.results.some(r => !r.sample) && (
        <div className="cg-hidden-chips">
          {result.results.filter(r => !r.sample).map((r, i) => (
            <span key={i} className={`cg-case-chip${r.passed ? ' is-pass' : ' is-fail'}`}>
              {r.passed ? <Check size={11} /> : <Lock size={11} />}
              Hidden {i + 1}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

function RunResults({ result, results }) {
  if (result.status === 'COMPILE_ERROR' || result.status === 'BLOCKED') {
    const v = VERDICT[result.status] || VERDICT.ERROR
    return (
      <div className={`cp-verdict ${v.cls}`}>
        <span className="cp-verdict__label">{v.glyph} {v.label}</span>
        {result.message && <pre className="cp-verdict__msg">{result.message}</pre>}
      </div>
    )
  }
  return (
    <div className="cp-runres">
      {(results || []).map((r, i) => (
        <div key={i} className={`cp-runcase${r.passed ? ' is-pass' : ' is-fail'}`}>
          <div className="cp-runcase__head">
            <span className="cp-runcase__name">Case {i + 1}</span>
            <span className="cp-runcase__badge">
              {r.passed ? <><Check size={13} /> Passed</> : <><X size={13} /> Failed</>}
            </span>
            {typeof r.executionTime === 'number' && (
              <span className="cp-runcase__time">{r.executionTime}ms</span>
            )}
          </div>
          <div className="cp-runcase__block"><span>Input</span><pre>{r.input || '(empty)'}</pre></div>
          <div className="cp-runcase__block"><span>Expected</span><pre>{r.expected}</pre></div>
          <div className="cp-runcase__block">
            <span>Got</span>
            <pre className={r.passed ? '' : 'is-bad'}>
              {r.status === 'TLE' ? '(timed out)' : (r.actual === '' ? '(no output)' : r.actual)}
            </pre>
          </div>
          {r.stderr && (
            <div className="cp-runcase__block"><span>Error</span><pre className="is-bad">{r.stderr}</pre></div>
          )}
        </div>
      ))}
    </div>
  )
}

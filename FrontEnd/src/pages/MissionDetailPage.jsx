import { useState, useEffect } from 'react'
import { PAGE_MIN_MS } from '../components/loaders/_config'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ChevronDown, Sun, Moon,
  Clock, Target, Sparkles, Compass, PenLine,
  AlertTriangle, Lightbulb, ListChecks, BookOpen,
} from 'lucide-react'
import { motion } from 'framer-motion'
import SmokeBladeLoader from '../components/loaders/SmokeBladeLoader'
import EnterArenaButton from '../components/EnterArenaButton'
import SectionNotFoundPage from '../components/SectionNotFoundPage'
import { isMongoId } from '../utils/mongoId'
import { getMission } from '../api/api'
import BookmarkButton from '../components/BookmarkButton'
import { useTheme } from '../context/ThemeContext'

const EASE = [0.16, 1, 0.3, 1]

const RANK_META = {
  D: { color: '#4ADE80', bg: 'rgba(74,222,128,0.12)',  desc: 'Beginner' },
  C: { color: '#60A5FA', bg: 'rgba(96,165,250,0.12)',  desc: 'Intermediate' },
  B: { color: '#9B6ED4', bg: 'rgba(155,110,212,0.12)', desc: 'Advanced' },
  A: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)',  desc: 'Expert' },
  S: { color: '#EF4444', bg: 'rgba(239,68,68,0.12)',   desc: 'Elite' },
}

// Shared scroll-reveal for content sections
const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-70px' },
  transition: { duration: 0.5, ease: EASE },
}

export default function MissionDetailPage() {
  const { id }              = useParams()
  const navigate            = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light               = theme === 'light'
  const [mission, setMission] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [approachOpen, setApproachOpen] = useState(false)
  const [mistakesOpen, setMistakesOpen] = useState(false)
  const [hintsOpen, setHintsOpen] = useState(false)

  useEffect(() => {
    if (!isMongoId(id)) {
      setNotFound(true)
      setTimeout(() => setLoading(false), PAGE_MIN_MS)
      return
    }
    getMission(id)
      .then(r => setMission(r.data))
      .catch(() => setNotFound(true))
      .finally(() => setTimeout(() => setLoading(false), PAGE_MIN_MS))
  }, [id])

  if (loading) return <SmokeBladeLoader />
  if (notFound) return <SectionNotFoundPage variant="missions" />
  if (!mission) return null

  const m = RANK_META[mission.rank] || RANK_META['D']
  const rankStyle = { '--rank-color': m.color, '--rank-bg': m.bg }

  // One consolidated stat strip — each fact shown only here
  const stats = [
    { icon: Clock, value: `~${mission.estimatedHours}h`, label: 'to build' },
    mission.objectives?.length && { icon: ListChecks, value: mission.objectives.length, label: 'objectives' },
    mission.approachSteps?.length && { icon: Compass, value: mission.approachSteps.length, label: 'guided steps' },
    mission.bonusObjectives?.length && { icon: Sparkles, value: mission.bonusObjectives.length, label: 'bonus goals' },
  ].filter(Boolean).slice(0, 4)

  const hasSide =
    mission.prerequisites?.length > 0 ||
    !!mission.learningOutcome ||
    mission.conceptsCovered?.length > 0 ||
    mission.subjectTitles?.length > 0

  return (
    <div className="md" style={rankStyle}>
      {/* ── Sticky top bar ─────────────────────────────────────────────── */}
      <header className="md-top">
        <button type="button" onClick={() => navigate(-1)} className="md-top__back">
          <ArrowLeft size={14} /> <span>All Missions</span>
        </button>
        <span className="md-top__title">{mission.title}</span>
        <div className="md-top__right">
          <button
            type="button"
            onClick={toggleTheme}
            className="md-top__icon-btn"
            title={light ? 'Switch to dark' : 'Switch to light'}
          >
            {light ? <Moon size={14} /> : <Sun size={14} />}
          </button>
          <EnterArenaButton />
        </div>
      </header>

      {/* ── The project (statement) ────────────────────────────────────── */}
      <section className="md-hero">
        <div className="md-hero__bg" aria-hidden="true"><div className="md-hero__grid" /></div>
        <motion.div
          className="md-hero__inner"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <span className="md-hero__bookmark">
            <BookmarkButton
              type="MISSION"
              refId={id}
              title={mission.title}
              description={mission.rank ? `${mission.rank}-Rank mission` : 'Mission'}
              icon="🎯"
              iconOnly
            />
          </span>

          <div className="md-hero__badges">
            <span className="md-rank-pill">{mission.rank}-RANK · {m.desc}</span>
          
          </div>

          <h1 className="md-hero__title">{mission.title}</h1>

          {mission.missionBrief && (
            <p className="md-hero__lead">{mission.missionBrief}</p>
          )}

          {mission.techStack?.length > 0 && (
            <div className="md-hero__tech">
              {mission.techStack.map(t => (
                <span key={t} className="md-tech-tag">{t}</span>
              ))}
            </div>
          )}

          {stats.length > 0 && (
            <div className="md-stat-strip">
              {stats.map(s => {
                const Icon = s.icon
                return (
                  <div key={s.label} className="md-stat">
                    <Icon size={15} className="md-stat__icon" />
                    <span className="md-stat__v">{s.value}</span>
                    <span className="md-stat__l">{s.label}</span>
                  </div>
                )
              })}
            </div>
          )}
        </motion.div>
      </section>

      {/* ── Guided reading flow ────────────────────────────────────────── */}
      <div className="md-body">

        {/* Objectives (left) + context cards (right) */}
        <div className={`md-cols${hasSide ? '' : ' md-cols--solo'}`}>
          <div className="md-cols__main">
            {mission.objectives?.length > 0 && (
              <motion.section {...reveal} id="objectives" className="md-block">
                <div className="md-block__head">
                  
                  <div className="md-block__headtext">
                    <h2 className="md-block__title"><ListChecks size={18} /> What your build must do</h2>
                    <p className="md-block__hint">These are the requirements. Aim to make every one of them work.</p>
                  </div>
                </div>
                <ol className="md-steps">
                  {mission.objectives.map((obj, i) => (
                    <li key={i} className="md-step">
                      <span className="md-step__num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="md-step__text">{obj}</span>
                    </li>
                  ))}
                </ol>

                {mission.bonusObjectives?.length > 0 && (
                  <div className="md-bonus">
                    <span className="md-bonus__label"><Sparkles size={14} /> Bonus — go further to stand out</span>
                    <ul className="md-bonus-list">
                      {mission.bonusObjectives.map((obj, i) => (
                        <li key={i} className="md-bonus-item"><span className="md-bonus-item__star">★</span><span>{obj}</span></li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.section>
            )}
          </div>

          {hasSide && (
            <aside className="md-cols__side">
              {mission.prerequisites?.length > 0 && (
                <motion.section {...reveal} className="md-note md-note--amber">
                  <span className="md-note__label"><AlertTriangle size={15} /> Before you start</span>
                  <p className="md-note__text">Get comfortable with these first — the mission builds on them.</p>
                  <div className="md-chips">
                    {mission.prerequisites.map((pre, i) => (
                      <span key={i} className="md-chip md-chip--amber">{pre}</span>
                    ))}
                  </div>
                </motion.section>
              )}

              {mission.learningOutcome && (
                <motion.section {...reveal} className="md-goal">
                  <span className="md-goal__label"><Target size={15} /> WHAT YOU'LL BE ABLE TO DO</span>
                  <p className="md-goal__text">{mission.learningOutcome}</p>
                </motion.section>
              )}

              {(mission.conceptsCovered?.length > 0 || mission.subjectTitles?.length > 0) && (
                <motion.section {...reveal} className="md-skills">
                  <span className="md-skills__label"><BookOpen size={14} /> Skills this mission builds</span>
                  <div className="md-chips">
                    {mission.conceptsCovered?.map((c, i) => (
                      <span key={`c${i}`} className="md-chip md-chip--blue">{c}</span>
                    ))}
                    {mission.subjectTitles?.map(s => (
                      <span key={`s${s}`} className="md-chip">{s}</span>
                    ))}
                  </div>
                </motion.section>
              )}
            </aside>
          )}
        </div>

        {/* Plan it yourself → reveal approach only on demand */}
        <motion.section {...reveal} id="approach" className="md-block">
          <div className="md-block__head">
            
            <div className="md-block__headtext">
              <h2 className="md-block__title"><PenLine size={18} /> Plan your approach</h2>
              <p className="md-block__hint">
                Before looking at any guidance, sketch how <em>you</em> would build this —
                the data, the screens, the order of work. That struggle is where real learning happens.
              </p>
            </div>
          </div>

          {mission.approachSteps?.length > 0 ? (
            <div className="md-approach">
              <button
                type="button"
                className={`md-reveal${approachOpen ? ' is-open' : ''}`}
                onClick={() => setApproachOpen(o => !o)}
              >
                <span className="md-reveal__text">
                  <Compass size={16} />
                  {approachOpen ? 'Hide the guided approach' : "Stuck? Reveal a step-by-step approach"}
                </span>
                <ChevronDown size={18} className="md-reveal__chev" />
              </button>

              {approachOpen && (
                <motion.div
                  className="md-timeline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  {mission.approachSteps.map((step, i) => (
                    <div key={i} className="md-timeline__item">
                      <span className="md-timeline__dot">{i + 1}</span>
                      <div className="md-timeline__card">{step}</div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          ) : (
            <p className="md-block__hint">This one is all yours — no guided steps. Trust your plan and start building.</p>
          )}
        </motion.section>

        {mission.commonMistakes?.length > 0 && (
          <motion.section {...reveal} className={`md-fold${mistakesOpen ? ' is-open' : ''}`}>
            <button type="button" className="md-fold__toggle" onClick={() => setMistakesOpen(o => !o)}>
              <span className="md-fold__title md-fold__title--red"><AlertTriangle size={17} /> Common mistakes to avoid</span>
              <ChevronDown size={17} className="md-fold__chev" />
            </button>
            {mistakesOpen && (
              <div className="md-callouts">
                {mission.commonMistakes.map((mistake, i) => (
                  <div key={i} className="md-callout md-callout--red">{mistake}</div>
                ))}
              </div>
            )}
          </motion.section>
        )}

        {mission.hints?.length > 0 && (
          <motion.section {...reveal} className={`md-fold${hintsOpen ? ' is-open' : ''}`}>
            <button type="button" className="md-fold__toggle" onClick={() => setHintsOpen(o => !o)}>
              <span className="md-fold__title md-fold__title--blue"><Lightbulb size={17} /> Hints — open only if truly stuck</span>
              <ChevronDown size={17} className="md-fold__chev" />
            </button>
            {hintsOpen && (
              <div className="md-callouts">
                {mission.hints.map((hint, i) => (
                  <div key={i} className="md-callout md-callout--blue">{hint}</div>
                ))}
              </div>
            )}
          </motion.section>
        )}

        <div className="md-back-wrap">
          <button type="button" onClick={() => navigate(-1)} className="md-back-btn">
            <ArrowLeft size={14} /> Back to Mission Board
          </button>
        </div>
      </div>
    </div>
  )
}

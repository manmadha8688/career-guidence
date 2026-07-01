import { useState, useEffect } from 'react'
import { PAGE_MIN_MS } from '../components/loaders/_config'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ChevronDown, ChevronUp, Sun, Moon } from 'lucide-react'
import SmokeBladeLoader from '../components/loaders/SmokeBladeLoader'
import { getMission } from '../api/api'
import { useTheme } from '../context/ThemeContext'

const RANK_META = {
  D: { color: '#4ADE80', bg: 'rgba(74,222,128,0.12)',   label: 'D-RANK', desc: 'Academy Level' },
  C: { color: '#60A5FA', bg: 'rgba(96,165,250,0.12)',   label: 'C-RANK', desc: 'Genin Level' },
  B: { color: '#9B6ED4', bg: 'rgba(155,110,212,0.12)', label: 'B-RANK', desc: 'Chunin Level' },
  A: { color: '#F59E0B', bg: 'rgba(245,158,11,0.12)',   label: 'A-RANK', desc: 'Jonin Level' },
  S: { color: '#EF4444', bg: 'rgba(239,68,68,0.12)',    label: 'S-RANK', desc: 'Kage Level' },
}

export default function MissionDetailPage() {
  const { id }              = useParams()
  const navigate            = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const light               = theme === 'light'
  const [mission, setMission] = useState(null)
  const [loading, setLoading] = useState(true)
  const [hintsOpen, setHintsOpen] = useState(false)
  const [approachOpen, setApproachOpen] = useState(false)
  const [mistakesOpen, setMistakesOpen] = useState(false)

  useEffect(() => {
    getMission(id)
      .then(r => setMission(r.data))
      .catch(() => navigate('/missions'))
      .finally(() => setTimeout(() => setLoading(false), PAGE_MIN_MS))
  }, [id])

  if (loading) return <SmokeBladeLoader />

  if (!mission) return null

  const m = RANK_META[mission.rank] || RANK_META['D']
  const rankStyle = { '--rank-color': m.color, '--rank-bg': m.bg }

  return (
    <div className="mission-detail-page" style={rankStyle}>
      <div className="mission-detail-topbar">
        <button type="button" onClick={() => navigate(-1)} className="mission-detail-back">
          <ArrowLeft size={14} /> MISSIONS
        </button>

        <div className="mission-detail-title-row">
          <span className="mission-detail-rank-sm">
            {mission.rank}-RANK
          </span>
          <span className="mission-detail-title">
            {mission.title}
          </span>
        </div>

        <div className="mission-detail-nav-right">
          <span className="mission-detail-hours">
            ⏱ {mission.estimatedHours}h
          </span>

          <button
            type="button"
            onClick={toggleTheme}
            className="mission-detail-theme"
            title={light ? 'Switch to dark' : 'Switch to light'}
          >
            {light ? <Moon size={13} /> : <Sun size={13} />}
          </button>

          <button type="button" onClick={() => navigate('/skill-arena/dashboard')} className="mission-detail-arena">
            ⚔ <span className="mission-arena-label">SKILL ARENA</span>
          </button>
        </div>
      </div>

      <div className="mission-detail-content">

        <div className="mission-detail-hero">
          <div className="rank-stamp-lg mission-detail-rank-lg">
            {mission.rank}-RANK · {m.desc.toUpperCase()}
          </div>
          <h1 className="mission-detail-h1">
            {mission.title}
          </h1>
          <div className="mission-detail-tech-tags">
            {mission.techStack?.map(t => (
              <span key={t} className="mission-detail-tech-tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mission-section">
          <span className="mission-section__label">◆ MISSION BRIEF</span>
          <p className="mission-section__body">{mission.missionBrief}</p>

          {mission.learningOutcome && (
            <div className="mission-outcome">
              <span className="mission-section__label mission-outcome__label">🎯 WHAT YOU WILL ACHIEVE</span>
              <p className="mission-section__body mission-outcome__text">
                {mission.learningOutcome}
              </p>
            </div>
          )}

          {mission.subjectTitles?.length > 0 && (
            <div className="mission-subjects-divider">
              <span className="mission-section__label">RELATED SUBJECTS</span>
              <div className="mission-tag-row">
                {mission.subjectTitles.map(s => (
                  <span key={s} className="mission-subject-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {mission.prerequisites?.length > 0 && (
          <div className="mission-section mission-section--prereq">
            <span className="mission-section__label mission-section__label--amber">⚡ BEFORE YOU START — PREREQUISITES</span>
            <p className="mission-section__body mission-section__hint mission-section__hint--amber">
              Make sure you are comfortable with these concepts before attempting this mission.
            </p>
            <div className="mission-tag-row mission-tag-row--spaced">
              {mission.prerequisites.map((pre, i) => (
                <span key={i} className="mission-prereq-tag">
                  {pre}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mission-section">
          <span className="mission-section__label">◆ MISSION OBJECTIVES</span>
          {mission.objectives?.map((obj, i) => (
            <div key={i} className="mission-section__list-item">
              <span className="mission-section__num">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span>{obj}</span>
            </div>
          ))}
        </div>

        {mission.bonusObjectives?.length > 0 && (
          <div className="mission-section mission-section--bonus">
            <span className="mission-section__label mission-section__label--amber">★ BONUS OBJECTIVES</span>
            {mission.bonusObjectives.map((obj, i) => (
              <div key={i} className="mission-section__list-item">
                <span className="mission-section__star">★</span>
                <span>{obj}</span>
              </div>
            ))}
          </div>
        )}

        {mission.conceptsCovered?.length > 0 && (
          <div className="mission-section mission-section--concepts">
            <span className="mission-section__label mission-section__label--blue">📚 CONCEPTS PRACTICED IN THIS MISSION</span>
            <p className="mission-section__body mission-section__hint mission-section__hint--blue">
              These concepts from your Skill Arena subjects are actively used in this build.
            </p>
            <div className="mission-tag-row mission-tag-row--spaced">
              {mission.conceptsCovered.map((concept, i) => (
                <span key={i} className="mission-concept-tag">
                  {concept}
                </span>
              ))}
            </div>
          </div>
        )}

        {mission.approachSteps?.length > 0 && (
          <div className={`mission-section${approachOpen ? ' mission-section--approach-open' : ''}`}>
            <button
              type="button"
              onClick={() => setApproachOpen(o => !o)}
              className="mission-accordion-toggle"
            >
              <span className="mission-section__label mission-section__label--rank">
                ◆ APPROACH GUIDE
              </span>
              {approachOpen
                ? <ChevronUp size={16} color={m.color} />
                : <ChevronDown size={16} color={light ? '#6B4820' : '#6B5030'} />}
            </button>

            {approachOpen && (
              <div className="mission-accordion-body">
                <p className="mission-section__body mission-section__hint mission-section__hint--brown">
                  High-level steps to get you started. No code — your implementation is your own.
                </p>
                {mission.approachSteps.map((step, i) => (
                  <div key={i} className="mission-section__list-item">
                    <div className="mission-step-num">
                      {i + 1}
                    </div>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {mission.commonMistakes?.length > 0 && (
          <div className={`mission-section${mistakesOpen ? ' mission-section--mistakes-open' : ''}`}>
            <button
              type="button"
              onClick={() => setMistakesOpen(o => !o)}
              className="mission-accordion-toggle"
            >
              <span className={`mission-section__label${mistakesOpen ? ' mission-section__label--red' : ''}`}>
                ⚠ COMMON MISTAKES
              </span>
              {mistakesOpen
                ? <ChevronUp size={16} color="#EF4444" />
                : <ChevronDown size={16} color={light ? '#6B4820' : '#6B5030'} />}
            </button>

            {mistakesOpen && (
              <div className="mission-accordion-body">
                {mission.commonMistakes.map((mistake, i) => (
                  <div key={i} className="mission-section__list-item mission-mistake-item">
                    <span className="mission-section__bullet mission-section__bullet--red" />
                    <span className="mission-mistake-text">{mistake}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {mission.hints?.length > 0 && (
          <div className={`mission-section${hintsOpen ? ' mission-section--hints-open' : ''}`}>
            <button
              type="button"
              onClick={() => setHintsOpen(o => !o)}
              className="mission-accordion-toggle"
            >
              <span className="mission-section__label mission-section__label--blue">
                🔍 HINTS
              </span>
              {hintsOpen
                ? <ChevronUp size={16} color="#60A5FA" />
                : <ChevronDown size={16} color={light ? '#6B4820' : '#6B5020'} />}
            </button>

            {hintsOpen && (
              <div className="mission-accordion-body">
                {mission.hints.map((hint, i) => (
                  <div key={i} className="mission-section__list-item mission-hint-item">
                    <span className="mission-section__bullet mission-section__bullet--blue" />
                    <span className="mission-hint-text">{hint}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mission-detail-back-btn-wrap">
          <button type="button" onClick={() => navigate(-1)} className="mission-detail-back-btn">
            <ArrowLeft size={14} /> BACK TO MISSION BOARD
          </button>
        </div>
      </div>
    </div>
  )
}

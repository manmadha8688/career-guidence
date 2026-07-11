// Loader Showcase — all loaders numbered, click full-page ones to preview
import { useState } from 'react'

// Full-page loaders
import HunterLoader from '../components/loaders/HunterLoader'
import TerminalLoader from '../components/loaders/TerminalLoader'
import MissionLoader from '../components/loaders/MissionLoader'
import SystemAwakeningLoader from '../components/loaders/SystemAwakeningLoader'
import GlitchBreachLoader from '../components/loaders/GlitchBreachLoader'
import SmokeBladeLoader from '../components/loaders/SmokeBladeLoader'
import DungeonPortalLoader from '../components/loaders/DungeonPortalLoader'

// Section loaders
import GateOpenLoader from '../components/loaders/GateOpenLoader'
import ShadowSoldierLoader from '../components/loaders/ShadowSoldierLoader'
import CircuitLoader from '../components/loaders/CircuitLoader'
import MatrixRainLoader from '../components/loaders/MatrixRainLoader'
import AptitudeLoader from '../components/loaders/AptitudeLoader'
import RadarLoader from '../components/loaders/RadarLoader'
import DataHelixLoader from '../components/loaders/DataHelixLoader'
import AdminSkeleton from '../components/loaders/AdminSkeleton'

const TRACK_COLORS = {
  'START_CODING':    '#4ADE80',
  'LOGIC_BUILDING':  '#60A5FA',
  'SKILL_UP':        '#F59E0B',
  'CRACK_IT':        '#EF4444',
  'BUILD_IT':        '#A78BFA',
}

// Full-page loader registry
const FULL_PAGE = [
  {
    num: '#1', label: 'Hunter Gate', tag: 'Skill Arena · Quiz · Auth',
    accent: '#9B6ED4', bg: '#04060f',
    desc: 'Rising particles + ARISE cinematic reveal',
    status: 'CURRENT',
    component: (close) => <><HunterLoader subtitle="SKILL ARENA" />{close}</>,
    thumb: <ThumbHunter />,
  },
  {
    num: '#2', label: 'Terminal Boot', tag: 'Problem Solving tracks',
    accent: '#f97316', bg: '#080b14',
    desc: 'macOS terminal window with progress bars per track',
    status: 'CURRENT',
    component: (close) => <><TerminalLoader accentColor="#f97316" label="LOADING TRACK" />{close}</>,
    thumb: <ThumbTerminal />,
  },
  {
    num: '#3', label: 'Mission Briefing', tag: 'Mission pages',
    accent: '#FF7F2A', bg: '#09070a',
    desc: 'Classified document with shuriken + redacted data reveal',
    status: 'CURRENT',
    component: (close) => <><MissionLoader />{close}</>,
    thumb: <ThumbMission />,
  },
  {
    num: '#4', label: 'System Awakening', tag: 'Skill Arena alt',
    accent: '#9B6ED4', bg: '#020108',
    desc: '"You have been chosen" types out → shockwave → ARISE',
    status: 'NEW ✦',
    component: (close) => <><SystemAwakeningLoader subtitle="SKILL ARENA" />{close}</>,
    thumb: <ThumbSystemAwake />,
  },
  {
    num: '#5', label: 'Glitch Breach', tag: 'Problem Solving alt',
    accent: '#f97316', bg: '#050912',
    desc: 'RGB split glitch → terminal hacking → ACCESS GRANTED',
    status: 'NEW ✦',
    component: (close, track) => <><GlitchBreachLoader accentColor={TRACK_COLORS[track] || '#f97316'} label="LOADING TRACK" />{close}</>,
    thumb: <ThumbGlitch />,
    trackPicker: true,
  },
  {
    num: '#6', label: 'Smoke Blade', tag: 'Mission alt',
    accent: '#FF7F2A', bg: '#0a0706',
    desc: 'Shuriken flies in, IMPACT, smoke explosion, mission reveals',
    status: 'NEW ✦',
    component: (close) => <><SmokeBladeLoader />{close}</>,
    thumb: <ThumbSmoke />,
  },
  {
    num: '#7', label: 'Dungeon Portal', tag: 'Universal / Any page',
    accent: '#9B6ED4', bg: '#030210',
    desc: 'Multi-ring arcane portal tears open, particles spiral inward',
    status: 'NEW ✦',
    component: (close) => <><DungeonPortalLoader subtitle="LOADING" />{close}</>,
    thumb: <ThumbPortal />,
  },
]

const SECTION = [
  {
    num: '#S1', label: 'Arcane Gate Opening', tag: 'Skill Arena panels',
    accent: '#9B6ED4', status: 'NEW ✦',
    desc: 'Rings draw → door cracks → star portal',
    component: <GateOpenLoader height={220} />,
  },
  {
    num: '#S2', label: 'Shadow Soldiers', tag: 'Skill Arena panels alt',
    accent: '#9B6ED4', status: 'ALT',
    desc: 'Soldier silhouettes rise from ground with rune circle',
    component: <ShadowSoldierLoader height={220} />,
  },
  {
    num: '#S3', label: 'Circuit Compile', tag: 'Problem Solving panels',
    accent: '#f97316', status: 'NEW ✦',
    desc: 'PCB traces light up from CPU chip outward',
    component: <CircuitLoader accentColor="#f97316" height={220} />,
  },
  {
    num: '#S4', label: 'Matrix Code Rain', tag: 'Problem Solving panels alt',
    accent: '#f97316', status: 'ALT',
    desc: 'Canvas-based falling chars with accent color',
    component: <MatrixRainLoader accentColor="#f97316" height={220} />,
  },
  {
    num: '#A1', label: 'Aptitude · Quantitative', tag: 'Quant category',
    accent: '#0EA5E9', status: 'NEW ✦',
    desc: 'Timer ring + cycling math operators (+ − × ÷ % =)',
    component: <AptitudeLoader variant="quantitative" height={220} label="QUANTITATIVE" />,
  },
  {
    num: '#A2', label: 'Aptitude · Logical', tag: 'Logical Reasoning category',
    accent: '#9B6ED4', status: 'NEW ✦',
    desc: '3×3 pattern-lock grid lighting in sequence',
    component: <AptitudeLoader variant="logical" height={220} label="LOGICAL REASONING" />,
  },
  {
    num: '#A3', label: 'Aptitude · Verbal', tag: 'Verbal Ability category',
    accent: '#22C55E', status: 'NEW ✦',
    desc: 'Cycling words — READ → THINK → ANSWER',
    component: <AptitudeLoader variant="verbal" height={220} label="VERBAL ABILITY" />,
  },
  {
    num: '#A4', label: 'Aptitude · Data Interpretation', tag: 'Data Interpretation category',
    accent: '#F59E0B', status: 'NEW ✦',
    desc: 'Animated bar chart rising and falling',
    component: <AptitudeLoader variant="data-interpretation" height={220} label="DATA INTERPRETATION" />,
  },
  {
    num: '#S5', label: 'Radar Data Scan', tag: 'Admin panels',
    accent: '#60A5FA', status: 'NEW ✦',
    desc: 'Sonar sweep with data blips materializing',
    component: <RadarLoader height={220} />,
  },
  {
    num: '#S6', label: 'DNA Data Helix', tag: 'Admin panels alt',
    accent: '#60A5FA', status: 'ALT',
    desc: 'Two interweaving data strands with bridges',
    component: <DataHelixLoader height={220} />,
  },
  {
    num: '#S7', label: 'Admin Shimmer Skeleton', tag: 'Admin pages (current)',
    accent: '#8A99BF', status: 'CURRENT',
    desc: 'Shimmer effect on placeholder rows and stat cards',
    component: <div style={{ background: '#10162A', borderRadius: 8 }}><AdminSkeleton rows={4} /></div>,
  },
]

export default function LoaderDemo() {
  const [active, setActive] = useState(null)
  const [track, setTrack]   = useState('START_CODING')

  const closeBtn = (
    <button onClick={() => setActive(null)} style={closeBtnStyle}>
      ✕ CLOSE PREVIEW
    </button>
  )

  const activeLoader = active !== null ? FULL_PAGE[active] : null

  return (
    <div style={{ minHeight: '100vh', background: '#06080f', color: '#fff', fontFamily: 'Share Tech Mono, monospace' }}>

      {/* Full-page overlay */}
      {activeLoader && activeLoader.component(closeBtn, track)}

      {/* Header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', padding: '1.25rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: '1.1rem', color: '#B48AE8', letterSpacing: '0.12em' }}>ARISE</span>
        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.6rem', letterSpacing: '0.2em' }}>/ LOADER SHOWCASE</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1.5rem', fontSize: '0.58rem', letterSpacing: '0.1em' }}>
          <span style={{ color: '#4ADE80' }}>● CURRENT</span>
          <span style={{ color: '#F59E0B' }}>✦ NEW</span>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>◌ ALT</span>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '2rem 2rem 5rem' }}>

        {/* ── FULL PAGE LOADERS ── */}
        <div style={{ fontSize: '0.58rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>── FULL PAGE LOADERS</span>
          <span style={{ color: 'rgba(255,255,255,0.12)' }}>Click any card to preview fullscreen</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {FULL_PAGE.map((loader, i) => (
            <div key={i}>
              {/* Track picker for #5 */}
              {loader.trackPicker && (
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  {Object.entries(TRACK_COLORS).map(([t, c]) => (
                    <button key={t} onClick={() => setTrack(t)} style={{
                      padding: '2px 8px', border: `1px solid ${track===t?c:'rgba(255,255,255,0.12)'}`,
                      borderRadius: 4, background: track===t?`${c}22`:'transparent',
                      color: track===t?c:'rgba(255,255,255,0.35)',
                      fontSize: '0.5rem', letterSpacing: '0.06em', cursor: 'pointer', fontFamily: 'inherit',
                    }}>{t.replace('_',' ')}</button>
                  ))}
                </div>
              )}
              <div onClick={() => setActive(i)} style={fullCardStyle(loader.accent, loader.status)}>
                {/* Preview thumb */}
                <div style={{ height: 150, background: loader.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', overflow: 'hidden', borderRadius: '8px 8px 0 0' }}>
                  {loader.thumb}
                </div>
                {/* Info */}
                <div style={{ padding: '0.875rem 1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '5px' }}>
                    <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.58rem', color: loader.accent, opacity: 0.7, border: `1px solid ${loader.accent}44`, padding: '1px 6px', borderRadius: 3 }}>{loader.num}</span>
                    <span style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#fff' }}>{loader.label}</span>
                    <span style={{ marginLeft: 'auto', fontSize: '0.5rem', color: statusColor(loader.status), letterSpacing: '0.1em' }}>{loader.status}</span>
                  </div>
                  <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.06em', marginBottom: '3px' }}>{loader.tag}</div>
                  <div style={{ fontSize: '0.58rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.04em' }}>{loader.desc}</div>
                  <div style={{ marginTop: '0.6rem', fontSize: '0.55rem', color: loader.accent, border: `1px solid ${loader.accent}44`, padding: '3px 10px', borderRadius: 4, display: 'inline-block', letterSpacing: '0.1em' }}>
                    ▶ PREVIEW FULLSCREEN
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── SECTION / PANEL LOADERS ── */}
        <div style={{ fontSize: '0.58rem', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.25)', marginBottom: '1.25rem' }}>
          ── SECTION / PANEL LOADERS
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {SECTION.map((s, i) => (
            <div key={i} style={sectionCardStyle(s.accent, s.status)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.65rem' }}>
                <span style={{ fontSize: '0.55rem', color: s.accent, border: `1px solid ${s.accent}44`, padding: '1px 6px', borderRadius: 3 }}>{s.num}</span>
                <span style={{ fontSize: '0.7rem', fontFamily: 'Orbitron, sans-serif', fontWeight: 700, color: '#fff' }}>{s.label}</span>
                <span style={{ marginLeft: 'auto', fontSize: '0.5rem', color: statusColor(s.status) }}>{s.status}</span>
              </div>
              <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.3)', marginBottom: '0.6rem', letterSpacing: '0.06em' }}>{s.tag} — {s.desc}</div>
              <div style={{ borderRadius: 6, overflow: 'hidden' }}>{s.component}</div>
            </div>
          ))}
        </div>

        {/* ── Admin full skeleton ── */}
        <div style={{ marginTop: '1rem' }}>
          <div style={sectionCardStyle('#8A99BF', 'CURRENT')}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.55rem', color: '#8A99BF', border: '1px solid #8A99BF44', padding: '1px 6px', borderRadius: 3 }}>#S7b</span>
              <span style={{ fontSize: '0.7rem', fontFamily: 'Orbitron, sans-serif', fontWeight: 700, color: '#fff' }}>Admin Full Page Skeleton</span>
              <span style={{ marginLeft: 'auto', fontSize: '0.5rem', color: statusColor('CURRENT') }}>CURRENT</span>
            </div>
            <div style={{ background: '#10162A', borderRadius: 8, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden' }}>
              <AdminSkeleton rows={5} />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Thumbnail components ──
function ThumbHunter() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ fontFamily: 'Orbitron, sans-serif', fontWeight: 900, fontSize: '1.8rem', color: '#fff', letterSpacing: '0.25em', textShadow: '0 0 16px rgba(155,110,212,0.9)' }}>ARISE</div>
      <div style={{ display: 'flex', gap: 4 }}>
        {[0,1,2].map(i => <div key={i} style={{ width: 4, height: 14, background: 'rgba(155,110,212,0.7)', borderRadius: 2 }} />)}
      </div>
    </div>
  )
}
function ThumbTerminal() {
  return (
    <div style={{ width: 160, background: '#0e1220', border: '1px solid rgba(249,115,22,0.3)', borderRadius: 6, overflow: 'hidden' }}>
      <div style={{ padding: '5px 8px', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: 4 }}>
        {['#FF5F57','#FEBC2E','#28C840'].map(c => <div key={c} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />)}
      </div>
      <div style={{ padding: '8px', fontSize: '0.45rem', fontFamily: 'Share Tech Mono, monospace', color: 'rgba(255,255,255,0.6)', display: 'flex', flexDirection: 'column', gap: 4 }}>
        {['> SYSTEM BOOT........','> LOADING DATABASE...','> READY █'].map((t, i) => (
          <div key={i} style={{ color: i===2?'#f97316':undefined }}>{t}</div>
        ))}
      </div>
    </div>
  )
}
function ThumbMission() {
  return (
    <div style={{ width: 140, border: '1px solid rgba(255,127,42,0.3)', borderRadius: 4, padding: '8px 12px', background: 'rgba(255,127,42,0.04)' }}>
      <div style={{ textAlign: 'center', fontSize: '0.55rem', fontFamily: 'Orbitron, sans-serif', color: 'rgba(255,127,42,0.8)', letterSpacing: '0.1em', marginBottom: 6 }}>MISSION BRIEFING</div>
      {['MISSION ID','PRIORITY','STATUS'].map((l, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.45rem', marginBottom: 3 }}>
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>{l}</span>
          <span style={{ color: i===2?'#FF7F2A':'rgba(255,255,255,0.4)' }}>{i===2?'LOADING...':'████'}</span>
        </div>
      ))}
    </div>
  )
}
function ThumbSystemAwake() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg viewBox="0 0 80 40" width="90" height="45">
        <path d="M4,20 Q40,-10 76,20 Q40,50 4,20 Z" fill="none" stroke="rgba(155,110,212,0.6)" strokeWidth="1" />
        <circle cx="40" cy="20" r="10" fill="none" stroke="rgba(155,110,212,0.8)" strokeWidth="1.5" />
        <circle cx="40" cy="20" r="4" fill="rgba(155,110,212,0.9)" />
      </svg>
      <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.52rem', color: 'rgba(155,110,212,0.6)', letterSpacing: '0.2em' }}>YOU HAVE BEEN CHOSEN</div>
    </div>
  )
}
function ThumbGlitch() {
  return (
    <div style={{ position: 'relative', width: 150 }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,0,0,0.04)', transform: 'translateX(-3px)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,255,0.04)', transform: 'translateX(3px)' }} />
      <div style={{ background: '#0e1220', border: '1px solid rgba(249,115,22,0.25)', borderRadius: 6, padding: '8px 10px', fontFamily: 'Share Tech Mono, monospace', fontSize: '0.48rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ color: 'rgba(255,80,80,0.7)' }}>&gt; L0AD1NG....... [FAIL]</div>
        <div style={{ color: 'rgba(255,80,80,0.7)' }}>&gt; BYPASSING....... ████</div>
        <div style={{ color: '#f97316', fontWeight: 700, letterSpacing: '0.1em' }}>&gt; ACCESS GRANTED ✓</div>
      </div>
    </div>
  )
}
function ThumbSmoke() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg viewBox="0 0 60 60" width="44" height="44">
        <path d="M30 5 L35 25 L55 30 L35 35 L30 55 L25 35 L5 30 L25 25 Z" fill="#FF7F2A" opacity="0.9" />
        <circle cx="30" cy="30" r="5" fill="#FF7F2A" />
      </svg>
      <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,127,42,0.8)' }}>STAND BY</div>
    </div>
  )
}
function ThumbPortal() {
  return (
    <svg viewBox="0 0 120 120" width="120" height="120">
      <radialGradient id="tpg" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="rgba(155,110,212,0.8)" />
        <stop offset="100%" stopColor="transparent" />
      </radialGradient>
      <circle cx="60" cy="60" r="55" fill="none" stroke="rgba(155,110,212,0.2)" strokeWidth="0.8" />
      <circle cx="60" cy="60" r="42" fill="none" stroke="rgba(155,110,212,0.4)" strokeWidth="1.2" strokeDasharray="264" />
      <circle cx="60" cy="60" r="30" fill="none" stroke="rgba(180,138,232,0.5)" strokeWidth="1.5" strokeDasharray="188" />
      <circle cx="60" cy="60" r="18" fill="url(#tpg)" />
      <circle cx="60" cy="60" r="8" fill="rgba(155,110,212,0.9)" />
    </svg>
  )
}

// ── Styles ──
const statusColor = (s) =>
  s === 'CURRENT' ? '#4ADE80' : s.startsWith('NEW') ? '#F59E0B' : 'rgba(255,255,255,0.3)'

const fullCardStyle = (accent, status) => ({
  background: '#0a0d18',
  border: `1px solid ${status.startsWith('NEW') ? `${accent}44` : 'rgba(255,255,255,0.07)'}`,
  borderRadius: 10,
  cursor: 'pointer',
  transition: 'border-color 0.2s, transform 0.15s',
  boxShadow: status.startsWith('NEW') ? `0 4px 24px ${accent}18` : 'none',
})

const sectionCardStyle = (accent, status) => ({
  background: '#0a0d18',
  border: `1px solid ${status.startsWith('NEW') ? `${accent}44` : 'rgba(255,255,255,0.07)'}`,
  borderRadius: 10,
  padding: '1rem',
  boxShadow: status.startsWith('NEW') ? `0 4px 20px ${accent}14` : 'none',
})

const closeBtnStyle = {
  position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
  zIndex: 99999, background: 'rgba(0,0,0,0.6)',
  border: '1px solid rgba(255,255,255,0.25)', color: '#fff',
  padding: '10px 28px', borderRadius: 6, cursor: 'pointer',
  fontFamily: 'Share Tech Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.12em',
  backdropFilter: 'blur(8px)',
}

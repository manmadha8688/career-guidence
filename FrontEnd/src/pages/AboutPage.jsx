import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Terminal, ArrowRight, ChevronsUp, Swords, UserCog, Rocket, Gauge,
  Dumbbell, Brain, Sparkles, Server, Compass, MapPin, Bookmark, Share2,
  CircleAlert, Sun, Zap,
} from 'lucide-react'
import Navbar from '../components/navbars/Navbar'
import { useAuth } from '../context/AuthContext'
import { isGuest } from '../utils/auth'
import RegisterCTA from '../components/RegisterCTA'
import '../styles/pages/about.css'

const EASE = [0.16, 1, 0.3, 1]

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: EASE },
}

const RANKS = [
  { label: 'E', color: '#888888', name: 'Rookie' },
  { label: 'D', color: '#4ADE80', name: 'Learner' },
  { label: 'C', color: '#60A5FA', name: 'Improver' },
  { label: 'B', color: '#9B6ED4', name: 'Skilled' },
  { label: 'A', color: '#F59E0B', name: 'Advanced' },
  { label: 'S', color: '#EF4444', name: 'Expert' },
]

// How you level up — hints only, no exact XP. Each points to where to actually do it.
const LEVEL_UP = [
  {
    accent: '#9B6ED4', icon: Swords, title: 'Train in the Skill Arena',
    desc: <>Your main hunting ground. Enter a gate, <em>learn a skill</em>, pass its trial and earn XP to climb the ranks. Your full step-by-step hunter instructions live inside — read them there.</>,
  },
  {
    accent: '#F59E0B', icon: UserCog, title: 'Build your Profile & Resume',
    desc: <>Complete your Hunter profile and create a recruiter-ready resume. Both <em>earn you XP</em> and turn your progress into something you can actually send.</>,
  },
]

const MAP = [
  { icon: Swords, name: 'Skill Arena', line: 'Subjects & career paths — full guide inside.' },
  { icon: Dumbbell, name: 'Code GYM', line: 'Coding practice, first steps to placement.' },
  { icon: Brain, name: 'Aptitude', line: 'The round every placement test opens with.' },
  { icon: Rocket, name: 'Missions', line: 'Real projects that become portfolio proof.' },
  { icon: Sparkles, name: 'AI Lab', line: 'Hands-on guides for AI tools.' },
  { icon: Server, name: 'Deployment', line: 'Put your projects live, for free.' },
  { icon: Compass, name: 'Career Guidance', line: 'Honest, no-hype fresher advice.' },
  { icon: MapPin, name: 'Walk-Ins', line: 'Community board of interview drives.' },
]

const TIPS = [
  { icon: CircleAlert, node: <>Playing as a <strong>guest</strong>? Progress may not be saved — create an account to keep your XP and rank.</> },
  { icon: Bookmark, node: <>Bookmark any lesson, tool or guide to build your own <strong>study list</strong>.</> },
  { icon: Share2, node: <>Your Hunter profile is <strong>public and shareable</strong> — a live card recruiters can open.</> },
  { icon: Sun, node: <>Switch <strong>light or dark</strong> mode anytime from the top bar.</> },
]

export default function AboutPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const isNewPlayer = isGuest(user)

  return (
    <div className="ab">
      <Navbar sticky />

      {/* ── Hero — System awakening ───────────────────────────────────── */}
      <section className="ab-hero">
        <div className="ab-hero__fx" aria-hidden="true">
          <div className="ab-hero__grid" />
          <div className="ab-hero__orb ab-hero__orb--1" />
          <div className="ab-hero__orb ab-hero__orb--2" />
          <div className="ab-hero__scan" />
          <div className="ab-particles">
            {Array.from({ length: 8 }).map((_, i) => <i key={i} />)}
          </div>
        </div>

        <div className="ab-hero__inner">
          <motion.div
            className="ab-hud ab-sys"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="ab-hud__in">
              <div className="ab-sys__bar">
                <span className="ab-sys__dots"><i /><i /><i /></span>
                <Terminal size={13} /> ARISE · SYSTEM
                <span className="ab-sys__rec"><b /> TUTORIAL</span>
              </div>

              <div className="ab-sys__body">
                <span className="ab-eyebrow" data-text="NEW HUNTER ORIENTATION">NEW HUNTER ORIENTATION</span>

                <h1 className="ab-hero__title">
                  Welcome, <span className="lp-grad-text">Player.</span>
                </h1>

                <p className="ab-term">
                  <span className="ab-term__prompt">&gt;</span>
                  Turn study time into a rank you can prove.
                  <span className="ab-cursor" aria-hidden="true" />
                </p>

                <p className="ab-hero__lede">
                  This is your quick tutorial for ARISE — what this place is, and how to start
                  leveling up. Every area has its own in-game guide; think of this as your map to all of it.
                </p>

                <div className="ab-hero__cta">
                  {isNewPlayer && (
                    <RegisterCTA className="ab-btn ab-btn--primary" trailingIcon={<ArrowRight size={17} />} />
                  )}
                  <button
                    type="button"
                    className={`ab-btn ${isNewPlayer ? 'ab-btn--ghost' : 'ab-btn--primary'}`}
                    onClick={() => navigate('/fresher-instructions')}
                  >
                    Fresher Guidance {!isNewPlayer && <ArrowRight size={17} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="ab-hud ab-status"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          >
            <div className="ab-hud__in">
              <div className="ab-sys__bar">
                <span className="ab-sys__dots"><i /><i /><i /></span>
                <Gauge size={13} /> HUNTER · STATUS
                <span className="ab-sys__rec"><b /> LIVE</span>
              </div>

              <div className="ab-status__body">
                <div className="ab-crest" aria-hidden="true">
                  <span className="ab-crest__ring" />
                  <span className="ab-crest__ring ab-crest__ring--2" />
                  <span className="ab-crest__core">
                    <ChevronsUp size={40} />
                    <span>LEVEL UP</span>
                  </span>
                </div>

                <div className="ab-levelbar" aria-hidden="true">
                  <div className="ab-levelbar__head"><span>RANK PROGRESS</span><b>E → S</b></div>
                  <div className="ab-levelbar__track">
                    <motion.div
                      className="ab-levelbar__fill"
                      initial={{ width: '8%' }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 1.6, ease: EASE, delay: 0.5 }}
                    />
                  </div>
                  <div className="ab-levelbar__ranks">
                    {RANKS.map(r => <span key={r.label}>{r.label}</span>)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <main className="ab-body">
        <div className="ab-wrap">

          {/* ── 01 · What is this place ─────────────────────────────────── */}
          <motion.section className="ab-section" {...reveal}>
            <div className="ab-shead">
              <span className="ab-shead__tag">01 · What is this place</span>
              <h2 className="ab-shead__title">A game where the reward is a job</h2>
            </div>
            <p className="ab-goal">
              ARISE turns students from <b>zero to hired</b>. You learn real skills, take on quests
              and projects, and every win earns XP that raises your rank — from <b>E all the way to S</b>.
              Learn like a game; level up for real.
            </p>
            <div className="ab-ranks">
              <div className="ab-ranks__track">
                <motion.div
                  className="ab-ranks__fill"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
                  style={{ width: '100%' }}
                />
              </div>
              {RANKS.map((r, i) => (
                <motion.div
                  key={r.label}
                  className="ab-rank"
                  style={{ '--rank-color': r.color }}
                  initial={{ opacity: 0, y: 16, scale: 0.85 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.45, ease: EASE, delay: i * 0.09 }}
                >
                  <span className="ab-rank__badge">{r.label}</span>
                  <span className="ab-rank__name">{r.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* ── 02 · How to level up ────────────────────────────────────── */}
          <motion.section className="ab-section" {...reveal}>
            <div className="ab-shead">
              <span className="ab-shead__tag">02 · How to level up</span>
              <h2 className="ab-shead__title">How to earn XP</h2>
              <p className="ab-shead__sub">Learn, build and complete — the XP follows. Here&apos;s where to start.</p>
            </div>
            <div className="ab-level">
              {LEVEL_UP.map(({ icon: Icon, title, desc, accent }, i) => (
                <motion.div
                  key={title}
                  className="ab-hud ab-level__card"
                  style={{ '--lv-accent': accent }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                >
                  <div className="ab-hud__in ab-level__in">
                    <span className="ab-level__icon"><Icon size={20} /></span>
                    <h3 className="ab-level__title">{title}</h3>
                    <p className="ab-level__desc">{desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="ab-level__note">
              <b>&gt;</b> There&apos;s more XP out there too — daily streaks, missions and more. Explore and you&apos;ll find it.
            </p>
          </motion.section>

          {/* ── 03 · Where to go ────────────────────────────────────────── */}
          <motion.section className="ab-section" {...reveal}>
            <div className="ab-shead">
              <span className="ab-shead__tag">03 · Where to go</span>
              <h2 className="ab-shead__title">Where to go</h2>
            </div>
            <div className="ab-map">
              {MAP.map(({ icon: Icon, name, line }, i) => (
                <motion.div
                  key={name}
                  className="ab-map__item"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, ease: EASE, delay: (i % 4) * 0.05 }}
                >
                  <span className="ab-map__icon"><Icon size={18} /></span>
                  <span>
                    <span className="ab-map__name">{name}</span>
                    <span className="ab-map__line">{line}</span>
                  </span>
                </motion.div>
              ))}
            </div>
            <p className="ab-map__note">
              <b>&gt;</b> Every area has its own in-app instructions — open it and read the guide there.
            </p>
          </motion.section>

          {/* ── 04 · Rookie tips ────────────────────────────────────────── */}
          <motion.section className="ab-section" {...reveal}>
            <div className="ab-shead">
              <span className="ab-shead__tag">04 · Rookie tips</span>
              <h2 className="ab-shead__title">Things new players miss</h2>
            </div>
            <ul className="ab-tips">
              {TIPS.map((t, i) => {
                const Icon = t.icon
                return (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
                  >
                    <Icon size={18} /> <span>{t.node}</span>
                  </motion.li>
                )
              })}
            </ul>
          </motion.section>

          {/* ── Final CTA ───────────────────────────────────────────────── */}
          <motion.section className="ab-section" {...reveal}>
            <div className="ab-hud ab-cta">
              <div className="ab-hud__in ab-cta__in">
                <Zap size={24} style={{ color: 'var(--sys)' }} />
                <h2 className="ab-cta__title">Tutorial complete. The gate is open.</h2>
                <p className="ab-cta__sub">
                  You know what this place is and how to level up. Time to earn your rank.
                </p>
                <div className="ab-cta__row">
                  {isNewPlayer ? (
                    <>
                      <RegisterCTA className="ab-btn ab-btn--primary" trailingIcon={<ArrowRight size={17} />} />
                      <button type="button" className="ab-btn ab-btn--ghost" onClick={() => navigate('/skill-arena/dashboard')}>
                        Explore as guest
                      </button>
                    </>
                  ) : (
                    <>
                      <button type="button" className="ab-btn ab-btn--primary" onClick={() => navigate('/skill-arena/dashboard')}>
                        Enter the Skill Arena <ArrowRight size={17} />
                      </button>
                      <button type="button" className="ab-btn ab-btn--ghost" onClick={() => navigate('/myprofile')}>
                        Start with my profile
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.section>

        </div>
      </main>
    </div>
  )
}

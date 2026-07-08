import { motion } from 'framer-motion'
import Navbar from '../../components/navbars/Navbar'
import GymLoginSquad from './components/GymLoginSquad'
import GymTrackPath from './components/GymTrackPath'

const HERO_PUNCH = [
  { stop: 'Stop taking notes.', start: 'Start making mistakes.' },
  { stop: 'Stop planning to practice.', start: 'Start practicing badly.' },
  { stop: 'Stop waiting to feel ready.', start: 'Start writing broken code.' },
]

const HERO_CONVO = [
  { speaker: 'nova',  text: 'Welcome to the Code Gym! New here? Perfect — everyone starts right where you are.' },
  { speaker: 'pixel', text: 'Another brave one who read all the theory and finally wants the real thing.' },
  { speaker: 'echo',  text: 'Most people just scroll and leave. This one actually showed up, though.' },
  { speaker: 'nova',  text: 'See? I like them already. Good instincts.' },
  { speaker: 'pixel', text: 'Let me guess — a notebook full of neat notes and zero programs actually run?' },
  { speaker: 'echo',  text: 'Do not worry, that was basically all of us on day one.' },
  { speaker: 'nova',  text: 'So stop planning and just type something. Messy first drafts are allowed here.' },
  { speaker: 'pixel', text: 'Yeah, go write code that breaks. Breaking things is how you learn to fix them.' },
  { speaker: 'echo',  text: 'And your first bug is probably ten minutes away. That is a good thing, promise.' },
]

const EASE = [0.16, 1, 0.3, 1]

export default function ProblemSolvingPage() {
  return (
    <div className="ps-page ps-page--journey">
      <div className="lv-aura" aria-hidden="true">
        <div className="lv-aura__blob lv-aura__blob--1" />
        <div className="lv-aura__blob lv-aura__blob--2" />
        <div className="lv-aura__blob lv-aura__blob--3" />
      </div>

      <Navbar sticky />

      <section className="lv-hero lv-hero--split">
        <div className="lv-hero__shell">
          <div className="lv-hero__grid">
            <motion.div
              className="lv-hero__copy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE }}
            >
              <div className="lv-hero__punchlines">
                {HERO_PUNCH.map(({ stop, start }) => (
                  <div key={stop} className="lv-hero__punch">
                    <span className="lv-hero__punch-stop">{stop}</span>
                    <span className="lv-hero__punch-start">{start}</span>
                  </div>
                ))}
              </div>
              <p className="lv-hero__lead">
                Nobody got hired for their notebook. You get good by typing wrong answers
                until the wrong answers stop showing up. Messy reps beat clean plans every time.
              </p>
            </motion.div>

            <motion.div
              className="lv-hero__bots"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: EASE }}
            >
              <GymLoginSquad
                lines={HERO_CONVO}
                active
                mode="trio"
                clearAfterDone
                className="gym-login-scene--bare gym-login-scene--hero"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <GymTrackPath />
    </div>
  )
}

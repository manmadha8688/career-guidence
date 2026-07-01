import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, Moon, Sun, Swords } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import LoginAnimation from './components/LoginAnimation'
import { AuthFormProvider } from './context/AuthFormContext'
import '../../styles/auth-animations.css'

const panelVariants = {
  initial: (dir) => ({ opacity: 0, x: dir > 0 ? 28 : -28, filter: 'blur(4px)' }),
  animate: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit:    (dir) => ({ opacity: 0, x: dir > 0 ? -20 : 20, filter: 'blur(4px)', transition: { duration: 0.22 } }),
}

export default function AuthLayoutShell() {
  const { pathname } = useLocation()
  const navigate     = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const isRegister = pathname === '/register'
  const isForgot   = pathname === '/forgot-password'
  const direction  = isRegister ? 1 : -1
  const pageClass  = isRegister ? ' auth-page--register' : isForgot ? ' auth-page--forgot' : ' auth-page--login'

  useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prev = { html: html.style.overflow, body: body.style.overflow }
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prev.html
      body.style.overflow = prev.body
    }
  }, [])

  return (
    <AuthFormProvider>
      <div className={`auth-page${pageClass}`}>
        <div className="auth-bg-gradient" aria-hidden="true" />
        <div className="auth-bg-noise"    aria-hidden="true" />

        <div className="auth-top-actions">
          <button type="button" className="auth-back-btn" onClick={() => navigate('/')}>
            <ChevronLeft size={15} /> Home
          </button>
          <button
            type="button"
            className="auth-theme-btn"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Light mode' : 'Dark mode'}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="auth-stage">
          {/*
           * LEFT — bots are always here.
           * No AnimatePresence wrapper → they never animate out on page switch.
           */}
          <div className="auth-stage-col auth-stage-col--leading">
            <LoginAnimation />
          </div>

          {/*
           * RIGHT — form always here.
           * AnimatePresence slides the card between /login and /register.
           */}
          <div className="auth-stage-col auth-stage-col--trailing">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={pathname}
                className="auth-form-col"
                custom={direction}
                variants={panelVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <AuthFormCard navigate={navigate} isLogin={!isRegister} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AuthFormProvider>
  )
}

function AuthFormCard({ navigate, isLogin }) {
  const { pathname } = useLocation()
  const isForgot = pathname === '/forgot-password'
  const tagline = isForgot
    ? 'We will help you get back in.'
    : isLogin
      ? 'Level up. One concept at a time.'
      : 'Your skill journey starts here.'

  return (
    <div className={`auth-card-wrap${isLogin ? ' auth-card-wrap--login' : ' auth-card-wrap--register'}`}>
      <motion.div
        className={`auth-card${isLogin ? ' auth-card--login' : ' auth-card--register'}`}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 130, damping: 20, delay: 0.04 }}
      >
        <div className="auth-card-glow" aria-hidden="true" />
        <div className="auth-card-inner">
          {/* Brand — same on both pages, no nav tabs */}
          <motion.button
            type="button"
            className="auth-brand-block"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="auth-brand-icon">
              <Swords size={22} color="#fff" />
            </div>
            <div className="auth-brand-title">LearnToEarn</div>
          </motion.button>

          <p className="auth-brand-tagline">{tagline}</p>

          {/* Form outlet */}
          <Outlet />
        </div>
      </motion.div>
    </div>
  )
}

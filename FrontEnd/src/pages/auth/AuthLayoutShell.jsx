import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../../components/navbars/Navbar'
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

        <Navbar sticky />

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
                <AuthFormCard isLogin={!isRegister} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AuthFormProvider>
  )
}

function AuthFormCard({ isLogin }) {
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
          <p className="auth-brand-tagline">{tagline}</p>

          {/* Form outlet */}
          <Outlet />
        </div>
      </motion.div>
    </div>
  )
}

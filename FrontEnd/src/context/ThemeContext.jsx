import { createContext, useContext, useState, useRef, useEffect } from 'react'
import { useSkyTransition } from '../hooks/useSkyTransition'

const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} })

export function ThemeProvider({ children }) {
  // Read from the DOM attribute set by the index.html inline script —
  // it is always correct before React runs, so no localStorage mismatch.
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  )

  // Sky animation — canvas lives on document.body so no parent CSS can
  // interfere with position:fixed. All three toggle buttons in the app
  // call toggleTheme(), so wiring the animation here means every button
  // automatically plays the transition without touching any page component.
  const canvasRef = useRef(null)
  const triggerSky = useSkyTransition(canvasRef, theme === 'light')

  useEffect(() => {
    const canvas = document.createElement('canvas')
    canvas.style.cssText =
      'position:fixed;top:0;left:0;width:100vw;height:100vh;' +
      'z-index:9999;pointer-events:none;display:none;'
    document.body.appendChild(canvas)
    canvasRef.current = canvas
    return () => {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas)
      canvasRef.current = null
    }
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    const applyTheme = () => {
      document.documentElement.setAttribute('data-theme', next)
      localStorage.setItem('theme', next)
      setTheme(next)
    }
    triggerSky(applyTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

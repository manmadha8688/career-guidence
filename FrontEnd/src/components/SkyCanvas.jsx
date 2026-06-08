import { useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useSkyTransition } from '../hooks/useSkyTransition'

const SkyCanvas = forwardRef(function SkyCanvas(_props, ref) {
  // canvasRef starts null; the useEffect below sets it to the real DOM node.
  // We do NOT render a <canvas> in JSX — creating it imperatively and
  // appending to document.body means React's reconciler never touches it,
  // so re-renders (e.g. when theme flips at the 50% mark) can never
  // clobber the display/opacity that the animation writes directly.
  // It also guarantees position:fixed is measured from the viewport,
  // not from a parent that might have transform/filter/will-change.
  const canvasRef = useRef(null)
  const { theme } = useTheme()
  const triggerTransition = useSkyTransition(canvasRef, theme === 'light')

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

  useImperativeHandle(ref, () => ({
    trigger: triggerTransition,
  }), [triggerTransition])

  // Nothing to render — canvas lives directly on document.body.
  return null
})

export default SkyCanvas

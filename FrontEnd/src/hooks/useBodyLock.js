import { useEffect } from 'react'

export default function useBodyLock(enabled = true) {
  useEffect(() => {
    if (!enabled) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [enabled])
}

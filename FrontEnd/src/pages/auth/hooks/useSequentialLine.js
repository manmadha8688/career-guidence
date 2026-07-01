import { useEffect, useState } from 'react'
import { getLineReadMs, LINE_GAP_MS } from './companionMurmurs'
import { useAuthForm } from '../context/AuthFormContext'

/**
 * Steps through beat lines one at a time.
 * Each line stays visible long enough to read (length-based timing).
 * Last line arms the hide timer from display time (not beat start).
 */
export default function useSequentialLine(murmur) {
  const { armLastLineTimer } = useAuthForm()
  const [lineIdx, setLineIdx] = useState(0)

  useEffect(() => {
    setLineIdx(0)
  }, [murmur?.key])

  useEffect(() => {
    if (!murmur?.lines?.length) return
    const line = murmur.lines[lineIdx]
    if (!line) return

    const isLast = lineIdx >= murmur.lines.length - 1
    if (isLast) armLastLineTimer(line.text)

    if (isLast) return

    const timer = setTimeout(
      () => setLineIdx(i => i + 1),
      getLineReadMs(line.text) + LINE_GAP_MS,
    )
    return () => clearTimeout(timer)
  }, [murmur, lineIdx, armLastLineTimer])

  return murmur?.lines?.[lineIdx] ?? null
}

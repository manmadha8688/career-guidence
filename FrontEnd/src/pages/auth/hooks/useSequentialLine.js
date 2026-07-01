import { useEffect, useState } from 'react'
import { LINE_DURATION_MS, LINE_GAP_MS } from './companionMurmurs'

/**
 * Steps through beat lines sequentially — only one bot talks at a time.
 * Each line is visible for LINE_DURATION_MS, then the next plays after LINE_GAP_MS.
 * Resets whenever the beat key changes (i.e. a new event fires).
 */
export default function useSequentialLine(murmur) {
  const [lineIdx, setLineIdx] = useState(0)

  useEffect(() => {
    setLineIdx(0)
  }, [murmur?.key])

  useEffect(() => {
    if (!murmur?.lines?.length) return
    if (lineIdx >= murmur.lines.length - 1) return

    const timer = setTimeout(
      () => setLineIdx(i => i + 1),
      LINE_DURATION_MS + LINE_GAP_MS,
    )
    return () => clearTimeout(timer)
  }, [murmur, lineIdx])

  return murmur?.lines?.[lineIdx] ?? null
}

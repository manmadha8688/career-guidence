import { useMemo } from 'react'
import { useAuthForm } from '../context/AuthFormContext'
import { resolveMurmur } from './companionMurmurs'

export default function useCompanionMurmur() {
  const { companionEvent, companionVisible } = useAuthForm()

  return useMemo(() => {
    if (!companionVisible || !companionEvent) return null
    return resolveMurmur(companionEvent)
  }, [companionEvent, companionVisible])
}

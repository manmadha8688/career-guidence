import { ChevronRight, Swords } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/** Matches landing navbar "Enter Arena" — use in section navbars (missions, code gym, etc.). */
export default function EnterArenaButton({ className = '' }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const dest = user ? '/skill-arena/dashboard' : '/login?redirect=/skill-arena/dashboard'

  return (
    <button
      type="button"
      onClick={() => navigate(dest)}
      className={`lp-btn-primary lp-btn-primary--nav enter-arena-btn${className ? ` ${className}` : ''}`}
    >
      <Swords size={14} /> Enter Arena <ChevronRight size={14} />
    </button>
  )
}

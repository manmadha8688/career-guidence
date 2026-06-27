import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuidePageWrapper from './GuideLayout'
import { SUPABASE_GUIDE, STACKS } from './guideData'

export default function SupabasePage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const stackData = STACKS.find(s => s.id === 'supabase')
  return (
    <GuidePageWrapper guide={SUPABASE_GUIDE} stackData={stackData} dark={dark} toggleTheme={toggleTheme} onBack={() => navigate('/deployment')} />
  )
}

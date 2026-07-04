import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { SUPABASE_GUIDE } from './guides/supabaseGuide'
import { STACKS } from './guideIndex'

export default function SupabaseDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'supabase')

  return (
    <GuideExperience
      guide={SUPABASE_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

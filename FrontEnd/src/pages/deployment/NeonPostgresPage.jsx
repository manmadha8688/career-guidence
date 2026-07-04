import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { NEON_POSTGRES_GUIDE } from './guides/neonPostgresGuide'
import { STACKS } from './guideIndex'

export default function NeonPostgresPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'neon-postgres')

  return (
    <GuideExperience
      guide={NEON_POSTGRES_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

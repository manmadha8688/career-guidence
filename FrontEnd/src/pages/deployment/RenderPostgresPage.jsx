import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { RENDER_POSTGRES_GUIDE } from './guides/renderPostgresGuide'
import { STACKS } from './guideIndex'

export default function RenderPostgresPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'render-postgres')

  return (
    <GuideExperience
      guide={RENDER_POSTGRES_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

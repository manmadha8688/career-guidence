import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { FASTAPI_GUIDE } from './guides/fastapiGuide'
import { STACKS } from './guideIndex'

export default function FastApiDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'fastapi')

  return (
    <GuideExperience
      guide={FASTAPI_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

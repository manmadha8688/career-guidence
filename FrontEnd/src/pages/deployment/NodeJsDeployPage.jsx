import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { NODEJS_GUIDE } from './guides/nodeGuide'
import { STACKS } from './guideIndex'

export default function NodeJsDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'nodejs')

  return (
    <GuideExperience
      guide={NODEJS_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

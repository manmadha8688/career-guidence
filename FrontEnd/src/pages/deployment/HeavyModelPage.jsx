import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { HEAVY_MODEL_DEPLOY_GUIDE } from './guides/heavyModelGuide'
import { STACKS } from './guideIndex'

export default function HeavyModelPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'heavy-model-deploy')

  return (
    <GuideExperience
      guide={HEAVY_MODEL_DEPLOY_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

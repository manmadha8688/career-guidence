import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { DENO_DEPLOY_GUIDE } from './guides/denoDeployGuide'
import { STACKS } from './guideIndex'

export default function DenoDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'deno-deploy')

  return (
    <GuideExperience
      guide={DENO_DEPLOY_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

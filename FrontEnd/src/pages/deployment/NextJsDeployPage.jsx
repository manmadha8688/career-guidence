import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { NEXTJS_GUIDE } from './guides/nextjsGuide'
import { STACKS } from './guideIndex'

export default function NextJsDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'nextjs')

  return (
    <GuideExperience
      guide={NEXTJS_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

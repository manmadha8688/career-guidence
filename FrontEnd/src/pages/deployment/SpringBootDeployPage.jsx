import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { SPRINGBOOT_GUIDE } from './guides/springbootGuide'
import { STACKS } from './guideIndex'

export default function SpringBootDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'springboot')

  return (
    <GuideExperience
      guide={SPRINGBOOT_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

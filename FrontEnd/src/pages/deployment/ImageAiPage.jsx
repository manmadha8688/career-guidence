import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { IMAGE_AI_GUIDE } from './guides/imageAiGuide'
import { STACKS } from './guideIndex'

export default function ImageAiPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'image-ai')

  return (
    <GuideExperience
      guide={IMAGE_AI_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

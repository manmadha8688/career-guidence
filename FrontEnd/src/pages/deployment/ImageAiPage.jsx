import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuidePageWrapper from './GuideLayout'
import { IMAGE_AI_GUIDE } from './guides/imageAiGuide'
 import { STACKS } from './guideIndex'

export default function ImageAiPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const stackData = STACKS.find(s => s.id === 'image-ai')
  return (
    <GuidePageWrapper guide={IMAGE_AI_GUIDE} stackData={stackData} dark={dark} toggleTheme={toggleTheme} onBack={() => navigate('/deployment')} />
  )
}

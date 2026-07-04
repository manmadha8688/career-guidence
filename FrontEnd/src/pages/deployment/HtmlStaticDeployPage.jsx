import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { HTML_STATIC_GUIDE } from './guides/htmlStaticGuide'
import { STACKS } from './guideIndex'

export default function HtmlStaticDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'html-static')

  return (
    <GuideExperience
      guide={HTML_STATIC_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

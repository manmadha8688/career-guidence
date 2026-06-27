import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuidePageWrapper from './GuideLayout'
import { HTML_STATIC_GUIDE, STACKS } from './guideData'

export default function HtmlStaticDeployPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const stackData = STACKS.find(s => s.id === 'html-static')

  return (
    <GuidePageWrapper
      guide={HTML_STATIC_GUIDE}
      stackData={stackData}
      dark={dark}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuidePageWrapper from './GuideLayout'
import { SPRINGBOOT_GUIDE, STACKS } from './guideData'

export default function SpringBootDeployPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const stackData = STACKS.find(s => s.id === 'springboot')

  return (
    <GuidePageWrapper
      guide={SPRINGBOOT_GUIDE}
      stackData={stackData}
      dark={dark}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

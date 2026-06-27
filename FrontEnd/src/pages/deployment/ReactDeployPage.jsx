import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuidePageWrapper from './GuideLayout'
import { REACT_GUIDE } from './guides/reactGuide'
 import { STACKS } from './guideIndex'

export default function ReactDeployPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const stackData = STACKS.find(s => s.id === 'react')

  return (
    <GuidePageWrapper
      guide={REACT_GUIDE}
      stackData={stackData}
      dark={dark}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

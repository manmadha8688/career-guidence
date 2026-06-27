import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuidePageWrapper from './GuideLayout'
import { FASTAPI_GUIDE, STACKS } from './guideData'

export default function FastApiDeployPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const stackData = STACKS.find(s => s.id === 'fastapi')
  return (
    <GuidePageWrapper guide={FASTAPI_GUIDE} stackData={stackData} dark={dark} toggleTheme={toggleTheme} onBack={() => navigate('/deployment')} />
  )
}

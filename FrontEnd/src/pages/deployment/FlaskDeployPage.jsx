import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuidePageWrapper from './GuideLayout'
import { FLASK_GUIDE, STACKS } from './guideData'

export default function FlaskDeployPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const stackData = STACKS.find(s => s.id === 'flask')
  return (
    <GuidePageWrapper guide={FLASK_GUIDE} stackData={stackData} dark={dark} toggleTheme={toggleTheme} onBack={() => navigate('/deployment')} />
  )
}

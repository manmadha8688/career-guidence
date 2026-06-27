import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuidePageWrapper from './GuideLayout'
import { RENDER_POSTGRES_GUIDE, STACKS } from './guideData'

export default function RenderPostgresPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const stackData = STACKS.find(s => s.id === 'render-postgres')
  return (
    <GuidePageWrapper guide={RENDER_POSTGRES_GUIDE} stackData={stackData} dark={dark} toggleTheme={toggleTheme} onBack={() => navigate('/deployment')} />
  )
}

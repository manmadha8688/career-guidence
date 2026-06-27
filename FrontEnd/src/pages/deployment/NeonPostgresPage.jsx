import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuidePageWrapper from './GuideLayout'
import { NEON_POSTGRES_GUIDE, STACKS } from './guideData'

export default function NeonPostgresPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const stackData = STACKS.find(s => s.id === 'neon-postgres')
  return (
    <GuidePageWrapper guide={NEON_POSTGRES_GUIDE} stackData={stackData} dark={dark} toggleTheme={toggleTheme} onBack={() => navigate('/deployment')} />
  )
}

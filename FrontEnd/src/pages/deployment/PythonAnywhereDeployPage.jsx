import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { PYTHONANYWHERE_GUIDE } from './guides/pythonanywhereGuide'
import { STACKS } from './guideIndex'

export default function PythonAnywhereDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'pythonanywhere')

  return (
    <GuideExperience
      guide={PYTHONANYWHERE_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

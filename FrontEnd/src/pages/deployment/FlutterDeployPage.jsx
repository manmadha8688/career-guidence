import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { FLUTTER_GUIDE } from './guides/flutterGuide'
import { STACKS } from './guideIndex'

export default function FlutterDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'flutter')

  return (
    <GuideExperience
      guide={FLUTTER_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

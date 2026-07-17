import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { FIREBASE_GUIDE } from './guides/firebaseGuide'
import { STACKS } from './guideIndex'

export default function FirebaseDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'firebase')

  return (
    <GuideExperience
      guide={FIREBASE_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

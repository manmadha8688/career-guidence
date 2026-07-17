import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { SVELTEKIT_GUIDE } from './guides/sveltekitGuide'
import { STACKS } from './guideIndex'

export default function SvelteKitDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'sveltekit')

  return (
    <GuideExperience
      guide={SVELTEKIT_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

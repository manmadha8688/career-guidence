import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { CLOUDFLARE_PAGES_GUIDE } from './guides/cloudflarePagesGuide'
import { STACKS } from './guideIndex'

export default function CloudflarePagesDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'cloudflare-pages')

  return (
    <GuideExperience
      guide={CLOUDFLARE_PAGES_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

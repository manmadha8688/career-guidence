import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { SCRAPER_GUIDE } from './guides/scraperGuide'
import { STACKS } from './guideIndex'

export default function ScraperDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'scraper-automation')

  return (
    <GuideExperience
      guide={SCRAPER_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

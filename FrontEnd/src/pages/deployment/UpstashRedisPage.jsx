import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { UPSTASH_REDIS_GUIDE } from './guides/upstashRedisGuide'
import { STACKS } from './guideIndex'

export default function UpstashRedisPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'upstash-redis')

  return (
    <GuideExperience
      guide={UPSTASH_REDIS_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

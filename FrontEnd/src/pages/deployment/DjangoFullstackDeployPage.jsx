import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { DJANGO_FULLSTACK_GUIDE } from './guides/djangoFullstackGuide'
import { STACKS } from './guideIndex'

export default function DjangoFullstackDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'django-fullstack')

  return (
    <GuideExperience
      guide={DJANGO_FULLSTACK_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

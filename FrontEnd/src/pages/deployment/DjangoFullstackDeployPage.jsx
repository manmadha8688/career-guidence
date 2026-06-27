import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuidePageWrapper from './GuideLayout'
import { DJANGO_FULLSTACK_GUIDE, STACKS } from './guideData'

export default function DjangoFullstackDeployPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const stackData = STACKS.find(s => s.id === 'django-fullstack')

  return (
    <GuidePageWrapper
      guide={DJANGO_FULLSTACK_GUIDE}
      stackData={stackData}
      dark={dark}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

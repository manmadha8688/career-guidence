import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuidePageWrapper from './GuideLayout'
import { HEAVY_MODEL_DEPLOY_GUIDE } from './guides/heavyModelGuide'
 import { STACKS } from './guideIndex'

export default function HeavyModelPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const stackData = STACKS.find(s => s.id === 'heavy-model-deploy')
  return (
    <GuidePageWrapper guide={HEAVY_MODEL_DEPLOY_GUIDE} stackData={stackData} dark={dark} toggleTheme={toggleTheme} onBack={() => navigate('/deployment')} />
  )
}

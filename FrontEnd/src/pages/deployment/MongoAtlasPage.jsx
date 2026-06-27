import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuidePageWrapper from './GuideLayout'
import { MONGODB_ATLAS_GUIDE } from './guides/mongoAtlasGuide'
 import { STACKS } from './guideIndex'

export default function MongoAtlasPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const stackData = STACKS.find(s => s.id === 'mongodb-atlas')
  return (
    <GuidePageWrapper guide={MONGODB_ATLAS_GUIDE} stackData={stackData} dark={dark} toggleTheme={toggleTheme} onBack={() => navigate('/deployment')} />
  )
}

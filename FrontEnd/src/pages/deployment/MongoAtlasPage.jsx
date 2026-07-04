import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { MONGODB_ATLAS_GUIDE } from './guides/mongoAtlasGuide'
import { STACKS } from './guideIndex'

export default function MongoAtlasPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'mongodb-atlas')

  return (
    <GuideExperience
      guide={MONGODB_ATLAS_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

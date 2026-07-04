import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { RAG_APP_GUIDE } from './guides/ragAppGuide'
import { STACKS } from './guideIndex'

export default function RagAppPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'rag-app')

  return (
    <GuideExperience
      guide={RAG_APP_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

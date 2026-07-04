import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { NLP_DEMO_GUIDE } from './guides/nlpDemoGuide'
import { STACKS } from './guideIndex'

export default function NlpDemoPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'nlp-demo')

  return (
    <GuideExperience
      guide={NLP_DEMO_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuidePageWrapper from './GuideLayout'
import { NLP_DEMO_GUIDE } from './guides/nlpDemoGuide'
 import { STACKS } from './guideIndex'

export default function NlpDemoPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const stackData = STACKS.find(s => s.id === 'nlp-demo')
  return (
    <GuidePageWrapper guide={NLP_DEMO_GUIDE} stackData={stackData} dark={dark} toggleTheme={toggleTheme} onBack={() => navigate('/deployment')} />
  )
}

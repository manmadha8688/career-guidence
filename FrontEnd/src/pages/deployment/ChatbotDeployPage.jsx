import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuidePageWrapper from './GuideLayout'
import { CHATBOT_DEPLOY_GUIDE } from './guides/chatbotGuide'
 import { STACKS } from './guideIndex'

export default function ChatbotDeployPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const stackData = STACKS.find(s => s.id === 'chatbot-deploy')
  return (
    <GuidePageWrapper guide={CHATBOT_DEPLOY_GUIDE} stackData={stackData} dark={dark} toggleTheme={toggleTheme} onBack={() => navigate('/deployment')} />
  )
}

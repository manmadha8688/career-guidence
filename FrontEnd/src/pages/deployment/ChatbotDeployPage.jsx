import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { CHATBOT_DEPLOY_GUIDE } from './guides/chatbotGuide'
import { STACKS } from './guideIndex'

export default function ChatbotDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'chatbot-deploy')

  return (
    <GuideExperience
      guide={CHATBOT_DEPLOY_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

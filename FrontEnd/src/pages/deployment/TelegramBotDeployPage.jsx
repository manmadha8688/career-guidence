import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { TELEGRAM_BOT_GUIDE } from './guides/telegramBotGuide'
import { STACKS } from './guideIndex'

export default function TelegramBotDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'telegram-bot')

  return (
    <GuideExperience
      guide={TELEGRAM_BOT_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

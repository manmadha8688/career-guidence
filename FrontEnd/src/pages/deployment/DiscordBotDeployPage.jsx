import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { DISCORD_BOT_GUIDE } from './guides/discordBotGuide'
import { STACKS } from './guideIndex'

export default function DiscordBotDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'discord-bot')

  return (
    <GuideExperience
      guide={DISCORD_BOT_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

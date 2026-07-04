import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import GuideExperience from './GuideExperience'
import { STREAMLIT_GUIDE } from './guides/streamlitGuide'
import { STACKS } from './guideIndex'

export default function StreamlitDeployPage() {
  const navigate = useNavigate()
  const { toggleTheme } = useTheme()
  const stackData = STACKS.find(s => s.id === 'streamlit')

  return (
    <GuideExperience
      guide={STREAMLIT_GUIDE}
      stackData={stackData}
      toggleTheme={toggleTheme}
      onBack={() => navigate('/deployment')}
    />
  )
}

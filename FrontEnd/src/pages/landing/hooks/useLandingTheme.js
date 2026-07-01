import { useTheme } from '../../../context/ThemeContext'

export default function useLandingTheme() {
  const { theme, toggleTheme } = useTheme()
  return { theme, toggleTheme, lt: theme === 'light' }
}

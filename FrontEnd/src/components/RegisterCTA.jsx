import { useNavigate } from 'react-router-dom'

// Single source of truth for the "Create free account" nudge shown to guests and
// anonymous visitors. Keeps the label + destination (/register) identical
// everywhere; each placement supplies only its own styling (className) and an
// optional side-effect (onClick — e.g. to close an overlay) plus optional
// leading / trailing icons to match the surrounding buttons.
export default function RegisterCTA({
  className = '',
  label = 'Create free account',
  icon = null,
  trailingIcon = null,
  onClick,
}) {
  const navigate = useNavigate()

  const handleClick = () => {
    onClick?.()
    navigate('/register')
  }

  return (
    <button type="button" className={className} onClick={handleClick}>
      {icon}
      {label}
      {trailingIcon}
    </button>
  )
}

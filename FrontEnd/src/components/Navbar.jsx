import { Menu, Sun, Moon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'

export default function Navbar({ onMenuClick, title = '' }) {
  const { user } = useAuth()
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  const initials = user?.fullName?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button className="theme-toggle" onClick={onMenuClick} title="Toggle menu">
          <Menu size={18} />
        </button>
        {title && <span className="navbar-title">{title}</span>}
      </div>
      <div className="navbar-right">
        <button className="theme-toggle" onClick={() => setDark(d => !d)} title="Toggle theme">
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
        <div className="navbar-user">
          <div className="navbar-avatar" style={{ background: user?.avatarColor || '#4F46E5' }}>
            {initials}
          </div>
          <div>
            <div className="navbar-name">{user?.fullName}</div>
            <div className="text-xs text-muted">{user?.role}</div>
          </div>
        </div>
      </div>
    </header>
  )
}

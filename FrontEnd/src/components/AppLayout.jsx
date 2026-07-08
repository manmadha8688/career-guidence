import { useState } from 'react'
import Sidebar from './Sidebar'
import AppNavbar from './navbars/AppNavbar'

export default function AppLayout({ children, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-layout">
      <a href="#main-content" className="sr-only sr-only-focusable">Skip to content</a>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <AppNavbar onMenuClick={() => setSidebarOpen(o => !o)} title={title} />
      <main id="main-content" className="main-content fade-in">
        {children}
      </main>
    </div>
  )
}

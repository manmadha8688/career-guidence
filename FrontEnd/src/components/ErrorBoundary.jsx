import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // In production you could send this to an error tracking service
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught:', error, info.componentStack)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: '1rem',
          background: 'var(--bg-primary, #0C1020)', color: 'var(--text-primary, #D6E4F7)',
          fontFamily: "'Rajdhani', sans-serif", textAlign: 'center', padding: '2rem',
        }}>
          <span style={{ fontSize: '2.5rem' }}>⚠️</span>
          <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '1.1rem', margin: 0, color: '#EF4444' }}>
            Something went wrong
          </h2>
          <p style={{ color: 'var(--text-muted, #8A99BF)', fontSize: '0.9rem', maxWidth: 400, margin: 0 }}>
            An unexpected error occurred. Please refresh the page or go back to the home page.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '0.6rem 1.25rem', borderRadius: 8, cursor: 'pointer',
                background: 'linear-gradient(135deg, #9B6ED4, #7C3AED)',
                border: 'none', color: '#fff',
                fontFamily: "'Orbitron', sans-serif", fontSize: '0.75rem', fontWeight: 700,
              }}
            >
              Refresh page
            </button>
            <button
              onClick={() => { this.setState({ hasError: false }); window.location.href = '/' }}
              style={{
                padding: '0.6rem 1.25rem', borderRadius: 8, cursor: 'pointer',
                background: 'none', border: '1px solid rgba(155,110,212,0.4)',
                color: '#9B6ED4', fontFamily: "'Orbitron', sans-serif", fontSize: '0.75rem',
              }}
            >
              Go home
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

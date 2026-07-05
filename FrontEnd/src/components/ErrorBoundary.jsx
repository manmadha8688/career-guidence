import { Component } from 'react'

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught:', error, info.componentStack)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <span className="error-boundary__icon">⚠️</span>
          <h2 className="error-boundary__title">Something went wrong</h2>
          <p className="error-boundary__desc">
            An unexpected error occurred. Please refresh the page or go back to learnforearn.
          </p>
          <div className="error-boundary__actions">
            <button type="button" className="error-boundary__btn-primary" onClick={() => window.location.reload()}>
              Refresh page
            </button>
            <button
              type="button"
              className="error-boundary__btn-ghost"
              onClick={() => { this.setState({ hasError: false }); window.location.href = '/' }}
            >
              learnforearn
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

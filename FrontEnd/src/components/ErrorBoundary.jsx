import { Component } from 'react'

// A lazy-loaded route chunk 404s when the user has an old tab open after a redeploy
// (Vercel purges the previous build's hashed files). This is recoverable — a single
// reload fetches the current chunk. Matched loosely across browsers' wording.
const CHUNK_LOAD_ERROR = /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|dynamically imported module/i
const CHUNK_RELOAD_FLAG = 'sl_chunk_reloaded'

function isChunkLoadError(error) {
  return CHUNK_LOAD_ERROR.test(error?.message || '')
}

export default class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError(error) {
    // Don't flash the error screen for a recoverable stale-chunk error the first time —
    // componentDidCatch will reload. If a reload already happened this session, fall
    // through to the normal error UI so we never loop.
    if (isChunkLoadError(error) && !sessionStorage.getItem(CHUNK_RELOAD_FLAG)) {
      return { hasError: false }
    }
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    if (isChunkLoadError(error) && !sessionStorage.getItem(CHUNK_RELOAD_FLAG)) {
      try { sessionStorage.setItem(CHUNK_RELOAD_FLAG, '1') } catch { /* private mode — reload anyway */ }
      window.location.reload()
      return
    }
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
            An unexpected error occurred. Please refresh the page or go back to LearnForEarn.
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
              LearnForEarn
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

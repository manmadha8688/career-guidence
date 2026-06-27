import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      textAlign: 'center',
    }}>
      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 'clamp(5rem, 20vw, 9rem)',
        fontWeight: 900,
        lineHeight: 1,
        background: 'linear-gradient(135deg, #9B6ED4, #7C3AED)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '1rem',
        letterSpacing: '-0.02em',
      }}>
        404
      </div>

      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: '0.85rem',
        letterSpacing: '0.2em',
        color: 'var(--text-muted)',
        marginBottom: '0.75rem',
        textTransform: 'uppercase',
      }}>
        Page not found
      </div>

      <p style={{
        fontFamily: "'Rajdhani', sans-serif",
        fontSize: '1.05rem',
        color: 'var(--text-secondary)',
        maxWidth: 360,
        lineHeight: 1.6,
        marginBottom: '2rem',
      }}>
        The page you are looking for does not exist or may have been moved.
      </p>

      <button
        onClick={() => navigate('/')}
        style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          padding: '0.75rem 2rem',
          borderRadius: 8,
          background: 'linear-gradient(135deg, #9B6ED4, #7C3AED)',
          border: 'none',
          color: '#fff',
          cursor: 'pointer',
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
        onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
      >
        ← RETURN HOME
      </button>
    </div>
  )
}

import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { loginUser } from '../../api/api'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await loginUser(form)
      login(data.token, data.user)
      data.user.role === 'ADMIN' ? navigate('/admin-skill-arena') : navigate('/skill-arena/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎓</div>
          <div className="auth-brand">LearnPath</div>
          <p className="auth-tagline">
            Master your career, one concept at a time. Visual roadmaps, structured learning, real progress.
          </p>
          <div style={{ display: 'flex', gap: '2rem', marginTop: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[['📚', 'Structured Subjects'], ['🗺️', 'Career Roadmaps'], ['✅', 'Track Progress']].map(([icon, label]) => (
              <div key={label} style={{ textAlign: 'center', opacity: 0.9 }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.375rem' }}>{icon}</div>
                <div style={{ fontSize: '0.8125rem', opacity: 0.85 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-right">
        <h1 className="auth-form-title">Welcome back</h1>
        <p className="auth-form-sub">Sign in to continue your learning journey</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-input"
              placeholder="you@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPass ? 'text' : 'password'}
                className="form-input"
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
                style={{ paddingRight: '3rem' }}
              />
              <button type="button" className="password-toggle" onClick={() => setShowPass(p => !p)}>
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full btn-lg" disabled={loading}
            style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
            {loading ? <span className="loading-spinner" /> : null}
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="auth-link-text">
          Don't have an account? <Link to="/register">Create one free</Link>
        </p>

        <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
          <strong style={{ color: 'var(--text-secondary)' }}>Demo admin:</strong> admin@demo.com / Admin@123
        </div>
      </div>
    </div>
  )
}

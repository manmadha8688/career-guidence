import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { registerUser } from '../../api/api'
import toast from 'react-hot-toast'

function getStrength(pw) {
  let score = 0
  if (pw.length >= 8) score++
  if (/[A-Z]/.test(pw)) score++
  if (/[0-9]/.test(pw)) score++
  if (/[^A-Za-z0-9]/.test(pw)) score++
  return score
}

export default function RegisterPage() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '', collegeName: '' })
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const strength = getStrength(form.password)

  const handleSubmit = async e => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const { fullName, email, password, collegeName } = form
      const { data } = await registerUser({ fullName, email, password, collegeName })
      login(data.token, data.user)
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  const strengthColors = ['', 'weak', 'medium', 'medium', 'strong']
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong']

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚀</div>
          <div className="auth-brand">Join LearnPath</div>
          <p className="auth-tagline">
            Start your career journey today. Follow personalized roadmaps, learn at your pace.
          </p>
        </div>
      </div>

      <div className="auth-right">
        <h1 className="auth-form-title">Create your account</h1>
        <p className="auth-form-sub">Start learning for free today</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" placeholder="Alice Johnson"
              value={form.fullName} onChange={e => setForm({ ...form, fullName: e.target.value })} required />
          </div>

          <div className="form-group">
            <label className="form-label">Email address</label>
            <input type="email" className="form-input" placeholder="alice@example.com"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-input-wrapper">
              <input type={showPass ? 'text' : 'password'} className="form-input"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required style={{ paddingRight: '3rem' }} />
              <button type="button" className="password-toggle" onClick={() => setShowPass(p => !p)}>
                {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
            {form.password && (
              <>
                <div className="password-strength">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`strength-bar ${i <= strength ? strengthColors[strength] : ''}`} />
                  ))}
                </div>
                <div className="form-hint">{strengthLabel[strength]} password</div>
              </>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-input" placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={e => setForm({ ...form, confirmPassword: e.target.value })} required />
            {form.confirmPassword && form.password !== form.confirmPassword && (
              <div className="form-error">Passwords don't match</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">College Name <span className="text-muted">(optional)</span></label>
            <input type="text" className="form-input" placeholder="Your college or university"
              value={form.collegeName} onChange={e => setForm({ ...form, collegeName: e.target.value })} />
          </div>

          <button type="submit" className="btn btn-primary w-full btn-lg" disabled={loading}
            style={{ justifyContent: 'center' }}>
            {loading ? <span className="loading-spinner" /> : null}
            {loading ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <p className="auth-link-text">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

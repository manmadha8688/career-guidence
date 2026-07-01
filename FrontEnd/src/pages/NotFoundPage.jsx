import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="not-found-page">
      <div className="not-found-page__code">404</div>
      <div className="not-found-page__label">Page not found</div>
      <p className="not-found-page__text">
        The page you are looking for does not exist or may have been moved.
      </p>
      <button type="button" className="not-found-page__btn" onClick={() => navigate('/')}>
        ← RETURN HOME
      </button>
    </div>
  )
}

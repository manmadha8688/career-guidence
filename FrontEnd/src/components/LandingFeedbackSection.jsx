import { useState } from 'react'
import { MessageSquare, Star, ThumbsUp, ThumbsDown, Loader2, Heart } from 'lucide-react'
import toast from 'react-hot-toast'
import { submitFeedback } from '../api/api'

const CATEGORIES = [
  { id: 'Bug', emoji: '🐛' },
  { id: 'Suggestion', emoji: '💡' },
  { id: 'Content', emoji: '📚' },
  { id: 'Other', emoji: '💬' },
]

const RATING_HINTS = ['', 'Needs work', 'Could be better', 'Decent', 'Good', 'Love it']

export default function LandingFeedbackSection() {
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [experience, setExperience] = useState('')
  const [category, setCategory] = useState('')
  const [categoryNote, setCategoryNote] = useState('')
  const [isUseful, setIsUseful] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const displayRating = hoverRating || rating

  const handleSubmit = async e => {
    e.preventDefault()
    if (rating < 1) {
      toast.error('Pick a star rating — even one star helps us improve.')
      return
    }
    if (isUseful === null) {
      toast.error('Tell us if LearnToEarn is useful for you — yes or not really.')
      return
    }
    if (!experience.trim()) {
      toast.error('Share an honest line about your experience. What worked? What did not?')
      return
    }
    setSubmitting(true)
    try {
      await submitFeedback({
        rating,
        experience: experience.trim(),
        category: category || null,
        categoryNote: categoryNote.trim() || null,
        isUseful,
      })
      setSubmitted(true)
      toast.success('Thank you — honest feedback like yours shapes what we build next.')
    } catch {
      toast.error('We could not send your feedback right now. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section id="feedback" className="lp-feedback-section">
        <div className="lp-feedback-inner lp-reveal">
          <div className="lp-feedback-card" style={{ textAlign: 'center' }}>
            <Heart size={36} color="var(--primary)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--text-primary)' }}>
              We got it — thank you
            </h2>
            <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.7, maxWidth: 420, marginInline: 'auto' }}>
              Every honest review goes straight to the team. Your input helps us build something students actually need.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="feedback" className="lp-feedback-section">
      <div className="lp-feedback-inner">
        <div className="lp-reveal" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{
            color: 'var(--primary)', fontWeight: 700, fontSize: '0.8rem',
            letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem',
          }}>
            Honest Feedback
          </p>
          <h2 style={{
            fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', fontWeight: 800,
            color: 'var(--text-primary)', margin: '0 0 0.75rem', letterSpacing: '-0.02em',
          }}>
            Tell us what you really think
          </h2>
          <p style={{
            color: 'var(--text-secondary)', fontSize: '1rem', margin: 0,
            maxWidth: 540, marginInline: 'auto', lineHeight: 1.7,
          }}>
            LearnToEarn is still growing. Your honest review — good or bad — helps us understand what students need most.
          </p>
        </div>

        <form className="lp-feedback-card lp-reveal" onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Overall rating <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }} role="radiogroup" aria-label="Star rating">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  role="radio"
                  aria-checked={rating === star}
                  aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  className={`lp-feedback-star${star <= displayRating ? ' is-on' : ''}`}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                >
                  <Star size={32} fill={star <= displayRating ? '#F59E0B' : 'none'} />
                </button>
              ))}
              {displayRating > 0 && (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  {RATING_HINTS[displayRating]}
                </span>
              )}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Is LearnToEarn useful for students like you? <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <div className="lp-feedback-useful">
              <button
                type="button"
                className={`lp-feedback-useful-btn lp-feedback-useful-btn--yes${isUseful === true ? ' is-active' : ''}`}
                aria-pressed={isUseful === true}
                onClick={() => setIsUseful(true)}
              >
                <ThumbsUp size={18} /> Yes, it helps
              </button>
              <button
                type="button"
                className={`lp-feedback-useful-btn lp-feedback-useful-btn--no${isUseful === false ? ' is-active' : ''}`}
                aria-pressed={isUseful === false}
                onClick={() => setIsUseful(false)}
              >
                <ThumbsDown size={18} /> Not really
              </button>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label htmlFor="feedback-experience" style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Your honest review <span style={{ color: 'var(--danger)' }}>*</span>
            </label>
            <textarea
              id="feedback-experience"
              value={experience}
              onChange={e => setExperience(e.target.value)}
              rows={4}
              maxLength={2000}
              placeholder="What did you like? What frustrated you? What should we add or fix? Be direct — we read everything."
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '0.875rem 1rem', borderRadius: 12,
                border: '1px solid var(--border)', background: 'var(--bg-secondary)',
                color: 'var(--text-primary)', fontSize: '0.925rem', resize: 'vertical',
                fontFamily: 'inherit', lineHeight: 1.6,
              }}
            />
            <div style={{ textAlign: 'right', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>
              {experience.length}/2000
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <span style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Category <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(optional)</span>
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={category === cat.id}
                  onClick={() => setCategory(category === cat.id ? '' : cat.id)}
                  className={`filter-chip${category === cat.id ? ' active' : ''}`}
                >
                  {cat.emoji} {cat.id}
                </button>
              ))}
            </div>
          </div>

          {category && (
            <div style={{ marginBottom: '1.25rem' }}>
              <label htmlFor="feedback-category-note" style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                More on {category.toLowerCase()}
              </label>
              <input
                id="feedback-category-note"
                type="text"
                value={categoryNote}
                onChange={e => setCategoryNote(e.target.value)}
                maxLength={500}
                placeholder="Optional details"
                className="form-input"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%', padding: '0.95rem 1rem', borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg, #7C3AED, #9B6ED4)',
              color: '#fff', fontWeight: 700, fontSize: '0.95rem', cursor: submitting ? 'wait' : 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              opacity: submitting ? 0.75 : 1,
              boxShadow: '0 4px 24px rgba(155, 110, 212, 0.35)',
            }}
          >
            {submitting
              ? <><Loader2 size={18} className="spin" /> Sending…</>
              : <><MessageSquare size={18} /> Submit honest feedback</>}
          </button>
        </form>
      </div>
    </section>
  )
}

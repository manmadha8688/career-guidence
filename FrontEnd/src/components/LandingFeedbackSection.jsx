import { useState } from 'react'
import { MessageSquare, Star, ThumbsUp, ThumbsDown, Loader2, Heart, Sparkles } from 'lucide-react'
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
        <div className="lp-feedback-shell lp-reveal">
          <div className="lp-feedback-card lp-feedback-card--success">
            <div className="lp-feedback-success-icon">
              <Heart size={32} />
            </div>
            <h2>We got it — thank you</h2>
            <p>
              Every honest review goes straight to the team. Your input helps us build something students actually need.
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="feedback" className="lp-feedback-section">
      <div className="lp-feedback-shell">
        <header className="lp-feedback-header lp-reveal">
          <span className="lp-feedback-eyebrow">
            <Sparkles size={14} /> Honest Feedback
          </span>
          <h2>Tell us what you really think</h2>
          <p>
            LearnToEarn is still growing. Good or bad — your review helps us understand what students need most.
          </p>
        </header>

        <form className="lp-feedback-card lp-reveal" onSubmit={handleSubmit}>
          <div className="lp-feedback-block">
            <label className="lp-feedback-label">
              Overall rating <span className="lp-feedback-req">*</span>
            </label>
            <div className="lp-feedback-stars" role="radiogroup" aria-label="Star rating">
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
                  <Star size={26} fill={star <= displayRating ? '#F59E0B' : 'none'} />
                </button>
              ))}
              {displayRating > 0 && (
                <span className="lp-feedback-rating-hint">{RATING_HINTS[displayRating]}</span>
              )}
            </div>
          </div>

          <div className="lp-feedback-block">
            <label className="lp-feedback-label">
              Is LearnToEarn useful for students like you? <span className="lp-feedback-req">*</span>
            </label>
            <div className="lp-feedback-useful">
              <button
                type="button"
                className={`lp-feedback-useful-btn lp-feedback-useful-btn--yes${isUseful === true ? ' is-active' : ''}`}
                aria-pressed={isUseful === true}
                onClick={() => setIsUseful(true)}
              >
                <ThumbsUp size={17} /> Yes, it helps
              </button>
              <button
                type="button"
                className={`lp-feedback-useful-btn lp-feedback-useful-btn--no${isUseful === false ? ' is-active' : ''}`}
                aria-pressed={isUseful === false}
                onClick={() => setIsUseful(false)}
              >
                <ThumbsDown size={17} /> Not really
              </button>
            </div>
          </div>

          <div className="lp-feedback-block">
            <label className="lp-feedback-label" htmlFor="feedback-experience">
              Your honest review <span className="lp-feedback-req">*</span>
            </label>
            <textarea
              id="feedback-experience"
              className="form-input lp-feedback-textarea"
              value={experience}
              onChange={e => setExperience(e.target.value)}
              rows={4}
              maxLength={2000}
              placeholder="What did you like? What frustrated you? What should we add or fix?"
            />
            <div className="lp-feedback-char">{experience.length}/2000</div>
          </div>

          <div className="lp-feedback-block">
            <span className="lp-feedback-label">
              Category <span className="lp-feedback-opt">optional</span>
            </span>
            <div className="lp-feedback-cats">
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  aria-pressed={category === cat.id}
                  onClick={() => setCategory(category === cat.id ? '' : cat.id)}
                  className={`lp-feedback-cat${category === cat.id ? ' is-on' : ''}`}
                >
                  <span>{cat.emoji}</span> {cat.id}
                </button>
              ))}
            </div>
          </div>

          {category && (
            <div className="lp-feedback-block">
              <label className="lp-feedback-label" htmlFor="feedback-category-note">
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

          <button type="submit" className="lp-feedback-submit" disabled={submitting}>
            {submitting
              ? <><Loader2 size={18} className="spin" /> Sending…</>
              : <><MessageSquare size={18} /> Submit honest feedback</>}
          </button>
        </form>
      </div>
    </section>
  )
}

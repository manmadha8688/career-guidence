import { useNavigate } from 'react-router-dom'
import { Mail, LifeBuoy, ShieldCheck, Handshake, Flag, MessageSquare, Clock } from 'lucide-react'
import InfoPageLayout from '../components/InfoPageLayout'

const MAILBOXES = [
  { icon: Mail, title: 'General', text: 'Questions, ideas, or just want to say hi.', email: 'hello@learnforearn.in' },
  { icon: LifeBuoy, title: 'Support', text: 'Bugs, broken content, account or login trouble.', email: 'help@learnforearn.in' },
  { icon: ShieldCheck, title: 'Privacy & data', text: 'Data access, correction, or deletion requests.', email: 'privacy@learnforearn.in' },
  { icon: Handshake, title: 'Partnerships', text: 'Colleges, communities, and hiring teams.', email: 'partnerships@learnforearn.in' },
]

export default function ContactPage() {
  const navigate = useNavigate()

  const goToFeedback = () => {
    navigate('/')
    setTimeout(() => document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' }), 300)
  }

  return (
    <InfoPageLayout
      eyebrow="Contact"
      title="Talk to a human."
      lede="This platform is built by people who actually care whether you get hired. Every report, question, and idea is read — and it directly shapes what gets fixed and built next."
    >
      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">01</span>
          <h2 className="info-block__title">Reach the right inbox</h2>
          <p className="info-block__desc">Pick the mailbox that matches what you need — it gets to the right place faster.</p>
        </div>
        <div className="info-block__content">
          <div className="info-grid">
            {MAILBOXES.map(({ icon: Icon, title, text, email }) => (
              <div key={title} className="info-card">
                <span className="info-card__icon"><Icon size={20} /></span>
                <h3 className="info-card__title">{title}</h3>
                <p>{text}</p>
                <a className="info-card__email" href={`mailto:${email}`} rel="noopener">{email}</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">02</span>
          <h2 className="info-block__title">Fastest ways to reach us</h2>
          <p className="info-block__desc">In-app tools beat email — they carry context automatically.</p>
        </div>
        <div className="info-block__content">
          <div className="info-grid info-grid--2">
            <div className="info-card">
              <span className="info-card__icon"><Flag size={20} /></span>
              <h3 className="info-card__title">Report a problem</h3>
              <p>
                Found a bug, broken link, wrong answer, or confusing explanation? Tap the
                <strong> Report</strong> button on any page — it captures exactly where you were, so
                we can fix it faster than any email ever could.
              </p>
            </div>
            <div className="info-card">
              <span className="info-card__icon"><MessageSquare size={20} /></span>
              <h3 className="info-card__title">Share feedback</h3>
              <p>
                Ideas for new features, subjects, or missions? Things that confused you? Drop it in
                the feedback form — no account gatekeeping, no black hole.
              </p>
            </div>
          </div>
          <div className="info-cta">
            <button type="button" className="info-cta__btn info-cta__btn--primary" onClick={goToFeedback}>
              <MessageSquare size={16} /> Open the feedback form
            </button>
          </div>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">03</span>
          <h2 className="info-block__title">When to expect a reply</h2>
          <p className="info-block__desc">Small team, honest timelines.</p>
        </div>
        <div className="info-block__content">
          <div className="info-callout">
            <Clock className="info-callout__icon" size={22} />
            <p>
              Critical bugs are prioritised and usually addressed <strong>within a day or two</strong>.
              Emails are answered as fast as a small team can — feature requests get queued and shipped
              when they help the most students.
            </p>
          </div>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">04</span>
          <h2 className="info-block__title">Still have questions?</h2>
          <p className="info-block__desc">Can't find what you need? We're one email away.</p>
        </div>
        <div className="info-block__content">
          <div className="info-callout">
            <LifeBuoy className="info-callout__icon" size={22} />
            <p>
              Still have questions? Email us at{' '}
              <a href="mailto:help@learnforearn.in" rel="noopener">help@learnforearn.in</a>{' '}
              and a real person will get back to you.
            </p>
          </div>
        </div>
      </div>
    </InfoPageLayout>
  )
}

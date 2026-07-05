import { useNavigate } from 'react-router-dom'
import InfoPageLayout from '../components/InfoPageLayout'

export default function ContactPage() {
  const navigate = useNavigate()

  return (
    <InfoPageLayout label="[ CONTACT ]" title="Contact & Feedback">
      <p className="info-page__intro">
        learnforearn is built for students, by someone who cares whether you actually get hired.
        Every report and piece of feedback is read — your input directly shapes what gets fixed
        and what gets built next.
      </p>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">01</span> Report a Problem</h2>
        <p>
          Found a bug, broken link, wrong answer, or confusing explanation? Tap the
          <strong> Report</strong> button on any page — it captures the page you were on so we
          can fix it faster.
        </p>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">02</span> Share Feedback</h2>
        <p>
          Ideas for new features, subjects, missions, or things that confused you — we want to hear it.
          Use the feedback form on the home page.
        </p>
        <p>
          <a
            onClick={() => {
              navigate('/')
              setTimeout(() => document.getElementById('feedback')?.scrollIntoView({ behavior: 'smooth' }), 300)
            }}
            style={{ cursor: 'pointer' }}
          >
            → Go to feedback form
          </a>
        </p>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">03</span> Response Time</h2>
        <p>
          This is an actively maintained student project. Critical bugs are prioritised;
          feature requests are queued and shipped when they help the most students.
        </p>
      </div>
    </InfoPageLayout>
  )
}

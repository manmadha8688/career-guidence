import { Scale } from 'lucide-react'
import InfoPageLayout from '../components/InfoPageLayout'

export default function TermsPage() {
  return (
    <InfoPageLayout
      eyebrow="Terms"
      title="The rules of the road."
      lede="By creating an account, using a guest session, or simply browsing LearnForEarn, you agree to these terms. They exist to keep the platform safe and genuinely useful for every student."
      updated="July 2026"
    >
      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">TL;DR</span>
          <h2 className="info-block__title">In plain English</h2>
          <p className="info-block__desc">The whole agreement, minus the legalese.</p>
        </div>
        <div className="info-block__content">
          <div className="info-callout">
            <Scale className="info-callout__icon" size={22} />
            <p>
              Use it to learn, don't abuse it or other students, don't cheat the ranks, and remember
              it's an <strong>educational tool — not a job guarantee.</strong>
            </p>
          </div>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">01</span>
          <h2 className="info-block__title">The service</h2>
          <p className="info-block__desc">What LearnForEarn is and how it evolves.</p>
        </div>
        <div className="info-block__content">
          <p>
            LearnForEarn is an educational platform offering structured learning content, coding
            practice, quizzes, project briefs, career guidance, and a community walk-in job board. It's
            provided as-is and may add, change, or remove features at any time as the platform evolves.
          </p>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">02</span>
          <h2 className="info-block__title">Your account</h2>
          <p className="info-block__desc">One account, one person, kept secure.</p>
        </div>
        <div className="info-block__content">
          <ul className="info-list">
            <li>You must provide a valid email to register — it's verified with a one-time code.</li>
            <li>You're responsible for keeping your password confidential and for all activity under your account.</li>
            <li>Guest sessions work without registration; guest progress is tied to your device and may be removed after inactivity.</li>
            <li>One account per person. Don't share accounts or impersonate anyone.</li>
          </ul>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">03</span>
          <h2 className="info-block__title">Acceptable use</h2>
          <p className="info-block__desc">Fair play keeps the platform useful for everyone.</p>
        </div>
        <div className="info-block__content">
          <p>You agree <strong>not</strong> to:</p>
          <ul className="info-list">
            <li>Break, overload, or gain unauthorized access to the platform or other accounts.</li>
            <li>Scrape, copy, or redistribute platform content at scale.</li>
            <li>Use bots or automation to complete quizzes or manipulate XP, ranks, or badges.</li>
            <li>Post spam, offensive material, or misleading information anywhere on the platform.</li>
          </ul>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">04</span>
          <h2 className="info-block__title">Community content</h2>
          <p className="info-block__desc">Walk-Ins &amp; feedback are student-driven.</p>
        </div>
        <div className="info-block__content">
          <ul className="info-list">
            <li>When you post a walk-in drive, you confirm the details are accurate to the best of your knowledge.</li>
            <li>Don't post fake drives, other people's personal data, or promotional spam. Misuse leads to removal and possible suspension.</li>
            <li>By submitting content, you allow LearnForEarn to display and moderate it.</li>
            <li>Walk-in posts are shared by students, not verified by us — always confirm details with the company before travelling.</li>
          </ul>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">05</span>
          <h2 className="info-block__title">No outcome guarantees</h2>
          <p className="info-block__desc">Learning aids, not promises.</p>
        </div>
        <div className="info-block__content">
          <p>
            Content, ranks, badges, and career guidance are learning aids. They do <strong>not</strong>
            guarantee employment, interview selection, or any specific outcome. Job-market notes in the
            Fresher Guide reflect general conditions and may not apply to your exact situation.
          </p>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">06</span>
          <h2 className="info-block__title">Intellectual property</h2>
          <p className="info-block__desc">Yours to learn from and build with.</p>
        </div>
        <div className="info-block__content">
          <p>
            Platform content — explanations, quizzes, missions, guides, and design — belongs to
            LearnForEarn. You may use it freely for personal learning, and code examples are yours to
            use in your own projects without restriction. You may not republish our content as your own.
          </p>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">07</span>
          <h2 className="info-block__title">Termination</h2>
          <p className="info-block__desc">You can leave; misuse can be removed.</p>
        </div>
        <div className="info-block__content">
          <p>
            You can stop using the platform any time. We may suspend or remove accounts that violate
            these terms, abuse other users, or attempt to damage the service.
          </p>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">08</span>
          <h2 className="info-block__title">Limitation of liability</h2>
          <p className="info-block__desc">Provided as-is.</p>
        </div>
        <div className="info-block__content">
          <p>
            The platform is provided without warranties of any kind. To the maximum
            extent permitted by law, LearnForEarn is not liable for indirect damages, data loss, or
            outcomes arising from use of the platform — including decisions made based on walk-in posts
            or career guidance content.
          </p>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">09</span>
          <h2 className="info-block__title">Changes to these terms</h2>
          <p className="info-block__desc">Updated openly as we grow.</p>
        </div>
        <div className="info-block__content">
          <p>
            These terms may be updated as the platform grows. Meaningful changes will be reflected here
            with a new date. Continued use after changes means you accept the updated terms.
          </p>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">10</span>
          <h2 className="info-block__title">Contact</h2>
          <p className="info-block__desc">Questions about these terms?</p>
        </div>
        <div className="info-block__content">
          <p>
            Email <a href="mailto:legal@learnforearn.in">legal@learnforearn.in</a>, or use the
            <strong> Report button</strong> on any page.
          </p>
        </div>
      </div>
    </InfoPageLayout>
  )
}

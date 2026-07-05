import InfoPageLayout from '../components/InfoPageLayout'

export default function TermsPage() {
  return (
    <InfoPageLayout label="[ TERMS ]" title="Terms of Service" updated="JULY 2026">
      <p className="info-page__intro">
        Welcome to learnforearn. By creating an account, using a guest session, or simply browsing
        the platform, you agree to these terms. They exist to keep the platform safe and useful
        for every student — please read them.
      </p>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">01</span> The Service</h2>
        <p>
          learnforearn is a free educational platform offering structured learning content, coding
          practice, quizzes, project briefs, career guidance, and a community walk-in job board.
          The service is provided as-is and may change, add, or remove features at any time as the
          platform evolves.
        </p>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">02</span> Accounts</h2>
        <ul>
          <li>You must provide a valid email address to register. Your email is verified with a one-time code.</li>
          <li>You are responsible for keeping your password confidential and for all activity under your account.</li>
          <li>Guest sessions are available without registration; guest progress is linked to your device and may be removed after a period of inactivity.</li>
          <li>One account per person. Do not share accounts or impersonate others.</li>
        </ul>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">03</span> Acceptable Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Attempt to break, overload, or gain unauthorized access to the platform or other users' accounts</li>
          <li>Scrape, copy, or redistribute platform content at scale</li>
          <li>Use automated tools to complete quizzes or manipulate XP, ranks, or badges</li>
          <li>Post spam, offensive material, or misleading information anywhere on the platform</li>
        </ul>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">04</span> User Content (Walk-Ins &amp; Feedback)</h2>
        <ul>
          <li>The Walk-Ins board is community-driven. When you post a walk-in drive, you confirm the information is accurate to the best of your knowledge.</li>
          <li>Do not post fake drives, personal data of others, or promotional spam. Misuse leads to content removal and may lead to account suspension.</li>
          <li>By submitting content (walk-in posts, feedback, reports) you allow learnforearn to display and moderate it on the platform.</li>
          <li>Walk-in posts are shared by students, not verified by learnforearn — always confirm details with the company before travelling.</li>
        </ul>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">05</span> Educational Content — No Guarantees</h2>
        <p>
          The platform's content, ranks, badges, and career guidance are learning aids. They do not
          guarantee employment, interview selection, or any specific outcome. Job market information
          in the Fresher Guide reflects general conditions and may not apply to every situation.
        </p>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">06</span> Intellectual Property</h2>
        <p>
          Platform content — explanations, quizzes, missions, guides, and design — belongs to
          learnforearn. You may use it freely for personal learning. Code examples may be used in
          your own projects without restriction. You may not republish platform content as your own.
        </p>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">07</span> Termination</h2>
        <p>
          You may stop using the platform at any time. learnforearn may suspend or remove accounts
          that violate these terms, abuse other users, or attempt to damage the service.
        </p>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">08</span> Limitation of Liability</h2>
        <p>
          The platform is provided free of charge and without warranties of any kind. To the maximum
          extent permitted by law, learnforearn is not liable for any indirect damages, data loss, or
          outcomes arising from use of the platform — including decisions made based on walk-in
          posts or career guidance content.
        </p>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">09</span> Changes to These Terms</h2>
        <p>
          These terms may be updated as the platform grows. Meaningful changes will be reflected on
          this page with an updated date. Continued use after changes means you accept the updated
          terms.
        </p>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">10</span> Contact</h2>
        <p>
          Questions about these terms? Use the <strong>Report button</strong> on any page or the
          <strong> feedback form</strong> on the home page.
        </p>
      </div>
    </InfoPageLayout>
  )
}

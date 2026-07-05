import InfoPageLayout from '../components/InfoPageLayout'

export default function PrivacyPage() {
  return (
    <InfoPageLayout label="[ PRIVACY ]" title="Privacy Policy" updated="JULY 2026">
      <p className="info-page__intro">
        learnforearn is built for students, and your privacy is treated with the same care as your
        learning progress. This page explains exactly what data is collected, why, and what happens
        to it. Short version: <strong>only what's needed to run the platform, never sold, no ad tracking.</strong>
      </p>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">01</span> Data We Collect</h2>
        <ul>
          <li><strong>Account details</strong> — your name, email address, and college name (provided at registration). Passwords are stored only as secure one-way hashes — nobody, including us, can read them.</li>
          <li><strong>Learning progress</strong> — completed skills, quiz attempts, scores, XP, ranks, badges, and enrolled paths. This is the core of the platform.</li>
          <li><strong>Guest sessions</strong> — a random device identifier stored in your browser so your guest progress survives between visits. No personal details are collected for guests.</li>
          <li><strong>Content you submit</strong> — walk-in posts, feedback, and issue reports.</li>
        </ul>
        <p>We do <strong>not</strong> collect payment details (the platform is free), precise location, or contacts.</p>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">02</span> Cookies &amp; Local Storage</h2>
        <ul>
          <li><strong>One authentication cookie</strong> — a secure, httpOnly session cookie that keeps you logged in for 24 hours. JavaScript cannot read it, which protects it from common attacks.</li>
          <li><strong>Local storage</strong> — your theme preference (dark/light) and guest device identifier.</li>
          <li><strong>Session storage</strong> — short-lived caching of platform content so pages load faster. Cleared when the tab closes.</li>
        </ul>
        <p>There are <strong>no advertising cookies, no third-party trackers, and no analytics profiles</strong>.</p>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">03</span> How Your Data Is Used</h2>
        <ul>
          <li>Running your account and tracking your learning progress</li>
          <li>Sending one-time verification codes (registration and password reset) to your email</li>
          <li>Showing your posts on the community walk-in board</li>
          <li>Reading feedback and reports to fix issues and improve the platform</li>
        </ul>
        <p>Your data is <strong>never sold, rented, or shared for marketing</strong>.</p>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">04</span> Where Data Lives (Service Providers)</h2>
        <p>The platform runs on trusted infrastructure providers that process data solely to operate the service:</p>
        <ul>
          <li><strong>Vercel</strong> — hosts the website you see</li>
          <li><strong>Render</strong> — hosts the application server</li>
          <li><strong>MongoDB Atlas</strong> — stores account and progress data in a secured cloud database</li>
          <li><strong>Brevo</strong> — delivers one-time code emails (they receive your email address only for sending)</li>
        </ul>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">05</span> Security</h2>
        <ul>
          <li>All traffic is encrypted over HTTPS</li>
          <li>Passwords are hashed with an industry-standard algorithm (BCrypt)</li>
          <li>Login sessions use httpOnly cookies inaccessible to page scripts</li>
          <li>One-time codes expire after 10 minutes and are rate-limited against abuse</li>
        </ul>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">06</span> Your Choices &amp; Data Deletion</h2>
        <ul>
          <li>You can use the platform as a guest without providing any personal details</li>
          <li>You can request deletion of your account and all associated data at any time via the <strong>Report button</strong> or the <strong>feedback form</strong> on the home page — deletion requests are honored</li>
          <li>Inactive guest accounts are cleaned up automatically</li>
        </ul>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">07</span> Age of Use</h2>
        <p>
          The platform is intended for college students and learners aged 16 and above. It is not
          directed at children under 16.
        </p>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">08</span> Changes to This Policy</h2>
        <p>
          If data practices change, this page will be updated with a new date. Significant changes
          will be highlighted on the platform.
        </p>
      </div>

      <div className="info-section">
        <h2 className="info-section__title"><span className="info-section__num">09</span> Contact</h2>
        <p>
          Privacy questions or deletion requests? Use the <strong>Report button</strong> on any page
          or the <strong>feedback form</strong> on the home page — every message is read.
        </p>
      </div>
    </InfoPageLayout>
  )
}

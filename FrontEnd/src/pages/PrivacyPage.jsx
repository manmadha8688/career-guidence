import { Lock } from 'lucide-react'
import InfoPageLayout from '../components/InfoPageLayout'

export default function PrivacyPage() {
  return (
    <InfoPageLayout
      eyebrow="Privacy"
      title="Your data, handled with respect."
      lede="Your privacy gets the same care as your learning progress. Here's exactly what we collect, why, and what happens to it — no legalese padding."
      updated="July 2026"
    >
      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">TL;DR</span>
          <h2 className="info-block__title">The short version</h2>
          <p className="info-block__desc">Everything below, in one line.</p>
        </div>
        <div className="info-block__content">
          <div className="info-callout">
            <Lock className="info-callout__icon" size={22} />
            <p>
              We collect only what's needed to run the platform. Your data is <strong>never sold</strong>,
              there's <strong>no ad tracking</strong>, and you can request deletion at any time.
            </p>
          </div>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">01</span>
          <h2 className="info-block__title">What we collect</h2>
          <p className="info-block__desc">Only the essentials to run your account.</p>
        </div>
        <div className="info-block__content">
          <ul className="info-list">
            <li><strong>Account details</strong> — your name and email. Passwords are stored only as secure one-way hashes; nobody, including us, can read them.</li>
            <li><strong>Google sign-in</strong> — we receive only your name and verified email, never your Google password. See the <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.</li>
            <li><strong>Learning progress</strong> — completed skills, quiz attempts, scores, XP, ranks, badges, and enrolled paths.</li>
            <li><strong>Guest sessions</strong> — a random device identifier so guest progress survives between visits. No personal details.</li>
            <li><strong>Content you submit</strong> — walk-in posts, feedback, and issue reports.</li>
          </ul>
          <p>We do <strong>not</strong> collect payment details (the platform is free), precise location, or your contacts.</p>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">02</span>
          <h2 className="info-block__title">Cookies &amp; storage</h2>
          <p className="info-block__desc">One session cookie. Nothing that follows you around.</p>
        </div>
        <div className="info-block__content">
          <ul className="info-list">
            <li><strong>Authentication cookie</strong> — a secure, httpOnly session cookie that keeps you logged in for 24 hours. JavaScript can't read it.</li>
            <li><strong>Local storage</strong> — your theme preference (dark/light) and guest device identifier.</li>
            <li><strong>Session storage</strong> — short-lived content caching so pages load faster. Cleared when the tab closes.</li>
          </ul>
          <p>There are <strong>no advertising cookies, no third-party trackers, and no analytics profiles</strong>.</p>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">03</span>
          <h2 className="info-block__title">How it's used</h2>
          <p className="info-block__desc">To run the platform — nothing more.</p>
        </div>
        <div className="info-block__content">
          <ul className="info-list">
            <li>Running your account and tracking your learning progress</li>
            <li>Sending one-time verification codes for registration and password reset</li>
            <li>Showing your posts on the community walk-in board</li>
            <li>Reading feedback and reports to fix issues and improve the platform</li>
          </ul>
          <p>Your data is <strong>never sold, rented, or shared for marketing</strong>.</p>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">04</span>
          <h2 className="info-block__title">Where your data lives</h2>
          <p className="info-block__desc">Trusted providers, used only to operate the service.</p>
        </div>
        <div className="info-block__content">
          <ul className="info-list">
            <li><strong>Vercel</strong> — hosts the website you see.</li>
            <li><strong>Render</strong> — hosts the application server.</li>
            <li><strong>MongoDB Atlas</strong> — stores account and progress data in a secured cloud database.</li>
            <li><strong>Brevo</strong> — delivers one-time code emails (receives your email address only for sending).</li>
          </ul>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">05</span>
          <h2 className="info-block__title">Security</h2>
          <p className="info-block__desc">Sensible protection by default.</p>
        </div>
        <div className="info-block__content">
          <ul className="info-list">
            <li>All traffic is encrypted over HTTPS.</li>
            <li>Passwords are hashed with an industry-standard algorithm (BCrypt).</li>
            <li>Login sessions use httpOnly cookies inaccessible to page scripts.</li>
            <li>One-time codes expire after 10 minutes and are rate-limited against abuse.</li>
          </ul>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">06</span>
          <h2 className="info-block__title">Your choices &amp; deletion</h2>
          <p className="info-block__desc">You're always in control of your data.</p>
        </div>
        <div className="info-block__content">
          <ul className="info-list">
            <li>Use the platform as a guest without providing any personal details.</li>
            <li>Request deletion of your account and all data any time — email <a href="mailto:privacy@learnforearn.in">privacy@learnforearn.in</a> or use the feedback form. Requests are honored.</li>
            <li>Inactive guest accounts are cleaned up automatically.</li>
          </ul>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">07</span>
          <h2 className="info-block__title">Age of use</h2>
          <p className="info-block__desc">Intended for students 16 and above.</p>
        </div>
        <div className="info-block__content">
          <p>
            The platform is intended for college students and learners aged 16 and above. It is not
            directed at children under 16.
          </p>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">08</span>
          <h2 className="info-block__title">Changes to this policy</h2>
          <p className="info-block__desc">Updated transparently.</p>
        </div>
        <div className="info-block__content">
          <p>
            If our data practices change, this page will be updated with a new date and significant
            changes will be highlighted on the platform.
          </p>
        </div>
      </div>

      <div className="info-block">
        <div className="info-block__head">
          <span className="info-block__num">09</span>
          <h2 className="info-block__title">Contact</h2>
          <p className="info-block__desc">Privacy questions or deletion requests.</p>
        </div>
        <div className="info-block__content">
          <p>
            Email <a href="mailto:privacy@learnforearn.in">privacy@learnforearn.in</a> — every message
            is read.
          </p>
        </div>
      </div>
    </InfoPageLayout>
  )
}

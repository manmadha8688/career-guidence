/**
 * Bot personalities:
 *  nova  — friendly, optimistic, welcoming
 *  echo  — curious, observant, overthinks
 *  pixel — playful, slightly sarcastic, never offensive
 *
 * Each line shows for LINE_DURATION_MS then the next bot speaks.
 * Scenarios are triggered by user actions; interrupts cancel mid-sequence.
 */

export const LINE_DURATION_MS = 2000
export const LINE_GAP_MS = 250

export const STORY_BEATS = {

  /* ── Page load ─────────────────────────────────── */
  GREET: {
    mood: 'calm',
    lines: [
      { speaker: 'nova',  text: 'Hey there. Welcome.' },
      { speaker: 'echo',  text: 'I wonder who this visitor is.' },
      { speaker: 'pixel', text: 'Could be a future genius.' },
      { speaker: 'echo',  text: 'Or somebody starting from zero.' },
      { speaker: 'nova',  text: 'Everyone starts somewhere.' },
      { speaker: 'pixel', text: 'I started from version 0.1.' },
    ],
  },

  /* ── Idle 6 s ───────────────────────────────────── */
  IDLE_6S: {
    mood: 'curious',
    lines: [
      { speaker: 'echo',  text: "They haven't moved." },
      { speaker: 'pixel', text: "Maybe they're thinking." },
      { speaker: 'nova',  text: "Good decisions take time." },
      { speaker: 'echo',  text: "Or maybe studying the login form." },
      { speaker: 'pixel', text: "That's a serious level of analysis." },
    ],
  },

  /* ── Idle 12 s ──────────────────────────────────── */
  IDLE_12S: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "Still waiting." },
      { speaker: 'pixel', text: "Do humans recharge before logging in?" },
      { speaker: 'nova',  text: "They'll figure it out." },
      { speaker: 'pixel', text: "I believe in them." },
    ],
  },

  /* ── Email field ────────────────────────────────── */
  FOUND_EMAIL: {
    mood: 'happy',
    lines: [
      { speaker: 'echo',  text: "Movement detected." },
      { speaker: 'pixel', text: "Aha! They found the email field." },
      { speaker: 'nova',  text: "Told you." },
    ],
  },

  EMAIL_RETURN: {
    mood: 'calm',
    lines: [
      { speaker: 'pixel', text: "Back to email. Interesting choice." },
      { speaker: 'echo',  text: "Maybe they spotted a typo." },
    ],
  },

  TYPING_EMAIL: {
    mood: 'calm',
    lines: [
      { speaker: 'echo',  text: "That looks like progress." },
      { speaker: 'nova',  text: "They know what they're doing." },
      { speaker: 'pixel', text: "Good. My earlier theory was wrong." },
    ],
  },

  EMAIL_INVALID: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "Something doesn't look right." },
      { speaker: 'pixel', text: "Almost there." },
      { speaker: 'nova',  text: "A small correction should fix it." },
    ],
  },

  EMAIL_VALID: {
    mood: 'happy',
    lines: [
      { speaker: 'nova',  text: "Perfect email format." },
      { speaker: 'echo',  text: "One step completed." },
      { speaker: 'pixel', text: "Professional behavior detected." },
    ],
  },

  /* ── Password field ─────────────────────────────── */
  FOCUS_PASSWORD: {
    mood: 'nudge',
    lines: [
      { speaker: 'nova',  text: "Password field ahead." },
      { speaker: 'echo',  text: "Privacy mode enabled." },
      { speaker: 'pixel', text: "Wait... can I look?" },
      { speaker: 'nova',  text: "No." },
      { speaker: 'pixel', text: "Okay, okay." },
    ],
  },

  TYPING_PASSWORD: {
    mood: 'calm',
    lines: [
      { speaker: 'nova',  text: "Looking away." },
      { speaker: 'echo',  text: "Also looking away." },
      { speaker: 'pixel', text: "I definitely didn't see anything." },
    ],
  },

  PASSWORD_VISIBLE: {
    mood: 'nudge',
    lines: [
      { speaker: 'pixel', text: "Whoa — password visible!" },
      { speaker: 'echo',  text: "I wasn't looking. Genuinely." },
      { speaker: 'nova',  text: "Neither was I. Obviously." },
    ],
  },

  PASSWORD_HIDDEN: {
    mood: 'calm',
    lines: [
      { speaker: 'echo',  text: "Safe again." },
    ],
  },

  /* ── Form ready ─────────────────────────────────── */
  FORM_VALID: {
    mood: 'celebrate',
    lines: [
      { speaker: 'echo',  text: "Everything looks correct." },
      { speaker: 'nova',  text: "Ready when they are." },
      { speaker: 'pixel', text: "This is the exciting part." },
    ],
  },

  /* ── Submit states ──────────────────────────────── */
  SUBMIT_EMPTY: {
    mood: 'concerned',
    lines: [
      { speaker: 'pixel', text: "Hold on... something's missing." },
      { speaker: 'echo',  text: "Both fields need to be filled." },
      { speaker: 'nova',  text: "Take your time." },
    ],
  },

  LOGIN_PROCESSING: {
    mood: 'calm',
    lines: [
      { speaker: 'nova',  text: "Moment of truth." },
      { speaker: 'echo',  text: "Checking credentials." },
      { speaker: 'pixel', text: "No pressure." },
    ],
  },

  LOGIN_SUCCESS: {
    mood: 'celebrate',
    lines: [
      { speaker: 'nova',  text: "They made it." },
      { speaker: 'echo',  text: "Access granted." },
      { speaker: 'pixel', text: "I knew they'd get in." },
      { speaker: 'nova',  text: "Let's keep moving forward." },
    ],
  },

  LOGIN_FAILED: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "Hmm. That didn't work." },
      { speaker: 'nova',  text: "No worries." },
      { speaker: 'pixel', text: "Even smart people mistype passwords." },
      { speaker: 'nova',  text: "Let's try again." },
    ],
  },

  /* ── Guest ──────────────────────────────────────── */
  GUEST_CLICK: {
    mood: 'calm',
    lines: [
      { speaker: 'pixel', text: "Guest mode. Bold and smooth." },
      { speaker: 'nova',  text: "Either way, welcome." },
    ],
  },

  /* ── Long idle ──────────────────────────────────── */
  LONG_IDLE: {
    mood: 'sleepy',
    lines: [
      { speaker: 'echo',  text: "Still here. Still waiting." },
      { speaker: 'pixel', text: "Very patient, this one." },
      { speaker: 'nova',  text: "We'll be here." },
    ],
  },

  /* ═══════════════════════════════════════════════════
   * REGISTER page beats
   * Nova  — friendly, optimistic, encouraging
   * Echo  — curious, observant, overthinks
   * Pixel — playful, sarcastic, dry humour
   * ═══════════════════════════════════════════════════ */

  /* ── Page load ── */
  REG_GREET: {
    mood: 'happy',
    lines: [
      { speaker: 'echo',  text: "Wait. He's really a new visitor." },
      { speaker: 'pixel', text: "Does he know how to register though?" },
      { speaker: 'nova',  text: "We'll find out. Let's watch." },
    ],
  },

  /* ── 6 s idle — hasn't started ── */
  REG_IDLE_6S: {
    mood: 'curious',
    lines: [
      { speaker: 'echo',  text: "They haven't touched anything yet." },
      { speaker: 'pixel', text: "Maybe registration looks intimidating." },
      { speaker: 'nova',  text: "It's four fields. Not a quest boss." },
      { speaker: 'pixel', text: "Could be for some people, no?" },
      { speaker: 'echo',  text: "Fair point actually." },
    ],
  },

  /* ── Name field ── */
  REG_FOUND_NAME: {
    mood: 'calm',
    lines: [
      { speaker: 'echo',  text: "Name field. First move." },
      { speaker: 'pixel', text: "I wonder what the name will be." },
      { speaker: 'nova',  text: "Something worth remembering, hopefully." },
      { speaker: 'pixel', text: "Or just their actual name. Either works." },
    ],
  },

  REG_TYPING_NAME: {
    mood: 'calm',
    lines: [
      { speaker: 'pixel', text: "Letters are forming." },
      { speaker: 'echo',  text: "Character creation in progress." },
      { speaker: 'nova',  text: "This is always the exciting part." },
    ],
  },

  /* ── Email field ── */
  REG_FOUND_EMAIL: {
    mood: 'calm',
    lines: [
      { speaker: 'nova',  text: "Email section. This is the important part." },
      { speaker: 'echo',  text: "This is where most people overthink, no?" },
      { speaker: 'pixel', text: "And then they need to verify it. Extra step." },
      { speaker: 'echo',  text: "OTP. The step nobody loves but everyone needs." },
    ],
  },

  REG_TYPING_EMAIL: {
    mood: 'calm',
    lines: [
      { speaker: 'echo',  text: "That looks like an email address." },
      { speaker: 'pixel', text: "Hard to tell without the @, honestly." },
      { speaker: 'nova',  text: "Give them a second." },
    ],
  },

  REG_EMAIL_FORMAT_OK: {
    mood: 'happy',
    lines: [
      { speaker: 'nova',  text: "Format looks right. Press Verify now." },
      { speaker: 'echo',  text: "The Verify button is right there." },
      { speaker: 'pixel', text: "Just one click between here and the next step." },
    ],
  },

  /* ── OTP flow ── */
  REG_OTP_SENT: {
    mood: 'calm',
    lines: [
      { speaker: 'echo',  text: "OTP sent to inbox." },
      { speaker: 'nova',  text: "Check your email. It should be there." },
      { speaker: 'pixel', text: "Six digits. No pressure. Just don't be slow." },
      { speaker: 'echo',  text: "Very helpful, Pixel." },
    ],
  },

  REG_OTP_FOCUS: {
    mood: 'calm',
    lines: [
      { speaker: 'pixel', text: "OTP field located." },
      { speaker: 'nova',  text: "Type the six digits from your email." },
      { speaker: 'echo',  text: "If they haven't closed that tab already." },
      { speaker: 'pixel', text: "That would be very on-brand." },
    ],
  },

  REG_TYPING_OTP: {
    mood: 'calm',
    lines: [
      { speaker: 'echo',  text: "Digits are going in." },
      { speaker: 'pixel', text: "One... two... three..." },
      { speaker: 'nova',  text: "Almost there." },
    ],
  },

  REG_OTP_VERIFIED: {
    mood: 'celebrate',
    lines: [
      { speaker: 'nova',  text: "Email confirmed. Well done." },
      { speaker: 'echo',  text: "Identity established." },
      { speaker: 'pixel', text: "We officially believe they exist now." },
      { speaker: 'nova',  text: "Moving forward." },
    ],
  },

  /* ── Password field (pixel peek — same eye-close mechanic as login) ── */
  REG_FOUND_PASSWORD: {
    mood: 'nudge',
    lines: [
      { speaker: 'nova',  text: "Password time. Make it count." },
      { speaker: 'echo',  text: "Eyes closed, squad." },
      { speaker: 'pixel', text: "Wait — just a quick peek?" },
      { speaker: 'nova',  text: "No." },
      { speaker: 'pixel', text: "Fine. Closed." },
    ],
  },

  REG_TYPING_PASSWORD: {
    mood: 'calm',
    lines: [
      { speaker: 'nova',  text: "Pretending not to watch." },
      { speaker: 'echo',  text: "Same. Very professionally." },
      { speaker: 'pixel', text: "Password dots. The eternal mystery." },
    ],
  },

  REG_PASS_WEAK: {
    mood: 'concerned',
    lines: [
      { speaker: 'pixel', text: "That password is… optimistic." },
      { speaker: 'echo',  text: "Strength bar is not happy right now." },
      { speaker: 'nova',  text: "Uppercase, numbers, symbols. Mix it up." },
      { speaker: 'pixel', text: "A little effort goes a long way, only." },
    ],
  },

  REG_PASS_STRONG: {
    mood: 'celebrate',
    lines: [
      { speaker: 'nova',  text: "Strong password. Respect." },
      { speaker: 'pixel', text: "S-rank security. Didn't see that coming." },
      { speaker: 'echo',  text: "Neither did I. Genuinely impressed." },
    ],
  },

  /* ── Confirm field ── */
  REG_CONFIRM_MISMATCH: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "Confirm password doesn't match." },
      { speaker: 'pixel', text: "Classic. So close too." },
      { speaker: 'nova',  text: "Just one correction. You've got this." },
    ],
  },

  /* ── All valid — ready to submit ── */
  REG_FORM_READY: {
    mood: 'celebrate',
    lines: [
      { speaker: 'echo',  text: "All fields complete." },
      { speaker: 'nova',  text: "This is the moment." },
      { speaker: 'pixel', text: "New hunter about to join the arena." },
      { speaker: 'echo',  text: "Hit the button." },
    ],
  },

  /* ── Submit outcomes ── */
  REG_SUCCESS: {
    mood: 'celebrate',
    lines: [
      { speaker: 'nova',  text: "Account created. Welcome." },
      { speaker: 'echo',  text: "New hunter registered." },
      { speaker: 'pixel', text: "They actually finished it. I'm proud." },
      { speaker: 'nova',  text: "See you in the skill arena." },
    ],
  },

  REG_FAILED: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "Hmm. That didn't go through." },
      { speaker: 'nova',  text: "Don't worry. Try again." },
      { speaker: 'pixel', text: "You were literally one submit away." },
      { speaker: 'nova',  text: "We'll still be here." },
    ],
  },

  /* ═══════════════════════════════════════════════════
   * FORGOT PASSWORD page beats
   * Playful teasing about forgetting — real-world recovery flow
   * ═══════════════════════════════════════════════════ */

  FP_GREET: {
    mood: 'nudge',
    lines: [
      { speaker: 'pixel', text: "Wait. They forgot their password?" },
      { speaker: 'echo',  text: "How does that even happen in 2026?" },
      { speaker: 'pixel', text: "Are we really that… never mind." },
      { speaker: 'nova',  text: "Hey. It happens. Let's fix it together." },
      { speaker: 'echo',  text: "Fine. Recovery mode activated." },
    ],
  },

  FP_IDLE_6S: {
    mood: 'curious',
    lines: [
      { speaker: 'echo',  text: "Still staring at the email field." },
      { speaker: 'pixel', text: "Maybe they're trying to remember which email they used." },
      { speaker: 'nova',  text: "Take your time. Wrong email won't help." },
      { speaker: 'pixel', text: "College email? Personal? The plot thickens." },
    ],
  },

  FP_TYPING_EMAIL: {
    mood: 'calm',
    lines: [
      { speaker: 'echo',  text: "Email incoming. Good sign." },
      { speaker: 'pixel', text: "Hope they remember this one correctly." },
      { speaker: 'nova',  text: "Almost there — we'll send a code next." },
    ],
  },

  FP_EMAIL_VALID: {
    mood: 'happy',
    lines: [
      { speaker: 'nova',  text: "Format looks good. Hit Send OTP." },
      { speaker: 'pixel', text: "Assuming this is the account they forgot…" },
      { speaker: 'echo',  text: "One click away from redemption." },
    ],
  },

  FP_EMAIL_NOT_FOUND: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "That email isn't registered here." },
      { speaker: 'pixel', text: "Wrong inbox or wrong platform?" },
      { speaker: 'nova',  text: "Double-check the email or create an account." },
    ],
  },

  FP_OTP_SENT: {
    mood: 'calm',
    lines: [
      { speaker: 'nova',  text: "Code sent. Check your inbox." },
      { speaker: 'pixel', text: "Also check spam. Humans love hiding OTPs there." },
      { speaker: 'echo',  text: "Six digits. Don't type with cold hands." },
      { speaker: 'nova',  text: "We'll verify it's really you." },
    ],
  },

  FP_TYPING_OTP: {
    mood: 'calm',
    lines: [
      { speaker: 'echo',  text: "Digits going in." },
      { speaker: 'pixel', text: "No peeking at my screen, Echo." },
      { speaker: 'echo',  text: "I wasn't looking. Officially." },
    ],
  },

  FP_OTP_FAILED: {
    mood: 'concerned',
    lines: [
      { speaker: 'pixel', text: "That code didn't work." },
      { speaker: 'echo',  text: "Typo? Expired? Classic combo." },
      { speaker: 'nova',  text: "Try again or resend a fresh code." },
    ],
  },

  FP_OTP_VERIFIED: {
    mood: 'celebrate',
    lines: [
      { speaker: 'nova',  text: "Identity confirmed. You are you." },
      { speaker: 'echo',  text: "Access to reset granted." },
      { speaker: 'pixel', text: "Okay fine. You're not *that* dumb." },
      { speaker: 'nova',  text: "Now pick a password you'll remember this time." },
    ],
  },

  FP_NEW_PASS_GREET: {
    mood: 'nudge',
    lines: [
      { speaker: 'pixel', text: "New password time. Write it somewhere safe." },
      { speaker: 'echo',  text: "Not on a sticky note under the keyboard." },
      { speaker: 'nova',  text: "Please remember it once and for all." },
      { speaker: 'pixel', text: "We believe in you. Barely." },
    ],
  },

  FP_FOUND_PASSWORD: {
    mood: 'nudge',
    lines: [
      { speaker: 'nova',  text: "Eyes closed, team." },
      { speaker: 'echo',  text: "Privacy mode on." },
      { speaker: 'pixel', text: "Just one tiny peek—" },
      { speaker: 'nova',  text: "No." },
      { speaker: 'pixel', text: "Okay, okay." },
    ],
  },

  FP_TYPING_PASSWORD: {
    mood: 'calm',
    lines: [
      { speaker: 'nova',  text: "Not watching. Promise." },
      { speaker: 'echo',  text: "Strength meter is judging quietly." },
      { speaker: 'pixel', text: "Make it something you'll recall in a week." },
    ],
  },

  FP_PASS_WEAK: {
    mood: 'concerned',
    lines: [
      { speaker: 'pixel', text: "That password forgot to be strong." },
      { speaker: 'echo',  text: "You'll forget this one too at this rate." },
      { speaker: 'nova',  text: "Uppercase, number, symbol — mix them in." },
    ],
  },

  FP_PASS_STRONG: {
    mood: 'celebrate',
    lines: [
      { speaker: 'nova',  text: "Solid password. Save it somewhere safe." },
      { speaker: 'pixel', text: "Finally. Something worth remembering." },
      { speaker: 'echo',  text: "Don't lose it again, please." },
    ],
  },

  FP_CONFIRM_MISMATCH: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "Confirm field doesn't match." },
      { speaker: 'pixel', text: "So close. Copy-paste exists for a reason." },
      { speaker: 'nova',  text: "One fix and you're done." },
    ],
  },

  FP_FORM_READY: {
    mood: 'celebrate',
    lines: [
      { speaker: 'echo',  text: "All checks passed." },
      { speaker: 'nova',  text: "Reset it. Then log in like a pro." },
      { speaker: 'pixel', text: "And maybe save the password this time?" },
    ],
  },

  FP_RESET_SUCCESS: {
    mood: 'celebrate',
    lines: [
      { speaker: 'nova',  text: "Password updated. Welcome back." },
      { speaker: 'echo',  text: "Recovery complete." },
      { speaker: 'pixel', text: "Remember it. We're not doing this every week." },
    ],
  },

  FP_RESET_FAILED: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "Reset didn't go through." },
      { speaker: 'nova',  text: "Try once more — you're almost there." },
      { speaker: 'pixel', text: "The password gods are testing you." },
    ],
  },
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export function resolveMurmur(event) {
  if (!event?.type) return null
  const beat = STORY_BEATS[event.type]
  if (!beat) return null
  return {
    key: `${event.type}-${event.id}`,
    type: event.type,
    mood: beat.mood,
    lines: beat.lines,
    lineCount: beat.lines.length,
  }
}

export function getBeatDurationMs(type) {
  const beat = STORY_BEATS[type]
  if (!beat?.lines?.length) return 4000
  const n = beat.lines.length
  return n * LINE_DURATION_MS + (n - 1) * LINE_GAP_MS + 300
}

export function getMurmurHideMs(event) {
  if (!event?.type) return 4000
  return getBeatDurationMs(event.type)
}

/** @deprecated — use STORY_BEATS keys directly */
export const COMPANION_EVENTS = Object.fromEntries(
  Object.keys(STORY_BEATS).map(k => [k, k]),
)

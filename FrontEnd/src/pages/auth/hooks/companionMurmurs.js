/**
 * Bot squad — auth page companion dialogue
 *
 * nova  — painfully optimistic
 * echo  — overthinks everything
 * pixel — dry sarcasm, roasts the user (politely)
 *
 * Beats play line-by-line; each line gets readable time based on length.
 */

export const LINE_MIN_MS = 2600
export const LINE_GAP_MS = 420
export const LINE_MS_PER_CHAR = 44
export const LINE_MAX_MS = 5800
export const BEAT_TAIL_MS = 600

/** Higher = harder to interrupt mid-beat. Login narrative beats are protected. */
export const BEAT_PRIORITY = {
  GREET: 10,
  FOCUS_PASSWORD: 10,
  LOGIN_PROCESSING: 10,
  LOGIN_SUCCESS: 10,
  LOGIN_FAILED: 10,
  GOOGLE_PROCESSING: 10,
  GOOGLE_SUCCESS: 10,
  GOOGLE_FAILED: 8,
  REG_GOOGLE_PROCESSING: 10,
  REG_GOOGLE_SUCCESS: 10,
  REG_GOOGLE_FAILED: 8,
  GOOGLE_CLICK: 7,
  REG_GOOGLE_CLICK: 7,
  REG_GREET: 10,
  REG_FOUND_PASSWORD: 10,
  FP_GREET: 10,
  FP_FOUND_PASSWORD: 10,
  FP_NEW_PASS_GREET: 10,
  REG_OTP_VERIFIED: 9,
  FP_OTP_VERIFIED: 9,
  REG_SUCCESS: 10,
  FP_RESET_SUCCESS: 10,
  FOUND_EMAIL: 6,
  REG_FOUND_NAME: 6,
  REG_FOUND_EMAIL: 6,
  EMAIL_RETURN: 6,
  EMAIL_RETURN_QUICK: 6,
  REG_EMAIL_RETURN: 6,
  REG_EMAIL_RETURN_QUICK: 6,
  GUEST_CLICK: 6,
  SUBMIT_EMPTY: 6,
  PASSWORD_VISIBLE: 6,
  PASSWORD_HIDDEN: 6,
  REG_OTP_SENT: 5,
  REG_OTP_FOCUS: 5,
  FP_OTP_SENT: 5,
  FP_EMAIL_NOT_FOUND: 5,
  FP_OTP_FAILED: 5,
  REG_FORM_READY: 5,
  FP_FORM_READY: 5,
  REG_FAILED: 5,
  FP_RESET_FAILED: 5,
  IDLE_6S: 1,
  IDLE_12S: 1,
  REG_IDLE_6S: 1,
  FP_IDLE_6S: 1,
  TYPING_EMAIL: 2,
  TYPING_PASSWORD: 2,
  REG_TYPING_NAME: 2,
  REG_TYPING_EMAIL: 2,
  REG_TYPING_OTP: 2,
  REG_TYPING_PASSWORD: 2,
  FP_TYPING_EMAIL: 2,
  FP_TYPING_OTP: 2,
  FP_TYPING_PASSWORD: 2,
  EMAIL_VALID: 2,
  EMAIL_INVALID: 2,
  REG_EMAIL_FORMAT_OK: 2,
  FP_EMAIL_VALID: 2,
  FORM_VALID: 2,
  REG_PASS_WEAK: 3,
  REG_PASS_STRONG: 3,
  REG_CONFIRM_MISMATCH: 3,
  FP_PASS_WEAK: 3,
  FP_PASS_STRONG: 3,
  FP_CONFIRM_MISMATCH: 3,
  LONG_IDLE: 1,
}

export function beatPriority(type) {
  return BEAT_PRIORITY[type] ?? 3
}

/** Readable time for one line — never rushes short or long text. */
export function getLineReadMs(text = '') {
  const len = String(text).length
  const extra = Math.max(0, len - 24) * LINE_MS_PER_CHAR
  return Math.min(LINE_MAX_MS, Math.max(LINE_MIN_MS, LINE_MIN_MS + extra))
}

export function getBeatDurationMs(type) {
  const beat = STORY_BEATS[type]
  if (!beat?.lines?.length) return 5000
  let total = 0
  beat.lines.forEach((line, i) => {
    total += getLineReadMs(line.text)
    if (i < beat.lines.length - 1) total += LINE_GAP_MS
  })
  return total + BEAT_TAIL_MS
}

/** @deprecated — use getLineReadMs per line */
export const LINE_DURATION_MS = LINE_MIN_MS

export const STORY_BEATS = {

  /* ── Login — page load (bots talk among themselves first) ── */
  GREET: {
    mood: 'calm',
    lines: [
      { speaker: 'pixel', text: "Oh. Someone actually came back to log in." },
      { speaker: 'echo',  text: "One Google tap, or the classic email route." },
      { speaker: 'nova',  text: "Welcome back! We missed you. Probably." },
      { speaker: 'pixel', text: "We don't know them yet. Relax, Nova." },
      { speaker: 'nova',  text: "Not this one. I can feel it." },
      { speaker: 'pixel', text: "You 'felt' the last one too. They forgot their email." },
    ],
  },

  IDLE_6S: {
    mood: 'curious',
    lines: [
      { speaker: 'echo',  text: "Six seconds. Zero keystrokes. Impressive restraint." },
      { speaker: 'pixel', text: "Or they're reading the password rules for the fifth time." },
      { speaker: 'nova',  text: "Maybe they're building courage. I respect that." },
      { speaker: 'pixel', text: "Sure. 'Courage.' On a Tuesday." },
    ],
  },

  IDLE_12S: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "Still nothing. Should we be worried?" },
      { speaker: 'pixel', text: "They're either deep in thought or deep in denial." },
      { speaker: 'nova',  text: "We'll wait. No rush. Mostly." },
    ],
  },

  /* ── Login — email field ── */
  FOUND_EMAIL: {
    mood: 'happy',
    lines: [
      { speaker: 'echo',  text: "Movement. Email field acquired." },
      { speaker: 'pixel', text: "Look at that — they found the obvious box." },
      { speaker: 'nova',  text: "First step done. I'm emotionally invested already." },
    ],
  },

  EMAIL_RETURN: {
    mood: 'calm',
    lines: [
      { speaker: 'pixel', text: "Back to email. Commitment issues?" },
      { speaker: 'echo',  text: "Probably spotted a typo. Reasonable." },
      { speaker: 'nova',  text: "Fix it. We won't judge. Much." },
    ],
  },

  EMAIL_RETURN_QUICK: {
    mood: 'nudge',
    lines: [
      { speaker: 'pixel', text: "Password field lasted, what, two seconds?" },
      { speaker: 'echo',  text: "Classic panic-retreat to email." },
      { speaker: 'nova',  text: "Happens. @ symbols are stressful." },
      { speaker: 'pixel', text: "Take your time. We've got nowhere else to be." },
    ],
  },

  TYPING_EMAIL: {
    mood: 'calm',
    lines: [
      { speaker: 'echo',  text: "Characters incoming. They can type." },
      { speaker: 'pixel', text: "Plot twist — not a bot. Probably." },
      { speaker: 'nova',  text: "Keep going. You're doing great." },
    ],
  },

  EMAIL_INVALID: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "That email format is… creative." },
      { speaker: 'pixel', text: "Missing an @ somewhere. Or a dot. Or hope." },
      { speaker: 'nova',  text: "Small fix. You'll nail it." },
    ],
  },

  EMAIL_VALID: {
    mood: 'happy',
    lines: [
      { speaker: 'nova',  text: "Valid email. Gold star energy." },
      { speaker: 'echo',  text: "One field down. Password awaits." },
      { speaker: 'pixel', text: "Professional. Almost suspiciously so." },
    ],
  },

  /* ── Login — password field ── */
  FOCUS_PASSWORD: {
    mood: 'nudge',
    lines: [
      { speaker: 'nova',  text: "Password field. Eyes off — everyone." },
      { speaker: 'echo',  text: "Privacy mode on. I am not watching. Officially." },
      { speaker: 'pixel', text: "Wait… can I just peek? One tiny peek?" },
      { speaker: 'nova',  text: "No." },
      { speaker: 'pixel', text: "Fine. Okay. Eyes shut. Happy now?" },
    ],
  },

  TYPING_PASSWORD: {
    mood: 'calm',
    lines: [
      { speaker: 'nova',  text: "Not looking. Officially." },
      { speaker: 'echo',  text: "Me neither. My sensors are off. Trust me." },
      { speaker: 'pixel', text: "Those dots could be anything. Probably 'password123'." },
    ],
  },

  PASSWORD_VISIBLE: {
    mood: 'nudge',
    lines: [
      { speaker: 'pixel', text: "Oh wow — plaintext parade." },
      { speaker: 'echo',  text: "I looked away. Eventually." },
      { speaker: 'nova',  text: "Hide it when you're done. Please." },
    ],
  },

  PASSWORD_HIDDEN: {
    mood: 'calm',
    lines: [
      { speaker: 'echo',  text: "Back to dots. Civilization restored." },
      { speaker: 'pixel', text: "Much better. My retinas thank you." },
    ],
  },

  FORM_VALID: {
    mood: 'celebrate',
    lines: [
      { speaker: 'echo',  text: "Both fields look legit." },
      { speaker: 'nova',  text: "Hit login whenever you're ready." },
      { speaker: 'pixel', text: "Don't overthink it. You already did that on email." },
    ],
  },

  SUBMIT_EMPTY: {
    mood: 'concerned',
    lines: [
      { speaker: 'pixel', text: "Login button spam. Fields still empty." },
      { speaker: 'echo',  text: "Email and password. Both. Not optional." },
      { speaker: 'nova',  text: "Fill them in. We'll celebrate after." },
    ],
  },

  LOGIN_PROCESSING: {
    mood: 'calm',
    lines: [
      { speaker: 'nova',  text: "Moment of truth. Deep breath." },
      { speaker: 'echo',  text: "Checking credentials with the universe." },
      { speaker: 'pixel', text: "No pressure. Just your entire session." },
    ],
  },

  LOGIN_SUCCESS: {
    mood: 'celebrate',
    lines: [
      { speaker: 'nova',  text: "They're in. I knew it." },
      { speaker: 'echo',  text: "Access granted. Identity confirmed." },
      { speaker: 'pixel', text: "Fine. I'll admit it — decent typing speed." },
      { speaker: 'nova',  text: "Welcome back, hunter." },
    ],
  },

  LOGIN_FAILED: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "Credentials rejected. Happens to everyone." },
      { speaker: 'pixel', text: "Wrong password — not wrong you. Give it another go." },
      { speaker: 'nova',  text: "Try again. Caps Lock is the usual villain." },
      { speaker: 'pixel', text: "And yes, we checked. It's not us." },
    ],
  },

  GUEST_CLICK: {
    mood: 'calm',
    lines: [
      { speaker: 'pixel', text: "Guest mode. Living dangerously with style." },
      { speaker: 'echo',  text: "Temporary access. Like a trial run for commitment." },
      { speaker: 'nova',  text: "Welcome anyway. We'll save your spot." },
    ],
  },

  /* ── Login — Google sign-in ── */
  GOOGLE_CLICK: {
    mood: 'nudge',
    lines: [
      { speaker: 'pixel', text: "Ah, the Google shortcut. Someone values their time." },
      { speaker: 'echo',  text: "No email, no password. Just vibes and a token." },
      { speaker: 'nova',  text: "Smart pick. Let Google do the vouching." },
    ],
  },

  GOOGLE_PROCESSING: {
    mood: 'calm',
    lines: [
      { speaker: 'nova',  text: "Asking Google if they're the real deal." },
      { speaker: 'echo',  text: "Handshake in progress. Very official." },
      { speaker: 'pixel', text: "No password to fumble this time. Refreshing." },
    ],
  },

  GOOGLE_SUCCESS: {
    mood: 'celebrate',
    lines: [
      { speaker: 'nova',  text: "Google says you're legit. Good enough for us." },
      { speaker: 'echo',  text: "Identity confirmed. Zero passwords harmed." },
      { speaker: 'pixel', text: "Fine — that was almost suspiciously smooth." },
      { speaker: 'nova',  text: "Welcome back, hunter." },
    ],
  },

  GOOGLE_FAILED: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "Google popup vanished mid-handshake." },
      { speaker: 'pixel', text: "Not you — just a hiccup between us and Google." },
      { speaker: 'nova',  text: "Give it one more tap. We'll wait." },
    ],
  },

  LONG_IDLE: {
    mood: 'sleepy',
    lines: [
      { speaker: 'echo',  text: "Still here. Still waiting. Still wondering." },
      { speaker: 'pixel', text: "Patience level: legendary. Or forgot the tab." },
      { speaker: 'nova',  text: "We'll be here when you wake up." },
    ],
  },

  /* ═══════════════════════════════════════════════════
   * REGISTER
   * ═══════════════════════════════════════════════════ */

  REG_GREET: {
    mood: 'happy',
    lines: [
      { speaker: 'pixel', text: "Registration page. They want to join the hunt." },
      { speaker: 'echo',  text: "Google in one tap, or four fields and an OTP." },
      { speaker: 'nova',  text: "Either way, we'll cheer from the sidelines." },
      { speaker: 'pixel', text: "Cheer loudly. They'll need it." },
    ],
  },

  /* ── Register — Google sign-up ── */
  REG_GOOGLE_CLICK: {
    mood: 'nudge',
    lines: [
      { speaker: 'pixel', text: "Google signup — skipping the OTP boss fight. Clever." },
      { speaker: 'echo',  text: "No name field, no six digits. Bold shortcut." },
      { speaker: 'nova',  text: "Let Google handle the paperwork. I approve." },
    ],
  },

  REG_GOOGLE_PROCESSING: {
    mood: 'calm',
    lines: [
      { speaker: 'nova',  text: "Setting up your account through Google." },
      { speaker: 'echo',  text: "Borrowing your details, with permission." },
      { speaker: 'pixel', text: "Zero forms. I'm quietly impressed." },
    ],
  },

  REG_GOOGLE_SUCCESS: {
    mood: 'celebrate',
    lines: [
      { speaker: 'nova',  text: "Account created via Google. Effortless." },
      { speaker: 'echo',  text: "New hunter registered — zero typos." },
      { speaker: 'pixel', text: "Didn't even break a sweat. Show-off." },
      { speaker: 'nova',  text: "See you inside." },
    ],
  },

  REG_GOOGLE_FAILED: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "Google sign-up stalled mid-handshake." },
      { speaker: 'pixel', text: "Not your fault — Google blinked." },
      { speaker: 'nova',  text: "Try once more. You're basically in." },
    ],
  },

  REG_IDLE_6S: {
    mood: 'curious',
    lines: [
      { speaker: 'echo',  text: "Not a single field touched. Stage fright?" },
      { speaker: 'pixel', text: "Maybe 'Create account' sounded like a marriage proposal." },
      { speaker: 'nova',  text: "It's just a name and email. Low stakes." },
      { speaker: 'pixel', text: "Famous last words before OTP hell." },
    ],
  },

  REG_FOUND_NAME: {
    mood: 'calm',
    lines: [
      { speaker: 'echo',  text: "Name field. Character creation begins." },
      { speaker: 'pixel', text: "Hope it's not 'asdf' again." },
      { speaker: 'nova',  text: "Real names welcome. Nicknames too." },
    ],
  },

  REG_TYPING_NAME: {
    mood: 'calm',
    lines: [
      { speaker: 'pixel', text: "Letters detected. Human confirmed." },
      { speaker: 'echo',  text: "Identity forming in real time." },
      { speaker: 'nova',  text: "Nice name energy so far." },
    ],
  },

  REG_FOUND_EMAIL: {
    mood: 'calm',
    lines: [
      { speaker: 'nova',  text: "Email time. The field that ruins everyone's day." },
      { speaker: 'echo',  text: "Then OTP. The step humans pretend to enjoy." },
      { speaker: 'pixel', text: "Check spam. Always check spam. Trust me." },
    ],
  },

  REG_EMAIL_RETURN: {
    mood: 'calm',
    lines: [
      { speaker: 'pixel', text: "Back to email. Forgot the @ again?" },
      { speaker: 'echo',  text: "Or they're fixing a typo before OTP pain." },
      { speaker: 'nova',  text: "Smart move. Verify beats regret." },
    ],
  },

  REG_EMAIL_RETURN_QUICK: {
    mood: 'nudge',
    lines: [
      { speaker: 'pixel', text: "Password → email in record time. Impressive indecision." },
      { speaker: 'echo',  text: "They touched password and immediately chickened out." },
      { speaker: 'nova',  text: "Email first. Password later. We support the pivot." },
    ],
  },

  REG_TYPING_EMAIL: {
    mood: 'calm',
    lines: [
      { speaker: 'echo',  text: "Something @-shaped is happening." },
      { speaker: 'pixel', text: "Could still be wrong. It's early." },
      { speaker: 'nova',  text: "Looking good from here." },
    ],
  },

  REG_EMAIL_FORMAT_OK: {
    mood: 'happy',
    lines: [
      { speaker: 'nova',  text: "Email format checks out. Hit Verify." },
      { speaker: 'echo',  text: "The button is right there. Waiting." },
      { speaker: 'pixel', text: "One click from OTP drama." },
    ],
  },

  REG_OTP_SENT: {
    mood: 'calm',
    lines: [
      { speaker: 'echo',  text: "OTP dispatched. Inbox or spam — pick your adventure." },
      { speaker: 'nova',  text: "Six digits. You can do this." },
      { speaker: 'pixel', text: "Don't refresh fifty times. It won't spawn faster." },
      { speaker: 'echo',  text: "…Unless you're into that." },
    ],
  },

  REG_OTP_FOCUS: {
    mood: 'calm',
    lines: [
      { speaker: 'pixel', text: "OTP field. The final boss of signup." },
      { speaker: 'nova',  text: "Paste it. Type it. Just get it in." },
      { speaker: 'echo',  text: "Hope they didn't close the email tab." },
      { speaker: 'pixel', text: "They closed it. They always close it." },
    ],
  },

  REG_TYPING_OTP: {
    mood: 'calm',
    lines: [
      { speaker: 'echo',  text: "Digits incoming. Rhythm is decent." },
      { speaker: 'pixel', text: "One… two… three… I'm not helping." },
      { speaker: 'nova',  text: "Almost there." },
    ],
  },

  REG_OTP_VERIFIED: {
    mood: 'celebrate',
    lines: [
      { speaker: 'nova',  text: "Email verified. You exist. Officially." },
      { speaker: 'echo',  text: "Identity confirmed by the OTP gods." },
      { speaker: 'pixel', text: "Fine. That was faster than I expected." },
    ],
  },

  REG_FOUND_PASSWORD: {
    mood: 'nudge',
    lines: [
      { speaker: 'nova',  text: "Password time. Make it embarrassing to crack." },
      { speaker: 'echo',  text: "Eyes closed. Privacy mode." },
      { speaker: 'pixel', text: "One tiny peek—" },
      { speaker: 'nova',  text: "Absolutely not." },
      { speaker: 'pixel', text: "Okay. Judging strength bar instead." },
    ],
  },

  REG_TYPING_PASSWORD: {
    mood: 'calm',
    lines: [
      { speaker: 'nova',  text: "Pretending not to watch." },
      { speaker: 'echo',  text: "Strength meter is doing math." },
      { speaker: 'pixel', text: "Those dots better not spell 'password'." },
    ],
  },

  REG_PASS_WEAK: {
    mood: 'concerned',
    lines: [
      { speaker: 'pixel', text: "That password is… optimistic." },
      { speaker: 'echo',  text: "Strength bar is crying." },
      { speaker: 'nova',  text: "Uppercase, numbers, symbols. Mix it up." },
      { speaker: 'pixel', text: "Your future self will thank you. Maybe." },
    ],
  },

  REG_PASS_STRONG: {
    mood: 'celebrate',
    lines: [
      { speaker: 'nova',  text: "Strong password. S-rank security." },
      { speaker: 'pixel', text: "Didn't see that coming. Respect." },
      { speaker: 'echo',  text: "Even I'd struggle to guess that." },
    ],
  },

  REG_CONFIRM_MISMATCH: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "Confirm password doesn't match." },
      { speaker: 'pixel', text: "So close. Copy-paste exists for a reason." },
      { speaker: 'nova',  text: "One fix. You're literally there." },
    ],
  },

  REG_FORM_READY: {
    mood: 'celebrate',
    lines: [
      { speaker: 'echo',  text: "All fields green. Rare sight." },
      { speaker: 'nova',  text: "Hit register. Become a hunter." },
      { speaker: 'pixel', text: "Don't hesitate. Hesitation is how typos win." },
    ],
  },

  REG_SUCCESS: {
    mood: 'celebrate',
    lines: [
      { speaker: 'nova',  text: "Account created. Welcome to the arena." },
      { speaker: 'echo',  text: "New hunter registered in the system." },
      { speaker: 'pixel', text: "They finished signup. I'm genuinely shocked." },
      { speaker: 'nova',  text: "See you inside." },
    ],
  },

  REG_FAILED: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "Server said no. Rude." },
      { speaker: 'pixel', text: "One submit away from glory. Tragic." },
      { speaker: 'nova',  text: "Try again. We're not going anywhere." },
    ],
  },

  /* ═══════════════════════════════════════════════════
   * FORGOT PASSWORD
   * ═══════════════════════════════════════════════════ */

  FP_GREET: {
    mood: 'nudge',
    lines: [
      { speaker: 'pixel', text: "Forgot password? In 2026? Bold." },
      { speaker: 'echo',  text: "Happens to everyone. Allegedly." },
      { speaker: 'nova',  text: "No shame. Let's fix it together." },
      { speaker: 'pixel', text: "Write the new one down this time. On paper. Like a caveman." },
    ],
  },

  FP_IDLE_6S: {
    mood: 'curious',
    lines: [
      { speaker: 'echo',  text: "Staring at email. Memory loading…" },
      { speaker: 'pixel', text: "College email? Personal? Work? Pick a struggle." },
      { speaker: 'nova',  text: "Wrong email = wrong OTP. Take your time." },
    ],
  },

  FP_TYPING_EMAIL: {
    mood: 'calm',
    lines: [
      { speaker: 'echo',  text: "Email incoming. Hope it's the right one." },
      { speaker: 'pixel', text: "The account they forgot… probably." },
      { speaker: 'nova',  text: "Almost ready to send a code." },
    ],
  },

  FP_EMAIL_VALID: {
    mood: 'happy',
    lines: [
      { speaker: 'nova',  text: "Format looks good. Hit Send OTP." },
      { speaker: 'pixel', text: "Assuming this is the account they forgot…" },
      { speaker: 'echo',  text: "One click from redemption arc." },
    ],
  },

  FP_EMAIL_NOT_FOUND: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "That email isn't registered here." },
      { speaker: 'pixel', text: "Wrong platform or wrong memory?" },
      { speaker: 'nova',  text: "Double-check or create an account instead." },
    ],
  },

  FP_OTP_SENT: {
    mood: 'calm',
    lines: [
      { speaker: 'nova',  text: "Code sent. Inbox first. Spam second." },
      { speaker: 'pixel', text: "Humans hide OTPs in spam like treasure." },
      { speaker: 'echo',  text: "Six digits. Cold hands make typos." },
    ],
  },

  FP_TYPING_OTP: {
    mood: 'calm',
    lines: [
      { speaker: 'echo',  text: "Digits going in. Steady hands." },
      { speaker: 'pixel', text: "Don't look at my screen, Echo." },
      { speaker: 'echo',  text: "Wasn't looking. Officially." },
    ],
  },

  FP_OTP_FAILED: {
    mood: 'concerned',
    lines: [
      { speaker: 'pixel', text: "Wrong code. Classic combo: typo plus panic." },
      { speaker: 'echo',  text: "Expired? Mistyped? Both?" },
      { speaker: 'nova',  text: "Resend and try again. You've got this." },
    ],
  },

  FP_OTP_VERIFIED: {
    mood: 'celebrate',
    lines: [
      { speaker: 'nova',  text: "Identity confirmed. You are you." },
      { speaker: 'echo',  text: "Reset access granted." },
      { speaker: 'pixel', text: "Okay fine — not *that* forgetful." },
      { speaker: 'nova',  text: "Now pick a password you'll remember." },
    ],
  },

  FP_NEW_PASS_GREET: {
    mood: 'nudge',
    lines: [
      { speaker: 'pixel', text: "New password time. Use something memorable." },
      { speaker: 'echo',  text: "Not sticky note under keyboard. Please." },
      { speaker: 'nova',  text: "Strong beats short. Every time." },
      { speaker: 'pixel', text: "We believe in you. Barely." },
    ],
  },

  FP_FOUND_PASSWORD: {
    mood: 'nudge',
    lines: [
      { speaker: 'nova',  text: "Eyes closed, team." },
      { speaker: 'echo',  text: "Privacy mode. Again." },
      { speaker: 'pixel', text: "One peek—" },
      { speaker: 'nova',  text: "No." },
      { speaker: 'pixel', text: "Fine. Judging from the strength bar only." },
    ],
  },

  FP_TYPING_PASSWORD: {
    mood: 'calm',
    lines: [
      { speaker: 'nova',  text: "Not watching. Promise." },
      { speaker: 'echo',  text: "Strength meter is silently judging." },
      { speaker: 'pixel', text: "Make it something you'll recall next week." },
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
      { speaker: 'echo',  text: "Don't lose it again. We're begging." },
    ],
  },

  FP_CONFIRM_MISMATCH: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "Confirm field doesn't match." },
      { speaker: 'pixel', text: "Copy-paste. Ctrl+C. Ctrl+V. Revolutionary." },
      { speaker: 'nova',  text: "One fix and you're done." },
    ],
  },

  FP_FORM_READY: {
    mood: 'celebrate',
    lines: [
      { speaker: 'echo',  text: "All checks passed. Rare." },
      { speaker: 'nova',  text: "Reset it. Then log in like a pro." },
      { speaker: 'pixel', text: "And maybe save the password. Wild idea." },
    ],
  },

  FP_RESET_SUCCESS: {
    mood: 'celebrate',
    lines: [
      { speaker: 'nova',  text: "Password updated. Welcome back." },
      { speaker: 'echo',  text: "Recovery complete." },
      { speaker: 'pixel', text: "Remember it. We're not doing this weekly." },
    ],
  },

  FP_RESET_FAILED: {
    mood: 'concerned',
    lines: [
      { speaker: 'echo',  text: "Reset failed. Server mood swing." },
      { speaker: 'nova',  text: "Try once more — you're almost there." },
      { speaker: 'pixel', text: "The password gods demand a retry." },
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

export function getMurmurHideMs(event) {
  if (!event?.type) return 5000
  return getBeatDurationMs(event.type)
}

/** @deprecated — use STORY_BEATS keys directly */
export const COMPANION_EVENTS = Object.fromEntries(
  Object.keys(STORY_BEATS).map(k => [k, k]),
)

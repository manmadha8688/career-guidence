---
name: project-email-system
description: Email architecture — Brevo sending, mailboxes, Reply-To routing, templates, future mail suggestions
metadata:
  type: project
---

# Email System — LearnForEarn

> How mail is sent, which mailboxes exist, how replies route, and what to add in the future.
> Source of truth: `Student-BackEnd/.../service/EmailService.java` (Brevo) + frontend display.

---

## Sending architecture (outbound)

- **Provider:** Brevo transactional API (`https://api.brevo.com/v3/smtp/email`), key = `BREVO_API_KEY` env.
- **Sender (From):** `noreply@learnforearn.in` (name `LearnForEarn`) — send-only, **no monitored inbox**.
- **Domain auth:** SPF/DKIM/DMARC set on `learnforearn.in` via Brevo → GoDaddy DNS.
- **Local dev:** if `BREVO_API_KEY` blank + `local` profile → OTP is logged to console, no real send. Prod without key = hard error.
- Welcome + password-changed are **best-effort** (never throw — the underlying action already succeeded). OTP sends **do** throw on failure.
- **Do NOT change sending logic / Brevo setup** without an explicit request. Content + Reply-To are safe to edit.

---

## Zoho mailboxes (inbound — user-created)

| Mailbox | Purpose |
|---|---|
| `hello@learnforearn.in` | General contact |
| `help@learnforearn.in` | Support & help (the monitored "catch-all" for replies) |
| `privacy@learnforearn.in` | Privacy / data requests |
| `partnerships@learnforearn.in` | Business & collaborations |

`noreply@` is a Brevo send-only address (not a Zoho inbox). Mail sent *to* `noreply@` bounces/discards.

---

## Reply-To routing (implemented Jul 2026)

Sender always stays `noreply@`. A `replyTo` field on the Brevo payload routes user "Reply" clicks to a monitored inbox:

| Email | Subject | Reply-To → lands in |
|---|---|---|
| Email verification OTP | `Verify your email — LearnForEarn` | `help@` |
| Password reset OTP | `Reset your password — LearnForEarn` | `help@` |
| Welcome | `Welcome to LearnForEarn 🎉` | `hello@` |
| Password changed | `Your password was changed — LearnForEarn` | `help@` |

**Rule:** `noreply@` / OTP / system → `help@`; welcome → `hello@`; partnership mail → `partnerships@`; privacy mail → `privacy@`.

**Key behavior:** OTP/system emails still *say* "Do not reply — inbox not monitored" (about the `noreply@` sender), but if a user replies anyway the `Reply-To` catches it → lands in `help@`. So replies are discouraged but never lost.

---

## Template structure

- Shared `shell(purpose, innerHtml, noteHtml, personal)` builds header + body + footer. Plain-text mirror via `textFooter(note, personal)`.
- **Global footer on every email:** "This is an automated email from LearnForEarn" · "Do not reply to this email | Need help? help@learnforearn.in" · "© 2026 LearnForEarn | learnforearn.in" · Unsubscribe (→ /contact) | Privacy Policy (→ /privacy).
- **`personal=true`** (welcome only) drops the "automated / do not reply" lines so it feels human and invites replies to `hello@`.
- **Tone rules:** subject always ends `— LearnForEarn`; greet by **first name** (never "Dear User"); under ~200 words; one CTA button; mobile-responsive inline-styled HTML.

---

## Emails currently sent to users (free-tier — important mail only)

1. Email verification OTP (registration)
2. Password reset OTP
3. Welcome (after successful registration)
4. Password-changed confirmation

Deliberately **no** marketing / notification / digest emails on free tier — only transactional, user-useful mail.

---

## Frontend email display (Jul 2026)

All 4 addresses shown as `mailto:` links with `rel="noopener"`, full email on mobile (`word-break: break-all`, never truncate):

- **Footer** (`SiteFooter.jsx`) — "Contact Us" grid: General/Support/Privacy/Partnerships with icons.
- **Contact page** — 4 cards + "Still have questions? → help@" block.
- **About page** — "Get in touch" section: hello@ + partnerships@ only.
- **Privacy page** — privacy@ at top (official contact) + bottom.
- **404 page** — "Need help? Contact help@".

---

## Future mail suggestions (when related feature is built)

Add these **only when the triggering feature exists** — keep free-tier volume lean (important transactional mail, not notifications).

| Future email | Trigger / when to add | Reply-To |
|---|---|---|
| **New-device / new-location login alert** | Security-sensitive; add when login-event tracking is surfaced. Low volume, high trust value. | `help@` |
| **Email-change confirmation** | When profile allows changing the account email — confirm on both old + new address. | `help@` |
| **Account deletion confirmation** | When self-serve account/data deletion ships (privacy requirement). | `privacy@` |
| **Partnership auto-acknowledgement** | When a partnership/contact form submits — auto-reply "we got it". | `partnerships@` |
| **Weekly streak / XP digest** (opt-in) | Only if a notifications tier is added later; must be opt-in + include real unsubscribe. Not free-tier priority. | `hello@` |
| **Roadmap milestone / rank-up** (opt-in) | Same as digest — future notifications tier only. | `hello@` |

**When adding any new email:** reuse `shell(...)` + `textFooter(...)`, follow the tone rules, pick Reply-To by the routing rule above, and confirm the sender stays `noreply@`. Update this file + the table above.

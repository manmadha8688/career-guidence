export function getPasswordStrength(pw) {
  let s = 0
  if (pw.length >= 8)          s++
  if (/[A-Z]/.test(pw))        s++
  if (/[0-9]/.test(pw))        s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return s
}

export function isPasswordValid(pw) {
  return pw.length >= 8 && pw.length <= 64 && getPasswordStrength(pw) >= 4
}

export const PASSWORD_HINTS = [
  { label: '8+ characters',       ok: pw => pw.length >= 8 },
  { label: 'One uppercase letter', ok: pw => /[A-Z]/.test(pw) },
  { label: 'One number',          ok: pw => /[0-9]/.test(pw) },
  { label: 'One symbol',          ok: pw => /[^A-Za-z0-9]/.test(pw) },
]

export const strengthLabel  = ['', 'Weak', 'Fair', 'Good', 'Strong']
export const strengthColors = ['', 'weak', 'medium', 'medium', 'strong']

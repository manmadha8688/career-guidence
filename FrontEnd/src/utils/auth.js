// Central guest / registration checks. Keeping these in one place prevents the
// subtly-different inline variants (`!user || role === 'GUEST'`,
// `user?.role === 'GUEST'`, `!!user && role !== 'GUEST'`) that let auth-gated UI
// drift apart.
//
// isGuest also treats anonymous (null) visitors as guests, so "Create account"
// nudges show for both a guest session and a logged-out visitor.
export function isGuest(user) {
  return !user || user.role === 'GUEST'
}

// A real, non-guest, logged-in account.
export function isRegistered(user) {
  return !!user && user.role !== 'GUEST'
}

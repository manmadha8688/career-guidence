// Shared avatar-initials helper. Takes the first letter of up to two words,
// uppercased; falls back to '?' when empty. Byte-identical to the previous
// per-page `initials()` definitions in MyProfilePage / PublicProfilePage.
export function getInitials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() || '').join('') || '?'
}

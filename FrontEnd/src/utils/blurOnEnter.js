// Blurs a text input when Enter is pressed — exits the search field and
// dismisses the on-screen mobile keyboard. Empty input is a no-op. This is
// purely additive: live filtering / existing onChange behavior is untouched.
export default function blurOnEnter(e) {
  if ((e.key === 'Enter' || e.keyCode === 13) && e.currentTarget.value.trim() !== '') {
    e.preventDefault()
    e.currentTarget.blur()
  }
}

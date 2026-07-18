/** Press Enter in a link field → same as clicking Save (when enabled). */
export function saveOnEnter(e, canSave, onSave) {
  if (e.key !== 'Enter') return
  e.preventDefault()
  if (canSave && onSave) onSave()
}

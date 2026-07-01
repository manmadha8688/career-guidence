/** Clear localStorage but keep guest device id + theme (matches logout behavior). */
export function clearBrowserSessionPreservingPrefs() {
  const guestDeviceId = localStorage.getItem('guest_device_id')
  const theme = localStorage.getItem('theme')
  localStorage.clear()
  if (guestDeviceId) localStorage.setItem('guest_device_id', guestDeviceId)
  if (theme) localStorage.setItem('theme', theme)
}

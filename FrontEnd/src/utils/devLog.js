/** Log API failures in development without noisy toasts for background requests. */
export function logApiError(label, err) {
  if (!import.meta.env.DEV) return
  const status = err?.response?.status
  const msg = err?.response?.data?.error || err?.message || err
  console.warn(`[${label}]`, status ? `HTTP ${status}` : '', msg)
}

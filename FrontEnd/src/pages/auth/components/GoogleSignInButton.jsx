import { useEffect, useRef, useState } from 'react'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

/**
 * Renders the official Google Identity Services button and hands the resulting
 * ID token (credential) to the parent via onCredential. The parent owns the
 * post-login flow (overlay, AuthContext.login, navigation) so both the login and
 * register screens can reuse this button with their own UX.
 *
 * Renders nothing when VITE_GOOGLE_CLIENT_ID is not configured, so the app stays
 * functional without Google set up.
 */
export default function GoogleSignInButton({ onCredential, onInteract, text = 'continue_with', disabled = false }) {
  const divRef = useRef(null)
  const cbRef = useRef(onCredential)
  const [ready, setReady] = useState(false)

  useEffect(() => { cbRef.current = onCredential }, [onCredential])

  useEffect(() => {
    if (!CLIENT_ID) return
    let cancelled = false
    let tries = 0

    const init = () => {
      if (cancelled) return
      const gid = window.google?.accounts?.id
      if (!gid) {
        // GIS script loads async — poll briefly until it's available.
        if (tries++ < 40) setTimeout(init, 150)
        return
      }

      gid.initialize({
        client_id: CLIENT_ID,
        callback: (resp) => { if (resp?.credential) cbRef.current?.(resp.credential) },
        ux_mode: 'popup',
      })

      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      if (divRef.current) {
        divRef.current.innerHTML = ''
        gid.renderButton(divRef.current, {
          type: 'standard',
          theme: isLight ? 'outline' : 'filled_black',
          size: 'medium',
          text,
          shape: 'pill',
          logo_alignment: 'center',
        })
      }
      setReady(true)
    }

    init()
    return () => { cancelled = true }
  }, [text])

  if (!CLIENT_ID) return null

  return (
    <div
      className={`google-signin${disabled ? ' google-signin--disabled' : ''}`}
      aria-busy={!ready}
      onPointerDownCapture={onInteract}
    >
      <div ref={divRef} className="google-signin__btn" />
      {!ready && <div className="google-signin__loading">Loading Google sign-in…</div>}
    </div>
  )
}

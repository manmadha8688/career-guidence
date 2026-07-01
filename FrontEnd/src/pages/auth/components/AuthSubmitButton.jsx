export default function AuthSubmitButton({ ready, loading, children, compact = false }) {
  const wrapCls = compact ? ' auth-escape-wrap--compact' : ''
  const btnCls  = compact ? ' auth-btn-primary--compact' : ''

  return (
    <div className={`auth-escape-wrap auth-escape-wrap--static${wrapCls}`}>
      <button
        type="submit"
        className={`auth-btn-primary${btnCls}${ready ? ' auth-btn-primary--ready' : ' auth-btn-primary--locked'}`}
        disabled={loading || !ready}
      >
        {loading && <span className="loading-spinner loading-spinner--md" />}
        {children}
      </button>
    </div>
  )
}

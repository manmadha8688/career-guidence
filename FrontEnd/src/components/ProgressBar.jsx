export default function ProgressBar({ value = 0, size = 'default', color }) {
  const cls = size === 'sm' ? 'progress-bar progress-bar-sm'
            : size === 'lg' ? 'progress-bar progress-bar-lg'
            : 'progress-bar'
  const pct = `${Math.min(100, Math.max(0, value))}%`

  return (
    <div className={cls}>
      <div
        className={`progress-fill${color ? ' progress-fill--custom' : ''}`}
        style={{
          '--progress-pct': pct,
          ...(color ? { '--progress-color': color } : {}),
        }}
      />
    </div>
  )
}

export default function ProgressBar({ value = 0, size = 'default', color }) {
  const cls = size === 'sm' ? 'progress-bar progress-bar-sm'
            : size === 'lg' ? 'progress-bar progress-bar-lg'
            : 'progress-bar'
  return (
    <div className={cls}>
      <div
        className="progress-fill"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, ...(color ? { background: color } : {}) }}
      />
    </div>
  )
}

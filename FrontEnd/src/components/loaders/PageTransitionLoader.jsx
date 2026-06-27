export default function PageTransitionLoader() {
  const segments = 12
  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'var(--bg-primary, #0C1020)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
    }}>
      <svg width="48" height="48" viewBox="0 0 48 48">
        {Array.from({ length: segments }).map((_, i) => {
          const angle = (i * 360) / segments
          const rad = (angle - 90) * (Math.PI / 180)
          const r = 18
          const x = 24 + r * Math.cos(rad)
          const y = 24 + r * Math.sin(rad)
          return (
            <circle
              key={i}
              cx={x} cy={y} r="3"
              fill="#9B6ED4"
              style={{
                animation: `ptl-seg 1.2s linear ${(i / segments) * 1.2}s infinite`,
              }}
            />
          )
        })}
      </svg>

      <style>{`
        @keyframes ptl-seg {
          0%, 100% { opacity: 0.15; transform-origin: 24px 24px; transform: scale(0.7); }
          0%        { opacity: 1;    transform-origin: 24px 24px; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

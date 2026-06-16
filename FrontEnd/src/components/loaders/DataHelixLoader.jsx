// Section loader for Admin panels
// DNA double-helix made of data nodes — two interweaving strands of glowing dots

const NODES = 10 // nodes per strand

export default function DataHelixLoader({ height = 200 }) {
  // Build helix nodes — each node has a phase offset
  const nodes = Array.from({ length: NODES }, (_, i) => ({
    i,
    phase: (i / NODES) * 360,
    delay: `${(i * 0.08).toFixed(2)}s`,
  }))

  return (
    <div className="dhl-root" style={{ height }}>

      {/* Helix SVG — animated via CSS */}
      <div className="dhl-helix">
        {nodes.map(n => (
          <div key={n.i} className="dhl-pair" style={{
            top: `${(n.i / (NODES - 1)) * 100}%`,
            animationDelay: n.delay,
          }}>
            {/* Left node */}
            <div className="dhl-node dhl-node-left" style={{ animationDelay: n.delay }}>
              <div className="dhl-node-inner dhl-node-blue" />
            </div>

            {/* Connecting bridge */}
            <div className="dhl-bridge" style={{ animationDelay: n.delay }} />

            {/* Right node */}
            <div className="dhl-node dhl-node-right" style={{ animationDelay: n.delay }}>
              <div className="dhl-node-inner dhl-node-purple" />
            </div>
          </div>
        ))}
      </div>

      {/* Center label */}
      <div className="dhl-center">
        <div className="dhl-label">LOADING DATA</div>
        <div className="dhl-dots">
          <span style={{ animationDelay: '0s' }} />
          <span style={{ animationDelay: '0.25s' }} />
          <span style={{ animationDelay: '0.5s' }} />
        </div>
      </div>
    </div>
  )
}

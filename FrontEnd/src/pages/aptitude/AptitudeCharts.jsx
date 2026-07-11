// Lightweight, dependency-free chart primitives for the Data Interpretation
// lessons. Everything is plain SVG / HTML so it renders instantly, scales with
// the container (viewBox), and adapts to light/dark via CSS variables.
// Accent colour is passed in (the DI category colour by default).

const DI_PALETTE = ['#F59E0B', '#0EA5E9', '#9B6ED4', '#22C55E', '#EF4444', '#14B8A6', '#EC4899']

// Pick a "nice" round axis maximum a little above the data max.
function niceMax(max) {
  if (max <= 0) return 10
  const pow = Math.pow(10, Math.floor(Math.log10(max)))
  const n = max / pow
  const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10
  return step * pow
}

function fmt(n) {
  if (Math.abs(n) >= 1000) return n.toLocaleString('en-IN')
  return `${n}`
}

/* ----------------------------- Bar chart ------------------------------ */
export function DIBar({ categories = [], series = [], unit, accent = '#F59E0B' }) {
  const W = 560, H = 300
  const padL = 46, padR = 14, padT = 22, padB = 46
  const plotW = W - padL - padR
  const plotH = H - padT - padB
  const flat = series.flatMap(s => s.data)
  const max = niceMax(Math.max(1, ...flat))
  const ticks = 5
  const groupW = plotW / categories.length
  const nBars = series.length
  const barW = (groupW * 0.68) / nBars
  const y = (v) => padT + plotH - (v / max) * plotH

  return (
    <div className="di-chart">
      <svg viewBox={`0 0 ${W} ${H}`} className="di-svg" role="img" aria-label="Bar chart">
        {/* y grid + labels */}
        {Array.from({ length: ticks + 1 }, (_, i) => {
          const v = (max / ticks) * i
          const yy = y(v)
          return (
            <g key={i}>
              <line x1={padL} y1={yy} x2={W - padR} y2={yy} className="di-grid" />
              <text x={padL - 8} y={yy + 4} className="di-axis-txt" textAnchor="end">{fmt(v)}</text>
            </g>
          )
        })}
        {/* bars */}
        {categories.map((c, ci) => {
          const gx = padL + ci * groupW
          return (
            <g key={ci}>
              {series.map((s, si) => {
                const v = s.data[ci] ?? 0
                const bx = gx + groupW * 0.16 + si * barW
                const by = y(v)
                const col = s.color || (nBars === 1 ? accent : DI_PALETTE[si % DI_PALETTE.length])
                return (
                  <g key={si}>
                    <rect x={bx} y={by} width={barW * 0.92} height={padT + plotH - by} rx="3" fill={col} className="di-bar" />
                    {nBars <= 2 && (
                      <text x={bx + barW * 0.46} y={by - 5} className="di-bar-val" textAnchor="middle">{fmt(v)}</text>
                    )}
                  </g>
                )
              })}
              <text x={gx + groupW / 2} y={H - padB + 18} className="di-axis-txt" textAnchor="middle">{c}</text>
            </g>
          )
        })}
        <line x1={padL} y1={padT + plotH} x2={W - padR} y2={padT + plotH} className="di-axis-line" />
        {unit && <text x={padL} y={13} className="di-unit">{unit}</text>}
      </svg>
      {series.length > 1 && <Legend series={series} />}
    </div>
  )
}

/* ----------------------------- Line chart ----------------------------- */
export function DILine({ categories = [], series = [], unit, accent = '#F59E0B' }) {
  const W = 560, H = 300
  const padL = 46, padR = 14, padT = 22, padB = 46
  const plotW = W - padL - padR
  const plotH = H - padT - padB
  const flat = series.flatMap(s => s.data)
  const max = niceMax(Math.max(1, ...flat))
  const ticks = 5
  const x = (i) => padL + (categories.length === 1 ? plotW / 2 : (plotW / (categories.length - 1)) * i)
  const y = (v) => padT + plotH - (v / max) * plotH

  return (
    <div className="di-chart">
      <svg viewBox={`0 0 ${W} ${H}`} className="di-svg" role="img" aria-label="Line chart">
        {Array.from({ length: ticks + 1 }, (_, i) => {
          const v = (max / ticks) * i
          const yy = y(v)
          return (
            <g key={i}>
              <line x1={padL} y1={yy} x2={W - padR} y2={yy} className="di-grid" />
              <text x={padL - 8} y={yy + 4} className="di-axis-txt" textAnchor="end">{fmt(v)}</text>
            </g>
          )
        })}
        {series.map((s, si) => {
          const col = s.color || (series.length === 1 ? accent : DI_PALETTE[si % DI_PALETTE.length])
          const pts = s.data.map((v, i) => `${x(i)},${y(v)}`).join(' ')
          return (
            <g key={si}>
              <polyline points={pts} fill="none" stroke={col} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
              {s.data.map((v, i) => (
                <g key={i}>
                  <circle cx={x(i)} cy={y(v)} r="3.5" fill={col} />
                  {series.length === 1 && <text x={x(i)} y={y(v) - 9} className="di-bar-val" textAnchor="middle">{fmt(v)}</text>}
                </g>
              ))}
            </g>
          )
        })}
        {categories.map((c, i) => (
          <text key={i} x={x(i)} y={H - padB + 18} className="di-axis-txt" textAnchor="middle">{c}</text>
        ))}
        <line x1={padL} y1={padT + plotH} x2={W - padR} y2={padT + plotH} className="di-axis-line" />
        {unit && <text x={padL} y={13} className="di-unit">{unit}</text>}
      </svg>
      {series.length > 1 && <Legend series={series} />}
    </div>
  )
}

/* ------------------------------ Pie / donut --------------------------- */
export function DIPie({ slices = [] }) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1
  const R = 88, cx = 100, cy = 100, r0 = 46
  const fracs = slices.map(s => s.value / total)
  // Pure cumulative start angle per slice — no in-render reassignment.
  const starts = fracs.map((_, i) => -Math.PI / 2 + fracs.slice(0, i).reduce((a, b) => a + b, 0) * Math.PI * 2)
  const arcs = slices.map((s, i) => {
    const frac = fracs[i]
    const a0 = starts[i]
    const a1 = a0 + frac * Math.PI * 2
    const large = a1 - a0 > Math.PI ? 1 : 0
    const p = (a, r) => [cx + r * Math.cos(a), cy + r * Math.sin(a)]
    const [x0, y0] = p(a0, R), [x1, y1] = p(a1, R)
    const [x2, y2] = p(a1, r0), [x3, y3] = p(a0, r0)
    const d = `M ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1} L ${x2} ${y2} A ${r0} ${r0} 0 ${large} 0 ${x3} ${y3} Z`
    return { d, color: s.color || DI_PALETTE[i % DI_PALETTE.length], pct: Math.round(frac * 100), label: s.label, value: s.value }
  })
  return (
    <div className="di-chart di-chart--pie">
      <svg viewBox="0 0 200 200" className="di-svg-pie" role="img" aria-label="Pie chart">
        {arcs.map((a, i) => <path key={i} d={a.d} fill={a.color} className="di-slice" />)}
        <text x="100" y="96" className="di-pie-total" textAnchor="middle">Total</text>
        <text x="100" y="114" className="di-pie-total di-pie-total--num" textAnchor="middle">{fmt(total)}</text>
      </svg>
      <ul className="di-legend di-legend--pie">
        {arcs.map((a, i) => (
          <li key={i} className="di-legend__item">
            <span className="di-legend__dot" style={{ background: a.color }} />
            <span className="di-legend__label">{a.label}</span>
            <span className="di-legend__val">{fmt(a.value)} · {a.pct}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ------------------------------ Data table ---------------------------- */
export function DITable({ columns = [], rows = [], caption, highlightCol }) {
  return (
    <div className="di-table-wrap">
      {caption && <p className="di-table-cap">{caption}</p>}
      <div className="di-table-scroll">
        <table className="di-table">
          <thead>
            <tr>{columns.map((c, i) => <th key={i} className={i === highlightCol ? 'is-hl' : ''}>{c}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => (
              <tr key={ri}>
                {r.map((cell, ci) => (
                  ci === 0
                    ? <th key={ci} scope="row">{cell}</th>
                    : <td key={ci} className={ci === highlightCol ? 'is-hl' : ''}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* --------------------------- Venn (3 circles) ------------------------- */
export function DIVenn({ labels = {}, regions = {} }) {
  // Fixed 3-circle layout; numbers placed in each region.
  return (
    <div className="di-chart di-chart--venn">
      <svg viewBox="0 0 240 220" className="di-svg-venn" role="img" aria-label="Venn diagram">
        <circle cx="90" cy="90" r="62" className="di-venn-c di-venn-c--a" />
        <circle cx="150" cy="90" r="62" className="di-venn-c di-venn-c--b" />
        <circle cx="120" cy="140" r="62" className="di-venn-c di-venn-c--c" />
        {/* region counts */}
        <text x="62" y="72" className="di-venn-n">{regions.A}</text>
        <text x="178" y="72" className="di-venn-n">{regions.B}</text>
        <text x="120" y="170" className="di-venn-n">{regions.C}</text>
        <text x="120" y="66" className="di-venn-n">{regions.AB}</text>
        <text x="86" y="126" className="di-venn-n">{regions.AC}</text>
        <text x="154" y="126" className="di-venn-n">{regions.BC}</text>
        <text x="120" y="106" className="di-venn-n di-venn-n--all">{regions.ABC}</text>
        {/* set labels */}
        <text x="46" y="40" className="di-venn-lbl">{labels.A}</text>
        <text x="194" y="40" className="di-venn-lbl" textAnchor="end">{labels.B}</text>
        <text x="120" y="212" className="di-venn-lbl" textAnchor="middle">{labels.C}</text>
      </svg>
    </div>
  )
}

/* ------------------------------- Legend ------------------------------- */
function Legend({ series = [] }) {
  return (
    <ul className="di-legend">
      {series.map((s, i) => (
        <li key={i} className="di-legend__item">
          <span className="di-legend__dot" style={{ background: s.color || DI_PALETTE[i % DI_PALETTE.length] }} />
          <span className="di-legend__label">{s.name}</span>
        </li>
      ))}
    </ul>
  )
}

// Render any chart from a `{ type, ... }` descriptor.
export function DIChart({ chart, accent = '#F59E0B' }) {
  if (!chart) return null
  switch (chart.type) {
    case 'bar':
    case 'groupedBar':
      return <DIBar categories={chart.categories} series={chart.series} unit={chart.unit} accent={accent} />
    case 'line':
      return <DILine categories={chart.categories} series={chart.series} unit={chart.unit} accent={accent} />
    case 'pie':
      return <DIPie slices={chart.slices} />
    case 'table':
      return <DITable columns={chart.columns} rows={chart.rows} caption={chart.caption} highlightCol={chart.highlightCol} />
    case 'venn':
      return <DIVenn labels={chart.labels} regions={chart.regions} />
    default:
      return null
  }
}

import { useState } from 'react'

// Standard HTML scaffold for CSS previews — covers most selector types
const CSS_SCAFFOLD = `
<div class="container">
  <h1>Heading 1</h1>
  <h2>Heading 2</h2>
  <p>This is a paragraph with some <span>inline span</span> and <a href="#">a link</a>.</p>
  <div class="box">Box element</div>
  <button class="btn">Button</button>
  <ul><li>List item one</li><li>List item two</li></ul>
  <input type="text" placeholder="Input field" class="input" />
</div>`

export default function LivePreview({ code, subjectType, demoHtml }) {
  const [runKey, setRunKey] = useState(0)
  let doc
  if (subjectType === 'css') {
    const htmlBody = demoHtml || CSS_SCAFFOLD
    doc = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
*{box-sizing:border-box;}
body{margin:0;padding:12px;font-family:sans-serif;font-size:14px;}
${code}
</style></head><body>${htmlBody}</body></html>`
  } else if (subjectType === 'js') {
    const jsBody = demoHtml || ''
    doc = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
  body{margin:0;padding:12px;font-family:sans-serif;font-size:14px;}
  #output{margin-top:8px;}
  #output div{padding:3px 0;border-bottom:1px solid #f3f4f6;font-family:monospace;font-size:13px;color:#1F2937;white-space:pre-wrap;}
  #output .err{color:#EF4444;}
</style>
</head><body>
${jsBody}
<div id="output"></div>
<script>
const _out=document.getElementById('output');
const _log=console.log,_err=console.error,_warn=console.warn;
const _esc=(s)=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const _fmt=(x)=>typeof x==='object'?_esc(JSON.stringify(x,null,2)):_esc(String(x));
console.log=(...a)=>{_out.innerHTML+='<div>'+a.map(_fmt).join(' ')+'</div>';_log(...a);};
console.error=(...a)=>{_out.innerHTML+='<div class="err">'+a.map(_fmt).join(' ')+'</div>';_err(...a);};
console.warn=(...a)=>{_out.innerHTML+='<div style="color:#F59E0B">'+a.map(_fmt).join(' ')+'</div>';_warn(...a);};
window.onerror=(msg)=>{_out.innerHTML+='<div class="err">Error: '+_esc(String(msg))+'</div>';return true;};
${code}
</script></body></html>`
  } else if (subjectType === 'react') {
    const externalImports = [...code.matchAll(/import\s+.*?from\s+['"]([^'"]+)['"]/g)]
      .map(m => m[1])
      .filter(pkg => pkg !== 'react' && pkg !== 'react-dom' && !pkg.startsWith('./') && !pkg.startsWith('../'))
    if (externalImports.length > 0) {
      const pkgList = [...new Set(externalImports)].join(', ')
      doc = `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>body{margin:0;font-family:sans-serif;display:flex;align-items:center;justify-content:center;min-height:100px;background:#F8FAFC;}</style>
</head><body>
<div style="text-align:center;padding:16px;max-width:300px;">
  <div style="font-size:20px;margin-bottom:8px;">📦</div>
  <div style="font-size:13px;font-weight:700;color:#374151;margin-bottom:6px;">Live preview not available</div>
  <div style="font-size:12px;color:#6B7280;margin-bottom:8px;">This example requires npm packages:</div>
  <div style="font-family:monospace;font-size:11px;background:#EFF6FF;color:#1D4ED8;padding:6px 10px;border-radius:6px;border:1px solid #BFDBFE;">
    ${pkgList.split(', ').map(p => `<div>${p}</div>`).join('')}
  </div>
  <div style="font-size:11px;color:#9CA3AF;margin-top:8px;">Study the code above — run it in a real React project</div>
</div>
</body></html>`
    } else {
    let cleanCode = code
      .replace(/import\s+React[^'"]*from\s+['"]react['"]\s*;?\n?/g, '')
      .replace(/import\s+\{([^}]+)\}\s+from\s+['"]react['"]\s*;?\n?/g, (_, names) =>
        names.split(',').map(n => {
          const t = n.trim().replace(/\s+as\s+\w+/, '')
          return `const ${n.trim().split(/\s+as\s+/)[1] || t} = React.${t};`
        }).join('\n') + '\n'
      )
      .replace(/import\s+\{[^}]+\}\s+from\s+['"][^'"]+['"]\s*;?\n?/g, '')
      .replace(/export\s+default\s+/g, '')
      .replace(/export\s+/g, '')

    const HOOKS = ['useState','useEffect','useRef','useCallback','useMemo',
                   'useContext','useReducer','useLayoutEffect','useId','useTransition']
    const hookDecls = HOOKS
      .filter(h => {
        const used = new RegExp(`\\b${h}\\s*\\(`).test(cleanCode)
        const declared = new RegExp(`(React\\.${h}|const\\s+${h}\\s*=)`).test(cleanCode)
        return used && !declared
      })
      .map(h => `const ${h} = React.${h};`)
      .join('\n')
    if (hookDecls) cleanCode = hookDecls + '\n' + cleanCode

    const allDefs  = [...cleanCode.matchAll(/(?:function|const|class)\s+([A-Z][A-Za-z0-9]*)/g)]
    const usedAsJsx = new Set([...cleanCode.matchAll(/<([A-Z][A-Za-z0-9]*)/g)].map(m => m[1]))
    const rootMatch = allDefs.filter(m => !usedAsJsx.has(m[1])).pop() || allDefs.pop()
    const rootComponent = rootMatch ? rootMatch[1] : 'App'

    const extraHtml = demoHtml || ''
    doc = `<!DOCTYPE html><html><head>
<meta charset="utf-8">
<script src="https://unpkg.com/react@18/umd/react.development.js"><\/script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"><\/script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"><\/script>
<style>
*{box-sizing:border-box;}
body{margin:0;padding:12px;font-family:sans-serif;font-size:14px;line-height:1.5;}
button{cursor:pointer;}
input,select,textarea{font-family:inherit;}
</style>
</head><body>
${extraHtml}
<div id="root"></div>
<script type="text/babel">
${cleanCode}

try {
  const _rootEl = document.getElementById('root');
  ReactDOM.createRoot(_rootEl).render(React.createElement(${rootComponent}));
} catch(e) {
  const _escMsg = String(e.message).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  document.getElementById('root').innerHTML = '<div style="color:#EF4444;font-family:monospace;font-size:12px;padding:8px;background:#FEF2F2;border-radius:4px;">Error: ' + _escMsg + '</div>';
}
<\/script>
</body></html>`
    }
  } else {
    doc = code.toLowerCase().includes('<html')
      ? code
      : `<!DOCTYPE html><html><head><meta charset="utf-8"><style>*{box-sizing:border-box;}body{margin:0;padding:12px;font-family:sans-serif;font-size:14px;}</style></head><body>${code}</body></html>`
  }

  return (
    <div style={{ margin: '0 0.75rem 0.5rem', borderRadius: 6, overflow: 'hidden', border: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.3rem 0.75rem', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22C55E' }} />
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', color: 'var(--text-muted)', marginLeft: '0.25rem', letterSpacing: '0.06em' }}>LIVE PREVIEW</span>
        {runKey > 0 && (
          <button
            onClick={() => setRunKey(k => k + 1)}
            style={{ marginLeft: 'auto', padding: '2px 10px', fontSize: '0.62rem', fontWeight: 700, background: 'transparent', color: '#22C55E', border: '1px solid #22C55E', borderRadius: 4, cursor: 'pointer', letterSpacing: '0.05em', fontFamily: "'Share Tech Mono', monospace" }}
          >↺ RERUN</button>
        )}
      </div>
      {runKey > 0 ? (
        <iframe
          key={runKey}
          srcDoc={doc}
          sandbox="allow-scripts allow-same-origin"
          style={{ width: '100%', height: 220, border: 'none', background: '#fff', display: 'block' }}
          title="live-preview"
        />
      ) : (
        <div
          onClick={() => setRunKey(1)}
          style={{ width: '100%', height: 220, background: 'var(--bg-secondary)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, cursor: 'pointer' }}
        >
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#22C55E', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '1.2rem', marginLeft: 3 }}>▶</span>
          </div>
          <span style={{ fontSize: '0.75rem', fontFamily: "'Share Tech Mono', monospace", color: 'var(--text-muted)' }}>Click to run preview</span>
        </div>
      )}
    </div>
  )
}

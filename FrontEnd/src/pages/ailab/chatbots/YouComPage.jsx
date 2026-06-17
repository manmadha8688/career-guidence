import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#6366F1'

export default function YouComPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(0,217,255,0.09)' : 'rgba(79,70,229,0.11)'
  const txt   = dark ? '#E2E8F0' : '#0F172A'
  const sub   = dark ? '#94A3B8' : '#475569'
  const muted = dark ? '#64748B' : '#94A3B8'

  return (
    <div style={{ minHeight: '100vh', background: bg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse, ${color}07 0%, transparent 65%)`, filter: 'blur(60px)' }} />
      </div>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: dark ? 'rgba(2,8,23,0.93)' : 'rgba(240,244,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${border}` }}>
        <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.1em', color: CYAN, padding: 0 }}>
          <ArrowLeft size={14} /> AI Lab
        </button>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Chatbots</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🌐</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>You.com — AI Search That Cites Every Source</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Research, write, and code with multiple AI models in one privacy-first platform</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE TIER', '#4ADE80'], ['you.com', color], ['Multi-model AI', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>You.com is an AI-powered search engine and productivity platform that combines real-time web search with conversational AI. Founded in 2020 by Richard Socher (former Chief Scientist at Salesforce), it is built around one idea: instead of giving you ten links, it reads multiple sources, synthesizes the answer, and shows you numbered citations you can verify. The difference from Perplexity: You.com is a full platform — it also gives you access to GPT-4o, Claude, Gemini, and Llama 3 in one place, plus AI writing tools and image generation. Students on a tight budget get significant value from the free tier, and the YouPro Education plan at $6.99/month (with a school email) unlocks everything including all premium models.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'How To Use You.com (2025) - AI Productivity', url: 'https://www.youtube.com/watch?v=b7-WSLwZTjw', dur: '~10 min', note: 'Best 2025 overview' },
            { label: 'You.com Tutorial - The Next Google Search Killer is Here!', url: 'https://www.youtube.com/watch?v=bqvWwadYbvo', dur: '', note: 'Complete feature walkthrough' },
            { label: "You Won't Believe What This AI Search Engine Can Do! (You.com)", url: 'https://www.youtube.com/watch?v=tJ8G6kuAf8k', dur: '', note: 'Practical use cases demo' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Four AI modes */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Four AI modes" color={color} />
          <InfoBox color={color} dark={dark}>You.com's key feature is its four AI modes — each suited for a different type of task. Choosing the right mode before you ask your question significantly improves the quality of the answer.</InfoBox>
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Smart Mode', badge: 'Default — everyday use', body: 'Quick, accurate answers with live web access and citations. Handles the majority of questions: topic explanations, quick facts, comparisons, news. Fastest response time. Use this 80% of the time.' },
            { label: 'Research Mode', badge: 'Deep multi-source analysis', body: 'Searches many sources, synthesizes them into a comprehensive cited answer. Best for: writing essays, literature reviews, fact-checking claims, understanding a complex topic from multiple angles. Slower but thorough.' },
            { label: 'Genius Mode', badge: 'Complex reasoning (Pro)', body: 'Multi-step reasoning, code generation, data visualization, and file analysis. Equivalent to asking a capable analyst with a PhD. Best for: hard programming problems, data interpretation, multi-step research questions.' },
            { label: 'Create Mode', badge: 'Image generation', body: 'AI image generation in multiple styles. Free: 10 images/day. Pro: unlimited. Built-in, no separate tool needed.' },
          ]} />
        </Block>

        {/* Multi-model access */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Multi-model access" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'GPT-4o', desc: "OpenAI's flagship — strong across all tasks. Available on You.com Pro without paying OpenAI separately." },
            { name: 'Claude 3.5 Sonnet', desc: "Anthropic's best reasoning model — excellent for long documents, code review, and nuanced analysis." },
            { name: 'Gemini 1.5 Pro', desc: "Google's model — 1M token context, strong on multimodal tasks and factual questions." },
            { name: 'Llama 3 (Meta)', desc: 'Open-source model — available free on You.com. Strong for general tasks without API cost.' },
            { name: 'YouChat (native)', desc: "You.com's own model with real-time web access. Fast, cited, and always current. Default for Smart Mode." },
            { name: 'Switch per conversation', desc: 'Change model mid-session. Compare how different models handle the same prompt without switching tabs or platforms.' },
          ]} />
        </Block>

        {/* You.com vs Perplexity vs ChatGPT */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="You.com vs Perplexity vs ChatGPT" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'You.com', badge: 'Best for: research + multi-model + writing', body: 'One platform for search, multiple AI models, writing tools, and image generation. Strong citations. Privacy-first (no tracking, no ads). Education plan at $6.99/month unlocks everything. Best when you want a complete AI workspace without multiple subscriptions.' },
            { label: 'Perplexity AI', badge: 'Best for: pure research citations', body: 'Sharper, cleaner research interface. Better citation UI, Focus modes (Academic, Reddit, YouTube). Faster for getting a quick cited answer on a specific question. Less feature breadth than You.com.' },
            { label: 'ChatGPT', badge: 'Best for: deep conversation + creativity', body: 'Better for long-form creative writing, roleplay, complex multi-turn conversations, and Code Interpreter (data analysis). More powerful customization (Custom GPTs). Higher quality on tasks where web search is not needed.' },
          ]} />
        </Block>

        {/* For students specifically */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="For students specifically" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Research Mode for essays and papers', body: 'Use Research Mode when writing academic content. It synthesizes multiple sources and provides numbered citations. Paste the citations into your notes, verify each one, and you have a properly sourced starting point — faster than manually reading 10 articles.' },
            { n: '2', title: 'Genius Mode for coding problems', body: 'For complex programming problems that require multi-step thinking: use Genius Mode with Claude or GPT-4o. It can run through the logic, generate code, explain it step by step, and help you debug — all in one conversation.' },
            { n: '3', title: 'YouPro Education plan — $6.99/month', body: 'If you have a school email (.edu or college domain): check you.com/support for the Education plan. Full access to all premium models (GPT-4o, Claude, Gemini) for $6.99/month — more than 50% off regular pricing. Worth it if you use AI tools daily.' },
            { n: '4', title: 'Private mode for sensitive research', body: 'You.com does not track your queries or sell your data. For research on sensitive personal or academic topics, this matters. Private mode stores no query history.' },
            { n: '5', title: 'Source control for targeted research', body: 'Constrain searches to specific domains — academic sites only, specific news outlets, official documentation. This narrows results to authoritative sources and reduces the chance of picking up misinformation from low-quality sites.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Research any topic with multi-source cited answers — without manually checking 10 browser tabs',
            'Access GPT-4o, Claude 3.5 Sonnet, and Gemini 1.5 Pro in one place without separate subscriptions',
            'Use Research Mode to generate properly cited source lists as starting points for essays and papers',
            'Generate AI images for presentations and projects without leaving the platform',
            'Get the full platform at student pricing ($6.99/month with school email) vs. paying separately for multiple AI tools',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Compare AI Modes on Your Next Assignment</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Take a real assignment or research question you currently have. Run it through all four You.com modes: Smart, Research, Genius (if Pro), and see how the answers differ. Then take the Research Mode answer and verify 3 of the citations — open each source and confirm the claim is actually in the article. This teaches both how to use You.com effectively and why citation verification matters regardless of which AI tool you use.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Pick a real question from your coursework', body: 'Not a test question — a real topic you need to understand or write about. Generic questions produce generic insights. Your actual coursework question will show you where You.com adds genuine value vs. a basic Google search.' },
            { n: '2', title: 'Run Smart Mode first', body: 'Start with Smart Mode. Read the answer. How complete is it? Are the citations credible? Note what it got right and what felt incomplete.' },
            { n: '3', title: 'Run Research Mode on the same question', body: 'Switch to Research Mode. Same question. Compare: is the answer longer? More citations? Different sources? Does it cover aspects Smart Mode missed? Research Mode should produce a significantly more comprehensive answer.' },
            { n: '4', title: 'Verify 3 citations', body: 'Click on 3 of the numbered citations. Does the source actually say what You.com attributed to it? Is the source credible (academic, established publication, official site)? This verification habit applies to every AI tool — not just You.com.' },
          ]} />
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>You.com's Research Mode is most powerful when you give it a specific, focused question rather than a broad topic. "What are the main causes of the 2008 financial crisis?" will produce a better cited answer than "tell me about the 2008 financial crisis." Specific questions produce specific, verifiable citations. Broad questions produce broad, harder-to-verify summaries.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/chatbots/notebooklm')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> NotebookLM
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/chatbots/huggingchat')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            HuggingChat <ChevronRight size={14} />
          </button>
        </div>

      </div>
      <ScrollToTop />
    </div>
  )
}

function Block({ title, titleColor, dark, border, card, children }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '1.375rem', backdropFilter: 'blur(8px)', marginBottom: '1.25rem' }}>
      {title && <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.14em', color: titleColor, textTransform: 'uppercase', paddingBottom: '0.75rem', marginBottom: '1rem', borderBottom: `1px solid ${titleColor}20` }}>{title}</div>}
      {children}
    </div>
  )
}

function VideoCard({ v, dark, txt, muted }) {
  return (
    <a href={v.url} target="_blank" rel="noopener noreferrer"
      style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1.125rem', borderRadius: 11, textDecoration: 'none', background: dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.16)', marginBottom: '0.625rem', transition: 'background 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.09)'}
      onMouseLeave={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)'}
    >
      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Play size={13} color="#fff" fill="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: txt }}>{v.label}</div>
        {(v.dur || v.note) && <div style={{ fontSize: '0.7rem', color: muted, marginTop: 2 }}>{[v.dur, v.note].filter(Boolean).join(' · ')}</div>}
      </div>
      <ExternalLink size={12} color={muted} />
    </a>
  )
}

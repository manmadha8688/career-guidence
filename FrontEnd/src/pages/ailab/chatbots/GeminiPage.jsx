import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#8B5CF6'

export default function GeminiPage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>✨</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Gemini — Google's AI with Real-Time Knowledge</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Search-integrated AI that knows what happened yesterday</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['Gemini 1.5 Flash free', color], ['Google', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Gemini is Google's answer to ChatGPT, and its biggest advantage is obvious: Google built the world's most powerful search engine before building this AI. Gemini has real-time access to the web, can search Google, and pulls in current information by default. When someone asks about a news event from last week, a newly released package version, or today's job market — Gemini answers from live search results, not from training data that's months old. It also integrates deeply with Google's ecosystem: Gmail, Drive, Docs, Sheets, Slides. If you already live in Google's tools, Gemini is the AI that works with your actual files. For students, Gemini's web grounding and Google Workspace integration make it uniquely useful for research and document work.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Google Gemini Tutorial — Complete Guide for Beginners', url: 'https://www.youtube.com/watch?v=Q2SLQfgGEoA', dur: '14 min', note: 'Full walkthrough of Gemini features' },
            { label: 'Gemini Advanced vs ChatGPT Plus — Full Comparison', url: 'https://www.youtube.com/watch?v=90LIZdFLh9U', dur: '12 min', note: 'Honest side-by-side comparison' },
            { label: 'Gemini in Google Workspace — Docs, Gmail, Sheets', url: 'https://www.youtube.com/watch?v=3DHEzWNKgik', dur: '10 min', note: "How to use Gemini inside Google's tools" },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What sets Gemini apart */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What sets Gemini apart" color={color} />
          <InfoBox color={color} dark={dark}>Gemini's core differentiator is real-time web grounding. Every response can pull from live Google Search results. This is not "browsing the web" as an optional feature — it is the default. Gemini answers questions about current events, recent releases, live prices, and breaking news accurately because it searches as it responds.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>Gemini is also natively multimodal — trained simultaneously on text, images, audio, and video, not retrofitted for vision after the fact. You can upload images and have genuine visual analysis, upload PDFs and ask questions, or paste a YouTube URL and have Gemini analyze the video. In Google Workspace, Gemini can read your Gmail, summarize your Drive files, and draft Docs — all without you copying and pasting anything.</p>
        </Block>

        {/* Gemini model tiers */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Gemini model tiers" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Gemini 1.5 Flash', badge: 'Free, very fast', body: "Google's fastest model. Best for quick questions, summarization, basic research. Free with no rate limits for most use. Excellent for students doing high-volume question-answering or research tasks." },
            { label: 'Gemini 1.5 Pro', badge: 'Free with limits, most capable', body: "Google's flagship model. Handles complex reasoning, detailed analysis, and long documents (1M token context window). Free tier has usage limits. The go-to for serious tasks — code review, research synthesis, long document analysis." },
            { label: 'Gemini Advanced (Google One AI Premium)', badge: '$20/month', body: 'Access to Gemini Ultra, the most powerful model. Also includes Gemini in all Google Workspace apps, extended context, and better image generation. Worth it if you heavily use Google Docs/Gmail and want AI integrated directly.' },
          ]} />
        </Block>

        {/* Gemini's strongest use cases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Gemini's strongest use cases" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Real-time research', desc: "Ask about recent tech releases, current job market trends, latest library versions, today's news. Gemini searches Google and cites sources. Far superior to ChatGPT free for anything time-sensitive." },
            { name: 'Google Workspace integration', desc: 'Gemini in Gmail summarizes email threads, drafts replies, and searches your inbox. In Docs it writes and edits. In Sheets it analyzes data. All using your actual files — no copy-paste needed.' },
            { name: 'YouTube video analysis', desc: 'Paste any YouTube URL. Ask Gemini to summarize the video, extract key points, or explain specific sections. Works because Google owns YouTube — no other AI model has this natively.' },
            { name: 'Google Drive document chat', desc: "Connect Google Drive. Ask questions about files you own. 'What was the main conclusion in the report I uploaded last month?' works without you finding and opening the file." },
            { name: 'Image and document analysis', desc: 'Upload photos of handwritten notes, whiteboards, screenshots, or diagrams. Gemini reads and analyzes visual content with strong accuracy — useful for understanding photos of textbook problems.' },
            { name: 'Multilingual capability', desc: "Strong performance in Indian languages including Hindi, Tamil, Telugu, Bengali. Google's multilingual training data is extensive. Better than most models for Indian language queries and translation." },
          ]} />
        </Block>

        {/* Using Gemini for research */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Using Gemini for research" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: "Let Gemini search, don't pre-research", body: "Ask your question directly. Gemini will search Google and give you a grounded answer with citations. Check the 'Google it' sources shown below responses for verification." },
            { n: '2', title: 'Use Gemini in Google Docs', body: 'Open a Google Doc. Click the Gemini icon. Ask it to write, expand, or summarize directly in your document. Combine AI drafting with your own editing — never paste between tools.' },
            { n: '3', title: 'Analyze YouTube lectures', body: 'Find a relevant lecture on YouTube. Paste the URL into Gemini. Ask for a structured summary with key concepts. More efficient than watching 45 minutes to find the 5 minutes that matter.' },
            { n: '4', title: 'Research current tools and technologies', body: "Ask 'What is the current state of X technology? What are people saying about it in 2025?' Gemini finds recent blog posts, discussions, and documentation — not outdated training data." },
            { n: '5', title: 'Cross-reference claims', body: "When reading something important, paste the claim into Gemini and ask 'is this accurate and what does current evidence say?'. The web grounding helps verify factual claims with live sources." },
          ]} />
        </Block>

        {/* Gemini vs ChatGPT vs Claude */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Gemini vs ChatGPT vs Claude" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Real-time information', badge: 'Gemini wins clearly', body: 'Gemini searches Google by default. ChatGPT free: knowledge cutoff, no browsing. Claude: no web browsing. For anything requiring current information, Gemini is the right tool.' },
            { label: 'Google Workspace integration', badge: 'Gemini wins', body: "Gemini works directly inside Gmail, Docs, Sheets, Slides, and Drive. No other AI model integrates with Google's tools this deeply. If your study and work life is in Google's ecosystem, this is a major advantage." },
            { label: 'Pure reasoning and coding', badge: 'ChatGPT/Claude often better', body: "For complex multi-step reasoning, debugging difficult code, or nuanced analysis not requiring current information, Claude 3.5 Sonnet and GPT-4o often outperform Gemini. Gemini's strength is breadth and integration, not depth of reasoning." },
            { label: 'Context window', badge: 'Gemini Pro wins', body: 'Gemini 1.5 Pro has a 1 million token context window — the largest of any major model. This is experimental but means it can theoretically handle entire codebases or book-length documents in one conversation.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Research any topic with live, cited web sources — not stale training data',
            'Ask about recent events, new software releases, and current job market information accurately',
            'Analyze YouTube lecture videos by pasting the URL and asking for summaries',
            'Work with Google Drive files, Gmail threads, and Google Docs using natural language',
            'Use Gemini in Indian languages for queries, translations, or multilingual content',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Current Tech Research Report</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Use Gemini to research a technology you want to learn this year. Ask Gemini: 'What is the current state of [technology] in 2025? What are its main use cases, who is hiring for it, and what should someone learn to get started?' Ask three follow-up questions about areas you don't understand. Then compare the same question in ChatGPT free tier. Document: which tool gave more accurate, more current, and more useful information and why.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Pick your technology', body: 'Choose something relevant to your learning goals — React, Python, Django, machine learning, cloud computing. Pick something you actually plan to learn.' },
            { n: '2', title: 'Research with Gemini', body: 'Ask the broad research question. Let Gemini search and respond. Check the cited sources. Ask 3 follow-up questions based on the response.' },
            { n: '3', title: 'Compare with ChatGPT', body: 'Ask the same initial question in ChatGPT free. Compare: does it mention recent developments? Does it cite sources? Is it as current?' },
            { n: '4', title: 'Save what you learned', body: "Export or copy Gemini's response. This becomes your research document for starting to learn that technology." },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Gemini free tier, sign in with your Google account</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Gemini's YouTube analysis is a hidden gem. When you find a long conference talk, tech tutorial, or lecture that looks relevant, don't watch the whole thing first. Paste the URL into Gemini and ask 'What are the 5 most important points in this video and at what timestamps?' This saves hours of research time by letting you jump directly to the relevant parts.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/chatbots/claude')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Claude
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/chatbots/perplexity')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Perplexity <ChevronRight size={14} />
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

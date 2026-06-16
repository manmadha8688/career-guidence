import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#8B5CF6'

export default function ClaudePage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🧠</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Claude — The AI That Thinks Before It Speaks</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Anthropic's thoughtful, safety-focused AI assistant</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE TIER', '#4ADE80'], ['claude.ai free', color], ['Anthropic', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Claude is Anthropic's AI assistant, built with a different philosophy than ChatGPT. While OpenAI optimized for capability, Anthropic built Claude with constitutional AI training — a method designed to make the model genuinely helpful, harmless, and honest rather than just impressive. In practice this means Claude is exceptionally good at nuanced reasoning, handling ambiguous instructions, writing long-form content, and admitting uncertainty rather than hallucinating. For students doing deep work — understanding complex topics, writing thoughtful essays, analyzing code architecture — Claude often outperforms ChatGPT on tasks requiring sustained reasoning over long contexts. Claude 3.5 Sonnet is currently free on claude.ai and is one of the best models available at any price point.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Claude AI Tutorial — Complete Beginner\'s Guide', url: 'https://www.youtube.com/watch?v=Bkk4z8BIklM', dur: '12 min', note: 'Start here for a full walkthrough' },
            { label: 'Claude vs ChatGPT — Which is Actually Better?', url: 'https://www.youtube.com/watch?v=wM4nHQJAjW0', dur: '10 min', note: 'Honest comparison of both tools' },
            { label: 'Claude\'s 200K Context Window Explained', url: 'https://www.youtube.com/watch?v=2kFhloXNlF8', dur: '8 min', note: 'How the long context makes Claude different' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What makes Claude different */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What makes Claude different" color={color} />
          <InfoBox color={color} dark={dark}>Claude was trained using Constitutional AI — a method where the model is given a set of principles and trained to critique and revise its own outputs against those principles. The result is a model that reasons about its responses, not just predicts tokens. It tends to be more honest about what it doesn't know and more careful about potentially harmful outputs.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The most practically useful difference is Claude's context window. Claude 3.5 Sonnet can handle 200,000 tokens — roughly 150,000 words — in a single conversation. This means you can paste an entire codebase, a full research paper, a legal document, or a book chapter and have a real conversation about all of it at once. Most other models including GPT-4o have context windows of 8k-128k tokens by comparison.</p>
        </Block>

        {/* Claude model lineup */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Claude model lineup" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Claude 3 Haiku', badge: 'Fastest, free via API', body: 'Smallest and fastest model. Best for: simple questions, high-volume API use, quick lookups. Available on the free API tier. Not as capable for complex reasoning but very fast.' },
            { label: 'Claude 3.5 Sonnet', badge: 'Best overall, free on claude.ai', body: 'The sweet spot model — exceptional reasoning, coding, and writing at fast response speeds. Free on claude.ai. This is what most people should use. Regularly outperforms GPT-4o on coding and instruction-following benchmarks.' },
            { label: 'Claude 3 Opus', badge: 'Most powerful, API only', body: 'Anthropic\'s most capable model for complex multi-step reasoning, nuanced analysis, and difficult tasks. Available via API (paid). Slower and more expensive but highest quality for demanding tasks.' },
          ]} />
        </Block>

        {/* Where Claude genuinely excels */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Where Claude genuinely excels" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Long document analysis', desc: 'Paste an entire PDF, codebase, or lengthy report. Ask questions about any section. Claude maintains coherent understanding across the full 200K context — it doesn\'t lose track of earlier content.' },
            { name: 'Nuanced writing', desc: 'Claude writes with more natural voice than most models. It follows stylistic instructions precisely, maintains tone consistency across long documents, and produces less generic-sounding output.' },
            { name: 'Code review & architecture', desc: 'Paste an entire project and ask for architectural feedback. Claude reasons about code structure, identifies patterns, suggests improvements — not just surface-level syntax fixes.' },
            { name: 'Honest uncertainty', desc: 'Claude explicitly says \'I\'m not sure about this\' rather than fabricating a confident answer. For learning purposes, a model that admits gaps is more trustworthy than one that never shows doubt.' },
            { name: 'Following complex instructions', desc: '\'Write a summary that is under 200 words, uses no jargon, ends with a question, and avoids the word important\' — Claude follows all constraints without dropping any.' },
            { name: 'Summarization at scale', desc: 'Summarizing books, research papers, legal documents, or long codebases in a single conversation. The long context means it reads the whole thing rather than a fragment.' },
          ]} />
        </Block>

        {/* How to use Claude effectively */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How to use Claude effectively" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Upload documents directly', body: 'claude.ai supports file uploads — PDFs, Word docs, code files, text files. Upload your study material and have a conversation about it rather than copy-pasting.' },
            { n: '2', title: 'Use Projects for persistent context', body: 'Claude Projects let you store instructions and documents that persist across conversations. Create a project for each subject you\'re studying and add your notes and syllabus — Claude remembers your context every session.' },
            { n: '3', title: 'Ask for reasoning, not just answers', body: 'Add \'explain your reasoning step by step\' or \'think through this before answering\'. Claude\'s extended thinking produces noticeably more accurate answers on complex problems.' },
            { n: '4', title: 'Request multiple approaches', body: '\'Give me three different ways to approach this problem, with tradeoffs for each\' gets you more useful output than asking for a single answer. Claude excels at structured comparison.' },
            { n: '5', title: 'Iterate on tone and format', body: 'Claude follows format instructions very precisely. \'Rewrite this more concisely\', \'make this more formal\', \'format this as a table\' all work reliably. Combine format + content instructions in one request.' },
          ]} />
        </Block>

        {/* Claude vs ChatGPT practical differences */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Claude vs ChatGPT — practical differences" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Context window', badge: 'Claude wins', body: 'Claude 3.5 Sonnet: 200K tokens. ChatGPT-4o: 128K tokens. GPT-4o mini (free): 8K tokens. For pasting large documents or codebases, Claude handles significantly more at once. This is the biggest practical difference.' },
            { label: 'Coding tasks', badge: 'Roughly equal, Claude slightly ahead', body: 'Claude 3.5 Sonnet and GPT-4o perform similarly on coding. Claude tends to write cleaner code with better explanations. GPT-4o has Code Interpreter (code execution) which Claude lacks on the web UI.' },
            { label: 'Web browsing', badge: 'ChatGPT Plus wins', body: 'ChatGPT Plus can browse the web for current information. Claude on claude.ai does not browse. For research requiring current information, ChatGPT Plus or Perplexity is better.' },
            { label: 'Free tier quality', badge: 'Claude wins', body: 'Claude\'s free tier gives you Claude 3.5 Sonnet — one of the best models available. ChatGPT\'s free tier gives you GPT-4o mini, which is good but clearly less capable. For free use, Claude provides significantly more value.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Paste entire codebases and get architectural feedback that considers the full project context',
            'Analyze full research papers, legal documents, or books in a single conversation without losing context',
            'Write long-form content — essays, reports, proposals — with consistent tone and precise format control',
            'Use Claude Projects to maintain persistent context across all your study sessions for a subject',
            'Get reliable step-by-step reasoning for complex problems with honest uncertainty when Claude doesn\'t know',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Long Context Challenge</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Test what Claude's 200K context can do that ChatGPT cannot. Find a long document: a textbook chapter, a research paper PDF, a large codebase you're working on, or a lengthy article. Upload it to claude.ai. Ask 10 questions that require understanding content from different parts of the document. Then try the same with ChatGPT free tier on the same document. Note where each model loses context, gives wrong answers, or handles the full document well. This will show you the real-world value of context window size.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Find a large document', body: 'Aim for something 20-50 pages or a codebase with several files. Research papers, textbook PDFs, or a project you\'re working on all work well.' },
            { n: '2', title: 'Upload to Claude', body: 'Go to claude.ai → New conversation → paperclip icon to attach file. Upload the document.' },
            { n: '3', title: 'Ask cross-document questions', body: 'Ask questions that specifically require information from different sections: \'What is the connection between the concept introduced in section 2 and the example used in section 5?\'' },
            { n: '4', title: 'Compare with ChatGPT', body: 'Paste the same document into ChatGPT (free). Ask the same questions. Notice where it says the document is too long, loses context, or gives answers that contradict the actual content.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Claude free tier on claude.ai, no payment required</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Claude's Projects feature is underused by students. Create one project per subject. Add your syllabus, your own notes, and any reference documents. Now every conversation in that project starts with Claude already knowing your context, your level, and your specific material. This is dramatically more effective than starting fresh every time.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/chatbots/chatgpt')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> ChatGPT
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/chatbots/gemini')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Gemini <ChevronRight size={14} />
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

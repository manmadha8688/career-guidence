import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#8B5CF6'

export default function ChatGPTPage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🤖</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>ChatGPT — Your First AI Conversation Partner</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>OpenAI's conversational AI that changed everything</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE TIER', '#4ADE80'], ['GPT-4o mini free', color], ['ChatGPT', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>ChatGPT was released in November 2022 and became the fastest product to reach 100 million users in history — two months. Before ChatGPT, AI was mostly invisible infrastructure powering search suggestions and spam filters. ChatGPT was the first AI that let anyone have a real conversation with a machine — no coding, no technical knowledge required. It demonstrated that language models could explain code, write essays, debug programs, summarize documents, and reason through problems in a way that felt genuinely useful. Whether you use ChatGPT for 5 minutes or 5 hours a day, understanding how to use it well separates people who get generic results from people who use it as a genuine thinking partner.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'ChatGPT Tutorial for Beginners — Dave\'s Tech Rescue', url: 'https://www.youtube.com/watch?v=JTxsNm9IdYU', dur: '15 min', note: 'Start here if you are completely new' },
            { label: 'ChatGPT Complete Guide — How to Use ChatGPT', url: 'https://www.youtube.com/watch?v=AXn2XVLf7d0', dur: '22 min', note: 'Covers all major use cases and features' },
            { label: 'ChatGPT Prompt Engineering — Build Better Prompts', url: 'https://www.youtube.com/watch?v=_ZvnD73m40o', dur: '10 min', note: 'How to get dramatically better results' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What ChatGPT actually is */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What ChatGPT actually is" color={color} />
          <InfoBox color={color} dark={dark}>ChatGPT is a chat interface on top of a large language model. The "GPT" stands for Generative Pre-trained Transformer — a neural network architecture trained on a large portion of the internet's text. The model predicts the most likely next token given everything before it. The surprising result: doing this at scale produces a system that can reason, explain, and converse.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>ChatGPT the product (what you use at chat.openai.com) is not the same as GPT-4 the model. ChatGPT is the interface — the website, the conversation history, the file uploads, the plugins. The GPT models are the underlying intelligence. This distinction matters because the same GPT-4o model is also accessible via API, Claude Code, and third-party apps — the model is the core, the interface is just a wrapper.</p>
        </Block>

        {/* Free vs paid */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Free vs paid — what you actually get" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Free tier — GPT-4o mini', badge: 'Always available', body: 'GPT-4o mini is genuinely capable for most everyday tasks: answering questions, writing drafts, explaining concepts, basic coding help. The limitation is rate limits during high traffic and no access to GPT-4o or advanced features. For learning and most student use cases, the free tier is sufficient.' },
            { label: 'ChatGPT Plus — $20/month', badge: 'Worth it for heavy use', body: 'Access to GPT-4o (significantly better reasoning), DALL-E image generation, data analysis with Code Interpreter, browsing the web, creating custom GPTs, and higher rate limits. If you find yourself hitting rate limits or need image analysis, Plus is the upgrade.' },
            { label: 'ChatGPT Team/Enterprise', badge: 'For organizations', body: 'Team workspaces, no training on your data, custom GPTs shared across team, admin controls. Only relevant if a company is providing it to you.' },
          ]} />
        </Block>

        {/* Core capabilities */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core capabilities" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Writing & editing', desc: 'Drafts emails, reports, essays. Rewrites at different reading levels. Suggests improvements to clarity, tone, structure. Provides feedback on your writing.' },
            { name: 'Code help', desc: 'Explains any code in plain English. Writes code in 20+ languages. Debugs errors. Converts between languages. Does not replace understanding — use it to learn, not just copy.' },
            { name: 'Data analysis (Plus)', desc: 'Upload a CSV and ask questions in plain English. Generates charts. Writes and executes Python analysis code. The Code Interpreter feature is genuinely powerful for non-programmers.' },
            { name: 'Research & summarization', desc: 'Summarizes long documents. Explains complex topics at different levels. Browses the web for current information (Plus). Good for building a fast mental model of something new.' },
            { name: 'Brainstorming', desc: 'Generates lists of ideas, names, approaches. Plays devil\'s advocate. Helps think through tradeoffs. More useful than Google for \'what are my options\' type questions.' },
            { name: 'Custom GPTs', desc: 'The GPT store has thousands of specialized GPTs pre-configured for specific tasks — coding, writing, research, languages. Many are free to use even on the free tier.' },
          ]} />
        </Block>

        {/* How to get dramatically better results */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How to get dramatically better results" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Give it a role', body: 'Start with \'You are an expert [X]\' to shift the tone and depth. \'You are a senior Python developer\' gets you more technical, precise code help than just asking about code.' },
            { n: '2', title: 'Provide context', body: 'ChatGPT has no memory of who you are. State your level, goal, and constraints in the first message: \'I am a second-year CS student who just learned about sorting algorithms. Explain merge sort in a way that builds on what I already know about bubble sort.\'' },
            { n: '3', title: 'Be specific about format', body: '\'Explain X\' gets you a wall of text. \'Explain X in 5 bullet points\' or \'Explain X with a code example\' gives you something more useful. The model follows format instructions precisely.' },
            { n: '4', title: 'Iterate, don\'t start over', body: 'If the response is not quite right, follow up: \'Make that shorter\', \'Give me a simpler explanation\', \'Now add error handling to that code\'. Each follow-up costs nothing and significantly improves results.' },
            { n: '5', title: 'Use Custom GPTs for specific tasks', body: 'Browse the GPT Store. For coding: Grimoire. For research: Scholar AI. For resume: Resume Builder. Specialized GPTs have better instructions for their domain than a generic chat session.' },
          ]} />
        </Block>

        {/* What ChatGPT cannot do reliably */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What ChatGPT cannot do reliably" color="#EF4444" />
          <Compare dark={dark} border={border} color="#EF4444" items={[
            { label: 'Real-time information', badge: 'Free tier limitation', body: 'Training data has a cutoff. GPT-4o mini on the free tier does not browse the web. For current prices, recent news, or live data, use Perplexity or ChatGPT Plus with browsing enabled. Asking ChatGPT for recent events on the free tier gives you confidently wrong answers.' },
            { label: 'Complex multi-step math', badge: 'Known weakness', body: 'Language models predict tokens — they are not calculators. For anything beyond simple arithmetic, use Wolfram Alpha or Python via Code Interpreter. ChatGPT can make arithmetic errors while being confidently fluent about the surrounding explanation.' },
            { label: 'Factual recall on obscure topics', badge: 'Hallucination risk', body: 'ChatGPT can hallucinate specific details — paper titles, author names, dates, statistics — that sound correct but are fabricated. Always verify specific factual claims from a primary source before using them in work that matters.' },
            { label: 'Private or sensitive work', badge: 'Privacy consideration', body: 'Your conversations are used to improve the model unless you disable this in settings. Do not paste code, documents, or personal information you need to remain private into the free tier.' },
          ]} />
        </Block>

        {/* Practical use patterns for students */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Practical use patterns for students" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Debug your code', body: 'Paste the error message AND the relevant code. Do not ask \'why isn\'t my code working\' without showing the code. The more context you provide, the more specific the help.' },
            { n: '2', title: 'Explain things you don\'t understand', body: '\'Explain this concept like I\'m someone who already understands loops but has never seen recursion\' is vastly better than \'explain recursion\'. Reference your existing knowledge level.' },
            { n: '3', title: 'Review your own writing', body: 'Paste your essay draft and ask \'What is the weakest argument here?\' or \'What would someone who disagrees say?\'. Using it as an adversarial reviewer surfaces problems you missed.' },
            { n: '4', title: 'Interview preparation', body: '\'You are a technical interviewer at a software company. Ask me a series of questions about data structures and give feedback on my answers.\' Full mock interview sessions with instant feedback.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Have meaningful, productive conversations with an AI to accelerate learning on any topic',
            'Debug code in any language by pasting errors and getting specific explanations',
            'Draft and improve written work: emails, reports, applications, cover letters',
            'Analyze uploaded data files in plain English (Plus) without writing any code',
            'Prepare for technical interviews with AI-powered mock sessions',
            'Use specialized Custom GPTs for specific domains — coding, research, language learning, math',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Personal Study Bot</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Configure a custom ChatGPT session for your specific learning needs. In the system prompt (or first message), define: who you are, what you are studying, your current level, and how you want explanations delivered (examples? analogies? code?). Then use it to get explanations for 5 topics you are currently studying. Compare these results to generic prompts without context. Document: which approach produced more useful responses and what context mattered most.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Define your context profile', body: 'Write a single message with: your year, major/goal, current topics, and preferred explanation style. Keep it under 150 words.' },
            { n: '2', title: 'Test with 5 topic questions', body: 'Ask about 5 real concepts you\'re currently studying. Use your context profile each time. Note which responses surprised you with their depth or usefulness.' },
            { n: '3', title: 'Compare without context', body: 'Open a fresh chat (no context). Ask the same 5 questions plainly. Compare response quality.' },
            { n: '4', title: 'Identify what worked', body: 'Which context details produced the biggest improvement? That pattern becomes your personal ChatGPT starting template for future study sessions.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — ChatGPT free tier, no signup required for basic use</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The most common mistake beginners make with ChatGPT is treating it like a search engine — one question, done. ChatGPT is a conversation. The first response is almost never the final one. Follow up, push back, ask for more depth, request a different format. The value compounds across a conversation the way it does not in a one-shot search query.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/foundations/embeddings')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Embeddings
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/chatbots/claude')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Claude <ChevronRight size={14} />
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

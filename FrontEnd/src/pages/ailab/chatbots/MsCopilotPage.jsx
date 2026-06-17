import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#8B5CF6'

export default function MsCopilotPage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🪟</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Microsoft Copilot — GPT-4o Free With Web Search and Image Generation</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Microsoft's AI assistant built into Windows, Edge, and your browser</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['copilot.microsoft.com', color], ['Microsoft + OpenAI', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Microsoft Copilot is Microsoft's free AI assistant powered by GPT-4o — available at copilot.microsoft.com, built into Windows 11, and embedded in the Edge browser sidebar. Its biggest advantage over ChatGPT's free tier: web search is always on by default (no plugins needed) and you get free DALL-E 3 image generation with 15 boosts per day. If you use Windows 11, Copilot requires no separate signup — it is already there. For students working in Microsoft's ecosystem (Word, PowerPoint, Excel, Outlook), Copilot Pro unlocks AI assistance directly inside those applications. Free users get the same GPT-4o quality as ChatGPT Plus during non-peak hours, plus capabilities that require a paid ChatGPT subscription.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: "Microsoft Copilot Tutorial - A Beginner's Introduction to Copilot (2025)", url: 'https://www.youtube.com/watch?v=lGwjvaAFjzk', dur: 'Beginner 2025', note: 'Best starting point — covers the full Copilot experience from scratch' },
            { label: 'Microsoft Copilot Full Course For Beginners [2025]', url: 'https://www.youtube.com/watch?v=bBqTdOkso2Y', dur: 'Full course', note: 'Comprehensive walkthrough of every major feature in one video' },
            { label: 'How To Get Started with Microsoft Copilot in 2025', url: 'https://www.youtube.com/watch?v=ivlxzSgodvs', dur: 'Getting started', note: 'Practical setup guide — good for first-time users' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What makes Copilot different */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What makes Copilot different from ChatGPT" color={color} />
          <InfoBox color={color} dark={dark}>Copilot's three differentiators over ChatGPT free: (1) Web search is always active — answers cite live sources by default, not training data alone. (2) Free image generation — DALL-E 3 produces 15 images per day without any paid subscription. (3) Native Microsoft integration — works inside Windows 11, Edge, and Microsoft 365 apps without extra setup.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The model underneath Copilot is GPT-4o — the same foundation as ChatGPT Plus. The difference is what Microsoft layered on top. Every Copilot response can pull from the live web, which makes it more accurate on current topics, recent events, and real-time information. For a student who needs to research something from the last month, Copilot's grounded answers are more reliable than asking a model with a training cutoff.</p>
        </Block>

        {/* Free vs paid */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Free vs Copilot Pro — what you actually get" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Copilot Free', badge: 'More than most know', body: 'GPT-4o quality during non-peak hours, always-on web search with citations, 15 DALL-E 3 image boosts per day, voice conversations, file uploads (PDF/Word/Excel), image analysis. This is the ChatGPT Plus feature set — free. No credit card needed.' },
            { label: 'Copilot Pro — $20/month', badge: 'Worth it for Office users', body: 'Priority access at peak times (no slowdowns when Microsoft\'s servers are busy), 100 image boosts/day in landscape format, and crucially: Copilot inside Word, Excel, PowerPoint, and Outlook. If you live in Microsoft Office for work or college, Pro pays for itself quickly.' },
            { label: 'Microsoft 365 Copilot (Enterprise/Education)', badge: 'For institutions', body: 'Full Copilot integrated across all M365 apps — available to institutions and companies on E3/E5 plans. Many Indian engineering colleges and companies provide M365 licenses — check if your institution gives you access. It is free for you if your college has a Microsoft agreement.' },
          ]} />
        </Block>

        {/* Core features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Always-on web search', desc: 'Every response can pull from live Bing results by default. Recent news, current prices, latest documentation. No plugin toggle needed — it searches when relevant automatically.' },
            { name: 'Free image generation', desc: '15 free DALL-E 3 image boosts per day via Microsoft Designer. Same model that costs $20/month in ChatGPT Plus. Great for presentation visuals, project thumbnails, creative projects.' },
            { name: 'Think Deeper', desc: 'Reasoning mode for complex problems — like o1/o3 style step-by-step thinking. Use for multi-step math, logical reasoning, complex research questions. Available on the free tier.' },
            { name: 'File uploads and analysis', desc: 'Upload Word docs, Excel files, PDFs. Ask Copilot to summarize, extract key points, answer questions about the content, or improve the writing. Up to several MB per file.' },
            { name: 'Copilot Vision', desc: 'Upload screenshots, photos, or images. Ask what is shown, have it read text in images, analyze diagrams, describe scenes. Works in the web interface and Edge sidebar.' },
            { name: 'Voice conversations', desc: 'Speak to Copilot and hear responses. Natural two-way dialogue using Microsoft\'s MAI-Voice-1 model. Available on mobile (iOS/Android) and desktop. Useful for studying hands-free.' },
          ]} />
        </Block>

        {/* Practical use for students */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Practical use for students" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Research with live citations', body: 'Ask research questions and Copilot cites live web sources. For any claim you plan to use in work — click the citation and verify it is a real, credible source. Copilot\'s citations are real links, not fabricated references.' },
            { n: '2', title: 'Generate presentation visuals for free', body: 'For any presentation: describe the image you need in detail. Click the image icon in Copilot or go to Microsoft Designer. 15 free generations per day covers most project needs without any subscription.' },
            { n: '3', title: 'Summarize uploaded documents', body: 'Upload lecture notes, research papers, or assignment guidelines as PDFs. Ask \'What are the 5 most important points in this?\' or \'What does this document say about [specific topic]?\' Saves hours of reading.' },
            { n: '4', title: 'Use in Edge sidebar while browsing', body: 'Open Microsoft Edge → press Ctrl+Shift+. (or click the Copilot icon in the toolbar). Now Copilot can see the page you are reading and answer questions about it directly — explain this article, summarize this documentation, extract the key data from this table.' },
            { n: '5', title: 'Draft emails and professional messages', body: '\'Write a professional follow-up email to a recruiter after an interview. I interviewed for a backend developer role at [company]. The interview went well and I want to express interest in next steps. Keep it under 100 words.\' Paste and edit.' },
          ]} />
        </Block>

        {/* Microsoft Copilot in M365 apps */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Microsoft Copilot in M365 apps" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Word', badge: 'Draft and improve documents', body: 'Create a full draft from a prompt. Summarize a long document. Rewrite a section more concisely. Adjust tone. Available in free browser version of Word (with limits) and fully in Pro.' },
            { label: 'PowerPoint', badge: 'Create presentations fast', body: 'Turn a Word document or outline into a complete presentation with slides, content, and design in seconds. Redesign existing slides. Add speaker notes. \'Create a 10-slide presentation about REST APIs for beginners.\'' },
            { label: 'Excel', badge: 'Data analysis without formulas', body: 'Ask questions about your data in plain English. \'Which region had the highest sales in Q3?\' generates a chart. Agent Mode can even pull live web data into your workbook. Formula suggestions and explanations built in.' },
            { label: 'Outlook', badge: 'Email management', body: 'Summarize long email threads. Draft replies. Schedule meetings — Copilot finds free times, suggests rooms, drafts the invite. \'Summarize my unread emails from today\' on mobile voice command.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Get GPT-4o quality AI responses with always-on web search — completely free',
            'Generate up to 15 DALL-E 3 images per day for presentations, projects, and creative work',
            'Upload documents and ask questions about them without paying for any subscription',
            'Use Copilot in the Edge browser sidebar while reading any web page for instant context-aware help',
            'Access AI writing, summarization, and data analysis inside Word, Excel, PowerPoint, and Outlook (Pro/Education)',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Compare Copilot to ChatGPT on a Real Research Task</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Pick a topic you need to research for a current assignment or project. Ask the same 5 research questions to both Microsoft Copilot (free) and ChatGPT (free). Note: Which gave more cited, verifiable answers? Which hallucinated? Which produced more current information? Which wrote better at your level? Use Copilot's image generation for one visual you need for the project. This comparison builds a practical mental model of when to use each tool.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Pick a real research topic', body: 'Use an actual topic from your current coursework, not a made-up one. Real queries reveal real differences — generic prompts like \'explain AI\' look similar on both tools.' },
            { n: '2', title: 'Ask the same 5 questions to both', body: 'Open Copilot in one window, ChatGPT in another. Same 5 questions, exact same phrasing. Note: do the answers differ? Do citations appear? Is the information current?' },
            { n: '3', title: 'Verify 3 claims from each', body: 'Take 3 factual claims from Copilot\'s answers (it shows citation numbers). Click the citations. Are they real, credible sources? Do the same with ChatGPT — where are its claims coming from?' },
            { n: '4', title: 'Generate one image for your project', body: 'Think of one visual your project or presentation could use. Describe it in detail to Copilot\'s image generator. This is free — use it for every presentation you make.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Microsoft Copilot free tier, no credit card needed</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The Edge browser sidebar is Copilot's most underused feature for students. While reading any research paper, documentation page, or dense article: open the sidebar (Ctrl+Shift+.) and ask 'Summarize the key points of this page' or 'What does [specific term from the article] mean in context?' Copilot reads the page you are currently viewing and gives contextual answers — no copy-pasting needed. This turns every browser tab into an interactive reading session.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/chatbots/notebooklm')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> NotebookLM
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/chatbots/chatgpt')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            ChatGPT <ChevronRight size={14} />
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

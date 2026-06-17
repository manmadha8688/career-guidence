import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#8B5CF6'

export default function PerplexityPage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🔍</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Perplexity — AI Search That Cites Its Sources</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>The search engine reimagined with real-time AI answers</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['Unlimited free searches', color], ['AI Search', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Perplexity is not a chatbot — it is a search engine rebuilt for the AI era. Every answer comes with numbered citations linking directly to the sources. You can see exactly which web pages the answer was drawn from, and one click opens the source. This changes how research works: instead of reading 10 search results to synthesize an answer yourself, Perplexity reads them and synthesizes the answer for you — then shows you its sources so you can verify. For students writing papers, developers staying current with new tools, and anyone researching a topic they don't know, Perplexity's citation-first approach produces more trustworthy outputs than any chatbot that generates answers from memory alone. It is completely free for unlimited searches.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'How to Use Perplexity AI For Beginners — Complete Tutorial 2024', url: 'https://www.youtube.com/watch?v=iH-vz8hsa-M', dur: '~15 min', note: 'Best beginner walkthrough of all Perplexity features' },
            { label: 'Perplexity AI Tutorial For Beginners — How To Use Perplexity 2025', url: 'https://www.youtube.com/watch?v=e-uA4UOPlIU', dur: '~15 min', note: 'Updated 2025 guide with Focus modes and Spaces' },
            { label: 'How to Use Perplexity AI 2025 (Step by Step for Beginners)', url: 'https://www.youtube.com/watch?v=Yxpr1i-oC7E', dur: '~12 min', note: 'Clear step-by-step guide for research workflows' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why Perplexity is different from chatbots */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why Perplexity is different from chatbots" color={color} />
          <InfoBox color={color} dark={dark}>Perplexity searches the live web for every query, then uses an LLM to synthesize a structured answer from those search results, with each claim linked to its source. You are not getting the model's memorized knowledge — you are getting a real-time synthesis of current web content.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>This makes Perplexity the right tool any time accuracy and verifiability matter more than creative generation. Ask it about a new JavaScript library, yesterday's tech news, the requirements for a specific job role, or current research on a medical topic — the answer will be grounded in pages you can visit and verify. ChatGPT and Claude generate from training data; Perplexity generates from the live web.</p>
        </Block>

        {/* Core features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Cited answers', desc: 'Every answer has numbered citations. Each number links to the source page. You can check any claim immediately. This is the feature that makes Perplexity useful for research where accuracy matters.' },
            { name: 'Follow-up questions', desc: 'Perplexity suggests follow-up questions after every answer. Click to go deeper into any aspect of the topic automatically — like having a research assistant who knows what to investigate next.' },
            { name: 'Focus modes', desc: 'Switch between Web (general), Academic (papers and studies), YouTube (video summaries), Reddit (community opinions), and Wolfram Alpha (math/science). Each searches a different subset of the web.' },
            { name: 'Spaces (Pro)', desc: 'Create research collections around a topic. Add sources manually, keep research organized, share with others. Like a citable Notion powered by AI.' },
            { name: 'File upload analysis', desc: 'Upload PDFs, research papers, or documents. Ask questions about them. Perplexity searches the web alongside the document to provide context-enriched answers.' },
            { name: 'Pages (Pro)', desc: 'Turn any Perplexity conversation into a published, shareable research document. Useful for sharing research findings with formatting and citations intact.' },
          ]} />
        </Block>

        {/* When to use Perplexity vs when to use a chatbot */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="When to use Perplexity vs when to use a chatbot" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Use Perplexity when...', badge: 'Best choice', body: 'You need current information (today\'s news, latest releases), you need to verify facts for a paper or report, you\'re researching a technology you want to adopt, you want to know what people are currently saying about something, or you need academic paper citations.' },
            { label: 'Use ChatGPT/Claude when...', badge: 'Better for these', body: 'You need creative writing, code generation, step-by-step reasoning, conversational explanation of a concept, drafting an essay or email, or anything that benefits from generative capability rather than search synthesis.' },
            { label: 'Use Perplexity Academic focus for...', badge: 'Research papers', body: 'Switch to Academic mode when looking for peer-reviewed sources. Perplexity searches academic databases including arXiv, PubMed, and Semantic Scholar. Better for finding papers on technical topics than Google Scholar for most queries.' },
            { label: 'Use YouTube focus for...', badge: 'Video research', body: 'Switch to YouTube mode when you want AI-summarized answers from video content. Ask a question about a technical topic and get answers synthesized from relevant YouTube tutorials, with links to the source videos.' },
          ]} />
        </Block>

        {/* Using Perplexity for academic research */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Using Perplexity for academic research" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Ask a broad research question first', body: 'Start with the big question: \'What are the current approaches to reducing hallucinations in large language models?\' Perplexity synthesizes the current state of research with citations to recent papers.' },
            { n: '2', title: 'Switch to Academic focus', body: 'Click the Focus button → Academic. Re-ask your question. Now Perplexity prioritizes peer-reviewed sources. The citations link directly to papers you can read.' },
            { n: '3', title: 'Follow the citation chain', body: 'Click source numbers to open the actual papers. Skim the abstract. If relevant, this becomes a primary source for your work — properly cited, not hallucinated.' },
            { n: '4', title: 'Ask follow-up questions to go deeper', body: 'Use Perplexity\'s suggested follow-ups or ask your own. \'What are the key papers on this topic from the past two years?\' \'Who are the main researchers working on this problem?\'' },
            { n: '5', title: 'Export your research', body: 'Copy the full response with citations. Paste into your notes. The numbered citations are the beginning of your bibliography — they are real sources you can verify.' },
          ]} />
        </Block>

        {/* Perplexity vs Google vs ChatGPT */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Perplexity vs Google Search vs ChatGPT" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'vs Google Search', badge: 'Complementary, not replacement', body: 'Google shows you 10 links and you read them. Perplexity reads them and gives you a synthesis with citations. For research questions where you want a synthesis, Perplexity is faster. For browsing, finding specific websites, or shopping, Google is still better.' },
            { label: 'vs ChatGPT (free)', badge: 'Perplexity more accurate for factual queries', body: 'ChatGPT free has a knowledge cutoff and no web access. Perplexity searches live. For any factual or time-sensitive question, Perplexity is more reliable. For conversational reasoning, code, or creative work, ChatGPT is better.' },
            { label: 'vs Gemini', badge: 'Perplexity citations are cleaner', body: 'Both search the web. Perplexity\'s interface is built entirely around citations and research — cleaner numbered sources, academic focus mode, research collections. Gemini is better for Google Workspace integration; Perplexity is better for pure research workflow.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Research any technical topic with live, cited web sources — no hallucinated facts',
            'Find recent academic papers on any topic using Academic focus mode with links to the actual papers',
            'Summarize YouTube videos by searching in YouTube focus mode for tutorial content',
            'Stay current with technology news, library releases, and industry trends in real time',
            'Build research collections around topics you\'re studying with organized, cited sources',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Research a Job Role</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Use Perplexity to research the exact technical requirements for one job role you want in 2-3 years. Ask: 'What technical skills are companies currently hiring for in [role]? What do job postings ask for in 2025?' Then ask follow-ups about any skill you haven't started learning yet. Document: what you already know, what you need to learn, and use the cited job postings to validate that the information is real and current.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Pick your target role', body: 'Choose a specific role: backend developer, data scientist, DevOps engineer, ML engineer, frontend developer. Be specific — not just \'programmer\'.' },
            { n: '2', title: 'Ask Perplexity for current requirements', body: 'Ask: \'What skills do companies currently require for [role]? What do job postings ask for?\' Let Perplexity search and cite actual job board data.' },
            { n: '3', title: 'Follow up on gaps', body: 'For each skill you don\'t have: ask \'how long does it take to learn [skill] from scratch?\' and \'what resources do people recommend for learning [skill]?\'' },
            { n: '4', title: 'Create your learning roadmap', body: 'Based on the cited, current information, list: what you know ✓, what you\'re learning ⏳, and what to start next →. This is a data-driven learning plan, not guesswork.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Perplexity free tier, unlimited searches, no credit card required</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Switch Focus mode before every Perplexity query, not after you get a generic answer. Academic mode finds papers, YouTube mode finds tutorials, Reddit mode finds real practitioner opinions. The default Web mode is fine for general research but the focused modes produce dramatically more relevant results for specific use cases. Most users never change the mode and miss the best feature.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/chatbots/gemini')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Gemini
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/chatbots/notebooklm')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            NotebookLM <ChevronRight size={14} />
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

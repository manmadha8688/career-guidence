import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#8B5CF6'

export default function NotebookLMPage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>📓</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>NotebookLM — AI That Only Knows What You Give It</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Your documents become a queryable knowledge base</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['notebooklm.google.com', color], ['Google', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>NotebookLM solves the most frustrating problem with AI chatbots: hallucination. When you ask ChatGPT or Claude a question, they generate an answer from billions of training parameters — and sometimes invent facts that sound correct. NotebookLM works completely differently: you upload your own sources (PDFs, Google Docs, YouTube videos, web pages, audio files), and NotebookLM only answers from those sources. Every answer comes with a citation showing exactly which part of your document it came from. If you ask something not in your sources, it says so. For students studying specific material, researchers working with a corpus of papers, or anyone who needs to extract information reliably from a specific set of documents, NotebookLM is the most trustworthy AI tool available — and completely free.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Google NotebookLM Tutorial — Complete Guide', url: 'https://www.youtube.com/watch?v=I_INtFNv-Is', dur: '15 min', note: 'Start here, covers everything including Audio Overview' },
            { label: 'NotebookLM for Students — How to Study Smarter', url: 'https://www.youtube.com/watch?v=xU2xPNfTuvE', dur: '12 min', note: 'Student-specific use cases' },
            { label: 'NotebookLM Audio Overview — AI Podcast from Your Documents', url: 'https://www.youtube.com/watch?v=pP8Ij7CaWtE', dur: '8 min', note: 'The Audio Overview feature explained' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* The core principle — grounded AI */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The core principle — grounded AI" color={color} />
          <InfoBox color={color} dark={dark}>NotebookLM uses RAG (Retrieval-Augmented Generation) as its entire product model. Your uploaded documents are the only knowledge source. Every answer is retrieved from those documents and generated based on that retrieved content — not from any external training data. This is why it doesn't hallucinate: it can only say what your sources say.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The practical effect is profound. You can upload your entire semester's worth of notes, textbooks, and lecture slides — and then have a conversation with all of them simultaneously. Ask "which concepts appear in both the lecture on sorting algorithms and the chapter on databases?" and NotebookLM reads across all your sources. The Audio Overview feature is unique: it converts your entire source set into a podcast-style conversation between two AI hosts discussing the material — an incredible study tool.</p>
        </Block>

        {/* What you can upload */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What you can upload" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'PDFs', desc: 'Textbooks, research papers, course slides, journal articles. Each PDF becomes a searchable source. Works well with scanned text if the OCR is readable.' },
            { name: 'Google Docs', desc: 'Connect directly from Google Drive. Your notes, summaries, reports. Updates to the Doc are reflected in NotebookLM automatically.' },
            { name: 'YouTube videos', desc: 'Paste a YouTube URL. NotebookLM ingests the transcript. Ask questions about video content without watching the whole thing. Works for lecture videos, tutorials, talks.' },
            { name: 'Web pages', desc: 'Paste a URL. NotebookLM reads and indexes the page. Useful for documentation pages, articles, blog posts — any text-heavy web content.' },
            { name: 'Audio files', desc: 'Upload audio lectures, podcast episodes, recorded meetings. NotebookLM transcribes and indexes the content. Ask questions about spoken content.' },
            { name: 'Text files & Google Slides', desc: 'Plain text notes, copied content, Google Slides presentations. Maximum 50 sources per notebook, 500K words per source.' },
          ]} />
        </Block>

        {/* The Audio Overview feature */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The Audio Overview feature" color={color} />
          <p style={{ ...P(sub), marginBottom: '1rem' }}>Audio Overview is NotebookLM's most surprising feature. Click "Generate Audio Overview" and the system creates a 10-20 minute podcast-style conversation where two AI hosts discuss, explain, and debate the content from all your sources. It sounds remarkably natural — not robotic text-to-speech — and covers the key themes, interesting connections, and important concepts from your entire source set.</p>
          <InfoBox color={color} dark={dark}>Audio Overview is genuinely useful for studying. Instead of re-reading notes before an exam, listen to the AI podcast version during a commute, workout, or meal. The conversational format reinforces concepts through repetition and explanation in a way that passive reading doesn't. It also surfaces connections between sources that you might not have noticed yourself.</InfoBox>
        </Block>

        {/* How to use NotebookLM for studying */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How to use NotebookLM for studying" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create one notebook per subject', body: 'New notebook → upload all materials for that subject: lecture PDFs, your notes, relevant YouTube lecture URLs. Keep sources organized by course.' },
            { n: '2', title: 'Ask cross-source questions', body: "Ask questions that span multiple sources: 'What does the textbook say about this concept compared to what the lecturer said?' NotebookLM reads across all sources simultaneously." },
            { n: '3', title: 'Generate study guides', body: "Click 'Generate Study Guide' (or ask 'Create a study guide for this material'). NotebookLM produces a structured summary with key concepts, definitions, and practice questions drawn directly from your sources." },
            { n: '4', title: 'Test your understanding', body: "Ask 'Give me 10 practice questions based on my notes' or 'Quiz me on the key concepts in chapter 3'. Answer them, then ask for explanations. All questions are grounded in your actual study material." },
            { n: '5', title: 'Generate Audio Overview before an exam', body: "Two days before an exam, generate an Audio Overview of all sources. Listen to it multiple times. The conversational format helps consolidate the material in a way re-reading doesn't." },
          ]} />
        </Block>

        {/* Honest limitations */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Honest limitations" color="#EF4444" />
          <Compare dark={dark} border={border} color="#EF4444" items={[
            { label: 'Only knows your sources', badge: 'Feature AND limitation', body: "NotebookLM cannot fill in gaps from its own knowledge. If your uploaded materials don't cover something, it tells you. This is a feature for reliable answers but a limitation when you need background knowledge not in your sources." },
            { label: '50 source limit per notebook', badge: 'Practical constraint', body: 'Maximum 50 sources per notebook. For large research projects, this requires planning. Workaround: create multiple notebooks organized by sub-topic, or prioritize the most relevant sources.' },
            { label: 'No image understanding in PDFs', badge: 'Known gap', body: 'Diagrams, charts, and images in PDFs are not analyzed. Text around images is indexed. For heavily visual textbooks (like physics or biology diagrams), the image content is missed.' },
            { label: 'English-primary quality', badge: 'Multilingual caution', body: 'NotebookLM works with multilingual sources but was primarily optimized for English. For content in Indian languages, quality varies. Best to upload English-language sources for reliable results.' },
          ]} />
        </Block>

        {/* NotebookLM vs ChatGPT/Claude */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="NotebookLM vs asking ChatGPT/Claude the same questions" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'NotebookLM', badge: 'Grounded in your sources', body: 'Answers reference your specific materials. Citations point to exact passages. Will not hallucinate external facts. Stays strictly within what your documents say. Ideal for exam prep, literature review, document Q&A.' },
            { label: 'ChatGPT / Claude', badge: 'General knowledge, no source grounding', body: "Answers from broad training data. More creative and generative. Can explain concepts not in your sources, write code, and reason generally. Better for conceptual explanations and for questions not covered by your specific documents." },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Create a queryable knowledge base from all your semester notes, textbooks, and lecture slides',
            'Get answers with exact citations showing which part of your document the answer came from',
            'Generate a study guide, timeline, FAQ, or briefing document from your uploaded sources in one click',
            'Create an AI podcast discussion of your study material with Audio Overview — study while commuting',
            'Ask questions that span multiple documents simultaneously without manually cross-referencing',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build Your Exam Notebook</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Create a NotebookLM notebook for a subject you have an upcoming exam or assessment on. Upload everything: lecture notes, textbook chapters, any past papers. Then generate a study guide, create a 20-question quiz from the material, and generate an Audio Overview. Compare your AI-generated study guide against your manual notes. What did you emphasize that NotebookLM missed, and what did NotebookLM surface that you had underweighted in your own notes?</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Gather your sources', body: 'Collect PDFs of notes, slides, and relevant textbook sections. Add YouTube lecture URLs if available. Aim for at least 5-10 sources that cover the exam material.' },
            { n: '2', title: 'Create the notebook and upload', body: 'Go to notebooklm.google.com → New notebook. Upload all sources. Wait for processing (usually 1-2 minutes per source).' },
            { n: '3', title: 'Generate study materials', body: "Ask: 'Generate a comprehensive study guide for this material' and separately 'Create 20 practice questions with answers based on these sources'. Save both." },
            { n: '4', title: 'Generate and listen to Audio Overview', body: 'Click the Audio Overview button. Let it generate (2-5 minutes). Listen to the podcast version of your exam material. Note any concepts it emphasizes that you had not focused on.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — NotebookLM is completely free with a Google account</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>NotebookLM's greatest underused capability is research synthesis. If you are doing any kind of research or literature review, upload 10-20 relevant papers. Then ask questions like 'What do these papers agree on?' 'What are the main disagreements between authors?' 'What gaps do these papers leave unanswered?' Getting synthesis across 10 papers in seconds that would take days to read manually changes the pace of research.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/chatbots/perplexity')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Perplexity
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/coding/copilot')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            GitHub Copilot <ChevronRight size={14} />
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

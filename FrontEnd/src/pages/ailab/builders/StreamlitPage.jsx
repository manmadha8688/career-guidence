import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#FF4B4B'

export default function StreamlitPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(255,75,75,0.09)' : 'rgba(255,75,75,0.13)'
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>AI App Builders</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🌊</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Streamlit — Turn Python Scripts Into Web Apps in Minutes</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Build and share data apps, ML demos, and AI tools without HTML or JavaScript</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ 100% FREE', '#4ADE80'], ['streamlit.io', color], ['Python', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Streamlit is an open-source Python framework that turns a plain Python script into a fully interactive web application — no HTML, no CSS, no JavaScript required. You write Python, add a few <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8em', background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)', padding: '0.1em 0.4em', borderRadius: 4 }}>st.</code> calls, run one command, and your script becomes a live web app with sliders, charts, file uploads, and data tables. Streamlit was acquired by Snowflake in 2022 and is used by over 90% of Fortune 50 companies for internal data apps. For students, it is the fastest possible path from a Python script to something that looks professional and can be shared with a real URL — for free. If you can write Python, you can build a web app in Streamlit today.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Streamlit Tutorial for Beginners 2025 | Full Course Step-by-Step', url: 'https://www.youtube.com/watch?v=H-JTC5P6RKU', dur: 'Full course', note: 'Complete 2025 beginner course — covers all core features step by step' },
            { label: 'Build an AI-Powered Data Dashboard with Python & Streamlit', url: 'https://www.youtube.com/watch?v=H3sZnfOXM88', dur: '~45 min', note: 'Beginner-friendly tutorial — build a real dashboard with charts and data' },
            { label: 'Streamlit Explained: Python Tutorial for Data Scientists — Arjan Codes', url: 'https://www.youtube.com/watch?v=c8QXUrvSSyg', dur: '~25 min', note: 'Clean, focused walkthrough from a respected Python educator' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* How it works */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How Streamlit works" color={color} />
          <InfoBox color={color} dark={dark}>Streamlit's mental model is radically simple: every time a user interacts with your app — moves a slider, clicks a button, types in a text box — your Python script reruns from top to bottom. The UI re-renders with the new state. This means there is no event system, no callbacks, no async to learn. Just write Python that reads widget values and outputs results.</InfoBox>
          <p style={{ ...P(sub), marginBottom: '1rem' }}>Under the hood, Streamlit runs a local web server and auto-generates a React frontend. You never touch that frontend. Your only job is the Python script. The workflow is three steps:</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install and import', body: 'pip install streamlit — then import streamlit as st at the top of any Python file. That one import gives you access to every widget, chart, and layout component.' },
            { n: '2', title: 'Add st. calls to your script', body: 'Replace print() with st.write(). Add st.slider() to create a slider whose value flows into your code. Add st.line_chart(df) to render a chart from a Pandas DataFrame. The widgets are the UI — no HTML required.' },
            { n: '3', title: 'Run one command', body: 'streamlit run app.py — Streamlit opens your browser automatically and serves the app at localhost:8501. Every time you save the file, the app hot-reloads with your changes.' },
          ]} />
        </Block>

        {/* Key widgets */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key widgets and components" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Input widgets', desc: 'st.slider(), st.text_input(), st.selectbox(), st.checkbox(), st.button(), st.file_uploader() — every common UI control in one line of Python. Widget values are just Python variables you read directly.' },
            { name: 'Charts and data', desc: 'st.line_chart(), st.bar_chart(), st.scatter_chart() for quick charts. Full Plotly, Matplotlib, Altair, and Vega-Lite support via st.plotly_chart() and st.altair_chart() for custom visuals.' },
            { name: 'Data tables', desc: 'st.dataframe(df) renders any Pandas DataFrame as an interactive, sortable, filterable table. st.table() for static display. Pass in any pandas, numpy, or list data.' },
            { name: 'Layout components', desc: 'st.columns(), st.tabs(), st.expander(), st.sidebar — multi-column layouts, tabbed sections, collapsible panels, and a sidebar navigation panel, all in pure Python.' },
            { name: 'Session state', desc: 'st.session_state stores values across reruns — essential for chat history, multi-step forms, and any stateful interaction. Access it like a Python dict: st.session_state["key"] = value.' },
            { name: 'Caching', desc: '@st.cache_data decorator caches expensive function results (database queries, model loading, API calls) so they only run once. Prevents your app from re-fetching data on every user interaction.' },
            { name: 'File uploads', desc: 'st.file_uploader() accepts images, CSVs, PDFs, and any file type. The uploaded file becomes a Python bytes object you can pass to pandas, PIL, or any processing function.' },
            { name: 'Media display', desc: 'st.image(), st.audio(), st.video() — display generated images from Stable Diffusion, play audio from TTS models, embed video output, all with one-liners.' },
          ]} />
        </Block>

        {/* AI chatbot UI section */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Building AI chatbot UIs with st.chat_message" color={color} />
          <InfoBox color={color} dark={dark}>Streamlit added native chat components in 2023 — st.chat_message() and st.chat_input() — which make building a ChatGPT-style UI trivially easy. You can have a working chatbot UI connected to any LLM API in under 30 lines of Python. This is now one of the most popular use cases for Streamlit in student and research projects.</InfoBox>
          <p style={{ ...P(sub), marginBottom: '1rem' }}>The pattern is always the same: store message history in <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8em', background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)', padding: '0.1em 0.4em', borderRadius: 4 }}>st.session_state</code>, display it with <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8em', background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)', padding: '0.1em 0.4em', borderRadius: 4 }}>st.chat_message()</code>, capture new input with <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8em', background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)', padding: '0.1em 0.4em', borderRadius: 4 }}>st.chat_input()</code>, call your LLM, append the response.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Initialize message history', body: 'if "messages" not in st.session_state: st.session_state.messages = [] — this creates a list that persists across reruns. Without session_state, your chat history would vanish on every interaction.' },
            { n: '2', title: 'Render existing messages', body: 'Loop over st.session_state.messages and call st.chat_message(msg["role"]) as a context manager. Role can be "user" or "assistant" — Streamlit applies preset avatars and alignment automatically.' },
            { n: '3', title: 'Capture new user input', body: 'prompt = st.chat_input("Ask me anything") — this renders a sticky input box at the bottom of the page. When the user submits, prompt contains their message and the script reruns.' },
            { n: '4', title: 'Call your LLM API', body: 'Pass the message history to OpenAI, Groq, Gemini, or any API. Use st.write_stream() to stream the response token by token — users see text appearing like in ChatGPT, not waiting for the full response.' },
            { n: '5', title: 'Append and persist', body: 'Append the user message and assistant response to st.session_state.messages. On the next rerun, the full history renders again. The chatbot now has memory for the full conversation.' },
          ]} />
        </Block>

        {/* Free hosting */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Streamlit Community Cloud — free hosting in under a minute" color={color} />
          <p style={{ ...P(sub), marginBottom: '1rem' }}>Streamlit Community Cloud (share.streamlit.io) lets you deploy unlimited Streamlit apps for free. Your app gets a public URL you can share with anyone — no server setup, no Docker, no cloud account required. It connects directly to your GitHub repository.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Push your app to GitHub', body: 'Create a public GitHub repository with your app.py and a requirements.txt listing your dependencies (streamlit, pandas, openai, etc.). That is the entire deployment package.' },
            { n: '2', title: 'Connect at share.streamlit.io', body: 'Sign in with GitHub. Click "New app". Select your repository, branch, and the main Python file. Streamlit Community Cloud handles containerization, dependency installation, and serving.' },
            { n: '3', title: 'Share the URL', body: 'Your app is live at yourname-appname.streamlit.app within a few minutes. Share it in your portfolio, LinkedIn, or college project submission. The app auto-updates every time you push to GitHub.' },
            { n: '4', title: 'Manage secrets securely', body: 'For API keys, use the Secrets management panel in your app dashboard — never commit keys to GitHub. Access them in code as st.secrets["OPENAI_API_KEY"]. Secrets are encrypted and never exposed.' },
          ]} />
          <div style={{ padding: '0.75rem 1rem', borderRadius: 8, background: dark ? 'rgba(74,222,128,0.07)' : 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)', marginTop: '0.75rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: '#4ADE80', letterSpacing: '0.07em' }}>FREE TIER: Unlimited apps · 1 GB RAM per app · Auto-deploy from GitHub · Custom subdomain URL · No credit card</span>
          </div>
        </Block>

        {/* Streamlit vs Gradio */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Streamlit vs Gradio — which one to use" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Streamlit — for apps and dashboards', badge: 'More flexible UI', body: 'Streamlit gives you full layout control: multi-page apps, sidebars, columns, tabs, custom CSS injection, and a rich component ecosystem. It is designed for data dashboards, ML experiment tracking, internal tools, and anything that needs to feel like a real application. The rerun model is simple but requires thinking about session state for complex interactions. Best for: portfolio apps, data visualizations, chatbot UIs, multi-step workflows.' },
            { label: 'Gradio — for ML model demos', badge: 'Fastest for model UIs', body: 'Gradio is optimized for one thing: wrap a Python function (your ML model) in a UI with inputs and outputs. Three lines of code. It also doubles as a REST API automatically — every Gradio app exposes a /predict endpoint. Hugging Face Spaces runs on Gradio by default. Best for: sharing a model you trained, image classification demos, audio/speech tasks, NLP model interfaces. Less flexible than Streamlit for complex app logic.' },
            { label: 'When to use both', badge: 'Real answer', body: 'Use Streamlit when you are building something users navigate through — charts, filters, multiple sections, chat history. Use Gradio when you are sharing a model: input goes in, output comes out. Many ML practitioners know both. Start with Streamlit since it covers more ground, then add Gradio when you need the instant REST API feature or are sharing on Hugging Face Spaces.' },
          ]} />
        </Block>

        {/* Use cases */}
        <Block title="What students build with Streamlit" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Data analysis dashboards — upload a CSV, explore it with interactive filters and charts without writing any frontend code',
            'ML model demos — load a trained model, add sliders for parameters, show predictions live as inputs change',
            'AI chatbot UIs — wrap any LLM API (OpenAI, Gemini, Groq) in a ChatGPT-style chat interface with history',
            'Resume project showcase — deploy a working data or ML app to a public URL and link it in your portfolio',
            'Research experiment dashboards — track training runs, compare model metrics, visualize results interactively',
            'AI tool prototypes — build internal tools that use AI APIs: document summarizers, code explainers, image classifiers',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build an AI Chatbot UI with Streamlit</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build a fully working AI chatbot with a ChatGPT-style interface using Streamlit and a free LLM API. Use Groq (free tier, extremely fast) or Gemini API (free tier) so the project costs nothing. By the end you will have a deployed public URL you can add to your portfolio and share with anyone — without writing a single line of HTML.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up your project', body: 'Create a folder with app.py and requirements.txt. In requirements.txt add: streamlit, groq (or google-generativeai). Get a free API key from console.groq.com — the free tier is generous and responses are near-instant.' },
            { n: '2', title: 'Build the chat UI', body: 'Initialize st.session_state.messages = []. Loop over messages and render each with st.chat_message(msg["role"]). Add st.chat_input() at the bottom. The UI is complete — 10 lines of Python.' },
            { n: '3', title: 'Connect the LLM', body: 'When the user submits a message, call the Groq API with the full message history. Use st.write_stream() to stream the response. Append both the user and assistant messages to session_state. The chatbot now has memory.' },
            { n: '4', title: 'Add a system prompt control', body: 'Add st.sidebar with a st.text_area() for the system prompt. This lets the user configure the chatbot\'s persona without code changes — a recipe assistant, a code reviewer, a study tutor. Same app, different behavior.' },
            { n: '5', title: 'Deploy to Community Cloud', body: 'Push to GitHub. Go to share.streamlit.io, connect the repo, deploy. Add your Groq API key in the Secrets panel. Your chatbot is live at a public URL in under 3 minutes.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Streamlit is open source, Community Cloud is free, Groq free tier is 14,400 requests/day</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The most common Streamlit mistake is ignoring the rerun model. Every widget interaction reruns your entire script — so if you load a 500 MB model inside your script body, it reloads on every button click. Fix this with <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8em', background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)', padding: '0.1em 0.4em', borderRadius: 4 }}>@st.cache_resource</code> on model-loading functions and <code style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.8em', background: dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.06)', padding: '0.1em 0.4em', borderRadius: 4 }}>@st.cache_data</code> on data-fetching functions. Once you understand caching, Streamlit apps become fast and professional.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/builders/lovable')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Lovable
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/coding/claude-code')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Claude Code <ChevronRight size={14} />
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

import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#EC4899'

export default function HermesPage() {
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Agents</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🪄</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Hermes — Open-Source Models Fine-Tuned for Agents</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Nous Research's models built for function calling and structured output</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['Run locally with Ollama', color], ['Nous Research', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Hermes is a series of open-source language models created by Nous Research — a community-driven AI research group. Hermes models are fine-tuned versions of base models like Llama 3.1, specifically optimized for tasks that matter most in agent development: function calling, structured JSON output, following complex multi-part instructions, and maintaining consistent personas across long conversations. Where the base Llama 3.1 model is general-purpose, Hermes 3 is trained specifically to be reliable at the mechanics of agentic behavior — calling the right tool at the right time, returning structured data in the exact format requested, and handling complex system prompts without losing context. It runs locally via Ollama (free, private) or via Together AI and Hugging Face APIs.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Shockingly Accurate Function Calling with Hermes 2 Pro — Local AI', url: 'https://www.youtube.com/watch?v=ViXURxck-HM', dur: '~15 min', note: 'Best Hermes function calling demo — see exactly how tool calling works' },
            { label: 'Fully Local Tool Calling with Ollama — Python Tutorial', url: 'https://www.youtube.com/watch?v=Nfk99Fz8H9k', dur: '~20 min', note: 'Run Hermes + Ollama locally — complete function calling implementation' },
            { label: 'Hermes — The Self Improving AI Agent (Ollama + Nous Research)', url: 'https://www.youtube.com/watch?v=lbqysOjR8SU', dur: '~15 min', note: 'Hermes as an agent — Nous Research integration and capabilities overview' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What makes Hermes different */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What makes Hermes different from base models" color={color} />
          <InfoBox color={color} dark={dark}>Fine-tuning takes a pre-trained base model and continues training it on a curated dataset focused on specific capabilities. Hermes 3's fine-tuning data emphasizes: structured output (the model reliably returns JSON in the format you specify), function calling (the model decides which tool to call with correct parameters), complex instruction following (multi-part instructions with multiple constraints), and roleplay/persona consistency (the model maintains a defined persona across a long conversation).</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The practical difference shows up when building agents. If you ask a base Llama 3.1 model to return JSON and it returns a mix of explanation text and partial JSON, your agent breaks. Hermes 3 returns exactly the JSON you specified — consistent across different prompts and edge cases. This reliability is the difference between a demo that works once and a production system that works every time. For function calling agents, Hermes 3 consistently outperforms base Llama on which tool to call and how to format the arguments.</p>
        </Block>

        {/* Getting Hermes running locally */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting Hermes running locally with Ollama" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install Ollama', body: 'Download from ollama.com. Install like a regular app. Ollama runs a local server that manages model downloads and inference. No GPU required for 7B models — runs on CPU (slower but functional).' },
            { n: '2', title: 'Pull the Hermes model', body: 'ollama pull nous-hermes2 (7B, ~4GB)\nollama pull hermes3 (8B, based on Llama 3.1, ~5GB)\nModels download once and run locally. No API key, no internet connection needed after download.' },
            { n: '3', title: 'Run via Ollama API', body: "import requests\nresponse = requests.post('http://localhost:11434/api/chat', json={\n    'model': 'hermes3',\n    'messages': [{'role': 'user', 'content': 'Hello'}],\n    'stream': False\n})\nprint(response.json()['message']['content'])" },
            { n: '4', title: 'Use via OpenAI-compatible endpoint', body: "from openai import OpenAI\nclient = OpenAI(base_url='http://localhost:11434/v1', api_key='ollama')\nresponse = client.chat.completions.create(\n    model='hermes3',\n    messages=[{'role': 'user', 'content': 'Return my name and age as JSON'}]\n)\nSame OpenAI SDK, local model, no cost." },
          ]} />
        </Block>

        {/* Function calling with Hermes */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Function calling with Hermes" color={color} />
          <InfoBox color={color} dark={dark}>Hermes uses a specific XML-style format for function calling that differs from OpenAI's tool_calls format. Understanding this format lets you build reliable function-calling agents without needing the OpenAI API. The format uses &lt;tool_call&gt; tags that the model produces in its response, which your code parses and executes.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Define tools in the system prompt', body: "Tools are defined in the system prompt as JSON schemas. Hermes reads these schemas and calls the appropriate tool by name with correct arguments based on the user's request." },
            { n: '2', title: 'Parse tool call responses', body: 'When Hermes decides to call a tool, it returns a response containing <tool_call>{"name": "function_name", "arguments": {...}}</tool_call>. Parse this XML, extract the JSON, and call the corresponding Python function.' },
            { n: '3', title: 'Return tool results', body: "Add the tool result as a tool message in the conversation: {'role': 'tool', 'content': json.dumps(result), 'name': 'function_name'}. Send the updated conversation back to Hermes." },
            { n: '4', title: 'Continue the conversation', body: 'Hermes reads the tool result and generates a natural language response incorporating the real data. The full loop: user request → Hermes chooses tool → you execute → Hermes responds with result.' },
          ]} />
        </Block>

        {/* Hermes use cases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Hermes use cases" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Local agent development', desc: 'Build function-calling agents that run entirely on your machine. No API costs, no internet required after model download, full data privacy. Hermes 3 8B runs on 8GB RAM.' },
            { name: 'Structured data extraction', desc: 'Extract specific fields from unstructured text as JSON. "Extract name, email, company from this email" returns clean JSON every time — no parsing of free-text responses.' },
            { name: 'Instruction-following automation', desc: 'Complex multi-step instructions with many constraints. Hermes 3 handles "do X but not Y, always format as Z, never include W" better than base models of the same size.' },
            { name: 'Consistent personas', desc: 'Define a character/persona in the system prompt and Hermes maintains it across a very long conversation. Useful for interactive learning assistants, simulation characters, and testing systems.' },
            { name: 'Offline AI features', desc: 'Build features that work without internet: local summarization, local classification, local Q&A. Deploy in environments where cloud API calls are not possible or not allowed.' },
            { name: 'Cost-free development', desc: 'All development and testing completely free. Download once, run unlimited times. When ready for production, evaluate whether the quality justifies staying local or upgrading to cloud APIs.' },
          ]} />
        </Block>

        {/* Hermes vs cloud models */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Hermes vs cloud models for agent work" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Quality vs cost tradeoff', badge: 'Context-dependent', body: 'Hermes 3 8B (free, local) vs GPT-4o-mini ($0.15/1M tokens) vs GPT-4o ($2.50/1M tokens). For structured output and function calling on well-defined tasks, Hermes 3 is often comparable to GPT-4o-mini. For complex reasoning, GPT-4o leads. Benchmark on your specific task before concluding cloud is necessary.' },
            { label: 'Privacy', badge: 'Hermes wins', body: 'Running locally means no data leaves your machine. For applications processing sensitive data — personal documents, internal business data, medical records — local inference with Hermes eliminates data privacy concerns entirely.' },
            { label: 'Deployment', badge: 'Cloud easier, local more private', body: 'Cloud APIs: no hardware requirements, scales automatically, easy to update. Local Hermes: fixed compute requirements (RAM/CPU), no ongoing cost, private. For student projects: use cloud APIs. For applications with privacy requirements: consider local.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Run a capable function-calling language model entirely on your own computer at zero ongoing cost',
            'Extract structured JSON data from any unstructured text reliably and consistently',
            'Build agent prototypes locally before connecting them to paid cloud APIs',
            'Create AI features that work completely offline — no internet, no API key, no cost',
            'Learn agent development patterns (function calling, tool use) without spending on API credits',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Local Function-Calling Agent</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build an agent that runs entirely on your machine using Hermes via Ollama. Give it 3 tools: get_weather(city) that returns a mock weather response, search_flights(from, to, date) that returns mock flight data, and calculate_trip_cost(flights, hotel_nights) that does simple math. Ask it: "Plan a 3-day trip from Hyderabad to Bangalore for next weekend and estimate the cost." Watch it call the right tools with correct arguments.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install Ollama and pull Hermes', body: "Install from ollama.com. Run: ollama pull hermes3. This downloads ~5GB once. Verify with: ollama run hermes3 'Hello' — if it responds, you are ready." },
            { n: '2', title: 'Define mock tools as Python functions', body: "Write 3 simple Python functions that return hardcoded mock data. The goal is to test tool calling, not real data. get_weather returns {'temp': 28, 'condition': 'sunny'}. Realistic enough to test the pattern." },
            { n: '3', title: 'Build the tool-calling loop', body: 'System prompt defines the tools as JSON schemas. User message triggers tool selection. Parse <tool_call> from response. Execute matching Python function. Return result. Send back to Hermes for final response.' },
            { n: '4', title: 'Test with varied queries', body: 'Try 5 different trip planning queries. Does Hermes correctly identify which tools to call? Does it pass the right arguments? Fix the system prompt if tool selection is wrong — the system prompt is your only lever.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Hermes via Ollama, fully local, no API key required</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>When building function-calling agents with Hermes, write extremely clear tool descriptions. The description field in your tool schema is what the model reads to decide when to use that tool. "Get the current weather for a city" is clear. "Weather tool" is not. Spend time writing precise, unambiguous tool descriptions — it is the most impactful optimization for improving tool selection accuracy.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/agents/autogen')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> AutoGen
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/agents/mcp')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            MCP <ChevronRight size={14} />
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

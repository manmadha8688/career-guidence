import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F97316'

export default function MistralAPIPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(249,115,22,0.09)' : 'rgba(249,115,22,0.11)'
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>APIs</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🌪️</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Mistral AI API — Europe's Best LLM for Code and Multilingual Tasks</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Fast, affordable, and open — with specialist models for code, vision, and edge</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ Free Trial', '#4ADE80'], ['mistral.ai', color], ['French AI', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Mistral AI is a French AI research lab founded in 2023 by former DeepMind and Meta researchers — and it quickly became Europe's answer to OpenAI. In just over a year, Mistral released models that rivaled GPT-4 at a fraction of the cost, built on a core belief that high-quality AI should be open, efficient, and not locked behind US cloud providers. While OpenAI and Anthropic keep their weights closed, Mistral regularly publishes open-weight models under Apache 2.0, letting anyone download, fine-tune, and self-host. Their commercial API, called La Plateforme, offers the frontier versions at prices significantly lower than OpenAI — Mistral Large costs $2/1M tokens input, versus GPT-4o at $5/1M. But what truly sets Mistral apart is specialization: Codestral is one of the best dedicated code models available, Pixtral handles vision, and Ministral targets edge devices. For any project where cost, European data residency, or code generation quality matters, Mistral is the first API to evaluate.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Mistral AI API Released — EASILY use Mistral\'s Latest Models Now! (Full Tutorial)', url: 'https://www.youtube.com/watch?v=Bqwobo1yHsI', dur: '~15 min', note: 'Complete walkthrough — API key setup to first working call' },
            { label: 'CodeStral AI Tutorial: Getting Started with Mistral\'s Coding LLM', url: 'https://www.youtube.com/watch?v=GP_HpRVfHWw', dur: '~12 min', note: 'Codestral-specific tutorial — FIM, chat completion, Python examples' },
            { label: 'Getting Started with the Python Library of Mistral AI', url: 'https://www.youtube.com/watch?v=6ZVEy2rmoRg', dur: '~10 min', note: 'Official Python SDK walkthrough — streaming, function calling, chat' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why Mistral */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="European AI champion — why it matters" color={color} />
          <InfoBox color={color} dark={dark}>Mistral's EU-native infrastructure is not just a marketing point. For any project where GDPR compliance, European data residency, or simply not routing traffic through US data centers matters, Mistral is the only frontier model provider built for this use case from the ground up. Enterprise customers under strict data regulations — healthcare, finance, government — increasingly mandate it.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>Mistral's architecture philosophy differs from OpenAI's: instead of one massive general-purpose model, Mistral builds specialist models for specific domains. Codestral handles code. Pixtral handles vision. Ministral handles edge inference. Mistral Large handles complex reasoning. This means you pick the right tool for the job and pay only for what that task requires — rather than always routing everything through the most expensive model. Their open-source foundation also means the developer community can verify the weights, audit the models, and self-host when needed. That transparency is unusual among frontier AI providers.</p>
        </Block>

        {/* Model lineup */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Mistral model lineup" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Mistral Large', desc: 'Flagship frontier model. Best reasoning, complex code generation, nuanced instruction following. Comparable to GPT-4o for most tasks. Priced at $2/$6 per 1M tokens — significantly cheaper than GPT-4o at $5/$15. Best for production pipelines where quality matters most.' },
            { name: 'Mistral Small', desc: 'Mid-tier model balancing quality and cost. $0.10/$0.30 per 1M tokens — excellent for high-volume tasks where Large is overkill. Strong on classification, summarization, light reasoning. The sweet spot for most applications.' },
            { name: 'Codestral', desc: "Mistral's dedicated code model. Trained on 80+ programming languages with 128K context window. Supports fill-in-the-middle (FIM) — complete code within an existing snippet, not just append to the end. $0.30/$0.90 per 1M tokens. Integrated with VS Code, JetBrains, and Vim." },
            { name: 'Pixtral Large', desc: 'Multimodal flagship. Accepts images + text — analyze screenshots, diagrams, charts, and photos alongside code. Same $2/$6 pricing as Mistral Large. Strong on visual reasoning tasks: reading UI screenshots, understanding technical diagrams, comparing images.' },
            { name: 'Ministral 8B / 3B', desc: 'Edge-optimized models designed to run on devices with limited compute. Ministral 3B at $0.04/$0.04 per 1M tokens is among the cheapest frontier-quality tokens available. Ideal for high-volume classification, IoT applications, and cost-sensitive production systems.' },
            { name: 'Mixtral 8x7B (open)', desc: 'Open-weight mixture-of-experts model. 8 experts with only 2 active per token — GPT-3.5 quality at much lower compute. Apache 2.0 licensed. Run it yourself on a consumer GPU or access it via La Plateforme. Available free on Groq for fast inference.' },
          ]} />
        </Block>

        {/* Getting started */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting started with La Plateforme" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create your account and get an API key', body: 'Go to console.mistral.ai → Sign up with email → API Keys → Create new key. The free trial includes enough credits to explore all models. No credit card required for the initial trial.' },
            { n: '2', title: 'Install the SDK', body: "pip install mistralai (Python) or npm install @mistralai/mistralai (Node.js). Mistral's SDK deliberately mirrors the OpenAI SDK structure — if you know OpenAI, the method names and patterns will feel familiar." },
            { n: '3', title: 'Write your first API call', body: "from mistralai import Mistral\nclient = Mistral(api_key='your_key')\nresponse = client.chat.complete(\n  model='mistral-large-latest',\n  messages=[{'role': 'user', 'content': 'Explain list comprehensions in Python'}]\n)\nprint(response.choices[0].message.content)" },
            { n: '4', title: 'Add streaming for real-time output', body: "Use client.chat.stream() instead of client.chat.complete(). Iterate over chunks: for event in stream: print(event.data.choices[0].delta.content or '', end='', flush=True). Streaming makes chatbots feel live rather than waiting for the full response." },
            { n: '5', title: 'Store your API key safely', body: "Never hardcode keys in source code. Create a .env file: MISTRAL_API_KEY=your_key_here. Use python-dotenv to load it: from dotenv import load_dotenv; load_dotenv(). Always add .env to .gitignore before your first commit." },
          ]} />
        </Block>

        {/* Codestral deep dive */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Codestral — the coding specialist" color={color} />
          <InfoBox color={color} dark={dark}>Codestral is a genuinely different kind of model from a general-purpose LLM. It was trained on 80+ programming languages with a 128K token context window, using a mixture of code completion, fill-in-the-middle, and instruction-following objectives. The result is a model that understands code structure in a way that general models do not — it knows where functions begin and end, how indentation creates scope, and how variable names propagate across a file.</InfoBox>
          <p style={{ ...P(sub), marginBottom: '1rem' }}>The key unique capability is Fill-in-the-Middle (FIM). Standard code generation appends new code after a prompt — useful but limited. FIM lets you provide a prefix (code before the cursor) and a suffix (code after the cursor), and Codestral fills in exactly what should go between them. This is how VS Code Copilot-style inline completion works: it sees what is above and below the cursor and inserts the right code in the middle.</p>
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Fill-in-the-Middle (FIM)', desc: 'Provide prefix and suffix code — Codestral inserts the correct code between them. Powers cursor-position completion in VS Code and JetBrains plugins. Use the /fim/completions endpoint with prompt, suffix, and max_tokens.' },
            { name: 'VS Code integration', desc: 'Install the Mistral AI extension from the VS Code marketplace. Set CODESTRAL_API_KEY in settings. Get inline completions as you type — comparable to GitHub Copilot but powered by Codestral and significantly cheaper.' },
            { name: 'Test generation', desc: "Ask Codestral to generate unit tests for existing code. Its understanding of the code's structure — not just its text — means it generates tests that cover actual edge cases, not just happy paths." },
            { name: 'Multi-language support', desc: 'Unlike models optimized primarily for Python and JavaScript, Codestral has strong coverage of Go, Rust, Java, C++, TypeScript, PHP, Ruby, and Bash. Useful for polyglot codebases.' },
          ]} />
          <div style={{ padding: '0.875rem 1rem', borderRadius: 10, background: dark ? `${color}0A` : `${color}07`, border: `1px solid ${color}20`, marginTop: '0.875rem' }}>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: color, letterSpacing: '0.08em', marginBottom: '0.5rem' }}>CODESTRAL FIM — EXAMPLE</div>
            <pre style={{ fontSize: '0.78rem', color: sub, margin: 0, lineHeight: 1.7, fontFamily: "'Share Tech Mono', monospace", whiteSpace: 'pre-wrap' }}>{`# Standard chat completion for code
response = client.chat.complete(
  model='codestral-latest',
  messages=[{'role': 'user', 'content': 'Write a binary search function in Python'}]
)

# FIM completion — fill between prefix and suffix
response = client.fim.complete(
  model='codestral-latest',
  prompt='def binary_search(arr, target):\\n    left, right = 0, len(arr) - 1\\n    ',
  suffix='\\n    return -1',
  max_tokens=256
)`}</pre>
          </div>
        </Block>

        {/* Open source vs commercial */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Open-weight vs commercial models" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Open-weight models (Apache 2.0)', badge: 'Free to self-host', body: 'Mistral 7B, Mixtral 8x7B, Mixtral 8x22B, Mistral Small, Codestral — released under Apache 2.0 or open research license. Download the weights from HuggingFace, run locally with Ollama or LM Studio, fine-tune on your own data, deploy on your own GPU server. No per-token costs, no data leaving your machine. The catch: you need hardware to run them, and self-hosting at scale is non-trivial.' },
            { label: 'Commercial API models (La Plateforme)', badge: 'Pay per token', body: 'Mistral Large 3, Pixtral Large, and the latest Codestral versions are commercial-only — hosted on Mistral\'s EU infrastructure. Access via API at pay-per-token pricing. No infrastructure management, automatic scaling, SLA guarantees, GDPR-compliant data handling. The right choice when you need managed hosting, legal compliance, or the latest frontier models.' },
            { label: 'Which to use as a student', badge: 'Recommendation', body: 'Start with La Plateforme free tier for development — no hardware needed. Use Ollama + Mistral 7B for offline experimentation and learning. When building portfolio projects, use La Plateforme small/medium models (very cheap). For code projects, Codestral via API or via Ollama (it is open-weight) is the best coding model you can access for free or near-free.' },
          ]} />
        </Block>

        {/* Mistral vs OpenAI vs Groq */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Mistral vs OpenAI vs Groq — when to choose each" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Cost per token', badge: 'Mistral wins', body: 'Mistral Large: $2/$6 per 1M tokens. OpenAI GPT-4o: $5/$15 per 1M tokens. Mistral is 40-60% cheaper than OpenAI for equivalent flagship-tier tasks. Mistral Small at $0.10/$0.30 is competitive with GPT-4o-mini. For high-volume production systems, Mistral\'s pricing advantage compounds significantly.' },
            { label: 'Raw speed / latency', badge: 'Groq wins by far', body: 'Groq (running Llama/Mixtral on custom LPU hardware): 500-800 tokens/second. Mistral La Plateforme: ~80-120 tokens/second. OpenAI GPT-4o: ~50-80 tokens/second. For latency-critical applications, Groq is the choice. For production quality where speed matters less than model quality or cost, Mistral.' },
            { label: 'Code generation quality', badge: 'Mistral has Codestral', body: "Mistral Codestral is a dedicated code model — it uniquely supports fill-in-the-middle completion, has 128K context, and is trained on 80+ languages. OpenAI's o-mini and GPT-4o are strong on code reasoning but are general models. For IDE completion, FIM tasks, and cost-effective code generation, Codestral has a genuine edge." },
            { label: 'GDPR and data residency', badge: 'Mistral wins outright', body: 'Mistral is the only frontier API provider with EU-native infrastructure and explicit GDPR compliance as a core offering. OpenAI processes data in the US. Anthropic processes in the US. Groq is US-based. For any European project with data compliance requirements, Mistral is the default answer.' },
            { label: 'OpenAI compatibility', badge: 'Mistral is easiest to switch to', body: "Mistral deliberately mirrors OpenAI's SDK interface. Switch base_url to https://api.mistral.ai/v1 and change the model name — any existing OpenAI code works on Mistral with minimal changes. This makes Mistral the lowest-friction alternative to add as a fallback provider." },
          ]} />
        </Block>

        {/* Practical use cases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What you can build" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'AI code editor plugin', desc: "Use Codestral's FIM API to build a VS Code extension or CLI tool that completes code at the cursor position. The FIM endpoint understands what's above and below — your completions will feel context-aware, not just predictive." },
            { name: 'Multilingual chatbot', desc: "Mistral Large has native-quality support for French, Spanish, German, Italian, Portuguese, and other European languages — not just English with translation. Build chatbots for non-English users without quality degradation." },
            { name: 'Document processing pipeline', desc: 'Pixtral Large accepts images and text together. Build a pipeline that reads scanned invoices, screenshots of error messages, or architecture diagrams — extract structured data from visual documents programmatically.' },
            { name: 'Cost-efficient RAG system', desc: 'Use Mistral Small for document retrieval and re-ranking (cheap at $0.10/1M), then pass only the top-k chunks to Mistral Large for final answer generation. This two-tier approach cuts costs dramatically versus routing everything through the expensive model.' },
            { name: 'Function calling agent', desc: "Mistral supports OpenAI-compatible function calling / tool use. Define tools (search, database query, API call), pass them to the model, and let it decide when to call them. Build agents that can look things up and take actions." },
            { name: 'Edge AI application', desc: 'Ministral 3B is designed for deployment on devices with limited compute. Costs $0.04/1M tokens via API — or self-host on a Raspberry Pi-class device. Build applications that run inference locally at near-zero marginal cost.' },
          ]} />
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Code Review Bot with Codestral</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build a command-line code review tool that accepts a Python file, sends it to Codestral, and returns a structured review: what the code does, potential bugs, improvements, and a refactored version. This project demonstrates Codestral's code understanding and Mistral's function calling. Focus on: (1) reading files and passing code as context, (2) structured output using JSON mode, (3) comparing the original and refactored versions, (4) cost tracking (log token usage per review).</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up your environment', body: 'pip install mistralai python-dotenv. Create .env with MISTRAL_API_KEY=your_key. Create .gitignore with .env. The free trial credits are sufficient to complete this project.' },
            { n: '2', title: 'Read and send the code file', body: "with open('target.py', 'r') as f: code = f.read()\nThen construct a system prompt: 'You are a senior Python developer. Review the following code and return a JSON object with keys: summary, bugs, improvements, refactored_code.' Pass code in the user message." },
            { n: '3', title: 'Use JSON mode for structured output', body: "Add response_format={'type': 'json_object'} to your chat.complete() call. Mistral will guarantee the response is valid JSON. Parse with json.loads(response.choices[0].message.content). Print each field formatted with color using colorama or rich." },
            { n: '4', title: 'Track token usage and cost', body: "Access response.usage.prompt_tokens and response.usage.completion_tokens. Calculate cost: input_cost = (prompt_tokens / 1_000_000) * 0.30 (Codestral pricing). Print the estimated cost per review. Run 10 reviews and track cumulative spend." },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>ESTIMATED COST: ~$0.001 per code review with Codestral — 1000 reviews for $1</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Mistral's SDK is intentionally OpenAI-compatible. If you are already building with the OpenAI Python SDK, you can point it at Mistral's base URL with one line: client = OpenAI(api_key=MISTRAL_KEY, base_url="https://api.mistral.ai/v1"). Use this to A/B test OpenAI vs Mistral on the same task with the same code — measure quality, latency, and cost side-by-side. This is a valuable habit for any production system: never depend on a single provider.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/apis/aws-bedrock')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> AWS Bedrock
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/agents/langchain')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            LangChain <ChevronRight size={14} />
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

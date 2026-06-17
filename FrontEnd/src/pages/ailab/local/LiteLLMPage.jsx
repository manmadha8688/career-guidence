import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#EC4899'

export default function LiteLLMPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(236,72,153,0.09)' : 'rgba(236,72,153,0.11)'
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Local AI</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🔧</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>LiteLLM — One Interface for 100+ AI Providers</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Switch between OpenAI, Claude, Gemini, Groq, Ollama with one line of code</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ 100% FREE', '#4ADE80'], ['litellm.ai', color], ['Open Source', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Every AI provider — OpenAI, Anthropic, Google, Groq, Mistral, Cohere, AWS Bedrock, Azure, Ollama, and 100 more — has a different SDK, different API format, different authentication, different error messages. When you build with one provider and need to switch, you rewrite code. LiteLLM solves this completely. It is a free, open-source Python library (MIT license) that gives every provider the same interface: one function call, one response format, one way to handle errors. Write your AI code once with litellm.completion() and call any provider by just changing the model name string. No other code changes. LiteLLM also ships as a standalone proxy server — the LiteLLM Proxy — so your whole team uses one endpoint regardless of which model they need. For students learning AI development, LiteLLM is the fastest way to experiment with different providers without learning multiple SDKs.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'LiteLLM Crash Course | For Complete Beginners', url: 'https://www.youtube.com/watch?v=WyW4Ifu4rSo', dur: 'June 2025', note: 'Fundamentals of LiteLLM — SDK usage, 100+ providers, OpenAI format explained' },
            { label: 'LiteLLM Proxy Tutorial: Track Costs, Budgets, and Multi-Provider LLM Usage', url: 'https://www.youtube.com/watch?v=9t-W51EHgzY', dur: 'Jan 2026', note: 'Proxy server setup, cost tracking, budgets, and multi-provider routing' },
            { label: 'LiteLLM: Free Open Source Gateway to Manage All Your LLM Providers', url: 'https://www.youtube.com/watch?v=mwP4sdp7gW0', dur: 'Feb 2026', note: 'Unified API gateway overview — virtual keys, fallbacks, load balancing' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What is provider abstraction */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The provider abstraction problem" color={color} />
          <InfoBox color={color} dark={dark}>Without LiteLLM, switching from OpenAI to Anthropic means importing a different SDK, learning a different API structure, rewriting all your completion calls, and handling a completely different error format. With LiteLLM, the only change is the model name string: "gpt-4o" → "claude-3-5-sonnet-20241022". Everything else stays the same.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The AI landscape in 2025 has dozens of competitive providers. OpenAI GPT-4o leads in general capability. Claude leads in long context and coding. Gemini Flash is the fastest and cheapest. Groq runs inference at 500+ tokens/second. Ollama runs models locally for free. The right provider depends on your use case, budget, and latency requirements — and that can change over time. Building your app tightly coupled to one provider's SDK is a liability. LiteLLM decouples your application logic from the provider completely. You configure which provider to use at the model name level — not at the code level. This is the same pattern that made database abstraction layers (like SQLAlchemy) a standard part of Python development.</p>
        </Block>

        {/* Getting started */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting started with LiteLLM SDK" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install LiteLLM', body: 'pip install litellm\nThat is all. LiteLLM is a pure Python package. No separate service to run for the SDK. Works with Python 3.8+.' },
            { n: '2', title: 'Call any provider with litellm.completion()', body: "import litellm\n\n# OpenAI\nresponse = litellm.completion(\n    model='gpt-4o',\n    messages=[{'role': 'user', 'content': 'Hello'}]\n)\n\n# Anthropic Claude — same call, different model name\nresponse = litellm.completion(\n    model='claude-3-5-sonnet-20241022',\n    messages=[{'role': 'user', 'content': 'Hello'}]\n)\n\n# Google Gemini — same call\nresponse = litellm.completion(\n    model='gemini/gemini-2.0-flash',\n    messages=[{'role': 'user', 'content': 'Hello'}]\n)\n\nprint(response.choices[0].message.content)" },
            { n: '3', title: 'Set your API keys via environment variables', body: "import os\nos.environ['OPENAI_API_KEY'] = 'your-key'\nos.environ['ANTHROPIC_API_KEY'] = 'your-key'\nos.environ['GEMINI_API_KEY'] = 'your-key'\nos.environ['GROQ_API_KEY'] = 'your-key'\n\nLiteLLM auto-detects which key to use based on the model name prefix. You can have all keys set at once — LiteLLM picks the right one." },
            { n: '4', title: 'Use streaming exactly like OpenAI', body: "response = litellm.completion(\n    model='gpt-4o',\n    messages=[{'role': 'user', 'content': 'Count to 10'}],\n    stream=True\n)\nfor chunk in response:\n    print(chunk.choices[0].delta.content or '', end='', flush=True)\n\nStreaming works the same way for every provider — LiteLLM normalizes the different streaming formats." },
          ]} />
        </Block>

        {/* Provider examples */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Calling different providers — same code pattern" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'OpenAI', desc: "model='gpt-4o' or model='gpt-4o-mini'\nRequires OPENAI_API_KEY. The original — highest general capability, most tool/function support. Use when quality matters most." },
            { name: 'Anthropic Claude', desc: "model='claude-3-5-sonnet-20241022' or model='claude-opus-4-5'\nRequires ANTHROPIC_API_KEY. Best for long-context tasks, coding, detailed analysis, and instruction following." },
            { name: 'Google Gemini', desc: "model='gemini/gemini-2.0-flash' or model='gemini/gemini-2.0-pro'\nRequires GEMINI_API_KEY (free). Fastest response times for Flash. Large free tier — best starting model." },
            { name: 'Groq', desc: "model='groq/llama-3.1-70b-versatile'\nRequires GROQ_API_KEY (free tier). Runs Llama 3 at 500+ tok/sec — fastest inference. Use when speed matters." },
            { name: 'Ollama (local)', desc: "model='ollama/llama3.1' with api_base='http://localhost:11434'\nNo API key. Runs locally via Ollama. Zero cost, complete privacy. Use for development or sensitive data." },
            { name: 'AWS Bedrock', desc: "model='bedrock/anthropic.claude-3-5-sonnet-20241022-v2:0'\nRequires AWS credentials. Enterprise choice — Claude and Llama on AWS infrastructure with compliance guarantees." },
            { name: 'Azure OpenAI', desc: "model='azure/your-deployment-name'\nRequires AZURE_API_KEY and AZURE_API_BASE. Same GPT models on Microsoft infrastructure — preferred for enterprise Azure users." },
            { name: 'Mistral AI', desc: "model='mistral/mistral-large-latest'\nRequires MISTRAL_API_KEY (generous free tier). Strong coding and reasoning. European provider — GDPR native." },
          ]} />
        </Block>

        {/* LiteLLM Proxy */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="LiteLLM Proxy — team-wide LLM gateway" color={color} />
          <InfoBox color={color} dark={dark}>The LiteLLM Proxy is a FastAPI server you run once. Every developer on your team — and every application — sends requests to this one endpoint. The proxy handles routing to the right provider, tracks costs per team/project, enforces budgets, and manages all API keys centrally. Teams use the same OpenAI SDK they already know — just pointing to the proxy URL instead of api.openai.com.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install and start the proxy', body: "pip install 'litellm[proxy]'\n\n# Start with a model config\nlitellm --model gpt-4o\n\n# Or with a config file for multiple models\nlitellm --config config.yaml\n\nProxy starts on http://localhost:4000. That's your unified LLM endpoint." },
            { n: '2', title: 'Create a config.yaml for multiple providers', body: "model_list:\n  - model_name: gpt-4o\n    litellm_params:\n      model: openai/gpt-4o\n      api_key: os.environ/OPENAI_API_KEY\n  - model_name: claude-sonnet\n    litellm_params:\n      model: anthropic/claude-3-5-sonnet-20241022\n      api_key: os.environ/ANTHROPIC_API_KEY\n  - model_name: gemini-flash\n    litellm_params:\n      model: gemini/gemini-2.0-flash\n      api_key: os.environ/GEMINI_API_KEY\n\nlitellm_settings:\n  success_callback: ['langfuse']" },
            { n: '3', title: 'Call the proxy from any OpenAI SDK', body: "from openai import OpenAI\n\nclient = OpenAI(\n    base_url='http://localhost:4000',\n    api_key='any-virtual-key'  # create in proxy dashboard\n)\n\n# This hits Claude through your proxy\nresponse = client.chat.completions.create(\n    model='claude-sonnet',\n    messages=[{'role': 'user', 'content': 'Hello'}]\n)\n\nAny code written for OpenAI works unchanged — just change the base_url." },
            { n: '4', title: 'Access the proxy admin dashboard', body: "Go to http://localhost:4000/ui — the built-in admin dashboard shows:\n- Total spend by model, team, and user\n- Request logs with latency and token counts\n- Virtual key management (create, revoke, set budgets)\n- Rate limit configuration per key\n- Live request traces" },
          ]} />
        </Block>

        {/* Fallback routing */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Fallbacks and load balancing" color={color} />
          <p style={{ ...P(sub), marginBottom: '1rem' }}>LiteLLM has built-in fallback routing — if one provider fails or rate-limits you, it automatically retries with the next provider in your list. This is critical for production applications where a single provider going down should not take your app down.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'SDK-level fallbacks', body: "from litellm import completion\n\nresponse = completion(\n    model='gpt-4o',\n    messages=[{'role': 'user', 'content': 'Hello'}],\n    fallbacks=['claude-3-5-sonnet-20241022', 'gemini/gemini-2.0-flash']\n)\n\nIf OpenAI fails → tries Claude → tries Gemini. One line to add multi-provider redundancy." },
            { n: '2', title: 'Load balancing across providers', body: "from litellm import Router\n\nrouter = Router(model_list=[\n    {'model_name': 'gpt-4o', 'litellm_params': {'model': 'openai/gpt-4o', 'tpm': 100000}},\n    {'model_name': 'gpt-4o', 'litellm_params': {'model': 'azure/gpt-4o-deployment', 'tpm': 100000}},\n])\n\n# Distributes load across both GPT-4o endpoints\nresponse = router.completion(model='gpt-4o', messages=[...])" },
            { n: '3', title: 'Content policy fallbacks', body: "# Fall back when provider rejects the request (content filtering)\nresponse = completion(\n    model='gpt-4o',\n    messages=messages,\n    fallbacks=['claude-3-5-sonnet-20241022'],\n    context_window_fallbacks=['gpt-4o-mini']  # fall back when context too long\n)" },
          ]} />
        </Block>

        {/* Cost tracking */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Cost tracking and virtual keys" color={color} />
          <p style={{ ...P(sub), marginBottom: '1rem' }}>LiteLLM tracks the cost of every API call automatically, using the published pricing for each provider. In the proxy, you can create virtual keys with spending limits — individual developers or teams get their own key with a monthly budget cap. When the budget is hit, the key stops working automatically.</p>
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Automatic cost tracking', desc: "LiteLLM knows the per-token pricing for every supported model. After every completion call, response._hidden_params['response_cost'] contains the exact cost in USD. No manual calculation needed." },
            { name: 'Virtual keys', desc: "Create sk-virtual-abc123 keys in the proxy dashboard. Each key tracks spend separately. Set monthly budgets per key — when reached, requests are blocked. Ideal for team projects." },
            { name: 'Team budgets', desc: 'Assign keys to teams. See which team spends most on which model. Identify cost optimization opportunities. Get Slack/email alerts when budgets approach limits.' },
            { name: 'Usage dashboard', desc: 'Built-in proxy UI at /ui shows cost breakdown by model, user, team, and time period. Export to CSV. Integrate with Langfuse or Prometheus for custom dashboards.' },
          ]} />
        </Block>

        {/* Compare */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="LiteLLM vs OpenRouter vs direct SDKs" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'LiteLLM (Python SDK + Proxy)', badge: 'Best for developers', body: 'Python library you control. Run it in your own infrastructure. Your API keys, your data — nothing passes through a third-party service. Best for: building applications, team gateways, full control. Cost: free, open source. Supports local Ollama models too.' },
            { label: 'OpenRouter', badge: 'Managed service', body: "OpenRouter is a hosted proxy service — you pay OpenRouter, they call the provider on your behalf. No setup needed, just one API key. Best for: rapid prototyping, accessing many models quickly. Tradeoff: your data passes through OpenRouter's servers, adds markup to provider pricing." },
            { label: 'Direct provider SDKs', badge: 'Per-provider', body: "openai, anthropic, google-generativeai — each provider's own SDK. Maximum control and latest features for that one provider. Best for: when you are committed to a single provider and need cutting-edge features. Tradeoff: switching providers means rewriting all your AI code." },
          ]} />
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Provider-Agnostic AI Chat App</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build a Python CLI chatbot that can switch between OpenAI, Gemini, and Groq with a single command-line argument — without changing any application logic. This demonstrates the core value of LiteLLM: write once, run on any provider.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up your environment', body: "pip install litellm python-dotenv\n\nCreate .env file with your free API keys:\nGEMINI_API_KEY=your-gemini-key   # free at ai.google.dev\nGROQ_API_KEY=your-groq-key       # free at console.groq.com\nOPENAI_API_KEY=your-openai-key   # optional, costs money" },
            { n: '2', title: 'Write the provider-agnostic chat loop', body: "import sys\nimport litellm\nfrom dotenv import load_dotenv\nload_dotenv()\n\nMODELS = {\n    'gemini': 'gemini/gemini-2.0-flash',\n    'groq': 'groq/llama-3.1-70b-versatile',\n    'openai': 'gpt-4o-mini',\n}\n\nmodel = MODELS.get(sys.argv[1], MODELS['gemini'])\nhistory = []\n\nwhile True:\n    user_input = input('You: ')\n    if user_input.lower() == 'quit': break\n    history.append({'role': 'user', 'content': user_input})\n    response = litellm.completion(model=model, messages=history)\n    reply = response.choices[0].message.content\n    history.append({'role': 'assistant', 'content': reply})\n    print(f'AI ({model}): {reply}')" },
            { n: '3', title: 'Add cost tracking', body: "# After each completion call:\ncost = response._hidden_params.get('response_cost', 0)\nprint(f'[Cost: ${cost:.6f}]')\n\n# Track total session cost\ntotal_cost += cost\nprint(f'[Session total: ${total_cost:.4f}]')" },
            { n: '4', title: 'Add fallback routing', body: "# If primary provider fails, auto-switch\nresponse = litellm.completion(\n    model=model,\n    messages=history,\n    fallbacks=['gemini/gemini-2.0-flash', 'groq/llama-3.1-8b-instant']\n)\n\n# Run: python chat.py gemini\n# Run: python chat.py groq\n# Run: python chat.py openai\n# All use identical chat logic" },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>FREE TIER: Gemini API and Groq API are both free with generous limits — build and test this project at zero cost</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>LiteLLM has a built-in testing mode — set litellm.mock_response = True and every call returns a fake response instantly, no API key needed. This is invaluable for testing your application logic without burning API credits. Use it in unit tests and CI pipelines. Also: set litellm.set_verbose = True to see exactly which provider was called, what was sent, what came back, and the cost. Essential for debugging why a call failed or why costs are higher than expected.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/local/lmstudio')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> LM Studio
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/local/localai')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            LocalAI <ChevronRight size={14} />
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

import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#6366F1'

export default function OpenRouterPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(99,102,241,0.09)' : 'rgba(99,102,241,0.11)'
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🛣️</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>OpenRouter — One API Key for 200+ AI Models</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Switch between any LLM with one line of code — including free models</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE Models', '#4ADE80'], ['openrouter.ai', color], ['200+ Models', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>OpenRouter is not an AI model company — it is a routing layer. Think of it as a travel aggregator for AI models: instead of buying direct from one airline, you book through one platform that connects to hundreds of routes. OpenRouter gives you a single API endpoint, a single API key, and a single billing account that grants access to 500+ models from 60+ providers — GPT-4o, Claude Sonnet, Llama 4, Gemini, Mistral, Qwen, DeepSeek, and dozens more. The API is 100% OpenAI-compatible, meaning any code that runs against OpenAI's API runs against OpenRouter by changing one line: the base URL. What makes this genuinely powerful for students and developers is the breadth of free models available with no credit card, the ability to compare and switch models with a single parameter change, and automatic fallback routing if a provider has downtime. You stop thinking about which provider to use and start thinking about which model fits your task.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'How to Access EVERY AI Model with ONE API Key (OpenRouter Tutorial)', url: 'https://www.youtube.com/watch?v=JYw6yFzVi44', dur: '~10 min', note: 'Complete walkthrough — API key setup, model switching, free models' },
            { label: 'How to Use OpenRouter AI — Free LLM Models, Pricing & API Key Tutorial', url: 'https://www.youtube.com/watch?v=OkMep9yQICM', dur: '~15 min', note: 'Registration, free vs paid models, API key, Postman REST demo' },
            { label: 'How to use OpenRouter API with JavaScript Node.js Tutorial', url: 'https://www.youtube.com/watch?v=lSwoy6ZHIWw', dur: '~12 min', note: 'Real code — Node.js integration with model switching' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* How routing works */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How the routing concept works" color={color} />
          <InfoBox color={color} dark={dark}>OpenRouter sits between your application and every AI provider. Your request goes to one endpoint (openrouter.ai/api/v1/chat/completions), and OpenRouter routes it to whichever model and provider you specify in the model parameter. The providers — OpenAI, Anthropic, Google, Meta, Mistral — never see your application code. OpenRouter normalises their different API formats into a single OpenAI-compatible response shape, so you write the integration once and it works across every model.</InfoBox>
          <p style={{ ...P(sub), marginBottom: '0.875rem' }}>The routing layer adds one small overhead: approximately 50-150ms of additional latency on each request, and a 5.5% markup on credits for paid models. For most use cases this is imperceptible and the cost is easily offset by not needing separate API keys, accounts, and billing for each provider.</p>
          <p style={{ ...P(sub), marginBottom: 0 }}>The real power emerges when you use routing features: set a list of fallback models so your app keeps working even if OpenAI has downtime. Set cost limits per request. Route between a cheap fast model for simple tasks and an expensive powerful model only when needed. These patterns would require significant engineering work with direct provider APIs. With OpenRouter they are configuration options.</p>
        </Block>

        {/* Free models */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Free models available right now" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Meta Llama 4 Scout :free', desc: 'Meta\'s newest open-source model. Strong reasoning and instruction following at zero cost. Model ID: meta-llama/llama-4-scout:free — rate limit 20 req/min, 200 req/day.' },
            { name: 'Meta Llama 4 Maverick :free', desc: 'Larger Llama 4 variant. Better for complex tasks, longer reasoning chains. Free tier with the same 200 requests/day limit. Solid GPT-3.5-class quality at no cost.' },
            { name: 'Google Gemma 3 27B :free', desc: 'Google\'s best open Gemma variant available free. Excellent instruction following and safe outputs. Model ID: google/gemma-3-27b-it:free. Also available: 12B and 4B variants.' },
            { name: 'Qwen3 Coder :free', desc: 'Strongest free coding model on OpenRouter. 1M token context window — entire codebases fit in one call. From Alibaba\'s Qwen team. Best free choice for code generation tasks.' },
            { name: 'DeepSeek V4 Flash :free', desc: 'DeepSeek\'s fast reasoning model available free. Excellent for reasoning-heavy coding tasks and math. Chinese open-source model that competes with top Western models on benchmarks.' },
            { name: 'Free Models Router', desc: 'Model ID: openrouter/auto — OpenRouter automatically picks an appropriate free model for each request. Use this when you just want something that works and do not care which specific model answers.' },
          ]} />
          <div style={{ padding: '0.75rem 1rem', borderRadius: 10, background: dark ? 'rgba(74,222,128,0.07)' : 'rgba(74,222,128,0.05)', border: '1px solid rgba(74,222,128,0.2)', marginTop: '0.75rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#4ADE80', letterSpacing: '0.08em' }}>FREE TIER LIMITS: 20 requests/minute · 200 requests/day · No credit card · No hidden fees · Models have :free suffix in the ID</span>
          </div>
        </Block>

        {/* Getting started */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting started — change two lines" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create a free account and get your API key', body: 'Go to openrouter.ai → Sign up (no credit card needed for free models) → Keys → Create key. Copy the key — it starts with sk-or-v1-. Free models work immediately with zero balance.' },
            { n: '2', title: 'Install the OpenAI SDK (you already know it)', body: "pip install openai (Python) or npm install openai (Node.js). OpenRouter is fully OpenAI-compatible — you use the exact same SDK. No separate openrouter package needed." },
            { n: '3', title: 'Change the base URL and model — that is the entire migration', body: "from openai import OpenAI\nclient = OpenAI(\n  base_url='https://openrouter.ai/api/v1',\n  api_key='sk-or-v1-your_key_here'\n)\nresponse = client.chat.completions.create(\n  model='meta-llama/llama-4-scout:free',\n  messages=[{'role': 'user', 'content': 'Hello!'}]\n)\nprint(response.choices[0].message.content)" },
            { n: '4', title: 'Switch models by changing one parameter', body: "To use Claude instead: model='anthropic/claude-3.5-sonnet'\nTo use Gemini: model='google/gemini-2.0-flash-001'\nTo use GPT-4o: model='openai/gpt-4o'\nEvery other line of code stays identical. This is the core value — experiment with any model without rewriting your integration." },
            { n: '5', title: 'Add fallback routing for reliability', body: "Pass a list of models: OpenRouter tries the first, falls back to the next if unavailable. In the extra_body param: extra_body={'models': ['openai/gpt-4o', 'anthropic/claude-3.5-sonnet', 'meta-llama/llama-4-scout:free']}. Your app never goes down because one provider had outage." },
          ]} />
        </Block>

        {/* Model comparison features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Model comparison on openrouter.ai" color={color} />
          <p style={{ ...P(sub), marginBottom: '0.875rem' }}>The openrouter.ai website is one of the most useful model comparison tools available anywhere — better than most third-party benchmarking sites because it shows real production pricing and live data. Go to openrouter.ai/models to see every model with its current price per million tokens for input and output, context window size, latency benchmarks, and provider availability.</p>
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Price comparison table', desc: 'Side-by-side pricing for all 500+ models. Sort by price to find the cheapest capable model for your task. Filter by free-only to see what costs nothing. Prices update in real time as providers change their rates.' },
            { name: 'Context window filter', desc: 'Filter models by context window size — 8K, 32K, 128K, 1M tokens. Critical when working with large documents or long code files. Some models like Qwen3 Coder offer 1M context even on the free tier.' },
            { name: 'Speed benchmarks', desc: 'Tokens per second (throughput) and time-to-first-token (latency) for each model. For chatbot applications, time-to-first-token matters more than throughput. OpenRouter shows both metrics across providers.' },
            { name: 'Model arena / rankings', desc: 'openrouter.ai/rankings shows model performance rankings across categories: coding, reasoning, math, creative writing. Based on actual usage patterns rather than just benchmark scores. Useful for picking the right model per task type.' },
          ]} />
        </Block>

        {/* OpenRouter vs direct API */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="OpenRouter vs direct provider APIs" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Setup complexity', badge: 'OpenRouter wins clearly', body: 'Direct APIs: one account, one key, one SDK, one billing account per provider. If you use OpenAI + Anthropic + Google = 3 accounts, 3 keys, 3 billing setups, 3 different SDKs. OpenRouter: one account, one key, one SDK for all of them. For prototyping and experimentation this is a significant time saving.' },
            { label: 'Cost per token', badge: 'Direct API is slightly cheaper', body: 'OpenRouter charges a 5.5% markup on credits for paid models — you pay $1.055 for $1 worth of tokens. At low to moderate usage this is worth the convenience. At high production scale (millions of tokens/day), direct APIs save meaningful money. For learning and building: the 5.5% is irrelevant.' },
            { label: 'Free tier access', badge: 'OpenRouter wins significantly', body: 'Most direct provider APIs require a credit card and paid plan to access their models. OpenRouter offers 20+ free models with 200 requests/day, no credit card required. For students building projects, this is the biggest practical difference — real models at zero cost.' },
            { label: 'Model switching speed', badge: 'OpenRouter wins by design', body: 'Switching from GPT-4o to Claude on direct APIs requires rewriting your integration — different SDK, different auth, different response parsing. On OpenRouter: change one line. For A/B testing models or finding the best model for a task, this speed is transformative.' },
            { label: 'Rate limits', badge: 'Direct API often higher', body: 'Direct provider accounts — especially paid ones — typically have higher rate limits than going through OpenRouter, which applies its own limits on top of provider limits. For high-throughput production workloads, direct API gives you more headroom to negotiate limit increases.' },
            { label: 'Provider-specific features', badge: 'Direct API wins for advanced use', body: 'Some providers offer unique features only through their direct API: Anthropic\'s prompt caching, OpenAI\'s Assistants API with file storage, Google\'s grounding with Search. These features are not available through the OpenRouter routing layer. Use direct API when you need provider-specific capabilities.' },
          ]} />
        </Block>

        {/* Practical use cases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="When OpenRouter is the right choice" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Prototyping and experimentation', desc: 'You want to test 5 different models on your task and pick the best one. With OpenRouter: write the code once, loop through model names, compare outputs. What would take days with direct APIs takes an afternoon.' },
            { name: 'Cost optimization routing', desc: 'Route simple questions to a cheap fast model (Llama 4 Scout at $0.03/M tokens) and complex reasoning tasks to a premium model (Claude 3.5 Sonnet at $3/M tokens). Same codebase, automatic cost management.' },
            { name: 'High-availability production apps', desc: 'Set up fallback chains: try OpenAI first, fall back to Anthropic, fall back to free Llama if both are down. Your app maintains uptime across provider outages. One configuration, no custom failover logic to write.' },
            { name: 'Access models not on your platform', desc: "OpenRouter hosts models that many platforms don't offer — DeepSeek, Qwen, Yi, Nous Hermes, various Mistral variants. If you want to use a specific open-source or Chinese model that OpenAI and Anthropic don't offer, OpenRouter often has it." },
            { name: 'Zero-cost learning projects', desc: 'Build your portfolio project with real AI models at zero cost. Free Llama 4 or Gemma 3 models on OpenRouter are capable enough to build meaningful applications. Impress interviewers with a real product that runs on production-quality models.' },
            { name: 'Multi-model comparison tools', desc: 'Build a tool that sends the same prompt to GPT-4o, Claude, Gemini, and Llama simultaneously and displays all responses side by side. Only possible with OpenRouter\'s unified interface — building this with direct APIs would take weeks.' },
          ]} />
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Model Comparison Tool</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build a web app or CLI that sends the same prompt to 3 different free models via OpenRouter simultaneously and displays their responses side by side. This project demonstrates the core value of OpenRouter — write the integration once, use any model. It also makes a genuinely useful tool: a personal AI model comparison playground. Focus on: (1) concurrent API calls to all 3 models at once using async, (2) displaying which model responded faster, (3) clean UI that makes responses easy to compare.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up the project', body: 'Create a folder. pip install openai python-dotenv aiohttp (Python) for async calls. Create .env with OPENROUTER_API_KEY=your_key. Create a .gitignore with .env on line 1. All free models, so total cost: zero.' },
            { n: '2', title: 'Build the async multi-model caller', body: "import asyncio\nfrom openai import AsyncOpenAI\n\nclient = AsyncOpenAI(base_url='https://openrouter.ai/api/v1', api_key=os.getenv('OPENROUTER_API_KEY'))\n\nasync def ask_model(model, prompt):\n    r = await client.chat.completions.create(model=model, messages=[{'role':'user','content':prompt}])\n    return model, r.choices[0].message.content\n\nasync def compare(prompt):\n    models = ['meta-llama/llama-4-scout:free', 'google/gemma-3-27b-it:free', 'qwen/qwen3-coder:free']\n    results = await asyncio.gather(*[ask_model(m, prompt) for m in models])\n    return results" },
            { n: '3', title: 'Add response timing', body: "Wrap each ask_model call with time.time() before and after. Track which model responded first, which was slowest. Display response time next to each model name. This makes the comparison genuinely informative — speed vs quality trade-off becomes visible." },
            { n: '4', title: 'Build the display layer', body: 'Print or render responses in columns. For a web version, use Streamlit (3 st.columns, one response per column) for a clean UI in under 30 lines. For CLI: use rich library for coloured panel boxes. The visual side matters — interviewers see your attention to presentation.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — All free models, 200 requests/day, no credit card required</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Always append :free to the model ID when using free tier models (e.g. meta-llama/llama-4-scout:free not meta-llama/llama-4-scout). Without :free, OpenRouter routes to the paid version and will charge your balance. Check openrouter.ai/models, filter by "Free", and copy the exact model ID shown — it will have the :free suffix. Also: the free tier resets daily, so if you hit the 200 request limit, wait until midnight UTC for the reset, or switch to a different free model while the other recovers.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/apis/huggingface')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Hugging Face
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/apis/aws-bedrock')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            AWS Bedrock <ChevronRight size={14} />
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

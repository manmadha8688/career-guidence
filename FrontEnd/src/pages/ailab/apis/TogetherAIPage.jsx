import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#3B82F6'

export default function TogetherAIPage() {
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>APIs</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🤝</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Together AI — Run 100+ Open-Source Models via API</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>The platform for fast, affordable open-source model inference</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['$1 Free Credit', '#4ADE80'], ['100+ models', color], ['OpenAI-compatible', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Together AI is a cloud inference platform that hosts over 100 open-source models — Llama, Mistral, Qwen, FLUX image generation, Stable Diffusion — accessible through a single OpenAI-compatible API. If you want to experiment with different model families without running anything locally and without paying OpenAI prices, Together AI is the right choice. It gives you access to the full landscape of open-source AI in one place: compare Llama 3.1 70B to Qwen 2.5 72B to Mistral Large on the same task. New accounts get $1 free credit — enough for thousands of API calls on smaller models. Pricing is among the lowest for cloud inference, and the OpenAI SDK compatibility means zero integration changes when switching models.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Together AI Tutorial — Open Source Models via API', url: 'https://www.youtube.com/watch?v=kgRRNBFvRoE', dur: '12 min', note: 'Setup and first API calls' },
            { label: 'Together AI vs OpenAI — Cost and Quality Comparison', url: 'https://www.youtube.com/watch?v=QUc9IXPYBOA', dur: '10 min', note: 'Honest comparison' },
            { label: 'Run Llama 3 with Together AI — Python Tutorial', url: 'https://www.youtube.com/watch?v=Gqm5LR8KZCI', dur: '15 min', note: 'Full project with Llama 3' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why open-source models matter */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why open-source models matter" color={color} />
          <InfoBox color={color} dark={dark}>Open-source models (Llama, Mistral, Qwen, Falcon) are publicly released model weights — anyone can download, run, or fine-tune them. Together AI, Groq, and Hugging Face host these models on cloud infrastructure, making them accessible via API without needing the hardware to run them yourself. The practical choice: open-source models via API for development and experimentation; proprietary models (GPT-4o, Claude) for tasks that demand the highest quality.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The economics are compelling. Llama 3.1 70B on Together AI costs $0.88 per million tokens. GPT-4o costs $2.50 input and $10 output per million tokens — roughly 10x more expensive. For applications with significant token volume — a product with many users, a batch processing pipeline, a RAG system ingesting thousands of documents — this cost difference is the difference between a viable product and an unaffordable one.</p>
        </Block>

        {/* Notable models */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Notable models on Together AI" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Llama 3.1 405B', desc: "Meta's largest open-source model. Comparable to GPT-4o on many benchmarks. $3.50/1M tokens — cheaper than GPT-4o for comparable quality. Best open-source option for complex reasoning." },
            { name: 'Llama 3.1 70B / 8B', desc: 'The practical workhorses. 70B: great quality at $0.88/1M. 8B: extremely cheap at $0.18/1M. 8B handles simple tasks; 70B handles complex ones.' },
            { name: 'Qwen 2.5 72B', desc: "Alibaba's model with strong multilingual performance. Excellent for code generation and tasks involving Asian languages. Often outperforms Llama 3.1 70B on coding benchmarks." },
            { name: 'Mistral 7B / Mixtral 8x7B', desc: "Lightweight, fast models. Mistral 7B is one of the best small models. Mixtral's mixture-of-experts architecture gives large-model quality at smaller-model speed." },
            { name: 'FLUX.1 (image generation)', desc: "State-of-the-art open-source image generation. FLUX.1-schnell is fast and cheap; FLUX.1-dev is higher quality. Both accessible via Together AI's image API." },
            { name: 'Code Llama / DeepSeek Coder', desc: 'Models fine-tuned specifically for code generation. Strong on fill-in-the-middle, code completion, and code explanation. Better than general models on pure coding tasks.' },
          ]} />
        </Block>

        {/* Together AI vs alternatives */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Together AI vs alternatives" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'vs OpenAI API', badge: 'Together wins on cost, OpenAI wins on quality ceiling', body: "Together AI's best models (Llama 3.1 405B) approach GPT-4o quality at lower cost. For 80% of use cases, a $0.88/1M token model is indistinguishable from a $2.50/1M token model. Switch down to Together for cost savings; switch up to OpenAI when quality gaps show." },
            { label: 'vs Groq', badge: 'Different strengths', body: 'Groq prioritizes speed (500+ tokens/sec) with fewer model options. Together AI prioritizes model variety (100+) at competitive pricing but not the same raw speed. Groq for latency-critical apps; Together for model variety and experimentation.' },
            { label: 'vs running locally', badge: 'Together wins for development', body: 'Running Llama locally requires 16-80GB VRAM depending on model size. Together AI gives you cloud access to the same models without the hardware. Use Together AI for development, consider local deployment only for production privacy requirements.' },
            { label: 'vs Hugging Face Inference API', badge: 'Together often faster and cheaper', body: 'Both host open-source models. Together AI tends to have faster inference and lower latency. Hugging Face has more model variety (hundreds of thousands vs hundreds). Together AI for production inference; Hugging Face for finding and experimenting with niche models.' },
          ]} />
        </Block>

        {/* Getting started */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting started" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create account and get API key', body: 'api.together.xyz → Sign up → Settings → API Keys → Create. New accounts get $1 free credit. No credit card required to start.' },
            { n: '2', title: 'Use OpenAI SDK with Together base URL', body: "from openai import OpenAI\nclient = OpenAI(\n  api_key=os.getenv('TOGETHER_API_KEY'),\n  base_url='https://api.together.xyz/v1'\n)\nEvery OpenAI API call now routes to Together. Same code, different models." },
            { n: '3', title: 'Browse the model catalog', body: 'api.together.xyz/models — filter by task (chat, code, image, embedding), by cost, by context length. Each model page shows pricing, a playground to test prompts, and example API calls.' },
            { n: '4', title: 'Compare models on your task', body: 'Run the same 5 prompts through 3 different models. Compare quality and cost. This direct comparison on your actual task is more useful than any benchmark. Settle on the cheapest model that gives acceptable quality.' },
          ]} />
        </Block>

        {/* Model selection strategy */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Model selection strategy" color={color} />
          <InfoBox color={color} dark={dark}>The right model selection strategy is: start with the cheapest model that meets your quality bar, not the most capable model. You can always upgrade. The common mistake is defaulting to the largest, most expensive model and never benchmarking whether a smaller model is good enough.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Define your quality bar first', body: "What does 'good enough' mean for your task? For summarization: accurate main points. For coding: working code. For classification: >90% correct. Define this before comparing models." },
            { n: '2', title: 'Test from cheapest to most capable', body: 'Start with the 8B model. Is it good enough? If yes, done. If not, try 70B. If not, try 405B. Most tasks are solved before you reach the expensive tier.' },
            { n: '3', title: 'Measure on real examples', body: 'Test on 20-30 real examples from your use case. Not generic prompts. Your actual data. A model that scores well on your data is better than one that scores well on academic benchmarks.' },
            { n: '4', title: 'Factor in total cost', body: 'Cost per 1M tokens × expected monthly token volume = monthly budget. Build this spreadsheet before committing to a model. Small per-token differences compound significantly at scale.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Access 100+ open-source models through a single OpenAI-compatible API without changing your code',
            'Run Llama 3.1, Qwen, Mistral, and other top open-source models at 10x lower cost than GPT-4o',
            "Generate images with FLUX.1 (better than DALL-E on many tasks) through the same API",
            'Systematically compare models on your specific task to find the best quality/cost ratio',
            "Build AI applications that are not locked into a single provider's pricing or availability",
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Model Comparison Benchmark</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Pick one task you want to build an AI feature for. Write 10 test prompts for that task. Run all 10 prompts through 3 models: Llama 3.1 8B ($0.18/1M), Llama 3.1 70B ($0.88/1M), and one other (Qwen 2.5 72B or Mixtral 8x7B). Score each response 1-5 for quality. Calculate: average quality score and estimated cost per 1000 requests for each model. Pick the model with the best quality/cost ratio. This is production AI development done right.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Define your task and write test prompts', body: "Be specific: not 'summarize text' but 'summarize a customer support ticket into: problem (1 sentence), steps taken (bullet points), resolution needed (1 sentence)'. Write 10 real examples." },
            { n: '2', title: 'Run through 3 models', body: "Use Together AI's playground (api.together.xyz/playground) for initial testing — no code needed. Run all 10 prompts through all 3 models. Save the outputs." },
            { n: '3', title: 'Score quality', body: 'Score each response 1 (completely wrong) to 5 (exactly right). Calculate average per model. Be strict — a response that is 80% correct but missing a key element is not a 5.' },
            { n: '4', title: 'Calculate cost', body: "Estimate tokens per request (input + output). Multiply by your model's per-1M token price. Multiply by expected request volume. Which model hits your quality bar at the lowest cost?" },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ~$0 from free credit — thousands of test calls on small models</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Use Together AI's playground (no code required) to test prompts on different models before writing any API integration code. This saves significant development time — you discover model quality differences in 5 minutes in the playground versus hours of debugging API code. Always benchmark in the playground first, then integrate the winner.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/apis/openai-api')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> OpenAI API
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/apis/huggingface')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Hugging Face <ChevronRight size={14} />
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

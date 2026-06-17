import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const ACCENT = '#EC4899'
const color   = '#EC4899'

export default function ModalPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark   = theme !== 'light'
  const bg     = dark ? '#020817' : '#F0F4FF'
  const card   = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(236,72,153,0.10)' : 'rgba(236,72,153,0.13)'
  const txt    = dark ? '#E2E8F0' : '#0F172A'
  const sub    = dark ? '#94A3B8' : '#475569'
  const muted  = dark ? '#64748B' : '#94A3B8'

  return (
    <div style={{ minHeight: '100vh', background: bg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse, ${color}07 0%, transparent 65%)`, filter: 'blur(60px)' }} />
      </div>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: dark ? 'rgba(2,8,23,0.93)' : 'rgba(240,244,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${border}` }}>
        <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.1em', color: ACCENT, padding: 0 }}>
          <ArrowLeft size={14} /> AI Lab
        </button>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Serverless Compute</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🚀</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Modal — Serverless GPU Compute for Python</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Run AI models on H100 GPUs with one decorator — scale to zero, pay per second</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE Credits', '#4ADE80'], ['modal.com', color], ['Serverless GPU', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Modal is a serverless cloud platform that turns GPU infrastructure into Python functions. Instead of provisioning servers, writing Dockerfiles, configuring Kubernetes, or managing cloud accounts, you write a Python function and decorate it with <code style={{ fontFamily: "'Share Tech Mono', monospace", background: dark ? 'rgba(236,72,153,0.12)' : 'rgba(236,72,153,0.08)', padding: '0.1rem 0.35rem', borderRadius: 4, fontSize: '0.8rem', color }}>{`@app.function(gpu="H100")`}</code>. Modal handles everything else: spinning up a container with the right GPU drivers, installing your dependencies, running your code, scaling to handle concurrent requests, and spinning back down to zero when done. You pay only for the compute time your code actually runs — not for idle capacity.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Getting Started with Modal — Beginner Introduction to Serverless GPU', url: 'https://www.youtube.com/watch?v=Y7n8sIZV1vQ', dur: '~15 min', note: 'Best first watch — install Modal, write your first decorated function, run on cloud GPU' },
            { label: 'Building End to End ML Applications on Modal — Fine-tune and Deploy', url: 'https://www.youtube.com/watch?v=df-8fiByXMI', dur: '~45 min', note: 'Full ML workflow: fine-tune a diffusion model and deploy it as a web endpoint on Modal' },
            { label: 'Modal LLM Deployment Tutorial — Deploy Fine-Tuned Models with vLLM and LoRA', url: 'https://www.youtube.com/watch?v=ABF5WRPeaEE', dur: '~25 min', note: 'Production LLM deployment — serve a fine-tuned model via vLLM inference on Modal GPUs' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What Modal is */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What Modal is" color={color} />
          <InfoBox color={color} dark={dark}>Modal replaces the entire DevOps stack for AI workloads with Python decorators. Where running a model on GPU traditionally requires provisioning EC2 instances, writing Dockerfiles, pushing images to ECR, configuring security groups, and managing auto-scaling groups, Modal reduces this to three lines: define your container image with the Python packages you need, write a function, decorate it with the GPU type. Modal raised an $87M Series B in October 2025 and by December 2025 was managing 20,000+ concurrent GPUs across 20+ locations globally.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The critical feature is scale-to-zero billing. Traditional GPU cloud instances run 24/7 whether your code is executing or not. A single A100 instance costs ~$3/hour running idle. Modal charges only for actual execution time — measured in milliseconds. A function that runs for 500ms on an H100 costs a fraction of a cent. This makes GPU compute economically viable for projects with sporadic usage: a research script that runs once a day, a Telegram bot that processes voice messages occasionally, or a model endpoint that serves unpredictable traffic. You never pay for idle GPUs.</p>
        </Block>

        {/* How it works */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How Modal works — the decorator model" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Define your container image', body: 'Use Modal\'s Image builder to specify your environment in Python — no Dockerfile needed. `image = modal.Image.debian_slim().pip_install("torch", "transformers", "diffusers")`. Modal builds and caches this image. Subsequent runs with the same image start in under 2 seconds.' },
            { n: '2', title: 'Decorate your function', body: 'Add `@app.function(gpu="H100", image=image)` above any Python function. That\'s all it takes to tell Modal: run this function on an H100 GPU, in the container defined by `image`. You can also specify `gpu="A100"`, `gpu="T4"`, `cpu=4`, `memory=32768`, or `gpu=["H100", "A100"]` for fallback.' },
            { n: '3', title: 'Run locally or deploy as endpoint', body: 'Run the function once with `modal run my_script.py`. Or convert it to a persistent web endpoint with `@app.function(gpu="H100")` combined with `@modal.web_endpoint()` — Modal gives you an HTTPS URL you can call from anywhere, auto-scaling to handle concurrent requests.' },
            { n: '4', title: 'Modal spins up the container', body: 'When called, Modal provisions a container with the requested GPU, restores from a memory snapshot if available (sub-second cold starts), and runs your code. GPU Memory Snapshotting (launched late 2025) pre-warms model weights so containers restart with models already loaded.' },
            { n: '5', title: 'Pay only for execution', body: 'The container runs for the duration of your function and shuts down immediately. You are billed per millisecond of GPU time. No minimum commitments, no reserved instances, no idle charges. The free tier includes $30/month in credits — enough to run serious GPU experiments without a credit card.' },
          ]} />
        </Block>

        {/* Key features */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key features" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'GPU Access (A100, H100)', desc: 'On-demand access to the latest GPU hardware: NVIDIA A10G ($1.10/hr), A100 (40GB and 80GB), H100 SXM ($4.29/hr). Request any GPU type with a single decorator argument. No waitlists, no reserved capacity required.' },
            { name: 'Scale to Zero', desc: 'Containers spin down to zero when idle. You pay nothing when your code is not running. When traffic arrives, Modal spins containers back up — typically in 2–4 seconds cold, or under 1 second with GPU Memory Snapshotting enabled.' },
            { name: 'Container Images in Python', desc: 'Define your environment with `modal.Image` — install packages, copy local files, set environment variables, run build commands. No Dockerfile, no Docker knowledge required. Modal caches layers so rebuilds only reinstall what changed.' },
            { name: 'Web Endpoints', desc: 'Expose any Modal function as an HTTPS API endpoint with `@modal.web_endpoint()` or a full FastAPI/Flask app with `@modal.asgi_app()`. Modal handles TLS, routing, and auto-scaling. Deploy an AI model API in 10 lines of Python.' },
            { name: 'Concurrent Execution', desc: 'Modal auto-scales horizontally. If 100 requests arrive simultaneously, Modal spins up 100 containers in parallel. Each container handles one request. You specify `concurrency_limit` to cap costs or `allow_concurrent_inputs` for batching.' },
            { name: 'Persistent Volumes', desc: 'Mount a Modal Volume to cache large model weights across runs. Download a 70B model once, cache it in a Volume, and all subsequent function calls read from the cache — no re-downloading 40GB of weights on every cold start.' },
          ]} />
        </Block>

        {/* Modal vs alternatives */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Modal vs Replicate vs AWS Lambda" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Modal', badge: 'Python-native, GPU-first', body: 'Full Python control — your own code, any model, any framework. GPU access with decorators. Scale to zero billing. Free $30/month credits. Best for: custom model inference, ML training, research scripts, AI APIs you build yourself. Requires Python knowledge.' },
            { label: 'Replicate', badge: 'Model marketplace', body: 'Run pre-packaged models (Stable Diffusion, Whisper, LLAMA, thousands more) via API — no code required. You pick a model from their catalogue, send inputs, get outputs. Best for: using existing models without writing inference code. Less control, higher per-call cost.' },
            { label: 'AWS Lambda', badge: 'General serverless, no GPU', body: 'Serverless compute for CPU workloads. No GPU support. 15-minute time limit. Best for: APIs, webhooks, event processing — not AI model inference. Large ML models cannot run on Lambda due to package size limits and no GPU. Modal is what Lambda would be if it supported GPU.' },
          ]} />
        </Block>

        {/* Use cases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Use cases" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'AI model inference', desc: 'Serve any HuggingFace model as an API endpoint. Load the model weights once using Volume caching, expose it via `@modal.web_endpoint()`. Handle burst traffic with automatic horizontal scaling. Zero infrastructure management.' },
            { name: 'Fine-tuning jobs', desc: 'Run fine-tuning scripts (QLoRA, full fine-tune) on Modal A100s. Your training script runs in the cloud with full GPU access. Results saved to a Volume. Pay only for the hours your training job runs — not for an always-on instance.' },
            { name: 'Batch processing', desc: 'Process thousands of documents, images, or audio files in parallel. Use `map()` to distribute work across many containers simultaneously. What takes 8 hours sequentially on your laptop takes 15 minutes with 32 parallel Modal containers.' },
            { name: 'Web scrapers and crawlers', desc: 'Run Playwright or Puppeteer browsers in Modal containers for large-scale web scraping. No browser setup locally. Scale to hundreds of parallel browser instances. Pay per second of crawl time.' },
            { name: 'Scheduled ML pipelines', desc: 'Run nightly model retraining, weekly batch inference, or daily data processing with `@app.function(schedule=modal.Period(hours=24))`. Cron jobs that run on GPU — automatically, without any server management.' },
            { name: 'Jupyter-style experiments', desc: 'Run GPU-accelerated notebooks or experiment scripts with `modal run`. Your local Python environment talks to Modal\'s GPU cloud. Interactive development with cloud-scale compute — no GPU required on your laptop.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Run any Python function on GPU hardware (A100, H100) with a single decorator — no Docker, no Kubernetes',
            'Deploy a HuggingFace model as a production HTTPS API endpoint in under 20 lines of Python',
            'Fine-tune LLMs or image generation models on Modal GPUs without provisioning any servers',
            'Process large datasets in parallel by distributing work across hundreds of Modal containers simultaneously',
            'Cache model weights in Modal Volumes so subsequent runs start instantly without re-downloading 40GB files',
            'Run scheduled ML pipelines (nightly retraining, batch inference) with Python cron decorators',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Deploy a Real AI Model as an API</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Deploy a HuggingFace text generation model as a live HTTPS API endpoint on Modal. You will experience the full serverless GPU workflow: define container image, load model weights, expose as endpoint, call from your browser. This is closer to real production AI engineering than anything you will build locally.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install Modal and authenticate', body: 'pip install modal. Run modal setup — it opens your browser to modal.com/signup (free, no credit card). Authenticate your CLI. You now have $30/month in free credits.' },
            { n: '2', title: 'Write your inference function', body: 'Create inference.py. Import modal. Define `image = modal.Image.debian_slim().pip_install("transformers", "torch")`. Define `app = modal.App()`. Write a function that loads a small HuggingFace model (try `distilgpt2` or `facebook/opt-125m`) and runs text generation.' },
            { n: '3', title: 'Add the GPU decorator', body: 'Decorate your function with `@app.function(gpu="T4", image=image)`. T4 is the cheapest Modal GPU — perfect for experiments. Add `@modal.web_endpoint()` to expose it as an HTTPS API that accepts JSON.' },
            { n: '4', title: 'Deploy and call it', body: 'Run `modal deploy inference.py`. Modal builds the container, deploys it, and gives you an HTTPS URL. Call it with curl or fetch() from JavaScript. Your AI model is now a live API on GPU — callable from anywhere in the world.' },
            { n: '5', title: 'Add Volume caching', body: 'Add a `modal.Volume` to cache the model weights. On first run, the model downloads from HuggingFace and saves to the Volume. On all subsequent calls, it loads from the Volume — cold starts drop from 60 seconds to 3 seconds. This is how production AI APIs handle model loading.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: Free — $30/month credits, T4 GPU ~$0.30/hr, small experiments cost cents</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Start with Modal's example gallery at modal.com/docs/examples before writing code from scratch. Modal maintains production-quality examples for common AI tasks: LLM inference with vLLM, Stable Diffusion image generation, Whisper transcription, fine-tuning with QLoRA. Copy an example, understand each part, then modify it for your use case. This is much faster than starting from scratch and gives you production patterns you would not discover on your own — like GPU Memory Snapshotting and Volume caching for fast cold starts.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/data/langfuse')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Langfuse
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${ACCENT}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: ACCENT, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            AI Lab <ChevronRight size={14} />
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

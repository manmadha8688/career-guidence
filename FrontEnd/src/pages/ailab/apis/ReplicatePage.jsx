import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN  = '#00D9FF'
const color = '#EC4899'

export default function ReplicatePage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark   = theme !== 'light'
  const bg     = dark ? '#020817' : '#FDF2F8'
  const card   = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(236,72,153,0.09)' : 'rgba(236,72,153,0.13)'
  const txt    = dark ? '#E2E8F0' : '#0F172A'
  const sub    = dark ? '#94A3B8' : '#475569'
  const muted  = dark ? '#64748B' : '#94A3B8'

  return (
    <div style={{ minHeight: '100vh', background: bg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse, ${color}07 0%, transparent 65%)`, filter: 'blur(60px)' }} />
      </div>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: dark ? 'rgba(2,8,23,0.93)' : 'rgba(253,242,248,0.95)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${border}` }}>
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🔁</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1rem,3vw,1.55rem)', color: txt, margin: '0 0 0.25rem' }}>Replicate — Run Any AI Model With One API Call</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Image generation, video, audio, language — any model, pay per second</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ Free Credits', '#4ADE80'], ['replicate.com', color], ['Pay-per-use', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Replicate is a cloud platform that works like "GitHub for AI models plus serverless GPUs." It gives you instant API access to 100,000+ open-source machine learning models — image generation with FLUX and Stable Diffusion, video synthesis, voice cloning, speech transcription, language models — all without owning a single GPU or managing any infrastructure. You pay only for the compute seconds your prediction uses. The model runs, you get the output, billing stops. There are no monthly minimums, no idle charges for public models, and no long-term commitments. For developers, this means you can generate a photorealistic image, transcribe audio, or run a 70-billion-parameter language model with literally one API call and a few lines of Python — then pay a few cents for the result. It removes the biggest barrier to experimenting with cutting-edge ML: the need for expensive hardware.</p>
        </div>

        {/* Watch first */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Replicate API Tutorial — Run AI Models in Python', url: 'https://www.youtube.com/watch?v=7ZtuQlX8Yc8', dur: '~14 min', note: 'Full Python walkthrough: API key setup, SDXL image generation, saving outputs' },
            { label: 'Build an Image Generator App with Replicate + Streamlit', url: 'https://www.youtube.com/watch?v=uj6KKoJyTCQ', dur: '~18 min', note: 'End-to-end project — Streamlit UI + Replicate backend, deployable to Streamlit Cloud' },
            { label: 'Replicate AI — Generate Images, Video & Audio via API', url: 'https://www.youtube.com/watch?v=iMTGAHXFIXo', dur: '~20 min', note: 'Covers multiple model types: FLUX, Stable Diffusion, MusicGen, Whisper in one session' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What makes Replicate different */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The model marketplace concept" color={color} />
          <InfoBox color={color} dark={dark}>Replicate works like an app store for ML models. A researcher trains a model, packages it with Cog (Replicate's open-source containerization tool), and publishes it to replicate.com. You — a developer with zero ML knowledge — find it, call it via API, and get results. The researcher's model gets discovered and used at scale; you skip months of setup. Everyone wins.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>Before platforms like Replicate, running an image generation model required: a powerful GPU machine (NVIDIA A100 = $10,000+ to buy), CUDA drivers and Python environment setup, downloading multi-gigabyte model weights, understanding PyTorch or diffusers library internals, and writing inference code from scratch. Replicate collapses this entire stack into a single API call. The GPU spins up on demand, your prediction runs in seconds, and you get a URL pointing to your output. The concept of "pay per second of compute" means that generating one image might cost $0.003. Running a 10-second video generation might cost $0.50. You only pay when predictions are actually running — idle time and setup time are free.</p>
        </Block>

        {/* Available model categories */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Available model categories" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Text-to-Image (66+ models)', desc: 'FLUX.1 Pro and Schnell from Black Forest Labs (state-of-the-art open-source), Stable Diffusion XL, Imagen. Generate photorealistic, artistic, or stylized images from text prompts.' },
            { name: 'Text-to-Video (73+ models)', desc: 'Veo 3.1, Seedance, Minimax, Kling. Generate short video clips from text descriptions or animate still images. Some support audio-synchronized generation.' },
            { name: 'Text-to-Speech (25+ models)', desc: 'ElevenLabs, Bark, Kokoro. Convert text to natural-sounding speech with voice cloning and multiple language support.' },
            { name: 'Speech-to-Text (13+ models)', desc: "OpenAI Whisper and Faster Whisper variants. Transcribe audio files in 99 languages with timestamps, speaker diarization, and word-level accuracy." },
            { name: 'Music Generation (16+ models)', desc: 'MusicGen from Meta. Generate full music tracks from text descriptions — specify genre, tempo, mood, instruments. Up to 30 seconds of high-quality audio.' },
            { name: 'Language Models (LLMs)', desc: 'Llama 3.1 405B (most powerful open-source LLM from Meta), Mixtral, Mistral. Run massive language models without managing GPU servers.' },
            { name: 'Vision & Image Analysis', desc: 'LLaVA, Gemini Vision variants. Analyze images, answer questions about visual content, extract structured data from photos and diagrams.' },
            { name: 'Restoration & Editing', desc: 'Background removal (RMBG, BiRefNet), face restoration (GFPGAN), upscaling (Real-ESRGAN), inpainting, style transfer. Process and enhance existing images programmatically.' },
          ]} />
        </Block>

        {/* Getting Started */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Getting started — your first prediction" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create your account and get API token', body: 'Go to replicate.com → Sign up (GitHub login recommended) → Click your avatar → API tokens → Create token. New accounts receive free starter credits. Copy your token immediately — it is shown only once.' },
            { n: '2', title: 'Install the Python client', body: "pip install replicate\n\nThen set your API token as an environment variable:\nexport REPLICATE_API_TOKEN=r8_your_token_here\n\nOr in a .env file (recommended):\nREPLICATE_API_TOKEN=r8_your_token_here" },
            { n: '3', title: 'Generate your first image with FLUX', body: "import replicate\n\noutput = replicate.run(\n    \"black-forest-labs/flux-schnell\",\n    input={\"prompt\": \"a golden retriever on a surfboard, photorealistic\"}\n)\n\n# output is a list of FileOutput objects\nwith open('output.png', 'wb') as f:\n    f.write(output[0].read())\n\nprint('Image saved as output.png')" },
            { n: '4', title: 'Run any other model the same way', body: "# Whisper — transcribe audio\noutput = replicate.run(\n    \"openai/whisper\",\n    input={\"audio\": open(\"audio.mp3\", \"rb\"), \"language\": \"en\"}\n)\nprint(output[\"transcription\"])\n\n# MusicGen — generate music\noutput = replicate.run(\n    \"meta/musicgen\",\n    input={\"prompt\": \"upbeat jazz, 120bpm\", \"duration\": 10}\n)" },
            { n: '5', title: 'Browse models and find parameters', body: 'Every model on replicate.com has an interactive playground. Run it in the browser first to understand the input parameters (prompt, width, height, num_inference_steps, guidance_scale, seed, etc.). Then copy the API code snippet directly from the model page — Replicate auto-generates Python, JavaScript, and cURL examples for every model.' },
          ]} />
        </Block>

        {/* Replicate Deployments */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Replicate Deployments — host your own model" color={color} />
          <InfoBox color={color} dark={dark}>Deployments give you a private, production-grade API endpoint for any model — community models or your own custom models. Your endpoint scales automatically based on traffic, eliminates cold-start delays with always-on instances, and can be configured with custom hardware (A100, H100, T4) without changing any code.</InfoBox>
          <p style={{ ...P(sub), marginBottom: '1rem' }}>The workflow for publishing your own model uses Cog — Replicate's open-source containerization tool. You define your model's environment (Python version, dependencies, GPU requirements) and write a Predict class with a predict() method. Cog handles generating the API server, Docker container, and cloud deployment automatically. This means a researcher or developer with a custom PyTorch model can publish it as a public or private API endpoint in about 30 minutes, without writing any server code.</p>
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'Scale-to-zero', desc: 'Deployments can scale to zero instances when idle, saving cost. Traffic triggers automatic scale-up. Perfect for low-traffic use cases where cost efficiency matters more than instant response.' },
            { name: 'Always-on instances', desc: 'For production apps where cold starts are unacceptable, configure minimum instances. Your model stays warm and ready. You pay for reserved compute but eliminate the 10-30 second first-prediction delay.' },
            { name: 'Hardware selection', desc: 'Choose from NVIDIA T4, A40, A100, H100 GPUs or CPU-only instances. Switch hardware types without code changes. Real-time cost estimates shown as you configure.' },
            { name: 'Private models', desc: 'Push custom, proprietary models as private endpoints. Only accessible with your API token. Use for fine-tuned models or internal tooling that should not be publicly visible.' },
          ]} />
        </Block>

        {/* Replicate vs Hugging Face vs Modal */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Replicate vs Hugging Face vs Modal" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'What it is', badge: 'Different purposes', body: 'Replicate: run community models via API, pay per prediction. Hugging Face: the open-source hub — model discovery, datasets, training infrastructure, Inference API. Modal: run arbitrary Python functions on cloud GPUs, pay per second. Each solves a different problem.' },
            { label: 'Ease of use', badge: 'Replicate wins for beginners', body: 'Replicate: one function call, no setup. Hugging Face Inference API: similar simplicity but fewer model categories. Modal: requires writing Python infrastructure code — much steeper learning curve. For "I want to call a model and get output," Replicate is fastest to working code.' },
            { label: 'Model variety', badge: 'Replicate leads on creative AI', body: 'Replicate excels at image, video, audio, and creative models. Hugging Face has the largest overall model catalog (500,000+ models) including obscure research models, NLP pipelines, and specialized classifiers. Modal has no model catalog — you bring your own or load from Hugging Face inside your Modal function.' },
            { label: 'Pricing', badge: 'Depends on use case', body: 'Replicate: pay per prediction (seconds of compute). Hugging Face Inference API: free tier for smaller models, Inference Endpoints for dedicated hosting. Modal: pay per GPU-second, very cost-efficient for custom workloads. For occasional image generation, Replicate is cheapest. For continuous workloads, Modal can be more cost-efficient.' },
            { label: 'Best for', badge: 'Pick by use case', body: 'Replicate: "I want to run FLUX/Stable Diffusion/Whisper/MusicGen now, with minimal code." Hugging Face: "I want to explore the research ecosystem, fine-tune models, or use NLP pipelines." Modal: "I have a custom Python ML script and want to run it on cloud GPUs with full control."' },
          ]} />
        </Block>

        {/* Use cases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Use cases for students and developers" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'AI image generation app', desc: 'Build a web app where users type a description and get an AI-generated image. Use FLUX.1 Schnell for fast generations (~3 seconds). Deploy to Streamlit or Vercel. A complete portfolio project in a weekend.' },
            { name: 'Podcast transcription tool', desc: 'Upload an MP3, get back a full transcript with timestamps. Use Whisper on Replicate. Process audio files up to hours long. Add speaker labels, export to SRT subtitle format.' },
            { name: 'Background removal API', desc: 'Build a micro-service that accepts an image URL and returns the subject with background removed. Use RMBG or BiRefNet on Replicate. Useful for product photo automation, profile picture tools.' },
            { name: 'AI music generator', desc: 'Text prompt → 10-30 seconds of generated music using MusicGen. Specify genre, instruments, tempo. Useful for app background music, content creation tools, or demonstrating generative audio to non-technical audiences.' },
            { name: 'Image-to-video animation', desc: 'Take a still image and animate it into a short video clip. Demonstrate creative AI capabilities in portfolio projects. Some models support image + text description to guide the motion.' },
            { name: 'Automated image pipeline', desc: "Batch-process images: upscale low-res photos with Real-ESRGAN, restore old faces with GFPGAN, or run style transfer on 100 images programmatically. Replicate's async predictions API handles batches without blocking your code." },
          ]} />
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build an AI Image Generator Web App</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build a web app where a user types any text description, clicks Generate, and receives an AI-generated image using FLUX via Replicate's API. Use Streamlit (easiest), Flask, or FastAPI as your backend. Focus on: (1) correct API call with FLUX.1 Schnell, (2) displaying the output image in the UI, (3) handling errors gracefully (invalid prompt, API limit), (4) a clean UI with a loading state while the image generates. This is a complete, deployable portfolio project demonstrating real AI integration.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up environment', body: 'pip install replicate streamlit python-dotenv\nCreate .env with REPLICATE_API_TOKEN=r8_your_token\nCreate .gitignore with .env as the first line — never commit API keys.' },
            { n: '2', title: 'Write the core generation function', body: "import replicate\nimport os\nfrom dotenv import load_dotenv\n\nload_dotenv()\n\ndef generate_image(prompt: str) -> str:\n    output = replicate.run(\n        \"black-forest-labs/flux-schnell\",\n        input={\"prompt\": prompt, \"num_outputs\": 1}\n    )\n    return str(output[0])  # returns a URL to the generated image" },
            { n: '3', title: 'Build the Streamlit UI', body: "import streamlit as st\nfrom generate import generate_image\n\nst.title('AI Image Generator')\nprompt = st.text_input('Describe your image')\n\nif st.button('Generate') and prompt:\n    with st.spinner('Generating...'):\n        url = generate_image(prompt)\n        st.image(url, caption=prompt)\n\nRun with: streamlit run app.py" },
            { n: '4', title: 'Improve and experiment', body: 'Add parameters: aspect ratio selector, number of images (1-4), a style dropdown (photorealistic, anime, oil painting — add these words to the prompt). Try swapping flux-schnell for flux-pro for higher quality. Time the predictions and show the generation time in the UI.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>ESTIMATED COST: ~$0.003 per image with flux-schnell — free credits cover 100+ test images</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Always test a model in Replicate's browser playground before writing any code. Every model page has an interactive demo where you can adjust every parameter and see results instantly. Once you find settings that produce good outputs, click "API" on the result — Replicate shows you the exact Python, Node.js, or cURL code that reproduces that specific prediction, with all your chosen parameters already filled in. This saves 30 minutes of trial-and-error in code.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/apis/aws-bedrock')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> AWS Bedrock
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/apis/groq')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Groq <ChevronRight size={14} />
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

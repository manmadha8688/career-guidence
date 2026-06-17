import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronRight, ChevronLeft } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, P, CardGrid } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F97316'

export default function FineTuningPage() {
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>AI Foundations</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🎯</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Fine-Tuning — Adapting AI Models for Your Specific Domain</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>When prompting and RAG aren't enough — specialize any LLM on your own data</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE on Colab', '#4ADE80'], ['Lambda Labs, HuggingFace', color], ['AI Foundations', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Fine-tuning is the process of taking a pre-trained large language model — one that already understands language from training on hundreds of billions of words — and training it further on your own labeled data to specialize its behavior. Where RAG connects an LLM to documents it can search, fine-tuning changes what the model itself knows and how it responds. A customer support model fine-tuned on 10,000 real support conversations learns your product's terminology, your resolution patterns, and your company's tone — permanently, without needing prompts to establish that context every time. For students, understanding when and how to fine-tune separates people who use AI as a tool from people who can build production AI systems.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'LLM Fine Tuning Explained in 8 Minutes: LoRA, QLoRA, DPO', url: 'https://www.youtube.com/watch?v=wmCmrEijfQ0', dur: '8 min', note: 'Best quick conceptual overview — covers the core ideas without code' },
            { label: 'The Complete Guide to End-to-End LLM Fine-Tuning (LoRA, QLoRA & Full)', url: 'https://www.youtube.com/watch?v=jrf5vyOEMr8', dur: 'Complete guide', note: 'Full walkthrough from dataset prep to deployment' },
            { label: 'Fine-Tune ANY LLM with LLaMA Factory | Full Guide', url: 'https://www.youtube.com/watch?v=RL38OsL5ycY', dur: 'Hands-on', note: 'Practical guide using LLaMA Factory — no heavy coding required' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* The decision ladder */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The decision ladder: prompt engineering → RAG → fine-tuning" color={color} />
          <InfoBox color={color} dark={dark}>These are not competing approaches — they are a ladder of investment. Start at the bottom. Prompt engineering is free and takes hours. RAG takes days and costs infrastructure. Fine-tuning takes weeks and costs real money. Only move up when the level below cannot solve your problem. Most real problems are solved at the prompting or RAG level.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The right question is not "should I fine-tune?" but "which approach solves my specific problem with the least investment?" Fine-tuning is justified when you have 500+ high-quality labeled examples, the task requires deep domain-specific reasoning that prompts cannot capture, you need consistent output formats without lengthy system prompts on every call, or you are deploying a small model (7B parameters) and want the quality of a much larger one for your specific task.</p>
        </Block>

        {/* Understanding the techniques */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Understanding the techniques" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Full Fine-Tuning', badge: 'For large enterprises only', body: 'Updates all model weights. Maximum quality but extreme compute requirements — a 7B parameter model needs 100-120 GB of GPU VRAM, approximately $50,000 worth of H100 hardware for a single run. Overkill for 95% of real use cases. Mention it to understand why LoRA exists.' },
            { label: 'LoRA (Low-Rank Adaptation)', badge: 'The standard approach', body: 'Freezes the original model weights and trains tiny "adapter" matrices injected into attention layers. 90%+ fewer trainable parameters. LoRA adapters are 10-100 MB instead of 5-15 GB. Fine-tune a 7B model on a $1,500 consumer RTX 4090. Performance within 1-2% of full fine-tuning. You can swap different LoRA adapters onto the same base model for different tasks.' },
            { label: 'QLoRA (Quantized LoRA)', badge: 'What students should use', body: 'LoRA plus quantizing the base model to 4-bit precision. As little as 0.5 GB of VRAM per billion parameters — a 7B model fits in 4-6 GB VRAM. Runs on the free Google Colab T4 GPU. ~33% memory savings versus LoRA with ~39% longer training time. Negligible accuracy loss. This is how you fine-tune for free.' },
          ]} />
        </Block>

        {/* Platforms */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Platforms for fine-tuning" color={color} />
          <CardGrid color={color} dark={dark} border={border} items={[
            { name: 'Hugging Face AutoTrain', desc: 'No-code web interface. Upload your dataset, choose a base model, configure hyperparameters, click train. Handles NLP, vision, and tabular data. Best starting point for students who want results without writing training loops. AutoML-style tuning built in.' },
            { name: 'Google Colab + Unsloth', desc: 'Free Colab gives T4 GPU (16GB VRAM). Unsloth library makes QLoRA 2x faster with 70% less VRAM. Has ready-made Colab notebooks for Llama 3.2, Phi-3, Mistral, Qwen. This is the free path to actually fine-tuning a model yourself.' },
            { name: 'Together AI', desc: 'Managed fine-tuning + inference in one platform. LoRA fine-tuning from $0.48/1M tokens. H100 SXM at $1.75/hr. Supports Llama, Mistral, and other open models. Best for teams wanting managed fine-tuning without managing servers.' },
            { name: 'Lambda Labs', desc: 'GPU cloud — H100 PCIe at ~$2.49/hr, A100 at ~$1.99/hr with zero egress fees. Run your own PyTorch/Hugging Face training scripts. Best when you want raw GPU access to fully control the training process.' },
          ]} />
        </Block>

        {/* What fine-tuning actually costs */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What fine-tuning actually costs" color={color} />
          <InfoBox color={color} dark={dark}>GPU prices dropped significantly in 2024-2025 — H100 rates fell from ~$8/hr at launch to $2.85-3.50/hr by late 2025 (AWS cut P5 pricing 44% in June 2025). Using QLoRA instead of full fine-tuning reduces compute costs by up to 80%. Smaller base models (7B vs 70B) are proportionally cheaper.</InfoBox>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Small models with LoRA (student range)', body: 'Phi-2 (2.7B): $300-700. Mistral 7B: $1,000-3,000. A 6B model fine-tuned in 40 minutes for under $7 in an optimized setup (Anyscale benchmark). For most student projects, free Colab or <$50 on Together AI covers the experiment.' },
            { n: '2', title: 'Larger models (team range)', body: 'Llama 3.1 13B with LoRA: $2,000-5,000. Llama 70B full fine-tune: up to $35,000. For most production fine-tuning, staying at 7-13B with LoRA is the right cost-quality balance.' },
            { n: '3', title: 'The quality factor that drives cost', body: 'Curated, high-quality training data reduces cost dramatically by shortening training runs. 2,000 carefully written examples often outperforms 20,000 scraped low-quality ones. Data quality is your most important cost lever — not GPU choice.' },
            { n: '4', title: 'Free path: Colab + Unsloth + QLoRA', body: 'pip install unsloth; use a pre-made Unsloth Colab notebook; load Llama 3.2 1B or Phi-3 Mini in 4-bit; format your data as instruction-response pairs; train for 30-60 minutes on free T4. This is genuinely free and genuinely produces a fine-tuned model.' },
          ]} />
        </Block>

        {/* Real-world use cases */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Real-world use cases where fine-tuning pays off" color={color} />
          <CardGrid color={color} dark={dark} border={border} items={[
            { name: 'Customer support', desc: 'Train on 10,000 real support conversations. Model learns your product terminology, resolution patterns, escalation logic, and tone — permanently. No 2,000-word system prompt needed every call.' },
            { name: 'Medical documentation', desc: 'Fine-tuned models (like Meditron on Llama) trained on clinical guidelines reduce charting time by up to 50%. Learn drug names, symptoms, ICD codes, and clinical language that general models handle poorly.' },
            { name: 'Legal document analysis', desc: 'Contract review, clause extraction, jurisdiction-specific language. Fine-tuned models learn to classify clauses, flag risky language, and summarize documents in legal professionals\' terminology.' },
            { name: 'Domain-specific code generation', desc: 'Fine-tuned GPT-J achieved 70.4% secure code generation for C/C++ — 10% above base model. Fine-tune on your company\'s codebase to generate code in your team\'s specific style and patterns.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do after understanding this" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Understand when RAG and prompting are sufficient vs. when fine-tuning is actually the right tool',
            'Fine-tune a small language model (Llama 3.2 1B or Phi-3 Mini) for free on Google Colab using QLoRA',
            'Use Hugging Face AutoTrain for no-code fine-tuning without writing training code',
            'Estimate the realistic cost of fine-tuning a model for a specific production use case',
            'Build a specialized AI model that handles your domain\'s terminology and format requirements without lengthy prompts',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Fine-Tune a Small Model for Free</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Use Google Colab + Unsloth + QLoRA to fine-tune Llama 3.2 1B (or Phi-3 Mini) on a small dataset of your own. Pick a task you care about: a customer FAQ system with 50 Q&A pairs, a code comment generator with 100 code+comment examples, or a study guide generator with 30 topic+summary pairs. Fine-tune on Colab (free T4 GPU). Test before and after — compare how the base model answers vs. your fine-tuned version. This is how you understand fine-tuning in practice, not just theory.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Prepare your dataset', body: 'Create 50-200 instruction-response pairs in JSONL format: {instruction: "question or prompt", output: "ideal answer"}. Quality matters more than quantity — write each example carefully. This is the most important step.' },
            { n: '2', title: 'Open an Unsloth Colab notebook', body: 'Go to unsloth.ai → Notebooks. Open the Llama 3.2 or Phi-3 Mini notebook in Google Colab (free). Unsloth handles the QLoRA setup, quantization, and training loop. You only configure the model, dataset, and hyperparameters.' },
            { n: '3', title: 'Train and monitor', body: 'Connect to the T4 GPU runtime (free in Colab). Run the training cells. Training 50-200 examples takes 5-20 minutes on T4. Watch the loss curve — it should decrease steadily. If it drops to near-zero immediately, your dataset is too small or too simple.' },
            { n: '4', title: 'Compare before and after', body: 'Ask the same 10 questions to the base model AND your fine-tuned version. Where does your model perform better? Where is it worse? What did fine-tuning actually change? This comparison is the learning — understanding what fine-tuning does and does not do.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: $0 — Google Colab free T4 GPU + Unsloth open source</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The most common fine-tuning mistake is treating it as a fix for insufficient prompting. Before spending money on fine-tuning, spend 2 hours aggressively optimizing your prompts and testing few-shot examples. In most cases, a well-crafted system prompt with 5 examples outperforms a lazily fine-tuned model. Fine-tuning is for problems that genuinely cannot be solved with prompting — not for problems where you have not tried hard enough with prompts yet.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/foundations/embeddings')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Embeddings
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/foundations/model-training')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Model Training <ChevronRight size={14} />
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
    <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1.125rem', borderRadius: 11, textDecoration: 'none', background: dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.16)', marginBottom: '0.625rem', transition: 'background 0.15s' }}
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

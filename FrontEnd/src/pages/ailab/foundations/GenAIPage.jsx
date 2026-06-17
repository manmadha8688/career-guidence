import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#8B5CF6'

export default function GenAIPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg   = dark ? '#020817' : '#F0F4FF'
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>AI Foundations</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🧬</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Generative AI — Complete Guide</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>What it is, how it works, what it costs, and where it fails</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['Concept — no signup needed', color], ['AI Foundations', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Generative AI creates new content — text, code, images, audio, video — by learning statistical patterns from massive amounts of existing data. Every AI tool in this lab runs on this foundation. Understanding how it actually works, what it costs, where it fails, and when not to trust it makes you a significantly more effective user of every tool you will ever encounter.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Intro to Large Language Models — Andrej Karpathy', url: 'https://www.youtube.com/watch?v=zjkBMFhNj_g', dur: '1 hr', note: 'Best overall LLM intro — clear, no hype, by former OpenAI researcher' },
            { label: 'Attention in Transformers, Visually Explained — 3Blue1Brown', url: 'https://www.youtube.com/watch?v=eMlx5fFNoYc', dur: '26 min', note: 'How transformers actually work — stunning visual explanation' },
            { label: 'Generative AI Full Course — freeCodeCamp', url: 'https://www.youtube.com/watch?v=mEsleV16qdo', dur: '6+ hrs', note: 'LLMs, RAG, LangChain, vector databases — complete hands-on course' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* How LLMs actually work */}
        <Block dark={dark} border={border} card={card}>
          <p style={P(sub)}>The core technology is a Large Language Model (LLM). Training happens in two phases. First, the model is exposed to an enormous corpus of text — hundreds of billions of words from the internet, books, code, and articles. During this pre-training phase, the model learns a single task: predict the next token given everything that came before it. A token is roughly one word or part of a word. "Hello world" is two tokens. "Tokenization" might be three.</p>
          <InfoBox color={color} dark={dark}>The model is never told what words mean, what grammar is, or what facts are true. It learns all of these implicitly by seeing billions of examples. Language patterns, factual associations, reasoning structures — all encoded as statistical weights in the neural network.</InfoBox>
          <p style={P(sub)}>After pre-training on raw text, the model can predict text but is not yet useful as an assistant. The second phase is fine-tuning: human trainers show the model examples of good conversations, and then use Reinforcement Learning from Human Feedback (RLHF) — a process where human raters evaluate model outputs and a reward model learns to predict human preferences. The final model has been steered to be helpful, harmless, and honest.</p>
          <p style={{ ...P(sub), marginBottom: 0 }}>At inference time — when you send a message — the model tokenizes your input, passes the token sequence through billions of matrix multiplications in the neural network, and produces a probability distribution over the next token. It samples from this distribution, appends the chosen token to the sequence, and repeats until it decides to stop. The "temperature" parameter controls how much randomness is in this sampling. Low temperature = more predictable. High temperature = more creative (and sometimes more wrong).</p>
        </Block>

        {/* History */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How we got here — brief history" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '2017', title: 'Attention Is All You Need — Google', body: 'The transformer paper introduced the architecture that all modern LLMs are built on. Self-attention mechanisms allowed models to relate different positions in a sequence to each other, enabling far better long-range understanding than previous RNN approaches.' },
            { n: '2020', title: 'GPT-3 — OpenAI', body: 'First model large enough to demonstrate emergent capabilities — tasks it was never explicitly trained on. 175 billion parameters. Few-shot learning worked for the first time. The AI community realized scale was the key variable.' },
            { n: '2022', title: 'ChatGPT — OpenAI', body: 'GPT-3.5 with RLHF fine-tuning, deployed as a consumer chat interface. 100 million users in 2 months. This was the moment most people first understood what LLMs could do. Triggered the current wave of investment and development.' },
            { n: '2023', title: 'GPT-4, Claude 2, Gemini Pro — the competitive era', body: 'Multimodal models (text + images). Context windows expanded from 4k to 128k tokens. Open-source models (Llama 2) reached usable quality. Every major tech company launched an LLM.' },
            { n: '2024-25', title: 'Agents, reasoning models, multimodal expansion', body: 'o1, o3 (OpenAI) and Claude 3.5 brought step-by-step reasoning. Models generate images, audio, video. Agents execute multi-step tasks autonomously. Llama 3 70B reached GPT-4 quality open source.' },
          ]} />
        </Block>

        {/* Model Comparison Table */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Major models compared — what each is best for" color={color} />
          <div style={{ overflowX: 'auto', margin: '0.75rem 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', fontFamily: "'Rajdhani', sans-serif" }}>
              <thead>
                <tr style={{ background: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)' }}>
                  {['Model', 'Context', 'API Cost (Input/1M)', 'Speed', 'Knowledge Cutoff', 'Best For'].map(h => (
                    <th key={h} style={{ padding: '0.625rem 0.875rem', textAlign: 'left', fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.08em', color: muted, fontWeight: 700, textTransform: 'uppercase', borderBottom: `1px solid ${border}`, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { model: 'GPT-4o', ctx: '128k', cost: '$5', speed: 'Fast', cutoff: 'Apr 2023', best: 'Coding, reasoning, general tasks' },
                  { model: 'Claude 3.5 Sonnet', ctx: '200k', cost: '$3', speed: 'Fast', cutoff: 'Apr 2024', best: 'Long docs, nuanced analysis, writing' },
                  { model: 'Gemini 1.5 Pro', ctx: '1M', cost: '$1.25', speed: 'Moderate', cutoff: 'Nov 2023', best: 'Massive context, real-time search' },
                  { model: 'Llama 3 70B', ctx: '128k', cost: 'FREE (Groq)', speed: 'Very fast', cutoff: 'Dec 2023', best: 'Privacy, free API, local use' },
                  { model: 'Mistral Large', ctx: '128k', cost: '$2', speed: 'Fast', cutoff: 'Early 2024', best: 'European compliance, multilingual' },
                  { model: 'GPT-3.5 Turbo', ctx: '16k', cost: '$0.50', speed: 'Fastest', cutoff: 'Sep 2021', best: 'Simple tasks, lowest cost' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${border}` }}
                    onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '0.625rem 0.875rem', fontWeight: 700, color: color, whiteSpace: 'nowrap' }}>{row.model}</td>
                    <td style={{ padding: '0.625rem 0.875rem', color: sub, whiteSpace: 'nowrap' }}>{row.ctx}</td>
                    <td style={{ padding: '0.625rem 0.875rem', color: sub, whiteSpace: 'nowrap' }}>{row.cost}</td>
                    <td style={{ padding: '0.625rem 0.875rem', color: sub }}>{row.speed}</td>
                    <td style={{ padding: '0.625rem 0.875rem', color: sub, whiteSpace: 'nowrap' }}>{row.cutoff}</td>
                    <td style={{ padding: '0.625rem 0.875rem', color: sub }}>{row.best}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: '0.78rem', color: muted, margin: '0.5rem 0 0', fontFamily: "'Share Tech Mono', monospace" }}>API costs are approximate and change frequently. Free tiers available for all major models. Always check official pricing before building.</p>
        </Block>

        {/* Knowledge Cutoff */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Knowledge cutoff — why AI does not know last month's news" color={color} />
          <p style={P(sub)}>Every LLM is trained on data up to a specific date, after which it knows nothing about new events. GPT-4o was trained on data through April 2023. Claude 3.5 through April 2024. This means these models genuinely do not know about events, releases, or developments that happened after their cutoff — and they may confidently generate incorrect information when asked about things that changed after training.</p>
          <InfoBox color="#EF4444" dark={dark}>If you ask GPT-4o about a React API change from late 2024, it may give you the old behavior confidently. If you ask about a company announcement from last month, it will either say it does not know or — worse — make something up that sounds plausible. Knowledge cutoff is one of the most common sources of hallucination in technical contexts.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The practical solution: use Perplexity or Gemini (with real-time search) for time-sensitive information. Before asking any LLM about a library, framework, or technology, verify the version you are asking about matches what it was trained on. For recent changes, check the official docs directly rather than relying on AI.</p>
        </Block>

        {/* Hallucination */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Hallucination — confident wrong answers" color="#EF4444" />
          <p style={P(sub)}>Hallucination is when an LLM generates text that is fluent, confident, and factually wrong. It happens because the model is a statistical pattern completer — it generates text that matches the pattern of correct answers, but it has no mechanism to verify whether the content it produces is actually true.</p>
          <InfoBox color="#EF4444" dark={dark}>The model does not know what it does not know. There is no internal "uncertainty flag" that fires when it reaches the edge of its knowledge. It generates confident text even when the underlying statistics have nothing reliable to draw from.</InfoBox>
          <Compare dark={dark} border={border} color="#EF4444" items={[
            { label: 'Common hallucination patterns', body: 'Specific statistics and numbers ("React has 12 million weekly downloads as of 2023" — plausible-sounding, likely wrong). Citations and references to papers that do not exist. Confident answers about very recent events it cannot know about. Details about obscure topics where training data was sparse.' },
            { label: 'Reasoning failures (beyond hallucination)', body: 'Multi-step math problems fail even when each step looks correct. Spatial reasoning ("if A is left of B and B is left of C, what is to the right of A?") is unreliable. Counting and precise arithmetic are unreliable without a code interpreter. Logic puzzles with embedded contradictions often get missed.' },
            { label: 'The practical response', body: 'Verify any specific fact that matters before acting on it. Use Perplexity for factual claims needing sources. Use code execution (ChatGPT Code Interpreter, Python) for any math or data computation. The model is reliable for reasoning about concepts, generating code, explaining ideas — less reliable for precise facts.' },
          ]} />
        </Block>

        {/* Multimodal */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Multimodal AI — beyond text" color={color} />
          <p style={P(sub)}>Modern AI models process and generate multiple types of content — not just text. This is called multimodal AI. The capabilities have expanded rapidly and now span the full media spectrum.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(200px,100%),1fr))', gap: '0.625rem', margin: '0.75rem 0' }}>
            {[
              { icon: '📝→', label: 'Text to Text', desc: 'The original. Chat, Q&A, summarization, translation, code generation.' },
              { icon: '🖼️', label: 'Image Understanding', desc: 'GPT-4o and Gemini read images: describe a diagram, debug a screenshot, analyze a photo.' },
              { icon: '🎨', label: 'Text to Image', desc: 'DALL-E 3, Midjourney, Stable Diffusion. Generate any image from a text description.' },
              { icon: '🎤', label: 'Speech to Text', desc: 'Whisper (OpenAI, free). Transcribe any audio or video with high accuracy.' },
              { icon: '🔊', label: 'Text to Speech', desc: 'ElevenLabs, OpenAI TTS. Generate realistic speech from text. Voice cloning in seconds.' },
              { icon: '🎬', label: 'Text to Video', desc: 'Sora (OpenAI), Runway ML. Generate short video clips from text prompts. Still improving.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '0.875rem 1rem', borderRadius: 10, background: dark ? `${color}08` : `${color}06`, border: `1px solid ${color}1e` }}>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', color, letterSpacing: '0.06em', marginBottom: '0.4rem' }}>{item.icon} {item.label}</div>
                <p style={{ fontSize: '0.8rem', color: sub, lineHeight: 1.65, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Block>

        {/* Cost and Economics */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Costs — what tokens actually cost you" color={color} />
          <p style={P(sub)}>AI APIs are priced per token — both for input (what you send) and output (what the model generates). One token ≈ 0.75 words. A typical conversation turn with a short code snippet might be 500 input tokens + 300 output tokens.</p>
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'What does $5 actually buy?', body: 'GPT-4o costs $5 per million input tokens, $15 per million output tokens. $5 credit = roughly 1 million input tokens = about 750,000 words sent to the model. For a student building a portfolio project with occasional API calls, $5 lasts 2-4 months of casual use.' },
            { label: 'Why free tiers exist', body: 'ChatGPT free tier (browser), Claude free tier, Gemini free tier — these are loss leaders for consumer acquisition. The companies are paying significant compute costs for every free conversation. They exist because free users eventually become paid API customers.' },
            { label: 'Groq — the free API alternative', body: 'Groq provides a free API key for Llama 3 70B with generous rate limits. OpenAI-compatible format. For students building AI projects, Groq eliminates API costs entirely during development. Quality is very close to GPT-4 for most tasks.' },
            { label: 'Token cost vs inference cost', body: 'Token pricing is for cloud inference. Training a model from scratch costs millions of dollars in GPU compute. Running inference (one API call) costs fractions of a cent. This is why API access is cheap — you are using an already-trained model, not training a new one.' },
          ]} />
        </Block>

        {/* Fine-tuning vs Prompting */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Fine-tuning vs Prompting — when to use which" color={color} />
          <p style={P(sub)}>Students often ask "should I fine-tune a model or use prompt engineering?" The answer almost always is: start with prompt engineering. Fine-tuning is expensive, complex, and rarely needed for student projects.</p>
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Prompt engineering', badge: 'Start here', body: 'Write better instructions to get better outputs from an existing model. Free. Instant. Works for: changing output format, adjusting tone, making the model focus on a specific domain, few-shot examples. 95% of use cases do not require anything else.' },
            { label: 'RAG (Retrieval Augmented Generation)', badge: 'For knowledge', body: 'Give the model access to your specific documents at query time. Free with open-source tools. Works for: Q&A on your own data, keeping knowledge current without retraining, domain-specific chatbots. Much better than fine-tuning for knowledge tasks.' },
            { label: 'Fine-tuning', badge: 'Rarely needed', body: 'Retrain the model on your specific data to bake in new behavior or style. Costs $100-$10,000+ depending on model size and dataset. Takes hours to days. Use only when: you need a specific style or format the model cannot learn from prompts, or you need significantly lower inference cost at very high scale.' },
          ]} />
        </Block>

        {/* Bias and Ethics */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Bias and Ethics — models reflect their training data" color="#EF4444" />
          <p style={P(sub)}>AI models learn from data that was generated by humans — and human-generated data carries human biases. The internet over-represents certain languages (English), certain demographics, certain viewpoints, and certain types of content. Models trained on this data inherit these distributions.</p>
          <InfoBox color="#EF4444" dark={dark}>A model trained predominantly on English text from Western internet sources will give better answers in English, about topics commonly discussed in Western contexts, in styles common in Western writing. This is not a choice — it is a statistical consequence of the training distribution.</InfoBox>
          <p style={P(sub)}>Practical implications: models are more reliable in English than in Hindi, Tamil, or other Indian languages. Models have more accurate knowledge about US companies, culture, and legal systems than Indian ones. Technical content about popular frameworks (React, Python) is better than niche or regional ones. Models sometimes reinforce stereotypes present in training data, particularly around gender, nationality, and profession.</p>
          <p style={{ ...P(sub), marginBottom: 0 }}>RLHF (Reinforcement Learning from Human Feedback) attempts to mitigate some biases by having human raters penalize harmful outputs. But RLHF raters also reflect biases, and the mitigation is imperfect. The responsible use of AI includes: verifying factual claims from AI about regions or cultures you are not familiar with, being cautious about AI-generated content that makes generalizations about groups of people, and not treating AI outputs as authoritative on sensitive topics.</p>
        </Block>

        {/* Context Window - practical */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Context window — practical guidance" color={color} />
          <p style={P(sub)}>The context window is how much text the model can process at once — input + conversation history + output all together. GPT-4o: 128,000 tokens (~100,000 words). Claude 3.5: 200,000 tokens. Gemini 1.5 Pro: 1 million tokens.</p>
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'What happens when you hit the limit?', body: 'The oldest content in the conversation gets dropped. In a long chat, the model forgets what you said at the beginning. You notice this when it starts giving inconsistent answers or asking you to clarify things you already explained. Solution: start a new conversation with a fresh context, summarizing only the essential points.' },
            { label: 'The "lost in the middle" problem', body: 'Research shows models are better at remembering content at the beginning and end of their context than in the middle. If you paste a 10,000 word document and the answer is in the middle, the model is more likely to miss it or get it wrong than if it is at the start or end. Chunk your documents and ask specific questions about specific sections.' },
            { label: 'Practical tip', body: 'For important long-context work, use Claude (200k context) or Gemini (1M context). For most coding and Q&A tasks, the context is well within GPT-4o\'s 128k limit. Monitor the token count in long conversations and start fresh when it approaches the limit.' },
          ]} />
        </Block>

        {/* Local vs Cloud */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Local vs Cloud models — when to use each" color={color} />
          <p style={P(sub)}>You have two options for accessing LLMs: cloud APIs (ChatGPT, Claude, Gemini) and local models running on your own hardware (Llama 3 via Ollama, Mistral via LM Studio). Both have real advantages.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px,100%),1fr))', gap: '0.75rem', margin: '0.75rem 0' }}>
            {[
              { heading: 'Cloud (ChatGPT, Claude, Gemini)', points: ['Best model quality', 'No hardware required', 'Always up to date', 'Costs money at scale', 'Your data goes to their servers', 'Rate limits on free tier'] },
              { heading: 'Local (Ollama, LM Studio)', points: ['Free — no API costs ever', 'Complete privacy', 'Works offline', 'Requires 8GB+ RAM', 'Slower on most laptops', 'Slightly lower quality on complex tasks'] },
            ].map((col, i) => (
              <div key={i} style={{ padding: '1rem', borderRadius: 10, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}` }}>
                <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.68rem', color, letterSpacing: '0.06em', marginBottom: '0.625rem' }}>{col.heading}</div>
                {col.points.map((pt, j) => (
                  <div key={j} style={{ display: 'flex', gap: '0.4rem', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                    <span style={{ color, fontSize: '0.75rem', flexShrink: 0, marginTop: 1 }}>·</span>
                    <span style={{ fontSize: '0.8rem', color: sub, lineHeight: 1.55 }}>{pt}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <InfoBox color={color} dark={dark}>For most student use: use cloud models (free tiers) for daily learning and coding help. Set up Ollama locally for private work, offline development, or when you want unlimited free API calls for building projects.</InfoBox>
        </Block>

        {/* Evaluation */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How we measure model quality" color={color} />
          <p style={P(sub)}>When companies claim "our model beats GPT-4", they are referring to specific benchmarks. Understanding what these measure helps you interpret claims critically.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', margin: '0.75rem 0' }}>
            {[
              { name: 'MMLU', desc: 'Massive Multitask Language Understanding. 57 subjects including math, science, history, law. Tests knowledge breadth. A student\'s equivalent of a broad GK test.' },
              { name: 'HumanEval', desc: 'Python coding problems. Model writes code that must pass unit tests. Measures actual programming ability, not just code appearance.' },
              { name: 'LMSYS Chatbot Arena', desc: 'Humans compare outputs of two anonymous models side by side and vote for the better one. Closest measure of real-world helpfulness because it captures what humans actually prefer, not what benchmarks reward.' },
              { name: 'MATH', desc: 'Competition mathematics problems. Measures multi-step mathematical reasoning. GPT-4 class models score 50-70% where a strong student scores 90%+.' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.875rem', padding: '0.75rem 0.875rem', borderRadius: 9, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.02)', border: `1px solid ${border}` }}>
                <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.7rem', color, letterSpacing: '0.06em', flexShrink: 0, minWidth: 90 }}>{item.name}</span>
                <span style={{ fontSize: '0.82rem', color: sub, lineHeight: 1.65 }}>{item.desc}</span>
              </div>
            ))}
          </div>
        </Block>

        {/* Safety / Alignment */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Safety and alignment — why it matters" color={color} />
          <p style={P(sub)}>Alignment refers to the challenge of making AI systems behave in ways that match human values and intentions. A model trained purely to predict text would happily generate harmful content, disinformation, or manipulative language — because these patterns exist in training data too.</p>
          <p style={P(sub)}>RLHF (Reinforcement Learning from Human Feedback) is how companies like OpenAI and Anthropic steer models away from harmful outputs. Human raters evaluate model outputs and rate them for helpfulness and safety. A reward model learns to predict these ratings, and the LLM is then fine-tuned to maximize reward model scores. Anthropic additionally uses Constitutional AI — a set of principles the model uses to evaluate and revise its own outputs.</p>
          <p style={{ ...P(sub), marginBottom: 0 }}>The result: models refuse certain requests, add caveats, and decline to generate some categories of content. This is a deliberate design decision, not a technical limitation. The trade-off is that over-restriction sometimes makes models less useful (refusing legitimate requests) while under-restriction allows harm. This is an active area of research and the balance shifts between model versions.</p>
        </Block>

        {/* Getting started */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How students actually access these models" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'ChatGPT free — immediate, no setup', body: 'chat.openai.com — free account gives GPT-4o with daily limits. Best for: learning, coding help, interview prep, writing. Good enough for 90% of student tasks.' },
            { n: '2', title: 'Claude free — same as ChatGPT', body: 'claude.ai — free account gives Claude 3.5 Sonnet. Better for: long documents, code review, nuanced analysis. Use alongside ChatGPT, not instead of.' },
            { n: '3', title: 'Groq API — free, for building projects', body: 'console.groq.com — free API key, Llama 3 70B, OpenAI-compatible format. When you want to add AI to your own application without paying. Best starting point for any AI-powered project.' },
            { n: '4', title: 'Ollama — run models locally', body: 'ollama.com — download and run Llama 3 or Mistral on your laptop. Completely free, offline, private. Requires 8GB+ RAM. For: sensitive data, unlimited free use, learning without API limits.' },
            { n: '5', title: 'OpenAI / Anthropic API — for serious projects', body: 'platform.openai.com — add $5 credit, get API key. For: portfolio projects that use GPT-4o specifically, or production applications. Use Groq first to test, switch to OpenAI if you need GPT-4o quality.' },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do after understanding this" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Explain exactly how AI works in any interview — not just "it learns from data"',
            'Choose the right model and access method for your specific task and budget',
            'Know when to trust AI output and when to verify — based on the specific failure mode',
            'Build projects using free APIs (Groq, Gemini) without any API costs',
            'Read AI news and benchmark announcements critically — understand what they actually measure',
            'Decide between prompting, RAG, and fine-tuning correctly for any given problem',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Test Knowledge Cutoff + Hallucination</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>This hands-on experiment teaches you more about AI reliability than any article. You will trigger two known failure modes — knowledge cutoff and hallucination — on purpose, with a topic you actually know about.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Pick a topic you know well', body: 'Your college, your city, your own project, or a very recent technology release. You need to be able to verify the answers yourself.' },
            { n: '2', title: 'Test knowledge cutoff', body: 'Ask ChatGPT (April 2023 cutoff) about something that changed after that date. A framework update, a company event, a recent news story. Observe: does it say it does not know, or does it confidently give you wrong information?' },
            { n: '3', title: 'Trigger hallucination', body: 'Ask for a very specific statistic, a citation, or a precise fact in a domain where training data was thin. "What was the exact enrollment number of [your college] in 2022?" Watch for confident wrong numbers.' },
            { n: '4', title: 'Verify with Perplexity', body: 'Ask the same questions on Perplexity (which searches the web in real time). Compare answers. Notice which questions Perplexity gets right that ChatGPT got wrong.' },
            { n: '5', title: 'Document your findings', body: 'What category of question does each model reliably get wrong? This directly informs when you can trust AI and when you need to verify.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — ChatGPT free + Perplexity free</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Treat AI like a very fast, very well-read intern who has never visited India and has not read anything published after their training date. They are excellent at explaining concepts, writing and reviewing code, structuring arguments, and synthesizing ideas. They are unreliable on very specific recent facts, local knowledge, and precise numerical claims. Use them accordingly — not as oracles, but as capable collaborators with specific blind spots you now know how to work around.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <div />
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/foundations/prompt-eng')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            Prompt Engineering <ChevronRight size={14} />
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

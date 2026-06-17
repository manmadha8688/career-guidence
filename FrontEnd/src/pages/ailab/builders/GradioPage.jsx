import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#F97316'

export default function GradioPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(249,115,22,0.09)' : 'rgba(249,115,22,0.13)'
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🎛️</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>Gradio — Build AI Demos in 3 Lines of Python</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>The fastest way to share ML models and AI tools as interactive web apps</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ 100% FREE', '#4ADE80'], ['gradio.app', color], ['Python + Hugging Face', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>Gradio is an open-source Python library that lets you wrap any Python function — an ML model, a text processor, an image classifier — in a fully interactive web interface in three lines of code. No HTML, no JavaScript, no frontend experience required. You write the function, Gradio handles the UI. When Hugging Face acquired Gradio in 2021, it became the default way to share models on Hugging Face Spaces — the world's largest platform for ML demos. Today, Gradio powers over one million demos across research labs, startups, and student projects. If you have trained a model, fine-tuned an LLM, or built any AI function in Python, Gradio is how you turn it into something anyone can interact with — for free, in minutes, with a shareable public URL.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Build A First Gradio App | Python Gradio Tutorial', url: 'https://www.youtube.com/watch?v=mB68GanHJj4', dur: 'Beginner', note: 'Hands-on first Gradio app — Interface, inputs, outputs, launch' },
            { label: 'A Practical Tutorial on Building Machine Learning Demos with Gradio', url: 'https://www.youtube.com/watch?v=97KxA1r184o', dur: 'Intermediate', note: 'End-to-end ML demo with real models — from notebook to shareable URL' },
            { label: 'Build Machine Learning Applications Easily with Gradio in Python', url: 'https://www.youtube.com/watch?v=3DGLznJorT8', dur: 'Comprehensive', note: 'Covers Interface, Blocks, components, deployment — great full walkthrough' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* What Gradio actually is */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="What Gradio actually is" color={color} />
          <InfoBox color={color} dark={dark}>Gradio solves one specific problem that every ML practitioner faces: you train a model, it works in your notebook — and then no one else can use it. Gradio bridges that gap. You pass your prediction function to gr.Interface(), define what goes in and what comes out, call .launch() — and your model is a live web app. The entire process can take under five minutes.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>Gradio was created by Abubakar Abid in 2019 as a PhD student at Stanford who wanted an easier way to share his models with collaborators. The core insight was radical simplicity: instead of learning web development, ML practitioners should just describe their function's input type (text, image, audio) and output type, and the library should figure out the rest. Hugging Face acquired Gradio in 2021 and integrated it directly into Hugging Face Spaces — making Gradio the native language of the world's most active ML demo community. Today it has over 1 million monthly developers building everything from research demos to production AI tools.</p>
        </Block>

        {/* Interface vs Blocks */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Two APIs: Interface and Blocks" color={color} />
          <InfoBox color={color} dark={dark}>Gradio has two levels of abstraction. gr.Interface is the fast path: wrap a function in 3 lines, get a polished UI. gr.Blocks is the full toolkit: custom layouts, multiple tabs, conditional logic, event-driven interactions. Start with Interface. Move to Blocks when you need control.</InfoBox>
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'gr.Interface — fastest path to a demo', badge: '3 lines of code', body: 'gr.Interface takes three arguments: fn (your prediction function), inputs (what components accept user data), and outputs (what components display results). It auto-generates a clean two-column UI with an input panel, a Submit button, and an output panel. All you define is the function signature — Gradio figures out the rest. Use it for: single-function demos, image classifiers, text transformers, audio tools, any model that takes input and returns output.' },
            { label: 'gr.Blocks — full layout control', badge: 'Custom UIs', body: 'gr.Blocks is a low-level context manager that gives you complete control over layout, state, and events. You place components explicitly: gr.Textbox(), gr.Image(), gr.Button(). You attach event handlers: btn.click(fn=my_func, inputs=[...], outputs=[...]). Blocks lets you build multi-step workflows, tabbed interfaces, side-by-side model comparisons, chatbots with history, and any layout Streamlit or a simple web app could achieve. Use it when Interface is too rigid.' },
            { label: 'Which one to start with', badge: 'Practical advice', body: 'Always start with gr.Interface. If your use case is: function goes in, result comes out — Interface handles it perfectly in under 10 lines. Migrate to Blocks when you need multiple functions on the same page, conditional visibility, custom event sequences, or a chatbot with message history. Most student projects and research demos stay in Interface their entire lifetime.' },
          ]} />
        </Block>

        {/* How it works step by step */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="How Gradio works — step by step" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install in one command', body: 'pip install gradio — Gradio has no mandatory system dependencies beyond Python. It installs in under a minute and works inside Google Colab, Jupyter notebooks, and regular Python scripts without any extra configuration.' },
            { n: '2', title: 'Write your Python function', body: 'Any Python function works. def predict(text): return my_model(text). The function can load an ML model, call an API, run image processing — whatever your AI feature does. Gradio just wraps it; it does not care what is inside.' },
            { n: '3', title: 'Wrap it with gr.Interface', body: 'gr.Interface(fn=predict, inputs="text", outputs="text").launch() — these three lines are a complete, working Gradio app. The inputs and outputs are component types: "text", "image", "audio", "number", or the full component classes like gr.Textbox(), gr.Image(), gr.Slider().' },
            { n: '4', title: 'Launch locally or with a public link', body: '.launch() starts a local server at localhost:7860 and opens your browser. Add share=True (.launch(share=True)) to get a public HTTPS link that works for 72 hours — anyone on the internet can interact with your demo without you deploying anything. Perfect for quick sharing or demo sessions.' },
            { n: '5', title: 'Deploy to Hugging Face Spaces for permanent hosting', body: 'Create an app.py with your Gradio code and a requirements.txt. Push to a Hugging Face Space repository. The Space runs your app permanently, auto-scales under load, and gives you a shareable URL at huggingface.co/spaces/yourname/yourapp. Free forever, no server to maintain.' },
          ]} />
        </Block>

        {/* Key components */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key input and output components" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'gr.Textbox', desc: 'Text input and output. Works for prompts, descriptions, transcriptions, code, and any string data. Supports multiline mode, placeholder text, and character limits.' },
            { name: 'gr.Image', desc: 'Upload images as input, display images as output. Supports PIL images, numpy arrays, and file paths. Perfect for image classifiers, style transfer, object detection, and computer vision demos.' },
            { name: 'gr.Audio', desc: 'Record or upload audio as input. Play back audio output. Essential for speech recognition (Whisper), text-to-speech, music generation, and audio classification models.' },
            { name: 'gr.Slider', desc: 'Numeric input with a draggable range. Use for model parameters: temperature, image size, confidence threshold, seed values. Much more intuitive than typing numbers for demos.' },
            { name: 'gr.Dropdown', desc: 'Select from a list of options. Use for model selection (choose between models), task type, language selection, or any categorical input your function accepts.' },
            { name: 'gr.Chatbot', desc: 'A chat message display component that renders a conversation history. Used inside gr.Blocks with gr.ChatInterface for building custom chatbot UIs with message bubbles.' },
            { name: 'gr.DataFrame', desc: 'Display and edit tabular data. Input and output Pandas DataFrames directly. Great for data transformation demos, CSV processing, and any tabular ML task.' },
            { name: 'gr.File', desc: 'Upload any file type as input. Returns a file path. Use for PDF processing, document summarization, batch image processing, or any demo that works with files.' },
          ]} />
        </Block>

        {/* ChatInterface */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="gr.ChatInterface — chatbot UIs in one line" color={color} />
          <InfoBox color={color} dark={dark}>gr.ChatInterface is Gradio's highest-level abstraction: you provide a function that takes a message and a history list, returns a reply string — and Gradio gives you a complete, polished chat UI. The message history, the input box, the submit button, the retry/undo controls — everything is handled for you. It is the fastest way to put an LLM behind a chat interface anywhere.</InfoBox>
          <p style={{ ...P(sub), marginBottom: '1rem' }}>The function signature is simple: def chat(message, history) where message is the current user input (a string) and history is a list of [user, assistant] message pairs. Return your model's reply as a string. Gradio handles the state, the display, the clearing, and the streaming if you use a generator function. You can connect this to any LLM API — Groq, OpenAI, Anthropic, Ollama, or a locally loaded Hugging Face model — in under 20 lines of Python.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Write the chat function', body: 'def respond(message, history): — inside, call your LLM API with the full history context. For Groq: format history into a messages list (role/content pairs), append the current message, call client.chat.completions.create(), return the response string.' },
            { n: '2', title: 'Wrap in ChatInterface', body: 'gr.ChatInterface(respond, title="My Chatbot", description="Powered by LLaMA").launch() — that is the entire app. ChatInterface auto-generates the chat bubble UI, handles history tracking, and includes retry/undo buttons by default.' },
            { n: '3', title: 'Add streaming for real-time output', body: 'Make your function a generator: use yield instead of return. Yield each token as it arrives from the LLM stream. Gradio detects the generator and streams tokens into the chat bubble in real time — users see text appear word by word exactly like ChatGPT.' },
            { n: '4', title: 'Add a system prompt control', body: 'Add additional_inputs=[gr.Textbox(label="System Prompt")] to ChatInterface and include it as a parameter in your function. Users can configure the chatbot persona at runtime — a tutor, a code reviewer, a recipe assistant — without changing code.' },
          ]} />
        </Block>

        {/* Free hosting on HF Spaces */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Hugging Face Spaces — permanent free hosting" color={color} />
          <p style={{ ...P(sub), marginBottom: '1rem' }}>Hugging Face Spaces is the standard destination for Gradio apps. A Space is a free Git repository that auto-runs your Gradio app with a persistent public URL. It auto-scales when your demo gets traffic, runs 24/7 without you managing any server, and integrates directly with Hugging Face models so you can load any of the 200K+ models from the Hub in one line of code.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Create a free Hugging Face account', body: 'Sign up at huggingface.co — free, no credit card. Create a new Space: click your profile → New Space → choose Gradio as the SDK. You get a Git repository at huggingface.co/spaces/yourname/yourspace.' },
            { n: '2', title: 'Add app.py and requirements.txt', body: 'app.py is your complete Gradio application. requirements.txt lists your Python dependencies (gradio, transformers, torch, etc.). These are the only two files required. Push them to the Space repository via Git or the web editor.' },
            { n: '3', title: 'Space builds and launches automatically', body: 'Hugging Face reads your requirements.txt, installs dependencies in a container, and runs python app.py. Your app is live at the Space URL within a few minutes. Every push to the repository auto-deploys a new version.' },
            { n: '4', title: 'Manage secrets for API keys', body: 'In your Space settings, add Repository Secrets for any API keys (GROQ_API_KEY, OPENAI_API_KEY, etc.). Access them in code as os.environ["GROQ_API_KEY"]. Never hardcode secrets in your app.py — they would be visible in the public repository.' },
            { n: '5', title: 'Share the URL', body: 'Your Space URL is permanent, shareable, and appears in Hugging Face search. Add it to your portfolio, LinkedIn, resume, and college project submissions. It is the most credible way to show a working ML project to a recruiter or professor.' },
          ]} />
          <div style={{ padding: '0.75rem 1rem', borderRadius: 8, background: dark ? 'rgba(74,222,128,0.07)' : 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.2)', marginTop: '0.75rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.62rem', color: '#4ADE80', letterSpacing: '0.07em' }}>FREE TIER: Unlimited public Spaces · 16 GB RAM · 2 vCPUs · Auto-deploy from Git · Permanent URL · No credit card</span>
          </div>
        </Block>

        {/* Gradio vs Streamlit */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Gradio vs Streamlit — which one to use" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Gradio — for ML model demos', badge: 'Best for models', body: 'Gradio is optimized for one thing: put a function behind a UI. Three lines of code, and your model is a live demo. It also automatically exposes a REST API endpoint — every Gradio app is also callable programmatically via /predict. The Hugging Face ecosystem runs on Gradio. Best for: image classifiers, NLP demos, audio tools, chatbots, anything where a user provides input to a model and sees output. Less suited for multi-page apps, complex navigation, or data dashboards.' },
            { label: 'Streamlit — for apps and dashboards', badge: 'More flexible UI', body: 'Streamlit gives you full application control: multi-page apps, sidebars, columns, tabs, Pandas DataFrames, Plotly charts, session state. It is designed for data dashboards, internal tools, and applications that need to feel like real software. More layout control than Gradio, larger component library, bigger community. Best for: data analysis dashboards, chatbot apps with complex UI, multi-step workflows, portfolio apps that go beyond model I/O.' },
            { label: 'When to use both', badge: 'Real answer', body: 'Use Gradio when you are sharing a model and want the demo live in under 10 minutes — especially if you are deploying to Hugging Face Spaces. Use Streamlit when you are building a product that users navigate through with charts, multiple sections, and richer UI. Many ML engineers know both. Start with Gradio for model sharing, Streamlit for app building. The two skills complement each other naturally.' },
          ]} />
        </Block>

        {/* What students use Gradio for */}
        <Block title="What students build with Gradio" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Image classifiers — upload a photo, get predictions with confidence scores from a trained ResNet or EfficientNet model',
            'Chatbot demos — wrap any LLM API or locally loaded model in a gr.ChatInterface and share the URL in your portfolio',
            'Text generation demos — show off a fine-tuned language model with a text input and generated output side by side',
            'Audio transcription tools — record speech, pass to Whisper, display the transcription using gr.Audio and gr.Textbox',
            'Style transfer and image generation — upload images and show AI-generated variations with before/after comparison',
            'Research paper demos — make your academic model interactive and host on Hugging Face Spaces alongside the paper',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Chatbot Demo and Host on Hugging Face Spaces</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Build a fully working AI chatbot demo using Gradio and gr.ChatInterface, connect it to a free LLM API, and deploy it permanently to Hugging Face Spaces. By the end you will have a live, public URL with a professional-looking chatbot UI that you can show in your portfolio — built entirely for free, with under 25 lines of Python.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up your files', body: 'Create two files: app.py and requirements.txt. In requirements.txt add: gradio and groq (or google-generativeai). Get a free Groq API key from console.groq.com — the free tier supports 14,400 requests per day and responses are near-instant on Llama 3.' },
            { n: '2', title: 'Write the chat function', body: 'Import gradio as gr and the Groq client. Write: def respond(message, history): — format the history and current message into the Groq messages format, call client.chat.completions.create(), return response.choices[0].message.content.' },
            { n: '3', title: 'Wrap in ChatInterface', body: 'gr.ChatInterface(respond, title="My AI Assistant", description="Powered by Llama 3 on Groq").launch() — run locally first (python app.py) and test the chatbot in your browser at localhost:7860.' },
            { n: '4', title: 'Create a Hugging Face Space', body: 'Sign up at huggingface.co. Create a new Space with Gradio as the SDK. Push your app.py and requirements.txt to the Space repository. Add your GROQ_API_KEY in Repository Secrets. The Space builds automatically.' },
            { n: '5', title: 'Share the live URL', body: 'Your chatbot is live at huggingface.co/spaces/yourname/yourapp. Add it to your GitHub profile README, LinkedIn, and resume. This is the most credible way to show a working AI project — it is interactive, it works, anyone can try it.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Gradio open source, Hugging Face Spaces free, Groq free tier 14,400 req/day</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The fastest way to get a Hugging Face Space running is to click "Duplicate Space" on an existing demo that is similar to what you want to build. This gives you a working starting point you can modify — the code, the model, the UI — instead of starting from scratch. Browse huggingface.co/spaces, find a Gradio demo close to your idea, duplicate it, swap in your own model or API key, and push. You can have a modified, customized demo live in under 15 minutes this way.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/builders/streamlit')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Streamlit
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

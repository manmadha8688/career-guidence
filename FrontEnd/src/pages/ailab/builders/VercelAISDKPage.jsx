import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#6366F1'

export default function VercelAISDKPage() {
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
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>AI App Builders</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>▲</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.05rem,3vw,1.5rem)', color: txt, margin: '0 0 0.25rem' }}>Vercel AI SDK — The Standard for AI-Powered Web Apps</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Build streaming chatbots and AI features in Next.js with 10 lines of code</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['sdk.vercel.ai', color], ['TypeScript + React', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>
            Before the Vercel AI SDK, adding a streaming AI chatbot to a React or Next.js app meant wrestling with ReadableStreams, Server-Sent Events, and managing state by hand — hundreds of lines of boilerplate copied from Stack Overflow. The AI SDK, built by the creators of Next.js, solves all of this. Two hooks — useChat and useCompletion — handle streaming, state, and UI updates automatically. On the server, streamText works identically whether you call OpenAI, Anthropic, Google, or Groq. It has become the de-facto standard for AI web apps in the JavaScript ecosystem, with over 20 million monthly npm downloads and 24,000+ GitHub stars.
          </p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'Build AI Chatbot in Minutes: Vercel AI SDK + Next.js (2025)', url: 'https://www.youtube.com/watch?v=RRK3JJrzi_w', dur: '~20 min', note: 'Complete chatbot with streaming from scratch' },
            { label: 'Vercel AI SDK Overview — Generative UI, Streaming, Agentic Tool Functions', url: 'https://www.youtube.com/watch?v=D48I3Nd0E5U', dur: '~25 min', note: 'Streaming, tool calling, generative UI patterns' },
            { label: 'A Complete Guide To Vercel AI SDK — The ESSENTIAL Tool For Shipping AI Apps', url: 'https://www.youtube.com/watch?v=mojZpktAiYQ', dur: '~30 min', note: 'End-to-end production app guide' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why it exists */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why the AI SDK exists — the React streaming problem" color={color} />
          <InfoBox color={color} dark={dark}>
            Streaming AI responses requires a persistent connection from the browser to the server. Without a library, you must manually create a ReadableStream, encode tokens, handle backpressure, and manage React state on every update — plus write completely different code for each AI provider. The AI SDK abstracts all of this into two lines.
          </InfoBox>
          <p style={{ ...P(sub) }}>The second problem the SDK solves is provider lock-in. Companies that built directly on the OpenAI API found themselves unable to switch providers without rewriting all their AI integration code. The AI SDK introduces a unified interface where streamText, generateText, and generateObject work identically across 15+ providers. Switching from GPT-4o to Claude 3.5 is a one-line change.</p>
          <p style={{ ...P(sub), marginBottom: 0 }}>The SDK is MIT licensed, fully open source at github.com/vercel/ai, and maintained by Vercel — the company that also created Next.js. This means first-class integration with Next.js App Router, Edge Runtime, and Vercel deployment, making it the natural choice for Next.js AI projects.</p>
        </Block>

        {/* Two layers */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="AI SDK Core vs AI SDK UI — the two layers" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'AI SDK Core — server-side model calls', badge: 'package: ai', body: 'Provider-agnostic functions for calling any AI model. streamText() streams text responses. generateText() returns the full text. generateObject() returns a type-safe object matching your Zod schema. streamObject() streams a structured object incrementally. These work in any Node.js environment, Deno, Bun, or Vercel Edge Runtime.' },
            { label: 'AI SDK UI — React hooks for conversation state', badge: 'package: @ai-sdk/react', body: 'React hooks that wire the server stream into React state. useChat() manages the full chat: messages array, input field, loading state, error handling. useCompletion() handles single-turn completions. useObject() consumes a streamed JSON object as it arrives. These hooks eliminate 95% of the boilerplate for building chat UIs.' },
            { label: 'AI SDK RSC — React Server Components (experimental)', badge: 'Next.js only', body: 'Enables Generative UI — where the AI can stream actual React components back to the client, not just text. The AI can decide to render a chart, a product card, or a form based on what the user asked. This is what makes the AI SDK genuinely different from every other AI library.' },
          ]} />
        </Block>

        {/* Key functions */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Key functions and hooks you will actually use" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'streamText()', desc: 'Server: streams text from any LLM. Pass model, system prompt, and messages. Returns a stream you pipe to the client with .toDataStreamResponse(). This is the core of every AI chat API route.' },
            { name: 'generateText()', desc: 'Server: same as streamText() but waits for the full response before returning. Use when you need the complete answer before proceeding — like building an agent step.' },
            { name: 'generateObject()', desc: 'Server: returns a fully typed JavaScript object matching your Zod schema. The model is constrained to your structure. Eliminates JSON parsing errors from LLMs.' },
            { name: 'streamObject()', desc: 'Server: same as generateObject() but streams the object as it is built. Great for showing partial results to the user while the model is still generating.' },
            { name: 'useChat()', desc: 'Client hook: the complete chat solution. Gives you messages, input, handleInputChange, handleSubmit, isLoading, error. Automatically connects to your /api/chat route and streams responses.' },
            { name: 'useCompletion()', desc: 'Client hook: for single-turn completions. Useful for one-shot features like summarize, translate, or improve — no conversation history needed.' },
            { name: 'useObject()', desc: 'Client hook: consumes a streamObject() response. As the server streams the structured object, useObject() gives you the partial object in real time — great for AI-generated forms or lists.' },
            { name: 'tool()', desc: 'Defines a tool the AI can call. Specify name, description, parameters schema (Zod), and execute() function. The AI decides when to call it. The SDK handles the tool call loop automatically.' },
          ]} />
        </Block>

        {/* Build a streaming chatbot */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Build a streaming chatbot in Next.js — step by step" color={color} />
          <p style={{ ...P(sub) }}>This is the canonical AI SDK pattern. A Next.js App Router route handles the server side, a React component handles the UI. The entire implementation is under 30 lines of real code.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install the packages', body: 'npm install ai @ai-sdk/openai\nInstall the core SDK and your chosen provider package. For Anthropic: @ai-sdk/anthropic. For Google: @ai-sdk/google. For Groq: @ai-sdk/groq. Set your API key in .env.local.' },
            { n: '2', title: 'Create the API route — app/api/chat/route.ts', body: "Import streamText from 'ai' and your provider. Export async POST that reads messages from the request body, calls streamText with your model and messages, returns result.toDataStreamResponse(). That is the entire backend — under 10 lines." },
            { n: '3', title: 'Build the chat component', body: "Add 'use client'. Import useChat from '@ai-sdk/react'. Destructure messages, input, handleInputChange, handleSubmit from useChat(). Render the messages list and a form with input + submit. useChat() automatically connects to /api/chat and streams the response into messages." },
            { n: '4', title: 'Run and test', body: 'npm run dev. Open localhost:3000. Type a message and watch the response stream in word by word. The entire streaming pipeline is handled by the SDK — you wrote zero boilerplate.' },
            { n: '5', title: 'Customize with system prompt and temperature', body: "Add a system parameter in streamText() to define the assistant's personality. Add maxTokens to limit response length. Add temperature: 0.7 for creative responses or temperature: 0 for deterministic ones. All settings live on the server." },
          ]} />
        </Block>

        {/* Multi-provider */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Switching between providers — one line change" color={color} />
          <InfoBox color={color} dark={dark}>
            streamText, generateText, and generateObject are fully provider-agnostic. You swap providers by changing the model parameter. Your API route, React hooks, and all other code stays identical.
          </InfoBox>
          <Compare dark={dark} border={border} color={color} items={[
            { label: "openai('gpt-4o-mini')", badge: '@ai-sdk/openai', body: "Fast, cheap, reliable. GPT-4o mini is the default for most applications. GPT-4o for more complex reasoning. Requires OPENAI_API_KEY. The most common choice for production apps." },
            { label: "anthropic('claude-3-5-haiku-20241022')", badge: '@ai-sdk/anthropic', body: "Claude models excel at coding, analysis, and following complex instructions. Haiku is fast and affordable. Sonnet is the production workhorse. Requires ANTHROPIC_API_KEY." },
            { label: "google('gemini-2.0-flash')", badge: '@ai-sdk/google', body: "Free tier available via Google AI Studio — no credit card. 1M+ token context window. Strong multimodal support. Best free option for development. Requires GOOGLE_GENERATIVE_AI_API_KEY." },
            { label: "groq('llama-3.1-70b-versatile')", badge: '@ai-sdk/groq', body: "Fastest inference — 500+ tokens/second. Free tier with generous limits. Best for latency-sensitive applications. Uses open-source Llama models. Requires GROQ_API_KEY." },
          ]} />
        </Block>

        {/* Structured output */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Structured output — type-safe data from any LLM" color={color} />
          <p style={{ ...P(sub) }}>generateObject() forces any LLM to return a specific JSON structure defined by a Zod schema. The result is a fully typed TypeScript object — no JSON parsing, no undefined fields, no runtime type errors. This is the correct pattern for any AI feature that needs structured data.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Define a Zod schema', body: "import { z } from 'zod'; const userSchema = z.object({ name: z.string(), email: z.string().email(), skills: z.array(z.string()), experience: z.number() }); — Every field is typed. The model must produce this exact structure." },
            { n: '2', title: 'Call generateObject with the schema', body: "const { object } = await generateObject({ model: openai('gpt-4o-mini'), schema: userSchema, prompt: 'Extract user info from: ' + inputText }); — object is fully typed. TypeScript knows every field." },
            { n: '3', title: 'Use the result directly', body: "console.log(object.name, object.skills, object.experience); — No JSON.parse(), no optional chaining for safety, no runtime type errors. The schema guarantees the shape." },
            { n: '4', title: 'Stream partial objects with streamObject()', body: "For long-running extractions, use streamObject() to show partial results as they arrive. The useObject() React hook handles the streaming state on the client." },
          ]} />
        </Block>

        {/* Tool calling */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Tool calling — giving the AI the ability to act" color={color} />
          <p style={{ ...P(sub) }}>Tool calling lets the AI decide when to call a function you define. The AI can search a database, call an API, run a calculation — then use the result to form its final answer. The AI SDK handles the entire multi-step tool loop automatically with the maxSteps parameter.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Define a tool', body: "import { tool } from 'ai'; import { z } from 'zod'; const getWeather = tool({ description: 'Get the current weather for a city', parameters: z.object({ city: z.string() }), execute: async ({ city }) => fetchWeatherAPI(city) }); — The description tells the model when to use this tool." },
            { n: '2', title: 'Pass tools to streamText', body: "const result = streamText({ model, tools: { getWeather }, maxSteps: 5, messages }); — maxSteps allows the model to call tools and continue reasoning multiple times before returning the final response." },
            { n: '3', title: 'Multi-step agentic loops', body: "With maxSteps greater than 1, the model can call multiple tools in sequence. The SDK handles all the round trips: model calls tool, tool executes, result feeds back to model, model responds. This is how you build agents with the AI SDK." },
          ]} />
        </Block>

        {/* What you can build */}
        <Block title="What you can build" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Streaming chatbots with any provider — OpenAI, Anthropic, Google, Groq — in under 30 lines of code',
            'AI-powered form filling — extract structured data from any text input with generateObject and Zod',
            'Multi-step AI agents that call your APIs and databases to answer questions with maxSteps',
            'Document analysis tools that summarize, extract, classify, and transform uploaded files',
            'Real-time AI features embedded anywhere in a Next.js or React app with zero streaming boilerplate',
            'Provider-flexible apps that can switch LLM vendors with a one-line code change',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Streaming Chatbot</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>
            Build a fully working streaming AI chatbot with the Vercel AI SDK and Next.js. This is the most important hands-on exercise — you will see exactly how tokens stream from the model to the browser and understand why this architecture is used by every production AI app.
          </p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Scaffold a Next.js app', body: 'npx create-next-app@latest my-ai-chat --typescript --app --tailwind\nThis creates a Next.js 14+ app with App Router, which is required for the AI SDK streaming patterns.' },
            { n: '2', title: 'Install AI SDK and a provider', body: 'npm install ai @ai-sdk/google\nCreate a .env.local file with GOOGLE_GENERATIVE_AI_API_KEY=your-key (free from aistudio.google.com — no credit card). Or use OPENAI_API_KEY with @ai-sdk/openai.' },
            { n: '3', title: 'Create the API route', body: "Create app/api/chat/route.ts. Import streamText from 'ai' and your provider. Export async POST that reads messages from the request body, calls streamText with your model, and returns result.toDataStreamResponse(). This is your entire backend." },
            { n: '4', title: 'Build the chat UI and extend it', body: "Replace app/page.tsx with a 'use client' component using useChat from '@ai-sdk/react'. Render messages and a form. Run npm run dev. Then: add a system prompt, try switching providers, add a tool — each extension teaches a new concept." },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>COST: free with Gemini API key from aistudio.google.com — no credit card needed</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Start with the official AI SDK examples at sdk.vercel.ai/examples — they are deployable in one click to Vercel. Each example is a complete, runnable project. The chatbot example, the structured data extraction example, and the tool use example each teach a distinct pattern. All three together cover 90% of what you will need for real AI projects.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/builders/gradio')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> Gradio
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

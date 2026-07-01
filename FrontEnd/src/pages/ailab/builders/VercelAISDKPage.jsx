import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#6366F1'

export default function VercelAISDKPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="AI App Builders">
      <ToolHeader
        icon="▲"
        title="Vercel AI SDK — The Standard for AI-Powered Web Apps"
        tagline="Build streaming chatbots and AI features in Next.js with 10 lines of code"
        badges={[['✓ FREE', '#4ADE80'], ['sdk.vercel.ai', color], ['TypeScript + React', 'var(--text-muted)']]}
        overview={"Before the Vercel AI SDK, adding a streaming AI chatbot to a React or Next.js app meant wrestling with ReadableStreams, Server-Sent Events, and managing state by hand — hundreds of lines of boilerplate copied from Stack Overflow. The AI SDK, built by the creators of Next.js, solves all of this. Two hooks — useChat and useCompletion — handle streaming, state, and UI updates automatically. On the server, streamText works identically whether you call OpenAI, Anthropic, Google, or Groq. It has become the de-facto standard for AI web apps in the JavaScript ecosystem, with over 20 million monthly npm downloads and 24,000+ GitHub stars."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Build AI Chatbot in Minutes: Vercel AI SDK + Next.js (2025)', url: 'https://www.youtube.com/watch?v=RRK3JJrzi_w', dur: '~20 min', note: 'Complete chatbot with streaming from scratch' },
            { label: 'Vercel AI SDK Overview — Generative UI, Streaming, Agentic Tool Functions', url: 'https://www.youtube.com/watch?v=D48I3Nd0E5U', dur: '~25 min', note: 'Streaming, tool calling, generative UI patterns' },
            { label: 'A Complete Guide To Vercel AI SDK — The ESSENTIAL Tool For Shipping AI Apps', url: 'https://www.youtube.com/watch?v=mojZpktAiYQ', dur: '~30 min', note: 'End-to-end production app guide' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why the AI SDK exists — the React streaming problem" color={color} />
          <InfoBox color={color}>
            Streaming AI responses requires a persistent connection from the browser to the server. Without a library, you must manually create a ReadableStream, encode tokens, handle backpressure, and manage React state on every update — plus write completely different code for each AI provider. The AI SDK abstracts all of this into two lines.
          </InfoBox>
          <p className="tool-layout-block__para">The second problem the SDK solves is provider lock-in. Companies that built directly on the OpenAI API found themselves unable to switch providers without rewriting all their AI integration code. The AI SDK introduces a unified interface where streamText, generateText, and generateObject work identically across 15+ providers. Switching from GPT-5.5 to Claude Sonnet 5 is a one-line change.</p>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The SDK is MIT licensed, fully open source at github.com/vercel/ai, and maintained by Vercel — the company that also created Next.js. This means first-class integration with Next.js App Router, Edge Runtime, and Vercel deployment, making it the natural choice for Next.js AI projects.</p>
        </Block>
        <Block>
          <SubHead label="AI SDK Core vs AI SDK UI — the two layers" color={color} />
          <Compare color={color} items={[
            { label: 'AI SDK Core — server-side model calls', badge: 'package: ai', body: 'Provider-agnostic functions for calling any AI model. streamText() streams text responses. generateText() returns the full text. generateObject() returns a type-safe object matching your Zod schema. streamObject() streams a structured object incrementally. These work in any Node.js environment, Deno, Bun, or Vercel Edge Runtime.' },
            { label: 'AI SDK UI — React hooks for conversation state', badge: 'package: @ai-sdk/react', body: 'React hooks that wire the server stream into React state. useChat() manages the full chat: messages array, input field, loading state, error handling. useCompletion() handles single-turn completions. useObject() consumes a streamed JSON object as it arrives. These hooks eliminate 95% of the boilerplate for building chat UIs.' },
            { label: 'AI SDK RSC — React Server Components (experimental)', badge: 'Next.js only', body: 'Enables Generative UI — where the AI can stream actual React components back to the client, not just text. The AI can decide to render a chart, a product card, or a form based on what the user asked. This is what makes the AI SDK genuinely different from every other AI library.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Key functions and hooks you will actually use" color={color} />
          <CardGrid color={color} items={[
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
        <Block>
          <SubHead label="Build a streaming chatbot in Next.js — step by step" color={color} />
          <p className="tool-layout-block__para">This is the canonical AI SDK pattern. A Next.js App Router route handles the server side, a React component handles the UI. The entire implementation is under 30 lines of real code.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Install the packages', body: 'npm install ai @ai-sdk/openai\nInstall the core SDK and your chosen provider package. For Anthropic: @ai-sdk/anthropic. For Google: @ai-sdk/google. For Groq: @ai-sdk/groq. Set your API key in .env.local.' },
            { n: '2', title: 'Create the API route — app/api/chat/route.ts', body: "Import streamText from 'ai' and your provider. Export async POST that reads messages from the request body, calls streamText with your model and messages, returns result.toDataStreamResponse(). That is the entire backend — under 10 lines." },
            { n: '3', title: 'Build the chat component', body: "Add 'use client'. Import useChat from '@ai-sdk/react'. Destructure messages, input, handleInputChange, handleSubmit from useChat(). Render the messages list and a form with input + submit. useChat() automatically connects to /api/chat and streams the response into messages." },
            { n: '4', title: 'Run and test', body: 'npm run dev. Open localhost:3000. Type a message and watch the response stream in word by word. The entire streaming pipeline is handled by the SDK — you wrote zero boilerplate.' },
            { n: '5', title: 'Customize with system prompt and temperature', body: "Add a system parameter in streamText() to define the assistant's personality. Add maxTokens to limit response length. Add temperature: 0.7 for creative responses or temperature: 0 for deterministic ones. All settings live on the server." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Switching between providers — one line change" color={color} />
          <InfoBox color={color}>
            streamText, generateText, and generateObject are fully provider-agnostic. You swap providers by changing the model parameter. Your API route, React hooks, and all other code stays identical.
          </InfoBox>
          <Compare color={color} items={[
            { label: "openai('gpt-4o-mini')", badge: '@ai-sdk/openai', body: "Fast, cheap, reliable. GPT-5.5 is the default for most applications. GPT-5.5 for more complex reasoning. Requires OPENAI_API_KEY. The most common choice for production apps." },
            { label: "anthropic('claude-haiku-4-5')", badge: '@ai-sdk/anthropic', body: "Claude models excel at coding, analysis, and following complex instructions. Haiku is fast and affordable. Sonnet is the production workhorse. Requires ANTHROPIC_API_KEY." },
            { label: "google('gemini-3.5-flash')", badge: '@ai-sdk/google', body: "Free tier available via Google AI Studio — no credit card. 1M+ token context window. Strong multimodal support. Best free option for development. Requires GOOGLE_GENERATIVE_AI_API_KEY." },
            { label: "groq('llama-3.1-70b-versatile')", badge: '@ai-sdk/groq', body: "Fastest inference — 500+ tokens/second. Free tier with generous limits. Best for latency-sensitive applications. Uses open-source Llama models. Requires GROQ_API_KEY." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Structured output — type-safe data from any LLM" color={color} />
          <p className="tool-layout-block__para">generateObject() forces any LLM to return a specific JSON structure defined by a Zod schema. The result is a fully typed TypeScript object — no JSON parsing, no undefined fields, no runtime type errors. This is the correct pattern for any AI feature that needs structured data.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Define a Zod schema', body: "import { z } from 'zod'; const userSchema = z.object({ name: z.string(), email: z.string().email(), skills: z.array(z.string()), experience: z.number() }); — Every field is typed. The model must produce this exact structure." },
            { n: '2', title: 'Call generateObject with the schema', body: "const { object } = await generateObject({ model: openai('gpt-4o-mini'), schema: userSchema, prompt: 'Extract user info from: ' + inputText }); — object is fully typed. TypeScript knows every field." },
            { n: '3', title: 'Use the result directly', body: "console.log(object.name, object.skills, object.experience); — No JSON.parse(), no optional chaining for safety, no runtime type errors. The schema guarantees the shape." },
            { n: '4', title: 'Stream partial objects with streamObject()', body: "For long-running extractions, use streamObject() to show partial results as they arrive. The useObject() React hook handles the streaming state on the client." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Tool calling — giving the AI the ability to act" color={color} />
          <p className="tool-layout-block__para">Tool calling lets the AI decide when to call a function you define. The AI can search a database, call an API, run a calculation — then use the result to form its final answer. The AI SDK handles the entire multi-step tool loop automatically with the maxSteps parameter.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Define a tool', body: "import { tool } from 'ai'; import { z } from 'zod'; const getWeather = tool({ description: 'Get the current weather for a city', parameters: z.object({ city: z.string() }), execute: async ({ city }) => fetchWeatherAPI(city) }); — The description tells the model when to use this tool." },
            { n: '2', title: 'Pass tools to streamText', body: "const result = streamText({ model, tools: { getWeather }, maxSteps: 5, messages }); — maxSteps allows the model to call tools and continue reasoning multiple times before returning the final response." },
            { n: '3', title: 'Multi-step agentic loops', body: "With maxSteps greater than 1, the model can call multiple tools in sequence. The SDK handles all the round trips: model calls tool, tool executes, result feeds back to model, model responds. This is how you build agents with the AI SDK." },
          ]} />
        </Block>
        <Block title="What you can build" titleColor={color}>
          {[
            'Streaming chatbots with any provider — OpenAI, Anthropic, Google, Groq — in under 30 lines of code',
            'AI-powered form filling — extract structured data from any text input with generateObject and Zod',
            'Multi-step AI agents that call your APIs and databases to answer questions with maxSteps',
            'Document analysis tools that summarize, extract, classify, and transform uploaded files',
            'Real-time AI features embedded anywhere in a Next.js or React app with zero streaming boilerplate',
            'Provider-flexible apps that can switch LLM vendors with a one-line code change',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Build a Streaming Chatbot</span></div>
          <p className="tool-layout-task__desc">
            Build a fully working streaming AI chatbot with the Vercel AI SDK and Next.js. This is the most important hands-on exercise — you will see exactly how tokens stream from the model to the browser and understand why this architecture is used by every production AI app.
          </p>
          <Steps color={color} items={[
            { n: '1', title: 'Scaffold a Next.js app', body: 'npx create-next-app@latest my-ai-chat --typescript --app --tailwind\nThis creates a Next.js 14+ app with App Router, which is required for the AI SDK streaming patterns.' },
            { n: '2', title: 'Install AI SDK and a provider', body: 'npm install ai @ai-sdk/google\nCreate a .env.local file with GOOGLE_GENERATIVE_AI_API_KEY=your-key (free from aistudio.google.com — no credit card). Or use OPENAI_API_KEY with @ai-sdk/openai.' },
            { n: '3', title: 'Create the API route', body: "Create app/api/chat/route.ts. Import streamText from 'ai' and your provider. Export async POST that reads messages from the request body, calls streamText with your model, and returns result.toDataStreamResponse(). This is your entire backend." },
            { n: '4', title: 'Build the chat UI and extend it', body: "Replace app/page.tsx with a 'use client' component using useChat from '@ai-sdk/react'. Render messages and a form. Run npm run dev. Then: add a system prompt, try switching providers, add a tool — each extension teaches a new concept." },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">COST: free with Gemini API key from aistudio.google.com — no credit card needed</span></div>
        </div>
        <ProTip>
        Start with the official AI SDK examples at sdk.vercel.ai/examples — they are deployable in one click to Vercel. Each example is a complete, runnable project. The chatbot example, the structured data extraction example, and the tool use example each teach a distinct pattern. All three together cover 90% of what you will need for real AI projects.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/builders/gradio', label: 'Gradio' }}
        next={{ path: '/ai-lab/coding/claude-code', label: 'Claude Code' }}
      />
    </ToolPageShell>
  )
}

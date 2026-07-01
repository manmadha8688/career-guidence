import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#3B82F6'

export default function GroqPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="APIs">
      <ToolHeader
        icon="⚡"
        title="Groq — The Fastest AI API on the Planet"
        tagline="Run open-source LLMs at speeds that feel instant"
        badges={[['✓ FREE TIER', '#4ADE80'], ['Free API key', color], ['Ultra-fast inference', 'var(--text-muted)']]}
        overview={"Groq is not a model company — they build hardware. The Groq LPU (Language Processing Unit) is custom silicon designed specifically for running large language models, not repurposed GPU chips. The result is jaw-dropping inference speed: where OpenAI's GPT-5.5 might return 50-80 tokens per second, Groq returns 500-800 tokens per second — nearly 10x faster. This speed is not just impressive in benchmarks; it changes what is possible. Real-time voice applications, live code streaming, instant document analysis, applications where any noticeable delay breaks the user experience. Groq hosts popular open-source models — Llama 3, Mixtral, Gemma — for free via API, making it the best way to build fast AI applications without paying per token during development and experimentation."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Getting Started With Groq API In Python', url: 'https://www.youtube.com/watch?v=jScpBCBoGdU', dur: '~12 min', note: 'First API call walkthrough — setup to streaming in Python' },
            { label: 'Create Your Own Groq AI Chatbot In Python In Less than 10 Minutes', url: 'https://www.youtube.com/watch?v=ToONdnhpFBg', dur: '10 min', note: 'Build a streaming chatbot from scratch with Groq' },
            { label: 'Build an AI Chatbot in 15 Minutes with Groq AI API', url: 'https://www.youtube.com/watch?v=hyY2RKb-qnM', dur: '15 min', note: 'Full project — real-time streaming Python app' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why speed matters" color={color} />
          <InfoBox color={color}>The Groq LPU achieves its speed through a fundamentally different architecture. Traditional GPU inference processes transformer attention in parallel across matrix operations — efficient but not optimized for sequential token generation. Groq's LPU processes token generation as a streaming pipeline where each layer feeds directly into the next without memory bottlenecks. The result: tokens arrive in a continuous stream rather than in batches.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>In practical terms, speed changes the category of applications you can build. A 3-second response time works for a chat interface but breaks a voice application. At 500 tokens/second, a 200-token response arrives in 0.4 seconds — fast enough for real-time voice, live transcription assistance, and applications where the AI response needs to feel as fast as a human typing. For students building portfolio projects, Groq's speed alone makes your demo feel significantly more impressive.</p>
        </Block>
        <Block>
          <SubHead label="Available models on Groq" color={color} />
          <CardGrid color={color} items={[
            { name: 'Llama 3.1 70B', desc: "Meta's flagship open-source model. Strong reasoning, coding, instruction following. Comparable to GPT-3.5 Turbo on most tasks. Best general-purpose choice on Groq." },
            { name: 'Llama 3.1 8B', desc: 'Smaller, even faster. Excellent for tasks where response quality matters less than latency — classification, routing, simple Q&A. Best for high-volume low-cost use.' },
            { name: 'Mixtral 8x7B', desc: "Mistral's mixture-of-experts model. Strong on code generation and multilingual tasks. Often outperforms models twice its size on technical tasks." },
            { name: 'Gemma 2 9B', desc: "Google's open-source model. Good instruction following and safety. Solid choice for content that needs conservative outputs." },
            { name: 'Llama 3.2 Vision', desc: 'Multimodal — accepts images alongside text. Analyze screenshots, diagrams, photos via API. Rare to have vision capability free in an API.' },
            { name: 'Whisper v3', desc: "OpenAI's open-source speech-to-text model, running on Groq's hardware for fast transcription. Transcribe audio files or live audio at high speed." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Making your first API call" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Get your free API key', body: 'Go to console.groq.com → Sign up with email → API Keys → Create API key. Free tier includes generous limits: 14,400 requests/day on Llama 3.1 70B.' },
            { n: '2', title: 'Install the SDK', body: "pip install groq (Python) or npm install groq (Node.js). Groq's SDK is OpenAI-compatible — if you know the OpenAI SDK, you already know Groq." },
            { n: '3', title: 'Write your first call', body: "from groq import Groq\nclient = Groq(api_key='your_key')\nresponse = client.chat.completions.create(\n  model='llama-3.1-70b-versatile',\n  messages=[{'role': 'user', 'content': 'Hello!'}]\n)\nprint(response.choices[0].message.content)" },
            { n: '4', title: 'Add streaming', body: 'For real-time output (text appears as it generates): add stream=True to the create() call. Iterate over the response chunks. This is what makes chatbots feel live.' },
            { n: '5', title: 'Set your API key as environment variable', body: "Never hardcode API keys in code. Use .env file + python-dotenv: GROQ_API_KEY=your_key_here. Access with os.getenv('GROQ_API_KEY'). Add .env to .gitignore immediately." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Groq vs OpenAI API" color={color} />
          <Compare color={color} items={[
            { label: 'Speed', badge: 'Groq wins by a wide margin', body: 'Groq: 500-800 tokens/second. OpenAI GPT-5.5: 50-80 tokens/second. OpenAI GPT-5.5-mini: ~100 tokens/second. For latency-sensitive applications, Groq is in a different category entirely.' },
            { label: 'Model quality', badge: 'OpenAI leads on top tasks', body: "GPT-5.5 and Claude Sonnet 5 remain the strongest models for complex reasoning and code generation. Groq's Llama 3.1 70B is excellent but not quite at that level. For most production use cases, the quality difference is acceptable; for the hardest reasoning tasks, OpenAI edges ahead." },
            { label: 'Cost', badge: 'Groq wins for free development', body: 'Groq free tier: 14,400 requests/day. OpenAI free tier: $5 credit, then pay per token. For development and experimentation, Groq is effectively free. For production, Groq paid pricing is competitive — ~$0.59/1M tokens for Llama 3.1 70B.' },
            { label: 'OpenAI compatibility', badge: 'Groq advantage', body: "Groq's API is 100% compatible with the OpenAI client library. Change one line: base_url='https://api.groq.com/openai/v1'. Any code written for OpenAI runs on Groq without changes. This makes switching trivial for experiments." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Practical use cases" color={color} />
          <CardGrid color={color} items={[
            { name: 'Real-time chatbots', desc: "Build a streaming chatbot where responses appear token by token. Groq's speed makes the streaming feel natural — like someone typing fast, not like waiting for a batch response." },
            { name: 'Voice applications', desc: "Combine Groq's Whisper (speech-to-text) with Llama 3.1 (reasoning) and a TTS service. End-to-end voice assistant latency under 1 second is achievable on Groq." },
            { name: 'Document processing', desc: "Process large batches of documents quickly. Summarize 100 reports, classify 1000 emails, extract data from 500 pages — Groq's speed makes batch processing practical." },
            { name: 'Prototyping any AI feature', desc: 'Because it is free and fast, Groq is ideal for rapid prototyping. Test ideas quickly, iterate on prompts without watching costs, build demos that impress in presentations.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Build AI-powered applications with responses that feel instant — no noticeable delay for users',
            'Use open-source models (Llama, Mixtral, Gemma) for free during development without burning API credits',
            "Transcribe audio files and live speech with Whisper running on Groq's fast hardware",
            'Switch any OpenAI-based code to Groq by changing one line — same SDK, dramatically faster',
            'Build real-time streaming chatbots where text appears token-by-token as it generates',
        ]} />
      </Block>
        <ProjectTask
        title={"Build a Streaming Chatbot"}
        description={"Create a simple chatbot web app or CLI that uses Groq's API with streaming enabled. The user types a message, presses enter, and the response streams in token-by-token in real time. Focus on: (1) correct streaming implementation, (2) conversation history (pass previous messages in the messages array), (3) environment variable for the API key, (4) graceful error handling. The streaming experience is the point — make it feel fast."}
        costNote={"TOTAL COST: ₹0 — Groq free tier, 14,400 requests/day included"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Set up your environment', body: 'Create a project folder. pip install groq python-dotenv (or npm install groq). Create .env with GROQ_API_KEY=your_key. Create .gitignore with .env on the first line.' },
            { n: '2', title: 'Implement streaming', body: "Call client.chat.completions.create() with stream=True. Iterate over chunks: for chunk in stream: print(chunk.choices[0].delta.content or '', end='', flush=True). The flush=True makes characters appear immediately." },
            { n: '3', title: 'Add conversation history', body: 'Maintain a messages list. Append each user message and assistant response. Pass the full list to every API call. This gives the model conversation memory.' },
            { n: '4', title: 'Test the speed', body: 'Run your chatbot. Ask a question that requires a long response. Time how quickly it starts streaming and how fast the text arrives. Compare to a ChatGPT free tier response for the same question.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Groq's free tier limits reset daily. If you hit the rate limit during development, switch to the 8B model (much higher limits) for testing and switch back to 70B for demos and production. The 8B model is fast enough to test streaming and conversation logic — you only need 70B when testing response quality.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/coding/codeium', label: 'Codeium' }}
        next={{ path: '/ai-lab/apis/openai-api', label: 'OpenAI API' }}
      />
    </ToolPageShell>
  )
}

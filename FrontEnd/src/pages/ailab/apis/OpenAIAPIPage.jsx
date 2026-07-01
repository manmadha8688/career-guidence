import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#3B82F6'

export default function OpenAIAPIPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="APIs">
      <ToolHeader
        icon="🔑"
        title="OpenAI API — Build AI Features Into Your Applications"
        tagline="The API powering thousands of AI products worldwide"
        badges={[['$5 Free Credit', '#4ADE80'], ['Pay as you go after', color], ['GPT-4o access', 'var(--text-muted)']]}
        overview={"The OpenAI API is how developers add GPT-4o, DALL-E, Whisper, and embeddings to their own applications. When you use a product that says \"powered by AI\" — a writing tool, a customer support bot, a code review tool, a resume analyzer — there is often an OpenAI API call happening in the background. Learning to use the API directly (not through ChatGPT's interface) is the skill that separates people who use AI tools from people who build AI tools. The API is straightforward: send a POST request with your messages and model choice, get a response. New accounts receive $5 in free credits to start. After that, pricing is per-token — a typical conversation costs less than a fraction of a rupee."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'OpenAI with Python: A Step-by-Step Guide for Beginners', url: 'https://www.youtube.com/watch?v=-A7njXsJl5M', dur: '~20 min', note: 'Best beginner guide — setup to first API call in Python' },
            { label: 'Getting Started with OpenAI API and GPT Models in Python', url: 'https://www.youtube.com/watch?v=TWiCf2uEKZg', dur: '~20 min', note: 'Chat completions, function calling, streaming explained clearly' },
            { label: 'OpenAI Assistants API — Course for Beginners', url: 'https://www.youtube.com/watch?v=qHPonmSX4Ms', dur: '~60 min', note: 'Full course covering Assistants API with threads and tools' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What the API gives you that ChatGPT doesn't" color={color} />
          <InfoBox color={color}>The API removes the interface layer and gives you direct access to the model. No chat history limits, no web UI, no content policy UI — just a model that responds to what you send. You control the system prompt (the persona and instructions), the conversation history, the temperature (creativity), the max tokens, and which model to use. These controls let you build products, not just use a product.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The most important control is the system prompt. In ChatGPT, you cannot change the fundamental persona and instructions the model operates under. Via the API, you can set a system message that completely defines the model's behavior: "You are a strict code reviewer. Only respond with specific code issues and improvements. Never praise code. Never explain what the code does correctly." Every application built on the API starts with a system prompt that shapes the model for that specific use case.</p>
        </Block>
        <Block>
          <SubHead label="Core API capabilities" color={color} />
          <CardGrid color={color} items={[
            { name: 'Chat Completions', desc: 'The main API. Send a list of messages (system + user + assistant), receive a response. Powers every chatbot, assistant, and Q&A feature built on OpenAI. 90% of API use cases use this endpoint.' },
            { name: 'Function Calling', desc: 'Tell the model about functions it can call. It returns structured JSON specifying which function to call with which arguments. Use to connect the model to real code: search a database, call an API, look up a price.' },
            { name: 'Embeddings', desc: 'Convert text to vectors. text-embedding-3-small is fast and cheap ($0.02/1M tokens). Use for semantic search, RAG systems, similarity matching, recommendation systems.' },
            { name: 'DALL-E Image Generation', desc: 'Generate images from text prompts programmatically. dall-e-3 produces high-quality 1024x1024 images. Integrate into apps that need custom image generation without a third-party service.' },
            { name: 'Whisper Transcription', desc: 'Convert audio files to text. Supports 50+ languages. $0.006/minute — transcribing an hour of audio costs ₹3. Use for meeting notes, lecture transcription, voice input.' },
            { name: 'Structured Outputs', desc: 'Force the model to return JSON matching a schema you define. Eliminates the need to parse free-text responses. Reliable for any use case that needs structured data extraction.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Making your first API call" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Get your API key', body: 'platform.openai.com → Sign up → API keys → Create new secret key. New accounts get $5 free credit. Save the key immediately — it is only shown once.' },
            { n: '2', title: 'Install the SDK', body: 'pip install openai (Python) or npm install openai (Node.js). Set your key: export OPENAI_API_KEY=sk-... (or use .env + python-dotenv).' },
            { n: '3', title: 'Write a chat completion', body: "from openai import OpenAI\nclient = OpenAI()\nresponse = client.chat.completions.create(\n  model='gpt-4o-mini',\n  messages=[\n    {'role': 'system', 'content': 'You are a helpful assistant.'},\n    {'role': 'user', 'content': 'Explain recursion briefly.'}\n  ]\n)\nprint(response.choices[0].message.content)" },
            { n: '4', title: 'Monitor your usage', body: 'platform.openai.com/usage shows token counts and cost per day. Set a monthly spending limit in Settings → Billing → Usage limits to avoid surprise bills during development.' },
            { n: '5', title: 'Use gpt-4o-mini for development', body: 'gpt-4o-mini costs ~20x less than gpt-4o and is excellent for most tasks. Develop and test with mini, switch to gpt-4o only for the specific prompts that need better quality.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Model selection and pricing" color={color} />
          <div className="tool-table-wrap" style={{ marginBottom: '1.25rem' }}>
            <table className="tool-table tool-table--striped">
              <thead>
                <tr>
                  {['Model', 'Context', 'Cost (input)', 'Cost (output)', 'Best for'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0.6rem 0.875rem', borderBottom: `1px solid ${color}30`, color, fontSize: '0.65rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['gpt-4o-mini', '128K', '$0.15/1M', '$0.60/1M', 'Development, most production tasks, cost-sensitive apps'],
                  ['gpt-4o', '128K', '$2.50/1M', '$10.00/1M', 'Complex reasoning, difficult code, nuanced tasks'],
                  ['gpt-4o (with vision)', '128K', '$2.50/1M', '$10.00/1M', 'Image analysis, screenshot understanding, visual tasks'],
                  ['text-embedding-3-small', '8K', '$0.02/1M', 'N/A', 'Embeddings for RAG, semantic search'],
                ].map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className={j === 0 ? 'tool-table__cell--accent' : undefined}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Compare color={color} items={[
            { label: 'The mini vs full-size decision', badge: 'Use mini by default', body: "GPT-4o mini handles 80-90% of tasks nearly as well as GPT-4o at 1/20th the cost. Start with mini for everything. Only upgrade specific prompts to full GPT-4o when mini's quality is measurably insufficient for that task." },
            { label: 'Context window', badge: '128K for both', body: 'Both models support 128K token context windows. This is enough for about 100 pages of text. In practice, longer contexts cost more — always trim conversation history and only include context that is actually needed.' },
            { label: 'Temperature control', badge: 'Use 0 for determinism', body: 'Temperature 0 = deterministic, consistent outputs (best for extraction, classification, coding). Temperature 0.7-1.0 = creative, varied outputs (best for writing, brainstorming). Default is 1.0 — explicitly set 0 for any task where consistency matters.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Function calling — the power feature" color={color} />
          <InfoBox color={color}>
            Function calling is the feature that makes AI genuinely useful in applications. Instead of getting a text response that says "I would search the database for X", the model returns structured JSON specifying which function to call and with what arguments. Your code calls the actual function with those arguments, and the real result goes back to the model. This is how AI connects to real data and real actions.
          </InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Define your function schema', body: 'Describe the function to the model: name, description, and parameter schema in JSON Schema format. The description tells the model when to call this function.' },
            { n: '2', title: 'Pass tools to the API', body: "Add a 'tools' parameter to your API call with your function definitions. The model decides whether to call a function or respond directly based on the user's message." },
            { n: '3', title: 'Handle the function call response', body: "Check if response.choices[0].finish_reason == 'tool_calls'. If so, parse response.choices[0].message.tool_calls[0] to get the function name and arguments." },
            { n: '4', title: 'Return the result', body: 'Call your actual function with the arguments. Add the result as a tool message. Send the full conversation back to the model. It generates a natural language response incorporating the real data.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Add AI-powered features to any web or mobile app using a simple HTTP POST request',
            'Build chatbots with custom system prompts that define precise behavior for your use case',
            'Connect AI to real data and actions using function calling — search databases, call APIs, trigger workflows',
            'Generate images, transcribe audio, and create embeddings all from the same unified API',
            'Control costs precisely by choosing the right model and setting spending limits',
        ]} />
      </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Build an AI Feature for a Real App</span></div>
          <p className="tool-layout-task__desc">Add an AI-powered feature to a project you already have (or build a small new one). Ideas: an AI that reviews code you paste in, an AI that summarizes articles by URL, an AI that answers questions about a small database, an AI writing assistant with a custom tone. Requirements: use the system prompt to define specific behavior, use gpt-4o-mini to keep costs low, handle errors gracefully, and never expose the API key in frontend code.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Choose a focused feature', body: "Not a full chatbot — a specific feature. 'Summarize this text in 3 bullet points' or 'Review this code for bugs' or 'Extract the key facts from this paragraph'. Narrow scope = better results." },
            { n: '2', title: 'Write a tight system prompt', body: "Define the model's role, output format, and constraints in the system message. Test it with 5-10 different inputs to verify it behaves consistently. The system prompt is your product's most important code." },
            { n: '3', title: 'Set temperature and max_tokens', body: 'For extraction/classification: temperature=0. For writing: temperature=0.7. Set max_tokens to limit response length and control cost. A summary should not be 1000 tokens.' },
            { n: '4', title: 'Add error handling', body: 'Wrap API calls in try/except. Handle rate limit errors (429), API unavailable errors (500), and insufficient credits. Log errors for debugging but show friendly messages to users.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">COST: ~$0.01–$0.05 during development — $5 free credit covers weeks of testing</span></div>
        </div>
        <ProTip>
        Your system prompt is the most valuable thing you will write when building on the OpenAI API. Spend more time on it than on the code. Test it adversarially — what happens when a user tries to make the model do something outside its defined role? Add explicit constraints: "Only answer questions about [topic]. If asked about anything else, politely decline." A well-written system prompt is the difference between a reliable product feature and an unpredictable demo.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/apis/groq', label: 'Groq' }}
        next={{ path: '/ai-lab/apis/together-ai', label: 'Together AI' }}
      />
    </ToolPageShell>
  )
}

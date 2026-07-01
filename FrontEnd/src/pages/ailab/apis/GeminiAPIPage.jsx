import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#3B82F6'

export default function GeminiAPIPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="APIs">
      <ToolHeader
        icon="🌟"
        title="Gemini API — Google's Most Generous Free AI API"
        tagline="Multimodal AI with 2M context window — free tier, no credit card"
        badges={[['✓ FREE TIER', '#4ADE80'], ['Google AI Studio', color], ['2M Token Context', 'var(--text-muted)']]}
        overview={"The Gemini API gives developers access to Google DeepMind's Gemini models — including Gemini 3.5 Flash, which outperforms GPT-3.5 Turbo and GPT-4 on many benchmarks at a fraction of the cost. The free tier at Google AI Studio requires no credit card and provides generous daily limits for learning and prototyping. The defining technical advantage is Gemini's very large context window — the Pro models handle roughly 1 million tokens, far more than most competing models. In practice, this means you can send an entire codebase, a full book, or a long audio recording in one API call and have Gemini analyze the entire thing. For students building their first AI-powered applications, the free Gemini API with Python is the most accessible entry point into production AI development."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Gemini API with Python — Getting Started Tutorial', url: 'https://www.youtube.com/watch?v=qfWpPEgea2A', dur: 'Jun 2025', note: 'Patrick Loeber — best beginner guide' },
            { label: 'Google Gemini API Tutorial for Beginners', url: 'https://www.youtube.com/watch?v=0qv_4x1K6hU', dur: 'Beginner', note: 'Complete walkthrough from key to first call' },
            { label: 'Build with Gemini API — Multimodal AI Tutorial', url: 'https://www.youtube.com/watch?v=O00yBRmDFXY', dur: 'Intermediate', note: 'Multimodal: images, PDFs, audio, video' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Getting your free API key" color={color} />
          <InfoBox color={color}>Google AI Studio (ai.google.dev) is for individual developers and students. No credit card required. Vertex AI is Google's enterprise cloud product — requires a GCP project and billing setup. For learning and personal projects, always start with AI Studio.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Go to Google AI Studio', body: 'Open ai.google.dev → click "Get API key" → "Create API key in new project" → copy your key. Takes 60 seconds. Save it immediately — you will use it in every project.' },
            { n: '2', title: 'Install the SDK and make your first call', body: 'pip install google-generativeai\n\nimport google.generativeai as genai\ngenai.configure(api_key=\'YOUR_KEY\')\n\nmodel = genai.GenerativeModel(\'gemini-3.5-flash\')\nresponse = model.generate_content(\'Explain recursion in simple terms\')\nprint(response.text)' },
            { n: '3', title: 'Set your key as an environment variable', body: 'Never hardcode API keys. Create a .env file: GEMINI_API_KEY=your_key_here. Access with: import os; api_key = os.getenv(\'GEMINI_API_KEY\'). Add .env to .gitignore immediately. Push code without the key.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Model lineup — which to use" color={color} />
          <Compare color={color} items={[
            { label: 'Gemini 3.5 Flash-Lite', badge: 'Highest free limits', body: 'Fastest, cheapest model. 15 RPM, 1000 requests/day free. Use for high-volume simple tasks: text classification, quick Q&A, summarization pipelines where you make many calls. Best for learning and testing.' },
            { label: 'Gemini 3.5 Flash', badge: 'Best all-rounder', body: 'Outperforms Gemini 3.1 Pro on coding tasks (Python, Java, SQL) while running at Flash speed. Paid: ~$0.10/1M input tokens. The default choice for most production applications. Better code generation than same-tier OpenAI models.' },
            { label: 'Gemini 3.5 Flash', badge: 'Current best speed/cost', body: 'Latest generation Flash model. Strongest reasoning at fast inference speed. ~$0.0007/K output tokens. Use this for most new projects — best balance of capability, speed, and cost in 2025.' },
            { label: 'Gemini 3.1 Pro', badge: 'Most capable', body: '$1.25/M input tokens — 50% cheaper than GPT-5.5 ($2.50/M). Use for the hardest tasks: complex reasoning, long document analysis, difficult code generation. Best when quality matters more than speed.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="The 2M token context window" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Gemini's very large context window is one of its most practically significant features. The Gemini 3.1 Pro model handles roughly 1 million tokens — on the order of 750,000 words, or an entire codebase, or a long audio recording — in a single request. This is not a marginal improvement: it changes what categories of tasks are possible in one API call.</p>
          <InfoBox color={color}>Practical examples of what fits in a ~1M-token window: large chunks of a library's documentation, an entire university course's lecture notes, several full research papers simultaneously, a long video transcript, or most of a source repository. For students building RAG systems, a window this large means some documents don't need chunking at all — just send the whole thing.</InfoBox>
        </Block>
        <Block>
          <SubHead label="Multimodal capabilities" color={color} />
          <CardGrid color={color} items={[
            { name: 'Text generation and chat', desc: 'Multi-turn conversations, document Q&A, code generation, summarization. Same capabilities as ChatGPT but with the larger context window and more generous free tier.' },
            { name: 'Image analysis', desc: 'Upload photos, screenshots, diagrams, charts, or UI mockups. Ask questions, extract text, describe what is shown, compare multiple images. Works with JPG, PNG, GIF, WebP.' },
            { name: 'PDF and document analysis', desc: 'Send PDFs directly — no text extraction needed. Ask questions about any section, request summaries, extract structured data, compare multiple documents simultaneously.' },
            { name: 'Audio transcription and analysis', desc: 'Transcribe audio files, summarize spoken content, extract key points from meetings or lectures. Supports MP3, WAV, AAC, FLAC, and more. Up to 9.5 hours of audio.' },
            { name: 'Video understanding', desc: 'Upload video files or YouTube links. Gemini watches the video and answers questions, creates summaries, identifies segments, and describes what happens. Up to 1 hour of video.' },
            { name: 'Code execution (Code Interpreter)', desc: 'Gemini can execute Python code and return results — similar to ChatGPT\'s Code Interpreter. Analyze data, generate charts, solve computational problems in the same API call.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Gemini API vs OpenAI API" color={color} />
          <Compare color={color} items={[
            { label: 'Free tier', badge: 'Gemini wins clearly', body: 'Gemini: ongoing free tier, no credit card, generous daily limits. OpenAI: $5 starter credits with 3-month expiry, then pay-per-token. For students building projects over months, Gemini\'s free tier is dramatically more practical.' },
            { label: 'Context window', badge: 'Gemini leads', body: 'Gemini 3.1 Pro: ~1M tokens. Most other flagships land lower. For applications that need to process large documents, entire codebases, or long conversations, Gemini\'s context advantage is a real differentiator.' },
            { label: 'Cost at paid tiers', badge: 'Gemini 40-50% cheaper', body: 'Gemini 3.1 Pro: $1.25/M input. GPT-5.5: $2.50/M input. Gemini 3.5 Flash: ~$0.10/M input. GPT-5.5: $0.15/M. For equivalent model tiers, Gemini is consistently less expensive.' },
            { label: 'Ecosystem and reliability', badge: 'OpenAI ahead', body: 'OpenAI has a larger developer ecosystem, more third-party library support (LangChain integrations, tooling), and a more stable free tier history. Google cut free-tier limits without notice in Dec 2025 causing 429 errors. For production, OpenAI\'s reliability has been better.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Make your first AI API call in 5 lines of Python using the free Gemini API — no credit card needed',
            'Build multimodal applications that process text, images, PDFs, audio, and video in the same API call',
            'Send entire documents or codebases to Gemini in one call thanks to the 2M token context window',
            'Build production-quality AI features at 40-50% lower cost than equivalent OpenAI API tiers',
            'Prototype unlimited applications during learning — the free tier covers all development and experimentation',
        ]} />
      </Block>
        <ProjectTask
        title={"Build a Multimodal Document Analyzer"}
        description={"Use the Gemini API to build a Python script that accepts any PDF or image file and answers questions about it. Input: file path + question. Output: Gemini's answer based on the file content. Test with: (1) a research paper PDF → ask for a 3-point summary, (2) a screenshot of a chart → ask what trend it shows, (3) your own lecture notes → ask 5 practice questions based on them. This demonstrates multimodal API usage in a real tool."}
        costNote={"TOTAL COST: ₹0 — Gemini free tier, no credit card required"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Get API key and install SDK', body: 'ai.google.dev → Get API key. pip install google-generativeai python-dotenv. Create .env with GEMINI_API_KEY=your_key. This takes 3 minutes total.' },
            { n: '2', title: 'Upload and analyze a PDF', body: "from pathlib import Path\nimport google.generativeai as genai\n\ngenai.configure(api_key=os.getenv('GEMINI_API_KEY'))\nmodel = genai.GenerativeModel('gemini-3.5-flash')\n\npdf_data = Path('document.pdf').read_bytes()\nresponse = model.generate_content([\n    {'mime_type': 'application/pdf', 'data': pdf_data},\n    'Summarize the 3 most important points in this document'\n])\nprint(response.text)" },
            { n: '3', title: 'Add image analysis', body: "from PIL import Image\nimage = Image.open('screenshot.png')\nresponse = model.generate_content(['What data does this chart show? What is the main trend?', image])\nGemini reads the image as visual input — no OCR or preprocessing needed." },
            { n: '4', title: 'Build the interactive version', body: 'Add a simple input loop: ask the user for a file path and a question. Load the file. Send to Gemini with the question. Print the answer. This is a working multimodal Q&A tool in ~30 lines of code.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Use <code className="tool-inline-code">gemini-3.5-flash</code> as your default model for almost everything during development. Switch to <code className="tool-inline-code">gemini-3.1-pro</code> only for specific prompts where 2.0 Flash gives insufficient quality. The cost difference between Flash and Pro is 10-15x — running your entire development cycle on Flash and only using Pro for final output review will keep your costs near zero while still benefiting from the best model where it matters.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/apis/huggingface', label: 'Hugging Face' }}
        next={{ path: '/ai-lab/apis/groq', label: 'Groq' }}
      />
    </ToolPageShell>
  )
}

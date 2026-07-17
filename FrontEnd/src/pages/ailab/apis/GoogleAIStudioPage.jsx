import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#4285F4'

export default function GoogleAIStudioPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="APIs">
      <ToolHeader
        icon="🔮"
        title="Google AI Studio — Prototype with Gemini and Get a Free API Key"
        tagline="The free web playground where you test Gemini and generate your API key in minutes"
        badges={[['✓ FREE web playground', '#4ADE80'], ['aistudio.google.com', color], ['No card to start', 'var(--text-muted)']]}
        overview={"Google AI Studio (aistudio.google.com) is Google's free, browser-based playground for building with the Gemini models. It is the fastest on-ramp to Google's AI: you sign in with a Google account, type a prompt, pick a model like Gemini 3 Flash, and see a response — no install, no billing, no credit card. But its real value for developers is two things. First, it is where you create your Gemini API key with one click, so you can move from experimenting in the browser to calling the same models from your own Python or JavaScript code. Second, every prompt you tune in the playground has a \"Get code\" button that generates a ready-to-paste snippet using your settings. For an Indian student starting out, AI Studio is the single best place to learn Gemini for ₹0 — prototype the idea in the web UI, then export the exact code and API key to build the real thing. Note: AI Studio (the playground) is the interface; the Gemini API is the programmatic service behind it. The key you generate here is a Gemini API key."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Google AI Studio — Full Beginner Tutorial', url: 'https://www.youtube.com/results?search_query=google+ai+studio+tutorial+2026', dur: '~15 min', note: 'Sign in, run your first prompt, and generate a free Gemini API key' },
            { label: 'Get a FREE Gemini API Key from AI Studio', url: 'https://www.youtube.com/results?search_query=free+gemini+api+key+google+ai+studio', dur: '~8 min', note: 'The exact click-path to create a key and call it from Python' },
            { label: 'AI Studio Prompt Engineering & Get Code', url: 'https://www.youtube.com/results?search_query=google+ai+studio+get+code+prompt+engineering', dur: '~18 min', note: 'Tune temperature and system instructions, then export runnable code' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Playground vs API — how AI Studio fits together" color={color} />
          <InfoBox color={color}>{"AI Studio is the web UI; the Gemini API is the engine. Everything you can do in the AI Studio playground — chat, tune the system instruction, adjust temperature, attach images or PDFs — you can also do in code through the Gemini API using the API key you generate in AI Studio. The workflow is: prototype visually in AI Studio → click 'Get code' → paste the snippet into your project → keep using the same free key. You are never locked into the browser."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The most common confusion for beginners is thinking AI Studio and the Gemini API are separate products. They are not — AI Studio is the friendliest front door to the Gemini API. As of 2026, using the AI Studio playground itself is free, and creating a Gemini API key is free. Only when you attach a billing account (to unlock higher rate limits and paid models) does your project move off the free tier. Until then, you can build and learn without ever entering card details.</p>
          {[
            'Free web playground — test any available Gemini model in the browser, no install and no card',
            'One-click API key — generate a Gemini API key from the "Get API key" button and use it in your own code',
            '"Get code" export — every prompt converts to a runnable Python, JavaScript, or REST snippet with your exact settings',
            'Multimodal by default — drop in images, PDFs, and audio; Gemini reads them natively',
            'System instructions & tuning — set the persona, temperature, and output length visually before you write any code',
            'Free tier covers Flash models — Gemini 3 Flash and Flash-Lite are the recommended free-tier models in 2026',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Free Prompt Playground', desc: 'Run Gemini in the browser with zero setup. Switch models, edit the system instruction, and iterate on your prompt live. This is the fastest way to learn what the model can do before writing code.' },
            { name: 'One-Click API Key', desc: 'The "Get API key" button creates a Gemini API key tied to a Google Cloud project. Copy it into GEMINI_API_KEY and you can call the same models from Python, Node, or curl. New keys are created as auth keys by default in 2026.' },
            { name: 'Get Code Export', desc: 'Tuned a prompt you like? Click "Get code" and AI Studio generates a ready-to-run snippet (Python / JavaScript / REST) that reproduces your exact settings — model, temperature, system instruction, and all.' },
            { name: 'Multimodal Input', desc: 'Attach images, PDFs, and audio directly in the playground. Gemini reads them natively — ask questions about a screenshot, summarize a PDF, or transcribe audio, then export that flow to code.' },
            { name: 'Long Context', desc: 'Gemini models support very large context windows (Flash models handle hundreds of thousands of tokens). Paste in long documents or entire codebases and ask questions across all of it.' },
            { name: 'Structured Output & Tools', desc: 'Force JSON output matching a schema, enable function calling, and turn on Google Search grounding — all toggleable in the UI and reproducible via the API for real applications.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — from browser to your first API call" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Open AI Studio and run a prompt', body: 'Go to aistudio.google.com and sign in with any Google account. In the prompt box, pick a model (Gemini 3 Flash is a great free default), type a question, and hit Run. No card, no install — you are talking to Gemini instantly.' },
            { n: '2', title: 'Generate your free API key', body: 'Click "Get API key" (top-left) → "Create API key". AI Studio creates a key inside a Google Cloud project for you. Copy it once and store it safely — treat it like a password and never commit it to git or put it in frontend code.' },
            { n: '3', title: 'Install the SDK', body: 'In your terminal: pip install google-genai (Python) or npm install @google/genai (Node.js). Set the key as an environment variable so your code can read it: export GEMINI_API_KEY=your-key-here' },
            { n: '4', title: 'Make your first call in Python', body: "from google import genai\nclient = genai.Client()  # reads GEMINI_API_KEY from env\nresponse = client.models.generate_content(\n    model='gemini-3-flash',\n    contents='Explain what an API key is in 2 sentences.'\n)\nprint(response.text)" },
            { n: '5', title: 'Or call it with curl (REST)', body: "curl \"https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash:generateContent\" \\\n  -H \"x-goog-api-key: $GEMINI_API_KEY\" \\\n  -H 'Content-Type: application/json' \\\n  -d '{\"contents\":[{\"parts\":[{\"text\":\"Say hi in Telugu\"}]}]}'" },
            { n: '6', title: 'Check your live limits', body: 'Free-tier rate limits are set per Google Cloud project (not per key) and can change. Open the AI Studio rate-limit view for your project to see your live RPM / RPD / TPM. Daily request quotas reset at midnight Pacific time.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Free tier in 2026 — what you actually get" color={color} />
          <Compare color={color} items={[
            { label: 'Flash models are free', badge: 'Gemini 3 Flash / Flash-Lite', body: 'The 2026 free tier covers the Flash and Flash-Lite families — Gemini 3 Flash is Google\'s recommended free-tier model. These are fast, multimodal, and more than enough for learning, prototypes, and small projects.' },
            { label: 'Pro models need billing', badge: 'Paid tier only', body: 'Gemini Pro models are restricted to trial-level access, and Google removed Pro\'s free tier in 2026. To use Pro in production you must link a billing account, which moves that project off the free tier.' },
            { label: 'Limits are per project', badge: 'Not per API key', body: 'All keys inside one Google Cloud project share the same RPM / RPD / TPM pool — making extra keys does not add quota. To get more free headroom, create a separate project. Verify live numbers in AI Studio.' },
            { label: 'The billing trap', badge: 'Know before you click', body: 'Once you enable billing on a project, its free tier disappears and every call on that project becomes billable. Keep a separate free project for experiments and a paid project for production if you need both.' },
            { label: 'Auth key migration', badge: '2026 change', body: 'AI Studio now creates new keys as auth keys by default, and Google plans to reject requests from older standard keys in September 2026. If you have an old integration, check the key type in AI Studio and migrate.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="AI Studio vs Gemini API vs Vertex AI" color={color} />
          <Compare color={color} items={[
            { label: 'Google AI Studio', badge: 'Prototype here', body: 'The free browser playground + the simplest way to get a Gemini API key. Best for learning, quick experiments, and generating starter code. This is where students should begin.' },
            { label: 'Gemini API (Developer API)', badge: 'Build here', body: 'The same models called from your own code with the AI Studio key. Great for personal projects, hackathons, and small apps. Free tier for Flash; pay-as-you-go for higher limits and Pro.' },
            { label: 'Vertex AI', badge: 'Enterprise scale', body: 'Google Cloud\'s enterprise ML platform. Adds IAM, VPC controls, MLOps, and higher SLAs — but is more complex to set up. Overkill for students; relevant once you are shipping at company scale.' },
            { label: 'Which should you use?', badge: 'Start simple', body: 'For everything in this course: use AI Studio to prototype and get a key, then call the Gemini API from code. Only reach for Vertex AI when a job or a real company requires enterprise governance.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Build a "Document Q&A" Tool with a Free Gemini Key</span></div>
          <p className="tool-layout-task__desc">Use AI Studio to prototype a tool that answers questions about a PDF (a syllabus, a research paper, or your own notes), then export it to real Python code running on your free API key. This teaches the full loop every AI developer uses: experiment visually, export code, run it yourself — all for ₹0.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Prototype in the playground', body: 'In AI Studio, start a new prompt, select Gemini 3 Flash, and attach a PDF. Ask: "Answer questions using only this document. If the answer is not in it, say so." Test a few questions until the behavior is right.' },
            { n: '2', title: 'Set a system instruction', body: 'Open the system instruction field and paste your rules: "You are a study assistant. Answer strictly from the attached document. Quote the relevant line. Never invent facts." Re-test to confirm it refuses off-document questions.' },
            { n: '3', title: 'Export with "Get code"', body: 'Click "Get code" → choose Python. AI Studio generates a snippet using your model, system instruction, and settings. Copy it into a file called doc_qa.py in your project.' },
            { n: '4', title: 'Wire in your key and a real PDF', body: 'Set GEMINI_API_KEY in your environment. Modify the snippet to upload a local PDF with client.files.upload() and pass it as content. Run: python doc_qa.py and ask it a question from the terminal.' },
            { n: '5', title: 'Add a simple question loop', body: 'Wrap the call in a while loop that reads input() and prints response.text, so you can keep asking questions in one session. Congratulations — you built a document assistant on Google\'s free tier.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — AI Studio playground and a Gemini API key cost ₹0; Gemini 3 Flash runs on the free tier with no card required</span></div>
        </div>
        <ProTip>
        The "Get code" button is the feature most beginners overlook — and it is a superpower. Instead of guessing how to structure an API call, tune your prompt visually in AI Studio until it behaves exactly right, then let AI Studio write the correct, up-to-date code for you. This means you always start from working code with the right model name, the right SDK, and your exact settings baked in. One more habit that will save you: keep a separate Google Cloud project for experiments (free tier) and never enable billing on it, so a stray click can never turn your learning project into a billable one.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/apis/gemini-api', label: 'Gemini API' }}
        next={{ path: '/ai-lab/apis/github-models', label: 'GitHub Models' }}
      />
    </ToolPageShell>
  )
}

import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#1F2937'

export default function KimiPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Chatbots">
      <ToolHeader
        icon="🌙"
        title="Kimi — The Long-Context Marathon Runner"
        tagline="Moonshot AI's open model built to read huge documents and work for hours"
        badges={[['✓ FREE CHAT', '#4ADE80'], ['Open Weights', color], ['kimi.com', 'var(--text-muted)']]}
        overview={"Kimi is the AI assistant from Moonshot AI, a Chinese lab that made its name on one thing above all: enormous context. Where many chatbots forget the start of a long conversation, Kimi was designed from the ground up to swallow huge amounts of text — entire codebases, long research papers, or a stack of documents — and reason across all of it at once. Its latest open model, Kimi K2.6, is a large mixture-of-experts model (around a trillion total parameters with a much smaller active set) with a 256K-token context window and native vision. It is genuinely open weight, published on Hugging Face, so developers can self-host it. Moonshot markets K2.6 less as 'a smarter chatbot' and more as an engine for long-horizon, agentic work — coding sessions that run for hours, coordinating many sub-agents, and turning documents into slides, sheets, and websites. You can use it free at kimi.com. For Indian students, Kimi's edge is concrete: when you need an AI that can actually hold a big document or codebase in its head and not lose the thread, Kimi is one of the best free options."}
      />

      <Block title="Watch first" titleColor="#EF4444">
        {[
          { label: 'Kimi (Moonshot AI) beginner tutorial', url: 'https://www.youtube.com/results?search_query=kimi+moonshot+ai+tutorial+for+beginners', dur: '', note: 'Search results — pick a recent walkthrough of kimi.com' },
          { label: 'Kimi K2 long context demo — feed it a whole document', url: 'https://www.youtube.com/results?search_query=kimi+k2+long+context+document+demo', dur: '', note: 'See the huge context window handle a full paper or codebase' },
          { label: 'Kimi K2 vs other open models comparison', url: 'https://www.youtube.com/results?search_query=kimi+k2+vs+deepseek+qwen+comparison', dur: '', note: 'Where Kimi\'s long-context and agentic strengths stand out' },
        ].map((v, i) => <VideoCard key={i} v={v} />)}
      </Block>

      <Block>
        <SubHead label="How Kimi is different — built for length and long-running work" color={color} />
        <InfoBox color={color}>{"Kimi's defining feature is context length and endurance. K2.6 handles a 256K-token window — hundreds of pages of text in a single conversation — and Moonshot built it specifically for 'long-horizon' tasks: sessions that keep working across thousands of steps without losing the plot. It is also open weight, published on Hugging Face, so it can be downloaded and self-hosted. In short, most chatbots are sprinters optimised for a quick, clever reply; Kimi is a marathon runner optimised for holding a huge amount of information and grinding through big, multi-step jobs."}</InfoBox>
        <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The practical difference shows up the moment your task is big. Paste an entire research paper, a long legal-style document, or a whole code module into most chatbots and they either truncate it or start forgetting the earlier parts. Kimi is engineered to keep all of it in view and answer questions that require connecting page 3 to page 180. Its newest model, K2.6, pushes further into agentic territory — coordinating multiple sub-agents, running long autonomous coding sessions, and producing finished deliverables like documents, slides, and spreadsheets. For a student, the everyday win is simpler: it is one of the best free tools for "read this whole thing and help me understand it."</p>
        {[
          'Massive 256K-token context — feed an entire paper, document stack, or codebase at once',
          'Free web chat at kimi.com — sign up and start immediately, free tier available',
          'Open weights on Hugging Face — download and self-host K2.6 (large hardware needed)',
          'Built for long-horizon work — long coding sessions and multi-step autonomous tasks',
          'Native vision — upload images, screenshots, and diagrams and ask about them',
          'Agent and swarm modes plus Kimi tools (Docs, Slides, Sheets) for finished deliverables',
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
          { name: '256K Context Window', desc: 'Kimi K2.6 holds roughly 256K tokens — hundreds of pages — in a single conversation. Paste an entire document or codebase and ask questions that span the whole thing without it losing track.' },
          { name: 'Free Web Chat', desc: 'kimi.com offers a free tier — sign up and start with the fast instant mode immediately. No setup, no credit card to begin. Paid plans unlock heavier agent and swarm modes.' },
          { name: 'Open Weights', desc: 'K2.6 is an open model published on Hugging Face under a permissive (modified MIT) license. Developers can download and self-host it — though as a ~1T-parameter mixture-of-experts model it needs serious hardware.' },
          { name: 'Long-Horizon & Agentic', desc: 'Designed for tasks that run for hours across many steps — extended coding, research, and autonomous workflows. Agent and swarm modes can coordinate multiple sub-agents on a shared goal.' },
          { name: 'Native Vision', desc: 'A built-in vision encoder lets Kimi understand images, screenshots, charts, and diagrams. Upload a figure from a paper or a photo of notes and ask it to explain or extract the content.' },
          { name: 'OpenAI-Compatible API', desc: 'For building, Moonshot serves Kimi at platform.moonshot.ai with OpenAI- and Anthropic-compatible APIs, plus a Kimi Code CLI for agentic coding. Existing tutorials work by swapping the base URL and key.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Getting started — read a big document with Kimi" color={color} />
        <Steps color={color} items={[
          { n: '1', title: 'Open kimi.com', body: 'Go to kimi.com and sign up for the free tier. You start in the fast instant mode, which is fine for everyday questions and quick drafts. No credit card needed to begin.' },
          { n: '2', title: 'Ask a normal question first', body: 'Warm up with something everyday — "Explain the difference between processes and threads" — to see the response style and speed before you throw a big task at it.' },
          { n: '3', title: 'Upload a long document', body: 'This is Kimi\'s signature move. Attach a long PDF — a research paper, a textbook chapter, or a big spec — and ask: "Summarise this in one page" or "What are the main arguments and their weaknesses?" It reads the whole thing.' },
          { n: '4', title: 'Ask cross-document questions', body: 'Now ask something that requires connecting distant parts: "Does the conclusion actually follow from the data in section 4?" This is where the huge context window earns its keep — questions a short-context model cannot answer.' },
          { n: '5', title: 'Try an image', body: 'Upload a chart, a screenshot of an error, or a diagram and ask Kimi to explain or transcribe it. Native vision means you do not need a separate tool for visual content.' },
          { n: '6', title: '(Optional) Explore agent mode / API', body: 'For bigger jobs, try the agent modes in the app, or for building, grab an API key at platform.moonshot.ai and call the OpenAI-compatible endpoint. The Kimi Code CLI is worth a look for agentic coding.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="When Kimi is the right tool" color={color} />
        <Compare color={color} items={[
          { label: 'Reading huge documents', badge: 'Kimi shines', body: 'When you need to feed in an entire paper, a long report, or a whole document stack and ask questions across all of it, Kimi\'s 256K context is a genuine advantage over short-context chatbots that truncate or forget.' },
          { label: 'Long, multi-step coding', badge: 'Built for it', body: 'K2.6 is designed for long-horizon coding sessions and agentic workflows that run across many steps. If your task is a big, multi-file build rather than a one-off snippet, Kimi is worth trying — especially via the Kimi Code CLI.' },
          { label: 'Quick everyday questions', badge: 'Any tool works', body: 'For short, simple questions, Kimi works fine but has no special edge — ChatGPT, DeepSeek, or Gemini are equally good. Save Kimi for when the length or duration of the task is the hard part.' },
          { label: 'Self-hosting', badge: 'Possible but heavy', body: 'K2.6 is open weight, so you can self-host it — but at ~1T total parameters it needs serious GPU infrastructure, far more than a laptop. For most students, the free web chat or the cheap API is the practical route.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Kimi vs DeepSeek vs Claude — long-context edition" color={color} />
        <Compare color={color} items={[
          { label: 'Context window', badge: 'Kimi & Claude lead', body: 'Kimi (256K) and Claude (very large context) are both built for long inputs. DeepSeek\'s newer models also offer large context. For sheer document-swallowing on a free tier, Kimi is one of the strongest options.' },
          { label: 'Openness', badge: 'Kimi & DeepSeek open', body: 'Kimi K2.6 and DeepSeek are both open weight — you can self-host them. Claude is closed and API-only. If running the model yourself matters, Kimi and DeepSeek are your choices; Claude wins on polish and safety tooling.' },
          { label: 'Agentic / long-horizon work', badge: 'Kimi\'s focus', body: 'Kimi is explicitly marketed for hours-long, many-step agentic tasks and swarms of sub-agents. Claude is also excellent at agentic coding. DeepSeek is more of a strong general model. Match the tool to how long and multi-step your job is.' },
          { label: 'Everyday polish & ecosystem', badge: 'Claude smoother', body: 'Claude and ChatGPT feel more polished for general daily use, with mature apps and integrations. Kimi is more specialised. Use Kimi when length or endurance is the challenge; use Claude/ChatGPT for smooth everyday assistance.' },
          { label: 'Cost', badge: 'Kimi & DeepSeek cheaper', body: 'Kimi\'s free chat and relatively low API price, plus DeepSeek\'s ultra-cheap API, make both very budget-friendly. Claude is more expensive per token. For cost-sensitive student projects, the open models usually win.' },
        ]} />
      </Block>

      <div className="tool-layout-task">
        <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Turn a Long Paper Into a Study Guide</span></div>
        <p className="tool-layout-task__desc">Use Kimi&apos;s huge context window to digest a full research paper or textbook chapter and turn it into a study guide you actually understand. This teaches you how long-context AI changes what is possible — and how to interrogate a source rather than passively summarise it.</p>
        <Steps color={color} items={[
          { n: '1', title: 'Pick a genuinely long source', body: 'Choose a full research paper, a long lecture PDF, or a dense textbook chapter — something you would normally struggle to get through. The longer it is, the more Kimi\'s context window helps.' },
          { n: '2', title: 'Upload it to kimi.com', body: 'Sign in to the free tier, attach the full document, and ask: "Give me a one-page summary with the key ideas, in plain language." Confirm it actually read the whole thing by asking about a detail from the last section.' },
          { n: '3', title: 'Build the study guide', body: 'Ask: "Turn this into a study guide: key terms with definitions, the main argument, the evidence, and 5 questions I should be able to answer after studying." Now you have a structured revision aid, not just a summary.' },
          { n: '4', title: 'Interrogate the source', body: 'Ask critical questions the whole document is needed to answer: "Where is the argument weakest?" and "Does the conclusion match the data in the earlier sections?" This is where long context beats a short-context tool.' },
          { n: '5', title: 'Test yourself, then verify', body: 'Answer Kimi\'s 5 questions from memory before checking. Then open the original document and verify Kimi\'s key claims against the actual text — long-context models can still misread, so confirm anything important.' },
          { n: '6', title: 'Reflect', body: 'Write two sentences on what became possible because the AI could hold the entire document at once — and note any place where you had to correct it. That judgement is the skill worth keeping.' },
        ]} />
        <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — Kimi&apos;s free chat at kimi.com covers this project end to end at ₹0</span></div>
      </div>

      <ProTip>
        {"Kimi is the tool you reach for when the problem is size, not cleverness. Any chatbot can answer a one-line question, but when you have an entire paper, a long spec, or a whole codebase to understand, most tools quietly truncate or forget — and then confidently answer from the half they remember. Kimi's huge context window lets you keep everything in view and ask questions that genuinely require connecting distant parts of a document. Use it deliberately: paste the whole source, verify it has read the end as well as the start, and then ask the cross-cutting questions that a short-context model simply cannot handle. Still verify important claims against the original — long context reduces forgetting, but it does not eliminate mistakes."}
      </ProTip>

      <PageNavRow
        prev={{ path: '/ai-lab/chatbots/qwen', label: 'Qwen' }}
        next={{ path: '/ai-lab/chatbots/chatgpt', label: 'ChatGPT' }}
      />
    </ToolPageShell>
  )
}

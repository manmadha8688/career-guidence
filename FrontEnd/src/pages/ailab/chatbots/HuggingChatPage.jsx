import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F59E0B'

export default function HuggingChatPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Chatbots">
      <ToolHeader
        icon="🤗"
        title="HuggingChat — 115+ Free Open-Source AI Models in One Place"
        tagline="No account needed. No subscription. The open-source alternative to ChatGPT."
        badges={[['✓ 100% FREE', '#4ADE80'], ['huggingface.co/chat', color], ['Open Source', 'var(--text-muted)']]}
        overview={"HuggingChat is Hugging Face's free chatbot interface — a single URL that gives you access to 115+ of the best open-source AI models with zero cost, zero account required, and all tools included. Where ChatGPT locks you into GPT-5.5 and Claude locks you into Anthropic's models, HuggingChat lets you run Meta's Llama 3.3 70B, Alibaba's Qwen3 235B, DeepSeek R1, Mistral, and dozens more — and switch between them instantly. Every tool is included free: web search, image generation via Flux.1, Python code execution, PDF document parsing, and live rendering. For students who want the power of modern AI without any subscription cost, HuggingChat is the most complete free option available."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'HuggingChat Tutorial', url: 'https://www.youtube.com/watch?v=SewskTr0o8o', dur: 'Jan 2025', note: 'Best recent walkthrough' },
            { label: 'A Guide to HuggingChat: Your Free Alternative to ChatGPT', url: 'https://www.youtube.com/watch?v=AcZht4ZUEnU', dur: 'Apr 2024', note: 'Step-by-step beginner guide' },
            { label: 'Hugging Chat Assistant | Build Your OWN Personal Assistant With Open Source Models', url: 'https://www.youtube.com/watch?v=c90Ufatajh0', dur: '', note: 'Assistants feature deep dive' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why open-source models matter" color={color} />
          <InfoBox color={color}>Open-source means the actual model weights are publicly released — anyone can download, inspect, run, or fine-tune them. HuggingChat hosts these models on Hugging Face's servers so you can use them via browser without downloading anything. The transparency is the key difference: you can inspect what model you are actually using, run it locally if you need privacy, and the community can audit the models for bias or safety issues.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The practical benefit for students is cost and variety. Instead of paying $20/month for ChatGPT Plus to access GPT-5.5, HuggingChat gives you Llama 3.3 70B (which rivals GPT-4 on most tasks), Qwen3 235B (which rivals GPT-5.5 on reasoning), and DeepSeek R1 (which rivals OpenAI's o1 on math and coding) — all free. If one model gives a poor answer on a topic, you can switch to another instantly without paying separately for each.</p>
        </Block>
        <Block>
          <SubHead label="Available models — which to use for what" color={color} />
          <CardGrid color={color} items={[
            { name: 'Llama 3.3 70B Instruct', desc: "Meta's flagship open-source model. Fast, highly capable, rivals GPT-3.5 Turbo on most everyday tasks. Best default choice for general questions, writing, and explanations. 128K context window." },
            { name: 'Qwen3 235B (Alibaba)', desc: "Alibaba's reasoning model — rivals DeepSeek R1 and OpenAI o1. Best for: complex reasoning, math, coding. Very large model so slower, but produces the highest quality answers for hard problems." },
            { name: 'DeepSeek R1 Distill Qwen 32B', desc: "DeepSeek's reasoning model, shows its thinking step by step. Beats o1-mini on several benchmarks. Best for: math problems, logical reasoning, and tasks where seeing the reasoning process helps." },
            { name: 'Mistral / Mixtral', desc: "French AI lab's model — fast, efficient, great for coding and multilingual tasks. Mixtral 8x7B uses mixture-of-experts for better quality at lower compute." },
            { name: 'Command R+ (Cohere)', desc: 'Optimized for tool use, web search, and conversational interaction. Strong at following complex multi-step instructions.' },
            { name: 'Omni Router', desc: "HuggingChat's auto-selector. Picks the best model for each prompt automatically. Use this when you don't know which model fits your task." },
          ]} />
        </Block>
        <Block>
          <SubHead label="All tools included — for free" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Web search (live browsing)', body: "Toggle on the 'Web Search' tool before asking your question. The AI browses the live internet and cites sources. Works like Perplexity — answers current questions, news, and recent documentation. No plugin, no extra setup." },
            { n: '2', title: 'Image generation (Flux.1)', body: "Ask for an image directly in chat: 'Generate a diagram showing how a REST API works' or 'Create a logo concept for a study app'. HuggingChat uses Flux.1 — currently the best open-source image model. Completely free." },
            { n: '3', title: 'Python code execution', body: 'Ask the AI to solve a computational problem and it writes and runs Python in-chat, returning the actual output. Like ChatGPT\'s Code Interpreter — but free. Great for: math calculations, data analysis, verifying algorithm correctness.' },
            { n: '4', title: 'Document parsing (PDF/CSV upload)', body: "Upload any PDF or CSV and ask questions about it. 'Summarize the key findings in this paper', 'What does this spreadsheet say about Q3 sales?' — the model reads the file and answers from its content." },
            { n: '5', title: 'Live render panel', body: 'Ask for HTML, a chart, or a structured document and it renders live in a side panel with version history. Useful for prototyping UI layouts, seeing diagram outputs, or previewing formatted content.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Assistants — build your own custom chatbot" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>HuggingChat Assistants is the open-source equivalent of OpenAI's Custom GPTs. You create a chatbot with a custom name, system prompt, chosen model, and optional knowledge base — then share it with a link. Thousands of community-built assistants are already in the directory at huggingface.co/chat/assistants.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Go to Assistants in the sidebar', body: "Log in with your free Hugging Face account (takes 30 seconds). Click 'Assistants' in the bottom-left sidebar → 'Create new assistant'." },
            { n: '2', title: 'Define name, model, and system prompt', body: "Give it a name (e.g., 'Python Tutor'), choose a base model (Llama 3.3 70B works for most), and write a system prompt: 'You are a Python tutor for beginners. Explain every concept simply. Always include a short code example. Never give full solutions without explanation.'" },
            { n: '3', title: 'Add knowledge base (optional)', body: 'Upload PDFs or documents that the assistant will use to answer questions. Turn your lecture notes into a study bot — upload the PDF and the assistant answers questions from your actual material.' },
            { n: '4', title: 'Share the link', body: 'Click Create. You get a public link immediately. Share with classmates. Build a study group bot, a project FAQ bot, or a coding helper for your team — all free, no backend needed.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="HuggingChat vs ChatGPT vs Claude" color={color} />
          <Compare color={color} items={[
            { label: 'HuggingChat', badge: 'Best: free + open-source + variety', body: '115+ models, all tools free, no account needed, full open-source transparency. If you hit rate limits on one model, switch to another. Best for: students who want full power at zero cost, developers who want to compare open-source models, anyone who values transparency and privacy.' },
            { label: 'ChatGPT', badge: 'Best: conversation depth + DALL-E + Code Interp', body: 'Deeper, more consistent conversational quality on complex creative tasks. Better custom GPT ecosystem. Code Interpreter for data analysis is more polished. Free tier is GPT-5.5 which is weaker than HuggingChat\'s Llama 3.3 70B. $20/month for Plus.' },
            { label: 'Claude', badge: 'Best: long documents + reasoning + safe outputs', body: '200K token context (vs HuggingChat\'s 128K max). Superior at long-document analysis, nuanced reasoning, and safe/careful outputs. No native image gen. Free tier has daily limits. $20/month for Pro.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Access 115+ of the world\'s best open-source models — Llama, Qwen, DeepSeek, Mistral — completely free',
            'Use web search, image generation, Python execution, and document parsing without any subscription',
            'Build a custom study assistant with your own system prompt and knowledge base in under 5 minutes',
            'Compare how different models answer the same question to understand model strengths',
            'Run smaller models entirely in-browser (WebLLM) with no data sent to any server',
        ]} />
      </Block>
        <ProjectTask
        title={"Build a Study Assistant"}
        description={"Create a HuggingChat Assistant for a subject you are currently studying. Write a system prompt that makes it a tutor for that subject: what it knows, how it explains, what style to use. Upload your lecture notes or a PDF as the knowledge base. Share the link with one classmate. Ask it 10 questions from your syllabus. How accurate is it? Where does it fail? What would you add to the system prompt to improve it? This is practical AI product building — free, in 20 minutes."}
        costNote={"TOTAL COST: ₹0 — HuggingChat is 100% free, no credit card, no subscription"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Create a free Hugging Face account', body: 'huggingface.co → Sign Up. Takes 30 seconds. Email only, no credit card. This unlocks Assistants creation and conversation history.' },
            { n: '2', title: 'Write your system prompt carefully', body: 'Think about what the perfect tutor for your subject would know and how they would teach. Include: subject area, level (beginner/intermediate), preferred explanation style, any restrictions (always cite sources, never give direct homework answers, always check understanding). 3-5 sentences is enough.' },
            { n: '3', title: 'Upload your study material', body: 'Find a PDF of your lecture notes, textbook chapter, or course material. Upload it as the knowledge base. The assistant will answer from your actual content — not generic internet knowledge.' },
            { n: '4', title: 'Test with real exam-style questions', body: 'Ask 10 questions you might see on an exam. Note: which did it answer correctly? Which did it miss? Where did it contradict your notes? Each failure is a chance to improve the system prompt or the knowledge base.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Use HuggingChat's model switching strategically. Start a conversation with Llama 3.3 70B (fast, reliable). If you get an unsatisfying answer on a hard reasoning problem, switch to Qwen3 235B or DeepSeek R1 for the same question without starting a new conversation. Different models have different strengths — the ability to switch is HuggingChat's biggest advantage over single-model platforms.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/chatbots/youcom', label: 'You.com' }}
        next={{ path: '/ai-lab/builders/bolt-new', label: 'Bolt.new' }}
      />
    </ToolPageShell>
  )
}

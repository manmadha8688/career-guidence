import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#4D6BFE'

export default function DeepSeekPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Chatbots">
      <ToolHeader
        icon="🐋"
        title="DeepSeek — Frontier AI That Stays Free"
        tagline="Open-weight reasoning models, a free web chat, and the cheapest serious API around"
        badges={[['✓ FREE CHAT', '#4ADE80'], ['Open Weights (MIT)', color], ['chat.deepseek.com', 'var(--text-muted)']]}
        overview={"DeepSeek is a Chinese AI lab that shook the industry by releasing genuinely frontier-grade models — and then giving them away. Its chat interface at chat.deepseek.com is completely free with no paid consumer tier, no message-count paywall, and generous daily limits. What made DeepSeek famous is DeepSeek-R1, an open reasoning model that 'thinks out loud' through hard maths, logic, and coding problems at a level once reserved for the most expensive closed models — released under the permissive MIT license so anyone can download, self-host, and even build competing products on it. DeepSeek-V3 is the fast, general-purpose workhorse behind everyday chat, and the newer V4 series (V4-Flash and V4-Pro) continues the line with a huge context window. For Indian students, the combination matters: a free, capable assistant in the browser, plus an API so cheap (a fraction of a rupee per typical request) that you can actually afford to build real projects on it."}
      />

      <Block title="Watch first" titleColor="#EF4444">
        {[
          { label: 'DeepSeek full beginner tutorial — free web chat walkthrough', url: 'https://www.youtube.com/results?search_query=deepseek+tutorial+for+beginners', dur: '', note: 'Search results — pick a recent, high-view walkthrough of the free chat interface' },
          { label: 'DeepSeek R1 reasoning model explained', url: 'https://www.youtube.com/results?search_query=deepseek+r1+reasoning+model+explained', dur: '', note: 'Understand how the chain-of-thought "thinking" mode actually works' },
          { label: 'DeepSeek API — how cheap it really is (setup guide)', url: 'https://www.youtube.com/results?search_query=deepseek+api+setup+tutorial+cheap', dur: '', note: 'For building projects — getting an API key and making your first call' },
        ].map((v, i) => <VideoCard key={i} v={v} />)}
      </Block>

      <Block>
        <SubHead label="How DeepSeek is different — open, cheap, and reasoning-first" color={color} />
        <InfoBox color={color}>{"DeepSeek's defining choice is openness. While OpenAI, Anthropic, and Google keep their best models locked behind APIs, DeepSeek publishes its model weights under the MIT license — the same license as most free software. That means the exact model can be downloaded from Hugging Face, run on your own hardware, fine-tuned, and used commercially with no royalties. Combined with a free web chat and an API priced 5–10x below Western rivals, DeepSeek is the most accessible frontier-grade AI for a student on a budget."}</InfoBox>
        <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Most chatbots hide their intelligence behind a subscription. DeepSeek inverts this: the smart model is free to chat with, free to download, and nearly free to call programmatically. The other thing that sets it apart is reasoning. DeepSeek-R1 popularised the idea of an open model that shows its full "thinking" — a visible chain of thought where the model works through a problem step by step before answering. For maths, logic puzzles, and multi-step coding, watching that reasoning unfold is not just impressive, it is genuinely useful for learning how to break a problem down yourself.</p>
        {[
          'Free web chat at chat.deepseek.com — no paid tier, no per-message paywall, generous daily limits',
          'Open weights (MIT license) — download DeepSeek-V3 / R1 from Hugging Face and self-host or fine-tune',
          'Visible reasoning — R1 and the "thinking" mode show a full chain of thought for hard problems',
          'Built-in web search inside the chat — ask about current topics and it looks them up',
          'Extremely cheap API — a fraction of the cost of GPT or Claude, OpenAI-compatible so existing code works',
          'File uploads and long conversations — drop in a PDF or code file and ask questions about it',
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
          { name: 'DeepSeek-R1 (Reasoning)', desc: 'An open reasoning model that thinks step by step before answering. Toggle the "thinking" / DeepThink mode in the chat to see the full chain of thought — excellent for maths, competitive programming, and logic-heavy questions.' },
          { name: 'DeepSeek-V3 / V4 (Chat)', desc: 'The fast general-purpose model behind everyday conversation — writing, explanations, and coding. The newer V4-Flash and V4-Pro extend the line with a very large context window and both thinking and non-thinking modes.' },
          { name: 'Free Web Search', desc: 'Turn on search in the chat and DeepSeek pulls in live web results before answering, with sources. Useful when you need something more current than the model\'s training cutoff.' },
          { name: 'Open Weights (MIT)', desc: 'The model weights are published on Hugging Face under the MIT license. You can download, self-host, fine-tune, and use them commercially with no restrictions — rare for a model this capable.' },
          { name: 'Ultra-Cheap API', desc: 'An OpenAI-compatible API priced far below Western labs — roughly $0.14–$0.55 per million input tokens depending on model. Ideal for building student projects without a scary bill.' },
          { name: 'File & Document Q&A', desc: 'Upload PDFs, code files, or notes and ask questions about them directly in the free chat. Good for summarising lecture notes or understanding an unfamiliar codebase.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Getting started — free chat in 3 minutes" color={color} />
        <Steps color={color} items={[
          { n: '1', title: 'Open the free chat', body: 'Go to chat.deepseek.com in any browser (or install the mobile app). Sign in with an email or Google account. There is no credit card and no paid tier to worry about — the chat is free.' },
          { n: '2', title: 'Try normal chat first', body: 'Ask something everyday — "Explain time complexity with a simple example" or "Draft a cover letter for a backend internship." This uses the fast V3/V4 chat model and answers immediately.' },
          { n: '3', title: 'Turn on DeepThink for hard problems', body: 'For maths, logic, or tricky code, enable the DeepThink / R1 reasoning toggle. The model will show its step-by-step thinking before the final answer. Read the reasoning — it teaches you the approach, not just the result.' },
          { n: '4', title: 'Enable web search for current info', body: 'For anything time-sensitive, switch on the Search option. DeepSeek fetches live results and cites sources, so you get up-to-date answers instead of stale training data.' },
          { n: '5', title: 'Upload a file to analyse', body: 'Click the attach icon and drop in a PDF, a code file, or your notes. Then ask questions: "Summarise this in 5 bullets" or "Find the bug in this function." No paid plan required.' },
          { n: '6', title: '(Optional) Grab an API key to build', body: 'For projects, sign up at platform.deepseek.com, top up a small balance, and use the OpenAI-compatible endpoint. Because it is so cheap, a full class project often costs only a few rupees.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Which DeepSeek model when?" color={color} />
        <Compare color={color} items={[
          { label: 'DeepSeek-V3 / V4 (Chat)', badge: 'Everyday default', body: 'Fast and general-purpose. Best for writing, explanations, summarising, and straightforward coding. This is what the free chat uses by default and it is fast enough for real-time back-and-forth.' },
          { label: 'DeepSeek-R1 / DeepThink (Reasoning)', badge: 'Hard problems', body: 'Switch to this for maths, logic, competitive programming, and multi-step problems. It thinks visibly before answering — slower, but far more reliable on anything that needs real reasoning. Read the chain of thought to learn.' },
          { label: 'Self-hosted open weights', badge: 'Free & private — needs GPUs', body: 'Download the weights from Hugging Face and run them yourself for total privacy and unlimited use. The full models need serious GPU hardware, but smaller distilled versions run on more modest machines. Zero API cost.' },
          { label: 'API (V4-Flash / V4-Pro)', badge: 'For building projects', body: 'The paid API is astonishingly cheap — roughly $0.14 input / $0.28 output per million tokens for V4-Flash. OpenAI-compatible, so most tutorials and libraries work by just changing the base URL and key.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="DeepSeek vs ChatGPT (free) — what's the honest difference?" color={color} />
        <Compare color={color} items={[
          { label: 'Cost & limits', badge: 'DeepSeek is more generous', body: 'DeepSeek chat is fully free with generous limits and no paid consumer tier. ChatGPT\'s free tier runs a strong model but with tighter message caps before it drops to a smaller model. For heavy free use, DeepSeek rarely gets in your way.' },
          { label: 'Reasoning transparency', badge: 'DeepSeek shows its work', body: 'DeepSeek-R1 exposes a full visible chain of thought. ChatGPT\'s reasoning models mostly hide their thinking. For learning how to solve a problem — not just getting the answer — DeepSeek\'s visible reasoning is a real teaching aid.' },
          { label: 'Openness', badge: 'DeepSeek is open weights', body: 'DeepSeek publishes model weights under MIT — you can run it yourself, forever, offline. ChatGPT\'s models are closed and API-only. If you care about privacy, control, or building on the raw model, DeepSeek wins.' },
          { label: 'Ecosystem & polish', badge: 'ChatGPT is broader', body: 'ChatGPT has voice, image generation, Custom GPTs, a huge plugin ecosystem, and deeper integrations. DeepSeek is more focused: excellent text, reasoning, and coding, but fewer bells and whistles. Use ChatGPT for range, DeepSeek for cost, reasoning, and openness.' },
          { label: 'Data & privacy', badge: 'Read the policy', body: 'DeepSeek is operated from China and processes your chats on its servers; review its policy and avoid pasting sensitive personal or proprietary data into any free chatbot. For private work, self-hosting the open weights is the safest option.' },
        ]} />
      </Block>

      <div className="tool-layout-task">
        <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Solve a Hard Problem Two Ways</span></div>
        <p className="tool-layout-task__desc">Use DeepSeek to compare fast answering vs deep reasoning on the same problem, then build a tiny project on the cheap API. This teaches you when reasoning mode is worth the wait and how to actually call an LLM in code — the single most useful skill for AI-era students.</p>
        <Steps color={color} items={[
          { n: '1', title: 'Pick a genuinely hard problem', body: 'Choose something with a clear right answer — a dynamic programming question, a probability problem, or a tricky SQL query. Write it down precisely so you can ask it the same way twice.' },
          { n: '2', title: 'Ask in normal chat mode', body: 'Open chat.deepseek.com, keep DeepThink off, and ask your problem. Note the answer and how confident it sounds. Fast models sometimes get hard problems subtly wrong.' },
          { n: '3', title: 'Ask again with DeepThink / R1 on', body: 'Enable the reasoning toggle and ask the exact same question. Read the full chain of thought. Compare: did the reasoning model reach a different (or better-justified) answer? What steps did it show that you missed?' },
          { n: '4', title: 'Get a free API key', body: 'Sign up at platform.deepseek.com and add a tiny balance (even a dollar goes a very long way at these prices). Copy your API key — treat it like a password, never commit it to Git.' },
          { n: '5', title: 'Make your first API call', body: 'Using Python and the openai library, point base_url at https://api.deepseek.com and set your key. Send your problem as a chat message and print the response. You just built an AI app — for a few paise.' },
          { n: '6', title: 'Wrap it in a mini tool', body: 'Turn the script into a small CLI or web form: paste a question, get an answer. Add the reasoning model as an option. Note the exact cost from your usage dashboard — it will surprise you how little you spent.' },
        ]} />
        <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — the web chat costs ₹0; the API is so cheap a full student project typically costs only a few rupees</span></div>
      </div>

      <ProTip>
        {"Use DeepSeek-R1's visible reasoning as a study tool, not just an answer machine. When you get a hard problem wrong, ask R1 to solve it with DeepThink on and read every step of its chain of thought. You will often spot the exact point where your own approach diverged. Then close the tab and re-solve the problem yourself from memory. The visible reasoning turns DeepSeek into a patient tutor that shows its work — which is worth far more than a bare answer you can't reproduce in an exam."}
      </ProTip>

      <PageNavRow
        prev={{ path: '/ai-lab/chatbots/huggingchat', label: 'HuggingChat' }}
        next={{ path: '/ai-lab/chatbots/grok', label: 'Grok' }}
      />
    </ToolPageShell>
  )
}

import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList,
  ProjectTask, ProTip, PageNavRow,
} from '../toolPageComponents'

const color = '#8B5CF6'

export default function ChatGPTPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Chatbots">
      <ToolHeader
        icon="🤖"
        title="ChatGPT — Your First AI Conversation Partner"
        tagline="OpenAI's conversational AI that changed everything"
        badges={[['✓ FREE TIER', '#4ADE80'], ['GPT-4o mini free', color], ['ChatGPT', 'var(--text-muted)']]}
        overview="ChatGPT was released in November 2022 and became the fastest product to reach 100 million users in history — two months. Before ChatGPT, AI was mostly invisible infrastructure powering search suggestions and spam filters. ChatGPT was the first AI that let anyone have a real conversation with a machine — no coding, no technical knowledge required. It demonstrated that language models could explain code, write essays, debug programs, summarize documents, and reason through problems in a way that felt genuinely useful. Whether you use ChatGPT for 5 minutes or 5 hours a day, understanding how to use it well separates people who get generic results from people who use it as a genuine thinking partner."
      />

      <Block title="Watch first" titleColor="#EF4444">
        {[
          { label: 'How to Use ChatGPT (2025) — Kevin Stratvert', url: 'https://www.youtube.com/watch?v=PDw3Uk9dN9k', dur: '~20 min', note: 'Best beginner guide — covers all features clearly' },
          { label: 'ChatGPT Complete Guide — How to Use ChatGPT', url: 'https://www.youtube.com/watch?v=AXn2XVLf7d0', dur: '22 min', note: 'All major use cases and features in one video' },
          { label: 'Prompt Engineering Full Course — freeCodeCamp', url: 'https://www.youtube.com/watch?v=_ZvnD73m40o', dur: '2 hrs', note: 'Get dramatically better results from ChatGPT' },
        ].map((v, i) => <VideoCard key={i} v={v} />)}
      </Block>

      <Block>
        <SubHead label="What ChatGPT actually is" color={color} />
        <InfoBox color={color}>ChatGPT is a chat interface on top of a large language model. The "GPT" stands for Generative Pre-trained Transformer — a neural network architecture trained on a large portion of the internet's text. The model predicts the most likely next token given everything before it. The surprising result: doing this at scale produces a system that can reason, explain, and converse.</InfoBox>
        <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>ChatGPT the product (what you use at chat.openai.com) is not the same as GPT-4 the model. ChatGPT is the interface — the website, the conversation history, the file uploads, the plugins. The GPT models are the underlying intelligence. This distinction matters because the same GPT-4o model is also accessible via API, Claude Code, and third-party apps — the model is the core, the interface is just a wrapper.</p>
      </Block>

      <Block>
        <SubHead label="Free vs paid — what you actually get" color={color} />
        <Compare color={color} items={[
          { label: 'Free tier — GPT-4o mini', badge: 'Always available', body: 'GPT-4o mini is genuinely capable for most everyday tasks: answering questions, writing drafts, explaining concepts, basic coding help. The limitation is rate limits during high traffic and no access to GPT-4o or advanced features. For learning and most student use cases, the free tier is sufficient.' },
          { label: 'ChatGPT Plus — $20/month', badge: 'Worth it for heavy use', body: 'Access to GPT-4o (significantly better reasoning), DALL-E image generation, data analysis with Code Interpreter, browsing the web, creating custom GPTs, and higher rate limits. If you find yourself hitting rate limits or need image analysis, Plus is the upgrade.' },
          { label: 'ChatGPT Team/Enterprise', badge: 'For organizations', body: 'Team workspaces, no training on your data, custom GPTs shared across team, admin controls. Only relevant if a company is providing it to you.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Core capabilities" color={color} />
        <CardGrid color={color} items={[
          { name: 'Writing & editing', desc: 'Drafts emails, reports, essays. Rewrites at different reading levels. Suggests improvements to clarity, tone, structure. Provides feedback on your writing.' },
          { name: 'Code help', desc: 'Explains any code in plain English. Writes code in 20+ languages. Debugs errors. Converts between languages. Does not replace understanding — use it to learn, not just copy.' },
          { name: 'Data analysis (Plus)', desc: 'Upload a CSV and ask questions in plain English. Generates charts. Writes and executes Python analysis code. The Code Interpreter feature is genuinely powerful for non-programmers.' },
          { name: 'Research & summarization', desc: 'Summarizes long documents. Explains complex topics at different levels. Browses the web for current information (Plus). Good for building a fast mental model of something new.' },
          { name: 'Brainstorming', desc: 'Generates lists of ideas, names, approaches. Plays devil\'s advocate. Helps think through tradeoffs. More useful than Google for \'what are my options\' type questions.' },
          { name: 'Custom GPTs', desc: 'The GPT store has thousands of specialized GPTs pre-configured for specific tasks — coding, writing, research, languages. Many are free to use even on the free tier.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="How to get dramatically better results" color={color} />
        <Steps color={color} items={[
          { n: '1', title: 'Give it a role', body: 'Start with \'You are an expert [X]\' to shift the tone and depth. \'You are a senior Python developer\' gets you more technical, precise code help than just asking about code.' },
          { n: '2', title: 'Provide context', body: 'ChatGPT has no memory of who you are. State your level, goal, and constraints in the first message: \'I am a second-year CS student who just learned about sorting algorithms. Explain merge sort in a way that builds on what I already know about bubble sort.\'' },
          { n: '3', title: 'Be specific about format', body: '\'Explain X\' gets you a wall of text. \'Explain X in 5 bullet points\' or \'Explain X with a code example\' gives you something more useful. The model follows format instructions precisely.' },
          { n: '4', title: 'Iterate, don\'t start over', body: 'If the response is not quite right, follow up: \'Make that shorter\', \'Give me a simpler explanation\', \'Now add error handling to that code\'. Each follow-up costs nothing and significantly improves results.' },
          { n: '5', title: 'Use Custom GPTs for specific tasks', body: 'Browse the GPT Store. For coding: Grimoire. For research: Scholar AI. For resume: Resume Builder. Specialized GPTs have better instructions for their domain than a generic chat session.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="What ChatGPT cannot do reliably" color="#EF4444" />
        <Compare color="#EF4444" items={[
          { label: 'Real-time information', badge: 'Free tier limitation', body: 'Training data has a cutoff. GPT-4o mini on the free tier does not browse the web. For current prices, recent news, or live data, use Perplexity or ChatGPT Plus with browsing enabled. Asking ChatGPT for recent events on the free tier gives you confidently wrong answers.' },
          { label: 'Complex multi-step math', badge: 'Known weakness', body: 'Language models predict tokens — they are not calculators. For anything beyond simple arithmetic, use Wolfram Alpha or Python via Code Interpreter. ChatGPT can make arithmetic errors while being confidently fluent about the surrounding explanation.' },
          { label: 'Factual recall on obscure topics', badge: 'Hallucination risk', body: 'ChatGPT can hallucinate specific details — paper titles, author names, dates, statistics — that sound correct but are fabricated. Always verify specific factual claims from a primary source before using them in work that matters.' },
          { label: 'Private or sensitive work', badge: 'Privacy consideration', body: 'Your conversations are used to improve the model unless you disable this in settings. Do not paste code, documents, or personal information you need to remain private into the free tier.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Practical use patterns for students" color={color} />
        <Steps color={color} items={[
          { n: '1', title: 'Debug your code', body: 'Paste the error message AND the relevant code. Do not ask \'why isn\'t my code working\' without showing the code. The more context you provide, the more specific the help.' },
          { n: '2', title: 'Explain things you don\'t understand', body: '\'Explain this concept like I\'m someone who already understands loops but has never seen recursion\' is vastly better than \'explain recursion\'. Reference your existing knowledge level.' },
          { n: '3', title: 'Review your own writing', body: 'Paste your essay draft and ask \'What is the weakest argument here?\' or \'What would someone who disagrees say?\'. Using it as an adversarial reviewer surfaces problems you missed.' },
          { n: '4', title: 'Interview preparation', body: '\'You are a technical interviewer at a software company. Ask me a series of questions about data structures and give feedback on my answers.\' Full mock interview sessions with instant feedback.' },
        ]} />
      </Block>

      <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Have meaningful, productive conversations with an AI to accelerate learning on any topic',
          'Debug code in any language by pasting errors and getting specific explanations',
          'Draft and improve written work: emails, reports, applications, cover letters',
          'Analyze uploaded data files in plain English (Plus) without writing any code',
          'Prepare for technical interviews with AI-powered mock sessions',
          'Use specialized Custom GPTs for specific domains — coding, research, language learning, math',
        ]} />
      </Block>

      <ProjectTask
        title="Build a Personal Study Bot"
        description="Configure a custom ChatGPT session for your specific learning needs. In the system prompt (or first message), define: who you are, what you are studying, your current level, and how you want explanations delivered (examples? analogies? code?). Then use it to get explanations for 5 topics you are currently studying. Compare these results to generic prompts without context. Document: which approach produced more useful responses and what context mattered most."
        costNote="TOTAL COST: ₹0 — ChatGPT free tier, no signup required for basic use"
      >
        <Steps color={color} items={[
          { n: '1', title: 'Define your context profile', body: 'Write a single message with: your year, major/goal, current topics, and preferred explanation style. Keep it under 150 words.' },
          { n: '2', title: 'Test with 5 topic questions', body: 'Ask about 5 real concepts you\'re currently studying. Use your context profile each time. Note which responses surprised you with their depth or usefulness.' },
          { n: '3', title: 'Compare without context', body: 'Open a fresh chat (no context). Ask the same 5 questions plainly. Compare response quality.' },
          { n: '4', title: 'Identify what worked', body: 'Which context details produced the biggest improvement? That pattern becomes your personal ChatGPT starting template for future study sessions.' },
        ]} />
      </ProjectTask>

      <ProTip>
        The most common mistake beginners make with ChatGPT is treating it like a search engine — one question, done. ChatGPT is a conversation. The first response is almost never the final one. Follow up, push back, ask for more depth, request a different format. The value compounds across a conversation the way it does not in a one-shot search query.
      </ProTip>

      <PageNavRow
        prev={{ path: '/ai-lab/foundations/embeddings', label: 'Embeddings' }}
        next={{ path: '/ai-lab/chatbots/claude', label: 'Claude' }}
      />
    </ToolPageShell>
  )
}

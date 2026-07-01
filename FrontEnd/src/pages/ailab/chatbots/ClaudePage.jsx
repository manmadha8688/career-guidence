import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#8B5CF6'

export default function ClaudePage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Chatbots">
      <ToolHeader
        icon="🧠"
        title="Claude — The AI That Thinks Before It Speaks"
        tagline="Anthropic's thoughtful, safety-focused AI assistant"
        badges={[['✓ FREE TIER', '#4ADE80'], ['claude.ai free', color], ['Anthropic', 'var(--text-muted)']]}
        overview={"Claude is Anthropic's AI assistant, built with a different philosophy than ChatGPT. While OpenAI optimized for capability, Anthropic built Claude with constitutional AI training — a method designed to make the model genuinely helpful, harmless, and honest rather than just impressive. In practice this means Claude is exceptionally good at nuanced reasoning, handling ambiguous instructions, writing long-form content, and admitting uncertainty rather than hallucinating. For students doing deep work — understanding complex topics, writing thoughtful essays, analyzing code architecture — Claude often outperforms ChatGPT on tasks requiring sustained reasoning over long contexts. Claude Sonnet 5 is currently the free default on claude.ai and is one of the best models available at any price point."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Full Claude Tutorial: Beginner to Advanced in 19 Minutes', url: 'https://www.youtube.com/watch?v=WSPChlfxJyA', dur: '19 min', note: 'Best quick start — covers everything you need to know' },
            { label: 'Full Claude Tutorial for Beginners — Become A Pro in 30 Minutes', url: 'https://www.youtube.com/watch?v=iLyDaoqO784', dur: '30 min', note: 'Deeper walkthrough with all features including Projects' },
            { label: '36 Claude Tips for Beginners in 2024', url: 'https://www.youtube.com/watch?v=vPpb_0Ie-QU', dur: '~20 min', note: 'Practical tips to get dramatically better results from Claude' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What makes Claude different" color={color} />
          <InfoBox color={color}>Claude was trained using Constitutional AI — a method where the model is given a set of principles and trained to critique and revise its own outputs against those principles. The result is a model that reasons about its responses, not just predicts tokens. It tends to be more honest about what it doesn't know and more careful about potentially harmful outputs.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The most practically useful difference is Claude's context window. Claude Sonnet 5 handles up to 1,000,000 tokens — roughly 750,000 words — in a single conversation. This means you can paste an entire codebase, a full research paper, a legal document, or a whole book and have a real conversation about all of it at once. Many chat models still offer far smaller context windows by comparison.</p>
        </Block>
        <Block>
          <SubHead label="Claude model lineup" color={color} />
          <Compare color={color} items={[
            { label: 'Claude Haiku 4.5', badge: 'Fastest', body: 'Smallest and fastest model with near-frontier intelligence. Best for: simple questions, high-volume API use, quick lookups. Great value when speed and cost matter more than maximum reasoning depth.' },
            { label: 'Claude Sonnet 5', badge: 'Best overall — free & default on claude.ai', body: 'The sweet spot model — frontier-level reasoning, coding, and agentic work at fast speeds, with a 1M-token context. This is the default free model on claude.ai and what most people should use. It closes much of the gap to the Opus flagship at a fraction of the cost.' },
            { label: 'Claude Opus 4.8', badge: 'Most powerful', body: 'Anthropic\'s most capable model for the hardest reasoning, long-horizon agentic coding, and high-autonomy work. Available on paid plans and via the API. Slower and pricier, but top quality for the most demanding tasks.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Where Claude genuinely excels" color={color} />
          <CardGrid color={color} items={[
            { name: 'Long document analysis', desc: 'Paste an entire PDF, codebase, or lengthy report. Ask questions about any section. Claude maintains coherent understanding across the full 200K context — it doesn\'t lose track of earlier content.' },
            { name: 'Nuanced writing', desc: 'Claude writes with more natural voice than most models. It follows stylistic instructions precisely, maintains tone consistency across long documents, and produces less generic-sounding output.' },
            { name: 'Code review & architecture', desc: 'Paste an entire project and ask for architectural feedback. Claude reasons about code structure, identifies patterns, suggests improvements — not just surface-level syntax fixes.' },
            { name: 'Honest uncertainty', desc: 'Claude explicitly says \'I\'m not sure about this\' rather than fabricating a confident answer. For learning purposes, a model that admits gaps is more trustworthy than one that never shows doubt.' },
            { name: 'Following complex instructions', desc: '\'Write a summary that is under 200 words, uses no jargon, ends with a question, and avoids the word important\' — Claude follows all constraints without dropping any.' },
            { name: 'Summarization at scale', desc: 'Summarizing books, research papers, legal documents, or long codebases in a single conversation. The long context means it reads the whole thing rather than a fragment.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="How to use Claude effectively" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Upload documents directly', body: 'claude.ai supports file uploads — PDFs, Word docs, code files, text files. Upload your study material and have a conversation about it rather than copy-pasting.' },
            { n: '2', title: 'Use Projects for persistent context', body: 'Claude Projects let you store instructions and documents that persist across conversations. Create a project for each subject you\'re studying and add your notes and syllabus — Claude remembers your context every session.' },
            { n: '3', title: 'Ask for reasoning, not just answers', body: 'Add \'explain your reasoning step by step\' or \'think through this before answering\'. Claude\'s extended thinking produces noticeably more accurate answers on complex problems.' },
            { n: '4', title: 'Request multiple approaches', body: '\'Give me three different ways to approach this problem, with tradeoffs for each\' gets you more useful output than asking for a single answer. Claude excels at structured comparison.' },
            { n: '5', title: 'Iterate on tone and format', body: 'Claude follows format instructions very precisely. \'Rewrite this more concisely\', \'make this more formal\', \'format this as a table\' all work reliably. Combine format + content instructions in one request.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Claude vs ChatGPT — practical differences" color={color} />
          <Compare color={color} items={[
            { label: 'Context window', badge: 'Claude wins', body: 'Claude Sonnet 5: up to 1M tokens. Most ChatGPT tiers land around 128K–256K. For pasting large documents or whole codebases in one go, Claude still handles significantly more at once — often the biggest practical difference.' },
            { label: 'Coding tasks', badge: 'Very close', body: 'Claude Sonnet 5 and the latest GPT-5.5 both perform strongly on coding. Claude tends to write clean code with careful explanations and shines in agentic, multi-file work (Claude Code). ChatGPT has its Codex agent and data-analysis code execution built in.' },
            { label: 'Web browsing', badge: 'Roughly equal now', body: 'Both Claude and ChatGPT can search the web for current information today. For dedicated, citation-heavy research, a purpose-built tool like Perplexity is still often the cleanest.' },
            { label: 'Free tier quality', badge: 'Both strong', body: 'Claude\'s free tier gives you Claude Sonnet 5; ChatGPT\'s free tier gives you GPT-5.5 Instant (with tighter limits). Both are excellent now — pick based on context size (Claude) vs built-in tools like image/data analysis (ChatGPT).' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Paste entire codebases and get architectural feedback that considers the full project context',
            'Analyze full research papers, legal documents, or books in a single conversation without losing context',
            'Write long-form content — essays, reports, proposals — with consistent tone and precise format control',
            'Use Claude Projects to maintain persistent context across all your study sessions for a subject',
            'Get reliable step-by-step reasoning for complex problems with honest uncertainty when Claude doesn\'t know',
        ]} />
      </Block>
        <ProjectTask
        title={"Long Context Challenge"}
        description={"Test what Claude's 1M-token context can do. Find a long document: a textbook chapter, a research paper PDF, a large codebase you're working on, or a lengthy article. Upload it to claude.ai. Ask 10 questions that require understanding content from different parts of the document. Then try the same with another chatbot's free tier on the same document. Note where each model loses context, gives wrong answers, or handles the full document well. This will show you the real-world value of context window size."}
        costNote={"TOTAL COST: ₹0 — Claude free tier on claude.ai, no payment required"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Find a large document', body: 'Aim for something 20-50 pages or a codebase with several files. Research papers, textbook PDFs, or a project you\'re working on all work well.' },
            { n: '2', title: 'Upload to Claude', body: 'Go to claude.ai → New conversation → paperclip icon to attach file. Upload the document.' },
            { n: '3', title: 'Ask cross-document questions', body: 'Ask questions that specifically require information from different sections: \'What is the connection between the concept introduced in section 2 and the example used in section 5?\'' },
            { n: '4', title: 'Compare with ChatGPT', body: 'Paste the same document into ChatGPT (free). Ask the same questions. Notice where it says the document is too long, loses context, or gives answers that contradict the actual content.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Claude's Projects feature is underused by students. Create one project per subject. Add your syllabus, your own notes, and any reference documents. Now every conversation in that project starts with Claude already knowing your context, your level, and your specific material. This is dramatically more effective than starting fresh every time.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/chatbots/chatgpt', label: 'ChatGPT' }}
        next={{ path: '/ai-lab/chatbots/gemini', label: 'Gemini' }}
      />
    </ToolPageShell>
  )
}

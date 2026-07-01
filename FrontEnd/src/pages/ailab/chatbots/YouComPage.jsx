import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#6366F1'

export default function YouComPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Chatbots">
      <ToolHeader
        icon="🌐"
        title="You.com — AI Search That Cites Every Source"
        tagline="Research, write, and code with multiple AI models in one privacy-first platform"
        badges={[['✓ FREE TIER', '#4ADE80'], ['you.com', color], ['Multi-model AI', 'var(--text-muted)']]}
        overview={"You.com is an AI-powered search engine and productivity platform that combines real-time web search with conversational AI. Founded in 2020 by Richard Socher (former Chief Scientist at Salesforce), it is built around one idea: instead of giving you ten links, it reads multiple sources, synthesizes the answer, and shows you numbered citations you can verify. The difference from Perplexity: You.com is a full platform — it also gives you access to leading models like GPT-5.5, Claude, Gemini, and Llama in one place, plus AI writing tools and image generation. Students on a tight budget get significant value from the free tier, and the YouPro Education plan at $6.99/month (with a school email) unlocks everything including all premium models."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'How To Use You.com (2025) - AI Productivity', url: 'https://www.youtube.com/watch?v=b7-WSLwZTjw', dur: '~10 min', note: 'Best 2025 overview' },
            { label: 'You.com Tutorial - The Next Google Search Killer is Here!', url: 'https://www.youtube.com/watch?v=bqvWwadYbvo', dur: '', note: 'Complete feature walkthrough' },
            { label: "You Won't Believe What This AI Search Engine Can Do! (You.com)", url: 'https://www.youtube.com/watch?v=tJ8G6kuAf8k', dur: '', note: 'Practical use cases demo' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Four AI modes" color={color} />
          <InfoBox color={color}>You.com's key feature is its four AI modes — each suited for a different type of task. Choosing the right mode before you ask your question significantly improves the quality of the answer.</InfoBox>
          <Compare color={color} items={[
            { label: 'Smart Mode', badge: 'Default — everyday use', body: 'Quick, accurate answers with live web access and citations. Handles the majority of questions: topic explanations, quick facts, comparisons, news. Fastest response time. Use this 80% of the time.' },
            { label: 'Research Mode', badge: 'Deep multi-source analysis', body: 'Searches many sources, synthesizes them into a comprehensive cited answer. Best for: writing essays, literature reviews, fact-checking claims, understanding a complex topic from multiple angles. Slower but thorough.' },
            { label: 'Genius Mode', badge: 'Complex reasoning (Pro)', body: 'Multi-step reasoning, code generation, data visualization, and file analysis. Equivalent to asking a capable analyst with a PhD. Best for: hard programming problems, data interpretation, multi-step research questions.' },
            { label: 'Create Mode', badge: 'Image generation', body: 'AI image generation in multiple styles. Free: 10 images/day. Pro: unlimited. Built-in, no separate tool needed.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Multi-model access" color={color} />
          <CardGrid color={color} items={[
            { name: 'GPT-5.5', desc: "OpenAI's flagship — strong across all tasks. Available on You.com Pro without paying OpenAI separately." },
            { name: 'Claude Sonnet 5', desc: "Anthropic's fast frontier model — excellent for long documents (1M context), code review, and nuanced analysis." },
            { name: 'Gemini 3.1 Pro', desc: "Google's flagship — huge context window, strong on multimodal tasks and factual questions." },
            { name: 'Llama 3 (Meta)', desc: 'Open-source model — available free on You.com. Strong for general tasks without API cost.' },
            { name: 'YouChat (native)', desc: "You.com's own model with real-time web access. Fast, cited, and always current. Default for Smart Mode." },
            { name: 'Switch per conversation', desc: 'Change model mid-session. Compare how different models handle the same prompt without switching tabs or platforms.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="You.com vs Perplexity vs ChatGPT" color={color} />
          <Compare color={color} items={[
            { label: 'You.com', badge: 'Best for: research + multi-model + writing', body: 'One platform for search, multiple AI models, writing tools, and image generation. Strong citations. Privacy-first (no tracking, no ads). Education plan at $6.99/month unlocks everything. Best when you want a complete AI workspace without multiple subscriptions.' },
            { label: 'Perplexity AI', badge: 'Best for: pure research citations', body: 'Sharper, cleaner research interface. Better citation UI, Focus modes (Academic, Reddit, YouTube). Faster for getting a quick cited answer on a specific question. Less feature breadth than You.com.' },
            { label: 'ChatGPT', badge: 'Best for: deep conversation + creativity', body: 'Better for long-form creative writing, roleplay, complex multi-turn conversations, and Code Interpreter (data analysis). More powerful customization (Custom GPTs). Higher quality on tasks where web search is not needed.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="For students specifically" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Research Mode for essays and papers', body: 'Use Research Mode when writing academic content. It synthesizes multiple sources and provides numbered citations. Paste the citations into your notes, verify each one, and you have a properly sourced starting point — faster than manually reading 10 articles.' },
            { n: '2', title: 'Genius Mode for coding problems', body: 'For complex programming problems that require multi-step thinking: use Genius Mode with Claude or GPT-5.5. It can run through the logic, generate code, explain it step by step, and help you debug — all in one conversation.' },
            { n: '3', title: 'YouPro Education plan — $6.99/month', body: 'If you have a school email (.edu or college domain): check you.com/support for the Education plan. Full access to all premium models (GPT-5.5, Claude, Gemini) for $6.99/month — more than 50% off regular pricing. Worth it if you use AI tools daily.' },
            { n: '4', title: 'Private mode for sensitive research', body: 'You.com does not track your queries or sell your data. For research on sensitive personal or academic topics, this matters. Private mode stores no query history.' },
            { n: '5', title: 'Source control for targeted research', body: 'Constrain searches to specific domains — academic sites only, specific news outlets, official documentation. This narrows results to authoritative sources and reduces the chance of picking up misinformation from low-quality sites.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Research any topic with multi-source cited answers — without manually checking 10 browser tabs',
            'Access GPT-5.5, Claude Sonnet 5, and Gemini 3.1 Pro in one place without separate subscriptions',
            'Use Research Mode to generate properly cited source lists as starting points for essays and papers',
            'Generate AI images for presentations and projects without leaving the platform',
            'Get the full platform at student pricing ($6.99/month with school email) vs. paying separately for multiple AI tools',
        ]} />
      </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span>
            <span className="tool-layout-task__label">PROJECT — Compare AI Modes on Your Next Assignment</span>
          </div>
          <p className="tool-layout-task__desc">Take a real assignment or research question you currently have. Run it through all four You.com modes: Smart, Research, Genius (if Pro), and see how the answers differ. Then take the Research Mode answer and verify 3 of the citations — open each source and confirm the claim is actually in the article. This teaches both how to use You.com effectively and why citation verification matters regardless of which AI tool you use.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Pick a real question from your coursework', body: 'Not a test question — a real topic you need to understand or write about. Generic questions produce generic insights. Your actual coursework question will show you where You.com adds genuine value vs. a basic Google search.' },
            { n: '2', title: 'Run Smart Mode first', body: 'Start with Smart Mode. Read the answer. How complete is it? Are the citations credible? Note what it got right and what felt incomplete.' },
            { n: '3', title: 'Run Research Mode on the same question', body: 'Switch to Research Mode. Same question. Compare: is the answer longer? More citations? Different sources? Does it cover aspects Smart Mode missed? Research Mode should produce a significantly more comprehensive answer.' },
            { n: '4', title: 'Verify 3 citations', body: 'Click on 3 of the numbered citations. Does the source actually say what You.com attributed to it? Is the source credible (academic, established publication, official site)? This verification habit applies to every AI tool — not just You.com.' },
          ]} />
        </div>
        <ProTip>
        You.com's Research Mode is most powerful when you give it a specific, focused question rather than a broad topic. "What are the main causes of the 2008 financial crisis?" will produce a better cited answer than "tell me about the 2008 financial crisis." Specific questions produce specific, verifiable citations. Broad questions produce broad, harder-to-verify summaries.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/chatbots/notebooklm', label: 'NotebookLM' }}
        next={{ path: '/ai-lab/chatbots/huggingchat', label: 'HuggingChat' }}
      />
    </ToolPageShell>
  )
}

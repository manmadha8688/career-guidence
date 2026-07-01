import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#8B5CF6'

export default function GeminiPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Chatbots">
      <ToolHeader
        icon="✨"
        title="Gemini — Google's AI with Real-Time Knowledge"
        tagline="Search-integrated AI that knows what happened yesterday"
        badges={[['✓ FREE', '#4ADE80'], ['Gemini 3.5 Flash free', color], ['Google', 'var(--text-muted)']]}
        overview={"Gemini is Google's answer to ChatGPT, and its biggest advantage is obvious: Google built the world's most powerful search engine before building this AI. Gemini has real-time access to the web, can search Google, and pulls in current information by default. When someone asks about a news event from last week, a newly released package version, or today's job market — Gemini answers from live search results, not from training data that's months old. It also integrates deeply with Google's ecosystem: Gmail, Drive, Docs, Sheets, Slides. If you already live in Google's tools, Gemini is the AI that works with your actual files. For students, Gemini's web grounding and Google Workspace integration make it uniquely useful for research and document work."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Google Gemini: PRO Tutorial for Beginners (2025) — Kevin Stratvert', url: 'https://www.youtube.com/watch?v=8aRJYpExTfs', dur: '~20 min', note: 'Best beginner guide — covers all Gemini features clearly' },
            { label: 'Gemini Advanced vs ChatGPT Plus — Full Comparison', url: 'https://www.youtube.com/watch?v=90LIZdFLh9U', dur: '12 min', note: 'Honest side-by-side comparison of both tools' },
            { label: 'Gemini in Google Workspace — Docs, Gmail, Sheets', url: 'https://www.youtube.com/watch?v=3DHEzWNKgik', dur: '10 min', note: "How to use Gemini inside Google's tools" },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What sets Gemini apart" color={color} />
          <InfoBox color={color}>Gemini's core differentiator is real-time web grounding. Every response can pull from live Google Search results. This is not "browsing the web" as an optional feature — it is the default. Gemini answers questions about current events, recent releases, live prices, and breaking news accurately because it searches as it responds.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>Gemini is also natively multimodal — trained simultaneously on text, images, audio, and video, not retrofitted for vision after the fact. You can upload images and have genuine visual analysis, upload PDFs and ask questions, or paste a YouTube URL and have Gemini analyze the video. In Google Workspace, Gemini can read your Gmail, summarize your Drive files, and draft Docs — all without you copying and pasting anything.</p>
        </Block>
        <Block>
          <SubHead label="Gemini model tiers" color={color} />
          <Compare color={color} items={[
            { label: 'Gemini 3.5 Flash', badge: 'Free default, very fast', body: "Google's fast everyday model and the default in the free Gemini app. Best for quick questions, summarization, and research. Genuinely capable for most student tasks, and the free tier also includes Deep Research, Canvas, and Gems." },
            { label: 'Gemini 3.1 Pro', badge: 'Most capable (paid / limited free)', body: "Google's flagship reasoning model with a huge context window. Handles complex reasoning, detailed analysis, and long documents. The free app gives limited access; paid Google One AI plans unlock much higher limits." },
            { label: 'Google One AI plans', badge: 'AI Plus $7.99 · AI Pro $19.99 · AI Ultra', body: 'Paid tiers add higher limits, expanded access to Gemini 3.1 Pro (and Deep Think on Ultra), more storage, and Gemini across Workspace apps (Gmail, Docs, Sheets). Worth it if you live in Google\'s tools and want AI integrated directly.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Gemini's strongest use cases" color={color} />
          <CardGrid color={color} items={[
            { name: 'Real-time research', desc: "Ask about recent tech releases, current job market trends, latest library versions, today's news. Gemini searches Google and cites sources. Far superior to ChatGPT free for anything time-sensitive." },
            { name: 'Google Workspace integration', desc: 'Gemini in Gmail summarizes email threads, drafts replies, and searches your inbox. In Docs it writes and edits. In Sheets it analyzes data. All using your actual files — no copy-paste needed.' },
            { name: 'YouTube video analysis', desc: 'Paste any YouTube URL. Ask Gemini to summarize the video, extract key points, or explain specific sections. Works because Google owns YouTube — no other AI model has this natively.' },
            { name: 'Google Drive document chat', desc: "Connect Google Drive. Ask questions about files you own. 'What was the main conclusion in the report I uploaded last month?' works without you finding and opening the file." },
            { name: 'Image and document analysis', desc: 'Upload photos of handwritten notes, whiteboards, screenshots, or diagrams. Gemini reads and analyzes visual content with strong accuracy — useful for understanding photos of textbook problems.' },
            { name: 'Multilingual capability', desc: "Strong performance in Indian languages including Hindi, Tamil, Telugu, Bengali. Google's multilingual training data is extensive. Better than most models for Indian language queries and translation." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Using Gemini for research" color={color} />
          <Steps color={color} items={[
            { n: '1', title: "Let Gemini search, don't pre-research", body: "Ask your question directly. Gemini will search Google and give you a grounded answer with citations. Check the 'Google it' sources shown below responses for verification." },
            { n: '2', title: 'Use Gemini in Google Docs', body: 'Open a Google Doc. Click the Gemini icon. Ask it to write, expand, or summarize directly in your document. Combine AI drafting with your own editing — never paste between tools.' },
            { n: '3', title: 'Analyze YouTube lectures', body: 'Find a relevant lecture on YouTube. Paste the URL into Gemini. Ask for a structured summary with key concepts. More efficient than watching 45 minutes to find the 5 minutes that matter.' },
            { n: '4', title: 'Research current tools and technologies', body: "Ask 'What is the current state of X technology? What are people saying about it in 2026?' Gemini finds recent blog posts, discussions, and documentation — not outdated training data." },
            { n: '5', title: 'Cross-reference claims', body: "When reading something important, paste the claim into Gemini and ask 'is this accurate and what does current evidence say?'. The web grounding helps verify factual claims with live sources." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Gemini vs ChatGPT vs Claude" color={color} />
          <Compare color={color} items={[
            { label: 'Real-time information', badge: 'Gemini leads', body: 'All three can search the web now, but Gemini has the deepest, default Google Search grounding with inline source citations. For fast, current answers with sources, Gemini is still the smoothest.' },
            { label: 'Google Workspace integration', badge: 'Gemini wins', body: "Gemini works directly inside Gmail, Docs, Sheets, Slides, and Drive. No other AI model integrates with Google's tools this deeply. If your study and work life is in Google's ecosystem, this is a major advantage." },
            { label: 'Pure reasoning and coding', badge: 'Very close', body: "For the hardest multi-step reasoning, agentic coding, or nuanced analysis, Claude Sonnet 5 and GPT-5.5 are top-tier — but Gemini 3.1 Pro is now firmly competitive. Gemini's standout strengths remain breadth, multimodality, and Google integration." },
            { label: 'Context window', badge: 'Gemini leads', body: 'Gemini 3.1 Pro offers around a 1 million token context window — among the largest of any major model — so it can handle entire codebases or book-length documents in one conversation.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Research any topic with live, cited web sources — not stale training data',
            'Ask about recent events, new software releases, and current job market information accurately',
            'Analyze YouTube lecture videos by pasting the URL and asking for summaries',
            'Work with Google Drive files, Gmail threads, and Google Docs using natural language',
            'Use Gemini in Indian languages for queries, translations, or multilingual content',
        ]} />
      </Block>
        <ProjectTask
        title={"Current Tech Research Report"}
        description={"Use Gemini to research a technology you want to learn this year. Ask Gemini: 'What is the current state of [technology] in 2026? What are its main use cases, who is hiring for it, and what should someone learn to get started?' Ask three follow-up questions about areas you don't understand. Then compare the same question in ChatGPT free tier. Document: which tool gave more accurate, more current, and more useful information and why."}
        costNote={"TOTAL COST: ₹0 — Gemini free tier, sign in with your Google account"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Pick your technology', body: 'Choose something relevant to your learning goals — React, Python, Django, machine learning, cloud computing. Pick something you actually plan to learn.' },
            { n: '2', title: 'Research with Gemini', body: 'Ask the broad research question. Let Gemini search and respond. Check the cited sources. Ask 3 follow-up questions based on the response.' },
            { n: '3', title: 'Compare with ChatGPT', body: 'Ask the same initial question in ChatGPT free. Compare: does it mention recent developments? Does it cite sources? Is it as current?' },
            { n: '4', title: 'Save what you learned', body: "Export or copy Gemini's response. This becomes your research document for starting to learn that technology." },
          ]} />
      </ProjectTask>
        <ProTip>
        Gemini's YouTube analysis is a hidden gem. When you find a long conference talk, tech tutorial, or lecture that looks relevant, don't watch the whole thing first. Paste the URL into Gemini and ask 'What are the 5 most important points in this video and at what timestamps?' This saves hours of research time by letting you jump directly to the relevant parts.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/chatbots/claude', label: 'Claude' }}
        next={{ path: '/ai-lab/chatbots/perplexity', label: 'Perplexity' }}
      />
    </ToolPageShell>
  )
}

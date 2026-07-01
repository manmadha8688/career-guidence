import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#8B5CF6'

export default function MsCopilotPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Chatbots">
      <ToolHeader
        icon="🪟"
        title="Microsoft Copilot — GPT-5.5 Free With Web Search and Image Generation"
        tagline="Microsoft's AI assistant built into Windows, Edge, and your browser"
        badges={[['✓ FREE', '#4ADE80'], ['copilot.microsoft.com', color], ['Microsoft + OpenAI', 'var(--text-muted)']]}
        overview={"Microsoft Copilot is Microsoft's free AI assistant powered by GPT-5.5 — available at copilot.microsoft.com, built into Windows 11, and embedded in the Edge browser sidebar. Its biggest advantage over ChatGPT's free tier: web search is always on by default (no plugins needed) and you get free DALL-E 3 image generation with 15 boosts per day. If you use Windows 11, Copilot requires no separate signup — it is already there. For students working in Microsoft's ecosystem (Word, PowerPoint, Excel, Outlook), Copilot Pro unlocks AI assistance directly inside those applications. Free users get the same GPT-5.5 quality as ChatGPT Plus during non-peak hours, plus capabilities that require a paid ChatGPT subscription."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: "Microsoft Copilot Tutorial - A Beginner's Introduction to Copilot (2025)", url: 'https://www.youtube.com/watch?v=lGwjvaAFjzk', dur: 'Beginner 2025', note: 'Best starting point — covers the full Copilot experience from scratch' },
            { label: 'Microsoft Copilot Full Course For Beginners [2025]', url: 'https://www.youtube.com/watch?v=bBqTdOkso2Y', dur: 'Full course', note: 'Comprehensive walkthrough of every major feature in one video' },
            { label: 'How To Get Started with Microsoft Copilot in 2025', url: 'https://www.youtube.com/watch?v=ivlxzSgodvs', dur: 'Getting started', note: 'Practical setup guide — good for first-time users' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What makes Copilot different from ChatGPT" color={color} />
          <InfoBox color={color}>Copilot's three differentiators over ChatGPT free: (1) Web search is always active — answers cite live sources by default, not training data alone. (2) Free image generation — DALL-E 3 produces 15 images per day without any paid subscription. (3) Native Microsoft integration — works inside Windows 11, Edge, and Microsoft 365 apps without extra setup.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The model underneath Copilot is GPT-5.5 — the same foundation as ChatGPT Plus. The difference is what Microsoft layered on top. Every Copilot response can pull from the live web, which makes it more accurate on current topics, recent events, and real-time information. For a student who needs to research something from the last month, Copilot's grounded answers are more reliable than asking a model with a training cutoff.</p>
        </Block>
        <Block>
          <SubHead label="Free vs Copilot Pro — what you actually get" color={color} />
          <Compare color={color} items={[
            { label: 'Copilot Free', badge: 'More than most know', body: 'GPT-5.5 quality during non-peak hours, always-on web search with citations, 15 DALL-E 3 image boosts per day, voice conversations, file uploads (PDF/Word/Excel), image analysis. This is the ChatGPT Plus feature set — free. No credit card needed.' },
            { label: 'Copilot Pro — $20/month', badge: 'Worth it for Office users', body: 'Priority access at peak times (no slowdowns when Microsoft\'s servers are busy), 100 image boosts/day in landscape format, and crucially: Copilot inside Word, Excel, PowerPoint, and Outlook. If you live in Microsoft Office for work or college, Pro pays for itself quickly.' },
            { label: 'Microsoft 365 Copilot (Enterprise/Education)', badge: 'For institutions', body: 'Full Copilot integrated across all M365 apps — available to institutions and companies on E3/E5 plans. Many Indian engineering colleges and companies provide M365 licenses — check if your institution gives you access. It is free for you if your college has a Microsoft agreement.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Core features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Always-on web search', desc: 'Every response can pull from live Bing results by default. Recent news, current prices, latest documentation. No plugin toggle needed — it searches when relevant automatically.' },
            { name: 'Free image generation', desc: '15 free DALL-E 3 image boosts per day via Microsoft Designer. Same model that costs $20/month in ChatGPT Plus. Great for presentation visuals, project thumbnails, creative projects.' },
            { name: 'Think Deeper', desc: 'Reasoning mode for complex problems — like o1/o3 style step-by-step thinking. Use for multi-step math, logical reasoning, complex research questions. Available on the free tier.' },
            { name: 'File uploads and analysis', desc: 'Upload Word docs, Excel files, PDFs. Ask Copilot to summarize, extract key points, answer questions about the content, or improve the writing. Up to several MB per file.' },
            { name: 'Copilot Vision', desc: 'Upload screenshots, photos, or images. Ask what is shown, have it read text in images, analyze diagrams, describe scenes. Works in the web interface and Edge sidebar.' },
            { name: 'Voice conversations', desc: 'Speak to Copilot and hear responses. Natural two-way dialogue using Microsoft\'s MAI-Voice-1 model. Available on mobile (iOS/Android) and desktop. Useful for studying hands-free.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Practical use for students" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Research with live citations', body: 'Ask research questions and Copilot cites live web sources. For any claim you plan to use in work — click the citation and verify it is a real, credible source. Copilot\'s citations are real links, not fabricated references.' },
            { n: '2', title: 'Generate presentation visuals for free', body: 'For any presentation: describe the image you need in detail. Click the image icon in Copilot or go to Microsoft Designer. 15 free generations per day covers most project needs without any subscription.' },
            { n: '3', title: 'Summarize uploaded documents', body: 'Upload lecture notes, research papers, or assignment guidelines as PDFs. Ask \'What are the 5 most important points in this?\' or \'What does this document say about [specific topic]?\' Saves hours of reading.' },
            { n: '4', title: 'Use in Edge sidebar while browsing', body: 'Open Microsoft Edge → press Ctrl+Shift+. (or click the Copilot icon in the toolbar). Now Copilot can see the page you are reading and answer questions about it directly — explain this article, summarize this documentation, extract the key data from this table.' },
            { n: '5', title: 'Draft emails and professional messages', body: '\'Write a professional follow-up email to a recruiter after an interview. I interviewed for a backend developer role at [company]. The interview went well and I want to express interest in next steps. Keep it under 100 words.\' Paste and edit.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Microsoft Copilot in M365 apps" color={color} />
          <Compare color={color} items={[
            { label: 'Word', badge: 'Draft and improve documents', body: 'Create a full draft from a prompt. Summarize a long document. Rewrite a section more concisely. Adjust tone. Available in free browser version of Word (with limits) and fully in Pro.' },
            { label: 'PowerPoint', badge: 'Create presentations fast', body: 'Turn a Word document or outline into a complete presentation with slides, content, and design in seconds. Redesign existing slides. Add speaker notes. \'Create a 10-slide presentation about REST APIs for beginners.\'' },
            { label: 'Excel', badge: 'Data analysis without formulas', body: 'Ask questions about your data in plain English. \'Which region had the highest sales in Q3?\' generates a chart. Agent Mode can even pull live web data into your workbook. Formula suggestions and explanations built in.' },
            { label: 'Outlook', badge: 'Email management', body: 'Summarize long email threads. Draft replies. Schedule meetings — Copilot finds free times, suggests rooms, drafts the invite. \'Summarize my unread emails from today\' on mobile voice command.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Get GPT-5.5 quality AI responses with always-on web search — completely free',
            'Generate up to 15 DALL-E 3 images per day for presentations, projects, and creative work',
            'Upload documents and ask questions about them without paying for any subscription',
            'Use Copilot in the Edge browser sidebar while reading any web page for instant context-aware help',
            'Access AI writing, summarization, and data analysis inside Word, Excel, PowerPoint, and Outlook (Pro/Education)',
        ]} />
      </Block>
        <ProjectTask
        title={"Compare Copilot to ChatGPT on a Real Research Task"}
        description={"Pick a topic you need to research for a current assignment or project. Ask the same 5 research questions to both Microsoft Copilot (free) and ChatGPT (free). Note: Which gave more cited, verifiable answers? Which hallucinated? Which produced more current information? Which wrote better at your level? Use Copilot's image generation for one visual you need for the project. This comparison builds a practical mental model of when to use each tool."}
        costNote={"TOTAL COST: ₹0 — Microsoft Copilot free tier, no credit card needed"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Pick a real research topic', body: 'Use an actual topic from your current coursework, not a made-up one. Real queries reveal real differences — generic prompts like \'explain AI\' look similar on both tools.' },
            { n: '2', title: 'Ask the same 5 questions to both', body: 'Open Copilot in one window, ChatGPT in another. Same 5 questions, exact same phrasing. Note: do the answers differ? Do citations appear? Is the information current?' },
            { n: '3', title: 'Verify 3 claims from each', body: 'Take 3 factual claims from Copilot\'s answers (it shows citation numbers). Click the citations. Are they real, credible sources? Do the same with ChatGPT — where are its claims coming from?' },
            { n: '4', title: 'Generate one image for your project', body: 'Think of one visual your project or presentation could use. Describe it in detail to Copilot\'s image generator. This is free — use it for every presentation you make.' },
          ]} />
      </ProjectTask>
        <ProTip>
        The Edge browser sidebar is Copilot's most underused feature for students. While reading any research paper, documentation page, or dense article: open the sidebar (Ctrl+Shift+.) and ask 'Summarize the key points of this page' or 'What does [specific term from the article] mean in context?' Copilot reads the page you are currently viewing and gives contextual answers — no copy-pasting needed. This turns every browser tab into an interactive reading session.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/chatbots/notebooklm', label: 'NotebookLM' }}
        next={{ path: '/ai-lab/chatbots/chatgpt', label: 'ChatGPT' }}
      />
    </ToolPageShell>
  )
}

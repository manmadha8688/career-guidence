import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#8B5CF6'

export default function PerplexityPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Chatbots">
      <ToolHeader
        icon="🔍"
        title="Perplexity — AI Search That Cites Its Sources"
        tagline="The search engine reimagined with real-time AI answers"
        badges={[['✓ FREE', '#4ADE80'], ['Unlimited free searches', color], ['AI Search', 'var(--text-muted)']]}
        overview={"Perplexity is not a chatbot — it is a search engine rebuilt for the AI era. Every answer comes with numbered citations linking directly to the sources. You can see exactly which web pages the answer was drawn from, and one click opens the source. This changes how research works: instead of reading 10 search results to synthesize an answer yourself, Perplexity reads them and synthesizes the answer for you — then shows you its sources so you can verify. For students writing papers, developers staying current with new tools, and anyone researching a topic they don't know, Perplexity's citation-first approach produces more trustworthy outputs than any chatbot that generates answers from memory alone. It is completely free for unlimited searches."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'How to Use Perplexity AI For Beginners — Complete Tutorial 2024', url: 'https://www.youtube.com/watch?v=iH-vz8hsa-M', dur: '~15 min', note: 'Best beginner walkthrough of all Perplexity features' },
            { label: 'Perplexity AI Tutorial For Beginners — How To Use Perplexity 2025', url: 'https://www.youtube.com/watch?v=e-uA4UOPlIU', dur: '~15 min', note: 'Updated 2025 guide with Focus modes and Spaces' },
            { label: 'How to Use Perplexity AI 2025 (Step by Step for Beginners)', url: 'https://www.youtube.com/watch?v=Yxpr1i-oC7E', dur: '~12 min', note: 'Clear step-by-step guide for research workflows' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why Perplexity is different from chatbots" color={color} />
          <InfoBox color={color}>Perplexity searches the live web for every query, then uses an LLM to synthesize a structured answer from those search results, with each claim linked to its source. You are not getting the model's memorized knowledge — you are getting a real-time synthesis of current web content.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>This makes Perplexity the right tool any time accuracy and verifiability matter more than creative generation. Ask it about a new JavaScript library, yesterday's tech news, the requirements for a specific job role, or current research on a medical topic — the answer will be grounded in pages you can visit and verify. ChatGPT and Claude generate from training data; Perplexity generates from the live web.</p>
        </Block>
        <Block>
          <SubHead label="Core features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Cited answers', desc: 'Every answer has numbered citations. Each number links to the source page. You can check any claim immediately. This is the feature that makes Perplexity useful for research where accuracy matters.' },
            { name: 'Follow-up questions', desc: 'Perplexity suggests follow-up questions after every answer. Click to go deeper into any aspect of the topic automatically — like having a research assistant who knows what to investigate next.' },
            { name: 'Focus modes', desc: 'Switch between Web (general), Academic (papers and studies), YouTube (video summaries), Reddit (community opinions), and Wolfram Alpha (math/science). Each searches a different subset of the web.' },
            { name: 'Spaces (Pro)', desc: 'Create research collections around a topic. Add sources manually, keep research organized, share with others. Like a citable Notion powered by AI.' },
            { name: 'File upload analysis', desc: 'Upload PDFs, research papers, or documents. Ask questions about them. Perplexity searches the web alongside the document to provide context-enriched answers.' },
            { name: 'Pages (Pro)', desc: 'Turn any Perplexity conversation into a published, shareable research document. Useful for sharing research findings with formatting and citations intact.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="When to use Perplexity vs when to use a chatbot" color={color} />
          <Compare color={color} items={[
            { label: 'Use Perplexity when...', badge: 'Best choice', body: 'You need current information (today\'s news, latest releases), you need to verify facts for a paper or report, you\'re researching a technology you want to adopt, you want to know what people are currently saying about something, or you need academic paper citations.' },
            { label: 'Use ChatGPT/Claude when...', badge: 'Better for these', body: 'You need creative writing, code generation, step-by-step reasoning, conversational explanation of a concept, drafting an essay or email, or anything that benefits from generative capability rather than search synthesis.' },
            { label: 'Use Perplexity Academic focus for...', badge: 'Research papers', body: 'Switch to Academic mode when looking for peer-reviewed sources. Perplexity searches academic databases including arXiv, PubMed, and Semantic Scholar. Better for finding papers on technical topics than Google Scholar for most queries.' },
            { label: 'Use YouTube focus for...', badge: 'Video research', body: 'Switch to YouTube mode when you want AI-summarized answers from video content. Ask a question about a technical topic and get answers synthesized from relevant YouTube tutorials, with links to the source videos.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Using Perplexity for academic research" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Ask a broad research question first', body: 'Start with the big question: \'What are the current approaches to reducing hallucinations in large language models?\' Perplexity synthesizes the current state of research with citations to recent papers.' },
            { n: '2', title: 'Switch to Academic focus', body: 'Click the Focus button → Academic. Re-ask your question. Now Perplexity prioritizes peer-reviewed sources. The citations link directly to papers you can read.' },
            { n: '3', title: 'Follow the citation chain', body: 'Click source numbers to open the actual papers. Skim the abstract. If relevant, this becomes a primary source for your work — properly cited, not hallucinated.' },
            { n: '4', title: 'Ask follow-up questions to go deeper', body: 'Use Perplexity\'s suggested follow-ups or ask your own. \'What are the key papers on this topic from the past two years?\' \'Who are the main researchers working on this problem?\'' },
            { n: '5', title: 'Export your research', body: 'Copy the full response with citations. Paste into your notes. The numbered citations are the beginning of your bibliography — they are real sources you can verify.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Perplexity vs Google Search vs ChatGPT" color={color} />
          <Compare color={color} items={[
            { label: 'vs Google Search', badge: 'Complementary, not replacement', body: 'Google shows you 10 links and you read them. Perplexity reads them and gives you a synthesis with citations. For research questions where you want a synthesis, Perplexity is faster. For browsing, finding specific websites, or shopping, Google is still better.' },
            { label: 'vs ChatGPT (free)', badge: 'Perplexity more accurate for factual queries', body: 'ChatGPT free has a knowledge cutoff and no web access. Perplexity searches live. For any factual or time-sensitive question, Perplexity is more reliable. For conversational reasoning, code, or creative work, ChatGPT is better.' },
            { label: 'vs Gemini', badge: 'Perplexity citations are cleaner', body: 'Both search the web. Perplexity\'s interface is built entirely around citations and research — cleaner numbered sources, academic focus mode, research collections. Gemini is better for Google Workspace integration; Perplexity is better for pure research workflow.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Research any technical topic with live, cited web sources — no hallucinated facts',
            'Find recent academic papers on any topic using Academic focus mode with links to the actual papers',
            'Summarize YouTube videos by searching in YouTube focus mode for tutorial content',
            'Stay current with technology news, library releases, and industry trends in real time',
            'Build research collections around topics you\'re studying with organized, cited sources',
        ]} />
      </Block>
        <ProjectTask
        title={"Research a Job Role"}
        description={"Use Perplexity to research the exact technical requirements for one job role you want in 2-3 years. Ask: 'What technical skills are companies currently hiring for in [role]? What do job postings ask for in 2025?' Then ask follow-ups about any skill you haven't started learning yet. Document: what you already know, what you need to learn, and use the cited job postings to validate that the information is real and current."}
        costNote={"TOTAL COST: ₹0 — Perplexity free tier, unlimited searches, no credit card required"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Pick your target role', body: 'Choose a specific role: backend developer, data scientist, DevOps engineer, ML engineer, frontend developer. Be specific — not just \'programmer\'.' },
            { n: '2', title: 'Ask Perplexity for current requirements', body: 'Ask: \'What skills do companies currently require for [role]? What do job postings ask for?\' Let Perplexity search and cite actual job board data.' },
            { n: '3', title: 'Follow up on gaps', body: 'For each skill you don\'t have: ask \'how long does it take to learn [skill] from scratch?\' and \'what resources do people recommend for learning [skill]?\'' },
            { n: '4', title: 'Create your learning roadmap', body: 'Based on the cited, current information, list: what you know ✓, what you\'re learning ⏳, and what to start next →. This is a data-driven learning plan, not guesswork.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Switch Focus mode before every Perplexity query, not after you get a generic answer. Academic mode finds papers, YouTube mode finds tutorials, Reddit mode finds real practitioner opinions. The default Web mode is fine for general research but the focused modes produce dramatically more relevant results for specific use cases. Most users never change the mode and miss the best feature.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/chatbots/gemini', label: 'Gemini' }}
        next={{ path: '/ai-lab/chatbots/notebooklm', label: 'NotebookLM' }}
      />
    </ToolPageShell>
  )
}

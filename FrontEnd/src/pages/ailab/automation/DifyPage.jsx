import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F97316'

export default function DifyPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Automation">
      <ToolHeader
        icon="🎯"
        title="Dify — The LLMOps Platform for Building AI Applications"
        tagline="From prompt to production — build, test, and deploy AI apps"
        badges={[['✓ FREE cloud tier', '#4ADE80'], ['Self-host option', color], ['LLMOps platform', 'var(--text-muted)']]}
        overview={"Dify is an open-source LLMOps (Large Language Model Operations) platform — it combines a visual workflow builder, a prompt engineering IDE, a RAG knowledge base manager, model management, and observability into one platform. Where Flowise focuses on building LangChain flows visually, Dify is a complete production platform: you build your AI application in Dify's visual editor, manage your knowledge bases (upload documents, configure chunking, test retrieval), monitor performance in production, and deploy a shareable web app or API — all in one tool. The free cloud tier at cloud.dify.ai gives you a fully hosted platform with 200 API calls per day. Self-hosting gives you unlimited usage."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Master Dify AI Chatbot in 1 Hour: Complete Beginner\'s Guide 2025', url: 'https://www.youtube.com/watch?v=dHJictxN2ZU', dur: '~60 min', note: 'Full chatbot from zero — knowledge base, RAG, chatflow, deployment' },
            { label: 'Dify AI Tutorial for Beginners 2025: How to Build AI Apps', url: 'https://www.youtube.com/watch?v=20mQSYJ1PlI', dur: '~30 min', note: 'Visual drag-and-drop workflows — models, pipelines, and live deployment' },
            { label: 'Dify No Code E-commerce AI Agent Workflow in 20 Minutes', url: 'https://www.youtube.com/watch?v=oanFGdDkN-o', dur: '20 min', note: 'Endorsed by Dify official — real use case agent built end to end' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What makes Dify a platform, not just a tool" color={color} />
          <InfoBox color={color}>Dify covers the full LLMOps lifecycle: Build (visual workflow + prompt IDE), Test (A/B test prompts, evaluate retrieval quality), Deploy (shareable web app, embeddable widget, API endpoint), Monitor (token usage, response latency, conversation logs), and Improve (fine-tune prompts based on production feedback). Most tools cover one of these — Dify covers all five in one interface.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The knowledge base management is Dify's most practical differentiator. Upload documents, and Dify handles chunking, embedding (using your choice of embedding model), and vector storage — with a UI to configure every parameter and test retrieval quality before connecting to your application. You can see exactly which chunks a query retrieves and why, and adjust chunking settings until retrieval is accurate. This level of RAG debugging is difficult to build yourself and rare in other visual tools.</p>
        </Block>
        <Block>
          <SubHead label="Core platform features" color={color} />
          <CardGrid color={color} items={[
            { name: 'Workflow builder', desc: 'Visual canvas to build multi-step AI pipelines. Nodes for LLM calls, knowledge retrieval, HTTP requests, code execution, conditional branching, variable passing. More powerful than Flowise for complex pipelines.' },
            { name: 'Knowledge base (RAG)', desc: 'Upload PDFs, web pages, Notion, GitHub. Configure chunking strategy and size. Choose embedding model. Test retrieval quality before deploying. Full control over the RAG pipeline.' },
            { name: 'Prompt IDE', desc: 'Write, test, and version-control prompts. Side-by-side comparison of different prompt versions. A/B test prompts with real queries. The most important AI engineering tool most people skip.' },
            { name: 'Model management', desc: 'Connect multiple LLM providers: OpenAI, Anthropic, Groq, Azure OpenAI, Ollama (local). Switch models in your application from the model settings without changing application code.' },
            { name: 'App deployment', desc: 'Deploy as: shareable web app (Dify hosts it), embeddable chat widget, or REST API. Any app built in Dify is instantly deployable to a public URL on the free cloud tier.' },
            { name: 'Observability', desc: 'Every production query is logged: input, output, model used, tokens consumed, latency, retrieved knowledge chunks. Essential for debugging production issues and optimizing costs.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Building a knowledge base app" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Create a Dify account', body: 'cloud.dify.ai → Sign up free. The free tier gives you 200 API calls per day, access to all features, and hosted deployment. No credit card required.' },
            { n: '2', title: 'Create a knowledge base', body: 'Knowledge → Create Knowledge → Upload your documents (PDF, TXT, MD, HTML). Configure: chunking strategy (by paragraph or fixed size), chunk size (800-1000 recommended), overlap (100). Choose embedding model.' },
            { n: '3', title: 'Test retrieval quality', body: 'In the knowledge base settings, use the Retrieval Testing panel. Type queries and see exactly which chunks are returned. This is RAG debugging — adjust settings until the right chunks appear for your queries.' },
            { n: '4', title: 'Create a chatbot application', body: 'Studio → Create App → Chatbot. Connect your knowledge base as a context. Write a system prompt. Configure the LLM. Set context window settings.' },
            { n: '5', title: 'Deploy and share', body: 'Click Publish → deploy as a web app. Dify gives you a public URL immediately. Share the link — anyone can use your AI application through a clean chat interface.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Dify vs Flowise vs building from code" color={color} />
          <Compare color={color} items={[
            { label: 'Dify', badge: 'Full platform, production-ready', body: 'Complete lifecycle management: build, test, deploy, monitor. Knowledge base management with retrieval testing. Hosted cloud option. Best when you want a complete production platform without managing infrastructure. Cloud free tier is enough for projects and demos.' },
            { label: 'Flowise', badge: 'Simpler, developer-friendly', body: 'More direct LangChain visual mapping. Better for developers who know LangChain and want to skip code. Fewer production features (no built-in observability, no retrieval testing UI). Best for rapid prototyping and custom LangChain flows.' },
            { label: 'Custom Python code', badge: 'Maximum control', body: 'Full LangChain/LlamaIndex control. Write exactly what you need. Best for production systems with specific requirements, teams with Python expertise, and applications that need custom logic beyond what visual tools support.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Prompt engineering with Dify's IDE" color={color} />
          <InfoBox color={color}>Most AI application failures are prompt failures, not model failures. Dify's Prompt IDE is one of the few tools that makes prompt testing systematic — you can run the same input through two different prompts side-by-side and see which produces better output. This replaces guessing with measurement.</InfoBox>
          <Steps color={color} items={[
            { n: '1', title: 'Open the Prompt IDE', body: 'In any Dify app, open the prompt editor. You see the system prompt, example user messages, and the model response side-by-side. Edit and immediately test.' },
            { n: '2', title: 'Create comparison versions', body: 'Duplicate the prompt. Make one change in version B (different instruction, different format requirement, different persona). Run 5 test queries through both versions.' },
            { n: '3', title: 'Score and compare', body: 'For each test query, score both outputs 1-5 for quality. Calculate average. The version with higher average quality on your real queries is your better prompt — not the one that sounds better in theory.' },
            { n: '4', title: 'Version and deploy', body: 'Dify saves all prompt versions. Deploy the winning version. If it underperforms in production, roll back to the previous version. This is professional prompt management.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Build and deploy a production AI application with knowledge base, monitoring, and web UI in one day',
            "Test RAG retrieval quality visually — see exactly which document chunks your queries retrieve before deploying",
            'A/B test different prompts on real queries to find the highest-quality version systematically',
            "Deploy a shareable web application from Dify's cloud without managing any servers",
            'Monitor production AI usage: token costs, latency, conversation logs, retrieval quality',
        ]} />
      </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span>
            <span className="tool-layout-task__label">PROJECT — Build and Deploy a Study Assistant</span>
          </div>
          <p className="tool-layout-task__desc">Create a Dify knowledge base app for a subject you're studying. Upload 5-10 relevant documents (notes, textbook sections, research papers). Test retrieval quality on 10 questions before connecting to the chatbot. Deploy as a public web app. Share with 3 classmates and collect feedback on answer quality. Use Dify's conversation logs to see which questions performed worst and improve your knowledge base and prompt based on real usage data.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Create account and knowledge base', body: 'cloud.dify.ai → free signup. Create a Knowledge Base. Upload your study documents. Use chunk size 800, overlap 100. Test retrieval with 10 questions about your content.' },
            { n: '2', title: 'Fix retrieval issues first', body: 'Before building the chatbot, spend time in the retrieval testing panel. If important chunks are not appearing for obvious queries, adjust chunking strategy. Getting retrieval right is 70% of RAG quality.' },
            { n: '3', title: 'Build and prompt the chatbot', body: "Create a Chatbot app. Connect your knowledge base. System prompt: 'You are a study assistant for [subject]. Answer questions using only the provided knowledge base. If information is not in the knowledge base, say so clearly.'" },
            { n: '4', title: 'Deploy and collect feedback', body: "Publish → get the public URL. Share with classmates. After 50+ conversations, review the conversation logs in Dify's analytics. Identify the 5 queries with the worst answers and improve those knowledge base entries." },
          ]} />
        </div>
        <ProTip>
        The single most impactful thing you can do to improve a Dify RAG application is improve your source documents, not your prompt. If a knowledge base answer is wrong or incomplete, check whether the relevant information is actually in your uploaded documents. Often the document has the information but it was split across chunk boundaries, or the information is vague and needs to be rewritten to be more explicit. Better source documents beat prompt engineering every time for RAG quality.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/automation/flowise', label: 'Flowise' }}
        next={{ path: '/ai-lab/automation/zapier', label: 'Zapier' }}
      />
    </ToolPageShell>
  )
}

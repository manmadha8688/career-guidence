import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#EC4899'

export default function LangChainPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Agents">
      <ToolHeader
        icon="🔗"
        title="LangChain — The Standard Framework for LLM Applications"
        tagline="Build chains, RAG pipelines, and agents with any LLM"
        badges={[['✓ FREE', '#4ADE80'], ['Open source', color], ['Python & JS', 'var(--text-muted)']]}
        overview={"LangChain is the most widely used framework for building applications on top of large language models. Where calling an LLM API directly gives you a single request-response, LangChain provides the building blocks for chaining multiple LLM calls, connecting to data sources, managing conversation memory, and building agents that can use tools. Released in 2022, it became the de facto standard for LLM application development — nearly every tutorial, course, and production RAG system you will encounter uses LangChain concepts if not LangChain directly. Version 0.3+ introduced LangChain Expression Language (LCEL), a declarative pipeline syntax that replaced the older, more verbose chain syntax. Understanding LangChain means understanding how production AI applications are structured."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'LangChain Master Class For Beginners 2024 — 20 Examples, LangChain v0.2', url: 'https://www.youtube.com/watch?v=yF9kGeSAi3M', dur: '~90 min', note: 'Most comprehensive beginner masterclass — LCEL, chains, agents, RAG' },
            { label: 'LangChain Crash Course for Beginners — freeCodeCamp', url: 'https://www.youtube.com/watch?v=lG7Uxts9SXs', dur: '~60 min', note: 'Full hands-on course — chains, agents, memory, and tools in Python' },
            { label: 'LangChain Full Crash Course — AI Agents in Python', url: 'https://www.youtube.com/watch?v=J7j5tCB_y4w', dur: '~60 min', note: 'Latest 2025 version — covers LCEL and agent patterns end to end' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Core concepts" color={color} />
          <InfoBox color={color}>LangChain's architecture has four main layers: Models (wrappers around any LLM API — OpenAI, Groq, Anthropic, HuggingFace), Prompts (PromptTemplate for reusable, parameterized prompts), Chains (sequences of operations using LCEL's pipe | operator), and Retrievers (connecting to vector stores for RAG). Understanding these four layers means you understand LangChain.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>LCEL (LangChain Expression Language) is the modern way to build LangChain pipelines. Instead of manually instantiating chain objects, LCEL uses Python's pipe operator to compose components: chain = prompt | llm | output_parser. Each component is a Runnable — it accepts input and produces output. The pipe operator passes output from left to right. A 5-step RAG chain becomes one readable line of composed components. This declarative style replaced the older, more complex chain constructors in v0.3+.</p>
        </Block>
        <Block>
          <SubHead label="Key components" color={color} />
          <CardGrid color={color} items={[
            { name: 'ChatModels', desc: 'Wrappers around any LLM: ChatOpenAI, ChatGroq, ChatAnthropic, ChatHuggingFace. Swap the model without changing any other code — the interface is identical across providers.' },
            { name: 'PromptTemplate / ChatPromptTemplate', desc: 'Reusable, parameterized prompts. Define a template with variables, fill in at runtime. ChatPromptTemplate for system + human message pairs.' },
            { name: 'LCEL chains (|)', desc: 'The pipe operator composes components: prompt | llm | StrOutputParser(). Each | passes the output of the left component as input to the right. Chains are lazy — they only execute when invoked.' },
            { name: 'Document loaders & text splitters', desc: 'Load PDFs, web pages, Notion, GitHub repos. Split into chunks. The starting point for any RAG pipeline. 100+ loaders for different data sources.' },
            { name: 'Vector stores & retrievers', desc: 'Integrations with ChromaDB, Pinecone, FAISS, Weaviate. Retriever wraps a vector store to provide a consistent .invoke(query) interface for RAG chains.' },
            { name: 'Memory', desc: 'ConversationBufferMemory, ConversationSummaryMemory — persist conversation history across turns. Inject history into prompts automatically. Essential for stateful chatbots.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Building a RAG chain with LCEL" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Load and split documents', body: "from langchain_community.document_loaders import PyPDFLoader\nfrom langchain.text_splitter import RecursiveCharacterTextSplitter\nloader = PyPDFLoader('document.pdf')\ndocs = loader.load()\nsplitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)\nchunks = splitter.split_documents(docs)" },
            { n: '2', title: 'Create embeddings and vector store', body: "from langchain_community.vectorstores import Chroma\nfrom langchain_community.embeddings import HuggingFaceEmbeddings\nembeddings = HuggingFaceEmbeddings(model_name='all-MiniLM-L6-v2')\nvectorstore = Chroma.from_documents(chunks, embeddings)\nretriever = vectorstore.as_retriever(search_kwargs={'k': 4})" },
            { n: '3', title: 'Define the prompt', body: "from langchain_core.prompts import ChatPromptTemplate\nprompt = ChatPromptTemplate.from_template(\"\"\"\nAnswer based only on the context below:\nContext: {context}\nQuestion: {question}\n\"\"\")" },
            { n: '4', title: 'Build the chain with LCEL', body: "from langchain_groq import ChatGroq\nfrom langchain_core.output_parsers import StrOutputParser\nfrom langchain_core.runnables import RunnablePassthrough\nllm = ChatGroq(model='llama-3.1-70b-versatile')\nchain = {'context': retriever, 'question': RunnablePassthrough()} | prompt | llm | StrOutputParser()" },
            { n: '5', title: 'Invoke the chain', body: "response = chain.invoke('What does the document say about X?')\nprint(response)\nThe retriever fetches relevant chunks, the prompt formats them, the LLM generates the answer, and StrOutputParser extracts the text — all in one call." },
          ]} />
        </Block>
        <Block>
          <SubHead label="LangChain for agents" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>LangChain agents give LLMs access to tools — functions the model can call to take real actions. A tool can be a web search, a database query, a Python interpreter, a calculator, or any custom function you define. The agent decides which tool to call based on the user's request, calls it, observes the result, and decides what to do next.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Define tools', body: "Use the @tool decorator: @tool\ndef search_database(query: str) -> str:\n    'Search the product database for relevant items'\n    return db.search(query)\nThe docstring tells the agent when to use this tool." },
            { n: '2', title: 'Create the agent', body: 'from langchain.agents import create_tool_calling_agent, AgentExecutor\nagent = create_tool_calling_agent(llm, tools, prompt)\nexecutor = AgentExecutor(agent=agent, tools=tools, verbose=True)' },
            { n: '3', title: 'Run and observe', body: "result = executor.invoke({'input': 'Find me products under ₹500'})\nSet verbose=True to see the agent's reasoning: what tool it chose, what input it passed, what the tool returned. This reasoning trace is how you debug agent behavior." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Common pitfalls" color="#EF4444" />
          <Compare color="#EF4444" items={[
            { label: 'Version confusion', badge: 'Check imports carefully', body: 'LangChain split into multiple packages: langchain-core (base), langchain (main), langchain-community (integrations), langchain-openai, langchain-groq etc. An import error often means you need to pip install the specific integration package, not langchain itself.' },
            { label: 'Over-chaining', badge: 'Keep it simple', body: 'LangChain makes it easy to add complexity. Many production systems use a simple retriever + prompt + LLM with no framework at all. Use LangChain when you need its abstractions (swappable models, memory, agent loop) — not because it exists.' },
            { label: 'Retrieval quality', badge: 'Most important variable', body: 'Poor RAG answers are almost always a retrieval problem, not an LLM problem. If the wrong chunks are retrieved, the best LLM cannot answer correctly. Debug retrieval (what chunks does retriever.invoke() return?) before blaming the model.' },
            { label: 'Cost tracking', badge: 'Add callbacks', body: 'LangChain does not show token costs by default. Add get_openai_callback() context manager or LangSmith tracing to see token counts and costs per chain invocation. Essential before deploying anything to production.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Build a complete RAG system over your own documents in under 50 lines of Python',
            'Connect any LLM (OpenAI, Groq, Anthropic, local) to your application by swapping one import',
            'Create agents that use tools — web search, database queries, code execution — to complete multi-step tasks',
            'Add conversation memory to any chatbot so it remembers the full conversation history',
            'Structure complex LLM workflows as readable, composable LCEL pipelines',
        ]} />
      </Block>
        <ProjectTask
        title={"Build a PDF Q&amp;A System"}
        description={"Load a PDF you find interesting (a research paper, a textbook chapter, a product manual). Build a LangChain RAG chain that lets you ask any question about it. Use Groq's free API (Llama 3.1 70B) as the LLM and all-MiniLM-L6-v2 (free, local) for embeddings. The cost: ₹0. Test it with 10 questions that require understanding content from different sections."}
        costNote={"TOTAL COST: ₹0 — Groq free tier + local embeddings, no paid API required"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Install dependencies', body: 'pip install langchain langchain-community langchain-groq chromadb sentence-transformers pypdf python-dotenv' },
            { n: '2', title: 'Load and split the PDF', body: 'Use PyPDFLoader and RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100). Print len(chunks) to verify it loaded correctly.' },
            { n: '3', title: 'Build the vector store', body: "Use HuggingFaceEmbeddings('all-MiniLM-L6-v2') — runs locally, free. Create ChromaDB vector store. This is a one-time step — persist the DB to avoid re-embedding every run." },
            { n: '4', title: 'Build the LCEL chain and test', body: 'Connect retriever + ChatPromptTemplate + ChatGroq + StrOutputParser using the | operator. Ask 10 questions. For each, also check what chunks the retriever returned to understand why the answer is right or wrong.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Add verbose=True to your AgentExecutor and LLMChain during development. Seeing the full reasoning trace — what the model decided, which tool it called, what the tool returned — is the fastest way to understand what is working and what is not. Remove verbose=True before showing the app to anyone else.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/apis/huggingface', label: 'Hugging Face' }}
        next={{ path: '/ai-lab/agents/langgraph', label: 'LangGraph' }}
      />
    </ToolPageShell>
  )
}

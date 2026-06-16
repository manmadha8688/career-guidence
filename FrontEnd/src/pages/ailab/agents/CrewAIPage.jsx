import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#EC4899'

export default function CrewAIPage() {
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()
  const dark = theme !== 'light'
  const bg    = dark ? '#020817' : '#F0F4FF'
  const card  = dark ? 'rgba(6,14,36,0.85)' : 'rgba(255,255,255,0.95)'
  const border = dark ? 'rgba(0,217,255,0.09)' : 'rgba(79,70,229,0.11)'
  const txt   = dark ? '#E2E8F0' : '#0F172A'
  const sub   = dark ? '#94A3B8' : '#475569'
  const muted = dark ? '#64748B' : '#94A3B8'

  return (
    <div style={{ minHeight: '100vh', background: bg, color: txt, fontFamily: "'Rajdhani', sans-serif", overflowX: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 700, height: 500, borderRadius: '50%', background: `radial-gradient(ellipse, ${color}07 0%, transparent 65%)`, filter: 'blur(60px)' }} />
      </div>

      <nav style={{ position: 'sticky', top: 0, zIndex: 50, height: 54, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', background: dark ? 'rgba(2,8,23,0.93)' : 'rgba(240,244,255,0.95)', backdropFilter: 'blur(16px)', borderBottom: `1px solid ${border}` }}>
        <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.72rem', letterSpacing: '0.1em', color: CYAN, padding: 0 }}>
          <ArrowLeft size={14} /> AI Lab
        </button>
        <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem', color: muted, letterSpacing: '0.08em' }}>Agents</span>
        <button onClick={toggleTheme} style={{ background: 'none', border: `1px solid ${border}`, borderRadius: 6, width: 32, height: 32, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: muted }}>
          {dark ? <Sun size={14} /> : <Moon size={14} />}
        </button>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 860, margin: '0 auto', padding: '2rem 1.25rem 5rem' }}>

        {/* Header */}
        <div style={{ background: card, border: `1px solid ${border}`, borderTop: `4px solid ${color}`, borderRadius: 18, padding: 'clamp(1.5rem,4vw,2.5rem)', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>👥</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>CrewAI — Orchestrate AI Agents as a Team</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>Role-based multi-agent collaboration for complex tasks</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['Open source', color], ['Multi-agent framework', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>CrewAI is a Python framework for building multi-agent systems where each AI agent has a defined role, goal, and set of tools — like assembling a team of specialists. A market research task might involve a Researcher agent (finding information), an Analyst agent (interpreting data), and a Writer agent (producing the final report). Each agent works autonomously toward its assigned task, can use tools (web search, code execution, file reading), and passes results to the next agent. CrewAI abstracts away the complexity of orchestrating multiple LLM calls with context management, making it accessible to build powerful multi-agent pipelines without deep knowledge of agent internals. It is one of the fastest-growing AI frameworks with strong community support.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'CrewAI Tutorial — Build Multi-Agent AI Systems', url: 'https://www.youtube.com/watch?v=sPzc6hMg7So', dur: '20 min', note: 'Complete introduction and first crew' },
            { label: 'CrewAI Full Course — Agents, Tasks, Tools, and Flows', url: 'https://www.youtube.com/watch?v=kJvXT25LkwA', dur: '35 min', note: 'Comprehensive coverage' },
            { label: 'CrewAI vs LangGraph — Which Multi-Agent Framework?', url: 'https://www.youtube.com/watch?v=pJwR5pv0_gs', dur: '12 min', note: 'Comparison for choosing the right tool' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* The core model */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="The core model: Agents, Tasks, Tools, Crew" color={color} />
          <InfoBox color={color} dark={dark}>CrewAI has four core building blocks. Agent: an AI with a role, goal, and backstory. Task: work to be done, with a description, expected output, and assigned agent. Tool: a function the agent can call (web search, file read, code run). Crew: the orchestrator that manages agents, assigns tasks, and coordinates the workflow. You define the what (tasks) and who (agents); CrewAI handles the how.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The role/goal/backstory pattern is not just metadata — it is injected into the system prompt for each agent. An agent with role="Senior Python Developer", goal="Write clean, well-tested code", backstory="You have 10 years of experience and follow SOLID principles" will produce noticeably different code than an agent with no context. The backstory shapes the LLM's behavior the same way a system prompt does. This is CrewAI's key design insight: personas produce better specialized outputs than generic instructions.</p>
        </Block>

        {/* Building a simple crew */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Building a simple crew" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install CrewAI', body: 'pip install crewai crewai-tools\nFor Groq backend (free): pip install langchain-groq' },
            { n: '2', title: 'Define your agents', body: "from crewai import Agent\nresearcher = Agent(\n    role='Research Analyst',\n    goal='Find accurate, current information on the given topic',\n    backstory='You are a meticulous researcher who always cites sources and verifies claims.',\n    verbose=True,\n    allow_delegation=False,\n    llm=llm  # Pass your ChatGroq or ChatOpenAI instance\n)" },
            { n: '3', title: 'Define tasks', body: "from crewai import Task\nresearch_task = Task(\n    description='Research the current state of {topic}. Find key developments, main players, and practical applications.',\n    expected_output='A structured report with 5 key findings, each with supporting evidence.',\n    agent=researcher\n)" },
            { n: '4', title: 'Assemble the crew', body: "from crewai import Crew, Process\ncrew = Crew(\n    agents=[researcher, writer],\n    tasks=[research_task, writing_task],\n    process=Process.sequential,  # or Process.hierarchical\n    verbose=True\n)" },
            { n: '5', title: 'Kick off the crew', body: "result = crew.kickoff(inputs={'topic': 'AI coding assistants in 2025'})\nprint(result)\nThe crew runs each task in order, passing output from the researcher to the writer automatically." },
          ]} />
        </Block>

        {/* Process types */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Process types" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Sequential process', badge: 'Most common', body: 'Tasks run one after another in the order defined. Output from each task is passed as context to the next. Best for: pipelines where each step depends on the previous. Research → Analysis → Writing is a natural sequential flow.' },
            { label: 'Hierarchical process', badge: 'Manager-led', body: 'A manager agent (you define it or CrewAI creates one) coordinates the team. It delegates tasks, reviews outputs, and can re-assign work. Closer to how real teams work. Best for: complex tasks where quality review matters.' },
            { label: 'Parallel tasks', badge: 'Multiple agents simultaneously', body: "Mark tasks as async_execution=True to run them in parallel. A crew can research multiple topics simultaneously, then synthesize. Best for: independent tasks that do not depend on each other's outputs." },
          ]} />
        </Block>

        {/* Built-in tools */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Built-in tools" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'SerperDevTool', desc: 'Web search via Serper API (100 free searches/month). Gives agents access to current web information. Essential for research agents.' },
            { name: 'WebsiteSearchTool', desc: 'Search and extract content from a specific website URL. Give an agent a documentation site and let it find answers there.' },
            { name: 'FileReadTool / FileWriteTool', desc: 'Read from and write to files. Agents can read your local documents, produce output files, and collaborate through shared files.' },
            { name: 'CodeInterpreterTool', desc: 'Execute Python code and return the output. Agents can write code and run it to validate logic, analyze data, or generate artifacts.' },
            { name: 'DirectoryReadTool', desc: 'List and read files in a directory. Useful for agents that need to understand a codebase or process a folder of documents.' },
            { name: 'Custom tools (@tool)', desc: "Decorate any Python function with @tool. The function's docstring becomes the tool description — the agent reads it to know when to use this tool. Simple to add domain-specific capabilities." },
          ]} />
        </Block>

        {/* CrewAI vs LangGraph */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="CrewAI vs LangGraph" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'Abstraction level', badge: 'CrewAI higher-level', body: 'CrewAI hides agent loop internals — you define roles and tasks, not graph nodes and edges. Faster to get a working multi-agent system. Less control over exact agent behavior. LangGraph exposes the full graph structure — more control, more complexity.' },
            { label: 'Use case fit', badge: 'Different sweet spots', body: "CrewAI excels at role-based team workflows: researcher + analyst + writer patterns. LangGraph excels at custom agent loops with complex branching, human-in-the-loop, and checkpointing. Choose based on whether your workflow fits the team metaphor (CrewAI) or needs custom state management (LangGraph)." },
            { label: 'Debugging', badge: 'LangGraph wins', body: "LangGraph's explicit graph with visible state is easier to debug — you see exactly what state each node received and produced. CrewAI's abstraction makes debugging harder when agents behave unexpectedly. Add verbose=True to every agent and crew for more visibility." },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Build a research + analysis + writing pipeline with 3 specialized AI agents in under 50 lines',
            'Give agents access to web search, file reading, and code execution with built-in tools',
            'Run multiple research agents in parallel on different subtopics, then synthesize their findings',
            'Use the role/goal/backstory pattern to get specialized, high-quality outputs from each agent',
            'Build content pipelines, competitive analysis tools, report generators, and research assistants',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.625rem', alignItems: 'flex-start', padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(255,255,255,0.025)' : 'rgba(0,0,0,0.025)', border: `1px solid ${border}`, marginBottom: '0.5rem' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, flexShrink: 0, marginTop: 7 }} />
              <span style={{ fontSize: '0.85rem', color: sub, lineHeight: 1.6 }}>{item}</span>
            </div>
          ))}
        </Block>

        {/* Project Task */}
        <div style={{ padding: '1.5rem', borderRadius: 16, background: dark ? `${color}08` : `${color}06`, border: `2px solid ${color}28`, marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.875rem' }}>
            <span style={{ fontSize: '1.1rem' }}>🎯</span>
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Tech Research Crew</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Create a 3-agent CrewAI crew to research any technology topic: (1) Researcher agent: finds current information, key developments, main tools (uses SerperDevTool for web search), (2) Analyst agent: evaluates the findings and identifies what a student should prioritize learning, (3) Writer agent: produces a structured 'learning guide' from the analysis. Run it on a technology you want to learn. The output is your actual learning roadmap.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Set up environment', body: 'pip install crewai crewai-tools langchain-groq. Get a free Serper API key at serper.dev (100 free searches). Set GROQ_API_KEY and SERPER_API_KEY in .env.' },
            { n: '2', title: 'Define 3 agents with distinct personas', body: 'Each agent needs a specific role, clear goal, and backstory that shapes their behavior. Researcher: curious, thorough, cites sources. Analyst: practical, focused on what matters for job seekers. Writer: clear, structured, student-friendly tone.' },
            { n: '3', title: 'Define tasks with expected outputs', body: "Be specific about expected_output for each task. 'A bulleted list of 7 key findings with source citations' is better than 'a research summary'. The expected_output shapes what the agent produces." },
            { n: '4', title: 'Run and refine', body: "crew.kickoff(inputs={'topic': 'your chosen technology'}). Read the output critically. Adjust agent backstories and task descriptions based on what was missing or wrong. Iterate 2-3 times." },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Groq free tier + Serper 100 free searches/month</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>The most important field in CrewAI is expected_output in each Task. This field tells the agent exactly what format and content to produce — it functions like a rubric for grading the output. A vague expected_output produces vague results. Write it like you would write acceptance criteria: 'A structured markdown document with: an overview section (3-4 sentences), 5 numbered key findings each with one cited source, and a final section listing 3 recommended learning resources.'</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/agents/langgraph')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> LangGraph
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/agents/autogen')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            AutoGen <ChevronRight size={14} />
          </button>
        </div>

      </div>
      <ScrollToTop />
    </div>
  )
}

function Block({ title, titleColor, dark, border, card, children }) {
  return (
    <div style={{ background: card, border: `1px solid ${border}`, borderRadius: 14, padding: '1.375rem', backdropFilter: 'blur(8px)', marginBottom: '1.25rem' }}>
      {title && <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.14em', color: titleColor, textTransform: 'uppercase', paddingBottom: '0.75rem', marginBottom: '1rem', borderBottom: `1px solid ${titleColor}20` }}>{title}</div>}
      {children}
    </div>
  )
}

function VideoCard({ v, dark, txt, muted }) {
  return (
    <a href={v.url} target="_blank" rel="noopener noreferrer"
      style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1.125rem', borderRadius: 11, textDecoration: 'none', background: dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.16)', marginBottom: '0.625rem', transition: 'background 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.09)'}
      onMouseLeave={e => e.currentTarget.style.background = dark ? 'rgba(239,68,68,0.07)' : 'rgba(239,68,68,0.05)'}
    >
      <div style={{ width: 36, height: 36, borderRadius: 8, background: '#EF4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Play size={13} color="#fff" fill="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '0.875rem', fontWeight: 700, color: txt }}>{v.label}</div>
        {(v.dur || v.note) && <div style={{ fontSize: '0.7rem', color: muted, marginTop: 2 }}>{[v.dur, v.note].filter(Boolean).join(' · ')}</div>}
      </div>
      <ExternalLink size={12} color={muted} />
    </a>
  )
}

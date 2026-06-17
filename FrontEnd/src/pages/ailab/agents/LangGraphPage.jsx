import { useNavigate } from 'react-router-dom'
import { useTheme } from '../../../context/ThemeContext'
import { ArrowLeft, Sun, Moon, Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollToTop from '../../../components/ScrollToTop'
import { InfoBox, Steps, Compare, SubHead, CardGrid, P } from '../helpers'

const CYAN = '#00D9FF'
const color = '#EC4899'

export default function LangGraphPage() {
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
            <div style={{ width: 60, height: 60, borderRadius: 15, background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', border: `1.5px solid ${color}28`, flexShrink: 0 }}>🕸️</div>
            <div style={{ flex: 1 }}>
              <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: 'clamp(1.1rem,3vw,1.6rem)', color: txt, margin: '0 0 0.25rem' }}>LangGraph — Build Stateful AI Agents as Graphs</h1>
              <p style={{ fontSize: '0.95rem', color: sub, margin: 0 }}>When your AI needs to loop, branch, and remember state</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {[['✓ FREE', '#4ADE80'], ['Built on LangChain', color], ['Multi-agent orchestration', muted]].map(([l, c]) => (
              <span key={l} style={{ fontSize: '0.68rem', fontFamily: "'Share Tech Mono', monospace", letterSpacing: '0.06em', padding: '0.22rem 0.65rem', borderRadius: 6, background: `${c}14`, color: c, border: `1px solid ${c}28` }}>{l}</span>
            ))}
          </div>
          <p style={{ ...P(sub), margin: 0 }}>LangGraph is LangChain's framework for building stateful, multi-step AI agents. Where a basic LangChain chain runs linearly (input → step 1 → step 2 → output), LangGraph models agent workflows as graphs: nodes are functions or LLM calls, edges are transitions between them, and the state is a typed dictionary that persists across every node. This graph structure enables loops (an agent keeps trying until it succeeds), branches (different paths based on LLM output), parallel execution (multiple nodes running simultaneously), and persistent memory (state saved between user sessions). LangGraph powers the backend of many production AI assistants including Claude's computer use capability and complex multi-agent research systems.</p>
        </div>

        {/* Videos */}
        <Block title="Watch first" titleColor="#EF4444" dark={dark} border={border} card={card}>
          {[
            { label: 'LangGraph Complete Course for Beginners — Complex AI Agents with Python', url: 'https://www.youtube.com/watch?v=jGg_1h0qzaM', dur: '~2 hrs', note: 'Full course — state, nodes, edges, cycles, checkpointing from scratch' },
            { label: 'Build Powerful AI Agents with LangGraph — Beginner Masterclass 2025', url: 'https://www.youtube.com/watch?v=pTN95F3sZG0', dur: '~90 min', note: 'ReAct agents, multi-agent systems, human-in-the-loop — practical builds' },
            { label: 'LangGraph Tutorial for Beginners: Build Your First AI Agent', url: 'https://www.youtube.com/watch?v=UklCxmEvz2w', dur: '~30 min', note: 'Shortest path to a working LangGraph agent — best quick start' },
          ].map((v, i) => <VideoCard key={i} v={v} dark={dark} txt={txt} muted={muted} />)}
        </Block>

        {/* Why graphs instead of chains */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Why graphs instead of chains" color={color} />
          <InfoBox color={color} dark={dark}>A chain runs once, linearly. An agent needs to run in a loop: try something, see if it worked, try again or continue. LangGraph models this as a cycle in the graph — an edge that points back to an earlier node. The agent continues looping until a condition is met (the task is done, max iterations reached, the LLM decides to stop). This loop capability is what separates simple chains from real agents.</InfoBox>
          <p style={{ ...P(sub), marginBottom: 0 }}>The key concept in LangGraph is State — a typed Python dictionary that gets passed between every node in the graph. Each node reads from state, does work, and writes updates back to state. This means every node knows the full context of everything that happened before it. Compare this to a function that only knows its own arguments — graph state is like a shared whiteboard that all nodes can read and write. This state persistence is also what enables checkpointing: saving the full agent state to a database so it can be paused, resumed, or replayed.</p>
        </Block>

        {/* Core building blocks */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Core building blocks" color={color} />
          <CardGrid dark={dark} border={border} color={color} items={[
            { name: 'State (TypedDict)', desc: 'A typed dictionary defining what information flows through the graph. Every node reads inputs from state and writes outputs back. Define it once; every node uses the same schema.' },
            { name: 'Nodes', desc: 'Python functions or LLM calls. Each node takes the current state as input and returns a dict of state updates. Can do anything: call an LLM, query a database, run a tool, make an API call.' },
            { name: 'Edges', desc: 'Connections between nodes. Regular edges always transition. Conditional edges (add_conditional_edges) use a routing function to choose the next node based on current state — the branch/loop mechanism.' },
            { name: 'StateGraph', desc: 'The graph itself. Add nodes with graph.add_node(). Add edges with graph.add_edge() or graph.add_conditional_edges(). Set entry point. Compile to a runnable.' },
            { name: 'Checkpointing', desc: 'Persist state to SQLite or Postgres between invocations. Enables: pausing an agent mid-task, resuming after failure, human-in-the-loop approval steps, full audit trail of agent actions.' },
            { name: 'Human-in-the-loop', desc: 'Interrupt the graph before critical actions. Show the human what the agent plans to do. Continue or modify based on human input. Essential for production agents taking real-world actions.' },
          ]} />
        </Block>

        {/* Building a ReAct agent */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Building a ReAct agent with LangGraph" color={color} />
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Define the state', body: "from typing import TypedDict, Annotated\nfrom langgraph.graph import StateGraph, END\nfrom langgraph.graph.message import add_messages\nclass AgentState(TypedDict):\n    messages: Annotated[list, add_messages]\n# add_messages is a reducer — it appends new messages instead of replacing" },
            { n: '2', title: 'Create agent and tools nodes', body: "def call_llm(state):\n    response = llm_with_tools.invoke(state['messages'])\n    return {'messages': [response]}\ndef run_tools(state):\n    tool_calls = state['messages'][-1].tool_calls\n    results = tool_executor.invoke(tool_calls)\n    return {'messages': results}" },
            { n: '3', title: 'Build the graph', body: "graph = StateGraph(AgentState)\ngraph.add_node('agent', call_llm)\ngraph.add_node('tools', run_tools)\ngraph.set_entry_point('agent')\ngraph.add_conditional_edges('agent',\n    lambda s: 'tools' if s['messages'][-1].tool_calls else END)\ngraph.add_edge('tools', 'agent')  # Loop back after tools\napp = graph.compile()" },
            { n: '4', title: 'Add checkpointing', body: "from langgraph.checkpoint.sqlite import SqliteSaver\nmemory = SqliteSaver.from_conn_string(':memory:')\napp = graph.compile(checkpointer=memory)\n# Now every invocation saves state. Use thread_id for separate conversations." },
            { n: '5', title: 'Invoke with thread', body: "config = {'configurable': {'thread_id': 'user-123'}}\nresult = app.invoke({'messages': [('user', 'Research the latest news on AI agents')]}, config)\n# The thread_id makes this resumable — invoke again with the same thread to continue" },
          ]} />
        </Block>

        {/* LangGraph vs LangChain chains */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="LangGraph vs LangChain chains" color={color} />
          <Compare dark={dark} border={border} color={color} items={[
            { label: 'When to use LangChain chains', badge: 'Simple, linear tasks', body: 'For tasks that run once, start to finish without loops: summarize a document, answer a question from retrieved context, extract structured data from text. LCEL chains are simpler, faster to build, and easier to debug for linear workflows.' },
            { label: 'When to use LangGraph', badge: 'Iterative, stateful tasks', body: "For tasks that need loops (retry until success), branches (different paths based on output), multi-agent coordination (Agent A passes work to Agent B), or human approval steps. Any agent that needs to 'think, act, observe, think again' needs LangGraph." },
            { label: 'State management', badge: 'LangGraph advantage', body: "LangGraph's typed state with reducers is explicit and debuggable. You always know what's in state because you defined the TypedDict. LangChain's memory abstractions are less transparent — harder to inspect and debug when something unexpected is stored." },
            { label: 'Production reliability', badge: 'LangGraph advantage', body: 'Checkpointing means failed runs can be resumed from the last successful node. Human-in-the-loop means critical actions require approval. These two features make the difference between an impressive demo and a production-reliable agent.' },
          ]} />
        </Block>

        {/* Multi-agent systems */}
        <Block dark={dark} border={border} card={card}>
          <SubHead label="Multi-agent systems with LangGraph" color={color} />
          <p style={{ ...P(sub) }}>A multi-agent system is a LangGraph where different nodes are different specialized agents. A Supervisor agent routes work to specialist agents (researcher, coder, writer). Each specialist executes their part, updates shared state, and hands back to the supervisor. LangGraph's graph structure makes these coordination patterns explicit and debuggable.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Define the supervisor', body: 'The supervisor node is an LLM call that reads the task and current state, then decides which specialist to call next (or declares the task complete). Its decision is a conditional edge in the graph.' },
            { n: '2', title: 'Define specialist agents as nodes', body: 'Each specialist is a node: researcher (web search + summarize), coder (write and execute code), writer (format final output). Each reads from shared state and writes its results back.' },
            { n: '3', title: "Connect with conditional edges", body: "graph.add_conditional_edges('supervisor', route_to_specialist, {'researcher': 'researcher', 'coder': 'coder', 'writer': 'writer', 'FINISH': END}). The supervisor's output string determines which node runs next." },
          ]} />
        </Block>

        {/* What you can do */}
        <Block title="What you can do" titleColor={color} dark={dark} border={border} card={card}>
          {[
            'Build agents that loop — try, check result, retry — instead of running once and stopping',
            'Create multi-step research agents that plan, search, synthesize, and refine iteratively',
            'Add human-in-the-loop approval before your agent takes irreversible actions',
            'Persist full agent state to a database so agents can be paused, resumed, and audited',
            'Orchestrate multiple specialized agents with a supervisor that routes work between them',
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
            <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 900, fontSize: '0.78rem', letterSpacing: '0.08em', color }}>PROJECT — Build a Research Agent</span>
          </div>
          <p style={{ fontSize: '0.9rem', color: txt, lineHeight: 1.8, margin: '0 0 1rem' }}>Create a LangGraph agent that researches a topic by: (1) breaking the question into 3 sub-questions, (2) searching the web (or a document set) for each sub-question, (3) synthesizing the results into a structured answer. The agent loops until it has answers for all sub-questions. Use Groq's free API. The graph should have at least 3 nodes: planner, researcher, synthesizer.</p>
          <Steps dark={dark} border={border} color={color} items={[
            { n: '1', title: 'Install and set up', body: 'pip install langgraph langchain langchain-groq python-dotenv. Set GROQ_API_KEY in .env.' },
            { n: '2', title: 'Define state and nodes', body: 'State holds: original question, sub-questions list, research results dict, final answer. Nodes: planner (LLM splits question), researcher (LLM searches/retrieves for one sub-question), synthesizer (LLM combines all results).' },
            { n: '3', title: 'Build the routing logic', body: 'After researcher node: if all sub-questions answered → synthesizer. If more sub-questions remain → researcher again (loop). The conditional edge makes the loop work.' },
            { n: '4', title: 'Add visualization', body: 'print(app.get_graph().draw_ascii()) to see the graph structure. LangGraph can also generate Mermaid diagrams. Visualizing the graph is the best way to verify your structure is correct.' },
          ]} />
          <div style={{ padding: '0.625rem 0.875rem', borderRadius: 8, background: dark ? 'rgba(245,158,11,0.08)' : 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)', marginTop: '0.875rem' }}>
            <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', color: '#F59E0B', letterSpacing: '0.08em' }}>TOTAL COST: ₹0 — Groq free tier, LangGraph open source</span>
          </div>
        </div>

        {/* Tip */}
        <div style={{ padding: '1.125rem 1.25rem', borderRadius: 14, background: dark ? 'rgba(245,158,11,0.07)' : 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', marginBottom: '1.25rem' }}>
          <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.12em', color: '#F59E0B', marginBottom: '0.5rem' }}>⚡ PRO TIP</div>
          <p style={{ fontSize: '0.875rem', color: sub, lineHeight: 1.75, margin: 0 }}>Start with LangGraph's built-in create_react_agent() function before building custom graphs. It creates a working ReAct agent (reason → act → observe loop) in 3 lines. Once you understand how that graph works (read its source code with inspect.getsource()), you will understand how to build custom graphs from scratch. Learning by modifying a working example is much faster than building from a blank file.</p>
        </div>

        {/* Nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2rem' }}>
          <button onClick={() => navigate('/ai-lab/agents/langchain')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            <ChevronLeft size={14} /> LangChain
          </button>
          <button onClick={() => navigate('/ai-lab')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: `1px solid ${CYAN}35`, borderRadius: 8, padding: '0.6rem 1.25rem', cursor: 'pointer', color: CYAN, fontFamily: "'Share Tech Mono', monospace", fontSize: '0.65rem' }}>
            <ArrowLeft size={12} /> AI Lab
          </button>
          <button onClick={() => navigate('/ai-lab/agents/crewai')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.65rem 1.1rem', borderRadius: 10, border: `1px solid ${border}`, background: 'none', cursor: 'pointer', color: sub, fontFamily: "'Rajdhani', sans-serif", fontSize: '0.875rem', fontWeight: 600 }}>
            CrewAI <ChevronRight size={14} />
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

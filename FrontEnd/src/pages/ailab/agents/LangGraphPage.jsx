import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#EC4899'

export default function LangGraphPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Agents">
      <ToolHeader
        icon="🕸️"
        title="LangGraph — Build Stateful AI Agents as Graphs"
        tagline="When your AI needs to loop, branch, and remember state"
        badges={[['✓ FREE', '#4ADE80'], ['Built on LangChain', color], ['Multi-agent orchestration', 'var(--text-muted)']]}
        overview={"LangGraph is LangChain's framework for building stateful, multi-step AI agents. Where a basic LangChain chain runs linearly (input → step 1 → step 2 → output), LangGraph models agent workflows as graphs: nodes are functions or LLM calls, edges are transitions between them, and the state is a typed dictionary that persists across every node. This graph structure enables loops (an agent keeps trying until it succeeds), branches (different paths based on LLM output), parallel execution (multiple nodes running simultaneously), and persistent memory (state saved between user sessions). LangGraph powers the backend of many production AI assistants including Claude's computer use capability and complex multi-agent research systems."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'LangGraph Complete Course for Beginners — Complex AI Agents with Python', url: 'https://www.youtube.com/watch?v=jGg_1h0qzaM', dur: '~2 hrs', note: 'Full course — state, nodes, edges, cycles, checkpointing from scratch' },
            { label: 'Build Powerful AI Agents with LangGraph — Beginner Masterclass 2025', url: 'https://www.youtube.com/watch?v=pTN95F3sZG0', dur: '~90 min', note: 'ReAct agents, multi-agent systems, human-in-the-loop — practical builds' },
            { label: 'LangGraph Tutorial for Beginners: Build Your First AI Agent', url: 'https://www.youtube.com/watch?v=UklCxmEvz2w', dur: '~30 min', note: 'Shortest path to a working LangGraph agent — best quick start' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why graphs instead of chains" color={color} />
          <InfoBox color={color}>A chain runs once, linearly. An agent needs to run in a loop: try something, see if it worked, try again or continue. LangGraph models this as a cycle in the graph — an edge that points back to an earlier node. The agent continues looping until a condition is met (the task is done, max iterations reached, the LLM decides to stop). This loop capability is what separates simple chains from real agents.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The key concept in LangGraph is State — a typed Python dictionary that gets passed between every node in the graph. Each node reads from state, does work, and writes updates back to state. This means every node knows the full context of everything that happened before it. Compare this to a function that only knows its own arguments — graph state is like a shared whiteboard that all nodes can read and write. This state persistence is also what enables checkpointing: saving the full agent state to a database so it can be paused, resumed, or replayed.</p>
        </Block>
        <Block>
          <SubHead label="Core building blocks" color={color} />
          <CardGrid color={color} items={[
            { name: 'State (TypedDict)', desc: 'A typed dictionary defining what information flows through the graph. Every node reads inputs from state and writes outputs back. Define it once; every node uses the same schema.' },
            { name: 'Nodes', desc: 'Python functions or LLM calls. Each node takes the current state as input and returns a dict of state updates. Can do anything: call an LLM, query a database, run a tool, make an API call.' },
            { name: 'Edges', desc: 'Connections between nodes. Regular edges always transition. Conditional edges (add_conditional_edges) use a routing function to choose the next node based on current state — the branch/loop mechanism.' },
            { name: 'StateGraph', desc: 'The graph itself. Add nodes with graph.add_node(). Add edges with graph.add_edge() or graph.add_conditional_edges(). Set entry point. Compile to a runnable.' },
            { name: 'Checkpointing', desc: 'Persist state to SQLite or Postgres between invocations. Enables: pausing an agent mid-task, resuming after failure, human-in-the-loop approval steps, full audit trail of agent actions.' },
            { name: 'Human-in-the-loop', desc: 'Interrupt the graph before critical actions. Show the human what the agent plans to do. Continue or modify based on human input. Essential for production agents taking real-world actions.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Building a ReAct agent with LangGraph" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Define the state', body: "from typing import TypedDict, Annotated\nfrom langgraph.graph import StateGraph, END\nfrom langgraph.graph.message import add_messages\nclass AgentState(TypedDict):\n    messages: Annotated[list, add_messages]\n# add_messages is a reducer — it appends new messages instead of replacing" },
            { n: '2', title: 'Create agent and tools nodes', body: "def call_llm(state):\n    response = llm_with_tools.invoke(state['messages'])\n    return {'messages': [response]}\ndef run_tools(state):\n    tool_calls = state['messages'][-1].tool_calls\n    results = tool_executor.invoke(tool_calls)\n    return {'messages': results}" },
            { n: '3', title: 'Build the graph', body: "graph = StateGraph(AgentState)\ngraph.add_node('agent', call_llm)\ngraph.add_node('tools', run_tools)\ngraph.set_entry_point('agent')\ngraph.add_conditional_edges('agent',\n    lambda s: 'tools' if s['messages'][-1].tool_calls else END)\ngraph.add_edge('tools', 'agent')  # Loop back after tools\napp = graph.compile()" },
            { n: '4', title: 'Add checkpointing', body: "from langgraph.checkpoint.sqlite import SqliteSaver\nmemory = SqliteSaver.from_conn_string(':memory:')\napp = graph.compile(checkpointer=memory)\n# Now every invocation saves state. Use thread_id for separate conversations." },
            { n: '5', title: 'Invoke with thread', body: "config = {'configurable': {'thread_id': 'user-123'}}\nresult = app.invoke({'messages': [('user', 'Research the latest news on AI agents')]}, config)\n# The thread_id makes this resumable — invoke again with the same thread to continue" },
          ]} />
        </Block>
        <Block>
          <SubHead label="LangGraph vs LangChain chains" color={color} />
          <Compare color={color} items={[
            { label: 'When to use LangChain chains', badge: 'Simple, linear tasks', body: 'For tasks that run once, start to finish without loops: summarize a document, answer a question from retrieved context, extract structured data from text. LCEL chains are simpler, faster to build, and easier to debug for linear workflows.' },
            { label: 'When to use LangGraph', badge: 'Iterative, stateful tasks', body: "For tasks that need loops (retry until success), branches (different paths based on output), multi-agent coordination (Agent A passes work to Agent B), or human approval steps. Any agent that needs to 'think, act, observe, think again' needs LangGraph." },
            { label: 'State management', badge: 'LangGraph advantage', body: "LangGraph's typed state with reducers is explicit and debuggable. You always know what's in state because you defined the TypedDict. LangChain's memory abstractions are less transparent — harder to inspect and debug when something unexpected is stored." },
            { label: 'Production reliability', badge: 'LangGraph advantage', body: 'Checkpointing means failed runs can be resumed from the last successful node. Human-in-the-loop means critical actions require approval. These two features make the difference between an impressive demo and a production-reliable agent.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Multi-agent systems with LangGraph" color={color} />
          <p className="tool-layout-block__para">A multi-agent system is a LangGraph where different nodes are different specialized agents. A Supervisor agent routes work to specialist agents (researcher, coder, writer). Each specialist executes their part, updates shared state, and hands back to the supervisor. LangGraph's graph structure makes these coordination patterns explicit and debuggable.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Define the supervisor', body: 'The supervisor node is an LLM call that reads the task and current state, then decides which specialist to call next (or declares the task complete). Its decision is a conditional edge in the graph.' },
            { n: '2', title: 'Define specialist agents as nodes', body: 'Each specialist is a node: researcher (web search + summarize), coder (write and execute code), writer (format final output). Each reads from shared state and writes its results back.' },
            { n: '3', title: "Connect with conditional edges", body: "graph.add_conditional_edges('supervisor', route_to_specialist, {'researcher': 'researcher', 'coder': 'coder', 'writer': 'writer', 'FINISH': END}). The supervisor's output string determines which node runs next." },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Build agents that loop — try, check result, retry — instead of running once and stopping',
            'Create multi-step research agents that plan, search, synthesize, and refine iteratively',
            'Add human-in-the-loop approval before your agent takes irreversible actions',
            'Persist full agent state to a database so agents can be paused, resumed, and audited',
            'Orchestrate multiple specialized agents with a supervisor that routes work between them',
        ]} />
      </Block>
        <ProjectTask
        title={"Build a Research Agent"}
        description={"Create a LangGraph agent that researches a topic by: (1) breaking the question into 3 sub-questions, (2) searching the web (or a document set) for each sub-question, (3) synthesizing the results into a structured answer. The agent loops until it has answers for all sub-questions. Use Groq's free API. The graph should have at least 3 nodes: planner, researcher, synthesizer."}
        costNote={"TOTAL COST: ₹0 — Groq free tier, LangGraph open source"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Install and set up', body: 'pip install langgraph langchain langchain-groq python-dotenv. Set GROQ_API_KEY in .env.' },
            { n: '2', title: 'Define state and nodes', body: 'State holds: original question, sub-questions list, research results dict, final answer. Nodes: planner (LLM splits question), researcher (LLM searches/retrieves for one sub-question), synthesizer (LLM combines all results).' },
            { n: '3', title: 'Build the routing logic', body: 'After researcher node: if all sub-questions answered → synthesizer. If more sub-questions remain → researcher again (loop). The conditional edge makes the loop work.' },
            { n: '4', title: 'Add visualization', body: 'print(app.get_graph().draw_ascii()) to see the graph structure. LangGraph can also generate Mermaid diagrams. Visualizing the graph is the best way to verify your structure is correct.' },
          ]} />
      </ProjectTask>
        <ProTip>
        Start with LangGraph's built-in create_react_agent() function before building custom graphs. It creates a working ReAct agent (reason → act → observe loop) in 3 lines. Once you understand how that graph works (read its source code with inspect.getsource()), you will understand how to build custom graphs from scratch. Learning by modifying a working example is much faster than building from a blank file.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/agents/langchain', label: 'LangChain' }}
        next={{ path: '/ai-lab/agents/crewai', label: 'CrewAI' }}
      />
    </ToolPageShell>
  )
}

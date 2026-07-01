import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#EC4899'

export default function CrewAIPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Agents">
      <ToolHeader
        icon="👥"
        title="CrewAI — Orchestrate AI Agents as a Team"
        tagline="Role-based multi-agent collaboration for complex tasks"
        badges={[['✓ FREE', '#4ADE80'], ['Open source', color], ['Multi-agent framework', 'var(--text-muted)']]}
        overview={"CrewAI is a Python framework for building multi-agent systems where each AI agent has a defined role, goal, and set of tools — like assembling a team of specialists. A market research task might involve a Researcher agent (finding information), an Analyst agent (interpreting data), and a Writer agent (producing the final report). Each agent works autonomously toward its assigned task, can use tools (web search, code execution, file reading), and passes results to the next agent. CrewAI abstracts away the complexity of orchestrating multiple LLM calls with context management, making it accessible to build powerful multi-agent pipelines without deep knowledge of agent internals. It is one of the fastest-growing AI frameworks with strong community support."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'CrewAI Tutorial: Multiple Agents Working Together in Python', url: 'https://www.youtube.com/watch?v=I90xJlzAUW0', dur: '~30 min', note: 'Best 2025 intro — agents, tasks, tools, and crews in Python' },
            { label: 'Build a Multi-Agent System with CrewAI — Agentic AI Tutorial', url: 'https://www.youtube.com/watch?v=qsrl2DHYi1Y', dur: '~25 min', note: 'End-to-end build — researcher, analyst, writer crew from scratch' },
            { label: 'Gen AI Project: Build an AI Research Assistant with CrewAI', url: 'https://www.youtube.com/watch?v=VXxge_ra3rM', dur: '~30 min', note: 'Real project — research crew with web search tools and output' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="The core model: Agents, Tasks, Tools, Crew" color={color} />
          <InfoBox color={color}>CrewAI has four core building blocks. Agent: an AI with a role, goal, and backstory. Task: work to be done, with a description, expected output, and assigned agent. Tool: a function the agent can call (web search, file read, code run). Crew: the orchestrator that manages agents, assigns tasks, and coordinates the workflow. You define the what (tasks) and who (agents); CrewAI handles the how.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The role/goal/backstory pattern is not just metadata — it is injected into the system prompt for each agent. An agent with role="Senior Python Developer", goal="Write clean, well-tested code", backstory="You have 10 years of experience and follow SOLID principles" will produce noticeably different code than an agent with no context. The backstory shapes the LLM's behavior the same way a system prompt does. This is CrewAI's key design insight: personas produce better specialized outputs than generic instructions.</p>
        </Block>
        <Block>
          <SubHead label="Building a simple crew" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install CrewAI', body: 'pip install crewai crewai-tools\nFor Groq backend (free): pip install langchain-groq' },
            { n: '2', title: 'Define your agents', body: "from crewai import Agent\nresearcher = Agent(\n    role='Research Analyst',\n    goal='Find accurate, current information on the given topic',\n    backstory='You are a meticulous researcher who always cites sources and verifies claims.',\n    verbose=True,\n    allow_delegation=False,\n    llm=llm  # Pass your ChatGroq or ChatOpenAI instance\n)" },
            { n: '3', title: 'Define tasks', body: "from crewai import Task\nresearch_task = Task(\n    description='Research the current state of {topic}. Find key developments, main players, and practical applications.',\n    expected_output='A structured report with 5 key findings, each with supporting evidence.',\n    agent=researcher\n)" },
            { n: '4', title: 'Assemble the crew', body: "from crewai import Crew, Process\ncrew = Crew(\n    agents=[researcher, writer],\n    tasks=[research_task, writing_task],\n    process=Process.sequential,  # or Process.hierarchical\n    verbose=True\n)" },
            { n: '5', title: 'Kick off the crew', body: "result = crew.kickoff(inputs={'topic': 'AI coding assistants in 2025'})\nprint(result)\nThe crew runs each task in order, passing output from the researcher to the writer automatically." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Process types" color={color} />
          <Compare color={color} items={[
            { label: 'Sequential process', badge: 'Most common', body: 'Tasks run one after another in the order defined. Output from each task is passed as context to the next. Best for: pipelines where each step depends on the previous. Research → Analysis → Writing is a natural sequential flow.' },
            { label: 'Hierarchical process', badge: 'Manager-led', body: 'A manager agent (you define it or CrewAI creates one) coordinates the team. It delegates tasks, reviews outputs, and can re-assign work. Closer to how real teams work. Best for: complex tasks where quality review matters.' },
            { label: 'Parallel tasks', badge: 'Multiple agents simultaneously', body: "Mark tasks as async_execution=True to run them in parallel. A crew can research multiple topics simultaneously, then synthesize. Best for: independent tasks that do not depend on each other's outputs." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Built-in tools" color={color} />
          <CardGrid color={color} items={[
            { name: 'SerperDevTool', desc: 'Web search via Serper API (100 free searches/month). Gives agents access to current web information. Essential for research agents.' },
            { name: 'WebsiteSearchTool', desc: 'Search and extract content from a specific website URL. Give an agent a documentation site and let it find answers there.' },
            { name: 'FileReadTool / FileWriteTool', desc: 'Read from and write to files. Agents can read your local documents, produce output files, and collaborate through shared files.' },
            { name: 'CodeInterpreterTool', desc: 'Execute Python code and return the output. Agents can write code and run it to validate logic, analyze data, or generate artifacts.' },
            { name: 'DirectoryReadTool', desc: 'List and read files in a directory. Useful for agents that need to understand a codebase or process a folder of documents.' },
            { name: 'Custom tools (@tool)', desc: "Decorate any Python function with @tool. The function's docstring becomes the tool description — the agent reads it to know when to use this tool. Simple to add domain-specific capabilities." },
          ]} />
        </Block>
        <Block>
          <SubHead label="CrewAI vs LangGraph" color={color} />
          <Compare color={color} items={[
            { label: 'Abstraction level', badge: 'CrewAI higher-level', body: 'CrewAI hides agent loop internals — you define roles and tasks, not graph nodes and edges. Faster to get a working multi-agent system. Less control over exact agent behavior. LangGraph exposes the full graph structure — more control, more complexity.' },
            { label: 'Use case fit', badge: 'Different sweet spots', body: "CrewAI excels at role-based team workflows: researcher + analyst + writer patterns. LangGraph excels at custom agent loops with complex branching, human-in-the-loop, and checkpointing. Choose based on whether your workflow fits the team metaphor (CrewAI) or needs custom state management (LangGraph)." },
            { label: 'Debugging', badge: 'LangGraph wins', body: "LangGraph's explicit graph with visible state is easier to debug — you see exactly what state each node received and produced. CrewAI's abstraction makes debugging harder when agents behave unexpectedly. Add verbose=True to every agent and crew for more visibility." },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Build a research + analysis + writing pipeline with 3 specialized AI agents in under 50 lines',
            'Give agents access to web search, file reading, and code execution with built-in tools',
            'Run multiple research agents in parallel on different subtopics, then synthesize their findings',
            'Use the role/goal/backstory pattern to get specialized, high-quality outputs from each agent',
            'Build content pipelines, competitive analysis tools, report generators, and research assistants',
        ]} />
      </Block>
        <ProjectTask
        title={"Build a Tech Research Crew"}
        description={"Create a 3-agent CrewAI crew to research any technology topic: (1) Researcher agent: finds current information, key developments, main tools (uses SerperDevTool for web search), (2) Analyst agent: evaluates the findings and identifies what a student should prioritize learning, (3) Writer agent: produces a structured 'learning guide' from the analysis. Run it on a technology you want to learn. The output is your actual learning roadmap."}
        costNote={"TOTAL COST: ₹0 — Groq free tier + Serper 100 free searches/month"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Set up environment', body: 'pip install crewai crewai-tools langchain-groq. Get a free Serper API key at serper.dev (100 free searches). Set GROQ_API_KEY and SERPER_API_KEY in .env.' },
            { n: '2', title: 'Define 3 agents with distinct personas', body: 'Each agent needs a specific role, clear goal, and backstory that shapes their behavior. Researcher: curious, thorough, cites sources. Analyst: practical, focused on what matters for job seekers. Writer: clear, structured, student-friendly tone.' },
            { n: '3', title: 'Define tasks with expected outputs', body: "Be specific about expected_output for each task. 'A bulleted list of 7 key findings with source citations' is better than 'a research summary'. The expected_output shapes what the agent produces." },
            { n: '4', title: 'Run and refine', body: "crew.kickoff(inputs={'topic': 'your chosen technology'}). Read the output critically. Adjust agent backstories and task descriptions based on what was missing or wrong. Iterate 2-3 times." },
          ]} />
      </ProjectTask>
        <ProTip>
        The most important field in CrewAI is expected_output in each Task. This field tells the agent exactly what format and content to produce — it functions like a rubric for grading the output. A vague expected_output produces vague results. Write it like you would write acceptance criteria: 'A structured markdown document with: an overview section (3-4 sentences), 5 numbered key findings each with one cited source, and a final section listing 3 recommended learning resources.'
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/agents/langgraph', label: 'LangGraph' }}
        next={{ path: '/ai-lab/agents/autogen', label: 'AutoGen' }}
      />
    </ToolPageShell>
  )
}

import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F59E0B'

export default function SmolagentsPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Agents">
      <ToolHeader
        icon="🤏"
        title="smolagents — Minimal Agents That Think in Code"
        tagline="Hugging Face's barebones library for building agents in a few lines"
        badges={[['✓ FREE (OSS)', '#4ADE80'], ['huggingface.co/docs/smolagents', color], ['Python · Apache-2.0', 'var(--text-muted)']]}
        overview={"smolagents is a deliberately tiny, open-source Python library from Hugging Face for building AI agents with as little code as possible. Its defining idea is Code Agents: instead of an agent expressing its actions as JSON tool calls, smolagents' CodeAgent writes its actions as Python code snippets that are then executed. Writing actions as code is more natural for LLMs (they were trained on huge amounts of code) and far more composable — one code block can nest function calls, loop, branch, and chain tools together, which JSON tool-calling handles clumsily. The library is intentionally minimal: the core agent logic is small enough to read in one sitting, there is no heavy abstraction layer, and you can be running an agent in a handful of lines. It is model-agnostic (Hugging Face Inference API, any local Transformers model, or OpenAI/Anthropic/others via LiteLLM), ships CLI tools (smolagent, webagent), and — crucially — supports running the agent-written code in sandboxed environments (E2B, Modal, Docker) so untrusted generated code cannot harm your machine. Apache-2.0 licensed and completely free."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'smolagents tutorial — build a code agent in minutes', url: 'https://www.youtube.com/results?search_query=smolagents+tutorial', dur: 'Search', note: 'Getting started with Hugging Face smolagents and CodeAgent' },
            { label: 'smolagents — code agents vs tool-calling agents explained', url: 'https://www.youtube.com/results?search_query=smolagents+code+agent', dur: 'Search', note: 'Why writing actions as code beats JSON tool calls' },
            { label: 'Build a web-browsing agent with smolagents', url: 'https://www.youtube.com/results?search_query=smolagents+web+agent', dur: 'Search', note: 'Using the webagent CLI and search tools' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="The big idea — agents that write code, not JSON" color={color} />
          <InfoBox color={color}>{"Most agent frameworks make the LLM pick a tool and fill in a JSON blob of arguments. smolagents flips this: its CodeAgent asks the model to write a small Python snippet as its action, which is then executed. Because LLMs have seen enormous amounts of Python, this is a more natural output format for them — and it is vastly more expressive. A single code action can call several tools, loop over results, use conditionals, and combine outputs, all in one step. That composability is hard to express in flat JSON tool calls."}</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>smolagents keeps the surface area tiny on purpose — the whole point is that you can understand the agent loop rather than treat it as a black box. It works like a classic ReAct agent (reason, act, observe, repeat), except the "act" step is executable code. For safety, that code should run in a sandbox: smolagents integrates with E2B, Modal, Blaxel, and Docker so the model's generated code executes in an isolated environment, never directly against your files.</p>
          {[
            'CodeAgent — the agent writes Python code as its action, enabling nested calls, loops, and conditionals in a single step',
            'ToolCallingAgent — the classic JSON/text tool-calling style is also available when you prefer it; pick per use case',
            'Model-agnostic — Hugging Face Inference API, local Transformers models, vLLM, MLX, or OpenAI/Anthropic/Bedrock via LiteLLM',
            'Sandboxed execution — run model-generated code safely in E2B, Modal, Blaxel, or Docker instead of on your host machine',
            'CLI tools — smolagent runs a general multi-step code agent and webagent runs a browsing agent, both without writing boilerplate',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <Block>
          <SubHead label="Key features" color={color} />
          <CardGrid color={color} items={[
            { name: 'CodeAgent', desc: 'The flagship agent: the LLM writes Python snippets as actions, which are executed and observed. More natural for models and more composable than JSON tool-calling — one action can chain multiple tools together.' },
            { name: 'ToolCallingAgent', desc: 'The standard alternative that writes actions as JSON/text tool calls, exactly like most other frameworks. Same simple API — you choose whichever action style fits your task.' },
            { name: 'InferenceClientModel', desc: 'Run agents on Hugging Face\'s Inference API with a free HF token — no local GPU needed. Uses a sensible default model, or pass any model_id from the Hub (Llama, Qwen, Mistral, and more).' },
            { name: 'LiteLLM & Transformers models', desc: 'LiteLLMModel connects to OpenAI, Anthropic, Groq, and 100+ providers; TransformersModel runs any open model locally; vLLM and MLX backends are supported for performance.' },
            { name: 'Built-in tools', desc: 'Install the [toolkit] extra for ready-made tools like WebSearchTool and DuckDuckGoSearchTool. Define your own tool by decorating a Python function — the docstring tells the agent when to use it.' },
            { name: 'Sandboxed & CLI-ready', desc: 'Execute generated code safely in E2B/Modal/Docker sandboxes. Run agents straight from the terminal with the smolagent and webagent commands for quick experiments with zero boilerplate.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting started — your first code agent" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install smolagents', body: 'pip install "smolagents[toolkit]" — the [toolkit] extra bundles default tools like web search. For just the core, use pip install smolagents. Requires Python 3.10+.' },
            { n: '2', title: 'Get a free Hugging Face token', body: 'Create a free account at huggingface.co and generate an access token in Settings → Access Tokens. Set it as an environment variable: export HF_TOKEN=your_token (or set HF_TOKEN=... on Windows). This lets you use the free Inference API.' },
            { n: '3', title: 'Write a minimal agent', body: 'from smolagents import CodeAgent, WebSearchTool, InferenceClientModel\nmodel = InferenceClientModel()\nagent = CodeAgent(tools=[WebSearchTool()], model=model)\nagent.run("How many R\'s are in the word strawberry, and what is 17 * 23?")' },
            { n: '4', title: 'Watch it write code', body: 'Run the script. The agent will output the Python it wrote for each step, execute it, observe the result, and continue until it has an answer. This visible reasoning trace is the best way to learn how code agents actually work.' },
            { n: '5', title: 'Add your own tool', body: 'from smolagents import tool\n@tool\ndef get_cgpa(roll_no: str) -> float:\n    """Look up a student\'s CGPA by roll number."""\n    return records[roll_no]\nPass tools=[get_cgpa] to the CodeAgent; the agent decides when to call it.' },
            { n: '6', title: 'Swap the model or try the CLI', body: 'Use a hosted model via LiteLLM: from smolagents import LiteLLMModel; model = LiteLLMModel(model_id="groq/llama-3.1-8b-instant"). Or skip code entirely and run smolagent "your task" / webagent "your task" from the terminal.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="smolagents vs the heavier frameworks" color={color} />
          <Compare color={color} items={[
            { label: 'smolagents', badge: 'Minimal & readable', body: 'A tiny library where the agent writes code as its action. Best when you want to actually understand the agent loop, prototype fast, and avoid a heavy abstraction stack. Ideal for learning what an agent really is under the hood.' },
            { label: 'LangChain / LangGraph', badge: 'Full ecosystem', body: 'Much larger, with extensive integrations, memory, and graph-based control flow (LangGraph). Best for complex production systems that need the ecosystem — at the cost of a steeper learning curve and more abstraction.' },
            { label: 'CrewAI / AutoGen', badge: 'Multi-agent teams', body: 'Frameworks focused on orchestrating multiple role-based agents that collaborate. Best when your problem is naturally a "team of specialists"; heavier than smolagents for a single-agent task.' },
            { label: 'When to pick smolagents', badge: 'Start small', body: 'Choose smolagents to learn agents from first principles, for scripts and quick automations, and when the code-writing action style suits the task (data wrangling, calculations, tool chaining). Graduate to a bigger framework only when you actually hit its limits.' },
          ]} />
        </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — A Research Assistant Code Agent</span></div>
          <p className="tool-layout-task__desc">Build a small code agent that answers multi-step research questions by searching the web and doing calculations on the results — e.g. "Find the population of the three largest Indian cities and compute their combined total." This is the perfect showcase for a CodeAgent: it will search, parse numbers, and add them up in a single composed code action, letting you watch code-agent composability in action. Keep it free with a Hugging Face token.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Install with the toolkit', body: 'pip install "smolagents[toolkit]". Get a free Hugging Face token and set HF_TOKEN. This gives you web search plus the free Inference API — total cost ₹0.' },
            { n: '2', title: 'Set up a CodeAgent with search', body: 'from smolagents import CodeAgent, WebSearchTool, InferenceClientModel; agent = CodeAgent(tools=[WebSearchTool()], model=InferenceClientModel()). You now have a research-capable agent.' },
            { n: '3', title: 'Ask a multi-step question', body: 'agent.run("Find the current population of Mumbai, Delhi, and Bangalore, then compute their combined total and the average."). Watch how it searches, extracts numbers, and computes — often in one code block.' },
            { n: '4', title: 'Read the reasoning trace', body: 'Study the code the agent wrote at each step. This is the single best way to learn agents: you see exactly what it decided, what code it ran, and what each tool returned.' },
            { n: '5', title: 'Add a custom tool', body: 'Write a @tool function relevant to you — e.g. convert currency, or look up something from a local CSV — and add it to the agent. Ask a question that forces the agent to combine web search with your tool.' },
            { n: '6', title: 'Sandbox it and demo', body: 'For safety with untrusted code, configure a sandbox (E2B free tier or Docker). Then wrap the agent in a Gradio text box so anyone can ask questions — a clean, explainable portfolio demo of agentic AI.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">FREE — smolagents is Apache-2.0 open source; a Hugging Face token + Inference API keeps this at ₹0</span></div>
        </div>
        <ProTip>
        The fastest way to actually understand AI agents is to run a smolagents CodeAgent and read every code snippet it writes. Because the action *is* the code — not a hidden JSON call — you see the model's reasoning made concrete: which tool it reached for, how it combined results, where it went wrong. Most people treat agent frameworks as magic black boxes and never build real intuition. smolagents is small enough to read end to end, so use it as a learning tool first: trace a few runs by hand, and the concepts of ReAct, tool use, and the observe-act loop will click in a way no amount of documentation delivers.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/agents/pydantic-ai', label: 'Pydantic AI' }}
        next={{ path: '/ai-lab', label: 'AI Lab' }}
      />
    </ToolPageShell>
  )
}

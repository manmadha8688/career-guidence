import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#EC4899'

export default function AutoGenPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Agents">
      <ToolHeader
        icon="🤖"
        title="AutoGen — Microsoft's Conversational Multi-Agent Framework"
        tagline="Agents that talk to each other to solve complex problems"
        badges={[['✓ FREE', '#4ADE80'], ['Microsoft Research', color], ['Python framework', 'var(--text-muted)']]}
        overview={"AutoGen is Microsoft Research's framework for multi-agent AI systems built around a simple, powerful idea: agents solve problems by having conversations with each other. A UserProxyAgent (representing a human or automated process) sends tasks to an AssistantAgent (an LLM). The assistant responds with a plan or code. The proxy executes the code, sees the result, and sends it back. This conversation continues until the task is done. AutoGen v0.4 (AgentChat) is a major rewrite from the original v0.2, with a cleaner API, better async support, a team-based orchestration model, and built-in support for streaming. It is particularly strong for tasks involving code generation and execution — the conversation loop means the LLM can see execution errors and fix them automatically."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'AutoGen FULL Tutorial with Python — Build AI Agent Teams!', url: 'https://www.youtube.com/watch?v=V2qZ_lgxTzg', dur: '~45 min', note: 'Most comprehensive step-by-step — AssistantAgent, UserProxy, GroupChat' },
            { label: 'Master AI Agents & AutoGen in Python — 6 Step-by-Step Projects 2025', url: 'https://www.youtube.com/watch?v=YeJG_H-sw84', dur: '~90 min', note: 'AutoGen 0.5 — six real projects covering all major patterns' },
            { label: 'Autogen Full Beginner Course', url: 'https://www.youtube.com/watch?v=JmjxwTEJSE8', dur: '~60 min', note: 'Beginner-friendly deep dive — conversation loops, code execution, tools' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="The conversational agent model" color={color} />
          <InfoBox color={color}>AutoGen's core metaphor is conversation. Every interaction is a sequence of messages between agents. An AssistantAgent thinks and responds. A UserProxyAgent executes code in the response and sends back the output. A GroupChatManager coordinates multiple agents talking to each other. The conversation continues until a termination condition is met — the task is done, max messages reached, or a specific phrase appears in a response.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The key insight is the code execution loop. When an LLM generates Python code in a response, AutoGen's UserProxyAgent can execute that code automatically, capture the output (or error), and send it back to the LLM. The LLM sees "your code produced this error" and generates a fix. This self-correcting loop continues until the code runs successfully. For data analysis, data processing, and any computational task, this is dramatically more powerful than a single LLM call.</p>
        </Block>
        <Block>
          <SubHead label="AutoGen v0.4 core components (AgentChat API)" color={color} />
          <CardGrid color={color} items={[
            { name: 'AssistantAgent', desc: 'An LLM-backed agent that responds to messages. Configured with a system message defining its role and capabilities. The "thinking" agent in most patterns.' },
            { name: 'UserProxyAgent', desc: 'Acts on behalf of a human or automated process. Can execute code blocks in LLM responses. Sends results back as the next message. Drives the conversation forward.' },
            { name: 'RoundRobinGroupChat', desc: 'A team of agents that take turns responding to messages. Each agent responds once per round. Useful for tasks benefiting from multiple independent perspectives.' },
            { name: 'SelectorGroupChat', desc: 'A team where a selector (LLM or function) chooses which agent responds next based on the conversation context. More dynamic than round-robin for complex coordination.' },
            { name: 'Termination conditions', desc: 'MaxMessageTermination (stop after N messages), TextMentionTermination (stop when agent says "TERMINATE"), ExternalTermination (stop on external signal). Control when the conversation ends.' },
            { name: 'Code executors', desc: 'LocalCommandLineCodeExecutor (runs locally), DockerCommandLineCodeExecutor (sandboxed, safer), JupyterCodeExecutor (notebook environment). Choose based on security requirements.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Building a code generation agent" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install AutoGen', body: "pip install 'autogen-agentchat==0.4.*' autogen-ext[openai]\nFor Groq: pip install langchain-groq (use via OpenAI-compatible endpoint)" },
            { n: '2', title: 'Define the model client', body: "from autogen_ext.models.openai import OpenAIChatCompletionClient\nclient = OpenAIChatCompletionClient(\n    model='llama-3.1-70b-versatile',\n    base_url='https://api.groq.com/openai/v1',\n    api_key=os.getenv('GROQ_API_KEY')\n)" },
            { n: '3', title: 'Create agents', body: "from autogen_agentchat.agents import AssistantAgent, CodeExecutorAgent\nfrom autogen_ext.code_executors.local import LocalCommandLineCodeExecutor\ncoder = AssistantAgent('coder', model_client=client, system_message='You are an expert Python developer. When given a task, write and execute Python code to complete it.')\nexecutor = CodeExecutorAgent('executor', code_executor=LocalCommandLineCodeExecutor(work_dir='./output'))" },
            { n: '4', title: 'Create a team and run', body: "from autogen_agentchat.teams import RoundRobinGroupChat\nfrom autogen_agentchat.conditions import MaxMessageTermination\nteam = RoundRobinGroupChat([coder, executor], termination_condition=MaxMessageTermination(10))\nresult = await team.run(task='Analyze the CSV file data.csv and plot a bar chart of sales by region')" },
            { n: '5', title: 'Stream responses', body: "async for message in team.run_stream(task='...'):\n    print(message)\nThe run_stream() method yields each message as it is generated — you see the agent's thinking in real time." },
          ]} />
        </Block>
        <Block>
          <SubHead label="AutoGen vs CrewAI vs LangGraph" color={color} />
          <Compare color={color} items={[
            { label: 'Core metaphor', badge: 'Different models', body: "AutoGen: agents have conversations with each other — messages drive everything. CrewAI: agents are team members with roles assigned to tasks. LangGraph: agents are nodes in a graph with explicit state. Choose based on which model fits your problem's natural structure." },
            { label: 'Code execution', badge: 'AutoGen strongest', body: "AutoGen's code execution loop (generate code → execute → see output → fix) is its strongest feature. For computational tasks, data analysis, and automated debugging, AutoGen's design is optimized for this. CrewAI and LangGraph support code execution but it requires more manual setup." },
            { label: 'Conversation control', badge: 'AutoGen most natural', body: "When the interaction between agents IS the product — debates, collaborative writing, adversarial review — AutoGen's conversation model is the most natural fit. The back-and-forth is explicit and readable." },
            { label: 'Production readiness', badge: 'LangGraph most robust', body: "For production systems requiring reliability: LangGraph's checkpointing, human-in-the-loop, and explicit state management are more battle-tested. AutoGen v0.4 is newer and still maturing for large-scale production use." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Common patterns" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'The code review pattern', body: "Coder agent writes code. Code reviewer agent reviews it and gives specific feedback. Coder revises based on feedback. Repeat until reviewer says LGTM. AutoGen's conversation structure makes this natural." },
            { n: '2', title: 'The research + synthesis pattern', body: 'Multiple researcher agents independently research different aspects of a topic. A synthesis agent reads all their outputs and writes a unified report. Use RoundRobinGroupChat so each researcher contributes.' },
            { n: '3', title: 'The critic-creator pattern', body: 'Creator generates output (code, writing, analysis). Critic evaluates it and identifies specific weaknesses. Creator revises. This adversarial loop produces higher-quality outputs than a single generation.' },
            { n: '4', title: 'The human-in-the-loop pattern', body: "UserProxyAgent with human_input_mode='ALWAYS' pauses and asks the human for approval before each step. human_input_mode='TERMINATE' only asks when the conversation ends. Use for tasks where human review matters." },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Build agents that write code, execute it, see errors, and automatically fix them in a loop',
            "Create adversarial review systems where one agent creates and another agent critiques",
            "Run multi-agent research conversations where agents build on each other's findings",
            'Automate data analysis tasks — describe what you want, AutoGen writes and runs the Python',
            'Build conversational debugging tools that explain errors and iterate toward working code',
        ]} />
      </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span>
            <span className="tool-layout-task__label">PROJECT — Automated Data Analysis</span>
          </div>
          <p className="tool-layout-task__desc">Give AutoGen a dataset (any CSV file — your project data, a Kaggle dataset, anything). Ask it to: (1) explore the data structure and statistics, (2) identify interesting patterns or correlations, (3) generate 3 visualizations, (4) write a summary of key findings. The code execution loop means AutoGen fixes its own errors. Your job is only to describe what you want and review the final output.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Set up the environment', body: "pip install 'autogen-agentchat==0.4.*' autogen-ext[openai] pandas matplotlib seaborn. Download any CSV dataset you find interesting." },
            { n: '2', title: 'Create coder and executor agents', body: 'AssistantAgent with a data scientist system message. CodeExecutorAgent with LocalCommandLineCodeExecutor pointing to a working directory. Put your CSV file in that directory.' },
            { n: '3', title: 'Write the task description', body: "Be specific: 'Analyze sales_data.csv. First print dtypes and basic statistics. Then find the top 5 products by revenue. Then plot revenue by month as a bar chart. Save the chart as analysis.png.'" },
            { n: '4', title: 'Review generated code and output', body: 'Read every code block AutoGen generated. Understand what each pandas/matplotlib call does. The analysis is the product; understanding the code is the learning.' },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">COST: Free with Groq API key — llama-3.1-70b-versatile on Groq has a generous free tier</span></div>
        </div>
        <ProTip>
        Always set work_dir in your CodeExecutor to an isolated directory, not your project root. AutoGen will create files, run scripts, and potentially modify the working directory. An isolated directory keeps your project clean and makes it easy to review everything the agent produced in one place.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/agents/crewai', label: 'CrewAI' }}
        next={{ path: '/ai-lab/agents/hermes', label: 'Hermes' }}
      />
    </ToolPageShell>
  )
}

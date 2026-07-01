import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#FF4B4B'

export default function StreamlitPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="AI App Builders">
      <ToolHeader
        icon="🌊"
        title="Streamlit — Turn Python Scripts Into Web Apps in Minutes"
        tagline="Build and share data apps, ML demos, and AI tools without HTML or JavaScript"
        badges={[['✓ 100% FREE', '#4ADE80'], ['streamlit.io', color], ['Python', 'var(--text-muted)']]}
        overview={<>Streamlit is an open-source Python framework that turns a plain Python script into a fully interactive web application — no HTML, no CSS, no JavaScript required. You write Python, add a few <code className="tool-inline-code">st.</code> calls, run one command, and your script becomes a live web app with sliders, charts, file uploads, and data tables. Streamlit was acquired by Snowflake in 2022 and is used by over 90% of Fortune 50 companies for internal data apps. For students, it is the fastest possible path from a Python script to something that looks professional and can be shared with a real URL — for free. If you can write Python, you can build a web app in Streamlit today.</>}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Streamlit Tutorial for Beginners 2025 | Full Course Step-by-Step', url: 'https://www.youtube.com/watch?v=H-JTC5P6RKU', dur: 'Full course', note: 'Complete 2025 beginner course — covers all core features step by step' },
            { label: 'Build an AI-Powered Data Dashboard with Python & Streamlit', url: 'https://www.youtube.com/watch?v=H3sZnfOXM88', dur: '~45 min', note: 'Beginner-friendly tutorial — build a real dashboard with charts and data' },
            { label: 'Streamlit Explained: Python Tutorial for Data Scientists — Arjan Codes', url: 'https://www.youtube.com/watch?v=c8QXUrvSSyg', dur: '~25 min', note: 'Clean, focused walkthrough from a respected Python educator' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Streamlit works" color={color} />
          <InfoBox color={color}>Streamlit's mental model is radically simple: every time a user interacts with your app — moves a slider, clicks a button, types in a text box — your Python script reruns from top to bottom. The UI re-renders with the new state. This means there is no event system, no callbacks, no async to learn. Just write Python that reads widget values and outputs results.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Under the hood, Streamlit runs a local web server and auto-generates a React frontend. You never touch that frontend. Your only job is the Python script. The workflow is three steps:</p>
          <Steps color={color} items={[
            { n: '1', title: 'Install and import', body: 'pip install streamlit — then import streamlit as st at the top of any Python file. That one import gives you access to every widget, chart, and layout component.' },
            { n: '2', title: 'Add st. calls to your script', body: 'Replace print() with st.write(). Add st.slider() to create a slider whose value flows into your code. Add st.line_chart(df) to render a chart from a Pandas DataFrame. The widgets are the UI — no HTML required.' },
            { n: '3', title: 'Run one command', body: 'streamlit run app.py — Streamlit opens your browser automatically and serves the app at localhost:8501. Every time you save the file, the app hot-reloads with your changes.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Key widgets and components" color={color} />
          <CardGrid color={color} items={[
            { name: 'Input widgets', desc: 'st.slider(), st.text_input(), st.selectbox(), st.checkbox(), st.button(), st.file_uploader() — every common UI control in one line of Python. Widget values are just Python variables you read directly.' },
            { name: 'Charts and data', desc: 'st.line_chart(), st.bar_chart(), st.scatter_chart() for quick charts. Full Plotly, Matplotlib, Altair, and Vega-Lite support via st.plotly_chart() and st.altair_chart() for custom visuals.' },
            { name: 'Data tables', desc: 'st.dataframe(df) renders any Pandas DataFrame as an interactive, sortable, filterable table. st.table() for static display. Pass in any pandas, numpy, or list data.' },
            { name: 'Layout components', desc: 'st.columns(), st.tabs(), st.expander(), st.sidebar — multi-column layouts, tabbed sections, collapsible panels, and a sidebar navigation panel, all in pure Python.' },
            { name: 'Session state', desc: 'st.session_state stores values across reruns — essential for chat history, multi-step forms, and any stateful interaction. Access it like a Python dict: st.session_state["key"] = value.' },
            { name: 'Caching', desc: '@st.cache_data decorator caches expensive function results (database queries, model loading, API calls) so they only run once. Prevents your app from re-fetching data on every user interaction.' },
            { name: 'File uploads', desc: 'st.file_uploader() accepts images, CSVs, PDFs, and any file type. The uploaded file becomes a Python bytes object you can pass to pandas, PIL, or any processing function.' },
            { name: 'Media display', desc: 'st.image(), st.audio(), st.video() — display generated images from Stable Diffusion, play audio from TTS models, embed video output, all with one-liners.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Building AI chatbot UIs with st.chat_message" color={color} />
          <InfoBox color={color}>Streamlit added native chat components in 2023 — st.chat_message() and st.chat_input() — which make building a ChatGPT-style UI trivially easy. You can have a working chatbot UI connected to any LLM API in under 30 lines of Python. This is now one of the most popular use cases for Streamlit in student and research projects.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The pattern is always the same: store message history in <code className="tool-inline-code">st.session_state</code>, display it with <code className="tool-inline-code">st.chat_message()</code>, capture new input with <code className="tool-inline-code">st.chat_input()</code>, call your LLM, append the response.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Initialize message history', body: 'if "messages" not in st.session_state: st.session_state.messages = [] — this creates a list that persists across reruns. Without session_state, your chat history would vanish on every interaction.' },
            { n: '2', title: 'Render existing messages', body: 'Loop over st.session_state.messages and call st.chat_message(msg["role"]) as a context manager. Role can be "user" or "assistant" — Streamlit applies preset avatars and alignment automatically.' },
            { n: '3', title: 'Capture new user input', body: 'prompt = st.chat_input("Ask me anything") — this renders a sticky input box at the bottom of the page. When the user submits, prompt contains their message and the script reruns.' },
            { n: '4', title: 'Call your LLM API', body: 'Pass the message history to OpenAI, Groq, Gemini, or any API. Use st.write_stream() to stream the response token by token — users see text appearing like in ChatGPT, not waiting for the full response.' },
            { n: '5', title: 'Append and persist', body: 'Append the user message and assistant response to st.session_state.messages. On the next rerun, the full history renders again. The chatbot now has memory for the full conversation.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Streamlit Community Cloud — free hosting in under a minute" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Streamlit Community Cloud (share.streamlit.io) lets you deploy unlimited Streamlit apps for free. Your app gets a public URL you can share with anyone — no server setup, no Docker, no cloud account required. It connects directly to your GitHub repository.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Push your app to GitHub', body: 'Create a public GitHub repository with your app.py and a requirements.txt listing your dependencies (streamlit, pandas, openai, etc.). That is the entire deployment package.' },
            { n: '2', title: 'Connect at share.streamlit.io', body: 'Sign in with GitHub. Click "New app". Select your repository, branch, and the main Python file. Streamlit Community Cloud handles containerization, dependency installation, and serving.' },
            { n: '3', title: 'Share the URL', body: 'Your app is live at yourname-appname.streamlit.app within a few minutes. Share it in your portfolio, LinkedIn, or college project submission. The app auto-updates every time you push to GitHub.' },
            { n: '4', title: 'Manage secrets securely', body: 'For API keys, use the Secrets management panel in your app dashboard — never commit keys to GitHub. Access them in code as st.secrets["OPENAI_API_KEY"]. Secrets are encrypted and never exposed.' },
          ]} />
          <div className="tool-success-note">
            <span className="tool-success-note__text">FREE TIER: Unlimited apps · 1 GB RAM per app · Auto-deploy from GitHub · Custom subdomain URL · No credit card</span>
          </div>
        </Block>
        <Block>
          <SubHead label="Streamlit vs Gradio — which one to use" color={color} />
          <Compare color={color} items={[
            { label: 'Streamlit — for apps and dashboards', badge: 'More flexible UI', body: 'Streamlit gives you full layout control: multi-page apps, sidebars, columns, tabs, custom CSS injection, and a rich component ecosystem. It is designed for data dashboards, ML experiment tracking, internal tools, and anything that needs to feel like a real application. The rerun model is simple but requires thinking about session state for complex interactions. Best for: portfolio apps, data visualizations, chatbot UIs, multi-step workflows.' },
            { label: 'Gradio — for ML model demos', badge: 'Fastest for model UIs', body: 'Gradio is optimized for one thing: wrap a Python function (your ML model) in a UI with inputs and outputs. Three lines of code. It also doubles as a REST API automatically — every Gradio app exposes a /predict endpoint. Hugging Face Spaces runs on Gradio by default. Best for: sharing a model you trained, image classification demos, audio/speech tasks, NLP model interfaces. Less flexible than Streamlit for complex app logic.' },
            { label: 'When to use both', badge: 'Real answer', body: 'Use Streamlit when you are building something users navigate through — charts, filters, multiple sections, chat history. Use Gradio when you are sharing a model: input goes in, output comes out. Many ML practitioners know both. Start with Streamlit since it covers more ground, then add Gradio when you need the instant REST API feature or are sharing on Hugging Face Spaces.' },
          ]} />
        </Block>
        <Block title="What students build with Streamlit" titleColor={color}>
          {[
            'Data analysis dashboards — upload a CSV, explore it with interactive filters and charts without writing any frontend code',
            'ML model demos — load a trained model, add sliders for parameters, show predictions live as inputs change',
            'AI chatbot UIs — wrap any LLM API (OpenAI, Gemini, Groq) in a ChatGPT-style chat interface with history',
            'Resume project showcase — deploy a working data or ML app to a public URL and link it in your portfolio',
            'Research experiment dashboards — track training runs, compare model metrics, visualize results interactively',
            'AI tool prototypes — build internal tools that use AI APIs: document summarizers, code explainers, image classifiers',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <ProjectTask
        title={"Build an AI Chatbot UI with Streamlit"}
        description={"Build a fully working AI chatbot with a ChatGPT-style interface using Streamlit and a free LLM API. Use Groq (free tier, extremely fast) or Gemini API (free tier) so the project costs nothing. By the end you will have a deployed public URL you can add to your portfolio and share with anyone — without writing a single line of HTML."}
        costNote={"TOTAL COST: ₹0 — Streamlit is open source, Community Cloud is free, Groq free tier is 14,400 requests/day"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Set up your project', body: 'Create a folder with app.py and requirements.txt. In requirements.txt add: streamlit, groq (or google-generativeai). Get a free API key from console.groq.com — the free tier is generous and responses are near-instant.' },
            { n: '2', title: 'Build the chat UI', body: 'Initialize st.session_state.messages = []. Loop over messages and render each with st.chat_message(msg["role"]). Add st.chat_input() at the bottom. The UI is complete — 10 lines of Python.' },
            { n: '3', title: 'Connect the LLM', body: 'When the user submits a message, call the Groq API with the full message history. Use st.write_stream() to stream the response. Append both the user and assistant messages to session_state. The chatbot now has memory.' },
            { n: '4', title: 'Add a system prompt control', body: 'Add st.sidebar with a st.text_area() for the system prompt. This lets the user configure the chatbot\'s persona without code changes — a recipe assistant, a code reviewer, a study tutor. Same app, different behavior.' },
            { n: '5', title: 'Deploy to Community Cloud', body: 'Push to GitHub. Go to share.streamlit.io, connect the repo, deploy. Add your Groq API key in the Secrets panel. Your chatbot is live at a public URL in under 3 minutes.' },
          ]} />
      </ProjectTask>
        <ProTip>
        The most common Streamlit mistake is ignoring the rerun model. Every widget interaction reruns your entire script — so if you load a 500 MB model inside your script body, it reloads on every button click. Fix this with <code className="tool-inline-code">@st.cache_resource</code> on model-loading functions and <code className="tool-inline-code">@st.cache_data</code> on data-fetching functions. Once you understand caching, Streamlit apps become fast and professional.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/builders/lovable', label: 'Lovable' }}
        next={{ path: '/ai-lab/coding/claude-code', label: 'Claude Code' }}
      />
    </ToolPageShell>
  )
}

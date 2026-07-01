import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F97316'

export default function GradioPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="AI App Builders">
      <ToolHeader
        icon="🎛️"
        title="Gradio — Build AI Demos in 3 Lines of Python"
        tagline="The fastest way to share ML models and AI tools as interactive web apps"
        badges={[['✓ 100% FREE', '#4ADE80'], ['gradio.app', color], ['Python + Hugging Face', 'var(--text-muted)']]}
        overview={"Gradio is an open-source Python library that lets you wrap any Python function — an ML model, a text processor, an image classifier — in a fully interactive web interface in three lines of code. No HTML, no JavaScript, no frontend experience required. You write the function, Gradio handles the UI. When Hugging Face acquired Gradio in 2021, it became the default way to share models on Hugging Face Spaces — the world's largest platform for ML demos. Today, Gradio powers over one million demos across research labs, startups, and student projects. If you have trained a model, fine-tuned an LLM, or built any AI function in Python, Gradio is how you turn it into something anyone can interact with — for free, in minutes, with a shareable public URL."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'Build A First Gradio App | Python Gradio Tutorial', url: 'https://www.youtube.com/watch?v=mB68GanHJj4', dur: 'Beginner', note: 'Hands-on first Gradio app — Interface, inputs, outputs, launch' },
            { label: 'A Practical Tutorial on Building Machine Learning Demos with Gradio', url: 'https://www.youtube.com/watch?v=97KxA1r184o', dur: 'Intermediate', note: 'End-to-end ML demo with real models — from notebook to shareable URL' },
            { label: 'Build Machine Learning Applications Easily with Gradio in Python', url: 'https://www.youtube.com/watch?v=3DGLznJorT8', dur: 'Comprehensive', note: 'Covers Interface, Blocks, components, deployment — great full walkthrough' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What Gradio actually is" color={color} />
          <InfoBox color={color}>Gradio solves one specific problem that every ML practitioner faces: you train a model, it works in your notebook — and then no one else can use it. Gradio bridges that gap. You pass your prediction function to gr.Interface(), define what goes in and what comes out, call .launch() — and your model is a live web app. The entire process can take under five minutes.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>Gradio was created by Abubakar Abid in 2019 as a PhD student at Stanford who wanted an easier way to share his models with collaborators. The core insight was radical simplicity: instead of learning web development, ML practitioners should just describe their function's input type (text, image, audio) and output type, and the library should figure out the rest. Hugging Face acquired Gradio in 2021 and integrated it directly into Hugging Face Spaces — making Gradio the native language of the world's most active ML demo community. Today it has over 1 million monthly developers building everything from research demos to production AI tools.</p>
        </Block>
        <Block>
          <SubHead label="Two APIs: Interface and Blocks" color={color} />
          <InfoBox color={color}>Gradio has two levels of abstraction. gr.Interface is the fast path: wrap a function in 3 lines, get a polished UI. gr.Blocks is the full toolkit: custom layouts, multiple tabs, conditional logic, event-driven interactions. Start with Interface. Move to Blocks when you need control.</InfoBox>
          <Compare color={color} items={[
            { label: 'gr.Interface — fastest path to a demo', badge: '3 lines of code', body: 'gr.Interface takes three arguments: fn (your prediction function), inputs (what components accept user data), and outputs (what components display results). It auto-generates a clean two-column UI with an input panel, a Submit button, and an output panel. All you define is the function signature — Gradio figures out the rest. Use it for: single-function demos, image classifiers, text transformers, audio tools, any model that takes input and returns output.' },
            { label: 'gr.Blocks — full layout control', badge: 'Custom UIs', body: 'gr.Blocks is a low-level context manager that gives you complete control over layout, state, and events. You place components explicitly: gr.Textbox(), gr.Image(), gr.Button(). You attach event handlers: btn.click(fn=my_func, inputs=[...], outputs=[...]). Blocks lets you build multi-step workflows, tabbed interfaces, side-by-side model comparisons, chatbots with history, and any layout Streamlit or a simple web app could achieve. Use it when Interface is too rigid.' },
            { label: 'Which one to start with', badge: 'Practical advice', body: 'Always start with gr.Interface. If your use case is: function goes in, result comes out — Interface handles it perfectly in under 10 lines. Migrate to Blocks when you need multiple functions on the same page, conditional visibility, custom event sequences, or a chatbot with message history. Most student projects and research demos stay in Interface their entire lifetime.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="How Gradio works — step by step" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Install in one command', body: 'pip install gradio — Gradio has no mandatory system dependencies beyond Python. It installs in under a minute and works inside Google Colab, Jupyter notebooks, and regular Python scripts without any extra configuration.' },
            { n: '2', title: 'Write your Python function', body: 'Any Python function works. def predict(text): return my_model(text). The function can load an ML model, call an API, run image processing — whatever your AI feature does. Gradio just wraps it; it does not care what is inside.' },
            { n: '3', title: 'Wrap it with gr.Interface', body: 'gr.Interface(fn=predict, inputs="text", outputs="text").launch() — these three lines are a complete, working Gradio app. The inputs and outputs are component types: "text", "image", "audio", "number", or the full component classes like gr.Textbox(), gr.Image(), gr.Slider().' },
            { n: '4', title: 'Launch locally or with a public link', body: '.launch() starts a local server at localhost:7860 and opens your browser. Add share=True (.launch(share=True)) to get a public HTTPS link that works for 72 hours — anyone on the internet can interact with your demo without you deploying anything. Perfect for quick sharing or demo sessions.' },
            { n: '5', title: 'Deploy to Hugging Face Spaces for permanent hosting', body: 'Create an app.py with your Gradio code and a requirements.txt. Push to a Hugging Face Space repository. The Space runs your app permanently, auto-scales under load, and gives you a shareable URL at huggingface.co/spaces/yourname/yourapp. Free forever, no server to maintain.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Key input and output components" color={color} />
          <CardGrid color={color} items={[
            { name: 'gr.Textbox', desc: 'Text input and output. Works for prompts, descriptions, transcriptions, code, and any string data. Supports multiline mode, placeholder text, and character limits.' },
            { name: 'gr.Image', desc: 'Upload images as input, display images as output. Supports PIL images, numpy arrays, and file paths. Perfect for image classifiers, style transfer, object detection, and computer vision demos.' },
            { name: 'gr.Audio', desc: 'Record or upload audio as input. Play back audio output. Essential for speech recognition (Whisper), text-to-speech, music generation, and audio classification models.' },
            { name: 'gr.Slider', desc: 'Numeric input with a draggable range. Use for model parameters: temperature, image size, confidence threshold, seed values. Much more intuitive than typing numbers for demos.' },
            { name: 'gr.Dropdown', desc: 'Select from a list of options. Use for model selection (choose between models), task type, language selection, or any categorical input your function accepts.' },
            { name: 'gr.Chatbot', desc: 'A chat message display component that renders a conversation history. Used inside gr.Blocks with gr.ChatInterface for building custom chatbot UIs with message bubbles.' },
            { name: 'gr.DataFrame', desc: 'Display and edit tabular data. Input and output Pandas DataFrames directly. Great for data transformation demos, CSV processing, and any tabular ML task.' },
            { name: 'gr.File', desc: 'Upload any file type as input. Returns a file path. Use for PDF processing, document summarization, batch image processing, or any demo that works with files.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="gr.ChatInterface — chatbot UIs in one line" color={color} />
          <InfoBox color={color}>gr.ChatInterface is Gradio's highest-level abstraction: you provide a function that takes a message and a history list, returns a reply string — and Gradio gives you a complete, polished chat UI. The message history, the input box, the submit button, the retry/undo controls — everything is handled for you. It is the fastest way to put an LLM behind a chat interface anywhere.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>The function signature is simple: def chat(message, history) where message is the current user input (a string) and history is a list of [user, assistant] message pairs. Return your model's reply as a string. Gradio handles the state, the display, the clearing, and the streaming if you use a generator function. You can connect this to any LLM API — Groq, OpenAI, Anthropic, Ollama, or a locally loaded Hugging Face model — in under 20 lines of Python.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Write the chat function', body: 'def respond(message, history): — inside, call your LLM API with the full history context. For Groq: format history into a messages list (role/content pairs), append the current message, call client.chat.completions.create(), return the response string.' },
            { n: '2', title: 'Wrap in ChatInterface', body: 'gr.ChatInterface(respond, title="My Chatbot", description={"Powered by LLaMA"}).launch() — that is the entire app. ChatInterface auto-generates the chat bubble UI, handles history tracking, and includes retry/undo buttons by default.' },
            { n: '3', title: 'Add streaming for real-time output', body: 'Make your function a generator: use yield instead of return. Yield each token as it arrives from the LLM stream. Gradio detects the generator and streams tokens into the chat bubble in real time — users see text appear word by word exactly like ChatGPT.' },
            { n: '4', title: 'Add a system prompt control', body: 'Add additional_inputs=[gr.Textbox(label="System Prompt")] to ChatInterface and include it as a parameter in your function. Users can configure the chatbot persona at runtime — a tutor, a code reviewer, a recipe assistant — without changing code.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Hugging Face Spaces — permanent free hosting" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Hugging Face Spaces is the standard destination for Gradio apps. A Space is a free Git repository that auto-runs your Gradio app with a persistent public URL. It auto-scales when your demo gets traffic, runs 24/7 without you managing any server, and integrates directly with Hugging Face models so you can load any of the 200K+ models from the Hub in one line of code.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Create a free Hugging Face account', body: 'Sign up at huggingface.co — free, no credit card. Create a new Space: click your profile → New Space → choose Gradio as the SDK. You get a Git repository at huggingface.co/spaces/yourname/yourspace.' },
            { n: '2', title: 'Add app.py and requirements.txt', body: 'app.py is your complete Gradio application. requirements.txt lists your Python dependencies (gradio, transformers, torch, etc.). These are the only two files required. Push them to the Space repository via Git or the web editor.' },
            { n: '3', title: 'Space builds and launches automatically', body: 'Hugging Face reads your requirements.txt, installs dependencies in a container, and runs python app.py. Your app is live at the Space URL within a few minutes. Every push to the repository auto-deploys a new version.' },
            { n: '4', title: 'Manage secrets for API keys', body: 'In your Space settings, add Repository Secrets for any API keys (GROQ_API_KEY, OPENAI_API_KEY, etc.). Access them in code as os.environ["GROQ_API_KEY"]. Never hardcode secrets in your app.py — they would be visible in the public repository.' },
            { n: '5', title: 'Share the URL', body: 'Your Space URL is permanent, shareable, and appears in Hugging Face search. Add it to your portfolio, LinkedIn, resume, and college project submissions. It is the most credible way to show a working ML project to a recruiter or professor.' },
          ]} />
          <div className="tool-success-note">
            <span className="tool-success-note__text">FREE TIER: Unlimited public Spaces · 16 GB RAM · 2 vCPUs · Auto-deploy from Git · Permanent URL · No credit card</span>
          </div>
        </Block>
        <Block>
          <SubHead label="Gradio vs Streamlit — which one to use" color={color} />
          <Compare color={color} items={[
            { label: 'Gradio — for ML model demos', badge: 'Best for models', body: 'Gradio is optimized for one thing: put a function behind a UI. Three lines of code, and your model is a live demo. It also automatically exposes a REST API endpoint — every Gradio app is also callable programmatically via /predict. The Hugging Face ecosystem runs on Gradio. Best for: image classifiers, NLP demos, audio tools, chatbots, anything where a user provides input to a model and sees output. Less suited for multi-page apps, complex navigation, or data dashboards.' },
            { label: 'Streamlit — for apps and dashboards', badge: 'More flexible UI', body: 'Streamlit gives you full application control: multi-page apps, sidebars, columns, tabs, Pandas DataFrames, Plotly charts, session state. It is designed for data dashboards, internal tools, and applications that need to feel like real software. More layout control than Gradio, larger component library, bigger community. Best for: data analysis dashboards, chatbot apps with complex UI, multi-step workflows, portfolio apps that go beyond model I/O.' },
            { label: 'When to use both', badge: 'Real answer', body: 'Use Gradio when you are sharing a model and want the demo live in under 10 minutes — especially if you are deploying to Hugging Face Spaces. Use Streamlit when you are building a product that users navigate through with charts, multiple sections, and richer UI. Many ML engineers know both. Start with Gradio for model sharing, Streamlit for app building. The two skills complement each other naturally.' },
          ]} />
        </Block>
        <Block title="What students build with Gradio" titleColor={color}>
          {[
            'Image classifiers — upload a photo, get predictions with confidence scores from a trained ResNet or EfficientNet model',
            'Chatbot demos — wrap any LLM API or locally loaded model in a gr.ChatInterface and share the URL in your portfolio',
            'Text generation demos — show off a fine-tuned language model with a text input and generated output side by side',
            'Audio transcription tools — record speech, pass to Whisper, display the transcription using gr.Audio and gr.Textbox',
            'Style transfer and image generation — upload images and show AI-generated variations with before/after comparison',
            'Research paper demos — make your academic model interactive and host on Hugging Face Spaces alongside the paper',
          ].map((item, i) => (
            <div key={i} className="tool-layout-cando-item">
              <div className="tool-layout-cando-item__dot" />
              <span className="tool-layout-cando-item__text">{item}</span>
            </div>
          ))}
        </Block>
        <ProjectTask
        title={"Build a Chatbot Demo and Host on Hugging Face Spaces"}
        description={"Build a fully working AI chatbot demo using Gradio and gr.ChatInterface, connect it to a free LLM API, and deploy it permanently to Hugging Face Spaces. By the end you will have a live, public URL with a professional-looking chatbot UI that you can show in your portfolio — built entirely for free, with under 25 lines of Python."}
        costNote={"TOTAL COST: ₹0 — Gradio open source, Hugging Face Spaces free, Groq free tier 14,400 req/day"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Set up your files', body: 'Create two files: app.py and requirements.txt. In requirements.txt add: gradio and groq (or google-generativeai). Get a free Groq API key from console.groq.com — the free tier supports 14,400 requests per day and responses are near-instant on Llama 3.' },
            { n: '2', title: 'Write the chat function', body: 'Import gradio as gr and the Groq client. Write: def respond(message, history): — format the history and current message into the Groq messages format, call client.chat.completions.create(), return response.choices[0].message.content.' },
            { n: '3', title: 'Wrap in ChatInterface', body: 'gr.ChatInterface(respond, title="My AI Assistant", description={"Powered by Llama 3 on Groq"}).launch() — run locally first (python app.py) and test the chatbot in your browser at localhost:7860.' },
            { n: '4', title: 'Create a Hugging Face Space', body: 'Sign up at huggingface.co. Create a new Space with Gradio as the SDK. Push your app.py and requirements.txt to the Space repository. Add your GROQ_API_KEY in Repository Secrets. The Space builds automatically.' },
            { n: '5', title: 'Share the live URL', body: 'Your chatbot is live at huggingface.co/spaces/yourname/yourapp. Add it to your GitHub profile README, LinkedIn, and resume. This is the most credible way to show a working AI project — it is interactive, it works, anyone can try it.' },
          ]} />
      </ProjectTask>
        <ProTip>
        The fastest way to get a Hugging Face Space running is to click "Duplicate Space" on an existing demo that is similar to what you want to build. This gives you a working starting point you can modify — the code, the model, the UI — instead of starting from scratch. Browse huggingface.co/spaces, find a Gradio demo close to your idea, duplicate it, swap in your own model or API key, and push. You can have a modified, customized demo live in under 15 minutes this way.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/builders/streamlit', label: 'Streamlit' }}
        next={{ path: '/ai-lab/coding/claude-code', label: 'Claude Code' }}
      />
    </ToolPageShell>
  )
}

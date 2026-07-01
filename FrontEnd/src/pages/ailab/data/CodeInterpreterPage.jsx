import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#0EA5E9'

export default function CodeInterpreterPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Data &amp; Analysis">
      <ToolHeader
        icon="🐍"
        title="Code Interpreter — ChatGPT That Runs Your Code"
        tagline="Upload files, write Python, and see results instantly inside ChatGPT"
        badges={[['ChatGPT Plus ($20/mo)', color], ['File uploads', color], ['Python execution', 'var(--text-muted)']]}
        overview={"Code Interpreter (officially called Advanced Data Analysis in ChatGPT Plus) is a feature that gives ChatGPT the ability to write Python code and immediately execute it within the same conversation. Upload a CSV, describe what you want, and Code Interpreter writes pandas code, runs it on your actual data, and shows you the output — charts, tables, computed values — all inside the chat. Unlike asking a regular LLM for code and copying it to run elsewhere, Code Interpreter closes the loop: the model sees the actual output of its own code, can fix errors automatically, and iterates until it gets the right result. For students who need to analyze data, process files, create visualizations, or automate file manipulation tasks without setting up a local Python environment, Code Interpreter is the most accessible Python execution environment available."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'ChatGPT Data Analysis for Beginners 2024 — Full Guide', url: 'https://www.youtube.com/watch?v=DLpz6V_4SpA', dur: '~20 min', note: 'Most up-to-date beginner guide — upload, analyze, visualize, export code' },
            { label: 'ChatGPT Code Interpreter (Advanced Data Analysis) Crash Course', url: 'https://www.youtube.com/watch?v=E2pOYk_9ZVs', dur: '~15 min', note: 'Prompt engineering for data + file uploads + chart generation' },
            { label: 'How I Use ChatGPT Code Interpreter as a Data Analyst', url: 'https://www.youtube.com/watch?v=psXo54Av__w', dur: '~15 min', note: 'Real analyst workflow — see how professionals actually use this tool' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="What Code Interpreter actually does" color={color} />
          <InfoBox color={color}>Code Interpreter runs a sandboxed Python environment inside ChatGPT. When you upload a file and ask a question, GPT-4o writes Python code (using pandas, matplotlib, numpy, sklearn, and many other libraries), executes it in the sandbox, sees the output or error, and responds with results. If the code produces an error, the model automatically rewrites and retries — you never see the failure, just the final correct result.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The key insight is the feedback loop. A regular LLM generates code based on what it thinks will work. Code Interpreter generates code, runs it, and sees what actually happened. This is the difference between guessing and verifying. For data analysis tasks where the exact format of your data matters (column names, data types, missing values), the ability to run and see real results makes Code Interpreter dramatically more reliable than asking for code that you run elsewhere.</p>
        </Block>
        <Block>
          <SubHead label="What Code Interpreter can do" color={color} />
          <CardGrid color={color} items={[
            { name: 'Data analysis', desc: 'Upload CSV, Excel, JSON. Ask questions about the data — statistics, trends, outliers, correlations. Code Interpreter reads your actual column names and data types, not assumptions.' },
            { name: 'Data visualization', desc: 'Generate matplotlib and seaborn charts. Bar, line, scatter, histogram, heatmap, box plot. Specify styling requirements or let it choose. Download the chart directly from the response.' },
            { name: 'File conversion', desc: 'Convert between file formats: CSV to Excel, JSON to CSV, PDF to text, image formats. Merge multiple files. Extract specific columns. Tasks that would require writing a script take seconds.' },
            { name: 'Text processing', desc: 'Analyze text files: word frequency, sentiment patterns, extract patterns with regex, count occurrences, process logs. Works with any text data that can be uploaded as a file.' },
            { name: 'Mathematical computation', desc: 'Complex calculations, statistical tests, numerical optimization. scipy, numpy, sympy are available. Solve equations, run simulations, compute matrix operations — with the model explaining what it computed.' },
            { name: 'Machine learning', desc: 'Build and evaluate simple ML models (scikit-learn). Train classifiers, run regression, evaluate model accuracy. Not for production ML — for understanding and quick experimentation.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Getting the best results" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Upload first, then describe', body: 'Upload your file before explaining what you want. Code Interpreter will examine the file structure and understand your column names, data types, and sample values — making all subsequent responses more accurate.' },
            { n: '2', title: 'Describe the output format explicitly', body: "'Create a bar chart with: title Revenue by Region, x-axis labels rotated 45 degrees, bars colored by category, y-axis in thousands (₹000s), save as PNG with 300 DPI.' Specific output specifications produce professional results." },
            { n: '3', title: 'Ask for the code', body: "'Show me the Python code you used for this analysis.' Code Interpreter provides the full code. Copy it to Jupyter or a .py file. Now you have working Python code customized for your data." },
            { n: '4', title: 'Iterate on results', body: "'Now filter that to only rows where category is Electronics and redo the chart.' Code Interpreter remembers the context and modifies its approach. Each follow-up builds on the previous result without restarting." },
            { n: '5', title: 'Ask for interpretation', body: "After a chart or statistical result: 'What does this tell us? What are the 3 most important insights from this analysis?' Code Interpreter combines execution capability with GPT-4o's reasoning to provide interpretation, not just numbers." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Practical use cases for students" color={color} />
          <Compare color={color} items={[
            { label: 'Assignment data analysis', badge: 'Most common', body: 'Export survey data from Google Forms, results from an experiment, or a public dataset for coursework. Upload to Code Interpreter. Generate all required charts and statistics. Understand what the numbers mean with follow-up questions.' },
            { label: 'Excel automation', badge: 'Big time saver', body: 'Complex spreadsheet tasks that would take hours in Excel: merge multiple sheets by a common column, apply transformations to thousands of rows, calculate complex formulas across all rows, reformat dates consistently. Describe the task, it executes.' },
            { label: 'Learning Python', badge: 'Learning tool', body: 'Ask Code Interpreter to solve a problem, then ask it to explain the code line by line. Run the same code yourself in a local Python environment. Having a working example with explanation accelerates learning significantly.' },
            { label: 'Quick calculations', badge: 'Better than a calculator', body: "Complex math that would require writing a script: 'Given this table of values, fit a polynomial regression and tell me the R² score' or 'Calculate the confidence interval for this sample data'. Executes and explains." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Limitations to know" color="#EF4444" />
          <Compare color="#EF4444" items={[
            { label: 'Session timeout', badge: 'Data does not persist', body: 'Code Interpreter sessions expire. If you come back hours later, your uploaded files and all generated code are gone. For recurring analysis workflows, export the code (ask Code Interpreter to provide it) and run it locally or in Colab.' },
            { label: 'No internet access', badge: 'Sandboxed environment', body: 'Code Interpreter runs in a sandbox with no internet access. It cannot fetch data from URLs, call external APIs, or access databases. All data must be uploaded as files. Web scraping, API calls, and live data are not possible.' },
            { label: 'Memory limits', badge: 'Large files may fail', body: 'Very large files (hundreds of MB, millions of rows) may hit memory limits in the sandbox. If processing fails, split the file into smaller chunks or sample the data first.' },
            { label: 'Requires Plus subscription', badge: '$20/month', body: 'Code Interpreter is a ChatGPT Plus feature. Free alternatives: Julius AI (purpose-built, free tier), Google Colab (free Jupyter notebooks), Gemini with code execution. Plus is worth it if you use many ChatGPT features beyond just data analysis.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Analyze any data file by describing what you want in plain English — no pandas or SQL knowledge required',
            'Generate professional charts and visualizations with specific formatting by describing the output',
            'Convert, merge, filter, and transform data files without writing code',
            'Extract working Python code from Code Interpreter to learn pandas and matplotlib from real examples',
            'Run quick statistical analyses, fit models, and compute complex calculations on your actual data',
        ]} />
      </Block>
        <div className="tool-layout-task">
          <div className="tool-layout-task__header"><span>🎯</span>
            <span className="tool-layout-task__label">PROJECT — Your Own Data Analysis Report</span>
          </div>
          <p className="tool-layout-task__desc">Take any real data you have access to or care about. Options: your college's public exam results data, a Kaggle dataset on a topic you like, a CSV export from any app you use (fitness tracker, finance app, etc.). Upload to Code Interpreter. Produce: (1) a summary statistics table, (2) three different charts showing different aspects of the data, (3) one interesting finding explained in plain English. Ask for the Python code at the end. This is the process data analysts use daily — just faster.</p>
          <Steps color={color} items={[
            { n: '1', title: 'Get real data', body: 'Best source: something you actually care about. Kaggle.com has thousands of free CSVs. Google Dataset Search finds government and academic data. Export your own app data (most apps support CSV export).' },
            { n: '2', title: 'Start with exploration', body: "Upload → 'Describe this dataset. How many rows? What columns? Any missing values? What data type is each column?' Read the response carefully before asking analytical questions." },
            { n: '3', title: 'Generate three charts', body: 'Ask for three different visualization types that reveal something interesting: one showing distribution, one showing comparison or trend, one showing relationships. Specify titles, labels, and formatting.' },
            { n: '4', title: 'Extract and save the code', body: "Ask: 'Provide the complete Python code for all three charts as a single script I can run locally.' Save to analysis.py. Run in Google Colab or local Python. Modify one thing to practice." },
          ]} />
          <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">REQUIRES: ChatGPT Plus — $20/month</span></div>
        </div>
        <ProTip>
        Code Interpreter is most valuable as a Python tutor, not just a data tool. When it produces code you do not understand, ask 'Explain what each line of that code does, step by step.' This gives you a line-by-line explanation of working Python that solves your exact problem. Repeat this for 10 different analyses and you will have learned more practical pandas than most introductory courses cover.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/data/julius', label: 'Julius AI' }}
        next={{ path: '/ai-lab/creative/dalle-free', label: 'Bing Image Creator' }}
      />
    </ToolPageShell>
  )
}

import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#0EA5E9'

export default function JuliusPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Data & Analysis">
      <ToolHeader
        icon="📊"
        title="Julius — Chat With Your Data in Plain English"
        tagline="AI-powered data analysis without writing a single line of code"
        badges={[['✓ FREE tier', '#4ADE80'], ['No code needed', color], ['Powered by GPT-5.5', 'var(--text-muted)']]}
        overview={"Julius is an AI data analysis platform that lets you upload any data file — CSV, Excel, PDF with tables, Google Sheets — and analyze it by asking questions in plain English. No SQL, no Python, no pandas. Ask \"Which product category had the highest revenue last quarter?\" and Julius generates and executes the analysis, produces charts, and explains the findings. It is built on GPT-5.5 and Code Interpreter, meaning it writes Python code to analyze your data, executes it, and shows you both the result and the code it used. For students without data science backgrounds who need to analyze survey results, project data, or academic datasets, Julius makes data analysis as accessible as chatting. The free tier allows a limited number of analyses per month."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'How to Use Julius AI for Data Analysis — Step-by-Step Guide', url: 'https://www.youtube.com/watch?v=rWoFcshWrTg', dur: '~15 min', note: 'Best full walkthrough — upload data, ask questions, get charts' },
            { label: 'AI Tool That Will Analyse ANY Dataset in SECONDS — Julius AI (No Code)', url: 'https://www.youtube.com/watch?v=HfurQPa5jF8', dur: '~10 min', note: 'Fast demo — see what Julius can do on a real dataset in minutes' },
            { label: 'Julius AI Tutorial: From Ideas to Data Analysis & Visualisation in a Click', url: 'https://www.youtube.com/watch?v=tm02Lf9WbWU', dur: '~15 min', note: 'Visualisation focus — charts, trends, and insight generation' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="How Julius works" color={color} />
          <InfoBox color={color}>Julius sends your data file and your question to GPT-5.5. The model writes Python code (using pandas, matplotlib, seaborn) to answer the question, executes it in a sandboxed environment, and returns the result — along with the generated chart or table. You see the answer, the visualization, and optionally the Python code that produced it. This is the same Code Interpreter capability that powers ChatGPT Plus's data analysis, wrapped in a purpose-built interface.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The critical feature for learning is that Julius shows you the code it wrote. Ask "which month had the highest sales?" and Julius answers the question and shows the pandas code it used. This is how many students learn data analysis in practice — see the code produced by AI, understand what each line does, modify it, and build their own skills. The 'see the code' toggle makes Julius simultaneously a data analysis tool and a pandas learning resource.</p>
        </Block>
        <Block>
          <SubHead label="What Julius can analyze" color={color} />
          <CardGrid color={color} items={[
            { name: 'CSV and Excel files', desc: 'Upload any spreadsheet. Julius reads columns, data types, and values automatically. Ask about trends, comparisons, outliers, or correlations. Works with files up to tens of thousands of rows.' },
            { name: 'Survey data', desc: "Google Forms exports, Typeform results, SurveyMonkey downloads. Ask: 'What percentage chose option A?', 'Is there a correlation between age and score?', 'Visualize the distribution of responses.'" },
            { name: 'Financial data', desc: 'Revenue reports, budget spreadsheets, expense tracking. Ask Julius to identify trends, compare periods, calculate growth rates, flag anomalies.' },
            { name: 'Academic datasets', desc: 'Public datasets from Kaggle, UCI ML Repository, government data portals. Upload and explore. Ask about distributions, correlations, summary statistics — the kinds of analyses required in data science courses.' },
            { name: 'PDF tables', desc: 'Julius extracts tables from PDF documents. Annual reports, research papers, government statistics with data in PDF form. Ask questions about the extracted data.' },
            { name: 'Time series data', desc: "Data with date columns. Ask: 'Show monthly trends', 'Which year had the best performance?', 'Plot sales over the past 12 months with a trend line.'" },
          ]} />
        </Block>
        <Block>
          <SubHead label="Types of analysis Julius handles" color={color} />
          <Compare color={color} items={[
            { label: 'Descriptive statistics', badge: 'Most used', body: "'Give me summary statistics for all numeric columns' gives you a complete statistical overview of your dataset in seconds. Mean, median, standard deviation, count, percentages, distributions — instantly." },
            { label: 'Visualization', badge: 'Strongest feature', body: 'Bar charts, line charts, scatter plots, histograms, heatmaps, pie charts. Specify exactly what you want or let Julius choose the right chart type. Professional quality matplotlib/seaborn output.' },
            { label: 'Correlation and comparison', badge: 'Great for research', body: "'Is there a correlation between X and Y?' — Julius calculates Pearson or Spearman correlation and shows a scatter plot. 'Compare group A vs group B' — Julius runs comparison tests." },
            { label: 'Filtering and segmentation', badge: 'Operational analysis', body: "'Show me only sales from Q4', 'Filter to customers who spent more than ₹10,000', 'Group by region and calculate totals for each'. Subset and summarize data without knowing pandas syntax." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Using Julius effectively" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Start with exploration', body: "Upload your file and first ask: 'Describe this dataset. What columns does it have, what are the data types, and how many rows?' Julius gives you an overview that shapes better follow-up questions." },
            { n: '2', title: 'Ask specific questions', body: "Vague: 'analyze this data'. Specific: 'What are the top 5 products by total revenue? Show as a bar chart sorted descending.' The more specific your question, the more useful the answer." },
            { n: '3', title: 'Ask for visualizations explicitly', body: "Julius can produce text answers or charts. Explicitly request: 'show as a bar chart', 'plot as a time series', 'create a heatmap of correlations'. Visualizations communicate patterns that tables cannot." },
            { n: '4', title: 'View and learn from the code', body: "Click 'View Code' on any response to see the Python/pandas code Julius wrote. Copy it. Run it in Jupyter to verify. Modify it. This is how you learn pandas — by reading working code that solves your actual problem." },
            { n: '5', title: 'Build on previous answers', body: "Julius remembers the conversation. 'Now filter that to only include rows where revenue > 10000 and redo the chart.' Iterative analysis through conversation is more natural than writing code." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Julius vs ChatGPT Code Interpreter" color={color} />
          <Compare color={color} items={[
            { label: 'Julius', badge: 'Purpose-built for data', body: 'Designed specifically for data analysis. Cleaner interface for data workflows. Better file management. Results organized by conversation. Free tier available. Faster for the specific workflow of upload → analyze → visualize → iterate.' },
            { label: 'ChatGPT Plus Code Interpreter', badge: 'More general purpose', body: 'Full GPT-5.5 plus code execution. More powerful for complex multi-step tasks. Handles non-data tasks in the same session. $20/month. Better when you need the full ChatGPT Plus feature set, not just data analysis.' },
            { label: 'Google Colab + AI', badge: 'Full control, more work', body: 'Free Jupyter notebooks with AI code assistance (Gemini or Copilot). Maximum control — you see and modify all code. More setup and learning curve. Best when you need to build reusable analysis scripts rather than one-off interactive analysis.' },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Analyze any CSV or Excel file by asking questions in plain English — no Python or SQL required',
            'Generate professional data visualizations (bar charts, scatter plots, heatmaps) from natural language descriptions',
            'Explore academic datasets and research data without writing pandas code',
            'Learn pandas and data analysis by studying the working Python code Julius generates for your questions',
            'Turn survey results, academic data, or financial spreadsheets into actionable insights in minutes',
        ]} />
      </Block>
        <ProjectTask
        title={"Analyze a Real Dataset"}
        description={"Find a dataset on Kaggle (kaggle.com/datasets — thousands of free datasets on any topic: sports, movies, finance, health, cities). Download as CSV. Upload to Julius. Ask 10 analytical questions: 3 descriptive (summary stats, distributions), 3 comparison (A vs B, top/bottom N), 3 visualization (plot X over time, show correlation between Y and Z), and 1 insight question (what is the most interesting pattern in this data?). Save the most interesting chart."}
        costNote={"TOTAL COST: Free tier — limited analyses per month on julius.ai"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Find a dataset you care about', body: 'Kaggle.com/datasets → search any topic that interests you. Sports statistics, movie ratings, Indian census data, stock prices, cricket scores. Choose a CSV dataset under 100MB. Download it.' },
            { n: '2', title: 'Start with exploration', body: "Upload to Julius (julius.ai). First message: 'Describe this dataset — columns, data types, row count, missing values.' Read Julius's response to understand the data before diving into analysis." },
            { n: '3', title: 'Ask your 10 questions', body: "Work through your questions. For each, check: is the answer numerically correct? Does the chart show what you expected? Click 'View Code' on the most interesting responses." },
            { n: '4', title: 'Export and learn', body: 'Download the most interesting chart. Copy the Python code from at least 3 responses. Paste into a Jupyter notebook. Run it to verify it works. Now you have working pandas code you understand because you watched it being produced.' },
          ]} />
      </ProjectTask>
        <ProTip>
        When Julius gives you a chart or result that is almost right but needs a small adjustment, describe the change rather than starting over: 'Add a title to that chart saying "Monthly Revenue by Region"' or 'Change the x-axis label to show months as Jan, Feb, Mar instead of 1, 2, 3'. Julius modifies the code and re-runs it. This iterative refinement is faster than trying to get the perfect chart in one prompt.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/vector/pinecone', label: 'Pinecone' }}
        next={{ path: '/ai-lab/data/code-interpreter', label: 'Code Interpreter' }}
      />
    </ToolPageShell>
  )
}

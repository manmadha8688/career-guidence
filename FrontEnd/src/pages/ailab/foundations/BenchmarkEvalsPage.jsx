import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#F59E0B'

export default function BenchmarkEvalsPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="AI Foundations">
      <ToolHeader
        icon="📏"
        title="Benchmarks & Evals — How to Measure AI Model Quality"
        tagline="MMLU, HumanEval, SWE-bench, LMSYS Arena — what they test and what they miss"
        badges={[['✓ FREE', '#4ADE80'], ['crfm.stanford.edu/helm', color], ['AI Foundations', 'var(--text-muted)']]}
        overview={"Every week a new AI model claims to be \"the best\" — but best at what? Benchmarks are standardized tests that let you compare models fairly: same questions, same conditions, same scoring. Understanding the 5 major benchmarks — MMLU, HumanEval, SWE-bench, HELM, and LMSYS Chatbot Arena — tells you how to read model release announcements without being misled by cherry-picked numbers. More importantly, understanding their limitations tells you when benchmark scores predict real performance and when they do not. For anyone building with AI or choosing between models for a project, this is the tool literacy that separates informed decisions from marketing-driven ones."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'The Best AI Model...According To What??', url: 'https://www.youtube.com/watch?v=fCJeLK8bIeQ', dur: null, note: 'Best explainer on AI benchmarks and what they really measure' },
            { label: 'AI Benchmarks Explained — How to Compare LLMs', url: 'https://www.youtube.com/watch?v=MZb3H8PBNaU', dur: null, note: 'Benchmark explainer' },
            { label: 'How AI Leaderboards Are Gamed — LMSYS Arena Explained', url: 'https://www.youtube.com/watch?v=FqxGW3S_E8E', dur: null, note: 'Covers LMSYS, Elo, limitations' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="Why benchmarks exist" color={color} />
          <InfoBox color={color}>Before benchmarks, comparing AI models meant running your own experiments — expensive, slow, and non-reproducible. Benchmarks solve this by defining a fixed test set that any researcher can run. A benchmark score is the output of: model + settings + test harness + scoring function. Change any variable and the score changes. This is why "best on benchmark X" is a specific, narrow claim — not a general verdict.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The 5 major benchmarks you will see cited in every model announcement each measure something different. MMLU measures general knowledge breadth. HumanEval measures whether code runs correctly. SWE-bench measures whether the model can fix real software bugs. HELM measures safety, fairness, and multiple dimensions at once. LMSYS Chatbot Arena measures which model humans actually prefer in conversation. None of them measures "overall intelligence" — and any claim to that effect is a marketing statement, not a technical one.</p>
        </Block>
        <Block>
          <SubHead label="The 5 benchmarks you need to know" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'MMLU — 57 subjects, 15,908 questions', body: 'Massive Multitask Language Understanding. 4-option multiple choice across math, physics, chemistry, history, law, medicine, ethics, and 51 other subjects. Tests world knowledge from pre-training. Status in 2025: SATURATED — top models exceed 90%, making score differences statistically meaningless. MMLU-Pro was created as a harder successor with more complex, multi-step questions.' },
            { n: '2', title: 'HumanEval — 164 Python coding problems', body: 'Created by OpenAI. Models must write Python code that passes unit tests. Metric: pass@1 — does a single attempt produce working code? Status in 2025: Most frontier models exceed 85% — discriminating power is largely lost. HumanEval+ was created with more rigorous test cases. Key insight: it only tests Python, only 164 problems, and only single-function tasks — not full application code.' },
            { n: '3', title: 'SWE-bench — real GitHub issues, real codebases', body: 'Princeton NLP. Given a real GitHub repository and a bug report, can the AI fix the codebase? SWE-bench Verified has 500 confirmed-solvable problems — the gold standard. In 2023, top models solved 4.4%. By 2025, top models reached 80-95% on Verified. But SWE-bench Pro (harder, gaming-resistant version): the same models score only 46-58%. The gap between Verified and Pro reveals how much of the high scores come from gaming the test.' },
            { n: '4', title: 'HELM — 42 scenarios, 7 dimensions', body: "Stanford's Holistic Evaluation of Language Models. Evaluates accuracy, calibration (does it know what it doesn't know?), robustness, fairness, bias, toxicity, and efficiency — all in one framework. The key difference: no single score. HELM produces a multi-dimensional profile. A model can be excellent on accuracy but poor on toxicity. This is why HELM matters for safety-conscious applications: crfm.stanford.edu/helm" },
            { n: '5', title: 'LMSYS Chatbot Arena — 6M+ human votes', body: 'Real humans compare two anonymous AI models side by side and vote for the better response. Uses Elo rating (borrowed from chess) — beating a stronger model gains more points. Trusted because human preference is harder to game than automated tests: you cannot "train your model on the human vote data" the way you can contaminate other benchmarks. 6+ million votes as of 2025. Limitation discovered: labs submit only their best variants, inflating proprietary scores by up to 112 Elo points.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="How to use benchmarks to choose a model" color={color} />
          <CardGrid color={color} items={[
            { name: 'Coding tasks', desc: 'Check SWE-bench Verified (real bug fixing) and HumanEval+ (function writing). A model that scores 80% on Verified handles more complex code than one at 50%. Also check the model\'s specific language — most benchmarks test Python primarily.' },
            { name: 'Reasoning and knowledge', desc: 'Check MMLU-Pro (harder than original MMLU) and GPQA Diamond (PhD-level science). For general Q&A tasks, LMSYS Arena Elo is a better predictor than MMLU since it measures real-world conversation quality.' },
            { name: 'Safety and fairness', desc: 'Check HELM. It explicitly measures toxicity, bias, and fairness alongside accuracy. If your application serves diverse users or handles sensitive topics, HELM scores matter more than accuracy benchmarks alone.' },
            { name: 'Conversational quality', desc: 'Check LMSYS Chatbot Arena Elo. This is the most human-predictive benchmark for chat applications. A model with high Arena Elo actually produces responses humans prefer — which is what matters for user-facing products.' },
            { name: 'Math and science', desc: 'GPQA Diamond (expert-level multiple choice science) and AIME (math competition problems) are the current hardest reasoning benchmarks. MMLU is now too easy to differentiate top models on these tasks.' },
            { name: 'Your actual task', desc: 'Run your own evaluation. Take 20-50 representative examples from your real use case. Score them manually. The model that scores best on YOUR data is more relevant than any public benchmark. Always verify on your own data before production.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="The limitations — why benchmark scores mislead" color="#EF4444" />
          <Compare color="#EF4444" items={[
            { label: "Goodhart's Law", badge: 'The fundamental problem', body: "When a benchmark becomes a target, it stops being a good measure. As soon as a benchmark is widely used, AI labs optimize their training for it — either deliberately (training on similar questions) or unintentionally (training on data that includes the test questions). A model that scores 92% on MMLU may have absorbed MMLU questions during training, not actually know the subjects better." },
            { label: 'Data contamination', badge: 'Quietly inflating scores', body: 'Test questions leak into training data. StarCoder-7B scored 4.9x higher on contaminated benchmark data versus clean data — on the same model, just from data leakage. GPT-3 series showed ~20 percentage point inflation on contaminated benchmarks. Training corpora are now so large that even AI labs cannot always verify what is inside them.' },
            { label: 'Benchmark saturation', badge: 'Scores stop meaning anything', body: 'MMLU and HumanEval no longer distinguish frontier models — everyone exceeds 90% and 85% respectively. This forces researchers to create progressively harder benchmarks. Humanity\'s Last Exam was created in 2025 specifically because GPT-5 and Claude 4 were approaching 100% on everything else.' },
            { label: 'Real-world performance gap', badge: 'The 37% gap', body: 'Enterprise AI systems show a 37% gap between benchmark scores and real deployment performance. When GPT-4 launched and dominated every benchmark, engineers discovered smaller "inferior" models often outperformed it on specific production tasks at a fraction of the cost. SWE-bench Verified (80-95%) vs SWE-bench Pro (46-58%) on the same models illustrates exactly this gap.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="Reading a model announcement without being misled" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Ask: which benchmark, which subset?', body: '"State-of-the-art on coding" could mean HumanEval (easy), HumanEval+ (harder), or SWE-bench Verified (hard). The specific benchmark matters enormously. Always look for the exact test name and variant — not just the category.' },
            { n: '2', title: 'Ask: what is the comparison set?', body: 'A model that is "best on HumanEval" might only be compared to models from 6 months ago. Check the publication date of the leaderboard and what models were included. A benchmark table with only 5 models is different from one with 50.' },
            { n: '3', title: 'Cross-reference multiple benchmarks', body: 'No single benchmark captures general capability. A model that leads on coding (SWE-bench) may lag on conversation quality (LMSYS Arena). Check at least 2-3 benchmarks relevant to your use case. Sites like lmsys.org/leaderboard and llm-stats.com aggregate across benchmarks.' },
            { n: '4', title: 'Test on your own data', body: 'Public benchmarks are a starting point, not a verdict. Every serious engineering team evaluates models on their own representative examples before choosing one for production. Take 20-50 real examples from your task, run each candidate model, score manually. This 2-hour investment prevents months of wrong-model regret.' },
          ]} />
        </Block>
        <Block title="What you can do after understanding this" titleColor={color}>
        <CanDoList items={[
          'Read any model announcement and understand exactly what "state-of-the-art" means and what it doesn\'t',
            'Use LMSYS Chatbot Arena to compare models directly on your own prompts with human-quality feedback',
            'Choose the right benchmark to evaluate a model for your specific task (coding → SWE-bench, safety → HELM, conversation → Arena)',
            'Identify when a benchmark score is likely inflated by data contamination or cherry-picking',
            'Run a basic model evaluation on your own data before committing to any AI model in production',
        ]} />
      </Block>
        <ProjectTask
        title={"Run a Mini Evaluation"}
        description={"Pick one task you want to use AI for (code explanation, essay improvement, math tutoring, summarization, anything real). Write 10 test examples with your ideal output for each. Run all 10 through 3 different models (use free tiers: ChatGPT free, Claude free, Gemini free). Score each output 1-5 yourself. Calculate average per model. Which won? Did the \"best benchmark model\" actually win on your task? Write 3 sentences on what you learned about benchmark scores vs. your actual preferences."}
        costNote={"TOTAL COST: ₹0 — ChatGPT free + Claude free + Gemini free"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Choose a task and write 10 examples', body: 'Pick a task you actually need. Write 10 inputs that represent real questions you would ask. For each, write what an ideal output looks like — your rubric. This is harder than it sounds. Good evaluation examples are specific, not generic.' },
            { n: '2', title: 'Score your rubric: what makes a 5?', body: 'Define what 1-5 means for YOUR task before you run the models. For code explanation: 5 = explains every line accurately, 3 = mostly right but misses one concept, 1 = confusing or wrong. Rubric first, then evaluation.' },
            { n: '3', title: 'Run all 10 prompts through 3 models', body: 'Use the free tiers. Open 3 browser tabs. Same prompt to each. Copy responses into a spreadsheet. Score immediately while the quality difference is fresh. Do not score in batches days later.' },
            { n: '4', title: 'Compare your results to public benchmarks', body: 'Check LMSYS Arena Elo for your 3 models (lmsys.org/leaderboard). Did the higher Elo model win your evaluation? If not, why? This analysis builds genuine intuition about when benchmarks predict real performance and when they fail.' },
          ]} />
      </ProjectTask>
        <ProTip>
        The most useful benchmark for students is not MMLU or HumanEval — it is your own evaluation on your own tasks. Public benchmarks are designed for researchers who need standardized comparison. You need something more specific: does this model handle my actual use case well? A 20-prompt personal evaluation takes 2 hours and tells you more than reading 10 model cards.
      </ProTip>
      <PageNavRow
        prev={undefined}
        next={{ path: '/ai-lab/chatbots/chatgpt', label: 'ChatGPT' }}
      />
    </ToolPageShell>
  )
}

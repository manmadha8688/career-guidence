import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, CanDoList, ProjectTask, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#8B5CF6'

export default function NotebookLMPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Chatbots">
      <ToolHeader
        icon="📓"
        title="NotebookLM — AI That Only Knows What You Give It"
        tagline="Your documents become a queryable knowledge base"
        badges={[['✓ FREE', '#4ADE80'], ['notebooklm.google.com', color], ['Google', 'var(--text-muted)']]}
        overview={"NotebookLM solves the most frustrating problem with AI chatbots: hallucination. When you ask ChatGPT or Claude a question, they generate an answer from billions of training parameters — and sometimes invent facts that sound correct. NotebookLM works completely differently: you upload your own sources (PDFs, Google Docs, YouTube videos, web pages, audio files), and NotebookLM only answers from those sources. Every answer comes with a citation showing exactly which part of your document it came from. If you ask something not in your sources, it says so. For students studying specific material, researchers working with a corpus of papers, or anyone who needs to extract information reliably from a specific set of documents, NotebookLM is the most trustworthy AI tool available — and completely free."}
      />

      <Block title="Watch first" titleColor="#EF4444">
          {[
            { label: 'NotebookLM Tutorial: 6 Use Cases You Haven\'t Thought Of — Kevin Stratvert', url: 'https://www.youtube.com/watch?v=HqWm0mStCG8', dur: '~15 min', note: 'Best practical guide — real use cases including Audio Overview' },
            { label: 'NotebookLM Full Tutorial 2025 — Kevin Stratvert', url: 'https://www.youtube.com/watch?v=Z-frzvXhGJ0', dur: '~20 min', note: 'Updated 2025 guide covering all new features' },
            { label: 'How to Use Google NotebookLM — Full Tutorial', url: 'https://www.youtube.com/watch?v=uSVBfyHBiDU', dur: '~15 min', note: 'Complete walkthrough including study and research workflows' },
          ].map((v, i) => <VideoCard key={i} v={v} />)}
        </Block>
        <Block>
          <SubHead label="The core principle — grounded AI" color={color} />
          <InfoBox color={color}>NotebookLM uses RAG (Retrieval-Augmented Generation) as its entire product model. Your uploaded documents are the only knowledge source. Every answer is retrieved from those documents and generated based on that retrieved content — not from any external training data. This is why it doesn't hallucinate: it can only say what your sources say.</InfoBox>
          <p className="tool-layout-block__para" style={{ marginBottom: 0 }}>The practical effect is profound. You can upload your entire semester's worth of notes, textbooks, and lecture slides — and then have a conversation with all of them simultaneously. Ask "which concepts appear in both the lecture on sorting algorithms and the chapter on databases?" and NotebookLM reads across all your sources. The Audio Overview feature is unique: it converts your entire source set into a podcast-style conversation between two AI hosts discussing the material — an incredible study tool.</p>
        </Block>
        <Block>
          <SubHead label="What you can upload" color={color} />
          <CardGrid color={color} items={[
            { name: 'PDFs', desc: 'Textbooks, research papers, course slides, journal articles. Each PDF becomes a searchable source. Works well with scanned text if the OCR is readable.' },
            { name: 'Google Docs', desc: 'Connect directly from Google Drive. Your notes, summaries, reports. Updates to the Doc are reflected in NotebookLM automatically.' },
            { name: 'YouTube videos', desc: 'Paste a YouTube URL. NotebookLM ingests the transcript. Ask questions about video content without watching the whole thing. Works for lecture videos, tutorials, talks.' },
            { name: 'Web pages', desc: 'Paste a URL. NotebookLM reads and indexes the page. Useful for documentation pages, articles, blog posts — any text-heavy web content.' },
            { name: 'Audio files', desc: 'Upload audio lectures, podcast episodes, recorded meetings. NotebookLM transcribes and indexes the content. Ask questions about spoken content.' },
            { name: 'Text files & Google Slides', desc: 'Plain text notes, copied content, Google Slides presentations. Maximum 50 sources per notebook, 500K words per source.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="The Audio Overview feature" color={color} />
          <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Audio Overview is NotebookLM's most surprising feature. Click "Generate Audio Overview" and the system creates a 10-20 minute podcast-style conversation where two AI hosts discuss, explain, and debate the content from all your sources. It sounds remarkably natural — not robotic text-to-speech — and covers the key themes, interesting connections, and important concepts from your entire source set.</p>
          <InfoBox color={color}>Audio Overview is genuinely useful for studying. Instead of re-reading notes before an exam, listen to the AI podcast version during a commute, workout, or meal. The conversational format reinforces concepts through repetition and explanation in a way that passive reading doesn't. It also surfaces connections between sources that you might not have noticed yourself.</InfoBox>
        </Block>
        <Block>
          <SubHead label="How to use NotebookLM for studying" color={color} />
          <Steps color={color} items={[
            { n: '1', title: 'Create one notebook per subject', body: 'New notebook → upload all materials for that subject: lecture PDFs, your notes, relevant YouTube lecture URLs. Keep sources organized by course.' },
            { n: '2', title: 'Ask cross-source questions', body: "Ask questions that span multiple sources: 'What does the textbook say about this concept compared to what the lecturer said?' NotebookLM reads across all sources simultaneously." },
            { n: '3', title: 'Generate study guides', body: "Click 'Generate Study Guide' (or ask 'Create a study guide for this material'). NotebookLM produces a structured summary with key concepts, definitions, and practice questions drawn directly from your sources." },
            { n: '4', title: 'Test your understanding', body: "Ask 'Give me 10 practice questions based on my notes' or 'Quiz me on the key concepts in chapter 3'. Answer them, then ask for explanations. All questions are grounded in your actual study material." },
            { n: '5', title: 'Generate Audio Overview before an exam', body: "Two days before an exam, generate an Audio Overview of all sources. Listen to it multiple times. The conversational format helps consolidate the material in a way re-reading doesn't." },
          ]} />
        </Block>
        <Block>
          <SubHead label="Honest limitations" color="#EF4444" />
          <Compare color="#EF4444" items={[
            { label: 'Only knows your sources', badge: 'Feature AND limitation', body: "NotebookLM cannot fill in gaps from its own knowledge. If your uploaded materials don't cover something, it tells you. This is a feature for reliable answers but a limitation when you need background knowledge not in your sources." },
            { label: '50 source limit per notebook', badge: 'Practical constraint', body: 'Maximum 50 sources per notebook. For large research projects, this requires planning. Workaround: create multiple notebooks organized by sub-topic, or prioritize the most relevant sources.' },
            { label: 'No image understanding in PDFs', badge: 'Known gap', body: 'Diagrams, charts, and images in PDFs are not analyzed. Text around images is indexed. For heavily visual textbooks (like physics or biology diagrams), the image content is missed.' },
            { label: 'English-primary quality', badge: 'Multilingual caution', body: 'NotebookLM works with multilingual sources but was primarily optimized for English. For content in Indian languages, quality varies. Best to upload English-language sources for reliable results.' },
          ]} />
        </Block>
        <Block>
          <SubHead label="NotebookLM vs asking ChatGPT/Claude the same questions" color={color} />
          <Compare color={color} items={[
            { label: 'NotebookLM', badge: 'Grounded in your sources', body: 'Answers reference your specific materials. Citations point to exact passages. Will not hallucinate external facts. Stays strictly within what your documents say. Ideal for exam prep, literature review, document Q&A.' },
            { label: 'ChatGPT / Claude', badge: 'General knowledge, no source grounding', body: "Answers from broad training data. More creative and generative. Can explain concepts not in your sources, write code, and reason generally. Better for conceptual explanations and for questions not covered by your specific documents." },
          ]} />
        </Block>
        <Block title="What you can do" titleColor={color}>
        <CanDoList items={[
          'Create a queryable knowledge base from all your semester notes, textbooks, and lecture slides',
            'Get answers with exact citations showing which part of your document the answer came from',
            'Generate a study guide, timeline, FAQ, or briefing document from your uploaded sources in one click',
            'Create an AI podcast discussion of your study material with Audio Overview — study while commuting',
            'Ask questions that span multiple documents simultaneously without manually cross-referencing',
        ]} />
      </Block>
        <ProjectTask
        title={"Build Your Exam Notebook"}
        description={"Create a NotebookLM notebook for a subject you have an upcoming exam or assessment on. Upload everything: lecture notes, textbook chapters, any past papers. Then generate a study guide, create a 20-question quiz from the material, and generate an Audio Overview. Compare your AI-generated study guide against your manual notes. What did you emphasize that NotebookLM missed, and what did NotebookLM surface that you had underweighted in your own notes?"}
        costNote={"TOTAL COST: ₹0 — NotebookLM is completely free with a Google account"}
      >
        <Steps color={color} items={[
            { n: '1', title: 'Gather your sources', body: 'Collect PDFs of notes, slides, and relevant textbook sections. Add YouTube lecture URLs if available. Aim for at least 5-10 sources that cover the exam material.' },
            { n: '2', title: 'Create the notebook and upload', body: 'Go to notebooklm.google.com → New notebook. Upload all sources. Wait for processing (usually 1-2 minutes per source).' },
            { n: '3', title: 'Generate study materials', body: "Ask: 'Generate a comprehensive study guide for this material' and separately 'Create 20 practice questions with answers based on these sources'. Save both." },
            { n: '4', title: 'Generate and listen to Audio Overview', body: 'Click the Audio Overview button. Let it generate (2-5 minutes). Listen to the podcast version of your exam material. Note any concepts it emphasizes that you had not focused on.' },
          ]} />
      </ProjectTask>
        <ProTip>
        NotebookLM's greatest underused capability is research synthesis. If you are doing any kind of research or literature review, upload 10-20 relevant papers. Then ask questions like 'What do these papers agree on?' 'What are the main disagreements between authors?' 'What gaps do these papers leave unanswered?' Getting synthesis across 10 papers in seconds that would take days to read manually changes the pace of research.
      </ProTip>
      <PageNavRow
        prev={{ path: '/ai-lab/chatbots/perplexity', label: 'Perplexity' }}
        next={{ path: '/ai-lab/coding/copilot', label: 'GitHub Copilot' }}
      />
    </ToolPageShell>
  )
}

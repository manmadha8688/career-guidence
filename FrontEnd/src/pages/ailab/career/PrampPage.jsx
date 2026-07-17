import { InfoBox, Steps, Compare, SubHead, CardGrid } from '../helpers'
import {
  ToolPageShell, ToolHeader, Block, VideoCard, ProTip,
  PageNavRow,
} from '../toolPageComponents'

const color = '#6C5CE7'

export default function PrampPage() {
  return (
    <ToolPageShell toolColor={color} categoryLabel="Career & Productivity">
      <ToolHeader
        icon="🗣️"
        title="Pramp — Free Peer-to-Peer Mock Interviews"
        tagline="Practice live coding, system design, and behavioral interviews with a real peer — for free"
        badges={[['✓ FREE — 5 sessions/month', '#4ADE80'], ['now on Exponent', color], ['tryexponent.com/practice', 'var(--text-muted)']]}
        overview={"Pramp is a free peer-to-peer mock interview platform that pairs you with another job seeker so you can interview each other, live, over video. It is now run by Exponent and hosted on Exponent Practice (tryexponent.com/practice) — Pramp was acquired by Exponent in 2021, and as of mid-2024 all sessions run on the Exponent Practice platform. It stays free. In a session you take turns: one person plays the interviewer using a provided question, structured guidance, and a solution guide; the other person solves the problem in a shared, collaborative code editor. Then you swap. Each full session is about 60 minutes (roughly 30–45 minutes per person) and ends with both people giving each other feedback. For Indian graduate students preparing for placements, off-campus roles, and FAANG-style interviews, Pramp is the most accessible way to practice the one thing LeetCode cannot teach you: performing and communicating under real interview pressure with a live human on the other side."}
      />

      <Block title="Watch first" titleColor="#EF4444">
        {[
          { label: 'Pramp mock interview — full walkthrough', url: 'https://www.youtube.com/results?search_query=pramp+mock+interview+walkthrough', dur: 'search', note: 'See a real Pramp/Exponent Practice session end to end — how pairing, the code editor, and feedback work' },
          { label: 'How to use Exponent Practice (Pramp) for free', url: 'https://www.youtube.com/results?search_query=exponent+practice+pramp+free+mock+interview', dur: 'search', note: 'Signing up, scheduling a session, and getting the most from your free monthly credits' },
          { label: 'Peer mock interview tips — what good interviewers do', url: 'https://www.youtube.com/results?search_query=peer+mock+interview+tips+coding', dur: 'search', note: 'How to play the interviewer well so your peer gives you better feedback back' },
        ].map((v, i) => <VideoCard key={i} v={v} />)}
      </Block>

      <Block>
        <SubHead label="Why peer mock interviews matter" color={color} />
        <InfoBox color={color}>{"Solving problems alone on LeetCode builds one skill; talking through a solution out loud, while a stranger watches, asks follow-ups, and takes notes, builds a completely different one. Most students fail interviews not because they cannot solve the problem, but because they freeze, go silent, forget to clarify requirements, or cannot explain their thinking. Pramp forces you to practise exactly that — live, with real stakes, but with zero risk to a real job offer."}</InfoBox>
        <p className="tool-layout-block__para" style={{ marginBottom: '1rem'}}>Because it is peer-to-peer, you also spend half of every session as the interviewer. This is secretly the most valuable part: sitting on the other side of the table shows you exactly what interviewers are evaluating — clarity, communication, structured thinking, how a candidate handles hints — and you carry those insights straight back into your own interviews. It is free, browser-based, and requires no software install; you just schedule a slot and get matched.</p>
        {[
          'Live video + a shared collaborative code editor — as close to a real remote interview as free tools get',
          'You get feedback from a real person every single session, not an automated score',
          'Playing the interviewer teaches you what "good" looks like from the evaluator\'s seat',
          'Covers coding (DSA), system design, and behavioral — the three rounds most tech interviews use',
          'No install, works in any browser — sessions are pre-scheduled so you commit to showing up',
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
          { name: 'Peer Matching', desc: 'Exponent Practice pairs you with another user based on availability, experience level, and the topic you want to practise. You do not need to bring your own partner — the platform finds one for you.' },
          { name: 'Coding / DSA Interviews', desc: 'Practise data-structures and algorithms problems in a live shared editor. Talk through your approach, handle follow-ups, and get it working under time pressure — the core of most software placement rounds.' },
          { name: 'System Design Interviews', desc: 'Practise designing scalable systems and discussing real-world trade-offs. This open-ended round is the hardest to prepare for alone, which is exactly why live peer practice helps most here.' },
          { name: 'Behavioral Interviews', desc: 'Rehearse "tell me about a time…" questions using the Situation-Action-Result (SAR) structure. Great for HR rounds and culture-fit screens that Indian campus and off-campus processes rely on heavily.' },
          { name: 'Structured Question Guides', desc: 'When you play the interviewer, you get the full question, an ideal answer, and a rubric of what to assess. This means even a peer who has never interviewed anyone can run a genuinely useful session.' },
          { name: 'Two-Way Feedback', desc: 'After each session both people rate and give written feedback on communication, problem-solving, and technical skill. Strong feedback can also earn you extra practice credits.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Getting started — book your first session" color={color} />
        <Steps color={color} items={[
          { n: '1', title: 'Sign up on Exponent Practice', body: 'Go to tryexponent.com/practice (or pramp.com, which now redirects into Exponent Practice). Create a free account with your email or Google — no credit card required. You get 5 free peer mock-interview credits every month.' },
          { n: '2', title: 'Pick your track', body: 'Choose what you want to practise: Data Structures & Algorithms (coding), System Design, or Behavioral. Product management and a few other tracks also exist. Start with the round you are weakest at, not the one you are already comfortable with.' },
          { n: '3', title: 'Schedule a slot', body: 'Sessions are pre-scheduled, so pick a date and time when you can be fully focused for ~60 minutes with a working mic and camera. The platform then matches you with a peer for that slot. Book early — evening/weekend slots (IST) fill up.' },
          { n: '4', title: 'Prepare to be the interviewer too', body: 'Before the session, skim the interviewer guide for your topic. Remember you interview your peer for half the time. Being a fair, encouraging interviewer means they will do the same for you.' },
          { n: '5', title: 'Do the session — talk out loud', body: 'When it is your turn to solve: clarify the question first, state your approach before coding, think aloud, and ask for hints if stuck. Silence is the number-one thing that hurts candidates. Use the shared editor and narrate everything.' },
          { n: '6', title: 'Read your feedback and log it', body: 'After the session, read the written feedback your peer left. Note one concrete thing to improve (e.g. "clarify constraints earlier"). Track this across sessions — the improvement between session 1 and session 5 is dramatic.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="Free vs paid — what you actually get" color={color} />
        <Compare color={color} items={[
          { label: 'Free — 5 peer sessions / month', badge: 'No card needed', body: 'Every account gets 5 free peer mock-interview credits per month across coding, system design, and behavioral. You can earn extra credits by giving strong feedback. For most students preparing for a placement season, 5 focused sessions a month is genuinely enough.' },
          { label: 'Exponent subscription', badge: 'Unlimited sessions — paid', body: 'An Exponent subscription unlocks unlimited Pramp sessions plus Exponent\'s course library, question bank, and prep content. Pricing is roughly ₹1,000–₹1,700/month equivalent (about $12/mo on an annual plan, ~$20/mo monthly) — verify current pricing on the site. There is no standalone paid "Pramp only" plan.' },
          { label: 'Quality depends on your peer', badge: 'Honest caveat', body: 'Because it is peer-to-peer, session quality varies with who you get matched with. Some peers are excellent; some are beginners. Do 3–4 sessions rather than judging on one — and always leave good feedback so the ecosystem stays useful.' },
          { label: 'Pairs well with LeetCode', badge: 'Use both', body: 'Pramp does not replace problem grinding. Build raw problem-solving on LeetCode/GeeksforGeeks, then use Pramp to practise performing that skill live. The combination — solve alone, perform with a peer — is what actually gets you interview-ready.' },
        ]} />
      </Block>

      <Block>
        <SubHead label="How this fits your ARISE prep" color={color} />
        <InfoBox color={color}>{"Pramp is a complement to the learning you do here, not a replacement for it. Use ARISE gates, quizzes, and the problem-solving gym to build the actual DSA and system-design knowledge; use the aptitude and roadmap sections to know what to study. Then use Pramp to rehearse delivering that knowledge live in an interview. Knowledge without rehearsal cracks under pressure — Pramp is the free rehearsal room."}</InfoBox>
      </Block>

      <div className="tool-layout-task">
        <div className="tool-layout-task__header"><span>🎯</span><span className="tool-layout-task__label">PROJECT — Run a 3-Session Mock Interview Sprint</span></div>
        <p className="tool-layout-task__desc">Do not judge Pramp on one session. Commit to three sessions across one week — one coding, one behavioral, and one of your choice — and measure how your confidence and clarity improve. This is the fastest way to turn placement anxiety into placement readiness.</p>
        <Steps color={color} items={[
          { n: '1', title: 'Sign up and book 3 slots', body: 'Create a free account on tryexponent.com/practice. Immediately schedule three sessions for this week: Session 1 = Coding/DSA, Session 2 = Behavioral, Session 3 = your weakest area. Booking all three up front commits you.' },
          { n: '2', title: 'Session 1 — Coding, focus on talking aloud', body: 'In your coding session, force yourself to clarify the question, state your plan out loud before writing any code, and narrate your thinking the whole time. Ask your peer to note specifically whether your communication was clear.' },
          { n: '3', title: 'Session 2 — Behavioral, use SAR', body: 'Prepare 3 stories from your projects/internships in Situation-Action-Result format beforehand. In the session, answer every behavioral question with one of them. Ask your peer if your answers felt specific and structured or vague.' },
          { n: '4', title: 'Be a great interviewer each time', body: 'For the half of every session where you are the interviewer, use the provided guide, give hints kindly, and write honest, specific feedback. This earns you goodwill (and sometimes bonus credits) and sharpens your own eye.' },
          { n: '5', title: 'Session 3 — attack your weakness', body: 'Use your third session on whatever scared you most in the first two. If system design felt impossible, book system design. Deliberately practising the uncomfortable round is the whole point.' },
          { n: '6', title: 'Compare feedback across all 3', body: 'Read all three feedback notes together. Find the one recurring weakness (it is usually communication or clarifying requirements) and make it your single focus for your next real interview.' },
        ]} />
        <div className="tool-layout-task__cost"><span className="tool-layout-task__cost-text">TOTAL COST: ₹0 — 3 sessions fits inside the free 5-per-month credit allowance, no card required</span></div>
      </div>

      <ProTip>
        Treat the "interviewer" half of every Pramp session as seriously as the "candidate" half. When you play the interviewer using the provided rubric, you see exactly what evaluators watch for — did the candidate clarify the question? think aloud? handle a hint gracefully? — and you internalise those signals from the other side of the table. Students who take the interviewer role seriously improve far faster than those who just want to get to their own turn. Also: book your slots for a time when you are genuinely sharp (not 1am after a study binge) — you are practising performing under pressure, so practise it at your best.
      </ProTip>

      <PageNavRow
        prev={{ path: '/ai-lab/career/grammarly', label: 'Grammarly AI' }}
        next={{ path: '/ai-lab/career/rezi', label: 'Rezi' }}
      />
    </ToolPageShell>
  )
}

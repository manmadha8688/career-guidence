import ToolPageLayout from '../ToolPageLayout'
const tool = { id: 'elevenlabs', category: 'voice', name: 'ElevenLabs', tagline: 'Realistic AI voice generation and voice cloning', icon: '🎙️', color: '#F59E0B', free: true, freeTier: 'Free — 10,000 characters/month', officialUrl: 'https://elevenlabs.io' }
const videos = [{ label: 'ElevenLabs Free Course for Beginners 2024', url: 'https://www.youtube.com/watch?v=rP7rBuHEv_Q', duration: '45 min', note: 'Complete course covering all features including voice cloning' }]
const overview = `ElevenLabs produces the most realistic AI-generated voices available. Text becomes natural-sounding speech in seconds. Voice cloning lets you create a custom AI voice from a 30-second recording — your own voice, a presenter's voice, or any speaker. For students creating demo videos, portfolio presentations, or building voice-enabled applications, ElevenLabs produces professional audio quality that is difficult to distinguish from real speech.`
const sections = [{ content: `The text-to-speech quality from ElevenLabs is in a different category from Google Text-to-Speech or Amazon Polly. It handles natural pacing, intonation variation, emotional expression, and the subtle characteristics that make speech sound human. For demo videos, tutorial narrations, and presentations, the difference is immediately noticeable.

Voice cloning requires only 30-60 seconds of clean audio from the speaker. Record yourself (or anyone who has consented) in a quiet environment, upload to ElevenLabs, and the AI creates a voice model that sounds remarkably similar to the original speaker. Text you type is then read aloud in that voice. Applications: create demos narrated "by you" without recording a full video, create consistent voice assets for a project without doing multiple recording sessions.

The free tier gives 10,000 characters per month — roughly 10-15 minutes of audio. This is enough for short product demos, portfolio video narrations, and experimentation. Characters used by spaces and punctuation count against the limit, so denser text uses more characters per minute of audio. Plan what you need to say carefully before generating to stay within limits.

The API is straightforward for building applications. Five lines of Python generate an audio file from any text string. For applications that need to read text aloud — screen readers, learning applications, navigation systems — ElevenLabs provides voice quality that would otherwise require expensive professional voice talent.` }]
const canDo = [
  'Add professional voiceover to demo and portfolio project videos',
  'Create an AI voice that sounds like you from a 30-second recording',
  'Build text-to-speech features in applications with human-quality audio output',
  'Generate audio in multiple languages and accents for multilingual applications',
  'Create consistent voice assets for any project without repeated recording sessions',
]
const task = {
  title: 'Portfolio Project Demo Video Narration',
  description: 'Create a 60-second audio narration for your most important portfolio project and use it to add voiceover to a screen recording demo.',
  steps: [
    'Sign up at elevenlabs.io (free, 10,000 characters monthly)',
    'Write a 60-second narration script for your project (roughly 150 words)',
    'Try 3 different built-in voices — professional, conversational, energetic',
    'Generate the audio in your preferred voice',
    'Record a screen recording of your project using OBS (free) or loom.com',
    'Combine using any video editor or upload to YouTube with the audio track added',
  ],
  cost: 'TOTAL COST: ₹0 — 60-second narration uses approximately 900 characters (well within free tier)',
}
const tip = `Plan your narration carefully before generating. The free 10,000 characters/month sounds like a lot until you realize long videos use it quickly. Write your script first, count characters (character counter in any text editor), then generate. For longer content, prioritize which part benefits most from professional narration — usually the opening 30-60 seconds that viewers see first.`
export default function ElevenLabsPage() {
  return <ToolPageLayout tool={tool} videos={videos} overview={overview} sections={sections} canDo={canDo} task={task} tip={tip} />
}

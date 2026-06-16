import ToolPageLayout from '../ToolPageLayout'
const tool = { id: 'whisper', category: 'voice', name: 'OpenAI Whisper', tagline: 'Free speech-to-text — transcribe anything accurately', icon: '🎤', color: '#10B981', free: true, freeTier: '100% Free — open source', officialUrl: 'https://openai.com/research/whisper' }
const videos = [{ label: 'OpenAI Whisper Tutorial — Speech to Text Python', url: 'https://www.youtube.com/watch?v=dg_TWk8Zfjk', duration: '20 min', note: 'Complete tutorial from installation to transcription' }]
const overview = `Whisper is OpenAI's free, open-source speech recognition model. It transcribes audio to text with high accuracy across 100 languages. Run it locally in Python with zero cost or use it via API. For students, practical applications include transcribing lecture recordings, building voice-input features for applications, creating subtitles for demo videos, and processing interview recordings. No API key needed for local use.`
const sections = [{ content: `Installation and first use takes about 5 minutes. pip install openai-whisper, then one Python command to transcribe any audio file. The model downloads on first use (varies from 75MB for the tiny model to 3GB for the large model) and caches locally. The tiny and base models run fast on any hardware. The medium and large models provide significantly better accuracy, particularly for accented speech and technical vocabulary.

The available model sizes reflect a quality-speed tradeoff. Tiny (75MB): fast but less accurate, good for clear speech in quiet environments. Base (145MB): good balance of speed and quality for most use cases. Small (480MB): noticeably better accuracy, still fast. Medium (1.5GB): near human-level accuracy for most languages. Large (3GB): best available accuracy, slower. For transcribing lectures or meetings on a laptop, the small or medium model is typically the right choice.

Language detection is automatic. Whisper detects the spoken language without you specifying it. For multilingual content — a lecture that switches between English and another language, or a dataset with multiple languages — Whisper handles this well. The translation mode can translate from any of the 100 supported languages directly to English text.

For building applications, the openai Python library provides Whisper via API (pay-per-minute, very cheap — $0.006/minute) for faster, cloud-based transcription. The local version is always free and works offline. For offline processing of your own recordings, use local Whisper. For a production app that needs to transcribe user audio in real-time, the API is more practical.` }]
const canDo = [
  'Transcribe any audio or video file to text — lectures, meetings, interviews — completely free',
  'Build voice input features for Python or web applications using the local library',
  'Automatically subtitle any video content you create for demos or tutorials',
  'Process recorded interviews and meetings into searchable text transcripts',
  'Transcribe lectures in 100 languages including Hindi, Tamil, and other Indian languages',
]
const task = {
  title: 'Lecture Note Generator',
  description: 'Build a Python script that takes a recorded lecture audio file and produces a formatted text transcript with timestamps. Use it to transcribe one of your actual lecture recordings.',
  steps: [
    'pip install openai-whisper',
    'Choose model: whisper.load_model("small") for good accuracy',
    'result = model.transcribe("lecture.mp3", word_timestamps=True)',
    'Format output: create paragraphs every 60 seconds using the timestamp data',
    'Save as a text file with timestamps at the start of each paragraph',
    'Test on a real 10-minute lecture recording — evaluate accuracy and usefulness',
  ],
  cost: 'TOTAL COST: ₹0 — Whisper is completely free and runs locally',
}
const tip = `For Indian-accented English or regional Indian languages, the medium or large model makes a significant accuracy difference over the small model. The time cost (2-3 minutes to transcribe a 1-hour lecture on the medium model) is easily worth the accuracy gain. Run it overnight for long recordings.`
export default function WhisperPage() {
  return <ToolPageLayout tool={tool} videos={videos} overview={overview} sections={sections} canDo={canDo} task={task} tip={tip} />
}

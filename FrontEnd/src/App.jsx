import { lazy, Suspense, useEffect } from 'react'
import PageTransitionLoader from './components/loaders/PageTransitionLoader'
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation, useNavigationType } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import GuestRoute from './components/GuestRoute'
import ErrorBoundary from './components/ErrorBoundary'
import FeedbackNudge from './components/FeedbackNudge'
import ScrollToTop from './components/ScrollToTop'
import ReportButton from './components/ReportButton'
import AutoHideNav from './components/AutoHideNav'
import GlobalSearchOverlay from './components/GlobalSearchOverlay'
import SiteFooter from './components/SiteFooter'
import { resolveSeo } from './utils/documentTitle'

// ── Page components — lazy loaded ─────────────────────────────────────────────
// Each route loads its chunk only when first visited; subsequent visits use cache
const LandingPage              = lazy(() => import('./pages/landing'))
const LoaderDemo               = lazy(() => import('./pages/LoaderDemo'))
const AuthLayoutShell            = lazy(() => import('./pages/auth/AuthLayoutShell'))
const LoginForm                  = lazy(() => import('./pages/auth/LoginForm'))
const RegisterForm               = lazy(() => import('./pages/auth/RegisterForm'))
const ForgotPasswordForm         = lazy(() => import('./pages/auth/ForgotPasswordForm'))
const NotFoundPage             = lazy(() => import('./pages/NotFoundPage'))
const AboutPage                = lazy(() => import('./pages/AboutPage'))
const ContactPage              = lazy(() => import('./pages/ContactPage'))
const TermsPage                = lazy(() => import('./pages/TermsPage'))
const PrivacyPage              = lazy(() => import('./pages/PrivacyPage'))

const MyBookmarksPage         = lazy(() => import('./pages/MyBookmarksPage'))
const MyProfilePage           = lazy(() => import('./pages/MyProfilePage'))
const PublicProfilePage       = lazy(() => import('./pages/PublicProfilePage'))

const MissionsPage             = lazy(() => import('./pages/MissionsPage'))
const MissionDetailPage        = lazy(() => import('./pages/MissionDetailPage'))
const ResumePage               = lazy(() => import('./pages/resume/ResumePage'))
const SharedResumePage         = lazy(() => import('./pages/resume/SharedResumePage'))
const JobsPage                 = lazy(() => import('./pages/JobsPage'))
const FresherInstructionsPage  = lazy(() => import('./pages/FresherInstructionsPage'))
const CareerGuidancePage       = lazy(() => import('./pages/CareerGuidancePage'))

const AILabPage                = lazy(() => import('./pages/ailab/AILabPage'))
const AIToolPage               = lazy(() => import('./pages/ailab/AIToolPage'))

const DeploymentGuidePage      = lazy(() => import('./pages/DeploymentGuidePage'))
const ReactDeployPage          = lazy(() => import('./pages/deployment/ReactDeployPage'))
const DjangoDeployPage         = lazy(() => import('./pages/deployment/DjangoDeployPage'))
const HtmlStaticDeployPage     = lazy(() => import('./pages/deployment/HtmlStaticDeployPage'))
const DjangoFullstackDeployPage= lazy(() => import('./pages/deployment/DjangoFullstackDeployPage'))
const SpringBootDeployPage     = lazy(() => import('./pages/deployment/SpringBootDeployPage'))
const NodeJsDeployPage         = lazy(() => import('./pages/deployment/NodeJsDeployPage'))
const MernDeployPage           = lazy(() => import('./pages/deployment/MernDeployPage'))
const NextJsDeployPage         = lazy(() => import('./pages/deployment/NextJsDeployPage'))
const FastApiDeployPage        = lazy(() => import('./pages/deployment/FastApiDeployPage'))
const FlaskDeployPage          = lazy(() => import('./pages/deployment/FlaskDeployPage'))
const MongoAtlasPage           = lazy(() => import('./pages/deployment/MongoAtlasPage'))
const NeonPostgresPage         = lazy(() => import('./pages/deployment/NeonPostgresPage'))
const SupabaseDeployPage       = lazy(() => import('./pages/deployment/SupabaseDeployPage'))
const RenderPostgresPage       = lazy(() => import('./pages/deployment/RenderPostgresPage'))
const AivenPage                = lazy(() => import('./pages/deployment/AivenPage'))
const UpstashRedisPage         = lazy(() => import('./pages/deployment/UpstashRedisPage'))
const TursoPage                = lazy(() => import('./pages/deployment/TursoPage'))
const AngularDeployPage        = lazy(() => import('./pages/deployment/AngularDeployPage'))
const AstroDeployPage          = lazy(() => import('./pages/deployment/AstroDeployPage'))
const CloudflarePagesDeployPage= lazy(() => import('./pages/deployment/CloudflarePagesDeployPage'))
const SvelteKitDeployPage      = lazy(() => import('./pages/deployment/SvelteKitDeployPage'))
const FirebaseDeployPage       = lazy(() => import('./pages/deployment/FirebaseDeployPage'))
const DockerDeployPage         = lazy(() => import('./pages/deployment/DockerDeployPage'))
const PythonAnywhereDeployPage = lazy(() => import('./pages/deployment/PythonAnywhereDeployPage'))
const DenoDeployPage           = lazy(() => import('./pages/deployment/DenoDeployPage'))
const KoyebDeployPage          = lazy(() => import('./pages/deployment/KoyebDeployPage'))
const FlutterDeployPage        = lazy(() => import('./pages/deployment/FlutterDeployPage'))
const TelegramBotDeployPage    = lazy(() => import('./pages/deployment/TelegramBotDeployPage'))
const StreamlitDeployPage      = lazy(() => import('./pages/deployment/StreamlitDeployPage'))
const ChatbotDeployPage        = lazy(() => import('./pages/deployment/ChatbotDeployPage'))
const NlpDemoPage              = lazy(() => import('./pages/deployment/NlpDemoPage'))
const ImageAiPage              = lazy(() => import('./pages/deployment/ImageAiPage'))
const RagAppPage               = lazy(() => import('./pages/deployment/RagAppPage'))
const HeavyModelPage           = lazy(() => import('./pages/deployment/HeavyModelPage'))
const VueDeployPage            = lazy(() => import('./pages/deployment/VueDeployPage'))
const DiscordBotDeployPage     = lazy(() => import('./pages/deployment/DiscordBotDeployPage'))
const ScraperDeployPage        = lazy(() => import('./pages/deployment/ScraperDeployPage'))
const ExpoDeployPage           = lazy(() => import('./pages/deployment/ExpoDeployPage'))

const ProblemSolvingPage       = lazy(() => import('./pages/problem-solving/ProblemSolvingPage'))
const TrackPage                = lazy(() => import('./pages/problem-solving/TrackPage'))
const ProblemDetailPage        = lazy(() => import('./pages/problem-solving/ProblemDetailPage'))

const AptitudePage             = lazy(() => import('./pages/aptitude/AptitudePage'))
const AptitudeCategoryPage     = lazy(() => import('./pages/aptitude/AptitudeCategoryPage'))
const AptitudeGroupPage        = lazy(() => import('./pages/aptitude/AptitudeGroupPage'))
const AptitudeTopicPage        = lazy(() => import('./pages/aptitude/AptitudeTopicPage'))
const AptitudeQuestionsPage    = lazy(() => import('./pages/aptitude/AptitudeQuestionsPage'))

const DashboardPage            = lazy(() => import('./pages/student-skill-arena/DashboardPage'))
const RoadmapDetailPage        = lazy(() => import('./pages/student-skill-arena/RoadmapDetailPage'))
const QuizPage                 = lazy(() => import('./pages/student-skill-arena/QuizPage'))
const QuizResultPage           = lazy(() => import('./pages/student-skill-arena/QuizResultPage'))
const CertificateViewPage      = lazy(() => import('./pages/student-skill-arena/certificates/CertificateViewPage'))
const CertificateVerifyPage    = lazy(() => import('./pages/certificates/CertificateVerifyPage'))

const AdminDashboard           = lazy(() => import('./pages/admin-skill-arena/AdminDashboard'))
const AdminUsers               = lazy(() => import('./pages/admin-skill-arena/AdminUsers'))
const AdminSubjects            = lazy(() => import('./pages/admin-skill-arena/AdminSubjects'))
const AdminConcepts            = lazy(() => import('./pages/admin-skill-arena/AdminConcepts'))
const AdminRoadmaps            = lazy(() => import('./pages/admin-skill-arena/AdminRoadmaps'))
const AdminQuestions           = lazy(() => import('./pages/admin-skill-arena/AdminQuestions'))
const AdminFeedbacks           = lazy(() => import('./pages/admin-skill-arena/AdminFeedbacks'))
const AdminReports             = lazy(() => import('./pages/admin-skill-arena/AdminReports'))
const AdminMissions            = lazy(() => import('./pages/admin-skill-arena/AdminMissions'))
const AdminProblems            = lazy(() => import('./pages/admin-skill-arena/AdminProblems'))
const AdminAptitude            = lazy(() => import('./pages/admin-skill-arena/AdminAptitude'))
const AdminWalkIns             = lazy(() => import('./pages/admin-skill-arena/AdminWalkIns'))
// ──────────────────────────────────────────────────────────────────────────────

function GlobalReportButton() {
  const { pathname } = useLocation()
  const hide = pathname.startsWith('/admin') || pathname.startsWith('/r/') || pathname === '/login' || pathname === '/register' || pathname === '/forgot-password' || pathname === '/loader-demo'
  if (hide) return null
  return <ReportButton variant="floating" />
}

// Global footer on every content page. Hidden on the app-like fullscreen
// surfaces (Skill Arena, admin panels, auth stages, loader demo) where a
// marketing footer would break the fixed-height / focused-task UX.
function GlobalFooter() {
  const { pathname } = useLocation()
  const hide =
    pathname.startsWith('/skill-arena') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/u/') ||
    pathname.startsWith('/r/') ||
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/forgot-password' ||
    pathname === '/loader-demo'
  if (hide) return null
  return <SiteFooter />
}

function ScrollResetter() {
  const { pathname } = useLocation()
  const navType = useNavigationType()
  useEffect(() => {
    if (navType !== 'POP') window.scrollTo(0, 0)
  }, [pathname, navType])
  return null
}

// Keeps title + description + canonical + Open Graph + robots in sync on every
// client-side navigation. In an SPA the static index.html only describes the
// landing page, so we mutate the DOM head per route for search + social crawlers.
function setMeta(selector, attr, value, create) {
  let el = document.head.querySelector(selector)
  if (!el && create) { el = create(); document.head.appendChild(el) }
  if (el) el.setAttribute(attr, value)
  return el
}

function Seo() {
  const { pathname } = useLocation()
  useEffect(() => {
    const { title, description, keywords, canonical, noindex } = resolveSeo(pathname)

    document.title = title

    setMeta('meta[name="description"]', 'content', description,
      () => Object.assign(document.createElement('meta'), { name: 'description' }))

    setMeta('meta[name="keywords"]', 'content', keywords,
      () => Object.assign(document.createElement('meta'), { name: 'keywords' }))

    setMeta('link[rel="canonical"]', 'href', canonical,
      () => Object.assign(document.createElement('link'), { rel: 'canonical' }))

    setMeta('meta[property="og:title"]', 'content', title,
      () => { const m = document.createElement('meta'); m.setAttribute('property', 'og:title'); return m })
    setMeta('meta[property="og:description"]', 'content', description,
      () => { const m = document.createElement('meta'); m.setAttribute('property', 'og:description'); return m })
    setMeta('meta[property="og:url"]', 'content', canonical,
      () => { const m = document.createElement('meta'); m.setAttribute('property', 'og:url'); return m })
    setMeta('meta[name="twitter:title"]', 'content', title,
      () => Object.assign(document.createElement('meta'), { name: 'twitter:title' }))
    setMeta('meta[name="twitter:description"]', 'content', description,
      () => Object.assign(document.createElement('meta'), { name: 'twitter:description' }))

    // Private/authenticated routes should never be indexed even if a bot runs JS.
    setMeta('meta[name="robots"]', 'content', noindex ? 'noindex, nofollow' : 'index, follow',
      () => Object.assign(document.createElement('meta'), { name: 'robots' }))
  }, [pathname])
  return null
}

// Prefetch common page chunks in the background after app is idle.
// Runs once — subsequent visits use the browser cache.
function usePrefetchRoutes() {
  useEffect(() => {
    const run = () => {
      import('./pages/landing')
      import('./pages/auth/LoginForm')
      import('./pages/auth/RegisterForm')
      import('./pages/MissionsPage')
      import('./pages/JobsPage')
      import('./pages/ailab/AILabPage')
      import('./pages/DeploymentGuidePage')
      import('./pages/problem-solving/ProblemSolvingPage')
      import('./pages/student-skill-arena/DashboardPage')
      import('./pages/FresherInstructionsPage')
      import('./pages/CareerGuidancePage')
    }
    if ('requestIdleCallback' in window) {
      requestIdleCallback(run)
    } else {
      setTimeout(run, 800)
    }
  }, [])
}

function App() {
  usePrefetchRoutes()
  // App mounted successfully — clear the one-shot stale-chunk reload guard so a future
  // redeploy can auto-reload again if the user hits a purged chunk.
  useEffect(() => { sessionStorage.removeItem('sl_chunk_reloaded') }, [])
  return (
    <ErrorBoundary>
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <ScrollResetter />
        <Seo />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <FeedbackNudge />
        <ScrollToTop />
        <AutoHideNav />
        <GlobalReportButton />
        <GlobalSearchOverlay />
        <Suspense fallback={<PageTransitionLoader />}>
          <Routes>
            {/* Landing */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/loader-demo" element={<LoaderDemo />} />

            {/* Auth — guests only; logged-in users redirect home or ?redirect= */}
            <Route element={<GuestRoute />}>
              <Route element={<AuthLayoutShell />}>
                <Route path="/login"             element={<LoginForm />} />
                <Route path="/register"          element={<RegisterForm />} />
                <Route path="/forgot-password"   element={<ForgotPasswordForm />} />
              </Route>
            </Route>
            <Route path="/about"   element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms"   element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/missions" element={<MissionsPage />} />
            <Route path="/walk-ins" element={<JobsPage />} />
            <Route path="/fresher-instructions" element={<FresherInstructionsPage />} />
            <Route path="/ai-lab" element={<AILabPage />} />
            {/* AI tool detail — requires login */}
            <Route path="/ai-lab/:category/:toolId" element={<ProtectedRoute><AIToolPage /></ProtectedRoute>} />
            <Route path="/fresher-instructions/career-guidance" element={<CareerGuidancePage />} />
            <Route path="/deployment" element={<DeploymentGuidePage />} />
            {/* Deployment guide detail pages — list is public, each guide requires login */}
            <Route element={<ProtectedRoute><Outlet /></ProtectedRoute>}>
              <Route path="/deployment/react"            element={<ReactDeployPage />} />
              <Route path="/deployment/django"           element={<DjangoDeployPage />} />
              <Route path="/deployment/html-static"      element={<HtmlStaticDeployPage />} />
              <Route path="/deployment/django-fullstack" element={<DjangoFullstackDeployPage />} />
              <Route path="/deployment/springboot"       element={<SpringBootDeployPage />} />
              <Route path="/deployment/nodejs"           element={<NodeJsDeployPage />} />
              <Route path="/deployment/mern"             element={<MernDeployPage />} />
              <Route path="/deployment/nextjs"           element={<NextJsDeployPage />} />
              <Route path="/deployment/fastapi"          element={<FastApiDeployPage />} />
              <Route path="/deployment/flask"            element={<FlaskDeployPage />} />
              <Route path="/deployment/mongodb-atlas"    element={<MongoAtlasPage />} />
              <Route path="/deployment/neon-postgres"    element={<NeonPostgresPage />} />
              <Route path="/deployment/supabase"         element={<SupabaseDeployPage />} />
              <Route path="/deployment/render-postgres"  element={<RenderPostgresPage />} />
              <Route path="/deployment/aiven"            element={<AivenPage />} />
              <Route path="/deployment/upstash-redis"    element={<UpstashRedisPage />} />
              <Route path="/deployment/turso"            element={<TursoPage />} />
              <Route path="/deployment/angular"          element={<AngularDeployPage />} />
              <Route path="/deployment/astro"            element={<AstroDeployPage />} />
              <Route path="/deployment/cloudflare-pages" element={<CloudflarePagesDeployPage />} />
              <Route path="/deployment/sveltekit"        element={<SvelteKitDeployPage />} />
              <Route path="/deployment/firebase"         element={<FirebaseDeployPage />} />
              <Route path="/deployment/docker"           element={<DockerDeployPage />} />
              <Route path="/deployment/pythonanywhere"   element={<PythonAnywhereDeployPage />} />
              <Route path="/deployment/deno-deploy"      element={<DenoDeployPage />} />
              <Route path="/deployment/koyeb"            element={<KoyebDeployPage />} />
              <Route path="/deployment/flutter"          element={<FlutterDeployPage />} />
              <Route path="/deployment/telegram-bot"     element={<TelegramBotDeployPage />} />
              <Route path="/deployment/streamlit"          element={<StreamlitDeployPage />} />
              <Route path="/deployment/chatbot-deploy"   element={<ChatbotDeployPage />} />
              <Route path="/deployment/nlp-demo"         element={<NlpDemoPage />} />
              <Route path="/deployment/image-ai"         element={<ImageAiPage />} />
              <Route path="/deployment/rag-app"             element={<RagAppPage />} />
              <Route path="/deployment/heavy-model-deploy" element={<HeavyModelPage />} />
              <Route path="/deployment/vue"                element={<VueDeployPage />} />
              <Route path="/deployment/discord-bot"        element={<DiscordBotDeployPage />} />
              <Route path="/deployment/scraper-automation" element={<ScraperDeployPage />} />
              <Route path="/deployment/expo-mobile"        element={<ExpoDeployPage />} />
            </Route>
            <Route path="/problem-solving" element={<ProblemSolvingPage />} />
            <Route path="/problem-solving/start-coding"    element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
            <Route path="/problem-solving/logic-building"  element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
            <Route path="/problem-solving/skill-up"        element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
            <Route path="/problem-solving/crack-it"  element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
            <Route path="/problem-solving/build-it" element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
            <Route path="/problem-solving/prove-it"        element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
            <Route path="/problem-solving/:id"             element={<ProtectedRoute><ProblemDetailPage /></ProtectedRoute>} />

            {/* Aptitude — browsing (category → group → topic list) is public,
                but opening a topic's lesson + its questions requires login. */}
            <Route path="/aptitude" element={<AptitudePage />} />
            <Route path="/aptitude/:category" element={<AptitudeCategoryPage />} />
            <Route path="/aptitude/:category/:group" element={<AptitudeGroupPage />} />
            <Route path="/aptitude/:category/:group/:topicId" element={<ProtectedRoute><AptitudeTopicPage /></ProtectedRoute>} />
            <Route path="/aptitude/:category/:group/:topicId/questions" element={<ProtectedRoute><AptitudeQuestionsPage /></ProtectedRoute>} />

            {/* Missions detail — requires login */}
            <Route path="/missions/:id" element={<ProtectedRoute><MissionDetailPage /></ProtectedRoute>} />

            {/* Resume builder + ATS guide — public. Saving & downloading the PDF
                require a registered (non-guest) account; gated inside the page. */}
            <Route path="/resume" element={<ResumePage />} />

            {/* Public shareable resume — anyone with the link can view + download */}
            <Route path="/r/:slug" element={<SharedResumePage />} />

            {/* Public shareable profile — no auth required */}
            <Route path="/u/:username" element={<PublicProfilePage />} />

            {/* Public certificate verification — no auth required */}
            <Route path="/certificate/verify"       element={<CertificateVerifyPage />} />
            <Route path="/certificate/verify/:code" element={<CertificateVerifyPage />} />
            <Route path="/verify/:code"             element={<CertificateVerifyPage />} />

            {/* Bookmarks + profile — require login (standalone pages, no sidebar) */}
            <Route path="/bookmarks" element={<ProtectedRoute><MyBookmarksPage /></ProtectedRoute>} />
            <Route path="/myprofile" element={<ProtectedRoute><MyProfilePage /></ProtectedRoute>} />

            {/* ── Student: skill-arena ── */}
            <Route path="/skill-arena/dashboard"              element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/skill-arena/roadmaps/:id"           element={<ProtectedRoute><RoadmapDetailPage /></ProtectedRoute>} />
            <Route path="/skill-arena/quiz/:type/:refId"      element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path="/skill-arena/quiz/result/:attemptId" element={<ProtectedRoute><QuizResultPage /></ProtectedRoute>} />
            <Route path="/skill-arena/certificates/:id"       element={<ProtectedRoute><CertificateViewPage /></ProtectedRoute>} />

            {/* Backward-compat redirects (old bookmark URLs) */}
            <Route path="/skill-arena/history"      element={<Navigate to="/skill-arena/dashboard?view=history"      replace />} />
            <Route path="/skill-arena/badges"       element={<Navigate to="/skill-arena/dashboard?view=badges"       replace />} />
            <Route path="/skill-arena/certificates" element={<Navigate to="/skill-arena/dashboard?view=certificates" replace />} />
            <Route path="/skill-arena/subjects"     element={<Navigate to="/skill-arena/dashboard?view=gates"  replace />} />
            <Route path="/skill-arena/subjects/:id" element={<Navigate to="/skill-arena/dashboard?view=gates"  replace />} />
            <Route path="/skill-arena/concepts/:id" element={<Navigate to="/skill-arena/dashboard?view=gates"  replace />} />
            <Route path="/skill-arena/roadmaps"     element={<Navigate to="/skill-arena/dashboard?view=paths"  replace />} />

            {/* ── Admin: admin-skill-arena ── */}
            <Route path="/admin-skill-arena"              element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin-skill-arena/users"        element={<ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin-skill-arena/subjects"     element={<ProtectedRoute adminOnly><AdminSubjects /></ProtectedRoute>} />
            <Route path="/admin-skill-arena/concepts"     element={<ProtectedRoute adminOnly><AdminConcepts /></ProtectedRoute>} />
            <Route path="/admin-skill-arena/roadmaps"     element={<ProtectedRoute adminOnly><AdminRoadmaps /></ProtectedRoute>} />
            <Route path="/admin-skill-arena/questions"    element={<ProtectedRoute adminOnly><AdminQuestions /></ProtectedRoute>} />
            <Route path="/admin-skill-arena/feedbacks"    element={<ProtectedRoute adminOnly><AdminFeedbacks /></ProtectedRoute>} />
            <Route path="/admin-skill-arena/reports"      element={<ProtectedRoute adminOnly><AdminReports /></ProtectedRoute>} />
            <Route path="/admin-skill-arena/missions"     element={<ProtectedRoute adminOnly><AdminMissions /></ProtectedRoute>} />
            <Route path="/admin-skill-arena/problems"     element={<ProtectedRoute adminOnly><AdminProblems /></ProtectedRoute>} />
            <Route path="/admin-skill-arena/aptitude"     element={<ProtectedRoute adminOnly><AdminAptitude /></ProtectedRoute>} />
            <Route path="/admin-skill-arena/walk-ins"    element={<ProtectedRoute adminOnly><AdminWalkIns /></ProtectedRoute>} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
        <GlobalFooter />
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App

import { lazy, Suspense, useEffect } from 'react'
import PageTransitionLoader from './components/loaders/PageTransitionLoader'
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation, useNavigationType, useParams } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ConfirmProvider } from './context/ConfirmContext'
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

/** Old /problem-solving/:slug bookmarks → /code-gym/:slug */
function LegacyCodeGymRedirect() {
  const { slug } = useParams()
  return <Navigate to={`/code-gym/${slug}`} replace />
}

// Per-history-entry scroll positions, keyed by the router location key.
const scrollPositions = new Map()

function ScrollResetter() {
  const location = useLocation()
  const navType = useNavigationType()
  const key = location.key

  // Continuously record the real scroll position for the current entry — but
  // NEVER while an overlay has the body locked (mobile menus pin the body with
  // position:fixed, so window.scrollY reads 0 then; recording it would clobber
  // the true position we need to restore on back-navigation).
  useEffect(() => {
    const onScroll = () => {
      if (document.documentElement.classList.contains('scroll-locked')) return
      scrollPositions.set(key, window.scrollY)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [key])

  // Forward navigation → top. Back/forward (POP) → restore the saved position.
  // Desktop already restores correctly via the browser; on mobile the body-lock
  // zeroes the browser's snapshot, so we re-apply the position we tracked.
  useEffect(() => {
    if (navType !== 'POP') {
      window.scrollTo(0, 0)
      return
    }
    const y = scrollPositions.get(key)
    if (y != null) requestAnimationFrame(() => window.scrollTo(0, y))
  }, [key, navType])

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

// Stable toast config — hoisted so it isn't re-created on every AppShell render.
const TOAST_OPTIONS = { duration: 3000 }

// Prefetch common page chunks in the background after app is idle.
// Runs once — subsequent visits use the browser cache.
// The dashboard chunk is heavy and only useful to logged-in hunters, so it is
// prefetched only when an active session exists — logged-out / landing-only
// visitors never pay for it.
function usePrefetchRoutes(hasSession) {
  useEffect(() => {
    const run = () => {
      import('./pages/landing')
      import('./pages/auth/LoginForm')
      import('./pages/auth/RegisterForm')
      import('./pages/MissionsPage')
      import('./pages/JobsPage')
      import('./pages/problem-solving/ProblemSolvingPage')
      if (hasSession) import('./pages/student-skill-arena/DashboardPage')
      import('./pages/FresherInstructionsPage')
      import('./pages/CareerGuidancePage')
    }
    if ('requestIdleCallback' in window) {
      requestIdleCallback(run)
    } else {
      setTimeout(run, 800)
    }
  }, [hasSession])
}

function AppShell() {
  const { isAuthenticated } = useAuth()
  usePrefetchRoutes(isAuthenticated)
  useEffect(() => { sessionStorage.removeItem('sl_chunk_reloaded') }, [])
  return (
    <>
      <ScrollResetter />
      <Seo />
      <Toaster position="top-right" toastOptions={TOAST_OPTIONS} />
      <FeedbackNudge />
      <ScrollToTop />
      <AutoHideNav />
      <GlobalReportButton />
      <GlobalSearchOverlay />
      <Suspense fallback={<PageTransitionLoader />}>
        <Outlet />
      </Suspense>
      <GlobalFooter />
    </>
  )
}

const router = createBrowserRouter([
  {
    element: <AppShell />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/loader-demo', element: import.meta.env.DEV ? <LoaderDemo /> : <Navigate to="/" replace /> },
      {
        element: <GuestRoute />,
        children: [
          {
            element: <AuthLayoutShell />,
            children: [
              { path: '/login', element: <LoginForm /> },
              { path: '/register', element: <RegisterForm /> },
              { path: '/forgot-password', element: <ForgotPasswordForm /> },
            ],
          },
        ],
      },
      { path: '/about', element: <AboutPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/terms', element: <TermsPage /> },
      { path: '/privacy', element: <PrivacyPage /> },
      { path: '/missions', element: <MissionsPage /> },
      { path: '/walk-ins', element: <JobsPage /> },
      { path: '/fresher-instructions', element: <FresherInstructionsPage /> },
      { path: '/ai-lab', element: <AILabPage /> },
      { path: '/ai-lab/:category/:toolId', element: <ProtectedRoute><AIToolPage /></ProtectedRoute> },
      { path: '/fresher-instructions/career-guidance', element: <CareerGuidancePage /> },
      { path: '/deployment', element: <DeploymentGuidePage /> },
      {
        element: <ProtectedRoute><Outlet /></ProtectedRoute>,
        children: [
          { path: '/deployment/react', element: <ReactDeployPage /> },
          { path: '/deployment/django', element: <DjangoDeployPage /> },
          { path: '/deployment/html-static', element: <HtmlStaticDeployPage /> },
          { path: '/deployment/django-fullstack', element: <DjangoFullstackDeployPage /> },
          { path: '/deployment/springboot', element: <SpringBootDeployPage /> },
          { path: '/deployment/nodejs', element: <NodeJsDeployPage /> },
          { path: '/deployment/mern', element: <MernDeployPage /> },
          { path: '/deployment/nextjs', element: <NextJsDeployPage /> },
          { path: '/deployment/fastapi', element: <FastApiDeployPage /> },
          { path: '/deployment/flask', element: <FlaskDeployPage /> },
          { path: '/deployment/mongodb-atlas', element: <MongoAtlasPage /> },
          { path: '/deployment/neon-postgres', element: <NeonPostgresPage /> },
          { path: '/deployment/supabase', element: <SupabaseDeployPage /> },
          { path: '/deployment/render-postgres', element: <RenderPostgresPage /> },
          { path: '/deployment/aiven', element: <AivenPage /> },
          { path: '/deployment/upstash-redis', element: <UpstashRedisPage /> },
          { path: '/deployment/turso', element: <TursoPage /> },
          { path: '/deployment/angular', element: <AngularDeployPage /> },
          { path: '/deployment/astro', element: <AstroDeployPage /> },
          { path: '/deployment/cloudflare-pages', element: <CloudflarePagesDeployPage /> },
          { path: '/deployment/sveltekit', element: <SvelteKitDeployPage /> },
          { path: '/deployment/firebase', element: <FirebaseDeployPage /> },
          { path: '/deployment/docker', element: <DockerDeployPage /> },
          { path: '/deployment/pythonanywhere', element: <PythonAnywhereDeployPage /> },
          { path: '/deployment/deno-deploy', element: <DenoDeployPage /> },
          { path: '/deployment/koyeb', element: <KoyebDeployPage /> },
          { path: '/deployment/flutter', element: <FlutterDeployPage /> },
          { path: '/deployment/telegram-bot', element: <TelegramBotDeployPage /> },
          { path: '/deployment/streamlit', element: <StreamlitDeployPage /> },
          { path: '/deployment/chatbot-deploy', element: <ChatbotDeployPage /> },
          { path: '/deployment/nlp-demo', element: <NlpDemoPage /> },
          { path: '/deployment/image-ai', element: <ImageAiPage /> },
          { path: '/deployment/rag-app', element: <RagAppPage /> },
          { path: '/deployment/heavy-model-deploy', element: <HeavyModelPage /> },
          { path: '/deployment/vue', element: <VueDeployPage /> },
          { path: '/deployment/discord-bot', element: <DiscordBotDeployPage /> },
          { path: '/deployment/scraper-automation', element: <ScraperDeployPage /> },
          { path: '/deployment/expo-mobile', element: <ExpoDeployPage /> },
        ],
      },
      // Code Gym — authenticated (landing, tracks, problem workspace)
      { path: '/code-gym', element: <ProtectedRoute><ProblemSolvingPage /></ProtectedRoute> },
      { path: '/code-gym/start-coding', element: <ProtectedRoute><TrackPage /></ProtectedRoute> },
      { path: '/code-gym/logic-building', element: <ProtectedRoute><TrackPage /></ProtectedRoute> },
      { path: '/code-gym/skill-up', element: <ProtectedRoute><TrackPage /></ProtectedRoute> },
      { path: '/code-gym/crack-it', element: <ProtectedRoute><TrackPage /></ProtectedRoute> },
      { path: '/code-gym/build-it', element: <ProtectedRoute><TrackPage /></ProtectedRoute> },
      { path: '/code-gym/prove-it', element: <ProtectedRoute><TrackPage /></ProtectedRoute> },
      { path: '/code-gym/:id', element: <ProtectedRoute><ProblemDetailPage /></ProtectedRoute> },
      // Legacy /problem-solving → /code-gym
      { path: '/problem-solving', element: <Navigate to="/code-gym" replace /> },
      { path: '/problem-solving/:slug', element: <LegacyCodeGymRedirect /> },
      { path: '/aptitude', element: <AptitudePage /> },
      { path: '/aptitude/:category', element: <AptitudeCategoryPage /> },
      { path: '/aptitude/:category/:group', element: <AptitudeGroupPage /> },
      { path: '/aptitude/:category/:group/:topicId', element: <ProtectedRoute><AptitudeTopicPage /></ProtectedRoute> },
      { path: '/aptitude/:category/:group/:topicId/questions', element: <ProtectedRoute><AptitudeQuestionsPage /></ProtectedRoute> },
      { path: '/missions/:id', element: <ProtectedRoute><MissionDetailPage /></ProtectedRoute> },
      { path: '/resume', element: <ResumePage /> },
      { path: '/r/:slug', element: <SharedResumePage /> },
      { path: '/u/:username', element: <PublicProfilePage /> },
      { path: '/certificate/verify', element: <CertificateVerifyPage /> },
      { path: '/certificate/verify/:code', element: <CertificateVerifyPage /> },
      { path: '/verify/:code', element: <CertificateVerifyPage /> },
      { path: '/bookmarks', element: <ProtectedRoute><MyBookmarksPage /></ProtectedRoute> },
      { path: '/myprofile', element: <ProtectedRoute><MyProfilePage /></ProtectedRoute> },
      { path: '/skill-arena/dashboard', element: <ProtectedRoute><DashboardPage /></ProtectedRoute> },
      { path: '/skill-arena/roadmaps/:id', element: <ProtectedRoute><RoadmapDetailPage /></ProtectedRoute> },
      { path: '/skill-arena/quiz/:type/:refId', element: <ProtectedRoute><QuizPage /></ProtectedRoute> },
      { path: '/skill-arena/quiz/result/:attemptId', element: <ProtectedRoute><QuizResultPage /></ProtectedRoute> },
      { path: '/skill-arena/certificates/:id', element: <ProtectedRoute><CertificateViewPage /></ProtectedRoute> },
      { path: '/skill-arena/history', element: <Navigate to="/skill-arena/dashboard?view=history" replace /> },
      { path: '/skill-arena/badges', element: <Navigate to="/skill-arena/dashboard?view=badges" replace /> },
      { path: '/skill-arena/certificates', element: <Navigate to="/skill-arena/dashboard?view=certificates" replace /> },
      { path: '/skill-arena/subjects', element: <Navigate to="/skill-arena/dashboard?view=gates" replace /> },
      { path: '/skill-arena/subjects/:id', element: <Navigate to="/skill-arena/dashboard?view=gates" replace /> },
      { path: '/skill-arena/concepts/:id', element: <Navigate to="/skill-arena/dashboard?view=gates" replace /> },
      { path: '/skill-arena/roadmaps', element: <Navigate to="/skill-arena/dashboard?view=paths" replace /> },
      { path: '/admin-skill-arena', element: <ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute> },
      { path: '/admin-skill-arena/users', element: <ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute> },
      { path: '/admin-skill-arena/subjects', element: <ProtectedRoute adminOnly><AdminSubjects /></ProtectedRoute> },
      { path: '/admin-skill-arena/concepts', element: <ProtectedRoute adminOnly><AdminConcepts /></ProtectedRoute> },
      { path: '/admin-skill-arena/roadmaps', element: <ProtectedRoute adminOnly><AdminRoadmaps /></ProtectedRoute> },
      { path: '/admin-skill-arena/questions', element: <ProtectedRoute adminOnly><AdminQuestions /></ProtectedRoute> },
      { path: '/admin-skill-arena/feedbacks', element: <ProtectedRoute adminOnly><AdminFeedbacks /></ProtectedRoute> },
      { path: '/admin-skill-arena/reports', element: <ProtectedRoute adminOnly><AdminReports /></ProtectedRoute> },
      { path: '/admin-skill-arena/missions', element: <ProtectedRoute adminOnly><AdminMissions /></ProtectedRoute> },
      { path: '/admin-skill-arena/problems', element: <ProtectedRoute adminOnly><AdminProblems /></ProtectedRoute> },
      { path: '/admin-skill-arena/aptitude', element: <ProtectedRoute adminOnly><AdminAptitude /></ProtectedRoute> },
      { path: '/admin-skill-arena/walk-ins', element: <ProtectedRoute adminOnly><AdminWalkIns /></ProtectedRoute> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])

function App() {
  return (
    <ErrorBoundary>
    <ThemeProvider>
    <AuthProvider>
    <ConfirmProvider>
      <RouterProvider router={router} />
    </ConfirmProvider>
    </AuthProvider>
    </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App

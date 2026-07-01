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

// ── Page components — lazy loaded ─────────────────────────────────────────────
// Each route loads its chunk only when first visited; subsequent visits use cache
const LandingPage              = lazy(() => import('./pages/landing'))
const LoaderDemo               = lazy(() => import('./pages/LoaderDemo'))
const AuthLayoutShell            = lazy(() => import('./pages/auth/AuthLayoutShell'))
const LoginForm                  = lazy(() => import('./pages/auth/LoginForm'))
const RegisterForm               = lazy(() => import('./pages/auth/RegisterForm'))
const ForgotPasswordForm         = lazy(() => import('./pages/auth/ForgotPasswordForm'))
const NotFoundPage             = lazy(() => import('./pages/NotFoundPage'))

const MissionsPage             = lazy(() => import('./pages/MissionsPage'))
const MissionDetailPage        = lazy(() => import('./pages/MissionDetailPage'))
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
const StreamlitDeployPage      = lazy(() => import('./pages/deployment/StreamlitDeployPage'))
const ChatbotDeployPage        = lazy(() => import('./pages/deployment/ChatbotDeployPage'))
const NlpDemoPage              = lazy(() => import('./pages/deployment/NlpDemoPage'))
const ImageAiPage              = lazy(() => import('./pages/deployment/ImageAiPage'))
const RagAppPage               = lazy(() => import('./pages/deployment/RagAppPage'))
const HeavyModelPage           = lazy(() => import('./pages/deployment/HeavyModelPage'))

const ProblemSolvingPage       = lazy(() => import('./pages/problem-solving/ProblemSolvingPage'))
const TrackPage                = lazy(() => import('./pages/problem-solving/TrackPage'))
const ProblemDetailPage        = lazy(() => import('./pages/problem-solving/ProblemDetailPage'))

const DashboardPage            = lazy(() => import('./pages/student-skill-arena/DashboardPage'))
const RoadmapDetailPage        = lazy(() => import('./pages/student-skill-arena/RoadmapDetailPage'))
const QuizPage                 = lazy(() => import('./pages/student-skill-arena/QuizPage'))
const QuizResultPage           = lazy(() => import('./pages/student-skill-arena/QuizResultPage'))

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
const AdminWalkIns             = lazy(() => import('./pages/admin-skill-arena/AdminWalkIns'))
// ──────────────────────────────────────────────────────────────────────────────

function GlobalReportButton() {
  const { pathname } = useLocation()
  const hide = pathname.startsWith('/admin') || pathname === '/login' || pathname === '/register' || pathname === '/forgot-password' || pathname === '/loader-demo'
  if (hide) return null
  return <ReportButton variant="floating" />
}

function ScrollResetter() {
  const { pathname } = useLocation()
  const navType = useNavigationType()
  useEffect(() => {
    if (navType !== 'POP') window.scrollTo(0, 0)
  }, [pathname, navType])
  return null
}

// Per-route <title> for better UX (browser tab / history) and SEO.
// Dynamic detail pages fall back to a section title; the base title is used for the rest.
const BASE_TITLE = 'LearnToEarn — Gamified Career Learning Platform'
const ROUTE_TITLES = {
  '/': BASE_TITLE,
  '/login': 'Sign In · LearnToEarn',
  '/register': 'Create Account · LearnToEarn',
  '/forgot-password': 'Reset Password · LearnToEarn',
  '/missions': 'Missions · LearnToEarn',
  '/walk-ins': 'Walk-In Drives · LearnToEarn',
  '/fresher-instructions': 'Fresher Guide · LearnToEarn',
  '/fresher-instructions/career-guidance': 'Career Guidance · LearnToEarn',
  '/ai-lab': 'AI Lab — 89+ AI Tools · LearnToEarn',
  '/deployment': 'Deployment Guides · LearnToEarn',
  '/problem-solving': 'Code GYM — Problem Solving · LearnToEarn',
  '/skill-arena/dashboard': 'Skill Arena · LearnToEarn',
}

function DocumentTitle() {
  const { pathname } = useLocation()
  useEffect(() => {
    let title = ROUTE_TITLES[pathname]
    if (!title) {
      if (pathname.startsWith('/ai-lab/')) title = 'AI Lab · LearnToEarn'
      else if (pathname.startsWith('/deployment/')) title = 'Deployment Guide · LearnToEarn'
      else if (pathname.startsWith('/problem-solving/')) title = 'Code GYM · LearnToEarn'
      else if (pathname.startsWith('/admin-skill-arena')) title = 'Admin · LearnToEarn'
      else if (pathname.startsWith('/skill-arena')) title = 'Skill Arena · LearnToEarn'
      else title = BASE_TITLE
    }
    document.title = title
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
  return (
    <ErrorBoundary>
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <ScrollResetter />
        <DocumentTitle />
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <FeedbackNudge />
        <ScrollToTop />
        <GlobalReportButton />
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
              <Route path="/deployment/streamlit"          element={<StreamlitDeployPage />} />
              <Route path="/deployment/chatbot-deploy"   element={<ChatbotDeployPage />} />
              <Route path="/deployment/nlp-demo"         element={<NlpDemoPage />} />
              <Route path="/deployment/image-ai"         element={<ImageAiPage />} />
              <Route path="/deployment/rag-app"             element={<RagAppPage />} />
              <Route path="/deployment/heavy-model-deploy" element={<HeavyModelPage />} />
            </Route>
            <Route path="/problem-solving" element={<ProblemSolvingPage />} />
            <Route path="/problem-solving/start-coding"    element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
            <Route path="/problem-solving/logic-building"  element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
            <Route path="/problem-solving/skill-up"        element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
            <Route path="/problem-solving/interview-prep"  element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
            <Route path="/problem-solving/scenario-coding" element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
            <Route path="/problem-solving/:id"             element={<ProtectedRoute><ProblemDetailPage /></ProtectedRoute>} />

            {/* Missions detail — requires login */}
            <Route path="/missions/:id" element={<ProtectedRoute><MissionDetailPage /></ProtectedRoute>} />

            {/* ── Student: skill-arena ── */}
            <Route path="/skill-arena/dashboard"              element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/skill-arena/roadmaps/:id"           element={<ProtectedRoute><RoadmapDetailPage /></ProtectedRoute>} />
            <Route path="/skill-arena/quiz/:type/:refId"      element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path="/skill-arena/quiz/result/:attemptId" element={<ProtectedRoute><QuizResultPage /></ProtectedRoute>} />

            {/* Backward-compat redirects (old bookmark URLs) */}
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
            <Route path="/admin-skill-arena/walk-ins"    element={<ProtectedRoute adminOnly><AdminWalkIns /></ProtectedRoute>} />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App

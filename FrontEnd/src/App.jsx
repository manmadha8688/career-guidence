import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

import MissionsPage from './pages/MissionsPage'
import FresherInstructionsPage from './pages/FresherInstructionsPage'
import MissionDetailPage from './pages/MissionDetailPage'
import ProblemSolvingPage from './pages/problem-solving/ProblemSolvingPage'
import TrackPage from './pages/problem-solving/TrackPage'
import ProblemDetailPage from './pages/problem-solving/ProblemDetailPage'
import DashboardPage from './pages/student-skill-arena/DashboardPage'
import RoadmapDetailPage from './pages/student-skill-arena/RoadmapDetailPage'
import QuizPage from './pages/student-skill-arena/QuizPage'
import QuizResultPage from './pages/student-skill-arena/QuizResultPage'

import AdminDashboard from './pages/admin-skill-arena/AdminDashboard'
import AdminUsers from './pages/admin-skill-arena/AdminUsers'
import AdminSubjects from './pages/admin-skill-arena/AdminSubjects'
import AdminConcepts from './pages/admin-skill-arena/AdminConcepts'
import AdminRoadmaps from './pages/admin-skill-arena/AdminRoadmaps'
import AdminQuestions from './pages/admin-skill-arena/AdminQuestions'
import AdminFeedbacks from './pages/admin-skill-arena/AdminFeedbacks'
import AdminMissions from './pages/admin-skill-arena/AdminMissions'
import AdminProblems from './pages/admin-skill-arena/AdminProblems'
import FeedbackNudge from './components/FeedbackNudge'

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <FeedbackNudge />
        <Routes>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Public */}
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/fresher-instructions" element={<FresherInstructionsPage />} />
          <Route path="/problem-solving" element={<ProblemSolvingPage />} />
          <Route path="/problem-solving/start-coding"   element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
          <Route path="/problem-solving/logic-building" element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
          <Route path="/problem-solving/skill-up"       element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
          <Route path="/problem-solving/interview-prep" element={<ProtectedRoute><TrackPage /></ProtectedRoute>} />
          <Route path="/problem-solving/:id"            element={<ProtectedRoute><ProblemDetailPage /></ProtectedRoute>} />

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
          <Route path="/admin-skill-arena/missions"     element={<ProtectedRoute adminOnly><AdminMissions /></ProtectedRoute>} />
          <Route path="/admin-skill-arena/problems"     element={<ProtectedRoute adminOnly><AdminProblems /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  )
}

export default App

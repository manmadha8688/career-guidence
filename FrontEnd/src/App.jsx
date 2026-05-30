import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'

import DashboardPage from './pages/student/DashboardPage'
import SubjectsPage from './pages/student/SubjectsPage'
import SubjectDetailPage from './pages/student/SubjectDetailPage'
import ConceptPage from './pages/student/ConceptPage'
import RoadmapsPage from './pages/student/RoadmapsPage'
import RoadmapDetailPage from './pages/student/RoadmapDetailPage'
import QuizPage from './pages/student/QuizPage'
import QuizResultPage from './pages/student/QuizResultPage'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminSubjects from './pages/admin/AdminSubjects'
import AdminConcepts from './pages/admin/AdminConcepts'
import AdminRoadmaps from './pages/admin/AdminRoadmaps'
import AdminQuestions from './pages/admin/AdminQuestions'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        <Routes>
          {/* Public */}
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Student */}
          <Route path="/dashboard"        element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/subjects"         element={<ProtectedRoute><SubjectsPage /></ProtectedRoute>} />
          <Route path="/subjects/:id"     element={<ProtectedRoute><SubjectDetailPage /></ProtectedRoute>} />
          <Route path="/concepts/:id"     element={<ProtectedRoute><ConceptPage /></ProtectedRoute>} />
          <Route path="/roadmaps"         element={<ProtectedRoute><RoadmapsPage /></ProtectedRoute>} />
          <Route path="/roadmaps/:id"     element={<ProtectedRoute><RoadmapDetailPage /></ProtectedRoute>} />
          <Route path="/quiz/:type/:refId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
          <Route path="/quiz/result/:attemptId" element={<ProtectedRoute><QuizResultPage /></ProtectedRoute>} />

          {/* Admin */}
          <Route path="/admin"              element={<ProtectedRoute adminOnly><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users"        element={<ProtectedRoute adminOnly><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/subjects"     element={<ProtectedRoute adminOnly><AdminSubjects /></ProtectedRoute>} />
          <Route path="/admin/concepts"     element={<ProtectedRoute adminOnly><AdminConcepts /></ProtectedRoute>} />
          <Route path="/admin/roadmaps"     element={<ProtectedRoute adminOnly><AdminRoadmaps /></ProtectedRoute>} />
          <Route path="/admin/questions"    element={<ProtectedRoute adminOnly><AdminQuestions /></ProtectedRoute>} />

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

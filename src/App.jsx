import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Home from './pages/Home'
import './App.css'

const Courses = lazy(() => import('./pages/Courses'))
const CourseDetail = lazy(() => import('./pages/CourseDetail'))
const CourseContent = lazy(() => import('./pages/CourseContent'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Profile = lazy(() => import('./pages/Profile'))
const Achievements = lazy(() => import('./pages/Achievements'))
const Certificate = lazy(() => import('./pages/Certificate'))
const PythonEditorPage = lazy(() => import('./pages/PythonEditorPage'))
const ScoreAnalysisPage = lazy(() => import('./pages/ScoreAnalysisPage'))
const EcommerceAnalysisCourse = lazy(() => import('./pages/EcommerceAnalysisCourse'))
const EcommerceBootcamp = lazy(() => import('./pages/EcommerceBootcamp'))

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/course/:courseId/content" element={<CourseContent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/certificate/:achievementId" element={<Certificate />} />
          <Route path="/python-editor" element={<PythonEditorPage />} />
          <Route path="/score-analysis" element={<ScoreAnalysisPage />} />
          <Route path="/ecommerce-analysis" element={<EcommerceAnalysisCourse />} />
          <Route path="/ecommerce-bootcamp" element={<EcommerceBootcamp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
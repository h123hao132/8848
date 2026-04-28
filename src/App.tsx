import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import ProjectPage from "./pages/ProjectPage";
import QuizPage from "./pages/QuizPage";
import ProgressPage from "./pages/ProgressPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course/:chapterId" element={<CoursePage />} />
          <Route path="/project/:projectId" element={<ProjectPage />} />
          <Route path="/quiz/:quizId" element={<QuizPage />} />
          <Route path="/progress" element={<ProgressPage />} />
        </Routes>
      </div>
    </Router>
  );
}

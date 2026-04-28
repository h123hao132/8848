import { useLearningStore } from '../store/useLearningStore';
import { chapters } from '../data/courseData';
import { projects } from '../data/projectData';
import { Award, CheckCircle2, BookOpen, Briefcase, CheckSquare, TrendingUp, RefreshCw } from 'lucide-react';

export default function ProgressPage() {
  const { progress, resetProgress } = useLearningStore();

  const completedChapters = chapters.filter(c => progress.chapters[c.id]?.completed).length;
  const completedProjects = projects.filter(p => progress.projects[p.id]?.completed).length;
  const completedQuizzes = Object.values(progress.quizzes).filter(q => q.completed).length;

  const totalProgress = Math.round(
    ((completedChapters / chapters.length) * 0.4 +
    (completedProjects / projects.length) * 0.4 +
    (completedQuizzes / (chapters.length)) * 0.2) * 100
  );

  const handleReset = () => {
    if (confirm('确定要重置所有学习进度吗？此操作不可撤销。')) {
      resetProgress();
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Award className="w-8 h-8 text-blue-600" />
                学习进度
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400">查看你的学习记录和成果</p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
            >
              <RefreshCw className="w-5 h-5" />
              重置进度
            </button>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            总体进度
          </h2>
          <div className="flex items-center gap-8">
            <div className="w-40 h-40 relative">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="12"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  strokeDasharray={`${totalProgress * 4.4} 440`}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">{totalProgress}%</span>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-3 gap-6">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{completedChapters}/{chapters.length}</p>
                <p className="text-slate-600 dark:text-slate-400">章节完成</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                <Briefcase className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{completedProjects}/{projects.length}</p>
                <p className="text-slate-600 dark:text-slate-400">项目完成</p>
              </div>
              <div className="text-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
                <CheckSquare className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{completedQuizzes}</p>
                <p className="text-slate-600 dark:text-slate-400">测验完成</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Progress */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" />
            章节进度
          </h2>
          <div className="space-y-4">
            {chapters.map((chapter) => {
              const isCompleted = progress.chapters[chapter.id]?.completed;
              return (
                <a
                  key={chapter.id}
                  href={`/course/${chapter.id}`}
                  className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCompleted ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-slate-700 dark:text-slate-300 font-semibold">{chapter.order}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white">{chapter.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">第 {chapter.order} 章</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isCompleted 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-300'
                  }`}>
                    {isCompleted ? '已完成' : '未开始'}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Project Progress */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-green-600" />
            项目进度
          </h2>
          <div className="space-y-4">
            {projects.map((project) => {
              const projectProgress = progress.projects[project.id];
              const isCompleted = projectProgress?.completed || false;
              const totalTasks = project.tasks.basic.length + project.tasks.advanced.length + project.tasks.comprehensive.length;
              const completedTasks = projectProgress ? Object.values(projectProgress.tasks).filter(Boolean).length : 0;
              
              return (
                <a
                  key={project.id}
                  href={`/project/${project.id}`}
                  className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isCompleted ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-slate-700 dark:text-slate-300 font-semibold">{project.order}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 dark:text-white">{project.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      项目 {project.order} · 任务进度 {completedTasks}/{totalTasks}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isCompleted 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                      : 'bg-slate-200 text-slate-700 dark:bg-slate-600 dark:text-slate-300'
                  }`}>
                    {isCompleted ? '已完成' : `${Math.round((completedTasks / totalTasks) * 100)}%`}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

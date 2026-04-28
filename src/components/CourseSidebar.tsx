import { Link, useLocation } from 'react-router-dom';
import { chapters } from '../data/courseData';
import { CheckCircle2, Circle } from 'lucide-react';
import { useLearningStore } from '../store/useLearningStore';

export default function CourseSidebar() {
  const location = useLocation();
  const { progress } = useLearningStore();

  return (
    <div className="w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 h-[calc(100vh-64px)] overflow-y-auto p-4 hidden lg:block">
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4 px-2">课程目录</h2>
      <div className="space-y-1">
        {chapters.map((chapter) => {
          const isActive = location.pathname.includes(chapter.id);
          const isCompleted = progress.chapters[chapter.id]?.completed || false;
          
          return (
            <Link
              key={chapter.id}
              to={`/course/${chapter.id}`}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-slate-400 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <span className="font-medium text-sm">
                  第{chapter.order}章
                </span>
                <p className="text-xs truncate mt-0.5">{chapter.title}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 px-2">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">快速跳转</h3>
        <div className="space-y-2">
          <Link
            to="/project/project-1"
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg"
          >
            📊 项目实战
          </Link>
          <Link
            to="/quiz/quiz-chapter-1"
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg"
          >
            📝 练习题库
          </Link>
          <Link
            to="/progress"
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg"
          >
            📈 学习进度
          </Link>
        </div>
      </div>
    </div>
  );
}

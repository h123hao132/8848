import { useParams } from 'react-router-dom';
import { projects } from '../data/projectData';
import { Briefcase, Database, BookOpen, Download, ArrowLeft, ArrowRight } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import { useState, useEffect } from 'react';

export default function ProjectPage() {
  const { projectId } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'comprehensive'>('basic');

  const project = projects.find(p => p.id === projectId);
  
  useEffect(() => {
    if (project) {
      const idx = projects.findIndex(p => p.id === projectId);
      setCurrentIndex(idx);
    }
  }, [projectId]);

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">项目未找到</h2>
          <p className="text-slate-600 dark:text-slate-400">请返回首页选择正确的项目</p>
        </div>
      </div>
    );
  }

  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  const tasks = project.tasks[activeTab];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-blue-600" />
                {project.title}
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400">{project.description}</p>
            </div>
            <div className={`px-4 py-2 rounded-full font-medium text-sm ${
              project.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
              : project.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
              : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
            }`}>
              {project.difficulty === 'beginner' ? '入门级' : project.difficulty === 'intermediate' ? '进阶级' : '高级'}
            </div>
          </div>
        </div>

        {/* Business Scenario */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            业务场景
          </h2>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{project.businessScenario}</p>
        </div>

        {/* Dataset Info */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Database className="w-6 h-6 text-blue-600" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">数据集</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{project.dataset}</p>
              </div>
            </div>
            <a
              href={`/${project.dataset}`}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              下载数据
            </a>
          </div>
        </div>

        {/* Task Tabs */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'basic'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            基础巩固
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'advanced'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            进阶实操
          </button>
          <button
            onClick={() => setActiveTab('comprehensive')}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeTab === 'comprehensive'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            综合实战
          </button>
        </div>

        {/* Tasks */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} projectId={project.id} task={task} />
          ))}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
          {prevProject ? (
            <a
              href={`/project/${prevProject.id}`}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">上一个项目</p>
                <p>{prevProject.title}</p>
              </div>
            </a>
          ) : (
            <div />
          )}
          {nextProject ? (
            <a
              href={`/project/${nextProject.id}`}
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-right"
            >
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">下一个项目</p>
                <p>{nextProject.title}</p>
              </div>
              <ArrowRight className="w-5 h-5" />
            </a>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

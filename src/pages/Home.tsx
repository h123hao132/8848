import { Link } from 'react-router-dom';
import { BookOpen, Briefcase, CheckSquare, Award, TrendingUp, BarChart3, Database } from 'lucide-react';
import { projects } from '../data/projectData';
import { chapters } from '../data/courseData';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Pandas 数据分析训练营
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
              从零基础到实战项目，系统化学习 Pandas 数据处理与分析，成为数据分析高手
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/course/chapter-1"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                开始学习
              </Link>
              <Link
                to="/project/project-1"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center gap-2"
              >
                <Briefcase className="w-5 h-5" />
                查看项目
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">课程特色</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: BookOpen, title: '系统课程', desc: '从基础到进阶，循序渐进的完整课程体系' },
            { icon: Briefcase, title: '实战项目', desc: '10个真实数据分析项目，边学边练' },
            { icon: CheckSquare, title: '练习题库', desc: '丰富的练习题，及时检验学习成果' },
            { icon: Award, title: '学习进度', desc: '完整的学习进度追踪，见证成长历程' },
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Course Outline */}
      <div className="bg-white dark:bg-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">课程大纲</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter) => (
              <Link
                key={chapter.id}
                to={`/course/${chapter.id}`}
                className="bg-slate-50 dark:bg-slate-700 p-6 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors border border-slate-200 dark:border-slate-600"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {chapter.order}
                  </span>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{chapter.title}</h3>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2">{chapter.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">实战项目</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                  : project.difficulty === 'intermediate' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {project.difficulty === 'beginner' ? '入门' : project.difficulty === 'intermediate' ? '进阶' : '高级'}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{project.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{project.description}</p>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <TrendingUp className="w-4 h-4" />
                <span>项目{project.order}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 dark:text-white mb-12">学习路径</h2>
          <div className="space-y-6">
            {[
              { icon: Database, title: '数据基础', desc: '学习 Pandas 基础、数据读取与预处理' },
              { icon: BarChart3, title: '数据探索', desc: '数据分析、可视化、统计分析' },
              { icon: TrendingUp, title: '数据建模', desc: '特征工程、聚类分析、商业洞察' },
            ].map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{step.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/course/chapter-1"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              开始你的学习之旅
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

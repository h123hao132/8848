import { useParams } from 'react-router-dom';
import { chapters } from '../data/courseData';
import { useLearningStore } from '../store/useLearningStore';
import { CheckCircle2, Target, BookOpen, AlertTriangle, ArrowLeft, ArrowRight, Link as LinkIcon } from 'lucide-react';
import CodeBlock from '../components/CodeBlock';
import CourseSidebar from '../components/CourseSidebar';
import { useState, useEffect } from 'react';

export default function CoursePage() {
  const { chapterId } = useParams();
  const { progress, updateChapterProgress } = useLearningStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  const chapter = chapters.find(c => c.id === chapterId);
  
  useEffect(() => {
    if (chapter) {
      const idx = chapters.findIndex(c => c.id === chapterId);
      setCurrentIndex(idx);
    }
  }, [chapterId]);

  if (!chapter) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">章节未找到</h2>
          <p className="text-slate-600 dark:text-slate-400">请返回首页选择正确的章节</p>
        </div>
      </div>
    );
  }

  const isCompleted = progress.chapters[chapter.id]?.completed || false;
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      <CourseSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Chapter Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                第{chapter.order}章：{chapter.title}
              </h1>
              <button
                onClick={() => updateChapterProgress(chapter.id, !isCompleted)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  isCompleted
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                {isCompleted ? '已完成' : '标记完成'}
              </button>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6" />
              学习目标
            </h2>
            <ul className="space-y-2">
              {chapter.learningObjectives.map((obj, idx) => (
                <li key={idx} className="flex items-start gap-2 text-blue-800 dark:text-blue-200">
                  <span className="text-blue-500 mt-1">•</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Prerequisites */}
          {chapter.prerequisites.length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-amber-900 dark:text-amber-100 mb-3">前置知识</h3>
              <ul className="space-y-1">
                {chapter.prerequisites.map((pre, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                    {pre}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Main Content */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              核心精讲
            </h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <p className="text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed text-lg">
                  {chapter.theory}
                </p>
              </div>
            </div>
          </div>

          {/* Code Examples */}
          {chapter.codeExamples.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">代码案例</h2>
              <div className="space-y-6">
                {chapter.codeExamples.map((example, idx) => (
                  <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{example.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400">{example.description}</p>
                    </div>
                    <CodeBlock code={example.code} />
                    <div className="p-6 bg-slate-50 dark:bg-slate-700/50">
                      <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">代码解析</h4>
                      <p className="text-slate-600 dark:text-slate-400">{example.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Business Insights */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <LinkIcon className="w-6 h-6" />
              业务解读
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
                {chapter.businessInsights}
              </p>
            </div>
          </div>

          {/* Common Mistakes */}
          {chapter.commonMistakes.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-amber-500" />
                高频易错点
              </h2>
              <div className="space-y-4">
                {chapter.commonMistakes.map((mistake, idx) => (
                  <div key={idx} className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-amber-900 dark:text-amber-100">{mistake}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-10">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">本章小结</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">
              {chapter.summary}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-700">
            {prevChapter ? (
              <a
                href={`/course/${prevChapter.id}`}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">上一章</p>
                  <p>{prevChapter.title}</p>
                </div>
              </a>
            ) : (
              <div />
            )}
            {nextChapter ? (
              <a
                href={`/course/${nextChapter.id}`}
                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-right"
              >
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">下一章</p>
                  <p>{nextChapter.title}</p>
                </div>
                <ArrowRight className="w-5 h-5" />
              </a>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

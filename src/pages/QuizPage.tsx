import { useParams } from 'react-router-dom';
import { quizzes } from '../data/quizData';
import { CheckSquare, Award, RefreshCw } from 'lucide-react';
import QuizItem from '../components/QuizItem';
import { useState, useEffect } from 'react';
import { useLearningStore } from '../store/useLearningStore';

export default function QuizPage() {
  const { quizId } = useParams();
  const { progress, updateQuizScore } = useLearningStore();
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  const quiz = quizzes.find(q => q.id === quizId);
  
  useEffect(() => {
    if (progress.quizzes[quizId || '']) {
      setScore(progress.quizzes[quizId || ''].score);
    }
  }, [quizId, progress.quizzes]);

  if (!quiz) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">练习未找到</h2>
          <p className="text-slate-600 dark:text-slate-400">请返回首页选择正确的练习</p>
        </div>
      </div>
    );
  }

  const handleAnswer = (questionId: string, isCorrect: boolean) => {
    setAnsweredQuestions(prev => new Set(prev).add(questionId));
    if (isCorrect) {
      setScore(prev => prev + Math.floor(100 / quiz.questions.length));
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    const finalScore = Math.min(score, 100);
    updateQuizScore(quiz.id, finalScore, true);
  };

  const handleReset = () => {
    setScore(0);
    setShowResults(false);
    setAnsweredQuestions(new Set());
  };

  const progressData = progress.quizzes[quiz.id];

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <CheckSquare className="w-8 h-8 text-blue-600" />
                练习题库
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400">
                共 {quiz.questions.length} 道题，测试你对本章知识的掌握
              </p>
            </div>
            {progressData && (
              <div className="flex items-center gap-3 bg-white dark:bg-slate-800 px-6 py-3 rounded-xl border border-slate-200 dark:border-slate-700">
                <Award className="w-6 h-6 text-amber-500" />
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">历史最高</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{progressData.score}分</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Current Score */}
        {!showResults && (
          <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">当前得分</p>
                <p className="text-4xl font-bold text-blue-600">{score}分</p>
              </div>
              <div className="w-32 h-32">
                <div className="w-full h-full rounded-full border-8 border-blue-100 dark:border-blue-900/30 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-600">{Math.round(score)}%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className={`rounded-xl p-8 mb-8 border-2 ${
            score >= 60 
              ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' 
              : 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800'
          }`}>
            <div className="text-center">
              <Award className={`w-16 h-16 mx-auto mb-4 ${score >= 60 ? 'text-green-500' : 'text-amber-500'}`} />
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {score >= 60 ? '恭喜通过！' : '继续加油！'}
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
                你的得分：<span className="font-bold text-2xl">{score}分</span>
              </p>
              <p className="text-slate-500 dark:text-slate-500">
                {score >= 60 
                  ? '你对本章知识掌握得不错！' 
                  : '建议重新复习一下本章内容再试一次'}
              </p>
              <button
                onClick={handleReset}
                className="mt-6 flex items-center gap-2 mx-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                重新练习
              </button>
            </div>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-6">
          {quiz.questions.map((question, index) => (
            <QuizItem
              key={question.id}
              question={question}
              onAnswer={(isCorrect) => !showResults && handleAnswer(question.id, isCorrect)}
            />
          ))}
        </div>

        {/* Submit Button */}
        {!showResults && (
          <div className="mt-8 text-center">
            <button
              onClick={handleSubmit}
              disabled={answeredQuestions.size === 0}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              提交练习
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

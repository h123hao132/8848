import { Question } from '../types';
import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle2, XCircle, BookOpen } from 'lucide-react';
import CodeBlock from './CodeBlock';

interface QuizItemProps {
  question: Question;
  onAnswer?: (isCorrect: boolean) => void;
}

export default function QuizItem({ question, onAnswer }: QuizItemProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[]>(
    question.type === 'multiple' ? [] : ''
  );
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const isCorrect = () => {
    if (question.type === 'multiple') {
      return Array.isArray(selectedAnswer) && 
        Array.isArray(question.correctAnswer) &&
        selectedAnswer.length === question.correctAnswer.length &&
        selectedAnswer.every(a => question.correctAnswer.includes(a));
    } else if (question.type === 'single') {
      return selectedAnswer === question.correctAnswer;
    } else if (question.type === 'code-fix' || question.type === 'code-fill') {
      return selectedAnswer === question.correctAnswer;
    }
    return false;
  };

  const handleSingleSelect = (option: string) => {
    if (!showResult) {
      setSelectedAnswer(option);
    }
  };

  const handleMultiSelect = (option: string) => {
    if (!showResult) {
      if (Array.isArray(selectedAnswer)) {
        if (selectedAnswer.includes(option)) {
          setSelectedAnswer(selectedAnswer.filter(o => o !== option));
        } else {
          setSelectedAnswer([...selectedAnswer, option]);
        }
      }
    }
  };

  const handleSubmit = () => {
    const correct = isCorrect();
    setShowResult(true);
    onAnswer?.(correct);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300';
      case 'hard':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'single':
        return '单选题';
      case 'multiple':
        return '多选题';
      case 'code-fix':
        return '代码改错题';
      case 'code-fill':
        return '代码填空题';
      case 'coding':
        return '编程题';
      default:
        return '题目';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
          {question.difficulty === 'easy' ? '简单' : question.difficulty === 'medium' ? '中等' : '困难'}
        </span>
        <span className="text-sm text-slate-500 dark:text-slate-400">{getTypeLabel(question.type)}</span>
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">{question.question}</h3>

      {(question.type === 'code-fix' || question.type === 'code-fill' || question.type === 'coding') && question.codeSnippet && (
        <div className="mb-4">
          <CodeBlock code={question.codeSnippet} title={question.type === 'code-fix' ? '待修正代码' : question.type === 'code-fill' ? '待填空代码' : '参考代码'} />
        </div>
      )}

      {(question.type === 'single' || question.type === 'multiple') && question.options && (
        <div className="space-y-3 mb-6">
          {question.options.map((option, idx) => {
            const isSelected = question.type === 'single' 
              ? selectedAnswer === option 
              : Array.isArray(selectedAnswer) && selectedAnswer.includes(option);
            const isCorrectAnswer = Array.isArray(question.correctAnswer) 
              ? question.correctAnswer.includes(option) 
              : question.correctAnswer === option;
            
            let optionClass = 'border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600';
            
            if (showResult) {
              if (isCorrectAnswer) {
                optionClass = 'border-green-500 bg-green-50 dark:bg-green-950/30';
              } else if (isSelected && !isCorrectAnswer) {
                optionClass = 'border-red-500 bg-red-50 dark:bg-red-950/30';
              }
            } else if (isSelected) {
              optionClass = 'border-blue-500 bg-blue-50 dark:bg-blue-950/30';
            }
            
            return (
              <button
                key={idx}
                onClick={() => question.type === 'single' ? handleSingleSelect(option) : handleMultiSelect(option)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-lg transition-all ${optionClass} ${!showResult ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    showResult ? (isCorrectAnswer ? 'bg-green-500 text-white' : isSelected ? 'bg-red-500 text-white' : 'border border-slate-300')
                    : isSelected ? 'bg-blue-500 text-white' : 'border border-slate-300'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-slate-700 dark:text-slate-300">{option}</span>
                  {showResult && isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-green-500 ml-auto" />}
                  {showResult && isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5 text-red-500 ml-auto" />}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {(question.type === 'code-fix' || question.type === 'code-fill') && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">你的答案：</label>
          <input
            type="text"
            value={typeof selectedAnswer === 'string' ? selectedAnswer : ''}
            onChange={(e) => !showResult && setSelectedAnswer(e.target.value)}
            disabled={showResult}
            className="w-full px-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="输入你的答案..."
          />
        </div>
      )}

      {question.type === 'coding' && (
        <div className="mb-6">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            请在本地编写代码完成题目。完成后可查看参考答案。
          </p>
        </div>
      )}

      {!showResult && question.type !== 'coding' && (
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          提交答案
        </button>
      )}

      {showResult && (
        <div className={`mt-4 p-4 rounded-lg ${isCorrect() ? 'bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800' : 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800'}`}>
          <div className="flex items-center gap-2">
            {isCorrect() ? <CheckCircle2 className="w-6 h-6 text-green-500" /> : <XCircle className="w-6 h-6 text-red-500" />}
            <span className={`font-semibold ${isCorrect() ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'}`}>
              {isCorrect() ? '回答正确！' : '回答错误'}
            </span>
          </div>
        </div>
      )}

      <button
        onClick={() => setShowExplanation(!showExplanation)}
        className="mt-4 flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
      >
        {showExplanation ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        {showExplanation ? '隐藏解析' : '查看解析与知识点'}
      </button>

      {showExplanation && (
        <div className="mt-4 space-y-4">
          <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
            <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">解析：</h4>
            <p className="text-slate-600 dark:text-slate-400">{question.explanation}</p>
          </div>
          
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg">
            <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm">知识点：{question.knowledgePoint}</span>
          </div>

          {(question.type === 'coding' || question.type === 'code-fix') && question.solutionCode && (
            <div className="mt-4">
              <h4 className="font-medium text-slate-800 dark:text-slate-200 mb-2">参考答案：</h4>
              <CodeBlock code={question.solutionCode} title="参考代码" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

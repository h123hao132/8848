import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const QuestionPractice = ({ courseId }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('course_id', courseId);
      
      if (error) {
        console.error('Error fetching questions:', error);
      } else {
        setQuestions(data);
      }
    };

    fetchQuestions();
  }, [courseId]);

  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach(question => {
      const userAnswer = userAnswers[question.id];
      if (question.type === 'multiple_choice' || question.type === 'true_false') {
        if (JSON.stringify(userAnswer) === JSON.stringify(question.correct_answer)) {
          calculatedScore += 100 / questions.length;
        }
      }
      // 编码题的评分逻辑可以在这里添加
    });
    setScore(Math.round(calculatedScore));
    setShowResults(true);
  };

  if (questions.length === 0) {
    return <div className="text-center py-8">加载题目中...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">题目练习</h1>
      
      {!showResults ? (
        <>
          <div className="mb-4">
            <span className="text-sm text-gray-600">
              题目 {currentQuestionIndex + 1} / {questions.length}
            </span>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">{currentQuestion.title}</h2>
            <p className="mb-6">{currentQuestion.content}</p>
            
            {currentQuestion.type === 'multiple_choice' && (
              <div className="space-y-3">
                {Object.entries(currentQuestion.options).map(([key, value]) => (
                  <div key={key} className="flex items-center">
                    <input
                      type="radio"
                      id={`option-${key}`}
                      name={`question-${currentQuestion.id}`}
                      value={key}
                      checked={userAnswers[currentQuestion.id]?.answer === key}
                      onChange={() => handleAnswerChange(currentQuestion.id, { answer: key })}
                      className="mr-2"
                    />
                    <label htmlFor={`option-${key}`} className="cursor-pointer">
                      {key}: {value}
                    </label>
                  </div>
                ))}
              </div>
            )}
            
            {currentQuestion.type === 'true_false' && (
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="true"
                    name={`question-${currentQuestion.id}`}
                    value={true}
                    checked={userAnswers[currentQuestion.id]?.answer === true}
                    onChange={() => handleAnswerChange(currentQuestion.id, { answer: true })}
                    className="mr-2"
                  />
                  <label htmlFor="true" className="cursor-pointer">
                    {currentQuestion.options.true}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="false"
                    name={`question-${currentQuestion.id}`}
                    value={false}
                    checked={userAnswers[currentQuestion.id]?.answer === false}
                    onChange={() => handleAnswerChange(currentQuestion.id, { answer: false })}
                    className="mr-2"
                  />
                  <label htmlFor="false" className="cursor-pointer">
                    {currentQuestion.options.false}
                  </label>
                </div>
              </div>
            )}
            
            {currentQuestion.type === 'coding' && (
              <div className="mb-4">
                <textarea
                  rows="10"
                  className="w-full p-3 border rounded"
                  placeholder="请在此编写代码..."
                  value={userAnswers[currentQuestion.id]?.code || ''}
                  onChange={(e) => handleAnswerChange(currentQuestion.id, { code: e.target.value })}
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
            >
              上一题
            </button>
            
            {currentQuestionIndex === questions.length - 1 ? (
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                提交答案
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                下一题
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">练习完成！</h2>
          <div className="text-4xl font-bold mb-6">{score} 分</div>
          <p className="mb-6">
            {score >= 80 ? '表现优秀！' : score >= 60 ? '表现良好！' : '继续努力！'}
          </p>
          <button
            onClick={() => {
              setShowResults(false);
              setCurrentQuestionIndex(0);
              setUserAnswers({});
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            重新练习
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionPractice;
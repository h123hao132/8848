import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabaseClient';

const Exam = ({ examId }) => {
  const [exam, setExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    const fetchExamData = async () => {
      // 获取考试信息
      const { data: examData, error: examError } = await supabase
        .from('exams')
        .select('*')
        .eq('id', examId)
        .single();
      
      if (examError) {
        console.error('Error fetching exam:', examError);
        return;
      }
      
      setExam(examData);
      setTimeLeft(examData.duration * 60); // 转换为秒
      
      // 获取考试题目
      const { data: examQuestions, error: eqError } = await supabase
        .from('exam_questions')
        .select('question_id, questions(*)')
        .eq('exam_id', examId)
        .order('order_index');
      
      if (eqError) {
        console.error('Error fetching exam questions:', eqError);
      } else {
        const questionList = examQuestions.map(eq => eq.questions);
        setQuestions(questionList);
      }
    };

    fetchExamData();
  }, [examId]);

  useEffect(() => {
    let timer;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      handleSubmit();
    }

    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, handleSubmit]);

  const handleStartExam = () => {
    setIsTimerRunning(true);
  };

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

  const handleSubmit = useCallback(async () => {
    setIsTimerRunning(false);
    
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
    
    const finalScore = Math.round(calculatedScore);
    const isPassed = finalScore >= exam.passing_score;
    
    setScore(finalScore);
    setPassed(isPassed);
    setShowResults(true);
    
    // 保存考试结果到数据库
    const { error } = await supabase
      .from('user_exams')
      .insert({
        user_id: supabase.auth.user().id,
        exam_id: examId,
        score: finalScore,
        passed: isPassed,
        end_time: new Date()
      });
    
    if (error) {
      console.error('Error saving exam result:', error);
    }
    
    // 保存用户答题记录
    for (const question of questions) {
      const userAnswer = userAnswers[question.id];
      const isCorrect = question.type === 'multiple_choice' || question.type === 'true_false' 
        ? JSON.stringify(userAnswer) === JSON.stringify(question.correct_answer)
        : false; // 编码题的正确性判断需要额外逻辑
      
      await supabase
        .from('user_answers')
        .insert({
          user_id: supabase.auth.user().id,
          question_id: question.id,
          exam_id: examId,
          user_answer: userAnswer,
          is_correct: isCorrect
        });
    }
  }, [questions, userAnswers, exam, examId]);

  if (!exam || questions.length === 0) {
    return <div className="text-center py-8">加载考试中...</div>;
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">{exam.title}</h1>
      <p className="mb-6">{exam.description}</p>
      
      {!isTimerRunning ? (
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-xl font-semibold mb-4">考试准备</h2>
          <p className="mb-4">考试时长：{exam.duration} 分钟</p>
          <p className="mb-4">及格分数：{exam.passing_score} 分</p>
          <p className="mb-6">请确保在规定时间内完成所有题目</p>
          <button
            onClick={handleStartExam}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            开始考试
          </button>
        </div>
      ) : !showResults ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">
              题目 {currentQuestionIndex + 1} / {questions.length}
            </span>
            <div className="text-sm font-semibold">
              剩余时间：{formatTime(timeLeft)}
            </div>
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
                提交考试
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
          <h2 className="text-2xl font-bold mb-4">考试完成！</h2>
          <div className="text-4xl font-bold mb-6">{score} 分</div>
          <div className={`text-xl font-semibold mb-6 ${passed ? 'text-green-600' : 'text-red-600'}`}>
            {passed ? '恭喜通过！' : '未通过，继续努力！'}
          </div>
          <p className="mb-6">
            及格分数：{exam.passing_score} 分
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            返回课程
          </button>
        </div>
      )}
    </div>
  );
};

export default Exam;
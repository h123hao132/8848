import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const ScoreAnalysis = () => {
  const [examResults, setExamResults] = useState([]);
  const [courseAnalysis, setCourseAnalysis] = useState({});

  useEffect(() => {
    const fetchExamResults = async () => {
      const { data, error } = await supabase
        .from('user_exams')
        .select('*, exams(*, courses(*))')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching exam results:', error);
      } else {
        setExamResults(data);
        
        // 计算每个课程的分析数据
        const analysis = {};
        data.forEach(result => {
          const courseId = result.exams.courses.id;
          if (!analysis[courseId]) {
            analysis[courseId] = {
              courseName: result.exams.courses.title,
              totalExams: 0,
              passedExams: 0,
              totalScore: 0,
              scores: []
            };
          }
          
          analysis[courseId].totalExams += 1;
          if (result.passed) {
            analysis[courseId].passedExams += 1;
          }
          analysis[courseId].totalScore += result.score;
          analysis[courseId].scores.push(result.score);
        });
        
        // 计算平均分和通过率
        Object.keys(analysis).forEach(courseId => {
          const course = analysis[courseId];
          course.averageScore = Math.round(course.totalScore / course.totalExams);
          course.passRate = Math.round((course.passedExams / course.totalExams) * 100);
          course.highestScore = Math.max(...course.scores);
          course.lowestScore = Math.min(...course.scores);
        });
        
        setCourseAnalysis(analysis);
      }
    };

    fetchExamResults();
  }, []);

  const getFeedback = (score) => {
    if (score >= 90) {
      return {
        message: '优秀！你对知识点掌握得非常扎实。',
        color: 'text-green-600',
        suggestion: '继续保持，可以尝试更高级的内容。'
      };
    } else if (score >= 80) {
      return {
        message: '良好！你对知识点有较好的掌握。',
        color: 'text-blue-600',
        suggestion: '可以针对薄弱环节进行加强练习。'
      };
    } else if (score >= 60) {
      return {
        message: '及格！你基本掌握了知识点。',
        color: 'text-yellow-600',
        suggestion: '需要加强学习，多做练习。'
      };
    } else {
      return {
        message: '未及格，需要努力！',
        color: 'text-red-600',
        suggestion: '建议重新学习相关章节，多做练习题。'
      };
    }
  };

  if (examResults.length === 0) {
    return <div className="text-center py-8">暂无考试记录</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">成绩分析</h1>
      
      {/* 课程分析概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {Object.values(courseAnalysis).map(course => (
          <div key={course.courseName} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{course.courseName}</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">总考试次数：</span>
                <span>{course.totalExams}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">通过次数：</span>
                <span>{course.passedExams}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">通过率：</span>
                <span>{course.passRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">平均分数：</span>
                <span>{course.averageScore} 分</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">最高分数：</span>
                <span>{course.highestScore} 分</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">最低分数：</span>
                <span>{course.lowestScore} 分</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* 考试记录详情 */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">考试记录</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  考试名称
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  课程
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  分数
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  结果
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  考试时间
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  反馈
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {examResults.map(result => {
                const feedback = getFeedback(result.score);
                return (
                  <tr key={result.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.exams.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.exams.courses.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {result.score} 分
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {result.passed ? '通过' : '未通过'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(result.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className={feedback.color}>
                        <div className="font-medium">{feedback.message}</div>
                        <div className="text-sm">{feedback.suggestion}</div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScoreAnalysis;
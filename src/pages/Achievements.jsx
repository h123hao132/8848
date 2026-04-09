import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [userAchievements, setUserAchievements] = useState([]);

  useEffect(() => {
    // 获取当前用户
    const { data: { user } } = supabase.auth.getUser();
    if (user) {
      // 获取所有成就
      supabase
        .from('achievements')
        .select('*')
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching achievements:', error);
          } else {
            setAchievements(data);
          }
        });

      // 获取用户成就
      supabase
        .from('user_achievements')
        .select('*')
        .eq('user_id', user.id)
        .then(({ data, error }) => {
          if (error) {
            console.error('Error fetching user achievements:', error);
          } else {
            setUserAchievements(data);
          }
        });
    }
  }, []);

  // 检查成就是否已解锁
  const isAchievementUnlocked = (achievementId) => {
    return userAchievements.some(ua => ua.achievement_id === achievementId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">我的成就</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id} 
              className={`bg-white rounded-lg shadow-md p-6 transition-all duration-300 ${isAchievementUnlocked(achievement.id) ? 'border-2 border-green-500' : 'border border-gray-200 opacity-60'}`}
            >
              <div className="flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${isAchievementUnlocked(achievement.id) ? 'bg-green-100' : 'bg-gray-100'}`}>
                  <span className="text-3xl">🏆</span>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{achievement.title}</h3>
                <p className="text-gray-600 text-center mb-4">{achievement.description}</p>
                <div className={`text-sm ${isAchievementUnlocked(achievement.id) ? 'text-green-600' : 'text-gray-500'}`}>
                  {isAchievementUnlocked(achievement.id) ? '已解锁' : '未解锁'}
                </div>
                {isAchievementUnlocked(achievement.id) && (
                  <Link
                    to={`/certificate/${achievement.id}`}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded-md transition-colors duration-300"
                  >
                    生成证书
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">成就统计</h2>
          <div className="flex justify-between items-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{userAchievements.length}</div>
              <div className="text-gray-600">已解锁成就</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{achievements.length}</div>
              <div className="text-gray-600">总成就数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {achievements.length > 0 ? Math.round((userAchievements.length / achievements.length) * 100) : 0}%
              </div>
              <div className="text-gray-600">完成度</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
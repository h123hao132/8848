import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import CertificateGenerator from '../components/CertificateGenerator';

const Certificate = () => {
  const { achievementId } = useParams();
  const [achievement, setAchievement] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 获取成就详情
    supabase
      .from('achievements')
      .select('*')
      .eq('id', achievementId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching achievement:', error);
        } else {
          setAchievement(data);
        }
        setLoading(false);
      });
  }, [achievementId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">加载中...</div>
      </div>
    );
  }

  if (!achievement) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">成就不存在</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{achievement.title} 证书</h1>
        <CertificateGenerator achievement={achievement} />
      </div>
    </div>
  );
};

export default Certificate;
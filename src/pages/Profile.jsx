import React, { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate, Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [courseProgress, setCourseProgress] = useState([])
  const [overallStats, setOverallStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalContent: 0,
    completedContent: 0,
    completionRate: 0
  })
  const [weeklyActivity, setWeeklyActivity] = useState([])
  const [achievements, setAchievements] = useState([])
  const [userAchievements, setUserAchievements] = useState([])
  const [achievementStats, setAchievementStats] = useState({
    totalAchievements: 0,
    unlockedAchievements: 0,
    achievementRate: 0
  })
  const navigate = useNavigate()

  useEffect(() => {
    // 获取当前用户信息和学习统计数据
    const getCurrentUserAndStats = async () => {
      try {
        setLoading(true)
        
        // 获取用户信息
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        if (!currentUser) {
          navigate('/login')
          return
        }
        setUser(currentUser)

        // 获取课程进度数据
        const { data: progressData, error: progressError } = await supabase
          .from('learning_progress')
          .select(`
            course_id,
            completed,
            courses(title, course_contents(count))
          `)
          .eq('user_id', currentUser.id)

        if (progressError) throw progressError

        // 处理课程进度数据
        const courseMap = {}
        progressData.forEach(item => {
          if (!courseMap[item.course_id]) {
            courseMap[item.course_id] = {
              id: item.course_id,
              title: item.courses.title,
              totalContent: item.courses.course_contents?.[0]?.count || 0,
              completedContent: 0
            }
          }
          if (item.completed) {
            courseMap[item.course_id].completedContent += 1
          }
        })

        const progressList = Object.values(courseMap).map(course => ({
          ...course,
          completionRate: course.totalContent > 0 ? Math.round((course.completedContent / course.totalContent) * 100) : 0
        }))
        setCourseProgress(progressList)

        // 计算总体统计
        const totalCourses = progressList.length
        const completedCourses = progressList.filter(course => course.completionRate === 100).length
        const totalContent = progressList.reduce((sum, course) => sum + course.totalContent, 0)
        const completedContent = progressList.reduce((sum, course) => sum + course.completedContent, 0)
        const completionRate = totalContent > 0 ? Math.round((completedContent / totalContent) * 100) : 0

        setOverallStats({
          totalCourses,
          completedCourses,
          totalContent,
          completedContent,
          completionRate
        })

        // 生成每周活动数据（模拟数据，实际项目中可从数据库获取）
        const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        const activityData = days.map(day => ({
          name: day,
          学习时长: Math.floor(Math.random() * 120) + 30 // 30-150分钟
        }))
        setWeeklyActivity(activityData)

        // 获取成就数据
        const { data: allAchievements, error: achievementsError } = await supabase
          .from('achievements')
          .select('*')

        if (achievementsError) throw achievementsError
        setAchievements(allAchievements)

        // 获取用户成就数据
        const { data: userAchievementsData, error: userAchievementsError } = await supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', currentUser.id)

        if (userAchievementsError) throw userAchievementsError
        setUserAchievements(userAchievementsData)

        // 计算成就统计
        const totalAchievements = allAchievements.length
        const unlockedAchievements = userAchievementsData.length
        const achievementRate = totalAchievements > 0 ? Math.round((unlockedAchievements / totalAchievements) * 100) : 0

        setAchievementStats({
          totalAchievements,
          unlockedAchievements,
          achievementRate
        })

      } catch (err) {
        setError('获取用户数据失败')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    getCurrentUserAndStats()

    // 监听用户状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)
        // 重新获取统计数据
        getCurrentUserAndStats()
      } else {
        navigate('/login')
      }
    })

    return () => subscription.unsubscribe()
  }, [navigate])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">加载中...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">个人资料</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              退出登录
            </button>
          </div>

          {error && (
            <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded">
              {error}
            </div>
          )}

          {/* 学习统计卡片 */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">学习统计</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">总课程数</p>
                <p className="text-2xl font-bold text-blue-600">{overallStats.totalCourses}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">已完成课程</p>
                <p className="text-2xl font-bold text-green-600">{overallStats.completedCourses}</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">总学习内容</p>
                <p className="text-2xl font-bold text-purple-600">{overallStats.totalContent}</p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">完成率</p>
                <p className="text-2xl font-bold text-yellow-600">{overallStats.completionRate}%</p>
              </div>
            </div>
          </div>

          {/* 成就统计卡片 */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">成就统计</h2>
              <Link to="/achievements" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                查看全部成就
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">总成就数</p>
                <p className="text-2xl font-bold text-indigo-600">{achievementStats.totalAchievements}</p>
              </div>
              <div className="bg-rose-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">已解锁成就</p>
                <p className="text-2xl font-bold text-rose-600">{achievementStats.unlockedAchievements}</p>
              </div>
              <div className="bg-teal-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">成就解锁率</p>
                <p className="text-2xl font-bold text-teal-600">{achievementStats.achievementRate}%</p>
              </div>
            </div>
          </div>

          {/* 学习进度图表 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* 每周学习活动 */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-md font-medium text-gray-900 mb-4">每周学习活动</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: '分钟', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Bar dataKey="学习时长" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 学习完成情况 */}
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-md font-medium text-gray-900 mb-4">学习完成情况</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: '已完成', value: overallStats.completedContent },
                        { name: '未完成', value: overallStats.totalContent - overallStats.completedContent }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#e5e7eb" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 最近解锁的成就 */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">最近解锁的成就</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {userAchievements.length > 0 ? (
                userAchievements
                  .sort((a, b) => new Date(b.earned_at) - new Date(a.earned_at))
                  .slice(0, 4)
                  .map((userAchievement) => {
                    const achievement = achievements.find(a => a.id === userAchievement.achievement_id);
                    return achievement ? (
                      <div key={userAchievement.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex flex-col items-center">
                          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-3">
                            <span className="text-2xl">🏆</span>
                          </div>
                          <h3 className="font-medium text-center mb-1">{achievement.title}</h3>
                          <p className="text-xs text-gray-500 text-center mb-2">{achievement.description}</p>
                          <p className="text-xs text-gray-500">
                            解锁于: {new Date(userAchievement.earned_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ) : null;
                  })
              ) : (
                <p className="text-gray-500 col-span-full">暂无解锁的成就</p>
              )}
            </div>
          </div>

          {/* 课程进度列表 */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">课程学习进度</h2>
            <div className="space-y-4">
              {courseProgress.length > 0 ? (
                courseProgress.map((course) => (
                  <div key={course.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{course.title}</h3>
                      <span className="text-sm text-gray-600">{course.completionRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${course.completionRate}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      已完成 {course.completedContent} / {course.totalContent} 个内容
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">暂无学习记录</p>
              )}
            </div>
          </div>

          {/* 账户信息 */}
          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">账户信息</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">邮箱</label>
                <p className="mt-1 text-sm text-gray-900">{user.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">用户ID</label>
                <p className="mt-1 text-sm text-gray-900">{user.id}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">创建时间</label>
                <p className="mt-1 text-sm text-gray-900">{new Date(user.created_at).toLocaleString()}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">最后登录</label>
                <p className="mt-1 text-sm text-gray-900">{new Date(user.last_sign_in_at || user.created_at).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">安全设置</h2>
            <p className="text-sm text-gray-600 mb-4">
              您可以通过Supabase控制台修改密码或管理账户安全设置。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
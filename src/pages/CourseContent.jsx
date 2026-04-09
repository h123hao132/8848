import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import QuestionPractice from '../components/QuestionPractice'
import Exam from '../components/Exam'

const CourseContent = () => {
  const { courseId } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [contents, setContents] = useState([])
  const [exams, setExams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeContent, setActiveContent] = useState(null)
  const [progress, setProgress] = useState({})
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('content') // content, practice, exams
  const [selectedExamId, setSelectedExamId] = useState(null)

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true)
        
        // 获取用户信息
        const { data: { user: currentUser } } = await supabase.auth.getUser()
        if (!currentUser) {
          navigate('/login')
          return
        }
        setUser(currentUser)

        // 获取课程信息
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('id', courseId)
          .single()

        if (courseError) throw courseError
        setCourse(courseData)

        // 获取课程内容
        const { data: contentsData, error: contentsError } = await supabase
          .from('course_contents')
          .select('*')
          .eq('course_id', courseId)
          .order('order_index', { ascending: true })

        if (contentsError) throw contentsError
        setContents(contentsData)

        // 获取考试数据
        const { data: examsData, error: examsError } = await supabase
          .from('exams')
          .select('*')
          .eq('course_id', courseId)

        if (examsError) throw examsError
        setExams(examsData)

        // 获取学习进度
        const { data: progressData, error: progressError } = await supabase
          .from('learning_progress')
          .select('content_id, completed')
          .eq('user_id', currentUser.id)
          .eq('course_id', courseId)

        if (progressError) throw progressError
        
        // 构建进度对象
        const progressObj = {}
        progressData.forEach(item => {
          progressObj[item.content_id] = item.completed
        })
        setProgress(progressObj)

        // 设置第一个内容为激活状态
        if (contentsData.length > 0) {
          setActiveContent(contentsData[0])
        }

      } catch (err) {
        setError('获取课程数据失败')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourseData()
  }, [courseId, navigate])

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="container mx-auto px-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">加载中...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // 检查成就解锁
  const checkAchievements = async () => {
    try {
      // 获取用户所有学习进度
      const { data: allProgress, error: progressError } = await supabase
        .from('learning_progress')
        .select('course_id, content_id, completed')
        .eq('user_id', user.id)

      if (progressError) throw progressError

      // 获取所有课程
      const { data: allCourses, error: coursesError } = await supabase
        .from('courses')
        .select('id, title')

      if (coursesError) throw coursesError

      // 获取所有成就
      const { data: allAchievements, error: achievementsError } = await supabase
        .from('achievements')
        .select('id, title, type')

      if (achievementsError) throw achievementsError

      // 获取用户已解锁的成就
      const { data: userAchievements, error: userAchievementsError } = await supabase
        .from('user_achievements')
        .select('achievement_id')
        .eq('user_id', user.id)

      if (userAchievementsError) throw userAchievementsError

      const unlockedAchievementIds = userAchievements.map(ua => ua.achievement_id)

      // 计算每个课程的完成情况
      const courseCompletion = {}
      allCourses.forEach(course => {
        const courseProgress = allProgress.filter(p => p.course_id === course.id)
        const completedContent = courseProgress.filter(p => p.completed).length
        const totalContent = courseProgress.length
        courseCompletion[course.id] = totalContent > 0 ? (completedContent === totalContent) : false
      })

      // 检查课程完成成就
      const completedCourses = allCourses.filter(course => courseCompletion[course.id])
      
      // 检查特定课程成就
      for (const course of completedCourses) {
        const courseAchievement = allAchievements.find(a => a.type === 'course' && a.title.includes(course.title))
        if (courseAchievement && !unlockedAchievementIds.includes(courseAchievement.id)) {
          // 解锁成就
          await supabase
            .from('user_achievements')
            .insert({
              user_id: user.id,
              achievement_id: courseAchievement.id
            })
          console.log(`解锁成就: ${courseAchievement.title}`)
        }
      }

      // 检查第一个课程成就
      if (completedCourses.length === 1) {
        const firstCourseAchievement = allAchievements.find(a => a.type === 'milestone' && a.title === '学习先锋')
        if (firstCourseAchievement && !unlockedAchievementIds.includes(firstCourseAchievement.id)) {
          // 解锁成就
          await supabase
            .from('user_achievements')
            .insert({
              user_id: user.id,
              achievement_id: firstCourseAchievement.id
            })
          console.log(`解锁成就: ${firstCourseAchievement.title}`)
        }
      }

      // 检查所有课程完成成就
      if (completedCourses.length === allCourses.length && allCourses.length > 0) {
        const allCoursesAchievement = allAchievements.find(a => a.type === 'completion' && a.title === '知识渊博')
        if (allCoursesAchievement && !unlockedAchievementIds.includes(allCoursesAchievement.id)) {
          // 解锁成就
          await supabase
            .from('user_achievements')
            .insert({
              user_id: user.id,
              achievement_id: allCoursesAchievement.id
            })
          console.log(`解锁成就: ${allCoursesAchievement.title}`)
        }
      }

    } catch (err) {
      console.error('检查成就失败:', err)
    }
  }

  // 处理学习进度更新
  const handleProgressUpdate = async (contentId) => {
    if (!user) return

    const newStatus = !progress[contentId]
    
    try {
      // 检查是否已存在进度记录
      const { data: existingProgress, error: checkError } = await supabase
        .from('learning_progress')
        .select('id')
        .eq('user_id', user.id)
        .eq('course_id', courseId)
        .eq('content_id', contentId)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError
      }

      if (existingProgress) {
        // 更新现有记录
        await supabase
          .from('learning_progress')
          .update({
            completed: newStatus,
            completed_at: newStatus ? new Date() : null
          })
          .eq('id', existingProgress.id)
      } else {
        // 创建新记录
        await supabase
          .from('learning_progress')
          .insert({
            user_id: user.id,
            course_id: courseId,
            content_id: contentId,
            completed: newStatus,
            completed_at: newStatus ? new Date() : null
          })
      }

      // 更新本地状态
      setProgress(prev => ({
        ...prev,
        [contentId]: newStatus
      }))

      // 检查是否需要解锁成就
      if (newStatus) {
        checkAchievements()
      }
    } catch (err) {
      console.error('更新学习进度失败:', err)
    }
  }

  if (error || !course) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">{error || '课程不存在'}</h2>
            <button 
              onClick={() => navigate('/courses')}
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
              返回课程列表
            </button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleStartExam = (examId) => {
    setSelectedExamId(examId)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 侧边栏 - 课程内容列表 */}
            <div className="lg:w-1/4">
              <div className="bg-white shadow-md rounded-lg p-4 sticky top-4">
                <h2 className="text-xl font-bold mb-4">课程内容</h2>
                
                {/* 标签页导航 */}
                <div className="border-b border-gray-200 mb-4">
                  <nav className="flex space-x-4">
                    <button
                      onClick={() => {
                        setActiveTab('content')
                        setSelectedExamId(null)
                      }}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'content' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                      课程内容
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('practice')
                        setSelectedExamId(null)
                      }}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'practice' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                      练习题目
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('exams')
                        setSelectedExamId(null)
                      }}
                      className={`py-2 px-1 border-b-2 font-medium text-sm ${activeTab === 'exams' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                    >
                      测评考试
                    </button>
                  </nav>
                </div>
                
                {/* 内容列表 - 仅在content标签页显示 */}
                {activeTab === 'content' && (
                  <div className="space-y-2">
                    {contents.map((content) => (
                      <div 
                        key={content.id}
                        onClick={() => setActiveContent(content)}
                        className={`cursor-pointer p-3 rounded-md transition duration-200 ${activeContent?.id === content.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <span className="mr-2">
                              {content.type === 'video' ? '🎥' : '📄'}
                            </span>
                            <span className="font-medium">{content.title}</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleProgressUpdate(content.id)
                            }}
                            className={`w-5 h-5 flex items-center justify-center rounded-full border ${progress[content.id] ? 'bg-green-500 border-green-500' : 'border-gray-300'}`}
                          >
                            {progress[content.id] && <span className="text-white text-xs">✓</span>}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* 考试列表 - 仅在exams标签页显示 */}
                {activeTab === 'exams' && !selectedExamId && (
                  <div className="space-y-2">
                    {exams.map((exam) => (
                      <div 
                        key={exam.id}
                        className="p-3 rounded-md hover:bg-gray-100"
                      >
                        <div className="font-medium mb-2">{exam.title}</div>
                        <div className="text-sm text-gray-600 mb-2">
                          时长: {exam.duration} 分钟 | 及格分数: {exam.passing_score} 分
                        </div>
                        <button
                          onClick={() => handleStartExam(exam.id)}
                          className="w-full px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                        >
                          开始考试
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 主内容区 */}
            <div className="lg:w-3/4">
              <div className="bg-white shadow-md rounded-lg p-6">
                <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
                
                {/* 课程内容标签页 */}
                {activeTab === 'content' && (
                  activeContent ? (
                    <div>
                      <h2 className="text-xl font-semibold mb-4">{activeContent.title}</h2>
                      
                      {activeContent.type === 'video' ? (
                        <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                          <div className="text-center">
                            <div className="text-4xl mb-2">🎥</div>
                            <p className="text-gray-600">视频内容</p>
                            <p className="text-gray-500 text-sm mt-2">{activeContent.content}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="prose max-w-none">
                          <p className="text-gray-700 whitespace-pre-line">{activeContent.content}</p>
                        </div>
                      )}
                      
                      <div className="mt-6 flex justify-between items-center">
                        <div className="flex items-center">
                          <button
                            onClick={() => handleProgressUpdate(activeContent.id)}
                            className={`flex items-center px-4 py-2 rounded-md ${progress[activeContent.id] ? 'bg-gray-200 text-gray-700' : 'bg-green-600 text-white'}`}
                          >
                            {progress[activeContent.id] ? '标记为未完成' : '标记为已完成'}
                          </button>
                        </div>
                        <div className="text-sm text-gray-500">
                          状态: {progress[activeContent.id] ? '已完成' : '未完成'}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500">请选择一个课程内容</p>
                    </div>
                  )
                )}
                
                {/* 练习题目标签页 */}
                {activeTab === 'practice' && (
                  <QuestionPractice courseId={courseId} />
                )}
                
                {/* 测评考试标签页 */}
                {activeTab === 'exams' && selectedExamId && (
                  <Exam examId={selectedExamId} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CourseContent
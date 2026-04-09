import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const CourseDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [contents, setContents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [enrolling, setEnrolling] = useState(false)

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true)
        
        // 获取课程信息
        const { data: courseData, error: courseError } = await supabase
          .from('courses')
          .select('*')
          .eq('id', id)
          .single()

        if (courseError) throw courseError
        setCourse(courseData)

        // 获取课程内容
        const { data: contentsData, error: contentsError } = await supabase
          .from('course_contents')
          .select('*')
          .eq('course_id', id)
          .order('order_index', { ascending: true })

        if (contentsError) throw contentsError
        setContents(contentsData)

        // 检查用户是否已登录并 enrolled
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          // 这里可以检查用户是否已经enrolled，暂时默认为false
          setIsEnrolled(false)
        }

      } catch (err) {
        setError('获取课程数据失败')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourseData()
  }, [id])

  const handleEnroll = async () => {
    try {
      setEnrolling(true)
      
      // 检查用户是否已登录
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        // 跳转到登录页面
        navigate('/login', { state: { returnUrl: `/course/${id}` } })
        return
      }

      // 这里可以添加enrollment逻辑，例如创建学习记录
      // 暂时直接设置为已enrolled
      setIsEnrolled(true)
      
      // 跳转到课程内容页面
      navigate(`/course/${id}/content`)

    } catch (err) {
      alert('Enrollment失败，请重试')
      console.error(err)
    } finally {
      setEnrolling(false)
    }
  }

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

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-2/3">
              <div className="bg-gray-200 h-80 flex items-center justify-center mb-6">
                <div className="text-6xl">📚</div>
              </div>
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <div className="flex items-center mb-6">
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mr-2">
                  {course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}
                </span>
                <span className="text-gray-600">{course.duration} 小时</span>
              </div>
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-4">课程简介</h2>
                <p className="text-gray-700 mb-4">
                  {course.description}
                </p>
                <p className="text-gray-700">
                  课程特点：
                </p>
                <ul className="list-disc pl-5 text-gray-700">
                  <li>由行业专家授课</li>
                  <li>理论与实践相结合</li>
                  <li>提供丰富的学习资源</li>
                  <li>支持在线答疑</li>
                </ul>
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">课程大纲</h2>
                <div className="space-y-4">
                  {contents.map((content, index) => (
                    <div key={content.id} className="bg-gray-100 p-4 rounded-lg">
                      <h3 className="font-bold">第 {index + 1} 章：{content.title}</h3>
                      <p className="text-gray-600">{content.type === 'video' ? '视频' : '文本'}内容</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:w-1/3">
              <div className="bg-white shadow-md rounded-lg p-6 sticky top-4">
                <div className="text-3xl font-bold text-blue-600 mb-4">免费</div>
                {isEnrolled ? (
                  <button 
                    onClick={() => navigate(`/course/${id}/content`)}
                    className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded hover:bg-green-700 transition duration-300 mb-4"
                  >
                    继续学习
                  </button>
                ) : (
                  <button 
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded hover:bg-blue-700 transition duration-300 mb-4"
                  >
                    {enrolling ? '处理中...' : '立即报名'}
                  </button>
                )}
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-600 w-24">课程时长</span>
                    <span>{course.duration} 小时</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 w-24">课程难度</span>
                    <span>{course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 w-24">学习人数</span>
                    <span>1,234人</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 w-24">课程评分</span>
                    <span>4.9 (120评价)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default CourseDetail
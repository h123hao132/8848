import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('courses')
          .select('*')

        if (error) throw error
        setCourses(data)
      } catch (err) {
        setError('获取课程列表失败')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

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

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">{error}</h2>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
            >
              重新加载
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
          <h1 className="text-3xl font-bold mb-8">课程列表</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link to={`/course/${course.id}`} key={course.id} className="block">
                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300">
                  <div className="h-48 bg-gray-200 flex items-center justify-center">
                    <div className="text-4xl">📚</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4">{course.description.substring(0, 100)}...</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                        {course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}
                      </span>
                      <span className="text-gray-600">{course.duration} 小时</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 font-bold">免费</span>
                      <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                        查看详情
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Courses
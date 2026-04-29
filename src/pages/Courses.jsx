import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Clock, 
  Star, 
  Search, 
  Filter,
  ChevronRight,
  TrendingUp,
  Users,
  Award
} from 'lucide-react'
import { supabase } from '../lib/supabaseClient'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLevel, setSelectedLevel] = useState('all')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  const courseData = [
    {
      id: 7,
      title: '电商数据分析实战训练营',
      description: '完整的电商数据分析全流程实战，包含购物车分析和K-Means聚类，从零到完成商业项目',
      level: 'advanced',
      duration: '30小时',
      lessons: 18,
      rating: 5.0,
      students: 3200,
      color: 'from-rose-500 to-orange-500',
      category: '实战项目',
      isBootcamp: true
    },
    {
      id: 1,
      title: 'Python基础',
      description: '从零开始学习Python编程，掌握核心语法和编程思维，为数据分析打下坚实基础',
      level: 'beginner',
      duration: '40小时',
      lessons: 24,
      rating: 4.9,
      students: 12500,
      color: 'from-blue-500 to-cyan-500',
      category: '编程基础'
    },
    {
      id: 2,
      title: '数据分析入门',
      description: '学习数据处理、清洗和分析的实用技巧，使用Pandas进行高效数据分析',
      level: 'intermediate',
      duration: '50小时',
      lessons: 32,
      rating: 4.8,
      students: 8900,
      color: 'from-purple-500 to-pink-500',
      category: '数据分析'
    },
    {
      id: 3,
      title: '数据可视化',
      description: '用Matplotlib和Seaborn创建惊艳的数据图表，掌握数据可视化的最佳实践',
      level: 'intermediate',
      duration: '35小时',
      lessons: 20,
      rating: 4.9,
      students: 6700,
      color: 'from-emerald-500 to-teal-500',
      category: '数据可视化'
    },
    {
      id: 4,
      title: '机器学习基础',
      description: '学习机器学习的基本概念和算法，使用Scikit-learn构建预测模型',
      level: 'advanced',
      duration: '60小时',
      lessons: 36,
      rating: 4.7,
      students: 5200,
      color: 'from-orange-500 to-red-500',
      category: '机器学习'
    },
    {
      id: 5,
      title: '商业数据分析',
      description: '将数据分析应用于商业场景，学习如何从数据中获取商业洞察',
      level: 'intermediate',
      duration: '45小时',
      lessons: 28,
      rating: 4.8,
      students: 7800,
      color: 'from-indigo-500 to-purple-500',
      category: '商业应用'
    },
    {
      id: 6,
      title: '数据仓库与ETL',
      description: '学习数据仓库设计和ETL流程，掌握数据整合和处理的核心技能',
      level: 'advanced',
      duration: '55小时',
      lessons: 30,
      rating: 4.6,
      students: 4300,
      color: 'from-teal-500 to-cyan-500',
      category: '数据工程'
    }
  ]

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const { data, error } = await supabase
          .from('courses')
          .select('*')

        if (error) throw error
        setCourses(data.length > 0 ? data : courseData)
      } catch (err) {
        console.error(err)
        setCourses(courseData)
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [])

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel
    return matchesSearch && matchesLevel
  })

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-24">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-16 h-16 rounded-full border-4 border-primary-200 border-t-primary-500 mx-auto mb-6"
            />
            <p className="text-xl text-gray-600">正在加载课程...</p>
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
        <main className="flex-grow flex items-center justify-center py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">{error}</h2>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="btn-primary px-8 py-3 text-white font-semibold rounded-xl"
            >
              重新加载
            </motion.button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="py-16"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold font-display mb-4"
              >
                探索<span className="gradient-text">优质课程</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                从基础到进阶，系统化的课程体系助你成为数据专家
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-6 mb-12"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索课程..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none bg-white"
                  >
                    <option value="all">所有级别</option>
                    <option value="beginner">初级</option>
                    <option value="intermediate">中级</option>
                    <option value="advanced">高级</option>
                  </select>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.id}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className={`glass-card rounded-3xl overflow-hidden card-hover ${course.isBootcamp ? 'ring-4 ring-rose-300 ring-opacity-50' : ''}`}
                >
                  <Link to={course.isBootcamp ? '/ecommerce-bootcamp' : `/courses/${course.id}`} className="block">
                    <div className={`h-56 bg-gradient-to-br ${course.color} relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/10" />
                      {course.isBootcamp && (
                        <div className="absolute top-4 left-4 z-10">
                          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                            <Award className="w-3 h-3" />
                            <span>实战训练营</span>
                          </span>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                          {course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}
                        </span>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 z-10">
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block">
                          {course.category}
                        </span>
                        <h3 className="text-2xl font-bold text-white">{course.title}</h3>
                      </div>
                      {!course.isBootcamp && (
                        <div className="absolute top-4 left-4 z-10">
                          <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-800">{course.rating}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                      
                      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.lessons} 课时</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <span className="bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold px-3 py-1 rounded-lg text-sm">
                            免费
                          </span>
                        </div>
                        
                        <div className="btn-primary px-4 py-2 text-white font-medium rounded-xl flex items-center space-x-2">
                          <span>查看详情</span>
                          <ChevronRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {filteredCourses.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">没有找到课程</h3>
                <p className="text-gray-600">请尝试调整搜索条件或筛选选项</p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { icon: TrendingUp, title: '持续更新', desc: '课程内容定期更新，紧跟行业趋势' },
                { icon: Award, title: '专业认证', desc: '完成课程获得认证证书' },
                { icon: Users, title: '社区支持', desc: '加入学习社区，交流学习心得' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-6 text-center"
                >
                  <div className="feature-icon w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{stat.title}</h4>
                  <p className="text-gray-600">{stat.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  )
}

export default Courses

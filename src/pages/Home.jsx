import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  BookOpen, 
  Code, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  CheckCircle, 
  Sparkles,
  Users,
  Clock,
  Star,
  Brain,
  BarChart3,
  Globe,
  Zap,
  Lightbulb,
  LineChart
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {
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

  const courses = [
    {
      id: 1,
      title: 'Python基础',
      description: '从零开始学习Python编程，掌握核心语法和编程思维',
      level: '初级',
      duration: '40小时',
      lessons: 24,
      rating: 4.9,
      students: 12500,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 2,
      title: '数据分析入门',
      description: '学习数据处理、清洗和分析的实用技巧',
      level: '中级',
      duration: '50小时',
      lessons: 32,
      rating: 4.8,
      students: 8900,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 3,
      title: '数据可视化',
      description: '用Matplotlib和Seaborn创建惊艳的数据图表',
      level: '中级',
      duration: '35小时',
      lessons: 20,
      rating: 4.9,
      students: 6700,
      color: 'from-emerald-500 to-teal-500'
    }
  ]

  const features = [
    {
      icon: BookOpen,
      title: '系统化课程',
      description: '由行业专家精心设计的完整学习路径，从基础到进阶'
    },
    {
      icon: Code,
      title: '实战练习',
      description: '在浏览器中直接编写代码，即时获得反馈和指导'
    },
    {
      icon: TrendingUp,
      title: '进度追踪',
      description: '可视化学习进度，清晰了解自己的成长历程'
    },
    {
      icon: Award,
      title: '成就激励',
      description: '通过徽章和证书，记录和庆祝每一个学习里程碑'
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <Navbar />
      <main className="flex-grow pt-24">
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="relative overflow-hidden py-20 md:py-32"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-indigo-50 to-blue-50" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-soft" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-soft" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div variants={itemVariants} className="space-y-8">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-violet-100 to-indigo-100 text-indigo-700 px-6 py-3 rounded-full shadow-sm"
                >
                  <Zap className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-semibold">2026年新版课程上线</span>
                </motion.div>
                
                <motion.h1 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-5xl md:text-7xl font-bold font-display leading-tight"
                >
                  掌握<span className="gradient-text">数据科学</span>
                  <br />
                  开启职业新篇章
                </motion.h1>
                
                <motion.p 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-lg md:text-2xl text-gray-600 leading-relaxed"
                >
                  专为商务数据分析与应用专业学生打造的完整学习体系。
                  从Python基础到机器学习，实战项目驱动，让你真正掌握数据分析技能。
                </motion.p>
                
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-col sm:flex-row gap-6"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group"
                  >
                    <Link 
                      to="/courses"
                      className="inline-flex items-center space-x-3 px-8 py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg rounded-2xl shadow-xl group-hover:shadow-2xl transition-all"
                    >
                      <span>开始学习</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group"
                  >
                    <Link 
                      to="/ecommerce-bootcamp"
                      className="inline-flex items-center space-x-3 px-8 py-5 bg-white text-indigo-700 font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-indigo-100 group-hover:border-indigo-300"
                    >
                      <Brain className="w-5 h-5" />
                      <span>实战训练营</span>
                    </Link>
                  </motion.button>
                </motion.div>
                
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="flex flex-wrap items-center gap-6 pt-4"
                >
                  <div className="flex items-center space-x-3 bg-white rounded-full px-5 py-3 shadow-sm">
                    <Users className="w-6 h-6 text-indigo-600" />
                    <span className="text-gray-700 font-semibold">50,000+ 学生</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white rounded-full px-5 py-3 shadow-sm">
                    <Star className="w-6 h-6 text-yellow-500 fill-current" />
                    <span className="text-gray-700 font-semibold">4.9 平均评分</span>
                  </div>
                  <div className="flex items-center space-x-3 bg-white rounded-full px-5 py-3 shadow-sm">
                    <Award className="w-6 h-6 text-violet-600" />
                    <span className="text-gray-700 font-semibold">1000+ 证书</span>
                  </div>
                </motion.div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="relative">
                <motion.div
                  animate={{ 
                    y: [0, -20, 0],
                    rotate: [0, 1, 0]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                  className="glass-card rounded-3xl p-8 shadow-2xl border border-white/30"
                >
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg">
                        <Code className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">Python数据分析</h3>
                        <p className="text-gray-500">实时编码环境</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-900 rounded-2xl p-6 font-mono text-sm shadow-inner">
                      <div className="text-green-400 mb-2">>>> import pandas as pd</div>
                      <div className="text-green-400 mb-2">>>> data = pd.read_csv('sales.csv')</div>
                      <div className="text-green-400 mb-2">>>> data.describe()</div>
                      <div className="text-gray-400 mt-4">
                        <span className="text-yellow-400">✓</span> 代码执行成功！
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="text-sm text-gray-600">已完成 12/24 课时</span>
                      </div>
                      <div className="w-36 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  whileHover={{ y: -5 }}
                  className="absolute -left-8 top-20 glass-card rounded-2xl p-4 shadow-xl border border-white/30"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shadow-md">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800">获得徽章！</p>
                      <p className="text-xs text-gray-500">Python初学者</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ x: 20, y: 20, opacity: 0 }}
                  animate={{ x: 0, y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, type: 'spring' }}
                  whileHover={{ y: -5 }}
                  className="absolute -right-6 bottom-10 glass-card rounded-2xl p-4 shadow-xl border border-white/30"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-md">
                      <Lightbulb className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-gray-800">学习提示</p>
                      <p className="text-xs text-gray-500">多实践多练习</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-24"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring' }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 px-6 py-3 rounded-full mb-6 shadow-sm"
              >
                <Sparkles className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-semibold">平台特色</span>
              </motion.div>
              <motion.h2 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold font-display mb-6"
              >
                为什么选择 <span className="gradient-text">DataLearn</span>
              </motion.h2>
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                我们精心设计的学习体验，帮助你高效掌握数据分析技能，开启职业新篇章
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: '系统化课程',
                  description: '由行业专家精心设计的完整学习路径，从基础到进阶',
                  gradient: 'from-blue-500 to-cyan-500'
                },
                {
                  icon: Code,
                  title: '实战练习',
                  description: '在浏览器中直接编写代码，即时获得反馈和指导',
                  gradient: 'from-indigo-500 to-violet-500'
                },
                {
                  icon: TrendingUp,
                  title: '进度追踪',
                  description: '可视化学习进度，清晰了解自己的成长历程',
                  gradient: 'from-emerald-500 to-teal-500'
                },
                {
                  icon: Award,
                  title: '成就激励',
                  description: '通过徽章和证书，记录和庆祝每一个学习里程碑',
                  gradient: 'from-amber-500 to-orange-500'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8, type: 'spring' }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className="glass-card rounded-3xl p-8 card-hover border border-white/50 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 shadow-lg`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-24 bg-gradient-to-br from-indigo-50 via-white to-violet-50 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgxNSkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDIxNSwgMjIwLCAyNTUsIDAuMSkiIHN0cm9rZS13aWR0aD0iMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')] opacity-50" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-20">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring' }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-violet-100 text-indigo-700 px-6 py-3 rounded-full mb-6 shadow-sm"
              >
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-semibold">精品课程</span>
              </motion.div>
              <motion.h2 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold font-display mb-6"
              >
                热门课程推荐
              </motion.h2>
              <motion.p 
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-xl text-gray-600 max-w-3xl mx-auto"
              >
                从基础到进阶，系统化的课程体系助你成为数据专家
              </motion.p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  id: 7,
                  title: '电商数据分析实战训练营',
                  description: '完整的电商数据分析全流程实战，包含购物车分析和K-Means聚类',
                  level: '高级',
                  duration: '30小时',
                  lessons: 18,
                  rating: 5.0,
                  students: 3200,
                  color: 'from-rose-500 to-orange-500',
                  path: '/ecommerce-bootcamp',
                  isBootcamp: true
                },
                {
                  id: 1,
                  title: 'Python基础',
                  description: '从零开始学习Python编程，掌握核心语法和编程思维',
                  level: '初级',
                  duration: '40小时',
                  lessons: 24,
                  rating: 4.9,
                  students: 12500,
                  color: 'from-blue-500 to-cyan-500',
                  path: '/courses/1'
                },
                {
                  id: 2,
                  title: '数据分析入门',
                  description: '学习数据处理、清洗和分析的实用技巧',
                  level: '中级',
                  duration: '50小时',
                  lessons: 32,
                  rating: 4.8,
                  students: 8900,
                  color: 'from-purple-500 to-pink-500',
                  path: '/courses/2'
                }
              ].map((course, index) => (
                <motion.div
                  key={course.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8, type: 'spring' }}
                  whileHover={{ y: -12, scale: 1.02 }}
                  className={`glass-card rounded-3xl overflow-hidden card-hover border border-white/50 shadow-lg hover:shadow-xl transition-all ${course.isBootcamp ? 'ring-4 ring-rose-300 ring-opacity-30' : ''}`}
                >
                  <div className={`h-56 bg-gradient-to-br ${course.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10" />
                    {course.isBootcamp && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-md">
                          <Award className="w-3 h-3" />
                          <span>实战训练营</span>
                        </span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800 shadow-sm">
                        {course.level}
                      </span>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 z-10">
                      <h3 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">{course.title}</h3>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-600 mb-6 leading-relaxed">{course.description}</p>
                    
                    <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons} 课时</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-bold text-gray-800">{course.rating}</span>
                        <span className="text-gray-400">({course.students.toLocaleString()})</span>
                      </div>
                      
                      <Link
                        to={course.path}
                        className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                      >
                        查看详情
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center mt-16"
            >
              <Link
                to="/courses"
                className="inline-flex items-center space-x-3 px-8 py-5 bg-white text-indigo-700 font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-indigo-100 hover:border-indigo-300 group"
              >
                <span>浏览全部课程</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.section>
        
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-24"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', duration: 0.8 }}
              className="glass-card rounded-3xl p-12 md:p-16 text-center relative overflow-hidden border border-white/50 shadow-2xl"
            >
              <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <motion.h2 
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl font-bold font-display mb-8"
                >
                  准备好开始你的<span className="gradient-text">数据科学之旅</span>了吗？
                </motion.h2>
                <motion.p 
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-gray-600 mb-10 leading-relaxed"
                >
                  加入成千上万的学习者，一起掌握数据分析技能，开启职业新篇章。
                  立即注册，获取免费学习资源和专属学习路径。
                </motion.p>
                
                <motion.div 
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group"
                  >
                    <Link 
                      to="/register"
                      className="inline-flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg rounded-2xl shadow-xl group-hover:shadow-2xl transition-all"
                    >
                      <span>免费注册</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group"
                  >
                    <Link 
                      to="/courses"
                      className="inline-flex items-center space-x-3 px-10 py-5 bg-white text-indigo-700 font-semibold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-indigo-100 group-hover:border-indigo-300"
                    >
                      <BookOpen className="w-5 h-5" />
                      <span>浏览课程</span>
                    </Link>
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  )
}

export default Home

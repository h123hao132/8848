import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  BookOpen,
  Code,
  Target,
  CheckCircle,
  Clock,
  Award,
  Play,
  ChevronRight,
  BarChart3,
  Users,
  ShoppingCart
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const EcommerceAnalysisCourse = () => {
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

  const modules = [
    {
      id: 1,
      title: '数据读取与基础清洗',
      duration: '30分钟',
      description: '学习如何读取电商数据，进行去重、缺失值处理和异常值过滤',
      icon: BookOpen
    },
    {
      id: 2,
      title: '购物车核心分析',
      duration: '45分钟',
      description: '分析购物车放弃率、商品共现关系，创建可视化图表',
      icon: ShoppingCart
    },
    {
      id: 3,
      title: 'RFM特征工程',
      duration: '40分钟',
      description: '构建RFM特征（最近购买、购买频率、消费金额），处理异常值',
      icon: BarChart3
    },
    {
      id: 4,
      title: 'K-Means聚类建模',
      duration: '50分钟',
      description: '使用手肘法确定最优K，训练聚类模型，评估轮廓系数',
      icon: Target
    },
    {
      id: 5,
      title: '聚类可视化与业务解读',
      duration: '35分钟',
      description: '创建雷达图展示用户群特征，进行业务命名和策略制定',
      icon: Users
    },
    {
      id: 6,
      title: '购物车+聚类融合分析',
      duration: '40分钟',
      description: '结合购物车行为和聚类结果，深入分析不同用户群体的购物习惯',
      icon: CheckCircle
    }
  ]

  const skills = [
    { name: 'pandas', level: '高级' },
    { name: 'matplotlib', level: '高级' },
    { name: 'seaborn', level: '中级' },
    { name: 'scikit-learn', level: '中级' },
    { name: 'K-Means聚类', level: '高级' },
    { name: 'RFM模型', level: '高级' }
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600"
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white mb-6"
              >
                <Award className="w-5 h-5" />
                <span className="font-semibold">数据分析实战训练营</span>
              </motion.div>
              
              <h1 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">
                🛒 电商数据分析全流程
                <br />
                <span className="text-indigo-200">购物车分析 + K-Means聚类</span>
              </h1>
              
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                从零开始完成一个完整的电商数据分析项目，掌握购物车分析、RFM模型和用户分群的实战技巧
              </p>

              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="flex items-center space-x-2 text-white">
                  <Clock className="w-5 h-5" />
                  <span>学习时长：约4小时</span>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <BookOpen className="w-5 h-5" />
                  <span>6个完整模块</span>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <Code className="w-5 h-5" />
                  <span>完整代码实践</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/python-editor"
                  className="btn-primary inline-flex items-center space-x-2 px-8 py-4 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <Play className="w-5 h-5" />
                  <span>立即开始实践</span>
                </Link>
                <Link
                  to="/courses"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-indigo-600 font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <span>查看其他课程</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* What You'll Learn */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20 bg-gradient-to-br from-gray-50 to-white"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                🎯 你将学到什么
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                完整的数据分析流程，从数据清洗到业务决策支持
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {[
                {
                  icon: CheckCircle,
                  title: '数据清洗技巧',
                  description: '学习如何处理重复值、缺失值和异常值'
                },
                {
                  icon: ShoppingCart,
                  title: '购物车分析',
                  description: '分析用户购物车行为，计算放弃率和商品组合'
                },
                {
                  icon: BarChart3,
                  title: 'RFM模型',
                  description: '掌握Recency-Frequency-Monetary特征工程方法'
                },
                {
                  icon: Target,
                  title: 'K-Means聚类',
                  description: '使用手肘法和轮廓系数优化聚类模型'
                },
                {
                  icon: Users,
                  title: '用户分群',
                  description: '创建雷达图展示不同用户群体的特征'
                },
                {
                  icon: Award,
                  title: '业务解读',
                  description: '将聚类结果转化为可执行的业务策略'
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="glass-card rounded-2xl p-6 card-hover"
                >
                  <div className="feature-icon w-14 h-14 rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Course Modules */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                📚 课程模块
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                循序渐进的学习路径，每个模块都是可执行的实战内容
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto space-y-4"
            >
              {modules.map((module, index) => {
                const Icon = module.icon
                return (
                  <motion.div
                    key={module.id}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card rounded-2xl p-6 card-hover"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold">
                            模块 {module.id}: {module.title}
                          </h3>
                          <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                            {module.duration}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-3">{module.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          <span>包含完整代码和详细注释</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </motion.section>

        {/* Skills You'll Master */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">
                💡 核心技能
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                全面掌握数据分析的核心技术栈
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-xl p-4 text-center card-hover"
                >
                  <div className="font-bold text-lg mb-1">{skill.name}</div>
                  <div className="text-sm text-gray-600">{skill.level}</div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full"
                      style={{ width: skill.level === '高级' ? '85%' : '70%' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
              <div className="absolute top-0 left-0 w-40 h-40 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
              
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">
                  准备好开始您的数据分析之旅了吗？
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  立即开始这个电商数据分析实战项目，将理论知识转化为实战技能！
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/python-editor"
                    className="btn-primary inline-flex items-center space-x-2 px-8 py-4 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <Play className="w-5 h-5" />
                    <span>开始实践代码</span>
                  </Link>
                  <Link
                    to="/courses"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-white text-indigo-600 font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all border-2 border-indigo-200"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>浏览更多课程</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  )
}

export default EcommerceAnalysisCourse

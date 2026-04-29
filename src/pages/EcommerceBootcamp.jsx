import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Trophy, 
  CheckCircle, 
  Code, 
  BarChart3, 
  ShoppingCart, 
  Users, 
  BrainCircuit,
  Clock,
  ChevronRight,
  Zap,
  Star,
  Target,
  Sparkles
} from 'lucide-react'
import PythonEditor from '../components/PythonEditor'

const EcommerceBootcamp = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
      step: '01',
      title: '数据获取与清洗',
      desc: '学习如何获取电商数据，使用Pandas进行数据清洗和预处理',
      icon: Code
    },
    {
      step: '02',
      title: '购物车分析',
      desc: '深入分析购物车放弃率、商品组合、用户行为模式',
      icon: ShoppingCart
    },
    {
      step: '03',
      title: 'RFM特征工程',
      desc: '构建Recency-Frequency-Monetary用户价值模型',
      icon: BarChart3
    },
    {
      step: '04',
      title: 'K-Means聚类',
      desc: '使用机器学习算法进行用户分群和细分',
      icon: BrainCircuit
    },
    {
      step: '05',
      title: '数据可视化',
      desc: '创建专业的图表展示分析结果和业务洞察',
      icon: Target
    },
    {
      step: '06',
      title: '业务解读与输出',
      desc: '将分析转化为可执行的商业策略建议',
      icon: Trophy
    }
  ]

  const skills = [
    { name: 'Pandas数据处理', level: 95 },
    { name: 'K-Means聚类', level: 88 },
    { name: '数据可视化', level: 90 },
    { name: '用户分群', level: 85 },
    { name: '商业分析', level: 92 }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-50">
      <Navbar />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-16 md:py-24"
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-orange-500 text-white px-6 py-3 rounded-full mb-6"
              >
                <Zap className="w-5 h-5" />
                <span className="font-bold">实战训练营</span>
                <Sparkles className="w-5 h-5" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-6xl font-bold font-display mb-6"
              >
                <span className="gradient-text">电商数据分析</span>
                <br />
                <span className="text-gray-800">全流程实战</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                从数据获取到业务洞察，完整的电商数据分析项目实战！
                <br />
                包含购物车分析、RFM模型、K-Means聚类等核心技能
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-6 mb-10"
              >
                <div className="flex items-center space-x-2 text-gray-600">
                  <Clock className="w-5 h-5 text-rose-500" />
                  <span className="font-medium">30小时</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Code className="w-5 h-5 text-orange-500" />
                  <span className="font-medium">6个模块</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users className="w-5 h-5 text-amber-500" />
                  <span className="font-medium">3,200+学员</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-gray-800">5.0评分</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold px-10 py-4 rounded-2xl shadow-lg shadow-rose-500/30 flex items-center justify-center space-x-2"
                >
                  <span>开始学习</span>
                  <ChevronRight className="w-5 h-5" />
                </motion.button>
                <Link to="/python-editor">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-gray-800 font-bold px-10 py-4 rounded-2xl shadow-lg border-2 border-gray-200 hover:border-rose-300 transition-all"
                  >
                    直接编码
                  </motion.button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Modules Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold font-display mb-4"
              >
                课程<span className="gradient-text">模块</span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                系统化的学习路径，从基础到高级，掌握完整的电商数据分析流程
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {modules.map((module, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -8 }}
                  className="glass-card rounded-3xl p-8 card-hover"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="feature-icon w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
                      <module.icon className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-3xl font-black text-gray-200">{module.step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{module.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{module.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold font-display mb-4"
              >
                掌握<span className="gradient-text">技能</span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-600 max-w-2xl mx-auto"
              >
                完成课程后，你将掌握以下核心技能
              </motion.p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="glass-card rounded-3xl p-8">
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="mb-8 last:mb-0"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-gray-800 text-lg">{skill.name}</span>
                      <span className="font-bold text-rose-500">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 1, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-rose-500 to-orange-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* Live Editor Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 bg-gradient-to-br from-gray-900 to-gray-800"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold font-display mb-4 text-white"
              >
                实战<span className="text-rose-400">编码</span>
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-300 max-w-2xl mx-auto"
              >
                直接在浏览器中运行完整的电商数据分析代码
              </motion.p>
            </div>

            <motion.div variants={itemVariants} className="max-w-5xl mx-auto">
              <PythonEditor />
            </motion.div>
          </div>
        </motion.section>

        {/* Why Choose Section */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 bg-white"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold font-display mb-4"
              >
                为什么选择<span className="gradient-text">实战训练营</span>
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: CheckCircle, title: '真实项目', desc: '完整的电商数据分析流程，可直接应用于工作' },
                { icon: Code, title: '即学即用', desc: '边学边练，提供完整可运行的代码示例' },
                { icon: BrainCircuit, title: '深度分析', desc: '从数据清洗到机器学习，深入讲解每个环节' },
                { icon: Trophy, title: '作品产出', desc: '完成课程获得完整的项目作品集' }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="glass-card rounded-2xl p-8 text-center"
                >
                  <div className="feature-icon w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h4>
                  <p className="text-gray-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <div className="glass-card rounded-3xl p-12 text-center max-w-4xl mx-auto bg-gradient-to-br from-rose-500 to-orange-500">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring' }}
              >
                <Trophy className="w-20 h-20 text-white mx-auto mb-6" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white mb-6 font-display"
              >
                准备好开始实战了吗？
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/90 mb-8"
              >
                加入实战训练营，成为电商数据分析专家！
              </motion.p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-rose-600 font-bold px-10 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                立即开始学习
              </motion.button>
            </div>
          </div>
        </motion.section>
      </main>
      
      <Footer />
    </div>
  )
}

export default EcommerceBootcamp

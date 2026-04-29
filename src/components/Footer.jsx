import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  Code, 
  BookOpen, 
  TrendingUp, 
  Award,
  MessageCircle,
  GitBranch,
  Briefcase,
  Mail,
  ArrowRight
} from 'lucide-react'

const Footer = () => {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  const quickLinks = [
    { name: '首页', path: '/' },
    { name: '课程', path: '/courses' },
    { name: 'Python编辑器', path: '/python-editor' },
    { name: '成就', path: '/achievements' }
  ]

  const resources = [
    { name: 'Python基础', path: '/courses/1' },
    { name: '数据分析', path: '/courses/2' },
    { name: '数据可视化', path: '/courses/3' },
    { name: '机器学习', path: '/courses/4' }
  ]

  const features = [
    { icon: Code, name: '在线编码' },
    { icon: BookOpen, name: '系统化课程' },
    { icon: TrendingUp, name: '进度追踪' },
    { icon: Award, name: '成就激励' }
  ]

  return (
    <motion.footer 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white mt-auto"
    >
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Code className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold font-display bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                DataLearn
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              专为商务数据分析与应用专业学生打造的完整学习体系。
              让你真正掌握数据分析技能，开启职业新篇章。
            </p>
            <div className="flex items-center space-x-4">
              {[MessageCircle, GitBranch, Briefcase, Mail].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-gray-700/50 flex items-center justify-center hover:bg-primary-500 transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-primary-400" />
              <span>快速链接</span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 4 }}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-accent-400" />
              <span>热门课程</span>
            </h3>
            <ul className="space-y-3">
              {resources.map((link, index) => (
                <motion.li key={index} whileHover={{ x: 4 }}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6 flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span>平台特色</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-700/30 rounded-xl p-3 text-center"
                >
                  <feature.icon className="w-6 h-6 mx-auto mb-2 text-primary-400" />
                  <span className="text-sm text-gray-300">{feature.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="border-t border-gray-700 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} DataLearn. 保留所有权利.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                隐私政策
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                使用条款
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                联系我们
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer

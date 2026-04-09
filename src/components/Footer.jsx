const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">学习平台</h3>
            <p className="text-gray-400">提供高质量的在线学习资源，助力您的职业发展。</p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">快速链接</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-white">首页</a></li>
              <li><a href="/courses" className="hover:text-white">课程列表</a></li>
              <li><a href="/about" className="hover:text-white">关于我们</a></li>
              <li><a href="/contact" className="hover:text-white">联系我们</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">联系我们</h3>
            <p className="text-gray-400 mb-2">邮箱：contact@learningplatform.com</p>
            <p className="text-gray-400">电话：123-456-7890</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} 学习平台. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
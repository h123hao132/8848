import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [user, setUser] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    // 获取当前用户信息
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getCurrentUser()

    // 监听用户状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            <Link to="/">学习平台</Link>
          </div>
          
          {/* 桌面菜单 */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="hover:text-gray-300">首页</Link>
            <Link to="/courses" className="hover:text-gray-300">课程列表</Link>
            <Link to="/python-editor" className="hover:text-gray-300">Python编辑器</Link>
            {user ? (
              <>
                <Link to="/profile" className="hover:text-gray-300">个人资料</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-300">登录</Link>
                <Link to="/register" className="hover:text-gray-300">注册</Link>
              </>
            )}
          </div>
          
          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <Link to="/" className="block py-2 hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>首页</Link>
            <Link to="/courses" className="block py-2 hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>课程列表</Link>
            <Link to="/python-editor" className="block py-2 hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>Python编辑器</Link>
            {user ? (
              <Link to="/profile" className="block py-2 hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>个人资料</Link>
            ) : (
              <>
                <Link to="/login" className="block py-2 hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>登录</Link>
                <Link to="/register" className="block py-2 hover:text-gray-300" onClick={() => setIsMenuOpen(false)}>注册</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
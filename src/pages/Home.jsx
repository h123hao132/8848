import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">欢迎来到学习平台</h1>
            <p className="text-xl mb-8">发现高质量的在线课程，提升您的技能</p>
            <button className="bg-white text-blue-600 font-bold py-2 px-6 rounded-lg hover:bg-gray-100 transition duration-300">
              浏览课程
            </button>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">热门课程</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((course) => (
                <div key={course} className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">课程名称 {course}</h3>
                    <p className="text-gray-600 mb-4">这是一门高质量的课程，帮助您掌握相关技能。</p>
                    <button className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                      查看详情
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="bg-gray-100 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">为什么选择我们</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: '高质量课程', desc: '由行业专家精心设计的课程内容' },
                { title: '灵活学习', desc: '随时随地学习，按照自己的节奏' },
                { title: '专业支持', desc: '获取专业导师的指导和支持' }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Home
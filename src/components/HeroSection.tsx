import { Play } from 'lucide-react'

const HeroSection = () => {
  const handleGetStarted = () => {
    // You can implement this to open pricing modal or navigate to signup
    console.log('Get Started clicked')
  }

  return (
    <section className="bg-primary-600 section-padding">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Streamline Your HR Operations with AI-Powered Solutions
            </h1>
            <p className="text-xl text-primary-100 mb-8 leading-relaxed">
              Automate recruitment, manage payroll, track performance, and ensure compliance with our comprehensive HR management platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-secondary" onClick={handleGetStarted}>
                Start Free Trial
              </button>
              <button className="btn-primary flex items-center justify-center">
                <Play size={20} className="mr-2" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Content - Dashboard Mockup */}
          <div className="relative">
            <div className="bg-white rounded-lg shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800">HR Dashboard</h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                {/* Charts Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Bar Chart */}
                  <div className="bg-blue-500 rounded p-2 flex items-end justify-between">
                    <div className="w-1 bg-white rounded-full h-8"></div>
                    <div className="w-1 bg-white rounded-full h-12"></div>
                    <div className="w-1 bg-white rounded-full h-6"></div>
                    <div className="w-1 bg-white rounded-full h-10"></div>
                  </div>
                  
                  {/* Line Chart */}
                  <div className="bg-orange-500 rounded p-2 relative">
                    <div className="absolute inset-2 border-l-2 border-b-2 border-white rounded-bl"></div>
                    <div className="absolute bottom-2 left-2 w-8 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-4 h-1 bg-white rounded-full"></div>
                    <div className="absolute bottom-6 left-6 w-6 h-1 bg-white rounded-full"></div>
                  </div>
                  
                  {/* Donut Chart */}
                  <div className="bg-yellow-500 rounded p-2 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-white rounded-full border-r-transparent"></div>
                  </div>
                  
                  {/* Stats */}
                  <div className="bg-green-500 rounded p-2 text-white text-center">
                    <div className="text-sm font-bold">85%</div>
                    <div className="text-xs">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection

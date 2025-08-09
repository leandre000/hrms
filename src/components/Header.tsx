import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import PricingModal from './PricingModal'
import ContactModal from './ContactModal'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPricingOpen, setIsPricingOpen] = useState(false)
  const [isContactOpen, setIsContactOpen] = useState(false)

  const navigation = [
    { name: 'Features', href: '#features', action: () => {
      const element = document.getElementById('features');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }},
    { name: 'Pricing', href: '#pricing', action: () => setIsPricingOpen(true) },
    { name: 'Reviews', href: '#reviews', action: () => {
      const element = document.getElementById('reviews');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }},
    { name: 'Contact', href: '#contact', action: () => setIsContactOpen(true) },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center mr-2">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-xl font-bold text-gray-900">HR Pro</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={item.action || (() => {})}
                className="text-gray-600 hover:text-primary-600 transition-colors duration-200"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors duration-200">
              Sign In
            </Link>
            <button className="btn-primary">
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-primary-600"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

                {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    if (item.action) {
                      item.action()
                    }
                    setIsMenuOpen(false)
                  }}
                  className="text-left text-gray-600 hover:text-primary-600 transition-colors duration-200"
                >
                  {item.name}
                </button>
              ))}
              <div className="pt-4 border-t border-gray-200">
                <Link to="/login" className="block text-gray-600 hover:text-primary-600 mb-2">
                  Sign In
                </Link>
                <button className="btn-primary w-full">
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}

                {/* Modals */}
        <PricingModal isOpen={isPricingOpen} onClose={() => setIsPricingOpen(false)} />
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </div>
    </header>
  )
}

export default Header

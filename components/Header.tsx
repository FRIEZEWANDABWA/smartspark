import { useState } from 'react'
import { Menu, X, Zap, Sun, Moon } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from '../contexts/ThemeContext'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-white dark:bg-primary-900 shadow-lg fixed w-full top-0 z-50 transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <img src="/images/logo.webp" alt="SmartSpark Services" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
            <div className="ml-2 md:ml-4">
              <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white transition-colors">SmartSpark Services</h1>
              <p className="text-xs md:text-sm lg:text-base text-gray-600 dark:text-gray-300 transition-colors hidden sm:block">Where AI and Creativity Ignite</p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <div className="flex items-baseline space-x-4 lg:space-x-6">
              <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-2 lg:px-3 py-2 text-sm font-medium transition-colors">Home</Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-2 lg:px-3 py-2 text-sm font-medium transition-colors">About</Link>
              <Link href="/services" className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-2 lg:px-3 py-2 text-sm font-medium transition-colors">Services</Link>
              <Link href="/portfolio" className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-2 lg:px-3 py-2 text-sm font-medium transition-colors">Portfolio</Link>
              <Link href="/blog" className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-2 lg:px-3 py-2 text-sm font-medium transition-colors">Blog</Link>
              <Link href="/contact" className="bg-accent-500 text-white px-3 lg:px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-600 transition-colors">Get a Quote</Link>
            </div>
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 p-2 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
          
          <div className="md:hidden flex items-center space-x-1">
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 p-2 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 p-2 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-primary-800 border-t border-gray-200 dark:border-primary-700 transition-colors">
              <Link href="/" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-3 text-base font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-primary-700">Home</Link>
              <Link href="/about" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-3 text-base font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-primary-700">About</Link>
              <Link href="/services" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-3 text-base font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-primary-700">Services</Link>
              <Link href="/portfolio" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-3 text-base font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-primary-700">Portfolio</Link>
              <Link href="/blog" onClick={() => setIsOpen(false)} className="block text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-3 text-base font-medium transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-primary-700">Blog</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="block bg-accent-500 text-white px-3 py-3 text-base font-medium rounded-lg mt-2 text-center hover:bg-accent-600 transition-colors">Get a Quote</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
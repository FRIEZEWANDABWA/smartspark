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
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <img src="/images/logo.jpeg" alt="SmartSpark Services" className="w-12 h-12 rounded-full object-cover shadow-md" />
            <div className="ml-2">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white transition-colors">SmartSpark Services</h1>
              <p className="text-xs text-gray-600 dark:text-gray-300 transition-colors">Where AI and Creativity Ignite</p>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-baseline space-x-6">
              <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-2 text-sm font-medium transition-colors">Home</Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-2 text-sm font-medium transition-colors">About</Link>
              <Link href="/services" className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-2 text-sm font-medium transition-colors">Services</Link>
              <Link href="/portfolio" className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-2 text-sm font-medium transition-colors">Portfolio</Link>
              <Link href="/blog" className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-2 text-sm font-medium transition-colors">Blog</Link>
              <Link href="/contact" className="bg-accent-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent-600 transition-colors">Get a Quote</Link>
            </div>
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 p-2 rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
          
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 p-2 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-primary-800 border-t border-gray-200 dark:border-primary-700 transition-colors">
              <Link href="/" className="block text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-2 text-base font-medium transition-colors">Home</Link>
              <Link href="/about" className="block text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-2 text-base font-medium transition-colors">About</Link>
              <Link href="/services" className="block text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-2 text-base font-medium transition-colors">Services</Link>
              <Link href="/portfolio" className="block text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-2 text-base font-medium transition-colors">Portfolio</Link>
              <Link href="/blog" className="block text-gray-700 dark:text-gray-200 hover:text-accent-500 dark:hover:text-accent-400 px-3 py-2 text-base font-medium transition-colors">Blog</Link>
              <Link href="/contact" className="block bg-accent-500 text-white px-3 py-2 text-base font-medium rounded-lg mt-2">Get a Quote</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        setTheme(savedTheme as Theme)
      } else {
        setTheme('dark')
      }
    } catch (error) {
      console.warn('Failed to load theme from localStorage:', error)
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme)
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error)
    }
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider. Please wrap your component with <ThemeProvider>.')
  }
  return context
}
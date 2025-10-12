// Image optimization utilities
export const optimizeImageUrl = (src: string, width: number = 800, quality: number = 85) => {
  if (src.startsWith('http')) return src
  return `${src}?w=${width}&q=${quality}`
}

// Lazy loading utility
export const lazyLoad = (callback: () => void, delay: number = 100) => {
  const timer = setTimeout(callback, delay)
  return () => clearTimeout(timer)
}

// Preload critical resources
export const preloadResource = (href: string, as: string = 'image') => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = href
    link.as = as
    document.head.appendChild(link)
  }
}

// Critical CSS inlining
export const inlineCriticalCSS = () => {
  return `
    .hero-section { min-height: 100vh; }
    .nav-fixed { position: fixed; top: 0; z-index: 50; }
    .fade-in { opacity: 0; animation: fadeIn 0.5s ease-in forwards; }
    @keyframes fadeIn { to { opacity: 1; } }
  `
}
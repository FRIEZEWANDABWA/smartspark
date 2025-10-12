import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const useAuthGuard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    
    if (!token) {
      router.push('/admin/login')
      return
    }

    // Verify token
    fetch('/api/auth/verify', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
      if (res.ok) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem('adminToken')
        router.push('/admin/login')
      }
    })
    .catch(() => {
      localStorage.removeItem('adminToken')
      router.push('/admin/login')
    })
    .finally(() => setLoading(false))
  }, [router])

  return { isAuthenticated, loading }
}

export const logout = () => {
  localStorage.removeItem('adminToken')
  window.location.href = '/admin/login'
}
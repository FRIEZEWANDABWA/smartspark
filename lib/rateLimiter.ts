const attempts = new Map()

export function rateLimit(ip: string, maxAttempts = 5, windowMs = 15 * 60 * 1000) {
  const now = Date.now()
  const userAttempts = attempts.get(ip) || { count: 0, resetTime: now + windowMs }
  
  if (now > userAttempts.resetTime) {
    userAttempts.count = 0
    userAttempts.resetTime = now + windowMs
  }
  
  userAttempts.count++
  attempts.set(ip, userAttempts)
  
  return userAttempts.count <= maxAttempts
}
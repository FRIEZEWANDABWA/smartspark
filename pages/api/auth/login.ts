import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'defaultpass'

// Rate limiting storage
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>()

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { username, password } = req.body
  const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'

  // Check rate limiting
  const attempts = loginAttempts.get(clientIP as string) || { count: 0, lastAttempt: 0 }
  const now = Date.now()
  
  // Reset attempts after 15 minutes
  if (now - attempts.lastAttempt > 15 * 60 * 1000) {
    attempts.count = 0
  }

  if (attempts.count >= 3) {
    return res.status(429).json({ message: 'Too many attempts. Try again in 15 minutes.' })
  }

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' })
  }

  // Check exact credentials
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    attempts.count++
    attempts.lastAttempt = now
    loginAttempts.set(clientIP as string, attempts)
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  // Reset attempts on successful login
  loginAttempts.delete(clientIP as string)

  // Generate secure JWT token
  const token = jwt.sign(
    { username: ADMIN_USERNAME, role: 'admin', loginTime: now },
    JWT_SECRET,
    { expiresIn: '2h' }
  )

  res.status(200).json({ token, message: 'Login successful' })
}
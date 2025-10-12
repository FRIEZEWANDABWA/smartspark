import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const token = req.headers.authorization?.replace('Bearer ', '')
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    
    // Check if token is expired (2 hour limit)
    const now = Date.now()
    const tokenAge = now - decoded.loginTime
    
    if (tokenAge > 2 * 60 * 60 * 1000) {
      return res.status(401).json({ message: 'Token expired' })
    }
    
    res.status(200).json({ valid: true })
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' })
  }
}
import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Test database connection
    const count = await prisma.contact.count()
    res.status(200).json({ 
      message: 'Database connected successfully', 
      contactCount: count,
      env: {
        hasEmailUser: !!process.env.EMAIL_USER,
        hasEmailPass: !!process.env.EMAIL_PASS
      }
    })
  } catch (error) {
    console.error('Database error:', error)
    res.status(500).json({ message: 'Database connection failed', error: error.message })
  }
}
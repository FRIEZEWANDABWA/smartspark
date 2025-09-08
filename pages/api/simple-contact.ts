import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, message } = req.body
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    
    // Log the contact info
    console.log('Quick Contact Submission:', {
      timestamp: new Date().toISOString(),
      name,
      email,
      message,
      type: 'Quick Contact'
    })
    
    res.status(200).json({ message: 'Form submitted successfully!' })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error', error: (error as Error).message })
  }
}
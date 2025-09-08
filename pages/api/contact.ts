import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, message } = req.body
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' })
    }

    // Log the contact info (you can see this in Netlify function logs)
    console.log('Contact Form Submission:', {
      timestamp: new Date().toISOString(),
      name,
      email,
      message,
      type: 'Contact Form'
    })
    
    res.status(200).json({ message: 'Contact form submitted successfully' })
  } catch (error) {
    console.error('Contact API error:', error)
    res.status(500).json({ message: 'Failed to submit contact form' })
  }
}
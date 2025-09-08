import { NextApiRequest, NextApiResponse } from 'next'
import { addToSheet } from '../../lib/googleSheets'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, message } = req.body
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' })
    }

    // Add to Google Sheets
    const result = await addToSheet({
      name,
      email,
      message,
      type: 'Contact Form',
      timestamp: new Date().toISOString()
    })
    
    if (result.success) {
      console.log('Contact saved to Google Sheets')
      res.status(200).json({ message: 'Contact form submitted successfully' })
    } else {
      throw new Error('Failed to save to Google Sheets')
    }
  } catch (error) {
    console.error('Contact API error:', error)
    res.status(500).json({ message: 'Failed to submit contact form' })
  }
}
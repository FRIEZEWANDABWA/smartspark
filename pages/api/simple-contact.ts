import { NextApiRequest, NextApiResponse } from 'next'
import { addToSheet } from '../../lib/googleSheets'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, message } = req.body
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' })
    }
    
    const result = await addToSheet({
      name,
      email,
      message,
      type: 'Quick Contact',
      timestamp: new Date().toISOString()
    })
    
    if (result.success) {
      res.status(200).json({ message: 'Form submitted successfully!' })
    } else {
      throw new Error('Failed to save to Google Sheets')
    }
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error', error: (error as Error).message })
  }
}
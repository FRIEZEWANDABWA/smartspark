import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API called:', req.method, req.body)
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, message } = req.body
    
    // Just return success for now
    console.log('Form data received:', { name, email, message })
    
    res.status(200).json({ 
      message: 'Form received successfully!',
      data: { name, email, message }
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
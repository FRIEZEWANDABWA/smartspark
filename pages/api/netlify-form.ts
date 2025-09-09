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

    // Submit to Netlify Forms
    const formData = new URLSearchParams()
    formData.append('form-name', 'contact')
    formData.append('name', name)
    formData.append('email', email)
    formData.append('message', message)

    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString()
    })

    if (response.ok) {
      res.status(200).json({ message: 'Form submitted successfully' })
    } else {
      throw new Error('Netlify form submission failed')
    }
  } catch (error) {
    console.error('Form submission error:', error)
    res.status(500).json({ message: 'Failed to submit form' })
  }
}
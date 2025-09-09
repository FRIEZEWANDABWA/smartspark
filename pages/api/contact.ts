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

    // Submit to Formspree
    const formspreeResponse = await fetch('https://formspree.io/f/mblawjoa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        message
      })
    })

    if (formspreeResponse.ok) {
      console.log('Form submitted successfully to Formspree')
      res.status(200).json({ message: 'Contact form submitted successfully' })
    } else {
      throw new Error('Formspree submission failed')
    }
  } catch (error) {
    console.error('Contact API error:', error)
    res.status(500).json({ message: 'Failed to submit contact form' })
  }
}
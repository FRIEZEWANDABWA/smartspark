import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, message } = req.body
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' })
    }

    const contact = await prisma.contact.create({
      data: { name, email, message }
    })
    
    console.log('Contact saved:', contact.id)
    res.status(200).json({ message: 'Contact form submitted successfully', id: contact.id })
  } catch (error) {
    console.error('Contact API error:', error)
    res.status(500).json({ message: 'Failed to submit contact form' })
  }
}
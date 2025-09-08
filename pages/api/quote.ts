import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Quote API called with method:', req.method)
  
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { name, email, service, budget, message } = req.body
    console.log('Received data:', { name, email, service, budget, messageLength: message?.length })

    // Validate required fields
    if (!name || !email) {
      console.log('Validation failed: missing name or email')
      return res.status(400).json({ message: 'Name and email are required' })
    }

    // Save to database
    const contact = await prisma.contact.create({
      data: {
        name: name || 'Quote Request',
        email: email || 'no-email@provided.com',
        message: `QUOTE REQUEST\nService: ${service || 'Not specified'}\nBudget: ${budget || 'Not specified'}\nDetails: ${message || 'No additional details'}`
      }
    })
    
    console.log('Quote saved successfully:', contact.id)
    res.status(200).json({ 
      message: 'Quote request submitted successfully',
      id: contact.id 
    })
  } catch (error) {
    console.error('Quote API error:', error)
    res.status(500).json({ 
      message: 'Failed to submit quote request',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Internal server error'
    })
  }
}
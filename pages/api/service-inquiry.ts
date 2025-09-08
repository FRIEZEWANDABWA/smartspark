import { NextApiRequest, NextApiResponse } from 'next'
import { sendNotification } from '../../lib/emailNotifications'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { name, email, service, details } = req.body

  try {
    // Send email notification
    await sendNotification({
      type: 'Service Inquiry',
      name,
      email,
      service,
      message: details
    })
    
    res.status(201).json({ message: 'Service inquiry submitted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit service inquiry' })
  }
}
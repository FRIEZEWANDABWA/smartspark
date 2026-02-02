import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    await prisma.contact.create({
      data: {
        name,
        email,
        message
      }
    });

    res.status(200).json({ message: 'Contact submitted successfully' });
  } catch (error) {
    console.error('Simple contact error:', error);
    res.status(500).json({ message: 'Failed to submit contact' });
  }
}

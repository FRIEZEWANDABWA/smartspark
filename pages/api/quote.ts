import { sendAllNotifications } from '../../lib/notifications';
import { triggerN8NAutoReply } from '../../lib/n8n-webhook';
import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'smartspark',
  user: 'postgres',
  password: 'secure_password',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, service, budget, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    await pool.query(
      'INSERT INTO quote_requests (name, email, phone, service, budget, message) VALUES ($1, $2, $3, $4, $5, $6)',
      [name, email, phone || 'Not provided', service || 'Not specified', budget || 'Not specified', message || 'No details']
    );

    await sendAllNotifications({ name, email, phone, service, budget, message }, 'quote');

    await triggerN8NAutoReply({
      name,
      email,
      message: `Service: ${service || 'Not specified'}, Budget: ${budget || 'Not specified'}, Phone: ${phone || 'Not provided'}, Details: ${message || 'No details'}`,
      service: service || 'Quote Request',
      phone: phone || '',
      budget: budget || ''
    });

    res.status(200).json({ message: 'Quote request submitted successfully' });
  } catch (error) {
    console.error('Quote API error:', error);
    res.status(500).json({ message: 'Failed to submit quote request' });
  }
}

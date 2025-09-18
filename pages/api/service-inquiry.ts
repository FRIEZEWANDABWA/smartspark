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
    const { name, email, service, details } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    await pool.query(
      'INSERT INTO service_inquiries (name, email, service, details) VALUES ($1, $2, $3, $4)',
      [name, email, service || 'Not specified', details || 'No details']
    );

    await triggerN8NAutoReply({
      name,
      email,
      message: `Service Inquiry: ${service || 'Not specified'}, Details: ${details || 'No details'}`,
      service: service || 'Service Inquiry'
    });

    res.status(200).json({ message: 'Service inquiry submitted successfully' });
  } catch (error) {
    console.error('Service inquiry error:', error);
    res.status(500).json({ message: 'Failed to submit service inquiry' });
  }
}

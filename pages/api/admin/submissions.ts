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
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const contacts = await pool.query('SELECT * FROM contact_submissions ORDER BY created_at DESC LIMIT 20');
    const quotes = await pool.query('SELECT * FROM quote_requests ORDER BY created_at DESC LIMIT 20');
    
    res.status(200).json({
      contacts: contacts.rows,
      quotes: quotes.rows,
      services: []
    });
  } catch (error) {
    console.error('Admin API error:', error);
    res.status(500).json({ message: 'Failed to fetch data' });
  }
}

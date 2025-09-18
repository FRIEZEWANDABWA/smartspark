import { NextApiRequest, NextApiResponse } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'smartspark',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'secure_password',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Get submissions by day (last 30 days)
    const submissionsByDay = await pool.query(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count,
        'contact' as type
      FROM contact_submissions 
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      
      UNION ALL
      
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as count,
        'quote' as type
      FROM quote_requests 
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      
      ORDER BY date DESC
    `);

    // Get total counts
    const totalStats = await pool.query(`
      SELECT 
        (SELECT COUNT(*) FROM contact_submissions) as total_contacts,
        (SELECT COUNT(*) FROM quote_requests) as total_quotes,
        (SELECT COUNT(*) FROM contact_submissions WHERE created_at >= NOW() - INTERVAL '7 days') as contacts_this_week,
        (SELECT COUNT(*) FROM quote_requests WHERE created_at >= NOW() - INTERVAL '7 days') as quotes_this_week
    `);

    // Get service popularity
    const serviceStats = await pool.query(`
      SELECT 
        service,
        COUNT(*) as count
      FROM quote_requests 
      WHERE service IS NOT NULL AND service != 'Not specified'
      GROUP BY service
      ORDER BY count DESC
      LIMIT 10
    `);

    res.status(200).json({
      submissionsByDay: submissionsByDay.rows,
      totalStats: totalStats.rows[0],
      serviceStats: serviceStats.rows
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
}
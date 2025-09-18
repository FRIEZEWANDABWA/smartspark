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
    const { slug } = req.query;

    const result = await pool.query(`
      SELECT * FROM blog_posts 
      WHERE slug = $1 AND status = 'published'
    `, [slug]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    // Update view count
    await pool.query(`
      UPDATE blog_posts 
      SET views = COALESCE(views, 0) + 1 
      WHERE slug = $1
    `, [slug]);

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Blog post API error:', error);
    res.status(500).json({ message: 'Failed to fetch blog post' });
  }
}
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
  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch blog posts' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, slug, content, excerpt, published } = req.body;
      await pool.query(
        'INSERT INTO blog_posts (title, slug, content, excerpt, published) VALUES ($1, $2, $3, $4, $5)',
        [title, slug, content, excerpt, published]
      );
      res.status(201).json({ message: 'Blog post created successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to create blog post' });
    }
  }
}

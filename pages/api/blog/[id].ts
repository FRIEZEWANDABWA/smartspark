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
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { title, slug, content, excerpt, published } = req.body;
      await pool.query(
        'UPDATE blog_posts SET title = $1, slug = $2, content = $3, excerpt = $4, published = $5, updated_at = CURRENT_TIMESTAMP WHERE id = $6',
        [title, slug, content, excerpt, published, id]
      );
      res.status(200).json({ message: 'Blog post updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to update blog post' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM blog_posts WHERE id = $1', [id]);
      res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete blog post' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}

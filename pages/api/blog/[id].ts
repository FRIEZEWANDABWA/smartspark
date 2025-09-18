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

  if (req.method === 'GET') {
    try {
      const result = await pool.query(
        'SELECT * FROM blog_posts WHERE id = $1 OR slug = $1',
        [id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Blog post not found' });
      }

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Blog post fetch error:', error);
      res.status(500).json({ message: 'Failed to fetch blog post' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, slug, content, excerpt, category, published } = req.body;

      if (!title || !slug || !content) {
        return res.status(400).json({ message: 'Title, slug, and content are required' });
      }

      const result = await pool.query(
        `UPDATE blog_posts SET title = $1, slug = $2, content = $3, excerpt = $4, category = $5, status = $6, updated_at = NOW() 
         WHERE id = $7 RETURNING *`,
        [title, slug, content, excerpt || '', category || 'General', published ? 'published' : 'draft', id]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Blog post not found' });
      }

      res.status(200).json({ message: 'Blog post updated successfully', post: result.rows[0] });
    } catch (error) {
      console.error('Blog update error:', error);
      res.status(500).json({ message: 'Failed to update blog post' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const result = await pool.query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({ message: 'Blog post not found' });
      }

      res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error('Blog delete error:', error);
      res.status(500).json({ message: 'Failed to delete blog post' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
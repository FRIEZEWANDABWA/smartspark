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
      const result = await pool.query(`
        SELECT * FROM blog_posts 
        ORDER BY created_at DESC
      `);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Blog fetch error:', error);
      res.status(500).json({ message: 'Failed to fetch blog posts' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { title, content, excerpt, category, featured_image, status } = req.body;
      
      const slug = title.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      const result = await pool.query(`
        INSERT INTO blog_posts (title, slug, content, excerpt, category, featured_image, status)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      `, [title, slug, content, excerpt, category, featured_image, status || 'published']);

      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Blog create error:', error);
      res.status(500).json({ message: 'Failed to create blog post' });
    }
  }

  if (req.method === 'PUT') {
    try {
      const { id, title, content, excerpt, category, featured_image, status } = req.body;
      
      const slug = title.toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');

      const result = await pool.query(`
        UPDATE blog_posts 
        SET title = $1, slug = $2, content = $3, excerpt = $4, category = $5, 
            featured_image = $6, status = $7, updated_at = CURRENT_TIMESTAMP
        WHERE id = $8
        RETURNING *
      `, [title, slug, content, excerpt, category, featured_image, status, id]);

      res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error('Blog update error:', error);
      res.status(500).json({ message: 'Failed to update blog post' });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      await pool.query('DELETE FROM blog_posts WHERE id = $1', [id]);
      res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error('Blog delete error:', error);
      res.status(500).json({ message: 'Failed to delete blog post' });
    }
  }
}
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
    return handleGet(req, res);
  } else if (req.method === 'POST') {
    return handlePost(req, res);
  } else if (req.method === 'PUT') {
    return handlePut(req, res);
  } else if (req.method === 'DELETE') {
    return handleDelete(req, res);
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {

  try {
    const { category, limit = 10, page = 1 } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

    let query = `
      SELECT id, title, slug, excerpt, category, featured_image, created_at, updated_at
      FROM blog_posts 
      WHERE status = 'published'
    `;
    
    const params: any[] = [];
    
    if (category && category !== 'all') {
      query += ` AND category = $${params.length + 1}`;
      params.push(category);
    }
    
    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(parseInt(limit as string), offset);

    const result = await pool.query(query, params);

    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) FROM blog_posts WHERE status = \'published\'';
    const countParams: any[] = [];
    
    if (category && category !== 'all') {
      countQuery += ' AND category = $1';
      countParams.push(category);
    }
    
    const countResult = await pool.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    res.status(200).json({
      posts: result.rows,
      pagination: {
        total,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        totalPages: Math.ceil(total / parseInt(limit as string))
      }
    });
  } catch (error) {
    console.error('Blog API error:', error);
    res.status(500).json({ message: 'Failed to fetch blog posts' });
  }
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, slug, content, excerpt, category, published } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ message: 'Title, slug, and content are required' });
    }

    const result = await pool.query(
      `INSERT INTO blog_posts (title, slug, content, excerpt, category, status, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *`,
      [title, slug, content, excerpt || '', category || 'General', published ? 'published' : 'draft']
    );

    res.status(201).json({ message: 'Blog post created successfully', post: result.rows[0] });
  } catch (error) {
    console.error('Blog create error:', error);
    res.status(500).json({ message: 'Failed to create blog post' });
  }
}

async function handlePut(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
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
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;

    const result = await pool.query('DELETE FROM blog_posts WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.status(200).json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    console.error('Blog delete error:', error);
    res.status(500).json({ message: 'Failed to delete blog post' });
  }
}
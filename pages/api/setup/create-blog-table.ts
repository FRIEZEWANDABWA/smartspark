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
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Create blog_posts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        excerpt TEXT,
        category VARCHAR(100) DEFAULT 'Technology',
        featured_image TEXT,
        status VARCHAR(20) DEFAULT 'published',
        views INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create indexes
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status)`);

    // Insert sample posts
    await pool.query(`
      INSERT INTO blog_posts (title, slug, content, excerpt, category, featured_image, status) VALUES
      (
        'The Future of Web Development in 2024',
        'future-of-web-development-2024',
        'Web development is evolving rapidly with new technologies and frameworks. Key trends include AI-powered development tools, performance optimization, and modern JavaScript frameworks like Next.js 14.',
        'Explore the latest trends shaping web development in 2024.',
        'Web Development',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
        'published'
      ),
      (
        'Digital Marketing Strategies That Work',
        'digital-marketing-strategies-that-work',
        'Effective digital marketing requires content excellence, SEO optimization, social media engagement, and data-driven decisions. Focus on quality content and consistent engagement.',
        'Discover proven digital marketing strategies for 2024.',
        'Digital Marketing',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
        'published'
      ),
      (
        'AI and Automation in Business',
        'ai-automation-transforming-business',
        'AI and automation revolutionize business operations through customer service automation, marketing optimization, and workflow improvements. Benefits include increased efficiency and reduced costs.',
        'Learn how AI transforms business operations.',
        'AI & Automation',
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
        'published'
      )
      ON CONFLICT (slug) DO NOTHING
    `);

    res.status(200).json({ 
      success: true, 
      message: 'Blog table created successfully!' 
    });
  } catch (error) {
    console.error('Database setup error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create blog table',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
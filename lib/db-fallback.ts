import { Pool } from 'pg';
import { fileDb } from './fileDb';

let pool: Pool | null = null;

// Try to connect to PostgreSQL, fallback to file DB
try {
  if (process.env.DB_HOST || process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
  }
} catch (error) {
  console.log('PostgreSQL not available, using file database');
  pool = null;
}

export const db = {
  // Blog operations
  async getBlogPosts() {
    if (pool) {
      try {
        const result = await pool.query('SELECT * FROM blog_posts WHERE status = $1 ORDER BY created_at DESC', ['published']);
        return result.rows;
      } catch (error) {
        console.log('PostgreSQL error, falling back to file DB');
        return fileDb.getBlogPosts().filter((post: any) => post.status === 'published');
      }
    }
    return fileDb.getBlogPosts().filter((post: any) => post.status === 'published');
  },

  async saveBlogPost(post: any) {
    if (pool) {
      try {
        const result = await pool.query(
          'INSERT INTO blog_posts (title, slug, content, excerpt, category, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
          [post.title, post.slug, post.content, post.excerpt, post.category, post.status]
        );
        return result.rows[0];
      } catch (error) {
        console.log('PostgreSQL error, falling back to file DB');
      }
    }
    return fileDb.saveBlogPost(post);
  },

  async saveContact(contact: any) {
    if (pool) {
      try {
        const result = await pool.query(
          'INSERT INTO contact_submissions (name, email, phone, message, service) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [contact.name, contact.email, contact.phone, contact.message, contact.service]
        );
        return result.rows[0];
      } catch (error) {
        console.log('PostgreSQL error, falling back to file DB');
      }
    }
    return fileDb.saveContact(contact);
  }
};
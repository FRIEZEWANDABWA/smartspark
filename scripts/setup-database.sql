-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS smartspark;

-- Use the database
\c smartspark;

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category VARCHAR(100) DEFAULT 'General',
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    featured_image VARCHAR(255),
    author VARCHAR(100) DEFAULT 'SmartSpark Team',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contact_submissions table with phone field
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    service VARCHAR(100) DEFAULT 'General Inquiry',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create service_inquiries table with phone field
CREATE TABLE IF NOT EXISTS service_inquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    service VARCHAR(255),
    details TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, category, status, author) VALUES
(
    'The Future of Freelancing: How AI is Transforming Remote Work',
    'future-of-freelancing-ai-transforming-remote-work',
    '<p>The freelancing landscape is undergoing a revolutionary transformation, driven by the rapid advancement of artificial intelligence technologies...</p>',
    'Discover how artificial intelligence is revolutionizing the freelancing industry and creating new opportunities for remote workers worldwide.',
    'AI & Technology',
    'published',
    'Sarah Okafor'
),
(
    'Building Your Personal Brand as an African Freelancer',
    'building-personal-brand-african-freelancer',
    '<p>In today''s competitive global marketplace, building a strong personal brand is essential for freelancers looking to attract high-quality clients...</p>',
    'Learn essential strategies for establishing a strong personal brand that attracts global clients and showcases your unique value proposition.',
    'Business Strategy',
    'published',
    'Michael Asante'
)
ON CONFLICT (slug) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_service_inquiries_created_at ON service_inquiries(created_at);
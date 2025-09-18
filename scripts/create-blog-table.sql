-- Create blog_posts table
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
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, category, featured_image, status) VALUES
(
  'The Future of Web Development in 2024',
  'future-of-web-development-2024',
  'Web development is evolving rapidly with new technologies and frameworks emerging every year. In 2024, we''re seeing significant shifts towards AI-powered development tools, improved performance optimization, and enhanced user experiences.

Key trends shaping web development:

1. **AI-Powered Development Tools**
   - GitHub Copilot and similar AI assistants
   - Automated code generation and optimization
   - Smart debugging and error detection

2. **Performance-First Approach**
   - Core Web Vitals optimization
   - Edge computing and CDN strategies
   - Progressive Web Apps (PWAs)

3. **Modern JavaScript Frameworks**
   - Next.js 14 with App Router
   - React Server Components
   - Svelte and SvelteKit growth

4. **Enhanced Developer Experience**
   - Better tooling and build systems
   - Improved debugging capabilities
   - Streamlined deployment processes

The landscape is becoming more sophisticated, with developers focusing on creating faster, more accessible, and user-friendly applications. Stay ahead by embracing these trends and continuously learning new technologies.',
  'Explore the latest trends and technologies shaping web development in 2024, from AI-powered tools to performance optimization strategies.',
  'Web Development',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop',
  'published'
),
(
  'Digital Marketing Strategies That Actually Work',
  'digital-marketing-strategies-that-work',
  'In today''s competitive digital landscape, businesses need effective marketing strategies to stand out and reach their target audience. Here are proven strategies that deliver real results.

**Content Marketing Excellence**
Create valuable, relevant content that addresses your audience''s pain points. Focus on quality over quantity and maintain consistency across all platforms.

**Search Engine Optimization (SEO)**
- Keyword research and optimization
- Technical SEO improvements
- Local SEO for businesses
- Link building strategies

**Social Media Marketing**
- Platform-specific content strategies
- Community engagement and building
- Influencer partnerships
- Social commerce integration

**Email Marketing Automation**
- Personalized email campaigns
- Automated drip sequences
- Segmentation and targeting
- Performance tracking and optimization

**Pay-Per-Click (PPC) Advertising**
- Google Ads optimization
- Facebook and Instagram ads
- Retargeting campaigns
- Budget allocation strategies

**Analytics and Data-Driven Decisions**
Use tools like Google Analytics, social media insights, and customer feedback to make informed marketing decisions and optimize your strategies continuously.',
  'Discover proven digital marketing strategies that drive real results for businesses in 2024.',
  'Digital Marketing',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
  'published'
),
(
  'AI and Automation: Transforming Business Operations',
  'ai-automation-transforming-business',
  'Artificial Intelligence and automation are revolutionizing how businesses operate, making processes more efficient and enabling companies to focus on strategic growth.

**Key Areas of AI Implementation:**

1. **Customer Service Automation**
   - Chatbots and virtual assistants
   - Automated ticket routing
   - Sentiment analysis
   - 24/7 customer support

2. **Marketing Automation**
   - Personalized content delivery
   - Lead scoring and nurturing
   - Predictive analytics
   - Campaign optimization

3. **Operations and Workflow**
   - Process automation
   - Inventory management
   - Quality control
   - Predictive maintenance

4. **Data Analysis and Insights**
   - Pattern recognition
   - Predictive modeling
   - Real-time analytics
   - Business intelligence

**Benefits of AI and Automation:**
- Increased efficiency and productivity
- Reduced operational costs
- Improved accuracy and consistency
- Enhanced customer experience
- Better decision-making capabilities

**Getting Started with AI:**
1. Identify repetitive tasks in your business
2. Start with simple automation tools
3. Gradually implement more complex AI solutions
4. Train your team on new technologies
5. Monitor and optimize performance

The future belongs to businesses that embrace AI and automation while maintaining the human touch where it matters most.',
  'Learn how AI and automation are transforming business operations and how your company can benefit from these technologies.',
  'AI & Automation',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop',
  'published'
);
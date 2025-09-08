import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { Calendar, Clock, Tag, ArrowLeft, Share2, User } from 'lucide-react'
import Link from 'next/link'
import Header from '../../components/Header'

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query

  // Blog posts data with full content
  const blogPosts = [
    {
      id: 1,
      slug: "future-of-freelancing-ai-transforming-remote-work",
      title: "The Future of Freelancing: How AI is Transforming Remote Work",
      excerpt: "Discover how artificial intelligence is revolutionizing the freelancing industry and creating new opportunities for remote workers worldwide.",
      content: `
        <p>The freelancing landscape is undergoing a dramatic transformation, driven by the rapid advancement of artificial intelligence technologies. As we move further into 2024, AI is not just a buzzword—it's becoming an integral part of how freelancers work, collaborate, and deliver value to clients.</p>
        
        <h2>The AI Revolution in Freelancing</h2>
        <p>Artificial intelligence is fundamentally changing the way freelancers approach their work. From automated project management tools to AI-powered content generation, the possibilities are endless. Here's how AI is reshaping the industry:</p>
        
        <h3>1. Enhanced Productivity Tools</h3>
        <p>AI-powered productivity tools are helping freelancers manage their time more effectively. Smart scheduling assistants, automated invoicing systems, and intelligent project tracking tools are becoming standard in every freelancer's toolkit.</p>
        
        <h3>2. Content Creation Assistance</h3>
        <p>Content creators are leveraging AI tools to generate ideas, research topics, and even draft initial content. While human creativity remains irreplaceable, AI serves as a powerful collaborator that can handle repetitive tasks and provide valuable insights.</p>
        
        <h3>3. Market Analysis and Pricing</h3>
        <p>AI algorithms are helping freelancers understand market trends, analyze competitor pricing, and set optimal rates for their services. This data-driven approach ensures freelancers remain competitive while maximizing their earnings.</p>
        
        <h2>Opportunities for African Freelancers</h2>
        <p>For African freelancers, AI presents unique opportunities to level the playing field and compete globally:</p>
        
        <ul>
          <li><strong>Access to Global Markets:</strong> AI-powered platforms are making it easier for African talent to connect with international clients</li>
          <li><strong>Skill Development:</strong> AI tools provide affordable access to advanced technologies and learning resources</li>
          <li><strong>Competitive Advantage:</strong> Early adoption of AI tools can give African freelancers an edge in the global marketplace</li>
        </ul>
        
        <h2>Preparing for the AI-Driven Future</h2>
        <p>To thrive in this new era, freelancers need to:</p>
        
        <ol>
          <li>Embrace AI tools and learn how to use them effectively</li>
          <li>Focus on uniquely human skills that AI cannot replicate</li>
          <li>Stay updated with the latest AI developments in their field</li>
          <li>Build a personal brand that emphasizes human creativity and expertise</li>
        </ol>
        
        <p>The future of freelancing is not about competing with AI—it's about collaborating with it to deliver superior value to clients. By embracing these technologies while maintaining their unique human perspective, freelancers can position themselves for unprecedented success in the digital economy.</p>
      `,
      author: "Sarah Okafor",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "AI & Technology",
      image: "/images/services/ai.jpg",
      tags: ["AI", "Freelancing", "Remote Work", "Technology"]
    },
    {
      id: 2,
      slug: "building-personal-brand-african-freelancer",
      title: "Building Your Personal Brand as an African Freelancer",
      excerpt: "Learn essential strategies for establishing a strong personal brand that attracts global clients and showcases your unique value proposition.",
      content: `
        <p>In today's competitive global marketplace, building a strong personal brand is essential for African freelancers who want to stand out and attract high-quality clients. Your personal brand is more than just a logo or tagline—it's the story you tell about who you are, what you do, and why clients should choose you.</p>
        
        <h2>Why Personal Branding Matters for African Freelancers</h2>
        <p>Personal branding helps you:</p>
        <ul>
          <li>Differentiate yourself from competitors</li>
          <li>Build trust with potential clients</li>
          <li>Command higher rates for your services</li>
          <li>Create opportunities for long-term partnerships</li>
        </ul>
        
        <h2>Key Elements of a Strong Personal Brand</h2>
        
        <h3>1. Authentic Storytelling</h3>
        <p>Share your journey, challenges, and successes authentically. Clients connect with real stories, not polished marketing copy. Your African heritage and unique experiences can be powerful differentiators.</p>
        
        <h3>2. Consistent Visual Identity</h3>
        <p>Develop a cohesive visual style across all your platforms—website, social media, portfolio, and marketing materials. Consistency builds recognition and professionalism.</p>
        
        <h3>3. Value Proposition</h3>
        <p>Clearly articulate what makes you different and why clients should choose you. Focus on the unique value you bring, not just your skills.</p>
        
        <h2>Building Your Online Presence</h2>
        <p>Your online presence is your digital storefront. Here's how to make it compelling:</p>
        
        <h3>Professional Website</h3>
        <p>Create a website that showcases your work, tells your story, and makes it easy for clients to contact you. Include testimonials, case studies, and a clear call-to-action.</p>
        
        <h3>Social Media Strategy</h3>
        <p>Choose platforms where your target clients spend time and share valuable content regularly. LinkedIn is excellent for B2B services, while Instagram works well for creative work.</p>
        
        <h3>Content Marketing</h3>
        <p>Share insights, tips, and industry knowledge through blog posts, videos, or podcasts. This positions you as an expert and attracts clients who value your expertise.</p>
        
        <h2>Leveraging Your African Heritage</h2>
        <p>Your African background can be a significant advantage:</p>
        <ul>
          <li>Highlight cultural insights that can benefit global clients</li>
          <li>Showcase your understanding of diverse markets</li>
          <li>Emphasize your unique perspective and creativity</li>
        </ul>
        
        <p>Building a personal brand takes time and consistency, but the investment pays off in higher rates, better clients, and more fulfilling work. Start today, and watch your freelance business grow.</p>
      `,
      author: "Michael Asante",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Business Strategy",
      image: "/images/services/design.jpg",
      tags: ["Branding", "Marketing", "Africa", "Business"]
    },
    {
      id: 3,
      slug: "top-10-digital-marketing-trends-2024",
      title: "Top 10 Digital Marketing Trends for 2024",
      excerpt: "Stay ahead of the curve with the latest digital marketing trends that will dominate 2024 and beyond.",
      content: `
        <p>Digital marketing is evolving at an unprecedented pace, and staying ahead of the curve is crucial for business success. As we navigate 2024, several key trends are reshaping how businesses connect with their audiences and drive results.</p>
        
        <h2>1. AI-Powered Personalization</h2>
        <p>Artificial intelligence is revolutionizing personalization by analyzing vast amounts of data to deliver highly targeted content and experiences. From personalized email campaigns to dynamic website content, AI helps businesses create meaningful connections with their audience.</p>
        
        <h2>2. Voice Search Optimization</h2>
        <p>With the growing popularity of voice assistants, optimizing for voice search is becoming essential. Focus on conversational keywords, long-tail phrases, and local SEO to capture voice search traffic.</p>
        
        <h2>3. Video Content Dominance</h2>
        <p>Video continues to dominate content consumption. Short-form videos, live streaming, and interactive video content are driving engagement and conversions across all platforms.</p>
        
        <h2>4. Social Commerce Integration</h2>
        <p>Social media platforms are becoming shopping destinations. Features like Instagram Shops and Facebook Marketplace are transforming how consumers discover and purchase products.</p>
        
        <h2>5. Privacy-First Marketing</h2>
        <p>With increasing privacy regulations, marketers must adopt privacy-first approaches. Focus on building trust through transparent data practices and value-driven content.</p>
        
        <h2>6. Micro-Moments Marketing</h2>
        <p>Consumers expect instant gratification. Optimize for micro-moments by providing immediate answers and solutions when users need them most.</p>
        
        <h2>7. Sustainability and Social Responsibility</h2>
        <p>Consumers are increasingly choosing brands that align with their values. Incorporate sustainability and social responsibility into your marketing messaging.</p>
        
        <h2>8. Interactive Content</h2>
        <p>Interactive content like quizzes, polls, and calculators increases engagement and provides valuable data about your audience preferences.</p>
        
        <h2>9. Influencer Marketing Evolution</h2>
        <p>Influencer marketing is moving beyond celebrity endorsements to include micro-influencers and employee advocates who have authentic connections with their audiences.</p>
        
        <h2>10. Data-Driven Decision Making</h2>
        <p>Leverage analytics and data insights to make informed marketing decisions. Use A/B testing, conversion tracking, and performance metrics to optimize campaigns.</p>
        
        <h2>Preparing for Success</h2>
        <p>To capitalize on these trends:</p>
        <ul>
          <li>Invest in AI and automation tools</li>
          <li>Create diverse content formats</li>
          <li>Build authentic relationships with your audience</li>
          <li>Stay agile and adapt to changing consumer behaviors</li>
        </ul>
        
        <p>The key to success in 2024 is not just following trends, but understanding how they align with your business goals and audience needs. Focus on creating authentic, valuable experiences that drive real results.</p>
      `,
      author: "Amina Hassan",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "Digital Marketing",
      image: "/images/services/marketing.jpg",
      tags: ["Marketing", "Trends", "Digital", "Strategy"]
    },
    {
      id: 4,
      slug: "maximizing-productivity-ai-tools-content-creation",
      title: "Maximizing Productivity with AI Tools for Content Creation",
      excerpt: "Explore the best AI-powered tools that can supercharge your content creation workflow and boost productivity.",
      content: `
        <p>In today's fast-paced digital world, content creators are constantly seeking ways to produce high-quality content more efficiently. Artificial intelligence has emerged as a game-changer, offering tools that can significantly enhance productivity while maintaining the human touch that makes content truly engaging.</p>
        
        <h2>The AI Content Creation Revolution</h2>
        <p>AI tools are transforming every aspect of content creation, from ideation to distribution. Here's how they're revolutionizing the industry:</p>
        
        <h3>1. Content Ideation and Research</h3>
        <p>AI-powered tools can analyze trending topics, identify content gaps, and suggest relevant angles for your content. They can also help with keyword research and competitive analysis, saving hours of manual work.</p>
        
        <h3>2. Writing Assistance</h3>
        <p>From grammar checking to style suggestions, AI writing assistants help ensure your content is polished and professional. They can also help with content structuring and formatting for different platforms.</p>
        
        <h3>3. Visual Content Creation</h3>
        <p>AI tools can generate images, create infographics, and even produce basic videos based on your content. This is particularly valuable for creators who may not have extensive design skills.</p>
        
        <h2>Top AI Tools for Content Creators</h2>
        
        <h3>Writing and Editing</h3>
        <ul>
          <li><strong>Grammarly:</strong> Advanced grammar and style checking</li>
          <li><strong>Jasper:</strong> AI-powered content generation</li>
          <li><strong>Copy.ai:</strong> Marketing copy and social media content</li>
        </ul>
        
        <h3>Visual Content</h3>
        <ul>
          <li><strong>Canva:</strong> AI-powered design templates</li>
          <li><strong>Midjourney:</strong> AI image generation</li>
          <li><strong>Runway ML:</strong> AI video editing tools</li>
        </ul>
        
        <h3>Content Planning</h3>
        <ul>
          <li><strong>BuzzSumo:</strong> Content research and trending topics</li>
          <li><strong>Answer the Public:</strong> Question-based content ideas</li>
          <li><strong>SEMrush:</strong> SEO and content optimization</li>
        </ul>
        
        <h2>Integrating AI into Your Workflow</h2>
        <p>To maximize the benefits of AI tools:</p>
        
        <ol>
          <li><strong>Start Small:</strong> Begin with one or two tools and master them before adding more</li>
          <li><strong>Maintain Human Oversight:</strong> Always review and edit AI-generated content</li>
          <li><strong>Focus on Quality:</strong> Use AI to enhance your work, not replace your creativity</li>
          <li><strong>Stay Updated:</strong> New AI tools are constantly emerging</li>
        </ol>
        
        <h2>Balancing AI and Human Creativity</h2>
        <p>While AI tools are powerful, they work best when combined with human creativity and insight. Use AI to handle repetitive tasks and generate ideas, but rely on your unique perspective and expertise to create content that truly resonates with your audience.</p>
        
        <p>The future of content creation is collaborative—humans and AI working together to produce better, more engaging content faster than ever before. Embrace these tools, and watch your productivity soar.</p>
      `,
      author: "David Mwangi",
      date: "2024-01-08",
      readTime: "8 min read",
      category: "Productivity",
      image: "/images/services/writing.jpg",
      tags: ["AI Tools", "Content", "Productivity", "Workflow"]
    },
    {
      id: 5,
      slug: "rise-of-video-content-business-needs-now",
      title: "The Rise of Video Content: Why Your Business Needs It Now",
      excerpt: "Understanding the importance of video content in today's digital landscape and how to leverage it for business growth.",
      content: `
        <p>Video content has become the dominant force in digital marketing, with consumers increasingly preferring video over text-based content. In today's competitive landscape, businesses that don't incorporate video into their marketing strategy risk falling behind their competitors.</p>
        
        <h2>Why Video Content is Essential</h2>
        <p>Video content offers several advantages that make it indispensable for modern businesses:</p>
        
        <ul>
          <li><strong>Higher Engagement:</strong> Videos generate 1200% more shares than text and images combined</li>
          <li><strong>Better Conversion Rates:</strong> Including video on landing pages can increase conversions by up to 80%</li>
          <li><strong>Improved SEO:</strong> Video content increases time on page and reduces bounce rates</li>
          <li><strong>Mobile Optimization:</strong> Video content is perfectly suited for mobile consumption</li>
        </ul>
        
        <h2>Types of Video Content for Business</h2>
        
        <h3>1. Brand Videos</h3>
        <p>Introduce your company, values, and mission through compelling brand videos. These help build trust and establish your brand identity in the market.</p>
        
        <h3>2. Product Demonstrations</h3>
        <p>Showcase your products or services in action. Product demos help customers understand your offerings better and can significantly increase sales.</p>
        
        <h3>3. Customer Testimonials</h3>
        <p>Real customer stories and testimonials build credibility and trust. Video testimonials are particularly effective as they feel more authentic and engaging.</p>
        
        <h3>4. Educational Content</h3>
        <p>Create how-to videos, tutorials, and educational content that positions your brand as an industry expert while providing value to your audience.</p>
        
        <h3>5. Social Media Videos</h3>
        <p>Short-form videos for platforms like Instagram, TikTok, and LinkedIn help increase brand awareness and engagement.</p>
        
        <h2>Creating Effective Video Content</h2>
        <p>To maximize the impact of your video content:</p>
        
        <h3>Planning and Strategy</h3>
        <ul>
          <li>Define your target audience and their preferences</li>
          <li>Set clear objectives for each video</li>
          <li>Plan your content calendar and distribution strategy</li>
        </ul>
        
        <h3>Production Quality</h3>
        <ul>
          <li>Invest in good lighting and audio equipment</li>
          <li>Keep videos concise and focused</li>
          <li>Include clear calls-to-action</li>
        </ul>
        
        <h3>Optimization</h3>
        <ul>
          <li>Add captions for accessibility</li>
          <li>Optimize for mobile viewing</li>
          <li>Include relevant keywords and descriptions</li>
        </ul>
        
        <h2>Distribution and Promotion</h2>
        <p>Creating great video content is only half the battle. Effective distribution is crucial:</p>
        
        <ul>
          <li><strong>Website Integration:</strong> Embed videos on relevant pages</li>
          <li><strong>Social Media:</strong> Share across all relevant platforms</li>
          <li><strong>Email Marketing:</strong> Include videos in your email campaigns</li>
          <li><strong>Paid Advertising:</strong> Use video ads on social media and search platforms</li>
        </ul>
        
        <h2>Measuring Success</h2>
        <p>Track key metrics to measure the effectiveness of your video content:</p>
        
        <ul>
          <li>View count and watch time</li>
          <li>Engagement rates (likes, comments, shares)</li>
          <li>Click-through rates and conversions</li>
          <li>Brand awareness and recall</li>
        </ul>
        
        <p>Video content is no longer optional—it's essential for business success in the digital age. Start incorporating video into your marketing strategy today, and watch your engagement, conversions, and brand awareness grow.</p>
      `,
      author: "Sarah Okafor",
      date: "2024-01-05",
      readTime: "4 min read",
      category: "Video Marketing",
      image: "/images/services/video.jpg",
      tags: ["Video", "Marketing", "Content", "Business Growth"]
    },
    {
      id: 6,
      slug: "scaling-freelance-business-solo-to-team",
      title: "Scaling Your Freelance Business: From Solo to Team",
      excerpt: "A comprehensive guide on how to scale your freelance business from a one-person operation to a thriving team.",
      content: `
        <p>Scaling a freelance business from a solo operation to a team-based company is one of the most challenging yet rewarding transitions an entrepreneur can make. It requires careful planning, strategic thinking, and a willingness to evolve from a hands-on service provider to a business leader and manager.</p>
        
        <h2>When to Consider Scaling</h2>
        <p>Scaling isn't right for every freelancer. Consider these factors:</p>
        
        <ul>
          <li><strong>Consistent Demand:</strong> You have more work than you can handle alone</li>
          <li><strong>Financial Stability:</strong> Your business generates consistent, predictable income</li>
          <li><strong>Market Opportunity:</strong> There's significant growth potential in your market</li>
          <li><strong>Personal Readiness:</strong> You're ready to shift from doing to managing</li>
        </ul>
        
        <h2>Building Your Team</h2>
        
        <h3>1. Identify Your Needs</h3>
        <p>Start by identifying the specific skills and roles you need to fill. Consider:</p>
        <ul>
          <li>Core service delivery roles</li>
          <li>Support functions (admin, marketing, sales)</li>
          <li>Management and leadership positions</li>
        </ul>
        
        <h3>2. Hiring Strategies</h3>
        <p>When building your team, consider these approaches:</p>
        
        <h4>Full-time Employees</h4>
        <p>Best for core team members who will be with you long-term. Offers stability and commitment but requires more overhead and management.</p>
        
        <h4>Freelancers and Contractors</h4>
        <p>Ideal for specialized skills or project-based work. More flexible and cost-effective but less predictable.</p>
        
        <h4>Virtual Assistants</h4>
        <p>Great for administrative tasks and basic support. Cost-effective and scalable.</p>
        
        <h3>3. Onboarding and Training</h3>
        <p>Develop comprehensive onboarding processes to ensure new team members can contribute quickly and effectively. Include:</p>
        <ul>
          <li>Company culture and values</li>
          <li>Processes and procedures</li>
          <li>Tools and systems training</li>
          <li>Performance expectations</li>
        </ul>
        
        <h2>Systems and Processes</h2>
        <p>As you scale, you need robust systems and processes:</p>
        
        <h3>Project Management</h3>
        <ul>
          <li>Use project management tools like Asana, Trello, or Monday.com</li>
          <li>Establish clear workflows and approval processes</li>
          <li>Implement time tracking and productivity monitoring</li>
        </ul>
        
        <h3>Communication</h3>
        <ul>
          <li>Set up regular team meetings and check-ins</li>
          <li>Use communication tools like Slack or Microsoft Teams</li>
          <li>Establish clear communication protocols</li>
        </ul>
        
        <h3>Quality Control</h3>
        <ul>
          <li>Implement review and approval processes</li>
          <li>Create quality standards and checklists</li>
          <li>Establish feedback loops for continuous improvement</li>
        </ul>
        
        <h2>Financial Management</h2>
        <p>Scaling requires careful financial planning:</p>
        
        <ul>
          <li><strong>Cash Flow Management:</strong> Ensure you have sufficient cash reserves</li>
          <li><strong>Pricing Strategy:</strong> Adjust pricing to reflect team costs and value</li>
          <li><strong>Profit Margins:</strong> Monitor and maintain healthy profit margins</li>
          <li><strong>Investment Planning:</strong> Plan for future growth and expansion</li>
        </ul>
        
        <h2>Leadership and Management</h2>
        <p>Transitioning from freelancer to leader requires new skills:</p>
        
        <h3>Delegation</h3>
        <p>Learn to delegate effectively. Focus on your strengths and delegate tasks that others can do better or more efficiently.</p>
        
        <h3>Team Motivation</h3>
        <p>Create a positive work environment that motivates and retains top talent. Offer competitive compensation, growth opportunities, and recognition.</p>
        
        <h3>Conflict Resolution</h3>
        <p>Develop skills in managing team dynamics and resolving conflicts constructively.</p>
        
        <h2>Maintaining Quality and Culture</h2>
        <p>As you grow, maintaining quality and company culture becomes crucial:</p>
        
        <ul>
          <li><strong>Quality Standards:</strong> Establish and maintain high quality standards</li>
          <li><strong>Company Culture:</strong> Preserve the values and culture that made your business successful</li>
          <li><strong>Client Relationships:</strong> Maintain the personal touch that clients value</li>
          <li><strong>Continuous Improvement:</strong> Regularly evaluate and improve your processes</li>
        </ul>
        
        <h2>Common Challenges and Solutions</h2>
        
        <h3>Challenge: Maintaining Quality</h3>
        <p><strong>Solution:</strong> Implement quality control processes and regular training programs.</p>
        
        <h3>Challenge: Managing Growth</h3>
        <p><strong>Solution:</strong> Plan growth carefully and scale at a sustainable pace.</p>
        
        <h3>Challenge: Team Communication</h3>
        <p><strong>Solution:</strong> Establish clear communication protocols and use appropriate tools.</p>
        
        <p>Scaling your freelance business is a significant undertaking that requires careful planning and execution. Focus on building a strong foundation, hiring the right people, and implementing effective systems and processes. With the right approach, you can successfully transform your solo freelance business into a thriving team-based company.</p>
      `,
      author: "Michael Asante",
      date: "2024-01-03",
      readTime: "9 min read",
      category: "Business Growth",
      image: "/images/services/virtual.jpg",
      tags: ["Scaling", "Team Building", "Business", "Growth"]
    }
  ]

  // Find the current blog post
  const currentPost = blogPosts.find(post => post.slug === slug)

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors duration-300">
        <Header />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-500 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat" 
            style={{ 
              backgroundImage: `url(${currentPost.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-primary-900/70"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6">
              <Link href="/blog" className="inline-flex items-center text-white/80 hover:text-white transition-colors mb-4">
                <ArrowLeft size={16} className="mr-2" />
                Back to Blog
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{currentPost.title}</h1>
            <p className="text-xl opacity-90 mb-8">{currentPost.excerpt}</p>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center">
                <User size={16} className="mr-2" />
                {currentPost.author}
              </div>
              <div className="flex items-center">
                <Calendar size={16} className="mr-2" />
                {new Date(currentPost.date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock size={16} className="mr-2" />
                {currentPost.readTime}
              </div>
              <div className="flex items-center">
                <Tag size={16} className="mr-2" />
                {currentPost.category}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white dark:bg-primary-700 rounded-2xl shadow-xl p-8 md:p-12"
          >
            {/* Featured Image */}
            <div className="mb-8">
              <img
                src={currentPost.image}
                alt={currentPost.title}
                className="w-full h-64 md:h-96 object-cover rounded-xl"
              />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {currentPost.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-sm bg-primary-100 dark:bg-primary-600 text-primary-700 dark:text-primary-200 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div 
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: currentPost.content }}
            />

            {/* Share and Navigation */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-primary-600">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 dark:text-gray-300">Share:</span>
                  <button className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    <Share2 size={20} />
                  </button>
                </div>
                <Link href="/blog" className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors">
                  Back to Blog
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

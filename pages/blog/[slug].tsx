import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, Clock, Tag, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query

  const blogPosts = {
    "future-of-freelancing-ai-transforming-remote-work": {
      title: "The Future of Freelancing: How AI is Transforming Remote Work",
      content: `
        <p>The freelancing landscape is undergoing a revolutionary transformation, driven by the rapid advancement of artificial intelligence technologies. As we stand at the crossroads of human creativity and machine intelligence, freelancers worldwide are discovering unprecedented opportunities to enhance their services, streamline their workflows, and compete on a global scale.</p>

        <h2>The AI Revolution in Freelancing</h2>
        <p>Artificial Intelligence is no longer a futuristic concept—it's a present reality that's reshaping how we work, create, and deliver value to clients. For freelancers, particularly those in Africa and other emerging markets, AI represents a powerful equalizer that can help bridge the gap between local talent and global opportunities.</p>

        <h3>Key Areas of AI Impact:</h3>
        <ul>
          <li><strong>Content Creation:</strong> AI-powered writing assistants help freelancers produce high-quality content faster</li>
          <li><strong>Design Automation:</strong> Tools like Canva AI and Adobe Sensei streamline graphic design processes</li>
          <li><strong>Project Management:</strong> AI algorithms optimize task scheduling and resource allocation</li>
          <li><strong>Client Communication:</strong> Chatbots and automated responses improve client service</li>
        </ul>

        <h2>Opportunities for African Freelancers</h2>
        <p>The global shift towards remote work has created unprecedented opportunities for talented professionals across Africa. With AI tools leveling the playing field, African freelancers can now compete directly with their counterparts in developed markets while offering unique perspectives and cost advantages.</p>

        <h3>Competitive Advantages:</h3>
        <ul>
          <li>Cost-effective services without compromising quality</li>
          <li>Diverse cultural perspectives and creativity</li>
          <li>Strong work ethic and dedication to client success</li>
          <li>Growing tech infrastructure and digital literacy</li>
        </ul>

        <h2>Essential AI Tools for Modern Freelancers</h2>
        <p>To stay competitive in today's market, freelancers must embrace AI tools that enhance their capabilities:</p>

        <h3>Writing and Content Creation:</h3>
        <ul>
          <li>ChatGPT for ideation and content assistance</li>
          <li>Grammarly for grammar and style optimization</li>
          <li>Jasper AI for marketing copy and blog posts</li>
        </ul>

        <h3>Design and Visual Content:</h3>
        <ul>
          <li>Midjourney for AI-generated artwork</li>
          <li>Canva AI for quick design solutions</li>
          <li>Adobe Creative Suite with AI features</li>
        </ul>

        <h2>Preparing for the Future</h2>
        <p>As AI continues to evolve, successful freelancers will be those who adapt quickly and learn to work alongside these powerful tools. The key is not to fear AI replacement but to embrace AI augmentation—using these technologies to enhance human creativity and efficiency.</p>

        <p>The future belongs to freelancers who can seamlessly blend human insight with AI capabilities, delivering exceptional value to clients while building sustainable, scalable businesses.</p>
      `,
      author: "Sarah Okafor",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "AI & Technology",
      image: "/images/services/pexels-googledeepmind-17485013.jpg",
      tags: ["AI", "Freelancing", "Remote Work", "Technology"]
    },
    "building-personal-brand-african-freelancer": {
      title: "Building Your Personal Brand as an African Freelancer",
      content: `
        <p>In today's competitive global marketplace, building a strong personal brand is essential for freelancers looking to attract high-quality clients and command premium rates. For African freelancers, this presents both unique opportunities and challenges that require strategic thinking and authentic storytelling.</p>

        <h2>The Power of Authentic Branding</h2>
        <p>Your personal brand is more than just a logo or website—it's the complete experience clients have when working with you. It encompasses your values, expertise, communication style, and the unique perspective you bring to every project.</p>

        <h3>Key Elements of a Strong Personal Brand:</h3>
        <ul>
          <li><strong>Clear Value Proposition:</strong> What makes you different from other freelancers?</li>
          <li><strong>Consistent Visual Identity:</strong> Professional photos, color schemes, and design elements</li>
          <li><strong>Authentic Voice:</strong> How you communicate and express your personality</li>
          <li><strong>Proven Expertise:</strong> Demonstrable skills and successful project outcomes</li>
        </ul>

        <h2>Leveraging Your African Heritage</h2>
        <p>Rather than hiding your African identity, embrace it as a competitive advantage. Many global clients are actively seeking diverse perspectives and fresh approaches to their challenges.</p>

        <h3>Unique Selling Points:</h3>
        <ul>
          <li>Cultural diversity and fresh perspectives</li>
          <li>Multilingual capabilities</li>
          <li>Understanding of emerging markets</li>
          <li>Strong work ethic and dedication</li>
          <li>Cost-effective premium services</li>
        </ul>

        <h2>Building Your Online Presence</h2>
        <p>Your online presence is often the first impression potential clients will have of your brand. Make it count with these essential elements:</p>

        <h3>Professional Website:</h3>
        <ul>
          <li>Clear description of services and expertise</li>
          <li>Portfolio showcasing your best work</li>
          <li>Client testimonials and case studies</li>
          <li>Professional contact information</li>
        </ul>

        <h3>Social Media Strategy:</h3>
        <ul>
          <li>LinkedIn for professional networking</li>
          <li>Twitter for industry insights and engagement</li>
          <li>Instagram for visual portfolio (designers/creators)</li>
          <li>YouTube for educational content and tutorials</li>
        </ul>

        <h2>Content Marketing for Brand Building</h2>
        <p>Consistently creating valuable content establishes you as an expert in your field and helps potential clients discover your services organically.</p>

        <h3>Content Ideas:</h3>
        <ul>
          <li>Industry insights and trend analysis</li>
          <li>Behind-the-scenes project walkthroughs</li>
          <li>Tips and tutorials in your area of expertise</li>
          <li>Client success stories and case studies</li>
        </ul>

        <h2>Networking and Relationship Building</h2>
        <p>Building meaningful relationships within your industry and with potential clients is crucial for long-term success. Focus on providing value before asking for anything in return.</p>

        <p>Remember, building a personal brand is a marathon, not a sprint. Stay consistent, authentic, and focused on delivering exceptional value to your clients.</p>
      `,
      author: "Michael Asante",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Business Strategy",
      image: "/images/services/pexels-cottonbro-6153343 (1).jpg",
      tags: ["Branding", "Marketing", "Africa", "Business"]
    }
  }

  const currentPost = blogPosts[slug as keyof typeof blogPosts]

  if (!currentPost) {
    return (
      <div className="min-h-screen bg-white dark:bg-primary-900">
        <Header />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-primary-600 hover:text-primary-700">
            Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${currentPost.image})` }}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-secondary-500/85 to-accent-500/90"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/blog" className="inline-flex items-center text-accent-200 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="mr-2" size={20} />
              Back to Blog
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {currentPost.category}
              </span>
              <div className="flex items-center text-accent-200">
                <Calendar size={16} className="mr-1" />
                {new Date(currentPost.date).toLocaleDateString()}
              </div>
              <div className="flex items-center text-accent-200">
                <Clock size={16} className="mr-1" />
                {currentPost.readTime}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{currentPost.title}</h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center text-white font-bold mr-4">
                  {currentPost.author.charAt(0)}
                </div>
                <div>
                  <div className="font-semibold">{currentPost.author}</div>
                  <div className="text-accent-200 text-sm">Author</div>
                </div>
              </div>
              
              <button className="flex items-center bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors">
                <Share2 size={16} className="mr-2" />
                Share
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="prose prose-lg dark:prose-invert max-w-none"
          >
            <div 
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: currentPost.content }}
            />
          </motion.article>
          
          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-gray-200 dark:border-primary-700"
          >
            <div className="flex items-center gap-2 mb-4">
              <Tag size={16} className="text-gray-500" />
              <span className="text-gray-500 font-medium">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentPost.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-primary-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss how we can help transform your business with our services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-600 transition-colors">
                Get Your Quote
              </Link>
              <Link href="/blog" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors">
                More Articles
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
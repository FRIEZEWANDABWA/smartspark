import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock, Tag } from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Blog() {
  const blogPosts = [
    {
      id: 1,
      slug: "future-of-freelancing-ai-transforming-remote-work",
      title: "The Future of Freelancing: How AI is Transforming Remote Work",
      excerpt: "Discover how artificial intelligence is revolutionizing the freelancing industry and creating new opportunities for remote workers worldwide. Learn about AI tools, market analysis, and strategies for African freelancers to compete globally.",
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
      excerpt: "Learn essential strategies for establishing a strong personal brand that attracts global clients and showcases your unique value proposition. Discover how to leverage your African heritage and build authentic connections.",
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
      excerpt: "Stay ahead of the curve with the latest digital marketing trends that will dominate 2024 and beyond. From AI personalization to voice search optimization, discover what's shaping the future of marketing.",
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
      excerpt: "Explore the best AI-powered tools that can supercharge your content creation workflow and boost productivity. Learn how to integrate AI into your creative process while maintaining your unique voice.",
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
      excerpt: "Understanding the importance of video content in today's digital landscape and how to leverage it for business growth. Discover strategies for creating engaging video content that converts.",
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
      excerpt: "A comprehensive guide on how to scale your freelance business from a one-person operation to a thriving team. Learn about hiring strategies, project management, and maintaining quality as you grow.",
      author: "Michael Asante",
      date: "2024-01-03",
      readTime: "9 min read",
      category: "Business Growth",
      image: "/images/services/virtual.jpg",
      tags: ["Scaling", "Team Building", "Business", "Growth"]
    }
  ]

  const categories = [
    "All Posts",
    "AI & Technology", 
    "Business Strategy",
    "Digital Marketing",
    "Productivity",
    "Video Marketing",
    "Business Growth"
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-500 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat" 
            style={{ 
              backgroundImage: 'url(/images/backgrounds/pexels-hillaryfox-1595385.jpg)'
            }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-secondary-500/85 to-accent-500/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-accent-200">Blog</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
              Insights, tips, and trends from the world of freelancing, AI, and digital innovation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-12 bg-gray-50 dark:bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="px-4 py-2 rounded-full bg-white dark:bg-primary-700 text-gray-700 dark:text-gray-300 hover:bg-primary-600 hover:text-white transition-colors font-medium shadow-sm"
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-primary-700 rounded-2xl shadow-xl overflow-hidden mb-16"
          >
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/images/services/ai.jpg";
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-primary-600 font-semibold">{blogPosts[0].category}</span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar size={16} className="mr-1" />
                    {new Date(blogPosts[0].date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Clock size={16} className="mr-1" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{blogPosts[0].title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">{blogPosts[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold mr-3">
                      {blogPosts[0].author.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900 dark:text-white">{blogPosts[0].author}</span>
                  </div>
                  <Link href="/contact" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center">
                    Get Quote
                    <ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20 bg-gray-50 dark:bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {Array.from({ length: Math.ceil(blogPosts.slice(1).length / 3) }, (_, groupIndex) => {
            const startIndex = groupIndex * 3;
            const groupPosts = blogPosts.slice(1).slice(startIndex, startIndex + 3);
            const backgroundImages = [
              'pexels-pixabay-4158.jpg',
              'pexels-olly-845451.jpg',
              'pexels-hillaryfox-1595385.jpg'
            ];
            
            return (
              <div key={groupIndex} className="mb-16 relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0">
                  <div 
                    className="w-full h-full bg-cover bg-center bg-no-repeat" 
                    style={{ 
                      backgroundImage: `url(/images/backgrounds/${backgroundImages[groupIndex % backgroundImages.length]})`
                    }}
                  ></div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-gray-50/85 to-gray-50/90 dark:from-primary-800/90 dark:via-primary-800/85 dark:to-primary-800/90"></div>
                <div className="relative z-10 p-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {groupPosts.map((post, index) => (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-primary-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                      >
                        <div className="relative">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="bg-white/90 text-primary-600 px-3 py-1 rounded-full text-sm font-medium">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar size={14} className="mr-1" />
                              {new Date(post.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              {post.readTime}
                            </div>
                          </div>
                          
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">{post.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.slice(0, 3).map((tag, idx) => (
                              <span
                                key={idx}
                                className="text-xs bg-gray-100 dark:bg-primary-600 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-sm mr-2">
                                {post.author.charAt(0)}
                              </div>
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{post.author}</span>
                            </div>
                            <Link href="/contact" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors inline-flex items-center text-sm">
                              Get Quote
                              <ArrowRight className="ml-1" size={14} />
                            </Link>
                          </div>
                        </div>
                      </motion.article>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-secondary-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl mb-8 opacity-90">
              Get the latest insights on freelancing, AI, and digital innovation delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <Link href="/contact" className="bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
                Subscribe
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
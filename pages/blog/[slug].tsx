import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, Clock, Tag, Share2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function BlogPost() {
  const router = useRouter()
  const { slug } = router.query
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetch(`/api/blog/${slug}`)
        .then(res => res.json())
        .then(data => {
          setPost(data)
          setLoading(false)
        })
        .catch(() => {
          setPost(null)
          setLoading(false)
        })
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-primary-900">
        <Header />
        <div className="pt-24 pb-16 text-center">
          <div className="text-2xl text-gray-600 dark:text-gray-300">Loading...</div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white dark:bg-primary-900">
        <Header />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
          <Link href="/blog" className="text-accent-500 hover:text-accent-600">
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
              <div className="flex items-center text-accent-200">
                <Calendar size={16} className="mr-1" />
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
              <div className="flex items-center text-accent-200">
                <Clock size={16} className="mr-1" />
                {Math.ceil(post.content.length / 1000)} min read
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-400 to-accent-500 flex items-center justify-center text-white font-bold mr-4">
                  {post.author?.name?.charAt(0) || 'S'}
                </div>
                <div>
                  <div className="font-semibold">{post.author?.name || 'SmartSpark Team'}</div>
                  <div className="text-accent-200 text-sm">Author</div>
                </div>
              </div>
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
            {post.excerpt && (
              <div className="text-xl text-gray-600 dark:text-gray-400 mb-8 font-medium border-l-4 border-accent-500 pl-6">
                {post.excerpt}
              </div>
            )}
            <div 
              className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line"
              style={{ lineHeight: '1.8' }}
            >
              {post.content}
            </div>
          </motion.article>
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
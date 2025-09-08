
import { motion } from 'framer-motion'
import { ExternalLink, Github, Play, Eye, Filter, Search } from 'lucide-react'
import { useState, useMemo } from 'react'
import Header from '../components/Header'

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'web', name: 'Web Development' },
    { id: 'design', name: 'Design & Branding' },
    { id: 'content', name: 'Content & Writing' },
    { id: 'video', name: 'Video & Animation' },
    { id: 'ai', name: 'AI & Automation' }
  ]

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform for African Fashion",
      category: "web",
      client: "Ankara Styles Co.",
      description: "Complete e-commerce solution with payment integration, inventory management, and mobile-responsive design.",
      image: "/images/portfolio/ecommerce.jpg",
      tags: ["React", "Node.js", "Stripe", "MongoDB"],
      results: ["300% increase in online sales", "50% reduction in cart abandonment", "Mobile traffic up 200%"],
      link: "#",
      github: "#"
    },
    {
      id: 2,
      title: "Brand Identity for Fintech Startup",
      category: "design",
      client: "PayFlow Africa",
      description: "Complete brand identity including logo, color palette, typography, and marketing materials.",
      image: "/images/portfolio/brand-identity.jpg",
      tags: ["Brand Design", "Logo", "Marketing Materials", "Style Guide"],
      results: ["Brand recognition up 400%", "User trust increased 60%", "App downloads up 250%"],
      link: "#",
      behance: "#"
    },
    {
      id: 3,
      title: "AI-Powered Customer Support System",
      category: "ai",
      client: "TechSupport Pro",
      description: "Custom ChatGPT integration for automated customer support with human handoff capabilities.",
      image: "/images/portfolio/chatbot.jpg",
      tags: ["ChatGPT API", "Python", "Machine Learning", "Integration"],
      results: ["80% reduction in response time", "60% cost savings", "95% customer satisfaction"],
      link: "#",
      demo: "#"
    },
    {
      id: 4,
      title: "Content Marketing Campaign",
      category: "content",
      client: "Green Energy Solutions",
      description: "Comprehensive content strategy including blog posts, social media content, and email campaigns.",
      image: "/images/portfolio/blog-series.jpg",
      tags: ["Content Strategy", "SEO", "Social Media", "Email Marketing"],
      results: ["500% increase in organic traffic", "300% growth in social following", "40% lead generation boost"],
      link: "#"
    },
    {
      id: 5,
      title: "Product Demo Video Series",
      category: "video",
      client: "SaaS Innovators",
      description: "Professional video series showcasing software features with motion graphics and animations.",
      image: "/images/portfolio/product-demo.jpg",
      tags: ["Video Editing", "Motion Graphics", "Animation", "Storytelling"],
      results: ["200% increase in conversion rate", "1M+ video views", "50% reduction in support tickets"],
      link: "#",
      youtube: "#"
    },
    {
      id: 6,
      title: "Restaurant Management System",
      category: "web",
      client: "Taste of Lagos",
      description: "Complete restaurant management system with online ordering, inventory tracking, and analytics.",
      image: "/images/portfolio/ecommerce.jpg",
      tags: ["Vue.js", "Laravel", "MySQL", "Payment Integration"],
      results: ["40% increase in orders", "30% operational efficiency", "25% cost reduction"],
      link: "#",
      github: "#"
    },
    {
      id: 7,
      title: "Healthcare App UI/UX Design",
      category: "design",
      client: "MedConnect Africa",
      description: "User-centered design for telemedicine app focusing on accessibility and ease of use.",
      image: "/images/portfolio/marketing.jpg",
      tags: ["UI/UX Design", "Figma", "User Research", "Prototyping"],
      results: ["90% user satisfaction", "50% faster task completion", "30% increase in app usage"],
      link: "#",
      figma: "#"
    }
  ]

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesFilter = activeFilter === 'all' || project.category === activeFilter
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.client.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesFilter && matchesSearch
    })
  }, [activeFilter, searchTerm])

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat" 
            style={{ 
              backgroundImage: 'url(/images/backgrounds/connection-technology-4878379_1920.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700/90 via-primary-700/85 to-secondary-600/90"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Portfolio</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-8">
              Showcasing successful projects that drive real business results
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Your Project
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors">
                View More Work
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter and Search */}
      <section className="py-12 bg-gray-50 dark:bg-primary-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat" 
            style={{ 
              backgroundImage: 'url(/images/backgrounds/pexels-pixabay-4158.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/95 via-gray-50/90 to-gray-50/95 dark:from-primary-800/95 dark:via-primary-800/90 dark:to-primary-800/95"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    activeFilter === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white dark:bg-primary-700 text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-600'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-primary-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-primary-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-gray-50 dark:bg-primary-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat" 
            style={{ 
              backgroundImage: 'url(/images/backgrounds/pexels-olly-845451.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50/90 via-gray-50/85 to-gray-50/90 dark:from-primary-800/90 dark:via-primary-800/85 dark:to-primary-800/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Our Projects</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Discover how we've helped businesses achieve their goals through innovative solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-primary-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative group">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex gap-3">
                      <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <Eye size={20} />
                      </button>
                      {project.github && (
                        <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
                          <Github size={20} />
                        </button>
                      )}
                      <button className="bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <ExternalLink size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-sm text-primary-600 font-semibold mb-2">{project.client}</div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 dark:bg-primary-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">Key Results:</h4>
                    <ul className="space-y-1">
                      {project.results.map((result, idx) => (
                        <li key={idx} className="text-sm text-gray-600 dark:text-gray-300 flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <Filter size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">No projects found</h3>
              <p className="text-gray-500 dark:text-gray-500">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-700 to-secondary-600 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat" 
            style={{ 
              backgroundImage: 'url(/images/backgrounds/violet-8474790_1920.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          ></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700/90 via-primary-700/85 to-secondary-600/90"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's create something amazing together. Join our portfolio of successful projects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Your Project
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors">
                View More Work
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
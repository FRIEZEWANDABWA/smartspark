import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Star, Clock, Award } from 'lucide-react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

export default function ServiceDetail() {
  const router = useRouter()
  const { service } = router.query

  const serviceData = {
    'content-writing-and-copywriting': {
      title: 'Content Writing & Copywriting',
      subtitle: 'Engaging content that converts and captivates your audience',
      description: 'Transform your brand voice with compelling content that drives engagement, builds trust, and converts visitors into customers. Our expert writers craft SEO-optimized content tailored to your unique brand personality.',
      image: '/images/services/writing.jpg',
      features: [
        'SEO-optimized blog posts and articles',
        'Compelling website copy and landing pages',
        'Social media content and captions',
        'Email marketing campaigns',
        'Product descriptions and sales copy',
        'Brand voice development and style guides'
      ],
      benefits: [
        'Increase organic traffic by up to 300%',
        'Improve conversion rates with persuasive copy',
        'Build brand authority and trust',
        'Save time with consistent content delivery'
      ],
      process: [
        'Discovery call to understand your brand and goals',
        'Content strategy development and planning',
        'Research and content creation',
        'Review, revisions, and final delivery'
      ],
      pricing: 'Starting from $50 per article',
      deliveryTime: '3-7 business days'
    },
    'graphic-design-and-branding': {
      title: 'Graphic Design & Branding',
      subtitle: 'Visual identity that makes your brand unforgettable',
      description: 'Create a powerful visual identity that resonates with your target audience and sets you apart from competitors. From logos to complete brand systems, we design with purpose and impact.',
      image: '/images/services/design.jpg',
      features: [
        'Logo design and brand identity',
        'Business cards and stationery',
        'Marketing materials and brochures',
        'Social media graphics and templates',
        'Website design mockups',
        'Brand guidelines and style guides'
      ],
      benefits: [
        'Increase brand recognition by 400%',
        'Build professional credibility',
        'Stand out from competitors',
        'Create consistent brand experience'
      ],
      process: [
        'Brand discovery and research phase',
        'Concept development and initial designs',
        'Client feedback and refinements',
        'Final delivery with brand guidelines'
      ],
      pricing: 'Starting from $200 for logo design',
      deliveryTime: '5-10 business days'
    },
    'video-production-and-editing': {
      title: 'Video Production & Editing',
      subtitle: 'Professional videos that tell your story and drive results',
      description: 'Bring your brand to life with high-quality video content that engages, educates, and converts. From concept to final cut, we handle every aspect of video production.',
      image: '/images/services/video.jpg',
      features: [
        'Promotional and marketing videos',
        'Product demonstrations and tutorials',
        'Social media video content',
        'Motion graphics and animations',
        'Video editing and post-production',
        'Color grading and audio enhancement'
      ],
      benefits: [
        'Increase engagement rates by 200%',
        'Improve conversion rates significantly',
        'Build stronger emotional connections',
        'Boost social media reach and shares'
      ],
      process: [
        'Pre-production planning and scripting',
        'Video shooting or content gathering',
        'Post-production editing and effects',
        'Review, revisions, and final delivery'
      ],
      pricing: 'Starting from $300 per video',
      deliveryTime: '7-14 business days'
    },
    'web-development-and-design': {
      title: 'Web Development & Design',
      subtitle: 'Custom websites that perform and convert',
      description: 'Build a powerful online presence with custom websites that not only look amazing but also drive results. Our development team creates fast, secure, and user-friendly websites.',
      image: '/images/services/christopher-gower-m_HRfLhgABo-unsplash.jpg',
      features: [
        'Responsive website design and development',
        'E-commerce platform integration',
        'Content management systems (CMS)',
        'Search engine optimization (SEO)',
        'Performance optimization',
        'Ongoing maintenance and support'
      ],
      benefits: [
        'Increase online visibility and traffic',
        'Improve user experience and engagement',
        'Generate more leads and sales',
        'Build credibility and trust'
      ],
      process: [
        'Requirements gathering and planning',
        'Design mockups and wireframes',
        'Development and testing',
        'Launch and ongoing support'
      ],
      pricing: 'Starting from $1,500 for basic websites',
      deliveryTime: '2-4 weeks'
    },
    'ai-and-automation-solutions': {
      title: 'AI & Automation Solutions',
      subtitle: 'Intelligent automation that scales your business',
      description: 'Leverage the power of artificial intelligence to automate repetitive tasks, improve efficiency, and scale your operations. Our AI solutions are tailored to your specific business needs.',
      image: '/images/services/ai.jpg',
      features: [
        'ChatGPT and AI chatbot integration',
        'Workflow automation and optimization',
        'Data analysis and reporting automation',
        'Customer service automation',
        'Content generation and optimization',
        'Custom AI solution development'
      ],
      benefits: [
        'Reduce operational costs by up to 60%',
        'Improve response times significantly',
        'Scale operations without hiring',
        'Enhance customer satisfaction'
      ],
      process: [
        'Business process analysis and assessment',
        'AI solution design and development',
        'Integration and testing',
        'Training and ongoing optimization'
      ],
      pricing: 'Starting from $500 for basic automation',
      deliveryTime: '1-3 weeks'
    },
    'data-services': {
      title: 'Data Services',
      subtitle: 'Transform raw data into actionable business insights',
      description: 'Turn your data into a competitive advantage with our comprehensive data services. From entry to analysis, we help you make informed decisions based on accurate, organized information.',
      image: '/images/services/pexels-pixabay-60504.jpg',
      features: [
        'Data entry and processing',
        'Database management and organization',
        'Market research and analysis',
        'Data visualization and reporting',
        'Data cleaning and validation',
        'Business intelligence solutions'
      ],
      benefits: [
        'Make data-driven decisions confidently',
        'Save time on manual data tasks',
        'Improve data accuracy and quality',
        'Gain competitive market insights'
      ],
      process: [
        'Data assessment and requirements gathering',
        'Data collection and processing',
        'Analysis and insight generation',
        'Report delivery and recommendations'
      ],
      pricing: 'Starting from $25 per hour',
      deliveryTime: '1-2 weeks'
    },
    'virtual-assistance': {
      title: 'Virtual Assistance',
      subtitle: 'Professional support that keeps your business running smoothly',
      description: 'Focus on growing your business while we handle the administrative tasks. Our virtual assistants provide reliable, professional support tailored to your specific needs.',
      image: '/images/services/virtual.jpg',
      features: [
        'Email management and organization',
        'Calendar scheduling and coordination',
        'Customer support and communication',
        'Administrative task management',
        'Research and data gathering',
        'Social media management'
      ],
      benefits: [
        'Free up time for core business activities',
        'Reduce operational overhead costs',
        'Improve productivity and efficiency',
        'Access professional skills on-demand'
      ],
      process: [
        'Needs assessment and task identification',
        'Virtual assistant matching and onboarding',
        'Task delegation and management',
        'Regular check-ins and optimization'
      ],
      pricing: 'Starting from $15 per hour',
      deliveryTime: 'Immediate availability'
    },
    'digital-marketing': {
      title: 'Digital Marketing',
      subtitle: 'Strategic marketing that drives growth and ROI',
      description: 'Accelerate your business growth with data-driven digital marketing strategies. We help you reach your target audience, generate quality leads, and maximize your marketing ROI.',
      image: '/images/services/pexels-tara-winstead-8849295.jpg',
      features: [
        'Social media marketing and management',
        'Search engine optimization (SEO)',
        'Pay-per-click (PPC) advertising',
        'Content marketing strategy',
        'Email marketing campaigns',
        'Analytics and performance tracking'
      ],
      benefits: [
        'Increase brand visibility and awareness',
        'Generate high-quality leads',
        'Improve customer acquisition costs',
        'Build lasting customer relationships'
      ],
      process: [
        'Marketing audit and strategy development',
        'Campaign creation and implementation',
        'Performance monitoring and optimization',
        'Regular reporting and analysis'
      ],
      pricing: 'Starting from $800 per month',
      deliveryTime: '2-4 weeks to see results'
    },
    'project-management': {
      title: 'Project Management',
      subtitle: 'Expert coordination that delivers results on time and budget',
      description: 'Ensure your projects succeed with professional project management. We coordinate teams, manage timelines, and deliver results that exceed expectations.',
      image: '/images/services/pexels-thisisengineering-3861958.jpg',
      features: [
        'Project planning and strategy',
        'Team coordination and management',
        'Timeline and milestone tracking',
        'Quality assurance and control',
        'Risk management and mitigation',
        'Stakeholder communication'
      ],
      benefits: [
        'Deliver projects on time and budget',
        'Improve team productivity and collaboration',
        'Reduce project risks and issues',
        'Ensure quality deliverables'
      ],
      process: [
        'Project scope and requirements definition',
        'Planning and resource allocation',
        'Execution and progress monitoring',
        'Delivery and project closure'
      ],
      pricing: 'Starting from $50 per hour',
      deliveryTime: 'Varies by project scope'
    }
  }

  const currentService = serviceData[service as keyof typeof serviceData]

  if (!currentService) {
    return (
      <div className="min-h-screen bg-white dark:bg-primary-900">
        <Header />
        <div className="pt-24 pb-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Service Not Found</h1>
          <Link href="/services" className="text-primary-600 hover:text-primary-700">
            Back to Services
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
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${currentService.image})` }}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-secondary-500/85 to-accent-500/90"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{currentService.title}</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
              {currentService.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/contact?service=${service}`} className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-600 transition-colors inline-flex items-center justify-center">
                Get Quote Now
                <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Service Overview */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">What We Offer</h2>
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-8">
                {currentService.description}
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-50 dark:bg-primary-800 rounded-lg">
                  <Clock className="mx-auto h-8 w-8 text-primary-600 mb-2" />
                  <div className="font-semibold text-gray-900 dark:text-white">Delivery Time</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{currentService.deliveryTime}</div>
                </div>
                <div className="text-center p-4 bg-gray-50 dark:bg-primary-800 rounded-lg">
                  <Award className="mx-auto h-8 w-8 text-primary-600 mb-2" />
                  <div className="font-semibold text-gray-900 dark:text-white">Custom Quote</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Let's shape a package that's built around you</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src={currentService.image}
                alt={currentService.title}
                className="w-full h-96 object-cover rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features & Benefits */}
      <section className="py-20 bg-gray-50 dark:bg-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">What's Included</h3>
              <div className="space-y-4">
                {currentService.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="text-green-500 mr-3 mt-1" size={20} />
                    <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Key Benefits</h3>
              <div className="space-y-4">
                {currentService.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <Star className="text-yellow-500 mr-3 mt-1" size={20} />
                    <span className="text-gray-700 dark:text-gray-200">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white dark:bg-primary-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Our Process</h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We follow a proven process to ensure exceptional results every time
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {currentService.process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-xl">
                  {index + 1}
                </div>
                <p className="text-gray-700 dark:text-gray-200">{step}</p>
              </motion.div>
            ))}
          </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss your project and create something amazing together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/contact?service=${service}`} className="bg-accent-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-accent-600 transition-colors inline-flex items-center justify-center">
                Get Your Quote
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link href="/services" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors">
                View All Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
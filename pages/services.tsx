import { motion } from 'framer-motion'
import { Users, Pen, Monitor, Video, Brain, Database, Globe, Clock, Shield, Award, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Services() {
  const serviceCategories = [
    {
      title: "Creative Services",
      icon: Pen,
      color: "from-purple-500 to-pink-500",
      services: [
        {
          name: "Content Writing & Copywriting",
          description: "Engaging blog posts, articles, web copy, and marketing materials",
          features: ["SEO-optimized content", "Brand voice development", "Technical writing", "Social media copy"],

        },
        {
          name: "Graphic Design & Branding",
          description: "Logo design, brand identity, marketing materials, and visual content",
          features: ["Logo & brand identity", "Marketing materials", "Social media graphics", "Print design"],

        },
        {
          name: "Video Production & Editing",
          description: "Professional video editing, motion graphics, and content creation",
          features: ["Video editing", "Motion graphics", "Color grading", "Audio enhancement"],

        }
      ]
    },
    {
      title: "Technical Services",
      icon: Monitor,
      color: "from-blue-500 to-cyan-500",
      services: [
        {
          name: "Web Development & Design",
          description: "Custom websites, e-commerce platforms, and web applications",
          features: ["Responsive design", "E-commerce integration", "CMS development", "Performance optimization"],

        },
        {
          name: "AI & Automation Solutions",
          description: "ChatGPT integration, workflow automation, and AI-powered tools",
          features: ["ChatGPT integration", "Process automation", "Data analysis", "Custom AI solutions"],

        },
        {
          name: "Data Services",
          description: "Data entry, research, analysis, and database management",
          features: ["Data entry & processing", "Market research", "Database management", "Analytics reporting"],

        }
      ]
    },
    {
      title: "Business Support",
      icon: Users,
      color: "from-green-500 to-teal-500",
      services: [
        {
          name: "Virtual Assistance",
          description: "Administrative support, email management, and business operations",
          features: ["Email management", "Calendar scheduling", "Customer support", "Administrative tasks"],

        },
        {
          name: "Digital Marketing",
          description: "Social media management, SEO, and online marketing campaigns",
          features: ["Social media management", "SEO optimization", "Content marketing", "Ad campaign management"],

        },
        {
          name: "Project Management",
          description: "End-to-end project coordination and team management",
          features: ["Project planning", "Team coordination", "Progress tracking", "Quality assurance"],

        }
      ]
    }
  ]

  const whyChooseUs = [
    {
      icon: Globe,
      title: "Global Talent Pool",
      description: "Access to skilled professionals from across Africa and beyond"
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock support across different time zones"
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee with unlimited revisions"
    },
    {
      icon: Award,
      title: "Proven Track Record",
      description: "500+ successful projects delivered to satisfied clients"
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-500 text-white relative">
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: 'url(/images/pages/1.jpg)' }}></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Professional <span className="text-accent-200">Freelance Services</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
              Comprehensive digital solutions powered by African talent and cutting-edge technology
            </p>
            <button className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center">
              Get Free Consultation
              <ArrowRight className="ml-2" size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Creative Services */}
      <section id="creative-services" className="py-20 bg-white dark:bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-45 dark:opacity-35">
          <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/backgrounds/5.webp)' }}></div>
        </div>
        <div className="absolute inset-0 bg-white/70 dark:bg-primary-900/75"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Pen className="text-white" size={40} />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Creative Services</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {serviceCategories[0].services.map((service, serviceIndex) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: serviceIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-primary-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-primary-600"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{service.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle className="text-green-500 mr-2" size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t pt-4">
                    <Link href={`/services/${service.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors block text-center">
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Services */}
      <section id="technical-services" className="py-20 bg-gray-50 dark:bg-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-45 dark:opacity-35">
          <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/backgrounds/6.webp)' }}></div>
        </div>
        <div className="absolute inset-0 bg-gray-50/75 dark:bg-primary-800/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Monitor className="text-white" size={40} />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Technical Services</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {serviceCategories[1].services.map((service, serviceIndex) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: serviceIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-primary-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-primary-600"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{service.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle className="text-green-500 mr-2" size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t pt-4">
                    <Link href={`/services/${service.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors block text-center">
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business Support */}
      <section id="business-support" className="py-20 bg-white dark:bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-45 dark:opacity-35">
          <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/backgrounds/7.webp)' }}></div>
        </div>
        <div className="absolute inset-0 bg-white/70 dark:bg-primary-900/75"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center">
                <Users className="text-white" size={40} />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Business Support</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {serviceCategories[2].services.map((service, serviceIndex) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: serviceIndex * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-primary-700 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-primary-600"
                >
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{service.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">What's Included:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle className="text-green-500 mr-2" size={16} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="border-t pt-4">
                    <Link href={`/services/${service.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors block text-center">
                      Learn More
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50 dark:bg-primary-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 dark:opacity-30">
          <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/backgrounds/8.webp)' }}></div>
        </div>
        <div className="absolute inset-0 bg-gray-50/75 dark:bg-primary-800/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Why Choose Our Services?</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We combine global expertise with local talent to deliver exceptional results
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white dark:bg-primary-700 p-8 rounded-xl shadow-lg"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <item.icon className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Note Section */}
      <section className="py-16 bg-gray-50 dark:bg-primary-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-primary-700 p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Flexible Pricing for Every Project</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We understand that every project is unique. That's why we offer customized pricing based on your specific requirements, timeline, and budget. Whether you're a startup or an established business, we have solutions that fit your needs.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="bg-primary-50 p-4 rounded-lg">
                <strong className="text-primary-600">Startup Packages</strong>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Budget-friendly solutions for new businesses</p>
              </div>
              <div className="bg-secondary-50 p-4 rounded-lg">
                <strong className="text-secondary-600">Enterprise Solutions</strong>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Comprehensive packages for large projects</p>
              </div>
              <div className="bg-accent-50 p-4 rounded-lg">
                <strong className="text-accent-600">Custom Quotes</strong>
                <p className="text-gray-600 dark:text-gray-300 mt-1">Tailored pricing for unique requirements</p>
              </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join hundreds of satisfied clients who trust us with their projects
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Start Your Project
              </a>
              <a href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-700 transition-colors">
                Schedule Consultation
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}
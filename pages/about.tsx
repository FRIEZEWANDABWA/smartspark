import { motion } from 'framer-motion'
import { Users, Globe, Award, Target, Heart, Zap, TrendingUp, Shield } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function About() {
  const stats = [
    { number: "500+", label: "Projects Completed", icon: Award },
    { number: "150+", label: "Happy Clients", icon: Users },
    { number: "25+", label: "Countries Served", icon: Globe },
    { number: "98%", label: "Client Satisfaction", icon: Heart }
  ]

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for perfection in every project, ensuring quality that exceeds expectations."
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Honest communication, transparent pricing, and ethical business practices guide everything we do."
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Connecting African talent with global opportunities to create meaningful economic impact."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Embracing cutting-edge technology and creative solutions to solve complex challenges."
    }
  ]

  const team = [
    {
      name: "Frieze Wandabwa",
      role: "Founder & CEO",
      bio: "10+ years in digital marketing and business development. Passionate about connecting African talent with global opportunities.",
      expertise: ["Business Strategy", "Digital Marketing", "Team Leadership"]
    },
    {
      name: "Cyrilla Chikamai",
      role: "Co-Founder",
      bio: "Strategic visionary with expertise in business operations and client relationship management.",
      expertise: ["Business Operations", "Strategy", "Client Relations"]
    },
    {
      name: "Teddy Githiji",
      role: "Head of Technology",
      bio: "Full-stack developer and AI specialist with expertise in modern web technologies and automation solutions.",
      expertise: ["Web Development", "AI Integration", "System Architecture"]
    },
    {
      name: "Anthony Murimi",
      role: "Creative Designer",
      bio: "Award-winning designer with 8+ years experience in branding, visual design, and creative strategy.",
      expertise: ["Brand Design", "Visual Identity", "Creative Strategy"]
    }
  ]

  const journey = [
    {
      year: "2020",
      title: "The Dream",
      description: "Founded in the USA with a vision to create a premier global freelancing company connecting worldwide talent."
    },
    {
      year: "2021",
      title: "First Milestone",
      description: "Completed 50+ projects and expanded our team to include designers, developers, and writers."
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Served clients across 15 countries and introduced AI-powered solutions to our service portfolio."
    },
    {
      year: "2023",
      title: "Innovation Focus",
      description: "Launched specialized AI services and automation solutions, helping businesses scale efficiently."
    },
    {
      year: "2024",
      title: "Market Leader",
      description: "Became a trusted partner for 150+ businesses worldwide with 500+ successful projects delivered."
    }
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900 transition-colors duration-300">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-primary-600 via-secondary-500 to-accent-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About <span className="text-accent-200">SmartSpark Services</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90">
              Empowering businesses worldwide through global talent and innovative technology solutions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50 dark:bg-primary-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white dark:bg-primary-700 p-8 rounded-xl shadow-lg transition-colors duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <stat.icon className="text-primary-600" size={32} />
                </div>
                <div className="text-4xl font-bold text-primary-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-300 font-medium transition-colors">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 relative overflow-hidden bg-white dark:bg-primary-900 transition-colors duration-300">
        <div className="absolute inset-0 opacity-45 dark:opacity-35">
          <div className="w-full h-full bg-cover bg-center bg-no-repeat bg-fixed sm:bg-scroll" style={{ backgroundImage: 'url(/images/backgrounds/1.webp)' }}></div>
        </div>
        <div className="absolute inset-0 bg-white/70 dark:bg-primary-900/75"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">Our Story</h2>
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 transition-colors">
                SmartSpark Services was born from a simple yet powerful vision: to bridge the gap between 
                exceptional global talent and worldwide business opportunities. We recognized that talented 
                professionals around the world were seeking meaningful opportunities to showcase their skills 
                on a global stage.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 transition-colors">
                What started as a small collective of freelancers has grown into a comprehensive digital 
                services company that combines human creativity with cutting-edge AI technology. We're not 
                just service providers – we're partners in your success, committed to delivering results 
                that drive real business growth.
              </p>
              <p className="text-lg text-gray-700 dark:text-gray-200 transition-colors">
                Today, we're proud to serve clients across 50+ countries, having completed over 500 projects 
                with a 98% client satisfaction rate. Our success is measured not just in numbers, but in the 
                lasting relationships we build and the positive impact we create worldwide.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-800 dark:to-secondary-800 p-8 rounded-2xl transition-colors duration-300">
                <div className="bg-white dark:bg-primary-700 p-6 rounded-xl shadow-lg transition-colors duration-300">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Our Mission</h3>
                  <p className="text-gray-700 dark:text-gray-200 mb-6 transition-colors">
                    To empower businesses worldwide by providing access to exceptional global talent 
                    and innovative technology solutions that drive growth, efficiency, and success.
                  </p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">Our Vision</h3>
                  <p className="text-gray-700 dark:text-gray-200 transition-colors">
                    To become the leading bridge between global talent and worldwide opportunities, 
                    creating sustainable economic impact while delivering world-class digital solutions.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50 dark:bg-primary-800 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 opacity-40 dark:opacity-30">
          <div className="w-full h-full bg-cover bg-center bg-no-repeat bg-fixed sm:bg-scroll" style={{ backgroundImage: 'url(/images/backgrounds/2.webp)' }}></div>
        </div>
        <div className="absolute inset-0 bg-gray-50/75 dark:bg-primary-800/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">Our Values</h2>
            <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto transition-colors">
              The principles that guide everything we do and shape our company culture
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center bg-white dark:bg-primary-700 p-8 rounded-xl shadow-lg transition-colors duration-300"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <value.icon className="text-primary-600" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors">{value.title}</h3>
                <p className="text-gray-700 dark:text-gray-200 transition-colors">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 bg-white dark:bg-primary-900 relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 opacity-45 dark:opacity-35">
          <div className="w-full h-full bg-cover bg-center bg-no-repeat bg-fixed sm:bg-scroll" style={{ backgroundImage: 'url(/images/backgrounds/3.webp)' }}></div>
        </div>
        <div className="absolute inset-0 bg-white/70 dark:bg-primary-900/75"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors">Our Journey</h2>
            <p className="text-xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto transition-colors">
              From humble beginnings to becoming a trusted global partner
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-primary-200 dark:bg-primary-600"></div>
            {journey.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <div className="bg-white dark:bg-primary-700 p-6 rounded-xl shadow-lg transition-colors duration-300">
                    <div className="text-2xl font-bold text-primary-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white transition-colors">{milestone.title}</h3>
                    <p className="text-gray-700 dark:text-gray-200 transition-colors">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-white dark:border-primary-800"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}